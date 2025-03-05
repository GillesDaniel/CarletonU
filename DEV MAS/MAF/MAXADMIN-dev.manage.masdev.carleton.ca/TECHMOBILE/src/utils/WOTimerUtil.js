/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import { log, Device } from "@maximo/maximo-js-api";
import SynonymUtil from './SynonymUtil';
import WOUtil from './WOUtil';
import CommonUtil from "./CommonUtil";

const TAG = 'WOTimerUtil';

/**
 * Called when timer is already started but not stopped, and the user is directly trying to complete the WO.
 * @param {Application} app application object.
 * @param {Object} activeLabTran object.
 * @param {Datasource} laborDS  labor detail datasource.
 */
const stopWorkOnStatusComp = async (app, activeLabTran, laborDS) => {

  const currentDateString = app.dataFormatter.currentUserDateTime();

  activeLabTran[0].finishdatetime = removeSecondsFromTimeString(currentDateString);
  activeLabTran[0].finishdate = app.dataFormatter.dateWithoutTimeZone(currentDateString);
  activeLabTran[0].finishtime = removeSecondsFromTimeString(app.dataFormatter.dateWithoutTimeZone(currentDateString));

  activeLabTran[0].starttime = removeSecondsFromTimeString(activeLabTran[0].starttime);
  activeLabTran[0].startdatetime = removeSecondsFromTimeString(activeLabTran[0].startdatetime);

  try {
    await laborDS.save();
  } catch (error) {
    //istanbul ignore next
    log.t(TAG, error);
  }
}

/**
 * Show/hide Start, Pause & Stop button on workorder list page. 
 * @param {item} item
 * @return {hideStartButton} bool value to hideStartButton 
 */
const computedTimerStatus = (item, labor) => {
  let hideStartButton = false;
  if (item && item.labtrans && item.labtrans.length > 0) {
    hideStartButton = item.labtrans.some((member) => (member.timerstatus_maxvalue === "ACTIVE" && member.laborcode === labor));
    hideStartButton = hideStartButton ? true : false;
  }
  return hideStartButton;
};

/**
 * Remove seconds from time
 * @param {String} timeString String
 * @return {String} string removed seconds part from time
 */
const removeSecondsFromTimeString = (timeString) => {
  let newTime = timeString;
  if (timeString) {
    if (timeString.length === 8) {    // for hh:mm:ss
      newTime = timeString.substring(0, 6) + '00';
    }
    else if (timeString.length === 19) {  // for yyyy-MM-ddThh:mm:ss
      newTime = timeString.substring(0, 17) + '00';
    }
    else if (timeString.length === 25) {  // for yyyy-MM-ddThh:mm:ss+00:00"
      newTime = timeString.substring(0, 17) + '00' + timeString.substring(19);
    }
  }

  return newTime;
}

/**
 * Show confirm dialog for labor trans. 
 * @param {Application} app application object
 * @param {Datasource} laborDS labor detail datasource
 * @param {String} timerstatusActive synonym of active for timerstatus
 * @param {String} dialogName dialog name
 * @param {String} action Type of action pause, start, stop etc..
 * @param {String} actionType Action Type
 */
const openConFirmLabTimeDialog = async (app, page, laborDS, action, dialogName, actionType) => {
  // show dialog
  const labor = app.client.userInfo.labor.laborcode;
  const current = new Date();
  
  current.setSeconds(0);

  const synonymDS = app.datasources['synonymdomainData'];
  const timerstatusActive = await SynonymUtil.getSynonym(synonymDS, 'TIMERSTATUS', 'TIMERSTATUS|ACTIVE');
  const timerstatusComplete = await SynonymUtil.getSynonym(synonymDS, 'TIMERSTATUS', 'TIMERSTATUS|COMPLETE');

  if (timerstatusActive && timerstatusComplete) {
    // load active labtrans
    await laborDS.initializeQbe();
    laborDS.setQBE('timerstatus', '=', timerstatusActive.value);
    laborDS.setQBE('laborcode', '=', labor);
    await laborDS.searchQBE(undefined, true);

    const startDateTime = removeSecondsFromTimeString(laborDS.item.startdatetime);
    const startDateTimeMoment = app.dataFormatter.convertISOtoDate(startDateTime);
    const regularHrs = laborDS.item.regularhrs || Math.abs((current - startDateTimeMoment)) / 3600000;

    const currentDateString = app.dataFormatter.convertDatetoISO(current);

    // set finish time
    laborDS.item.starttime = removeSecondsFromTimeString(laborDS.item.starttime);
    laborDS.item.finishdatetime = currentDateString;
    laborDS.item.finishdate = app.dataFormatter.dateWithoutTimeZone(currentDateString);
    laborDS.item.finishtime = app.dataFormatter.dateWithoutTimeZone(currentDateString);

    laborDS.item.regularhrs = regularHrs;
    laborDS.item.startdatetime = removeSecondsFromTimeString(laborDS.item.startdatetime); // DT246361
    laborDS.item.timerstatus = timerstatusComplete.value;
    laborDS.item.timerstatus_maxvalue = timerstatusComplete.maxvalue;

    page.state.woaction = action;
    page.state.woactionType = actionType;
    app.showDialog(dialogName);
  }
  else {
    app.toast(
      app.getLocalizedLabel(
        'fail_get_synonym',
        `Can not get the synonym data for TIMERSTATUS`,
        ['TIMERSTATUS']
      ),
      'error'
    );
  }
};

/**
 * Function to check if there is an active work order timer
 * 
 * @returns {boolean} - True if there is no active work order timer, false otherwise
 */
const validateActiveTimer = async(app, labor, detailDS) => {
  const allowMultiTimerSysProp = app.state.systemProp && app.state.systemProp["maximo.mobile.allowmultipletimers"];

  // istanbul ignore next
  if (allowMultiTimerSysProp === "0") {
    const schPage = app.findPage("schedule") ||  app.findPage("approvals");
    let allWODS = schPage?.state?.woItems || detailDS?.items;
    let anyActiveWoTimer = false;
    for (let i = 0; i < allWODS?.length; i ++) {
      let woItem = allWODS[i];
      if (woItem?.labtrans) {
        const labtransItem = woItem.labtrans;
        anyActiveWoTimer = labtransItem?.some((item) => (item.timerstatus_maxvalue === 'ACTIVE' && (labor === item.laborcode)));
        if (anyActiveWoTimer) {
          break;
        }
      }
    }
    if (anyActiveWoTimer) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

/**
 * Start or stop timer for specific workorder. 
 * @param {Application} app application object
 * @param {Object} event work order object for starting or stoping timer.
 * @param {Datasource} detailDS work order detail datasource
 * @param {Datasource} laborDS labor detail datasource
 * @param {String} transtype trans type for labor trans.
 */
const startStopTimer = async (app, page, event, detailDS, laborDS, transtype, transtypeDescription) => {
  const labor = app.client.userInfo.labor.laborcode;
  const synonymdomainData = app.findDatasource('synonymdomainData');
  const current = new Date();  
  let methodAction;
  let localPayload;  
  let useTimerSystemProp = app.state.systemProp && app.state.systemProp["maximo.mobile.usetimer"];
  let hazardReviewedReq = app.state.systemProp && app.state.systemProp["maximo.mobile.safetyplan.review"];
  let label = app.getLocalizedLabel('safetyplanreview', 'You must review the safety plan before you start work.');

  let isInProgressAllowed = false;
  const currentDateString = app.dataFormatter.convertDatetoISO(current);
  const statusArr = await CommonUtil.getOfflineAllowedStatusList(app, event, false);

  const isValidActiveTimer = await validateActiveTimer(app, labor, detailDS);
  
  // istanbul ignore else
  if (statusArr) {
    isInProgressAllowed = statusArr.filter(statValue => {
      return statValue.maxvalue === "INPRG";
    }).length > 0;
  }

  // If condition verify if barcode scanning mandatory for the work order start action
  if (
    event.action === 'start' && 
    page.state.enforceAssetScan === 1 && 
    isInProgressAllowed && 
    isValidActiveTimer && 
    event.worktype !== 'travel' && 
    event.item.starttimerinprg === '1' && 
    event.item.status_maxvalue === 'APPR' &&
    !app.state.disableScan && 
    event.item.assetnum
  )
  {
    const isScanRequired = await CommonUtil.checkScanRequired('INPRG');
    // istanbul ignore else
    if (isScanRequired) {
      const scanResParam = { scanValue: null, assetnum: event.item.assetnum, locationnum: event.item.locationnum, status: 'INPRG' };
      app.state.scanParameter = { app:app, page:page, event:event, detailDS:detailDS, laborDS:laborDS, transtype:transtype, transtypeDescription:transtypeDescription, method:"startStopTimer", scanResParam: scanResParam };
      app.showDialog("appAssetScanDialog");
      return;
    }
  }
  app.state.disableScan = false;

  // istanbul ignore else
  if (app.state.skipScan) {
    app.state.skipScan = false;
    const message = app.getLocalizedLabel('worklog_woStarted_without_scan', 'The work order was started without scanning an asset.');
    await page.callController('saveWorkLog', {
      longDescription: "",
      summary: message,
      visibility: true
    }, true);
  }
  
  let splanreviewdate = event.datasource?.item.splanreviewdate || event.item.splanreviewdate;
  //Only change the WO status to INPRG without timer starts
  // istanbul ignore else
  if (event.action === 'start' && isInProgressAllowed && (useTimerSystemProp && useTimerSystemProp === '0')) {
    page.state.workloading = true;
    
     //Open wohazard if not reviewed
     // istanbul ignore else
     if (event.worktype === 'work' && isInProgressAllowed && event.item.wohazardcount > 0 && !splanreviewdate && hazardReviewedReq === '1') {      
      app.toast(label, 'error', null, null, false);
      WOUtil.openWOHazardDrawer(app, page, event, page.name === "schedule"? "slidingwohazard" : "wohazardDrawer");
       page.state.workloading = page.state.transactionProgress = false;
      return;
    }


    const woStatusData = await SynonymUtil.getSynonymDomain(synonymdomainData, 'WOSTATUS', 'INPRG');
    let option = {
      record: event.item,
      parameters: {
        status: woStatusData.value,
        date: currentDateString
      },
      responseProperties: 'status,status_description,status_maxvalue',
      localPayload: {
        status: woStatusData.value,
        status_maxvalue: woStatusData.maxvalue,
        status_description: woStatusData.description
      },
      query: {interactive: false},
      esigCheck: 0
    };
    const esigCheck = app.state.systemProp && app.state.systemProp["maximo.mobile.wostatusforesig"];
    const allowedSignature = esigCheck
      .split(',')
      .map((status) => status.trim());
    const addEsig = allowedSignature.length > 0 &&
    allowedSignature.indexOf(woStatusData.value) > -1;
    // istanbul ignore else
    if (addEsig) {
      option.esigCheck = 1;
    }
    // istanbul ignore if
    if (woStatusData && event.item.woactivity && Device.get().isMaximoMobile) {
      page.state.selectedStatus = woStatusData.value;
      page.state.selectedStatusMaxValue = woStatusData.maxvalue;
      page.state.selectedStatusDescription = woStatusData.description;
      let woTasks = await app.controllers[0].getWoActivity(page, app, event.item);
      option.localPayload["woactivity"] = woTasks;
    }
    await detailDS.invokeAction('changeStatus', option);
    page.state.workloading = page.state.transactionProgress = false;
    await detailDS.forceReload();
  }

  //Only start the timer when useTimerSystemProp = 1
  // istanbul ignore else
  if (useTimerSystemProp && useTimerSystemProp === '1') {
    page.state.workloading = true;
    
    //Open wohazard if not reviewed
    // istanbul ignore else
    if (event.worktype === 'work' && isInProgressAllowed && event.item.wohazardcount > 0 && !splanreviewdate && hazardReviewedReq === '1') {           
      app.toast(label, 'error', null, null, false);
      WOUtil.openWOHazardDrawer(app, page, event, page.name === "schedule"? "slidingwohazard" : "wohazardDrawer");
      page.state.workloading = page.state.transactionProgress = false;
      return;
    }

    let option = {
      objectStructure: `${app.state.woOSName}`,
      parameters: {
        labtrans: {
          transtype: transtype,
          laborcode: labor
        }
      },
      record: event.item,
      responseProperties: 'wonum,status,status_description,status_maxvalue,labtrans{timerstatus,anywhererefid}',
    }

    current.setSeconds(0);    
    
    if (event.action === 'start') {
      // istanbul ignore else
      if (!isValidActiveTimer) {
        app.toast(
          app.getLocalizedLabel(
            'timer_started',
            `Timer already started`
          ),
          'error'
        );
        
        page.state.workloading = page.state.transactionProgress = false;
        return;
      }

      methodAction = 'startTimerStartDate';
      let personInfo = app.client.userInfo;
      let craft = personInfo.labor.laborcraftrate.craft;
      const statusData = await SynonymUtil.getSynonym(synonymdomainData, 'TIMERSTATUS', 'TIMERSTATUS|ACTIVE');
      if (statusData) {
        let anywhererefid = new Date().getTime();
        localPayload = {
          labtrans: [{
            laborcode: labor,
            timerstatus: statusData.value,
            timerstatus_maxvalue: statusData.maxvalue,
            startdatetime: currentDateString,
            startdate: app.dataFormatter.dateWithoutTimeZone(currentDateString),
            starttime: removeSecondsFromTimeString(app.dataFormatter.dateWithoutTimeZone(currentDateString)),
            transtype: transtype,
            transtype_description: transtypeDescription,
            regularhrs: 0,
            anywhererefid: anywhererefid,
            displayname: app.client.userInfo.displayname,
            craftdescription: craft
          }],
          href: event.item.href
        };
        //Update WO status in offline
        // istanbul ignore next
        if (!event.item.starttimerinprg && Device.get().isMaximoMobile) {
          event.item.starttimerinprg = CommonUtil.filterMobileMaxvars('STARTTIMERINPRG', app.findDatasource('defaultSetDs'))[0]?.varvalue;
        }
        // istanbul ignore else
        if (event.item.starttimerinprg === '1' && event.item.status_maxvalue === 'APPR') {
          
          // istanbul ignore if
          if (event.worktype === 'work' && isInProgressAllowed && event.item.wohazardcount > 0 && !splanreviewdate && hazardReviewedReq === '1') {            
            app.toast(label, 'error', null, null, false);
            WOUtil.openWOHazardDrawer(app, page, event, page.name === "schedule"? "slidingwohazard" : "wohazardDrawer");
            page.state.workloading = page.state.transactionProgress = false;
            return;
          }

          const woStatusData = await SynonymUtil.getSynonym(synonymdomainData, 'WOSTATUS', 'WOSTATUS|INPRG');
          // istanbul ignore if
          if (woStatusData) {
            localPayload.status = woStatusData.value;
            localPayload.status_description = woStatusData.description;
            localPayload.status_maxvalue = woStatusData.maxvalue;
          }
          // istanbul ignore if
          if (woStatusData && event.item.woactivity && Device.get().isMaximoMobile) {
            page.state.selectedStatus = woStatusData.value;
            page.state.selectedStatusMaxValue = woStatusData.maxvalue;
            page.state.selectedStatusDescription = woStatusData.description;
            let woTasks = await app.controllers[0].getWoActivity(page, app, event.item);
            localPayload.woactivity = woTasks;
          }
        }
  
        option.parameters.startDateTime = currentDateString;
        option.parameters.anywhererefid = anywhererefid;
        option.parameters.transtype = transtype;
        option.localPayload = localPayload;
  
      }
      else {
        page.state.workloading = page.state.transactionProgress = false;;
        app.toast(
          app.getLocalizedLabel(
            'fail_get_synonym',
            `Can not get the synonym data for TIMERSTATUS`,
            ['TIMERSTATUS']
          ),
          'error'
        );
      }
    } else {
      methodAction = 'stopTimerStartFinishDates';
  
      const activeStatus = await SynonymUtil.getSynonym(synonymdomainData, 'TIMERSTATUS', 'TIMERSTATUS|ACTIVE');
      const statusData = await SynonymUtil.getSynonym(synonymdomainData, 'TIMERSTATUS', 'TIMERSTATUS|COMPLETE');
      // istanbul ignore else
      if (activeStatus && statusData) {
        let anywhererefid;
        let regularHrs;
        await laborDS.initializeQbe();
        laborDS.setQBE('timerstatus', '=', activeStatus.value);
        laborDS.setQBE('laborcode', '=', labor);
        const activeLabor = await laborDS.searchQBE(undefined, true);
        // istanbul ignore if
        if (activeLabor && activeLabor[0]) {
          anywhererefid = activeLabor[0].anywhererefid;
  
          const startDateTimeMoment = app.dataFormatter.convertISOtoDate(activeLabor[0].startdatetime);
          regularHrs = activeLabor[0].regularhrs || Math.abs((current - startDateTimeMoment)) / 3600000;
        }
  
        localPayload = {
          labtrans: [{
            laborcode: labor,
            timerstatus: statusData.value,
            timerstatus_maxvalue: statusData.maxvalue,
            finishdatetime: currentDateString,
            finishdate: app.dataFormatter.dateWithoutTimeZone(currentDateString),
            finishtime: removeSecondsFromTimeString(app.dataFormatter.dateWithoutTimeZone(currentDateString)),
            regularhrs: regularHrs,
            anywhererefid: anywhererefid
          }],
          href: event.item.href
        };
        //DT209005:error BMXAA2569E when timezone is UTC+1
        option.parameters.finishDateTime = app.dataFormatter.dateWithoutTimeZone(currentDateString);
        option.parameters.startDateTime = app.dataFormatter.dateWithoutTimeZone(app.dataFormatter.dateTimeToLocalValue(activeLabor?.[0]?.startdatetime));
        //END DT
        option.parameters.noStopTimerPopup = true;
        option.localPayload = localPayload;
  
      }
      else {
        page.state.workloading = page.state.transactionProgress = false;
        app.toast(
          app.getLocalizedLabel(
            'fail_get_synonym',
            `Can not get the synonym data for TIMERSTATUS`,
            ['TIMERSTATUS']
          ),
          'error'
        );
      }
    }
  
    let responseData = await detailDS.invokeAction(methodAction, option);
    let response = responseData;
  
    // istanbul ignore next
    if (response && Array.isArray(response) && response.length > 0) {
      response = response[0]._responsedata;
    } else if (response && response._responsedata && response._responsedata[0]) {
      response = response._responsedata[0];
    }
  
    // istanbul ignore next
    if (response) {
      if (event.action !== 'start') {
        const schPage = app.findPage("schedule") ||  app.findPage("approvals");
        if (schPage) {
          if (schPage.findPage('schedule')){
            schPage.findPage('schedule').state.woItems = await detailDS.forceReload();
          }else{
            schPage.state.woItems = await detailDS.forceReload();
          }
        }
      }
      if (event.action === 'stop' && event.actionType !== 'travel') {
        app.setCurrentPage({
          name: 'report_work', 
          params: {
            itemhref: event.item.href, 
            wonum: event.item.wonum, 
            istask: event.item.istask,
            wogroup: event.item.wogroup,
            taskid: event.item.taskid
          }
        });
      }

      // Called when Start Button Clicked from Work Order Details Screen
      let workOrderDetailsPage = app.findPage('workOrderDetails');
      if (workOrderDetailsPage) {
        page.state.transactionProgress = true;
        workOrderDetailsPage.state.woItem = await detailDS.forceReload();
      }
      page.state.transactionProgress = false;
      if (event.action === 'start' && (app.findPage('schedule') || app.findPage('approvals')) && app.currentPage.name !== "workOrderDetails") {
        app.currentPage.controllers[0].showWODetail(event.item);
      }
    }
  }
  page.state.workloading = page.state.transactionProgress = false;
}

/**
 * Called by clicking Edit labor button on confirm dialog.
 * @param {Application} app application object
 * @param {String} href href for labor.
 * @param {Object} item labor item
 */
const clickEditLabor = async (app, href, item) => {
  app.setCurrentPage({
    name: 'report_work', 
    params: { 
      itemhref: href, 
      wonum: item.wonum, 
      istask: item.istask,
      wogroup: item.wogroup,
      taskid: item.taskid,
      stopResumeLoadData: true
    }
  });
  app.currentPage.callController('loadAndOpenReportTimeDrawer', {action: 'update', item: item});
};

/**
 * Called by clicking Edit labor button on confirm dialog.
 * @param {Application} app application object.
 * @param {Datasource} detailDS workorder detail datasource.
 * @param {Datasource} laborDS  labor detail datasource.
 */
const clickSendLabTrans = async (app, page, action, detailDS, laborDS, item) => {
  page.state.workloading = true;
  await startStopTimer(app, page, {item, action}, detailDS, laborDS);
};

/**
 * Return value of CONFIRMLABTRANS from MAXVAR, used to show labour approval confirm dialog
 * @param {Application} app application object 
 * @returns {String} "1" or undefined
 */
const getConfirmlabtrans = (app) => {
  // istanbul ignore if
  if (Device.get().isMaximoMobile && !app.state.networkConnected) {
      return CommonUtil.filterMobileMaxvars('CONFIRMLABTRANS', app.findDatasource('defaultSetDs'))[0]?.varvalue;
  }
}

/**
 * Called by clicking Edit labor button on confirm dialog.
 * @param {Application} app application object.
 * @param {Page} page current page object.
 * @param {String} worktype work type for lab trans
 * @param {Datasource} domainDS domain datasource.
 * @param {Datasource} synonymDS synonym datasource.* 
 * @param {Datasource} woDS workorder detail datasource.
 * @param {Datasource} laborDetailDS  labor detail datasource.
 */
const clickStartStopTimer = async (app, page, event, worktype, woDS, laborDetailDS, dialogName) => {

  page.state.transactionProgress = true;
  // check confirmlabtrans when action is stop
  // DT189569: to support show Labor approval dialog in offline mode
  if ((event.action === 'stop' || event.action === 'pause') && ((event.item.confirmlabtrans || getConfirmlabtrans(app)) === '1') ) {
    // show dialog
    await openConFirmLabTimeDialog(app, page, laborDetailDS, event.action, dialogName, event.actionType);
    page.state.transactionProgress = false;
  }
  else {
    let transtype = '';
    let transtypeDescription = '';
    let travelNavigation = '';
    const synonymDS = app.datasources['synonymdomainData'];
    if (worktype === 'work') {
      const transtypeSynonym = await SynonymUtil.getSynonymByOrg(synonymDS,
        'LTTYPE',
        ['WORK'],
        app.client.userInfo.defaultOrg);
      if (transtypeSynonym?.length) {
        transtype = transtypeSynonym[0].value;
        transtypeDescription = transtypeSynonym[0].description;
      }
    } else if (worktype === 'travel') {
      const transtypeSynonym = app.state.defaultTravTrans;
      //istanbul ignore if
      if (transtypeSynonym) {
        transtype = transtypeSynonym.value;
        transtypeDescription = transtypeSynonym.description;
      }
      travelNavigation = app.state.systemProp["mxe.mobile.travel.navigation"];

      if ((woDS.item.coordinate && woDS.item.coordinate.toUpperCase() !== 'XY') && travelNavigation === "1") {
        let geolocationlong = app.geolocation.state.longitude;
        let geolocationlat = app.geolocation.state.latitude;

        let serlong = event.item.serviceaddress.longitudex;
        let serlat = event.item.serviceaddress.latitudey;

        let controllerOption = {
          geolocationlong: geolocationlong,
          geolocationlat: geolocationlat,
          serlong: serlong,
          serlat: serlat,
        };
        app.callController("openNavigation", controllerOption);
      }
    }

    // send start or stop timer 
    await startStopTimer(app, page, event, woDS, laborDetailDS, transtype, transtypeDescription);
  }
}

const functions = {
  computedTimerStatus,
  openConFirmLabTimeDialog,
  startStopTimer,
  clickEditLabor,
  clickSendLabTrans,
  clickStartStopTimer,
  removeSecondsFromTimeString,
  validateActiveTimer,
  stopWorkOnStatusComp
};

export default functions;

import _ from 'lodash';
import { log, Device } from '@maximo/maximo-js-api';
/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/**
 * Return System Property Value 
 * @param {Application} app application object
 * @param {String} systemPropName system property Name.
 */
const getSystemProp = (app, systemPropName) => {
    return app.state.systemProp && app.state.systemProp[systemPropName];
};

/**
 * Return true if system property value is same as expected value else return false 
 * @param {Application} app application object
 * @param {String} systemPropName system property name.
 * @param {String} propValue system property expected value. default value is 1
 */
const checkSystemProp = async (app, systemPropName, propValue = "1") => {
    return app.state.systemProp && app.state.systemProp[systemPropName] === propValue? true : false;
}

/**
 * Return true of false base on allowed property 
 * @param {Application} app application object
 * @param {String} systemPropName system property name for physical Sig.
 * @param {String} statusComp Complete Status name from maximo properties.
 * @param {Boolean} returnType Type of returning value , returnType True will return true/false, returnType false will return 1 or 0
 */
const checkSysPropArrExist = async (app, systemPropName, statusComp, returnType = true) => {
    const sigCheck = await getSystemProp(app, systemPropName);
    const allowedSignature = sigCheck? sigCheck.split(',').map((status) => status.trim()): [];
    const addEsig = allowedSignature.length > 0 && allowedSignature.indexOf(statusComp) > -1;
    if (returnType) {
        return (addEsig) ? true : false;
    } else {
        return (addEsig) ? 1 : 0;
    }
}

/**
 * Return the list of work order status list which is defined in synonymdomain table. 
 * if data already present in state "offlineStatusList" it will prevent repetative calls of synonymdomain
 * @param {app} app application object
 * @param {orgId} orgId Organization Id
 * @param {siteId} siteId Site Id
 */
const getOfflineStatusList = async (app, orgId, siteId) => {
    let filteredDomainValues = [];
    const synonymDomainsDS = app.findDatasource('synonymdomainData');
    
    if (!app.state.offlineStatusList?.length) {
      await synonymDomainsDS.initializeQbe();
      synonymDomainsDS.setQBE('domainid', 'WOSTATUS')
      synonymDomainsDS.setQBE('orgid', orgId);
      synonymDomainsDS.setQBE('siteid', siteId);

      filteredDomainValues = await synonymDomainsDS.searchQBE();

      // istanbul ignore next
      if (!app.state.offlineStatusList?.length && filteredDomainValues && filteredDomainValues.length < 1) {
        synonymDomainsDS.setQBE('domainid', 'WOSTATUS');
        synonymDomainsDS.setQBE('orgid', '=', orgId);
        synonymDomainsDS.setQBE('siteid', '=', 'null');
        filteredDomainValues = await synonymDomainsDS.searchQBE();

        // istanbul ignore next
        if (!app.state.offlineStatusList?.length && filteredDomainValues && filteredDomainValues.length < 1) {
          synonymDomainsDS.setQBE('domainid', 'WOSTATUS');
          synonymDomainsDS.setQBE('orgid', '=', 'null');
          synonymDomainsDS.setQBE('siteid', '=', 'null');
          filteredDomainValues = await synonymDomainsDS.searchQBE();
        }
      }
      // istanbul ignore else
      if (!app.state.offlineStatusList?.length) {
        app.state.offlineStatusList = filteredDomainValues;
      }
      synonymDomainsDS.clearQBE();
    }
    return app.state.offlineStatusList;

    
}


  /**
   * Get systemproperties and store in a state.
   */
  const getTravelSystemProperties = async (app) => {   
    if (app.client && typeof app.client.getSystemProperties === 'function'){
      app.state.systemProp = await app.client.getSystemProperties('mxe.mobile.travel.prompt,mxe.mobile.travel.radius,mxe.mobile.travel.navigation,maximo.mobile.usetimer,maximo.mobile.statusforphysicalsignature,maximo.mobile.completestatus,mxe.mobile.navigation.windows,mxe.mobile.navigation.android,mxe.mobile.navigation.ios,maximo.mobile.allowmultipletimers,maximo.mobile.safetyplan.review,maximo.mobile.gotoreportwork');
    }    
  }

/**
 * Return List of allowed status based on current status of work order
 * @param {statusList} statusList list of offline status
 * @param {event} event datasource event work order object
 * @param {flowControlled} flowControlled work order flow controlled flag
 */

const getOfflineAllowedStatusList = async (app, event) => {
    const statusList = await getOfflineStatusList(app, event.item.orgid, event.item.siteid);
    const statusArr = [];
    statusList.forEach((element) => {
        const isValidTransition = isAllowedStatus(event.item.status_maxvalue, element.maxvalue);
        if (element.value && element.value !== event.item.status && isValidTransition) {
            statusArr.push({
                id: element.value,
                value: element.value,
                description: element.description,
                defaults: element.defaults,
                maxvalue: element.maxvalue,
                _bulkid: element.value
            });
        }
    });
    return statusArr;
}

  /**
   * In system properties we would get list of flag on which we have to ask for eSigCheck
   * if current status matches in list we would pass esigCheck 1 and on based of it graphite component
   * will handle to show prompt of esig
   * @returns 1 or 0 (boolean numeric value)
   */
  const checkEsigRequired = (app, page, status) => {
    const esigCheck = app.state.systemProp && app.state.systemProp["maximo.mobile.wostatusforesig"];
    const allowedSignature = esigCheck? esigCheck
      .split(',')
      .map((status) => status.trim()): [];
      const addEsig = allowedSignature.length > 0 &&
      allowedSignature.indexOf(page.state.selectedStatus) > -1;
    return (addEsig) ? true : false;
  }

/** 
 * This method checks status transition based on internal value.
 * @param { from } from from status
 * @param { to } to to status
*/
const isAllowedStatus = (from, to) => {
    let transitionMatrix = {
      WAPPR: ['COMP','WAPPR','CAN','INPRG','WSCH','CLOSE','WMATL','APPR'],
      WPCOND: ['COMP','WAPPR','CAN','INPRG','WSCH','CLOSE','WMATL','APPR'],
      APPR: ['COMP','WAPPR','CAN','INPRG','WSCH','CLOSE','WMATL','APPR'],
      WSCH: ['COMP','WAPPR','CAN','INPRG','WSCH','CLOSE','WMATL','APPR'],
      WMATL: ['COMP','WAPPR','CAN','INPRG','CLOSE','WMATL'],
      INPRG: ['COMP', 'WAPPR','INPRG','CLOSE','WMATL'],
      COMP: ['COMP', 'CLOSE'],
      CLOSE: ['CLOSE'],
      CAN: ['CAN']
    };

    if (!transitionMatrix[from] || transitionMatrix[from].indexOf(to) < 0) {
      return false;
    } else {
      return true;
    }
}


/**
 * Validate asset barcode
 * @param {string} selectedStatus - Status of the asset
 * @param {array} applicableStatus - Array of status that is applicable to the current operation
 * @returns {boolean} - True if the barcode is valid, otherwise false
 */
const checkScanRequired = async(selectedStatus, applicableStatus = ['INPRG', 'COMP']) => {
  // istanbul ignore else
  if (applicableStatus.includes(selectedStatus)) {
    return true;
  }
  return false;
}

/**
 * Returns true if the work order is not assigned or delivered
 * @param {Object} item The work order object
 * @returns {boolean} True if the work order is not assigned or delivered
 */
const canInteractWorkOrder = (item, app) => {
  const isAssignmentEnabled = app.checkSigOption(`${app.state.woOSName}.MANAGEASSIGNMENTSTATUS`);
  // istanbul ignore else
  if(item?.status_maxvalue === 'COMP'|| (!item?.hasOwnProperty('assignment') || !isAssignmentEnabled) || (app.client?.userInfo?.labor?.laborcode !== item?.assignment?.[0]?.laborcode)) {
    return true;
  }
  const acceptLabel = app.getLocalizedLabel('accepted', 'Accepted').toUpperCase();
  const response =  (item?.assignment?.[0]?.status?.toUpperCase() === acceptLabel) ? true : false;
  return response;
}

/**
 * Marks the status of a work order as "Accepted".
 * @param {Object} app The GlideApplication object
 * @param {Object} page The current page object
 * @param {Object} ds The datasource object
 */
const markStatusAssigned = async (app,page,ds, listDS) => {
  const assignmentDS = ds.getChildDatasource('assignment',ds.item);
  const acceptLabel = await app.getLocalizedLabel('accepted', 'Accepted').toUpperCase();
  const records = await assignmentDS.load();
  // istanbul ignore else
  if (records.length>0) {
    records[0].status=acceptLabel;
    records[0].status_maxvalue=acceptLabel;
    records[0].status_description=acceptLabel;
  }
  try {
    await assignmentDS.save();
    const message = `Assignment ${ds.item.wonum} was assigned to you.`;
    app.toast(
      app.getLocalizedLabel(
        'accepted_wo',
        message,
        [ds.item.wonum]
      ),
    'success');
  } catch (error) {
    log.t("Assigned", "Failed assignment rejection : work order --> " + ds?.item?.wonum + "--> " + error);
    const message = `Assignment ${ds?.item?.wonum} could not be assigned to you.`;
    app.toast(
      app.getLocalizedLabel(
        'accepted_wo_failure',
        message,
        [ds.item?.wonum]
      ),
    'error');
  }
  await ds.forceReload();
  await listDS.forceReload();
  return;
}

/**
 * Marks the status of a work order as "Accepted".
 * @param {Object} app The GlideApplication object
 * @param {Object} page The current page object
 * @param {Object} ds The datasource object
 */
const removeAssigned = async (app,page,ds) => {
  const rejectLabel = await app.getLocalizedLabel('rejected', 'Rejected');

  const woDetailDs = app.findDatasource("wodetails");
  // istanbul ignore else
  if (!Device.get().isMaximoMobile || !woDetailDs.item) {
    await woDetailDs.forceReload();
  }
  const  assignmentDS = woDetailDs.getChildDatasource('assignment',woDetailDs.item);
  const records = await assignmentDS.load();
  // istanbul ignore else
  if (records.length>0) {
    records[0].status = rejectLabel;
    records[0].status_maxvalue = 'WAITASGN';
    records[0].status_description = rejectLabel;
    records[0].laborcode = null;
  }
  try {
    await assignmentDS.save();
    const message = `Assignment ${woDetailDs.item.wonum} was rejected and returned to the dispatcher.`;
    app.toast(
      app.getLocalizedLabel(
        'rejected_wo',
        message,
        [woDetailDs.item.wonum]
      ),
    'success');
  } catch (error) {
    log.t("Reject", "Failed assignment rejection : work order --> " + woDetailDs.item?.wonum + "--> " + error);
    const message = `Assignment ${woDetailDs.item?.wonum} could not be rejected. Resync data and try again.`;
    app.toast(
      app.getLocalizedLabel(
        'rejected_wo_failure',
        message,
        [woDetailDs.item?.wonum]
      ),
    'error');
  }
}

 // Generated by WCA for GP
/**
 * Reset state of Datasource
 */
const _resetDataSource = (ds) =>{
  ds.clearState();
  ds.resetState();
}

/**
 * To filter mobile maxvar for a given varname in order of SITE, ORG, SYSTEM hierarchy
 * @param {varname} of maxvars for mobile
 * @param {defDS} is defaultSetDs - Datasource
 */
const filterMobileMaxvars = (varname, defDS) => {
  const typeHierarchy = ["SITE", "ORG", "SYSTEM"];
  let MaxVar = [];
  // istanbul ignore else
  if (defDS?.items?.length) {
    MaxVar = defDS.items[0]?.mobilemaxvars
      ?.filter((item) => item.varname === varname && typeHierarchy.includes(item.vartype))
      .sort((a, b) => {
        return typeHierarchy.indexOf(a.vartype) - typeHierarchy.indexOf(b.vartype);
      });
  }
  return MaxVar;
}


/**
 * Set throttled function to set Geo state
 * @param {Object} geolocationState object
 */
// istanbul ignore next
const setGeoState = _.throttle((geolocationState) => {
  geolocationState.enabled = !(geolocationState && ((geolocationState.latitude === 0 && geolocationState.longitude === 0) || geolocationState.hasError));
}, 500);

/**
 * Set Enabled or Disabled state based on application geolocation
 * @param {app} app application object
 */
// istanbul ignore next
const setGeoLocationState = (app) => {
  const geolocation = app.geolocation;
  const travelPrompt = +getSystemProp(app, 'mxe.mobile.travel.prompt');
  // istanbul ignore else
  if (geolocation && travelPrompt) {
    geolocation.on("geolocation-updated", () => setGeoState(geolocation.state));
    geolocation.updateGeolocation({enableHighAccuracy: true});
  }
};

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
 * This function takes in an app object and an event object as input, and sets the geolocation state based on the action property of the event object.
 * @param {Object} app - The app object represents the current state of the Alexa skill.
 * @param {Object} event - The event object represents the specific event that triggered the function.
 */
const callGeoLocation = (app, action) => {
  // istanbul ignore else
  if(action === 'stop' || action === 'pause') {
    setGeoLocationState(app);
  }
}
/**
 * Common Function to open a sliding-drawer dialog to show Work Log for the Work Order at Schedule & WorkOrderDetails Page
 * @param {Application} app The application
 * @param {page} page - page name
 * @param {event} event - event containing information about current item
 * @param {workLogDS} is workLogDS - woDetailsWorklogDs from WorkOrderDetails Page & woWorklogDs from Schedule Page
 * @param {drawerName} is drawer names for WorkOrderDetails & Schedule Page
 */
const openWorkLogDrawer = async (app, page, event, workLogDS, drawerName) => {
  // Initialized Loader on Button when Work Log Drawer Icon Clicked
  page.state.chatLogLoading = true;
  const orgId = app.client?.userInfo?.insertOrg;
  const siteId = app.client?.userInfo?.insertSite;
  //istanbul ignore next
  if (page.name === "schedule") {
    page.state.currentItem = event.item.wonum;
    const wodetails = page.datasources["wodetails"];
    //istanbul ignore else
    if (!event?.item?.href) {
      page.state.canloadwodetails=false;
		}
    await wodetails.load({ noCache: true, itemUrl: event.item.href });
    page.state.canloadwodetails=true;
  }

  await workLogDS.load().then((response) => {
    page.state.chatLogGroupData = response;
  });

  // istanbul ignore if
  if (Device.get().isMaximoMobile && workLogDS.options.query.relationship) {
    //Get schema of childdatasource.
    workLogDS.schema =
      workLogDS.dependsOn.schema.properties[
        Object.entries(workLogDS.dependsOn.schema.properties)
          .filter(
            (item) =>
              item[1].relation &&
              item[1].relation.toUpperCase() ===
              workLogDS.options.query.relationship.toUpperCase()
          )
          .map((obj) => obj[0])[0]
      ].items;
  }

  let schemaLogType = workLogDS.getSchemaInfo("logtype");
  let schemaDescription = workLogDS.getSchemaInfo("description");
  let logTypeValue;
  //istanbul ignore else
  if (schemaLogType) {
    logTypeValue = schemaLogType.default?.replace(/!/g, "");
  }
  // Filter Logtype data from synonydomain Datasource which passed in Chat-log Component
  const synonymDs = app.datasources["synonymdomainData"];
  let filteredLogTypeList;
  // Initalized QBE with Org and Site
  synonymDs.clearState();
  await synonymDs.initializeQbe();
  synonymDs.setQBE("domainid", "=", "LOGTYPE");
  synonymDs.setQBE('orgid', orgId);
  synonymDs.setQBE('siteid', siteId);
  filteredLogTypeList = await synonymDs.searchQBE();

  // istanbul ignore else
  if (filteredLogTypeList.length < 1) {
    synonymDs.setQBE('siteid', '=', 'null');
    filteredLogTypeList = await synonymDs.searchQBE(); 
  }

  // istanbul ignore else
  if (filteredLogTypeList.length < 1) {
    synonymDs.setQBE('orgid', '=', 'null');
    filteredLogTypeList = await synonymDs.searchQBE();
  }

  page.state.workLogItem = event.item;
  page.state.defaultLogType = "!CLIENTNOTE!";

  const logItem = synonymDs.items.find((item) => {
    return item.maxvalue === logTypeValue && item.defaults;
  });

  const logValue = logItem ? `!${logItem.value}!` : schemaLogType.default;

  page.state.defaultLogType = page.state.initialDefaultLogType = logValue;

  // istanbul ignore else
  if (schemaDescription) {
    page.state.chatLogDescLength = schemaDescription.maxLength;
  }

  // Stop Loading of Chat Log Icon touchpoint once all data loaded
  page.state.chatLogLoading = false;

  // Open Work Log Drawer once all Data Loaded
  page.showDialog(drawerName);
}

/**
 * Validates the meter reading form.
 * @param {Object} validateEvent - The validate event object.
 */
  //istanbul ignore next
  const meterValidate = (validateEvent,dialoBox,page) => {
    validateEvent.failed = !page.state.disableSave;
    if (!page.state.disableSave){
      page.showDialog(dialoBox);
    }  
  }

  /**
   * @description Validate Data Sheet
   * @param {App} app 
   * @param {Page} page 
   * @param {Object} workorder 
   * @param {Object} methodConfig 
   */



/**
 * @description Validate Data Sheet
 * @param {App} app - The app instance
 * @param {Page} page - The current page instance
 * @param {Object} workorder - The current workorder object
 * @param {Object} methodConfig - The method configuration object
 * @returns {Promise<boolean>} A promise that resolves to a boolean value indicating whether the validation was successful or not
 */
const validateDataSheet = async(app, page, workorder, methodConfig = {}, showDialog = true) => {
  const allowedDatasheetStatus = ['PASS', 'FAIL', 'ACTION', 'ADJREQD', 'ADJTOIMP', 'BROKEN', 'INSPECT', 'LIMITEDUSE', 'MISSING', 'OLIM', 'WARNING'];
  app.state.disableToolWarning = false;
  
  const woDetailscalibration = app.findDatasource('woDetailCalibration');
  const pluscWoDs = app.findDatasource("pluscWoDs");
  
  // istanbul ignore else
  if (woDetailscalibration?.item?.wonum !== workorder?.wonum) {
    // Clear and Load WorkOrder to CalibratiowoDetailCalibrationn Datasource
    await woDetailscalibration?.clearState();
    await woDetailscalibration?.load({noCache:true, itemUrl: workorder.href});
  
    // After load work order details, clear and load child datasheets too
    await pluscWoDs?.clearState();
    await pluscWoDs.load();
  }

  // Validate Incomplete Datasheet
  let anyDataSheetSuccess = false;
  const incompleteDatasheet = pluscWoDs?.items.filter((datasheet) => {
    if (datasheet?.required && (!datasheet?.asfoundcalstatus || !datasheet?.asleftcalstatus)) {
      return true;
    } else {
      // istanbul ignore else
      if (datasheet?.required && allowedDatasheetStatus.includes(datasheet.asfoundcalstatus) && allowedDatasheetStatus.includes(datasheet.asleftcalstatus)) {
        anyDataSheetSuccess = true;
      }
      return false;
    }
  });

  app.state.disableToolWarning = !anyDataSheetSuccess;

  // Open Warning if Datasheet Incomplete
  // istanbul ignore else
  if (incompleteDatasheet?.length) {
    // Set Parameter for Calibration Operations
    app.state.calibParameter = { app: app, page: page, workorder: workorder, ...methodConfig};
    // Show Datasheet Warning Dialog
    // istanbul ignore next
    if (showDialog) {
      app.showDialog('dataSheetWarnings');
    }
    return false;  
  }
  
  return true;
}


/**
 * @description Validate actual tools availability
 * @param {object} app - The app object
 * @param {object} page - The current page object
 * @param {object} workorder - The current workorder object
 * @param {object} methodConfig - The method configuration object
 * @returns {boolean} - True if validation passes, false otherwise
*/
const validateActualTools = async(app, page, workorder, methodConfig = {}, showDialog = true) => {
  // Validate Tools
  // istanbul ignore else
  if (workorder?.pluscvaltool === '0' || workorder?.actualtoolcount > 0) {
    return true;  
  }

  // Set Parameter for Calibration Operations
  app.state.calibParameter = { app: app, page: page, workorder: workorder, ...methodConfig};
  // Show Tool Warning 
  // istanbul ignore next
  if (showDialog) {
    if (workorder?.pluscvaltool === '1') {
      app.showDialog('toolsWarnings');
    } else {
      app.showDialog('toolsError');
    }  
  }
  return false;
}
// use below variable to share data app wide, note it's const so you can push key name but don't redeclare it
// To avoid potential conflicts with property names, all developers using sharedData must declare their property names within this sealed object.
const sharedData = Object.seal({
  navigatedFromWOPage: false,
  clickedWo: false,
  approvalRequest: false
})

const functions = {
    getSystemProp,
    checkSystemProp,
    checkSysPropArrExist,
    getOfflineStatusList,
    getOfflineAllowedStatusList,
    isAllowedStatus,
    checkEsigRequired,
    getTravelSystemProperties,
    checkScanRequired,
    canInteractWorkOrder,
    markStatusAssigned,
    removeAssigned,
    _resetDataSource,
    filterMobileMaxvars,
    setGeoLocationState,
    openWorkLogDrawer,
    meterValidate,
    validateDataSheet,
    validateActualTools,
    callGeoLocation,
    sharedData
};
  
export default functions;
  
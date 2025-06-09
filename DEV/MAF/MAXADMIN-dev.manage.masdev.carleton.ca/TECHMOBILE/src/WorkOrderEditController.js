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

import {log, Device} from "@maximo/maximo-js-api";
import SynonymUtil from './utils/SynonymUtil';
import WOCreateEditUtils from './utils/WOCreateEditUtils';
const TAG = "WorkOrderEditController";

class WorkOrderEditController {

  /**
   * defines fields to implement onCustomSaveTransition() 
   * which is to avoid defaultSaveTransition defined at framework level
   * and uses save method implemented in controller itself.
   */
  constructor() {
    this.onUpdateDataFailed = this.onUpdateDataFailed.bind(this);
    this.saveDataSuccessful = true;
    this.callDefaultSave = true;
    this.validLocationValue = null;
    this.validAssetValue = null;
  }

  pageInitialized(page, app) {
    log.t(TAG, "Work order edit Page Initialized");
    this.app = app;
    this.page = page;
    this.page.state.isLocationAssetFocus = false;
  }

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  /**
   * This function is called when the user clicks the "Close" button on the confirmation dialog.
   * It sets the asset number and location values in the dsCreateWo object based on the selected options.
   */
  onUserConfirmationClose() {
    const dsWoedit = this.app.findDatasource("dsWoedit");
    WOCreateEditUtils.onUserConfirmationClose(this, dsWoedit);
  }
  
  /**
   * If we get the data from the session then will fetch the data from the session and will call the loadRecord
   * If will get workorder data from the page params then will fetch the data from page params and will call the loadRecord
   */
  async pageResumed(){
    this.app.state.pageLoading = true;
    this.page.state.useConfirmDialog = true;
    this.page.state.saveDisable  = false;
    this.page.state.disableButton = false;
    this.page.state.zRefDisable = false;
    this.page.state.isMobile = Device.get().isMaximoMobile;
    const savedWorkorder=sessionStorage.getItem('woedit_workorder');
    WOCreateEditUtils.loadYRefData(this.app,this.page);
    /* istanbul ignore if  */
    if(this.page?.params?.wo){
      await this.loadRecord(this.page?.params?.wo);
    }else if(savedWorkorder){
      await this.loadRecord(JSON.parse(savedWorkorder));
    }
  }

  /**
   * Function to load edit WorkOrder datasource..
   * @param {*} workorder
   */
  async loadRecord(workorder) {
    sessionStorage.removeItem('woedit_workorder');
    // Reset Error State
    this.page.state.readOnlyState = false;
    this.page.state.errorMessage = "";
    this.page.state.linearAssetAvailable=false;

    this.page.state.pageTitle = this.app.getLocalizedLabel('edit_work_order_label', 'Edit work order');
    this.page.state.followupWOCreated = false;
    if (this.page.params.followup) {
      this.page.state.pageTitle = this.app.getLocalizedLabel('create_followup_label', 'Create follow-up WO');
      let newWods = this.page.datasources["newWorkOrderds"];
      newWods.clearState();
      newWods.resetState();
      await newWods.addNew();
    }
    this.page.state.title = this.page.state.pageTitle;
    let dsWoedit = this.page.datasources["dsWoedit"];
    let dsWoEditSetting = this.app.findDatasource("wpEditSettingDS");
    let woEditResource = this.app.findDatasource("woDetailResource");
    if(Device.get().isMaximoMobile) {
			await woEditResource.forceReload();
		}
    let schema = woEditResource.getSchema();
    if (this.app.state.incomingContext && this.app.state.incomingContext.page === "workOrderDetails" && this.app.state.incomingContext.assetnum) {
      schema=JSON.parse(sessionStorage.getItem("woDetailResource_schema"));
      sessionStorage.removeItem('woDetailResource_schema');
      
      dsWoEditSetting.setSchema(JSON.parse(sessionStorage.getItem("dsWoEditSetting_schema")));
      sessionStorage.removeItem('dsWoEditSetting_schema');
    }
    if (this.page.params.followup) {
      this.page.state.useConfirmDialog = true;
    }
    dsWoedit.setSchema(schema);

    await dsWoEditSetting.initializeQbe();
    // in case workorder edit fails it doesn't finds orgid in that case have added fallback case
    const orgId = workorder.orgid || this.app.client.userInfo.insertOrg
    dsWoEditSetting.setQBE('orgid', '=', orgId);
    dsWoEditSetting.setQBE('status', '=', workorder.status_maxvalue);
    await dsWoEditSetting.searchQBE();

    let workorderData = [];
    /* istanbul ignore if  */
    if (workorder) {
      if (!this.page.params.followup) {
        this.page.state.pageTitle = this.app.callController('updatePageTitle', {page: this.page, label: 'edit_work_order', labelValue: 'Edit work order'});
      }
      let attributes= dsWoedit.baseQuery.select.split(',');
      let obj={};
      attributes.forEach((element) => {
        if (element === 'worktype') { 
          workorder[element] = workorder[element] || '';
          this.page.state.worktype = workorder[element];
        }
        
        /* istanbul ignore if  */
        if(this.page.params.followup && !(this.app.state.incomingContext && this.app.state.incomingContext.page === "workOrderDetails" && this.app.state.incomingContext.assetnum)) {
          if (element === 'schedstart' || element === 'schedfinish') {
            workorder[element] = '';
          }

          if (element === 'estdur') {
            workorder[element] = 0;
          }
        }
        obj[element] = workorder[element];
           /* istanbul ignore next */
           let linearAsset =this.app.state.linearinfo;

           if (linearAsset) {
             obj['endmeasure'] = linearAsset.endmeasure;
             obj['startmeasure'] = linearAsset.startmeasure;
             obj['startyoffsetref'] = linearAsset.startyoffsetref;
             obj['endyoffsetref'] = linearAsset.endyoffsetref;
             obj['startzoffsetref'] = linearAsset.startzoffsetref;
             obj['endzoffsetref'] = linearAsset.endzoffsetref;
             obj['startyoffset'] = linearAsset.startyoffset;
             obj['startzoffset'] = linearAsset.startzoffset;
             obj['endyoffset'] = linearAsset.endyoffset;
             obj['endzoffset'] = linearAsset.endzoffset;
             obj['endfeaturelabel'] = linearAsset.endfeaturelabel;
             obj['startfeaturelabel'] = linearAsset.startfeaturelabel;
             obj['startoffset'] = linearAsset.startoffset;
             obj['endoffset'] = linearAsset.endoffset;
           }     
         });
      workorderData.push(obj);
    }
      /* istanbul ignore next */
      if (workorder?.linearrelated?.[0] || this.page.state.assetLinear) {
        await this.setasseteatureLookupDs(this.app, workorder.assetnum);
      }
      const linearAsset =this.app.state.linearinfo;
      /* istanbul ignore if */
      if(linearAsset?.startfeaturelabel){
        this.page.state.startFeatureMeasure = await this.findFeatureMeasure(linearAsset.startfeaturelabel);
       }
      /* istanbul ignore next */
       if(!(linearAsset?.startfeaturelabel)){
        this.page.state.startOffsetReadOnly = true;
       }else{
        this.page.state.startOffsetReadOnly = false;
       }
      /* istanbul ignore if */
      if(linearAsset?.endfeaturelabel){
        this.page.state.endFeatureMeasure = await this.findFeatureMeasure(linearAsset.endfeaturelabel);
      }
      /* istanbul ignore next */
      if(!(linearAsset?.endfeaturelabel)){
        this.page.state.endOffsetReadOnly = true;
       }else{
        this.page.state.endOffsetReadOnly = false;
       }
      
    this.page.state.workorderData = workorderData;
    dsWoedit.setSchema(this.page.params.woSchema);
    await dsWoedit.load({ src: workorderData, noCache: true });
    this.readOnlyFields(dsWoedit);

          /* istanbul ignore else */
        if (this.app.datasources.assetLookupDS?.item?.assetnum === workorder?.assetnum) {
          await this.setLinearState(this.app.datasources.assetLookupDS.item.islinear);
          this.page.state.assetStartMeasure = this.app.datasources.assetLookupDS.item?.startmeasure;
          this.page.state.assetEndMeasure = this.app.datasources.assetLookupDS.item?.endmeasure;
        }
        else {
          let assetLookupDS = this.app.findDatasource('assetLookupDS');
          await assetLookupDS?.initializeQbe();
          assetLookupDS.setQBE("assetnum", "=", workorder.assetnum);
          await assetLookupDS.searchQBE();
          assetLookupDS.setQBE("siteid", "=", this.app.client.userInfo.defaultSite);
          await assetLookupDS.searchQBE();
          await this.setLinearState(this.app.datasources.assetLookupDS.item.islinear);
          this.page.state.assetStartMeasure = this.app.datasources.assetLookupDS.item?.startmeasure;;
          this.page.state.assetEndMeasure = this.app.datasources.assetLookupDS.item?.endmeasure;
          assetLookupDS.clearQBE();
        }   
 
    await WOCreateEditUtils.resetDataSource(this.app,'assetLookupDS');
    await WOCreateEditUtils.resetDataSource(this.app,'locationLookupDS');

    if (this.app.state?.incomingContext?.page === "workOrderDetails" && this.app.state?.incomingContext?.assetnum) {
      this.setIncomingContext();
    }
    this.app.state.pageLoading = false;
  }
  //This method used to validate if asset is linear will update page state accordingly
  async setLinearState(validate){
    this.page.state.assetLinear = validate;
  }
    /**
   * Function to open WorkType lookup with preselected item
   */
    async openWorkTypeLookup(evt) {
      let defOrg = evt.item.orgid || this.app.client.userInfo.insertOrg;
      let typeDs = this.app.findDatasource("dsworktype");
      // istanbul ignore next
      if (typeDs && defOrg) {
        typeDs.clearState();
        // istanbul ignore next
        if (!this.page.state.worktype) {
          typeDs.clearSelections();
          const selectedItem = typeDs.items.find(item => item.worktype === this.page.state.worktype);
          if (selectedItem) {
            typeDs.setSelectedItem(selectedItem, true);
          }
        }  
        this.page.showDialog("workTypeLookup");
        this.page.state.dialogOpened = true;
      }
    }
  /**
   * Function to return Asset and location descriptionn of a work order
   */
  getAssetLocDesc(woAssetLocNum, woAssetLocDescription) {
    let assetLocationDesc = null;
    if (woAssetLocDescription) {
      assetLocationDesc = woAssetLocNum + ' ' + woAssetLocDescription;
    } else {
      assetLocationDesc = woAssetLocNum;
    }
    return assetLocationDesc;
  }

  /**
   * This function called when click on any item in worktype lookup
   * @param {*} event 
   */
  // istanbul ignore next
  async selectWorkType(event){
    WOCreateEditUtils.selectWorkType(this.page, 'dsWoedit', event.worktype);
  }

  /**
   * Function to update work order
   * @param {event} event 
   */
  async updateAndSaveWorkOrder(event) {
    this.page.state.saveInProgress = true;
    if(this.page.state.editAssetsLocation) {
      this.page.state.updateWorkorderItem = event;
      this.page.state.saveInProgress=true;
      /* istanbul ignore else  */
      if (this.page.state.isLocationAssetFocus) {
        return;
      }
    }
    
    this.page.state.isLocationAssetFocus = false;
    
    let dsWoedit = event.page.datasources["dsWoedit"];
    /* istanbul ignore else */
    if(this.page.state.isMobile) {
      await WOCreateEditUtils.setPriorityFailureCode(this.app, dsWoedit);
    }
  
    if (event.page.params.followup) {
      await this.createFollowupWo(event);
    } else {
      await this.preparePayload(dsWoedit);
    }

    this.page.state.saveInProgress = false;
  }

  /**
   * Prepare the payload
   *  Reflect.deleteProperty:-  It deletes a property from an object. It same as delete operator
   * */
     async preparePayload(dsWoedit){
      let workorder = dsWoedit.item ? { ...dsWoedit.item } : {};
      let dataToUpdate = { ...workorder };
      let linearAsset = this.app?.findDatasource("linearAsset");

    
      Object.keys(dataToUpdate).forEach(function (key) {
        if (
          dsWoedit.schema &&
          dsWoedit.schema.required &&
          dsWoedit.schema.required.includes(key) &&
          !dataToUpdate[key]
        ) {
          delete dataToUpdate[key];
        }
      });

      delete dataToUpdate.locationnum; 
      delete dataToUpdate.workorderid;
      delete dataToUpdate.wonum;

      let woEditResource = this.app.findDatasource("woDetailResource");
      let parentWo = woEditResource.item;
      //Setting the interactive to false on the basis isMobile
      woEditResource.dataAdapter.options.query.interactive = this.page.state.isMobile ? 0 : 1;
      // istanbul ignore next
      if (dataToUpdate) {
        let workAsset =
          woEditResource.item && woEditResource.item.assetnum
            ? woEditResource.item.assetnum
            : undefined;
        let workLocation =
          woEditResource.item && woEditResource.item.locationnum
            ? woEditResource.item.locationnum
            : undefined;

        let attributes = [];
        let responseProps = "";
        if (dsWoedit.baseQuery) {
          attributes = dsWoedit.baseQuery.select.split(",");
          responseProps = dsWoedit.baseQuery.select;
        }
        let localPayload = {};
        attributes.forEach((element) => {
          //DT208126 Maximo Mobile-Error is retained even after the record is corrected
          if (workorder[element] === null || workorder[element] === '') {
            workorder[element] = undefined;
          }
          //END OF DT
          localPayload[element] = workorder[element];
        });
        let parentLinearData;
        /* istanbul ignore next */
        if (linearAsset?.item) {
          parentLinearData = linearAsset.item;
        }
        //let linearAssetSrc = [];
       
        if (this.page.state.assetLinear) {
          let multiassetlocci = {
            startyoffsetref: workorder.startyoffsetref || parentLinearData?.startyoffsetref,
            assetnum: workorder.assetnum,
            endyoffsetref: workorder.endyoffsetref || parentLinearData?.endyoffsetref,
            startzoffsetref: workorder.startzoffsetref || parentLinearData?.startzoffsetref,
            endzoffsetref: workorder.endzoffsetref || parentLinearData?.endzoffsetref,
            startoffset: workorder.startoffset ,
            startzoffset: workorder.startzoffset || parentLinearData?.startzoffset,
            endzoffset: workorder.endzoffset || parentLinearData?.endzoffset,
            startyoffset: workorder.startyoffset || parentLinearData?.startyoffset,
            endyoffset: workorder.endyoffset || parentLinearData?.endyoffset,
            endoffset: workorder.endoffset,
            startmeasure: workorder.startmeasure,
            endmeasure: workorder.endmeasure,
            startassetfeatureid: workorder.startassetfeatureid || await this.findAssetStartAndEndMeasure(workorder.startfeaturelabel,"startassetfeatureid",workorder),
            endassetfeatureid: workorder.endassetfeatureid || await this.findAssetStartAndEndMeasure(workorder.endfeaturelabel,"endassetfeatureid",workorder),
            startfeaturelabel: workorder.startfeaturelabel || workorder.startoffset?(workorder.startfeaturelabel ? workorder.startfeaturelabel : parentLinearData?.startfeaturelabel) : ""  ,
            endfeaturelabel: workorder.endfeaturelabel || workorder.endoffset?(workorder.endfeaturelabel ? workorder.endfeaturelabel : parentLinearData?.endfeaturelabel) : "",
            isprimary: 1,
            siteid: woEditResource.item.siteid,
          //  multiid: parentLinearData?.multiid
          };
          /* istanbul ignore next */
          woEditResource.item['multiassetlocci'] = multiassetlocci;
          dataToUpdate['multiassetlocci'] = multiassetlocci;
          localPayload.multiassetlocci = multiassetlocci;
          //linearAssetSrc = [multiassetlocci];
        }  

        let option = {
          responseProperties: responseProps
        };
        if(dataToUpdate.failuredescription) {
          delete dataToUpdate.failuredescription
        }
        if(dataToUpdate.failurelistid) {
          delete dataToUpdate.failurelistid
        }
        
        if (workorder.assetnum !== workAsset){
          dataToUpdate.assetnum = workorder.assetnum ? workorder.assetnum : '';
          localPayload.assetnum = dataToUpdate.assetnum ? dataToUpdate.assetnum : '';
          localPayload.assetnumber = dataToUpdate.assetnum ? dataToUpdate.assetnum : '';
          localPayload.assetdesc = dataToUpdate.assetnum ? workorder.assetdesc : '';

          if (!dataToUpdate.assetnum) {
            localPayload.asset = [
              {
                _deleted: true,
              },
            ];
          }
         } else {
         Reflect.deleteProperty(dataToUpdate, 'assetnum');
         Reflect.deleteProperty(localPayload, 'assetnum');
         Reflect.deleteProperty(localPayload, 'assetnumber');
         Reflect.deleteProperty(localPayload, 'assetdesc');
        }
        //If locationnum changed include in the update, if not, remove it 
      if (workorder.locationnum !== workLocation) {
        dataToUpdate["location"] = workorder.locationnum ? workorder.locationnum : '';
        dataToUpdate["locationdesc"] = workorder.locationnum ? workorder.locationdesc : '';
        localPayload.locationnum = dataToUpdate["location"] ? dataToUpdate["location"] : '';
        localPayload.locationdesc = dataToUpdate["location"] ? workorder.locationdesc : '';
      } else {
        Reflect.deleteProperty(dataToUpdate, 'location');
        Reflect.deleteProperty(dataToUpdate, 'locationdesc');
        Reflect.deleteProperty(localPayload, 'locationnum');
        Reflect.deleteProperty(localPayload, 'locationdesc');
      }
        option.localPayload = localPayload;
        //  dataToUpdate._action = 'change';
        if( this.callDefaultSave ) {
          this.page.state.useConfirmDialog = false;
        }
        this.saveDataSuccessful = true;
        woEditResource.on('update-data-failed', this.onUpdateDataFailed);

        //Do not go for update if there is any client side error
        if (!this.page.state.errorMessage) {
         await woEditResource.update(dataToUpdate, option);
         /* istanbul ignore next */
          window.setTimeout(() => {
          this.page.state.useConfirmDialog = false;
          this.navigateDtlsPage(parentWo);
            /* istanbul ignore else*/
            let detailPage = this.app.findPage("workOrderDetails");
            if(detailPage){
              detailPage.state.isLinear = this.page.state.assetLinear;
            }
          //DT189589 Incorrect Save Message when trying to edit Follow Up Work
          //this.page.state.useConfirmDialog = true;
        }, 50);
        } else {
          this.saveDataSuccessful = false;
        }
        
        woEditResource.off('update-data-failed', this.onUpdateDataFailed);
      }
    }

  /**
  * Navigate to details page
  * */
  async navigateDtlsPage(parentWo) {
    /* istanbul ignore if */
    if (this.page.state.assetLinear) {
      let linearAssetDs = this.app.findDatasource("linearAsset");
      await linearAssetDs?.load({ src: [parentWo?.multiassetlocci], noCache: true });
    }
    this.app.setCurrentPage({
      name: "workOrderDetails",
      resetScroll: true,
      params: {
        wonum: parentWo.wonum,
        href: parentWo.href,
        siteid: parentWo.siteid,
        prevPage: "editwo"
      }
    });
  }
  
  /**
   * Update work order on user confirmation dialog save
   * */
  async onCustomSaveTransition() {
    this.callDefaultSave = false;
    await this.updateAndSaveWorkOrder({page: this.page});    
    return {saveDataSuccessful: this.saveDataSuccessful, callDefaultSave: this.callDefaultSave};
  } 

  /**
   * function called On calender datetime value changed
   */
  // istanbul ignore next
  onValueChanged(changeObj) {
    this.page.state.errorMessage = this.validateFields();
    if(changeObj.field === 'endmeasure'){
      if((changeObj.oldValue === changeObj.newValue?.toString() || changeObj.item.endmeasure === changeObj.oldValue)){
        this.page.state.endMeasureUpdate = true;
      }else{
        this.page.state.endMeasureUpdate = false;
      }
    }
   if(changeObj.field === 'startmeasure'){
        if(changeObj.oldValue === changeObj.newValue?.toString() || changeObj.item.startmeasure === changeObj.oldValue){
      this.page.state.measureUpdate = true;
    }else{
      this.page.state.measureUpdate = false;
    }
   }

    //Used to update the value if we remove startfeaturelabel and endfeaturelabel   
    if (changeObj.field === 'startfeaturelabel' && !changeObj.newValue) {
      this.page.state.startOffsetReadOnly = true;
      changeObj.datasource.item.startfeaturelabel = "";
        changeObj.datasource.item.startassetfeatureid = null;
        changeObj.datasource.item.startmeasure = null;
        changeObj.datasource.item.startoffset =null;
    }

    if (changeObj.field === 'endfeaturelabel' && !changeObj.newValue) {
      this.page.state.endOffsetReadOnly = true;
      changeObj.datasource.item.endoffset =null;
        changeObj.datasource.item.endfeaturelabel = "";
        changeObj.datasource.item.endassetfeatureid = null;
      changeObj.datasource.item.endmeasure = null;
    }
  }

  /**
  * Function to validate if field is ui required and not has value on attribute
  * @param attributeName attribute name
  * @param attributeValue attribute value
  * @returns  true or false
  */
 // istanbul ignore next
 uiRequired(attributeName, attributeValue){
  return WOCreateEditUtils.uiRequired(this.page, 'dsWoedit', attributeName, attributeValue);
 }

  /**
   * Function to validate workorder fields
   */
  validateFields() {
    let workorder= this.page.datasources.dsWoedit.items[0];
    let arrayListFieldsWithError = [];
    let errorMessage = "";
    let errorField = "";

    /* DT221877 - MASISMIG-42208 */
    if((this.uiRequired("description", workorder?.description !== undefined ? workorder?.description.trim() : workorder?.description))){
      arrayListFieldsWithError.push({"attributename":"description", "error":true});
      this.showWOWarnings("description", "");
    }else{
      arrayListFieldsWithError.push({"attributename":"description", "error":false});
      this.clearWarnings("description");
    }

    if(this.uiRequired("worktype", workorder.worktype)){
      arrayListFieldsWithError.push({"attributename":"worktype", "error":true});
    }else{
      arrayListFieldsWithError.push({"attributename":"worktype", "error":false});
      this.clearWarnings("worktype");
    }
    /* DT221877 - MASISMIG-42208 */

    //DT179992: Mobile, required fields not working
    let minEstimatedDuration = this.page.state.minEstimatedDuration ?? 0;

    if ((workorder.wopriority &&
      (workorder.wopriority < this.page.state.minPriority || workorder.wopriority > this.page.state.maxPriority))
      || (this.uiRequired("wopriority", workorder.wopriority)))
    {
      if((workorder.wopriority < this.page.state.minPriority || workorder.wopriority > this.page.state.maxPriority)) {
        errorMessage = this.app.getLocalizedLabel('priority_error_msg', `Priority ${workorder.wopriority} is not a valid priority value between ${this.page.state.minPriority} and ${this.page.state.maxPriority}`, [workorder.wopriority, this.page.state.minPriority, this.page.state.maxPriority]);
        errorField = "wopriority";
        this.showWOWarnings(errorField, errorMessage);
        this.page.state.errorMessage = errorMessage;
      }
      arrayListFieldsWithError.push({"attributename":"wopriority", "error":true});
    } else {
      this.clearWarnings("wopriority");
      arrayListFieldsWithError.push({"attributename":"wopriority", "error":false});
    }
   
    if ((workorder.schedstart && workorder.schedfinish && workorder.schedstart > workorder.schedfinish)
         || ( this.uiRequired("schedstart", workorder.schedstart) ||  this.uiRequired("schedfinish",workorder.schedfinish))) 
      {
      errorMessage = this.app.getLocalizedLabel(
        `startdate_enddate_compare_msg`,
        `The start date must be before the finish date`
      );
      errorField = "schedstart";
      this.showWOWarnings(errorField, errorMessage);
      this.page.state.errorMessage = errorMessage;
      arrayListFieldsWithError.push({"attributename":"schedstart", "error":true});
      arrayListFieldsWithError.push({"attributename":"schedfinish", "error":true});
    } else {
      this.clearWarnings("schedstart");
      arrayListFieldsWithError.push({"attributename":"schedstart", "error":false});
      arrayListFieldsWithError.push({"attributename":"schedfinish", "error":false});
    }
    if (workorder.estdur < minEstimatedDuration
      || (this.uiRequired("estdur",workorder.estdur))) 
    {
    // istanbul ignore next
      minEstimatedDuration > 0? (errorMessage = this.app.getLocalizedLabel(
        `est_dur_msg`,
        `The duration should be greater then ${minEstimatedDuration}`, [minEstimatedDuration]
      )) : (errorMessage = this.app.getLocalizedLabel(
        `est_dur_msg`,
        `The duration should be positive value`
      ))
      errorField = "estdur";
      this.showWOWarnings(errorField, errorMessage);
      this.page.state.errorMessage = errorMessage;
      arrayListFieldsWithError.push({"attributename":"estdur", "error":true});
    } else {
      this.clearWarnings("estdur");
      arrayListFieldsWithError.push({"attributename":"estdur", "error":false});
    }
    if((!workorder.assetnum && this.uiRequired("assetnum", workorder.assetnum))) {
      errorMessage = this.app.getLocalizedLabel(
          `numberinput_fieldRequiredText`,
          `Fill the required fields`
        );
      errorField = "assetnum";
      this.showWOWarnings(errorField, errorMessage);
      this.page.state.errorMessage = errorMessage;
      arrayListFieldsWithError.push({"attributename":"assetnum", "error":true});
    } else {
      this.clearWarnings("assetnum");
      arrayListFieldsWithError.push({"attributename":"assetnum", "error":false});
    }

    arrayListFieldsWithError = this.validateLinearForm(workorder, arrayListFieldsWithError)
    if (arrayListFieldsWithError.find(data => data.error === true)) {
      this.page.state.readOnlyState = true;
    } else {
      this.page.state.readOnlyState = false;
    }
    WOCreateEditUtils.saveDisable(this.page);
    return errorMessage;
  }

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  /**
   * @description - This function will check if all the required fields are filled before saving the data
   * @param {object} dsWoedit - Data set work on edit
   */
  readOnlyFields(dsWoedit) {
      if (dsWoedit?.item) {
        const items = dsWoedit?.item ? Object.keys(dsWoedit.item) : '';
        const requireValues = dsWoedit?.uiRequired?.undefined ?? '';
        this.page.state.readOnlyState =
          requireValues &&
          !requireValues.every((r) =>
            items?.includes(r) && dsWoedit.item[r] !== ""
          );
        dsWoedit.state.canSave = false;
      }
    }

   // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  //validateLinearForm function is to validate user input when creating or editing a linear work order. 
  validateLinearForm(workorder, arrayListFieldsWithError) {
    if (workorder.startfeaturelabel) {
      const evt = { "item": workorder };
      const assetFeatureDs = this.app.findDatasource('assetFeatureData');
      const assetFeatureArr = assetFeatureDs.items;
      const hasError = WOCreateEditUtils.featureLabelValidation(assetFeatureArr, evt, "startfeaturelabel");
      arrayListFieldsWithError = this.validateStartFeatureLabel(hasError, "startfeaturelabel", arrayListFieldsWithError);
    }
    if (workorder.endfeaturelabel) {
      const evt = { "item": workorder };
      const assetFeatureDs = this.app.findDatasource('assetFeatureData');
      const assetFeatureArr = assetFeatureDs.items;
      const hasError = WOCreateEditUtils.featureLabelValidation(assetFeatureArr, evt, "endfeaturelabel");
      arrayListFieldsWithError = this.validateEndFeatureLabel(hasError, "endfeaturelabel", arrayListFieldsWithError);
    }
    if (workorder.startyoffsetref) {
      const evt = { "item": workorder };
      const hasError = WOCreateEditUtils.startYRefCal(this.page, evt);
      arrayListFieldsWithError = this.validateStartYOffsetzRef(hasError, "startyoffsetref", arrayListFieldsWithError);
    }
    if (workorder.endyoffsetref) {
      const evt = { "item": workorder };
      const hasError = WOCreateEditUtils.endYRefCal(this.page, evt);
      arrayListFieldsWithError = this.validateStartYOffsetzRef(hasError, "endyoffsetref", arrayListFieldsWithError);
    }
    if (workorder.startmeasure) {
      const errorMsg = this.app.getLocalizedLabel(
        `measure_error_msg`,
        `Start Measure must be between the linear asset's Start Measure ${this.page.state.assetStartMeasure} and ${this.page.state.assetEndMeasure}. (BMXAA6139)`, [this.page.state.assetStartMeasure, this.page.state.assetEndMeasure]
      );
      const errorField = "startmeasure";
      if (workorder.startmeasure && ((workorder.startmeasure < this.page.state.assetStartMeasure) || (workorder.startmeasure > this.page.state.assetEndMeasure))) {
        this.page.state.errorMessage = errorMsg;
        arrayListFieldsWithError.push({ "attributename": "startmeasure", "error": true });
      } else {
        this.clearWarnings(errorField);
        arrayListFieldsWithError.push({ "attributename": "startmeasure", "error": false });
      }
    }

    if (workorder.endmeasure) {
      const errorMsg = this.app.getLocalizedLabel(
        `measure_error_msg`,
        `End Measure must be between the linear asset's Start Measure ${this.page.state.assetStartMeasure} and ${this.page.state.assetEndMeasure}. (BMXAA6139)`, [this.page.state.assetStartMeasure, this.page.state.assetEndMeasure]
      );
      const errorField = "endmeasure";
      if (workorder.endmeasure && ((workorder.endmeasure < this.page.state.assetStartMeasure) || (workorder.endmeasure > this.page.state.assetEndMeasure))) {
        this.page.state.errorMessage = errorMsg;
        arrayListFieldsWithError.push({ "attributename": "endmeasure", "error": true });
      } else {
        this.clearWarnings(errorField);
        arrayListFieldsWithError.push({ "attributename": "endmeasure", "error": false });
      }
    }
    return arrayListFieldsWithError;
  }
   // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  //This function validates the start feature label field in the layout editor. If the value entered is not a valid number or percentage, an error message is displayed and the user is prompted to enter a valid value.
  validateStartFeatureLabel(hasError, errorField, arrayListFieldsWithError) {
    if (hasError === -1) {
      const errorMessage = this.app.getLocalizedLabel(
        `valid_featurelabel`,
        `Enter a valid reference feature on this asset`
      );
      this.showWOWarnings(errorField, errorMessage);
      this.page.state.errorMessage = errorMessage;
      arrayListFieldsWithError.push({ "attributename": errorField, "error": true });
    } else {
      this.clearWarnings(errorField);
      arrayListFieldsWithError.push({ "attributename": errorField, "error": false });
    }
    return arrayListFieldsWithError;
  }

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  //This function validates the end feature label field in the layout editor. If the value entered is not a valid number or percentage, an error message is displayed and the user is prompted to enter a valid value.
  validateEndFeatureLabel(hasError, errorField, arrayListFieldsWithError) {
    if (hasError === -1) {
      const errorMessage = this.app.getLocalizedLabel(
        `valid_featurelabel`,
        `Enter a valid reference feature on this asset`
      );
      this.showWOWarnings(errorField, errorMessage);
      this.page.state.errorMessage = errorMessage;
      arrayListFieldsWithError.push({ "attributename": errorField, "error": true });
    } else {
      this.clearWarnings(errorField);
      arrayListFieldsWithError.push({ "attributename": errorField, "error": false });
    }
    return arrayListFieldsWithError;
  }
   // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  //This function validates the start y-offset reference field in the layout editor. If the value entered is not a valid number or percentage, an error message is displayed and the user is prompted to enter a valid value.
  validateStartYOffsetzRef(hasError, errorField, arrayListFieldsWithError) {
    if (hasError) {
      const errorMessage = this.app.getLocalizedLabel(
        `valid_yoffsetref`,
        `Enter valid Y offset`
      );
      this.showWOWarnings(errorField, errorMessage);
      this.page.state.errorMessage = errorMessage;
      arrayListFieldsWithError.push({ "attributename": errorField, "error": true });
    } else {
      this.clearWarnings(errorField);
      arrayListFieldsWithError.push({ "attributename": errorField, "error": false });
    }
    return arrayListFieldsWithError;
  }

    // Assisted by WCA@IBM
   // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  //This function validates the end y-offset reference field in the layout editor. If the value entered is not a valid number or percentage, an error message is displayed and the user is prompted to enter a valid value.
  validateEndYOffsetzRef(hasError, errorField, arrayListFieldsWithError) {
    if (hasError) {
      const errorMessage = this.app.getLocalizedLabel(
        `valid_yoffsetref`,
        `Enter valid Y offset`
      );
      this.showWOWarnings(errorField, errorMessage);
      this.page.state.errorMessage = errorMessage;
      arrayListFieldsWithError.push({ "attributename": "endyoffsetref", "error": true });
    } else {
      this.clearWarnings(errorField);
      arrayListFieldsWithError.push({ "attributename": "endyoffsetref", "error": false });
    }
    return arrayListFieldsWithError;
  }
  /**
   * Function to set field warnings
   */
  // istanbul ignore next
  showWOWarnings(field, message) {
    WOCreateEditUtils.showWOWarnings(this.page, "dsWoedit", field, message);
  }

  /**
   * Function to clear field warnings
   */
  // istanbul ignore next
  clearWarnings(field) {
    WOCreateEditUtils.clearWarnings(this.page, "dsWoedit", field);
  }
  // istanbul ignore next
  async UpdateTheParentWO() {
    const wodetailsDs = this.app.findDatasource("woDetailResource");
    let option = {
      responseProperties: wodetailsDs.baseQuery.select,
    };
    let dataToUpdate = { hasfollowupwork: true, href: wodetailsDs.item.href };
    wodetailsDs.on("update-data-failed", this.onUpdateDataFailed);
    await wodetailsDs.update(dataToUpdate, option);

    await wodetailsDs.load({ noCache: true }, true);
  }

  /**
   * Creates a new follow-up work order.
   * @param {*} event 
   */
  async createFollowupWo(event) {
    this.page.state.saveInProgress= true;
    const newWods = this.app.findDatasource("newWorkOrderds");
    let relatedPage = this.app.findPage('relatedWorkOrder');
    let relatedWOds = relatedPage.datasources["woDetailRelatedWorkOrder"];
    let relatedListDS = relatedPage.datasources["relatedrecwo"];
    let parentWo = relatedWOds.item;
    const dsWoedit = this.app.findDatasource("dsWoedit");
    const synonymdomainDS = this.app.datasources['synonymdomainData'];
    const statusData = await SynonymUtil.getDefExtSynonymValueIdWithOrgSite(synonymdomainDS, 'WOSTATUS', 'WAPPR', parentWo.orgid, parentWo.siteid);
    let response;
    let relateTypeFUPData = await SynonymUtil.getSynonym(synonymdomainDS, 'RELATETYPE', 'RELATETYPE|FOLLOWUP');
    let relateTypeOrgData = await SynonymUtil.getSynonym(synonymdomainDS, 'RELATETYPE', 'RELATETYPE|ORIGINATOR');

    let attributes = [];
    /* istanbul ignore else */
    if (newWods && newWods.baseQuery) {
      attributes = newWods.baseQuery.select.split(","); 
    }

    //Remove workorderid and wonum before creating followup from parent WO ds.
    delete dsWoedit.item.workorderid;
    delete dsWoedit.item.wonum;

    attributes.forEach((element) => {
      newWods.item[element] = dsWoedit.item[element];
    });

    newWods.item.worktype = this.page.state.worktype;
    newWods.item.siteid = parentWo.siteid;
    newWods.item.orgid = parentWo.orgid;
    newWods.item.woclass = parentWo.woclass;
    newWods.item.origrecordid = parentWo.wonum;
    newWods.item.origrecordclass = parentWo.woclass;
    newWods.item.origwoid = parentWo.workorderid;
    newWods.item.assetnum = parentWo.assetnum;
    newWods.item.failurecode = parentWo.failurecode;
    newWods.item.owner = parentWo.owner;
    newWods.item.onbehalfof = parentWo.onbehalfof;
    newWods.item.location = parentWo.locationnum;
    newWods.item.locationnum = parentWo.locationnum;
    newWods.item.assetdesc = parentWo.assetdesc;
    newWods.item.assetnumber = parentWo.assetnumber;

    newWods.item.phone = this.app.client.userInfo.primaryphone;
    newWods.item.changeby = this.app.client.userInfo.personid;
    newWods.item.reportedby = this.app.client.userInfo.personid;
    newWods.item.changedate = new Date();
    newWods.item.reportdate = new Date();
    newWods.item.status = statusData?.value;
    newWods.item.status_maxvalue = statusData?.maxvalue;
    newWods.item.status_description = statusData?.description;
    newWods.item.statusdate = new Date();
    newWods.item.anywhererefid = new Date().getTime();
    
    /* istanbul ignore else */
    if(this.page.state.isMobile) {
      /* istanbul ignore next */
      if(dsWoedit.item.failurecode) {
        newWods.item.failurecode = dsWoedit.item.failurecode;
      }
      /* istanbul ignore next */
      if(dsWoedit.item.assetlocpriority) {
        newWods.item.assetlocpriority = dsWoedit.item.assetlocpriority;
      }
    }

    let workAsset = parentWo?.assetnum;
    let workLocation = parentWo?.locationnum;

    // istanbul ignore else
    if (!dsWoedit.item.assetnum && !dsWoedit.item.locationnum) {
      newWods.item.assetnum = '';
      newWods.item["location"] = '';
    } else if (dsWoedit.item.assetnum !== workAsset || dsWoedit.item.locationnum !== workLocation) {
      newWods.item.assetnumber = dsWoedit.item.assetnum;
      newWods.item.assetnum = dsWoedit.item.assetnum;
      newWods.item["location"] = dsWoedit.item.locationnum;
      newWods.item.locationnum = dsWoedit.item.locationnum;
      newWods.item["locationdesc"] = dsWoedit.item.locationdesc;
      newWods.item.assetdesc = dsWoedit.item.assetdesc;
    } else {
      newWods.item.assetnum = parentWo.assetnum;
      newWods.item.location = parentWo.locationnum;
      newWods.item.assetdesc = parentWo.assetdesc;
      newWods.item.assetnumber = parentWo.assetnumber;
    }
    
    if (this.page.state.assetLinear) {
      let multiassetlocci = {
        startyoffsetref: dsWoedit.item.startyoffsetref,
        assetnum: parentWo.assetnum,
        endyoffsetref: dsWoedit.item.endyoffsetref ,
        startzoffsetref: dsWoedit.item.startzoffsetref ,
        endzoffsetref: dsWoedit.item.endzoffsetref,
        startoffset: dsWoedit.item.startoffset ,
        startzoffset: dsWoedit.item.startzoffset,
        endzoffset: dsWoedit.item.endzoffset ,
        startyoffset: dsWoedit.item.startyoffset,
        endyoffset: dsWoedit.item.endyoffset,
        endoffset: dsWoedit.item.endoffset,
        startmeasure: dsWoedit.item.startmeasure,
        endmeasure: dsWoedit.item.endmeasure,
        startassetfeatureid: dsWoedit.item.startassetfeatureid,
        endassetfeatureid: dsWoedit.item.endassetfeatureid ,
        startfeaturelabel: dsWoedit.item.startfeaturelabel ,
        endfeaturelabel: dsWoedit.item.endfeaturelabel,
        isprimary: 1,
      };
      /* istanbul ignore next */
      newWods.item['multiassetlocci'] = multiassetlocci;
      if (!Device.get().isMaximoMobile) {
        delete newWods.item['woserviceaddress'];
      }
    }  

    //Setting the interactive to false
    newWods.dataAdapter.options.query.interactive = this.page.state.isMobile ? 0 : 1;
    
     // istanbul ignore next
    try {

      if ( this.callDefaultSave ) {
        this.page.state.useConfirmDialog = false;
      }
      this.saveDataSuccessful = true;
      newWods.on('save-data-failed', this.onUpdateDataFailed);

      //Do not go for save if there is any client side error
      if (!this.page.state.errorMessage) {      
        let localPayloadfup = {...newWods.item};        
        localPayloadfup["relatedwo"] = [{
          relatedwodesc: parentWo.description,
          relatetypedesc: relateTypeOrgData.description,
          relatedreckey: parentWo.wonum,
          href:parentWo.href
        }];
        
        let optionfup = {
          responseProperties: newWods.baseQuery.select,
          localPayload : localPayloadfup
        };
        
        newWods.__itemChanges = {};
        response = await newWods.save(optionfup);
      } else {
        this.saveDataSuccessful = false;
      }

      if ((response && this.saveDataSuccessful)  || (response.hasNewItems && response.items.length > 0)) {
        this.page.state.useConfirmDialog = false;
        if (relatedListDS.items.length === 0) {
          await this.UpdateTheParentWO();
        }
        //adding this condition to disable the chevron button of follow up work order in devices if workorder created in devices
        if (Device.get().isMaximoMobile) { this.page.stateChevronDisable = true;}
        this.app.toast(
          this.app.getLocalizedLabel(
            'relatedwo_created_msg',
            `Follow-up work created`
          ),
          'success'
        );
        
        //Update wo to add fup record
        if (Device.get().isMaximoMobile) {
          let localPayload = {
            href:parentWo.href,
            relatedwo: [
              {
                relatedwodesc: response.items[0].description,
                relatetypedesc: relateTypeFUPData.description,
                origrecordid: response.items[0].origrecordid,
                anywhererefid: response.items[0].anywhererefid,
              }],
            };
            
            let option = {
              responseProperties: "description,anywhererefid",
              localPayload : localPayload
            };
              
            let dataToUpdate = {description: parentWo.description, href:parentWo.href};		
            await relatedWOds.update(dataToUpdate, option);
        }
        this.page.state.saveInProgress = false;        
        this.app.setCurrentPage({name: 'relatedWorkOrder', resetScroll: true, params: {itemhref: parentWo.href,chevronDisable : this.page.stateChevronDisable}});
        //this.page.state.useConfirmDialog = true;
        
      }
      newWods.off('save-data-failed', this.onUpdateDataFailed);
    }
    catch (error) /* istanbul ignore next */ {
      log.t(TAG, error);
      this.app.setCurrentPage({name: 'relatedWorkOrder', resetScroll: true, params: {itemhref: parentWo.href}});
      this.page.state.useConfirmDialog = true;
      this.page.state.saveInProgress = false; 
    } finally {
      //this.page.state.useConfirmDialog = true;
      this.page.state.worktype = ''
    }
	}

  async setIncomingContext () {
    const context = this.app.state.incomingContext;

    this.page.datasources.dsWoedit.item["assetnum"] = context.assetnum;
    this.app.state.incomingContext = null;
    /*
    // TODO: search assetnum & description with assetuid
    let assetDS = await this.app.findDatasource("woDetailResource");
    await assetDS.initializeQbe();
    assetDS.setQBE('assetnum','=',context.assetnum);
    let assetData = await assetDS.searchQBE();
    if (assetData[0] && assetData[0].assetnum.length>0) {
      this.page.datasources.dsWoedit.item["woassetdesc"] = this.getAssetLocDesc(assetData[0].assetnum,assetData[0].description)
    }
    */
    this.onChangeAsset({
      item: this.page.datasources.dsWoedit.item,
      app: this.app,
    });
  }

  /**
   * Function to set flag for 'save-data-failed' event
   */
   onUpdateDataFailed() {
    this.saveDataSuccessful = false;
    this.page.state.saveInProgress = false; 
  }

  /**
   * Set editorValue on the basis of content
   * @param {*} rich text editor on change event 
   */
  onEditorChange(evt) {
    this.page.state.editorValue = evt.target.content;
  }

  /**
   * Reset editorValue on save perform from rich text editor save button
   */
  onEditorSave() {
    this.page.state.editorValue = null;
  }

  /**
   * Callback from dialog back button
   */
  onCloseRichTextDialog() {
    /* istanbul ignore else  */
    if(this.page.state.editorValue !== null && this.page.state.editorValue !== undefined) {
      this.page.showDialog('saveDiscardDialog');
    }
  }

  /**
   * Set long description value.
   * @param {*} workorder item and datasource as event
   */
  setRichTextValue(evt) {
    evt.datasource.item.description_longdescription = this.page.state.editorValue;
    this.onEditorSave();
  }

  /**
   * Reset editorValue on click discard button
   */
  closeSaveDiscardDialog() {
    this.onEditorSave();
  }
  
  /**
   * choose location from lookup;
   */
  async chooseLocation(item) {
    await WOCreateEditUtils.chooseLocation(this.app, this.page, "dsWoedit", item, this);
  }

  /**
   * open asset lookup;
   */
  async openAssetLookup() {
    WOCreateEditUtils.openAssetLookup(this.app, this.page, "woedit");
  }

  /**
	 * Use to set the selected item..
	 * @param {item} workorder item
	 */
  chooseAssetItem(item) {
    WOCreateEditUtils.chooseAssetItem(this.app, this.page, 'dsWoedit', item, this);
  }

  /**
	 * Callback method after choose asset from lookup after validating location.
	 * @param {item} asset item
	 */
  async chooseAsset(item) {
    await WOCreateEditUtils.chooseAsset(this.app, this.page, 'dsWoedit', item, this);
  }

  /**
   * set Asset/location value when user confirm Yes
   */
  onUserConfirmationYes() {
    let dsWoedit = this.app.findDatasource("dsWoedit");
    let selectedItem = this.page.state.selectedItem;
    /* istanbul ignore else  */
    if (selectedItem.action === "SETASSET") {
      const isValidGL = WOCreateEditUtils.validateGlAccount(this.app, this.page, dsWoedit, selectedItem.item, "SETASSETGL", true);
      WOCreateEditUtils.setAsset(this.app, this.page, dsWoedit, selectedItem.item, this);
      /* istanbul ignore else  */
      if(isValidGL) {
        this.validAssetValue = selectedItem.item.assetnum;
      }
    } else if (selectedItem.action === "SETLOCATION") {
      const isValidGL = WOCreateEditUtils.validateGlAccount(this.app, this.page, dsWoedit, selectedItem.item, "SETLOCGL", true);
      WOCreateEditUtils.setLocation(this.app, this.page, dsWoedit, selectedItem.item, this);
      if(isValidGL) {
        this.validLocationValue = selectedItem.item.location || selectedItem.item.locationnum;
      }
    } else if (
      selectedItem.action === "SETLOCGL" ||
      selectedItem.action === "SETASSETGL"
    ) {
      WOCreateEditUtils.setGLAccount(this.app, this.page, dsWoedit, selectedItem.item, selectedItem.action, this);
      (selectedItem.action === "SETLOCGL") ? this.validLocationValue = selectedItem.item.location || selectedItem.item.locationnum : this.validAssetValue = selectedItem.item.assetnum;
    }
  }

  /**
   * set Asset/location value when user confirm NO
   */
  onUserConfirmationNo() {
    WOCreateEditUtils.onUserConfirmationNo(this.app, this.page, 'dsWoedit');
  }

  /**
   * set and validate asset on asset input field
   * getAssetOrLocation function just return a valid asset
   */
  async onChangeAsset(event) {
    /* istanbul ignore else  */
    if (event.item && event.item.assetnum && event.item.assetnum.trim()) {
      let asset = await WOCreateEditUtils.getAssetOrLocation(
        event.app, "assetLookupDS",
        "assetnum", event.item.assetnum
      );
      /* istanbul ignore else  */
      if (asset && asset.length > 0) {
        this.chooseAsset(asset[0]);
      }
    }
  }

  /**
   * set and validate location on location input field
   * getAssetOrLocation function just return a valid location
   */
  async onChangeLocation(event) {
    /* istanbul ignore else  */
    if (event.item && event.item.locationnum && event.item.locationnum.trim()) {
      let location = await WOCreateEditUtils.getAssetOrLocation(
        event.app, "locationLookupDS",
        "location",
        event.item.locationnum
      );
      /* istanbul ignore else  */
      if (location && location.length > 0) {
        this.chooseLocation(location[0]);
      }
    }else{
      let lookupDs = event.app.findDatasource("assetLookupDS");
      await WOCreateEditUtils.clearSearch(lookupDs);
    }
  }


  /**
   * search location on blur of assets input
   * @param {*} input value on blur
   */
   async findLocation(item) {
    if(!item?.value) {
      this.page.state.isLocationAssetFocus = false;
      this.page.state.assetLinear = false;
      this.page.state.linearAssetAvailable=false;
      return;
    }
   // istanbul ignore next
   if (item.value) {
    await this.validateLinearAsset(item.value);
  }    
  let assetData = await WOCreateEditUtils.getAssetOrLocation(
      this.app,
      "assetLookupDS",
      "assetnum",
      item.value
    );
    if(assetData.length === 1){
      await this.chooseAsset(assetData[0]);
    }

 // istanbul ignore next 
 if (assetData.length === 0) {
  this.page.state.assetLinear = false;
  this.page.state.linearAssetAvailable = false;
}
this.page.state.isManual = false;    this.page.state.editAssetsLocation = false;
    this.page.state.isLocationAssetFocus = false;
    this.callUpdateWorkOrder();
  }

 /**
   * This function validates whether the selected asset is linear or not.
   * @param {object} app - The application object.
   * @param {object} page - The current page object.
   * @param {string} assetNum - The asset number to be validated.
   */
  // istanbul ignore next
  async validateLinearAsset(assetNum) {
    await WOCreateEditUtils.validateLinearAsset(this.app, this.page, 'dsWoedit', assetNum);
  }
  
  /**
   * This function calculates the start measure of an item based on its start feature label and offset. It also validates the start measure and updates it if necessary.
   * @param {*} evt The event object passed to the function.
   */
  async startOffsetCal(evt){
    await WOCreateEditUtils.startOffsetCal(this.app, this.page, 'dsWoedit', evt, true);
  }

  /**
   * This function calculates the end measure of an annotation based on its end offset and the start measure of the annotation.
   * @param {*} evt The event object containing the annotation data.
   */
  async endOffsetCal(evt){
    await WOCreateEditUtils.endOffsetCal(this.app, this.page, 'dsWoedit', evt, true);
  }

  /**
   * This function is called when the user clicks the Start Measure button. It validates the Start Measure input and displays any warnings or errors as needed.
   * @param {*} evt An object containing the event details.
   */
  async startMeasureCal(evt){
    await WOCreateEditUtils.startMeasureCal(this.app, this.page, evt, true);
  }

    /**
   * This function is called when the user clicks the End Measure button. It validates the End Measure input and displays any warnings or errors as needed.
   * @param {*} evt An object containing the event details.
   */
    async endMeasureCal(evt){
      await WOCreateEditUtils.endMeasureCal(this.app, this.page, evt, true);
    }

  /**
   * search assets on blur of location input
   * @param evt (object): An object representing the event.
   * @returns This function returns a boolean value indicating whether the start measure is valid or not.
   */    
  startMeasureValidation(evt){
    return WOCreateEditUtils.startMeasureValidation(this.app, this.page, 'dsWoedit', evt);
  }

    /**
   * search assets on blur of location input
   * @param evt (object): An object representing the event.
   * @returns This function returns a boolean value indicating whether the start measure is valid or not.
   */    
    endMeasureValidation(evt){
      return WOCreateEditUtils.endMeasureValidation(this.app, this.page, 'dsWoedit', evt);
    }

  /**
   * This function validates the Start Z Offset Reference field when creating or editing work orders.
   * @param evt (object): The event object for the field being validated.
   * @returns Returns true if the validation passes, false otherwise.
   */
  async startZRefCal(evt){
    await WOCreateEditUtils.startZRefCal(this.app, this.page, 'dsWoedit', evt);
  }

  /**
   * This function validates the End Z Offset Reference field when creating or editing work orders.
   * @param evt (object): The event object for the field being validated.
   * @returns Returns true if the validation passes, false otherwise.
   */
  async endZRefCal(evt){
    await WOCreateEditUtils.endZRefCal(this.app, this.page, 'dsWoedit', evt);
  }

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-8b-code-instruct
  /**
   * search assets on blur of location input
   * @param {*} input value on blur
   * Search assets on blur of location input
   * Find an asset or location based on the input value.
   * @param {Object} item The input value object containing the asset or location value.
   * @returns {Promise<void>} A promise that resolves when the asset or location is found.
   */
   async findAsset(item) {
    const dsWoedit = await this.app.findDatasource("dsWoedit");
    let assetData = false;
    if(!item?.value) { 
      this.page.state.isLocationAssetFocus = false;
      if(this.page.state.assetFiltered) {
        assetData = await WOCreateEditUtils.getAssetOrLocation(
          this.app,
          "assetLookupDS",
          "location",
          ''
        );
      }
      this.page.state.assetFiltered = false;
      return;
    };
    if(!assetData) {
      assetData = await WOCreateEditUtils.getAssetOrLocation(
        this.app,
        "assetLookupDS",
        "location",
        item.value
      );
    }
    if (assetData.length === 1) {
      await this.chooseLocation(assetData[0]);
      this.validAssetValue = item.assetnum;
      item.assetnum = assetData;
    } else if (assetData.length > 1 && assetData.findIndex((asset) => asset.assetnum === this.page.datasources.dsWoedit.item.assetnum) < 0) {
      // Clear assetnum only if it does not exist in location's assets
      item.asset = assetData;
      WOCreateEditUtils.validateAsset(this.app, this.page, this.page.datasources.dsWoedit, item);
      this.validAssetValue = item?.asset?.assetnum;
    } else {
      const tempItem = {
        asset: [{
          assetnum: dsWoedit.item.assetnum,
        }],
        location: item.value
      }
      WOCreateEditUtils.validateAssetLocation(this.app, this.page, dsWoedit, tempItem, this);
    }
    this.page.state.editAssetsLocation = false;
    this.page.state.isLocationAssetFocus = false;
    this.page.state.assetFiltered = true;
    this.callUpdateWorkOrder();
  }

  /**
   * Flag for user manually entered location or assets
   */
  async editAssetsLocation(item) {
    await WOCreateEditUtils.editAssetsLocation(this.page, item, 'dsWoedit');  
    const dsWoedit = this.page.datasources.dsWoedit;
    this.readOnlyFields(dsWoedit);
  }

  /**
   * If callUpdateWorkOrder method was called before and we were waiting for assets / location data
   * then after fetch of location / assets proceed with callUpdateWorkOrder and also
   * set editAssetsLocation and saveInProgress to false
   */
   callUpdateWorkOrder() {
    if(this.page.state.saveInProgress) {
      this.page.state.editAssetsLocation = false;
      this.page.saveInProgress = false;
      this.updateAndSaveWorkOrder(this.page.state.updateWorkorderItem);
    }
  }

  /**
   * set Asset value on scanning a barcode/QR code
   */
  handleAssetBarcodeScan(event) {
    let dsWoEdit = this.app.findDatasource("dsWoedit"); 
    if (event.value) {
      dsWoEdit.item.assetnum = event.value; 
    }
    this.onChangeAsset({"item":dsWoEdit.item, "app":this.app});  
  }

  /**
   * set Asset value on scanning a barcode/QR code
   */
  handleLocationBarcodeScan(event) {
    let dsWoEdit = this.app.findDatasource("dsWoedit"); 
    if (event.value) {     
      dsWoEdit.item.locationnum = event.value;
    } 
    this.onChangeLocation({"item":dsWoEdit.item, "app":this.app}); 
  }
  /**
   * This function opens the Y reference point lookup dialog for the end point.
   * @param {object} evt - The event object.
   */
  async openYRefernceLookup(evt) {
    await WOCreateEditUtils.openYRefernceLookup(this.app, evt);
  }

  /**
    * This function opens the Y reference point lookup dialog for the end point.
    * @param {object} evt - The event object.
  */
  async openEndYRefernceLookup(evt) {
    await WOCreateEditUtils.openYRefernceLookup(this.app, evt);
  }

  /**
   * This function opens the Z reference point lookup dialog.
   * @param {object} evt - The event object.
   */
  async openZRefernceLookup(evt) {
    await WOCreateEditUtils.openZRefernceLookup(this.app, evt);
  }

  /**
    * This function opens the end Z reference point lookup dialog.
    * @param {object} evt - The event object.
  */
  async openEndZRefernceLookup(evt) {
    await WOCreateEditUtils.openZRefernceLookup(this.app, evt);
  }

  /**
    * This function chooses the Y reference point from the lookup dialog.
    * @param {object} itemSelected - The selected item in the lookup dialog.
   */
  async chooseYRefernce(itemSelected) {
    await WOCreateEditUtils.chooseYRefernceData(this.page, "dsWoedit", itemSelected, "startyoffsetref");
    this.clearWarnings("startyoffsetref");
  }

  /**
  * This function chooses the Z reference point from the reference point lookup dialog.
  * @param {object} itemSelected - The selected item in the reference point lookup dialog.
 */
  async chooseZRefernce(itemSelected) {
    await WOCreateEditUtils.chooseYRefernceData(this.page, "dsWoedit", itemSelected, "startzoffsetref");
    this.page.state.saveDisable = false;
    this.clearWarnings("startzoffsetref");
    WOCreateEditUtils.saveDisable(this.page);
  }

  /**
   * This function chooses the end Y reference point from the reference point lookup dialog.
   * @param {object} itemSelected - The selected item in the reference point lookup dialog.
   */
  async chooseEndYRefernce(itemSelected) {
    await WOCreateEditUtils.chooseYRefernceData(this.page, "dsWoedit", itemSelected, "endyoffsetref");
    this.clearWarnings("endyoffsetref");
  }

  /**
    * This function chooses the end Z reference point from the reference point lookup dialog.
    * @param {object} itemSelected - The selected item in the reference point lookup dialog.
  */
  async chooseEndZRefernce(itemSelected) {
    await WOCreateEditUtils.chooseYRefernceData(this.page, "dsWoedit", itemSelected, "endzoffsetref");
    this.page.state.zRefDisable = false;
    this.clearWarnings("endzoffsetref");
    WOCreateEditUtils.saveDisable(this.page);
  }

  /**
    * This function opens the reference point lookup dialog for starting a work order.
    * @param {object} evt - The event object.
  */
  async openStartReferncePointLookup(evt) {
    const dsWoedit = this.page.findDatasource("dsWoedit");
    await WOCreateEditUtils.openRefPointLookup(this.app, evt, dsWoedit?.item?.assetnum);
  }

  /**
   * This function opens the reference point lookup dialog and loads the appropriate reference points into the datasource.
   * @param {object} evt - The event object.
   * @param {object} dsWoedit - The datasource object.
   * @param {string} assetnum - The asset number.
   * @param {object} assetEditFeature - The feature being edited.
   */
  async openEndReferncePointLookup(evt) {
    const dsWoedit = this.page.findDatasource("dsWoedit");
    await WOCreateEditUtils.openRefPointLookup(this.app, evt, dsWoedit?.item?.assetnum);
  }

  /**
   * This function opens the reference point lookup dialog and loads the appropriate reference points into the datasource.
   * @param {string} itemSelected - The item selected from the list of reference points.
   */
  async chooseReferncePoint(itemSelected) {
    await WOCreateEditUtils.chooseReferncePointData(this.page, "dsWoedit", itemSelected, "startfeaturelabel");
    this.clearWarnings("startfeaturelabel");
  }

  /**
   * This function chooses the selected reference point data from the lookup dialog and updates the datasource.
   * @param {object} itemSelected - The item selected in the lookup dialog.
   */
  async chooseEndReferncePoint(itemSelected) {
    await WOCreateEditUtils.chooseReferncePointData(this.page, "dsWoedit", itemSelected, "endfeaturelabel");
    this.clearWarnings("endfeaturelabel");
  }

  /**
   * This function finds the start and end measure of an asset based on the given start feature label.
   * @param startfeaturelabel: The label of the start feature.
   */
  // istanbul ignore next
  async findFeatureMeasure(featurelabel){
    let featureMeasure;
    let assetFeatureDs = this.app.datasources["assetFeatureData"];
    assetFeatureDs?.items?.forEach(element=>{
      if(element.label === featurelabel){
        featureMeasure = element.endmeasure;
      }
    })
    return featureMeasure;
  }

  /**
   * This function finds the assetfeatureif of an asset based on the given start feature label.
   * @param startfeaturelabel: The label of the start feature.
   */
  // istanbul ignore next
  async findAssetStartAndEndMeasure(startfeaturelabel){
    let featureIdVal;
    let assetFeatureDs = this.app.datasources["assetFeatureData"];
    assetFeatureDs?.items?.forEach(element=>{
      if(element.label === startfeaturelabel){
        featureIdVal = element.assetfeatureid;
      }
    })
    return featureIdVal;
  }

  /**
   * This function opens the reference point lookup dialog and loads the appropriate reference points into the datasource.
   * @param {Application} app - The application object.
   * @param {Event} evt - The event object.
   * @param {string} assetnum - The asset number of the selected feature.
   * @param {Array<Item>} assetFeatureArr - An array of selected features.
   */
  // istanbul ignore next
  async setasseteatureLookupDs(app, assetnum) {
    let refenceCodeLookup = app.findDatasource('assetLookupDS');
    await refenceCodeLookup?.initializeQbe();
    refenceCodeLookup?.setQBE('assetnum', '=', assetnum);
    await refenceCodeLookup?.searchQBE();

    let assetFeatureDs = app.datasources["assetFeatureData"];
    assetFeatureDs?.clearSelections();
    let assetFeature = [];
    if (refenceCodeLookup?.item?.assetfeature?.length > 0) {
      refenceCodeLookup.item.assetfeature.filter(item => {
        if (item?.label) {
          assetFeature.push(item);
        }
      })
      await assetFeatureDs.load({ src: assetFeature, noCache: true });
      this.page.state.startRefPointReadOnly = false;
      this.page.state.endRefPointReadOnly = false;
      refenceCodeLookup?.clearQBE();
    }
  }
}

export default WorkOrderEditController;

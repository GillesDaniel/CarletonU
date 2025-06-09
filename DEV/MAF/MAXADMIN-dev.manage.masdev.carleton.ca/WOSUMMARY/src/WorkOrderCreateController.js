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

import {log} from '@maximo/maximo-js-api';

const TAG = 'WorkOrderCreateController';

class WorkOrderCreateController {

  pageInitialized(page, app) {
    log.t(TAG, "Work order create Page Initialized");
    this.app = app;
    this.page = page;
  }

  constructor(){
   // this.onSaveDataFailed = this.onSaveDataFailed.bind(this);
    this.saveDataSuccessful = true;
    this.callDefaultSave = true;

    this.updateDataSuccessful = true;
    this.callDefaultUpdate = true;
  }

  pageResumed() {
    if(this.app.lastPage!=null){
      this.app.state.parentPage = this.app.lastPage.name;	  
      this.openNewWorkOrder();
    }
  }
    /**
   * Create work order on user confirmation dialog save
   * */
     async onCustomSaveTransition() {
      this.callDefaultSave = false;
      this.callDefaultUpdate = false;
      if(this.app.currentPage.name === "CreateWorkOrder"){
        await this.createWorkOrder();
        return {
          saveDataSuccessful: this.saveDataSuccessful,
          callDefaultSave: this.callDefaultSave,
        };
      }else{
        this.page.state.useConfirmDialog = false;
        await this.updateFollowupWo();
        return {
          saveDataSuccessful: this.updateDataSuccessful,
          callDefaultSave: this.callDefaultUpdate,
        };
      }
    }

  async openNewWorkOrder() {
    this.app.state.classificationDS = "CLASSIFICATIONLOOKUP";
    let createWOds = this.app.findDatasource("createWODS");
    let parentWODS = this.app.findDatasource("parentWODS");   	
    // istanbul ignore else
    if(createWOds !=null && this.app.currentPage.name === "CreateWorkOrder"){
      let statusData = await this.getSynonym(
        this.app.findDatasource("synonymdomainData"),
        "WOSTATUS",
        "WOSTATUS|WAPPR"
      );
      let newWo = await createWOds.addNew();
      let dataFormatter = this.app.dataFormatter;
      createWOds.state.canSave=true;
      newWo.changeby = this.app.client.userInfo.personid;
      newWo.reportedby = this.app.client.userInfo.personid;
      let currDate = new Date();
      newWo.changedate = dataFormatter.convertDatetoISO(currDate);
      newWo.reportdate = dataFormatter.convertDatetoISO(currDate);
      newWo.statusdate = dataFormatter.convertDatetoISO(currDate);
      newWo.chargestore = false;
      newWo.status = statusData.value;
      newWo.status_description = statusData.description;
      newWo.status_maxvalue = statusData.maxvalue;
      newWo.siteid = this.app.client.userInfo.insertSite;
      newWo.reportdate = dataFormatter.convertDatetoISO(currDate);
      newWo.targcompdate = "";
      newWo.estdur = "0";
      newWo.worktype = "";
      newWo.wopriority = "";
      newWo.owner = "";
      newWo.failurecode = "";
      newWo.problemcode = "";
      newWo.assetnum = "";
      newWo.location = "";
      newWo.contract="";
    }else if (parentWODS!=null && this.app.currentPage.name === "FollowupWorkOrder"){
      parentWODS.state.canSave=true;
      this.page.state.useConfirmDialog = true;
      log.t(TAG, "Followup Work order/Edit WO");
    }
    this.app.state.hideLongDescription = false;    
  }  

  getDataSource(){
    let parentWODS= this.app.findDatasource("parentWODS");
    let createWOds = this.app.findDatasource("createWODS");
    if(this.app.currentPage.name === "CreateWorkOrder"){
      return createWOds;
    }else{
      return parentWODS;
    }

  }

  /**
   * Set description on the basis of content
   * @param {*} rich text editor on change event
   */
  async onEditorChange(evt) {
    let parentWODS= this.getDataSource();
    parentWODS.item.description_longdescription=evt.target.content;
    parentWODS.state.canSave = true;
  }

  /**
   * Update the Parent Code of Work Order Detail when the Failure Code is changed
   * @param {*} event 
   */
  updateParentCode(event){
    let parentWODS= this.getDataSource();
   // if(event.failurecode !== parentWODS.item.failurecode){
      parentWODS.item.problemcode="";
   // }
    if(event.failurelist == null){
      //This added to handle autocomplete scenario
      let failureclassDS = this.app.findDatasource("failureclassDS");
      // istanbul ignore else
      if(failureclassDS.currentItem && failureclassDS.currentItem.failurelist) {
        parentWODS.item.failurelist=failureclassDS.currentItem.failurelist;
      }
    }else{
      parentWODS.item.failurelist=event.failurelist;
    }
  }

  updateAssetDescription(event){
    let parentWODS= this.getDataSource();
    parentWODS.item.assetdesc=event.description;
    // istanbul ignore else
    if(event.location){
      parentWODS.item.location=event.location.location;
      parentWODS.item.locationdesc=event.location.description;
      if(event.failurecodes!= undefined && event.failurecodes.failurecode != undefined){
        parentWODS.item.failurecode=event.failurecodes.failurecode;
      }else if(event.locfailurecode!= undefined){
        parentWODS.item.failurecode=event.locfailurecode;
      }
    }else{
      let assetLookupDS = this.app.findDatasource("assetLookupDS");
      if(assetLookupDS.items!=null && assetLookupDS.items.length>0){
        const selectedAsset = assetLookupDS.items.find(asset => asset.assetnum === event.value);
        parentWODS.item.assetdesc=selectedAsset.description;
        parentWODS.item.location=selectedAsset.location.location;
        parentWODS.item.locationdesc=selectedAsset.location.description;
        if(selectedAsset.failurecodes!= undefined && selectedAsset.failurecodes.failurecode != undefined){
          parentWODS.item.failurecode=selectedAsset.failurecodes.failurecode;
        }else if(selectedAsset.locfailurecode!= undefined){
          parentWODS.item.failurecode=selectedAsset.locfailurecode;
        }
      }
    }
  }
    
  /**
   * Update the contract description on contract selection from lookup
   * @param {*} event 
   */
  updateContractDescription(event){	 
	  let parentWODS= this.getDataSource();	  
	  let contractLookupDs=this.app.findDatasource("contractLookupDs");	
	  if(contractLookupDs.items!=null && contractLookupDs.items.length>0){
          const selectedContract = contractLookupDs.items.find(contract => contract.contractnum === event.contractnum);	         
          parentWODS.item.contractdesc = selectedContract.description;          
	  }
    } 

    updateJobPlanDescription(event) {
        let parentWODS = this.getDataSource();	
        let jobplanLookupds = this.app.findDatasource("jobplanLookupds");
        if (jobplanLookupds.items != null && jobplanLookupds.items.length > 0) {
            const selectedJobPlan = jobplanLookupds.items.find(jbplan => jbplan.jpnum === event.jpnum);
            parentWODS.item.jobplandesc = selectedJobPlan.description;
        }
    }

    updateInspFormDescription(event) {
        let parentWODS = this.getDataSource();
        let inspFormLookupds = this.app.findDatasource("inspFormLookupds");
        if (inspFormLookupds.items != null && inspFormLookupds.items.length > 0) {
            const selectedInspForm = inspFormLookupds.items.find(inspform => inspform.inspformnum === event.inspformnum);
            parentWODS.item.inspformname = selectedInspForm.name;
        }
    }


  
  updateLocationDescription(event){
    // istanbul ignore else
    if(event && event.value) {
      event.location = event.value.toUpperCase();
    }
    let parentWODS= this.getDataSource();
    parentWODS.item.location='';
    parentWODS.item.locationdesc='';
    parentWODS.item.failurecode='';
    parentWODS.item.failurelist='';
    parentWODS.item.assetnum='';
    let locationLookupDS = this.app.findDatasource("locationLookupDS");
    // istanbul ignore else
    if(locationLookupDS.items != null && locationLookupDS.items.length > 0){
      const selectedLocation = locationLookupDS.items.find(location => location.location===event.location);
      // istanbul ignore else
      if(selectedLocation) {
        parentWODS.item.location=selectedLocation.location;
        parentWODS.item.locationdesc=selectedLocation.description;

        const filteredAssets = selectedLocation.asset ? selectedLocation.asset.length >1 ? selectedLocation.asset.filter(asset => !asset.parent):selectedLocation.asset:null;
        // istanbul ignore next
        if(filteredAssets == null || filteredAssets.length ==0){
          const filterAssetByParent = selectedLocation.asset ? selectedLocation.asset.length >1 ? selectedLocation.asset.filter(asset => asset.parent):selectedLocation.asset:null;
          assetLoop : for (let i = 0; i < filterAssetByParent.length; i++) {
            for (let j = 0; j < filterAssetByParent.length; j++) {
              if (filterAssetByParent[i].parent === filterAssetByParent[j].assetnum) {
                filteredAssets.push(filterAssetByParent[j]);
                break assetLoop;
              }
            }
          }
        }

        // istanbul ignore else
        if(filteredAssets && filteredAssets.length ===1){
          parentWODS.item.assetnum=filteredAssets[0].assetnum;
        }
        // istanbul ignore else
        if(filteredAssets && filteredAssets.length ===1 && filteredAssets[0].failurecodes.failurecode !=undefined){
          parentWODS.item.failurecode=filteredAssets[0].failurecodes.failurecode;
        }else if(selectedLocation.locfailurecode ){
          parentWODS.item.failurecode=selectedLocation.locfailurecode;
        }

        (async () => this.updateFailureList())();
      }
    }
  }
  
  /**
   * Update parentWODS.item.failurelist for corresponding parentWODS.item.failurecode
   * from the failureclassDS.
   */
  async updateFailureList() {
    let parentWODS= this.getDataSource();
    // istanbul ignore else
    if(parentWODS.item.failurecode) {
      let failureclassDS = this.app.findDatasource('failureclassDS');
      let failurecodeitems = await failureclassDS.search(parentWODS.item.failurecode,['failurecode'])
      // istanbul ignore else
      if(failurecodeitems && failurecodeitems.length > 0) {
        let myitem = failurecodeitems.find(item=>item.failurecode===parentWODS.item.failurecode);
        // istanbul ignore else
        if(myitem) {
          parentWODS.item.failurelist = myitem.failurelist;
        }
      }
    }
  }

  async openProblemCodeLookup(){
    let parentWODS= this.getDataSource();
    let failurelistDS = this.app.findDatasource('failurelistDS');
    failurelistDS.clearState();
    await failurelistDS.initializeQbe();
    failurelistDS.setQBE('parent', '=', parentWODS.item.failurelist);
    await failurelistDS.searchQBE();
    this.app.showLookup("problemCodeLookup");
  }

  updateProblemCode(event){
    let parentWODS= this.getDataSource();
    // istanbul ignore else
    if(event.failurecode){
      parentWODS.item.problemcode=event.failurecode.failurecode;
    }
  }

  /**
 * API to update classstructureid and description of selected classification from lookup
 * @param {*} event - Classification DS selected from lookup
 */
  chooseClassification(event){
    let parentWODS= this.getDataSource();
    // istanbul ignore else
    if(event.datasource!=null && event.datasource.getSelectedItems()!=null){
      let selectedCS = event.datasource.getSelectedItems()[0];
      parentWODS.item.classstructureid=selectedCS.classstructureid;
      parentWODS.item.classstructuredesc=selectedCS.description;
      parentWODS.item.hierarchypath = selectedCS.hierarchypath;
    }
  }
  async createWorkOrder(){
    log.t(TAG, "Create WO");
    let createWOds = this.app.findDatasource("createWODS");
    try {
      this.saveDataSuccessful = true;
      if (this.callDefaultSave) {
        this.page.state.useConfirmDialog = false;
      }
      let createWOResponse = await createWOds.save();
      if(createWOResponse && !createWOResponse.error){
        this.app.toast('Success!',
        'success',
          this.app.getLocalizedLabel(
            'createdwo_created_msg',
          'Work order {0} was created',
          [createWOds.item.wonum]
        )
        );
        let parentPage = this.app.state.parentPage ;
        if(parentPage === "wolist"){
          this.app.setCurrentPage({name: 'wolist'});
          let wolistDS = this.app.findDatasource("wolistDS");
          await wolistDS.forceReload();
        }else{
          const workOrderDetailDS = this.app.findDatasource("woDetailResource");
          let query = {dependentId: createWOds.item.wonum};
          this.page.state.selected_wodpanel_Index='0';
          // istanbul ignore else
          if(workOrderDetailDS!=null){
            await workOrderDetailDS.load(query, true);
          }
          this.app.setCurrentPage({name: 'WOSummaryPage', params:{ids:createWOds.item.wonum}});
        }
        this.app.state.woCreated = true;
        this.saveDataSuccessful = true;
       }else{
        this.app.state.woCreated = false;
        this.saveDataSuccessful = false;
       }
    } catch (error){
    } finally {
      if (this.callDefaultSave) {
        this.page.state.useConfirmDialog = true;
      }
    }
  }

  async updateFollowupWo(){
    log.t(TAG, "Update Followup WO");
    let woDtlPage = this.app.findPage('FollowupWorkOrder');
    let followupWOds = this.app.findDatasource("followupWODS");	
    let parentWo = woDtlPage.datasources['parentWODS'].item;
    let followupWONUM  = this.app.state.followupWONum;
    let parentWOds = this.app.findDatasource('parentWODS');
    try {
      this.saveDataSuccessful = true;
      await followupWOds.initializeQbe();
      followupWOds.setQBE('wonum', '=', followupWONUM);
      followupWOds.setQBE('siteid', '=', parentWo.siteid);
      await followupWOds.searchQBE();
      let followupWO = followupWOds.get(0);
      log.t(TAG, "Followup WO Details Fetched ");

      followupWO.description = parentWo.description;
      followupWO.description_longdescription=parentWo.description_longdescription;
      followupWO.worktype = parentWo.worktype;
      followupWO.siteid = parentWo.siteid;
      followupWO.orgid = parentWo.orgid;
      followupWO.woclass = parentWo.woclass;
      followupWO.failurecode = parentWo.failurecode;
      followupWO.problemcode = parentWo.problemcode;
      followupWO.owner = parentWo.owner;
      followupWO.onbehalfof = parentWo.onbehalfof;
      followupWO.assetdesc = parentWo.assetdesc;
      followupWO.assetnumber = parentWo.assetnumber;
      followupWO.phone = this.app.client.userInfo.primaryphone;
      followupWO.changeby = this.app.client.userInfo.personid;
      followupWO.reportedby = this.app.client.userInfo.personid;
      followupWO.targstartdate = parentWo.targstartdate;
      followupWO.targcompdate = parentWo.targcompdate;
      followupWO.estdur = parentWo.estdur;
      followupWO.wopriority = parentWo.wopriority;
      followupWO.assetnum = parentWo.assetnum;
      followupWO.location = parentWo.location;
      followupWO.assetdesc = parentWo.assetdesc;
      followupWO.assetnumber = parentWo.assetnumber;
      followupWO.contract=parentWo.contract;
      followupWO.jpnum = parentWo.jpnum;
      followupWO.inspformnum = parentWo.inspformnum;
      followupWO.classstructureid = parentWo.classstructureid;
      followupWOds._itemAIInferences = parentWOds._itemAIInferences;
      let updateResponse = await followupWOds.update(followupWO);
      if(updateResponse){
        this.app.toast( 'Success!',
        'success',
          this.app.getLocalizedLabel(
            'relatedwo_created_msg',
          'Your changes were saved.',
          [followupWONUM]
        )
        );
        this.app.state.followupWOUpdated = true;
        let relatedRecordDS = this.app.findDatasource("relatedRecordWO");
        const workOrderDetailDS = this.app.findDatasource("woDetailResource");
        let query = {dependentId: parentWo.workorderid};
        this.page.state.selected_wodpanel_Index='0';
        if(!this.app.state.editWO){
          await relatedRecordDS.forceReload();
        }else{
          await workOrderDetailDS.load(query, false);
          await workOrderDetailDS.forceReload();
          log.t(TAG, "Follow up Work Order Updated successfully");
        }
        this.updateDataSuccessful = true;
        this.page.state.useConfirmDialog = false;
        this.app.setCurrentPage({name: 'WOSummaryPage'});
      }else{
        log.t(TAG, "Error in updating Follow up Work Order");
        this.app.state.followupWOUpdated = false;
        this.updateDataSuccessful = false;
      }
    } catch (error){
    } finally {
        this.page.state.useConfirmDialog = false;
    }
    
  }

  cancelFollowupwo(){
    let woDtlPage = this.app.findPage('FollowupWorkOrder');
    let parentWo = woDtlPage.datasources['parentWODS'].item;
    
    this.app.setCurrentPage({name: 'WOSummaryPage', params: {itemhref: parentWo.href}});
    //Get newly added reccord
    let relatedRecordDS = this.app.findDatasource("relatedRecordWO");
    relatedRecordDS.forceReload();
  }

  cancelCreateWO(){
    let parentPage = this.app.state.parentPage ;
    let createWOds = this.app.findDatasource("createWODS");
    createWOds.clearChanges();
    if(parentPage === "wolist"){
      this.app.setCurrentPage({name: 'wolist'});
    }else{
      this.app.setCurrentPage({name: 'WOSummaryPage'});
    }
  }

  onDatasourceSelectionChanged(event) {
    // istanbul ignore else
    if(!this.app) {
      return;
    }    
    if (event.datasource.name === 'worktypeDS') {
      this.app.state.wtLookupPrimaryButtonDisabled = !event.selected;
    }else if (event.datasource.name === 'personDS') {
      this.app.state.perLookupPrimaryButtonDisabled = !event.selected;
    }else if (event.datasource.name === 'failureclassDS') {
      this.app.state.fcLookupPrimaryButtonDisabled = !event.selected;
    }else if (event.datasource.name === 'failurelistDS') {
      this.app.state.pcLookupPrimaryButtonDisabled = !event.selected;
    }else if (event.datasource.name === 'assetLookupDS') {
      this.app.state.assetLookupPrimaryButtonDisabled = !event.selected;
    }else if (event.datasource.name === 'locationLookupDS') {
      this.app.state.locationLookupPrimaryButtonDisabled = !event.selected;
    }else if (event.datasource.name === 'contractLookupDs') {
      this.app.state.contractLookupPrimaryButtonDisabled = !event.selected;
    } else if (event.datasource.name === 'jobplanLookupds') {
        this.app.state.jobPlanLookupPrimaryButtonDisabled = !event.selected;
    }else if (event.datasource.name === 'inspFormLookupds') {
        this.app.state.inspFormLookupPrimaryButtonDisabled = !event.selected;
    }else if (event.datasource.name === 'classificationListLookupDS') {
      this.app.state.classificationTLookupPrimaryButtonDisabled = !event.selected;
    }else if (event.datasource.name === 'classificationHierarchicalLookupDS') {
      this.app.state.classificationHLookupPrimaryButtonDisabled = !event.selected;
    }
	
  }

/**
 * Get synonym for a specific valueid.
 * @param {Datasource} synonymDS
 * @param {String} domainId
 * @param {String} valueId
 */
 async getSynonym (synonymDS, domainId, valueId){
  await synonymDS.initializeQbe();
  synonymDS.setQBE('domainid', '=', domainId);
  synonymDS.setQBE('valueid', '=', valueId);
  const response = await synonymDS.searchQBE(undefined, true);
  // istanbul ignore else
  if (response && response[0]) {
    return response[0];
  } else {
    return undefined;
  }
};

/**
   * Returns the pages in the pack stack.
   * @returns {Array<Page>} Array of Page objects in the page stack.
   */
 getPageStack(stack,refpage) {
  // istanbul ignore else
  if(stack != null && refpage != null) {
    let wolistpagename = 'wolist';
    let page = this.app.findPage(wolistpagename);
    let workordermsg = this.app.state.dialogTitle = this.app.getLocalizedMessage(
      'WOSUMMARY',
      'workorders',
      'Work orders'
    );
    // istanbul ignore else
    if(page) {
      refpage.dynamicPageTitleUpdate(page, workordermsg);
    }
    let index = stack.indexOf(wolistpagename);
    // istanbul ignore else
    if (index > -1) {
      stack.splice(index, 1);
    }

    let summpagename = "WOSummaryPage"
    let summpage = this.app.findPage(summpagename);
    let summpagemsp = this.app.state.dialogTitle = this.app.getLocalizedMessage(
      'WOSUMMARY',
      'summary',
      'Summary'
    );
    if(summpage) {
      refpage.dynamicPageTitleUpdate(summpage, summpagemsp);
    }

    index = stack.indexOf(summpagename);
    // istanbul ignore else
    if (index > -1) {
      stack.splice(index, 1);
    }

    let currpage = stack.pop();
    stack.push(wolistpagename);
    // istanbul ignore else
    if (index > -1) {
      stack.push(summpage);
    }
    stack.push(currpage);
  }
 }

 /**
   * API that opens the dialog to display WO Classification in Hierarchical format
   */
 async openClassificationHierarchicalLookup() {
  this.page.showDialog('openClassificationHierarchicalLookup');
}

/**
   * Opens the JP dialog .
   */
 async openJPdlg() {
  this.page.showDialog('jobPlanDlg');
}

/**
* Choose selected job plan from dialog 
*
*/
 chooseJobPlan(event){ 
	   let selectedTab=this.app.state.selectedTabIndex;
	  if (selectedTab===0){
		   event.datasource= this.app.findDatasource("jobPlanASds");		  
	  }else{
		  event.datasource= this.app.findDatasource("jobplanLookupds");
	  }
    let parentWODS= this.getDataSource();
    // istanbul ignore else
    if(event.datasource!=null && event.datasource.getSelectedItems()!=null){
      let selectedJP = event.datasource.getSelectedItems()[0];
	  parentWODS.item.jpnum=selectedJP.jpnum; 
      //parentWODS.item.inspformname=selectedJP.inspformname;	  
    }
  }



 async openInspectionFormDlg() {
  this.page.showDialog('inspectionFormDlg');
}

/**
*clears the selection done on other tab 
*for cleaner presentaion 
*
*/

 clearSelectedJP(){
	   let selectedTab=this.app.state.selectedTabIndex;	   
	    if (selectedTab===0){			
			this.app.findDatasource("jobplanLookupds").clearSelections();		 		  
	  }else if (selectedTab===1){		  
		  this.app.findDatasource("jobPlanASds").clearSelections();		  
	  }	   
  } 
/**
*clears the selection done on other tab 
*for cleaner presentaion 
*
*/
 clearSelected(){
	   let selectedTab=this.app.state.selectedTabIndex;	   
	    if (selectedTab===0){			
			this.app.findDatasource("inspFormLookupds1").clearSelections();		 		  
	  }else if (selectedTab===1){		  
		  this.app.findDatasource("inspFormALds").clearSelections();		  
	  }	   
  }   
/**
* Choose selected form from inspection form dialog the dialog 
*
*/
 chooseInspForm(event){ 
	   let selectedTab=this.app.state.selectedTabIndex;
	  if (selectedTab===0){
		   event.datasource= this.app.findDatasource("inspFormALds");		  
	  }else{
		  event.datasource= this.app.findDatasource("inspFormLookupds1");
	  }
    let parentWODS= this.getDataSource();
    // istanbul ignore else
    if(event.datasource!=null && event.datasource.getSelectedItems()!=null){
      let selectedIf = event.datasource.getSelectedItems()[0];
	  parentWODS.item.inspformnum=selectedIf.inspformnum; 
      parentWODS.item.inspformname=selectedIf.inspformname;	  
    }
  }
  
}

export default WorkOrderCreateController;

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
import {Application, log} from '@maximo/maximo-js-api';

const TAG = 'TaskController';

class TaskController {

  pageInitialized(page, app) {
    log.t(TAG, "WO Task Page Initialized");
    this.app = app;
    this.page = page;
    this.page.state.selectedPredecessor = app.findDatasource("selectedPredecessor");
  }

  constructor(){

  }

  // istanbul ignore next
  pageResumed(page,app)  {
    // istanbul ignore if
    if(page.params.createTask){
      this.openCreateTaskPage();
      this.app.state.woresources = false;
    }else if(page.params.editTask){
      this.openEditTaskPage(page,app);
      this.app.state.woresources = false;
    }else if(page.params.editworesources){
      this.openEditWoResources(page,app);
    }
  }

    /**
     * This API Creates Task and Opens Create Task Page
     */
    async openCreateTaskPage(){
      this.app.state.classificationDS="TASKCLASSIFICATIONLOOKUP";
      this.app.state.editTask=false;
      this.app.state.selectedTabIndex = 0;
      this.app.currentPage.state.editTask = false;
      this.page.state.taskid='';

      let existingWODS =  this.app.findDatasource("existingWODetail");
      await existingWODS.forceReload();

      let woPlanTaskDetailds = this.app.findDatasource("woPlanTaskDetailds");
      //To clear the errornous item in the DS
      woPlanTaskDetailds.clearChanges();
      await woPlanTaskDetailds.addNew();
      let taskId = woPlanTaskDetailds.item.taskid;
      let parent = woPlanTaskDetailds.item.parent;
      woPlanTaskDetailds.item.remdur = "0";
      await woPlanTaskDetailds.save();
      let taskcreationmsg = this.app.getLocalizedMessage(
        'WOSUMMARY',
        'wo_task_creation_msg',
        'Task {0} was created',
        [taskId]
        );
      //Refetch the data to display
      woPlanTaskDetailds = await this.getWOPlanTaskDetails(taskId,parent);
      this.app.toast('Success!','success',taskcreationmsg);

      this.app.state.taskAttachmentPresent = woPlanTaskDetailds.item.doclinks?woPlanTaskDetailds.item.doclinks.member.length>0:false?true:false;

      let selectedPredecessor = this.app.findDatasource('selectedPredecessor');
      await selectedPredecessor.load({ src: [], noCache: true });
      //Note : taskDetailResource does not have wonum. So we have to load woTaskResource
      let woTaskDS = this.app.currentPage.datasources.woTaskResource;
      await woTaskDS.initializeQbe();
      woTaskDS.clearQBE();
      woTaskDS.setQBE('workorderid', '=', woPlanTaskDetailds.item.workorderid);
      await woTaskDS.searchQBE();

      this.app.state.editTask=true;
      woPlanTaskDetailds.state.canSave=true;
      //reset responsibility tables
      let responsibilityTable = this.app.findDatasource("responsibilityTable");
      await responsibilityTable.load({ src: [], noCache: true });
      let addcraftCrewtypeDSTable = this.app.findDatasource('addcraftCrewtypeDSTable');
      await addcraftCrewtypeDSTable.load({ src: [], noCache: true });
      let addLaborCrewDSTable = this.app.findDatasource('addLaborCrewDSTable');
      await addLaborCrewDSTable.load({ src: [], noCache: true });
      this.page.state.taskid =taskId;
    }

  /**
   * 
   * @param {*} obj responsibility object
   * @param {*} properties different roles present in responsibility
   * @returns 
   */
  filterProperties(obj, properties) {
      return Object.fromEntries(
          Object.entries(obj).filter(([key, value]) => properties.includes(key))
      );
    }

  /**
   * Opens Create Task Page in Edit Mode
   * @param {*} page
   */
  async openEditTaskPage(page){
    //woPlanTaskDetailds is at Page level
    let woPlanTaskDetailds = await this.getWOPlanTaskDetails(page.params.taskid,page.params.parent);

    const doclinkds = woPlanTaskDetailds.getChildDatasource('doclinks', woPlanTaskDetailds.item);

    // istanbul ignore if
    if (doclinkds) {
      try {
         woPlanTaskDetailds.setPreserveChildren(true);
         await doclinkds.load();
      } catch (e) /* istanbul ignore next */ {
         log.e(TAG, 'Error in buildDoclinkDS: ', e);
      }
    }

    // istanbul ignore if
    if(woPlanTaskDetailds.item.remdur === null){
      woPlanTaskDetailds.item.remdur="0";
    }

    //Note : taskDetailResource does not have wonum. So we have used woTaskDS
    let woTaskDS = this.app.currentPage.datasources.woTaskResource;
    await woTaskDS.initializeQbe();
    woTaskDS.clearQBE();
    woTaskDS.setQBE('workorderid', '=', woPlanTaskDetailds.item.workorderid);
    let woTask = await woTaskDS.searchQBE();
    this.app.state.taskAttachmentPresent = doclinkds?doclinkds.items.length>0:false?true:false;
  
    let existingPredecessor = this.app.currentPage.datasources.woTaskRelation;
    await existingPredecessor.initializeQbe();
    existingPredecessor.clearQBE();
    this.app.state.taskwonum=woTask?.[0]?.wonum;
    existingPredecessor.setQBE('wonum', '=', woTask?.[0]?.wonum);
    existingPredecessor = await existingPredecessor.searchQBE();
  
    let selectedPredecessor = this.app.findDatasource('selectedPredecessor');
    let taskItems = [];
    existingPredecessor?.forEach(item => {
      taskItems.push(item);
    });
    this.app.state.taskItems=taskItems;
    await selectedPredecessor.load({ src: taskItems, noCache: true });

    //Load wplabor details for edit task responsibility tab
    this.loadWPLaborDetails(woTaskDS.item,woPlanTaskDetailds);
  }
  
  /**
   * Opens Create Task Page in Edit Mode
   * @param {*} page 
   */
  async openEditWoResources(page){
    this.app.state.woresources=true;
    let woDetailResource = this.app.findDatasource("woDetailResource");
    let workorderResource = this.app.currentPage.datasources.woTaskResource;
    await workorderResource.initializeQbe();
    workorderResource.clearQBE();
    this.app.state.wonum=woDetailResource.item.wonum;
    workorderResource.setQBE('wonum', '=', woDetailResource.item.wonum);
    let workorderResourceData = await workorderResource.searchQBE();

    //Load wplabor details for edit task responsibility tab
    this.loadWPLaborDetails(workorderResourceData[0],woDetailResource);
  }

   /**
   * Load Work Plan Labor
   * @param {*} woitem - woitem is woTaskResource.item
   * @param {*} datasource  - datasource can be either woTaskDS or woDetailResource
   */
   async loadWPLaborDetails(woitem,datasource){
    let wpLaborDataDS = this.app.findDatasource("addcraftCrewtypeDS");
    await wpLaborDataDS.initializeQbe();
    wpLaborDataDS.clearQBE();
    wpLaborDataDS.setQBE('wonum', '=', woitem.wonum);
    await wpLaborDataDS.searchQBE();
    let wpLaborData = await wpLaborDataDS.forceReload();
    //on click of cancel task wee need to rollback to the previous saved state
    let cancelWpLaborDS = this.app.findDatasource("cancelWpLaborDS");
    await cancelWpLaborDS.load({ src: wpLaborData, noCache: true });
     // istanbul ignore next
    let craftCrew = wpLaborData?.filter(element => element.craft != null || element.amcrewtype != null);
    // istanbul ignore next
    let laborCrew = wpLaborData?.filter(element => element.laborcode != null || element.amcrew != null);
    await this.page.datasources.addcraftCrewtypeDSTable.load({ src: craftCrew, noCache: true });
    await this.page.datasources.addLaborCrewDSTable.load({ src: laborCrew, noCache: true });
    // Array of Roles to find in the responsibility object
    
    const roles = ['owner', 'supervisor', 'lead','ownergroup','crewworkgroup','persongroup','amcrew','commodity','commoditygroup'];

    // Add roles to display table
    const foundRoles = this.filterProperties(datasource.item, roles);
    const entries = Object.entries(foundRoles);
    if (entries.length>0){
        entries.forEach(([role, name]) => {
          this.page.state.selectedRole = role;
          this.addResponsiblityNameRole(name);
      });
    }
  }

  /**
   * Revert wplabor Task on cancel
  */
  async cancelTask(){
    let page ={'value':'WOSummaryPage'};
    if(!this.app.findDatasource("woPlanTaskDetailds").state.canSave){
      let wplabords = this.app.findDatasource("addcraftCrewtypeDS");
      await wplabords.reset(wplabords.baseQuery);
      this.saveTableData(wplabords,this.page.datasources.cancelWpLaborDS.items);
    }
    this.gotoPage(page,1);// Redirect to the task summary page
  }

  /**
   * Update Task
  */
  async updateTask(){
    if(!this.app.state.woresources){
      let woPlanTaskDetailds = this.app.findDatasource("woPlanTaskDetailds");
      // istanbul ignore else
      if(this.app){
        let woTaskResource = this.app.findDatasource("woTaskResource");
        await woTaskResource.initializeQbe();
        woTaskResource.clearQBE();
        woTaskResource.setQBE('workorderid', '=', woPlanTaskDetailds.item.workorderid);
        await woTaskResource.searchQBE();

        // update the Responsibility DS
        let addcraftCrewtypeDS = this.app.findDatasource("addcraftCrewtypeDS");
        await addcraftCrewtypeDS.reset(addcraftCrewtypeDS.baseQuery);
        let tableList = [...this.page.datasources.addcraftCrewtypeDSTable.items, ...this.page.datasources.addLaborCrewDSTable.items];
        this.saveTableData(addcraftCrewtypeDS,tableList);

        // update the roles
        const roles = ['owner', 'supervisor', 'lead','ownergroup','crewworkgroup','persongroup','amcrew','commodity','commoditygroup'];
        roles.forEach(property => woPlanTaskDetailds.item[property]='');
        // Select properties 'roleid' and 'name' from each object in the array and add them to selectedPropertiesArray
        let updatedResponsibilityList = this.app.findDatasource("responsibilityTable").items;
        updatedResponsibilityList.forEach(obj => {
            const { roleid, name } = obj; // Destructure the object to select specific properties
            delete woPlanTaskDetailds.item[roleid];
            woPlanTaskDetailds.item[roleid] =name;
        });
        // istanbul ignore if
        if(this.page.state.addPredecessor){
          await this.savePredecessor(woTaskResource);
        }
        woPlanTaskDetailds.state.canSave=true;
        let taskUpdate = await woPlanTaskDetailds.save();
        woPlanTaskDetailds.forceReload();
        // istanbul ignore else
        if(taskUpdate && !taskUpdate.error){
          let taskUpdateMsg = this.app.getLocalizedMessage(
            'WOSUMMARY',
            'wo_task_update_msg',
            'Task updated successfully'
            );
          this.app.toast('Success!','success',taskUpdateMsg);
        }
      }
    }else{
      let woDetailResource = this.app.findDatasource("woDetailResource");
      await woDetailResource.initializeQbe();
      woDetailResource.clearQBE();
      woDetailResource.setQBE('workorderid', '=', this.app.state.workorderid);
      await woDetailResource.searchQBE();
      // update the roles
      const roles = ['owner', 'supervisor', 'lead','ownergroup','crewworkgroup','persongroup','amcrew','commodity','commoditygroup'];
      roles.forEach(property => woDetailResource.item[property]='');
      // Select properties 'roleid' and 'name' from each object in the array and add them to selectedPropertiesArray
      let updatedResponsibilityList = this.app.findDatasource("responsibilityTable").items;
      updatedResponsibilityList.forEach(obj => {
          const { roleid, name } = obj; // Destructure the object to select specific properties
          delete woDetailResource.item[roleid];
          woDetailResource.item[roleid] =name;
      });
      woDetailResource.state.canSave=true;
      let woupdate = await woDetailResource.save();
      woDetailResource.forceReload();
       // update the WO resources Table DS
      let addcraftCrewtypeDS = this.app.findDatasource("addcraftCrewtypeDS");
      await addcraftCrewtypeDS.reset(addcraftCrewtypeDS.baseQuery);
      let tableList = [...this.page.datasources.addcraftCrewtypeDSTable.items, ...this.page.datasources.addLaborCrewDSTable.items];
      this.saveTableData(addcraftCrewtypeDS,tableList);
      if(woupdate && !woupdate.error){
        let woDetailResourceMsg = this.app.getLocalizedMessage(
        'WOSUMMARY',
        'wo_resource_update_msg',
        'Work order resources updated successfully'
        );
        this.app.toast('Success!','success',woDetailResourceMsg);
      }
    }
  }
/**
 * 
 * @param {*} wplabords Maximo Datascource for saving
 * @param {*} tablelist list of items added to craft crew and labor table
 */
  async saveTableData(wplabords,tablelist){
    const deleteObjectsArr = wplabords.items.filter(obj1 => !tablelist.some(obj2 => obj2.wplaborid === obj1.wplaborid));
    log.t(TAG, "Items to be deleted ",deleteObjectsArr);console.log(deleteObjectsArr);// list of all the deleted items from UI
    for (let i = 0; i < deleteObjectsArr.length; i++) {
      await wplabords.delete(deleteObjectsArr[i]);
    }
    wplabords.forceReload();
  }

  /**
 * Set description on the basis of content
 * @param {*} rich text editor on change event
 */
  async onEditorChange(evt) {
    let woPlanTaskDetailds = this.app.findDatasource("woPlanTaskDetailds");
    woPlanTaskDetailds.item.description_longdescription=evt.target.content;
  }

  /**
   * 
   * @param {*} event 
   */
  updateAssetDescription(event){
    let woPlanTaskDetailds = this.app.findDatasource("woPlanTaskDetailds");
    woPlanTaskDetailds.item.assetdesc=event.description;
    // istanbul ignore else
    if(event.location){
      woPlanTaskDetailds.item.location=event.location.location;
      woPlanTaskDetailds.item.locationdesc=event.location.description;
    }else{
      let assetLookupDS = this.app.findDatasource("assetLookupDS");
      if(assetLookupDS.items!=null && assetLookupDS.items.length>0){
        const selectedAsset = assetLookupDS.items.find(asset => asset.assetnum === event.value);
        woPlanTaskDetailds.item.assetdesc=selectedAsset.description;
        woPlanTaskDetailds.item.location=selectedAsset.location.location;
        woPlanTaskDetailds.item.locationdesc=selectedAsset.location.description;
      }
    }
    }

  updateLocationDescription(event){
    // istanbul ignore else
    if(event && event.value) {
      event.location = event.value;
    }
    let woPlanTaskDetailds = this.app.findDatasource("woPlanTaskDetailds");
    let locationLookupDS = this.app.findDatasource("locationLookupDS");
    // istanbul ignore else
    if(locationLookupDS.items != null && locationLookupDS.items.length > 0){
      const selectedLocation = locationLookupDS.items.find(location => location.location === event.location);
      // istanbul ignore else
      if(selectedLocation) {
        woPlanTaskDetailds.item.location=selectedLocation.location;
        woPlanTaskDetailds.item.locationdesc=selectedLocation.description;
      }
    }
  }

    onDatasourceSelectionChanged(event) {
      if (event.datasource.name === 'assetLookupDS') {
        this.app.state.assetLookupPrimaryButtonDisabled = !event.selected;
      }else if (event.datasource.name === 'locationLookupDS') {
        this.app.state.locationLookupPrimaryButtonDisabled = !event.selected;
      }else if (event.datasource.name === 'inspFormLookupds') {
        this.app.state.inspFormLookupPrimaryButtonDisabled = !event.selected;
      }else if (event.datasource.name === 'classificationListLookupDS') {
        this.app.state.classificationTLookupPrimaryButtonDisabled = !event.selected;
      }else if (event.datasource.name === 'classificationHierarchicalLookupDS') {
        this.app.state.classificationHLookupPrimaryButtonDisabled = !event.selected;
      }else if (event.datasource.name === 'personDS') {
        this.app.state.inspectorLookupPrimaryButtonDisabled = !event.selected;
        this.app.state.perLookupPrimaryButtonDisabled = !event.selected;
      }else if (event.datasource.name === 'measurementPointDS') {
        this.app.state.measurementPointLookupPrimaryButtonDisabled = !event.selected;
      }else if (event.datasource.name === 'shiftds' && this.app) {
        this.app.state.shiftLookupPrimaryButtonDisabled = !event.selected;
      }else if (event.datasource.name === 'laborLookup') {
        this.app.state.lookupPrimaryButtonDisabled = !event.selected;
      }else if (event.datasource.name === 'personGroupDS') {
        this.app.state.lookupPrimaryButtonDisabled = !event.selected;
      }else if (event.datasource.name === 'crewworkGroupLookup' && event.selected) {
        this.app.state.lookupPrimaryButtonDisabled = !event.selected;
      }else if (event.datasource.name === 'workGroupLookup') {
        this.app.state.lookupPrimaryButtonDisabled = !event.selected;
      }else if (event.datasource.name === 'crewLookup' && event.selected) {
        this.app.state.lookupPrimaryButtonDisabled = !event.selected;
        this.page.datasources.addLaborCrewDS.item.vendor = event.item.vendor;
      }else if (event.datasource.name === 'crewTypeLookupDS') {
        this.app.state.lookupPrimaryButtonDisabled = !event.selected;
      }else if (event.datasource.name === 'craftLookup' && event.selected) {
        this.app.state.lookupPrimaryButtonDisabled = !event.selected;
        this.page.datasources.addcraftCrewtypeDS.item.skilllevel = event.item.skilllevel;
        this.page.datasources.addcraftCrewtypeDS.item.contractnum = event.item.contractnum;
        this.page.datasources.addcraftCrewtypeDS.item.vendor = event.item.vendor;
       }
    }

  /**
   * Navigate Task Summary Page
   * @param {*} page
   */
  gotoPage(page,index=0) {
    // istanbul ignore if
      if (page.value == 'WOSummaryPage') {
        this.page.state.displayTaskSummary = false;
        if(!this.app.state.woresources){
          this.app.state.woPlanSelectedTabIndex=1;
        }else{
          this.app.state.woPlanSelectedTabIndex=0;
        }
      }
      this.app.setCurrentPage({ name: page.value, params: { selected_wodpanel_Index : index }});
    }

  /**
   * Toggle between craft and crew Dialog
   * @param {*} param
   */
  selectCraftCrewOption(param){
      this.page.state.showCraftCrewOption= param.select;
  }
  /**
   * Toggle between labor and crew dialog
   * @param {*} param
   */
  selectLaborCrewOption(param){
    this.page.state.showLaborCrewOption= param.select;
    // istanbul ignore next
    this.app.state.lookupPrimaryButtonDisabled = ((param.select=='Labor'&& param.laborcode==undefined) || (param.select=='Crew' && param.crew==undefined)) ? true:false;
  }

  /**
   * Delete selected table row
   * @param {*} param
   */
  async deleteRowSelected(param){
    let tableList = param.ds.items.filter(({ wplaborid }) => wplaborid !== param.item.wplaborid );
    await param.ds.load({ src: tableList, noCache: true });
  }

/**
 *API to add Responsibility information.
*/

async addResponsiblityNameRole(fieldData){
  // istanbul ignore else
  if(this.app && fieldData && this.page.state.selectedRole){
    let responsibilityTable = this.app.findDatasource('responsibilityTable');
    const roles = [
                    { id: "owner", description: "Owner" },
                    { id: "supervisor", description: "Supervisor" },
                    { id: "lead", description: "Lead" },
                    { id: "ownergroup", description: "Owner group" },
                    { id: "crewworkgroup", description: "Crew work group" },
                    { id: "persongroup", description: "Work group" },
                    { id: "amcrew", description: "Crew" },
                    { id: "commodity", description: "Service" },
                    { id: "commoditygroup", description: "Service group" },
                  ];
    const inputDropdownData = roles.find(item => item['id'] === this.page.state.selectedRole);

    //check if owner or owner group is present
    let userrole = this.page.state.selectedRole;
    let responsibilityList;
       responsibilityList = responsibilityTable.items.filter(({ roleid }) => roleid !== userrole && roleid !== undefined);
       // istanbul ignore if
       if (userrole == 'owner' || userrole == 'ownergroup') {
            responsibilityList = responsibilityList.filter(({ roleid }) => roleid !== 'owner' && roleid !== 'ownergroup');
       }
    await responsibilityTable.load({ src: responsibilityList, noCache: true });
    await responsibilityTable.addNew();
    responsibilityTable.item.role = inputDropdownData.description;
    responsibilityTable.item.roleid = inputDropdownData.id;
    responsibilityTable.item.name = fieldData;
    this.page.state.responsibilityRole = responsibilityTable.item;
    await responsibilityTable.save();
    await responsibilityTable.forceReload();
    responsibilityTable.item.selectName = '';
    //save responsibility roles to task
    let woPlanTaskDetailds = this.app.findDatasource("woPlanTaskDetailds");
    woPlanTaskDetailds.item[this.page.state.responsibilityRole.roleid] = this.page.state.responsibilityRole.name;
    this.page.state.selectedRole='';
   }
}
/**
 *Delete selected Responsibility Information from the table.
*/

  async removeRole(role){
    // istanbul ignore else
    if(this.app && this.page){
      let updateResponsibilityTable = this.app.findDatasource('responsibilityTable');
      await updateResponsibilityTable.deleteItem(role);
      let woPlanTaskDetailds = this.app.findDatasource("woPlanTaskDetailds");
      woPlanTaskDetailds.item[role.roleid] = role.name;
      delete woPlanTaskDetailds.item[role.roleid];
    }
  }

/**
 *API to add Craft Crew information.
*/

async addCraftCrewType(){
  let showCraftCrewOption = this.page.state.showCraftCrewOption;
  let addCraftCrewtypeDS = this.page.datasources.addcraftCrewtypeDS;
    if(showCraftCrewOption=='Craft'){
      addCraftCrewtypeDS.item.amcrewtype = '';
    }
    if(showCraftCrewOption=='CrewType'){
      addCraftCrewtypeDS.item.craft = '';
      addCraftCrewtypeDS.item.amcrew = '';
      addCraftCrewtypeDS.item.contractnum = '';
      addCraftCrewtypeDS.item.vendor = '';
      addCraftCrewtypeDS.item.skilllevel = '';
    }
    addCraftCrewtypeDS.save();
    await this.page.datasources.addcraftCrewtypeDSTable.add(addCraftCrewtypeDS.item);
    await this.page.datasources.addcraftCrewtypeDSTable.forceReload();
}

  /**
   *API to add Labor Crew information to table.
   */
  async addLaborCrewType(){
    let showLaborCrewOption = this.page.state.showLaborCrewOption;
    let addLaborCrewDS = this.page.datasources.addLaborCrewDS;
    let laborcode = addLaborCrewDS.item.laborcode;
    let laborhrs = addLaborCrewDS.item.laborhrs;

      if(showLaborCrewOption=='Labor'){
        addLaborCrewDS.item.amcrew = '';
        addLaborCrewDS.item.crewworkgroup = '';
      }
      if(showLaborCrewOption=='Crew'){
        addLaborCrewDS.item.laborcode = '';
      }

      let laborCrewSaveResponse = await addLaborCrewDS.save();
      // istanbul ignore else
      if(laborCrewSaveResponse && !laborCrewSaveResponse.error){
        await this.page.datasources.addLaborCrewDSTable.add(addLaborCrewDS.item);
        await this.page.datasources.addLaborCrewDSTable.forceReload();

        let addAssignmentDS = this.page.datasources.addAssignmentDS;
        await addAssignmentDS.initializeQbe();
        addAssignmentDS.clearQBE();
        addAssignmentDS.setQBE('wplaborid', '=', addLaborCrewDS.item.wplaborid);
        addAssignmentDS.setQBE('wonum', '=',this.app.state.woresources ? this.app.state.wonum : this.app.state.taskwonum);
        let assignment = await addAssignmentDS.searchQBE();
        assignment[0].laborcode = laborcode;
        assignment[0].laborhrs = laborhrs;
        addAssignmentDS.save();
      }else{
        await addLaborCrewDS.load({ src: this.page.datasources.addLaborCrewDSTable, noCache: true });
      }
  }

  /**
   *API to show the dialog box.
   */
  async showDialog(param){
    await param.ds.addNew();
    this.page.showDialog(param.dialog);
   }

   /**
   *API to cancel the dialog box.
   */
  async cancelDialog(param){
    await this.page.findDatasource(param).popNewItem();
  }

  /**
   *
   * @param {InspectionFormDescription} event
   */
  updateInspFormDescription(event) {
    let woPlanTaskDetailds = this.app.findDatasource("woPlanTaskDetailds");
    let inspFormLookupds = this.app.findDatasource("inspFormLookupds");
    // istanbul ignore else
    if (inspFormLookupds.items != null && inspFormLookupds.items.length > 0) {
        const selectedInspForm = inspFormLookupds.items.find(inspform => inspform.inspformnum === event.inspformnum);
        woPlanTaskDetailds.item.inspformname = selectedInspForm.name;
    }
  }
  /**
  * API that opens the dialog to display WO Classification in Hierarchical format
  */
  async openClassificationHierarchicalLookup() {
    this.app.state.taskPage=true;
    this.page.showDialog('openClassificationHierarchicalLookup');
  }

    /**
 * API to update classstructureid and description of selected classification from lookup
 * @param {*} event - Classification DS selected from lookup
 */
    chooseClassification(event){
      let woPlanTaskDetailds = this.app.findDatasource("woPlanTaskDetailds");
      // istanbul ignore else
      if(event.datasource!=null && event.datasource.getSelectedItems()!=null){
        let selectedCS = event.datasource.getSelectedItems()[0];
        woPlanTaskDetailds.item.classstructureid=selectedCS.classstructureid;
        woPlanTaskDetailds.item.classstructuredesc=selectedCS.description;
        woPlanTaskDetailds.item.hierarchypath = selectedCS.hierarchypath;
      }
    }

    /**
     * 
     * @param {object} woPlanTaskDetailds - To Show predecesser within same workorder Hierarchy
     */
    async openPredecessorLookup(woPlanTaskDetailds){
      // istanbul ignore else
      if(this.app){
        let woPlanTaskDetailds = this.app.findDatasource("woPlanTaskDetailds");
        this.app.currentPage.state.showPredecessorOption="task";
        let woTaskPredecessor = this.app.findDatasource('woTaskPredecessor');
        woTaskPredecessor.clearState();
        woTaskPredecessor.resetState();
        await woTaskPredecessor.initializeQbe();
        woTaskPredecessor.setQBE('siteid', '=', this.app.client.userInfo.insertSite);
        woTaskPredecessor.setQBE('parent', '=',woPlanTaskDetailds.item.parent);
        woTaskPredecessor.setQBE('workorderid', '!=',woPlanTaskDetailds.item.workorderid);
        await woTaskPredecessor.searchQBE();
        
        let wonums = woTaskPredecessor.items.map(item => item.wonum);
        wonums.push(woPlanTaskDetailds.item.parent);
        wonums.join(", ");
        wonums = "["+wonums+"]";
        let allwoPredecessor = this.app.findDatasource('allwoPredecessor');
        allwoPredecessor.clearState();
        allwoPredecessor.resetState();
        await allwoPredecessor.initializeQbe();
        allwoPredecessor.setQBE('wonum', '!=',wonums);
        allwoPredecessor.setQBE('workorderid', '!=',woPlanTaskDetailds.item.workorderid);
        allwoPredecessor.setQBE('siteid', '=', this.app.client.userInfo.insertSite);
        await allwoPredecessor.searchQBE();

        let selectedPredecessor = this.app.findDatasource('selectedPredecessor');
        // istanbul ignore else
        if(selectedPredecessor.items !=null && selectedPredecessor.items.length>0){
          for (let i = 0; i < selectedPredecessor.items.length; i++) {
            this.markedSelected(woTaskPredecessor, selectedPredecessor.items[i]);
            this.markedSelected(allwoPredecessor, selectedPredecessor.items[i]);
          }
        }
        this.app.currentPage.state.showPredecessorOption = "task";
        this.app.currentPage.state.selectedRadioGrp = "task";
        this.app.showDialog("displayPredecessor");
      }
    }

    /**
     * 
     * @param {Object} ds -- Datasource
     * @param {Object} selectedItem - Selected Item
     */
    markedSelected(ds, selectedItem) {
      let Itemlist = ds.items;
      Itemlist.forEach(item => { 
        // istanbul ignore next
        if ((item.wonum && item.wonum === selectedItem.wonum)) {
          ds.setSelectedItem(item, true);
          ds.currentItem._selected = true;
          ds.save();
        }
      });
    }
    
    /**
     * 
     * @param {Object} event 
     */
    selectPredecessor(event){
      // istanbul ignore else
      if(this.page){
        try {
        this.page.state.showPredecessorOption = event;
        this.page.state.selectedRadioGrp = event;
        }catch (e) {
          // istanbul ignore next
          console.log("Error");
        }
      }
    }

    /**
     * 
     * @param {Object} ds 
     * @param {Application} app 
     */
    onDatasourceInitialized(ds, app) {
      this.datasource = ds;
      this.app = app;
      this.selectedDSMethod = this.selectedDSMethod.bind(this);
      this.datasource.on('datasource-selection-changed', this.selectedDSMethod);
    }

    /**
     * 
     * @param {Object} event 
     */
    // istanbul ignore next
    selectedDSMethod(event) {
      let selectedPredecessor = this.app.findDatasource('selectedPredecessor');
      if (event.selected) {
        this.addItemstoDS(selectedPredecessor, event.item);
      }
      if (event.item && event.item._selected === false && event.selected !== undefined) {
        const filteredSeletedItem = selectedPredecessor.items.filter(item => item.wonum === event.item.wonum);
        if (filteredSeletedItem.length > 0){
          this.removeSeletedItem(event.item);
        }
      }
    }

    /**
     * 
     * @param {Object} selectedDSitem - Selected Datasource
     * @param {Object} selectedItem 
     */
    addItemstoDS = async (selectedDSitem, selectedItem) => {
      // istanbul ignore else
      if(selectedDSitem.items.filter(item => item.wonum == selectedItem.wonum) != null && 
      selectedDSitem.items.filter(item => item.wonum == selectedItem.wonum).length == 0){
        let dest = await selectedDSitem.addNew();
        Object.keys(selectedItem).forEach(k => (dest[k] = selectedItem[k]));
        await selectedDSitem.setSelectedItem(dest, true);
        await selectedDSitem.save();
        await selectedDSitem.forceReload();
      }
    }

    /**
     * 
     * @param {Object} event 
     */
    removeSeletedItem(event) {
      // istanbul ignore else
      if(this.app){
        let selectedPredecessor = this.app.findDatasource('selectedPredecessor');
        let woTaskPredecessor = this.app.findDatasource('woTaskPredecessor');
        let allwoPredecessor = this.app.findDatasource('allwoPredecessor');
        const filteredSelectedDS = selectedPredecessor.items.filter(item => item.wonum === event.wonum);
        selectedPredecessor.deleteItems(filteredSelectedDS);
        //selectedPredecessor.load({ src: filteredSelectedDS, noCache: true });

        const woTaskItem = woTaskPredecessor.items.filter(item => item.wonum === event.wonum);
        // istanbul ignore if
        if(woTaskItem!=null && woTaskItem.length>0){
          woTaskPredecessor.setSelectedItem(woTaskItem[0], false); // update Work Record within work hierarchy
          woTaskPredecessor.forceReload();
        }
        const woItem = allwoPredecessor.items.filter(item => item.wonum === event.wonum);
        // istanbul ignore if
        if(woItem!=null && woItem.length>0){
          allwoPredecessor.setSelectedItem(woItem[0], false); // update Work Record outside work hierarchy
          allwoPredecessor.forceReload();
        }
      }
    }

    /**
     * Add Predecessor to the task
     */
    async addPredecessor(){
      // istanbul ignore else
      if(this.app){
        this.page.state.addPredecessor=true;
      }
    }

    /**
     * Cancel Predecessor Add
     */
    async cancelAddPredecessor(){
       // istanbul ignore else
      if(this.app){
        if(this.app.state.taskItems){
          let selectedPredecessor = this.app.findDatasource('selectedPredecessor');
          //await selectedPredecessor.load({ src: this.app.state.taskItems, noCache: true });
          await selectedPredecessor.reset({src: this.app.state.taskItems}, true, {resetDataAdapter: true, resetItems: true, resetSchema: true});
        }
        //let woPlanTaskDetailds = this.app.findDatasource("woPlanTaskDetailds");
        //await woPlanTaskDetailds.forceReload();
      }
    }

    async savePredecessor(woTaskResource){
      let existingPredecessor = this.page.datasources.woTaskRelation;
      await existingPredecessor.initializeQbe();
      existingPredecessor.setQBE('wonum', '=', woTaskResource.item.wonum);
      await existingPredecessor.searchQBE();
      let itemsToDelete = existingPredecessor.items;

      let selectedPredecessor = this.app.findDatasource('selectedPredecessor');
      let itemsToAdd = selectedPredecessor.items;

      // istanbul ignore next
      if (itemsToDelete != null && itemsToDelete.length > 0) {
        existingPredecessor.deleteItems(itemsToDelete);
        await existingPredecessor.forceReload();
      }

      let taskRelationship = [];
      // istanbul ignore next
      itemsToAdd.forEach((item, i) => {
          let newTaskRelation = {
            wonum: woTaskResource.item.wonum,
            orgid: item.orgid,
            siteid:item.siteid,
            predrefwonum:item.wonum,
            predwonum: item.wonum,
            predtaskid: item.taskid?item.taskid:item.predtaskid

          }
          taskRelationship.push(newTaskRelation);
      });
      await existingPredecessor.bulkAdd(taskRelationship);
      await existingPredecessor.forceReload();

      this.page.state.addPredecessor=false;
    }

   /**
    * 
    * @param {*} param toggle result of crew work group lookup based on crew lookup selection 
    */
    async updateCrewWorkGroupSelect(param){
        let ds = this.app.findDatasource("crewLookup");
        await ds.initializeQbe();
        ds.setQBE('crewworkgroup', '=', param?.persongroup);
        await ds.searchQBE();
        this.app.state.lookupPrimaryButtonDisabled = true;
     }

/**
 * 
 * @param {*} param Crew work gourp is use to filter the results of crew lookup
 */
  async updateCrewSelect(param){
    let ds = this.app.findDatasource("crewworkGroupLookup");
      await ds.initializeQbe();
      ds.setQBE('persongroup', '=', param?.amcrew);
      await ds.searchQBE();
      //enable the primary button when a crew member is selected
      // istanbul ignore next
      this.app.state.lookupPrimaryButtonDisabled = ((param?.amcrew==''|| param?.value=='') && this.page.state.showLaborCrewOption=="Crew") ? true:false;
  }

  /**
 * API to get WO Plan Task Details for given taskId and Parent WONum
 * @param {*} taskid
 * @param {*} parent
 * @returns
 */
  async getWOPlanTaskDetails(taskid,parent) {
    let woPlanTaskDetailds = this.app.findDatasource("woPlanTaskDetailds");
    await woPlanTaskDetailds.initializeQbe();
    woPlanTaskDetailds.setQBE('taskid', '=', taskid);
    woPlanTaskDetailds.setQBE('parent', '=', parent);
    await woPlanTaskDetailds.searchQBE();
    return woPlanTaskDetailds;
  }

  /**
   * Reload Task Resource when attachment is deleted
   */
  async reloadTaskResource(){
    let woPlanTaskDetailds = this.app.findDatasource("woPlanTaskDetailds");
    await woPlanTaskDetailds.forceReload();
    this.app.state.taskAttachmentPresent = woPlanTaskDetailds.item.doclinks?woPlanTaskDetailds.item.doclinks.member.length:false>0?true:false;
  }

    /**
   * API to set Task Attachment flag to true
   */
    async uploadTaskAttachment(){
      this.app.state.taskAttachmentPresent = true;
    }

}

export default TaskController;

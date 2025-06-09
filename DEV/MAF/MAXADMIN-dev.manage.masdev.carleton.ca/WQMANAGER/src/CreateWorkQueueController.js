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
import { log } from "@maximo/maximo-js-api";
const TAG = "CreateWorkQueueController";

/* eslint-disable no-console */
class CreateWorkQueueController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    this.page.state.progressWizardStepIds = [
      'stepitem1',
      'stepitem2',
      'stepitem3',
      'stepitem4',
      'stepitem5',
      'stepitem6',
    ];
    this.page.state.progressWizardcurrentStepId =
      this.page.state.progressWizardStepIds[0];

    this.page.state.progressWizardcurrentStepIndex =
      this.page.state.progressWizardStepIds.findIndex(
        i => i === this.page.state.progressWizardcurrentStepId
      );
    this.page.state.progressWizardHasPrev =
      this.page.state.progressWizardcurrentStepIndex !== 0;
    this.page.state.progressWizardHasNext =
      this.page.state.progressWizardcurrentStepIndex !==
      this.page.state.progressWizardStepIds.length - 1;
    this.page.state.stepError = null;
    this.page.state.stepErrorWithCustomBtn = null;
    this.page.state.validateStep = true;
    let workqueueDS = app.findDatasource("createWorkQueueDS");
    let editworkqueueDS = app.findDatasource("editWorkQueueDS");
    this.page.state.editworkqueueDS = editworkqueueDS;
    //istanbul ignore if
    if (workqueueDS) {
     // workqueueDS.item.intobjectname = "MXAPIWODETAIL";
      //workqueueDS.item.app = "WOTRACK";
    }
    this.page.state.workqueueDS = workqueueDS;
    this.page.state.fieldsSelectedDS = app.findDatasource("fieldsSelectedDS");
    this.page.state.editFieldsSectedDS = app.findDatasource('editFieldsSelectedDS');
    //istanbul ignore else
    if(this.app && this.page && (this.page.name === 'CreateWorkQueue' || this.page.name === 'wqListPage')) {
      let selectedPersonGroupDS = this.app.findDatasource("selectedPersonGroupDS");
      //istanbul ignore else
      if(selectedPersonGroupDS) {
        selectedPersonGroupDS.load({src:[]});
      }
    }
  }

  onDatasourceInitialized(ds, app) {
    this.datasource = ds;
    this.app = app;
    
    //istanbul ignore else
    if(ds.name === 'selectedPersonGroupDS' || ds.name === 'availablePersonGroupDS' || ds.name === 'assignedPersonGroupDSNew' || ds.name === 'assignedPersonGroupDS') {
    return;
    }
    //istanbul ignore else
    if (this.datasource.name === 'fieldsAvailableDS') {
      this.returnUpdatedDS(this.datasource);
    }
    this.selectedDSMethod = this.selectedDSMethod.bind(this);
    this.datasource.on('datasource-selection-changed', this.selectedDSMethod);
  }

  /** 
    * This method is called when the user clicks the "OK" button on the Person Group Lookup dialog. 
    * It adds the selected Person Groups to the selectedPersonGroupDS Person Groups datasource.
    * @param {Array} selectedItems Selected person groups from the lookup
    */
  onSelectPersonGroupLookupOkClick(selectedItems) {
    // istanbul ignore else
    if(this.app) {
      let selectedPersonGroupDS = this.app.findDatasource("selectedPersonGroupDS");
      let assignedItems = selectedPersonGroupDS.items;
      // istanbul ignore else
      if(assignedItems && assignedItems.length > 0) {
        selectedPersonGroupDS.deleteItems(assignedItems);
      }
      // istanbul ignore else
      if(selectedItems && selectedItems.length > 0) {
          selectedPersonGroupDS.load({src:selectedItems});
        }else{
          selectedPersonGroupDS.load({src:[]});
        }
      }
    }

   /**
    * Saves the Person Groups as membership for the new or edited workqueue.
    * @param {boolean} isNewFlag - Is this a new workqueue of a workqueue being edited
    */
    savePersonGroups = async (isNewFlag) => {
    // istanbul ignore else
    if(this.app) {
      let selectedPersonGroupDS = this.app.findDatasource("selectedPersonGroupDS");
      let assignedPersonGroupDS = null;
      if(isNewFlag) {
        assignedPersonGroupDS = this.app.findDatasource("assignedPersonGroupDSNew");
      } else {
        assignedPersonGroupDS = this.app.findDatasource("assignedPersonGroupDS");
      }
      let selectedItems = selectedPersonGroupDS.items;
      let itemstobeinserted = [];
      // istanbul ignore else
      if(assignedPersonGroupDS && assignedPersonGroupDS.items && assignedPersonGroupDS.items.length > 0) {
        assignedPersonGroupDS.deleteItems(assignedPersonGroupDS.items);
      }
      // istanbul ignore else
      if(selectedItems && selectedItems.length > 0) {
        let newItem = {
          "objectname":"MXAPIOBJECTAUTH",
          "objectid":this.app.state.thisQueuename,
          "owner":this.app.client.userInfo.personId
      };
      for(var idx=0;idx<selectedItems.length;idx++) {
          itemstobeinserted.push({
            "optionname":"READ",
            "principal":selectedItems[idx].persongroup,
            "principaltype": "GROUP"
            });
        }
        newItem.objectauth = itemstobeinserted;
        const itemTBS = await assignedPersonGroupDS.addNew();
        itemTBS.objectname=newItem.objectname;
        itemTBS.objectid=newItem.objectid;
        itemTBS.owner=newItem.owner;
        itemTBS.objectauth = newItem.objectauth;
        await assignedPersonGroupDS.save();
        await assignedPersonGroupDS.forceReload();
      }
    }
  }

  /**
   * Delete the Persongroups attached to the selected wq to be deleted.
   */
  async deletePersonGroups() {
    let deletePersonGroupDS = this.app.findDatasource("deletePersonGroupDS");
    // istanbul ignore else
    if(deletePersonGroupDS) {
      await deletePersonGroupDS.load();
      // istanbul ignore else
      if(deletePersonGroupDS.items && deletePersonGroupDS.items.length > 0) {
        deletePersonGroupDS.deleteItems(deletePersonGroupDS.items);
      }
    }
  }

  onAfterLoadData(dataSource, items) {
    // istanbul ignore else
    if (this.app) {
      if (dataSource.name === 'maximoAllqueriesDS') {
        let filteredQueries = [];
        let selectedOS = this.app.state.selectedOS.toLowerCase();
        items.forEach(item => {
          if (item.name !== "All" && item.javaMethod === undefined && item.href.includes(selectedOS)) {
            filteredQueries.push(item);
          }
        })
        let allqueriesDS = this.app.findDatasource("allqueriesDS");
        allqueriesDS.load({ src: filteredQueries, noCache: true });
      } else if (dataSource.name === 'assignedPersonGroupDS') {
        let availablePersonGroupDS = this.app.findDatasource("availablePersonGroupDS");
        // istanbul ignore else
        if(!availablePersonGroupDS || !availablePersonGroupDS.items || availablePersonGroupDS.items.length < 1) {
          return;
        }
        availablePersonGroupDS.clearSelections();
        let selectedItemsArray = [];
        dataSource.items.forEach(item => {
          let objectautharray = item.objectauth.filter(item=>item.principaltype === "GROUP");
          for(let idx=0;idx<objectautharray.length;idx++) {
            let availableItem = availablePersonGroupDS.items.find(search => search.persongroup === objectautharray[idx].principal);
            if(availableItem && availableItem.description) {
              item.description = availableItem.description;
              availablePersonGroupDS.setSelectedItem(availableItem,true);
              selectedItemsArray.push({persongroup:objectautharray[idx].principal,description:item.description});
            }
          }
        });
        let selectedPersonGroupDS = this.app.findDatasource("selectedPersonGroupDS");
        selectedPersonGroupDS.load({src:selectedItemsArray});
      }
    }
  }

  /**
   * This would highlight current step in the wizard
   * @param {Number} id - Id of the wizard step
   */
  updateWizard(id) {
    this.page.state.progressWizardcurrentStepIndex =
      this.page.state.progressWizardStepIds.findIndex(i => i === id);
    this.page.state.progressWizardHasPrev =
      this.page.state.progressWizardcurrentStepIndex !== 0;
    this.page.state.progressWizardHasNext =
      this.page.state.progressWizardcurrentStepIndex !==
      this.page.state.progressWizardStepIds.length - 1;
  }

  getNextStep() {
    // istanbul ignore else
    if(!this.page) {
      return;
    }    
    this.page.state.stepErrorWithCustomBtn = null;
    if (this.validateStep(this.page.state.progressWizardcurrentStepIndex)) { //Field Validation for steps
      let idx = this.page.state.progressWizardcurrentStepIndex + 1;
      // istanbul ignore else
      if (idx < this.page.state.progressWizardStepIds.length) {
        for (
          idx;
          idx < this.page.state.progressWizardStepIds.length;
          idx += 1
        ) {
          // istanbul ignore else
          if (this.page.state.progressWizardStepIds[idx]) {
            this.page.state.progressWizardcurrentStepId =
              this.page.state.progressWizardStepIds[idx];
            break;
          }
        }
      }
      if (this.page.state.progressWizardcurrentStepId === this.page.state.progressWizardStepIds[4]) { //Edit data-list field components
        let editSelectedDS = this.app.findDatasource('editedworkqueuecols').items;
        let editAvailableDs = this.app.findDatasource('fieldsAvailableDS');
        this.app.state.availableCurrentDS = editAvailableDs;
        this.app.state.editSelectedItems = editSelectedDS;
        // istanbul ignore next
        if (editSelectedDS.length === 0) {
          this.pageResumed(this.page, this.app);// if no records loaded onload
        }; 
        let EditFieldselectedDS = this.app.findDatasource('editFieldsSelectedDS'); // get new selection
        // istanbul ignore next  
        if (editAvailableDs.getSelectedItems().length === 0 && EditFieldselectedDS.currentItem === null && editAvailableDs.currentItem._selected === undefined) {
          //load all the selected items and mark selected available
          this.getEditSelectedFields(editAvailableDs, editSelectedDS);
        }
      }
      // istanbul ignore if  
      if (this.page.state.progressWizardcurrentStepId === this.page.state.progressWizardStepIds[5]) { //Edit data-list action components
        let editActionSelectedDS = this.app.findDatasource('editworkqueueactions').items;
        let editActionAvailableDs = this.app.findDatasource('actionsAvailableDS');
        this.app.state.availableCurrentDS = editActionAvailableDs;
        this.app.state.editSelectedItems = editActionSelectedDS;
        let editSelectedDS = this.app.state.currentSelectedDS; // get new selection
        if (editActionAvailableDs.getSelectedItems().length === 0 && editSelectedDS.currentItem === null && (editActionAvailableDs.currentItem._selected === undefined || editActionAvailableDs.currentItem._selected === false)) {
          //load all the selected items and mark selected available
          this.getEditSelectedFields(editActionAvailableDs, editActionSelectedDS);
        }
      }
      this.updateWizard(this.page.state.progressWizardcurrentStepId);
    }
  }

  validateStep(currentstepIndex) {
    let workqueuename = this.page.state.workqueueDS.item.queuename
    if (currentstepIndex === 0 && (typeof workqueuename === 'undefined' || workqueuename === null || workqueuename.trim() === '')) {
      this.page.state.stepErrorWithCustomBtn = this.app.getLocalizedMessage(
        'WOQUEUE',
        'create_wq_name_reqd',
        'Work queue name is required.');
      return false;
    }

    if (currentstepIndex === 0) {
      let wqItems = this.app.findDatasource("workqueueListDS").items;
      let queuenameExist = false;
      wqItems.forEach(item => { // mark selected fields in step 2
        if (item.queuename === workqueuename) {
          this.page.state.stepErrorWithCustomBtn = this.app.getLocalizedMessage(
            'WOQUEUE',
            'create_wq_name_exist',
            'Work queue with same name already exist.');
          queuenameExist = true;
        }
      });
      if (queuenameExist) {
        return false;
      }
    }
    const priority = [1, 2, 3, 4, undefined];
    if (currentstepIndex === 0 && (this.page.state.workqueueDS.item.priority === 0 || !priority.includes(this.page.state.workqueueDS.item.priority))) {
      this.app.findDatasource("createWorkQueueDS").item.priority = undefined;// reset after user inputs zero
      this.page.state.stepErrorWithCustomBtn = this.app.getLocalizedMessage(
        'WOQUEUE',
        'create_wq_query_priority_reqd',
        'Select a valid priority of 1 and above.');
      return false;
    }	
	// istanbul ignore next
    if (currentstepIndex === 1 && (typeof this.page.state.workqueueDS.item.intobjectname === 'undefined' || this.page.state.workqueueDS.item.intobjectname === null || this.page.state.workqueueDS.item.intobjectname.trim() === '')) {
      this.page.state.stepErrorWithCustomBtn = this.app.getLocalizedMessage(
        'WOQUEUE',
        'create_wq_valid_OS_reqd',
        'Please select valid object structure.');
      return false;
    }
    // istanbul ignore next  
    if (currentstepIndex === 1 && (typeof this.page.state.workqueueDS.item.clausename === 'undefined' || this.page.state.workqueueDS.item.clausename === null || this.page.state.workqueueDS.item.clausename.trim() === '' || !this.isQueryClauseValid(this.page.state.workqueueDS.item.clausename))) {
      this.page.state.stepErrorWithCustomBtn = this.app.getLocalizedMessage(
        'WOQUEUE',
        'create_wq_query_name_reqd',
        'A vaild query string is required.');
      return false;
    }
	// istanbul ignore next  
    if (currentstepIndex === 1 && (typeof this.page.state.workqueueDS.item.app === 'undefined' || this.page.state.workqueueDS.item.app === null || this.page.state.workqueueDS.item.app.trim() === '')) {
      this.page.state.stepErrorWithCustomBtn = this.app.getLocalizedMessage(
        'WOQUEUE',
        'create_wq_app_name_reqd',
        'Select valid launch application.');
      return false;
    }
    // istanbul ignore next  
    if ((currentstepIndex === 1 && this.page.state.fieldsSelectedDS.items.length === 0) || (currentstepIndex === 4 && this.page.state.editFieldsSectedDS.items.length === 0)) {
      this.page.state.stepErrorWithCustomBtn = this.app.getLocalizedMessage(
        'WOQUEUE',
        'create_wq_field_available_reqd',
        'Field selection is required.');
      return false;
    }
    // istanbul ignore next  
    if (currentstepIndex === 4 && (typeof this.page.state.editworkqueueDS.item.clausename === 'undefined' || this.page.state.editworkqueueDS.item.clausename === null || this.page.state.editworkqueueDS.item.clausename.trim() === '' || !this.isQueryClauseValid(this.page.state.editworkqueueDS.item.clausename))) {
      this.page.state.stepErrorWithCustomBtn = this.app.getLocalizedMessage(
        'WOQUEUE',
        'create_wq_query_name_reqd',
        'A vaild query string is required.');
      return false;
    }
    if (currentstepIndex === 3 && (this.page.state.editworkqueueDS.item.priority === 0 || !priority.includes(this.page.state.editworkqueueDS.item.priority))) {
      this.app.findDatasource("editWorkQueueDS").item.priority = undefined;// reset after user inputs zero
      this.page.state.stepErrorWithCustomBtn = this.app.getLocalizedMessage(
        'WOQUEUE',
        'create_wq_query_priority_reqd',
        'Select a valid priority of 1 and above.');
      return false;
    }
    this.page.state.stepErrorWithCustomBtn = null;
    return true;
  }

  isQueryClauseValid(fieldData) {
    let allqueriesList = this.app.findDatasource('allqueriesDS');
    const matchClauseName = allqueriesList.lastQuery.src.filter(item => item.name === fieldData);
    /* istanbul ignore next */
    let result = matchClauseName.length === 0 ? false : true;
    return result;
  }
  
  // istanbul ignore next
  isAppValid(fieldData){
	  let mxAppsDsList= this.app.findDatasource("mxAppsDs").items;
	  //check if valid app
		for (let i = 0; i < mxAppsDsList.length; i++) {
			if (mxAppsDsList[i].app === fieldData) {
			return true;		
			}
		}
    return false;   	
  }

  getEditSelectedFields(editselectedDs, editSelectedItems) {
    //this is for single selection later
    for (let i = 0; i < editSelectedItems.length; i++) {
      /* istanbul ignore next */
      this.markedSelected(editselectedDs, editSelectedItems[i]);
    }
  }

  markedSelected(ds, selectedItem) {
    let Itemlist = ds.items;
    Itemlist.forEach(item => { // mark selected fields in step 2
      // istanbul ignore next      
      if ((item.title && item.title.toLowerCase() === selectedItem.title.toLowerCase()) || (item.action && item.action.toLowerCase() === selectedItem.action.toLowerCase())) {
        ds.setSelectedItem(item, true);
        ds.currentItem._selected = true;
        ds.save();
      }
    });
  }

  getPreviousStep() {
    // istanbul ignore else
    if(!this.page) {
      return;
    }    
    let idx = this.page.state.progressWizardcurrentStepIndex - 1;
    // istanbul ignore else
    if (idx >= 0) {
      for (idx; idx >= 0; idx -= 1) {
        // istanbul ignore else
        if (this.page.state.progressWizardStepIds[idx]) {
          this.page.state.progressWizardcurrentStepId =
            this.page.state.progressWizardStepIds[idx];
          break;
        }
      }
    }
    this.validateStep(idx);
    this.updateWizard(this.page.state.progressWizardcurrentStepId);
  }

  onStepReset(flag) {
    // istanbul ignore else
    if(!this.page) {
      return;
    }    
    this.page.state.progressWizardcurrentStepId = (this.page.name === 'CreateWorkQueue') ? this.page.state.progressWizardStepIds[0] : this.page.state.progressWizardStepIds[3];
    this.updateWizard(this.page.state.progressWizardcurrentStepId);
    this.resetDataListSelection();
    this.page.state.isCancel = flag;
    this.page.state.stepErrorWithCustomBtn = null;
  }

  resetDataListSelection = async () => {
    //Reset DS for Select components
    let actionsAvailableDS = this.app.findDatasource('actionsAvailableDS');
    let actionsSelectedDS = this.app.findDatasource('actionsSelectedDS');
    let fieldsAvailableDS = this.app.findDatasource('fieldsAvailableDS');
    let fieldsSelectedDS = this.app.findDatasource('fieldsSelectedDS');
    let createWorkQueueDS = this.app.findDatasource("createWorkQueueDS");
    let allqueriesDS = this.app.findDatasource('allqueriesDS');
    allqueriesDS.clearSelections();
    createWorkQueueDS.clearChanges(true);

    await actionsSelectedDS.load({ src: [], noCache: true });
    await fieldsSelectedDS.load({ src: [], noCache: true });
    fieldsAvailableDS.clearSelections();
    actionsSelectedDS.clearSelections();
    actionsAvailableDS.clearSelections();
    fieldsAvailableDS.currentItem = {};
    this.app.findDatasource('actionsAvailableDS').currentItem = {}; //reset
    fieldsAvailableDS.search(); // to reset search field
    actionsAvailableDS.search();// to reset search field
    if (this.page.state.isCancel) {// if true redirect to workqueue list page
      // istanbul ignore next 
      if (this.page.name === "CreateWorkQueue") {
        this.pageInitialized(this.page, this.app);
      }
      this.app.setCurrentPage({ name: 'wqListPage' });
    }
  }

  onSetStep(id) {
    this.page.state.progressWizardcurrentStepId = id;
    this.updateWizard(this.page.state.progressWizardcurrentStepId);
  }

  pageResumed(page, app) {
    // istanbul ignore else if
    if (page.name === "CreateWorkQueue") {	  
      this.showCreateWorkQueuePage();
	  this.loadOsDatasources('MXAPIWODETAIL');
    } else if (page.name === "EditWorkQueue") {
      app.setCurrentPage({ name: 'EditWorkQueue' });
    } else {
      app.setCurrentPage({ name: 'wqListPage' });
    }
    this.onStepReset(false);
  }

  returnUpdatedDS = async (fieldsAvailableDS) => {
    let maximoSchemaDS = this.app.findDatasource('maximoSchemaDS');
    await maximoSchemaDS.load();
    let parentObject = maximoSchemaDS.schema.properties;
    let objectArray = this.getNestedObjectKeys(parentObject);
    fieldsAvailableDS.clearSelections();
    await fieldsAvailableDS.load({ src: objectArray, noCache: true });
  }
  // to get the keys of nested objects
  getNestedObjectKeys(obj) {
    let objArr = [];
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key].title) {
        objArr.push({ 'title': key });
      }
    }
    return objArr;
  }

  selectedDSMethod(event) {
    let getSelectedDS = this.datasource.options.name;
    let selectedDS;
    // istanbul ignore else
    if(!this.app || !this.app.currentPage) {
      return;
    }
    // istanbul ignore if  
    if (this.app.currentPage.state.progressWizardcurrentStepIndex === 1) {
      if (getSelectedDS === "allqueriesDS") { // to prevent select query listing in select field list
        return;
      }
      selectedDS = this.app.findDatasource('fieldsSelectedDS');
      this.app.state.availableCurrentDS = this.app.findDatasource('fieldsAvailableDS');
      if (event.selected) {// add item to selection list
        this.addItemstoDS(selectedDS, event.item);
      }
      if (event.item && event.item._selected === false && event.selected !== undefined) {
        const filteredSeletedItem = selectedDS.items.filter(item => item.title === event.item.title);
        if (filteredSeletedItem.length > 0)
          this.removeSeletedItem(event.item, selectedDS);
      }
      if (event.clearSelection && getSelectedDS === 'fieldsAvailableDS') { //clear All
        selectedDS.deleteItems(selectedDS.items);
      }
    }
    // istanbul ignore if  
    if (this.app.currentPage.state.progressWizardcurrentStepIndex === 2) {
      selectedDS = this.app.findDatasource('actionsSelectedDS');
      this.app.state.availableCurrentDS = this.app.findDatasource('actionsAvailableDS');
      if (event.selected) {// add item to selection list
        this.addItemstoDS(selectedDS, event.item);
      }
      if (event.item && event.item._selected === false && event.selected !== undefined) {
        const filteredSeletedItem = selectedDS.items.filter(item => item.action === event.item.action);
        if (filteredSeletedItem.length > 0)
          this.removeSeletedItem(event.item, selectedDS);
      }
      if (event.clearSelection && getSelectedDS === 'actionsAvailableDS') { //clear All
        selectedDS.deleteItems(selectedDS.items);
      }
    }
    if ((getSelectedDS === "fieldsAvailableDS" && getSelectedDS !== "actionsAvailableDS") && this.app.currentPage.name === "EditWorkQueue") {
      selectedDS = this.app.findDatasource('editFieldsSelectedDS');
      this.app.state.availableCurrentDS = this.app.findDatasource('fieldsAvailableDS');
      if (event.selected) {// add item to selection list
        this.addItemstoDS(selectedDS, event.item);
      }
      if (event.item && event.item._selected === false && event.selected !== undefined) {
        const filteredSeletedItem = selectedDS.items.filter(obj => obj.title === event.item.title);
        // istanbul ignore next
        if (filteredSeletedItem.length > 0) { // remove the selected 
          this.removeSeletedItem(event.item, selectedDS);
        }
      }

      if (event.clearSelection && getSelectedDS === 'fieldsAvailableDS') { //clear All
        selectedDS.deleteItems(selectedDS.items);
      }
    }
    if (getSelectedDS === "actionsAvailableDS" && this.app.currentPage.name === "EditWorkQueue") {
      selectedDS = this.app.findDatasource('editActionsSelectedDS');
      this.app.state.availableCurrentDS = this.app.findDatasource('actionsAvailableDS');
      this.app.state.currentSelectedDS = selectedDS;
      // istanbul ignore next      
      if (event.selected) { // add item to selection list
        this.addItemstoDS(selectedDS, event.item);
      }
      // istanbul ignore next
      if (event.item && event.item._selected === false && event.selected !== undefined) {
        const filteredSeletedItem = selectedDS.items.filter(item => item.action === event.item.action);
        if (filteredSeletedItem.length > 0)
          this.removeSeletedItem(event.item, selectedDS);
      }

      if (event.clearSelection && getSelectedDS === 'actionsAvailableDS') { //clear All
        selectedDS.deleteItems(selectedDS.items);
      }
    }
  }

  addItemstoDS = async (selectedDSitem, selectedItem) => {
    let dest = await selectedDSitem.addNew();
    Object.keys(selectedItem).forEach(k => (dest[k] = selectedItem[k]));
    await selectedDSitem.setSelectedItem(dest, true);
    selectedDSitem.save();
    selectedDSitem.forceReload();
  }

  removeSeletedItem(event, ds) {
    // istanbul ignore next 
    if (ds.name === undefined && this.datasource === undefined) return; // validate DS
    // istanbul ignore next 
    let selectedDS = (ds.name === undefined) ? this.datasource : ds;
    this.app = this.app.getApplication();
    let currentStepIndex = this.app.currentPage.state.progressWizardcurrentStepIndex;
    let availableCurrentDS = (currentStepIndex === 1 || currentStepIndex === 4) ? this.app.findDatasource('fieldsAvailableDS') : this.app.findDatasource('actionsAvailableDS');

    // istanbul ignore next 
    const filteredSelectedDS = (event.title === undefined) ? selectedDS.items.filter(item => item.action !== event.action) : selectedDS.items.filter(item => item.title !== event.title);
    if (filteredSelectedDS.length === 0 && selectedDS.items.length === 0) return;     // exit when nothing to do
    selectedDS.load({ src: filteredSelectedDS, noCache: true });
    availableCurrentDS.setSelectedItem(event, false); // update the available list
  }
  /**
   * This API is used to display Work Queue Creation Page
   */
  async showCreateWorkQueuePage() {
    let workqueueds = this.app.findDatasource('createWorkQueueDS');
    workqueueds.load();
    await workqueueds.addNew();
    workqueueds.state.canSave = true;
    let item = workqueueds.item;
    item.queuetype = 'RESULTSET';
    item.intobjectname = "MXAPIWODETAIL";
    //item.app = "WOTRACK";
    if (this.app.client.userInfo) {
      item.owner = this.app.client.userInfo.personid;
      item.langcode = this.app.client.userInfo.langcode;
    }
    let availablePersonGroupDS = this.app.findDatasource("availablePersonGroupDS");
    availablePersonGroupDS.reset();

    let selectedPersonGroupDS = this.app.findDatasource("selectedPersonGroupDS");
    selectedPersonGroupDS.reset();

    this.app.setCurrentPage({ name: 'CreateWorkQueue' });
  }

  /**
   * This API is used to save Work Queue
   */
  async saveWorkQueue() {
    let workqueueds = this.app.findDatasource('createWorkQueueDS');
    workqueueds.state.canSave = true;
    let workqueueresponse = await workqueueds.save();
    // istanbul ignore next
    if (!workqueueresponse.error) {
      await this.saveWorkQueueCols(workqueueds);
      await this.saveWorkQueueActions(workqueueds);
      log.i(TAG, "work-queue-manager create Work Queue", workqueueds);
    }
    this.app.state.thisQueuename = workqueueds.item.queuename;
    await this.savePersonGroups(true);
    this.app.toast('Success!',
      'success',
      this.app.getLocalizedMessage(
        'manage_maint_mangr',
        'wq_created_msg',
        'Work queue {0} was created.', [workqueueds.item.queuename]
      )
    );
    this.loadWorkQueueListPage();
  }


  /**
 * This API is used to save Work Queue Columns
 */
  async saveWorkQueueCols(wqDS) {
    let wqColsDS = wqDS.getChildDatasource('workqueuecols', wqDS.item, { idAttribute: 'workqueuecolsid' });
    let newWqCols = [];

    let selectedFields = this.app.findDatasource('fieldsSelectedDS');
    selectedFields.items.forEach((item, i) => {
      /* istanbul ignore next */
      let newWqCol = {
        queuename: wqDS.item.queuename,
        attributename: item.title,
        columnorder: i + 1,
      }
      //istanbul ignore next
      newWqCols.push(newWqCol);
    });
    //istanbul ignore if
    if (wqColsDS) {
      await wqColsDS.bulkAdd(newWqCols);
    }
    log.i(TAG, "work-queue-manager create Work Queue Columns ", newWqCols);
  }

  /**
   * This API is used to save Work Queue Actions
   */
  async saveWorkQueueActions(wqDS) {
    let wqActionsDS = wqDS.getChildDatasource('workqueueactions', wqDS.item, { idAttribute: 'workqueueactionsid' });
    let newWqActions = [];

    let selectedActions = this.app.findDatasource('actionsSelectedDS');
    
    //istanbul ignore next
    selectedActions.items.forEach((item, i) => {
      let newWqAction = {
        queuename: wqDS.item.queuename,
        action: item.action,
        actionlabel: item.action,
        actionorder: i + 1,
      }
      newWqActions.push(newWqAction);
    });
    //istanbul ignore if
    if (wqActionsDS) {
      await wqActionsDS.bulkAdd(newWqActions);
    }
    log.i(TAG, "work-queue-manager create Work Queue Actions ", newWqActions);
  }

  /**
   * This API is used to update Active Flag in the Work Queue
   */
  async updateIsActiveFlag(item) {
    let wqDS = this.app.findDatasource('createWorkQueueDS');
    this.page.state.stateReadonly = true;
    await wqDS.update(item);
    this.page.state.stateReadonly = false;
	  this.loadWorkQueueListPage();
  }

  /**
   * This API is to load Work Queue List Page
   */
  async loadWorkQueueListPage() {
    this.app.setCurrentPage({ name: 'wqListPage' });
    let wqListDS = this.app.findDatasource("workqueueListDS");
    await wqListDS.forceReload();
  }

  /**
   * API to display WorkQueue Page
   * @param {*} event
   */
  displayEditWorkQueuePage(event) {
    this.app.state.thisQueuename = event.item.queuename;
    this.app.setCurrentPage({ name: 'EditWorkQueue', params: { href: event.item.href, 'queuename': event.item.queuename } });
	  this.loadEditWqDatasources(event.item.intobjectname);
  }
  
  
  /**
 * open delete dialog
 */
 //istanbul ignore next
  async openDeleteDlg(event){
   this.app.state.selectedWQ=event.item.queuename;
   this.app.showDialog('deleteWqConfirmationDialog');
  }
    
   /**
   * API to delete WQ
   * @param {*} event
   */
   // istanbul ignore next
  async deleteWQ(){
	  
	  let deleteWorkQueueDS = this.app.findDatasource('deleteWorkQueueDS');
	  await deleteWorkQueueDS.load();
	  
	  if (deleteWorkQueueDS.state.hasData){
		  
	  let delWorkqueueactions=this.app.findDatasource('delWorkqueueactions');
	  await delWorkqueueactions.load();	
	  
	  if (delWorkqueueactions.state.hasData && (delWorkqueueactions.dependsOn.currentItem!==null || delWorkqueueactions.dependsOn.currentItem!==undefined)){
		  //Clean up actions for the WQ 
		  await delWorkqueueactions.deleteItems(delWorkqueueactions.items);
	  }	  
	  
	  let delWorkqueuecols=this.app.findDatasource('delWorkqueuecols');
	  await delWorkqueuecols.load();
	  
	  if (delWorkqueuecols.state.hasData && (delWorkqueuecols.dependsOn.currentItem!==null || delWorkqueuecols.dependsOn.currentItem!==undefined)){
		  //Clean up columns for the WQ	
		  await delWorkqueuecols.deleteItems(delWorkqueuecols.items);
	  }
    
    await this.deletePersonGroups();
    
	  //Clean up selected WQ
	  const response = await deleteWorkQueueDS.delete(deleteWorkQueueDS.get(0));
	  if (response) {
		  
		        				
			    this.app.toast('Success!',
				  'success',
				  this.app.getLocalizedMessage(
					'manage_maint_mangr',
					'wq_deleted_msg',
					'Work queue {0} was deleted.', [this.app.state.selectedWQ]
				  )
				);	
				
			  this.loadWorkQueueListPage();
	    }
		
	  }	
	  
  }
  
  
  

  async updateWorkQueue() {
    // istanbul ignore next  
    if (this.page) {
      let wqDS = this.page.datasources.editWorkQueueDS;
      let wqName = wqDS.item.queuename;
      wqDS.item.priority = (wqDS.item.priority === undefined) ? '' : wqDS.item.priority; // prevent undefined getting submitted
      await wqDS.save();
      let currentStepId = this.page.state.progressWizardcurrentStepId;
      if (currentStepId === "stepitem5" || currentStepId === "stepitem6") {
        await this.updateWorkQueueCols(wqDS);
        if (currentStepId === "stepitem6") {
          await this.updateWorkQueueActions(wqDS);
        }
        wqDS.forceReload();
      }
      await this.savePersonGroups(false);
      this.app.toast('Success!',
        'success',
        this.app.getLocalizedMessage(
          'manage_maint_mangr',
          'wq_updated_msg',
          'Work queue {0} was updated.', [wqName]
        )
      );
      this.loadWorkQueueListPage();
    }
  }

  async updateWorkQueueCols(wqDS) {
    //Work Queue Cols fetched from DB
    let existingwqColsDS = this.page.datasources.editedworkqueuecols;
    //New Work Queue Cols after editing
    let wqColsDS = this.page.datasources.editFieldsSelectedDS;
    let newWqCols = [];
    let titleArray = [];
    //Delete the existing Work Queue Cols from DB
    let items = existingwqColsDS.items;
    // istanbul ignore next  
    if (items != null && items.length > 0) {
      existingwqColsDS.deleteItems(items);
      await existingwqColsDS.forceReload();
    }
    // istanbul ignore next  
    wqColsDS.items.forEach((item, i) => {
      let newWqCol = {
        queuename: wqDS.item.queuename,
        attributename: item.title,
        columnorder: i + 1,
      }
      if (titleArray.indexOf(item.title) === -1) {
        newWqCols.push(newWqCol);
        titleArray.push(item.title);
      }
    });
    //Insert the Work Queue Cols into DB
    await existingwqColsDS.bulkAdd(newWqCols);
    log.i(TAG, "work-queue-manager Insert the Work Queue Cols into DB ", newWqCols);
  }

  async updateWorkQueueActions(wqDS) {
    //Work Queue Actions fetched from DB
    let existingwqActionDS = this.page.datasources.editworkqueueactions;
    //New Work Queue Actions after editing
    let wqActionDS = this.page.datasources.editActionsSelectedDS;
    let newWqActions = [];
    let actionArray = [];
    //Delete the existing Work Queue Actions from DB
    let items = existingwqActionDS.items;
    // istanbul ignore else
    if (items != null && items.length > 0) {
      existingwqActionDS.deleteItems(items);
      await existingwqActionDS.forceReload();
    }
    // istanbul ignore next
    wqActionDS.items.forEach((item, i) => {
      let newWqAction = {
        queuename: wqDS.item.queuename,
        action: item.action,
        actionlabel: item.action,
        actionorder: i + 1,
      }
      if (actionArray.indexOf(item.title) === -1) {
        newWqActions.push(newWqAction);
        actionArray.push(item.action);
      }
    });
    //Insert the Work Queue Actions into DB
    await existingwqActionDS.bulkAdd(newWqActions);
    //existingwqActionDS.forceReload();
    log.i(TAG, "work-queue-manager Insert the Work Queue Actions into DB ", newWqActions);
  }
 /**
 * open os dialog
 */
 //istanbul ignore next
 async openObjectStructDlg() {
  let  intOsDs= this.app.findDatasource('intOsDs');	
  intOsDs.clearSelections();  
  this.app.showDialog('ObjectStructureDialog');  
  }

/**
 * selct OS
 */
 // istanbul ignore next
  chooseObjectStructure(event){
    let parentOsDS= this.getDataSource();
    // istanbul ignore else
    if(event.datasource!=null && event.datasource.getSelectedItems()!=null && parentOsDS){
      let selectedOS = event.datasource.getSelectedItems()[0];
      parentOsDS.item.intobjectname=selectedOS.intobjectname;	  
	  this.loadOsDatasources(selectedOS.intobjectname);	  
    }
		
  }        
  
  /**
  *load datasources on OS selection
  */
   // istanbul ignore next
  async loadOsDatasources(osName) { 
   //load available fields ds
  this.app.state.selectedOS=osName;
  this.app.state.schemaDsItemUrl="/oslc/jsonschemas/".concat(osName);
  this.app.state.queryDsItemUrl="/oslc/allqueries/".concat(osName);
  
  //reset query and app
  let createWorkQueueDS = this.app.findDatasource("createWorkQueueDS");
  createWorkQueueDS.item.clausename="";
  createWorkQueueDS.item.app="";
  
  let allqueriesDS = this.app.findDatasource("allqueriesDS");
  allqueriesDS.reset(allqueriesDS.baseQuery,false,{resetDataAdapter: true, resetItems: true, resetSchema: true});
  allqueriesDS.clearSelections();
  
  //load query ds
  let maximoAllqueriesDS= this.app.findDatasource("maximoAllqueriesDS");
  maximoAllqueriesDS.reset(maximoAllqueriesDS.baseQuery,false,{resetDataAdapter: true, resetItems: true, resetSchema: true});
  await maximoAllqueriesDS.forceReload();   
  //load maxapps
  let mxAppsDs= this.app.findDatasource("mxAppsDs");
  mxAppsDs.reset(mxAppsDs.baseQuery,false,{resetDataAdapter: true, resetItems: true, resetSchema: true});
  mxAppsDs.clearSelections();
  await mxAppsDs.forceReload();
   
  
  //load schemads
  let maximoSchemaDS= this.app.findDatasource("maximoSchemaDS");
  maximoSchemaDS.reset(maximoSchemaDS.baseQuery,false,{resetDataAdapter: true, resetItems: true, resetSchema: true});
  await  maximoSchemaDS.forceReload();  
  let parentObject = maximoSchemaDS.schema.properties;
  let objectArray = this.getNestedObjectKeys(parentObject);
  let fieldsAvailableDS = this.app.findDatasource('fieldsAvailableDS');
  fieldsAvailableDS.clearSelections();  
  await fieldsAvailableDS.load({ src: objectArray, noCache: true });
  
   //clear selections selected feilds
  let fieldsSelectedDS = this.app.findDatasource('fieldsSelectedDS');
  await fieldsSelectedDS.load({ src: [], noCache: true });
  fieldsSelectedDS.clearSelections();
   
  //load available actionsds
  let actionsAvailableDS= this.app.findDatasource("actionsAvailableDS");
  actionsAvailableDS.reset(actionsAvailableDS.baseQuery,false,{resetDataAdapter: true, resetItems: true, resetSchema: true});
  //set root obj
  this.app.state.selectedOsRootObj=maximoSchemaDS.schema.title;   
  await actionsAvailableDS.forceReload();
  actionsAvailableDS.search(" ");// to reset search field 

 //clear selected actions
  let actionsSelectedDS = this.app.findDatasource('actionsSelectedDS');
  await actionsSelectedDS.load({ src: [], noCache: true });
  actionsSelectedDS.clearSelections();  
  
 }
  
 /**
  *load datasources in edit mode.
  */
   // istanbul ignore next
  async loadEditWqDatasources(osName) { 
   //load available fields ds
  this.app.state.selectedOS=osName;
  this.app.state.schemaDsItemUrl="/oslc/jsonschemas/".concat(osName);
  this.app.state.queryDsItemUrl="/oslc/allqueries/".concat(osName);
  //load query ds
  let maximoAllqueriesDS= this.app.findDatasource("maximoAllqueriesDS");
  maximoAllqueriesDS.reset(maximoAllqueriesDS.baseQuery,false,{resetDataAdapter: true, resetItems: true, resetSchema: true});
  await maximoAllqueriesDS.forceReload();   
  //load maxapps
  let mxAppsDs= this.app.findDatasource("mxAppsDs");
  mxAppsDs.reset(mxAppsDs.baseQuery,false,{resetDataAdapter: true, resetItems: true, resetSchema: true}); 
  await mxAppsDs.forceReload();
  //load schemads
  let maximoSchemaDS= this.app.findDatasource("maximoSchemaDS");
  maximoSchemaDS.reset(maximoSchemaDS.baseQuery,false,{resetDataAdapter: true, resetItems: true, resetSchema: true});
  await  maximoSchemaDS.forceReload();  
  let parentObject = maximoSchemaDS.schema.properties;
  let objectArray = this.getNestedObjectKeys(parentObject);
  let fieldsAvailableDS = this.app.findDatasource('fieldsAvailableDS');	

  await fieldsAvailableDS.load({ src: objectArray, noCache: true });
  //load available actionsds
  let actionsAvailableDS= this.app.findDatasource("actionsAvailableDS");
  actionsAvailableDS.reset(actionsAvailableDS.baseQuery,false,{resetDataAdapter: true, resetItems: true, resetSchema: true});
  //set root obj
  this.app.state.selectedOsRootObj=maximoSchemaDS.schema.title;   
  await actionsAvailableDS.forceReload();
  actionsAvailableDS.search(" ");// to reset search field  

 }
 
  /**
 * open MAXapplication dialog
 */
 //istanbul ignore next
  async openMxAppDlg(){
    this.app.showDialog('MxAppDialog');
  }

/**
 * selct launch app
 */
 // istanbul ignore next
  chooseLaunchApplication(event){
    let parentOsDS= this.getDataSource();
    // istanbul ignore else
    if(event.datasource!=null && event.datasource.getSelectedItems()!=null && parentOsDS){
      let selectedApp = event.datasource.getSelectedItems()[0];
      parentOsDS.item.app=selectedApp.app;  
	  
    }
		
  } 
  
  /**
 * get WQ ds 
 */
 // istanbul ignore next
 getDataSource(){
    if(this.app){
      let createWQdS= this.app.findDatasource("createWorkQueueDS");
      let editWQds = this.app.findDatasource("editWorkQueueDS");
      if(this.app.currentPage.name === "CreateWorkQueue"){
        return createWQdS;
      }else{
        return editWQds;
      }
    }
  }

  /**
    * Returns the pages in the pack stack.
    * @returns {Array<Page>} Array of Page objects in the page stack.
    */
  getPageStack(stack, refpage) {
    // istanbul ignore else
    if (stack != null && refpage != null) {
      let wqlistpagename = 'wqListPage';
      let page = this.app.findPage(wqlistpagename);
      let wqmsg = this.app.getLocalizedMessage(
        'wqListPage',
        'work_queues_brdcrumb',
        'Work queues'
      );
      // istanbul ignore else
      if (page) {
        refpage.dynamicPageTitleUpdate(page, wqmsg);
      }

      let index = stack.indexOf(wqlistpagename);
      // istanbul ignore else
      if (index > -1) {
        stack.splice(index, 1);
      }
      let currpage = stack.pop();
      stack.push(wqlistpagename);
      // istanbul ignore else
      if (currpage) {
        stack.push(currpage);
      }
    }
  }
}

export default CreateWorkQueueController;
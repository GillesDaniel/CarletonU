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

import { Application, Datasource, JSONDataAdapter, Page, Dialog } from '@maximo/maximo-js-api';
import WorkOrderDialogController from './WorkOrderDialogController';
import workorderitem from './test/workorder-json-data.js';
import personList from  './test/person-json-data.js';
import personGroupList from './test/persongroup-json-data.js';
import workflowProcessList from './test/workflow-process-json-data';
import workordersummary from './test/workorderSummary-json-data.js';
import statusresponse from './test/status-update-response-json-data';
import sinon from 'sinon';

//A function to create a new Datasource with data in sample data file WorkFlowAssignmentList-json-data.js, for WorkFlow Assignment
function newWorkOrderDatasource(data = workorderitem, name = 'workorderitemDS' ) {
  const da = new JSONDataAdapter({
    src: workorderitem,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: 'wonum',
    name: name
  });

  return ds;
}

function newPersonDatasource(data = personList, name = 'personDS' ) {
  const personData = new JSONDataAdapter({
    src: personList,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const personds = new Datasource(personData, {
    idAttribute: 'personid',
    name: name
  });

  return personds;
}

function newPersonGroupDatasource(data = personGroupList, name = 'persongroupDS' ) {
  const personGroupData = new JSONDataAdapter({
    src: personGroupList,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const persongroupds = new Datasource(personGroupData, {
    idAttribute: 'persongroup',
    name: name
  });

  return persongroupds;
}

function newWorkflowProcessDatasource(data = workflowProcessList, name = 'processDS' ) {
  const workflowProcessData = new JSONDataAdapter({
    src: workflowProcessList,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const workflowprocessds = new Datasource(workflowProcessData, {
    idAttribute: 'wfprocessid',
    name: name
  });

  return workflowprocessds;
}

function newWorkOrderSummaryDS(data = workordersummary, name = 'woDetailResource' ) {
  const workOrderSummaryData = new JSONDataAdapter({
    src: workordersummary,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const workorderSummaryds = new Datasource(workOrderSummaryData, {
    idAttribute: 'wonum',
    name: name
  });

  return workorderSummaryds;
}

  //Check DS wflistDS getting populated
  it('Compute Person Group for Given Person', async () => {
    const wodialogController = new WorkOrderDialogController();
    const app = new Application();
    const page = new Page({
      name: 'wolist'
    });
    
    wodialogController.dialogInitialized(app,page);
    
    await app.initialize();
  
    //Create the Datasource
    let personDS = newPersonDatasource(personList, 'personDS');
   
    app.registerPage(page);
    //Navigate to the page
    app.setCurrentPage(page);
    expect(page.name).toBe('wolist');

    page.registerController(wodialogController);
    page.registerDatasource(personDS);
  
    //Load the data from data file into items array
    let items = await personDS.load();
    expect(items).not.toBeNull();
  
    //Call method with a sample object with a empty field ownerid
    wodialogController.computedpersongroupteam({item: { personid: "WILSON" }});

    //Check the empty items condition
    wodialogController.onAfterLoadData(personDS, null);

    //The items array should have the field 'record' populated after below call
    wodialogController.onAfterLoadData(personDS, items);

    //Confirm the population of 'record' field in items array from the input data file
    expect(items[0].computedpersongroup).toEqual("1001 (Electrical Work Queue), MAINT (Maintenance Group), SAFETY (Safety team - labor with current certification), TELECOM (Telecommunications)");
    expect(items[1].computedpersongroup).toEqual("HR (Human Resources)");
});

it('Compute Person for Given PersonGroup', async () => {
  const wodialogController = new WorkOrderDialogController();
  const app = new Application();
  const page = new Page({
    name: 'wolist'
  });
  
  wodialogController.dialogInitialized(app,page);
  
  await app.initialize();

  //Create the Datasource
  let personGroupDS = newPersonGroupDatasource(personGroupList, 'personGroupDS');
 
  app.registerPage(page);
  //Navigate to the page
  app.setCurrentPage(page);
  expect(page.name).toBe('wolist');

  page.registerController(wodialogController);
  page.registerDatasource(personGroupDS);


  //Load the data from data file into items array
  let items = await personGroupDS.load();
  expect(items).not.toBeNull();

  //The items array should have the field 'record' populated after below call
  wodialogController.onAfterLoadData(personGroupDS, items);

  //Confirm the population of 'record' field in items array from the input data file
  expect(items[0].computedperson).toEqual("Jim Gormley, Steve Miller, Mike Wilson");
  expect(items[1].computedperson).toEqual("Tom Kazmier, Mike Wilson");
});

  //Check DS wflistDS getting populated
  it('Change Owner for WorkOrder Summary Page', async () => {
    const workOrderDialogController = new WorkOrderDialogController();
    const app = new Application();
    const page = new Page({
      name: 'wolist'
    });
    let showDialog = jest.fn();
    app.showDialog = showDialog;
    const SelectOwnerDialog = new Dialog({
      name: "show_SelectOwnerDialog",
    });
    const parentPage = new Page({name: 'parentPage'});
    page.parent = parentPage;
  
    page.registerDialog(SelectOwnerDialog);
    SelectOwnerDialog.closeDialog = jest.fn();
    
    await app.initialize();  
  
    //Create the Datasource
    let wolistDS = newWorkOrderDatasource(workorderitem, 'wolistDS');
    let personDS = newPersonDatasource(personList, 'personDS');
    let personGroupDS = newPersonGroupDatasource(personGroupList, 'personGroupDS'); 
    let wosummaryDS = newWorkOrderSummaryDS(workordersummary,'wosummaryDS');
    app.registerPage(page);
   
    app.setCurrentPage(page);
    page.registerController(workOrderDialogController);
   
    app.registerDatasource(wolistDS);
    app.registerDatasource(personDS);
    app.registerDatasource(personGroupDS);
    app.registerDatasource(wosummaryDS);
  
    parentPage.registerDatasource(wolistDS);
    parentPage.registerDatasource(personDS);
    parentPage.registerDatasource(personGroupDS);
    

    expect(wolistDS).not.toBeNull(); 
    expect(personDS).not.toBeNull(); 
    expect(personGroupDS).not.toBeNull();
    expect(wosummaryDS).not.toBeNull();
     
    await wolistDS.load();
    await personDS.load();
    await personGroupDS.load();
    await wosummaryDS.load();
  
    expect(page.name).toBe('wolist');
  
    let items = await wolistDS.load();
    sinon.stub(wolistDS, "getSelectedItems").returns(items);

    let event = {personid:"Wilson"};
    page.parent.state.workOrderDS = wolistDS;
    app.state.personDS = personDS;
    app.state.personGroupDS = personGroupDS;
    app.state.workOrderSummaryDS = wosummaryDS;
    workOrderDialogController.dialogInitialized(page,app);
    app.state.personGroupDS.setSelectedItem(event,true);
    workOrderDialogController.selectOwnerTable(app,event);
    let item = {
      "0": {
          'status_maxvalue': 'WAPPR',
          '_rowstamp': '2361139',
          'status_description': 'Waiting on approval',
          'schedstart': '1999-03-28T10:00:00+05:30',
          'description': 'Modification engineering',
          'worktype': {
              'wtypedesc': 'Capital Project'
          },
          'location': 'NEEDHAM',
          'href': 'oslc/os/mxapiwodetail/_QkVERk9SRC83MTEx',
          'status': 'WAPPR',
          'wonum': '7111',
          '_bulkid': '7111',
          '_selected': false
      }
    }
    app.state.currentPageName = "WOSummaryPage";
    app.state.workOrderSummaryDS.forceReload = function(){
      return true;
    };
    await workOrderDialogController.saveOwner(null,item,"Y");
});

//Check DS wflistDS getting populated
it('Change Owner for Multiple WorkOrder', async () => {
  const workOrderDialogController = new WorkOrderDialogController();
  const app = new Application();
  const page = new Page({
    name: 'wolist'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;
  const SelectOwnerDialog = new Dialog({
    name: "show_SelectOwnerDialog",
  });
  const parentPage = new Page({name: 'parentPage'});
  page.parent = parentPage ;

  page.registerDialog(SelectOwnerDialog);
  SelectOwnerDialog.closeDialog = jest.fn();
  
  await app.initialize();

  //Create the Datasource
  let wolistDS = newWorkOrderDatasource(workorderitem, 'wolistDS');
  let personDS = newPersonDatasource(personList, 'personDS');
  let personGroupDS = newPersonGroupDatasource(personGroupList, 'personGroupDS');
  let wosummaryDS = newWorkOrderSummaryDS(workordersummary,'wosummaryDS');
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(workOrderDialogController);
 
  app.registerDatasource(wolistDS);
  app.registerDatasource(personDS);
  app.registerDatasource(personGroupDS);
  app.registerDatasource(wosummaryDS);
  
  //Initialize app in the pageController
  expect(wolistDS).not.toBeNull(); 
  expect(personDS).not.toBeNull(); 
  expect(personGroupDS).not.toBeNull();
  expect(wosummaryDS).not.toBeNull();
   
  //let status = "changeOwner";
  await wolistDS.load();
  await personDS.load();
  await personGroupDS.load();
  await wosummaryDS.load();

  expect(page.name).toBe('wolist');

  let items = await wolistDS.load();
  sinon.stub(wolistDS, "getSelectedItems").returns(items);

  let event = {personid:"Wilson"};
  page.parent.state.workOrderDS = wolistDS;
  app.state.personDS = personDS;
  app.state.personGroupDS = personGroupDS;
  app.state.workOrderSummaryDS = wosummaryDS;
  workOrderDialogController.dialogInitialized(page,app);
  app.state.personGroupDS.setSelectedItem(event,true);
  workOrderDialogController.selectOwnerTable(app,event)
  let item = {
    "0": {
        'status_maxvalue': 'WAPPR',
        '_rowstamp': '2361139',
        'status_description': 'Waiting on approval',
        'schedstart': '1999-03-28T10:00:00+05:30',
        'description': 'Modification engineering',
        'worktype': {
            'wtypedesc': 'Capital Project'
        },
        'location': 'NEEDHAM',
        'href': 'oslc/os/mxapiwodetail/_QkVERk9SRC83MTEx',
        'status': 'WAPPR',
        'wonum': '7111',
        '_bulkid': '7111',
        '_selected': false
    },
    "1": {
      'status_maxvalue': 'WAPPR',
      '_rowstamp': '2361139',
      'status_description': 'Waiting on approval',
      'schedstart': '1999-03-28T10:00:00+05:30',
      'description': 'Modification engineering',
      'worktype': {
          'wtypedesc': 'Capital Project'
      },
      'location': 'NEEDHAM',
      'href': 'oslc/os/mxapiwodetail/_QkVERk9SRC83MTEx',
      'status': 'WAPPR',
      'wonum': '7111',
      '_bulkid': '7111',
      '_selected': false
  }
  }
  app.state.currentPageName = "WOSummaryPage";
  app.state.workOrderSummaryDS.forceReload = function(){
    return true;
  };
  await workOrderDialogController.saveOwner(null,item,"Y");
});

//Check DS wflistDS getting populated
it('Change Owner Group for Single WorkOrder', async () => {
  const workOrderDialogController = new WorkOrderDialogController();
  const app = new Application();
  const page = new Page({
    name: 'wolist'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;
  const SelectOwnerDialog = new Dialog({
    name: "show_SelectOwnerDialog",
  });
  const parentPage = new Page({name: 'parentPage'});
  page.parent = parentPage ;

  page.registerDialog(SelectOwnerDialog);
  SelectOwnerDialog.closeDialog = jest.fn();
  
  await app.initialize();

  //Create the Datasource
  let wolistDS = newWorkOrderDatasource(workorderitem, 'wolistDS');
  let personDS = newPersonDatasource(personList, 'personDS');
  let personGroupDS = newPersonGroupDatasource(personGroupList, 'personGroupDS');
  let wosummaryDS = newWorkOrderSummaryDS(workordersummary,'wosummaryDS'); 
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(workOrderDialogController);
 
  page.registerDatasource(wolistDS);
  page.registerDatasource(personDS);
  page.registerDatasource(personGroupDS);

  app.registerDatasource(wolistDS);
  app.registerDatasource(personDS);
  app.registerDatasource(personGroupDS);
  app.registerDatasource(wosummaryDS);
	
  
  //Initialize app in the pageController
  expect(wolistDS).not.toBeNull(); 
  expect(personDS).not.toBeNull(); 
  expect(personGroupDS).not.toBeNull();
  expect(wosummaryDS).not.toBeNull(); 
   
  //let status = "changeOwner";
  await wolistDS.load();
  await personDS.load();
  await personGroupDS.load();
  await wosummaryDS.load();

  expect(page.name).toBe('wolist');

  let items = await wolistDS.load();
  sinon.stub(wolistDS, "getSelectedItems").returns(items);

  let event = {persongroup:"1001"};
  page.parent.state.workOrderDS = wolistDS;
  app.state.personDS = personDS;
  app.state.personGroupDS = personGroupDS;
  app.state.workOrderSummaryDS = wosummaryDS;
  workOrderDialogController.dialogInitialized(page,app);
  workOrderDialogController.selectOwnerGroupTable(app,event);
  let item = {
    "0": {
        'status_maxvalue': 'WAPPR',
        '_rowstamp': '2361139',
        'status_description': 'Waiting on approval',
        'schedstart': '1999-03-28T10:00:00+05:30',
        'description': 'Modification engineering',
        'worktype': {
            'wtypedesc': 'Capital Project'
        },
        'location': 'NEEDHAM',
        'href': 'oslc/os/mxapiwodetail/_QkVERk9SRC83MTEx',
        'status': 'WAPPR',
        'wonum': '7111',
        '_bulkid': '7111',
        '_selected': false
    }
  }
  app.state.currentPageName = "WOSummaryPage";
    app.state.workOrderSummaryDS.forceReload = function(){
      return true;
    };
  await workOrderDialogController.saveOwner(null,item,"Y");

  app.state.currentPageName = "";
    app.state.workOrderDS.forceReload = function(){
      return true;
    };
  await workOrderDialogController.saveOwner(null,item,"Y");
});

//Check DS wflistDS getting populated
it('Change Owner Group for Multiple WorkOrder', async () => {
  const workOrderDialogController = new WorkOrderDialogController();
  const app = new Application();
  const page = new Page({
    name: 'wolist'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;
  const SelectOwnerDialog = new Dialog({
    name: "show_SelectOwnerDialog",
  });
  const parentPage = new Page({name: 'parentPage'});
  page.parent = parentPage ;

  page.registerDialog(SelectOwnerDialog);
  SelectOwnerDialog.closeDialog = jest.fn();
  
  await app.initialize();
  

  //Create the Datasource
  let wolistDS = newWorkOrderDatasource(workorderitem, 'wolistDS');
  let personDS = newPersonDatasource(personList, 'personDS');
  let personGroupDS = newPersonGroupDatasource(personGroupList, 'personGroupDS');
  let wosummaryDS = newWorkOrderSummaryDS(workordersummary,'wosummaryDS');
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(workOrderDialogController);
 
  page.registerDatasource(wolistDS);
  page.registerDatasource(personDS);
  page.registerDatasource(personGroupDS);

  app.registerDatasource(wolistDS);
  app.registerDatasource(personDS);
  app.registerDatasource(personGroupDS)
  app.registerDatasource(wosummaryDS);

  
  //Initialize app in the pageController
  expect(wolistDS).not.toBeNull(); 
  expect(personDS).not.toBeNull(); 
  expect(personGroupDS).not.toBeNull();
  expect(wosummaryDS).not.toBeNull();
   
  //let status = "changeOwner";
  await wolistDS.load();
  await personDS.load();
  await personGroupDS.load();
  await wosummaryDS.load();

  expect(page.name).toBe('wolist');

  let items = await wolistDS.load();
  sinon.stub(wolistDS, "getSelectedItems").returns(items);

  let event = {persongroup:"1001"};
  page.parent.state.workOrderDS = wolistDS;
  app.state.personDS = personDS;
  app.state.personGroupDS = personGroupDS;
  app.state.workOrderSummaryDS = wosummaryDS;
  workOrderDialogController.dialogInitialized(page,app);
  workOrderDialogController.selectOwnerGroupTable(app,event);
  let item = {
    "0": {
        'status_maxvalue': 'WAPPR',
        '_rowstamp': '2361139',
        'status_description': 'Waiting on approval',
        'schedstart': '1999-03-28T10:00:00+05:30',
        'description': 'Modification engineering',
        'worktype': {
            'wtypedesc': 'Capital Project'
        },
        'location': 'NEEDHAM',
        'href': 'oslc/os/mxapiwodetail/_QkVERk9SRC83MTEx',
        'status': 'WAPPR',
        'wonum': '7111',
        '_bulkid': '7111',
        '_selected': false
    },
    "1": {
      'status_maxvalue': 'WAPPR',
      '_rowstamp': '2361139',
      'status_description': 'Waiting on approval',
      'schedstart': '1999-03-28T10:00:00+05:30',
      'description': 'Modification engineering',
      'worktype': {
          'wtypedesc': 'Capital Project'
      },
      'location': 'NEEDHAM',
      'href': 'oslc/os/mxapiwodetail/_QkVERk9SRC83MTEx',
      'status': 'WAPPR',
      'wonum': '7111',
      '_bulkid': '7111',
      '_selected': false
  }
  }
  app.state.currentPageName = "WOSummaryPage";
  app.state.workOrderSummaryDS.forceReload = function(){
    return true;
  };
  await workOrderDialogController.saveOwner(null,item,"Y");
  await workOrderDialogController.saveOwner(null,null,"Y");
});
   // Update status for workOrder
   it('Update status for WorkOrder Summary', async () => {
    const workOrderDialogController = new WorkOrderDialogController();
    const app = new Application();
    const page = new Page({
      name: 'WOSummaryPage'
    });
    let showDialog = jest.fn();
    page.showDialog = showDialog;
    const UpdateStatusDialog = new Dialog({
      name: "updateStatus",
    });
    const parentPage = new Page({name: 'parentPage'});
    page.parent = parentPage ;

    page.registerDialog(UpdateStatusDialog);
    UpdateStatusDialog.closeDialog = jest.fn();

    await app.initialize();

    //Create the Datasource
    let wosummaryDS = newWorkOrderSummaryDS(workordersummary,'wosummaryDS');
    let statusDS = newPersonDatasource(personList, 'statusDS');
    let earlierStatusMemosDS = newPersonGroupDatasource(personGroupList, 'earlierStatusMemos');

    app.registerPage(page);

    app.setCurrentPage(page);
    page.registerController(workOrderDialogController);

    page.registerDatasource(wosummaryDS);
    page.registerDatasource(statusDS);
    page.registerDatasource(earlierStatusMemosDS);

    parentPage.registerDatasource(wosummaryDS);
    parentPage.registerDatasource(statusDS);
    parentPage.registerDatasource(earlierStatusMemosDS);

    expect(wosummaryDS).not.toBeNull();
    expect(statusDS).not.toBeNull();
    expect(earlierStatusMemosDS).not.toBeNull();

    await wosummaryDS.load();
    await statusDS.load();
    await earlierStatusMemosDS.load();

    expect(page.name).toBe('WOSummaryPage');

    let items = await wosummaryDS.load();
    sinon.stub(wosummaryDS, "getSelectedItems").returns(items);

    app.state.workOrderSummaryDS = wosummaryDS;
    page.parent.state.workOrderDS = wosummaryDS;
    page.parent.state.statusDS = statusDS;
    page.parent.state.earlierStatusMemosDS = earlierStatusMemosDS;
    page.parent.state.selectedItems = items;
    workOrderDialogController.dialogInitialized(page,app);
    let dialogId = 'updateStatus';
    page.parent.state.workOrderDS.invokeAction = function (){
      return statusresponse[0];
    }
    page.parent.state.updateStatusDate = new Date().toISOString();
    page.parent.state.updateStatusComment = "Updated the status";
    page.parent.state.updateStatus = page.parent.state.selectedItems.status_maxvalue;
    page.parent.state.dataFormatter={};
    page.parent.state.dataFormatter.convertDatetoISO = function(arg){
      return arg;
    }

    workOrderDialogController.getSelectedDate(page.parent.state.updateStatusDate)
    workOrderDialogController.getSelectedupdateStatus({"selectedItem": {"item": {"maxvalue": "INPRG"}}});

    expect(parentPage.state.selectedItems).not.toBeNull();
    await workOrderDialogController.updateAssignmentStatus(dialogId,null,null);

   // comment not specified
    page.parent.state.updateStatusComment = "";
    await workOrderDialogController.updateAssignmentStatus(dialogId,null);
    await workOrderDialogController.updateAssignmentStatus(dialogId,items);
    parentPage.state.selectedItems = [];
    await workOrderDialogController.updateAssignmentStatus(dialogId,parentPage.state.selectedItems);
    workOrderDialogController.onCancelUpdateStatus();
});

  // Update status for workOrder
  it('Update status for Multiple WorkOrder', async () => {
    const workOrderDialogController = new WorkOrderDialogController();
    const app = new Application();
    const page = new Page({
      name: 'wolist'
    });
    let showDialog = jest.fn();
    page.showDialog = showDialog;
    const UpdateStatusDialog = new Dialog({
      name: "updateStatus",
    });
    const parentPage = new Page({name: 'parentPage'});
    page.parent = parentPage ; 
  
    page.registerDialog(UpdateStatusDialog);
    UpdateStatusDialog.closeDialog = jest.fn();
    
    await app.initialize();  
  
    //Create the Datasource
    let wolistDS = newWorkOrderDatasource(workorderitem, 'wolistDS');
    let statusDS = newPersonDatasource(personList, 'statusDS');
    let earlierStatusMemosDS = newPersonGroupDatasource(personGroupList, 'earlierStatusMemos'); 
   
    app.registerPage(page);
   
    app.setCurrentPage(page);
    page.registerController(workOrderDialogController);
   
    page.registerDatasource(wolistDS);
    page.registerDatasource(statusDS);
    page.registerDatasource(earlierStatusMemosDS);
  
    parentPage.registerDatasource(wolistDS);
    parentPage.registerDatasource(statusDS);
    parentPage.registerDatasource(earlierStatusMemosDS);
 
    expect(wolistDS).not.toBeNull(); 
    expect(statusDS).not.toBeNull(); 
    expect(earlierStatusMemosDS).not.toBeNull(); 
     
    await wolistDS.load();
    await statusDS.load();
    await earlierStatusMemosDS.load();
  
    expect(page.name).toBe('wolist');
  
    let items = await wolistDS.load();
    sinon.stub(wolistDS, "getSelectedItems").returns(items);

    page.parent.state.workOrderDS = wolistDS;
    page.parent.state.statusDS = statusDS;
    page.parent.state.earlierStatusMemosDS = earlierStatusMemosDS;
    page.parent.state.selectedItems = items;
    workOrderDialogController.dialogInitialized(page,app);
    let dialogId = 'updateStatus';
    page.parent.state.workOrderDS.invokeAction = function (){
      return statusresponse;
    }
    page.parent.state.updateStatusDate = new Date().toISOString();
    page.parent.state.updateStatusComment = "Updated the status";
    page.parent.state.updateStatus = page.parent.state.selectedItems.status_maxvalue;
    page.parent.state.dataFormatter={};
    page.parent.state.dataFormatter.convertDatetoISO = function(arg){
      return arg;
    }

    workOrderDialogController.getSelectedDate(page.parent.state.updateStatusDate)
    workOrderDialogController.getSelectedupdateStatus({"selectedItem": {"item": {"maxvalue": "INPRG"}}});

    expect(parentPage.state.selectedItems).not.toBeNull(); 
    await workOrderDialogController.updateAssignmentStatus(dialogId,null,null);

   // comment not specified 
    page.parent.state.updateStatusComment = "";
    await workOrderDialogController.updateAssignmentStatus(dialogId,null);
    await workOrderDialogController.updateAssignmentStatus(dialogId,items);
    parentPage.state.selectedItems = [];
    await workOrderDialogController.updateAssignmentStatus(dialogId,parentPage.state.selectedItems);
    workOrderDialogController.asyncPrimaryEvent();

});

it('Initiate Workflow for Single WorkOrder', async () => {
  const workOrderDialogController = new WorkOrderDialogController();
  const app = new Application();
  const page = new Page({
    name: 'wolist'
  });
  let showDialog = jest.fn();
  page.showDialog = showDialog;
  const starWorkflowDialog = new Dialog({
    name: "startWorkflow",
  });
  const parentPage = new Page({name: 'parentPage'});
  page.parent = parentPage ;

  page.registerDialog(starWorkflowDialog);
  workOrderDialogController.closeDialog = jest.fn();
  
  await app.initialize();  

  //Create the Datasource
  let wolistDS = newWorkOrderDatasource(workorderitem, 'wolistDS');
  let processDS = newWorkflowProcessDatasource(workflowProcessList, 'processDS');
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(workOrderDialogController);
 
  page.registerDatasource(wolistDS);
  page.registerDatasource(processDS);
  parentPage.registerDatasource(wolistDS);
  parentPage.registerDatasource(processDS);


  expect(wolistDS).not.toBeNull(); 
  expect(processDS).not.toBeNull(); 
   
  //let status = "changeOwner";
  await wolistDS.load();
  await processDS.load();

  expect(page.name).toBe('wolist');

  let items = await wolistDS.load();
  sinon.stub(wolistDS, "getSelectedItems").returns(items);

  page.parent.state.workOrderDS = wolistDS;
  page.parent.state.processDS = processDS;
  workOrderDialogController.dialogInitialized(page,app);
  workOrderDialogController.getSelectedWorkflow({"selectedItem": {"item": {"processname": "WORKORDER"}}});
  let saveWOProcess = {
    parent: page,
    woDS : null,
    woItem: null,
    selectedWorkflow: null
  };
  await workOrderDialogController.initiateWorkflow(saveWOProcess);

  workOrderDialogController.getSelectedWorkflow({"selectedItem": {"item": {"processname": undefined}}});
  saveWOProcess = {
    parent: page,
    woDS : null,
    woItem: null,
    selectedWorkflow: null
  };
  await workOrderDialogController.initiateWorkflow(saveWOProcess);
});

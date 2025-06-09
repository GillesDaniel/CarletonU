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

import "./test/fetch.mock.js"
import PageController from './PageController';
import workassignitem from './test/workassignment-json-data.js';
import { Application, Datasource, JSONDataAdapter, Page, Dialog } from '@maximo/maximo-js-api';
import RouteWorkflowDialogController from './RouteWorkflowDialogController';
import earlierMemosList from  './test/earlierMemos-json-data.js';
import personList from  './test/person-json-data.js';
import personGroupList from './test/persongroup-json-data.js';
import actionDataList from  './test/action-json-data.js';
import workorderitem from './test/workorder-json-data.js';
import workorderdetailitem from './test/workorder-detail-json-data.js';
import earlierStatusMemosList from  './test/earlierStatusMemos-json-data.js';
import statusList from './test/status-json-data.js';
import workflowProcessList from './test/workflow-process-json-data';
import allstatus from './test/wo-all-status-json-data';
import worklog from './test/worklog-json-data';
import parentwo from './test/parent-workorder-json-data.js';
import sinon from 'sinon';
import woStatusHistory from './test/workorder-status-history-json-data.js';
import { StatusWizardManager } from './StatusWizardManager';
import progresswizarddata from './test/status-wizard-json-data';
import wocommlogdata from './test/wosummary-commlog-json-data.js';
import commlogdata from './test/commlog-json-data.js';
import wotaskdata from './test/wotask-json-data.js';
import laborData from './test/wplabor-json-data.js'
import craftCrewData from './test/craftCrew-json-data.js'
import laborAssignment from './test/laborAssignment-json-data.js'
import woAIResourcData from './test/woai-json-data.js'

import newTestStub from './test/AppTestStub';

function getFeatures(count, status) {
  let features = [];
  for (let i = 0; i < count; i++) {
    let feature = {
      get: (attr) => {
        if (attr === 'maximoAttributes') {
          return {
            uxsynonymdomain: {
              valueid: status
            }
          }
        }
        if (attr === 'geometry') {
          return {
            constructor: {
              name: 'point'
            }
          }
        }
      }
    }
    features.push(feature)
  }
  return features;
}

function newDatasource(data = workassignitem, name = 'workassignmentitemDS' ) {
  const da = new JSONDataAdapter({
    src: workassignitem,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: 'ownerid',
    name: name
  });

  return ds;
}

function newMemoDatasource(data = earlierMemosList, name = 'action' ) {
  const memoda = new JSONDataAdapter({
    src: earlierMemosList,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const memods = new Datasource(memoda, {
    idAttribute: 'ownerid',
    name: name
  });

  return memods;
}

/*function newActionDatasource(data = actionDataList, name = 'action' ) {
  const actionData = new JSONDataAdapter({
    src: actionDataList,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const actionds = new Datasource(actionData, {
    idAttribute: 'wfactionid',
    name: name
  });

  return actionds;
}*/

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

function newParentWorkOrderlDatasource(data = parentwo, name = 'parentWODS' ) {
  const da = new JSONDataAdapter({
    src: parentwo,
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

function newStatusDatasource(data = statusList, name = 'statusDS' ) {
  const statusData = new JSONDataAdapter({
    src: statusList,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const statusDS = new Datasource(statusData, {
    idAttribute: 'wostatus',
    name: name
  });

  return statusDS;
}

function newStatusMemoDatasource(data = earlierStatusMemosList, name = 'statusMemods' ) {
  const memoda = new JSONDataAdapter({
    src: earlierStatusMemosList,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const statusMemods = new Datasource(memoda, {
    idAttribute: 'changeby',
    name: name
  });

  return statusMemods;
}

function newWorklogatasource(data = worklog, name = 'woWorklogDs' ) {
  const worklogdata = new JSONDataAdapter({
    src: worklog,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const worklogds = new Datasource(worklogdata, {
    idAttribute: 'href',
    name: name
  });

  return worklogds;
}

 it('Load page', async () => {
let pageController = new PageController();
const app = new Application();
const page = new Page({
    name: 'WorkflowAssignments',
    clearStack: false
  });

// allow the page pageController to bind to application lifecycle events
// but prevent re-registering page events on the pageController.
 page.registerController(pageController);
  pageController.pageInitialized(page,app);
  pageController.loadApp({
  appName: 'wotrack',
  options: {},
  context: {uniqueid: '77'}
    });
}); 

it('Create Followup WO', async () => {
  let initializeApp = newTestStub({
    currentPage: 'WOSummaryPage',
    datasources: {
      woDetailResource: {
        data: workorderdetailitem
      }
    }
  });

  let app = await initializeApp();
  expect(app.currentPage.name).toBe('WOSummaryPage');

  let parentWODS = await app.findDatasource('woDetailResource');
  parentWODS.invokeAction = function (){
    return {"wonum": "2007","siteid": "BEDFORD"};
  }

  let controller = app.currentPage.controllers[0];
  app.state.hideLongDescription = false;
  app.state.followupWONum = "";
  await controller.createFollowupWorkOrder({"item": {"href": 'oslc/os/mxapiwodetail/_QkVERk9SRC8xOTYy'}});
  expect(app.currentPage.name).toBe('FollowupWorkOrder');

  //Reset to WO Summary
  app.setCurrentPage({ name: 'WOSummaryPage'});

});

it('Open Edit Work Order', async () => {
  let initializeApp = newTestStub({
    currentPage: 'WOSummaryPage',
    datasources: {
      woDetailResource: {
        data: workorderdetailitem
      },
      woAIResourceDS: {
        data: woAIResourcData
      }
    }
  });

  let app = await initializeApp();
  expect(app.currentPage.name).toBe('WOSummaryPage');

  let controller = app.currentPage.controllers[0];
  app.state.hideLongDescription = false;
  app.state.followupWONum = "";

  let parentWODS = newParentWorkOrderlDatasource(parentwo, 'parentWODS');
  app.registerDatasource(parentWODS);
  await parentWODS.load();

  await controller.openEditWorkOrder({"item": {"href": 'oslc/os/mxapiwodetail/_QkVERk9SRC8xOTYy',"wonum":"2117"}});
  expect(app.currentPage.name).toBe('FollowupWorkOrder');
  expect(app.state.followupWONum).toBe('2117');

  //Reset to WO Summary
  app.setCurrentPage({ name: 'WOSummaryPage'});

});


it('Populate Data for Work Order Summary Route without Memo', async () => {

  const pageController = new PageController();
  const routeWorkflowController = new RouteWorkflowDialogController();
  const app = new Application();
  const page = new Page({
    name: 'WOSummaryPage'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;
  
  const RouteAssignment = new Dialog({
		name: "routeAssignment",
	});
	page.registerDialog(RouteAssignment);
	RouteAssignment.closeDialog = jest.fn();
  
  await app.initialize();
  pageController.loadApp();

  //Create the Datasource
  let wfassignds = newDatasource(workassignitem, 'wflistDS'); 
  let earlierMemos = newMemoDatasource(earlierMemosList, 'earlierMemos');
  let actions = newMemoDatasource(actionDataList, 'routeActions'); 
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(pageController);
  page.registerController(routeWorkflowController);
 
  page.registerDatasource(wfassignds);
  page.registerDatasource(earlierMemos);
  page.registerDatasource(actions);
  
  //Initialize app in the pageController
  pageController.pageInitialized(page, app);
  expect(wfassignds).not.toBeNull(); 
  expect(earlierMemos).not.toBeNull(); 
  expect(actions).not.toBeNull(); 
  
  await wfassignds.load();
  await earlierMemos.load();
  
  expect(page.name).toBe('WOSummaryPage');

  let items = await wfassignds.load();
  let itemsWithoutMemo = [];
  itemsWithoutMemo.push(items[2]);
  sinon.stub(wfassignds, "getSelectedItems").returns(itemsWithoutMemo);
  let woItem={
    "processname": "WOMULTITAS",
    "description": "TASK 3",
    "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjM3/wfassignment/0-202",
    "assigncode": "WILSON",
    "actions": [
        {
            "wfactionid": 763,
            "ownernodeid": 3,
            "membernodeid": 2,
            "instruction": "STOP 2",
            "actionid": 2,
            "ispositive": false
        },
        {
            "wfactionid": 762,
            "ownernodeid": 3,
            "membernodeid": 7,
            "instruction": "INPUT 7",
            "actionid": 1,
            "ispositive": true
        }
    ],
    "_bulkid": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjM3/wfassignment/0-202"
  }
  let item = {
    "dialog" : "Route",
    "item" : woItem
  }
  pageController.openWOSummaryDialog(item);
  
});

it('Populate Data for Route without Memo', async () => {

  const pageController = new PageController();
  const routeWorkflowController = new RouteWorkflowDialogController();
  const app = new Application();
  const page = new Page({
    name: 'WorkflowAssignments'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;
  
  const RouteAssignment = new Dialog({
		name: "routeAssignment",
	});
	page.registerDialog(RouteAssignment);
	RouteAssignment.closeDialog = jest.fn();
  
  await app.initialize();
  pageController.loadApp();

  //Create the Datasource
  let wfassignds = newDatasource(workassignitem, 'wflistDS'); 
  let earlierMemos = newMemoDatasource(earlierMemosList, 'earlierMemos'); 
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(pageController);
  page.registerController(routeWorkflowController);
 
  page.registerDatasource(wfassignds);
  page.registerDatasource(earlierMemos);
  
  //Initialize app in the pageController
  pageController.pageInitialized(page, app);
  expect(wfassignds).not.toBeNull(); 
  expect(earlierMemos).not.toBeNull(); 
   
  let status = "Route";
  await wfassignds.load();
  await earlierMemos.load();
  
  expect(page.name).toBe('WorkflowAssignments');

  let items = await wfassignds.load();
  let itemsWithoutMemo = [];
  itemsWithoutMemo.push(items[2]);
  sinon.stub(wfassignds, "getSelectedItems").returns(itemsWithoutMemo);
  pageController.openItemDialog(status);
  
});

it('Populate Data for Route with Memo', async () => {

  const pageController = new PageController();
  const routeWorkflowController = new RouteWorkflowDialogController();
  const app = new Application();
  const page = new Page({
    name: 'WorkflowAssignments'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;
  
  const RouteAssignment = new Dialog({
		name: "routeAssignment",
	});
	page.registerDialog(RouteAssignment);
	RouteAssignment.closeDialog = jest.fn();
  
  await app.initialize();
  pageController.loadApp();

  //Create the Datasource
  let wfassignds = newDatasource(workassignitem, 'wflistDS'); 
  let earlierMemos = newMemoDatasource(earlierMemosList, 'earlierMemos');
  let actions = newMemoDatasource(actionDataList, 'routeActions'); 
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(pageController);
  page.registerController(routeWorkflowController);
 
  page.registerDatasource(wfassignds);
  page.registerDatasource(earlierMemos);
  page.registerDatasource(actions);
  
  //Initialize app in the pageController
  pageController.pageInitialized(page, app);
  expect(wfassignds).not.toBeNull(); 
  expect(earlierMemos).not.toBeNull();
  expect(actions).not.toBeNull();
   
  let status = "Route";
  await wfassignds.load();
  await earlierMemos.load();
  
  expect(page.name).toBe('WorkflowAssignments');

  let items = await wfassignds.load();
  let itemsWithoutMemo = [];
  itemsWithoutMemo.push(items[0]);
  sinon.stub(wfassignds, "getSelectedItems").returns(itemsWithoutMemo);
  pageController.openItemDialog(status);
  
});

it('Populate Data for Accept', async () => {

  const pageController = new PageController();
  const routeWorkflowController = new RouteWorkflowDialogController();
  const app = new Application();
  const page = new Page({
    name: 'WorkflowAssignments'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;
  
  const acceptAssignment = new Dialog({
		name: "acceptAssignment",
	});
	page.registerDialog(acceptAssignment);
	acceptAssignment.closeDialog = jest.fn();

  await app.initialize();
  pageController.loadApp();

  //Create the Datasource
  let wfassignds = newDatasource(workassignitem, 'wflistDS'); 
  let earlierMemos = newMemoDatasource(earlierMemosList, 'earlierMemos'); 
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(pageController);
  page.registerController(routeWorkflowController);
 
  page.registerDatasource(wfassignds);
  page.registerDatasource(earlierMemos);
  
  //Initialize app in the pageController
  pageController.pageInitialized(page, app);
  expect(wfassignds).not.toBeNull(); 
  expect(earlierMemos).not.toBeNull(); 
 
  await wfassignds.load();
  await earlierMemos.load();
  
  expect(page.name).toBe('WorkflowAssignments');


  let items = await wfassignds.load();
  sinon.stub(wfassignds, "getSelectedItems").returns(items);
  
  
  let status = "Accept";
  await pageController.openItemDialog(status);
});

it('Populate Data for Reject', async () => {

  const pageController = new PageController();
  const routeWorkflowController = new RouteWorkflowDialogController();
  const app = new Application();
  const page = new Page({
    name: 'WorkflowAssignments'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;

  const RejectAssignment = new Dialog({
		name: "rejectAssignment",
	});
	page.registerDialog(RejectAssignment);
	RejectAssignment.closeDialog = jest.fn();
  
  await app.initialize();
  pageController.loadApp();

  //Create the Datasource
  let wfassignds = newDatasource(workassignitem, 'wflistDS'); 
  let earlierMemos = newMemoDatasource(earlierMemosList, 'earlierMemos'); 
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(pageController);
  page.registerController(routeWorkflowController);
 
  page.registerDatasource(wfassignds);
  page.registerDatasource(earlierMemos);
  
  //Initialize app in the pageController
  pageController.pageInitialized(page, app);
  expect(wfassignds).not.toBeNull(); 
  expect(earlierMemos).not.toBeNull(); 
 
  await wfassignds.load();
  await earlierMemos.load();
  
  expect(page.name).toBe('WorkflowAssignments');
 
  let items = await wfassignds.load();
  sinon.stub(wfassignds, "getSelectedItems").returns(items);
  
  let status = "Reject";
  await pageController.openItemDialog(status);
  
});

it('Reassign work flow items', async () => { 
  const pageController = new PageController();
  const routeWorkflowController = new RouteWorkflowDialogController();
  const app = new Application();
  const page = new Page({
    name: 'WorkflowAssignments'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;

  /* const ReAssignment = new Dialog({
		name: "routeAssignment",
	});*/

  await app.initialize();
  pageController.loadApp();

  //Create the Datasource
  let wfassignds = newDatasource(workassignitem, 'wflistDS'); 
  let earlierMemos = newMemoDatasource(earlierMemosList, 'earlierMemos'); 
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(pageController);
  page.registerController(routeWorkflowController);
 
  page.registerDatasource(wfassignds);
  page.registerDatasource(earlierMemos);
  
  //Initialize app in the pageController
  pageController.pageInitialized(page, app);
  expect(wfassignds).not.toBeNull(); 
  expect(earlierMemos).not.toBeNull(); 
 
  await wfassignds.load();
  await earlierMemos.load();
  
  expect(page.name).toBe('WorkflowAssignments');
 
  let items = await wfassignds.load();
  sinon.stub(wfassignds, "getSelectedItems").returns(items);
    
  let status = "routeAssignment";
  await pageController.openItemDialog(status);
  
});

it('Populate Data for WorkOrder Change Owner or OwnergroupAction', async () => {

  const pageController = new PageController();
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
  pageController.loadApp();
  

  //Create the Datasource
  let wolistDS = newWorkOrderDatasource(workorderitem, 'wolistDS');
  let personDS = newPersonDatasource(personList, 'personDS');
  let personGroupDS = newPersonGroupDatasource(personGroupList, 'personGroupDS'); 
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(pageController);
 
  page.registerDatasource(wolistDS);
  page.registerDatasource(personDS);
  page.registerDatasource(personGroupDS);

  parentPage.registerDatasource(wolistDS);
  parentPage.registerDatasource(personDS);
  parentPage.registerDatasource(personGroupDS);
  
  //Initialize app in the pageController
  pageController.pageInitialized(page, app);
  expect(wolistDS).not.toBeNull(); 
  expect(personDS).not.toBeNull(); 
  expect(personGroupDS).not.toBeNull(); 
   
  let status = "changeOwner";
  await wolistDS.load();
  await personDS.load();
  await personGroupDS.load();

  expect(page.name).toBe('wolist');

  let items = await wolistDS.load();
  sinon.stub(wolistDS, "getSelectedItems").returns(items);
  pageController.openChangeOwnerDialog(status);
  pageController.openChangeOwnerDialog(items[0]);
  let itemStatus = [{"valueid":"WOSTATUS|APPR","maxvalue":"APPR","description":"Approved","href":"oslc/os/mxapiwodetail/zombie/getlist~status/0-43","value":"APPR","_bulkid":"oslc/os/mxapiwodetail/zombie/getlist~status/0-43"},{"valueid":"WOSTATUS|CAN","maxvalue":"CAN","description":"Canceled","href":"oslc/os/mxapiwodetail/zombie/getlist~status/1-35","value":"CAN","_bulkid":"oslc/os/mxapiwodetail/zombie/getlist~status/1-35"},{"valueid":"WOSTATUS|CLOSE","maxvalue":"CLOSE","description":"Closed","href":"oslc/os/mxapiwodetail/zombie/getlist~status/2-44","value":"CLOSE","_bulkid":"oslc/os/mxapiwodetail/zombie/getlist~status/2-44"}];
  await pageController.computedBulkStatus(itemStatus);
});
it('Populate Update status with memo', async () => {

  const pageController = new PageController();
  const app = new Application();
  const page = new Page({
    name: 'wolist'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;
  const UpdateStatusDialog = new Dialog({
		name: "updateStatus",
	});
  const parentPage = new Page({name: 'parentPage'});
	page.parent = parentPage ;

	page.registerDialog(UpdateStatusDialog);
	UpdateStatusDialog.closeDialog = jest.fn();
  
  await app.initialize();
  pageController.loadApp();
  

  //Create the Datasource
  let wolistDS = newWorkOrderDatasource(workorderitem, 'wolistDS');
  let statusDS = newStatusDatasource(statusList, 'statusDS');
  let statusMemods = newStatusMemoDatasource(earlierStatusMemosList, 'earlierStatusMemos'); 
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(pageController);
 
  page.registerDatasource(wolistDS);
  page.registerDatasource(statusDS);
  page.registerDatasource(statusMemods);

  parentPage.registerDatasource(wolistDS);
  parentPage.registerDatasource(statusDS);
  parentPage.registerDatasource(statusMemods);
  
  //Initialize app in the pageController
  pageController.pageInitialized(page, app);
  expect(wolistDS).not.toBeNull(); 
  expect(statusDS).not.toBeNull(); 
  expect(statusMemods).not.toBeNull(); 
   
  await wolistDS.load();
  await statusDS.load();
  await statusMemods.load();

  expect(page.name).toBe('wolist');
  let items = await wolistDS.load();
  
 // sinon.stub(wolistDS, "getSelectedItems").returns(items);
  app.state = {
		woStatSigOptions: {
			"APPR" : "APPR", "CLOSE" : "CLOSE"
		}
	};
  app.state.woStatSigOptions = JSON.stringify(app.state.woStatSigOptions);
  pageController.computedStates(items[0]);
  pageController.openWOItemDialog(items[0]);
  
});

it('Bulk Selection of WO and Update status with memo', async () => {

  const pageController = new PageController();
  const app = new Application();
  const page = new Page({
    name: 'wolist'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;
  const UpdateStatusDialog = new Dialog({
		name: "updateStatus",
	});
  const parentPage = new Page({name: 'parentPage'});
	page.parent = parentPage ;

	page.registerDialog(UpdateStatusDialog);
	UpdateStatusDialog.closeDialog = jest.fn();

  await app.initialize();
  pageController.loadApp();

  //Create the Datasource
  let wolistDS = newWorkOrderDatasource(workorderitem, 'wolistDS');
  let statusDS = newStatusDatasource(statusList, 'statusDS');
  let allStatusDS = newStatusDatasource(statusList, 'allStatusDS');
  let statusMemods = newStatusMemoDatasource(earlierStatusMemosList, 'earlierStatusMemos');

  app.registerPage(page);

  app.setCurrentPage(page);
  page.registerController(pageController);

  page.registerDatasource(wolistDS);
  page.registerDatasource(statusDS);
  page.registerDatasource(allStatusDS);
  page.registerDatasource(statusMemods);

  parentPage.registerDatasource(wolistDS);
  parentPage.registerDatasource(statusDS);
  parentPage.registerDatasource(allStatusDS);
  parentPage.registerDatasource(statusMemods);

  //Initialize app in the pageController
  pageController.pageInitialized(page, app);
  expect(wolistDS).not.toBeNull();
  expect(statusDS).not.toBeNull();
  expect(allStatusDS).not.toBeNull();
  expect(statusMemods).not.toBeNull();

  await wolistDS.load();
  await statusDS.load();
  allStatusDS.load = function (){
    return allstatus;
  }
  await statusMemods.load();

  expect(page.name).toBe('wolist');
  let items = await wolistDS.load();

  sinon.stub(wolistDS, "getSelectedItems").returns(items);
  app.state = {
		woStatSigOptions: {
			"APPR" : "APPR", "CLOSE" : "CLOSE"
		}
	};

  app.state.woStatSigOptions = JSON.stringify(app.state.woStatSigOptions);
  pageController.openWOItemDialog(items);
  
});

it('Populate update status with no memo', async () => {

  const pageController = new PageController();
  const app = new Application();
  const page = new Page({
    name: 'wolist'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;
  const UpdateStatusDialog = new Dialog({
		name: "updateStatus",
	});
  const parentPage = new Page({name: 'parentPage'});
	page.parent = parentPage ;

	page.registerDialog(UpdateStatusDialog);
	UpdateStatusDialog.closeDialog = jest.fn();
  
  await app.initialize();
  pageController.loadApp();
  

  //Create the Datasource
  let wolistDS = newWorkOrderDatasource(workorderitem, 'wolistDS');
  let statusDS = newStatusDatasource(statusList, 'statusDS');
  let statusMemods = newStatusMemoDatasource(earlierStatusMemosList, 'earlierStatusMemos'); 
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(pageController);
 
  page.registerDatasource(wolistDS);
  page.registerDatasource(statusDS);
  page.registerDatasource(statusMemods);

  parentPage.registerDatasource(wolistDS);
  parentPage.registerDatasource(statusDS);
  parentPage.registerDatasource(statusMemods);
  
  //Initialize app in the pageController
  pageController.pageInitialized(page, app);
  expect(wolistDS).not.toBeNull(); 
  expect(statusDS).not.toBeNull(); 
  expect(statusMemods).not.toBeNull(); 
   
  await wolistDS.load();
  await statusDS.load();
  await statusMemods.load();

  expect(page.name).toBe('wolist');
  let status = "updateStatus";
  let items = await wolistDS.load();
  let itemsWithoutMemo = [];
  itemsWithoutMemo.push(items[1]);
  expect(items[0].wostatus).not.toBeNull();
  sinon.stub(wolistDS, "getSelectedItems").returns(itemsWithoutMemo);
  app.state.hideEarlierStatusMemo = true;
  app.state = {
		woStatSigOptions: {
			"APPR" : "APPR", "CLOSE" : "CLOSE"
		}
	};  
  app.state.woStatSigOptions = JSON.stringify(app.state.woStatSigOptions);
  expect(statusDS.currentItem).not.toBeNull(); 
  pageController.openWOItemDialog(status); 
});

it('Multiple WO Selected and Fetch Data for Multiple WO', async () => {

  const pageController = new PageController();
  const app = new Application();
  const page = new Page({
    name: 'wolist'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;
  const StartWorkflowDialog = new Dialog({
		name: "startWorkflow",
	});
  const parentPage = new Page({name: 'parentPage'});
	page.parent = parentPage ;

	page.registerDialog(StartWorkflowDialog);
	StartWorkflowDialog.closeDialog = jest.fn();
  await app.initialize();
  pageController.loadApp();

  //Create the Datasource
  let wolistDS = newWorkOrderDatasource(workorderitem, 'wolistDS');
  let processDS = newPersonDatasource(workflowProcessList, 'processDS');
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(pageController);
 
  page.registerDatasource(wolistDS);
  page.registerDatasource(processDS);

  parentPage.registerDatasource(wolistDS);
  parentPage.registerDatasource(processDS);
  
  //Initialize app in the pageController
  pageController.pageInitialized(page, app);
  expect(wolistDS).not.toBeNull(); 
  expect(processDS).not.toBeNull(); 
   
  //let status = "startWorkflow";
  await wolistDS.load();
  await processDS.load();

  expect(page.name).toBe('wolist');

  let items = await wolistDS.load();
  sinon.stub(wolistDS, "getSelectedItems").returns(items);

  pageController.openStartWorkflowDialog(null,workflowProcessList.member);
  expect(app.state.workflowDialogOpened).toBe(true);
  
  let workflowProcess=[];
  workflowProcess.push(workflowProcessList.member[0]);

  pageController.openStartWorkflowDialog(null,workflowProcess);
  expect(app.state.workflowInitiated).toBe(true);
  
  pageController.pageResumed(page,app);

});

it('Single WO Selected and Fetch Data for Multiple WO', async () => {

  const pageController = new PageController();
  const app = new Application();
  const page = new Page({
    name: 'wolist'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;
  const StartWorkflowDialog = new Dialog({
		name: "startWorkflow",
	});
  const parentPage = new Page({name: 'parentPage'});
	page.parent = parentPage ;

	page.registerDialog(StartWorkflowDialog);
	StartWorkflowDialog.closeDialog = jest.fn();
  
  await app.initialize();
  pageController.loadApp();
  

  //Create the Datasource
  let wolistDS = newWorkOrderDatasource(workorderitem, 'wolistDS');
  let processDS = newPersonDatasource(workflowProcessList, 'processDS');
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(pageController);
 
  page.registerDatasource(wolistDS);
  page.registerDatasource(processDS);

  parentPage.registerDatasource(wolistDS);
  parentPage.registerDatasource(processDS);
  
  //Initialize app in the pageController
  pageController.pageInitialized(page, app);
  expect(wolistDS).not.toBeNull(); 
  expect(processDS).not.toBeNull(); 
   
  //let status = "startWorkflow";
  await wolistDS.load();
  await processDS.load();

  expect(page.name).toBe('wolist');

  let worOrderItem = [];
  worOrderItem.push(workorderitem.member[0]);
  sinon.stub(wolistDS, "getSelectedItems").returns(worOrderItem);

  pageController.openStartWorkflowDialog(null,workflowProcessList.member);
  expect(app.state.workflowDialogOpened).toBe(true);

  let workflowProcess=[];
  workflowProcess.push(workflowProcessList.member[0]);

  pageController.openStartWorkflowDialog(null,workflowProcess);
  expect(app.state.workflowInitiated).toBe(true);
  
});

it('Work Order Summary Workflow Assignment', async () => {

  const pageController = new PageController();
  const app = new Application();
  const page = new Page({
    name: 'WOSummaryPage'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;
  const StartWorkflowDialog = new Dialog({
		name: "startWorkflow",
	});
  const parentPage = new Page({name: 'parentPage'});
	page.parent = parentPage ;
  page.lastPage = {};
  page.lastPage.name = "wolist";

	page.registerDialog(StartWorkflowDialog);
	StartWorkflowDialog.closeDialog = jest.fn();

  await app.initialize();
  pageController.loadApp();

  //Create the Datasource
  let wosummaryDS = newWorkOrderDatasource(workorderdetailitem, 'woDetailResource');
  let wolistDS = newWorkOrderDatasource(workorderitem, 'wolistDS');
  let processDS = newPersonDatasource(workflowProcessList, 'processDS');

  app.registerPage(page);

  app.setCurrentPage(page);
  page.registerController(pageController);
 
  page.registerDatasource(wosummaryDS);
  page.registerDatasource(wolistDS);
  page.registerDatasource(processDS);

  parentPage.registerDatasource(wosummaryDS);
  parentPage.registerDatasource(wolistDS);
  parentPage.registerDatasource(processDS);
  
  //Initialize app in the pageController
  pageController.pageInitialized(page, app);
  expect(wosummaryDS).not.toBeNull();
  expect(wolistDS).not.toBeNull();
  expect(processDS).not.toBeNull();
  
  await wosummaryDS.load();
  await wolistDS.load();
  await processDS.load();

  expect(page.name).toBe('WOSummaryPage');

  let worOrderItem = [];
  worOrderItem.push(workorderitem.member[0]);
  sinon.stub(wosummaryDS, "getSelectedItems").returns(worOrderItem);

  let selectedItem = {
    "status_description": "Waiting on material",
    "problemcode": "PLUMB",
    "contract": {},
    "worktype": "CM",
    "classstructure": {},
    "wonum": "W112970_DT_US999",
    "status_maxvalue": "WMATL",
    "_rowstamp": "432000",
    "failurecode": "MANUFACT",
    "schedfinish": "2021-06-23T04:36:57+05:30",
    "wosafetyplan": {},
    "assetnum": "A121ADM999",
    "inspectionform": {},
    "longdescription": {},
    "schedstart": "2021-06-12T04:36:57+05:30",
    "$alias_this_attr$location": "L4B2DM999",
    "location": {},
    "href": "oslc/os/mxapiwodetail/_REVUUk9JVC9XMTEyOTcwX0RUX1VTOTk5",
    "inspectionresult": {},
    "asset": {
        "description": "Wash Line 121 ADM"
    },
    "pm": {},
    "doclinks": {
        "href": "oslc/os/mxapiwodetail/_REVUUk9JVC9XMTEyOTcwX0RUX1VTOTk5/doclinks",
        "member": []
    },
    "jobplan": {},
    "status": "WMATL",
    "_bulkid": "W112970_DT_US999"
  };
  pageController.openStartWorkflowDialog(selectedItem,workflowProcessList.member);
  expect(app.state.workflowDialogOpened).toBe(true);
  
  let workflowProcess=[];
  workflowProcess.push(workflowProcessList.member[0]);

  pageController.openStartWorkflowDialog(selectedItem,workflowProcess);
  expect(app.state.workflowInitiated).toBe(true);

  //cover the pagestack (bread crumb)
  let stack = [1];
  stack.push('WOSummaryPage');
  pageController.getPageStack(stack,page);
  pageController.selectMenuItem(0);

  let stackLongDescription = [2];
  app.state.wonum = "2110";
  stackLongDescription.push('WOSummaryPage');
  stackLongDescription.push('LongDescription');
  pageController.getPageStack(stackLongDescription,page);
  pageController.selectMenuItem(0);
  
});

it('Load WOSummary', async () => {
  let initializeApp = newTestStub({
    currentPage: 'WOSummaryPage',
    datasources: {
      woDetailResource: {
        data: workorderdetailitem
      }
    }
  });

  let app = await initializeApp();
  app.setCurrentPage('WOSummaryPage');
  expect(app.currentPage.name).toBe('WOSummaryPage');
  
  let woDetailResource = await app.findDatasource('woDetailResource');
  woDetailResource.load = function (){
        return "success";
      }
  let items = await woDetailResource.load();
  sinon.stub(woDetailResource, "getSelectedItems").returns(items);
  let pageController = app.currentPage.controllers[0];
  pageController.openWOSummary({"item": {"href": '_QkVERk9SRC8yMDA1'}});
  expect(app.currentPage.state.selected_wodpanel_Index).toBe("0");
  expect(app.currentPage.state.responsibilityCount).toBe(2);

});

it('ReLoad WOSummary', async () => {
  let initializeApp = newTestStub({
    currentPage: 'WOSummaryPage',
    datasources: {
      woDetailResource: {
        data: workorderdetailitem
      }
    }
  });

  let app = await initializeApp();
  app.setCurrentPage('WOSummaryPage');
  expect(app.currentPage.name).toBe('WOSummaryPage');

  let woDetailResource = await app.findDatasource('woDetailResource');
  await woDetailResource.load();

  let pageController = app.currentPage.controllers[0];
  pageController.reloadWorkOrderDetail([
    {
        "pages": 1,
        "haserrors": false,
        "exceptionmessage": "",
        "mbo": "WORKORDER",
        "title": "Work Order Tracking",
        "saveneeded": false,
        "uniqueid": 133390
    }
]);

});

it('Work Order Summary >> Work log >> Open Add Comment Dialog', async () => {

  const pageController = new PageController();
  const app = new Application();
  const page = new Page({
    name: 'WOSummaryPage'
  });
  let showDialog = jest.fn();
  app.showDialog = showDialog;

  const worklogComment = new Dialog({
		name: "addWorklogComment",
	});
	app.registerDialog(worklogComment);
	worklogComment.closeDialog = jest.fn();

  await app.initialize();
  pageController.loadApp();

  //Create the Datasource
  let worklogds = newWorklogatasource(worklog, 'woWorklogDs');

  app.registerPage(page);

  app.setCurrentPage(page);
  page.registerController(pageController);

  page.registerDatasource(worklogds);
  
  //Initialize app in the pageController
  pageController.pageInitialized(page, app);
  expect(worklogds).not.toBeNull();

  worklogds.load();

  expect(page.name).toBe('WOSummaryPage');
  await pageController.openWorklogComment();
});

global.target_wotypeisem = {"RBA.WO.STATUSMAP.WOTYPEISEM": "WAPPR, CAN, CLOSE, COMP"};
it('Load Progress Wizard', async () => {
  let initializeApp = newTestStub({
    currentPage: 'WOSummaryPage',
    datasources: {
      wostatushistoryDS: {
        data: woStatusHistory
      },
      allStatusDS: {
        data: allstatus
      },
      createWizardDS: {
        data: progresswizarddata
      },
      woDetailResource: {
        data: workorderdetailitem
      }
    }
  });
  let app = await initializeApp();
  app.setCurrentPage('WOSummaryPage');
  expect(app.currentPage.name).toBe('WOSummaryPage');
  
  let wostatushistoryDS = await app.findDatasource('wostatushistoryDS');
  let wostatusitems = await wostatushistoryDS.load();
  let allstatusDS = await app.findDatasource('allStatusDS');
  let allstatusitems = await allstatusDS.load();
  let woDetailResource = await app.findDatasource('woDetailResource');
  let items = await woDetailResource.load();
  let woitem = {};
  if(items && items.length > 0 && items[0]){
    woitem = items[0];
  }

  expect(wostatushistoryDS.state.hasData).toBe(true);
  expect(allstatusDS.state.hasData).toBe(true);

  expect(wostatusitems).not.toBeNull();
  expect(allstatusitems).not.toBeNull();

  expect(wostatusitems[0].status).not.toBeNull();
  expect(wostatusitems[0].status_description).not.toBeNull();

  let statusmngr = new StatusWizardManager(app,app.currentPage);
  let status_value = await statusmngr.execute(woitem);
  await statusmngr.populateProgressWizard(status_value, woitem);

  let controller = app.currentPage.controllers[0];
  controller.onSetProgressWizardStep();
  controller.onCancelUpdateStatus();

  status_value = await statusmngr.execute({});
  controller.onSetProgressWizardStep();

  global.target_wotypeisem = {"RBA.WO.STATUSMAP.WOTYPEISEM": "WAPPR CAN CLOSE COMP"};
  let status_value_error = await statusmngr.execute(woitem);
  expect(status_value_error).toContain("ERROR");

  await statusmngr.populateProgressWizard("ERROR", woitem);
  let result = statusmngr.validateData("A B C",woitem);
  expect(result).toBe("");

  result = statusmngr.validateData("",woitem);
  expect(result).toBe("");

  let selitem = statusmngr.getSelectedWoItem();
  expect(selitem).not.toBeNull();

  statusmngr.pwutil.setUnSpecified();
  let found = statusmngr.pwutil.setCurrentStatus("ABC");
  expect(found).toBe(false);

  status_value = await statusmngr.execute([]);
  expect(status_value).toContain("ERROR");

  let histstatus = statusmngr.processStatusHistory();
  expect(histstatus).not.toBeNull();

  let return_obj = statusmngr.loader("fake_url");
  expect(return_obj.obj).toBe(undefined);

});

it('Load Long Description', async () => {
  let initializeApp = newTestStub({
    currentPage: 'WOSummaryPage'
  });

  let app = await initializeApp();
  expect(app.currentPage.name).toBe('WOSummaryPage');
  
  let pageController = app.currentPage.controllers[0];
  let longDescription = {
    "longdescription": "<p>Edit&nbsp; Custom 1234567</p>",
    "wonum": "2110"
  }
  pageController.loadLongDescription(longDescription);
  expect(app.currentPage.name).toBe('LongDescription');

});

it('Navigate Back to WOSummary  Page', async () => {
  let initializeApp = newTestStub({
    currentPage: 'LongDescription'
  });

  let app = await initializeApp();
  expect(app.currentPage.name).toBe('LongDescription');
  let pageController = app.currentPage.controllers[0];
  pageController.goBackToSummary();
  expect(app.currentPage.name).toBe('WOSummaryPage');

});

it('Navigate to WOSummary  Page from WOList Page', async () => {
  let initializeApp = newTestStub({
    currentPage: 'wolist'
  });

  let app = await initializeApp();
  expect(app.currentPage.name).toBe('wolist');
});

it('WO list default query', async () => {
  let initializeApp = newTestStub({
    currentPage: 'wolist',
    datasources: {
      wolistDS: {
        data: workorderitem
      }
    }
  });
  let app = await initializeApp();
  app.setCurrentPage('wolist');
  expect(app.currentPage.name).toBe('wolist');

  let wolistDS = await app.findDatasource('wolistDS');
  wolistDS.setQBE('owner', '=', 'WILSON');
  let wolistitems = await wolistDS.searchQBE();

  //let wolistitems = await wolistDS.load();
  expect(wolistDS.state.hasData).toBe(true);

  expect(wolistitems).not.toBeNull();

  let controller = app.currentPage.controllers[0];
  app.client = {'userInfo':{'insertSite':'BEDFORD'}};
  await controller.initializewoDS(app);
  controller.pageResumed(app.currentPage,app);
  app.client = {'userInfo':{'insertSite':'BEDFORD'}};
  controller.onBeforeLoadData(wolistDS,{});
});

it('Load Communication Log for selected WO', async () => {
  let initializeApp = newTestStub({
    currentPage: 'WOSummaryPage',
    clearStack: true,
    datasources: {
      woCommlogDs: {
        data: wocommlogdata
      }
    }
  });
  let app = await initializeApp();
  expect(app.currentPage.name).toBe('WOSummaryPage');
  let wocommlogDS = await app.findDatasource('woCommlogDs');
  await wocommlogDS.load();
  let wocommlogAttachDS = wocommlogDS.getChildDatasource("doclinks",wocommlogDS.item[0]);
  if(wocommlogAttachDS!=null){
    await wocommlogAttachDS.load();
  }

  let pageController = app.currentPage.controllers[0];
  pageController.loadCommunicationLog(commlogdata);
  
  expect(app.state.commlogSubject).not.toBeNull();
  expect(app.state.commlogMessage).not.toBeNull();
  expect(app.state.wonum).not.toBeNull();
  expect(app.currentPage.name).toBe('CommunicationLog');
});

it('createWOSymbology single feature INPRG', async () => {
  let mapController = new PageController();

    const app = new Application();
    app.registerController(mapController);
    mapController.app = app;
    await app.initialize();

    const mockgetLocalizedLabel = jest.fn();
    app.getLocalizedLabel = mockgetLocalizedLabel;

  let params = {features: getFeatures(1, 'WOSTATUS|INPRG'), legends: mapController.retrieveWOLegends(app)};
  let responseJson = mapController.createWOSymbology(params);
  expect(responseJson).not.toBeNull();

  params = {features: getFeatures(1, 'WOSTATUS|CLOSE'), legends: mapController.retrieveWOLegends(app)};
  responseJson = mapController.createWOSymbology(params);
  expect(responseJson).not.toBeNull();

  params = {features: getFeatures(1, 'WOSTATUS|APPR'), legends: mapController.retrieveWOLegends(app)};
  responseJson = mapController.createWOSymbology(params);
  expect(responseJson).not.toBeNull();

  params = {features: getFeatures(1, 'WOSTATUS|WMATL'), legends: mapController.retrieveWOLegends(app)};
  responseJson = mapController.createWOSymbology(params);
  expect(responseJson).not.toBeNull();
});

it('createWOSymbology single feature DONE', async() => {
  let mapController = new PageController();
  const app = new Application();
  app.registerController(mapController);
  mapController.app = app;
  await app.initialize();

  const mockgetLocalizedLabel = jest.fn();
  app.getLocalizedLabel = mockgetLocalizedLabel;
  const params = {features: getFeatures(1, 'DONE'), legends: mapController.retrieveWOLegends(app)};
  let responseJson = mapController.createWOSymbology(params);
  expect(responseJson).not.toBeNull();
});

it('createWOSymbology many feature', async() => {
  let mapController = new PageController();
  const app = new Application();
  app.registerController(mapController);
  mapController.app = app;
  await app.initialize();

  const mockgetLocalizedLabel = jest.fn();
  app.getLocalizedLabel = mockgetLocalizedLabel;
  
  let params = {features: getFeatures(1, 'INPRG'), legends: mapController.retrieveWOLegends(app)};
  let responseJson = mapController.createWOSymbology(params);
  expect(responseJson).not.toBeNull();

  params = {features: getFeatures(2, 'INPRG'), legends: mapController.retrieveWOLegends(app)};
  responseJson = mapController.createWOSymbology(params);
  expect(responseJson).not.toBeNull();
});

it('Verify WO Task Resources and Responsibility', async () => {
  let initializeApp = newTestStub({
    currentPage: 'WOSummaryPage',
    clearStack: true,
    datasources: {
      woTaskDS: {
        data: wotaskdata
      }
    }
  });
  let app = await initializeApp();
  expect(app.currentPage.name).toBe('WOSummaryPage');
  let woTaskDS = await app.findDatasource('woTaskDS');
  await woTaskDS.load();

  let pageController = app.currentPage.controllers[0];
  let ownerGroup  = pageController.computeResponsibility(woTaskDS.items[1]);
  let owner  = pageController.computeResponsibility(woTaskDS.items[0]);
  let computedResources  = pageController.computeResources(woTaskDS.items[0]);
  
  expect(woTaskDS.items[1].ownergroup).not.toBeNull();
  expect(ownerGroup).toBe('SAFETY');

  expect(woTaskDS.items[0].owner).not.toBeNull();
  expect(owner).toBe('RICKC');
  expect(computedResources).toBe('Labor, Materials, Services, Tools');
});

it('Work Order Plan Task Count', async () => {
  let initializeApp = newTestStub({
    currentPage: 'WOSummaryPage',
    clearStack: true,
    datasources: {
      woTaskDS: {
        data: wotaskdata
      }
    }
  });
  let app = await initializeApp();
  expect(app.currentPage.name).toBe('WOSummaryPage');
  let woTaskDS = await app.findDatasource('woTaskDS');
  await woTaskDS.load();

  let pageController = app.currentPage.controllers[0];
  await pageController.selectMenuItem(1);
  expect(app.currentPage.state.woTaskCount).toBe('');
  let page = {};
  page.value = "wolist";
  pageController.gotoPage(page);
});

it('Work Order Plan Task Summary Page', async () => {
  let initializeApp = newTestStub({
    currentPage: 'WOSummaryPage',
    clearStack: true,
    datasources: {
      wpTaskLaborDS: {
        data: laborData
      },taskCraftCrewDS: {
        data: craftCrewData
      },taskLaborAssignmentDS: {
        data: laborAssignment
      },wolistDS: {
        data: workorderitem
      }
    }
  });
  let app = await initializeApp();
  expect(app.currentPage.name).toBe('WOSummaryPage');
  let wolistDS = await app.findDatasource('wolistDS');
  wolistDS.setQBE('owner', '=', 'WILSON');
  await wolistDS.searchQBE();

  let wpTaskLaborDS = await app.findDatasource('wpTaskLaborDS');
  await wpTaskLaborDS.load();

  let pageController = app.currentPage.controllers[0];
  let computedWorkType = pageController.computedWorkType(wolistDS.items[0]);
  expect(computedWorkType).toBe("7111-10");
  computedWorkType = pageController.computedWorkType(wolistDS.items[1]);
  expect(computedWorkType).toBe("CP 7111");
  pageController.computeResources(wolistDS.items[0]);
  await pageController.showTaskSummary('12345');
  expect(app.currentPage.state.displayTaskSummary).toBe(true);
  let page = {};
  page.value = "WOSummaryPage";
  pageController.gotoPage(page);
  await pageController.taskLongDescription('Longdescription');
  expect(app.currentPage.state.displayTaskLongDescription).not.toBeNull();

});


it('Open edit task Page', async () => {
  let initializeApp = newTestStub({
    currentPage: 'WOSummaryPage',
    clearStack: true,
    datasources: {
    woDetailResource: {
        data: workorderdetailitem
      }
    }
  });
  let app = await initializeApp();
  expect(app.currentPage.name).toBe('WOSummaryPage');

  let woDetailResource = await app.findDatasource('woDetailResource');
  await woDetailResource.load();

  let pageController = app.currentPage.controllers[0];
  app.setCurrentPage = function (){
    return true;
  }
  await pageController.editTask({"item": {"workorderid": '1234',"parent": '2342'}});
  expect(app.state.editTask).toBe(true);
});


it('Open edit WO Resources Page', async () => {
  let initializeApp = newTestStub({
    currentPage: 'WOSummaryPage',
    clearStack: true,
    datasources: {
    woDetailResource: {
        data: workorderdetailitem
      }
    }
  });
  let app = await initializeApp();
  expect(app.currentPage.name).toBe('WOSummaryPage');

  let woDetailResource = await app.findDatasource('woDetailResource');
  await woDetailResource.load();

  let pageController = app.currentPage.controllers[0];
  app.setCurrentPage = function (){
    return true;
  }
  await pageController.editWOResources({"item": {"workorderid": '1234',"parent": '2342'}});
  expect(app.state.woresources).toBe(true);
});

it('Load WO Task Labor Data', async () => {
  let initializeApp = newTestStub({
    currentPage: 'WOSummaryPage',
    clearStack: true,
    datasources: {
      wpLaborDS: {
        data: laborData
      },
      woCraftCrewDS: {
        data: craftCrewData
      },
      woLaborAssignmentDS: {
        data: laborAssignment
      }
    }
  });
  let app = await initializeApp();
  expect(app.currentPage.name).toBe('WOSummaryPage');

  let wpLaborDS = await app.findDatasource('wpLaborDS');
  await wpLaborDS.load();

  let woCraftCrewDS = await app.findDatasource('woDetailResource');
  await woCraftCrewDS.load();

  let woLaborAssignmentDS = await app.findDatasource('woLaborAssignmentDS');
  await woLaborAssignmentDS.load();

  let pageController = app.currentPage.controllers[0];
  app.setCurrentPage = function (){
    return true;
  }
  await pageController.loadWOLabor();
});

it('WO AI', async () => {
  let initializeApp = newTestStub({
    currentPage: 'WOSummaryPage',
    datasources: {
      woAIResourceDS: {
        data: woAIResourcData
      },
      woDetailResource: {
        data: workorderdetailitem
      },
      wolistDS: {
        data: workorderitem
      }
    }
  });
  let app = await initializeApp();
  app.setCurrentPage({ name: 'WOSummaryPage'});
  expect(app.currentPage.name).toBe('WOSummaryPage');
  
  let woDetailResource = app.findDatasource('woDetailResource');
  await woDetailResource.load();

  let woAIResourceDS = app.findDatasource('woAIResourceDS');
  await woAIResourceDS.load();

  let wolistDS = app.findDatasource('wolistDS');
  let items = await wolistDS.load();
  app.state.workOrderDS = wolistDS;
  sinon.stub(wolistDS, "getSelectedItems").returns(items);
  app.state.selectedItems = items;

  let pageController = app.currentPage.controllers[0];
  await pageController.addToAITrianingModel();
  await pageController.removeToAITrianingModel({removeFromAITrianingModel:true});
  await pageController.bulkAddToAITrianingModel({target:"wolist",action:"add"});
});

export default PageController;

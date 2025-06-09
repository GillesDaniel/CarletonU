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

import TaskController from './TaskController';
import newTestStub from './test/AppTestStub';
import sinon from 'sinon';
import createtask from './test/create-task-json-data.js';
import {JSONDataAdapter,Datasource,Dialog} from '@maximo/maximo-js-api';

import assetlookup from './test/asset-lookup-json-data.js';
import locationlookup from './test/location-lookup-json-data.js';
import inspectionFormOtherLookup from './test/OTHERINSPFORMS.json';
import classificationHierarchyLookup from './test/classstructure-hierarchy-lookup-json-data.js';
import measurementPointLookup from './test/measurement-point-json-data.js';
import shiftLookup from './test/shift-json-data.js';

import workorderdetailitem from './test/workorder-detail-json-data.js';
import existingwodata from './test/existing-wo-detail-json-data.js';
import wocreatetaskdata from './test/wo-plan-details-json-data.js';
import existingWoTaskdata from './test/wo-task-json-data.js';
import wotaskrelationdata from './test/wotask-relation-json-data.js';
import selectedPredecessordata from './test/selected-predecessor-json-data.js';

import woTaskPredecessordata from './test/wo-task-predecessor-json-data.js';
import allwoPredecessordata from './test/all-wo-predecessor-json-data.js';

import responsibilityList from './test/responsibilityList-task-json-data.js';
import personGroup from './test/persongroup-json-data.js';
import person from './test/person-json-data.js';
import crewworkGroup from './test/crewworkGroup-task-json-data.js';
import workGroup from './test/workGroup-task-json-data.js';
import addLaborCrew from './test/add-task-laborcrew-json-data.js';
import addCraftCrewType from './test/add-task-craftCrewtype-json-data.js';
import addLaborAssignment from './test/add-task-laborassignment-json-data.js'
import craftLookupds from './test/add-task-craftLookup-json-data.js';
import crewTypeLookup from './test/add-task-crewtypeLookup-json-data.js';
import crewLookuplist from './test/add-task-crewLookup-json-data.js';
import addcraftCrewtypeDSjson from './test/addcraftCrewtypeDSTable-data.js';
import addLaborCrewDSjson from './test/addLaborCrewDSTable-data.js';
import cancelWpLaborDS from './test/cancelWpLaborDS.js';

function newWorkOrderDetailDatasource(data = workorderdetailitem, name = 'woDetailResource' ) {
  const da = new JSONDataAdapter({
    src: workorderdetailitem,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: 'wonum',
    name: name
  });

  return ds;
}

it('Create Task', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateTask',
    datasources: {
      woPlanTaskDetailds: {
        data: createtask
      },assetLookupDS: {
        data: assetlookup
      },locationLookupDS: {
        data: locationlookup
      },inspFormLookupds: {
        data: inspectionFormOtherLookup
      },classificationHierarchicalLookupDS: {
        data: classificationHierarchyLookup
      },measurementPointDS: {
        data: measurementPointLookup
      },shiftds: {
        data: shiftLookup
      }
    }
  });


  let app = await initializeApp();
  expect(app.currentPage.name).toBe('CreateTask');
  app.client = {
		userInfo: {
			personid: 'SAM',
			primaryphone: 'UPS'
		},
	};

  const locationItem = {
    location : "EAST",
    description : "Eastern District",
    locfailurecode:"CLEAN"
  };

  let items = [];
  const task = {
      wonum: "2010"
  }

  let woPlanTaskDetailds = await app.findDatasource('woPlanTaskDetailds');
  await woPlanTaskDetailds.load();

  let taskController = app.currentPage.controllers[0];
  app.lastPage = { name: "WOSummary" };


  taskController.onDatasourceSelectionChanged({"datasource": {"name": 'assetLookupDS'},"selected":"true"});
  expect(app.state.assetLookupPrimaryButtonDisabled).toBe(false);

  taskController.onDatasourceSelectionChanged({"datasource": {"name": 'locationLookupDS'},"selected":"true"});
  expect(app.state.locationLookupPrimaryButtonDisabled).toBe(false);

  taskController.onDatasourceSelectionChanged({"datasource": {"name": 'measurementPointDS'},"selected":"true"});
  expect(app.state.measurementPointLookupPrimaryButtonDisabled).toBe(false);

  taskController.onDatasourceSelectionChanged({"datasource": {"name": 'shiftds'},"selected":"true"});
  expect(app.state.shiftLookupPrimaryButtonDisabled).toBe(false);

  taskController.onDatasourceSelectionChanged({ "datasource": { "name": 'classificationHierarchicalLookupDS' }, "selected": "true" });
  expect(app.state.classificationHLookupPrimaryButtonDisabled).toBe(false);

  taskController.onEditorChange({"target": {"content": "<p>Task Long Description</p>"}})
  expect(woPlanTaskDetailds.item.description_longdescription).not.toBeNull();
  expect(woPlanTaskDetailds.item.description_longdescription).toBe('<p>Task Long Description</p>');

  
  taskController.updateAssetDescription({"description": "Chain Wash Assembly","location":{"location": "FIELDSTAFF","description": "Field User"}});
  expect(woPlanTaskDetailds.item.assetdesc).toBe('Chain Wash Assembly');

  let locationLookupDS = await app.findDatasource('locationLookupDS');
  await locationLookupDS.load({src: locationItem, noCache: true});

  taskController.updateLocationDescription({"value": "EAST"});
  expect(woPlanTaskDetailds.item.locationdesc).toBe('Eastern District');

  let inspFormLookupds = await app.findDatasource('inspFormLookupds');
  await inspFormLookupds.load();
  taskController.updateInspFormDescription({"inspformnum": '1011'});
  expect(woPlanTaskDetailds.item.inspformname).toBe("Bridge Inspection Report");

  items.push(task);
  let createTaskResponse = {items};
  app.state.parentPage="wolist";
  let createWOStub = sinon.stub(woPlanTaskDetailds, 'save').resolves(createTaskResponse);
  await taskController.updateTask();
  expect(createWOStub.calledOnce).toBe(true);
  let page = {};
  page.value = "WOSummaryPage";
  taskController.gotoPage(page);

  /* let param = {};
  page.select = "Material";
  taskController.selectMaterialToolOption(param); */

  const classificationDialog = new Dialog({
		name: "openClassificationHierarchicalLookup",
	});
  app.registerDialog(classificationDialog);
	classificationDialog.closeDialog = jest.fn();

  let classificationHierarchicalLookupDS = await app.findDatasource('classificationHierarchicalLookupDS');
  await classificationHierarchicalLookupDS.load();

  let selectedClassification = [];
  const classification ={
    hierarchypath: "TUBING",
    classstructureid: "157942",
    description: "TUBING",
    href: "oslc/os/mxapiwodetail/_QkVERk9SRC83MzMx/CLASSSTRUCTURELIST/19-29",
    classificationid: "TUBING",
    childcount: 1
    }
  selectedClassification.push(classification);
  sinon.stub(classificationHierarchicalLookupDS, "getSelectedItems").returns(selectedClassification);

  expect(classificationHierarchicalLookupDS.state.hasData).toBe(true);
  await taskController.openClassificationHierarchicalLookup();
  taskController.chooseClassification({"datasource":classificationHierarchicalLookupDS});
  expect(woPlanTaskDetailds.item.classstructureid).toBe('157942');

  app.state.woresources = true;
  taskController.updateTask();
});

it('Open Create Task Page', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateTask',
    clearStack: true,
    datasources: {
      existingWODetail: {
        data: existingwodata
      },woPlanTaskDetailds: {
        data: wocreatetaskdata
      },woTaskResource: {
        data: existingWoTaskdata
      },selectedPredecessor: {
        data: selectedPredecessordata
      },cancelWpLaborDS: {
        data: cancelWpLaborDS
      }
    }
  });
  let app = await initializeApp();
  expect(app.currentPage.name).toBe('CreateTask');

  let existingWODetail = await app.findDatasource('existingWODetail');
  await existingWODetail.load();
  expect(existingWODetail.state.hasData).toBe(true);

  let woPlanTaskDetailds = await app.findDatasource('woPlanTaskDetailds');
  await woPlanTaskDetailds.load();
  expect(woPlanTaskDetailds.state.hasData).toBe(true);

  let woTaskResource = app.currentPage.datasources.woTaskResource;
  woTaskResource.searchQBE = function (){
    return true;
  }

  let selectedPredecessor = await app.findDatasource('selectedPredecessor');
  //await selectedPredecessor.load();
  selectedPredecessor.load = function (){
    return true;
  }

  app.setCurrentPage = function (){
    return true;
  }

  let taskController = app.currentPage.controllers[0];
  app.state.workorderid='1234';
  taskController.openCreateTaskPage({"item": {"workorderid": '1234'}});

  expect(app.state.workorderid).toBe('1234');
  expect(app.state.taskid).toBe('0');
  app.state.responsibility = {
        "owner": "ALLEN",
        "supervisor": "BARRY"
     }
  await taskController.openEditTaskPage(app.currentPage);
  expect(app.state.taskItems).not.toBeNull()

});

it('Open edit task Page with Predecessor', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateTask',
    clearStack: true,
    datasources: {
      woDetailResource: {
        data: workorderdetailitem
      },woPlanTaskDetailds: {
        data: wocreatetaskdata
      },woTaskResource: {
        data: existingWoTaskdata
      },woTaskRelation: {
        data: wotaskrelationdata
      },selectedPredecessor: {
        data: selectedPredecessordata
      },addcraftCrewtypeDSTable: {
        data: addcraftCrewtypeDSjson
      },addLaborCrewDSTable: {
        data: addLaborCrewDSjson
      },cancelWpLaborDS: {
        data: cancelWpLaborDS
      }
    }
  });
  let app = await initializeApp();
  expect(app.currentPage.name).toBe('CreateTask');

  let woPlanTaskDetailds = await app.findDatasource('woPlanTaskDetailds');
  woPlanTaskDetailds.searchQBE = function (){
    return "success";
  }

   let woTaskResource = app.currentPage.datasources.woTaskResource;
  await woTaskResource.load();

  let woTaskRelation = await app.findDatasource('woTaskRelation');
  woTaskRelation.searchQBE = function (){
    return [{
      "parent": "1539",
      "status_description": "Waiting on approval",
      "woclass_description": "Activity",
      "orgid": "EAGLENA",
      "wonum": "T2085",
      "reltype_description": "Finish to Start",
      "reltype_maxvalue": "FS",
      "status_maxvalue": "WAPPR",
      "_rowstamp": "3300011",
      "predrefwonum": "T2085",
      "workorderid": 135286,
      "woclass": "ACTIVITY",
      "woclass_maxvalue": "ACTIVITY",
      "siteid": "BEDFORD",
      "href": "oslc/os/mxwotaskrelation/_RUFHTEVOQS9UMjA4NS9CRURGT1JEL1QyMDg5",
      "reltype": "FS",
      "predwonum": "T2085",
      "predtaskid": 10,
      "status": "WAPPR",
      "_bulkid": "3300011"
  }];
  }

  let selectedPredecessor = await app.findDatasource('selectedPredecessor');
  await selectedPredecessor.load();  

  let taskController = app.currentPage.controllers[0];
  app.setCurrentPage = function (){
    return true;
  }
  app.currentPage.params.taskid ='10';
  app.currentPage.params.parent = '1530';
  app.state.responsibility = {
        "owner": "ALLEN",
        "supervisor": "BARRY"
     };
  woPlanTaskDetailds.item.owner = "SMITH";
  await taskController.openEditTaskPage(app.currentPage);
  expect(app.state.taskItems).not.toBeNull()
  woPlanTaskDetailds.state.canSave = false;
  taskController.cancelTask();
  taskController.reloadTaskResource();
});

it('Open edit task Page with Predecessor', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateTask',
    clearStack: true,
    datasources: {
      woTaskPredecessor: {
        data: woTaskPredecessordata
      },allwoPredecessor: {
        data: allwoPredecessordata
      },selectedPredecessor: {
        data: selectedPredecessordata
      }
    }
  });
  let app = await initializeApp();
  expect(app.currentPage.name).toBe('CreateTask');

  let woTaskPredecessor = await app.findDatasource('woTaskPredecessor');
  woTaskPredecessor.searchQBE = function (){
    return [{
      "parent": "1539",
      "status_description": "Waiting on approval",
      "woclass_description": "Activity",
      "orgid": "EAGLENA",
      "wonum": "T2085",
      "status_maxvalue": "WAPPR",
      "_rowstamp": "3286701",
      "workorderid": 135286,
      "woclass": "ACTIVITY",
      "woclass_maxvalue": "ACTIVITY",
      "istask": true,
      "siteid": "BEDFORD",
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC9UMjA4NQ--",
      "taskid": 10,
  }];
  }


  let allwoPredecessor = await app.findDatasource('allwoPredecessor');
  allwoPredecessor.searchQBE = function (){
    return [{
      "status_description": "Waiting on approval",
      "description": "Relocate Guard Rails Around Compressor",
      "woclass_description": "Work Order",
      "orgid": "EAGLENA",
      "wonum": "1000",
      "status_maxvalue": "WAPPR",
      "_rowstamp": "2361346",
      "workorderid": 37,
      "woclass": "WORKORDER",
      "woclass_maxvalue": "WORKORDER",
      "assetnum": "11300",
      "istask": false,
      "siteid": "BEDFORD",
      "location": "BR300",
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDAw",
      "status": "WAPPR"
  }];
  }

  let selectedPredecessor = await app.findDatasource('selectedPredecessor');
  await selectedPredecessor.load();  

  let taskController = app.currentPage.controllers[0];
  app.setCurrentPage = function (){
    return true;
  }
  app.client = {'userInfo':{'insertSite':'BEDFORD'}};
  await taskController.openPredecessorLookup({"item": {"parent": '7100',"workorderid": '1234'}});

  let selectedItem = {"wonum": "1000-1","_id":1,"_selected":true};
  taskController.addItemstoDS(selectedPredecessor, selectedItem);
  taskController.removeSeletedItem({"item": {"wonum": 'T123'}});

  let page = taskController.page;
  taskController.selectPredecessor({'select':'allWO'});
  expect(page.state.showPredecessorOption.select).toBe('allWO');

  taskController.uploadTaskAttachment();
  expect(app.state.taskAttachmentPresent).toBe(true);
});

it('Save Predecessor', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateTask',
    clearStack: true,
    datasources: {
      woTaskResource: {
        data: existingWoTaskdata
      },woPlanTaskDetailds: {
        data: createtask
      },woTaskRelation: {
        data: wotaskrelationdata
      },selectedPredecessor: {
        data: selectedPredecessordata
      },responsibilityTable: {
        data: responsibilityList
      }
    }
  });
  let app = await initializeApp();
  expect(app.currentPage.name).toBe('CreateTask');

  let woPlanTaskDetailds = await app.findDatasource('woPlanTaskDetailds');
  await woPlanTaskDetailds.load();
  expect(woPlanTaskDetailds.state.hasData).toBe(true);

  let woTaskResource = app.currentPage.datasources.woTaskResource;
  woTaskResource.load();

  let woTaskRelation = await app.findDatasource('woTaskRelation');
  woTaskRelation.searchQBE = function (){
    return [{
      "parent": "1539",
      "status_description": "Waiting on approval",
      "woclass_description": "Activity",
      "orgid": "EAGLENA",
      "wonum": "T2085",
      "status_maxvalue": "WAPPR",
      "_rowstamp": "3286701",
      "workorderid": 135286,
      "woclass": "ACTIVITY",
      "woclass_maxvalue": "ACTIVITY",
      "istask": true,
      "siteid": "BEDFORD",
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC9UMjA4NQ--",
      "taskid": 10,
  }];
  }


  let selectedPredecessor = await app.findDatasource('selectedPredecessor');
  selectedPredecessor.searchQBE = function (){
    return [{
      "status_description": "Waiting on approval",
      "description": "Relocate Guard Rails Around Compressor",
      "woclass_description": "Work Order",
      "orgid": "EAGLENA",
      "wonum": "1000",
      "status_maxvalue": "WAPPR",
      "_rowstamp": "2361346",
      "workorderid": 37,
      "woclass": "WORKORDER",
      "woclass_maxvalue": "WORKORDER",
      "assetnum": "11300",
      "istask": false,
      "siteid": "BEDFORD",
      "location": "BR300",
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDAw",
      "status": "WAPPR"
  }];
  }

  let taskController = app.currentPage.controllers[0];
  app.setCurrentPage = function (){
    return true;
  }
  let page = taskController.page;
  page.state.addPredecessor=true;
  taskController.updateTask();
  //taskController.savePredecessor({"item": {"wonum": 'T123'}});

});

it('Add Responsibility roles to task', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateTask',
    datasources: {
      woPlanTaskDetailds: {
        data: createtask
      },responsibilityTable: {
        data: responsibilityList
      },personDS: {
        data: person
      },workGroupLookup: {
        data: workGroup
      },crewworkGroupLookup: {
        data: crewworkGroup
      },personGroupDS: {
        data: personGroup
      }
    }
  });


  let app = await initializeApp();
  expect(app.currentPage.name).toBe('CreateTask');
  let taskController = app.currentPage.controllers[0];
  let page = taskController.page;
  let woPlanTaskDetailds = await app.findDatasource('woPlanTaskDetailds');
  await woPlanTaskDetailds.load();
  let responsibilityTable = await app.findDatasource('responsibilityTable');
  await responsibilityTable.load();
  let personGroupDS = await app.findDatasource('personGroupDS');
  await personGroupDS.load();
  let crewworkGroupLookup = await app.findDatasource('crewworkGroupLookup');
  await crewworkGroupLookup.load();
  let workGroupLookup = await app.findDatasource('workGroupLookup');
  await workGroupLookup.load();
  let personDS = await app.findDatasource('personDS');
  await personDS.load();


  taskController.onDatasourceSelectionChanged({"datasource": {"name": 'personGroupDS'},"selected":"true"});
  expect(app.state.lookupPrimaryButtonDisabled).toBe(false);

  taskController.onDatasourceSelectionChanged({"datasource": {"name": 'crewworkGroupLookup'},"selected":"true"});
  expect(app.state.lookupPrimaryButtonDisabled).toBe(false);

  taskController.onDatasourceSelectionChanged({"datasource": {"name": 'workGroupLookup'},"selected":"true"});
  expect(app.state.lookupPrimaryButtonDisabled).toBe(false);

  taskController.onDatasourceSelectionChanged({"datasource": {"name": 'personDS'},"selected":"true"});
  expect(app.state.lookupPrimaryButtonDisabled).toBe(false);

  page.state.selectedRole= 'owner';
  page.state.responsibilityRole ={};
  page.state.responsibilityRole.roleid ='supervisor';
  page.state.responsibilityRole.name = 'SMITH';
  taskController.addResponsiblityNameRole(page.state.responsibilityRole.name);   
  taskController.removeRole(page.state.responsibilityRole);  
});

it('Add Craft and Crew type to task', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateTask',
    datasources: {
      woPlanTaskDetailds: {
        data: createtask
      },addcraftCrewtypeDS: {
        data: addCraftCrewType
      },addLaborCrewDS: {
        data: addLaborCrew
      },craftLookup: {
        data: craftLookupds
      },crewTypeLookupDS: {
        data: crewTypeLookup
      },addcraftCrewtypeDSTable: {
        data: addcraftCrewtypeDSjson
      }
    }
  });


  let app = await initializeApp();
  expect(app.currentPage.name).toBe('CreateTask');
  let taskController = app.currentPage.controllers[0];
  let page = taskController.page;
  let addcraftCrewtypeDS = await app.findDatasource('addcraftCrewtypeDS');
  await addcraftCrewtypeDS.load();
  let craftLookup = await app.findDatasource('craftLookup');
  await craftLookup.load();
  let crewTypeLookupDS = await app.findDatasource('crewTypeLookupDS');
  await crewTypeLookupDS.load();
  let addcraftCrewtypeDSTable = await page.findDatasource('addcraftCrewtypeDSTable');
  await addcraftCrewtypeDSTable.load();

  let item ={};
    item.skilllevel = 'FIRST';
    item.contractnum = "1009";
    item.vendor = "Vendor";
  taskController.onDatasourceSelectionChanged({"datasource": {"name": 'craftLookup'},"selected":"true","item":item});
  expect(app.state.lookupPrimaryButtonDisabled).toBe(false);

  taskController.onDatasourceSelectionChanged({"datasource": {"name": 'crewTypeLookupDS'},"selected":"true"});
  expect(app.state.lookupPrimaryButtonDisabled).toBe(false);
  
  taskController.showDialog({ds: addcraftCrewtypeDS, dialog:'addCraftCrewTypeDialog'});
  if(addcraftCrewtypeDS._addNew){
    await expect(addcraftCrewtypeDS.item._addNew).toBe(true);
  }
  page.addCraftCrewType = addCraftCrewType;
  taskController.selectCraftCrewOption({'select':'Craft'});
  expect(page.state.showCraftCrewOption).toBe('Craft');
  taskController.addCraftCrewType();

  taskController.selectCraftCrewOption({'select':'CrewType'});
  expect(page.state.showCraftCrewOption).toBe('CrewType');
  taskController.addCraftCrewType();
  taskController.saveTableData(addcraftCrewtypeDS,addcraftCrewtypeDSTable.items);
  taskController.deleteRowSelected({ds: addcraftCrewtypeDS, item:item})
  
  //If user opens dialog and cancels dialog
  taskController.showDialog({ds: addcraftCrewtypeDS, dialog:'addCraftCrewTypeDialog'});

   addcraftCrewtypeDS.popNewItem = function() { 
    return addcraftCrewtypeDS;
  }
  taskController.cancelDialog('addcraftCrewtypeDS');
  await expect(addcraftCrewtypeDS.item._addNew).toBe(undefined);

}); 

it('Add Labor and Crew to task', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateTask',
    datasources: {
      woPlanTaskDetailds: {
        data: createtask
      },addLaborCrewDS: {
        data: addCraftCrewType
      },addAssignmentDS: {
        data: addLaborAssignment
      },laborLookup: {
        data: craftLookupds
      },crewLookup: {
        data: crewLookuplist
      },addLaborCrewDSTable: {
        data: addLaborCrewDSjson
      }
    }
  });


  let app = await initializeApp();
  expect(app.currentPage.name).toBe('CreateTask');
  let taskController = app.currentPage.controllers[0];
  let page = taskController.page;
 
  let addLaborCrewDS = await app.findDatasource('addLaborCrewDS');
  await addLaborCrewDS.load();

  let addAssignmentDS = await app.findDatasource('addAssignmentDS');
  await addAssignmentDS.load();

  let laborLookup = await app.findDatasource('laborLookup');
  await laborLookup.load();

  let crewLookup = await app.findDatasource('crewLookup');
  await crewLookup.load();

  let addLaborCrewDSTable = await app.findDatasource('addLaborCrewDSTable');
  await addLaborCrewDSTable.load();

  taskController.onDatasourceSelectionChanged({"datasource": {"name": 'laborLookup'},"selected":"true"});
  expect(app.state.lookupPrimaryButtonDisabled).toBe(false);
  
  taskController.onDatasourceSelectionChanged({"datasource": {"name": 'crewLookup'},"selected":"true","item":{"vendor":"vendor"} });
  expect(app.state.lookupPrimaryButtonDisabled).toBe(false);
  expect(page.datasources.addLaborCrewDS.item.vendor).toBe('vendor');
  
  taskController.showDialog({ds: addLaborCrewDS, dialog:'addLaborCrewDialog'});
  if(addLaborCrewDS._addNew){
    await expect(addLaborCrewDS.item._addNew).toBe(true);
  }
  page.addCraftCrewType = addCraftCrewType;
  taskController.selectLaborCrewOption({'select':'Labor'});
  expect(page.state.showLaborCrewOption).toBe('Labor');

  addAssignmentDS.searchQBE = function (){
    return [
      {
        "apptrequired": false,
        "wplaborid": "458",
        "status_description": "Assigned",
        "wplaboruid": 736,
        "craft": "CARP",
        "appointment": false,
        "assignmentid": 829,
        "orgid": "EAGLENA",
      }
      ]
  }
  taskController.addLaborCrewType();

  taskController.selectLaborCrewOption({'select':'Crew'});
  expect(page.state.showLaborCrewOption).toBe('Crew');
  let selectCrewWorkGroup ={
    "persongroup": "RW4H0R5H",
    "description": "Automation Crew Work Group",
    "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~CREWWORKGROUP/0-44",
    "_bulkid": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~CREWWORKGROUP/0-44",
    "_selected": true
  }
  taskController.updateCrewWorkGroupSelect(selectCrewWorkGroup);
  let selectCrew ={
      "description": "Automation Crew",
      "amcrewtype": "JTSHTBJK",
      "amcrew": "ARVDM3RS",
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~amcrew/0-3",
      "orgid": "EAGLENA",
      "_bulkid": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~amcrew/0-3",
      "_selected": true
  }
  taskController.updateCrewSelect(selectCrew);
  taskController.addLaborCrewType();

  let item = addLaborCrewDS.item;
  taskController.deleteRowSelected({ds: addLaborCrewDS, item:item})

  //If user opens dialog and cancels dialog
  taskController.showDialog({ds: addLaborCrewDS, dialog:'addLaborCrewDialog'});

   addLaborCrewDS.popNewItem = function() { 
    return addLaborCrewDS;
  }
  taskController.cancelDialog('addLaborCrewDS');
  await expect(addLaborCrewDS.item._addNew).toBe(undefined);

  taskController.saveTableData(addLaborCrewDS,addLaborCrewDSTable.items);
});

it('Add Predecessor', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateTask'
  });

  let app = await initializeApp();
  expect(app.currentPage.name).toBe('CreateTask');
  let taskController = app.currentPage.controllers[0];
  let page = taskController.page;
  taskController.addPredecessor();
  expect(page.state.addPredecessor).toBe(true);

});

it('Cancel Add Predecessor', async () => {
    let initializeApp = newTestStub({
    currentPage: 'CreateTask',
    clearStack: true,
    datasources: {
      woPlanTaskDetailds: {
        data: wocreatetaskdata
      },selectedPredecessor: {
        data: selectedPredecessordata
      }
    }
  });
  let app = await initializeApp();
  expect(app.currentPage.name).toBe('CreateTask');
  let taskController = app.currentPage.controllers[0];
  let woPlanTaskDetailds = await app.findDatasource('woPlanTaskDetailds');
  woPlanTaskDetailds.forceReload = function (){
    return true;
  }

  let selectedPredecessor = await app.findDatasource('selectedPredecessor');
  //await selectedPredecessor.load();
  selectedPredecessor.load = function (){
    return true;
  }
  app.state.taskItems = [{"status_description":"Waiting on approval","description":"Relocate Guard Rails Around Compressor","woclass_description":"Work Order","orgid":"EAGLENA","wonum":"1000","reltype_description":"Finish to Start","reltype_maxvalue":"FS","status_maxvalue":"WAPPR","_rowstamp":"1379591","predrefwonum":"1000","workorderid":37,"woclass":"WORKORDER","woclass_maxvalue":"WORKORDER","siteid":"BEDFORD","location":"BR300","href":"oslc/os/mxwotaskrelation/_RUFHTEVOQS8xMDAwL0JFREZPUkQvVDEwODM-","reltype":"FS","predwonum":"1000","status":"WAPPR","_bulkid":"1379591"}];
  taskController.cancelAddPredecessor();
});

it('Open Edit Resources Page', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateTask',
    clearStack: true,
    datasources: {
      woDetailResource: {
        data: workorderdetailitem
      },woPlanTaskDetailds: {
        data: wocreatetaskdata
      },woTaskResource: {
        data: existingWoTaskdata
      },cancelWpLaborDS: {
        data: cancelWpLaborDS
      },addcraftCrewtypeDS: {
        data: addCraftCrewType
      },addLaborCrewDS: {
        data: addLaborCrew
      },craftLookup: {
        data: craftLookupds
      },crewTypeLookupDS: {
        data: crewTypeLookup
      },addcraftCrewtypeDSTable: {
        data: addcraftCrewtypeDSjson
      }
    }
  });
  let app = await initializeApp();
  app.state.parentPage="WOSummaryPage";
  expect(app.currentPage.name).toBe('CreateTask');

  let woDetailResource = newWorkOrderDetailDatasource(workorderdetailitem, 'woDetailResource');
  app.registerDatasource(woDetailResource);
  await woDetailResource.load();

  let existingWODetail = await app.findDatasource('existingWODetail');
  await existingWODetail.load();
  expect(existingWODetail.state.hasData).toBe(true);

  let woPlanTaskDetailds = await app.findDatasource('woPlanTaskDetailds');
  await woPlanTaskDetailds.load();
  expect(woPlanTaskDetailds.state.hasData).toBe(true);

  let woTaskResource = app.currentPage.datasources.woTaskResource;
  woTaskResource.searchQBE = function (){
    let items = [];
    const workorder ={
      "_rowstamp": "4023193",
      "workorderid": 142,
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC83MTAw",
      "taskid": 100,
      "wonum": "7100",
      "_bulkid": "4023193"
    }
    items.push(workorder);
    return items;
  }


  let addcraftCrewtypeDS = await app.findDatasource('addcraftCrewtypeDS');
  await addcraftCrewtypeDS.load();

  addcraftCrewtypeDS.searchQBE = function (){
    return true;
  }

  addcraftCrewtypeDS.forceReload = function (){
    let items = [];
    return items;
  }

  app.setCurrentPage = function (){
    return true;
  }

  let taskController = app.currentPage.controllers[0];
  app.state.responsibility = {
        "owner": "ALLEN",
        "supervisor": "BARRY"
     }
  await taskController.openEditWoResources(app.currentPage);
  expect(app.state.taskItems).not.toBeNull()

});

export default TaskController;

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

import WorkOrderCreateController from './WorkOrderCreateController';
import {Dialog, Datasource, JSONDataAdapter } from '@maximo/maximo-js-api';

import parentwo from './test/parent-workorder-json-data.js';
import followupwo from './test/followup-workorder-json-data.js';
import worktype from './test/worktype-json-data.js'
import personList from  './test/person-json-data.js';
import failureclass from './test/failureclass-json-data';
import problemcode from './test/problemcode-json-data';
import createwo from './test/create-workorder-json-data.js';
import assetlookup from './test/asset-lookup-json-data.js';
import contractlookup from './test/contract-lookup-json-data.js';
import jobplanlookup from'./test/jobplan-lookup-json-data.js';
import locationlookup from './test/location-lookup-json-data.js';
import classificationListLookup from './test/classstructure-list-lookup-json-data';
import classificationHierarchyLookup from './test/classstructure-hierarchy-lookup-json-data.js';
import workorderdetailitem from './test/workorder-detail-json-data.js';
import relatedrecord from './test/relatedrecord-json-data.js';
import synonymdomainData from './test/createwo-synonym-json-data.js'
import sinon from 'sinon';
import inspectionFormRecLookup from './test/RECINSPFORMS.json';
import inspectionFormOtherLookup from './test/OTHERINSPFORMS.json';

import jobPlanASdsLookup from'./test/RECJOBPLAN.json';


import newTestStub from './test/AppTestStub';

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

function newRelatedRecordDatasource(data = relatedrecord, name = 'relatedRecord' ) {
  const da = new JSONDataAdapter({
    src: relatedrecord,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: 'relatedreckey',
    name: name
  });

  return ds;
}

it('Create WO', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateWorkOrder',
    datasources: {
      createWODS: {
        data: createwo
      },
      worktypeDS: {
        data: worktype
      },
      personDS: {
        data: personList
      },
      failureclassDS: {
        data: failureclass
      },
      failurelistDS: {
        data: problemcode
      },
      assetLookupDS: {
        data: assetlookup
      },	  
      locationLookupDS: {
        data: locationlookup
      },
      synonymdomainDataDS: {
        data: synonymdomainData
      }
    }
  });


  let app = await initializeApp();
  expect(app.currentPage.name).toBe('CreateWorkOrder');
  app.client = {
		userInfo: {
			personid: 'SAM',
			primaryphone: 'UPS'
		},
	};

  let createWODS = await app.findDatasource('createWODS');
  await createWODS.load();

  let failureclassDS = await app.findDatasource('failureclassDS');
  await failureclassDS.load();

    	
  let problemcodeDS = await app.findDatasource('failurelistDS');
  await problemcodeDS.load();
  problemcodeDS.searchQBE = function (){
    return "success";
  }

  let synonymdomainDataDS = await app.findDatasource('synonymdomainData');
  await synonymdomainDataDS.load();

  synonymdomainDataDS.searchQBE = function (){
    return [
      {
      "valueid": "WOSTATUS|WAPPR",
      "maxvalue": "WAPPR",
      "description": "Waiting on approval",
      "value": "WAPPR",
      "domainid": "WOSTATUS"
      }
      ]
  }
  
  let workOrderCreateController = app.currentPage.controllers[0];
  app.lastPage = { name: "wolist" };

  workOrderCreateController.onDatasourceSelectionChanged({"datasource": {"name": 'failurelistDS'},"selected":"true"});
  expect(app.state.pcLookupPrimaryButtonDisabled).toBe(false);
  
  workOrderCreateController.onDatasourceSelectionChanged({"datasource": {"name": 'contractLookupDs'},"selected":"true"});
  expect(app.state.contractLookupPrimaryButtonDisabled).toBe(false);

  workOrderCreateController.onDatasourceSelectionChanged({ "datasource": { "name": 'jobplanLookupds' }, "selected": "true" });
  expect(app.state.jobPlanLookupPrimaryButtonDisabled).toBe(false);

  workOrderCreateController.onDatasourceSelectionChanged({"datasource": {"name": 'assetLookupDS'},"selected":"true"});
  expect(app.state.assetLookupPrimaryButtonDisabled).toBe(false);

  workOrderCreateController.onDatasourceSelectionChanged({"datasource": {"name": 'locationLookupDS'},"selected":"true"});
  expect(app.state.locationLookupPrimaryButtonDisabled).toBe(false);

  workOrderCreateController.onDatasourceSelectionChanged({ "datasource": { "name": 'classificationListLookupDS' }, "selected": "true" });
  expect(app.state.classificationTLookupPrimaryButtonDisabled).toBe(false);

  workOrderCreateController.onDatasourceSelectionChanged({ "datasource": { "name": 'classificationHierarchicalLookupDS' }, "selected": "true" });
  expect(app.state.classificationHLookupPrimaryButtonDisabled).toBe(false);
 
  const newWo = {
    changeby: "WILSON",
    reportedby: "WILSON",
    changedate: "2022-10-11T07:48:00+05:30",
    reportdate: "2022-10-11T07:48:00+05:30",
    statusdate: "2022-10-11T07:48:00+05:30",
    chargestore:false,
    status: "Waiting on approval",
    status_description: "WAPPR",
    status_maxvalue: "WAPPR",
    siteid: "BEDFORD",
    targstartdate:"2022-10-11T07:48:00+05:30",
    targcompdate:"",
    estdur: "",
    worktype :"",
    wopriority :"",
    owner: "",
    failurecode: "",
    problemcode: "",
    assetnum: "",
    location : ""
  };

  workOrderCreateController.openNewWorkOrder();

  workOrderCreateController.onEditorChange({"target": {"content": "<p>Rich Text Content</p>"}})
  expect(createWODS.item.description_longdescription).not.toBeNull();
  expect(createWODS.item.description_longdescription).toBe('<p>Rich Text Content</p>');

  workOrderCreateController.updateParentCode({"failurecode": "CONVEYOR","failurecodeid": 135});
  expect(createWODS.item.problemcode).toBe('');

  workOrderCreateController.updateParentCode({"failurecode": "PKG","failurecodeid": 135,"failurelist": 1038});
  expect(createWODS.item.failurelist).toBe(1038);

  workOrderCreateController.updateProblemCode({"failurecode": {"failurecode":"KEYSSTIC"}});
  expect(createWODS.item.problemcode).toBe('KEYSSTIC');

  workOrderCreateController.updateAssetDescription({"description": "Chain Wash Assembly","location":{"location": "FIELDSTAFF","description": "Field User"},"failurecodes":{"failurecode": "BOILERS"}});
  expect(createWODS.item.assetdesc).toBe('Chain Wash Assembly');
  expect(createWODS.item.failurecode).toBe('BOILERS');

  let asset = {
    locfailurecode: "HARDWARE",
    failurecodes: {},
    assetnum: "11230",
    description: "Emergency Generator",
    siteid: "BEDFORD",
    location: {
        description: "Boiler Room Emergency Generator",
        location : "BR230"
    }
 }
 workOrderCreateController.updateAssetDescription(asset);
 expect(createWODS.item.failurecode).toBe('HARDWARE');

  let locationItem = {
    location : "EAST",
    description : "Eastern District",
    locfailurecode:"CLEAN",
    asset: [
      {
        "parent": "11400",
        "failurecodes": { },
        "_imagelibref": "oslc/images/66",
        "assetnum": "11430"
      }
    ]
  };
  let locationLookupDS = await app.findDatasource('locationLookupDS');
  await locationLookupDS.load({src: locationItem, noCache: true});

  workOrderCreateController.updateLocationDescription({value: "EAST"});
  expect(createWODS.item.locationdesc).toBe('Eastern District');

  let showDialog = jest.fn();
  app.showDialog = showDialog;
  const ProblemCodeLookup = new Dialog({
		name: "problemCodeLookup",
	});
	app.currentPage.registerDialog(ProblemCodeLookup);
	ProblemCodeLookup.closeDialog = jest.fn();
  workOrderCreateController.openProblemCodeLookup();

  let items = [];
  const workorder = {
      wonum: "2010"
  }
  items.push(workorder);
  let createWOResponse = {items};
  app.state.parentPage="wolist";
  let createWOStub = sinon.stub(createWODS, 'save').resolves(createWOResponse);
  await workOrderCreateController.createWorkOrder();
  expect(createWOStub.calledOnce).toBe(true);
  expect(app.currentPage.name).toBe('wolist');
  expect(app.state.woCreated).toBe(true);

  let wosummaryDS = newWorkOrderDetailDatasource(workorderdetailitem, 'woDetailResource');
  app.registerDatasource(wosummaryDS);
  await wosummaryDS.load();

  app.state.parentPage="WOSummaryPage";
  createWOStub.restore();
  createWOStub = sinon.stub(createWODS, 'save').resolves(createWOResponse);
  await workOrderCreateController.createWorkOrder();
  expect(createWOStub.calledOnce).toBe(true);
  expect(app.state.woCreated).toBe(true);

  app.state.parentPage="WOSummaryPage";
  createWOStub.restore();
  createWOStub = sinon.stub(createWODS, 'save').resolves(null);
  await workOrderCreateController.createWorkOrder();
  expect(createWOStub.calledOnce).toBe(true);
  expect(app.state.woCreated).toBe(false);

  app.state.parentPage="WOSummaryPage";
  app.currentPage.name = "CreateWorkOrder"
  createWOStub.restore();
  createWOStub = sinon.stub(createWODS, 'save').resolves(createWOResponse);
  await workOrderCreateController.onCustomSaveTransition();
  expect(createWOStub.calledOnce).toBe(true);
  expect(app.state.woCreated).toBe(true);

});


it('Cancel Create WO', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateWorkOrder',
    datasources: {
      createWODS: {
        data: createwo
      },
    }
  });

  let app = await initializeApp();
  expect(app.currentPage.name).toBe('CreateWorkOrder');
  
  let workOrderCreateController = app.currentPage.controllers[0];

  let createWODS = await app.findDatasource('createWODS');
  await createWODS.load();

  app.state.parentPage = "wolist";
  workOrderCreateController.cancelCreateWO();
  expect(app.currentPage.name).toBe('wolist');

  app.state.parentPage = "WOSummaryPage";
  workOrderCreateController.cancelCreateWO();
  expect(app.currentPage.name).toBe('WOSummaryPage');
});

it('Update Followup WO', async () => {
  let initializeApp = newTestStub({
    currentPage: 'FollowupWorkOrder',
    datasources: {
      parentWODS: {
        data: parentwo
      },
      followupWODS: {
        data: followupwo
      },
      worktypeDS: {
        data: worktype
      },
      personDS: {
        data: personList
      },
      failureclassDS: {
        data: failureclass
      },
      failurelistDS: {
        data: problemcode
      }
    }
  });

  let app = await initializeApp();
  expect(app.currentPage.name).toBe('FollowupWorkOrder');
  
  let parentWODS = await app.findDatasource('parentWODS');
  await parentWODS.load();
  parentWODS.invokeAction = function (){
    return {"wonum": "2007","siteid": "BEDFORD"};
  }

  let followupWODS = await app.findDatasource('followupWODS');
  let folowupWOItems = await followupWODS.load();
  followupWODS.get(0);

  sinon.stub(followupWODS, "get").returns(folowupWOItems);
  followupWODS.searchQBE = function (){
    return followupwo;
  }

  app.client = {
		userInfo: {
			personid: 'SAM',
			primaryphone: 'UPS'
		},
	};

  let failureclassDS = await app.findDatasource('failureclassDS');
  await failureclassDS.load();

 

  let problemcodeDS = await app.findDatasource('failurelistDS');
  await problemcodeDS.load();
  problemcodeDS.searchQBE = function (){
    return "success";
  }

  let workOrderCreateController = app.currentPage.controllers[0];
  app.lastPage = { name: "WOSummaryPage" };
  workOrderCreateController.onEditorChange({"target": {"content": "<p>Rich Text Content</p>"}})

  expect(parentWODS.item.description_longdescription).not.toBeNull();
  expect(parentWODS.item.description_longdescription).toBe('<p>Rich Text Content</p>');

  workOrderCreateController.updateParentCode({"failurecode": "CONVEYOR","failurecodeid": 135});
  expect(parentWODS.item.problemcode).toBe('');

  workOrderCreateController.updateParentCode({"failurecode": "PKG","failurecodeid": 135,"failurelist": 1038});
  expect(parentWODS.item.failurelist).toBe(1038);

  workOrderCreateController.updateProblemCode({"failurecode": {"failurecode":"KEYSSTIC"}});
  expect(parentWODS.item.problemcode).toBe('KEYSSTIC');

  workOrderCreateController.updateAssetDescription({"description": "Chain Wash Assembly","location":{"location": "FIELDSTAFF","description": "Field User"}});
  expect(parentWODS.item.assetdesc).toBe('Chain Wash Assembly');
  expect(parentWODS.item.failurecode).toBe('PKG');

 
  let showDialog = jest.fn();
  app.showDialog = showDialog;
  const ProblemCodeLookup = new Dialog({
		name: "problemCodeLookup",
	});
	app.currentPage.registerDialog(ProblemCodeLookup);
	ProblemCodeLookup.closeDialog = jest.fn();
  workOrderCreateController.openProblemCodeLookup();

  let wosummaryDS = newWorkOrderDetailDatasource(workorderdetailitem, 'woDetailResource');
  app.registerDatasource(wosummaryDS);
  await wosummaryDS.load();

  let relatedRecordDS = newRelatedRecordDatasource(relatedrecord, 'relatedRecord');
  app.registerDatasource(relatedRecordDS);
  await relatedRecordDS.load();

  app.state.followupWONum='2007';
  app.state.editWO=true;
  let updatestub = sinon.stub(followupWODS, 'update').resolves("success");
  await workOrderCreateController.updateFollowupWo();
  expect(updatestub.calledOnce).toBe(true);
  expect(app.state.followupWOUpdated).toBe(true);

  updatestub.restore();
  app.state.editWO=false;
  updatestub = sinon.stub(followupWODS, 'update').resolves("success");
  await workOrderCreateController.updateFollowupWo();
  expect(updatestub.calledOnce).toBe(true);
  expect(app.state.followupWOUpdated).toBe(true);

  updatestub.restore();
  app.state.editWO=false;
  updatestub = sinon.stub(followupWODS, 'update').resolves(null);
  await workOrderCreateController.updateFollowupWo();
  expect(updatestub.calledOnce).toBe(true);
  expect(app.state.followupWOUpdated).toBe(false);

  updatestub.restore();
  app.state.editWO=false;
  updatestub = sinon.stub(followupWODS, 'update').resolves("success");
  await workOrderCreateController.onCustomSaveTransition();
  expect(updatestub.calledOnce).toBe(true);
  expect(app.state.followupWOUpdated).toBe(true);
});

it('Test contract and edit', async () => {
    let initializeApp = newTestStub({
        currentPage: 'FollowupWorkOrder',
        datasources: { 
            parentWODS: {
                data: parentwo
            },
            contractLookupDs: {
                data: contractlookup
            },
            jobplanLookupds: {
                data: jobplanlookup
            }
        }
    });

    let app = await initializeApp();
    expect(app.currentPage.name).toBe('FollowupWorkOrder');
       
    let workOrderCreateController = app.currentPage.controllers[0];

    let parentWODS = app.findDatasource('parentWODS');
    await parentWODS.load();

    expect(parentWODS.state.hasData).toBe(true);

    let contractLookupDs = await app.findDatasource('contractLookupDs');
    await contractLookupDs.load();

    expect(contractLookupDs.state.hasData).toBe(true);    

    workOrderCreateController.updateContractDescription({ "contractnum": "1023" });
    expect(parentWODS.item.contractdesc).toBe('Landscaping Groundskeeping');

    let jobplanLookupds = await app.findDatasource('jobplanLookupds');
    await jobplanLookupds.load();

    workOrderCreateController.updateJobPlanDescription({ "jpnum": "JPCAL101" });
    expect(parentWODS.item.jobplandesc).toBe('JP Calibration 1101');
});



it('Cancel Followup WO', async () => {
  let initializeApp = newTestStub({
    currentPage: 'FollowupWorkOrder',
    datasources: {
      parentWODS: {
        data: parentwo
      }
    }
  });

  let app = await initializeApp();
  expect(app.currentPage.name).toBe('FollowupWorkOrder');
  
  let workOrderCreateController = app.currentPage.controllers[0];

  workOrderCreateController.cancelFollowupwo();
  expect(app.currentPage.name).toBe('WOSummaryPage');

  //cover the pagestack (bread crumb)
  let stack = [2];
  stack.push('wolist');
  stack.push('WOSummaryPage');
  workOrderCreateController.getPageStack(stack,app.currentPage);

});

it('Test WO Edit >> Select Classification from List', async () => {
  let initializeApp = newTestStub({
      currentPage: 'FollowupWorkOrder',
      datasources: {
          parentWODS: {
              data: parentwo
          },
          classificationListLookupDS: {
              data: classificationListLookup
          }
      }
  });

  let app = await initializeApp();
  expect(app.currentPage.name).toBe('FollowupWorkOrder');

  let workOrderCreateController = app.currentPage.controllers[0];

  let parentWODS = await app.findDatasource('parentWODS');
  await parentWODS.load();

  let classificationListLookupDS = await app.findDatasource('classificationListLookupDS');
  await classificationListLookupDS.load();

  expect(parentWODS.state.hasData).toBe(true);

  let selectedClassification = [];
  const classification =    {
    hierarchypath: "BEARING",
    classstructureid: "157934",
    description: "BEARING",
    href: "oslc/os/mxapiwodetail/_QkVERk9SRC83MjEx/CLASSSTRUCTURELIST/0-21",
    classificationid: "BEARING"
    }
  selectedClassification.push(classification);
  sinon.stub(classificationListLookupDS, "getSelectedItems").returns(selectedClassification);

  expect(classificationListLookupDS.state.hasData).toBe(true); 

  workOrderCreateController.chooseClassification({"datasource":classificationListLookupDS});
  expect(parentWODS.item.classstructureid).toBe('157934');

});

it('Test WO Edit >> Select Classification from Hierarchy', async () => {
  let initializeApp = newTestStub({
      currentPage: 'FollowupWorkOrder',
      datasources: {
          parentWODS: {
              data: parentwo
          },
          classificationHierarchicalLookupDS: {
              data: classificationHierarchyLookup
          }
      }
  });

  let app = await initializeApp();
  expect(app.currentPage.name).toBe('FollowupWorkOrder');

  let workOrderCreateController = app.currentPage.controllers[0];

  let showDialog = jest.fn();
  app.showDialog = showDialog;

  const classificationDialog = new Dialog({
		name: "openClassificationHierarchicalLookup",
	});
	app.registerDialog(classificationDialog);
	classificationDialog.closeDialog = jest.fn();

  let parentWODS = await app.findDatasource('parentWODS');
  await parentWODS.load();

  let classificationHierarchicalLookupDS = await app.findDatasource('classificationHierarchicalLookupDS');
  await classificationHierarchicalLookupDS.load();

  expect(parentWODS.state.hasData).toBe(true);

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
  await workOrderCreateController.openClassificationHierarchicalLookup();
  workOrderCreateController.chooseClassification({"datasource":classificationHierarchicalLookupDS});
  expect(parentWODS.item.classstructureid).toBe('157942');

});


it('Test WO Edit >> Select inspection form', async () => {
  let initializeApp = newTestStub({
      currentPage: 'FollowupWorkOrder',
      datasources: {
          parentWODS: {
              data: parentwo
          },
          inspFormALds: {
              data: inspectionFormRecLookup
          },
		  inspFormLookupds1: {
              data: inspectionFormOtherLookup
          }
      }
  });


  let app = await initializeApp();
  expect(app.currentPage.name).toBe('FollowupWorkOrder');

  let workOrderCreateController = app.currentPage.controllers[0];

  let showDialog = jest.fn();
  app.showDialog = showDialog;

  const inspectionFormDlg = new Dialog({
		name: "inspectionFormDlg",
	});
	app.registerDialog(inspectionFormDlg);
	inspectionFormDlg.closeDialog = jest.fn();

  let parentWODS = await app.findDatasource('parentWODS');
  await parentWODS.load();

  let inspFormALds = await app.findDatasource('inspFormALds');
  await inspFormALds.load();
  
  let inspFormLookupds1 = await app.findDatasource('inspFormLookupds1');

  await inspFormLookupds1.load();

  expect(parentWODS.state.hasData).toBe(true);

  let selectedInspectionform= [];
  const inspectionform ={
      "name": "Monthly Fire System Inspection 2",
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC83MjEw/RECINSPFORMS/0-21",
      "inspformnum": "1005"
    }
  selectedInspectionform.push(inspectionform);
  sinon.stub(inspFormALds, "getSelectedItems").returns(selectedInspectionform);

  expect(inspFormALds.state.hasData).toBe(true);
  await workOrderCreateController.openInspectionFormDlg();
  workOrderCreateController.openInspectionFormDlg({"datasource":inspFormALds});

  expect(inspFormALds.item.inspformnum).toBe('1005');  
  workOrderCreateController.chooseInspForm(inspFormALds);
  workOrderCreateController.updateInspFormDescription("1005");
  app.state.selectedTabIndex=0;
  workOrderCreateController.clearSelected();
  app.state.selectedTabIndex=1;
  workOrderCreateController.clearSelected();
});



//Test Job plan
it('Test WO Edit >> Select job plan', async () => {
  let initializeApp = newTestStub({
      currentPage: 'FollowupWorkOrder',
      datasources: {
          parentWODS: {
              data: parentwo
          },
          jobPlanASds: {
              data: jobPlanASdsLookup
          },
		  jobplanLookupds: {
              data: jobplanlookup
          }
      }
  });


  let app = await initializeApp();
  expect(app.currentPage.name).toBe('FollowupWorkOrder');

  let workOrderCreateController = app.currentPage.controllers[0];

  let showDialog = jest.fn();
  app.showDialog = showDialog;

  const jobPlanDlg = new Dialog({
		name: "jobPlanDlg",
	});
	app.registerDialog(jobPlanDlg);
	jobPlanDlg.closeDialog = jest.fn();

  let parentWODS = await app.findDatasource('parentWODS');
  await parentWODS.load();

  let jobPlanASds = await app.findDatasource('jobPlanASds');
  await jobPlanASds.load();
  
  let jobplanLookupds = await app.findDatasource('jobplanLookupds');
  await jobplanLookupds.load();

  expect(parentWODS.state.hasData).toBe(true);

  let selectedjobPlan= [];
  const jobPlan ={
      "jpnum": "JPCAL101",
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC83MTc5/RECJOBPLAN/0-20015",
      "description": "JP Calibration 1101"
    }
  selectedjobPlan.push(jobPlan);
  sinon.stub(jobPlanASds, "getSelectedItems").returns(selectedjobPlan);

  expect(jobPlanASds.state.hasData).toBe(true);
  await workOrderCreateController.openJPdlg();
  workOrderCreateController.openJPdlg({"datasource":jobPlanASds});
  expect(jobPlanASds.item.jpnum).toBe('JPCAL101'); 
   app.state.selectedTabIndex=0;
  workOrderCreateController.chooseJobPlan(jobPlanASds);  
  app.state.selectedTabIndex=0;
  workOrderCreateController.clearSelectedJP();
  app.state.selectedTabIndex=1;
  workOrderCreateController.clearSelectedJP();

});


export default WorkOrderCreateController;

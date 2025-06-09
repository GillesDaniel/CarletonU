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

import CreateWorkQueueController from './CreateWorkQueueController';
import sinon from 'sinon';
import newTestStub from './test/AppTestStub';
import workqueueList from './test/workQueueList-json-data.js';
import createWorkQueue from './test/createWorkQueue-json-data.js';
import fieldsAvailable from './test/fieldsAvailable-json-data.js'
import fieldsSelected from './test/fieldsSelected-json-data.js';
import actionsAvailable from './test/actionsAvailable-json-data.js';
import actionsSelected from './test/actionsSelected-json-data.js';
import maximoSchema from './test/maximoSchema-json-data.js';
import allQueries from './test/allQueries-json-data.js';

import editWorkQueue from './test/editWorkQueue-json-data.js';
import editWorkQueueActions from './test/editWorkQueueActions-json-data.js';
import editWorkQueueCols from './test/editWorkQueueCols-json-data.js';
import editSelectedWorkQueueCols from './test/editSelectedWorkQueueCols-json-data.js';
import editSelectedWorkQueueActions from './test/editSelectedWorkQueueActions-json-data.js';
import maximoAllqueries from './test/maximoAllqueries-json-data.js';
import persongroups from './test/pesongroup-json-data.js';
import assignedpersongroups from './test/assignedpesongroup-json-data.js';

it('List of work queue', async () => {
  let initializeApp = newTestStub({
    currentPage: 'wqListPage',
    datasources: {
      workqueueListDS: {
        data: workqueueList
      }
    }
  });
  let app = await initializeApp();
  expect(app.currentPage.name).toBe('wqListPage');
  let createWorkQueueController = app.currentPage.controllers[0];
  let workqueueListDS = await app.findDatasource('workqueueListDS');
  createWorkQueueController.page.state.workflowDS = await workqueueListDS.load();
  expect(workqueueListDS.items).not.toBeNull();

  let stack = [1];
  stack.push('wqListPage');
  createWorkQueueController.getPageStack(stack,app.currentPage);  
});

it('Wizard Step 1 Create Work queue', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateWorkQueue',
    datasources: {
      createWorkQueueDS: {
        data: createWorkQueue
      },
      allqueriesDS: {
        data: allQueries
      }, workqueueListDS: {
        data: workqueueList
      }
    }
  });

  let app = await initializeApp();
  expect(app.currentPage.name).toBe('CreateWorkQueue');

  let createWorkQueueController = app.currentPage.controllers[0];
  let page = createWorkQueueController.page;
  let createWorkQueueDS = await app.findDatasource('createWorkQueueDS');
  await createWorkQueueDS.load();
  let allqueriesDS = await app.findDatasource('allqueriesDS');
  await allqueriesDS.load();
  let wqlistds = app.findDatasource('workqueueListDS');
  await wqlistds.load();

  expect(createWorkQueueController.page.state.workqueueDS).not.toBeNull();
  expect(createWorkQueueDS.item.intobjectname).toBe('MXAPIWODETAIL');  
  createWorkQueueController.pageInitialized(app, page);
  createWorkQueueDS.item.app = 'MXAPIWODETAIL';
  createWorkQueueDS.item.intobjectname = 'WOTRACK';
  createWorkQueueController.page.state.workqueueDS = createWorkQueueDS;

  //progress wizard Step 1
  createWorkQueueController.updateWizard(0)// to load the step 1 page of the wizard
  createWorkQueueController.onSetStep(0);
  createWorkQueueController.getNextStep();
  //progress validation message step 1
  createWorkQueueController.page.state.progressWizardcurrentStepIndex = 0;
  createWorkQueueController.page.state.workqueueDS.item.queuename = '';
  createWorkQueueController.app = app;
  createWorkQueueController.page.state.stepErrorWithCustomBtn = createWorkQueueController.page.getLocalizedMessage(
    'WOQUEUE',
    'create_wq_name_reqd',
    'Work queue name is required.'
  );
  createWorkQueueController.getNextStep();
  expect(createWorkQueueController.page.state.stepErrorWithCustomBtn).toEqual('Work queue name is required.');

  createWorkQueueController.page.state.stepErrorWithCustomBtn = createWorkQueueController.page.getLocalizedMessage(
    'WOQUEUE',
    'create_wq_name_exist',
    'Work queue with same name already exist.'
  );
  createWorkQueueController.page.state.workqueueDS.item.queuename = '1';
  createWorkQueueController.getNextStep();
  expect(createWorkQueueController.page.state.stepErrorWithCustomBtn).toEqual('Work queue with same name already exist.');

  createWorkQueueController.page.state.stepErrorWithCustomBtn = createWorkQueueController.page.getLocalizedMessage(
    'WOQUEUE',
    'create_wq_query_priority_reqd',
    'Select a valid priority of 1 and above.'
  );
  createWorkQueueController.page.state.workqueueDS.item.queuename = 'WQ';
  createWorkQueueController.page.state.workqueueDS.item.priority = 0;
  createWorkQueueController.getNextStep();
  expect(createWorkQueueController.page.state.stepErrorWithCustomBtn).toEqual('Select a valid priority of 1 and above.');
});

it('Wizard Step 2 Create Work queue with clauseName validation', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateWorkQueue',
    datasources: {
      createWorkQueueDS: {
        data: createWorkQueue
      },
      fieldsAvailableDS: {
        data: fieldsAvailable
      },
      fieldsSelectedDS: {
        data: fieldsSelected
      },
      maximoSchemaDS: {
        data: maximoSchema
      },
      maximoAllqueriesDS: {
        data: maximoAllqueries
      },
      allqueriesDS: {
        data: allQueries
      }
    }
  });

  let app = await initializeApp();
  expect(app.currentPage.name).toBe('CreateWorkQueue');

  let createWorkQueueController = app.currentPage.controllers[0];
  let page = createWorkQueueController.page;
  
  let createWorkQueueDS = await app.findDatasource('createWorkQueueDS');
  await createWorkQueueDS.load();

  let fieldsAvailableDS = await app.findDatasource('fieldsAvailableDS');
  await fieldsAvailableDS.load();
  let fieldsSelectedDS = await app.findDatasource('fieldsSelectedDS');
  await fieldsSelectedDS.load();
  let maximoSchemaDS = await app.findDatasource('maximoSchemaDS');
  await maximoSchemaDS.load();
  let maximoAllqueriesDS = await app.findDatasource('maximoAllqueriesDS');
  await maximoAllqueriesDS.load();
  let allqueriesDS = await app.findDatasource('allqueriesDS');
  await allqueriesDS.load();

  createWorkQueueController.pageInitialized(app, page);
  app.state.fieldsAvailableDS = fieldsAvailableDS;
  createWorkQueueController.page.state.workqueueDS = createWorkQueueDS;
  createWorkQueueController.app = app;
  //progress wizard
  createWorkQueueController.updateWizard(1)// to load the step 2 page of the wizard
  createWorkQueueController.onSetStep(1);
  createWorkQueueController.getNextStep();
  createWorkQueueController.getPreviousStep();
  //progress wizard   
  createWorkQueueController.getNextStep();
  //progress validation message step 2
  createWorkQueueController.page.state.progressWizardcurrentStepIndex = 1;
  page.state.progressWizardcurrentStepIndex = 0;
  createWorkQueueController.app = app;
  createWorkQueueController.isQueryClauseValid('APPROVEWORK');
  createWorkQueueController.page.state.stepErrorWithCustomBtn = createWorkQueueController.app.getLocalizedMessage(
    'WOQUEUE',
    'create_wq_query_name_reqd',
    'A vaild query string is required.'
  );

  expect(createWorkQueueController.page.state.stepErrorWithCustomBtn).toEqual('A vaild query string is required.');

  createWorkQueueController.getNextStep();

  //progress no errors on wizard
  createWorkQueueController.page.state.progressWizardcurrentStepIndex = 0;
  createWorkQueueController.page.state.workqueueDS.item.queuename = 'WORK';
  page.state.progressWizardcurrentStepIndex = 0;
  createWorkQueueController.page.state.workqueueDS.item.queuename = 'CLAUSE';
  createWorkQueueController.getNextStep();
  createWorkQueueController.getPreviousStep();
  createWorkQueueController.onStepReset();

  createWorkQueueController.onDatasourceInitialized(fieldsAvailableDS, app);
  let properties = { "aos": { "default": false, "searchType": "EXACT", "subType": "YORN", "title": "Requires Asset Downtime", "persistent": true, "type": "boolean" }, "estservcost": { "searchType": "EXACT", "scale": 2, "subType": "AMOUNT", "title": "Estimated Service Cost", "persistent": true, "type": "number", "remarks": "Total estimated service cost against this work order.", "maxLength": 11 }, "pluscismobile": { "default": false, "searchType": "EXACT", "subType": "YORN", "title": "Is Mobile", "persistent": true, "type": "boolean", "remarks": "Workorder was added by mobile" } };
  app.datasources.maximoSchemaDS.schema.properties = properties;
  createWorkQueueController.returnUpdatedDS(fieldsAvailableDS);
  createWorkQueueController.getNestedObjectKeys(properties);

  let selectedItem = {"title":"aos","_id":1,"_selected":true};
  createWorkQueueController.addItemstoDS(fieldsSelectedDS, selectedItem);
  createWorkQueueController.app.state.availableCurrentDS = fieldsAvailableDS;
  createWorkQueueController.removeSeletedItem(selectedItem,fieldsSelectedDS);
  //Ds to be reset 
  createWorkQueueController.resetDataListSelection();
  createWorkQueueController.onAfterLoadData(maximoAllqueriesDS,maximoAllqueriesDS.items);
  //createWorkQueueController.getPreviousStep();

});

it('Wizard Step 3 Create Work queue with action', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateWorkQueue',
    datasources: {
      actionsAvailableDS: {
        data: actionsAvailable
      },
      actionsSelectedDS: {
        data: actionsSelected
      }
    }
  });

  let app = await initializeApp();
  expect(app.currentPage.name).toBe('CreateWorkQueue');

  let createWorkQueueController = app.currentPage.controllers[0];

  let actionsAvailableDS = await app.findDatasource('actionsAvailableDS');
  await actionsAvailableDS.load();
  let actionsSelectedDS = await app.findDatasource('actionsSelectedDS');
  await actionsSelectedDS.load();

  //delete or removed the selected items  

  let selectedActionItem = { "_id": 0, "_bulkid": "0", "action": "1025", "_selected": true };
  createWorkQueueController.app.state.availableCurrentDS = actionsAvailableDS;
  createWorkQueueController.removeSeletedItem(selectedActionItem,actionsAvailableDS);

  //Ds to be reset 
  createWorkQueueController.page.state.isCancel = true;
  createWorkQueueController.resetDataListSelection();

});

it('Create Work Queue with WorkQueueCols and WorkQueueActions', async () => {
  let initializeApp = newTestStub({
    currentPage: 'CreateWorkQueue',
    datasources: {
      createWorkQueueDS: {
        data: createWorkQueue
      }, fieldsSelectedDS: {
        data: fieldsSelected
      }, actionsSelectedDS: {
        data: actionsSelected
      }, workqueueListDS: {
        data: workqueueList
      }
    }
  });
  let app = await initializeApp();
  app.client = {
    userInfo: {
      personid: 'MAXADMIN',
      langcode: 'EN'
    },
  };

  let wqds = app.findDatasource('createWorkQueueDS');
  await wqds.load();

  let wqlistds = app.findDatasource('workqueueListDS');
  await wqlistds.load();

  let actionsSelectedDS = app.findDatasource('actionsSelectedDS');
  await actionsSelectedDS.load();

  let fieldsSelectedDS = app.findDatasource('fieldsSelectedDS');
  await fieldsSelectedDS.load();

  let controller = app.currentPage.controllers[0];

  sinon.stub(wqds, 'addNew').returns({ workqueueid: '5', app: 'WOTRACK', owner: 'MAXADMIN' });;
  await controller.showCreateWorkQueuePage();

  let items = [];
  const wq = {
    workqueueid: "2010"
  }
  items.push(wq);
  let createWQResponse = { items };

  sinon.stub(wqds, 'save').resolves(createWQResponse);
  await controller.saveWorkQueue();
  expect(app.currentPage.name).toBe('wqListPage');
});

it('Update status flag', async () => {
  let initializeApp = newTestStub({
    currentPage: 'wqListPage',
    datasources: {
      createWorkQueueDS: {
        data: createWorkQueue
      }
    }
  });
  let app = await initializeApp();
  let wqds = app.findDatasource('createWorkQueueDS');
  let item = await wqds.load();
  let controller = app.currentPage.controllers[0];
  controller.page.state.stateReadonly = false;

  let createWQStub = sinon.stub(wqds, 'update').returns({ workqueueid: '5', isactive: '1' });;

  await controller.updateIsActiveFlag(item);


  let wqitem = wqds.item;
  expect(createWQStub.called).toBe(true);
  expect(wqitem.isactive).toBe('1');
  expect(app.currentPage.name).toBe('wqListPage');
});

it('Update WorkQueu', async () => {
  let initializeApp = newTestStub({
    currentPage: 'EditWorkQueue',
    datasources: {
      editWorkQueueDS: {
        data: editWorkQueue
      }, editedworkqueuecols: {
        data: editWorkQueueCols
      }, editFieldsSelectedDS: {
        data: editSelectedWorkQueueCols
      }, editworkqueueactions: {
        data: editWorkQueueActions
      }, editActionsSelectedDS: {
        data: editSelectedWorkQueueActions
      }
    }
  });
  let app = await initializeApp();
  let controller = app.currentPage.controllers[0];
  controller.page.state.progressWizardcurrentStepId = "stepitem6";

  let wqds = await app.findDatasource('editWorkQueueDS');
  await wqds.load();

  let editedworkqueuecols = await app.findDatasource('editedworkqueuecols');
  await editedworkqueuecols.load();

  let editFieldsSelectedDS = await app.findDatasource('editFieldsSelectedDS');
  await editFieldsSelectedDS.load();

  let editworkqueueactions = await app.findDatasource('editworkqueueactions');
  await editworkqueueactions.load();

  let editActionsSelectedDS = await app.findDatasource('editActionsSelectedDS');
  await editActionsSelectedDS.load();



  let updateWQStub = sinon.stub(wqds, 'save').returns({ workqueueid: '5', isactive: '1' });;

  await controller.updateWorkQueue();


  //let wqitem = wqds.item;
  expect(updateWQStub.called).toBe(true);
  //expect(wqitem.isactive).toBe('1');
  expect(app.currentPage.name).toBe('wqListPage');
});

it('Update WorkQueue step 1', async () => {
  let initializeApp = newTestStub({
    currentPage: 'EditWorkQueue',
    datasources: {
      editWorkQueueDS: {
        data: editWorkQueue
      }, editedworkqueuecols: {
        data: editWorkQueueCols
      }, editFieldsSelectedDS: {
        data: editSelectedWorkQueueCols
      }, editworkqueueactions: {
        data: editWorkQueueActions
      }, editActionsSelectedDS: {
        data: editSelectedWorkQueueActions
      }
    }
  });
  let app = await initializeApp();
  let controller = app.currentPage.controllers[0];
  controller.app = app;
  controller.page.state.progressWizardStepIds = ['stepitem1',
    'stepitem2',
    'stepitem3',
    'stepitem4',
    'stepitem5',
    'stepitem6']
  controller.page.state.progressWizardcurrentStepId = "stepitem4";
  controller.page.state.progressWizardcurrentStepIndex = 3;

  let wqds = await app.findDatasource('editWorkQueueDS');
  await wqds.load();
  let editedworkqueuecols = await app.findDatasource('editedworkqueuecols');
  await editedworkqueuecols.load();
  let fieldsAvailableDS = await app.findDatasource('fieldsAvailableDS');
  await fieldsAvailableDS.load();
  fieldsAvailableDS.currentItem = {};
  fieldsAvailableDS.currentItem._selected = undefined;
  expect(wqds.currentItem.description).toBe('1');
  expect(wqds.currentItem.priority).toBe(3);
  app.state.editSelectedItems = editedworkqueuecols;
  app.state.editSelectedItems.currentItem = {};
  app.state.editSelectedItems.currentItem._selected = null;
  expect(app.state.editSelectedItems.currentItem._selected).toBe(null);
  controller.getNextStep();
  app.state.editSelectedItems.currentItem = {};
  app.state.editSelectedItems.currentItem._selected = undefined;
  expect(app.state.editSelectedItems.currentItem._selected).toBe(undefined);
  controller.getNextStep();
});

it('Display Work Queue Edit Page', async () => {
  let initializeApp = newTestStub({
    currentPage: 'wqListPage',
  });

  let app = await initializeApp();
  let controller = app.currentPage.controllers[0];

  await controller.displayEditWorkQueuePage({"item": {"href": 'oslc/os/mxapiworkqueue/_VEVTVDEyMzEyMw--',"queuename": 'WQ1'}});
  expect(app.currentPage.name).toBe('EditWorkQueue');
});

it('Update WorkQueue wizard steps', async () => {
  let initializeApp = newTestStub({
    currentPage: 'EditWorkQueue',
    datasources: {
      editWorkQueueDS: {
        data: editWorkQueue
      }, editedworkqueuecols: {
        data: editWorkQueueCols
      }, editFieldsSelectedDS: {
        data: editSelectedWorkQueueCols
      }, editworkqueueactions: {
        data: editWorkQueueActions
      }, editActionsSelectedDS: {
        data: editSelectedWorkQueueActions
      },actionsAvailableDS: {
        data: actionsAvailable
      }
    }
  });
  let app = await initializeApp();
  let controller = app.currentPage.controllers[0];
  controller.app = app;
  controller.page.state.progressWizardStepIds = ['stepitem1',
    'stepitem2',
    'stepitem3',
    'stepitem4',
    'stepitem5',
    'stepitem6']
  controller.page.state.progressWizardcurrentStepId = "stepitem4";
  controller.page.state.progressWizardcurrentStepIndex = 3;

  let wqds = await app.findDatasource('editWorkQueueDS');
  await wqds.load();

  let editedworkqueuecols = await app.findDatasource('editedworkqueuecols');
  await editedworkqueuecols.load();

  let editFieldsSelectedDS = await app.findDatasource('editFieldsSelectedDS');
  await editFieldsSelectedDS.load();

  let editworkqueueactions = await app.findDatasource('editworkqueueactions');
  await editworkqueueactions.load();

  let editActionsSelectedDS = await app.findDatasource('editActionsSelectedDS');
  await editActionsSelectedDS.load();
  let fieldsAvailableDS = await app.findDatasource('fieldsAvailableDS');
  await fieldsAvailableDS.load();
  let actionsAvailableDS = await app.findDatasource('actionsAvailableDS');
  await actionsAvailableDS.load();

  expect(wqds.currentItem.clausename).not.toBe('');
  expect(wqds.currentItem.clausename).toBe('uxtechnicianstatusfilteredwolist');
  controller.app.state.availableCurrentDS = fieldsAvailableDS;
  controller.app.state.availableCurrentDS.currentItem = {};
  controller.app.state.availableCurrentDS.currentItem._selected = undefined;
  expect(controller.app.state.availableCurrentDS.currentItem._selected).toBe(undefined);
  controller.getNextStep();
  expect(controller.app.state.availableCurrentDS.currentItem._selected).toBe(undefined);
  controller.getNextStep();
  
  // error validation clauseName field
  wqds.currentItem.clausename = '';
  expect(wqds.currentItem.clausename).toBe('');
  let data = {
    "_id": 0,
    "_bulkid": "0",
    "title": "parent",
    "_selected": true
  };
  controller.app.state.availableCurrentDS.load({ src: data, noCache: true })
  controller.page.state.wqds = wqds;
  await editFieldsSelectedDS.load({ src: data, noCache: true });

  controller.page.state.editFieldsSelectedDS = editFieldsSelectedDS;
  controller.validateStep(4);
  let event = {"datasource":{"name":"actionsAvailableDS","objectType":"Datasource"},"selectionCount":5,"item":{"usewith":"ESCALATION","_rowstamp":"115","type_maxvalue":"GROUP","usewith_maxvalue":"ESCALATION","objectname":"WORKORDER","action":"1025","actionid":129,"href":"oslc/os/mxapiaction/_MTAyNQ--","type":"GROUP","type_description":"Action Group","usewith_description":"Escalation","_bulkid":"115","_selected":false},"selected":true};
  controller.onDatasourceInitialized(fieldsAvailableDS, controller.app)
  controller.selectedDSMethod(event);
  let editEvent = {"datasource":{"name":"actionsAvailableDS","objectType":"Datasource"},"selectionCount":5,"item":{"usewith":"ESCALATION","_rowstamp":"115","type_maxvalue":"GROUP","usewith_maxvalue":"ESCALATION","objectname":"WORKORDER","action":"1025","actionid":129,"href":"oslc/os/mxapiaction/_MTAyNQ--","type":"GROUP","type_description":"Action Group","usewith_description":"Escalation","_bulkid":"115","_selected":false},"selected":true};
  controller.onDatasourceInitialized(actionsAvailableDS, controller.app)
  controller.selectedDSMethod(editEvent);
  controller.page.state.progressWizardcurrentStepIndex = 3;
  controller.page.state.stepErrorWithCustomBtn = controller.app.getLocalizedMessage(
    'WOQUEUE',
    'create_wq_query_priority_reqd',
    'Select a valid priority of 1 and above.'
  );
  controller.page.state.wqds.currentItem.clausename = 'WQ';
  controller.page.state.wqds.currentItem.priority = 0;
  controller.getNextStep();
  expect(controller.page.state.stepErrorWithCustomBtn).toEqual('Select a valid priority of 1 and above.');
});

it('Workqueue Persongroups', async () => {
  let initializeApp = newTestStub({
    currentPage: 'EditWorkQueue',
    datasources: {
      selectedPersonGroupDS: {
        data: persongroups
      },
      assignedPersonGroupDSNew: {
        data: assignedpersongroups
      },
      availablePersonGroupDS: {
        data: persongroups
      },
      assignedPersonGroupDS: {
        data: assignedpersongroups
      }
    }
  });
  let app = await initializeApp();
  app.setCurrentPage('EditWorkQueue');
  app.client = {userInfo:{personId:'WILSON'}};
  let controller = app.currentPage.controllers[0];
  controller.app = app;
  let assignedPersonGroupDS = app.findDatasource('assignedPersonGroupDS');
  await assignedPersonGroupDS.load();
  let availablePersonGroupDS = app.findDatasource('availablePersonGroupDS');
  await availablePersonGroupDS.load();
  let selectedPersonGroupDS = app.findDatasource('selectedPersonGroupDS');
  let items = await selectedPersonGroupDS.load();
  controller.onSelectPersonGroupLookupOkClick(items);
  await selectedPersonGroupDS.load();
  await controller.savePersonGroups(false);

  app.setCurrentPage('CreateWorkQueue');
  let assignedPersonGroupDSNew = app.findDatasource('assignedPersonGroupDSNew');
  await assignedPersonGroupDSNew.load();
  await selectedPersonGroupDS.load();
  await controller.savePersonGroups(true);

  app.state.selectedWQ='VB_22_03_2024';
  let deletePersonGroupDS = app.findDatasource("deletePersonGroupDS");
  await deletePersonGroupDS.load({src:assignedPersonGroupDS.items});
  await controller.deletePersonGroups();
});

export default CreateWorkQueueController;

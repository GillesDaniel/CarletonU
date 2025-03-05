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
import WorkOrderSummaryController from './WorkOrderSummaryController';
import worklog from './test/worklog-json-data'
import sinon from 'sinon';

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

it('Work Order >> Work log >> Add Comment', async () => {

  const woSummaryController = new WorkOrderSummaryController();
  const app = new Application();
  const page = new Page({
    name: 'WOSummaryPage'
  });

  const parentPage = new Page({name: 'parentPage'});
  page.parent = parentPage ;

  woSummaryController.dialogInitialized(app,page);
    
  await app.initialize();

  //Create the Datasource
  let worklogds = newWorklogatasource(worklog, 'woWorklogDs'); 
 
  app.registerPage(page);
 
  app.setCurrentPage(page);
  page.registerController(woSummaryController);
 
  page.registerDatasource(worklogds);
  
  //Initialize app in the pageController
  expect(worklogds).not.toBeNull(); 
 
  await worklogds.load();
  page.state.worklogds = worklogds;
  page.state.worklogds.update = function (){
    return "success";
  }

  worklogds.item.description = "Summary Description";
  woSummaryController.getSelectedLogtype({"selectedItem": {"id": "Update","text": "Update","item": {"value": "UPDATE"}}});
  woSummaryController.onEditorChange({"target": {"content": "<p>Rich Text Content</p>"}});
  app.state.isViewable=true;
  
  expect(page.name).toBe('WOSummaryPage');
  await woSummaryController.saveWorkLog();
});

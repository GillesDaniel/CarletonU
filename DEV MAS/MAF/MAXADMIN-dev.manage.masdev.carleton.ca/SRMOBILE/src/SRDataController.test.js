/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020, 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import SRDataController from './SRDataController';
import SRPageController from './SRPageController';
import servicerequestitem from './test/sr-detail-json-data';
import {Application, Datasource, JSONDataAdapter, Page} from '@maximo/maximo-js-api';

function newDatasource(data = servicerequestitem, name = 'selectedDatasource', field = 'member') {
  const da = new JSONDataAdapter({
    src: data,
    items: field,
    schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
    idAttribute: 'ticketid',
    name: name,
  });
  return ds;
}

it('onDatasourceInitialized test ', async () => {
  const controller = new SRDataController();
  const app = new Application();
  const page = new Page({
    name: 'main'
  });

  app.client = {
    userInfo: {
      personId: 'wilson'
    }
  };

  const ds = newDatasource(servicerequestitem, 'dssrlist');
  page.registerDatasource(ds);

  await app.initialize();
  controller.onDatasourceInitialized(ds, '', app);
});

it('computedSRStatusPriority function to display status and priority on service request list', async () => {
  const controller = new SRDataController();
  const app = new Application();
  const page = new Page({name: 'main'});
  app.registerPage(page);
  app.registerController(controller);
  await app.initialize();

  let item = controller.computedSRStatusPriority({
    status_description: "New"
  });

  expect(item[0].label).toEqual("New");
  expect(item[0].type).toEqual("cool-gray");

  item = controller.computedSRStatusPriority({
    reportedpriority_description: "High"
  });

  expect(item[1].label).toEqual("High");
  expect(item[1].type).toEqual("dark-gray");

});

it('computedSRDescription function to display description and ticketid on service request list', async () => {
  const controller = new SRDataController();
  const app = new Application();
  const page = new Page({name: 'main'});
  app.registerPage(page);
  app.registerController(controller);
  await app.initialize();

//  let item = controller.computedSRDescription({
//    description: "Desc",
//	ticketid: "123"
//  });

  expect(controller.computedSRDescription({
    description: "Desc",
	ticketid: "123"
  })).toEqual("Desc 123");

  expect(controller.computedSRDescription({
    description: undefined,
	ticketid: "123"
  })).toEqual(" 123");

});



it('should load filterBySrStatus AFTER reload of entire SR datasource by forceSync', async () => {
  const controller = new SRDataController();
  const pageController = new SRPageController();
  const app = new Application();
  const page = new Page({name: 'main'});
  const ds = newDatasource(servicerequestitem, 'srDS');
  page.registerDatasource(ds);
  page.registerController(pageController);
  app.registerPage(page);
  app.registerController(controller);
  app.initialize();

  app.currentPage = page;
  controller.onDatasourceInitialized(ds, page, app);

  expect(ds.state.isInsideForceSync).toBeFalsy();

  const query = {
    start: 0
  };
  controller.onBeforeLoadData(ds, query);

  expect(ds.state.isInsideForceSync).toBeTruthy();

  app.state.isMobileContainer = true;
  app.state.synonym = {
    completedSrStatusList: ["COMP", "RESOLVED"],
    activeSrStatusList: ["NEW", "QUEUED"]
  };

  pageController.pageInitialized = jest.fn();
  pageController.pageResumed = jest.fn();
  pageController.filterSrByStatus = jest.fn();
  page.state.selectedDropdown = "completedrequests";
  
  controller.filterSrByStatusAfterForceSync(ds);
  expect(ds.state.isInsideForceSync).toBeFalsy();
  
  ds.state.isInsideForceSync = true; //This is removed, so we put back for another round of test
  page.state.selectedDropdown = "activerequests";
  controller.filterSrByStatusAfterForceSync(ds);
  expect(ds.state.isInsideForceSync).toBeFalsy();
});
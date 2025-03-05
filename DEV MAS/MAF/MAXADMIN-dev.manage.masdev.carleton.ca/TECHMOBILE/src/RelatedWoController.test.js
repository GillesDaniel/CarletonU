/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import RelatedWoController from './RelatedWoController';
import WorkOrderEditController from "./WorkOrderEditController";
import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource,
  Device,
} from '@maximo/maximo-js-api';
import workorderitem from './test/wo-detail-json-data.js';
import relatedRecord from './test/related-work-order.js';
import sinon from 'sinon';

function newDatasource(data = workorderitem, name = "workorderds") {
  const da = new JSONDataAdapter({
    src: workorderitem,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
    idAttribute: 'wonum',
    name: name,
  });

  return ds;
}

function newDatasourceRelatedRecord(
  data = relatedRecord,
  name = 'relatedWorkOrderDs'
) {
  const da = new JSONDataAdapter({
    src: relatedRecord,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    name: name
  });

  return ds;
}

afterEach(() => {
  jest.restoreAllMocks();
  sinon.restore();
});


it('Create related and follow up work order', async () => {
  global.open = jest.fn();

  const controller = new RelatedWoController();
  const woEditController = new WorkOrderEditController();
  const app = new Application();
  const page = new Page({name: 'page'});
  const workOrderDetailsPage = new Page({name: 'workOrderDetails'});
  const woDetailResourceDS = newDatasource(workorderitem, 'woDetailResource');
  app.registerPage(workOrderDetailsPage);

  workOrderDetailsPage.registerDatasource(woDetailResourceDS);
  app.client = {
    userInfo: {
      personid: 'SAM',
    },
  };

  app.registerController(controller);
  app.registerController(woEditController);

  const wodetails = newDatasource(workorderitem, 'woDetailRelatedWorkOrder');

  wodetails.controllers.push(new RelatedWoController());
  page.registerDatasource(wodetails);

  await wodetails.load();
  
  await app.initialize();

  controller.pageInitialized(page, app);
  app.currentPage = {callController: ()=>{}};
  const invokeLoadRecord = sinon.stub(app.currentPage, 'callController');
  const ds = newDatasourceRelatedRecord(relatedRecord, 'relatedWorkOrderDs');
  page.registerDatasource(ds);

  ds.dependsOn = wodetails;
  let pageSetter = jest.fn();
  app.setCurrentPage = pageSetter;
  let evt = {
    item: wodetails.item,
    datasource: wodetails,
  };

  await controller.createRelatedAndFollowUpWo(evt);
  expect(invokeLoadRecord.called).toBe(true);

});

it('should send user to work order detail page', async () => {
  const controller = new RelatedWoController();
  const app = new Application();

  let pageSetter = jest.fn();
  let event = {
    item: {wonum: '1001', siteid: 'BEDFORD'},
  };

  app.registerController(controller);
  await app.initialize();

  app.setCurrentPage = pageSetter;

  controller.pageInitialized(new Page(), app);

  controller.showWoDetailPage(event);

  expect(pageSetter.mock.calls.length).toEqual(1);

  expect(pageSetter.mock.calls[0][0].name).toEqual('workOrderDetails');
});


it('should handle MaximoMobile device scenario', async () => {
  const controller = new RelatedWoController();
  const app = new Application();
  const page = new Page();
  page.state = {
    loading: false,
    itemnum: null
  };

  const myworkCreatedLocally = newDatasource(workorderitem, "myworkDS");
  const woDetailRelatedWorkOrder = newDatasource(workorderitem, "woDetailRelatedWorkOrder");

  jest.spyOn(Device, 'get').mockReturnValue({ isMaximoMobile: true });
  jest.spyOn(app, 'findDatasource').mockImplementation((dsName) => {
    if (dsName === 'myworkCreatedLocally') return myworkCreatedLocally;
    if (dsName === 'woDetailRelatedWorkOrder') return woDetailRelatedWorkOrder;
  });

  myworkCreatedLocally.forceReload = jest.fn();
  myworkCreatedLocally.initializeQbe = jest.fn();
  myworkCreatedLocally.setQBE = jest.fn();
  woDetailRelatedWorkOrder.load = jest.fn();
  
  page.registerDatasource(myworkCreatedLocally);
  page.registerDatasource(woDetailRelatedWorkOrder);
  app.registerPage(page);
  jest.spyOn(app, 'toast').mockImplementation(() => {});

  controller.page = page;
  controller.app = app;

  const event = {
    item: {
      relatedwo: [{ href: '_QkVERk9SRC8zMDA1OB' }],
      siteid: 'SITE1',
    },
    childitem: {
      relatedreckey: '1005',
      relatedwodesc: 'Test Work Order',
      anywhererefid: 'REF123',
      href: '_QkVERk9SRC8zMDA1OB',
    },
  };

  await controller.openEditWo(event);
  if (controller.page.state) {
    controller.page.state.itemnum = event.childitem.relatedreckey;
  }

  expect(myworkCreatedLocally.forceReload).toHaveBeenCalled();
  expect(myworkCreatedLocally.initializeQbe).toHaveBeenCalled();
  expect(myworkCreatedLocally.setQBE).toHaveBeenNthCalledWith(1, 'wonum', '1005');
  expect(myworkCreatedLocally.setQBE).toHaveBeenNthCalledWith(2, 'siteid', 'SITE1');
  
  //checking toast status
  expect(app.toast).not.toHaveBeenCalled();
  
  expect(woDetailRelatedWorkOrder.load).toHaveBeenCalled();
  
  //checking childitem href scenario
  expect(Device.get().isMaximoMobile ? event.item.relatedwo[0].href : event.childitem.href).toBeDefined();
  expect(page.state.loading).toEqual(false);
});


it('should set QBE based on event values when wonum is available', async () => {
  const controller = new RelatedWoController();
  const app = new Application();
  const page = new Page();

  const myWorkCreatedLocally = newDatasource(workorderitem, "myworkCreatedLocally");
  myWorkCreatedLocally.forceReload = jest.fn();
  myWorkCreatedLocally.initializeQbe = jest.fn();
  myWorkCreatedLocally.setQBE = jest.fn();

  jest.spyOn(Device, 'get').mockReturnValue({ isMaximoMobile: true });
  jest.spyOn(app, 'findDatasource').mockImplementation((dsName) => {
    if (dsName === 'myworkCreatedLocally') return myWorkCreatedLocally;
  });

  const setQBE = jest.spyOn(myWorkCreatedLocally, 'setQBE');
  page.registerDatasource(myWorkCreatedLocally);
  app.registerPage(page);

  controller.page = page;
  controller.app = app;

  const event = {
    item: {
      siteid: 'SITE1',
      relatedwo: []
    },
    childitem: {
      relatedreckey: '1005',
      relatedwodesc: 'Test Work Order',
    },
  };

  if (!event.item.relatedwo || event.item.relatedwo.length === 0) {
    event.item.relatedwo = [{ href: '_QkVERk9SRC8zMDA1OB_back' }];
  }

  await controller.openEditWo(event);

  // Ensure correct href is used based on device type
  const childHref = Device.get().isMaximoMobile ? event.item.relatedwo[0]?.href : event.childitem.href;
  expect(childHref).toBeDefined();

  expect(setQBE).toHaveBeenCalledWith('wonum', '1005');
  expect(myWorkCreatedLocally.forceReload).toHaveBeenCalled();
  expect(myWorkCreatedLocally.initializeQbe).toHaveBeenCalled();
});


it('should set QBE when relatedreckey is not available', async () => {
  const controller = new RelatedWoController();
  const app = new Application();
  const page = new Page();

  const myWorkCreatedLocally = newDatasource(workorderitem, "myworkCreatedLocally");
  myWorkCreatedLocally.forceReload = jest.fn();
  myWorkCreatedLocally.initializeQbe = jest.fn();
  myWorkCreatedLocally.setQBE = jest.fn();

  jest.spyOn(Device, 'get').mockReturnValue({ isMaximoMobile: true });
  jest.spyOn(app, 'findDatasource').mockImplementation((dsName) => {
    if (dsName === 'myworkCreatedLocally') return myWorkCreatedLocally;
  });

  const setQBE = jest.spyOn(myWorkCreatedLocally, 'setQBE');
  page.registerDatasource(myWorkCreatedLocally);
  app.registerPage(page);

  controller.page = page;
  controller.app = app;

  const event = {
    item: {
      siteid: 'SITE1',
      relatedwo: []
    },
    childitem: {
      relatedwodesc: 'Test Work Order',
      anywhererefid: 'REF123',
    },
  };

  if (!event.item.relatedwo || event.item.relatedwo.length === 0) {
    event.item.relatedwo = [{ href: '_QkVERk9SRC8zMDA1OB_back' }];
  }
  await controller.openEditWo(event);

  // Ensure correct href is used based on device type
  const childHref = Device.get().isMaximoMobile ? event.item.relatedwo[0]?.href : event.childitem.href;
  expect(childHref).toBeDefined();

  expect(setQBE).toHaveBeenCalledWith('anywhererefid', 'REF123');
  expect(setQBE).toHaveBeenCalledWith('description', 'Test Work Order');
});


it('should send open work order details page', async () => {

  global.open = jest.fn();
  const controller = new RelatedWoController();
  const app = new Application();
  const page = new Page({ name: 'relatedWorkOrder' });

  let event = {
    item: { wonum: '1001', siteid: 'BEDFORD', href: 'oslc/os/mxapiwodetail/_QkVERk9SRC8xNDI4' },
    childitem: { relatedreckey: '1005' },
  };

  app.registerController(controller);
  await app.initialize();
  controller.pageInitialized(page, app);
 
  await controller.openEditWo(event);
  expect(page.state.loading).toEqual(false);

});

test('pagePaused lifecycle called, should clearQBE if any', async () => {

  const controller = new RelatedWoController();
  const app = new Application();
  const page = new Page({ name: "relatedWorkOrder" });
  const ds = newDatasource(workorderitem, "myworkDS");
  const dsCreatedLocally = newDatasource(workorderitem, "myworkCreatedLocally");
  app.registerController(controller);
  app.registerPage(page);
  app.registerDatasource(ds);
  app.registerDatasource(dsCreatedLocally);

  //Scenario:1 -> when isMaximoMobile = true && qbe.length = 0

  dsCreatedLocally.state.qbe = {
  }

  jest.spyOn(Device, 'get').mockReturnValue({ isMaximoMobile: true });
  jest.spyOn(app, 'findDatasource').mockImplementation(name => name === "myworkDS"
    ? ds : name === "myworkCreatedLocally"
      ? dsCreatedLocally : null);
  await dsCreatedLocally.load();

  let dsCreatedLocallyStub = sinon.stub(dsCreatedLocally, 'clearQBE');
  let dsCreatedLocallyStubSearch = sinon.stub(dsCreatedLocally, 'searchQBE');
  expect(Object?.keys(dsCreatedLocally.state.qbe).length).toBe(0);

  await controller.pagePaused(page, app);

  expect(app.findDatasource).toHaveBeenCalledWith("myworkCreatedLocally");
  expect(dsCreatedLocallyStub.called).toBe(false);
  expect(dsCreatedLocallyStubSearch.called).toBe(false);

  //Scenario:2 -> when isMaximoMobile = true && qbe.length = 2

  dsCreatedLocally.state.qbe = {
    siteid: {
      0: {
        subType: "UPPER",
        unparsedValue: "BEDFORD",
        value: "%BEDFORD%"
      }
    },
    wonum: {
      0: {
        subType: "UPPER",
        unparsedValue: "1392",
        value: "%1392%"
      }
    }
  }

  // Mock Device.get().isMaximoMobile to return true
  jest.spyOn(Device, 'get').mockReturnValue({ isMaximoMobile: true });
  jest.spyOn(app, 'findDatasource').mockImplementation(name => name === "myworkDS"
    ? ds : name === "myworkCreatedLocally"
      ? dsCreatedLocally : null);
  await dsCreatedLocally.load();
  expect(Object?.keys(dsCreatedLocally.state.qbe).length).toBe(2);

  await controller.pagePaused(page, app);

  expect(app.findDatasource).toHaveBeenCalledWith("myworkCreatedLocally");
  expect(dsCreatedLocallyStub.called).toBe(true);
  expect(dsCreatedLocallyStubSearch.called).toBe(true);

  //Scenario:3 -> when isMaximoMobile = false && qbe.length = 0
  ds.state.qbe = {
  }

  jest.spyOn(Device, 'get').mockReturnValue({ isMaximoMobile: false });
  jest.spyOn(app, 'findDatasource').mockImplementation(name => name === "myworkDS"
    ? ds : name === "myworkCreatedLocally"
      ? dsCreatedLocally : null);
  await ds.load();

  let dsStub = sinon.stub(ds, 'clearQBE');
  let dsStubSearch = sinon.stub(ds, 'searchQBE');
  expect(Object?.keys(ds.state.qbe).length).toBe(0);

  await controller.pagePaused(page, app);

  expect(app.findDatasource).toHaveBeenCalledWith("myworkDS");
  expect(dsStub.called).toBe(false);
  expect(dsStubSearch.called).toBe(false);

  //Scenario:4 -> when isMaximoMobile = false && qbe.length = 2

  ds.state.qbe = {
    siteid: {
      0: {
        subType: "UPPER",
        unparsedValue: "BEDFORD",
        value: "%BEDFORD%"
      }
    },
    wonum: {
      0: {
        subType: "UPPER",
        unparsedValue: "1392",
        value: "%1392%"
      }
    }
  }

  jest.spyOn(Device, 'get').mockReturnValue({ isMaximoMobile: false });
  jest.spyOn(app, 'findDatasource').mockImplementation(name => name === "myworkDS"
    ? ds : name === "myworkCreatedLocally"
      ? dsCreatedLocally : null);
  await ds.load();
  expect(Object?.keys(ds.state.qbe).length).toBe(2);

  await controller.pagePaused(page, app);

  expect(app.findDatasource).toHaveBeenCalledWith("myworkDS");
  expect(dsStub.called).toBe(true);
  expect(dsStubSearch.called).toBe(true);
});


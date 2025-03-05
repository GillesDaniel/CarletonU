/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2023 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import InventoryItemListPageController from "./InventoryItemListPageController";
import {
  JSONDataAdapter,
  Datasource,
  Application,
  Page,
} from "@maximo/maximo-js-api";
import inventoryitemsData from "./test/test-inventoryitem-data";
import invuseStatusDomainData from "./test/invbal-invusestatus-domain-data";
import invuseListDS from "./test/test-invusage-data";

import sinon from "sinon";

function newDatasource(data = inventoryitemsData, name = "invitemListDS") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
    selectionMode: "multiple",
  });

  const ds = new Datasource(da, {
    name: name,
    idAttribute: "itemnum",
  });

  return ds;
}

it("Page initialized", async () => {
  const app = new Application();
  let controller = new InventoryItemListPageController();
  let page = new Page();

  app.state.selectedInvUseDSName = "invUseDS";

  let appInitSpy = jest.spyOn(controller, "pageInitialized");

  const ds = newDatasource(inventoryitemsData, "invitemListDS");
  ds.registerController(controller);
  app.registerDatasource(ds);
  const invuseds = newDatasource(invuseListDS, "invUseDS");
  invuseds.registerController(controller);
  app.registerDatasource(invuseds);

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  sinon.stub(ds, "load").returns({});
  sinon.stub(ds, "forceReload").returns({});
  sinon.stub(ds, "clearSelections");
  sinon.stub(invuseds, "load").returns({});
  sinon.stub(invuseds, "forceReload").returns({});

  app.initialize();
  expect(appInitSpy).toHaveBeenCalled();
});

it("Page loading", async () => {
  const app = new Application();
  let controller = new InventoryItemListPageController();
  let page = new Page();

  app.state.selectedInvUseDSName = "invUseDS";

  const ds = newDatasource(inventoryitemsData, "invitemListDS");
  page.registerController(controller);
  app.registerDatasource(ds);

  const invuseds = newDatasource(invuseListDS, "invUseDS");
  app.registerDatasource(invuseds);

  sinon.stub(ds, "load").returns({});
  sinon.stub(ds, "forceReload").returns({});
  sinon.stub(ds, "clearSelections");
  sinon.stub(invuseds, "load").returns({});
  sinon.stub(invuseds, "forceReload").returns({});

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  app.registerPage(page);
  app.setCurrentPage(page);

  app.initialize();

  app.state.selectedInvUseDSName = "invUseDS";
  controller.pageResumed(page, app);
});

it("selectToProcess function returns a set of items and calls the invUsage Page", async () => {
  const controller = new InventoryItemListPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(inventoryitemsData, "invitemListDS");
  page.registerController(controller);
  app.registerDatasource(ds);

  app.state.selectedInvUseDSName = "invUseDS";

  const invuseds = newDatasource(invuseListDS, "invUseDS");
  app.registerDatasource(invuseds);

  sinon.stub(invuseds, "load").returns([]);
  sinon.stub(invuseds, "forceReload").returns([]);

  sinon.stub(ds, "getSelectedItems").returns(inventoryitemsData.member[0]);
  sinon.stub(ds, "load").returns(inventoryitemsData.member);
  sinon.stub(ds, "clearSelections");
  ds.getSelectedItems().length = 1;

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  app.registerPage(page);
  app.setCurrentPage(page);
  let appSpy = jest.spyOn(controller, "selectToProcess");

  app.initialize();
  await ds.load();

  controller.selectToProcess();
  expect(appSpy.mock.calls).toHaveLength(1);

  // ds.setSelected(1, true);
  controller.selectToProcess();
  expect(appSpy).toHaveBeenCalled();
});

it("openInventoryUsage should callsetCurrentPage function", async () => {
  const controller = new InventoryItemListPageController();
  const app = new Application();
  const page = new Page();

  const ds = newDatasource(inventoryitemsData, "invitemListDS");
  ds.registerController(controller);
  app.registerDatasource(ds);

  app.state.selectedInvUseDSName = "invUseDS";

  const setCurrentPageSpy = sinon.spy(app, "setCurrentPage");
  const mockFn = jest.fn();

  const invuseds = newDatasource(invuseListDS, "invUseDS");
  page.registerController(controller);
  app.registerDatasource(invuseds);

  sinon.stub(ds, "load").returns({});
  sinon.stub(ds, "forceReload").returns({});
  sinon.stub(ds, "clearSelections");
  sinon.stub(invuseds, "load").returns({});
  sinon.stub(invuseds, "forceReload").returns({});

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  app.initialize();

  const itemMock = {
    invusenum: "1234",
    description: "Item test",
    href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
  };

  app.setCurrentPage = mockFn;
  page.state.addmoreitems = true;

  controller.openInventoryUsage(itemMock);
  expect(setCurrentPageSpy.calledOnce).toBeTruthy();
});

it("expect loadDatasource functions to have been called", async () => {
  const controller = new InventoryItemListPageController();
  const app = new Application();
  const page = new Page();

  app.state.selectedInvUseDSName = "invUseDS";

  const invuseds = newDatasource(invuseListDS, "invUseDS");
  page.registerController(controller);
  app.registerDatasource(invuseds);

  sinon.stub(invuseds, "load").returns({});
  sinon.stub(invuseds, "forceReload").returns({});
  sinon.stub(invuseds, "isItemLoaded").returns(false);
  sinon.stub(invuseds, "get").returns(invuseListDS.member[0]);

  invuseds.load = sinon.spy(() => {
    return invuseListDS.member;
  });
  invuseds.dataAdapter.totalCount = 1;

  const ds = newDatasource(inventoryitemsData, "invitemListDS");
  page.registerController(controller);
  app.registerDatasource(ds);

  sinon.stub(ds, "load").returns({});
  sinon.stub(ds, "forceReload").returns({});
  sinon.stub(ds, "clearSelections");
  sinon.stub(ds, "setQBE");
  sinon.stub(ds, "searchQBE");

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  app.registerPage(page);
  app.setCurrentPage(page);

  app.initialize();

  app.device.isMaximoMobile = true;

  app.state.reservationLoaded = false;
  page.state.addmoreitems = true;
  await controller.loadDatasource(true);

  await controller.forceUpdateDatasource();

  app.state.reservationLoaded = true;
  page.state.addmoreitems = false;
  await controller.loadDatasource(false);

  //expect(clearSelectionsSpy).toHaveBeenCalled();
  //expect(forceReloadSpy).toHaveBeenCalled();
});

it("loadDatasource with this.app.device.isMaximoMobile = true", async () => {
  const controller = new InventoryItemListPageController();
  const app = new Application();
  const page = new Page();

  app.state.selectedInvUseDSName = "invUseDS";

  const invuseds = newDatasource(invuseListDS, "invUseDS");
  page.registerController(controller);
  app.registerDatasource(invuseds);

  sinon.stub(invuseds, "load").returns({});
  sinon.stub(invuseds, "forceReload").returns(invuseListDS);
  sinon.stub(invuseds, "isItemLoaded").returns(false);
  sinon.stub(invuseds, "get").returns(invuseListDS.member[0]);

  invuseds.load = sinon.spy(() => {
    return invuseListDS.member;
  });
  invuseds.dataAdapter.totalCount = 1;

  const invuseds_local = newDatasource(invuseListDS, "invUseDS4Cal_local");
  page.registerController(controller);
  app.registerDatasource(invuseds_local);

  sinon.stub(invuseds_local, "load").returns({});
  sinon.stub(invuseds_local, "forceReload").returns(invuseListDS);
  sinon.stub(invuseds_local, "isItemLoaded").returns(false);
  sinon.stub(invuseds_local, "get").returns(invuseListDS.member[0]);

  invuseds_local.load = sinon.spy(() => {
    return invuseListDS.member;
  });
  invuseds_local.dataAdapter.totalCount = 1;

  const ds = newDatasource(inventoryitemsData, "invitemListDS");
  page.registerController(controller);
  app.registerDatasource(ds);

  sinon.stub(ds, "load").returns({});
  sinon.stub(ds, "getItems").returns(inventoryitemsData.member);
  sinon.stub(ds, "forceReload").returns({});
  sinon.stub(ds, "clearSelections");
  sinon.stub(ds, "setQBE");
  sinon.stub(ds, "searchQBE");

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  app.device.isMaximoMobile = true;

  app.registerPage(page);
  app.setCurrentPage(page);

  app.initialize();
  await controller.loadDatasource(false);

  const mockFn = jest.fn();
  app.setCurrentPage = mockFn;
  const setCurrentPageSpy = sinon.spy(app, "setCurrentPage");

  page.state.addmoreitems = true;
  controller.goBack();
  expect(setCurrentPageSpy.calledOnce).toBeTruthy();

  page.state.addmoreitems = false;
  controller.goBack();
  expect(setCurrentPageSpy.calledTwice).toBeTruthy();

  page.state.addmoreitems = true;
  page.state.inventoryItemsInvUsage = invuseListDS.member[0].invuseline;
  controller.onAfterLoadData(ds, inventoryitemsData.member);
});

it("check updateSelectedItems", async () => {
  const controller = new InventoryItemListPageController();
  const app = new Application();
  const page = new Page();

  app.state.selectedInvUseDSName = "invUseDS";

  const invuseds = newDatasource(invuseListDS, "invUseDS");
  page.registerController(controller);
  app.registerDatasource(invuseds);

  sinon.stub(invuseds, "load").returns({});
  sinon.stub(invuseds, "forceReload").returns(invuseListDS);
  sinon.stub(invuseds, "isItemLoaded").returns(false);
  sinon.stub(invuseds, "get").returns(invuseListDS.member[0]);

  invuseds.load = sinon.spy(() => {
    return invuseListDS.member;
  });
  invuseds.dataAdapter.totalCount = 1;

  const invuseds_local = newDatasource(invuseListDS, "invUseDS4Cal_local");
  page.registerController(controller);
  app.registerDatasource(invuseds_local);

  sinon.stub(invuseds_local, "load").returns({});
  sinon.stub(invuseds_local, "forceReload").returns(invuseListDS);
  sinon.stub(invuseds_local, "isItemLoaded").returns(false);
  sinon.stub(invuseds_local, "get").returns(invuseListDS.member[0]);

  invuseds_local.load = sinon.spy(() => {
    return invuseListDS.member;
  });
  invuseds_local.dataAdapter.totalCount = 1;

  const ds = newDatasource(inventoryitemsData, "invitemListDS");
  page.registerController(controller);
  app.registerDatasource(ds);

  sinon.stub(ds, "load").returns({});
  sinon.stub(ds, "getItems").returns(inventoryitemsData.member);
  sinon.stub(ds, "forceReload").returns({});
  sinon.stub(ds, "clearSelections");
  sinon.stub(ds, "setQBE");
  sinon.stub(ds, "searchQBE");

  app.device.isMaximoMobile = true;

  app.registerPage(page);
  app.setCurrentPage(page);

  app.initialize();
  await controller.loadDatasource(false);

  controller.updateSelectedItems();
  expect(page.state.totalSelected).toBe(0);

  ds.setSelectedItem(ds.items[0], true);
  controller.updateSelectedItems();
  expect(page.state.totalSelected).toBe(1);

  ds.setSelectedItem(ds.items[1], true);
  controller.updateSelectedItems();
  expect(page.state.totalSelected).toBe(2);
});

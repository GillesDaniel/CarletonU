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

import ReserveMaterialsPageController from './ReserveMaterialsPageController';
import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource,
} from '@maximo/maximo-js-api';

import workorderitem from './test/wo-detail-json-data.js';
import statusitem from './test/statuses-json-data.js';
import sinon from 'sinon';
import SynonymUtil from './utils/SynonymUtil';
import reservedItemRotatingAsset from './test/rotating-asset-data.js'

function newDatasource(data = workorderitem, name = 'workorderds') {
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

function newStatusDatasource(data = statusitem, name = 'synonymdomainData') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
    idAttribute: 'value',
    name: name,
  });

  return ds;
}

it('load records', async () => {
  const controller = new ReserveMaterialsPageController();
  const app = new Application();
  const page = new Page({
    name: 'reserveMaterials',
    state: { disableReservedMaterialAction: true },
  });

  app.registerController(controller);
  app.registerPage(page);

  const woMaterialResource = newDatasource(workorderitem, 'woMaterialResource');
  const woMaterialResourcejson = newDatasource(
    workorderitem,
    'woReservedMaterialNonRotating'
  );

  const woReservedMaterialds = newDatasource(
    workorderitem,
    'woReservedMaterialds'
  );
  await woReservedMaterialds.load();
  page.registerDatasource(woReservedMaterialds);
  page.registerDatasource(woMaterialResource);
  page.registerDatasource(woMaterialResourcejson);
  await app.initialize();
  await controller.loadPageResumed();

  jest.spyOn(controller, "_resetDataSource").mockImplementation(() => { });
  let searchReservedMaterial = jest.spyOn(woReservedMaterialds, 'initializeQbe').mockImplementation(() => true);
  expect(searchReservedMaterial).toBeTruthy();
});


it('should select the rotating asset', async () => {
  let fakeData = [
    { isrotating: true, reservedqty: 11, itemnum: 'item1', location: 'loc1', binnum: 'bin1', oplocation: 'oploc1', requestnum: 'req1', description: 'desc1', locationsdesc: 'locdesc1', invreserveid: 'inv1', storelocsiteid: 'site1', rotassetnum: 'asset1' }
  ];
  const controller = new ReserveMaterialsPageController();
  const app = new Application();
  const page = new Page({
    name: 'reserveMaterials',
    state: { rotatingItemWithNoAsset: fakeData, items: fakeData, sendSelectedAssets: true },
  });
  page.state.sendSelectedAssets = true;
  const reservedRotatingAssetJsonDS = newDatasource(reservedItemRotatingAsset, 'reservedItemRotatingAssetJsonDS');
  const reservedRotatingAssetDS = newDatasource(reservedItemRotatingAsset, 'reservedItemRotatingAssetDS');
  const woReservedMaterialNonRotating = newDatasource(workorderitem, 'woReservedMaterialNonRotating');
  const synonymData = newStatusDatasource(statusitem, 'synonymdomainData');
  app.registerController(controller);
  app.registerPage(page);
  app.registerDatasource(reservedRotatingAssetDS);
  app.registerDatasource(reservedRotatingAssetJsonDS);
  page.registerDatasource(woReservedMaterialNonRotating);
  app.registerDatasource(synonymData);

  await app.initialize();
  await controller.pageInitialized(page, app);
  let items = await woReservedMaterialNonRotating.load();
  page.state.selectedReservedItems = [items[0]];

  jest.spyOn(controller, "getReservedRotatingAssetData").mockReturnValue(fakeData);
  const sendReservedItems = jest.spyOn(controller, "sendReservedItems");
  controller.setReservedItems();
  expect(page.state.sendSelectedAssets).toBe(true);

  jest.spyOn(controller, "updateReservedItems").mockImplementation(() => { });
  jest.spyOn(controller, "filterRotatingAssets").mockReturnValue(fakeData);
  jest.spyOn(controller, "filterRotatingAssetsBasedOnTransactions").mockReturnValue(fakeData);
  jest.spyOn(reservedRotatingAssetDS, "getSelectedItems").mockImplementation(() => { });
  await controller.selectionRotatingAssets();
  expect(sendReservedItems).toHaveBeenCalled();
  expect(page.state.loadingReserverMaterials).toBeFalsy();
  expect(page.state.disableReservedMaterialAction).toBeTruthy();
})

describe('Get selected items', () => {
  const controller = new ReserveMaterialsPageController();
  const app = new Application();
  const page = new Page({
    name: 'reserveMaterials',
    state: { disableReservedMaterialAction: true },
  });

  const woReservedMaterialRotating = newDatasource(workorderitem, 'woReservedMaterialRotating');
  const woReservedMaterialNonRotating = newDatasource(workorderitem, 'woReservedMaterialNonRotating');

  sinon.stub(woReservedMaterialNonRotating, 'initializeQbe');
  page.registerDatasource(woReservedMaterialNonRotating);
  page.registerDatasource(woReservedMaterialRotating);
  app.registerController(controller);
  app.registerPage(page);

  let rotatingItems;
  let nonRotatingItems;
  beforeEach(async () => {
    await app.initialize();
    controller.pageInitialized(page, app);

    rotatingItems = [{}, {}, {}, {}];
    nonRotatingItems = [{}, {}, {}];
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should get selectedReservedItems when both rotating and non-rotating have items', async () => {
    sinon.stub(woReservedMaterialRotating, 'getSelectedItems').returns(rotatingItems);
    sinon.stub(woReservedMaterialNonRotating, 'getSelectedItems').returns(nonRotatingItems);
    await controller.getSelectedItems();
    expect(page.state.selectedReservedItems).toEqual(rotatingItems);
    expect(page.state.disableReservedMaterialAction).toBe(false);
  });

  it('should get selectedReservedItems when only rotating has items', async () => {
    sinon.stub(woReservedMaterialRotating, 'getSelectedItems').returns(rotatingItems);
    sinon.stub(woReservedMaterialNonRotating, 'getSelectedItems').returns([]);
    await controller.getSelectedItems();
    expect(page.state.selectedReservedItems).toEqual(rotatingItems);
    expect(page.state.disableReservedMaterialAction).toBe(false);
  });

  it('should get selectedReservedItems when only non-rotating has items', async () => {
    sinon.stub(woReservedMaterialRotating, 'getSelectedItems').returns([]);
    sinon.stub(woReservedMaterialNonRotating, 'getSelectedItems').returns(nonRotatingItems);
    await controller.getSelectedItems();
    expect(page.state.selectedReservedItems).toEqual(nonRotatingItems);
    expect(page.state.disableReservedMaterialAction).toBe(false);
  });

  it('should return true for disableReservedMaterialAction, when neither rotating nor non-rotating have items', async () => {
    sinon.stub(woReservedMaterialRotating, 'getSelectedItems').returns([]);
    sinon.stub(woReservedMaterialNonRotating, 'getSelectedItems').returns([]);
    await controller.getSelectedItems();
    expect(page.state.selectedReservedItems).toEqual([]);
    expect(page.state.disableReservedMaterialAction).toBe(true);
  });
});

it('should handle when no items are selected & check negative values for non-rotating items', async () => {
  const controller = new ReserveMaterialsPageController();
  const app = new Application();
  const page = new Page({
    name: 'reserveMaterials',
    state: { disableReservedMaterialAction: true },
  });

  const woReservedMaterialRotating = newDatasource(workorderitem, 'woReservedMaterialRotating');
  const woReservedMaterialNonRotating = newDatasource(workorderitem, 'woReservedMaterialNonRotating');

  sinon.stub(woReservedMaterialNonRotating, 'initializeQbe');
  page.registerDatasource(woReservedMaterialNonRotating);
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);

  sinon.stub(woReservedMaterialRotating, 'getSelectedItems').returns([]);
  sinon.stub(woReservedMaterialNonRotating, 'getSelectedItems').returns([]);
  await controller.getSelectedItems();
  expect(page.state.disableReservedMaterialAction).toBe(true);

  let event = {
    imaginaryTarget: { isInvalid: true, value: -3, valueAsNumber: -3 }
  }
  let event2 = {
    imaginaryTarget: { isInvalid: false, value: 3, valueAsNumber: 3 }
  }
  woReservedMaterialNonRotating.item.reservedqty = -3;
  controller.validateNonRotatingItem(event);
  expect(page.state.hasErrors).toBe(true);

  woReservedMaterialNonRotating.item.reservedqty = 3;
  controller.validateNonRotatingItem(event2);
  expect(page.state.hasErrors).toBe(false);
});

it('set selected items', async () => {
  const controller = new ReserveMaterialsPageController();
  const app = new Application();
  const page = new Page({
    name: 'reserveMaterials',
    state: {
      selectedReservedItems: {},
      disableReservedMaterialAction: false,
      loadingReserverMaterials: true,
      items: {},
      rotatingItemWithNoAsset: {}
    },
  });

  const woReservedMaterialNonRotating = newDatasource(
    workorderitem,
    'woReservedMaterialNonRotating'
  );
  const reservedActualMaterialDs = newDatasource(
    workorderitem,
    'reservedActualMaterialDs'
  );
  const defaultSetDs = newStatusDatasource(statusitem, 'defaultSetDs');
  const synonymData = newStatusDatasource(statusitem, 'synonymdomainData');
  const woReservedItem = newDatasource(reservedItemRotatingAsset, 'reservedItemRotatingAssetJsonDS');
  sinon.stub(woReservedMaterialNonRotating, 'clearState');
  sinon.stub(woReservedMaterialNonRotating, 'resetState');
  page.registerDatasource(woReservedMaterialNonRotating);
  page.registerDatasource(reservedActualMaterialDs);
  page.registerDatasource(defaultSetDs);

  page.registerDatasource(woReservedItem);
  app.registerDatasource(synonymData);

  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);

  let items = await woReservedMaterialNonRotating.load();
  page.state.selectedReservedItems = [items[0]];

  sinon
    .stub(SynonymUtil, 'getSynonymDomain')
    .returns({ value: 'ISSUE', maxvalue: 'ISSUE', description: 'ISSUE' });
  controller.setReservedItems(items);
  let item = [items];
  item[0].isrotating = false;
  page.state.selectedReservedItems = items.item;
  expect(page.state.selectedReservedItems).toBe(items.item);

  controller.setReservedItems();
  expect(!page.state.selectedReservedItems).toBe(true);
  expect(page.state.disableReservedMaterialAction).toBe(true);

  page.state.selectedReservedItems = [];
  page.state.sendSelectedAssets = [];
  controller.setReservedItems();
  expect(page.state.disableReservedMaterialAction).toBe(true);
});

describe('sendReservedItems', () => {
  const controller = new ReserveMaterialsPageController();
  const app = new Application();
  const page = new Page({
    name: 'reserveMaterials',
    state: {
      selectedReservedItems: [],
      disableReservedMaterialAction: false,
      loadingReserverMaterials: true,
      items: {},
      rotatingItemWithNoAsset: {},
      dataFailed: false
    },
  });
  app.registerPage(page);
  app.registerController(controller);

  const woReservedMaterialNonRotating = newDatasource(workorderitem, 'woReservedMaterialNonRotating');
  const reservedActualMaterialDs = newDatasource(workorderitem, 'reservedActualMaterialDs');
  const defaultSetDs = newStatusDatasource(statusitem, 'defaultSetDs');
  const SynonymUtil = newStatusDatasource(statusitem, 'synonymdomainData');
  const woReservedItem = newDatasource(reservedItemRotatingAsset, 'reservedItemRotatingAssetJsonDS');

  page.registerDatasource(woReservedMaterialNonRotating);
  page.registerDatasource(reservedActualMaterialDs);
  page.registerDatasource(defaultSetDs);
  page.registerDatasource(woReservedItem);
  app.registerDatasource(SynonymUtil);
  app.registerController(controller);
  app.registerPage(page);

  beforeEach(async () => {
    await app.initialize();
    controller.pageInitialized(page, app);

    SynonymUtil.getSynonymDomain = jest.fn().mockResolvedValue({ maxvalue: 'ISSUE' });
    sinon.stub(controller, 'updateLocalDS');
    sinon.stub(reservedActualMaterialDs, 'bulkAdd').callsFake((payload, options, callback) => {
      callback(null, {});
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should handle the dataFailed state correctly', async () => {
    page.state.items = [
      { isrotating: true, reservedqty: 1, itemnum: 'item1', location: 'loc1', binnum: 'bin1', oplocation: 'oploc1', requestnum: 'req1', description: 'desc1', locationsdesc: 'locdesc1', invreserveid: 'inv1', storelocsiteid: 'site1', rotassetnum: 'asset1' }
    ];
    page.state.dataFailed = true;
    await controller.sendReservedItems();

    // Verify that bulkAdd are not called
    sinon.assert.calledOnce(controller.updateLocalDS);
    sinon.assert.notCalled(reservedActualMaterialDs.bulkAdd);
    expect(controller.saveDataSuccessful).toBe(false);
  });

  it('should prepare the payload and send reserved items to the server', async () => {
    page.state.items = [
      { isrotating: true, reservedqty: 1, itemnum: 'item1', location: 'loc1', binnum: 'bin1', oplocation: 'oploc1', requestnum: 'req1', description: 'desc1', locationsdesc: 'locdesc1', invreserveid: 'inv1', storelocsiteid: 'site1', rotassetnum: 'asset1' }
    ];
    page.state.dataFailed = false;
   
    await controller.sendReservedItems();
    sinon.assert.calledOnce(controller.updateLocalDS);
    sinon.assert.calledOnce(reservedActualMaterialDs.bulkAdd);

    expect(controller.saveDataSuccessful).toBe(true);
    expect(page.state.loadingReserverMaterials).toBe(false);
    expect(page.state.disableReservedMaterialAction).toBe(true);
    expect(page.state.selectedReservedItems.length).toBe(0);

    controller.onSaveDataFailed();
    expect(controller.saveDataSuccessful).toBe(false);
  });
});

it("Should handleDeleteTransaction", async () => {
  let mockSetPage = jest.fn();
  global.open = jest.fn();
  const controller = new ReserveMaterialsPageController();
  const app = new Application();
  const page = new Page({ name: "reserveMaterials" });

  const woReservedMaterialds = newDatasource(workorderitem, 'woReservedMaterialds');
  app.registerDatasource(woReservedMaterialds);
  await app.initialize();

  app.setCurrentPage = mockSetPage;
  app.currentPage = page;
  controller.pageInitialized(page, app);

  let txn = {
    app: "Application",
    href: "testhref",
  };

  await controller.handleDeleteTransaction(txn);
  await controller.handleDeleteTransaction();
});

it('should update local datasources', async () => {
  const controller = new ReserveMaterialsPageController();
  const app = new Application();
  const page = new Page({
    name: 'reserveMaterials',
    state: { dataFailed: true, itemwithZeroQty: true }
  });
  const woReservedMaterialRotating = {
    items: [
      { requestnum: '1295', reservedqty: 2, actualqty: 3 },
      { requestnum: '1296', reservedqty: 5, actualqty: 2 },
      { requestnum: '1297', reservedqty: 3, actualqty: 3 }
    ],
  };
  const selectedResItems = [{}, {}, {}]; // Simulated fake selected reserved items
  app.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  controller.pageInitialized(page, app);

  //when selected items are more than reserved quantity - data failed
  const itemToUpdate = { requestnum: '1295', actualqty: 6 };
  controller.updateLocalDS(woReservedMaterialRotating, itemToUpdate, selectedResItems);
  const updatedIndex = woReservedMaterialRotating.items.findIndex(item => item.requestnum === itemToUpdate.requestnum);
  expect(updatedIndex).toEqual(0);
  const updatedItem = woReservedMaterialRotating.items[updatedIndex];
  expect(updatedItem.reservedqty).toEqual(woReservedMaterialRotating.items[updatedIndex].reservedqty);
  expect(page.state.dataFailed).toEqual(true);

  //successfull data save, with updated reserved quantity
  const itemToUpdate2 = { requestnum: '1296', actualqty: 5 };
  controller.updateLocalDS(woReservedMaterialRotating, itemToUpdate2, selectedResItems);
  const updatedIndex2 = woReservedMaterialRotating.items.findIndex(item => item.requestnum === itemToUpdate2.requestnum);
  expect(updatedIndex2).toEqual(1);
  const updatedItem2 = woReservedMaterialRotating.items[updatedIndex2];
  expect(updatedItem2.reservedqty).toEqual(woReservedMaterialRotating.items[updatedIndex2].reservedqty);
  expect(controller.saveDataSuccessful).toBe(true);

  //check for reserved quantity for 0
  const itemToUpdate3 = { requestnum: '1297', actualqty: 3 };
  controller.updateLocalDS(woReservedMaterialRotating, itemToUpdate3, selectedResItems);
  const updatedIndex3 = woReservedMaterialRotating.items.findIndex(item => item.requestnum === itemToUpdate3.requestnum);
  const updatedItem3 = woReservedMaterialRotating.items[updatedIndex3];
  expect(updatedItem3.reservedqty).toEqual(0);
  expect(page.state.itemwithZeroQty).toBe(true);
});

it('should handle page exit correctly', async () => {
  const controller = new ReserveMaterialsPageController();
  const app = new Application();
  const page = new Page({
    name: 'reserveMaterials',
    state: { disableReservedMaterialAction: true }
  });
  app.registerController(controller);
  app.registerPage(page);
  controller.page = page;
  controller.app = app;


  const mockGetReservedRotatingAssetData = jest.spyOn(controller, 'getReservedRotatingAssetData');
  const mockShowDialog = jest.spyOn(page, 'showDialog');
  const mockNavigateBack = jest.spyOn(app, 'navigateBack');
  const mockGetLocalizedLabel = jest.spyOn(app, 'getLocalizedLabel').mockReturnValue('Test message');

  // Test with unsaved changes
  mockGetReservedRotatingAssetData.mockReturnValue([{ itemnum: 'item1', reservedqty: 5 }]);
  controller.handlePageExit();
  expect(mockShowDialog).toHaveBeenCalledWith('saveDiscardDialog_reservePage');
  expect(mockGetLocalizedLabel).toHaveBeenCalledWith('messages_save_changes', 'To leave this page, you must first discard or save your changes.');

  // Test when no unsaved changes
  page.state.disableReservedMaterialAction = true; // Set to false to test navigation
  mockGetReservedRotatingAssetData.mockReturnValue([]);
  controller.handlePageExit();
  expect(mockNavigateBack).toHaveBeenCalled();
});
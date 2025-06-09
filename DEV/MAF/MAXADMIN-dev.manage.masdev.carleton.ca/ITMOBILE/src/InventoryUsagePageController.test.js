/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2023 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import InventoryUsagePageController from "./InventoryUsagePageController";
import {
  JSONDataAdapter,
  Datasource,
  Application,
  Page,
  Dialog,
} from "@maximo/maximo-js-api";
import reservationsListDS from "./test/test-reservations-data";
import invuseListDS from "./test/test-invusage-data";
import invuseList4SavedDS from "./test/test-invusage-saved-data";
import invuseRotatingDS from "./test/test-invusage-rotating-data";
import invuseDS_txfrreqshipAll_data from "./test/test-invusage-txfrreqship-all-data";
import invuselineData from "./test/test-invuseline-data";
import invusejsonDS from "./test/test-invusejson-data";
import invusejsonDS_invalidReservedItems_data from "./test/test-invusejson-invalidReservedItems-data";
import invusejsonDS_invalidLot_data from "./test/test-invusejson-invalidLot-data";
import invusejsonDS_invalidSplit_data from "./test/test-invusejson-invalidSplit";
import invusejsonDS_InvalidAccount from "./test/test-invusejson-invalidAccount-data";
import invusejsonDS_InvalidAsset1 from "./test/test-invusejson-invalidAsset-data-1";
import invusejsonDS_InvalidAsset2 from "./test/test-invusejson-invalidAsset-data-2";
import invusejsonDS_LoadingItem_Data from "./test/test-invusejson-loadingItem-data";
import invusejsonDS_transferMaxvar_data1 from "./test/test-invusejson-txfrreqship-data-1";
import invusejsonDS_transferMaxvar_data2 from "./test/test-invusejson-txfrreqship-data-2";
import invusejsonDS_transferMaxvar_data3 from "./test/test-invusejson-txfrreqship-data-3";
import assetLookupData from "./test/asset-lookup-json-data";
import invbalances from "./test/invbal-json-data";
import invuseStatusDomainData from "./test/invbal-invusestatus-domain-data";
import invuseSplitJsonData from "./test/test-invuse-split-json-data";
import storeRoomJsonData from "./test/test-storeroom-data";
import shipmentJsonData from "./test/test-shipment-data";
import addressJsonData from "./test/test-address-data";
import personJsonData from "./test/test-person-data";

import sinon from "sinon";
import data from "./test/test-reservations-data";

function newDatasource(data = reservationsListDS, name = "reservationsListDS") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    invuseid: "invuseid",
    name: name,
  });

  return ds;
}
function newSynoTypeDatasource(
  data = invuseStatusDomainData,
  name = "synonymdomainDS_type"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    valueid: "valueid",
    name: name,
  });

  return ds;
}
function newLookupDatasource(
  data,
  name = "assetLookupDS",
  idAttribute = "assetnum"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
  });

  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name,
  });

  return ds;
}

let newInvUsage = {
  usetype: "",
  status: "",
  fromstoreloc: "",
  orgid: "",
  siteid: "",
  description: "",
  invuseline: "",
};

const itemsInvUsage = [
  {
    invuseid: 1,
    invusenum: "1234",
    itemnum: "abcd",

    siteid: "BEDFORD",
    status: "ENTERED",
    usetype: "ISSUE",
    href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
    fromstoreloc: "BEDFORD",
    orgid: "EAGLENA",
    quantity: 1,
    invuselinenum: 1,
    invuselineid: 1,
    requestnum: "2001",
    requireddate: "2023-08-11T10:13:02+08:00",
    invreserveid: "1",
    glaccount: "6000-200-000",
    glcreditacct: "6000-200-000",
    gldebitacct: "6000-200-000",
    refwo: "1006",
    item: { rotating: true },
    invreserve: [
      {
        requestedby: "MAXADMIN",
        requestnum: "1001",
        item: [
          {
            description: "Item test",
            rotating: false,
            conditionenabled: false,
          },
        ],
        requireddate: "2023-08-11T10:13:02+08:00",
        siteid: "BEDFORD",
      },
      {
        requestedby: "MAXADMIN",
        requestnum: "1002",
        item: [
          {
            rotating: false,
            conditionenabled: false,
          },
        ],
        requireddate: "2023-08-12T10:13:02+08:00",
        siteid: "BEDFORD",
      },
    ],
    invuselinesplit: [
      {
        autocreated: true,
        contentuid: "afasfaNdsff",
        quantity: 3,
        frombin: "abc",
        invuselinesplitid: 1234,
        _blkid: 1234,
      },
    ],
  },
  {
    invuseid: 2,
    invusenum: "1234",
    itemnum: "abcde",
    description: "Item test",
    siteid: "BEDFORD",
    status: "ENTERED",
    usetype: "ISSUE",
    href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
    fromstoreloc: "BEDFORD",
    orgid: "EAGLENA",
    invuselinenum: 1,
    invuselineid: 1,
    requestnum: "2002",
    taskid: "",
    invreserveid: "1",
    glaccount: "6000-200-000",
    glcreditacct: "6000-200-000",
    gldebitacct: "6000-200-000",
    refwo: "1006",
    item: { rotating: false },
    invuselinesplit: [
      {
        autocreated: true,
        contentuid: "afasfaNdsff",
        quantity: 3,
        frombin: "abc",
        invuselinesplitid: 1234,
        _blkid: 1234,
      },
    ],
  },
  {
    invuseid: 3,
    invusenum: "1234",
    itemnum: "abcde",
    description: "Item test",
    siteid: "BEDFORD",
    status: "ENTERED",
    usetype: "ISSUE",
    href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
    fromstoreloc: "BEDFORD",
    orgid: "EAGLENA",
    itemtype: "ITEM",
    invuselinenum: 1,
    invuselineid: 1,
    invreserveid: "1",
    glaccount: "6000-200-000",
    glcreditacct: "6000-200-000",
    gldebitacct: "6000-200-000",
    invuselinesplit: [
      {
        autocreated: true,
        contentuid: "afasfdsff",
        quantity: 2,
        frombin: "abc",
        invuselinesplitid: 12345,
        _blkid: 12345,
      },
    ],
  },
];

it("Page initialized", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  app.allinvuses = [];
  app.allreserveditems = [];

  page.params.itemUrl = "testsaved";
  page.params.items = itemsInvUsage;
  app.state.selectedInvUseDSName = "invUseDS";

  page.params.addingmoreitems = false;
  page.state.addingmoreitems = false;

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  await app.initialize();

  sinon.stub(invuseDS, "load").returns(invuseListDS.member);

  const invUseDS4Cal_local = newDatasource(invuseListDS, "invUseDS4Cal_local");
  invUseDS4Cal_local.registerController(controller);
  app.registerDatasource(invUseDS4Cal_local);

  const splitds = newDatasource(invusejsonDS, "invsplitjsonDS");
  page.registerDatasource(splitds);

  let appInitSpy = jest.spyOn(controller, "pageInitialized");
  const mockFn = jest.fn();

  const jsonds = newDatasource([], "jsoninusageDS");
  jsonds.registerController(controller);
  page.registerController(controller);
  page.registerDatasource(jsonds);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns([]);

  app.registerPage(page);
  app.setCurrentPage(page);

  page.setUpInitialDataSource = mockFn;
  page.params.items = itemsInvUsage;
  expect(appInitSpy).toHaveBeenCalled();
});

it("Validating setSavingProcess function", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  app.allinvuses = [];
  app.allreserveditems = [];

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  await app.initialize();

  sinon
    .stub(invuseDS, "load")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));

  page.invUsageDS = invuseDS;
  page.invUsageDS.currentItem = invuseListDS.member[0];

  const invUseDS4Cal_local = newDatasource(invuseListDS, "invUseDS4Cal_local");
  invUseDS4Cal_local.registerController(controller);
  app.registerDatasource(invUseDS4Cal_local);

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  invuseStatusDomainDS.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS);

  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const invuseStatusDomainDS_type = newSynoTypeDatasource(
    invuseStatusDomainData,
    "synonymdomainDS_type"
  );
  invuseStatusDomainDS_type.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS_type);
  sinon.stub(invuseStatusDomainDS_type, "initializeQbe");
  sinon.stub(invuseStatusDomainDS_type, "setQBE");
  sinon
    .stub(invuseStatusDomainDS_type, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const jsonds = newDatasource([], "jsoninusageDS");
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  page.invusagejsonds = jsonds;

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  controller.setSavingProcess(false);
  expect(page.state.isSaving).toBe(false);

  controller.setSavingProcess(true);
  expect(page.state.isSaving).toBe(true);

  page.state.draftInvUsage = false;
  app.currentPage.state.enableSave = true;
  controller.changeStatus("COMPLETE");

  page.state.usetype_value = "ISSUE";
  page.state.usetype_maxvalue = "ISSUE";
  controller.completeUsage();

  page.state.usetype_value = "TRANSFER";
  page.state.usetype_maxvalue = "TRANSFER";
  controller.completeUsage();
});

it("Validating setSavingProcess function 2", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  app.allinvuses = [];
  app.allreserveditems = [];

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  await app.initialize();

  sinon
    .stub(invuseDS, "load")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));

  page.invUsageDS = invuseDS;
  page.invUsageDS.currentItem = invuseListDS.member[0];

  const invUseDS4Cal_local = newDatasource(invuseListDS, "invUseDS4Cal_local");
  invUseDS4Cal_local.registerController(controller);
  app.registerDatasource(invUseDS4Cal_local);

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  invuseStatusDomainDS.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS);

  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const jsonds = newDatasource([], "jsoninusageDS");
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  page.invusagejsonds = jsonds;

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  controller.setSavingProcess(false);
  expect(page.state.isSaving).toBe(false);

  controller.setSavingProcess(true);
  expect(page.state.isSaving).toBe(true);

  sinon.stub(controller, "saveInventoryUsage").returns(false);
  page.state.draftInvUsage = false;
  page.invusagejsonds.state.itemsChanged = true;
  controller.changeStatus("COMPLETE");
});

it("Validating computeEnableSave function", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  await app.initialize();

  const invUseDS4Cal_local = newDatasource(invuseListDS, "invUseDS4Cal_local");
  invUseDS4Cal_local.registerController(controller);
  app.registerDatasource(invUseDS4Cal_local);

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  page.invusagejsonds = jsonds;

  const splitds = newDatasource(invusejsonDS, "invsplitjsonDS");
  page.registerDatasource(splitds);

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  page.state.draftInvUsage = false;

  page.invusagejsonds.__itemChanges = [
    {
      quantity: [
        { 0: { type: "update", oldValue: 1, name: "quantity", newValue: 2 } },
      ],
    },
  ];

  page.state.completedItem = false;
  page.state.usetype_value = "ISSUE";
  page.state.usetype_maxvalue = "ISSUE";
  page.state.invusagedesc = "ABC";
  page.params.description = "AB";
  jsonds.state.itemsChanged = true;
  page.state.readonlyState = false;

  controller.computeEnableSave();
  expect(page.state.enableSave).toBe(true);

  page.state.completedItem = false;
  page.state.invusagedesc = "ABC";
  page.params.description = "AB";
  jsonds.state.itemsChanged = false;
  page.state.readonlyState = false;
  controller.computeEnableSave();
  expect(page.state.enableSave).toBe(true);

  page.state.completedItem = false;
  page.state.invusagedesc = "ABC";
  page.params.description = "ABC";
  jsonds.state.itemsChanged = true;
  page.state.readonlyState = false;
  controller.computeEnableSave();
  expect(page.state.enableSave).toBe(true);

  jsonds.__itemChanges = {};
  page.state.completedItem = false;
  page.state.invusagedesc = "ABC";
  page.params.description = "ABC";
  jsonds.state.itemsChanged = false;
  page.state.readonlyState = false;
  controller.computeEnableSave();
  expect(page.state.enableSave).toBe(false);

  page.state.draftInvUsage = true;

  page.state.completedItem = false;
  page.state.invusagedesc = "ABC";
  page.state.readonlyState = false;
  controller.computeEnableSave();
  expect(page.state.enableSave).toBe(true);

  page.state.completedItem = false;
  page.state.invusagedesc = "";
  page.state.readonlyState = false;
  controller.computeEnableSave();
  expect(page.state.enableSave).toBe(false);

  page.state.completedItem = true;
  page.state.invusagedesc = "ABC";
  page.state.readonlyState = false;
  controller.computeEnableSave();
  expect(page.state.enableSave).toBe(false);

  page.state.completedItem = true;
  page.state.invusagedesc = "ABC";
  page.state.readonlyState = true;
  controller.computeEnableSave();
  expect(page.state.enableSave).toBe(false);

  page.state.draftInvUsage = false;
  page.invusagejsonds.__itemChanges = {
    1: {
      wonum: [
        {
          name: "wonum",
          newValue: "L1204",
          type: "add",
          object: {
            enteredastask: false,
            itemnum: "DITEM-01",
            wonum: "L1204",
            refwo: "L1204",
          },
        },
      ],
    },
  };
  controller.hasRealChangesOnJSONDS();
});

it("validate all the line with the different tosite for ship 1", async () => {
  const app = new Application();
  app.state.selectedInvUseDSName = "invUseDS";

  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  page.params.items = itemsInvUsage;
  const mockFn = jest.fn();
  page.showDialog = mockFn;

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);
  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  await app.initialize();
  await invuseDS.load();
  await jsonds.load();

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  controller.doShip();
});

it("validate all the line with the same tosite for ship 2", async () => {
  const app = new Application();
  app.state.selectedInvUseDSName = "invUseDS";
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  page.params.items = itemsInvUsage;
  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  const shipmentDS = newDatasource(shipmentJsonData, "shipmentDS");
  shipmentDS.registerController(controller);
  page.registerDatasource(shipmentDS);

  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  let items = JSON.parse(JSON.stringify(invusejsonDS.member));
  items.pop();
  sinon.stub(jsonds, "getItems").returns(items);
  await app.initialize();
  await invuseDS.load();
  await jsonds.load();

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  controller.doShip();
});

it("validateInput function should validate if all mandatory fields were filled", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  const invuseStatusDomainDS_type = newSynoTypeDatasource(
    invuseStatusDomainData,
    "synonymdomainDS_type"
  );
  invuseStatusDomainDS_type.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS_type);
  sinon.stub(invuseStatusDomainDS_type, "initializeQbe");
  sinon.stub(invuseStatusDomainDS_type, "setQBE");
  sinon
    .stub(invuseStatusDomainDS_type, "searchQBE")
    .returns(invuseStatusDomainData.member);
  page.params.itemUrl = "testsaved";
  page.params.items = itemsInvUsage;
  app.state.selectedInvUseDSName = "invUseDS";

  app.allinvuses = [];
  app.allreserveditems = [];

  page.state.addingmoreitems = false;

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await app.initialize();
  await jsonds.load();

  controller.validateInput(jsonds.getItems()[4]);

  controller.validateInput(jsonds.getItems()[2]);
  expect(jsonds.getItems()[2].haswarning).toBe(true);

  controller.validateInput(jsonds.getItems()[3]);
  expect(jsonds.getItems()[3].haswarning).toBe(true);

  controller.validateInput(jsonds.getItems()[0]);
  expect(jsonds.getItems()[0].haswarning).toBe(false);

  page.state.usetype_value = "TRANSFER";
  page.state.usetype_maxvalue = "TRANSFER";

  controller.validateInput(jsonds.getItems()[4]);

  controller.validateInput(jsonds.getItems()[2]);
  expect(jsonds.getItems()[2].haswarning).toBe(true);

  controller.validateInput(jsonds.getItems()[3]);
  expect(jsonds.getItems()[3].haswarning).toBe(true);

  controller.validateInput(jsonds.getItems()[0]);
  expect(jsonds.getItems()[0].haswarning).toBe(false);

  let ds = {
    items: [
      {
        invuseid: 1,
        invusenum: "1234",
        description: "Item test",
        siteid: "BEDFORD",
        status: "ENTERED",
        usetype: "ISSUE",
        href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
        fromstoreloc: "BEDFORD",
        orgid: "EAGLENA",
        quantity: 1,
        invuselinenum: 1,
        invuselineid: 1,
        anywhererefid: 1,
        item: [
          {
            lottype: "NOLOT",
            lottype_maxvalue: "NOLOT",
          },
        ],
        invuselinesplit: [
          {
            autocreated: true,
            contentuid: "afasfaNdsff",
            quantity: 3,
            frombin: "abc",
            invuselinesplitid: 1234,
            _blkid: 1234,
          },
        ],
        requestnum: "1001",
        invreserveid: "1",
        calqty: 1,
        glcreditacct: "6000-200-000",
        gldebitacct: "6000-200-000",
        refwo: "1006",
      },
      {
        invuseid: 2,
        invusenum: "5678",
        description: "Item test2",
        siteid: "BEDFORD",
        status: "ENTERED",
        usetype: "ISSUE",
        href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JF",
        fromstoreloc: "BEDFORD",
        orgid: "EAGLENA",
        quantity: 1,
        invuselinenum: 2,
        invuselineid: 2,
        anywhererefid: 2,
        requestnum: "1002",
        invreserveid: "2",
        glcreditacct: "6000-200-000",
        gldebitacct: "6000-200-000",
        refwo: "1006",
        fromlot: "abc",
        item: [
          {
            lottype: "NOLOT",
            lottype_maxvalue: "NOLOT",
          },
        ],
      },
    ],
  };
  let msgDS = {
    clearState: () => {},
    resetState: () => {},
    load: () => {},
    dataAdapter: {},
  };
  app.findDatasource = (name) => (name === "jsoninusageDS" ? ds : msgDS);

  app.client = {
    userInfo: {
      defaultSite: "BEDFORD",
    },
  };

  expect(controller.validateInvUsage()).toBe(false);

  ds = {
    items: [
      {
        invuseid: 1,
        invusenum: "1234",
        description: "Item test",
        siteid: "BEDFORD",
        status: "ENTERED",
        usetype: "ISSUE",
        href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
        fromstoreloc: "BEDFORD",
        orgid: "EAGLENA",
        quantity: 1,
        invuselinenum: 1,
        invuselineid: 1,
        anywhererefid: 1,
        item: {
          lottype: "NOLOT",
          lottype_maxvalue: "NOLOT",
        },
        requestnum: "1001",
        invreserveid: "1",
        calqty: 1,
        glcreditacct: "6000-200-000",
        gldebitacct: "6000-200-000",
        refwo: "1006",
        tositeid: "NEWSITE",
        tostoreloc: "NEWSTOREROOM",
        tobin: "NEWBIN",
      },
      {
        invuseid: 2,
        invusenum: "5678",
        description: "Item test2",
        siteid: "BEDFORD",
        status: "ENTERED",
        usetype: "ISSUE",
        href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JF",
        fromstoreloc: "BEDFORD",
        orgid: "EAGLENA",
        quantity: 1,
        invuselinenum: 2,
        invuselineid: 2,
        anywhererefid: 2,
        requestnum: "1002",
        invreserveid: "2",
        glcreditacct: "6000-200-000",
        gldebitacct: "6000-200-000",
        refwo: "1006",
        fromlot: "abc",
        tositeid: "NEWSITE2",
        tostoreloc: "NEWSTOREROOM2",
        tobin: "NEWBIN2",
      },
    ],
  };

  expect(controller.validateInvUsage()).toBe(true);

  controller.app.client = {
    userInfo: {
      defaultSite: "NEWTEST",
    },
  };

  app.getLocalizedLabel = () => "test";
  ds.items[0].tobin = "12345670000890";
  expect(controller.validateInvUsage()).toBe(false);

  ds.items[0].tobin = "bin1";
  expect(controller.validateInvUsage()).toBe(true);

  controller.app.client = {
    userInfo: {
      defaultSite: "BEDFORD",
    },
  };

  ds = {
    items: [
      {
        invuseid: 1,
        invusenum: "1234",
        description: "Item test",
        siteid: "BEDFORD",
        status: "ENTERED",
        usetype: "ISSUE",
        href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
        fromstoreloc: "BEDFORD",
        orgid: "EAGLENA",
        quantity: 1,
        invuselinenum: 1,
        invuselineid: 1,
        anywhererefid: 1,
        item: {
          lottype: "NOLOT",
          lottype_maxvalue: "NOLOT",
        },
        requestnum: "1001",
        invreserveid: "1",
        calqty: 1,
        glcreditacct: "6000-200-000",
        gldebitacct: "6000-200-000",
        refwo: "1006",
        tositeid: "NEWSITE",
        tostoreloc: "NEWSTOREROOM",
        tobin: "NEWBIN",
      },
      {
        invuseid: 2,
        invusenum: "5678",
        description: "Item test2",
        siteid: "BEDFORD",
        status: "ENTERED",
        usetype: "ISSUE",
        href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JF",
        fromstoreloc: "BEDFORD",
        orgid: "EAGLENA",
        quantity: 1,
        invuselinenum: 2,
        invuselineid: 2,
        anywhererefid: 2,
        requestnum: "1002",
        invreserveid: "2",
        glcreditacct: "6000-200-000",
        gldebitacct: "6000-200-000",
        refwo: "1006",
        fromlot: "abc",
        tositeid: "NEWSITE2",
        tostoreloc: "NEWSTOREROOM2",
        tobin: "NEWBIN2",
        item: { conditionenabled: true },
      },
    ],
  };

  expect(controller.validateInvUsage()).toBe(false);

  ds = {
    items: [
      {
        invuseid: 1,
        invusenum: "1234",
        description: "Item test",
        siteid: "BEDFORD",
        status: "ENTERED",
        usetype: "ISSUE",
        href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
        fromstoreloc: "BEDFORD",
        orgid: "EAGLENA",
        quantity: 1,
        invuselinenum: 1,
        invuselineid: 1,
        anywhererefid: 1,
        lottype: "NOLOT",
        lottype_maxvalue: "NOLOT",
        requestnum: "1001",
        invreserveid: "1",
        calqty: 1,
        glcreditacct: "6000-200-000",
        gldebitacct: "6000-200-000",
        refwo: "1006",
        tositeid: "NEWSITE",
        tostoreloc: "NEWSTOREROOM",
        tobin: "NEWBIN",
      },
      {
        invuseid: 2,
        invusenum: "5678",
        description: "Item test2",
        siteid: "BEDFORD",
        status: "ENTERED",
        usetype: "ISSUE",
        href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JF",
        fromstoreloc: "BEDFORD",
        orgid: "EAGLENA",
        quantity: 1,
        invuselinenum: 2,
        invuselineid: 2,
        anywhererefid: 2,
        requestnum: "1002",
        invreserveid: "2",
        glcreditacct: "6000-200-000",
        gldebitacct: "6000-200-000",
        refwo: "1006",
        fromlot: "abc",
        tositeid: "NEWSITE2",
        tostoreloc: "NEWSTOREROOM2",
        tobin: "NEWBIN2",
        item: { conditionenabled: true },
        fromconditioncode: "NEWCOND",
        toconditioncode: "NEWCOND",
      },
    ],
  };

  expect(controller.validateInvUsage()).toBe(true);

  ds = {
    items: [
      {
        invuseid: 1,
        invusenum: "1234",
        description: "Item test",
        siteid: "BEDFORD",
        status: "ENTERED",
        usetype: "ISSUE",
        href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
        fromstoreloc: "BEDFORD",
        orgid: "EAGLENA",
        quantity: 1,
        invuselinenum: 1,
        invuselineid: 1,
        anywhererefid: 1,
        item: {
          lottype: "LOT",
          lottype_maxvalue: "LOT",
        },
        requestnum: "1001",
        invreserveid: "1",
        calqty: 1,
        glcreditacct: "6000-200-000",
        gldebitacct: "6000-200-000",
        refwo: "1006",
        tositeid: "NEWSITE",
        tostoreloc: "NEWSTOREROOM",
        tobin: "NEWBIN",
      },
      {
        invuseid: 2,
        invusenum: "5678",
        description: "Item test2",
        siteid: "BEDFORD",
        status: "ENTERED",
        usetype: "ISSUE",
        href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JF",
        fromstoreloc: "BEDFORD",
        orgid: "EAGLENA",
        quantity: 1,
        invuselinenum: 2,
        invuselineid: 2,
        anywhererefid: 2,
        requestnum: "1002",
        invreserveid: "2",
        glcreditacct: "6000-200-000",
        gldebitacct: "6000-200-000",
        refwo: "1006",
        fromlot: "abc",
        tositeid: "NEWSITE2",
        tostoreloc: "NEWSTOREROOM2",
        tobin: "NEWBIN2",
        item: { conditionenabled: true },
        fromconditioncode: "NEWCOND",
      },
    ],
  };

  expect(controller.validateInvUsage()).toBe(false);

  ds = {
    items: [
      {
        invuseid: 1,
        invusenum: "1234",
        description: "Item test",
        siteid: "BEDFORD",
        status: "ENTERED",
        usetype: "ISSUE",
        href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
        fromstoreloc: "BEDFORD",
        orgid: "EAGLENA",
        quantity: 1,
        invuselinenum: 1,
        invuselineid: 1,
        anywhererefid: 1,
        item: {
          lottype: "LOT",
          lottype_maxvalue: "LOT",
        },
        requestnum: "1001",
        invreserveid: "1",
        calqty: 1,
        glcreditacct: "6000-200-000",
        gldebitacct: "6000-200-000",
        refwo: "1006",
        tositeid: "NEWSITE",
        tostoreloc: "NEWSTOREROOM",
        tobin: "NEWBIN",
        fromlot: "NEWLOT",
        tolot: "NEWtolot",
      },
      {
        invuseid: 2,
        invusenum: "5678",
        description: "Item test2",
        siteid: "BEDFORD",
        status: "ENTERED",
        usetype: "ISSUE",
        href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JF",
        fromstoreloc: "BEDFORD",
        orgid: "EAGLENA",
        quantity: 1,
        invuselinenum: 2,
        invuselineid: 2,
        anywhererefid: 2,
        requestnum: "1002",
        invreserveid: "2",
        glcreditacct: "6000-200-000",
        gldebitacct: "6000-200-000",
        refwo: "1006",
        fromlot: "abc",
        tositeid: "NEWSITE2",
        tostoreloc: "NEWSTOREROOM2",
        tobin: "NEWBIN2",
        item: { conditionenabled: true },
        fromconditioncode: "NEWCOND",
        toconditioncode: "NEWCOND",
      },
    ],
  };

  expect(controller.validateInvUsage()).toBe(true);

  page.state.usetype_value = "ISSUE";
  page.state.usetype_maxvalue = "ISSUE";
  ds = {
    items: [
      {
        invuseid: 1,
        invusenum: "1234",
        description: "Item test",
        siteid: "BEDFORD",
        status: "ENTERED",
        usetype: "ISSUE",
        href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
        fromstoreloc: "BEDFORD",
        orgid: "EAGLENA",
        quantity: 1,
        invuselinenum: 1,
        invuselineid: 1,
        anywhererefid: 1,
        item: {
          rotating: true,
          lottype: "NOLOT",
          lottype_maxvalue: "NOLOT",
        },
        requestnum: "1001",
        invreserveid: "1",
        calqty: 1,
        glcreditacct: "6000-200-000",
        gldebitacct: "6000-200-000",
        refwo: "1006",
        tositeid: "NEWSITE",
        tostoreloc: "NEWSTOREROOM",
        tobin: "NEWBIN",
      },
      {
        invuseid: 2,
        invusenum: "5678",
        description: "Item test2",
        siteid: "BEDFORD",
        status: "ENTERED",
        usetype: "ISSUE",
        href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JF",
        fromstoreloc: "BEDFORD",
        orgid: "EAGLENA",
        quantity: 1,
        invuselinenum: 2,
        invuselineid: 2,
        anywhererefid: 2,
        requestnum: "1002",
        invreserveid: "2",
        glcreditacct: "6000-200-000",
        gldebitacct: "6000-200-000",
        refwo: "1006",
        fromlot: "abc",
        tositeid: "NEWSITE2",
        tostoreloc: "NEWSTOREROOM2",
        tobin: "NEWBIN2",
      },
    ],
  };

  expect(controller.validateInvUsage()).toBe(false);
  ds.items[1].location = "l1";
  ds.items[0].location = "l2";
  expect(controller.validateInvUsage()).toBe(true);

  ds.items[1].linetype = "TOOL";
  expect(controller.validateInvUsage()).toBe(false);
  ds.items[1].issueto = "p1";
  ds.items[0].issueto = "p2";
  expect(controller.validateInvUsage()).toBe(true);

  controller.onWonumTaskIdChange(ds.items[1]);
});

it("saveInventoryUsage function should save the items - when checking isReservedItems", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  invuseStatusDomainDS.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const invuseStatusDomainDS_type = newSynoTypeDatasource(
    invuseStatusDomainData,
    "synonymdomainDS_type"
  );
  invuseStatusDomainDS_type.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS_type);
  sinon.stub(invuseStatusDomainDS_type, "initializeQbe");
  sinon.stub(invuseStatusDomainDS_type, "setQBE");
  sinon
    .stub(invuseStatusDomainDS_type, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  sinon.stub(invuseDS, "addNew").returns(newInvUsage);
  sinon
    .stub(invuseDS, "load")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon.stub(invuseDS, "getSchema").returns(null);
  sinon.stub(invuseDS, "initializeQbe");
  sinon.stub(invuseDS, "clearChanges");

  controller.invUsageDS = invuseDS;

  const jsonds = newDatasource(
    invusejsonDS_invalidReservedItems_data,
    "jsoninusageDS"
  );
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon.stub(jsonds, "addNew").returns({});
  sinon
    .stub(jsonds, "load")
    .returns(invusejsonDS_invalidReservedItems_data.member);
  sinon
    .stub(jsonds, "getItems")
    .returns(invusejsonDS_invalidReservedItems_data.member);

  page.invusagejsonds = jsonds;

  await app.initialize();
  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await invuseDS.load();
  await jsonds.load();

  page.state.draftInvUsage = true;

  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  invusejsonDS.member[0].invuselinesplit[0].quantity = 1;
  page.state.draftInvUsage = true;
  app.device.isMaximoMobile = true;
  invuseDS.__itemChanges = { 163: {} };
  await controller.saveInventoryUsage();

  page.state.usetype_value = "TRANSFER";
  page.state.usetype_maxvalue = "TRANSFER";
  const mockCallBack = jest.fn();
  page.showDialog = mockCallBack;
  app.client = {
    userInfo: {
      defaultSite: "BEDFORD",
    },
  };
  await controller.saveInventoryUsage();
  expect(mockCallBack.mock.calls).toHaveLength(1);
});

it("saveInventoryUsage function should save the items - when checking getLinesOfInvalidGLAccount", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  sinon.stub(invuseDS, "addNew").returns(newInvUsage);
  sinon
    .stub(invuseDS, "load")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon.stub(invuseDS, "getSchema").returns(null);
  sinon.stub(invuseDS, "initializeQbe");
  sinon.stub(invuseDS, "clearChanges");

  controller.invUsageDS = invuseDS;

  const jsonds = newDatasource(invusejsonDS_InvalidAccount, "jsoninusageDS");
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS_InvalidAccount.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS_InvalidAccount.member);

  page.invusagejsonds = jsonds;

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  invuseStatusDomainDS.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const invuseStatusDomainDS_type = newSynoTypeDatasource(
    invuseStatusDomainData,
    "synonymdomainDS_type"
  );
  invuseStatusDomainDS_type.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS_type);
  sinon.stub(invuseStatusDomainDS_type, "initializeQbe");
  sinon.stub(invuseStatusDomainDS_type, "setQBE");
  sinon
    .stub(invuseStatusDomainDS_type, "searchQBE")
    .returns(invuseStatusDomainData.member);

  await app.initialize();
  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await invuseDS.load();
  await jsonds.load();

  page.state.draftInvUsage = true;

  const mockCallBack = jest.fn();
  controller.triggerSaveProcess = mockCallBack;

  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  invusejsonDS.member[0].invuselinesplit[0].quantity = 1;
  page.state.draftInvUsage = true;
  app.device.isMaximoMobile = true;
  invuseDS.__itemChanges = { 163: {} };
  await controller.saveInventoryUsage();
});

it("saveInventoryUsage function should save the items - when checking split", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  sinon.stub(invuseDS, "addNew").returns(newInvUsage);
  sinon
    .stub(invuseDS, "load")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon.stub(invuseDS, "getSchema").returns(null);
  sinon.stub(invuseDS, "initializeQbe");
  sinon.stub(invuseDS, "clearChanges");

  controller.invUsageDS = invuseDS;

  const jsonds = newDatasource(invusejsonDS_invalidSplit_data, "jsoninusageDS");
  page.registerDatasource(jsonds);
  await app.initialize();

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS_invalidSplit_data.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS_invalidSplit_data.member);

  controller.invusagejsonds = jsonds;

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  invuseStatusDomainDS.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const invuseStatusDomainDS_type = newSynoTypeDatasource(
    invuseStatusDomainData,
    "synonymdomainDS_type"
  );
  invuseStatusDomainDS_type.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS_type);
  sinon.stub(invuseStatusDomainDS_type, "initializeQbe");
  sinon.stub(invuseStatusDomainDS_type, "setQBE");
  sinon
    .stub(invuseStatusDomainDS_type, "searchQBE")
    .returns(invuseStatusDomainData.member);

  await app.initialize();
  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await invuseDS.load();
  await jsonds.load();

  page.state.draftInvUsage = true;

  const mockCallBack = jest.fn();
  controller.triggerSaveProcess = mockCallBack;

  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  //invusejsonDS.member[0].invuselinesplit[0].quantity = 1;
  page.state.draftInvUsage = true;
  app.device.isMaximoMobile = true;
  invuseDS.__itemChanges = { 163: {} };
  await controller.saveInventoryUsage();
});

it("saveInventoryUsage function should save the items - when checking validateRotatingAssets - 1", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  sinon.stub(invuseDS, "addNew").returns(newInvUsage);
  sinon
    .stub(invuseDS, "load")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon.stub(invuseDS, "getSchema").returns(null);
  sinon.stub(invuseDS, "initializeQbe");
  sinon.stub(invuseDS, "clearChanges");

  controller.invUsageDS = invuseDS;

  const jsonds = newDatasource(invusejsonDS_InvalidAsset1, "jsoninusageDS");
  page.registerDatasource(jsonds);
  await app.initialize();

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS_InvalidAsset1.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS_InvalidAsset1.member);

  controller.invusagejsonds = jsonds;

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  invuseStatusDomainDS.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const invuseStatusDomainDS_type = newSynoTypeDatasource(
    invuseStatusDomainData,
    "synonymdomainDS_type"
  );
  invuseStatusDomainDS_type.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS_type);
  sinon.stub(invuseStatusDomainDS_type, "initializeQbe");
  sinon.stub(invuseStatusDomainDS_type, "setQBE");
  sinon
    .stub(invuseStatusDomainDS_type, "searchQBE")
    .returns(invuseStatusDomainData.member);

  await app.initialize();
  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await invuseDS.load();
  await jsonds.load();

  page.state.draftInvUsage = true;

  const mockCallBack = jest.fn();
  controller.triggerSaveProcess = mockCallBack;

  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  //invusejsonDS.member[0].invuselinesplit[0].quantity = 1;
  page.state.draftInvUsage = true;
  app.device.isMaximoMobile = true;
  invuseDS.__itemChanges = { 163: {} };
  await controller.saveInventoryUsage();
});

it("saveInventoryUsage function should save the items - when checking lot and lottype", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  sinon.stub(invuseDS, "addNew").returns(newInvUsage);
  sinon
    .stub(invuseDS, "load")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon.stub(invuseDS, "getSchema").returns(null);
  sinon.stub(invuseDS, "initializeQbe");
  sinon.stub(invuseDS, "clearChanges");

  controller.invUsageDS = invuseDS;

  const jsonds = newDatasource(invusejsonDS_invalidLot_data, "jsoninusageDS");
  page.registerDatasource(jsonds);
  await app.initialize();

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS_invalidLot_data.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS_invalidLot_data.member);

  controller.invusagejsonds = jsonds;

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  invuseStatusDomainDS.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const invuseStatusDomainDS_type = newSynoTypeDatasource(
    invuseStatusDomainData,
    "synonymdomainDS_type"
  );
  invuseStatusDomainDS_type.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS_type);
  sinon.stub(invuseStatusDomainDS_type, "initializeQbe");
  sinon.stub(invuseStatusDomainDS_type, "setQBE");
  sinon
    .stub(invuseStatusDomainDS_type, "searchQBE")
    .returns(invuseStatusDomainData.member);

  await app.initialize();
  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await invuseDS.load();
  await jsonds.load();

  page.state.draftInvUsage = true;

  const mockCallBack = jest.fn();
  controller.triggerSaveProcess = mockCallBack;

  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  //invusejsonDS.member[0].invuselinesplit[0].quantity = 1;
  page.state.draftInvUsage = true;
  app.device.isMaximoMobile = true;
  invuseDS.__itemChanges = { 163: {} };
  await controller.saveInventoryUsage();
});

it("saveInventoryUsage function should save the items - when checking validateRotatingAssets - 2", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  sinon.stub(invuseDS, "addNew").returns(newInvUsage);
  sinon
    .stub(invuseDS, "load")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon.stub(invuseDS, "getSchema").returns(null);
  sinon.stub(invuseDS, "initializeQbe");
  sinon.stub(invuseDS, "clearChanges");

  controller.invUsageDS = invuseDS;

  const jsonds = newDatasource(invusejsonDS_InvalidAsset2, "jsoninusageDS");
  page.registerDatasource(jsonds);
  await app.initialize();

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS_InvalidAsset2.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS_InvalidAsset2.member);

  controller.invusagejsonds = jsonds;

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  invuseStatusDomainDS.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const invuseStatusDomainDS_type = newSynoTypeDatasource(
    invuseStatusDomainData,
    "synonymdomainDS_type"
  );
  invuseStatusDomainDS_type.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS_type);
  sinon.stub(invuseStatusDomainDS_type, "initializeQbe");
  sinon.stub(invuseStatusDomainDS_type, "setQBE");
  sinon
    .stub(invuseStatusDomainDS_type, "searchQBE")
    .returns(invuseStatusDomainData.member);

  await app.initialize();
  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await invuseDS.load();
  await jsonds.load();

  page.state.draftInvUsage = true;

  const mockCallBack = jest.fn();
  controller.triggerSaveProcess = mockCallBack;

  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  //invusejsonDS.member[0].invuselinesplit[0].quantity = 1;
  page.state.draftInvUsage = true;
  app.device.isMaximoMobile = true;
  invuseDS.__itemChanges = { 163: {} };
  await controller.saveInventoryUsage();
});

it("saveInventoryUsage function should save the items - normal checking", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  invuseStatusDomainDS.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const invuseStatusDomainDS_type = newSynoTypeDatasource(
    invuseStatusDomainData,
    "synonymdomainDS_type"
  );
  invuseStatusDomainDS_type.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS_type);
  sinon.stub(invuseStatusDomainDS_type, "initializeQbe");
  sinon.stub(invuseStatusDomainDS_type, "setQBE");
  sinon
    .stub(invuseStatusDomainDS_type, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  app.client = {
    userInfo: {
      personid: "SAM",
      defaultStoreroom: "UPS",
      defaultStoreroomSite: "CENTRAL",
      defaultOrg: "EAGLENA",
    },
    restclient: {
      get: function () {
        return new Promise(function (resolve) {
          resolve({ defaultStoreroom: "CENTRAL" });
        });
      },
    },
  };

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  sinon.stub(invuseDS, "addNew").returns(newInvUsage);
  sinon
    .stub(invuseDS, "load")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon.stub(invuseDS, "getSchema").returns(null);
  sinon.stub(invuseDS, "initializeQbe");
  sinon.stub(invuseDS, "clearChanges");

  page.invUsageDS = invuseDS;

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  controller.invusagejsonds = jsonds;

  await app.initialize();
  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await invuseDS.load();
  await jsonds.load();

  page.state.draftInvUsage = false;

  const mockCallBack = jest.fn();
  controller.triggerSaveProcess = mockCallBack;

  //const mockvalidateRotatingAssets = jest.fn();
  //controller.validateRotatingAssets = mockvalidateRotatingAssets;
  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  await controller.onCustomSaveTransition("test");
  invusejsonDS.member[0].invuselinesplit[0].quantity = 1;
  page.state.draftInvUsage = true;
  app.device.isMaximoMobile = true;
  invuseDS.__itemChanges = { 163: {} };

  await controller.saveInventoryUsage(true);
  await controller.saveInventoryUsage(false);
  //expect(mockCallBack.mock.calls).toHaveLength(1);

  invusejsonDS.member[0].invuselinesplit[0].contentuid = "";
  page.state.invusagedesc = "abc";
  page.state.draftInvUsage = false;

  controller.invUsageDS = invuseDS;
  page.invUsageDS.__itemChanges = [
    {
      quantity: [
        { 0: { type: "update", oldValue: 1, name: "quantity", newValue: 2 } },
      ],
    },
  ];

  invuseDS.currentItem = JSON.parse(JSON.stringify(invuseListDS.member[0]));

  await controller.saveInventoryUsage();

  if (
    controller.invusagejsonds.items &&
    controller.invusagejsonds.items.length > 0
  ) {
    controller.invusagejsonds.items[0].refwo = undefined;
  }

  await controller.saveInventoryUsage();

  app.allinvuses = invusejsonDS.member;

  controller.updateAppInvUseLines(
    JSON.parse(JSON.stringify(invuseListDS.member[0])),
    false
  );
});

it("triggerSaveProcess function path 1", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  sinon.stub(invuseDS, "addNew").returns(newInvUsage);
  sinon
    .stub(invuseDS, "load")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon
    .stub(invuseDS, "save")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon.stub(invuseDS, "getSchema").returns(null);
  sinon.stub(invuseDS, "initializeQbe");

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  const splitds = newDatasource(invusejsonDS, "invsplitjsonDS");
  page.registerDatasource(splitds);
  splitds.state.itemsChanged = true;

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  await app.initialize();
  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await invuseDS.load();
  await jsonds.load();

  page.state.draftInvUsage = false;

  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  invuseDS.currentItem = JSON.parse(JSON.stringify(invuseListDS.member[0]));
  page.state.invusagedesc = "abc";
  await controller.triggerSaveProcess(invuseDS);
});

it("triggerSaveProcess function path 2", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  sinon.stub(invuseDS, "addNew").returns(newInvUsage);
  sinon
    .stub(invuseDS, "load")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon.stub(invuseDS, "save").returns({ error: "error" });
  sinon.stub(invuseDS, "getSchema").returns(null);
  sinon.stub(invuseDS, "initializeQbe");

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  const splitds = newDatasource(invusejsonDS, "invsplitjsonDS");
  page.registerDatasource(splitds);
  splitds.state.itemsChanged = true;

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  await app.initialize();
  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await invuseDS.load();
  await jsonds.load();

  page.state.draftInvUsage = false;

  app.allinvuses_local = [];
  app.allinvuses = [];

  invuseDS.currentItem = JSON.parse(JSON.stringify(invuseListDS.member[0]));
  page.state.invusagedesc = "abc";
  await controller.triggerSaveProcess(invuseDS);
});

it("triggerSaveProcess function path 3", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  const invuseListDSNewMember = JSON.parse(JSON.stringify(invuseListDS.member));

  sinon.stub(invuseDS, "addNew").returns(newInvUsage);
  sinon.stub(invuseDS, "load").returns(invuseListDSNewMember);
  sinon.stub(invuseDS, "getItems").returns(invuseListDSNewMember);
  sinon.stub(invuseDS, "save").returns({});
  sinon.stub(invuseDS, "getSchema").returns(null);
  sinon.stub(invuseDS, "initializeQbe");
  //invuseListDSNewMember[0].invuseline[0].invuselinesplit[0].autocreated = false;

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  const splitds = newDatasource(invusejsonDS, "invsplitjsonDS");
  page.registerDatasource(splitds);
  splitds.state.itemsChanged = true;

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  await app.initialize();
  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await invuseDS.load();
  await jsonds.load();

  page.state.draftInvUsage = false;

  app.allinvuses_local = [];
  app.allinvuses = [];

  invuseDS.currentItem = invuseListDSNewMember[0];
  page.state.invusagedesc = "abc";
  await controller.triggerSaveProcess(invuseDS);
});

it("triggerSaveProcess function path 4", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  const invuseListDSNewMember = JSON.parse(JSON.stringify(invuseListDS.member));

  sinon.stub(invuseDS, "addNew").returns(newInvUsage);
  sinon.stub(invuseDS, "load").returns(invuseListDSNewMember);
  sinon.stub(invuseDS, "getItems").returns(invuseListDSNewMember);
  sinon.stub(invuseDS, "save").returns({});
  sinon.stub(invuseDS, "getSchema").returns(null);
  sinon.stub(invuseDS, "initializeQbe");

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  const splitds = newDatasource(invusejsonDS, "invsplitjsonDS");
  page.registerDatasource(splitds);
  splitds.state.itemsChanged = true;

  page.params.itemUrl = "";
  app.state.selectedInvUseDSName = "invUseDS";

  await app.initialize();
  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await invuseDS.load();
  await jsonds.load();

  page.state.draftInvUsage = false;

  app.allinvuses_local = [];
  app.allinvuses = [];

  invuseDS.currentItem = invuseListDSNewMember[0];
  page.state.invusagedesc = "abc";
  await controller.triggerSaveProcess(invuseDS);
});

it("removeLineItem function should delete an item in the datasource - for an un-saved inventory usage record.", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";
  app.allinvuses = [];
  app.allreserveditems = [];

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  jsonds.registerController(controller);
  app.registerDatasource(jsonds);
  page.registerDatasource(jsonds);
  await app.initialize();

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(jsonds, "load").returns(invusejsonDS.member);

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  const mockCallBack = jest.fn();
  jsonds.deleteItem = mockCallBack;

  page.state.draftInvUsage = true;

  await jsonds.load();

  page.state.itemsInvUsage = itemsInvUsage;

  page.state.enableSave = true;
  page.state.invalidInput = {};
  page.state.invalidInput.add = jest.fn();
  page.state.invalidInput.delete = jest.fn();
  page.state.invalidInvUsage = {};
  page.state.invalidInvUsage.add = jest.fn();
  page.state.invalidInvUsage.delete = jest.fn();
  controller.showDelConfirmation(jsonds.getItems()[0]);

  await controller.onUserConfirmationYes();

  expect(mockCallBack.mock.calls).toHaveLength(1);

  await controller.onUserConfirmationNo();
});

it("removeLineItem function should delete an item in the datasource - for a saved inventory usage record.", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.itemUrl = "testsaved";

  const invuselineDS = newDatasource(invuselineData, "invuselineDS");
  invuselineDS.registerController(controller);
  app.registerDatasource(invuselineDS);
  sinon.stub(invuselineDS, "load").returns(invuselineData.member);

  const invuseDS = newDatasource(invuseList4SavedDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);

  sinon.stub(invuseDS, "load").returns(invuseList4SavedDS.member);
  sinon.stub(invuseDS, "getItems").returns(invuseList4SavedDS.member);
  sinon.stub(invuseDS, "getChildDatasource").returns(invuselineDS);

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  jsonds.registerController(controller);
  app.registerDatasource(jsonds);
  page.registerDatasource(jsonds);

  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(jsonds, "load").returns(invusejsonDS.member);

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  app.allinvuses = [];
  app.allreserveditems = [];

  await app.initialize();
  await invuselineDS.load();
  await invuseDS.load();
  await jsonds.load();

  const mockCallBack = jest.fn();
  invuselineDS.deleteItems = mockCallBack;

  page.state.draftInvUsage = false;

  page.invuselines = invuseDS.getItems()[0].invuseline;
  app.device.isMaximoMobile = true;

  page.state.itemsInvUsage = itemsInvUsage;

  app.allinvuses = invusejsonDS.member;

  await controller.removeLineItem(invuseDS.getItems()[0].invuseline[0]);
  expect(mockCallBack.mock.calls).toHaveLength(1);

  app.device.isMaximoMobile = false;
  invuseDS.getItems()[0].href = "test";
  await controller.removeLineItem(invuseDS.getItems()[0].invuseline[0]);

  app.device.isMaximoMobile = false;
  await controller.removeLineItem(page.invuselines[1]);
  app.device.isMaximoMobile = false;
  await controller.removeLineItem(page.invuselines[1]);
});

it("loadNewInventoryUsage function", async () => {
  const app = new Application();
  const page = new Page({
    name: "invUsage",
  });

  page.params.itemUrl = "testsaved";
  page.params.items = itemsInvUsage;
  app.state.selectedInvUseDSName = "invUseDS";

  page.state.addingmoreitems = false;

  const controller = new InventoryUsagePageController();

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  sinon.stub(invuseDS, "load").returns(invuseListDS.member);
  await app.initialize();
  page.invUsageDS = invuseDS;

  const invUseDS4Cal_local = newDatasource(invuseListDS, "invUseDS4Cal_local");
  invUseDS4Cal_local.registerController(controller);
  app.registerDatasource(invUseDS4Cal_local);

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  jsonds.registerController(controller);
  app.registerDatasource(jsonds);
  page.registerDatasource(jsonds);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(jsonds, "load").returns([]);

  const splitds = newDatasource(invusejsonDS, "invsplitjsonDS");
  page.registerDatasource(splitds);

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

  const itemChangesMock = [
    {
      AA41627: [
        {
          invuseid: 1,
          invusenum: "1234",
          description: "Item test",
          siteid: "BEDFORD",
          status: "ENTERED",
          usetype: "ISSUE",
          href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
          fromstoreloc: "BEDFORD",
          orgid: "EAGLENA",
          quantity: 1,
          invuselinenum: 1,
          invuselineid: 1,
          requestnum: "1001",
          invreserveid: "1",
          calqty: 1,
          _bulkid: "0",
        },
      ],
    },
  ];

  jsonds.__itemChanges = itemChangesMock;

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  // const reservationsListMock = [
  //   {
  //     invuseid: 1,
  //     itemnum: "0-0031",
  //     pendingqty: 0,
  //     reservedqty: 2,
  //     binnum: "D-9-4",
  //     description: "Elbow, Street- 1-1/8 In X 90 Deg",
  //     href: "oslc/os/mxapiinvres/_MTE2NC9CRURGT1JE",
  //     requireddate: "2021-06-30T18:03:34-03:00",
  //     wonum: "1221",
  //   },
  // ];

  page.params.items = itemsInvUsage;
  let loadNewInventoryUsageSpy = jest.spyOn(
    controller,
    "loadNewInventoryUsage"
  );
  page.state.itemUrl = "test";
  controller.pageResumed();

  page.state.itemUrl = null;
  page.state.usetype_value = "";
  page.state.usetype_maxvalue = "";
  page.state.invusagefromstoreloc = "";
  controller.pageResumed();

  jsonds.__itemChanges = itemChangesMock;

  page.state.addingmoreitems = false;
  controller.loadNewInventoryUsage(page.params.items);

  expect(loadNewInventoryUsageSpy).toHaveBeenCalled();

  page.params.description = "1003 desc";
  page.params.itemUrl = "aabbcc";
  controller.pageResumed();

  page.params.addingmoreitems = true;
  page.params.entryType = "inventory";
  controller.pageResumed();

  page.params.itemUrl = undefined;
  controller.pageResumed();

  page.params.addingmoreitems = false;
  controller.pageResumed();

  app.allreserveditems = [{ invreserveid: 1 }];
  let invUsageItem = JSON.parse(JSON.stringify(invuseListDS.member));
  controller.updatePageInvUseLines(invUsageItem);
});

it("pageResume function - when page.params.addingmoreitems is true", async () => {
  const app = new Application();
  const page = new Page({
    name: "invUsage",
  });

  page.params.itemUrl = "testsaved";
  page.params.items = itemsInvUsage;
  app.state.selectedInvUseDSName = "invUseDS";

  page.params.addingmoreitems = true;

  const controller = new InventoryUsagePageController();

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  await app.initialize();

  sinon.stub(invuseDS, "load").returns(invuseListDS.member);

  page.invUsageDS = invuseDS;

  const invUseDS4Cal_local = newDatasource(invuseListDS, "invUseDS4Cal_local");
  invUseDS4Cal_local.registerController(controller);
  app.registerDatasource(invUseDS4Cal_local);

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  jsonds.registerController(controller);
  app.registerDatasource(jsonds);
  page.registerDatasource(jsonds);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(jsonds, "load").returns([]);

  const splitds = newDatasource(invusejsonDS, "invsplitjsonDS");
  page.registerDatasource(splitds);

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

  const itemChangesMock = [
    {
      AA41627: [
        {
          invuseid: 1,
          invusenum: "1234",
          description: "Item test",
          siteid: "BEDFORD",
          status: "ENTERED",
          usetype: "ISSUE",
          href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
          fromstoreloc: "BEDFORD",
          orgid: "EAGLENA",
          quantity: 1,
          invuselinenum: 1,
          invuselineid: 1,
          requestnum: "1001",
          invreserveid: "1",
          calqty: 1,
          _bulkid: "0",
        },
      ],
    },
  ];

  jsonds.__itemChanges = itemChangesMock;

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  jsonds.__itemChanges = itemChangesMock;

  page.params.description = "1003 desc";
  page.params.itemUrl = "aabbcc";
  page.params.entryType = "reserved";
  controller.pageResumed();
});

it("loadAddNewItems function", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.itemUrl = "testsaved";
  page.params.items = itemsInvUsage;
  app.state.selectedInvUseDSName = "invUseDS";

  page.state.addingmoreitems = false;

  app.allinvuses = [];
  app.allreserveditems = [];

  const jsoninusageDS = newDatasource(invusejsonDS, "jsoninusageDS");
  jsoninusageDS.registerController(controller);
  page.registerDatasource(jsoninusageDS);
  app.registerDatasource(jsoninusageDS);
  await app.initialize();

  sinon.stub(jsoninusageDS, "addNew").returns({});
  sinon.stub(jsoninusageDS, "getItems").returns(invusejsonDS.member);
  sinon.stub(jsoninusageDS, "load").returns(invusejsonDS.member);

  page.state.itemsInvUsage = itemsInvUsage;

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  let reserveditems = [
    {
      invuseid: 1,
      requestnum: 1,
      itemnum: "0-0031",
      description: "Elbow, Street- 1-1/8 In X 90 Deg",
      siteid: "BEDFORD",
      pendingqty: 0,
      reservedqty: 2,
      binnum: "D-9-4",
      href: "oslc/os/mxapiinvres/_MTE2NC9CRURGT1JE",
      requireddate: "2021-06-30T18:03:34-03:00",
      wonum: "1221",
      glaccount: "123456",
    },
  ];

  let loadAddNewItemsSpy = jest.spyOn(controller, "loadAddNewItems");

  await jsoninusageDS.load();

  page.state.addingmoreitems = false;

  await controller.loadAddNewItems(reserveditems);
  expect(loadAddNewItemsSpy).toHaveBeenCalled();

  reserveditems = [
    {
      invuseid: 2,
      requestnum: 2,
      itemnum: "0-0031",
      description: "Elbow, Street- 1-1/8 In X 90 Deg",
      siteid: "BEDFORD",
      pendingqty: 0,
      reservedqty: 2,
      binnum: "D-9-4",
      href: "oslc/os/mxapiinvres/_MTE2NC9CRURGT1JE",
      invreserve: [{ requestnum: 2 }],
      wonum: "1221",
      displaytaskid: 1,
    },
  ];

  await controller.loadAddNewItems(reserveditems);

  reserveditems = [
    {
      invuseid: 3,
      requestnum: 3,
      itemnum: "0-0031",
      description: "Elbow, Street- 1-1/8 In X 90 Deg",
      siteid: "BEDFORD",
      pendingqty: 0,
      reservedqty: 2,
      binnum: "D-9-4",
      href: "oslc/os/mxapiinvres/_MTE2NC9CRURGT1JE",
      invreserve: [{ requireddate: "2011-02-18T13:52:33+00:00" }],
      wonum: "1221",
    },
  ];
  await controller.loadAddNewItems(reserveditems);

  reserveditems = [
    {
      invuseid: 4,
      requestnum: 4,
      itemnum: "0-0031",
      description: "Elbow, Street- 1-1/8 In X 90 Deg",
      siteid: "BEDFORD",
      pendingqty: 0,
      reservedqty: 2,
      binnum: "D-9-4",
      href: "oslc/os/mxapiinvres/_MTE2NC9CRURGT1JE",
      invreserve: [
        {
          requireddate: "2011-02-18T13:52:33+00:00",
        },
        {
          requireddate: "2011-02-18T11:52:33+00:00",
        },
      ],
      wonum: "1221",
    },
  ];
  await controller.loadAddNewItems(reserveditems);
  page.state.addingmoreitems = true;
  page.state.itemsInvUsage = itemsInvUsage;
  await controller.loadAddNewItems(reserveditems);
});

it("openSelectReservedItems show reservationsList page", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const itemsInvUsage = [
    {
      invuseid: 1,
      invusenum: "1234",
      description: "Item test",
      siteid: "BEDFORD",
      status: "ENTERED",
      usetype: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
      fromstoreloc: "BEDFORD",
      orgid: "EAGLENA",
      quantity: 1,
      invuselinenum: 1,
      invuselineid: 1,
      requestnum: "1001",
    },
  ];

  const reservationsListPage = new Page({
    name: "reservationsList",
    params: {
      addmoreitems: true,
      reservedItemsInvUsage: itemsInvUsage,
    },
  });
  app.registerPage(reservationsListPage);

  const page = new Page({
    name: "invUsage",
    params: {
      addingmoreitems: false,
      items: null,
    },
  });

  page.params.items = itemsInvUsage;
  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  page.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  app.setCurrentPage(page);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  page.state.currentInvUse = JSON.parse(JSON.stringify(invuseListDS.member[0]));
  controller.openSelectReservedItems();

  expect(controller.page).toBeTruthy();
});

it("closeInvUsagePage show reservationsList page when app.currentPage.state.enableSave is true", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();

  const reservationsListPage = new Page({
    name: "reservationsList",
    params: {
      addmoreitems: false,
    },
  });
  app.registerPage(reservationsListPage);

  const page = new Page({
    name: "invUsage",
    params: {
      itemUrl: null,
      items: null,
    },
  });

  page.params.items = itemsInvUsage;
  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  await app.initialize();

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);

  const splitds = newDatasource(invuseSplitJsonData, "invsplitjsonDS");
  page.registerDatasource(splitds);
  sinon.stub(splitds, "getItems").returns(invuseSplitJsonData.member);
  sinon.stub(splitds, "load").returns(invuseSplitJsonData.member);

  splitds.__itemChanges = { 1: {} };
  page.invsplitjsonDS = splitds;

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
  await app.initialize();

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  controller.pageResumed();

  app.currentPage.state.enableSave = true;

  page.state.invusagedesc = "Hi";
  controller.closeInvUsagePage();

  page.state.invusagedesc = "abc";
  jsonds.__itemChanges = { 1: {} };
  controller.closeInvUsagePage();

  invusejsonDS.member[0].invuselinesplit[0].quantity = 2;
  splitds.__itemChanges = { 1: {} };
  controller.closeInvUsagePage();

  sinon.stub(controller, "getLinesOfInvalidSplit").returns(false);
  invusejsonDS.member[0].invuselinesplit[0].quantity = 1;
  controller.closeInvUsagePage();

  expect(controller.page).toBeTruthy();

  page.state.addingmoreitems = false;
  page.params.addingmoreitems = false;

  page.params.itemUrl = "xaofhsf";
  page.params.description = "abc";
  controller.closeInvUsagePage();
});

it("closeInvUsagePage show reservationsList page when app.currentPage.state.enableSave is false", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();

  const reservationsListPage = new Page({
    name: "reservationsList",
    params: {
      addmoreitems: false,
    },
  });
  app.registerPage(reservationsListPage);

  const page = new Page({
    name: "invUsage",
    params: {
      itemUrl: null,
      items: null,
    },
  });

  page.params.items = itemsInvUsage;
  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  await app.initialize();

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);

  const splitds = newDatasource(invuseSplitJsonData, "invsplitjsonDS");
  page.registerDatasource(splitds);
  sinon.stub(splitds, "getItems").returns(invuseSplitJsonData.member);
  sinon.stub(splitds, "load").returns(invuseSplitJsonData.member);

  splitds.__itemChanges = { 1: {} };
  page.invsplitjsonDS = splitds;

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);
  await app.initialize();

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  controller.pageResumed();

  app.currentPage.state.enableSave = false;

  page.state.invusagedesc = "Hi";
  controller.closeInvUsagePage();

  page.state.invusagedesc = "abc";
  jsonds.__itemChanges = { 1: {} };
  controller.closeInvUsagePage();

  invusejsonDS.member[0].invuselinesplit[0].quantity = 2;
  splitds.__itemChanges = { 1: {} };
  controller.closeInvUsagePage();

  sinon.stub(controller, "getLinesOfInvalidSplit").returns(false);
  invusejsonDS.member[0].invuselinesplit[0].quantity = 1;
  controller.closeInvUsagePage();

  expect(controller.page).toBeTruthy();

  page.state.addingmoreitems = false;
  page.params.addingmoreitems = false;

  page.params.itemUrl = "xaofhsf";
  page.params.description = "abc";
  controller.closeInvUsagePage();
});

it("openDetailsLineItem show be called", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  page.registerController(controller);
  app.registerPage(page);
  page.params.items = itemsInvUsage;

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  const assetjsonds = newDatasource({ member: [] }, "rotatingassetsjsonDS");
  const splitds = newDatasource({ member: [] }, "invsplitjsonDS");
  const issuetoLookupds = newLookupDatasource(
    { member: [] },
    "issuetoLookupDS",
    "personid"
  );
  page.registerDatasource(jsonds);
  page.registerDatasource(assetjsonds);
  page.registerDatasource(splitds);
  page.registerDatasource(issuetoLookupds);
  await app.initialize();

  const mockFn = jest.fn();
  page.showDialog = mockFn;

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(splitds, "load").returns([]);
  sinon.stub(splitds, "clearState");
  sinon.stub(splitds, "resetState");
  sinon.stub(assetjsonds, "load").returns([]);
  sinon.stub(assetjsonds, "clearState");
  sinon.stub(assetjsonds, "resetState");
  sinon.stub(issuetoLookupds, "initializeQbe");
  sinon.stub(issuetoLookupds, "setQBE");
  const sqbe = sinon
    .stub(issuetoLookupds, "searchQBE")
    .returns([{ displayname: "abc" }]);

  await controller.openDetailsLineItem({
    invuselinesplit: [{ invuselinesplitid: 1 }],
    itemtype: "TOOL",
    linetype_maxvalue: "TOOL",
    invreserve: [
      {
        requestedby: "admin",
        item: [{ rotating: true, conditionenabled: true }],
      },
    ],
    issueto: "personid",
    enteredastask: true,
    workorder: [
      {
        wonum: "1300",
        taskid: "10",
      },
    ],
  });
  sqbe.restore();
  sinon.stub(issuetoLookupds, "searchQBE").returns("");
  await controller.openDetailsLineItem({
    invuselinesplit: [{ invuselinesplitid: 1 }],
    itemtype: "ITEM",
    linetype_maxvalue: "ITEM",
    invreserve: [
      {
        requestedby: "admin",
        item: [{ rotating: true, conditionenabled: true }],
      },
    ],
    item: [
      {
        rotating: true,
      },
    ],
    issueto: "personid",
  });
  await controller.openDetailsLineItem({});
  expect(page.showDialog).toHaveBeenCalled();
});

it("delete asset function 1", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  page.registerController(controller);
  app.registerPage(page);
  app.state.selectedInvUseDSName = "invUseDS";
  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  const splitds = newDatasource(invusejsonDS, "invsplitjsonDS");
  page.registerDatasource(jsonds);
  page.registerDatasource(splitds);
  await app.initialize();

  sinon.stub(invuseDS, "getChildDatasource").returns(invuseDS);
  sinon.stub(invuseDS, "load").returns(invuseListDS.member);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(splitds, "addNew").returns({});
  sinon.stub(splitds, "getItems").returns(invusejsonDS.member);
  sinon.stub(splitds, "clearState").returns({});
  sinon.stub(splitds, "resetState").returns({});
  sinon.stub(splitds, "load").returns(invusejsonDS.member);

  page.state.invUsageLineItem = { frombin: "" };

  const item = {
    invuselinesplitid: 123,
    href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
  };
  app.device.isMaximoMobile = false;
  invuseDS.state.currentItemIndex = 0;
  controller.deleteAsset(item);
});

it("delete asset function 2", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  page.registerController(controller);
  app.registerPage(page);
  app.state.selectedInvUseDSName = "invUseDS";
  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  const splitds = newDatasource(invuseSplitJsonData, "invsplitjsonDS");
  page.registerDatasource(jsonds);
  page.registerDatasource(splitds);
  await app.initialize();

  sinon.stub(invuseDS, "getChildDatasource").returns(jsonds);
  sinon.stub(invuseDS, "load").returns(invuseListDS.member);
  sinon.stub(invuseDS, "getItems").returns(invuseListDS.member);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(jsonds, "getChildDatasource").returns(splitds);
  sinon.stub(splitds, "addNew").returns({});
  sinon.stub(splitds, "getItems").returns(invuseSplitJsonData.member);
  sinon.stub(splitds, "clearState").returns({});
  sinon.stub(splitds, "resetState").returns({});
  sinon.stub(splitds, "load").returns(invuseSplitJsonData.member);

  page.state.invUsageLineItem = { frombin: "" };

  const item = {
    invuselinesplitid: 1234,
    anywhererefid: 1234,
  };
  app.device.isMaximoMobile = true;
  invuseDS.state.currentItemIndex = 0;
  controller.deleteAsset(item);
});

it("delete asset function 3", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  page.registerController(controller);
  app.registerPage(page);
  app.state.selectedInvUseDSName = "invUseDS";
  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  const splitds = newDatasource(invuseSplitJsonData, "invsplitjsonDS");
  page.registerDatasource(jsonds);
  page.registerDatasource(splitds);
  await app.initialize();

  sinon.stub(invuseDS, "getChildDatasource").returns(jsonds);
  sinon.stub(invuseDS, "load").returns(invuseListDS.member);
  sinon.stub(invuseDS, "getItems").returns(invuseListDS.member);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(jsonds, "getChildDatasource").returns(splitds);
  sinon.stub(splitds, "addNew").returns({});
  sinon.stub(splitds, "getItems").returns(invuseSplitJsonData.member);
  sinon.stub(splitds, "clearState").returns({});
  sinon.stub(splitds, "resetState").returns({});
  sinon.stub(splitds, "load").returns(invuseSplitJsonData.member);

  page.state.invUsageLineItem = { frombin: "" };

  const item = {
    invuselinesplitid: 1235,
    href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
  };
  app.device.isMaximoMobile = true;
  invuseDS.state.currentItemIndex = 0;
  controller.deleteAsset(item);
});

it("selectAssets calls chooseAsset function", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  page.registerController(controller);
  app.registerPage(page);
  page.params.items = itemsInvUsage;
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  const splitds = newDatasource([], "invsplitjsonDS");
  page.registerDatasource(jsonds);
  page.registerDatasource(splitds);
  const assetDataDs = newLookupDatasource(
    assetLookupData,
    "assetLookupDS",
    "assetnum"
  );
  page.registerDatasource(assetDataDs);
  await app.initialize();
  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(assetDataDs, "load").returns([]);
  sinon.stub(assetDataDs, "clearState");
  sinon.stub(assetDataDs, "resetState");
  sinon.stub(assetDataDs, "getSelectedItems").returns([{}]);
  let sinonSpy = sinon.spy(controller, "chooseAsset");

  controller.selectAssets();
  expect(sinonSpy.called).toBe(true);
});

it("chooseAsset calls chooseAsset function", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  page.params.items = itemsInvUsage;
  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);

  const splitds = newDatasource(invuseSplitJsonData, "invsplitjsonDS");
  page.registerDatasource(splitds);
  sinon.stub(splitds, "getItems").returns(invuseSplitJsonData.member);
  sinon.stub(splitds, "load").returns(invuseSplitJsonData.member);

  const assetDataDs = newLookupDatasource(
    assetLookupData,
    "assetLookupDS",
    "assetnum"
  );

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  sinon.stub(assetDataDs, "load").returns([]);
  sinon.stub(assetDataDs, "clearState");
  sinon.stub(assetDataDs, "resetState");
  sinon.stub(assetDataDs, "getSelectedItems").returns([
    { splitHref: "abc", splitLocalref: "abc", assetnum: "321" },
    { splitHref: "abc", splitLocalref: "abc", assetnum: "123" },
  ]);

  page.registerDatasource(assetDataDs);

  await app.initialize();

  const invUsageLineItem = [
    {
      invuseid: 1,
      invusenum: "1234",
      description: "Item test",
      siteid: "BEDFORD",
      status: "ENTERED",
      usetype: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
      fromstoreloc: "BEDFORD",
      orgid: "EAGLENA",
      quantity: 1,
      frombin: "123",
      fromlot: "232",
      invuselinenum: 1,
      invuselineid: 1,
      requestnum: "1001",
    },
  ];

  page.state.invUsageLineItem = invUsageLineItem;
  controller.chooseAsset();
});

it("openBinLookup show be called", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  let showDialog = jest.fn();
  page.showDialog = showDialog;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  await app.initialize();
  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  const inventbalDS = newDatasource(invbalances, "inventbalDS");
  inventbalDS.registerController(controller);
  page.registerDatasource(inventbalDS);
  app.registerDatasource(inventbalDS);

  const invUsageLineItem = [
    {
      invuseid: 1,
      invusenum: "1234",
      description: "Item test",
      siteid: "BEDFORD",
      status: "ENTERED",
      usetype: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
      fromstoreloc: "BEDFORD",
      orgid: "EAGLENA",
      quantity: 1,
      frombin: "123",
      fromlot: "234",
      invuselinenum: 1,
      invuselineid: 1,
      itemnum: "1234",
      fromconditioncode: "ABC",
      location: "CENTRAL",
    },
    {
      invuseid: 2,
      invusenum: "1235",
      description: "Item test",
      siteid: "BEDFORD",
      status: "ENTERED",
      usetype: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
      fromstoreloc: "BEDFORD",
      orgid: "EAGLENA",
      quantity: 1,
      frombin: "123",
      fromlot: "234",
      invuselinenum: 2,
      invuselineid: 2,
      itemnum: "1234",
      item: [
        {
          lottype: "LOT",
          lottype_maxvalue: "LOT",
        },
      ],
      location: "CENTRAL",
    },
  ];

  page.state.invUsageLineItem = invUsageLineItem[0];

  inventbalDS.initializeQbe = () => {};
  inventbalDS.setQBE = () => {};
  inventbalDS.searchQBE = () => {
    return "";
  };
  controller.binLookupDS = inventbalDS;
  controller.openBinLookup({ splitItem: false });

  page.state.invUsageLineItem = invUsageLineItem[1];
  await controller.openBinLookup({ splitItem: false });
  expect(page.state.lastSyncDate).toBeUndefined();
  inventbalDS.dataAdapter.colletionInfo = {
    getMetrics: () => {
      return { downloaDate: new Date() };
    },
  };
  await controller.openBinLookup({ splitItem: false });
  expect(page.state.lastSyncDate).not.toBeUndefined();
});

it("chooseIssueto function test", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  page.registerController(controller);
  app.registerPage(page);

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.invUsageLineItem = {
    invuseid: 1,
    invusenum: "1234",
    description: "Item test",
    lotnum: "",
    fromlot: "",
    lottype: "LOT",
    lottype_maxvalue: "LOT",
    binnum: "",
    frombin: "",
  };

  let evt = { personid: "abc", displayname: "123" };
  controller.chooseIssueto(evt);
});

it("chooseIssueto function test", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.invUsageLineItem = {
    invuseid: 1,
    invusenum: "1234",
    description: "Item test",
    lotnum: "",
    fromlot: "",
    lottype: "LOT",
    lottype_maxvalue: "LOT",
    binnum: "",
    frombin: "",
  };

  let evt = { personid: "abc", displayname: "123" };
  controller.chooseIssueto(evt);
});

it("chooseBinNumber function sets the bin info and load the lots", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  const mockFn = jest.fn();
  controller.loadLots = mockFn;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.invUsageLineItem = {
    invuseid: 1,
    invusenum: "1234",
    description: "Item test",
    lotnum: "",
    fromlot: "",
    lottype: "LOT",
    lottype_maxvalue: "LOT",
    binnum: "",
    frombin: "",
  };
  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  app.client = {
    userInfo: {
      defaultSite: "BEDFORD",
    },
  };
  let evt = { id: 1, binnum: "123" };
  controller.chooseBinNumber(evt);
  page.state.invUsageLineSplitItem = {};
  controller.chooseBinNumber(evt);
});

it("loadLots function to load lots data", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.itemUrl = "testsaved";
  page.params.items = itemsInvUsage;
  app.state.selectedInvUseDSName = "invUseDS";

  page.state.addingmoreitems = false;

  page.registerController(controller);
  app.registerPage(page);

  const inventbalDS = newDatasource(invbalances, "inventbalDS");
  sinon.stub(inventbalDS, "load").returns(invbalances.member);
  sinon.stub(inventbalDS, "getItems").returns(invbalances.member);

  inventbalDS.registerController(controller);
  page.registerDatasource(inventbalDS);

  const lotsFilteredByBinDS = newDatasource(invbalances, "lotsFilteredByBinDS");
  lotsFilteredByBinDS.registerController(controller);
  page.registerDatasource(lotsFilteredByBinDS);

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.invUsageLineItem = {
    invuseid: 1,
    invusenum: "1234",
    itemnum: "123",
    description: "Item test",
    lotnum: "123",
    fromlot: "123",
    lottype: "LOT",
    lottype_maxvalue: "LOT",
    frombin: "123",
    siteid: "BEDFORD",
    fromstoreloc: "CENTRAL",
    location: "CENTRAL",
  };
  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  await inventbalDS.load();

  controller.loadLots();
  expect(lotsFilteredByBinDS).toBeTruthy();

  page.state.invUsageLineItem.frombin = "456";
  controller.loadLots();
  expect(lotsFilteredByBinDS).toBeTruthy();

  page.state.invUsageLineItem.frombin = "457";
  controller.loadLots();
  expect(lotsFilteredByBinDS).toBeTruthy();
});

it("openLotLookup show be called", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  let loadLots = jest.fn();
  controller.loadLots = loadLots;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  await app.initialize();
  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  let showDialog = jest.fn();
  page.showDialog = showDialog;
  await controller.openLotLookup();

  expect(page.showDialog).toHaveBeenCalled();
});

it("chooseLotNumber function sets the lot info", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  const mockFn = jest.fn();
  controller.loadLots = mockFn;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  const splitds = newDatasource([], "invsplitjsonDS");
  page.registerDatasource(splitds);
  const inventbalDS = newDatasource(invbalances, "inventbalDS");
  inventbalDS.registerController(controller);
  page.registerDatasource(inventbalDS);

  await app.initialize();
  page.state.invUsageLineItem = {
    invuseid: 1,
    invusenum: "1234",
    description: "Item test",
    fromlot: "",
    lottype: "LOT",
    lottype_maxvalue: "LOT",
    binnum: "123",
    frombin: "123",
  };
  sinon.stub(splitds, "clearState");
  sinon.stub(splitds, "resetState");
  sinon.stub(splitds, "load").returns([]);
  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(inventbalDS, "load").returns(invbalances.member);
  sinon.stub(inventbalDS, "getItems").returns([invbalances.member]);

  let evt = { id: 1, lotnum: "123", binnum: "b11" };
  controller.chooseLotNumber(evt);
  expect(page.state.invUsageLineItem.fromlot).toBe("123");
  expect(page.state.invUsageLineItem.frombin).toBe("b11");

  page.state.originLookup = "TRANSFERDETAIL";
  evt = { id: 1, lotnum: "1234", binnum: "b112" };
  controller.chooseLotNumber(evt);
  expect(page.state.invUsageLineItem.tolot).toBe("1234");
  expect(page.state.invUsageLineItem.tobin).toBe("b112");
});

it("openIssuetoLookup should be called", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  const mockFn = jest.fn();
  page.showDialog = mockFn;

  page.params.items = itemsInvUsage;
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  page.registerController(controller);
  app.registerPage(page);
  const issuetoLookupDS = newLookupDatasource(
    { member: [] },
    "issuetoLookupDS",
    "personid"
  );
  issuetoLookupDS.registerController(controller);
  page.registerDatasource(issuetoLookupDS);
  await app.initialize();
  sinon.stub(issuetoLookupDS, "clearState");
  sinon.stub(issuetoLookupDS, "resetState");
  sinon.stub(issuetoLookupDS, "initializeQbe");
  sinon.stub(issuetoLookupDS, "searchQBE").returns("");

  controller.pageInitialized(page, app);

  controller.openIssuetoLookup();
});

it("openAssetLookup should be called", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  const mockFn = jest.fn();
  page.showDialog = mockFn;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  const splitds = newDatasource([], "invsplitjsonDS");
  page.registerDatasource(splitds);
  const assetLookupDS = newLookupDatasource(
    assetLookupData,
    "assetLookupDS",
    "assetnum"
  );
  assetLookupDS.registerController(controller);
  page.registerDatasource(assetLookupDS);
  await app.initialize();
  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(splitds, "load").returns([]);
  sinon.stub(splitds, "getItems").returns([
    {
      rotassetnum: "abc123",
      invuselinesplitid: "1",
    },
    {
      rotassetnum: "abc321",
      invuselinesplitid: "2",
    },
  ]);
  sinon.stub(assetLookupDS, "load").returns([]);
  sinon.stub(assetLookupDS, "clearState");
  sinon.stub(assetLookupDS, "resetState");
  sinon.stub(assetLookupDS, "getSelectedItems").returns([]);
  sinon.stub(assetLookupDS, "initializeQbe");
  sinon.stub(assetLookupDS, "setQBE");
  sinon.stub(assetLookupDS, "setSelectedItem");
  sinon.stub(assetLookupDS, "searchQBE").returns("");
  sinon.stub(assetLookupDS, "getItems").returns([
    {
      assetnum: "abc123",
    },
  ]);

  controller.pageInitialized(page, app);

  const invUsageLineItem = [
    {
      invuseid: 1,
      invusenum: "1234",
      description: "Item test",
      siteid: "BEDFORD",
      status: "ENTERED",
      usetype: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
      fromstoreloc: "BEDFORD",
      orgid: "EAGLENA",
      quantity: 1,
      invuselinenum: 1,
      invuselineid: 1,
      itemnum: "1234",
      location: "CENTRAL",
    },
  ];

  page.state.invUsageLineItem = invUsageLineItem;

  assetLookupDS.initializeQbe = () => {};
  assetLookupDS.setQBE = () => {};
  assetLookupDS.searchQBE = () => {
    return "";
  };

  controller.openAssetLookup();
  page.state.invUsageLineItem.conditioncode = "REBUILD";
  controller.openAssetLookup();
});

it("split operations", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  app.state.selectedInvUseDSName = "invUseDS";
  const mockFn = jest.fn();
  page.showDialog = mockFn;

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  const splitds = newDatasource(invusejsonDS, "invsplitjsonDS");
  page.registerDatasource(jsonds);
  page.registerDatasource(splitds);
  await app.initialize();

  sinon.stub(invuseDS, "load").returns([]);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(splitds, "addNew").returns({});
  sinon.stub(splitds, "getItems").returns(invusejsonDS.member);
  sinon.stub(splitds, "clearState").returns({});
  sinon.stub(splitds, "resetState").returns({});
  sinon.stub(splitds, "load").returns(invusejsonDS.member);

  page.state.invUsageLineItem = { frombin: "abc", enteredastask: true };
  controller.configSplit({});
  expect(page.showDialog).toHaveBeenCalled();
  controller.configSplit();

  await controller.onSplitClose();
  page.state.prevBin = null;
  await controller.onSplitClose();

  page.state.invUsageLineItem = { frombin: "abc", enteredastask: false };
  controller.onDetailClose();

  page.state.invUsageLineItem = { frombin: "abc", enteredastask: "test" };
  controller.onDetailClose();
});

it("split operations 2", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  app.state.selectedInvUseDSName = "invUseDS";
  const mockFn = jest.fn();
  page.showDialog = mockFn;

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  const splitds = newDatasource(invusejsonDS, "invsplitjsonDS");
  page.registerDatasource(jsonds);
  page.registerDatasource(splitds);
  await app.initialize();

  sinon.stub(invuseDS, "load").returns([]);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(splitds, "addNew").returns({});
  sinon.stub(splitds, "getItems").returns(invusejsonDS.member);
  sinon.stub(splitds, "clearState").returns({});
  sinon.stub(splitds, "resetState").returns({});
  sinon.stub(splitds, "load").returns(invusejsonDS.member);

  page.state.invUsageLineItem = { frombin: "" };
  controller.configSplit({});
  expect(page.showDialog).toHaveBeenCalled();
  controller.configSplit();

  await controller.onSplitClose();
  page.state.prevBin = null;
  await controller.onSplitClose();

  controller.onDetailClose();
});

it("split operations delete 1", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  app.state.selectedInvUseDSName = "invUseDS";
  const mockFn = jest.fn();
  page.showDialog = mockFn;

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  const splitds = newDatasource(invusejsonDS, "invsplitjsonDS");
  page.registerDatasource(jsonds);
  page.registerDatasource(splitds);
  await app.initialize();

  sinon.stub(invuseDS, "getChildDatasource").returns(invuseDS);
  sinon.stub(invuseDS, "load").returns(invuseListDS.member);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(splitds, "addNew").returns({});
  sinon.stub(splitds, "getItems").returns(invusejsonDS.member);
  sinon.stub(splitds, "clearState").returns({});
  sinon.stub(splitds, "resetState").returns({});
  sinon.stub(splitds, "load").returns(invusejsonDS.member);

  page.state.invUsageLineItem = { frombin: "" };

  page.state.invUsageLineSplitItem = {
    invuselinesplitid: 123,
    href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
  };
  app.device.isMaximoMobile = false;
  invuseDS.state.currentItemIndex = 0;
  await controller.deleteSplit();
});

it("split delete 2", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  app.state.selectedInvUseDSName = "invUseDS";
  const mockFn = jest.fn();
  page.showDialog = mockFn;

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  const splitds = newDatasource(invuseSplitJsonData, "invsplitjsonDS");
  page.registerDatasource(jsonds);
  page.registerDatasource(splitds);
  await app.initialize();

  sinon.stub(invuseDS, "getChildDatasource").returns(jsonds);
  sinon.stub(invuseDS, "load").returns(invuseListDS.member);
  sinon.stub(invuseDS, "getItems").returns(invuseListDS.member);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(jsonds, "getChildDatasource").returns(splitds);

  sinon.stub(splitds, "addNew").returns({});
  sinon.stub(splitds, "getItems").returns(invuseSplitJsonData.member);
  sinon.stub(splitds, "clearState").returns({});
  sinon.stub(splitds, "resetState").returns({});
  sinon.stub(splitds, "load").returns(invuseSplitJsonData.member);

  page.state.invUsageLineItem = { frombin: "" };

  page.state.invUsageLineSplitItem = {
    invuselinesplitid: 1234,
    anywhererefid: 1234,
  };
  app.device.isMaximoMobile = true;
  invuseDS.state.currentItemIndex = 0;
  await controller.deleteSplit();
});

it("split delete 3", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  app.state.selectedInvUseDSName = "invUseDS";
  const mockFn = jest.fn();
  page.showDialog = mockFn;

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  const splitds = newDatasource(invuseSplitJsonData, "invsplitjsonDS");
  page.registerDatasource(jsonds);
  page.registerDatasource(splitds);
  await app.initialize();

  sinon.stub(invuseDS, "getChildDatasource").returns(jsonds);
  sinon.stub(invuseDS, "load").returns(invuseListDS.member);
  sinon.stub(invuseDS, "getItems").returns(invuseListDS.member);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(jsonds, "getChildDatasource").returns(splitds);

  sinon.stub(splitds, "addNew").returns({});
  sinon.stub(splitds, "getItems").returns(invuseSplitJsonData.member);
  sinon.stub(splitds, "clearState").returns({});
  sinon.stub(splitds, "resetState").returns({});
  sinon.stub(splitds, "load").returns(invuseSplitJsonData.member);

  page.state.invUsageLineItem = { frombin: "" };

  page.state.invUsageLineSplitItem = {
    invuselinesplitid: 1235,
    href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
  };
  app.device.isMaximoMobile = true;
  invuseDS.state.currentItemIndex = 0;
  await controller.deleteSplit();
});

it("validateRotatingAssets function", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  const mockFn = jest.fn();
  page.showDialog = mockFn;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invuseRotatingDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  await app.initialize();
  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invuseRotatingDS.member);

  let validateRotAssetSpy = jest.spyOn(controller, "validateRotatingAssets");

  controller.validateRotatingAssets();
  expect(validateRotAssetSpy).toHaveBeenCalled();
});

it("validateRotatingAssets function 2", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  const mockFn = jest.fn();
  page.showDialog = mockFn;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invuseRotatingDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  await app.initialize();
  sinon.stub(jsonds, "addNew").returns({});
  const lineItem = JSON.parse(JSON.stringify(invuseRotatingDS.member));
  delete lineItem[0].item;
  delete lineItem[0].invuselinesplit;
  lineItem[0].invreserve = [
    {
      item: [
        {
          rotating: true,
        },
      ],
    },
  ];
  sinon.stub(jsonds, "getItems").returns(lineItem);

  let validateRotAssetSpy = jest.spyOn(controller, "validateRotatingAssets");

  controller.validateRotatingAssets();
  expect(validateRotAssetSpy).toHaveBeenCalled();
});

it("getRotating function", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;

  page.registerController(controller);
  app.registerPage(page);

  const lineItem = JSON.parse(
    JSON.stringify(invusejsonDS_LoadingItem_Data.member[0])
  );

  controller.getRotating(lineItem);
});

it("draft usage, set value to page.state.usetype_maxvalue and page.state.invusagefromstoreloc", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();

  const page = new Page({
    name: "invUsage",
    params: {
      itemUrl: null,
      items: null,
    },
  });

  page.params.items = itemsInvUsage;
  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  invuseStatusDomainDS.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS);

  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  app.client = {
    userInfo: {
      personid: "SAM",
      defaultStoreroom: "UPS",
      defaultStoreroomSite: "CENTRAL",
      defaultOrg: "EAGLENA",
    },
    restclient: {
      get: function () {
        return new Promise(function (resolve) {
          resolve({ defaultStoreroom: "CENTRAL" });
        });
      },
    },
  };

  await app.initialize();

  page.params.usetype = "ISSUE";
  page.params.draftInvUsage = true;
  page.state.draftInvUsage = true;
  page.state.usetype_value = "";
  page.state.usetype_maxvalue = "";
  page.state.invusagefromstoreloc = "";
  controller.pageResumed();
  page.params.usetype = "UNKNOWN";
  controller.pageResumed();
  page.params.usetype = "TRANSFER";
  controller.pageResumed();
});

it("openAddOptionsDrawer and chooseOption functions", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const rcontroller = new InventoryUsagePageController(); // just use same controller for .pageInitialized
  const itemsInvUsage = [
    {
      invuseid: 1,
      invusenum: "1234",
      description: "Item test",
      siteid: "BEDFORD",
      status: "ENTERED",
      usetype: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
      fromstoreloc: "BEDFORD",
      orgid: "EAGLENA",
      quantity: 1,
      invuselinenum: 1,
      invuselineid: 1,
      requestnum: "1001",
    },
  ];

  const page = new Page({
    name: "invUsage",
  });
  page.params = {
    addingmoreitems: false,
    items: itemsInvUsage,
  };
  app.registerPage(page);
  page.registerController(controller);
  app.registerController(rcontroller);

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);

  const reservationsListPage = new Page({
    name: "reservationsList",
    params: {
      addmoreitems: true,
      reservedItemsInvUsage: itemsInvUsage,
    },
  });
  reservationsListPage.registerController(rcontroller);
  app.registerPage(reservationsListPage);
  reservationsListPage.registerDatasource(jsonds);

  const invItemListPage = new Page({
    name: "inventoryitemlist",
    params: {
      addmoreitems: true,
      reservedItemsInvUsage: itemsInvUsage,
    },
  });

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  invuseStatusDomainDS.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const addoptionsDS = newDatasource({}, "addoptionsDS");
  addoptionsDS.registerController(controller);
  app.registerDatasource(addoptionsDS);

  await app.initialize();
  app.setCurrentPage(page);

  page.state.usetype_value = "TRANSFER";
  page.state.usetype_maxvalue = "TRANSFER";
  controller.openAddOptionsDrawer();

  page.state.usetype_value = "ISSUE";
  page.state.usetype_maxvalue = "ISSUE";
  controller.openAddOptionsDrawer();
  const addOptionsDialog = new Dialog({
    name: "addOptions",
  });
  page.registerDialog(addOptionsDialog);
  expect(page.showDialog).toBeTruthy();
  addOptionsDialog.closeDialog = jest.fn();

  controller.chooseOption({ page: reservationsListPage.name });
  expect(rcontroller.page).toBeTruthy();

  app.client = {
    userInfo: {
      personid: "SAM",
      defaultStoreroom: "UPS",
      defaultStoreroomSite: "CENTRAL",
      defaultOrg: "EAGLENA",
    },
    restclient: {
      get: function () {
        return new Promise(function (resolve) {
          resolve({ defaultStoreroom: "CENTRAL" });
        });
      },
    },
  };
  controller.chooseOption({ page: invItemListPage.name });
  expect(rcontroller.page).toBeTruthy();

  controller.chooseOption({ page: "notexistpage" });
});

it("fromconditionCode function sets the condition info", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  const mockFn = jest.fn();
  controller.loadLots = mockFn;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);

  const conditionLookupDS = newDatasource([], "conditionLookupDS");
  page.registerDatasource(conditionLookupDS);
  conditionLookupDS.initializeQbe = jest.fn();
  conditionLookupDS.setQBE = jest.fn();
  conditionLookupDS.searchQBE = jest.fn();

  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.invUsageLineItem = {
    invuseid: 1,
    invusenum: "1234",
    description: "Item test",
    lotnum: "",
    fromlot: "",
    lottype: "LOT",
    lottype_maxvalue: "LOT",
    binnum: "",
    frombin: "",
    fromconditioncode: "",
  };
  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  app.client = {
    userInfo: {
      defaultSite: "BEDFORD",
    },
  };

  page.state.invUsageLineItem.frombin = "HASBIN";
  const inventbalDS = newDatasource(invbalances, "inventbalDS");
  sinon.stub(inventbalDS, "getItems").returns(invbalances.member);
  controller.binLookupDS = inventbalDS;
  await controller.openConditionLookup();

  let evt = { conditioncode: "test" };
  expect(page.state.invUsageLineItem.fromconditioncode).toBe("");
  await controller.chooseConditionLookup(evt);
  expect(page.state.invUsageLineItem.fromconditioncode).toBe("test");

  expect(page.state.invUsageLineItem.frombin).toBeUndefined();
});

it("openBinLookup show be called by toBin", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  let showDialog = jest.fn();
  page.showDialog = showDialog;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  await app.initialize();
  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  const inventbalDS = newDatasource(invbalances, "inventbalDS");
  inventbalDS.registerController(controller);
  page.registerDatasource(inventbalDS);
  app.registerDatasource(inventbalDS);

  const invUsageLineItem = [
    {
      invuseid: 1,
      invusenum: "1234",
      description: "Item test",
      siteid: "BEDFORD",
      status: "ENTERED",
      usetype: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
      fromstoreloc: "BEDFORD",
      orgid: "EAGLENA",
      quantity: 1,
      frombin: "123",
      fromlot: "234",
      invuselinenum: 1,
      invuselineid: 1,
      itemnum: "1234",
      fromconditioncode: "ABC",
      location: "CENTRAL",
    },
    {
      invuseid: 2,
      invusenum: "1235",
      description: "Item test",
      siteid: "BEDFORD",
      status: "ENTERED",
      usetype: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
      fromstoreloc: "BEDFORD",
      orgid: "EAGLENA",
      quantity: 1,
      frombin: "123",
      fromlot: "234",
      invuselinenum: 2,
      invuselineid: 2,
      itemnum: "1234",
      item: [
        {
          lottype: "LOT",
          lottype_maxvalue: "LOT",
        },
      ],
      location: "CENTRAL",
    },
  ];

  page.state.invUsageLineItem = invUsageLineItem[0];

  inventbalDS.initializeQbe = () => {};
  inventbalDS.setQBE = () => {};
  inventbalDS.searchQBE = () => {
    return "";
  };
  controller.binLookupDS = inventbalDS;

  let binLookup = false;
  page.showDialog = () => {
    binLookup = true;
  };

  app.client = {
    userInfo: {
      defaultSite: "BEDFORD",
    },
  };
  expect(binLookup).toBe(false);
  await controller.openBinLookup({
    splitItem: false,
    origin: "TRANSFERDETAIL",
  });
  expect(binLookup).toBe(true);

  let evt = { id: 1, binnum: "123" };
  controller.chooseBinNumber(evt);
  expect(page.state.invUsageLineItem.tobin).toBe("123");

  await controller.openBinLookup({
    splitItem: false,
    origin: "TRANSFERDETAIL",
  });
  page.state.invUsageLineSplitItem = {
    invuselinesplitid: 123,
  };
  evt = { id: 1, binnum: "567" };
  controller.chooseBinNumber(evt);
  expect(page.state.invUsageLineSplitItem.tobin).toBe("567");
});

it("loadLots function to load lots data -  called by toLot", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.itemUrl = "testsaved";
  page.params.items = itemsInvUsage;
  app.state.selectedInvUseDSName = "invUseDS";

  page.state.addingmoreitems = false;

  page.registerController(controller);
  app.registerPage(page);

  const inventbalDS = newDatasource(invbalances, "inventbalDS");
  sinon.stub(inventbalDS, "load").returns(invbalances.member);
  sinon.stub(inventbalDS, "getItems").returns(invbalances.member);

  inventbalDS.registerController(controller);
  page.registerDatasource(inventbalDS);

  const lotsFilteredByBinDS = newDatasource(invbalances, "lotsFilteredByBinDS");
  lotsFilteredByBinDS.registerController(controller);
  page.registerDatasource(lotsFilteredByBinDS);

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  await app.initialize();
  controller.pageInitialized(page, app);
  page.state.invUsageLineItem = {
    invuseid: 1,
    invusenum: "1234",
    itemnum: "123",
    description: "Item test",
    lotnum: "123",
    fromlot: "123",
    lottype: "LOT",
    lottype_maxvalue: "LOT",
    frombin: "123",
    siteid: "BEDFORD",
    fromstoreloc: "CENTRAL",
    location: "CENTRAL",
  };
  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  await inventbalDS.load();

  controller.loadLots("TRANSFERDETAIL");
  expect(lotsFilteredByBinDS).toBeTruthy();

  page.state.invUsageLineItem.tobin = "456";
  controller.loadLots("TRANSFERDETAIL");
  expect(lotsFilteredByBinDS).toBeTruthy();

  page.state.invUsageLineItem.tobin = "457";
  controller.loadLots("TRANSFERDETAIL");
  expect(lotsFilteredByBinDS).toBeTruthy();
});

it("openLotLookup show be called by toLot", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  let loadLots = jest.fn();
  controller.loadLots = loadLots;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  await app.initialize();
  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  let showDialog = jest.fn();
  page.showDialog = showDialog;
  await controller.openLotLookup({ origin: "TRANSFERDETAIL" });

  expect(page.showDialog).toHaveBeenCalled();
});

it("openStoreRoomLookup/chooseStoreRoomLookup show be called by tostoreloc", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  let loadLots = jest.fn();
  controller.loadLots = loadLots;

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "loctypeDS"
  );
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon.stub(invuseStatusDomainDS, "clearQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  invuseStatusDomainDS.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS);

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(storeRoomJsonData, "locationDS");
  page.registerDatasource(jsonds);
  const js2 = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(js2);
  await app.initialize();
  jsonds.getSchema = jest.fn();
  jsonds.initializeQbe = jest.fn();
  jsonds.clearQBE = jest.fn();
  jsonds.searchQBE = jest.fn();
  jsonds.setQBE = jest.fn();

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  let showDialog = jest.fn();
  page.showDialog = showDialog;

  const invUsageLineItem = [
    {
      invuseid: 1,
      invusenum: "1234",
      description: "Item test",
      siteid: "BEDFORD",
      status: "ENTERED",
      usetype: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
      fromstoreloc: "BEDFORD",
      orgid: "EAGLENA",
      quantity: 1,
      item: {
        rotating: false,
        conditionenabled: false,
      },
      frombin: "123",
      fromlot: "232",
      invuselinenum: 1,
      invuselineid: 1,
      requestnum: "1001",
      taskid: "10",
    },
  ];

  sinon.stub(app, "findDatasource").returns(jsonds);
  page.state.invUsageLineItem = invUsageLineItem[0];

  await controller.openLocationLookup({
    name: "storeRoomLookup",
    ds: "locationDS",
  });

  expect(page.showDialog).toHaveBeenCalled();

  //  the storeroom only had 1 invbalance record then the bin was defaulted automatically

  expect(page.state.invUsageLineItem.tostoreloc).toBe(undefined);
  expect(page.state.invUsageLineItem.tobin).toBe(undefined);

  let evt = { location: "test" };
  controller.binLookupDS = {
    items: [
      {
        binnum: "1-2-3",
      },
    ],
    item: {
      binnum: "1-2-3",
    },
  };

  page.datasources.lotsFilteredByBinDS = {
    items: [
      {
        lotnum: "a-45",
      },
    ],
    item: {
      lotnum: "a-45",
    },
  };

  controller.filterInvBalDS = jest.fn();
  sinon.stub(controller, "filterInvBalDS").returns(jsonds);
  app.client = {
    userInfo: {
      defaultSite: "BEDFORD",
    },
  };
  page.state.usetype_value = "ISSUE";
  page.state.usetype_maxvalue = "ISSUE";
  await controller.chooseStoreRoomLookup(evt);
  expect(page.state.invUsageLineItem.tostoreloc).toBe("test");
  expect(page.state.invUsageLineItem.tobin).toBe("1-2-3");
  expect(page.state.invUsageLineItem.tolot).toBe("a-45");

  expect(page.state.invUsageLineItem.location).toBe(undefined);
  await controller.chooseLocationLookup(evt);
  expect(page.state.invUsageLineItem.location).toBe("test");

  controller.cleanLocation();
  expect(page.state.invUsageLineItem.location).toBe(undefined);

  //  the storeroom with multiple invbalance records then the bin must be clear

  evt = { location: "test2" };
  controller.binLookupDS = {
    items: [
      {
        binnum: "2-2-2",
      },
      {
        binnum: "3-3-3",
      },
    ],
    item: {
      binnum: "2-2-2",
    },
  };

  controller.filterInvBalDS = jest.fn();
  sinon.stub(controller, "filterInvBalDS").returns(jsonds);

  page.datasources.lotsFilteredByBinDS = {
    items: [
      {
        lotnum: "a-45",
      },
      {
        lotnum: "a-46",
      },
    ],
    item: {
      lotnum: "a-46",
    },
  };
  await controller.chooseStoreRoomLookup(evt);
  expect(page.state.invUsageLineItem.tostoreloc).toBe("test2");
  expect(page.state.invUsageLineItem.tobin).toBe(null);
  expect(page.state.invUsageLineItem.tolot).toBe(null);

  //  the storeroom with no invbalance records then the bin must be clear
  evt = { location: "test2" };
  controller.binLookupDS = {
    items: [],
  };

  controller.filterInvBalDS = jest.fn();
  sinon.stub(controller, "filterInvBalDS").returns(jsonds);

  await controller.chooseStoreRoomLookup(evt);
  expect(page.state.invUsageLineItem.tostoreloc).toBe("test2");
  expect(page.state.invUsageLineItem.tobin).toBe(null);
});

it("changeStatus function can stage, issue or transfer the items", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  invuseStatusDomainDS.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const invuseStatusDomainDS_type = newSynoTypeDatasource(
    invuseStatusDomainData,
    "synonymdomainDS_type"
  );
  invuseStatusDomainDS_type.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS_type);
  sinon.stub(invuseStatusDomainDS_type, "initializeQbe");
  sinon.stub(invuseStatusDomainDS_type, "setQBE");
  sinon
    .stub(invuseStatusDomainDS_type, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  app.client = {
    userInfo: {
      personid: "SAM",
      defaultStoreroom: "UPS",
      defaultStoreroomSite: "CENTRAL",
      defaultOrg: "EAGLENA",
    },
    restclient: {
      get: function () {
        return new Promise(function (resolve) {
          resolve({ defaultStoreroom: "CENTRAL" });
        });
      },
    },
  };

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  sinon.stub(invuseDS, "addNew").returns(newInvUsage);
  sinon
    .stub(invuseDS, "load")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon.stub(invuseDS, "getSchema").returns(null);
  sinon.stub(invuseDS, "initializeQbe");
  sinon.stub(invuseDS, "clearChanges");

  page.invUsageDS = invuseDS;
  page.invUsageDS.item.status = "STAGED";

  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns(invusejsonDS.member);
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  controller.invusagejsonds = jsonds;

  await app.initialize();
  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await invuseDS.load();
  await jsonds.load();

  page.state.draftInvUsage = false;

  const mockCallBack = jest.fn();
  controller.triggerSaveProcess = mockCallBack;

  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  await controller.saveInventoryUsage();
  controller.doStage();
  await controller.onSave_confirmStagingDialog();
  controller.showConfirmStageBinDialog();
  await controller.changeStatus("STAGED");
  controller.pageResumed();

  page.state.draftInvUsage = false;
  app.currentPage.state.enableSave = true;
  controller.triggerSaveProcess = mockCallBack;
  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];
  let evt = { innerId: "1" };
  controller.setBinflag(evt);
  controller.doStage();
  await controller.onSave_confirmStagingDialog();
  await controller.changeStatus("STAGED");
});

it("changeStatus function can stage, issue or transfer the items with frombin not set in invuseline", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  invuseStatusDomainDS.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const invuseStatusDomainDS_type = newSynoTypeDatasource(
    invuseStatusDomainData,
    "synonymdomainDS_type"
  );
  invuseStatusDomainDS_type.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS_type);
  sinon.stub(invuseStatusDomainDS_type, "initializeQbe");
  sinon.stub(invuseStatusDomainDS_type, "setQBE");
  sinon
    .stub(invuseStatusDomainDS_type, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  app.client = {
    userInfo: {
      personid: "SAM",
      defaultStoreroom: "UPS",
      defaultStoreroomSite: "CENTRAL",
      defaultOrg: "EAGLENA",
    },
    restclient: {
      get: function () {
        return new Promise(function (resolve) {
          resolve({ defaultStoreroom: "CENTRAL" });
        });
      },
    },
  };

  page.params.itemUrl = "testsaved";
  app.state.selectedInvUseDSName = "invUseDS";

  sinon.stub(invuseDS, "addNew").returns(newInvUsage);
  sinon
    .stub(invuseDS, "load")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon.stub(invuseDS, "getSchema").returns(null);
  sinon.stub(invuseDS, "initializeQbe");
  sinon.stub(invuseDS, "clearChanges");

  page.invUsageDS = invuseDS;
  page.invUsageDS.item.status = "STAGED";

  const invuselineDS = JSON.parse(JSON.stringify(invusejsonDS));
  invuselineDS.member[0].frombin = "";
  const jsonds = newDatasource(invuselineDS, "jsoninusageDS");
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "load").returns([invuselineDS.member[0]]);
  sinon.stub(jsonds, "getItems").returns([invuselineDS.member[0]]);

  controller.invusagejsonds = jsonds;

  await app.initialize();
  page.registerController(controller);
  app.registerPage(page);
  app.setCurrentPage(page);

  await invuseDS.load();
  await jsonds.load();

  page.state.draftInvUsage = false;

  const mockCallBack = jest.fn();
  controller.triggerSaveProcess = mockCallBack;

  app.allinvuses_local = [];
  app.allinvuses = [];
  app.allreserveditems = [];

  await controller.changeStatus("STAGED");
});

it("shiptoattn function sets the person info", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  const mockFn = jest.fn();
  controller.loadLots = mockFn;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);

  const invUseDS = newDatasource(invusejsonDS, "invUseDS");
  page.registerDatasource(invUseDS);

  const shipmentDS = newDatasource(shipmentJsonData, "shipmentDS");
  shipmentDS.registerController(controller);
  page.registerDatasource(shipmentDS);

  const issuetoLookupDS = newDatasource([], "issuetoLookupDS");
  issuetoLookupDS.registerController(controller);
  page.registerDatasource(issuetoLookupDS);

  await app.initialize();

  controller.invUsageDS = invUseDS;

  page.state.invUsageLineItem = {
    invuseid: 1,
    invusenum: "1234",
    itemnum: "123",
    description: "Item test",
    lotnum: "123",
    fromlot: "123",
    lottype: "lot",
    frombin: "123",
    siteid: "BEDFORD",
    fromstoreloc: "CENTRAL",
    location: "CENTRAL",
  };

  if (!shipmentDS.getSchema()) {
    await shipmentDS.initializeQbe();
  }
  await shipmentDS.addNew();

  controller.openLocalLookup({
    name: "attentionOfLookup",
    ds: "issuetoLookupDS",
  });
  let options = {
    target: "shiptoattn",
    source: "personid",
  };
  let evt = { personid: "test" };
  expect(invUseDS.item.shiptoattn).toBe(undefined);
  controller.chooseOptionLookupToShipment(options, evt);
  expect(invUseDS.item.shiptoattn).toBe("test");
});

it("executeShipment function test", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  const mockFn = jest.fn();
  controller.loadLots = mockFn;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);

  const shipmentDS = newDatasource(shipmentJsonData, "shipmentDS");
  shipmentDS.registerController(controller);
  page.registerDatasource(shipmentDS);

  const issuetoLookupDS = newDatasource([], "issuetoLookupDS");
  issuetoLookupDS.registerController(controller);
  page.registerDatasource(issuetoLookupDS);

  controller.pageInitialized(page, app);
  page.state.invUsageLineItem = {
    invuseid: 1,
    invusenum: "1234",
    itemnum: "123",
    description: "Item test",
    lotnum: "123",
    fromlot: "123",
    lottype: "lot",
    frombin: "123",
    siteid: "BEDFORD",
    fromstoreloc: "CENTRAL",
    location: "CENTRAL",
  };
  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  await app.initialize();

  if (!shipmentDS.getSchema()) {
    await shipmentDS.initializeQbe();
  }
  await shipmentDS.addNew();
  expect(page.state.saving).toBe(undefined);

  app.setCurrentPage = jest.fn();
  app.toast = jest.fn();
  const changeStatusFn = jest.fn();
  controller.changeStatus = changeStatusFn;
  controller.executeShipment();
  expect(page.state.saving).toBe(true);
});

it("validateLookup function test", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  const mockFn = jest.fn();
  controller.loadLots = mockFn;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);

  const issuetoLookupDS = newDatasource(personJsonData, "issuetoLookupDS");
  issuetoLookupDS.registerController(controller);
  page.registerDatasource(issuetoLookupDS);

  const billtoshiptoDS = newDatasource(addressJsonData, "billtoshiptoDS");
  billtoshiptoDS.registerController(controller);
  page.registerDatasource(billtoshiptoDS);

  const shipmentDS = newDatasource(shipmentJsonData, "shipmentDS");
  shipmentDS.registerController(controller);
  page.registerDatasource(shipmentDS);
  controller.pageInitialized(page, app);

  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  await app.initialize();

  app.client = {
    userInfo: {
      defaultSite: "BEDFORD",
    },
  };

  page.state.invUsageLineItem = {
    invuseid: 1,
    invusenum: "1234",
    itemnum: "123",
    description: "Item test",
    lotnum: "123",
    fromlot: "123",
    lottype: "lot",
    frombin: "123",
    siteid: "BEDFORD",
    fromstoreloc: "CENTRAL",
    location: "CENTRAL",
  };

  if (!shipmentDS.getSchema()) {
    await shipmentDS.initializeQbe();
  }
  controller.invUsageDS = jsonds;
  await shipmentDS.addNew();

  expect(page.state.invalidshiptoattn).toBe(undefined);
  await controller.validatePerson({ value: "test" });
  expect(page.state.invalidshiptoattn).toBe(true);

  await controller.validatePerson({ value: "HENRY" });
  expect(page.state.invalidshiptoattn).toBe(false);

  await controller.validatePerson({ value: "" });
  expect(page.state.invalidshiptoattn).toBe(false);

  expect(page.state.invalidshipto).toBe(undefined);
  await controller.validateShipTo({ value: "test" });
  expect(page.state.invalidshipto).toBe(true);

  await controller.validateShipTo({ value: "CHILEHDQTRS" });
  expect(page.state.invalidshipto).toBe(false);

  await controller.validateShipTo({ value: "" });
  expect(page.state.invalidshipto).toBe(false);

  let openLocalLookup = jest.spyOn(controller, "openLocalLookup");
  controller.invUsageDS = jsonds;
  controller.invUsageDS.searchQBE = jest.fn();
  jsonds.item.invuseline = [{ tositeid: "test" }];
  await controller.openBilltoshiptoLookup();

  expect(openLocalLookup).toHaveBeenCalled();
});

it("handlePackingLipnumBarcodeScan function sets the scan info", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  const mockFn = jest.fn();
  controller.loadLots = mockFn;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);

  const shipmentDS = newDatasource(shipmentJsonData, "shipmentDS");
  shipmentDS.registerController(controller);
  page.registerDatasource(shipmentDS);

  const issuetoLookupDS = newDatasource([], "issuetoLookupDS");
  issuetoLookupDS.registerController(controller);
  page.registerDatasource(issuetoLookupDS);

  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);

  await app.initialize();

  controller.invUsageDS = invuseDS;

  page.state.invUsageLineItem = {
    invuseid: 1,
    invusenum: "1234",
    itemnum: "123",
    description: "Item test",
    lotnum: "123",
    fromlot: "123",
    lottype: "lot",
    frombin: "123",
    siteid: "BEDFORD",
    fromstoreloc: "CENTRAL",
    location: "CENTRAL",
  };

  if (!shipmentDS.getSchema()) {
    await shipmentDS.initializeQbe();
  }
  await shipmentDS.addNew();

  let evt = { value: "test" };
  expect(invuseDS.item.packingslipnum).toBe(undefined);
  controller.handlePackingLipnumBarcodeScan(evt);
  expect(invuseDS.item.packingslipnum).toBe("test");
});

it("checkTransferMaxvar and doTransfer function test: txfrreqship==ORG && lines sent to multiple place/org", async () => {
  const app = new Application();
  app.state.selectedInvUseDSName = "invUseDS";
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  const jsonds = newDatasource(
    invusejsonDS_transferMaxvar_data1,
    "jsoninusageDS"
  );
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);
  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  sinon
    .stub(jsonds, "getItems")
    .returns(invusejsonDS_transferMaxvar_data1.member);
  await app.initialize();
  await invuseDS.load();
  await jsonds.load();

  page.registerController(controller);
  app.registerPage(page);
  page.params = { items: [] };
  app.setCurrentPage(page);

  controller.doTransfer();
});

it("checkTransferMaxvar and doTransfer function test: txfrreqship==ORG && lines sent to the same org && toorgid==orgid", async () => {
  const app = new Application();
  app.state.selectedInvUseDSName = "invUseDS";
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  const jsonds = newDatasource(
    invusejsonDS_transferMaxvar_data1,
    "jsoninusageDS"
  );
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);
  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  let items = JSON.parse(
    JSON.stringify(invusejsonDS_transferMaxvar_data1.member)
  );
  items.pop();
  sinon.stub(jsonds, "getItems").returns(items);
  await app.initialize();
  await invuseDS.load();
  await jsonds.load();
  page.registerController(controller);
  app.registerPage(page);
  page.params = { items: [] };
  app.setCurrentPage(page);

  controller.doTransfer();
});

it("checkTransferMaxvar and doTransfer function test: txfrreqship==ORG && lines sent to the same org && toorgid!=orgid", async () => {
  const app = new Application();
  app.state.selectedInvUseDSName = "invUseDS";
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  const jsonds = newDatasource(
    invusejsonDS_transferMaxvar_data3,
    "jsoninusageDS"
  );
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  let items = JSON.parse(
    JSON.stringify(invusejsonDS_transferMaxvar_data3.member)
  );
  items.pop();
  sinon.stub(jsonds, "getItems").returns(items);
  await app.initialize();
  await invuseDS.load();
  await jsonds.load();

  page.registerController(controller);
  app.registerPage(page);
  page.params = { items: [] };
  app.setCurrentPage(page);

  controller.doTransfer();
});

it("checkTransferMaxvar and doTransfer function test: txfrreqship==ORG && lines sent to the same org && toorgid!=orgid && lines sent to multiple site", async () => {
  const app = new Application();
  app.state.selectedInvUseDSName = "invUseDS";
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  const invuseDS = newDatasource(invuseListDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  const jsonds = newDatasource(
    invusejsonDS_transferMaxvar_data2,
    "jsoninusageDS"
  );
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseListDS.member)));
  let items = JSON.parse(
    JSON.stringify(invusejsonDS_transferMaxvar_data2.member)
  );
  sinon.stub(jsonds, "getItems").returns(items);
  await app.initialize();
  await invuseDS.load();
  await jsonds.load();

  page.registerController(controller);
  app.registerPage(page);
  page.params = { items: [] };
  app.setCurrentPage(page);

  controller.doTransfer();
});

it("checkTransferMaxvar and doTransfer function test: txfrreqship==SITE && lines sent to multiple place/site", async () => {
  const app = new Application();
  app.state.selectedInvUseDSName = "invUseDS";
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  const invuseDS = newDatasource(invuseRotatingDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  const jsonds = newDatasource(
    invusejsonDS_transferMaxvar_data1,
    "jsoninusageDS"
  );
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseRotatingDS.member)));
  let items = JSON.parse(
    JSON.stringify(invusejsonDS_transferMaxvar_data1.member)
  );
  sinon.stub(jsonds, "getItems").returns(items);
  await app.initialize();
  await invuseDS.load();
  await jsonds.load();

  page.registerController(controller);
  app.registerPage(page);
  page.params = { items: [] };
  app.setCurrentPage(page);

  controller.doTransfer();
});

it("checkTransferMaxvar and doTransfer function test: txfrreqship==SITE && lines to the same site && tositeid==siteid", async () => {
  const app = new Application();
  app.state.selectedInvUseDSName = "invUseDS";
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  const invuseDS = newDatasource(invuseRotatingDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  const jsonds = newDatasource(
    invusejsonDS_transferMaxvar_data1,
    "jsoninusageDS"
  );
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseRotatingDS.member)));
  let items = JSON.parse(
    JSON.stringify(invusejsonDS_transferMaxvar_data1.member)
  );
  items.pop();
  sinon.stub(jsonds, "getItems").returns(items);
  await app.initialize();
  await invuseDS.load();
  await jsonds.load();

  page.registerController(controller);
  app.registerPage(page);
  page.params = { items: [] };
  app.setCurrentPage(page);

  controller.doTransfer();
});

it("checkTransferMaxvar and doTransfer function test: txfrreqship==SITE && lines to the same site && tositeid!=siteid", async () => {
  const app = new Application();
  app.state.selectedInvUseDSName = "invUseDS";
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  const invuseDS = newDatasource(invuseRotatingDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  const jsonds = newDatasource(
    invusejsonDS_transferMaxvar_data3,
    "jsoninusageDS"
  );
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  const shipmentDS = newDatasource(shipmentJsonData, "shipmentDS");
  shipmentDS.registerController(controller);
  page.registerDatasource(shipmentDS);

  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseRotatingDS.member)));
  let items = JSON.parse(
    JSON.stringify(invusejsonDS_transferMaxvar_data3.member)
  );
  items.pop();
  sinon.stub(jsonds, "getItems").returns(items);
  await app.initialize();
  await invuseDS.load();
  await jsonds.load();

  page.registerController(controller);
  app.registerPage(page);
  page.params = { items: [] };
  app.setCurrentPage(page);

  controller.doTransfer();
});

it("checkTransferMaxvar and doTransfer function test: txfrreqship==ALL && lines to the same site", async () => {
  const app = new Application();
  app.state.selectedInvUseDSName = "invUseDS";
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  const invuseDS = newDatasource(invuseDS_txfrreqshipAll_data, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  const jsonds = newDatasource(
    invusejsonDS_transferMaxvar_data3,
    "jsoninusageDS"
  );
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseDS_txfrreqshipAll_data.member)));
  let items = JSON.parse(
    JSON.stringify(invusejsonDS_transferMaxvar_data3.member)
  );
  items.pop();
  sinon.stub(jsonds, "getItems").returns(items);
  await app.initialize();
  await invuseDS.load();
  await jsonds.load();

  page.registerController(controller);
  app.registerPage(page);
  page.params = { items: [] };
  app.setCurrentPage(page);

  controller.doTransfer();
});

it("checkTransferMaxvar and doTransfer function test: txfrreqship==ALL && lines sent to multiple place/site", async () => {
  const app = new Application();
  app.state.selectedInvUseDSName = "invUseDS";
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  const invuseDS = newDatasource(invuseDS_txfrreqshipAll_data, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  const jsonds = newDatasource(
    invusejsonDS_transferMaxvar_data3,
    "jsoninusageDS"
  );
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseDS_txfrreqshipAll_data.member)));
  let items = JSON.parse(
    JSON.stringify(invusejsonDS_transferMaxvar_data3.member)
  );
  sinon.stub(jsonds, "getItems").returns(items);
  await app.initialize();
  await invuseDS.load();
  await jsonds.load();

  page.registerController(controller);
  app.registerPage(page);
  page.params = { items: [] };
  app.setCurrentPage(page);

  controller.doTransfer();
});

it("doStage when include returned items", async () => {
  const app = new Application();
  app.state.selectedInvUseDSName = "invUseDS";
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });
  const invuseDS = newDatasource(invuseRotatingDS, "invUseDS");
  invuseDS.registerController(controller);
  app.registerDatasource(invuseDS);
  const jsonds = newDatasource(
    invusejsonDS_transferMaxvar_data1,
    "jsoninusageDS"
  );
  jsonds.registerController(controller);
  page.registerDatasource(jsonds);

  sinon
    .stub(invuseDS, "getItems")
    .returns(JSON.parse(JSON.stringify(invuseRotatingDS.member)));
  let items = JSON.parse(
    JSON.stringify(invusejsonDS_transferMaxvar_data1.member)
  );
  items.pop();
  sinon.stub(jsonds, "getItems").returns(items);
  await app.initialize();
  await invuseDS.load();
  await jsonds.load();

  page.registerController(controller);
  app.registerPage(page);
  page.params = { items: [] };
  app.setCurrentPage(page);

  controller.doStage();
});

it("openIssueAssetLookup should be called", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  const mockFn = jest.fn();
  page.showDialog = mockFn;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);
  const splitds = newDatasource([], "invsplitjsonDS");
  page.registerDatasource(splitds);
  const assetLookupDS = newLookupDatasource(
    assetLookupData,
    "issueAssetLookupDS",
    "assetnum"
  );
  assetLookupDS.registerController(controller);
  page.registerDatasource(assetLookupDS);
  await app.initialize();
  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);
  sinon.stub(splitds, "load").returns([]);
  sinon.stub(splitds, "getItems").returns([
    {
      rotassetnum: "abc123",
      invuselinesplitid: "1",
    },
    {
      rotassetnum: "abc321",
      invuselinesplitid: "2",
    },
  ]);
  sinon.stub(assetLookupDS, "load").returns([]);
  sinon.stub(assetLookupDS, "clearState");
  sinon.stub(assetLookupDS, "resetState");
  sinon.stub(assetLookupDS, "getSelectedItems").returns([]);
  sinon.stub(assetLookupDS, "initializeQbe");
  sinon.stub(assetLookupDS, "setQBE");
  sinon.stub(assetLookupDS, "setSelectedItem");
  sinon.stub(assetLookupDS, "searchQBE").returns("");
  sinon.stub(assetLookupDS, "getItems").returns([
    {
      assetnum: "abc123",
    },
  ]);

  controller.pageInitialized(page, app);

  const invUsageLineItem = [
    {
      invuseid: 1,
      invusenum: "1234",
      description: "Item test",
      siteid: "BEDFORD",
      status: "ENTERED",
      usetype: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
      fromstoreloc: "BEDFORD",
      orgid: "EAGLENA",
      quantity: 1,
      invuselinenum: 1,
      invuselineid: 1,
      itemnum: "1234",
      location: "CENTRAL",
    },
  ];

  page.state.invUsageLineItem = invUsageLineItem;

  assetLookupDS.initializeQbe = () => {};
  assetLookupDS.setQBE = () => {};
  assetLookupDS.searchQBE = () => {
    return "";
  };

  controller.app.client = {
    userInfo: {
      defaultStoreroomSite: "BEDFORD",
    },
  };
  await controller.openAssetLookupByIssue();

  expect(page.state.invUsageLineItem.location).toBe(undefined);
  expect(page.state.invUsageLineItem.assetnum).toBe(undefined);

  controller.chooseIssueAsset(assetLookupData.member[0]);

  expect(page.state.invUsageLineItem.location).toBe("OFF301");
  expect(page.state.invUsageLineItem.assetnum).toBe("1008");

  controller.cleanAsset();

  expect(page.state.invUsageLineItem.location).toBe("OFF301");
  expect(page.state.invUsageLineItem.assetnum).toBeUndefined();
});

it("handleBarcodeScan should be called", async () => {
  const app = new Application();
  const controller = new InventoryUsagePageController();
  const page = new Page({
    name: "invUsage",
  });

  page.params.items = itemsInvUsage;
  const mockFn = jest.fn();
  page.showDialog = mockFn;

  page.registerController(controller);
  app.registerPage(page);
  const jsonds = newDatasource(invusejsonDS, "jsoninusageDS");
  page.registerDatasource(jsonds);

  await app.initialize();
  sinon.stub(jsonds, "addNew").returns({});
  sinon.stub(jsonds, "getItems").returns(invusejsonDS.member);

  controller.pageInitialized(page, app);

  const invUsageLineItem = [
    {
      invuseid: 1,
      invusenum: "1234",
      description: "Item test",
      siteid: "BEDFORD",
      status: "ENTERED",
      usetype: "ISSUE",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
      fromstoreloc: "BEDFORD",
      orgid: "EAGLENA",
      quantity: 1,
      invuselinenum: 1,
      invuselineid: 1,
      itemnum: "1234",
      location: "CENTRAL",
    },
  ];

  page.state.invUsageLineItem = invUsageLineItem;

  expect(page.state.invUsageLineItem.refwo).toBe(undefined);
  expect(page.state.invUsageLineItem.taskid).toBe(undefined);

  controller.handleWOBarcodeScan({ value: "test" });
  controller.handleTaskBarcodeScan({ value: "test2" });

  expect(page.state.invUsageLineItem.wonum).toBe("test");
  expect(page.state.invUsageLineItem.taskid).toBe("test2");
});

/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2023 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import InventoryUsageListPageController from "./InventoryUsageListPageController";
import {
  JSONDataAdapter,
  Datasource,
  Application,
  Page,
} from "@maximo/maximo-js-api";
import reservationsListDS from "./test/test-reservations-data";
import invuseListDS from "./test/test-invusage-data";
import invuseStatusDomainData from "./test/invbal-invusestatus-domain-data";
import sinon from "sinon";

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

it("Page initialized", async () => {
  const app = new Application();
  const controller = new InventoryUsageListPageController();
  const page = new Page({
    name: "invUsageList",
    clearStack: false,
  });

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "invUseStatusDS"
  );
  app.registerDatasource(invuseStatusDomainDS);
  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);
  sinon
    .stub(invuseStatusDomainDS, "getItems")
    .returns(invuseStatusDomainData.member);

  app.state.selectedInvUseDSName = "invUseDS";

  const invUsageDS = newDatasource(invuseListDS, "invUseDS");
  app.registerDatasource(invUsageDS);
  const invUseDS4Validation = newDatasource(
    invuseListDS,
    "invUseDS4Validation"
  );
  app.registerDatasource(invUseDS4Validation);

  sinon.stub(invUsageDS, "load").returns(invuseListDS.member);
  sinon.stub(invUsageDS, "clearState");

  sinon.stub(invUseDS4Validation, "load").returns(invuseListDS.member);
  sinon.stub(invUseDS4Validation, "items").returns(invuseListDS.member);
  sinon.stub(invUseDS4Validation, "clearState");

  let appInitSpy = jest.spyOn(controller, "pageInitialized");

  app.registerPage(page);
  page.registerController(controller);

  const usagePage = new Page({
    name: "invUsage",
  });
  app.registerPage(usagePage);

  await app.initialize();
  expect(appInitSpy).toHaveBeenCalled();
  app.device.isMaximoMobile = false;
  controller.forceUpdateDatasource();
  app.device.isMaximoMobile = true;
  controller.forceUpdateDatasource();
  sinon.stub(invUseDS4Validation, "item").returns(invuseListDS.member[0]);
  await controller.gotoDetails(invuseListDS.member[0]);
  controller.goback();

  app.state.isBackFromInvUsePage = true;
  controller.setupPage();

  sinon.stub(invUseDS4Validation, "item").returns(invuseListDS.member[1]);
  await controller.gotoDetails(invuseListDS.member[1]);
});

it("check  gotoDetails", async () => {
  const app = new Application();
  const controller = new InventoryUsageListPageController();
  const page = new Page({
    name: "invUsageList",
    clearStack: false,
  });

  const invUseDS4Validation = {
    item: invuseListDS.member[0],
    items: invuseListDS.member,
    load: () => {},
  };

  app.findDatasource = () => invUseDS4Validation;

  app.registerPage(page);
  page.registerController(controller);

  const usagePage = new Page({
    name: "invUsage",
  });
  app.registerPage(usagePage);
  controller.app = app;

  const msg =
    "You cannot open inventory usage records that include returns, reservations that require transfer or are of MIXED type in the Issues and Transfers mobile app. Use the Inventory Usage application to make changes.";

  let displayMsg;
  app.toast = (m, t) => {
    displayMsg = m;
  };
  await controller.gotoDetails(invuseListDS.member[0]);
  expect(displayMsg).not.toEqual(msg);

  displayMsg = "";
  invUseDS4Validation.item = invuseListDS.member[1];
  await controller.gotoDetails(invuseListDS.member[1]);
  expect(displayMsg).toEqual(msg);

  displayMsg = "";
  invUseDS4Validation.item = invuseListDS.member[0];
  await controller.gotoDetails(invuseListDS.member[0]);
  expect(displayMsg).not.toEqual(msg);

  displayMsg = "";
  invUseDS4Validation.item = invuseListDS.member[2];
  await controller.gotoDetails(invuseListDS.member[2]);
  expect(displayMsg).toEqual(msg);

  displayMsg = "";
  invUseDS4Validation.item = invuseListDS.member[0];
  await controller.gotoDetails(invuseListDS.member[0]);
  expect(displayMsg).not.toEqual(msg);

  displayMsg = "";
  invUseDS4Validation.item = invuseListDS.member[3];
  await controller.gotoDetails(invuseListDS.member[3]);
  expect(displayMsg).not.toEqual(msg);

  displayMsg = "";
  invUseDS4Validation.item = invuseListDS.member[4];
  await controller.gotoDetails(invuseListDS.member[4]);
  expect(displayMsg).not.toEqual(msg);

  displayMsg = "";
  invUseDS4Validation.item = invuseListDS.member[5];
  await controller.gotoDetails(invuseListDS.member[5]);
  expect(displayMsg).toEqual(msg);
});

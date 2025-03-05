/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import SubMenuPageController from "./SubMenuPageController";
import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource,
} from "@maximo/maximo-js-api";

function newDatasource(data = "", name = "actionListDS") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "label",
    name: name,
  });

  return ds;
}

it("submenu-data loads", async () => {
  let app = new Application();
  const subMenuPage = new Page({
    name: "main",
    clearStack: false,
  });
  let subMenuPageController = new SubMenuPageController();
  app.registerController(subMenuPageController);
  const actionListDS = newDatasource({ items: [] }, "actionListDS");
  subMenuPage.registerDatasource(actionListDS);
  subMenuPageController.pageInitialized(subMenuPage, app);
  subMenuPageController.pageResumed(subMenuPage, app);
});

it("subMenu show selected page", async () => {
  let controller = new SubMenuPageController();
  let invUsageController = new SubMenuPageController(); // just use same controller for .pageInitialized
  let invUsageListController = new SubMenuPageController(); // just use same controller for .pageInitialized
  let app = new Application();

  const subMenuPage = new Page({
    name: "main",
    clearStack: false,
  });

  const invUsagePage = new Page({
    name: "invUsage",
    clearStack: false,
  });

  const invUsageListPage = new Page({
    name: "invUsageList",
    clearStack: false,
  });

  let callUserApi = false;

  app.registerController(controller);
  app.registerController(invUsageController);
  app.registerController(invUsageListController);

  subMenuPage.registerController(controller);
  invUsagePage.registerController(invUsageController);
  invUsageListPage.registerController(invUsageListController);

  app.registerPage(subMenuPage);
  app.registerPage(invUsagePage);
  app.registerPage(invUsageListPage);

  await app.initialize();
  app.client = { userInfo: { defaultStoreroom: "CENTRAL" } };
  expect(controller.page).toBeTruthy();
  controller.pageInitialized(subMenuPage, app);

  controller.subMenuListGotoCreateInv({ page: invUsagePage.name });
  expect(invUsageController.page).toBeTruthy();
  invUsageController.pageInitialized(invUsagePage, app);

  controller.subMenuListGoto(invUsageListPage.name);
  expect(invUsageListController.page).toBeTruthy();
  invUsageListController.pageInitialized({ page: invUsageListPage, app });

  controller.subMenuListGotoCreateInv({ page: "notexistpage" });
  controller.subMenuListGoto({ page: "notexistpage" });

  app.client = {
    userInfo: { defaultStoreroom: null },
    restclient: {
      get: () => {
        callUserApi = true;
      },
    },
  };

  expect(callUserApi).toBe(false);

  let toastSpy = jest.spyOn(app, "toast");

  await controller.subMenuListGotoCreateInv({ page: invUsagePage.name });
  await controller.subMenuListGoto(invUsageListPage.name);
  app.getLocalizedLabel = jest.fn();
  expect(callUserApi).toBe(true);

  app.client = {
    userInfo: { defaultStoreroom: "TEST" },
    restclient: {
      get: () => {
        callUserApi = true;
      },
    },
  };
  await controller.subMenuListGotoCreateInv({ page: invUsagePage.name });
  await controller.subMenuListGoto(invUsageListPage.name);
  expect(toastSpy).toHaveBeenCalledTimes(2);
});

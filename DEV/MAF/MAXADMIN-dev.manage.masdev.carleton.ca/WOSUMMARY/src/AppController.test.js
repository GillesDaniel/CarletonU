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

import AppController from "./AppController";
import {Application} from "@maximo/maximo-js-api";
import sinon from 'sinon';

describe("AppController", () => {
  it("loads controller", async () => {
    const controller = new AppController();
    let appInitSpy = jest.spyOn(controller, "applicationInitialized");
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    expect(appInitSpy).toHaveBeenCalled();
    expect(controller.app).toBe(app);
  });
});

it("Validate setup incoming context with wonum", async () => {
  const controller = new AppController();
  let appInitSpy = jest.spyOn(controller, "applicationInitialized");
  const app = new Application();
  app.registerController(controller);
  const setupIncomingContext = sinon.spy(controller, 'setupIncomingContext');
  app.state.incomingContext = {
    page: 'WOSummaryPage',
    href: "oslc/os/mxapiwodetail/_QkVERk9SRC8zMzEw",
    wonum: '3310',
  };
  await app.initialize();
  expect(appInitSpy).toHaveBeenCalled();
  expect(controller.app).toBe(app);
  sinon.assert.callCount(setupIncomingContext, 1);
});

it("Validate setup incoming context without wonum", async () => {
  const controller = new AppController();
  let appInitSpy = jest.spyOn(controller, "applicationInitialized");
  const app = new Application();
  app.registerController(controller);
  const setupIncomingContext = sinon.spy(controller, 'setupIncomingContext');
  app.state.incomingContext = {
    page: 'assetDetails',
    href: "oslc/os/mxapiwodetail/_QkVERk9SRC8zMzEw",
  };
  await app.initialize();
  expect(appInitSpy).toHaveBeenCalled();
  expect(controller.app).toBe(app);
  sinon.assert.callCount(setupIncomingContext, 1);
});
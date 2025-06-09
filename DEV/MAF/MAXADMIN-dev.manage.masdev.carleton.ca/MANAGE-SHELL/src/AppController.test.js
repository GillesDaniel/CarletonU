import AppController from "./AppController";

import { Application,
   ShellCommunicator,
   MASAPI,
  DataFormatter } from "@maximo/maximo-js-api";
const AppConfig = {
  productName: "Maximo Application Suite",
  title: "Manage 1",
  headerActions: [
    {
      id: "Bulletin",
      label: "Bulletin",
      icon: "carbon:bullhorn",
      clickAction: "sendEvent",
      clickArgs: { type: "showbboard" },
    },
  ],
  profileActions: [
    {
      id: "personalMenuItem1",
      label: "Default Information",
      clickAction: "sendEvent",
      clickArgs: { type: "DEFAULT" },
    },
  ],
  helpActions: [
    {
      id: "helpMenuItem1",
      label: "IBM",
      href: "https://www.ibm.com",
    },
    {
      id: "System Info",
      label: "System Information",
      clickAction: "sendEvent",
      clickArgs: { type: "helpabout" },
    },
  ],
  sideNav: {
    clickAction: "callFunction",
    clickArgs: {
      functionName: "alert",
      args: ["TODO: toggle side nav"],
    },
  },
  skipTo: {
    clickAction: "callFunction",
    clickArgs: {
      functionName: "focusItemNow",
      args: ["main_content"],
    },
  },
};
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
  it("Send event", async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    let appInitSpy = jest.spyOn(ShellCommunicator.get(), "emit");
    controller.sendEvent({ type: "DEFAULT" });
    expect(appInitSpy).toHaveBeenCalled();
    // expect(sendEventSpy).toHaveBeenCalled();
  });
  it("callFunction", async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    let appInitSpy = jest.spyOn(ShellCommunicator.get(), "emit");
    controller.callFunction(
      {
        functionName: "alert",
        args: ["TODO: Open Report menu"],
      },
      {
        target: {
          getBoundingClientRect: () => {
            return { left: 1, right: 1, top: 1, bottom: 1 };
          },
        },
      }
    );
    expect(appInitSpy).toHaveBeenCalled();
    // expect(sendEventSpy).toHaveBeenCalled();
  });
  it("callFunction without args", async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    let spy = jest.spyOn(ShellCommunicator.get(), "emit");
    controller.callFunction(
      {
        functionName: "alert",
      },
      {
        target: {
          getBoundingClientRect: () => {
            return { left: 1, right: 1, top: 1, bottom: 1 };
          },
        },
      }
    );
    expect(spy).toHaveBeenCalled();
    // expect(sendEventSpy).toHaveBeenCalled();
  });
  it("changeHeader and getHeaderActions", async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    let config = controller.getHeaderActions();
    expect(config.length).toBe(0);
    controller.changeHeader(AppConfig);
    expect(app.state.productName).toBe(AppConfig.productName);
    config = controller.getHeaderActions();
    expect(config.length).toBe(1);
    let spy = jest.spyOn(controller, "sendEvent");
    config[0].onClick();
    expect(spy).toHaveBeenCalled();
  });
  it("changeHeader and getHeaderActions without defined click action", async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    controller.changeHeader({ headerActions: [{}] });
    let config = controller.getHeaderActions();
    expect(config.length).toBe(1);
    let spy1 = jest.spyOn(controller, "sendEvent");
    let spy2 = jest.spyOn(controller, "callFunction");
    config[0].onClick();
    expect(spy1).toHaveBeenCalledTimes(0);
    expect(spy2).toHaveBeenCalledTimes(0);
  });
  it("changeHeader and getProfileActions", async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    let config = controller.getProfileActions();
    expect(config.length).toBe(0);
    controller.changeHeader(AppConfig);
    expect(app.state.productName).toBe(AppConfig.productName);
    config = controller.getProfileActions();
    expect(config.length).toBe(1);
    let spy = jest.spyOn(controller, "sendEvent");
    config[0].onClick();
    expect(spy).toHaveBeenCalled();
  });
  it("changeHeader and getProfileActions without defined click action", async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    controller.changeHeader({ profileActions: [{}] });
    let config = controller.getProfileActions();
    expect(config.length).toBe(1);
    let spy1 = jest.spyOn(controller, "sendEvent");
    let spy2 = jest.spyOn(controller, "callFunction");
    config[0].onClick();
    expect(spy1).toHaveBeenCalledTimes(0);
    expect(spy2).toHaveBeenCalledTimes(0);
  });

    it("changeHeader and getHelpActions", async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    let config = controller.getHelpActions();
    expect(config.length).toBe(0);
    controller.changeHeader(AppConfig);
    expect(app.state.productName).toBe(AppConfig.productName);
    let spy = jest.spyOn(controller, "sendEvent");
    config = controller.getHelpActions();
    expect(config.length).toBe(2);
    expect(config[0].href).toBe(AppConfig.helpActions[0].href);
    config[1].onClick();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it("changeHeader and toggleSideNav", async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    controller.changeHeader(AppConfig);
    let spy1 = jest.spyOn(controller, "sendEvent");
    let spy2 = jest.spyOn(controller, "callFunction");
    controller.toggleSideNav( {
      target: {
        getBoundingClientRect: () => {
          return { left: 1, right: 1, top: 1, bottom: 1 };
        },
      },
    });
    expect(spy1).toHaveBeenCalledTimes(0);
    expect(spy2).toHaveBeenCalledTimes(1);
  });
  it("changeHeader and toggleSideNav without action", async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    controller.changeHeader({sideNav:{}});
    let spy1 = jest.spyOn(controller, "sendEvent");
    let spy2 = jest.spyOn(controller, "callFunction");
    controller.toggleSideNav( {
      target: {
        getBoundingClientRect: () => {
          return { left: 1, right: 1, top: 1, bottom: 1 };
        },
      },
    });
    expect(spy1).toHaveBeenCalledTimes(0);
    expect(spy2).toHaveBeenCalledTimes(0);
  });
  it("changeHeader and toggleSideNav without sidenav", async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    controller.changeHeader({});
    let spy1 = jest.spyOn(controller, "sendEvent");
    let spy2 = jest.spyOn(controller, "callFunction");
    controller.toggleSideNav( {
      target: {
        getBoundingClientRect: () => {
          return { left: 1, right: 1, top: 1, bottom: 1 };
        },
      },
    });
    expect(spy1).toHaveBeenCalledTimes(0);
    expect(spy2).toHaveBeenCalledTimes(0);
  });
  it("changeHeader and skipTo ", async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    controller.changeHeader(AppConfig);
    let spy1 = jest.spyOn(controller, "sendEvent");
    let spy2 = jest.spyOn(controller, "callFunction");
    window.location.hash= "#/main-content"
    controller.skipTo();
    expect(spy1).toHaveBeenCalledTimes(0);
    expect(spy2).toHaveBeenCalledTimes(1);
  });
  it("changeHeader and skipTo with empty", async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    controller.changeHeader({});
    let spy1 = jest.spyOn(controller, "sendEvent");
    let spy2 = jest.spyOn(controller, "callFunction");
    controller.skipTo();
    expect(spy1).toHaveBeenCalledTimes(0);
    expect(spy2).toHaveBeenCalledTimes(0);
  });

  it('will not fetch resources without appid and lang', async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    controller.fetchUserDefinedCSS();
    expect(MASAPI.get().getMastheadResources({})).toEqual(undefined);
    expect(MASAPI.get().getMastheadResources({appId: 'xxx'})).toEqual(undefined);
    expect(MASAPI.get().getMastheadResources({lang: 'xxxx'})).toEqual(undefined);
   });

  it("On mas-shell-fetch-css-override, user defined CSS should be fetched", async () => {
    const mockFetch = {
      customization: {
        css: {
          main: "/custom-css.css",
        },
      },
    };
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    ShellCommunicator.get().on = jest.fn((event, callback) => {
      if (event === 'mas-shell-fetch-css-override') {
        // Call the callback function with a mock event object
        callback();
      }
    });
    await app.initialize();
    controller.fetchUserDefinedCSS();
    MASAPI.get().getMastheadResources = await jest.fn().mockReturnValue(
      Promise.resolve(mockFetch)
    );
    const data = await controller.fetchUserDefinedCSS();
    expect(data).toEqual("/custom-css.css");
  });

  it("session storage", async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    controller.changeHeader({"uisessionid":123});

    expect(controller.getSessionId()).toBe(123);
    controller.cleanUp()
    expect(controller.getSessionId()).toBe(false);
  });
});







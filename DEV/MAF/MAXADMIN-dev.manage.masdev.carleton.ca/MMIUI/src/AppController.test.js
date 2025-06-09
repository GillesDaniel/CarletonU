import AppController from "./AppController";

import {
  Application
} from '@maximo/maximo-js-api';

it("loads controller", async () => {
  const controller = new AppController();
  let appInitSpy = jest.spyOn(controller, "applicationInitialized");
  const app = new Application();
  app.registerController(controller);
  await app.initialize();
  expect(appInitSpy).toHaveBeenCalled();
  expect(controller.app).toBe(app);
});


it("gather log", async () => {
  const controller = new AppController();
  const app = new Application();
  app.registerController(controller);
  await app.initialize();
  expect(controller.app).toBe(app);

  const event = {'item':{'identifier':'test123'}};
  controller.handleGatherLogs(event);
  expect(controller.app.state.logItem.identifier).toBe('test123');
});

it("check server detail", async () => {
  const controller = new AppController();
  const app = new Application();
  app.registerController(controller);
  await app.initialize();
  expect(controller.app).toBe(app);

  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;

  const event = {'item':{'identifier':'test123'}};
  controller.handleCheckServerDetail(event);
  expect(app.state.currentServerId).toBe('test123');
  expect(mockSetPage.mock.calls[0][0].name).toBe('serverdetail');
  expect(mockSetPage.mock.calls[0][0].params.serverIdentifier).toBe('test123');

});


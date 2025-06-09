import {
  Application,
  AppSwitcher,
  MaximoAppSwitcher,
} from '@maximo/maximo-js-api';
import AppController from '../AppController';

describe('AppController', () => {
  it('loads controller', async () => {
    const controller = new AppController();
    const appInitSpy = jest.spyOn(controller, 'applicationInitialized');
    const app = new Application();
    app.registerController(controller);
    await app.initialize();
    expect(appInitSpy).toHaveBeenCalled();
    expect(controller.app).toBe(app);
  });

  it('invokes AppSwitcher when loadApp', () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);
    app.initialize();
    AppSwitcher.setImplementation(MaximoAppSwitcher, { app });
    const switcher = AppSwitcher.get();
    const gotoApplicationSpy = jest.spyOn(switcher, 'gotoApplication');

    const loadAppArgs = {
      appName: 'Dispatcher',
      context: { context: 1 },
      options: { embedded: true },
    };
    controller.loadApp(loadAppArgs);
    expect(gotoApplicationSpy).toHaveBeenCalledWith(
      loadAppArgs.appName,
      loadAppArgs.context,
      loadAppArgs.options
    );

    controller.loadApp();
    expect(gotoApplicationSpy).toHaveBeenCalledWith('RLASSIGN', {}, {});

    expect(gotoApplicationSpy).toHaveBeenCalledTimes(2);
  });

  it('goes to Dashboard page', async () => {
    const controller = new AppController();
    const app = new Application();
    app.registerController(controller);

    await app.initialize();

    const setCurrentPageSpy = jest.spyOn(controller.app, 'setCurrentPage');
    controller.goToDashboardPage();
    expect(setCurrentPageSpy).toHaveBeenCalledWith('dispatch');
  });

  describe('Publish schedule', () => {
    let controller;
    let app;
    let showDialogSpy;
    let findDatasourceSpy;
    let toastSpy;
    let closeDialogMock;
    let getLocalizedLabelSpy;
    let findPageSpy;

    beforeEach(() => {
      controller = new AppController();
      app = new Application();
      controller.app = app;

      closeDialogMock = jest.fn();

      showDialogSpy = jest.spyOn(controller.app, 'showDialog');

      findDatasourceSpy = jest
        .spyOn(controller.app, 'findDatasource')
        .mockImplementation(() => ({
          invokeAction: () => Promise.resolve({}),
          item: {
            projectname: 'Mocked',
          },
        }));

      findPageSpy = jest.spyOn(controller.app, 'findPage').mockReturnValue({
        state: { publishingCompleted: false },
        findDialog: () => ({ closeDialog: closeDialogMock }),
      });

      jest
        .spyOn(controller.app, 'getLocalizedLabel')
        .mockImplementation((labelCode, labelText) => labelText);

      toastSpy = jest.spyOn(controller.app, 'toast');
      getLocalizedLabelSpy = jest.spyOn(app, 'getLocalizedLabel');
    });

    it('shows publishing in progress dialog and call findDatasource', async () => {
      await controller.handlePublishScheduleInProgress();
      expect(findPageSpy).toHaveBeenCalledWith('workItemDetails');
      expect(showDialogSpy).toHaveBeenCalledWith('publishingInProgressDialog');
      expect(findDatasourceSpy).toHaveBeenCalledWith('skdprojectsDS');
    });

    it('shows success toast when succeeds in reloading datasource', async () => {
      await controller.handlePublishScheduleInProgress();

      expect(toastSpy).toHaveBeenCalledWith(
        'You have successfully published the Mocked schedule',
        'success'
      );
      expect(getLocalizedLabelSpy).toHaveBeenCalledWith(
        'publish_schedule_success',
        'You have successfully published the Mocked schedule'
      );
    });

    it('shows failure toast and closes the dialog when fails to reload datasource', async () => {
      findDatasourceSpy = jest
        .spyOn(controller.app, 'findDatasource')
        .mockImplementation(() => ({
          invokeAction: () => Promise.resolve({ error: 'mock error' }),
        }));

      await controller.handlePublishScheduleInProgress();

      expect(toastSpy).toHaveBeenCalledWith('Failed to publish', 'error');
      expect(getLocalizedLabelSpy).toHaveBeenCalledWith(
        'publish_schedule_failure',
        'Failed to publish'
      );
      expect(showDialogSpy).toHaveBeenCalledWith('publishingInProgressDialog');
      expect(closeDialogMock).toHaveBeenCalled();
    });
  });
});

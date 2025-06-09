import { Application, Dialog, Page } from '@maximo/maximo-js-api';
import sinon from 'sinon';
import ConfirmAssignEmergencyWorkController from '../ConfirmAssignEmergencyWorkController';
import EmergencyDataUtils from '../WorkItemDetailsPage/EmergencyWorkTab/EmergencyDataUtils';

describe('ConfirmAssignEmergencyWorkController', () => {
  it('assigns emergency work', async () => {
    const page = new Page({ name: 'workItemDetails' });
    const app = new Application();
    app.registerPage(page);
    const options = {
      name: 'confirmAssignEmergencyWork',
      configuration: {
        appResolver: () => app,
      },
    };

    const confirmAssignEmergencyWorkDialog = new Dialog(options);
    page.registerDialog(confirmAssignEmergencyWorkDialog);
    const controller = new ConfirmAssignEmergencyWorkController();
    controller.app = app;
    const invokeOptimizeAndCheckStatusStub = sinon.stub(
      EmergencyDataUtils,
      'invokeOptimizeAndCheckStatus'
    );

    const findDatasourceSpy = jest
      .spyOn(controller.app, 'findDatasource')
      .mockImplementation(() => ({
        invokeAction: () => Promise.resolve({}),
        forceReload: () => Promise.resolve({}),
        getSelectedItems: () => [
          {
            assignmentid: 2114,
            wonum: 'EMW01',
          },
        ],
        items: () => [
          {
            assignmentid: 2114,
            wonum: 'EMW01',
          },
        ],
        state: { loading: false },
      }));

    const toastSpy = jest.spyOn(controller.app, 'toast');

    const getLocalizedLabelSpy = jest.spyOn(
      controller.app,
      'getLocalizedLabel'
    );

    page.state.selectedResourceItem = {
      laborcode: 'SAM',
    };
    page.state.selectedUnassignedEmergencyWorkItem = {
      assignmentid: 2114,
      wonum: 'EMW01',
      resourcetypename: 'Carpenter',
    };
    page.state.optimizeInvoked = false;

    expect(page.state.confirmationDialogWorkRecord).toBe(undefined);

    controller.dialogInitialized(confirmAssignEmergencyWorkDialog);
    controller.dialogOpened(confirmAssignEmergencyWorkDialog);

    expect(page.state.confirmationDialogWorkRecord).toEqual(', Carpenter');
    expect(page.state.startedAssigning).toBe(undefined);
    await controller.handleAssignEmergencyWork();

    expect(page.state.startedAssigning).toBe(true);

    expect(findDatasourceSpy).toHaveBeenCalledTimes(6);
    expect(findDatasourceSpy).toHaveBeenCalledWith('skdprojectsDS');
    expect(getLocalizedLabelSpy).toHaveBeenCalledTimes(1);
    expect(toastSpy).toHaveBeenCalledTimes(1);
    expect(toastSpy).toHaveBeenCalledWith(
      'Emergency work record EMW01 was assigned.',
      'success'
    );
    expect(invokeOptimizeAndCheckStatusStub.called).toBe(true);

    await controller.handleAssignEmergencyWork();
    expect(page.state.startedAssigning).toBe(true);
  });
});

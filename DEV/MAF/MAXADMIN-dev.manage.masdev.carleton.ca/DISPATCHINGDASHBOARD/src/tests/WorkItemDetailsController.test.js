import {
  JSONDataAdapter,
  Application,
  Datasource,
  Page,
} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import WorkItemDetailsController from '../WorkItemDetailsController';
import sampleProjectItem from '../model/sampleProjectItem';
import ISSUE_TYPE from '../model/issueType';
import sampleActivityItem from './sampleData/sampleActivityItem';

function newDatasource(
  data = sampleProjectItem,
  items = 'member',
  idAttribute = 'id',
  name = 'skdactivityunscheduledDS'
) {
  const da = new JSONDataAdapter({
    src: data,
    items,
  });
  const ds = new Datasource(da, {
    idAttribute,
    name,
  });
  return ds;
}

describe('WorkItemDetailsController', () => {
  describe('displays errors and warnings correctly', () => {
    const warningIssue = {
      type: ISSUE_TYPE.WARNING,
      title: 'FNL',
      message: 'Some warning message',
    };
    const errorIssue = {
      type: ISSUE_TYPE.ERROR,
      title: 'InfeasibleFNL',
      message: 'Error message placeholder',
    };

    it('gets issue titles string', () => {
      const mockGetLocalizedLabel = jest.fn();
      const item1 = {
        wogroup: 'BSTA1122',
        taskid: '3',
      };
      const item2 = {
        wogroup: 'BSTA1123',
      };
      const app = {
        getLocalizedLabel: mockGetLocalizedLabel,
      };

      const controller = new WorkItemDetailsController();
      controller.onDatasourceInitialized({}, {}, app);

      const issueTitle = controller.getIssueTitleString(item2);
      expect(issueTitle).toBe('BSTA1123');
      expect(mockGetLocalizedLabel).not.toHaveBeenCalled();

      controller.getIssueTitleString(item1);
      expect(mockGetLocalizedLabel).toHaveBeenCalled();
      expect(mockGetLocalizedLabel).toHaveBeenCalledWith(
        'schedule_issue_title',
        'BSTA1122 Task 3'
      );
      expect(mockGetLocalizedLabel).toHaveBeenCalledTimes(1);
    });

    it('gets schedule title string', () => {
      const mockGetLocalizedLabel = jest.fn();
      const item = {
        projectname: 'BSTA1',
      };
      const app = {
        getLocalizedLabel: mockGetLocalizedLabel,
      };

      const controller = new WorkItemDetailsController();
      controller.onDatasourceInitialized({}, {}, app);

      controller.getScheduleTitleString(item);
      expect(mockGetLocalizedLabel).toHaveBeenCalledWith(
        'schedule_title_string',
        '{0} schedule',
        ['BSTA1']
      );
      expect(mockGetLocalizedLabel).toHaveBeenCalledTimes(1);
    });

    it('groups errors and warnings', () => {
      const controller = new WorkItemDetailsController();
      expect(
        controller.computeErrorsAndWarnings({
          schedulingerrors: [{ issues: [warningIssue, errorIssue] }],
        })
      ).toEqual({
        errors: [{ issues: [warningIssue, errorIssue] }],
        warnings: [],
      });
    });

    it('show correct icon for issue', () => {
      const controller = new WorkItemDetailsController();
      expect(
        controller.computedIssueIcon({
          schedulingerrors: [{ issues: [errorIssue] }],
        })
      ).toEqual('carbon:error--filled');
      expect(
        controller.computedIssueIcon({
          schedulingerrors: [],
        })
      ).toEqual('');
    });

    it('hides the spacing between errors and warnings lists', () => {
      const controller = new WorkItemDetailsController();
      expect(
        controller.hideIssuesSpacing({
          schedulingerrors: [{ issues: [errorIssue] }],
        })
      ).toBe(true);
      expect(
        controller.hideIssuesSpacing({
          schedulingerrors: [{ issues: [warningIssue] }],
        })
      ).toBe(true);
      expect(
        controller.hideIssuesSpacing({
          schedulingerrors: [{ issues: [warningIssue, errorIssue] }],
        })
      ).toBe(true);
    });
  });

  describe('undo reloads datasource', () => {
    it('undo reloads datasource', () => {
      const controller = new WorkItemDetailsController();
      const ds = newDatasource(
        sampleActivityItem,
        'member',
        'id',
        'skdactivityunscheduledDS'
      );
      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      app.registerController(controller);
      app.registerPage(page);

      const forceReloadStub = sinon.stub(ds, 'forceReload');

      page.registerDatasource(ds);
      page.state.disableSaveButton = false;
      app.initialize();
      controller.onDatasourceInitialized(ds, '', app);
      controller.onUndo();
      expect(forceReloadStub.called).toBe(true);
      expect(page.state.disableSaveButton).toBe(true);

      page.name = 'invalidPageName';
      page.state.disableSaveButton = false;
      controller.onUndo();
      expect(page.state.disableSaveButton).toBe(false);
    });

    it('Reload reloads datasource', async () => {
      const controller = new WorkItemDetailsController();
      const ds = newDatasource(
        sampleActivityItem,
        'member',
        'id',
        'skdactivityunscheduledDS'
      );
      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });
      app.toast = jest.fn();
      app.registerController(controller);
      app.registerPage(page);

      const forceReloadStub = sinon.stub(ds, 'forceReload');

      page.registerDatasource(ds);
      page.state.disableSaveButton = false;
      app.initialize();
      controller.onDatasourceInitialized(ds, '', app);
      await controller.onReload();
      expect(forceReloadStub.called).toBe(true);
      expect(page.state.disableSaveButton).toBe(true);

      page.name = 'invalidPageName';
      page.state.disableSaveButton = false;
      await controller.onReload(true);
      expect(page.state.disableSaveButton).toBe(false);
    });
  });

  describe('save datasource', () => {
    it('save datasource success', async () => {
      const controller = new WorkItemDetailsController();
      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      const projectsDS = newDatasource(
        sampleProjectItem,
        'member',
        'id',
        'skdprojectsDS'
      );

      const activityDS = newDatasource(
        sampleActivityItem,
        'member',
        'id',
        'skdactivityunscheduledDS'
      );
      const forceReloadStub = sinon.stub(activityDS, 'forceReload');

      app.registerController(controller);
      app.registerPage(page);
      app.toast = jest.fn();
      const getLocalizedLabelSpy = jest.spyOn(app, 'getLocalizedLabel');

      const saveStub = sinon
        .stub(activityDS, 'save')
        .returns({ _rowstamp: '986390', href: '' });
      page.registerDatasource(activityDS);
      page.registerDatasource(projectsDS);
      app.initialize();
      controller.onDatasourceInitialized({}, {}, app);

      await controller.onSave(true);
      expect(app.toast.mock.calls.length).toBe(1);
      expect(saveStub.called).toBe(true);
      expect(forceReloadStub.called).toBe(true);

      await controller.onSave(false);
      expect(app.toast.mock.calls.length).toBe(1);
      expect(app.toast).toHaveBeenCalledWith(
        'Record has been saved',
        'success'
      );

      expect(getLocalizedLabelSpy).toHaveBeenCalledWith(
        'activities_save_success',
        'Record has been saved'
      );
    });

    it('save datasource failure', async () => {
      const controller = new WorkItemDetailsController();
      const ds = newDatasource(
        sampleActivityItem,
        'member',
        'id',
        'skdactivityunscheduledDS'
      );
      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });
      const getLocalizedLabelSpy = jest.spyOn(app, 'getLocalizedLabel');

      app.registerController(controller);
      app.registerPage(page);
      app.toast = jest.fn();

      const saveStub = sinon
        .stub(ds, 'save')
        .returns({ error: 'Error occurred' });

      page.registerDatasource(ds);
      app.initialize();
      controller.onDatasourceInitialized(ds, '', app);
      await controller.onSave(false);
      expect(app.toast.mock.calls.length).toBe(0);
      expect(saveStub.called).toBe(true);

      await controller.onSave();
      expect(app.toast.mock.calls.length).toBe(1);
      expect(app.toast).toHaveBeenCalledWith('Failed to save record', 'error');
      expect(getLocalizedLabelSpy).toHaveBeenCalledWith(
        'activities_save_error',
        'Failed to save record'
      );
    });
  });

  it('displays resource ID if resource name is null', () => {
    const controller = new WorkItemDetailsController();
    const craftItem1 = {
      craftdesc: 'Craft used',
      craft: 'ELECT',
    };
    expect(controller.getResourceTypeName(craftItem1)).toEqual('Craft used');

    const craftItem2 = {
      craftdesc: '',
      craft: 'ELECT',
    };
    expect(controller.getResourceTypeName(craftItem2)).toEqual('ELECT');

    const crewItem1 = {
      craft: '',
      crewtypedesc: 'Crew type used',
      amcrewtype: 'RFACABIN',
    };
    expect(controller.getResourceTypeName(crewItem1)).toEqual('Crew type used');

    const crewItem2 = {
      craft: '',
      crewtypedesc: '',
      amcrewtype: 'RFACABIN',
    };
    expect(controller.getResourceTypeName(crewItem2)).toEqual('RFACABIN');
  });

  it('displays laborcode if labor name is null', () => {
    const controller = new WorkItemDetailsController();
    const laborItem1 = {
      laborname: 'Fred Stanley',
      laborcode: 'ELECT',
    };
    expect(controller.getLaborName(laborItem1)).toEqual('Fred Stanley');

    const laborItem2 = {
      laborname: '',
      laborcode: 'ELECT',
    };
    expect(controller.getLaborName(laborItem2)).toEqual('ELECT');

    const crewItem1 = {
      craft: '',
      crewtypedesc: 'Crew type used',
      amcrewtype: 'RFACABIN',
    };
    expect(controller.getLaborName(crewItem1)).toEqual('Crew type used');

    const crewItem2 = {
      craft: '',
      crewtypedesc: '',
      amcrewtype: 'RFACABIN',
    };
    expect(controller.getLaborName(crewItem2)).toEqual('RFACABIN');
  });

  describe('time conversion', () => {
    it('convert seconds to hours seconds', () => {
      const controller = new WorkItemDetailsController();
      const item = {
        drivetimesec: 4000,
      };
      expect(controller.formatSecondsToHoursSeconds(item)).toEqual('01:06');
    });

    it('format timestamp as hours:minutes am/pm', () => {
      const controller = new WorkItemDetailsController();

      const itemNoStarttime = {
        nostarttime: '2023-12-13T08:19:00',
      };
      expect(controller.formatTime(itemNoStarttime)).toEqual('');

      const itemNoLeadingZero = {
        starttimedate: '2023-12-13T11:19:00',
      };
      expect(controller.formatTime(itemNoLeadingZero)).toEqual('11:19 AM');
      const item = {
        starttimedate: '2023-12-13T08:19:00-05:00',
      };
      expect(controller.formatTime(item)).toEqual('8:19 AM');
      const itemPm = {
        starttimedate: '2023-12-13T15:19:00',
      };
      expect(controller.formatTime(itemPm)).toEqual('3:19 PM');
    });
  });
});

import {
  JSONDataAdapter,
  Application,
  Datasource,
  Page,
  AppSwitcher,
  MaximoAppSwitcher,
} from '@maximo/maximo-js-api';
import sinon from 'sinon';
import sampleProjectItem from '../model/sampleProjectItem';
import sampleActivityItem from './sampleData/sampleActivityItem';
import workorderitem from '../model/woDetailData';
import optimizationRunItem from '../model/skdodmerunitem';
import resourceItem from './sampleData/resource';
import resourceNoTypeItem from './sampleData/resourceNoType';
import resourceNoNameItem from './sampleData/resourceNoName';
import resourceNoTimeInfoItem from './sampleData/resourceNoTimeInfo';
import resourceNoDispViewItem from './sampleData/resourceNoDispView';
import resourceNoDispViewOuput from './sampleData/resourceNoDispViewOutput';
import resourceNoTypeOutput from './sampleData/resourceNoTypeOutput';
import resourceNoNameOutput from './sampleData/resourceNoNameOutput';
import resourceNoTimeInfoOutput from './sampleData/resourceNoTimeInfoOutput';
import resourceOutput from './sampleData/resourceOutput';
import WorkItemDetailsPageController from '../WorkItemDetailsPageController';
import resourceNoData from './sampleData/resourceNoData';
import emergencyRecommendationItems from './sampleData/emergencyRecommendations';
import emergencyRecommendationItemsNoMatch from './sampleData/emergencyRecommendationsNoMatch';
import optimizeForEmergencyItem from './sampleData/optimizeForEmergencyItem';
import optimizeForEmergencyItemProcessing from './sampleData/optimizeForEmergencyItemProcessing';
import EmergencyDataUtils from '../WorkItemDetailsPage/EmergencyWorkTab/EmergencyDataUtils';
import resourceNoAssignmentInfoItem from './sampleData/resourceNoAssignmentInfo';
import resourceNoAssignmentOutput from './sampleData/resourceNoAssignmentOutput';
import WorkItemUtils from '../WorkItemUtils';

const sampleActivityItemAssigned = {
  id: 'BSTA1125',
  scenarioname: 'BST_GS',
  skdprojectid: 88,
  name: 'Install Fuel Pump',
  duration: '100',
  sneconstraint: '2022-02-18T14:57:17+00:00',
  fnlconstraint: '2022-02-19T14:57:17+00:00',
  wopriority: 1,
  interruptible: false,
  wonum: '1000',
  resourcename: 'Carpenter',
  laborname: 'Adams',
  laborhrs: '4',
  assetnum: 'ASSET1',
  location: 'LOC1',
  isemergency: true,
  assignstatus: 'ASSIGNED',
  assignstatus_maxvalue: 'ASSIGNED',
  assignstatus_description: 'Assigned',
  wostatus_maxvalue: 'APPR',
};

const emergencyRecommendationAssnID = {
  assignmentid: 2114,
};

const sampleActivityItemComplete = {
  id: 'BSTA1125',
  scenarioname: 'BST_GS',
  skdprojectid: 88,
  name: 'Install Fuel Pump',
  duration: '100',
  sneconstraint: '2022-02-18T14:57:17+00:00',
  fnlconstraint: '2022-02-19T14:57:17+00:00',
  wopriority: 1,
  interruptible: false,
  wonum: '1000',
  resourcename: 'Carpenter',
  laborname: 'Adams',
  laborhrs: '4',
  assetnum: 'ASSET1',
  location: 'LOC1',
  isemergency: true,
  assignstatus: 'COMPLETE',
  assignstatus_maxvalue: 'COMPLETE',
  assignstatus_description: 'Completed',
  wostatus_maxvalue: 'APPR',
};

function newWoDatasource(data = workorderitem, name = 'woDetailds') {
  const da = new JSONDataAdapter({
    src: data,
    items: 'member',
    schema: 'responseInfo.schema',
  });

  const ds = new Datasource(da, {
    idAttribute: 'wonum',
    name,
  });

  return ds;
}

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

describe('WorkItemDetailsPageController', () => {
  describe('onRefresh', () => {
    it('shows success toast when succeeds in reloading datasource', async () => {
      const controller = new WorkItemDetailsPageController();
      const app = new Application();
      controller.app = app;

      const findDatasourceSpy = jest
        .spyOn(controller.app, 'findDatasource')
        .mockImplementation(() => ({
          invokeAction: () => Promise.resolve({}),
          forceReload: () => Promise.resolve({}),
        }));

      const getLocalizedLabelSpy = jest
        .spyOn(controller.app, 'getLocalizedLabel')
        .mockImplementation((labelCode, labelText) => labelText);
      const toastSpy = jest.spyOn(controller.app, 'toast');

      await controller.onRefresh();

      expect(findDatasourceSpy).toHaveBeenCalledWith('skdprojectsDS');
      expect(toastSpy).toHaveBeenCalledWith(
        'Record has been refreshed',
        'success'
      );
      expect(getLocalizedLabelSpy).toHaveBeenCalledWith(
        'refresh_success',
        'Record has been refreshed'
      );
    });

    it('shows failure toast when fails to reload datasource', async () => {
      const controller = new WorkItemDetailsPageController();
      const app = new Application();
      controller.app = app;

      const findDatasourceSpy = jest
        .spyOn(controller.app, 'findDatasource')
        .mockImplementation(() => ({
          invokeAction: () => Promise.resolve({ error: 'mock error' }),
        }));

      const getLocalizedLabelSpy = jest
        .spyOn(controller.app, 'getLocalizedLabel')
        .mockImplementation((labelCode, labelText) => labelText);
      const toastSpy = jest.spyOn(controller.app, 'toast');

      await controller.onRefresh();

      expect(findDatasourceSpy).toHaveBeenCalledWith('skdprojectsDS');
      expect(toastSpy).toHaveBeenCalledWith('Failed to refresh', 'error');
      expect(getLocalizedLabelSpy).toHaveBeenCalledWith(
        'refresh_failure',
        'Failed to refresh'
      );
    });

    it('invokes optimize and retries fetching optimization status when refresh button in clicked in Emergency Work tab', async () => {
      const controller = new WorkItemDetailsPageController();
      const app = new Application();
      const page = new Page({
        name: 'workItemDetails',
      });
      const projectsDS = newDatasource(
        sampleProjectItem,
        'member',
        'id',
        'skdprojectsDS'
      );

      const optimizeDS = newDatasource(
        optimizeForEmergencyItemProcessing,
        'member',
        'id',
        'skdodmerunForEmergenciesDS'
      );

      const activityEmergencyDS = newDatasource(
        sampleActivityItem,
        'member',
        'id',
        'skdactivityDS'
      );

      const jemergencyRecommendationsDS = newDatasource(
        emergencyRecommendationItems,
        'member',
        'id',
        'jemergencyRecommendationsDS'
      );

      const jUnassignedEmergDS = newDatasource(
        sampleActivityItem,
        'member',
        'id',
        'jUnassignedEmergDS'
      );

      const jAssignedEmergDS = newDatasource(
        sampleActivityItem,
        'member',
        'id',
        'jAssignedEmergDS'
      );
      const emergencyRecommendationsDS = newDatasource(
        emergencyRecommendationItems,
        'member',
        'id',
        'skdemrecommendationsDS'
      );
      controller.app = app;
      controller.page = page;
      app.registerController(controller);
      app.registerPage(page);
      page.registerDatasource(projectsDS);
      page.registerDatasource(optimizeDS);
      page.registerDatasource(activityEmergencyDS);
      page.registerDatasource(jemergencyRecommendationsDS);
      page.registerDatasource(jUnassignedEmergDS);
      page.registerDatasource(jAssignedEmergDS);
      page.registerDatasource(emergencyRecommendationsDS);
      app.registerPage(page);
      const invokeOptimizeAndCheckStatusStub = sinon.stub(
        EmergencyDataUtils,
        'invokeOptimizeAndCheckStatus'
      );

      controller.page.state.optimizeInvoked = true;
      await controller.onEmergencyReload();
      expect(invokeOptimizeAndCheckStatusStub.called).toBe(false);

      controller.page.state.optimizeInvoked = false;
      await controller.onEmergencyReload();
      expect(invokeOptimizeAndCheckStatusStub.called).toBe(true);
      invokeOptimizeAndCheckStatusStub.restore();
    });
  });

  describe('optimize dialog', () => {
    let controller;
    let ds;
    let app;
    let page;

    beforeEach(() => {
      controller = new WorkItemDetailsPageController();
      ds = newDatasource(sampleProjectItem, 'member', 'id', 'skdprojectsDS');
      app = new Application();
      page = new Page({ name: 'workItemDetails' });

      app.registerController(controller);
      app.registerPage(page);
      page.registerDatasource(ds);
    });

    it('Open optimize dialog', async () => {
      const skdprojectscenarioDS = newDatasource(
        {
          member: [
            {
              id: 0,
              skdspatialparam: [],
            },
          ],
        },
        'member',
        'id',
        'skdprojectscenarioDS'
      );

      await skdprojectscenarioDS.load();
      app.registerDatasource(skdprojectscenarioDS);
      await app.initialize();

      const dialogSpy = jest.spyOn(page, 'showDialog');
      controller.optimizeDialog();
      expect(dialogSpy).toHaveBeenCalledWith('optimizeScheduleDialog');
    });

    it('Dont open optimize dialog if "skdspatialparam" is not set ', async () => {
      const skdprojectscenarioDS = newDatasource(
        {
          member: [
            {
              id: 0,
            },
          ],
        },
        'member',
        'id',
        'skdprojectscenarioDS'
      );

      app.toast = jest.fn();
      await skdprojectscenarioDS.load();
      app.registerDatasource(skdprojectscenarioDS);
      await app.initialize();

      const dialogSpy = jest.spyOn(page, 'showDialog');
      const getLocalizedLabelSpy = jest
        .spyOn(controller.app, 'getLocalizedLabel')
        .mockImplementation((labelCode, labelText) => labelText);
      controller.optimizeDialog();
      expect(dialogSpy).not.toHaveBeenCalledWith('optimizeScheduleDialog');
      await expect(app.toast.mock.calls.length).toBe(1);
      expect(app.toast).toHaveBeenCalledWith(
        'Failed to open the Optimize dialog',
        'error'
      );
      expect(getLocalizedLabelSpy).toHaveBeenCalledWith(
        'optimization_dialog_open_error',
        'Failed to open the Optimize dialog'
      );
    });
  });

  describe('lookup', () => {
    it('Should select item from the lookup', () => {
      const controller = new WorkItemDetailsPageController();
      jest.spyOn(controller, 'selectLookupItem').mockImplementation(() => {});

      controller.selectCraft([
        { craft: 'testCraft', skilllevel: 'testSkillLevel' },
      ]);
      expect(controller.selectLookupItem).toHaveBeenCalledWith({
        craft: 'testCraft',
        skilllevel: 'testSkillLevel',
      });

      controller.selectLabor([{ laborcode: 'testLaborCode' }]);
      expect(controller.selectLookupItem).toHaveBeenCalledWith({
        laborcode: 'testLaborCode',
      });

      controller.selectCrew([{ amcrew: 'testCrew' }]);
      expect(controller.selectLookupItem).toHaveBeenCalledWith({
        amcrew: 'testCrew',
      });

      controller.selectCrewType([{ amcrewtype: 'testCrewType' }]);
      expect(controller.selectLookupItem).toHaveBeenCalledWith({
        amcrewtype: 'testCrewType',
      });
    });

    it('Should not open lookup window', async () => {
      const woDetailds = newWoDatasource({}, 'woDetailDs');
      const crewTypeDs = newWoDatasource([], 'crewTypelookupDS');

      const da = new JSONDataAdapter({
        src: { ...sampleProjectItem, assignmentid: 14 },
        items: 'member',
      });

      const skdactivityunscheduledDS = new Datasource(da, {
        idAttribute: 'id',
        name: 'skdactivityunscheduledDS',
      });

      const jUnassignedEmergDS = newDatasource(
        sampleActivityItem,
        'member',
        'id',
        'jUnassignedEmergDS'
      );

      const jAssignedEmergDS = newDatasource(
        sampleActivityItem,
        'member',
        'id',
        'jAssignedEmergDS'
      );

      const controller = new WorkItemDetailsPageController();

      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      app.registerController(controller);
      app.registerPage(page);
      page.registerDatasource(skdactivityunscheduledDS);
      page.registerDatasource(woDetailds);
      page.registerDatasource(crewTypeDs);
      page.registerDatasource(jUnassignedEmergDS);
      page.registerDatasource(jAssignedEmergDS);

      page.state.selectedAssignmentId = 11;
      await app.initialize();

      const showLookupSpy = jest.spyOn(controller.app, 'showLookup');
      const setLoadingLookupSpy = jest.spyOn(controller, 'setLoadingLookup');

      await skdactivityunscheduledDS.load();
      await woDetailds.load();

      await controller.openLookup({
        assignmentid: 14,
        lookupId: 'crewType_lookup',
      });
      await crewTypeDs.load();
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(true, 'amcrewtype');
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(false, 'amcrewtype');
      expect(showLookupSpy).not.toHaveBeenCalled();

      await controller.openLookup({
        assignmentid: 14,
        lookupId: 'unknown_lookup',
      });
      await crewTypeDs.load();
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(true, 'amcrewtype');
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(false, 'amcrewtype');
      expect(showLookupSpy).not.toHaveBeenCalled();
    });

    it('Should open lookup window', async () => {
      const woDetailds = newWoDatasource(workorderitem, 'woDetailDs');
      const crewTypeDs = newWoDatasource([], 'crewTypelookupDS');
      const crewLookupDs = newWoDatasource([], 'crewlookupDS');
      const craftlookupDS = newWoDatasource([], 'craftlookupDS');
      const laborlookupDS = newWoDatasource([], 'laborlookupDS');

      const da = new JSONDataAdapter({
        src: { ...sampleProjectItem, assignmentid: 14 },
        items: 'member',
      });

      const skdactivityunscheduledDS = new Datasource(da, {
        idAttribute: 'id',
        name: 'skdactivityunscheduledDS',
      });

      const jUnassignedEmergDS = newDatasource(
        sampleActivityItem,
        'member',
        'id',
        'jUnassignedEmergDS'
      );

      const jAssignedEmergDS = newDatasource(
        sampleActivityItem,
        'member',
        'id',
        'jAssignedEmergDS'
      );

      const controller = new WorkItemDetailsPageController();

      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      app.registerController(controller);
      app.registerPage(page);
      page.registerDatasource(skdactivityunscheduledDS);
      page.registerDatasource(woDetailds);
      page.registerDatasource(crewTypeDs);
      page.registerDatasource(crewLookupDs);
      page.registerDatasource(craftlookupDS);
      page.registerDatasource(laborlookupDS);
      page.registerDatasource(jUnassignedEmergDS);
      page.registerDatasource(jAssignedEmergDS);

      page.state.selectedAssignmentId = 14;
      await app.initialize();

      const showLookupSpy = jest.spyOn(controller.app, 'showLookup');
      const setLoadingLookupSpy = jest.spyOn(controller, 'setLoadingLookup');

      await skdactivityunscheduledDS.load();
      await woDetailds.load();

      await controller.openLookup({ assignmentid: 14 });
      await laborlookupDS.load();
      expect(setLoadingLookupSpy).not.toHaveBeenCalled();
      expect(showLookupSpy).not.toHaveBeenCalled();

      await controller.openLookup({ lookupId: 'crewType_lookup' });
      await laborlookupDS.load();
      expect(setLoadingLookupSpy).not.toHaveBeenCalled();
      expect(showLookupSpy).not.toHaveBeenCalled();

      await controller.openLookup({
        assignmentid: 14,
        lookupId: 'crewType_lookup',
      });
      await crewTypeDs.load();
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(true, 'amcrewtype');
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(false, 'amcrewtype');
      expect(showLookupSpy).toHaveBeenCalledWith('crewType_lookup');

      await controller.openLookup({
        assignmentid: 14,
        lookupId: 'crew_lookup',
      });
      await crewLookupDs.load();
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(true, 'amcrew');
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(false, 'amcrew');
      expect(showLookupSpy).toHaveBeenCalledWith('crew_lookup');

      await controller.openLookup({
        assignmentid: 14,
        lookupId: 'craft_lookup',
      });
      await craftlookupDS.load();
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(true, 'craft');
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(false, 'craft');
      expect(showLookupSpy).toHaveBeenCalledWith('craft_lookup');

      await controller.openLookup({
        assignmentid: 14,
        lookupId: 'labor_lookup',
      });
      await laborlookupDS.load();
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(true, 'laborcode');
      expect(setLoadingLookupSpy).toHaveBeenCalledWith(false, 'laborcode');
      expect(showLookupSpy).toHaveBeenCalledWith('labor_lookup');
    });

    it('Should update assignment when item is selected from the lookup', async () => {
      const da = new JSONDataAdapter({
        src: { ...sampleProjectItem, assignmentid: 123 },
        items: 'member',
      });

      const skdactivityunscheduledDS = new Datasource(da, {
        idAttribute: 'id',
        name: 'skdactivityunscheduledDS',
      });

      const jUnassignedEmergDS = newDatasource(
        sampleActivityItem,
        'member',
        'id',
        'jUnassignedEmergDS'
      );

      const jAssignedEmergDS = newDatasource(
        sampleActivityItem,
        'member',
        'id',
        'jAssignedEmergDS'
      );

      const controller = new WorkItemDetailsPageController();

      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      app.registerController(controller);
      app.registerPage(page);
      page.registerDatasource(skdactivityunscheduledDS);
      page.registerDatasource(jUnassignedEmergDS);
      page.registerDatasource(jAssignedEmergDS);

      await app.initialize();
      controller.pageInitialized(page, app);

      await skdactivityunscheduledDS.load();

      page.state.selectedAssignmentId = 13;

      expect(controller.selectLookupItem({ craft: 'TestCraft' })).toEqual([
        {
          _bulkid: 'BSTA1125',
          assignmentid: 123,
          craft: '',
          crew: '',
          crewType: '',
          duration: '100',
          id: 'BSTA1125',
          labour: '',
          name: 'Install Fuel Pump',
          scheduledStart: '2022-02-18T14:57:17+00:00',
          skillLevel: 'First class',
        },
      ]);

      page.state.selectedAssignmentId = 123;
      await app.initialize();

      expect(controller.selectLookupItem({ craft: 'TestCraft' })).toEqual([
        {
          _bulkid: 'BSTA1125',
          assignmentid: 123,
          computeChanged: true,
          craft: 'TestCraft',
          crew: '',
          crewType: '',
          duration: '100',
          id: 'BSTA1125',
          labour: '',
          name: 'Install Fuel Pump',
          scheduledStart: '2022-02-18T14:57:17+00:00',
          skillLevel: 'First class',
        },
      ]);
    });

    it('Should set loading attribute for lookup', async () => {
      const da = new JSONDataAdapter({
        src: { ...sampleProjectItem, assignmentid: 123 },
        items: 'member',
      });

      const skdactivityunscheduledDS = new Datasource(da, {
        idAttribute: 'id',
        name: 'skdactivityunscheduledDS',
      });

      const jUnassignedEmergDS = newDatasource(
        sampleActivityItem,
        'member',
        'id',
        'jUnassignedEmergDS'
      );

      const jAssignedEmergDS = newDatasource(
        sampleActivityItem,
        'member',
        'id',
        'jAssignedEmergDS'
      );

      const controller = new WorkItemDetailsPageController();

      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      app.registerController(controller);
      app.registerPage(page);
      page.registerDatasource(skdactivityunscheduledDS);
      page.registerDatasource(jUnassignedEmergDS);
      page.registerDatasource(jAssignedEmergDS);

      await app.initialize();
      controller.pageInitialized(page, app);

      await skdactivityunscheduledDS.load();

      page.state.selectedAssignmentId = 123;

      expect(controller.setLoadingLookup(true, 'craft')).toEqual([
        {
          _bulkid: 'BSTA1125',
          assignmentid: 123,
          craft: '',
          craftLoading: true,
          crew: '',
          crewType: '',
          duration: '100',
          id: 'BSTA1125',
          labour: '',
          name: 'Install Fuel Pump',
          scheduledStart: '2022-02-18T14:57:17+00:00',
          skillLevel: 'First class',
        },
      ]);

      page.state.selectedAssignmentId = 444;
      await app.initialize();

      expect(controller.setLoadingLookup(true, 'craft')).toEqual([
        {
          _bulkid: 'BSTA1125',
          assignmentid: 123,
          craft: '',
          craftLoading: false,
          crew: '',
          crewType: '',
          duration: '100',
          id: 'BSTA1125',
          labour: '',
          name: 'Install Fuel Pump',
          scheduledStart: '2022-02-18T14:57:17+00:00',
          skillLevel: 'First class',
        },
      ]);
    });
  });

  it('invokes AppSwitcher when loadApp', () => {
    const controller = new WorkItemDetailsPageController();
    const app = new Application();
    controller.app = app;
    controller.parent = app;

    app.registerController(controller);
    app.initialize();
    AppSwitcher.setImplementation(MaximoAppSwitcher, { app });
    const switcher = AppSwitcher.get();
    const gotoApplicationSpy = jest.spyOn(switcher, 'gotoApplication');

    const loadAppArgs = {
      appName: 'wosummary',
      context: {
        breadcrumb: {
          enableReturnBreadcrumb: true,
          returnName: 'Returning to {0}',
        },
      },
      options: {
        contextParams: { clickedItemId: 1234 },
        embedded: true,
        omitCurrentStatePreservation: true,
        preserveCurrentState: false,
        route: 'WOSummaryPage',
        canReturn: true,
      },
    };
    controller.loadWoSummaryApp({ item: { workorderid: 1234 } });
    expect(gotoApplicationSpy).toHaveBeenCalledWith(
      loadAppArgs.appName,
      loadAppArgs.context,
      loadAppArgs.options
    );

    jest.spyOn(controller.app, 'findDatasource').mockImplementation(() => ({
      invokeAction: () => Promise.resolve({}),
      forceReload: () => Promise.resolve({}),
      getSelectedItems: () => [
        {
          workorderid: 1234,
          wonum: 'EMW01',
        },
      ],
      items: () => [
        {
          workorderid: 1234,
          wonum: 'EMW01',
        },
      ],
    }));

    controller.loadWoSummaryApp();
    expect(gotoApplicationSpy).toHaveBeenCalledWith(
      loadAppArgs.appName,
      loadAppArgs.context,
      loadAppArgs.options
    );
  });

  it('transforms datasource for TreeGrid item has no name', async () => {
    const controller = new WorkItemDetailsPageController();
    const resourceDS = newDatasource(
      resourceNoNameItem,
      'member',
      'id',
      'resourceDispatchDs'
    );
    const activityDS = newDatasource(
      resourceItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const dataAdapter = new JSONDataAdapter({
      src: [
        {
          id: '1',
          Resource: 'Smith, Alan"',
          Shift: 'Day',
          Site: 'Birmingham',
          Run: [
            {
              Start: '2023-06-29T00:00:00-15:00',
              Duration: 6,
              Text: 'Electrical and Mechanical',
            },
            {},
          ],
        },
      ],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdata',
    });

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(resourceDS);
    app.registerDatasource(activityDS);

    await app.initialize();
    controller.pageInitialized(page, app);
    jest
      .spyOn(WorkItemUtils, 'formatDateTime')
      // eslint-disable-next-line no-unused-vars
      .mockImplementation((timestamp, timezone) => '09/20/2023 10:00 AM');

    ds.load();
    await resourceDS.load();
    const dispatchdata = app.findDatasource('dispatchdata');
    const dispatchdataItems = await dispatchdata.load();
    expect(dispatchdataItems).toEqual(resourceNoNameOutput);
    jest.restoreAllMocks();
  });

  it('transforms datasource for TreeGrid item has no start or duration', async () => {
    const controller = new WorkItemDetailsPageController();
    const resourceDS = newDatasource(
      resourceNoTimeInfoItem,
      'member',
      'id',
      'resourceDispatchDs'
    );
    const activityDS = newDatasource(
      resourceItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const dataAdapter = new JSONDataAdapter({
      src: [
        {
          id: '1',
          Resource: 'Smith, Alan"',
          Shift: 'Day',
          Site: 'Birmingham',
          Run: [
            {
              Start: '2023-06-29T00:00:00-15:00',
              Duration: 6,
              Text: 'Electrical and Mechanical',
            },
            {},
          ],
        },
      ],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdata',
    });

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(resourceDS);
    app.registerDatasource(activityDS);

    await app.initialize();
    controller.pageInitialized(page, app);

    ds.load();
    await resourceDS.load();
    const dispatchdata = app.findDatasource('dispatchdata');
    const dispatchdataItems = await dispatchdata.load();
    expect(dispatchdataItems).toEqual(resourceNoTimeInfoOutput);
  });

  it('transforms datasource for TreeGrid item has no resource disp view data', async () => {
    const controller = new WorkItemDetailsPageController();
    const resourceDS = newDatasource(
      resourceNoDispViewItem,
      'member',
      'id',
      'resourceDispatchDs'
    );
    const activityDS = newDatasource(
      resourceItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const dataAdapter = new JSONDataAdapter({
      src: [
        {
          id: '1',
          Resource: 'Smith, Alan"',
          Shift: 'Day',
          Site: 'Birmingham',
          Run: [
            {
              Start: '2023-06-29T00:00:00-15:00',
              Duration: 6,
              Text: 'Electrical and Mechanical',
            },
            {},
          ],
        },
      ],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdata',
    });

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(resourceDS);
    app.registerDatasource(activityDS);

    await app.initialize();
    controller.pageInitialized(page, app);

    ds.load();
    await resourceDS.load();
    const dispatchdata = app.findDatasource('dispatchdata');
    const dispatchdataItems = await dispatchdata.load();
    expect(dispatchdataItems).toEqual(resourceNoDispViewOuput);
  });

  it('transforms datasource for TreeGrid item has no resource type', async () => {
    const controller = new WorkItemDetailsPageController();
    const resourceDS = newDatasource(
      resourceNoTypeItem,
      'member',
      'id',
      'resourceDispatchDs'
    );
    const activityDS = newDatasource(
      resourceItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const dataAdapter = new JSONDataAdapter({
      src: [
        {
          id: '1',
          Resource: 'Smith, Alan"',
          Shift: 'Day',
          Site: 'Birmingham',
          Run: [
            {
              Start: '2023-06-29T00:00:00-15:00',
              Duration: 6,
              Text: 'Electrical and Mechanical',
            },
            {},
          ],
        },
      ],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdata',
    });

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(resourceDS);
    app.registerDatasource(activityDS);

    await app.initialize();
    controller.pageInitialized(page, app);

    jest
      .spyOn(WorkItemUtils, 'formatDateTime')
      // eslint-disable-next-line no-unused-vars
      .mockImplementation((timestamp, timezone) => '09/20/2023 10:00 AM');

    ds.load();
    await resourceDS.load();
    const dispatchdata = app.findDatasource('dispatchdata');
    const dispatchdataItems = await dispatchdata.load();
    expect(dispatchdataItems).toEqual(resourceNoTypeOutput);
    jest.restoreAllMocks();
  });

  it('transforms datasource for TreeGrid item has no assignment info', async () => {
    const controller = new WorkItemDetailsPageController();
    const resourceDS = newDatasource(
      resourceNoAssignmentInfoItem,
      'member',
      'id',
      'resourceDispatchDs'
    );
    const activityDS = newDatasource(
      resourceItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const dataAdapter = new JSONDataAdapter({
      src: [
        {
          id: '1',
          Resource: 'Smith, Alan"',
          Shift: 'Day',
          Site: 'Birmingham',
          Run: [
            {
              Start: '2023-06-29T00:00:00-15:00',
              Duration: 6,
              Text: 'Electrical and Mechanical',
            },
            {},
          ],
        },
      ],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdata',
    });

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(resourceDS);
    app.registerDatasource(activityDS);

    await app.initialize();
    controller.pageInitialized(page, app);
    jest
      .spyOn(WorkItemUtils, 'formatDateTime')
      // eslint-disable-next-line no-unused-vars
      .mockImplementation((timestamp, timezone) => '09/20/2023 10:00 AM');

    ds.load();
    await resourceDS.load();
    const dispatchdata = app.findDatasource('dispatchdata');
    const dispatchdataItems = await dispatchdata.load();
    expect(dispatchdataItems).toEqual(resourceNoAssignmentOutput);
    jest.restoreAllMocks();
  });

  it('transforms datasource for TreeGrid', async () => {
    const controller = new WorkItemDetailsPageController();
    const resourceDS = newDatasource(
      resourceItem,
      'member',
      'id',
      'resourceDispatchDs'
    );
    const activityDS = newDatasource(
      resourceItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const dataAdapter = new JSONDataAdapter({
      src: [
        {
          id: '1',
          Resource: 'Smith, Alan"',
          Shift: 'Day',
          Site: 'Birmingham',
          Run: [
            {
              Start: '2023-06-29T00:00:00-15:00',
              Duration: 6,
              Text: 'Electrical and Mechanical',
            },
            {},
          ],
        },
      ],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdata',
    });
    const otherDs = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'otherDataSource',
    });
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(activityDS);
    app.registerDatasource(otherDs);
    app.registerDatasource(resourceDS);

    await app.initialize();
    controller.pageInitialized(page, app);
    otherDs.load();
    const otherData = app.findDatasource('otherDataSource');
    const otherDataItems = await otherData.load();
    expect(otherDataItems).toEqual([
      {
        Resource: 'Smith, Alan"',
        Run: [
          {
            Start: '2023-06-29T00:00:00-15:00',
            Duration: 6,
            Text: 'Electrical and Mechanical',
          },
          {},
        ],
        Shift: 'Day',
        Site: 'Birmingham',
        _bulkid: '1',
        id: '1',
      },
    ]);

    ds.load();
    await resourceDS.load();
    const dispatchdata = app.findDatasource('dispatchdata');
    const dispatchdataItems = await dispatchdata.load();
    expect(dispatchdataItems).toEqual(resourceOutput);
  });

  it('onAfterLoadData should stop early if datasource has no items', async () => {
    const controller = new WorkItemDetailsPageController();
    const dataAdapter = new JSONDataAdapter({
      src: [],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdata',
    });

    const activityDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(activityDS);

    await app.initialize();
    controller.pageInitialized(page, app);
    ds.load();
    const dispatchdata = app.findDatasource('dispatchdata');
    const dispatchdataItems = await dispatchdata.load();
    expect(dispatchdataItems).toEqual([]);
  });

  it('onAfterLoadData should stop early if resourceDispatchDs has no items', async () => {
    const controller = new WorkItemDetailsPageController();
    const dataAdapter = new JSONDataAdapter({
      src: [],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdata',
    });
    const resourceDispatchDs = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'resourceDispatchDs',
    });
    const activityDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(resourceDispatchDs);
    app.registerDatasource(activityDS);

    await app.initialize();
    controller.pageInitialized(page, app);
    resourceDispatchDs.load();
    const dispatchdata = app.findDatasource('dispatchdata');
    const dispatchdataItems = await dispatchdata.load();
    expect(dispatchdataItems).toEqual(resourceNoData);
  });

  it('onAfterLoadData should set href for skdodmerunlatestDS', async () => {
    const jUnassignedEmergDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'jUnassignedEmergDS'
    );
    const jAssignedEmergDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'jAssignedEmergDS'
    );
    const app = new Application();
    const controller = new WorkItemDetailsPageController();
    app.registerController(controller);
    const updateLatestHrefSpy = jest.spyOn(controller, 'updateRunLatestHref');
    const page = new Page({ name: 'workItemDetails' });
    const expectedHref = 'oslc/mxapiskdproject/_QUNUMi9TUEFUSUFMX1RFU1Q--';
    page.params = { projectname: 'BST', scenario: expectedHref };
    page.registerDatasource(jUnassignedEmergDS);
    page.registerDatasource(jAssignedEmergDS);
    app.registerPage(page);
    controller.page = page;
    expect(page.state.runlatesthref).not.toBeDefined();
    await app.initialize();
    await controller.onAfterLoadData(
      { name: 'skdodmerunlatestDS' },
      optimizationRunItem
    );
    expect(updateLatestHrefSpy).toHaveBeenCalled();
    expect(page.state.runlatesthref).toBe(expectedHref);
  });

  it('onAfterLoadData should update treegrid definition datasource', async () => {
    const controller = new WorkItemDetailsPageController();
    const dataAdapter = new JSONDataAdapter({
      src: [{ Toolbar: {}, Cols: [{}] }],
      items: 'data',
    });
    const ds = new Datasource(dataAdapter, {
      idAttribute: 'id',
      name: 'dispatchdef',
    });

    const activityDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    page.params = { startdate: '2023-11-13' };
    app.registerController(controller);
    app.registerPage(page);

    app.registerDatasource(ds);
    app.registerDatasource(activityDS);

    await app.initialize();
    controller.pageInitialized(page, app);

    await ds.load();
    await controller.onAfterLoadData({ name: 'dispatchdef' }, {});

    expect(ds.items).toEqual([
      {
        Cols: [{ GanttZoomDate: 1699833600000 }],
        Toolbar: { DatePicker: '2023-11-13T00:00:00.000Z' },
        _bulkid: '0',
        _id: 0,
      },
    ]);
  });

  it('onAfterLoadData should load assignment view json data sources for WAITASGN status', async () => {
    const controller = new WorkItemDetailsPageController();

    const activityUnscheduledDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const activityEmergencyDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityDS'
    );
    const projectsDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const jUnassignedEmergDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'jUnassignedEmergDS'
    );
    const jAssignedEmergDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'jAssignedEmergDS'
    );

    const emergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItems,
      'member',
      'id',
      'skdemrecommendationsDS'
    );

    const jemergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItems,
      'member',
      'id',
      'jemergencyRecommendationsDS'
    );

    const optimizeDS = newDatasource(
      optimizeForEmergencyItem,
      'member',
      'id',
      'skdodmerunForEmergenciesDS'
    );

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    page.registerDatasource(activityUnscheduledDS);
    page.registerDatasource(activityEmergencyDS);
    page.registerDatasource(jUnassignedEmergDS);
    page.registerDatasource(jAssignedEmergDS);
    page.registerDatasource(projectsDS);
    page.registerDatasource(emergencyRecommendationsDS);
    page.registerDatasource(jemergencyRecommendationsDS);
    page.registerDatasource(optimizeDS);

    expect(jUnassignedEmergDS.state.selection.selected).toStrictEqual({});
    expect(page.state.selectedUnassignedEmergencyWorkItem).toBeUndefined();

    expect(page.state.resourcePanelHeader).not.toBeDefined();

    app.initialize();
    controller.pageInitialized(page, app);

    expect(page.state.resourcePanelHeader).toBe(
      'dispatcherdashboard#resource_panel_header_default'
    );

    await activityEmergencyDS.load();
    await emergencyRecommendationsDS.load();
    await controller.onAfterLoadData(
      activityEmergencyDS,
      activityEmergencyDS.items
    );

    const defaultSelectedItem = {
      assetnum: 'ASSET1',
      assignedby: undefined,
      assigneddate: undefined,
      assignmentid: 2114,
      assignstatus_description: 'Waiting for assignment',
      craftdesc: undefined,
      laborhrs: '4',
      laborname: 'Adams',
      location: 'LOC1',
      name: 'Install Fuel Pump',
      resourcename: 'Carpenter',
      resourcetypename: undefined,
      skilllevel: undefined,
      wonum: '1000',
      wogroup: '1000',
      wopriority: 1,
      taskid: undefined,
      combinedWogroupAndTaskId: '1000',
      workorderid: '',
    };

    expect(jUnassignedEmergDS.items.length).toBe(1);
    expect(jAssignedEmergDS.items.length).toBe(0);
    expect(jemergencyRecommendationsDS.items.length).toBe(3);
    expect(page.state.selectedUnassignedEmergencyWorkItem).toEqual(
      defaultSelectedItem
    );
    expect(jUnassignedEmergDS.state.selection.selected).toStrictEqual({
      0: { _id: 0, _selected: true, ...defaultSelectedItem },
    });
    expect(page.state.resourcePanelHeader).toBe(
      'dispatcherdashboard#resource_panel_header_for_selected_emergency'
    );
  });

  it('onAfterLoadData should load assignment view json data sources for WAITASGN status with top recommendation', async () => {
    const controller = new WorkItemDetailsPageController();

    const activityUnscheduledDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const activityEmergencyDS = newDatasource(
      { ...sampleActivityItem, taskid: 123, workorderid: 1234 },
      'member',
      'id',
      'skdactivityDS'
    );
    const projectsDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const jUnassignedEmergDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'jUnassignedEmergDS'
    );
    const jAssignedEmergDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'jAssignedEmergDS'
    );

    const emergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItems,
      'member',
      'id',
      'skdemrecommendationsDS'
    );

    const jemergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItems,
      'member',
      'id',
      'jemergencyRecommendationsDS'
    );

    const optimizeDS = newDatasource(
      optimizeForEmergencyItem,
      'member',
      'id',
      'skdodmerunForEmergenciesDS'
    );

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    page.registerDatasource(activityUnscheduledDS);
    page.registerDatasource(activityEmergencyDS);
    page.registerDatasource(jUnassignedEmergDS);
    page.registerDatasource(jAssignedEmergDS);
    page.registerDatasource(projectsDS);
    page.registerDatasource(emergencyRecommendationsDS);
    page.registerDatasource(jemergencyRecommendationsDS);
    page.registerDatasource(optimizeDS);

    expect(page.state.resourcePanelHeader).not.toBeDefined();

    await app.initialize();
    controller.pageInitialized(page, app);

    expect(page.state.resourcePanelHeader).toBe(
      'dispatcherdashboard#resource_panel_header_default'
    );

    page.state.selectedResourcesFilter = 'topRecommendations';

    await activityEmergencyDS.load();
    await emergencyRecommendationsDS.load();
    await controller.onAfterLoadData(
      activityEmergencyDS,
      activityEmergencyDS.items
    );

    expect(jUnassignedEmergDS.items.length).toBe(1);
    expect(jAssignedEmergDS.items.length).toBe(0);
    expect(jemergencyRecommendationsDS.items.length).toBe(2);
    expect(page.state.resourcePanelHeader).toBe(
      'dispatcherdashboard#resource_panel_header_for_selected_emergency'
    );

    expect(page.state.selectedUnassignedEmergencyWorkItem).toEqual({
      assetnum: 'ASSET1',
      assignedby: undefined,
      assigneddate: undefined,
      assignmentid: 2114,
      assignstatus_description: 'Waiting for assignment',
      craftdesc: undefined,
      laborhrs: '4',
      laborname: 'Adams',
      location: 'LOC1',
      name: 'Install Fuel Pump',
      resourcename: 'Carpenter',
      resourcetypename: undefined,
      skilllevel: undefined,
      wonum: '1000',
      wogroup: '1000',
      wopriority: 1,
      taskid: 123,
      combinedWogroupAndTaskId: '1000 (123)',
      workorderid: '1234',
    });
  });

  it('onAfterLoadData  WAITASGN items, no matching recommendations', async () => {
    const controller = new WorkItemDetailsPageController();

    const activityUnscheduledDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const activityEmergencyDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityDS'
    );
    const projectsDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const jUnassignedEmergDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'jUnassignedEmergDS'
    );
    const jAssignedEmergDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'jAssignedEmergDS'
    );

    const emergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItemsNoMatch,
      'member',
      'id',
      'skdemrecommendationsDS'
    );

    const jemergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItemsNoMatch,
      'member',
      'id',
      'jemergencyRecommendationsDS'
    );

    const optimizeDS = newDatasource(
      optimizeForEmergencyItem,
      'member',
      'id',
      'skdodmerunForEmergenciesDS'
    );

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    page.registerDatasource(activityUnscheduledDS);
    page.registerDatasource(activityEmergencyDS);
    page.registerDatasource(jUnassignedEmergDS);
    page.registerDatasource(jAssignedEmergDS);
    page.registerDatasource(projectsDS);
    page.registerDatasource(emergencyRecommendationsDS);
    page.registerDatasource(jemergencyRecommendationsDS);
    page.registerDatasource(optimizeDS);

    expect(page.state.resourcePanelHeader).not.toBeDefined();

    await app.initialize();
    controller.pageInitialized(page, app);

    expect(page.state.resourcePanelHeader).toBe(
      'dispatcherdashboard#resource_panel_header_default'
    );

    await activityEmergencyDS.load();
    await emergencyRecommendationsDS.load();
    await controller.onAfterLoadData(
      activityEmergencyDS,
      activityEmergencyDS.items
    );

    expect(jUnassignedEmergDS.items.length).toBe(1);
    expect(jAssignedEmergDS.items.length).toBe(0);
    expect(jemergencyRecommendationsDS.items.length).toBe(0);
    expect(page.state.resourcePanelHeader).toBe(
      'dispatcherdashboard#resource_panel_header_for_selected_emergency'
    );
  });

  it('onAfterLoadData should load assignment view json data sources for COMPLETE status', async () => {
    const controller = new WorkItemDetailsPageController();

    const activityUnscheduledDS = newDatasource(
      sampleActivityItemComplete,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const activityEmergencyDS = newDatasource(
      sampleActivityItemComplete,
      'member',
      'id',
      'skdactivityDS'
    );
    const projectsDS = newDatasource(
      sampleActivityItemComplete,
      'member',
      'id',
      'skdprojectsDS'
    );
    const jUnassignedEmergDS = newDatasource(
      sampleActivityItemComplete,
      'member',
      'id',
      'jUnassignedEmergDS'
    );
    const jAssignedEmergDS = newDatasource(
      sampleActivityItemComplete,
      'member',
      'id',
      'jAssignedEmergDS'
    );

    const emergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItems,
      'member',
      'id',
      'skdemrecommendationsDS'
    );

    const jemergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItemsNoMatch,
      'member',
      'id',
      'jemergencyRecommendationsDS'
    );

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    page.registerDatasource(activityUnscheduledDS);
    page.registerDatasource(activityEmergencyDS);
    page.registerDatasource(jUnassignedEmergDS);
    page.registerDatasource(jAssignedEmergDS);
    page.registerDatasource(projectsDS);
    page.registerDatasource(emergencyRecommendationsDS);
    page.registerDatasource(jemergencyRecommendationsDS);

    expect(page.state.resourcePanelHeader).not.toBeDefined();

    await app.initialize();
    controller.pageInitialized(page, app);

    expect(page.state.resourcePanelHeader).toBe(
      'dispatcherdashboard#resource_panel_header_default'
    );

    await activityEmergencyDS.load();
    await controller.onAfterLoadData(
      activityEmergencyDS,
      activityEmergencyDS.items
    );

    expect(jUnassignedEmergDS.items.length).toBe(0);
    expect(jAssignedEmergDS.items.length).toBe(1);
    expect(page.state.resourcePanelHeader).toBe(
      'dispatcherdashboard#resource_panel_header_default'
    );
  });

  it('onAfterLoadData should load assignment view json data sources for ASSIGNED status', async () => {
    const controller = new WorkItemDetailsPageController();

    const activityUnscheduledDS = newDatasource(
      sampleActivityItemAssigned,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const activityEmergencyDS = newDatasource(
      sampleActivityItemAssigned,
      'member',
      'id',
      'skdactivityDS'
    );
    const projectsDS = newDatasource(
      sampleActivityItemAssigned,
      'member',
      'id',
      'skdprojectsDS'
    );
    const jUnassignedEmergDS = newDatasource(
      sampleActivityItemAssigned,
      'member',
      'id',
      'jUnassignedEmergDS'
    );
    const jAssignedEmergDS = newDatasource(
      sampleActivityItemAssigned,
      'member',
      'id',
      'jAssignedEmergDS'
    );
    const emergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItems,
      'member',
      'id',
      'skdemrecommendationsDS'
    );

    const jemergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItemsNoMatch,
      'member',
      'id',
      'jemergencyRecommendationsDS'
    );

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    page.registerDatasource(activityUnscheduledDS);
    page.registerDatasource(activityEmergencyDS);
    page.registerDatasource(jUnassignedEmergDS);
    page.registerDatasource(jAssignedEmergDS);
    page.registerDatasource(projectsDS);
    page.registerDatasource(emergencyRecommendationsDS);
    page.registerDatasource(jemergencyRecommendationsDS);

    expect(page.state.resourcePanelHeader).not.toBeDefined();

    await app.initialize();
    controller.pageInitialized(page, app);

    expect(page.state.resourcePanelHeader).toBe(
      'dispatcherdashboard#resource_panel_header_default'
    );

    await activityEmergencyDS.load();
    await controller.onAfterLoadData(
      activityEmergencyDS,
      activityEmergencyDS.items
    );

    expect(jUnassignedEmergDS.items.length).toBe(0);
    expect(jAssignedEmergDS.items.length).toBe(1);
    expect(page.state.resourcePanelHeader).toBe(
      'dispatcherdashboard#resource_panel_header_default'
    );
  });

  it('onAfterLoadData optimization has not been run, no skdodmerunid', async () => {
    const controller = new WorkItemDetailsPageController();

    const activityUnscheduledDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const activityEmergencyDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityDS'
    );
    const projectsDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const jUnassignedEmergDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'jUnassignedEmergDS'
    );
    const jAssignedEmergDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'jAssignedEmergDS'
    );

    const emergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItemsNoMatch,
      'member',
      'id',
      'skdemrecommendationsDS'
    );

    const jemergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItemsNoMatch,
      'member',
      'id',
      'jemergencyRecommendationsDS'
    );

    const optimizeDS = newDatasource(
      { member: [] },
      'member',
      'id',
      'skdodmerunForEmergenciesDS'
    );

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    page.registerDatasource(activityUnscheduledDS);
    page.registerDatasource(activityEmergencyDS);
    page.registerDatasource(jUnassignedEmergDS);
    page.registerDatasource(jAssignedEmergDS);
    page.registerDatasource(projectsDS);
    page.registerDatasource(emergencyRecommendationsDS);
    page.registerDatasource(jemergencyRecommendationsDS);
    page.registerDatasource(optimizeDS);

    expect(page.state.resourcePanelHeader).not.toBeDefined();

    await app.initialize();
    controller.pageInitialized(page, app);

    expect(page.state.resourcePanelHeader).toBe(
      'dispatcherdashboard#resource_panel_header_default'
    );

    await activityEmergencyDS.load();
    await emergencyRecommendationsDS.load();
    await controller.onAfterLoadData(
      activityEmergencyDS,
      activityEmergencyDS.items
    );

    expect(jUnassignedEmergDS.items.length).toBe(1);
    expect(jAssignedEmergDS.items.length).toBe(0);
    expect(jemergencyRecommendationsDS.items.length).toBe(0);
    expect(page.state.resourcePanelHeader).toBe(
      'dispatcherdashboard#resource_panel_header_for_selected_emergency'
    );
  });

  it('test the onValueChanged for skdactivityunscheduledDS', () => {
    const ds = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const item = JSON.parse(JSON.stringify(sampleActivityItem));
    const controller = new WorkItemDetailsPageController();
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);
    controller.page = page;
    page.registerDatasource(ds);
    page.state.disableSaveButton = true;
    app.initialize();
    controller.onDatasourceInitialized(ds, '', app);

    controller.onValueChanged({
      datasource: ds,
      item,
      field: 'wopriority',
      oldvalue: '1',
      newValue: '2',
    });
    expect(item.computeChanged).toBe(true);
    expect(page.state.disableSaveButton).toBe(false);
    expect(page.state.useConfirmDialog).toBe(true);
  });

  it('test the onValueChanged for skdprojectscenarioDS', () => {
    const skdprojectscenarioDS = newDatasource(
      {
        member: [
          {
            id: 0,
            skdspatialparam: [],
          },
        ],
      },
      'member',
      'id',
      'skdprojectscenarioDS'
    );

    const item = JSON.parse(JSON.stringify(sampleActivityItem));
    const controller = new WorkItemDetailsPageController();
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);
    controller.page = page;
    page.registerDatasource(skdprojectscenarioDS);
    page.state.disableSaveButton = true;
    page.state.useConfirmDialog = false;
    app.initialize();
    controller.onDatasourceInitialized(skdprojectscenarioDS, '', app);

    controller.onValueChanged({
      datasource: skdprojectscenarioDS,
      item,
      field: 'wopriority',
      oldvalue: '1',
      newValue: '2',
    });
    expect(item.computeChanged).toBe(true);
    expect(page.state.disableSaveButton).toBe(true);
    expect(page.state.useConfirmDialog).toBe(false);
  });

  it('test the onValueChange with other datasource', () => {
    const ds = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'resourceDispatchDs'
    );
    const item = JSON.parse(JSON.stringify(sampleActivityItem));
    const controller = new WorkItemDetailsPageController();
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);
    controller.page = page;
    page.registerDatasource(ds);
    page.state.disableSaveButton = true;
    app.initialize();
    controller.onDatasourceInitialized(ds, '', app);

    controller.onValueChanged({
      datasource: ds,
      item,
      field: 'wopriority',
      oldvalue: '1',
      newValue: '2',
    });
    expect(item.computeChanged).toBeUndefined();
    expect(page.state.disableSaveButton).toBe(true);
  });

  it('goes to Dashboard page', async () => {
    const controller = new WorkItemDetailsPageController();
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });
    app.registerController(controller);
    app.registerPage(page);

    await app.initialize();
    controller.app = app;
    controller.page = page;

    const setCurrentPageSpy = jest.spyOn(controller.app, 'setCurrentPage');
    controller.goToDashboardPage();
    expect(setCurrentPageSpy).toHaveBeenCalledWith('dispatch');
    expect(page.state.redirect).toBe(false);
  });

  it('confirmation dialog saves when leaving page', async () => {
    const controller = new WorkItemDetailsPageController();
    const ds = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });
    controller.app = app;
    app.registerController(controller);
    app.registerPage(page);
    controller.page = page;
    page.registerDatasource(ds);
    app.toast = jest.fn();
    const getLocalizedLabelSpy = jest
      .spyOn(controller.app, 'getLocalizedLabel')
      .mockImplementation((labelCode, labelText) => labelText);

    const saveStub = sinon
      .stub(ds, 'save')
      .returns({ _rowstamp: '986390', href: '' });

    await controller.onCustomSaveTransition();
    expect(saveStub.called).toBe(true);
    expect(app.toast.mock.calls.length).toBe(1);
    expect(app.toast).toHaveBeenCalledWith('Record has been saved', 'success');
    expect(getLocalizedLabelSpy).toHaveBeenCalledWith(
      'activities_save_success',
      'Record has been saved'
    );
  });

  it('confirmation dialog fails to save when leaving page', async () => {
    const controller = new WorkItemDetailsPageController();
    const ds = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });
    controller.app = app;
    app.registerController(controller);
    app.registerPage(page);
    controller.page = page;
    page.registerDatasource(ds);
    app.toast = jest.fn();
    const getLocalizedLabelSpy = jest
      .spyOn(controller.app, 'getLocalizedLabel')
      .mockImplementation((labelCode, labelText) => labelText);

    const saveStub = sinon
      .stub(ds, 'save')
      .returns({ error: 'Error occurred' });

    await controller.onCustomSaveTransition();
    expect(saveStub.called).toBe(true);
    expect(app.toast.mock.calls.length).toBe(1);
    expect(app.toast).toHaveBeenCalledWith('Failed to save record', 'error');
    expect(getLocalizedLabelSpy).toHaveBeenCalledWith(
      'activities_save_error',
      'Failed to save record'
    );
  });

  describe('onRowItemClicked', () => {
    it('row item click for unassigned emergencies top recommendations', async () => {
      const controller = new WorkItemDetailsPageController();
      const emergencyRecommendationsDS = newDatasource(
        emergencyRecommendationItems,
        'member',
        'id',
        'skdemrecommendationsDS'
      );
      const jUnassignedEmergDS = newDatasource(
        sampleActivityItemComplete,
        'member',
        'id',
        'jUnassignedEmergDS'
      );
      const jemergencyRecommendationsDS = newDatasource(
        sampleActivityItemAssigned,
        'member',
        'id',
        'jemergencyRecommendationsDS'
      );
      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      const selectedItem = {
        _id: 0,
        assignmentid: 2114,
      };

      const selection = {
        selected: [
          {
            _id: 0,
          },
        ],
      };

      jUnassignedEmergDS.clearSelections = jest.fn();
      jUnassignedEmergDS.setSelectedItem = jest.fn();
      jUnassignedEmergDS.state.selection = selection;
      controller.app = app;
      app.registerController(controller);
      app.registerPage(page);
      controller.page = page;
      page.state.selectedEmergencyWork = '0';
      page.state.selectedResourcesFilter = 'topRecommendations';
      page.registerDatasource(emergencyRecommendationsDS);
      page.registerDatasource(jUnassignedEmergDS);
      page.registerDatasource(jemergencyRecommendationsDS);
      await emergencyRecommendationsDS.load();
      expect(page.state.resourcePanelHeader).not.toBeDefined();
      expect(page.state.selectedUnassignedEmergencyWorkItem).not.toBeDefined();
      controller.onRowItemClicked(selectedItem);
      expect(jUnassignedEmergDS.setSelectedItem).toHaveBeenCalled();
      expect(jUnassignedEmergDS.clearSelections).toHaveBeenCalled();
      expect(jemergencyRecommendationsDS.items.length).toBe(0);
      expect(page.state.resourcePanelHeader).toBe(
        'dispatcherdashboard#resource_panel_header_default'
      );
      expect(page.state.selectedUnassignedEmergencyWorkItem).toEqual({
        _id: 0,
      });
    });

    it('row item click for unassigned emergencies all resources', async () => {
      const controller = new WorkItemDetailsPageController();
      const emergencyRecommendationsDS = newDatasource(
        emergencyRecommendationItems,
        'member',
        'id',
        'skdemrecommendationsDS'
      );
      const jUnassignedEmergDS = newDatasource(
        sampleActivityItemComplete,
        'member',
        'id',
        'jUnassignedEmergDS'
      );
      const jemergencyRecommendationsDS = newDatasource(
        sampleActivityItemAssigned,
        'member',
        'id',
        'jemergencyRecommendationsDS'
      );
      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      const selectedItem = {
        _id: 0,
        assignmentid: 2114,
      };

      const selection = {
        selected: [
          {
            _id: 0,
          },
        ],
      };

      jUnassignedEmergDS.setSelectedItem = jest.fn();
      jUnassignedEmergDS.state.selection = selection;
      controller.app = app;
      app.registerController(controller);
      app.registerPage(page);
      controller.page = page;
      page.state.selectedEmergencyWork = '0';
      page.state.selectedResourcesFilter = 'allResources';
      page.registerDatasource(emergencyRecommendationsDS);
      page.registerDatasource(jUnassignedEmergDS);
      page.registerDatasource(jemergencyRecommendationsDS);
      await emergencyRecommendationsDS.load();
      expect(page.state.resourcePanelHeader).not.toBeDefined();
      controller.onRowItemClicked(selectedItem);
      expect(jemergencyRecommendationsDS.items.length).toBe(0);
      expect(page.state.resourcePanelHeader).toBe(
        'dispatcherdashboard#resource_panel_header_default'
      );
      expect(jUnassignedEmergDS.setSelectedItem).toHaveBeenCalled();
    });

    it('row item click for unassigned emergencies, no selected item top recommendations', async () => {
      const controller = new WorkItemDetailsPageController();
      const emergencyRecommendationsDS = newDatasource(
        emergencyRecommendationItems,
        'member',
        'id',
        'skdemrecommendationsDS'
      );
      const jUnassignedEmergDS = newDatasource(
        sampleActivityItemComplete,
        'member',
        'id',
        'jUnassignedEmergDS'
      );
      const jemergencyRecommendationsDS = newDatasource(
        sampleActivityItemAssigned,
        'member',
        'id',
        'jemergencyRecommendationsDS'
      );
      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      const selectedItem = {
        _id: 1,
        assignmentid: 2114,
      };

      const selection = {
        selected: [
          {
            _id: 0,
          },
        ],
      };

      jUnassignedEmergDS.setSelectedItem = jest.fn();
      jUnassignedEmergDS.state.selection = selection;
      controller.app = app;
      app.registerController(controller);
      app.registerPage(page);
      controller.page = page;
      page.state.selectedEmergencyWork = '0';
      page.state.selectedResourcesFilter = 'topRecommendations';
      page.registerDatasource(emergencyRecommendationsDS);
      page.registerDatasource(jUnassignedEmergDS);
      page.registerDatasource(jemergencyRecommendationsDS);
      await emergencyRecommendationsDS.load();
      controller.onRowItemClicked(selectedItem);
      expect(jemergencyRecommendationsDS.items.length).toBe(0);
      expect(jUnassignedEmergDS.setSelectedItem).toHaveBeenCalled();
    });

    it('row item click for unassigned emergencies, no selected item all resources', async () => {
      const controller = new WorkItemDetailsPageController();
      const emergencyRecommendationsDS = newDatasource(
        emergencyRecommendationItems,
        'member',
        'id',
        'skdemrecommendationsDS'
      );
      const jUnassignedEmergDS = newDatasource(
        sampleActivityItemComplete,
        'member',
        'id',
        'jUnassignedEmergDS'
      );
      const jemergencyRecommendationsDS = newDatasource(
        sampleActivityItemAssigned,
        'member',
        'id',
        'jemergencyRecommendationsDS'
      );
      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      const selectedItem = {
        _id: 1,
        assignmentid: 2114,
      };

      const selection = {
        selected: [
          {
            _id: 0,
          },
        ],
      };

      jUnassignedEmergDS.setSelectedItem = jest.fn();
      jUnassignedEmergDS.state.selection = selection;
      controller.app = app;
      app.registerController(controller);
      app.registerPage(page);
      controller.page = page;
      page.state.selectedEmergencyWork = '0';
      page.state.selectedResourcesFilter = 'allResources';
      page.registerDatasource(emergencyRecommendationsDS);
      page.registerDatasource(jUnassignedEmergDS);
      page.registerDatasource(jemergencyRecommendationsDS);
      await emergencyRecommendationsDS.load();
      controller.onRowItemClicked(selectedItem);
      expect(jemergencyRecommendationsDS.items.length).toBe(0);
      expect(jUnassignedEmergDS.setSelectedItem).toHaveBeenCalled();
    });

    it('row item click for assigned emergencies', async () => {
      const controller = new WorkItemDetailsPageController();
      const emergencyRecommendationsDS = newDatasource(
        emergencyRecommendationItems,
        'member',
        'id',
        'skdemrecommendationsDS'
      );
      const jUnassignedEmergDS = newDatasource(
        sampleActivityItemComplete,
        'member',
        'id',
        'jUnassignedEmergDS'
      );
      const jemergencyRecommendationsDS = newDatasource(
        sampleActivityItemAssigned,
        'member',
        'id',
        'jemergencyRecommendationsDS'
      );
      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      const selectedItem = {
        _id: 0,
        assignmentid: 2114,
      };

      const selection = {
        selected: [
          {
            _id: 0,
          },
        ],
      };

      jUnassignedEmergDS.setSelectedItem = jest.fn();
      jUnassignedEmergDS.state.selection = selection;
      controller.app = app;
      app.registerController(controller);
      app.registerPage(page);
      controller.page = page;
      page.state.selectedEmergencyWork = '1';
      page.registerDatasource(emergencyRecommendationsDS);
      page.registerDatasource(jUnassignedEmergDS);
      page.registerDatasource(jemergencyRecommendationsDS);
      await emergencyRecommendationsDS.load();
      controller.onRowItemClicked(selectedItem);
      expect(jemergencyRecommendationsDS.items.length).toBe(0);
      expect(jUnassignedEmergDS.setSelectedItem).not.toHaveBeenCalled();
    });

    it('row item click for unassigned emergencies, no filtered recommendations top recommendations', async () => {
      const controller = new WorkItemDetailsPageController();
      const emergencyRecommendationsDS = newDatasource(
        emergencyRecommendationItems,
        'member',
        'id',
        'skdemrecommendationsDS'
      );
      const jUnassignedEmergDS = newDatasource(
        sampleActivityItemComplete,
        'member',
        'id',
        'jUnassignedEmergDS'
      );
      const jemergencyRecommendationsDS = newDatasource(
        sampleActivityItemAssigned,
        'member',
        'id',
        'jemergencyRecommendationsDS'
      );
      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      const selectedItem = {
        _id: 0,
        assignmentid: 2115,
      };

      const selection = {
        selected: [
          {
            _id: 0,
          },
        ],
      };

      jUnassignedEmergDS.setSelectedItem = jest.fn();
      jUnassignedEmergDS.state.selection = selection;
      controller.app = app;
      app.registerController(controller);
      app.registerPage(page);
      controller.page = page;
      page.state.selectedEmergencyWork = '0';
      page.state.selectedResourcesFilter = 'topRecommendations';
      page.registerDatasource(emergencyRecommendationsDS);
      page.registerDatasource(jUnassignedEmergDS);
      page.registerDatasource(jemergencyRecommendationsDS);
      await emergencyRecommendationsDS.load();
      controller.onRowItemClicked(selectedItem);
      expect(jUnassignedEmergDS.setSelectedItem).toHaveBeenCalled();
    });

    it('row item click for unassigned emergencies, no filtered recommendations all resources', async () => {
      const controller = new WorkItemDetailsPageController();
      const emergencyRecommendationsDS = newDatasource(
        emergencyRecommendationItems,
        'member',
        'id',
        'skdemrecommendationsDS'
      );
      const jUnassignedEmergDS = newDatasource(
        sampleActivityItemComplete,
        'member',
        'id',
        'jUnassignedEmergDS'
      );
      const jemergencyRecommendationsDS = newDatasource(
        sampleActivityItemAssigned,
        'member',
        'id',
        'jemergencyRecommendationsDS'
      );
      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });

      const selectedItem = {
        _id: 0,
        assignmentid: 2115,
      };

      const selection = {
        selected: [
          {
            _id: 0,
          },
        ],
      };

      jUnassignedEmergDS.setSelectedItem = jest.fn();
      jUnassignedEmergDS.state.selection = selection;
      controller.app = app;
      app.registerController(controller);
      app.registerPage(page);
      controller.page = page;
      page.state.selectedEmergencyWork = '0';
      page.state.selectedResourcesFilter = 'allResources';
      page.state.latestrunid = '1';
      page.registerDatasource(emergencyRecommendationsDS);
      page.registerDatasource(jUnassignedEmergDS);
      page.registerDatasource(jemergencyRecommendationsDS);
      await emergencyRecommendationsDS.load();
      controller.onRowItemClicked(selectedItem);
      expect(jUnassignedEmergDS.setSelectedItem).toHaveBeenCalled();
    });
  });

  it('row item click for unassigned emergencies with optimization not run', async () => {
    const controller = new WorkItemDetailsPageController();
    const emergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItems,
      'member',
      'id',
      'skdemrecommendationsDS'
    );
    const jUnassignedEmergDS = newDatasource(
      sampleActivityItemComplete,
      'member',
      'id',
      'jUnassignedEmergDS'
    );
    const jemergencyRecommendationsDS = newDatasource(
      sampleActivityItemAssigned,
      'member',
      'id',
      'jemergencyRecommendationsDS'
    );
    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    const selectedItem = {
      _id: 0,
      assignmentid: 2114,
    };

    const selection = {
      selected: [
        {
          _id: 0,
        },
      ],
    };

    jUnassignedEmergDS.clearSelections = jest.fn();
    jUnassignedEmergDS.setSelectedItem = jest.fn();
    jUnassignedEmergDS.state.selection = selection;
    controller.app = app;
    app.registerController(controller);
    app.registerPage(page);
    controller.page = page;
    page.state.selectedEmergencyWork = '0';
    page.state.latestrunid = undefined;
    page.registerDatasource(emergencyRecommendationsDS);
    page.registerDatasource(jUnassignedEmergDS);
    page.registerDatasource(jemergencyRecommendationsDS);
    await emergencyRecommendationsDS.load();
    expect(page.state.resourcePanelHeader).not.toBeDefined();
    expect(page.state.selectedUnassignedEmergencyWorkItem).not.toBeDefined();
    controller.onRowItemClicked(selectedItem);
    expect(jUnassignedEmergDS.setSelectedItem).toHaveBeenCalled();
    expect(jUnassignedEmergDS.clearSelections).toHaveBeenCalled();
    expect(jemergencyRecommendationsDS.items.length).toBe(0);
    expect(page.state.resourcePanelHeader).toBe(
      'dispatcherdashboard#resource_panel_header_default'
    );
    expect(page.state.selectedUnassignedEmergencyWorkItem).toEqual({
      _id: 0,
    });
  });

  describe('assignment datasource', () => {
    it('create datasource for assignments', () => {
      const controller = new WorkItemDetailsPageController();
      const data = {
        _id: 0,
        name: 'test',
      };
      expect(controller.getAssignmentsDatasource(data)).toBeInstanceOf(
        Datasource
      );
    });

    it('create datasource for assignments, no data', () => {
      const controller = new WorkItemDetailsPageController();
      expect(controller.getAssignmentsDatasource()).toBeInstanceOf(Datasource);
    });
  });
  it('calls invokeUnassignWorkRecord on Unassign work record click', async () => {
    const app = new Application();
    const controller = new WorkItemDetailsPageController();
    const page = new Page({ name: 'workItemDetails' });
    controller.app = app;
    controller.page = page;
    const invokeOptimizeAndCheckStatusStub = sinon.stub(
      EmergencyDataUtils,
      'invokeOptimizeAndCheckStatus'
    );

    const activityUnscheduledDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );
    const activityEmergencyDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdactivityDS'
    );
    const projectDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'skdprojectsDS'
    );
    const jUnassignedEmergDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'jUnassignedEmergDS'
    );
    const jAssignedEmergDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'jAssignedEmergDS'
    );

    const emergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItemsNoMatch,
      'member',
      'id',
      'skdemrecommendationsDS'
    );

    const jemergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItemsNoMatch,
      'member',
      'id',
      'jemergencyRecommendationsDS'
    );

    const optimizeDS = newDatasource(
      optimizeForEmergencyItem,
      'member',
      'id',
      'skdodmerunForEmergenciesDS'
    );

    page.registerDatasource(activityUnscheduledDS);
    page.registerDatasource(activityEmergencyDS);
    page.registerDatasource(jUnassignedEmergDS);
    page.registerDatasource(jAssignedEmergDS);
    page.registerDatasource(projectDS);
    page.registerDatasource(emergencyRecommendationsDS);
    page.registerDatasource(jemergencyRecommendationsDS);
    page.registerDatasource(optimizeDS);
    app.registerDatasource(projectDS);
    app.registerDatasource(activityEmergencyDS);
    app.registerPage(page);

    app.initialize();

    const invokeAssignActionStub = sinon
      .stub(projectDS, 'invokeAction')
      .returns({});

    const toastSpy = jest.spyOn(controller.app, 'toast');

    const getLocalizedLabelSpy = jest.spyOn(
      controller.app,
      'getLocalizedLabel'
    );

    page.state.optimizeInvoked = false;

    await controller.unassignWorkRecord({
      item: { laborcode: '003', assignmentid: 1111, wonum: 'TEST' },
    });

    expect(invokeAssignActionStub.called).toBe(true);
    expect(getLocalizedLabelSpy).toHaveBeenCalledTimes(1);
    expect(toastSpy).toHaveBeenCalledTimes(1);
    expect(toastSpy).toHaveBeenCalledWith(
      'Emergency work record TEST was unassigned.',
      'success'
    );
    expect(invokeOptimizeAndCheckStatusStub.called).toBe(true);
    invokeOptimizeAndCheckStatusStub.restore();
  });

  it('calls invokeUnassignWorkRecord on Unassign work record click - optimize in progress', async () => {
    const app = new Application();
    const controller = new WorkItemDetailsPageController();
    const page = new Page({ name: 'workItemDetails' });
    controller.app = app;
    controller.page = page;
    const invokeOptimizeAndCheckStatusStub = sinon.stub(
      EmergencyDataUtils,
      'invokeOptimizeAndCheckStatus'
    );
    jest.restoreAllMocks();

    const findDatasourceSpy = jest
      .spyOn(controller.app, 'findDatasource')
      .mockImplementation(() => ({
        invokeAction: () => Promise.resolve({}),
        items: [{ id: 123 }],
        state: { loading: false },
      }));

    const toastSpy = jest.spyOn(controller.app, 'toast');

    const getLocalizedLabelSpy = jest.spyOn(
      controller.app,
      'getLocalizedLabel'
    );

    page.state.optimizeInvoked = true;

    await controller.unassignWorkRecord({
      item: { laborcode: '003', assignmentid: 1111, wonum: 'TEST' },
    });

    expect(findDatasourceSpy).toHaveBeenCalledTimes(4);
    expect(findDatasourceSpy).toHaveBeenCalledWith('skdprojectsDS');
    expect(getLocalizedLabelSpy).toHaveBeenCalledTimes(1);
    expect(toastSpy).toHaveBeenCalledTimes(1);
    expect(toastSpy).toHaveBeenCalledWith(
      'Emergency work record TEST was unassigned.',
      'success'
    );
    expect(invokeOptimizeAndCheckStatusStub.called).toBe(false);
  });

  describe('Assign emergency work', () => {
    it('call assignEmergencyWork', () => {
      const controller = new WorkItemDetailsPageController();
      const app = new Application();
      const page = new Page({ name: 'workItemDetails' });
      controller.app = app;
      controller.page = page;
      const selectedUnassignedEmergencyWorkItem = {
        assignmentid: 2114,
        wonum: 'EMW01',
      };
      page.state.selectedUnassignedEmergencyWorkItem =
        selectedUnassignedEmergencyWorkItem;

      const dialogSpy = jest.spyOn(page, 'showDialog');

      const selectedResourceItem = {
        laborcode: 'SAM',
      };

      expect(page.state.selectedResourceItem).toBeUndefined();

      controller.assignEmergencyWorkToResource(selectedResourceItem);

      expect(page.state.selectedResourceItem).toEqual(selectedResourceItem);
      expect(dialogSpy).toHaveBeenCalledWith('confirmAssignEmergencyWork');
    });
  });

  it('filter emergency recommendations for top recommendations drop down selection', async () => {
    const controller = new WorkItemDetailsPageController();

    const activityUnscheduledDS = newDatasource(
      sampleActivityItemAssigned,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );

    const emergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItems,
      'member',
      'id',
      'skdemrecommendationsDS'
    );

    const jemergencyRecommendationsDS = newDatasource(
      emergencyRecommendationAssnID,
      'member',
      'id',
      'jemergencyRecommendationsDS'
    );

    const jUnassignedEmergDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'jUnassignedEmergDS'
    );

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    page.state.selectedResourcesFilter = 'topRecommendations';

    page.registerDatasource(activityUnscheduledDS);
    page.registerDatasource(emergencyRecommendationsDS);
    page.registerDatasource(jemergencyRecommendationsDS);
    page.registerDatasource(jUnassignedEmergDS);

    await app.initialize();
    controller.pageInitialized(page, app);

    await emergencyRecommendationsDS.load();
    await jemergencyRecommendationsDS.load();
    await controller.filterResources();

    expect(jemergencyRecommendationsDS.items.length).toBe(2);
  });

  it('filter emergency recommendations for all resources drop down selection', async () => {
    const controller = new WorkItemDetailsPageController();

    const activityUnscheduledDS = newDatasource(
      sampleActivityItemAssigned,
      'member',
      'id',
      'skdactivityunscheduledDS'
    );

    const emergencyRecommendationsDS = newDatasource(
      emergencyRecommendationItems,
      'member',
      'id',
      'skdemrecommendationsDS'
    );

    const jemergencyRecommendationsDS = newDatasource(
      emergencyRecommendationAssnID,
      'member',
      'id',
      'jemergencyRecommendationsDS'
    );

    const jUnassignedEmergDS = newDatasource(
      sampleActivityItem,
      'member',
      'id',
      'jUnassignedEmergDS'
    );

    const app = new Application();
    const page = new Page({ name: 'workItemDetails' });

    app.registerController(controller);
    app.registerPage(page);

    page.state.selectedResourcesFilter = 'allRecommendations';

    page.registerDatasource(activityUnscheduledDS);
    page.registerDatasource(emergencyRecommendationsDS);
    page.registerDatasource(jemergencyRecommendationsDS);
    page.registerDatasource(jUnassignedEmergDS);

    await app.initialize();
    controller.pageInitialized(page, app);

    await emergencyRecommendationsDS.load();
    await jemergencyRecommendationsDS.load();
    await controller.filterResources();

    expect(jemergencyRecommendationsDS.items.length).toBe(3);
  });

  describe('Gantt chart Toolbar', () => {
    it('search Gantt chart grid', () => {
      const controller = new WorkItemDetailsPageController();
      const searchRowsSpy = jest.fn();
      window.Grids = [{ SearchExpression: '', SearchRows: searchRowsSpy }];
      controller.searchGraphicalView('test');
      expect(window.Grids[0].SearchExpression).toBe('test');
      expect(searchRowsSpy).toHaveBeenCalledWith('Mark,Filter');
    });

    it('toggle Gantt chart filters', async () => {
      const controller = new WorkItemDetailsPageController();
      const app = new Application();
      const page = new Page({
        name: 'workItemDetails',
      });
      controller.app = app;
      controller.page = page;
      app.registerController(controller);
      app.registerPage(page);

      await app.initialize();

      const showRowSpy = jest.fn();
      const hideRowSpy = jest.fn();

      window.Grids = [{ ShowRow: showRowSpy, HideRow: hideRowSpy }];

      controller.toggleGraphicalViewFilter();
      expect(showRowSpy.mock.calls.length).toBe(0);
      expect(hideRowSpy.mock.calls.length).toBe(0);

      window.Grids = [
        { ShowRow: showRowSpy, HideRow: hideRowSpy, Filter: { Visible: 0 } },
      ];

      controller.toggleGraphicalViewFilter();
      expect(showRowSpy.mock.calls.length).toBe(1);
      expect(hideRowSpy.mock.calls.length).toBe(0);

      window.Grids[0].Filter.Visible = 1;
      controller.toggleGraphicalViewFilter();
      expect(showRowSpy.mock.calls.length).toBe(1);
      expect(hideRowSpy.mock.calls.length).toBe(1);

      expect(controller.page.state.disableClearGraphicalViewFilters).toBe(true);
      window.Grids.OnRowFilter({}, {}, false);
      expect(controller.page.state.disableClearGraphicalViewFilters).toBe(
        false
      );
      window.Grids.OnRowFilter({}, {}, true);
      expect(controller.page.state.disableClearGraphicalViewFilters).toBe(
        false
      );
    });

    it('clear Gantt chart filters', async () => {
      const controller = new WorkItemDetailsPageController();
      const app = new Application();
      const page = new Page({
        name: 'workItemDetails',
      });
      controller.app = app;
      controller.page = page;
      app.registerController(controller);
      app.registerPage(page);

      await app.initialize();

      const actionClearFiltersSpy = jest.fn();
      window.Grids = [{ ActionClearFilters: actionClearFiltersSpy }];
      expect(actionClearFiltersSpy.mock.calls.length).toBe(0);
      controller.clearGraphicalViewFilters();
      expect(actionClearFiltersSpy.mock.calls.length).toBe(1);
      expect(controller.page.state.disableClearGraphicalViewFilters).toBe(true);
    });

    it('change Gantt chart zoom', async () => {
      const controller = new WorkItemDetailsPageController();
      const app = new Application();
      const page = new Page({
        name: 'workItemDetails',
      });
      controller.app = app;
      controller.page = page;
      app.registerController(controller);
      app.registerPage(page);

      await app.initialize();

      const changeZoomSpy = jest.fn();
      window.Grids = [{ ChangeZoom: changeZoomSpy }];
      expect(controller.page.state.selectedGraphicalViewZoomType).toBe('Day');
      controller.onGraphicalViewZoomChange({ selectedItem: { id: 'Week' } });
      expect(controller.page.state.selectedGraphicalViewZoomType).toBe('Week');
      expect(changeZoomSpy).toHaveBeenCalledWith('Week');
    });

    it('change selected date', () => {
      const controller = new WorkItemDetailsPageController();
      const skipToDaySpy = jest.fn();
      window.Grids = [{ SkipToDay: skipToDaySpy }];
      controller.onGraphicalViewCalendarDateChange('new date');
      expect(skipToDaySpy).toHaveBeenCalledWith('', 'new date');
    });

    it('skip a day', async () => {
      const controller = new WorkItemDetailsPageController();
      const app = new Application();
      const page = new Page({
        name: 'workItemDetails',
      });
      page.params = {
        enddate: '2024-05-30T00:00:00-04:00',
        startdate: '2024-05-27T00:00:00-04:00',
      };

      controller.app = app;
      controller.page = page;
      app.registerController(controller);
      app.registerPage(page);

      await app.initialize();

      controller.page.state.selectedGraphicalViewCalendarDate = JSON.stringify(
        '2024-05-29T00:00:00-04:00'
      );
      const skipToDaySpy = jest.fn().mockImplementation(() => 'new date');
      window.Grids = [{ SkipToDay: skipToDaySpy }];
      controller.onGraphicalViewSkipDay('next');
      expect(skipToDaySpy).toHaveBeenCalledWith(
        'next',
        null,
        expect.any(Function)
      );

      expect(page.state.disableNextBtn).toBe(true);
      expect(page.state.disablePrevBtn).toBe(false);

      controller.page.state.selectedGraphicalViewCalendarDate = JSON.stringify(
        '2024-05-28T00:00:00-04:00'
      );
      controller.onGraphicalViewSkipDay('prev');
      expect(skipToDaySpy).toHaveBeenCalledWith(
        'prev',
        null,
        expect.any(Function)
      );
      expect(page.state.disableNextBtn).toBe(false);
      expect(page.state.disablePrevBtn).toBe(true);

      controller.onGraphicalViewSkipDay('unknown');
      expect(skipToDaySpy).toHaveBeenCalledWith(
        'unknown',
        null,
        expect.any(Function)
      );
    });
  });

  describe('switchTabs', () => {
    it('resets to Unassigned view when switching tabs', () => {
      const controller = new WorkItemDetailsPageController();
      const app = new Application();
      const page = new Page({
        name: 'workItemDetails',
      });

      controller.app = app;
      controller.page = page;
      app.registerController(controller);
      app.registerPage(page);

      page.state.selectedEmergencyWork = '1';
      controller.switchTabs(0);
      expect(page.state.selectedEmergencyWork).toBe('0');
      page.state.selectedEmergencyWork = '0';
      controller.switchTabs(0);
      expect(page.state.selectedEmergencyWork).toBe('0');
    });
  });
});

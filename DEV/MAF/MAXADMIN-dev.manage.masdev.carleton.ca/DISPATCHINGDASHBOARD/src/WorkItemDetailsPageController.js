/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023, 2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/* eslint no-underscore-dangle: ["error", { "allow": ["_bulkid", "_rowstamp", "_override", "_resetDataSource", "_id"] }] */

import {
  Datasource,
  JSONDataAdapter,
  DataFormatter,
  AppSwitcher,
} from '@maximo/maximo-js-api';
import invokeUnassignWorkRecord from './WorkItemDetailsPage/EmergencyWorkTab/invokeUnassignWorkRecord';
import EmergencyDataUtils from './WorkItemDetailsPage/EmergencyWorkTab/EmergencyDataUtils';
import resourcePanel from './WorkItemDetailsPage/EmergencyWorkTab/resourcePanel';
import WorkItemUtils from './WorkItemUtils';

export default class WorkItemDetailsPageController {
  pageInitialized(page, app) {
    this.page = page;
    this.app = app;
    this.page.state.publishingCompleted = false;
    this.page.state.dispatchloaded = false;
    this.page.state.useConfirmDialog = false;
    this.page.state.disableSaveButton = true;
    this.page.state.selectedEmergencyWork = '0';
    this.page.state.userTimezone = app.getUserInfo().timezone;
    this.page.state.selectedUnassignedEmergencyWorkItem = {};
    this.page.state.resourcePanelHeader =
      resourcePanel.defaultHeaderMessageForResourcePanel(this.app);
    this.page.state.startedAssigning = false;
    this.page.state.filterCounters = { topRecommendations: 0, allResources: 0 };
    this.page.state.tasksWithEmergencies = 0;
    this.page.state.disableClearGraphicalViewFilters = true;
    this.page.state.selectedGraphicalViewZoomType = 'Day';
    this.page.state.selectedGraphicalViewCalendarDate = JSON.stringify(
      new Date()
    );
    const ds1 = this.app.findDatasource('skdactivityunscheduledDS');
    const da = ds1.dataAdapter;

    this.page.getAssignmentsDatasource = this.getAssignmentsDatasource;
    this.page.loadWoSummaryApp = this.loadWoSummaryApp;
    this.page.disableNextBtn = false;
    this.page.state.disablePrevBtn = false;

    if (!da.bulkPut._override) {
      /* istanbul ignore next */
      da.bulkPut = (records, options) =>
        this.bulkPut(records, options, ds1, da);
      da.bulkPut._override = true;
      ds1.addIgnoreField('craftLoading');
    }
  }

  /* istanbul ignore next */
  // eslint-disable-next-line no-unused-vars
  async bulkPut(records, options, ds, da) {
    const ds1 = this.app.findDatasource('skdactivityunscheduledDS');
    const assignmentDs = this.app.findDatasource('assignmentDs');
    const assignmentIds = [];
    // find the actual assignment ID
    // there's probably a better way to do this
    ds1.forEach((r) => {
      const rec = records.find((rr) => rr._bulkid === r._rowstamp);
      if (rec) {
        assignmentIds.push(r.assignmentid);
        rec.assignmentid = r.assignmentid;
      }
    });
    assignmentDs.clearQBE();
    if (assignmentIds.length === 1) {
      assignmentDs.setQBE('assignmentid', `=${assignmentIds[0]}`);
    } else if (records.length > 1) {
      assignmentDs.setQBE('assignmentid', assignmentIds);
    } else {
      // not sure
    }
    await assignmentDs.searchQBE();
    // copy our modified fields into the loaded items
    records.forEach((r) => {
      const item = assignmentDs.getById(r.assignmentid);
      Object.keys(r).forEach((k) => {
        if (k.startsWith('_')) return;
        if (k === 'href') return;
        item[k] = r[k];
      });
    });
    // save the items
    const response = await assignmentDs.save();
    return response;
  }

  /* istanbul ignore next */
  pageResumed() {
    this.page.state.selectedEmergencyWork = '0';
    this.page.state.tasksWithEmergencies =
      this.page.params.emergenciescount || 0;
    this.page.state.updateCronChecked = false;
    this.page.state.publishingCompleted = false;
    this.page.state.dispatchloaded = false;
    this.page.state.disableSaveButton = true;
    this.page.state.useConfirmDialog = false;
    this.page.state.optimizeInvoked = false;
    this.page.state.resourcePanelHeader =
      resourcePanel.defaultHeaderMessageForResourcePanel(this.app);
    this.page.state.selectedUnassignedEmergencyWorkItem = {};
    this.page.state.filterCounters = {
      topRecommendations: 0,
      allResources: 0,
    };

    const projectDS = this.app.findDatasource('skdprojectsDS');
    const projectActivityDS = this.app.findDatasource('skdprojActivityDS');
    const dispatchdefDS = this.app.findDatasource('dispatchdef');

    const jUnassignedEmergDS = this.app.findDatasource('jUnassignedEmergDS');
    const jAssignedEmergDS = this.app.findDatasource('jAssignedEmergDS');
    const jemergencyRecommendationsDS = this.app.findDatasource(
      'jemergencyRecommendationsDS'
    );
    this._resetDataSource(jUnassignedEmergDS);
    this._resetDataSource(jAssignedEmergDS);
    this._resetDataSource(jemergencyRecommendationsDS);

    projectDS.load({
      noCache: true,
      itemUrl: this.page.params.scenario,
    });

    projectActivityDS.load({
      noCache: true,
    });

    dispatchdefDS.load({
      noCache: true,
    });
  }

  onDatasourceInitialized(ds, owner, app) {
    this.app = app;
  }

  updateRunLatestHref(dataSourceName) {
    if (dataSourceName !== 'skdodmerunlatestDS') {
      return;
    }

    this.page.state.runlatesthref = this.page.params.scenario;
  }

  async onRefresh() {
    const projectDS = this.app.findDatasource('skdprojectsDS');

    const refreshResponse = await projectDS.invokeAction('refresh', {
      record: projectDS.item,
      parameters: {},
    });

    if (refreshResponse && !refreshResponse.error) {
      await projectDS.forceReload();
      this.app.toast(
        this.app.getLocalizedLabel(
          'refresh_success',
          'Record has been refreshed'
        ),
        'success'
      );
    } else {
      this.app.toast(
        this.app.getLocalizedLabel('refresh_failure', 'Failed to refresh'),
        'error'
      );
    }
  }

  optimizeDialog() {
    const skdprojectscenarioDS = this.app.findDatasource(
      'skdprojectscenarioDS'
    );
    if (skdprojectscenarioDS.item.skdspatialparam) {
      this.page.showDialog('optimizeScheduleDialog');
    } else {
      this.app.toast(
        this.app.getLocalizedLabel(
          'optimization_dialog_open_error',
          'Failed to open the Optimize dialog'
        ),
        'error'
      );
    }
  }

  /* eslint-disable camelcase */
  getTimeSlotColor = ({ wostatus_maxvalue, assignstatus }) => {
    const statuses = {
      APPR: 'ApprovedSlot',
      WAPPR: 'ApprovedSlot',
      WMATL: 'ApprovedSlot',
      WSCH: 'ApprovedSlot',
      INPRG: 'InProgressSlot',
      COMP: 'CompletedSlot',
      ACCEPTED: 'AcceptedSlot',
    };
    let colorClass = statuses[wostatus_maxvalue];

    if (
      (wostatus_maxvalue === 'APPR' ||
        wostatus_maxvalue === 'WAPPR' ||
        wostatus_maxvalue === 'WMATL' ||
        wostatus_maxvalue === 'WSCH') &&
      assignstatus === 'ACCEPTED'
    ) {
      colorClass = statuses.ACCEPTED;
    }

    return colorClass;
  };

  updateDateToTreeGridFormat = (runItem = []) => {
    const updatedRunItem = [];
    runItem.forEach((item) => {
      const newItem = JSON.parse(JSON.stringify(item));
      if (item.start) {
        newItem.Start = Date.parse(item.start);
        delete newItem.start;
      }
      if (item.duration) {
        newItem.Duration = item.duration;
        delete newItem.duration;
      }
      if (item.assignment?.length) {
        newItem.Class = this.getTimeSlotColor(item.assignment[0]);

        newItem.Tip = JSON.stringify({
          duration: WorkItemUtils.formatHoursToHoursMinutes(item.duration),
          wonum: item.assignment[0].wonum ? item.assignment[0].wonum : '',
          priority: item.assignment[0].wopriority
            ? item.assignment[0].wopriority
            : '',
          address: item.assignment[0].address ? item.assignment[0].address : '',
          description: item.assignment[0].description
            ? item.assignment[0].description
            : '',
          wostatus: item.assignment[0].wostatus_maxvalue,
          worktype: item.assignment[0].worktype
            ? item.assignment[0].worktype
            : '',
          start: WorkItemUtils.formatDateTime(
            item.start,
            this.page.state.userTimezone
          ),
          end: WorkItemUtils.formatDateTime(
            item.end,
            this.page.state.userTimezone
          ),
          fnlconstraint: item.assignment[0].fnlconstraint
            ? WorkItemUtils.formatDateTime(
                item.assignment[0].fnlconstraint,
                this.page.state.userTimezone
              )
            : '',
        });

        delete newItem.assignment;
      }
      updatedRunItem.push(newItem);
    });
    return updatedRunItem;
  };

  async updateTreegridDefinitionDs() {
    const dispatchdef = this.app.findDatasource('dispatchdef');
    const newData = JSON.parse(JSON.stringify(dispatchdef.items));
    const { startdate } = this.page.params;
    newData[0].Toolbar.DatePicker = new Date(startdate.split('T')[0]);
    newData[0].Cols[0].GanttZoomDate = new Date(startdate).setUTCSeconds(0);
    await dispatchdef.load({
      src: newData,
    });
  }

  onValueChanged({ datasource, item }) {
    if (
      datasource.name === 'skdprojectscenarioDS' ||
      datasource.name === 'skdactivityunscheduledDS'
    ) {
      // eslint-disable-next-line no-param-reassign
      item.computeChanged = true;
    }
    if (datasource.name === 'skdactivityunscheduledDS') {
      this.page.state.disableSaveButton = false;
      this.page.state.useConfirmDialog = true;
    }
  }

  selectLookupItem = (assignmentValues) => {
    const workItemDetailsPage = this.app.findPage('workItemDetails');
    const skdactivityunscheduledDS = this.app.findDatasource(
      'skdactivityunscheduledDS'
    );
    return skdactivityunscheduledDS.items.map((item) => {
      if (
        item.assignmentid === workItemDetailsPage.state.selectedAssignmentId
      ) {
        const newItem = item;
        Object.keys(assignmentValues).forEach((assignmentAttribute) => {
          newItem[assignmentAttribute] = assignmentValues[assignmentAttribute];
        });
        return { ...newItem };
      }
      return item;
    });
  };

  selectCraft = (event) => {
    const { craft, skilllevel } = event[0];
    this.selectLookupItem({ craft, skilllevel });
  };

  selectLabor = (event) => {
    this.selectLookupItem({ laborcode: event[0].laborcode });
  };

  selectCrew = (event) => {
    this.selectLookupItem({ amcrew: event[0].amcrew });
  };

  selectCrewType = (event) => {
    this.selectLookupItem({ amcrewtype: event[0].amcrewtype });
  };

  setLoadingLookup = (loading, getListName) => {
    const loadingAttribute = `${getListName}Loading`;
    const workItemDetailsPage = this.app.findPage('workItemDetails');
    const skdactivityunscheduledDS = this.app.findDatasource(
      'skdactivityunscheduledDS'
    );

    const updatedAssignments = skdactivityunscheduledDS.items.map((item) => {
      const newItem = item;
      newItem[loadingAttribute] =
        item.assignmentid === workItemDetailsPage.state.selectedAssignmentId
          ? loading
          : false;
      return newItem;
    });

    return updatedAssignments;
  };

  /* istanbul ignore next */
  onMapButtonClick = (crewData) => {
    const projectDS = this.app.findDatasource('skdprojectsDS');
    const currentSKD = projectDS.item;

    this.app.setCurrentPage({
      name: 'workItemMap',
      params: {
        crewData,
        skdTitle: currentSKD.ScheduleTitleString,
      },
    });
  };

  openLookup = async ({ assignmentid, lookupId }) => {
    if (!lookupId || !assignmentid) {
      return;
    }

    const woDetailDs = this.app.findDatasource('woDetailDs');
    const workItemDetailsPage = this.app.findPage('workItemDetails');
    let getListName;
    let lookupDsName;

    switch (lookupId) {
      case 'crewType_lookup':
        getListName = 'amcrewtype';
        lookupDsName = 'crewTypelookupDS';
        break;
      case 'crew_lookup':
        getListName = 'amcrew';
        lookupDsName = 'crewlookupDS';
        break;
      case 'craft_lookup':
        getListName = 'craft';
        lookupDsName = 'craftlookupDS';
        break;
      case 'labor_lookup':
        getListName = 'laborcode';
        lookupDsName = 'laborlookupDS';
        break;
      default:
        break;
    }

    this.setLoadingLookup(true, getListName);
    workItemDetailsPage.state.selectedAssignmentId = assignmentid;

    const lookupDS = this.app.findDatasource(lookupDsName);

    const woDetailRecords = await woDetailDs.load({
      where: `assignment.assignmentId=${assignmentid}`,
    });

    if (woDetailRecords.length && woDetailRecords[0].assignment.length) {
      await lookupDS.load({
        lookup: getListName,
        itemUrl: woDetailRecords[0].assignment[0].localref,
      });
      this.app.showLookup(lookupId);
    }
    this.setLoadingLookup(false, getListName);
  };

  async onAfterLoadData(dataSource, items) {
    if (items.length === 0) {
      if (dataSource.name === 'resourceDispatchDs') {
        const dispatchdata = this.app.findDatasource('dispatchdata');
        await dispatchdata.load({
          src: { Body: [{ Items: [] }] },
        });

        this.page.state.dispatchloaded = true;
      }
      return;
    }
    this.updateRunLatestHref(dataSource.name);

    if (dataSource.name === 'dispatchdef') {
      this.updateTreegridDefinitionDs();
    } else if (dataSource.name === 'resourceDispatchDs') {
      const dispatchdata = this.app.findDatasource('dispatchdata');
      const updatedGridItems = [];

      items.forEach((item) => {
        let resourceItem;
        let resourceType;
        const utilization = `${item.utilization}%`;

        if (item.refobjname === 'LABOR') {
          resourceItem = !item.name
            ? item.resourcelabor[0].laborcode
            : item.name;
          if (
            item.restype &&
            item.resourcelabor[0].laborcraftratedefault?.skilllevel
          ) {
            resourceType = `<div>${item.restype} <p>${item.resourcelabor[0].laborcraftratedefault.skilllevel}</p></div>`;
          } else if (item.restype) {
            resourceType = `<div>${item.restype}</div>`;
          }
          updatedGridItems.push({
            Resource: resourceItem,
            'Resource type': resourceType,
            Shift: item.shiftnum,
            Utilization: utilization,
            Run: this.updateDateToTreeGridFormat(item.skdresourcedispview),
          });
        } else {
          resourceItem = !item.name ? item.resourceamcrew[0].amcrew : item.name;
          updatedGridItems.push({
            Resource: resourceItem,
            'Resource type': item.restype,
            Utilization: utilization,
            Shift: item.shiftnum,
            Run: this.updateDateToTreeGridFormat(item.skdresourcedispview),
          });
        }
      });

      const dataIsConverted =
        updatedGridItems.length && updatedGridItems[0].Body;
      /* istanbul ignore next */
      if (!dataIsConverted) {
        await dispatchdata.load({
          src: { Body: [{ Items: updatedGridItems }] },
        });
      }
      this.page.state.dispatchloaded = true;
      if (updatedGridItems.length && updatedGridItems[0].Run.length) {
        this.setSelectedGraphicalViewDate(
          this.formatDate(updatedGridItems[0].Run[0].Start)
        );
      }
    } else if (dataSource.name === 'skdactivityDS') {
      const emergencyDS = this.app.findDatasource('skdactivityDS');
      const jemergencyRecommendationsDS = this.app.findDatasource(
        'jemergencyRecommendationsDS'
      );
      this._resetDataSource(jemergencyRecommendationsDS);

      /* istanbul ignore else */
      if (emergencyDS.items.length !== 0) {
        this.page.state.hideRecommendations = true;
        await EmergencyDataUtils.loadEmergencyData(this.app, this.page, items);
        this.page.state.hideRecommendations = false;
      }
    }
  }

  formatDate = (isoDate) => {
    const oneMinuteInMs = 60000;
    const oneHourInMs = oneMinuteInMs * 60;
    const date = isoDate ? new Date(isoDate) : new Date();
    const dataFormatter = DataFormatter.get();
    const dateParts = dataFormatter.isoToDateParts(
      dataFormatter.convertDatetoISO(date, window.Grids?.TimeZone)
    );

    const utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
    return new Date(utc + oneHourInMs * parseInt(dateParts.tzOffset, 10));
  };

  _resetDataSource = (ds) => {
    ds.clearState();
    ds.resetState();
  };

  goToDashboardPage() {
    this.page.state.redirect = false;
    this.app.setCurrentPage('dispatch');
  }

  async onCustomSaveTransition() {
    const unscheduledDS = this.app.findDatasource('skdactivityunscheduledDS');
    const response = await unscheduledDS.save();
    if (response && !response.error) {
      this.app.toast(
        this.app.getLocalizedLabel(
          'activities_save_success',
          'Record has been saved'
        ),
        'success'
      );
    } else {
      this.app.toast(
        this.app.getLocalizedLabel(
          'activities_save_error',
          'Failed to save record'
        ),
        'error'
      );
    }
  }

  getAssignmentsDatasource = (data = []) => {
    const datasource = new Datasource(
      new JSONDataAdapter({
        src: {
          items: data,
        },
      }),
      {
        selectionMode: 'none',
      }
    );
    return datasource;
  };

  async onRowItemClicked(selectedItem) {
    if (this.page.state.selectedEmergencyWork === '0') {
      const jUnassignedEmergDS = this.app.findDatasource('jUnassignedEmergDS');
      jUnassignedEmergDS.clearSelections();
      jUnassignedEmergDS.setSelectedItem(
        jUnassignedEmergDS.get(selectedItem._id),
        true
      );
      const selectedUnassignedEmergencyWorkItem =
        jUnassignedEmergDS.state.selection.selected[selectedItem._id];
      if (selectedUnassignedEmergencyWorkItem) {
        this.page.state.selectedUnassignedEmergencyWorkItem =
          selectedUnassignedEmergencyWorkItem;
        this.page.state.resourcePanelHeader =
          resourcePanel.generateResourcePanelHeader(this.app);
        const emergencyRecommendationsDS = this.app.findDatasource(
          'skdemrecommendationsDS'
        );

        if (this.page.state.latestrunid) {
          this.page.state.hideRecommendations = true;
          await emergencyRecommendationsDS.load({
            where: `assignmentid=${selectedItem.assignmentid} AND skdodmerunid=${this.page.state.latestrunid}`,
          });

          const jemergencyRecommendationsDS = this.app.findDatasource(
            'jemergencyRecommendationsDS'
          );
          this._resetDataSource(jemergencyRecommendationsDS);

          EmergencyDataUtils.filterResourceRecommendationCount(
            this.page,
            emergencyRecommendationsDS,
            selectedItem.assignmentid
          );

          await EmergencyDataUtils.filterResourceRecommendation(
            this.app,
            this.page,
            emergencyRecommendationsDS,
            jemergencyRecommendationsDS,
            selectedItem.assignmentid
          );
          this.page.state.hideRecommendations = false;
        }
      }
    }
  }

  assignEmergencyWorkToResource(resourceItem) {
    this.page.state.selectedResourceItem = resourceItem;
    this.page.showDialog('confirmAssignEmergencyWork');
  }

  async unassignWorkRecord(resourceItem) {
    const emergencyDS = this.app.findDatasource('skdactivityDS');
    const jAssignedEmergDS = this.app.findDatasource('jAssignedEmergDS');
    const jUnassignedEmergDS = this.app.findDatasource('jUnassignedEmergDS');
    jAssignedEmergDS.state.loading = true;
    jUnassignedEmergDS.state.loading = true;
    await invokeUnassignWorkRecord(this.app, resourceItem.item);
    if (this.page.state.optimizeInvoked === false) {
      this.page.state.optimizeInvoked = true;
      this.page.state.hideRecommendations = true;
      await EmergencyDataUtils.invokeOptimizeAndCheckStatus(
        this.app,
        this.page
      );
      await emergencyDS.forceReload();
      jAssignedEmergDS.state.loading = false;
      jUnassignedEmergDS.state.loading = false;
    }
  }

  async filterResources() {
    const emergencyRecommendationsDS = this.app.findDatasource(
      'skdemrecommendationsDS'
    );

    const jemergencyRecommendationsDS = this.app.findDatasource(
      'jemergencyRecommendationsDS'
    );

    const assignmentId = jemergencyRecommendationsDS.items[0]?.assignmentid;

    this._resetDataSource(jemergencyRecommendationsDS);

    await EmergencyDataUtils.filterResourceRecommendation(
      this.app,
      this.page,
      emergencyRecommendationsDS,
      jemergencyRecommendationsDS,
      assignmentId
    );
  }

  // eslint-disable-next-line no-unused-vars
  switchTabs(args) {
    if (this.page.state.selectedEmergencyWork !== '0') {
      this.page.state.selectedEmergencyWork = '0';
    }
  }

  async onEmergencyReload() {
    const emergencyDS = this.app.findDatasource('skdactivityDS');
    if (this.page.state.optimizeInvoked === false) {
      this.page.state.optimizeInvoked = true;
      this.page.state.hideRecommendations = true;
      await EmergencyDataUtils.invokeOptimizeAndCheckStatus(
        this.app,
        this.page
      );
      await emergencyDS.forceReload();
    }
  }

  searchGraphicalView = (event) => {
    const grid = window.Grids[0];
    grid.SearchExpression = event;
    grid.SearchRows('Mark,Filter');
  };

  toggleGraphicalViewFilter() {
    const grid = window.Grids[0];
    if (grid.Filter) {
      if (grid.Filter.Visible !== 1) {
        grid.ShowRow(grid.Filter);
        window.Grids.OnRowFilter = (tGrid, row, show) => {
          if (this.page.state.disableClearGraphicalViewFilters) {
            this.page.state.disableClearGraphicalViewFilters = false;
          }
          return show;
        };
      } else {
        grid.HideRow(grid.Filter);
      }
    }
  }

  clearGraphicalViewFilters() {
    const grid = window.Grids[0];
    grid.ActionClearFilters();
    this.page.state.disableClearGraphicalViewFilters = true;
  }

  onGraphicalViewZoomChange({ selectedItem }) {
    const grid = window.Grids[0];
    this.page.state.selectedGraphicalViewZoomType = selectedItem.id;
    grid.ChangeZoom(selectedItem.id);
  }

  onGraphicalViewCalendarDateChange = (date) => {
    const grid = window.Grids[0];
    grid.SkipToDay('', date);
  };

  setSelectedGraphicalViewDate = (date) => {
    this.page.state.selectedGraphicalViewCalendarDate = JSON.stringify(date);
  };

  onGraphicalViewSkipDay(direction) {
    const grid = window.Grids[0];
    const { enddate, startdate } = this.page.params;
    let currDate = new Date(
      JSON.parse(this.page.state.selectedGraphicalViewCalendarDate)
    ).setHours(0, 0, 0, 0);

    if (direction === 'next') {
      currDate = new Date(currDate).setDate(new Date(currDate).getDate() + 1);
    } else if (direction === 'prev') {
      currDate = new Date(currDate).setDate(new Date(currDate).getDate() - 1);
    }

    const maxDate = new Date(enddate).setHours(0, 0, 0, 0);
    const minDate = new Date(startdate).setHours(0, 0, 0, 0);
    this.page.state.disableNextBtn = currDate === maxDate;
    this.page.state.disablePrevBtn = currDate === minDate;
    grid.SkipToDay(direction, null, this.setSelectedGraphicalViewDate);
  }

  loadWoSummaryApp = (resourceItem) => {
    let workOrderId;
    if (!resourceItem) {
      const jUnassignedEmergDS = this.app.findDatasource('jUnassignedEmergDS');
      const selectedItem = jUnassignedEmergDS.getSelectedItems()[0];
      workOrderId = selectedItem.workorderid;
    } else {
      workOrderId = resourceItem.item.workorderid;
    }
    const switcher = AppSwitcher.get();
    switcher.gotoApplication(
      'wosummary',
      {
        breadcrumb: {
          returnName: this.app.getLocalizedLabel(
            'return_to_app',
            'Returning to {0}',
            [this.app.title]
          ),
          enableReturnBreadcrumb: true,
        },
      },
      {
        contextParams: { clickedItemId: workOrderId },
        route: 'WOSummaryPage',
        preserveCurrentState: false,
        omitCurrentStatePreservation: true,
        embedded: true,
        canReturn: true,
      }
    );
  };
}

/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import moment from 'moment-timezone';
import OPTIMIZE_STATUS from './model/optimizeStatus';

export default class OptimizeSchedulePageController {
  extraWaitTime = 20;

  formatFractionHours = (skdodmeresourcesummary = []) =>
    skdodmeresourcesummary.map((resource) => {
      const { availablehours, loadhours } = resource;
      const [availabehoursWhole, availablehoursFraction] = availablehours
        .toString()
        .split('.');
      const [loadhoursWhole, loadhoursFraction] = loadhours
        .toString()
        .split('.');

      const loadhoursFractionDecimal = parseFloat(`0.${loadhoursFraction}`);
      const availablehoursFractionDecimal = parseFloat(
        `0.${availablehoursFraction}`
      );

      return {
        ...resource,
        availablehours:
          availabehoursWhole +
          moment
            .utc(
              moment
                .duration(availablehoursFractionDecimal, 'hours')
                .asMilliseconds()
            )
            .format(':mm'),
        loadhours:
          loadhoursWhole +
          moment
            .utc(
              moment
                .duration(loadhoursFractionDecimal, 'hours')
                .asMilliseconds()
            )
            .format(':mm'),
      };
    });

  pageInitialized(page, app) {
    this.page = page;
    this.app = app;
  }

  /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
  async pageResumed() {
    const runlatestDS = this.app.findDatasource('skdodmerunForOptimizeDS');
    const projectDS = this.app.findDatasource('skdprojectForOptimizeDS');
    const joptimizeAlertsDS = this.app.findDatasource('jOptimizeAlertsDS');
    const joptimizeSummaryDS = this.app.findDatasource('jOptimizeSummaryDS');

    this._resetDataSource(joptimizeAlertsDS);
    this._resetDataSource(joptimizeSummaryDS);
    runlatestDS.clearState();

    await projectDS.load({
      noCache: true,
      itemUrl: this.page.params.href,
    });

    const iterations = Math.round(
      (this.page.params.timelimit + this.extraWaitTime) /
        this.page.params.interval
    );

    await runlatestDS.load({
      noCache: true,
    });

    if (
      ![
        OPTIMIZE_STATUS.PROCESSED,
        OPTIMIZE_STATUS.STOPPED,
        OPTIMIZE_STATUS.FAILED,
      ].includes(runlatestDS.item.optimizationstatus)
    ) {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < iterations; i += 1) {
        await new Promise((resolve) => {
          setTimeout(resolve, this.page.params.interval * 1000);
        });
        await runlatestDS.load({
          noCache: true,
        });
        await this.loadDashboardData(runlatestDS.items[0]);

        // istanbul ignore next
        if (
          [
            OPTIMIZE_STATUS.PROCESSED,
            OPTIMIZE_STATUS.STOPPED,
            OPTIMIZE_STATUS.FAILED,
          ].includes(runlatestDS.item.optimizationstatus)
        ) {
          break;
        }
      }
    }
    if (
      [OPTIMIZE_STATUS.PROCESSED, OPTIMIZE_STATUS.STOPPED].includes(
        runlatestDS.item.optimizationstatus
      )
    ) {
      await this.loadDashboardData(runlatestDS.items[0]);
    }
  }

  async loadDashboardData(runlatestItem) {
    const joptimizeAlertsDS = this.app.findDatasource('jOptimizeAlertsDS');
    const joptimizeSummaryDS = this.app.findDatasource('jOptimizeSummaryDS');
    this._resetDataSource(joptimizeAlertsDS);
    this._resetDataSource(joptimizeSummaryDS);
    await joptimizeAlertsDS.load({
      src: runlatestItem.skdopascpsalert || [],
    });
    await joptimizeSummaryDS.load({
      src: this.formatFractionHours(runlatestItem.skdodmeresourcesummary),
    });
  }

  async onRefresh() {
    const runlatestDS = this.app.findDatasource('skdodmerunForOptimizeDS');
    await runlatestDS.forceReload();
    // istanbul ignore next
    if (
      [OPTIMIZE_STATUS.PROCESSED, OPTIMIZE_STATUS.STOPPED].includes(
        runlatestDS.item.optimizationstatus
      )
    ) {
      await this.loadDashboardData(runlatestDS.items[0]);
    }
  }

  _resetDataSource = (ds) => {
    ds.clearState();
    ds.resetState();
  };

  computeOptimizationStatusTag = (item) => {
    const colormap = new Map([
      [OPTIMIZE_STATUS.PROCESSED, 'gray'],
      [OPTIMIZE_STATUS.PROCESSING, 'blue'],
      [OPTIMIZE_STATUS.STOPPED, 'gray'],
      [OPTIMIZE_STATUS.STOPPING, 'blue'],
      [OPTIMIZE_STATUS.FAILED, 'red'],
    ]);

    if (item.optimizationstatus) {
      return [
        {
          label: item.optimizationstatus,
          type: colormap.get(item.optimizationstatus),
        },
      ];
    }
    return null;
  };

  openOptimizationProgressDialog() {
    this.app.showDialog('optimizationProgressLog');
  }

  goToWorkItemDetailsPage() {
    this.app.setCurrentPage({
      name: 'workItemDetails',
      params: {
        scenario: this.page.params.href,
        projectname: this.page.params.projectname,
        projectid: this.page.params.projectid,
        scheduletype: this.page.params.scheduletype,
        issuecount: this.page.params.issuecount,
        selectedTab: this.page.params.selectedTab,
        startdate: this.page.params.startdate,
        enddate: this.page.params.enddate,
      },
    });
  }

  async stopOptimizationRun() {
    const projectDS = this.app.findDatasource('skdprojectForOptimizeDS');
    const option = {
      record: projectDS.item,
      parameters: {},
    };
    const response = await projectDS.invokeAction('finishSKDODMERUN', option);
    if (response && !response.error) {
      this.app.toast(
        this.app.getLocalizedLabel(
          'optimization_stop_success',
          `Optimization stopped for ${projectDS.item.projectname} schedule`
        ),
        'info'
      );
    } else {
      this.app.toast(
        this.app.getLocalizedLabel(
          'optimization_stop_failure',
          'Failed to stop optimization'
        ),
        'error'
      );
    }
  }
}

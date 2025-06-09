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
import moment from 'moment-timezone';
import WorkItemUtils from './WorkItemUtils';

export default class WorkItemDetailsController {
  onDatasourceInitialized(ds, owner, app) {
    this.app = app;
  }

  computeErrorsAndWarnings = (item) => {
    const errorsAndWarnings = { errors: [], warnings: [] };
    item.schedulingerrors.forEach((issue) => {
      errorsAndWarnings.errors.push(issue);
    });
    return errorsAndWarnings;
  };

  computedIssueIcon(item) {
    return this.computeErrorsAndWarnings(item).errors.length
      ? 'carbon:error--filled'
      : '';
  }

  hideIssuesSpacing(item) {
    return (
      this.computeErrorsAndWarnings(item).errors.length === 0 ||
      (this.computeErrorsAndWarnings(item).errors.length > 0 &&
        this.computeErrorsAndWarnings(item).warnings.length === 0)
    );
  }

  getIssueTitleString = (item) => {
    if (!item.taskid) {
      return item.wogroup;
    }

    return this.app.getLocalizedLabel(
      'schedule_issue_title',
      `${item.wogroup} Task ${item.taskid}`
    );
  };

  getScheduleTitleString = (item) =>
    this.app.getLocalizedLabel('schedule_title_string', '{0} schedule', [
      item.projectname,
    ]);

  async onSave(showSaveNotification = true) {
    const unscheduledDS = this.app.findDatasource('skdactivityunscheduledDS');
    const response = await unscheduledDS.save();
    if (response && !response.error) {
      if (showSaveNotification) {
        this.app.toast(
          this.app.getLocalizedLabel(
            'activities_save_success',
            'Record has been saved'
          ),
          'success'
        );
      }
      this.onReload();
    } else if (showSaveNotification) {
      this.app.toast(
        this.app.getLocalizedLabel(
          'activities_save_error',
          'Failed to save record'
        ),
        'error'
      );
    }
  }

  async onReload() {
    const page = this.app.findPage('workItemDetails');
    if (page) {
      page.state.disableSaveButton = true;
    }
    const activityDS = this.app.findDatasource('skdactivityunscheduledDS');
    await activityDS.forceReload();
  }

  onUndo() {
    this.onReload();
  }

  getResourceTypeName = (item) => {
    if (item.craft) {
      return item.craftdesc || item.craft;
    }

    return item.crewtypedesc || item.amcrewtype;
  };

  getLaborName = (item) => {
    if (item.laborcode) {
      return item.laborname || item.laborcode;
    }

    return item.crewtypedesc || item.amcrewtype;
  };

  formatSecondsToHoursSeconds = (item) =>
    moment
      .utc(moment.duration(item.drivetimesec, 'seconds').asMilliseconds())
      .format('HH:mm');

  formatTime = (item) => {
    if (item.starttimedate === undefined) return '';
    return WorkItemUtils.formatTime(item.starttimedate);
  };
}

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

import { AppSwitcher } from '@maximo/maximo-js-api';

class AppController {
  applicationInitialized(app) {
    this.app = app;
  }

  goToDashboardPage() {
    this.app.setCurrentPage('dispatch');
  }

  loadApp = async (args = {}) => {
    const appName = args.appName || 'RLASSIGN';
    const context = args.context || {};
    const options = args.options || {};
    const switcher = AppSwitcher.get();
    await switcher.gotoApplication(appName, context, options);
  };

  async handlePublishScheduleInProgress() {
    const page = this.app.findPage('workItemDetails');

    this.app.showDialog('publishingInProgressDialog');

    const projectDS = this.app.findDatasource('skdprojectsDS');

    const option = {
      record: projectDS.item,
      parameters: {},
    };

    const response = await projectDS.invokeAction('publish', option);

    if (response && !response.error) {
      page.state.publishingCompleted = true;
      this.app.toast(
        this.app.getLocalizedLabel(
          'publish_schedule_success',
          `You have successfully published the ${projectDS.item.projectname} schedule`
        ),
        'success'
      );
    } else {
      this.app.toast(
        this.app.getLocalizedLabel(
          'publish_schedule_failure',
          'Failed to publish'
        ),
        'error'
      );
      page.findDialog('publishingInProgressDialog').closeDialog();
    }
  }
}
export default AppController;

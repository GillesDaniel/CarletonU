/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import assignEmergencyWork from './WorkItemDetailsPage/EmergencyWorkTab/assignEmergencyWork';
import EmergencyDataUtils from './WorkItemDetailsPage/EmergencyWorkTab/EmergencyDataUtils';
import resourcePanel from './WorkItemDetailsPage/EmergencyWorkTab/resourcePanel';

export default class ConfirmAssignEmergencyWorkController {
  dialogInitialized(dialog) {
    this.dialog = dialog;
    this.app = dialog.getApplication();
    this.page = this.app.findPage('workItemDetails');
  }

  dialogOpened() {
    this.page.state.confirmationDialogWorkRecord = `${resourcePanel.generateSelectedUnassignedEmergencyWorkItemTitle(
      this.app
    )}, ${
      this.page.state.selectedUnassignedEmergencyWorkItem.resourcetypename
    }`;
  }

  async handleAssignEmergencyWork() {
    const emergencyDS = this.app.findDatasource('skdactivityDS');
    const jUnassignedEmergDS = this.app.findDatasource('jUnassignedEmergDS');
    jUnassignedEmergDS.state.loading = true;
    const {
      selectedUnassignedEmergencyWorkItem,
      selectedResourceItem,
      startedAssigning,
    } = this.page.state;
    if (!startedAssigning) {
      this.page.state.startedAssigning = true;
    }
    await assignEmergencyWork(
      this.app,
      selectedResourceItem,
      selectedUnassignedEmergencyWorkItem
    );
    if (this.page.state.optimizeInvoked === false) {
      this.page.state.optimizeInvoked = true;
      this.page.state.hideRecommendations = true;
      await EmergencyDataUtils.invokeOptimizeAndCheckStatus(
        this.app,
        this.page
      );
      await emergencyDS.forceReload();
      jUnassignedEmergDS.state.loading = false;
    }
  }
}

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

import { log } from '@maximo/maximo-js-api';

const TAG = 'assignEmergencyWork';

const showFailureToast = (app) => {
  app.toast(
    app.getLocalizedLabel(
      'assign_emergency_work_failure',
      'Failed to assign emergency work'
    ),
    'error'
  );
};

const showToastOnResponse = (app, response, emergencyWorkItem) => {
  if (response && !response.error) {
    app.toast(
      app.getLocalizedLabel(
        'assign_emergency_work_success',
        `Emergency work record ${emergencyWorkItem?.wonum} was assigned.`
      ),
      'success'
    );
  } else {
    showFailureToast(app);
    log.e(TAG, 'Failed to assign emergency work');
  }
};

const assignEmergencyWork = async (app, resourceItem) => {
  const emergencyWorkItem = app
    .findDatasource('jUnassignedEmergDS')
    .getSelectedItems()[0];

  const resourceLaborCode = resourceItem?.laborcode;

  if (!resourceLaborCode) {
    log.e(TAG, 'resource laborcode missing');
    showFailureToast(app);
    return;
  }

  const emergencyWorkItemAssignmentId = emergencyWorkItem?.assignmentid;

  if (!emergencyWorkItemAssignmentId) {
    log.e(TAG, 'emergency work assignmentid missing');
    showFailureToast(app);
    return;
  }

  const projectDS = app.findDatasource('skdprojectsDS');
  const jUnassignedEmergDS = app.findDatasource('jUnassignedEmergDS');
  jUnassignedEmergDS.state.loading = true;

  const option = {
    record: projectDS.item,
    parameters: {
      assignmentid: emergencyWorkItemAssignmentId,
      laborCode: resourceLaborCode,
      startTime: resourceItem.starttimedate,
      endTime: resourceItem.endtimedate,
    },
  };

  const response = await projectDS.invokeAction('assignLabor', option);
  jUnassignedEmergDS.state.loading = false;
  showToastOnResponse(app, response, emergencyWorkItem);
};

export default assignEmergencyWork;

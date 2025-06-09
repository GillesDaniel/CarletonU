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

const TAG = 'unassignWorkRecord';

const toasts = {
  fail: {
    id: 'unassign_work_record_failed',
    message: 'Failed to unassign work record',
  },
  success: {
    id: 'work_record_unassigned',
    message: (wonum) => `Emergency work record ${wonum} was unassigned.`,
  },
};

const invokeUnassignWorkRecord = async (app, resourceItem) => {
  const { assignmentid, wonum } = resourceItem;

  if (!assignmentid) {
    app.toast(
      app.getLocalizedLabel(toasts.fail.id, toasts.fail.message),
      'error'
    );
    log.e(TAG, `work record assignmentid is missing`);
    return;
  }

  const projectDS = app.findDatasource('skdprojectsDS');
  const response = await projectDS.invokeAction('unassignLabor', {
    record: projectDS.item,
    parameters: {
      assignmentid,
    },
  });

  if (response && !response.error) {
    app.toast(
      app.getLocalizedLabel(toasts.success.id, toasts.success.message(wonum)),
      'success'
    );
  } else {
    app.toast(
      app.getLocalizedLabel(toasts.fail.id, toasts.fail.message),
      'error'
    );
    log.e(TAG, 'Failed to unassign work record');
  }
};

export default invokeUnassignWorkRecord;

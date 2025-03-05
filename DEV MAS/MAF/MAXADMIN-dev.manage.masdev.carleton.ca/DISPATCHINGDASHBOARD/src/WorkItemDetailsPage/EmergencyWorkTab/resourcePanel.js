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

const generateSelectedUnassignedEmergencyWorkItemTitle = (app) => {
  const jUnassignedEmergDS = app.findDatasource('jUnassignedEmergDS');
  const selectedUnassignedEmergencyWorkItem =
    jUnassignedEmergDS.getSelectedItems()?.[0];
  const workItemTitle = selectedUnassignedEmergencyWorkItem?.wogroup || '';
  const workItemTaskId = selectedUnassignedEmergencyWorkItem?.taskid
    ? ` (${selectedUnassignedEmergencyWorkItem.taskid})`
    : '';
  return `${workItemTitle}${workItemTaskId}`;
};

const defaultHeaderMessageForResourcePanel = (app) => {
  const label = app.getLocalizedMessage(
    'dispatcherdashboard',
    'resource_panel_header_default',
    'Resources'
  );
  return label;
};

const generateResourcePanelHeader = (app) => {
  const unassignedEmergencyWorkItemTitle =
    generateSelectedUnassignedEmergencyWorkItemTitle(app);

  if (!unassignedEmergencyWorkItemTitle) {
    return defaultHeaderMessageForResourcePanel(app);
  }

  const label = app.getLocalizedMessage(
    'dispatcherdashboard',
    'resource_panel_header_for_selected_emergency',
    `Resources for ${unassignedEmergencyWorkItemTitle}`
  );

  return label;
};

const resourcePanel = {
  generateSelectedUnassignedEmergencyWorkItemTitle,
  defaultHeaderMessageForResourcePanel,
  generateResourcePanelHeader,
};

export default resourcePanel;

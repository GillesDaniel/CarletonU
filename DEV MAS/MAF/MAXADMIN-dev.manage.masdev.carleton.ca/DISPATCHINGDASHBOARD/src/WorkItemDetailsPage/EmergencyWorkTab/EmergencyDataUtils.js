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

/* eslint-disable no-param-reassign */

import WorkItemUtils from '../../WorkItemUtils';
import resourcePanel from './resourcePanel';
import OPTIMIZE_POLLING_CONFIG from '../../model/OptimizePollingConfig';
import OPTIMIZE_STATUS from '../../model/optimizeStatus';

const resetDataSource = (ds) => {
  ds.clearState();
  ds.resetState();
};

const computePriorityTag = (app, item) => {
  if (Object.hasOwn(item, 'wopriority')) {
    const tagtype = item.wopriority < 2 ? 'red' : 'gray';
    return [
      {
        label: app.getLocalizedLabel(
          'assignment_priority',
          `Priority ${item.wopriority}`
        ),
        type: tagtype,
      },
    ];
  }
  return null;
};

const getAssignmentsForLaborCode = (app, resourceRecommendation) => {
  const assignments = [];
  if (resourceRecommendation.skdemrecresassignment) {
    resourceRecommendation.skdemrecresassignment.forEach((item) => {
      const newAssignment = {
        assigntaskname: item.taskname,
        assignstatus: item.status,
        assignstarttimedate: WorkItemUtils.formatTime(item.starttimedate),
        assignendtimedate: WorkItemUtils.formatTime(item.endtimedate),
        assgnwopriority: item.wopriority,
        assignwonum: item.wonum,
        priorityTag: computePriorityTag(app, item),
        assgnresourcelock: item.resourcelock,
        wodescription: item.wodescription,
      };
      assignments.push(newAssignment);
    });
  }
  return assignments;
};

const getAllItemsForRecommendedResources = (app, data) => {
  const processedData = [];
  data.forEach((item) => {
    const newObj = {
      skilllevel: item.skilllevel,
      drivetimesec: item.drivetimesec,
      formatteddrivetime: item.formatteddrivetime,
      displayname:
        !item.displayname || item.displayname === ''
          ? item.laborcode
          : item.displayname,
      craft: item.craft,
      href: item.href,
      assignmentid: item.assignmentid,
      skdodmerunid: item.skdodmerunid,
      starttimedate: item.starttimedate,
      endtimedate: item.endtimedate,
      formattedtime: item.formattedtime,
      toprecommendation: item.toprecommendation,
      laborcode: item.laborcode,
    };

    const assignments = getAssignmentsForLaborCode(app, item);
    newObj.assignments = assignments;
    processedData.push(newObj);
  });

  return processedData;
};

const generateDatasource = (app, data) =>
  getAllItemsForRecommendedResources(app, data);

const filterResourceRecommendation = async (
  app,
  page,
  emergencyRecommendationsDS,
  jemergencyRecommendationsDS,
  assignmentId
) => {
  const filteredRecommendations = emergencyRecommendationsDS.items.filter(
    (item) => {
      if (page.state.selectedResourcesFilter === 'topRecommendations') {
        return (
          item.assignmentid === assignmentId && item.toprecommendation === true
        );
      }
      return item.assignmentid === assignmentId;
    }
  );

  if (filteredRecommendations?.length) {
    const jUnassignedEmergDS = app.findDatasource('jUnassignedEmergDS');
    jUnassignedEmergDS.state.loading = true;
    const processedData = generateDatasource(app, filteredRecommendations);
    await jemergencyRecommendationsDS.load({
      src: processedData,
      noCache: true,
    });
    jUnassignedEmergDS.state.loading = false;
  }
};

const filterResourceRecommendationCount = (
  page,
  emergencyRecommendationsDS,
  assignmentId
) => {
  const filterCounters = { topRecommendations: 0, allResources: 0 };
  const topRecommendationsArray = [];
  const allResourcesArray = [];
  emergencyRecommendationsDS.items.forEach((item) => {
    const assignment = item.assignmentid === assignmentId;
    if (assignment && item.toprecommendation === true && item.laborcode) {
      topRecommendationsArray.push(item.laborcode);
    }

    if (assignment && item.laborcode) {
      allResourcesArray.push(item.laborcode);
    }
  });

  filterCounters.topRecommendations = new Set(topRecommendationsArray).size;
  filterCounters.allResources = new Set(allResourcesArray).size;

  page.state.filterCounters = filterCounters;
};

const createAndLoadRecommendationsDataSource = async (
  app,
  page,
  unassignedDS,
  recommendationsDS
) => {
  const jemergencyRecommendationsDS = app.findDatasource(
    'jemergencyRecommendationsDS'
  );

  filterResourceRecommendationCount(
    page,
    recommendationsDS,
    unassignedDS.items[0].assignmentid
  );

  await filterResourceRecommendation(
    app,
    page,
    recommendationsDS,
    jemergencyRecommendationsDS,
    unassignedDS.items[0].assignmentid
  );
};

const loadEmergencyData = async (app, page, items) => {
  const emergencyRecommendationsDS = app.findDatasource(
    'skdemrecommendationsDS'
  );
  const jUnassignedEmergDS = app.findDatasource('jUnassignedEmergDS');
  const jAssignedEmergDS = app.findDatasource('jAssignedEmergDS');
  const unassignedArray = [];
  const assignedArray = [];

  /* istanbul ignore else */
  if (items.length !== 0) {
    items.forEach((item) => {
      const newObj = {
        wonum: item.wonum,
        workorderid: item.workorderid ? item.workorderid.toString() : '',
        wogroup: item.wogroup,
        name: item.name,
        resourcename: item.resourcename,
        resourcetypename: item.resourcetypename,
        laborname: item.laborname,
        laborhrs: item.laborhrs,
        wopriority: item.wopriority,
        assetnum: item.assetnum,
        location: item.location,
        assigneddate: item.changedate,
        assignedby: item.changeby,
        craftdesc: item.craftdesc,
        assignmentid: item.assignmentid,
        taskid: item.taskid,
        skilllevel: item.skilllevel,
        assignstatus_description: item.assignstatus_description,
        combinedWogroupAndTaskId: `${item?.wogroup}${
          item?.taskid ? ` (${item.taskid})` : ''
        }`,
      };
      if (item.assignstatus_maxvalue === 'WAITASGN') {
        unassignedArray.push(newObj);
      } else {
        assignedArray.push(newObj);
      }
    });

    resetDataSource(jUnassignedEmergDS);
    const { 0: firstUnassignedItem } = unassignedArray;
    if (firstUnassignedItem) {
      jUnassignedEmergDS.selectionManager.setSelected(
        { _id: 0, ...firstUnassignedItem },
        true
      );
      page.state.selectedUnassignedEmergencyWorkItem = firstUnassignedItem;
    }
    await jUnassignedEmergDS.load({ src: unassignedArray });

    resetDataSource(jAssignedEmergDS);
    await jAssignedEmergDS.load({ src: assignedArray });

    if (jUnassignedEmergDS.items.length !== 0) {
      page.state.resourcePanelHeader =
        resourcePanel.generateResourcePanelHeader(app);

      const optimizationDS = app.findDatasource('skdodmerunForEmergenciesDS');
      await optimizationDS.load({
        noCache: true,
      });

      page.state.latestrunid = optimizationDS.item.skdodmerunid;

      if (page.state.latestrunid) {
        await emergencyRecommendationsDS.load({
          where: `assignmentid=${page.state.selectedUnassignedEmergencyWorkItem.assignmentid} AND skdodmerunid=${optimizationDS.item.skdodmerunid}`,
        });

        await createAndLoadRecommendationsDataSource(
          app,
          page,
          jUnassignedEmergDS,
          emergencyRecommendationsDS
        );
      }
    }
  }
  page.state.tasksWithEmergencies = unassignedArray.length;
};

const runOptimizationForEmergency = (app) => {
  const projectDS = app.findDatasource('skdprojectsDS');
  const option = {
    record: projectDS.items[0],
    parameters: {},
  };
  projectDS.invokeAction('runOptimizationEm', option);
};

/* istanbul ignore next */
const invokeOptimizeAndCheckStatus = async (app, page) => {
  runOptimizationForEmergency(app);
  const optimizationDS = app.findDatasource('skdodmerunForEmergenciesDS');
  const emergencyRecommendationsDS = app.findDatasource(
    'skdemrecommendationsDS'
  );

  optimizationDS.load({
    noCache: true,
  });
  if (
    ![
      OPTIMIZE_STATUS.PROCESSED,
      OPTIMIZE_STATUS.STOPPED,
      OPTIMIZE_STATUS.FAILED,
    ].includes(optimizationDS.item.status)
  ) {
    const iterations = 10;
    const jAssignedEmergDS = app.findDatasource('jAssignedEmergDS');
    const jUnassignedEmergDS = app.findDatasource('jUnassignedEmergDS');
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < iterations; i += 1) {
      await new Promise((resolve) => {
        setTimeout(resolve, OPTIMIZE_POLLING_CONFIG.OPTIMIZE_STATUS_INTERVAL);
        jAssignedEmergDS.state.loading = true;
        jUnassignedEmergDS.state.loading = true;
      });

      jAssignedEmergDS.state.loading = true;
      jUnassignedEmergDS.state.loading = true;
      await optimizationDS.load({
        noCache: true,
      });
      if (
        [
          OPTIMIZE_STATUS.PROCESSED,
          OPTIMIZE_STATUS.STOPPED,
          OPTIMIZE_STATUS.FAILED,
        ].includes(optimizationDS.item.status)
      ) {
        break;
      }
    }
  }

  if (
    [OPTIMIZE_STATUS.PROCESSED, OPTIMIZE_STATUS.STOPPED].includes(
      optimizationDS.item.status
    )
  ) {
    await new Promise((resolve) => {
      setTimeout(resolve, OPTIMIZE_POLLING_CONFIG.DATA_ADAPTOR_INTERVAL);
    });
    await emergencyRecommendationsDS.load({
      where: `assignmentid=${page.state.selectedUnassignedEmergencyWorkItem.assignmentid} AND skdodmerunid=${optimizationDS.item.skdodmerunid}`,
    });
  }
  const jAssignedEmergDS = app.findDatasource('jAssignedEmergDS');
  const jUnassignedEmergDS = app.findDatasource('jUnassignedEmergDS');
  page.state.optimizeInvoked = false;
  page.state.hideRecommendations = false;
  jAssignedEmergDS.state.loading = false;
  jUnassignedEmergDS.state.loading = false;
  page.state.latestrunid = optimizationDS.item.skdodmerunid;
};

const functions = {
  computePriorityTag,
  loadEmergencyData,
  generateDatasource,
  filterResourceRecommendation,
  invokeOptimizeAndCheckStatus,
  runOptimizationForEmergency,
  filterResourceRecommendationCount,
  getAllItemsForRecommendedResources,
};

export default functions;

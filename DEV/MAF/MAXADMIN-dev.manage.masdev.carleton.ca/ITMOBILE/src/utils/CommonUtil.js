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

/**
 * Get total qty that has been used (should excluded from the amount of available reserved item)
 * @param  {reserveitem} reserveitem the invreserve item to be updated.
 * @param  {app} app
 * @returns {totalQtyUsed} the amount of qty calculated for all used
 */
const getTotalQtyUsed = (reserveitem, app, excludedQty) => {
  let totalQtyUsed = 0;
  let need2IncludeComp = false;
  // istanbul ignore else
  if (app.device.isMaximoMobile) {
    need2IncludeComp = true;
  }
  // istanbul ignore else
  if (app.allinvuses && app.allinvuses.length > 0) {
    let invUseRecsRelated = [];
    if (need2IncludeComp) {
      invUseRecsRelated = app.allinvuses.filter(
        (item) =>
          item.requestnum === reserveitem.requestnum &&
          item.siteid === reserveitem.siteid
      );
      // in mobile
      // find the invuselines with the same requestnum and siteid as reserveitem
      // no matter invusestatus_maxvalue is "COMPLETE" or not
      // if synced with server, no COMPLETE items in local
      // if not synced, we need to calculate with this local item, no matter the status
    } else {
      invUseRecsRelated = app.allinvuses.filter(
        (item) =>
          item.requestnum === reserveitem.requestnum &&
          item.siteid === reserveitem.siteid &&
          item.invusestatus_maxvalue !== "COMPLETE"
      );
    }
    for (let i = 0; i < invUseRecsRelated.length; i++) {
      let invUseLineRec = invUseRecsRelated[i];
      totalQtyUsed = totalQtyUsed + invUseLineRec.quantity;
    }
  }

  // istanbul ignore else
  if (!isNaN(excludedQty)) {
    totalQtyUsed = totalQtyUsed - excludedQty;
  }

  return totalQtyUsed;
};

const getCopiedInvUseLine = (invuseline, invuse) => {
  let copiedInvUseLine = {
    ...invuseline,
    invusenum: invuse.invusenum,
    invuseid: invuse.invuseid,
    siteid: invuse.siteid,
    invusestatus: invuse.status,
    invusestatus_maxvalue: invuse.status_maxvalue,
    wonum:
      invuseline.invreserve &&
      invuseline.invreserve[0] &&
      invuseline.invreserve[0].workorder &&
      invuseline.invreserve[0].workorder[0]
        ? invuseline.invreserve[0].workorder[0].displaywonum
        : undefined,
    taskid:
      invuseline.invreserve &&
      invuseline.invreserve[0] &&
      invuseline.invreserve[0].workorder &&
      invuseline.invreserve[0].workorder[0]
        ? invuseline.invreserve[0].workorder[0].displaytaskid
        : undefined,
    refwo:
    invuseline.invreserve && 
    invuseline.invreserve[0] && 
    invuseline.invreserve[0].workorder &&
    invuseline.invreserve[0].workorder[0]
        ? invuseline.invreserve[0].workorder[0].refwo
        : undefined,
    enteredastask:
      invuseline.invreserve &&
      invuseline.invreserve[0] &&
      invuseline.invreserve[0].workorder &&
      invuseline.invreserve[0].workorder[0] &&
      invuseline.invreserve[0].workorder[0].displaytaskid
        ? true
        : false,
  };
  // Use the value from invuseline when there is already wonum/taskid there.
  //istanbul ignore else
  if (invuseline.wonum) {
    copiedInvUseLine.wonum = invuseline.wonum;
  }
  if (invuseline.taskid) {
    copiedInvUseLine.taskid = invuseline.taskid;
    copiedInvUseLine.enteredastask = true;
  } else {
    copiedInvUseLine.enteredastask = false;
  }
  return copiedInvUseLine;
};

const getCopiedInvReserve = (invreserve, invuse) => {
  return {
    ...invreserve,
    siteid: invuse.siteid,
    wonum:
      invreserve && invreserve.workorder && invreserve.workorder[0]
        ? invreserve.workorder[0].wogroup
        : undefined,
    taskid:
      invreserve && invreserve.workorder && invreserve.workorder[0]
        ? invreserve.workorder[0].taskid
        : undefined,
    enteredastask:
      invreserve &&
      invreserve.workorder &&
      invreserve.workorder[0] &&
      invreserve.workorder[0].taskid
        ? true
        : false,
  };
};

/**
 * Compute the 'computedDueDate' attribute
 */
const computeDueDate = (originalDate, app) => {
  if (originalDate) {
    return app?.dataFormatter
      ?.convertISOtoDate(originalDate)
      .toLocaleDateString();
  } else {
    return "";
  }
};

/**
 * Cache the synonydomain data for specified domainid
 * @param {*} app
 * @param {*} domainId
 * @param {*} queryObj
 * @returns cached data
 */
const cacheSynonymdomain = async (app, domainId, queryObj) => {
  // cache the domains in app.state.synonymDomainCache[domainId]
  app.state.synonymDomainCache = app.state.synonymDomainCache || {};
  let domainCache = [];
  if (domainId in app.state.synonymDomainCache) {
    domainCache = app.state.synonymDomainCache[domainId];
  } else {
    // query and cache
    const synonymDomainsDS = app.findDatasource("synonymdomainDS");
    synonymDomainsDS.initializeQbe();
    synonymDomainsDS.setQBE("domainid", domainId);
    domainCache = await synonymDomainsDS.searchQBE();
    app.state.synonymDomainCache[domainId] = domainCache;
  }
  let returnedCache = JSON.parse(JSON.stringify(domainCache));
  // istanbul ignore else
  if (queryObj && queryObj.key && queryObj.value) {
    returnedCache = returnedCache.find(
      (item) => item[queryObj.key] === queryObj.value
    );
  }
  return returnedCache;
};

const functions = {
  getTotalQtyUsed,
  getCopiedInvUseLine,
  getCopiedInvReserve,
  computeDueDate,
  cacheSynonymdomain,
};

export default functions;

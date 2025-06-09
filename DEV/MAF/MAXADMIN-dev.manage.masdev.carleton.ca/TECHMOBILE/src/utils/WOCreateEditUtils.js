/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/**
 * Return the valid asset or location
 * @param {app} is application object
 * @param {ds} is database name
 * @param {key} is attribute to be filtered
 * @param value is key value
 */

import { Device } from "@maximo/maximo-js-api";
const getAssetOrLocation = async (app, ds, key, value) => {
  let lookupDs = app.findDatasource(ds);
  /* istanbul ignore else */
  if(!value) {
    await clearSearch(lookupDs);
    return;
  }
  await lookupDs?.initializeQbe();
  lookupDs?.setQBE(key, "=", value);
  /* istanbul ignore else */
  if (app.client){
    lookupDs?.setQBE("siteid", "=", app.client.userInfo.defaultSite);
  }
  let items = await lookupDs?.searchQBE();
  /* istanbul ignore else */
  if (items?.length < 1) {
    await clearSearch(lookupDs);
  }
  lookupDs?.clearQBE();
  return items;
};

/**
 * clear the ds search;
 * @param {ds} is database name
 */
const clearSearch = async (ds) => {
  /* istanbul ignore else */
  if (ds && ds.lastQuery.qbe && JSON.stringify(ds.lastQuery.qbe) !== "{}") {
    ds.clearQBE();
    await ds.searchQBE(undefined, true);
  }
}

/**
 * validate GLAccount on Asset/location selection prompt bmx message 
 * when location's glaccount is different
 * @param {app} is application object
 * @param {page} is page object
 * @param {ds} is database name
 * @param {item} is location/asset item
 * @param {action} string for comparison
 */
const validateGlAccount = (app, page, ds, item, action, returnVal = false) => {
  if (
    ds.item.glaccount &&
    (item.locglaccount || item.glaccount) &&
    ds.item.glaccount !== (item.locglaccount || item.glaccount)
  ) {
    page.state.selectedItem = { action: action, item: item };
    page.state.dialogBMXMessage = app.getLocalizedLabel(
      "glConflictBmxLabel",
      "The location and asset combination you entered has different GL account than is currently specified on the work order. Would you like to update the work orders GL account based on the new asset/location combination?"
    );
    // this line of code will prevent multiple popup as we are validating GL Account
    /* istanbul ignore else  */
    if(returnVal) {
      return false;
    }
    /* istanbul ignore next  */
    window.setTimeout(() => {
      page.showDialog("sysMsgDialog_" + page.name);
    }, 100);
  } else {
    return true;
  }
}

/**
 * validate location on Asset/location selection prompt bmx message 
 * when location's glaccount is different
 * @param {app} is application object
 * @param {page} is page object
 * @param {ds} is database name
 * @param {item} is location/asset item
 */
const validateLocation = (app, page, ds, item) => {
  if (
    (ds.item.location || ds.item.locationnum) &&
    item.location &&
    ((ds.item.location || ds.item.locationnum) !== item.location)
  ) {
    page.state.dialogBMXMessage = app.getLocalizedLabel(
      "assetConflictBmxLabel",
      `The specified asset is not in the current location. Do you want to update the location with this  asset's location - ${
        item.location || /* istanbul ignore next */""
      }?`,
      [item.location || /* istanbul ignore next */""]
    );
    page.state.selectedItem = { action: "SETASSET", item: item };
    page.showDialog("sysMsgDialog_" + page.name);
  } else {
    return true;
  }
}

/**
 * validate asset on Asset/location selection prompt bmx message 
 * when location's glaccount is different
 * @param {app} is application object
 * @param {page} is page object
 * @param {ds} is database name
 * @param {item} is location/asset item
 */
const validateAsset = (app, page, ds, item) => {
  if (ds.item.assetnum && item.asset && item.asset.length === 1) {
    page.state.dialogBMXMessage = app.getLocalizedLabel(
      "locationConflictUpdateAssetBmxLabel",
      `The specified location does not contain the current asset. Do you want to update the asset with the asset that is in this new location - ${
        item.asset[0].assetnum || /* istanbul ignore next */""
      }?`,
      [item.asset[0].assetnum || /* istanbul ignore next */""]
    );
    page.state.selectedItem = { action: "SETLOCATION", item: item };
    page.showDialog("sysMsgDialog_" + page.name);
  } else if(ds.item.assetnum && item.asset && item.asset.length > 1){
    ds.item.asset = item.asset;
    page.state.dialogBMXMessage = app.getLocalizedLabel(
      "multiAssetlocationConflictBmxLabel_text",
      "The specified location does not contain the current asset. Do you want to clear the current asset selection ?"
    );
    page.state.selectedItem = { action: "SETLOCATION", item: ds.item };
    page.showDialog("sysMsgDialog_" + page.name);
  } else {
    return true;
  }
}

/**
 * Setting priority and failure code.
 * @param {app} is application object
 * @param {ds} dsWoedit/dsCreateWo
 */
const setPriorityFailureCode = async (app, ds) => {
  let priority = "";
  let failureCode = "";
  let failureDesc = "";
  let failureList = ""
  let assetData;
  let locationData;
  /* istanbul ignore else  */
  if(ds && ds.item && ds.item.assetnum) {
    await resetDataSource(app, 'assetLookupDS');
    assetData = await getAssetOrLocation(
      app,
      "assetLookupDS",
      "assetnum",
      ds.item.assetnum
    );
  }
  /* istanbul ignore else  */
  if(assetData && assetData.length) {
    /* istanbul ignore else  */
    if(assetData[0].priority) {
      priority = assetData[0].priority
    }
    /* istanbul ignore else  */
    if(assetData[0].failurecode) {
      failureCode = assetData[0].failurecode
    }
    if(assetData[0].failurelist && assetData[0].failurelist.length) {
      failureList = assetData[0].failurelist[0].failurelist;
      failureDesc = (assetData[0].failurelist[0].failurecode && assetData[0].failurelist[0].failurecode.description) ? assetData[0].failurelist[0].failurecode.description : ''
    }
  }
  /* istanbul ignore else  */
  if(ds && ds.item && (ds.item.location || ds.item.locationnum) && (!priority || !failureCode)) {
    await resetDataSource(app,'locationLookupDS');
    locationData = await getAssetOrLocation(
      app,
      "locationLookupDS",
      "location",
      ds.item.location || ds.item.locationnum
    );
  }
  
  /* istanbul ignore else  */
  if(locationData && locationData.length) {
    /* istanbul ignore else  */
    if(locationData[0].locpriority && !priority) {
      priority = locationData[0].locpriority
    }
    /* istanbul ignore else  */
    if(locationData[0].failurecode && !failureCode) {
      failureCode = locationData[0].failurecode
    }
    /* istanbul ignore else  */
    if(!failureList && locationData[0].failurelist && locationData[0].failurelist.length) {
      failureList = locationData[0].failurelist[0].failurelist;
      failureDesc = (locationData[0].failurelist[0].failurecode && locationData[0].failurelist[0].failurecode.description) ? locationData[0].failurelist[0].failurecode.description : ''
    }
  }
  /* istanbul ignore else  */
  if(ds && ds.item) {
    /* istanbul ignore else */
    if(priority) {
      ds.item.assetlocpriority = priority;
    }
    /* istanbul ignore else */
    if(failureCode) {
      ds.item.failurecode = failureCode;
    }

    /* istanbul ignore else  */
    if(failureList) {
      ds.item['failuredescription'] = failureDesc;
      ds.item['failurelistid'] = failureList
    }
  }
}

/**
 * setting assetNum, priority, failurecode and location
 * @param {app} is application object
 * @param {page} is page object
 * @param {ds} is database name
 * @param {item} is location/asset item
 */
const setAsset = async (app, page, ds, item, controller) => {
  let validAsset = page.state.isMobile ? validateGlAccount(app, page, ds, item, "SETASSETGL") : true;
  /* istanbul ignore else  */
  if (validAsset) {
    ds.item.assetnum = item.assetnum;
    ds.item.assetdesc = item.description;
    controller.validAssetValue = item.assetnum;
    /* istanbul ignore else  */
    if (item.location) {
      if (page.name === "woedit" && (!ds.item.locationnum || page.state.isMobile )) {
        ds.item.locationnum = item.location;
      } else if (page.name === "createwo" && (!ds.item.location ||  page.state.isMobile )) {
        ds.item.location = item.location;
      }
      ds.item.locationdesc = item.locationdesc;
      /* istanbul ignore else  */
      if(page.state.isMobile || ((ds.item.locationnum === item.location && page.name === "woedit") || (ds.item.location === item.location && page.name === "createwo"))) {
        setGLAccount(app, page, ds, item);
      }
    }
  }
}

/**
 * Setting glaccount
 * @param {app} application object
 * @param {page} current page object
 * @param {ds} dsWoedit/dsCreateWo
 * @param {item} location/asset item
 * @param {action} on the basis of action set asset/location
 */
const setGLAccount = (app, page, ds, item, action, controller) => {
  ds.item.glaccount = item.locglaccount || item.glaccount;
  /* istanbul ignore else  */
  if (action === "SETASSETGL") {
    setAsset(app, page, ds, item, controller);
  } else if (action === "SETLOCGL") {
    setLocation(app, page, ds, item, controller);
  }
}

/**
 * Setting location, priority, glaccount and failureCode after validating glAccount.
 * @param {app} application object
 * @param {page} current page object
 * @param {ds} dsWoedit/dsCreateWo
 * @param {item} location item
 */
const setLocation = (app, page, ds, item, controller) => {
  let validGLAccount = page.state.isMobile ? validateGlAccount(app, page, ds, item, "SETLOCGL") : true;
  /* istanbul ignore else  */
  if (validGLAccount) {
    if(page.name === 'woedit') {
      ds.item.locationnum = item.location || item.locationnum;
      controller.validLocationValue = ds.item.locationnum;
    } else {
      ds.item.location = item.location;
      controller.validLocationValue = ds.item.location;
    }
    ds.item.locationdesc = item.description;
    /* istanbul ignore else  */
    if(page.name !== 'woedit' || page.state.isMobile) {
      setGLAccount(app, page, ds, item);
    }
    /* istanbul ignore next  */
    if (
      (!ds.item.assetnum && item.asset && item.asset.length === 1) ||
      (item.asset && item.asset.length === 1 && page.state.isMobile)
    ) {
      ds.item.assetnum = item.asset[0].assetnum;
      ds.item.assetdesc = item.asset[0].description;
    } else if (ds.item.assetnum && item.asset && item.asset.length > 1) {
      validateAsset(app, page, ds , item);
      ds.item.assetnum = "";
      ds.item.assetdesc = "";
    }
  }
}

 /**
   * Open Log Type Lookup from WorkLog
   */
  const openWorkLogTypeLookup = async (page,ds,lookup) =>{
    ds.clearState();
    await ds.initializeQbe();
    ds.setQBE('domainid', '=', 'LOGTYPE');
    await ds.searchQBE();

    let selectedItem;
    let defaultType = page.state.initialDefaultLogType;

    /* istanbul ignore else */
    if (defaultType) {
      selectedItem = ds.items.filter((item => defaultType.replace(/!/g, "") === item.value));
    }

    /* istanbul ignore else  */
    if (selectedItem && selectedItem[0]) {
      ds.setSelectedItem(selectedItem[0], true);
    }
    page.showDialog(lookup);
  }

const resetDataSource = async (app, ds) => {
  let datasource = app?.findDatasource(ds);
  await datasource?.reset(datasource.baseQuery);
};

/**
 * This function opens the Y reference point lookup dialog and loads the appropriate reference points into the datasource.
 * @param {Application} app - The application object.
 * @param {Event} evt - The event object.
 */
const openYRefernceLookup = async (app, evt) => {
  let refenceCodeLookup = app.findDatasource('alndomainData');
  await refenceCodeLookup?.initializeQbe();
  refenceCodeLookup?.setQBE('domainid', '=', 'yoffsetref');
  await refenceCodeLookup?.searchQBE();

  if (evt.ref === 'start') {
    app.showDialog('YRefenceLookup');
  } else if (evt.ref === 'end') {
    app.showDialog('EndYRefenceLookup');
  }
  refenceCodeLookup?.clearQBE();
}

/**
 * @param {string} app,evt - The app,evt string to send to Graphite.
 * @returns {Promise<any>} - A promise that resolves to an array of objects containing the retrieved data.
 */
const openZRefernceLookup = async (app,evt) => {
  let refenceCodeLookup = app.findDatasource('alndomainData');
  await refenceCodeLookup?.initializeQbe();
  refenceCodeLookup?.setQBE('domainid', '=', 'zoffsetref');
  await refenceCodeLookup?.searchQBE();
  if(evt.ref === 'start'){
    app.showDialog('ZRefenceLookup');
  } 
  //istanabul ignore else if
  else if(evt.ref === 'end'){
    app.showDialog('EndZRefenceLookup');
  }
  refenceCodeLookup?.clearQBE();
}


/**
 * This function opens the reference point lookup dialog and loads the appropriate reference points into the datasource.
 * @param {Application} app - The application object.
 * @param {Event} evt - The event object.
 * @param {string} assetnum - The asset number of the selected feature.
 * @param {Array<Item>} assetFeatureArr - An array of selected features.
 */
// istanbul ignore next
const openRefPointLookup = async (app, evt, assetnum) => {
  if (evt.ref === 'start') {
    app.showDialog('startReferncePointLookup');
  } else if (evt.ref === 'end') {
    app.showDialog('endReferncePointLookup');
  }
}

/**
* This function sets the appropriate y-reference value based on the selected attribute.
* @param {Page} page - The page object where the datasource is located.
* @param {string} datasource - The name of the datasource.
* @param {Item} item - The selected item in the dropdown list.
* @param {string} attr - The name of the attribute to set.
*/
const chooseYRefernceData = async (page, datasource, item, attr) => {
  const ds = page.findDatasource(datasource);
  if (attr === "startyoffsetref") {
    ds.item.startyoffsetref = item.value;
  } else if (attr === "endyoffsetref") {
    ds.item.endyoffsetref = item.value;
  } else if (attr === "startzoffsetref") {
    ds.item.startzoffsetref = item.value;
  } else if (attr === "endzoffsetref") {
    ds.item.endzoffsetref = item.value;
  }
}

/**
 * This function sets the appropriate reference point label based on the selected attribute.
 * @param {Page} page - The page object where the datasource is located.
 * @param {string} datasource - The name of the datasource.
 * @param {Item} item - The selected item in the dropdown list.
 * @param {string} attr - The name of the attribute to set.
 */
const chooseReferncePointData = async (page, datasource, item, attr) => {
  const ds = page.findDatasource(datasource);
  if (attr === "startfeaturelabel") {
    ds.item.startfeaturelabel = item.label;
    if(Device.get().isMaximoMobile){
      ds.item.startmeasure = item.endmeasure;
      page.state.startFeatureMeasure = item.endmeasure;
    }else if(!Device.get().isMaximoMobile){
      ds.item.startmeasure = item.startmeasure;
      page.state.startFeatureMeasure = item.startmeasure;
    }
    ds.item.startassetfeatureid = item.assetfeatureid;
    page.state.startOffsetReadOnly = false;
  } else if (attr === "endfeaturelabel") {
    ds.item.endfeaturelabel = item.label;
    ds.item.endassetfeatureid = item.assetfeatureid;
    ds.item.endmeasure = item.endmeasure;
    page.state.endOffsetReadOnly = false;
    page.state.endFeatureMeasure = item.endmeasure;
  }
}

/**
  * This function return the offsetvalues
  * @param app: The Qlik Sense app object.
  */
const offSetArr = (offsetArray) => {
  let offSetArray = [];
  offsetArray.forEach(element => {
    offSetArray.push(element.value);
  });
  return offSetArray;
}

/**
   * This function validates the start and end y-offsets of a reference line.
   * @param app: The Qlik Sense app object.
   * @param page: The current page object.
   * @param evt: The event object.
   * @param field :  The field to validate, either "startzoffsetref" or "endzoffsetref".
   */
const zRefValidation = async (app,page,evt,field) => {
  let res;
  /* istanbul ignore else */
  if(page.state.zoffsetArr && page.state.zoffsetArr.length > 0){
    const offSetArray = offSetArr(page.state.zoffsetArr);
    /* istanbul ignore else */
    if(field === "startzoffsetref"){
     res =  offSetArray.includes(evt.item.startzoffsetref);
     return res;
    }
    /* istanbul ignore else */
    if(field === "endzoffsetref"){
      res =  offSetArray.includes(evt.item.endzoffsetref);
      return res;
     }
  }
  else {
    let refenceCodeLookup = app.findDatasource('alndomainData');
    await refenceCodeLookup?.initializeQbe();
    refenceCodeLookup?.setQBE('domainid', '=', 'zoffsetref');
    await refenceCodeLookup?.searchQBE();
    page.state.zoffsetArr = refenceCodeLookup?.items;
    /* istanbul ignore else */
    if(page.state.zoffsetArr && page.state.zoffsetArr.length > 0){
      const offSetArray = offSetArr(page.state.zoffsetArr);
      /* istanbul ignore else */
      if(field === "startzoffsetref"){
       res =  offSetArray.includes(evt.item.startzoffsetref);
       return res;
      }
      /* istanbul ignore else */
      if(field === "endzoffsetref"){
        res =  offSetArray.includes(evt.item.endzoffsetref);
        return res;
       }
    }
  }
}

/**
   * This function validates the start and end y-offsets of a reference line.
   * @param app: The Qlik Sense app object.
   * @param page: The current page object.
   * @param evt: The event object.
   * @param field :  The field to validate, either "startyoffsetref" or "endyoffsetref".
   */
const yRefValidation = (page,evt,field) => {
  let res;
  /* istanbul ignore else */
  if(page.state.yoffsetArr && page.state.yoffsetArr.length > 0){
    const offSetArray = offSetArr(page.state.yoffsetArr);
    /* istanbul ignore else */
    if(field === "startyoffsetref"){
     res =  offSetArray.includes(evt.item.startyoffsetref);
     return res;
    }
    /* istanbul ignore else */
    if(field === "endyoffsetref"){
      res =  offSetArray.includes(evt.item.endyoffsetref);
      return res;
     }
  }
}


  /**
   * TThis function validates the start and end feature labels entered by the user.
   * @param assetFeatureArr: An array of objects containing asset features.
   * @param evt : An object containing the event data.
   * @param field :  A string indicating whether the validation is for the start or end feature label.
   */
const featureLabelValidation = (assetFeatureArr,evt,field) => {
  let res;
  /* istanbul ignore else */
  if(assetFeatureArr && assetFeatureArr.length > 0){
    let featureLabelArray = [];
    assetFeatureArr.forEach(element => {
      featureLabelArray.push(element.label);
    });
    /* istanbul ignore else */
    if(field === "startfeaturelabel"){
     res =  featureLabelArray.indexOf(evt.item.startfeaturelabel);
     return res;
    }
    /* istanbul ignore else */
    if(field === "endfeaturelabel"){
      res =  featureLabelArray.indexOf(evt.item.endfeaturelabel);
      return res;
     }
  }
}
  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  //function is used to retrieve y reference data from the application's data sources.
  const loadYRefData = async(app,page) => {
      let refenceCodeLookup = app.findDatasource('alndomainData');
      await refenceCodeLookup?.initializeQbe();
      refenceCodeLookup?.setQBE('domainid', '=', 'yoffsetref');
      await refenceCodeLookup?.searchQBE();
      page.state.yoffsetArr = refenceCodeLookup?.items;
      await refenceCodeLookup?.clearQBE();
  }
   // Assisted by WCA@IBM
   // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  //function is used to determine whether or not the Save button should be disabled based on the current state of the page. 
const saveDisable = (page) => {
  if (page.state.readOnlyState || page.state.saveDisable || page.state.zRefDisable) {
    page.state.disableButton = true;
  } else {
    page.state.disableButton = false;
  }
}

/**
 * This function validates the start y-offset reference value.
 * @param evt : The event object for the click event on the start y-offset reference field.
 */
const startYRefCal = (page, evt) => {
  return evt.item.startyoffsetref ? (!yRefValidation(page, evt, "startyoffsetref") ? true : false) : false;
}

/**
 * This function validates the end y-offset reference value.
 * @param evt : The event object for the click event on the end y-offset reference field.
 */
const endYRefCal = (page, evt) => {
  return evt.item.endyoffsetref ? (!yRefValidation(page, evt, "endyoffsetref") ? true : false) : false;
} 

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* @function selectWorkType
* @description This function is used to set the selected work type in the datasource.
* @param {Object} page - The current page object.
* @param {String} datasourceName - The name of the datasource to update.
* @param {String} workType - The selected work type.
*/
const selectWorkType = (page, datasourceName, workType) => {
  page.datasources[datasourceName].item["worktype"] = workType;
  page.state.worktype = workType;
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* @function uiRequired
* @description This function is used to check whether the given attribute is required or not.
* @param {Object} page - The current page object.
* @param {String} attributeName - The name of the attribute to check.
* @param {String} attributeValue - The value of the attribute to check.
* @returns {Boolean} - A boolean value indicating whether the attribute is required or not.
*/
const uiRequired = (page, dsName, attributeName, attributeValue) => {
  /*istanbul ignore else*/
  if (attributeName === null){
    return false;
  }
  const fieldDontHasValue = attributeValue === undefined || attributeValue === "" ? true : false;
  let returnValue = false;
  const workorderDt = page.datasources[dsName].uiRequired;
  const workorderArray = Object.values(workorderDt)[0] !== undefined ? Object.values(workorderDt)[0] : undefined;
  /*istanbul ignore else*/
  if (workorderArray !== undefined) {
    returnValue = workorderArray.find(data => data === attributeName) && fieldDontHasValue ? true : false;
  }
  return returnValue;
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* @function showWOWarnings
* @description This function is used to display warnings on the Work Order form.
* @param {Object} page - The current page object.
* @param {String} dsName - The name of the datasource to update.
* @param {String} field - The field to display the warning for.
* @param {String} message - The warning message to display.
*/
const showWOWarnings = (page, dsName, field, message) => {
  const datasource = page.datasources[dsName];
  datasource?.setWarning(datasource.item, field, message);
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* @function clearWarnings
* @description This function is used to clear warnings from the Work Order form.
* @param {Object} page - The current page object.
* @param {String} dsName - The name of the datasource to update.
* @param {String} field - The field to clear the warning for.
*/
const clearWarnings = (page, dsName, field) => {
  const datasource = page.datasources[dsName];
  datasource?.clearWarnings(datasource.item, field);
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* @param {object} page - The current page object
* @param {object} app - The current app object
* @param {string} dsName - The name of the datasource
* @param {object} item - The item to be processed
* @returns {Promise<void>} - A promise that resolves when the location has been chosen
*/
const chooseLocation = async(app, page, dsName, item, controller) => {
  page.state.assetFiltered = true;
  const datasource = app.findDatasource(dsName);
  const assetData = await getAssetOrLocation(
    app,
    "assetLookupDS",
    "location",
    item.location
  );
  /* istanbul ignore else */
  if(assetData?.length > 0) { 
    item.asset = assetData;
    controller.validAssetValue = item.assetnum;
    controller.assetnum = assetData;
  }
  let validAsset = page.state.isMobile
    ? validateAsset(app, page, datasource, item)
    : true;
  /* istanbul ignore else */
  if (validAsset) {
    const locationFound = await setLocation(app, page, datasource, item, controller);
    if(locationFound) {
      controller.validLocationValue = item.location;
   } 
  }
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Opens the asset lookup page
* @param {object} app - The current app object
* @param {object} page - The current page object
* @param {string} parentPageName - The name of the parent page
*/
const openAssetLookup = (app, page, parentPageName) => {
  page.state.useConfirmDialog = false;
  app.setCurrentPage({
    name: "assetLookup",
    resetScroll: false,
  });
  /* istanbul ignore else */
  if (app.currentPage) {
    app.state.parentPage = parentPageName;
  }
  page.state.useConfirmDialog = true;
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* @param {App} app 
* @param {Page} page 
* @param {string} dsName 
* @param {object} item 
*/
const chooseAsset = async(app, page, dsName, item, controller) => {
  const woDatasource = app.findDatasource(dsName);
  const validLocation = page.state.isMobile? validateLocation(app, page, woDatasource, item) : true;
  const assetFeatureDs = app.findDatasource("assetFeatureData");
  /* istanbul ignore else  */
  if (!page.state.isManual) {
    /* istanbul ignore if  */
    if (item.islinear) {
      page.state.assetLinear = true;
      page.state.linearAssetAvailable = true;
      await defaultLinearData(app, page, woDatasource, item); // To Be Checked
      let assetFeature = [];
      assetFeatureDs?.clearSelections();
      if (item?.assetfeature?.length > 0) {
        item.assetfeature.filter(item => {
          if (item?.label) {
            assetFeature.push(item);
          }
        })
        await assetFeatureDs?.load({ src: assetFeature, noCache: true });
        page.state.startRefPointReadOnly = false;
        page.state.endRefPointReadOnly = false;
      }
      else {
        await assetFeatureDs?.load({ src: [], noCache: true });
        page.state.startRefPointReadOnly = true;
        page.state.endRefPointReadOnly = true;
        page.state.startOffsetReadOnly = true;
        page.state.endOffsetReadOnly = true;
      }
    } else {
      page.state.assetLinear = false;
      page.state.linearAssetAvailable = false;
      await assetFeatureDs?.load({ src: [], noCache: true });
      page.state.startRefPointReadOnly = true;
      page.state.endRefPointReadOnly = true;
      page.state.startOffsetReadOnly = true;
      page.state.endOffsetReadOnly = true;
    }
    page.state.isManual = false;
  }

  /* istanbul ignore else */ 
  if (validLocation) {
    controller.validAssetValue = item.assetnum;
    await setAsset(app, page, woDatasource, item, controller);
    controller.validLocationValue = item.location;
  }
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
 * This function is called when the user clicks the "Close" button on the confirmation dialog.
 * It sets the asset number and location values in the dsCreateWo object based on the selected options.
 */
const onUserConfirmationClose = (controller, ds) => {
  /* istanbul ignore else */
  if(controller.validAssetValue) {
    ds.item.assetnum = controller.validAssetValue;
  }
  /* istanbul ignore else */
  if(controller.validLocationValue) {
    ds.item.location = controller.validLocationValue;
  }
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
 * Validate asset location
 * @param {object} app Application
 * @param {object} page Page
 * @param {object} ds Data set
 * @param {object} item Item
 * @param {object} controller Controller
 */
const validateAssetLocation = async (app, page, ds, item, controller) => {
  const validAsset = await validateAsset(app, page, ds, item);
  /* istanbul ignore else */
  if (validAsset) {
    const locationFound = await setLocation(app, page, ds, item, controller);
    if(locationFound) {
      controller.validLocationValue = item.value;
    } 
  }
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
 * @param {Application} app 
 * @param {Page} page 
 * @param {WorkorderDatasource} woDatasource 
 * @param {Item} item 
 */
const defaultLinearData = async(app, page, woDatasource, item) => {
  page.state.startOffsetReadOnly = true;
  page.state.endOffsetReadOnly = true;
  woDatasource.item.startfeaturelabel = "";
  woDatasource.item.endfeaturelabel = "";
  woDatasource.item.startoffset = null;
  woDatasource.item.endoffset = null;
  woDatasource.item.startassetfeatureid = null;
  woDatasource.item.endassetfeatureid = null;
  woDatasource.item.startmeasure = item.startmeasure;
  woDatasource.item.endmeasure = item.endmeasure;
  page.state.assetStartMeasure = item.startmeasure;
  page.state.assetEndMeasure = item.endmeasure;
  /* istanbul ignore if  */
  if (item?.lrm) {
    const assetLRM = app.findDatasource("assetLRMEdit");
    assetLRM?.clearQBE();
    await assetLRM?.initializeQbe();
    assetLRM?.setQBE('lrm', '=', item?.lrm);
    await assetLRM?.searchQBE();
    if (assetLRM?.item) {
      woDatasource.item.startyoffsetref = assetLRM.item?.yoffsetref;
      woDatasource.item.startzoffsetref = assetLRM.item?.zoffsetref;
      woDatasource.item.endyoffsetref = assetLRM.item?.yoffsetref;
      woDatasource.item.endzoffsetref = assetLRM.item?.zoffsetref;
    }
  }
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Validate linear asset.
* @param {any} app The app.
* @param {any} page The current page.
* @param {string} dsName The data source name.
* @param {string} assetNum The asset number.
*/
const validateLinearAsset = async(app, page, dsName, assetNum) => {
  const assetLookupDS = app.findDatasource("assetLookupDS");
  // assetLookupDS?.clearQBE(); // Not requried as it is included in initializeQBE()
  await assetLookupDS?.initializeQbe();
  assetLookupDS?.setQBE('assetnum', '=', assetNum);
  await assetLookupDS?.searchQBE();
  assetLookupDS?.setQBE('siteid', '=', app.client.userInfo.defaultSite);
  let items = await assetLookupDS?.searchQBE();
  let assetFeatureDs = app.findDatasource("assetFeatureData");
  // istanbul ignore if
  if (items?.[0]?.islinear) {
    let woDatasource = page.findDatasource(dsName);
    page.state.assetLinear = true;
    page.state.linearAssetAvailable = true;
    page.state.isManual = true;
    let assetFeature = [];

    await defaultLinearData(app, page, woDatasource, items?.[0]);

    if (items?.[0]?.assetfeature?.length > 0) {
      items?.[0]?.assetfeature.filter(item => {
        if (item?.label) {
          assetFeature.push(item);
        }
      })
      await assetFeatureDs?.load({ src: assetFeature, noCache: true });
      page.state.startRefPointReadOnly = false;
      page.state.endRefPointReadOnly = false;
    } else {
      await assetFeatureDs?.load({ src: [], noCache: true });
      page.state.startRefPointReadOnly = true;
      page.state.endRefPointReadOnly = true;
      page.state.startOffsetReadOnly = true;
      page.state.endOffsetReadOnly = true;
    }

  } else {
    page.state.assetLinear = false;
    page.state.linearAssetAvailable = false;
    await assetFeatureDs?.load({ src: [], noCache: true });
    page.state.startRefPointReadOnly = true;
    page.state.endRefPointReadOnly = true;
    page.state.startOffsetReadOnly = true;
    page.state.endOffsetReadOnly = true;
  }
  assetLookupDS?.clearQBE();
  await assetLookupDS?.searchQBE();
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Calculate the start measure.
* @param {any} app The app.
* @param {any} page The current page.
* @param {string} dsName The data source name.
* @param {any} evt The event.
* @param {boolean} isEditWo Is edit work order?
*/
const startOffsetCal = async(app, page, dsName, evt, isEditWo = false) => {
 if (evt.item.startfeaturelabel && evt.item.startoffset) {
    evt.item.startmeasure = await measureCalculation(app, page, evt, "startmeasure", isEditWo);
    startMeasureValidation(app, page, dsName, evt);
 } else {
    clearWarnings(page, dsName, "startmeasure");
    evt.item.startmeasure = page.state.startFeatureMeasure;
 }
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Calculate the end measure.
* @param {any} app The app.
* @param {any} page The current page.
* @param {string} dsName The data source name.
* @param {any} evt The event.
* @param {boolean} isEditWo Is edit work order?
*/
const endOffsetCal = async(app, page, dsName, evt, isEditWo = false) => {
  if (evt.item.endfeaturelabel && evt.item.endoffset) {
    evt.item.endmeasure = await measureCalculation(app, page, evt,"endmeasure", isEditWo);
    endMeasureValidation(app, page, dsName, evt);
  } else {
    clearWarnings(page, dsName, "endmeasure");
    evt.item.endmeasure = page.state.endFeatureMeasure;
  }
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Calculate the start measure.
* @param {any} app The app.
* @param {any} page The current page.
* @param {any} evt The event.
* @param {string} dsName The datasource name.
* @param {boolean} isEditWo Is edit work order?
*/
const startMeasureCal = async(app, page, dsName, evt, isEditWo = false) => {
  /* istanbul ignore else  */
  if (evt.item.startfeaturelabel && evt.item.startoffset && !page.state.measureUpdate) {
    /* istanbul ignore else */
    if(evt.item.startoffset){
      evt.item.startmeasure = await measureCalculation(app, page, evt, "startmeasure", isEditWo);
      evt.item.startoffset = null;
      evt.item.startassetfeatureid = null;
      evt.item.startfeaturelabel = "";
    } 
    page.state.startOffsetReadOnly = true;
    clearWarnings(page, dsName, "startfeaturelabel");
  }
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Calculate the end measure.
* @param {any} app The app.
* @param {any} page The current page.
* @param {any} evt The event.
* @param {string} dsName The datasource name.
* @param {boolean} isEditWo Is edit work order?
*/
const endMeasureCal = async(app, page, dsName, evt, isEditWo = false) => {
  /* istanbul ignore else  */
  if (evt.item.endfeaturelabel && evt.item.endoffset && !page.state.endMeasureUpdate) {
    /* istanbul ignore else */
    if(evt.item.endoffset){
      evt.item.endmeasure = await measureCalculation(app, page, evt, "endmeasure", isEditWo);
      evt.item.endoffset = null;
      evt.item.endassetfeatureid = null;
      evt.item.endfeaturelabel = "";
    }
    page.state.endOffsetReadOnly = true;
    clearWarnings(page, dsName, "endfeaturelabel");
  }
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Validate the start measure.
* @param {any} app The app.
* @param {any} page The current page.
* @param {string} dsName The datasource name.
* @param {any} evt The event.
*/
const startMeasureValidation = (app, page, dsName, evt) => {
  const errorMsg = app.getLocalizedLabel(
    `measure_error_msg`,
    `Start Measure must be between the linear asset's Start Measure ${page.state.assetStartMeasure} and ${page.state.assetEndMeasure}. (BMXAA6139)`, [page.state.assetStartMeasure, page.state.assetEndMeasure]
  );
  /* istanbul ignore if  */
  if (evt.item.startmeasure && ((evt.item.startmeasure < page.state.assetStartMeasure) || (evt.item.startmeasure > page.state.assetEndMeasure))) {
    showWOWarnings(page, dsName, "startmeasure", errorMsg);
    return false;
  } else {
    clearWarnings(page, dsName, "startmeasure");
    return true;
  }
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Validate the end measure.
* @param {any} app The app.
* @param {any} page The current page.
* @param {string} dsName The datasource name.
* @param {any} evt The event.
*/
const endMeasureValidation = (app, page, dsName, evt) => {
  const errorMsg = app.getLocalizedLabel(
    `end_measure_error_msg`,
    `End Measure must be between the linear asset's Start Measure ${page.state.assetStartMeasure} and ${page.state.assetEndMeasure}. (BMXAA6139)`, [page.state.assetStartMeasure, page.state.assetEndMeasure]
  );
  /* istanbul ignore if  */
  if (evt.item.endmeasure && ((evt.item.endmeasure < page.state.assetStartMeasure) || (evt.item.endmeasure > page.state.assetEndMeasure))) {
    showWOWarnings(page, dsName, "endmeasure", errorMsg);
    return false;
  } else {
    clearWarnings(page, dsName, "endmeasure");
    return true;
  }
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Calculate the measure value.
* @param {any} app The app.
* @param {any} page The current page.
* @param {any} evt The event.
* @param {string} field The field name.
* @param {boolean} isEditWo Is edit work order.
* @returns The measure value.
*/
const measureCalculation = async(app, page, evt, field, isEditWo = false) => {
  let measure;
  let divisionVal;
  const assetLRM = app.findDatasource("assetLRMEdit");
  /* istanbul ignore next  */
  if(assetLRM?.items?.length === 0 && isEditWo){
    await assetLRM.load();
  }
   /* istanbul ignore else  */
   if(assetLRM?.item?.measureunitid === assetLRM?.item?.offsetmeasureunitid){
    divisionVal =1;
  }else{
    const conversionUnitDs = app.findDatasource("conversionUnitDs");
    conversionUnitDs?.items?.filter((item)=>{
      if(item.frommeasureunit === assetLRM?.item?.measureunitid && item.tomeasureunit === assetLRM?.item?.offsetmeasureunitid){
        divisionVal = item.conversion;
      }
    })
  }
   /* istanbul ignore next  */
   if(field === "endmeasure"){
    measure = (evt.item.endoffset/divisionVal)  + page.state.endFeatureMeasure;
  }else if(field === "startmeasure"){
    measure = (evt.item.startoffset/divisionVal)  + page.state.startFeatureMeasure;
  }
  measure = measure.toFixed(2);
  return measure;
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Validate the start z offset ref.
* @param {any} app The app.
* @param {any} page The current page.
* @param {string} dsName The datasource name.
* @param {any} evt The event.
*/
const startZRefCal = async(app, page, dsName, evt) => {
  const errorMessage = app.getLocalizedLabel(
    `valid_zoffsetref`,
    `Enter valid Z offset`
  );
  /* istanbul ignore else */
  if (evt.item.startzoffsetref) {
    const res = await zRefValidation(app, page, evt, "startzoffsetref");
    /* istanbul ignore else */
    if (!res) {
      showWOWarnings(page, dsName, "startzoffsetref", errorMessage);
      page.state.saveDisable = true;
    }
    else {
      clearWarnings(page, dsName, "startzoffsetref");
      page.state.saveDisable = false;
    }
  }
  else {
    clearWarnings(page, dsName, "startzoffsetref");
    page.state.saveDisable = false;
  }
  saveDisable(page);
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Validate the end z offset ref.
* @param {any} app The app.
* @param {any} page The current page.
* @param {string} dsName The datasource name.
* @param {any} evt The event.
*/
const endZRefCal = async(app, page, dsName, evt) => {
  const errorMessage = app.getLocalizedLabel(
    `valid_zoffsetref`,
    `Enter valid Z offset`
  );
  /* istanbul ignore else */
  if (evt.item.endzoffsetref) {
    const res = await zRefValidation(app, page, evt, "endzoffsetref");
    /* istanbul ignore else */
    if (!res) {
      showWOWarnings(page, dsName, "endzoffsetref", errorMessage);
      page.state.zRefDisable = true;
    }
    else {
      clearWarnings(page, dsName, "endzoffsetref");
      page.state.zRefDisable = false;
    }
  }
  else {
    clearWarnings(page, dsName, "endzoffsetref");
    page.state.zRefDisable = false;
  }
  saveDisable(page);
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Validate the start feature label.
* @param {any} app The app.
* @param {any} page The current page.
* @param {string} dsName The datasource name.
* @param {any} evt The event.
*/
const startFeatureLabelVal = async(app, page, dsName, evt) => {
  const errorMessage = app.getLocalizedLabel(
    `valid_featurelabel`,
    `Enter a valid reference feature on this asset`
  );
  /* istanbul ignore if */
  if (evt.item.startfeaturelabel) {
    const assetFeatureDs = app.findDatasource("assetFeatureData");
    const res = await featureLabelValidation(assetFeatureDs.items, evt, "startfeaturelabel");
    if (res === -1) {
      showWOWarnings(page, dsName, "startfeaturelabel", errorMessage);
      page.state.saveDisable = true;
    }
    else {
      clearWarnings(page, dsName, "startfeaturelabel");
      page.state.saveDisable = false;
      let assetFeatureDataDs = app.findDatasource("assetFeatureData");
      await chooseReferncePointData(page, dsName, assetFeatureDataDs?.items[res], "startfeaturelabel");
    }
  } else {
    clearWarnings(page, dsName, "startfeaturelabel");
    page.state.saveDisable = false;
  }
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Validate the end feature label.
* @param {any} app The app.
* @param {any} page The current page.
* @param {string} dsName The datasource name.
* @param {any} evt The event.
*/
const endFeatureLabelVal = async(app, page, dsName, evt) => {
  const errorMessage = app.getLocalizedLabel(
    `valid_featurelabel`,
    `Enter a valid reference feature on this asset`
  );
  /* istanbul ignore if */
  if (evt.item.endfeaturelabel) {
    const assetFeatureDs = app.findDatasource("assetFeatureData");
    const res = await featureLabelValidation(assetFeatureDs.items, evt, "endfeaturelabel");
    if (res === -1) {
      showWOWarnings(page, dsName, "endfeaturelabel", errorMessage);
      page.state.saveDisable = true;
    }
    else {
      clearWarnings(page, dsName, "endfeaturelabel");
      page.state.saveDisable = false;
      let assetFeatureDataDs = app.findDatasource("assetFeatureData");
      await chooseReferncePointData(page, dsName, assetFeatureDataDs?.items[res], "endfeaturelabel");
    }
  }
  else {
    clearWarnings(page, dsName, "endfeaturelabel");
    page.state.saveDisable = false;
  }
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Edit assets location.
* @param {any} page The current page.
* @param {any} item The selected item.
* @param {string} dsName The datasource name.
*/
const editAssetsLocation = async(page, item, dsName) => {
  page.state.isLocationAssetFocus = true;
  page.state.editAssetsLocation = true;
  clearWarnings(page, dsName, 'assetnum');
  clearWarnings(page, dsName, 'location');
  /* istanbul ignore else  */
  if (!item?.value) {
    page.state.assetLinear = false;
    clearlinearfield(page, dsName);
  }
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Clear linear field.
* @param {any} page The current page.
* @param {string} dsName The datasource name.
*/
const clearlinearfield = (page, dsName) => {
  const woDatasource = page.findDatasource(dsName);
  /* istanbul ignore else  */
  if(woDatasource?.item){
    woDatasource.item.startfeaturelabel = "";
    woDatasource.item.endfeaturelabel = "";
    woDatasource.item.startassetfeatureid = null;
    woDatasource.item.endassetfeatureid = null;
    woDatasource.item.startoffset = null;
    woDatasource.item.endoffset = null;
    woDatasource.item.startmeasure = null;
    woDatasource.item.endmeasure = null;
    woDatasource.item.startyoffset = null;
    woDatasource.item.endyoffset = null;
    woDatasource.item.startzoffset = null;
    woDatasource.item.endzoffset = null;
  }
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
* Choose asset item.
* @param {any} app The app.
* @param {any} page The current page.
* @param {string} dsName The datasource name.
* @param {any} item The selected item.
*/
const chooseAssetItem = (app, page, dsName, item, controller) => {
  const woDatasource = app.findDatasource(dsName);
  woDatasource.item.assetnum = item.assetnum;
  chooseAsset(app, page, dsName, item, controller);
}

// Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
/**
 * @param {Application} app Application instance
 * @param {Page} page Page instance
 * @param {string} dsName Name of the datasource to update
 */
const onUserConfirmationNo = (app, page, dsName) => {
  const woDatasource = app.findDatasource(dsName);
  const selectedItem = page.state.selectedItem;
  /* istanbul ignore else  */
  if (selectedItem.action === "SETASSET") {
    woDatasource.item.assetnum = selectedItem.item.assetnum;
  } else if (selectedItem.action === "SETLOCATION") {
    woDatasource.item.locationnum = selectedItem.item.location || selectedItem.item.locationnum;
  } else if (
    selectedItem.action === "SETLOCGL" ||
    selectedItem.action === "SETASSETGL"
  ) {
    woDatasource.item.locationnum = selectedItem.item.location;
    /* istanbul ignore else  */
    if(selectedItem.item.assetnum) {
      woDatasource.item.assetnum = selectedItem.item.assetnum
    }
    /* istanbul ignore else  */
    if (selectedItem.item.asset && selectedItem.item.asset.length === 1) {
      woDatasource.item.assetnum = selectedItem.item.asset[0].assetnum;
    }
  }
}

const functions = {
  getAssetOrLocation,
  validateGlAccount,
  validateLocation,
  validateAsset,
  setPriorityFailureCode,
  setAsset,
  setGLAccount,
  setLocation,
  openWorkLogTypeLookup,
  clearSearch,
  resetDataSource,
  openYRefernceLookup,
  openZRefernceLookup,
  openRefPointLookup,
  chooseYRefernceData,
  chooseReferncePointData,
  zRefValidation,
  yRefValidation,
  featureLabelValidation,
  offSetArr,
  startYRefCal,
  selectWorkType,
  uiRequired,
  showWOWarnings,
  clearWarnings,
  chooseLocation,
  openAssetLookup,
  chooseAsset,
  defaultLinearData,
  validateLinearAsset,
  startOffsetCal,
  endOffsetCal,
  startMeasureCal,
  endMeasureCal,
  startMeasureValidation,
  endMeasureValidation,
  measureCalculation,
  startZRefCal,
  endZRefCal,
  endYRefCal,
  startFeatureLabelVal,
  endFeatureLabelVal,
  editAssetsLocation,
  clearlinearfield,
  chooseAssetItem,
  onUserConfirmationNo,
  loadYRefData,
  saveDisable,
  onUserConfirmationClose,
  validateAssetLocation
};

export default functions;

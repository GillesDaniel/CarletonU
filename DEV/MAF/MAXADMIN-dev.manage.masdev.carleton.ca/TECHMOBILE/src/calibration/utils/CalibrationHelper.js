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

import DatasheetConstants from "../rules/constants/DatasheetConstants";

class CalibrationHelper {
  constructor(
    datasheetDS = null,
    calpointsDS = null,
    assetfunctionDS = null
  ) {
    //istanbul ignore next
    if (datasheetDS) {
      this.setDatasheetDS(datasheetDS);
    }

    //istanbul ignore next
    if (calpointsDS) {
      this.setCalpointsDS(calpointsDS);
    }
    //istanbul ignore next
    if (assetfunctionDS) {
      this.setAssetFunctionDS(assetfunctionDS);
    }
  }

  /**
   * Setter.
   * @returns undefined
   */
  //istanbul ignore next
  setCalpointsDS(calpointsDS) {
    this.calpointsDS = calpointsDS;
  }

  /**
   * Setter.
   * @returns undefined
   */
  //istanbul ignore next
  setDatasheetDS(datasheetDS) {
    this.datasheetDS = datasheetDS;
  }

  /**
   * Sets asset function (pluscwodsinstr) datasource as parent of
   * calibration points datasource. Calibration points and Asset
   * Function datasources are instatiated with getChildDatasource in
   * AssetFunctionsController and are being detached from its parent.
   * Therefore, we use this method to make sure they have a proper
   * parent that we have control of.
   *
   * @param {Datasource} assetfunctionDS
   * @returns void
   */
  //istanbul ignore next
  setAssetFunctionDS(assetfunctionDS) {
    const calpointsDS = this.getCalpointsDS();
    calpointsDS.parent = assetfunctionDS;
  }

  /**
   * Get reference to asset function datasource.
   * @returns {Datasource}
   */
  //istanbul ignore next
  getAssetFunctionDS() {
    const calpointsDS = this.getCalpointsDS();
    return calpointsDS.parent;
  }

  /**
   * Getter.
   * @returns {Datasource}
   */
  //istanbul ignore next
  getCalpointsDS() {
    return this.calpointsDS;
  }

  /**
   * Getter.
   * @returns {Datasource}
   */
  //istanbul ignore next
  getDatasheetDS() {
    return this.datasheetDS;
  }

  /**
   * updateCalpointsIntoAssetFunction
   *
   * @param {object} datasheet - The datasheet object to update
   * @param {object} assetfunction - The asset function object to update
   * @param {array} calpoints - The calculated points to update into the asset function
   * @returns {object} The updated datasheet object
   *
   * This function updates the calculated points into an asset function in a datasheet object. It returns the updated datasheet object.
   */
  async updateCalpointsIntoAssetFunction() {
    const calpointsDS = this.getCalpointsDS();
    const assetfunctionDS = this.getAssetFunctionDS();
    const datasheetDS = this.getDatasheetDS();

    // Update calibration points in asset function
    const assetfunction = assetfunctionDS.currentItem;

    //istanbul ignore next
    assetfunction.pluscwodspoint.forEach((point) => {
      const overridePoint = calpointsDS.items.find(
        (innerPoint) => innerPoint.pluscwodspointid === point.pluscwodspointid
      );

      // Updating original point using key to preserve ProxyObject integrity
      //istanbul ignore next
      for (let key in overridePoint) {
        point[key] = overridePoint[key];
      }
    });

    // Find asset function in datasheet by its id.
    // With the correct index we can easily to update the original
    // asset function
    //istanbul ignore next
    const index = datasheetDS.currentItem.pluscwodsinstr.findIndex(
      (item) => item.pluscwodsinstrid === assetfunction.pluscwodsinstrid
    );

    // Asset function was found in the datasource list
    // Proceed by updating asset function using keys to preserve
    // ProxyObject integrity
    //istanbul ignore next
    if (index >= 0) {  
      for (let key in assetfunction) {
        datasheetDS.currentItem.pluscwodsinstr[index][key] = assetfunction[key];
      }
    }
    return this.getDatasheetDS();
  }

  // Assisted by watsonx Code Assistant
  /**
   * Check the status of an asset function.
   * @param {Array} assetFunctions - An array of asset functions.
   * @param {string} condition - The condition to check.
   * @returns {string} The status of the asset function.
   */
  static checkMissingOrBrokenStatus(assetFunctions, condition) {
    let statusList = [];
    let status = null;
    for (let i = 0; i < assetFunctions.length; i++) {
      statusList.push(assetFunctions[i][`${condition}calstatus`]);
    }
    if (statusList.includes(DatasheetConstants.STATUS_MISSING)) {
      status = DatasheetConstants.STATUS_MISSING;
    } else if (statusList.includes(DatasheetConstants.STATUS_BROKEN)) {
      status = DatasheetConstants.STATUS_BROKEN;
    }
    return status;
  }
}

export default CalibrationHelper;

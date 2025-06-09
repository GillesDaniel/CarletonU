/*
 * Licensed Materials - Property of IBM
 * 5737-M66, 5900-AAA
 * (C) Copyright IBM Corp. 2020, 2021 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */


/**
 * An 'AssetResourceController' is a 'Base ResourceController' that contains the commons methods related with 'Asset' record.
 */
class OSCacheDataController {
    onDatasourceInitialized(ds, owner, app) {
      this.datasource = ds;
      this.owner = owner;
      this.app = app;
    }

    async onAfterLoadData(dataSource, items) {
      await this.processOsCacheData(items[0], 'osDetailOrphansJsonDs', 'osDetailOrphans', 'objectName');
      await this.processOsCacheData(items[0], 'osDetailsNoHeaderJsonDs', 'osDetailsNoHeader');
      await this.processOsCacheData(items[0], 'osHeaderNoDetailsJsonDs', 'osHeaderNoDetails');
      await this.processOsCacheData(items[0], 'osNoPrimaryObjectJsonDs', 'osNoPrimaryObject');
      await this.processOsCacheData(items[0], 'osColsOrphansJsonDs', 'osColsOrphans');
      await this.processOsCacheData(items[0], 'osColsNoDetailsJsonDs', 'osColsNoDetails');
      await this.processOsCacheData(items[0], 'osEntServiceNoIntJsonDs', 'osEntServiceNoInt');
      await this.processOsCacheData(items[0], 'osExtSystemNoEntServiceJsonDs', 'osExtSystemNoEntService');
      await this.processOsCacheData(items[0], 'osPubChannelNoIntJsonDs', 'osPubChannelNoInt');
      await this.processOsCacheData(items[0], 'osExtSystemNoPubChannelJsonDs', 'osExtSystemNoPubChannel');
    }

    async processOsCacheData(parentItem, dsName, attrName, orderByName) {
      let childItems = parentItem[attrName].member;
      let ds = this.app.findDatasource(dsName);
      // if(childItems && ds) {
        ds.clearState();
        ds.resetState();
        ds.lastQuery = {};
        ds.dataAdapter.src = {member: childItems};
        ds.dataAdapter.jsonResponse = {member: childItems};
        let loadObj = {src: childItems};
        if (orderByName) {
          loadObj.orderBy = orderByName;
        }
        await ds.load(loadObj);
      // }
    }
  }
  
  export default OSCacheDataController;
  

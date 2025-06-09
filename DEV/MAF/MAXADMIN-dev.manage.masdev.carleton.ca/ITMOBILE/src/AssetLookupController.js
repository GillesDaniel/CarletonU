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

import { log } from "@maximo/maximo-js-api";
const TAG = "AssetLookupController";

const ASSETLOOKUPDS = "assetLookupDS";
const SPLITDS = "invsplitjsonDS";

class AssetLookupController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  onAfterLoadData(dataSource, items) {
    log.d(TAG, "asset ds loaded");
    const assetLookupDS = this.app.findDatasource(ASSETLOOKUPDS);
    const invsplitjsonDS = this.app.findDatasource(SPLITDS);
    // disable selection from split data
    invsplitjsonDS.getItems().forEach((splitItem) => {
      const assetItem = items.find(
        (item) => item.assetnum === splitItem.rotassetnum
      );
      // istanbul ignore else
      if (assetItem) {
        assetItem._disabled = false;
        assetLookupDS.setDisabled(assetItem);
      }
    });
  }
}
export default AssetLookupController;

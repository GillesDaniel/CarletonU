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

class InventoryItemDataController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  computedRotating(item) {
    return item.item.rotating
      ? this.app.getLocalizedLabel("yes", "Yes")
      : this.app.getLocalizedLabel("no", "No");
  }
}
export default InventoryItemDataController;

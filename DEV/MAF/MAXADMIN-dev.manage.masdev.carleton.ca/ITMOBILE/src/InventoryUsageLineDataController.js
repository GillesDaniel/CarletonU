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

class InventoryUsageLineDataController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  computedRotating(item) {
    let rotating = "";
    //istanbul ignore else
    if (item) {
      if (item.item && item.item.rotating !== undefined) {
        rotating = item.item.rotating;
      } else if (item.item && item.item[0] && item.item[0].rotating) {
        rotating = item.item[0].rotating;
      }
    }
    return rotating
      ? this.app.getLocalizedLabel("yes", "Yes")
      : this.app.getLocalizedLabel("no", "No");

    //const rotating = item.item.rotating||item.item[0].rotating;
    // return rotating
    //   ? this.app.getLocalizedLabel("yes", "Yes")
    //   : this.app.getLocalizedLabel("no", "No");
  }

  computedItemType(item) {
    return item.itemtype || item.linetype;
  }

  computedIssueUnit(item) {
    return (
      item.issueunit || (item.inventory ? item.inventory[0]?.issueunit : "")
    );
  }

  computedAvblbalance(item) {
    return (
      item.avblbalance || (item.inventory ? item.inventory[0]?.avblbalance : "")
    );
  }

  computedResType(item) {
    return item.restype || (item.invreserve ? item.invreserve[0]?.restype : "");
  }

  computedReservedQty(item) {
    return (
      item.reservedqty ||
      (item.invreserve ? item.invreserve[0]?.reservedqty : "")
    );
  }

  computedDueDate(item) {
    const duedate =
      item.requireddate ||
      (item.invreserve ? item.invreserve[0]?.requireddate : "");
    if (duedate) {
      return this.app?.dataFormatter
        ?.convertISOtoDate(duedate)
        .toLocaleDateString();
    } else {
      return "";
    }
  }
}
export default InventoryUsageLineDataController;

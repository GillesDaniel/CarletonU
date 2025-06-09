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
import "regenerator-runtime/runtime";
import CommonUtil from "./utils/CommonUtil";

const INVUSESTATUS_SYNONYM_DOMAINID = "INVUSESTATUS";
const INVUSETYPE_SYNONYM_DOMAINID = "INVUSETYPE";

class InventoryUsageDataController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  onAfterLoadData(dataSource, items) {
    // update the computedStatusLabel after load, the computed function not automatically called in mobile data-list
    items.forEach((item) => {
      item.computedStatusLabel = this.computedStatusLabel(item);
    });
  }

  onAfterSaveData({ datasource, items, hasNewItems }) {
    let allReservedItems = this.app.allreserveditems;
    items &&
      items.forEach((invuseitem) => {
        for (let i = 0; i < invuseitem.invuseline?.length || 0; i++) {
          let invReservesRelated = allReservedItems.filter(
            (item) =>
              item.requestnum === invuseitem.invuseline[i].requestnum &&
              (item.siteid === invuseitem.invuseline[i].siteid ||
                item.siteid === invuseitem.siteid)
          );
          //istanbul ignore else
          if (invReservesRelated.length > 0) {
            let invReserveRec = invReservesRelated[0];
            const totalQtyUsed = CommonUtil.getTotalQtyUsed(
              invReserveRec,
              this.app,
              invuseitem.invuseline[i]?.quantity
            );
            invReserveRec.calqty = invReserveRec.reservedqty - totalQtyUsed;
          }
        }
      });
  }

  computedStatusLabel(item) {
    // NOTICE: item.usetype and item.status is value, not maxvalue
    let usetype_description = "";
    //istanbul ignore else
    if (this.app.state.synonymDomainCache[INVUSETYPE_SYNONYM_DOMAINID]) {
      const usetypeItem = this.app.state.synonymDomainCache[
        INVUSETYPE_SYNONYM_DOMAINID
      ].find((i) => i.value === item.usetype);
      //istanbul ignore else
      if (usetypeItem) {
        usetype_description = usetypeItem.description;
      }
    }
    let status_description = "";
    //istanbul ignore else
    if (this.app.state.synonymDomainCache[INVUSESTATUS_SYNONYM_DOMAINID]) {
      const statusItem = this.app.state.synonymDomainCache[
        INVUSESTATUS_SYNONYM_DOMAINID
      ].find((i) => i.value === item.status);
      //istanbul ignore else
      if (statusItem) {
        status_description = statusItem.description;
      }
    }
    return [
      {
        label: usetype_description || item.usetype || "",
        type: "cool-gray",
      },
      {
        label: status_description || item.status || "",
        type: "dark-gray",
      },
    ];
  }

  computedDueDate(item) {
    let dueDate = "";
    //istanbul ignore else
    if (item.invuseline && item.invuseline.length) {
      item.invuseline.forEach((line) => {
        //istanbul ignore else
        if (line.invreserve && line.invreserve.length) {
          line.invreserve.forEach((reserve) => {
            //istanbul ignore else
            if (reserve.requireddate) {
              //istanbul ignore else
              if (!dueDate || reserve.requireddate < dueDate) {
                dueDate = reserve.requireddate;
              }
            }
          });
        }
      });
      dueDate = dueDate
        ? this.app.dataFormatter.convertISOtoDate(dueDate).toLocaleDateString()
        : this.app.getLocalizedLabel("notAvailable", "N/A");
    }
    return this.app.getLocalizedLabel("dueDate", "Required date {0}", [
      dueDate,
    ]);
  }

  computedFromStoreroom(item) {
    return this.app.getLocalizedLabel("fromStoreroom", "From storeroom {0}", [
      item.fromstoreloc,
    ]);
  }

  computedInvuselineCounts(item) {
    return this.app.getLocalizedLabel("invuselineCounts", "{0} usage lines", [
      item.invuselinecount ? item.invuselinecount : 0,
    ]);
  }

  computedAssetBin(item) {
    return this.app.getLocalizedLabel("AssetBin", "From bin: {0}", [
      item.binnum || "-",
    ]);
  }

  computedSplitBin(item) {
    return this.app.getLocalizedLabel("splitBin", "From bin: {0}", [
      item.frombin || "-",
    ]);
  }

  computedSplitQuantity(item) {
    return this.app.getLocalizedLabel("splitQuantity", "Quantity: {0}", [
      item.quantity || 0,
    ]);
  }

  computedShipmentsiteId(item) {
    //istanbul ignore else
    if (item.invuseline?.length) {
      return item.invuseline[0].tositeid;
    }
    return "";
  }
}
export default InventoryUsageDataController;

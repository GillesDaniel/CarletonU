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

let SHIPRETURN = "";
let TRANSFER = "";
let VOIDSHIPRECEIPT = "";

class ShipmentReceiptDataController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  /**
   * Compute the 'computedActualDate' attribute
   */
  _computeActualDate(item) {
    if (item.actualdate) {
      return this.app?.dataFormatter
        ?.convertISOtoDate(item.actualdate)
        .toLocaleString();
    } else {
      return "";
    }
  }

  /**
   * Compute the 'receiptquantity_cal' attribute
   */
  _computeReceiptQuantity(item) {
    TRANSFER = this.app.state.issuetypetransfer;
    SHIPRETURN = this.app.state.issuetypeshipreturn;
    VOIDSHIPRECEIPT = this.app.state.issuetypeshipvoid;
    //istanbul ignore else
    if (!isNaN(item.quantity) && !isNaN(item.conversion)) {
      //istanbul ignore else
      if (item.conversion === 0) {
        item.conversion = 1;
      }
      let qty = item.quantity / item.conversion;
      //istanbul ignore else
      if (item.issuetype === SHIPRETURN || item.issuetype === VOIDSHIPRECEIPT) {
        qty = -1 * qty;
      }
      return qty;
    } else {
      return "";
    }
  }

  /**
   * Compute the 'acceptedqty' attribute
   */
  _computeAcceptedQty(item) {
    //istanbul ignore else
    if (
      !isNaN(item.quantity) &&
      !isNaN(item.conversion) &&
      !isNaN(item.rejectqty)
    ) {
      //istanbul ignore else
      if (item.conversion === 0) {
        item.conversion = 1;
      }
      return item.quantity / item.conversion - item.rejectqty;
    } else {
      return "";
    }
  }

  /**
   * Compute the 'computedStyle' attribute for multiline datalist.
   *
   * @param {items} item
   */
  _computeStyle(item) {
    TRANSFER = this.app.state.issuetypetransfer;
    SHIPRETURN = this.app.state.issuetypeshipreturn;
    VOIDSHIPRECEIPT = this.app.state.issuetypeshipvoid;
    let computedStyle = item.status_maxvalue;
    //istanbul ignore else
    if (
      item.issuetype === TRANSFER ||
      item.issuetype === SHIPRETURN ||
      item.issuetype === VOIDSHIPRECEIPT
    ) {
      computedStyle = item.issuetype_maxvalue;
    }

    return computedStyle;
  }

  /**
   * Compute the 'status4Badge' and 'statusJSON4Badge' attribute for multiline datalist.
   *
   * @param {items} item
   */
  _computeBadgeTags(item) {
    let computedStyle = item.status;
    let status4Badge = item.status;
    TRANSFER = this.app.state.issuetypetransfer;
    SHIPRETURN = this.app.state.issuetypeshipreturn;
    VOIDSHIPRECEIPT = this.app.state.issuetypeshipvoid;
    //istanbul ignore else
    if (
      item.issuetype === TRANSFER ||
      item.issuetype === SHIPRETURN ||
      item.issuetype === VOIDSHIPRECEIPT
    ) {
      computedStyle = item.issuetype_maxvalue;
      //istanbul ignore next
      status4Badge =
        item.issuetype === SHIPRETURN
          ? "RETURN"
          : item.issuetype === VOIDSHIPRECEIPT
          ? "VOID"
          : "TRANSFER";
    }
    let statusStr = {
      label: status4Badge,
      type:
        computedStyle === "WINSP" || computedStyle === "WASSET"
          ? "gray"
          : "dark-gray",
    };
    return [statusStr];
  }
}
export default ShipmentReceiptDataController;

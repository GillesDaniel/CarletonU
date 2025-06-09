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
import CommonUtil from "./utils/CommonUtil";

const INVUSESTATUS_MAXVALUE_ENTERED = "ENTERED";
const INVUSESTATUS_MAXVALUE_STAGED = "STAGED";
const INVUSESTATUSDS = "invUseStatusDS";
const USETYPE_MAXVALUE_MIXED = "MIXED";
const USETYPE_MAXVALUE_TRANSFER = "TRANSFER";
const DETAILS_NOT_ALLOWED =
  "You cannot open inventory usage records that include returns, reservations that require transfer or are of MIXED type in the Issues and Transfers mobile app. Use the Inventory Usage application to make changes.";

class InventoryUsageListPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  pageResumed() {
    this.app.state.isFromReservedItemsPage = false;
    this.invUseStatusDS = this.app.findDatasource(INVUSESTATUSDS);
    this.invUsageDS = this.app.findDatasource(
      this.app.state.selectedInvUseDSName
    );
    this.setupPage();
  }

  async setupPage() {
    this.page.updatePageLoadingState(true);
    this.invUsageDS.clearChanges();
    this.invUsageDS.clearState();
    if (this.app.state.isBackFromInvUsePage) {
      await this.invUsageDS.load({
        noCache: false,
        itemUrl: null,
      });
    } else {
      await this.invUsageDS.load({
        noCache: true,
        itemUrl: null,
      });
    }
    // istanbul ignore else
    if (this.app.device.isMaximoMobile) {
      const validStatusValues = [];
      this.invUseStatusDS.getItems().forEach((item) => {
        //istanbul ignore else
        if (
          item.maxvalue === INVUSESTATUS_MAXVALUE_ENTERED ||
          item.maxvalue === INVUSESTATUS_MAXVALUE_STAGED
        ) {
          validStatusValues.push(item.value);
        }
      });

      await this.invUsageDS.initializeQbe();
      this.invUsageDS.setQBE("status", "in", validStatusValues);
      await this.invUsageDS.searchQBE();
    }

    //this.app.state.invUseDSTotalCount = this.invUsageDS.dataAdapter.totalCount;

    //istanbul ignore else
    if (!this.app.state.reservationLoaded) {
      this.app.allinvuses = await this.getAllInvUseLines(
        this.invUsageDS,
        this.invUsageDS.dataAdapter.totalCount
      );
    }
    this.app.state.isBackFromInvUsePage = false;
    this.page.updatePageLoadingState(false);
  }

  /**
   * Gets all items even exceeding the page size.
   *
   */
  async getAllInvUseLines(datasource, totalCount, forceSync) {
    let allitems = [];
    for (let i = 0; i < totalCount; i++) {
      // istanbul ignore next
      if (!datasource.isItemLoaded(i)) {
        await datasource.load({
          start: i,
          forceSync: forceSync,
        });
      }

      //istanbul ignore next
      if (datasource.get(i)?.invuseline) {
        for (let j = 0; j < datasource.get(i).invuseline.length; j++) {
          let invUseLineCoppied = CommonUtil.getCopiedInvUseLine(
            datasource.get(i).invuseline[j],
            datasource.get(i)
          );
          allitems.push(invUseLineCoppied);
        }
      }
    }
    return allitems;
  }

  async forceUpdateDatasource() {
    this.page.updatePageLoadingState(true);
    if (this.app.device.isMaximoMobile) {
      this.invUsageDS.clearChanges();
      await this.invUsageDS.load({
        noCache: true,
        forceSync: true,
        itemUrl: null,
      });
    } else {
      await this.invUsageDS.forceReload();
    }

    //this.app.state.invUseDSTotalCount = this.invUsageDS.dataAdapter.totalCount;
    this.app.allinvuses = await this.getAllInvUseLines(
      this.invUsageDS,
      this.invUsageDS.dataAdapter.totalCount,
      this.app.device.isMaximoMobile
    );
    // load again to display
    await this.invUsageDS.load({
      itemUrl: null,
    });
    this.page.updatePageLoadingState(false);
  }

  /**
   * This function is used to navigate to the details page of an inventory usage record.
   * It checks if the inventory usage record is allowed to be viewed in the Issues and Transfers
   *  mobile app and displays an error message if it is not. If the inventory usage record is allowed, it sets the current page to the invUsage page and passes the necessary parameters to the page.
   * @param {*} item
   * @returns
   */

  async checkInventoryUsage(item) {
    const invUsageDS = this.app.findDatasource("invUseDS4Validation");
    await invUsageDS.load({ noCache: true, itemUrl: item.href });
    const invUsageItem = invUsageDS.item;
    let isReturn, isReservation;
    if (invUsageItem.invuseline?.length) {
      isReturn = invUsageItem.invuseline?.find(
        (line) => line.usetype_maxvalue === "RETURN"
      );
      isReservation = invUsageItem.invuseline?.find(
        (line) =>
          line.requestnum !== undefined &&
          invUsageItem.usetype_maxvalue === USETYPE_MAXVALUE_TRANSFER
      );
    }
    return (
      invUsageItem.usetype_maxvalue === USETYPE_MAXVALUE_MIXED ||
      isReturn !== undefined ||
      isReservation !== undefined
    );
  }

  async gotoDetails(item) {
    let isNotAllowed = await this.checkInventoryUsage(item);

    if (isNotAllowed) {
      let message = this.app.getLocalizedLabel(
        "detailsNotAllowed",
        DETAILS_NOT_ALLOWED
      );
      this.app.toast(message, "error", "", 5, false, false);
    } else {
      this.app.setCurrentPage({
        name: "invUsage",
        params: {
          title: item.invusenum,
          description: item.description,
          itemUrl: item.href,
          addingmoreitems: false,
          usetype: item.usetype_maxvalue,
        },
      });
    }
  }

  goback() {
    //this.app.navigateBack();
    this.app.setCurrentPage({
      name: "main",
      resetScroll: true,
    });
  }
}

export default InventoryUsageListPageController;

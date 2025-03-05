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

const RESERVATIONSLISTDS = "reservationsListDS";
const invUsagePage = "invUsage";
const RESERVED = "reserved";
class ReservationsListPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    this.invUseDS = this.app.findDatasource(
      this.app.state.selectedInvUseDSName
    );
    this.reservationsListDS = this.app.findDatasource(RESERVATIONSLISTDS);
    this.reservationsListDS.on("changed", (ds) => {
      const currentZeroQty = ds.currentZeroQty || 0;
      // istanbul ignore else
      if (ds.savedTotalCount) {
        ds.state.totalCount = ds.savedTotalCount - currentZeroQty;
      }
    });
  }

  pageResumed(page, app) {
    this.app = app;
    this.page = page;

    this.page.state.usageItemUrl = this.page.params.itemUrl || null;
    this.page.state.computedPageTitle = this.app.getLocalizedLabel(
      "addReservedItems",
      "Add reservations"
    );
    this.page.state.computedActionButton = this.app.getLocalizedLabel(
      "add",
      "Add"
    );

    // reset selection and restore from this.page.params.reservedItemsInvUsage
    this.reservationsListDS.clearSelections();
    this.reservationsListDS.clearState();
    // istanbul ignore next
    this.reservationsListDS.options.canLoad = () => {
      return false;
    };
    this.page.state.reservedItemsInvUsage = [];
    if (
      this.app.state.reservationLoaded &&
      this.page.params.reservedItemsInvUsage
    ) {
      this.page.state.reservedItemsInvUsage =
        this.page.params.reservedItemsInvUsage;
    }
    this.page.state.totalSelected = 0;
    this.loadDatasource(false);
  }

  onAfterLoadData(dataSource, items) {
    // with loaded selected reserved items, disabled them
    // istanbul ignore else
    if (dataSource.name === RESERVATIONSLISTDS) {
      let reservedItemsInvUsage = this.page.state.reservedItemsInvUsage;
      items.forEach((item) => {
        item._disabled = false;
        // istanbul ignore else
        if (
          reservedItemsInvUsage.find(
            (itemInvUsage) => itemInvUsage.requestnum === item.requestnum
          )
        ) {
          dataSource.setSelectedItem(item, true);
          dataSource.setDisabled(item);
        }
      });
    }
  }

  async forceUpdateDatasource() {
    this.invUseDS.clearChanges();
    this.loadDatasource(true);
  }

  async loadDatasource(needForceSync) {
    this.page.updatePageLoadingState(true);
    this.reservationsListDS.options.canLoad = true;
    // load to display
    await this.reservationsListDS.forceReload();
    this.page.updatePageLoadingState(false);
  }

  /**
   * Handler for selected items from reservations list to Inventory Usage
   * @returns null
   */
  selectToProcess() {
    const reserveItems = this.app.findDatasource(RESERVATIONSLISTDS);
    const selectedItems = reserveItems?.getSelectedItems();

    //istanbul ignore else
    if (selectedItems?.length) {
      this.openInventoryUsage(selectedItems);
    }
  }

  openInventoryUsage(items) {
    this.app.setCurrentPage({
      name: invUsagePage,
      resetScroll: true,
      params: {
        items: items,
        entryType: RESERVED,
        itemUrl: this.page.state.usageItemUrl,
        addingmoreitems: true,
        title: this.page.params.title,
        description: this.page.params.description,
      },
    });
  }

  goBack() {
    const reserveItems = this.app.findDatasource(RESERVATIONSLISTDS);
    const selectedItems = reserveItems?.getSelectedItems();
    this.app.setCurrentPage({
      name: invUsagePage,
      resetScroll: true,
      params: {
        items: selectedItems,
        entryType: RESERVED,
        itemUrl: this.page.state.usageItemUrl,
        addingmoreitems: true,
        description: this.page.params.description,
      },
    });
  }

  updateSelectedItems() {
    const reserveItems = this.app.findDatasource(RESERVATIONSLISTDS);
    this.page.state.totalSelected = reserveItems?.getSelectedItems()?.length;
  }
}

export default ReservationsListPageController;

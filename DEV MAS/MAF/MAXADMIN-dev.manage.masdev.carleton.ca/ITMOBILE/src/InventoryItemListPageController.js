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

const INVITEMLISTDS = "invitemListDS";
const invUsagePage = "invUsage";
const INVENTORY = "inventory";

class InventoryItemListPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    this.invitemListDS = this.app.findDatasource(INVITEMLISTDS);
  }

  pageResumed(page, app) {
    this.app = app;
    this.page = page;

    this.app.state.siteid = this.page.params.siteid;
    this.app.state.storeroom = this.page.params.storeroom;

    this.page.state.usageItemUrl = this.page.params.itemUrl || null;

    // reset selection and restore from this.page.params.inventoryItemsInvUsage
    this.invitemListDS.clearSelections();
    this.invitemListDS.clearState();
    this.page.state.inventoryItemsInvUsage =
      this.page.params.inventoryItemsInvUsage || [];

    this.page.state.totalSelected = 0;
    this.loadDatasource(false);
  }

  onAfterLoadData(dataSource, items) {
    // istanbul ignore else
    if (dataSource.name === INVITEMLISTDS) {
      //remove this due to allow same inventory item be added multiple times
      //let inventoryItemsInvUsage = this.page.state.inventoryItemsInvUsage;
      dataSource.getItems().forEach((item) => {
        item._disabled = false;
        //remove this due to allow same inventory item be added multiple times
        // istanbul ignore else
        // if (
        //   inventoryItemsInvUsage.find(
        //     (itemInvUsage) =>
        //       itemInvUsage.itemnum === item.itemnum &&
        //       itemInvUsage.linetype_maxvalue === ITEM &&
        //       itemInvUsage.requestnum === undefined
        //   )
        // ) {
        //dataSource.setSelectedItem(item, true);
        //dataSource.setDisabled(item);
        // }
      });
    }
  }

  async forceUpdateDatasource() {
    this.loadDatasource(true);
  }

  async loadDatasource(needForceSync) {
    this.page.updatePageLoadingState(true);

    // Needs to forcesync when force refresh.
    await this.invitemListDS.load({
      noCache: true,
      forceSync: needForceSync,
      itemUrl: null,
    });

    await this.invitemListDS.initializeQbe();
    this.invitemListDS.setQBE("location", "=", this.app.state.storeroom);
    this.invitemListDS.setQBE("siteid", "=", this.app.state.siteid);
    await this.invitemListDS.searchQBE();

    this.page.updatePageLoadingState(false);
  }

  /**
   * Handler for selected items from inventory item list to Inventory Usage
   * @returns null
   */
  selectToProcess() {
    const selectedItems = this.invitemListDS?.getSelectedItems();

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
        entryType: INVENTORY,
        itemUrl: this.page.state.usageItemUrl,
        addingmoreitems: true,
        title: this.page.params.title,
        description: this.page.params.description,
      },
    });
  }

  goBack() {
    const selectedItems = this.invitemListDS?.getSelectedItems();
    this.app.setCurrentPage({
      name: invUsagePage,
      resetScroll: true,
      params: {
        items: selectedItems,
        entryType: INVENTORY,
        itemUrl: this.page.state.usageItemUrl,
        addingmoreitems: true,
        description: this.page.params.description,
      },
    });
  }

  updateSelectedItems() {
    this.page.state.totalSelected =
      this.invitemListDS?.getSelectedItems()?.length;
  }
}

export default InventoryItemListPageController;

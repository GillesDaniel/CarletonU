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

import SynonymUtil from './utils/SynonymUtil';
import CommonUtil from "./utils/CommonUtil";
import { Device, ShellCommunicator, log } from '@maximo/maximo-js-api';
const TAG = 'ReserveMaterialsPageController';

class ReserveMaterialsPageController {
  /**
   * Function to set flag for 'put-data-failed' event
   */

  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    ShellCommunicator.get().on("TRANSACTION_UNDONE", this.handleDeleteTransaction.bind(this));
  }

  /**
   * Handle Delete transaction
   */
  async handleDeleteTransaction(event) {
    if (event?.app === this.app.name &&
      (this.app.currentPage.name === this.page.name || this.app.lastPage.name === this.page.name)
    ) {
      await this.page.findDatasource('woReservedMaterialds')?.forceReload();
      this.page.state.reservedItemAdded = false;
    }
  }

  constructor() {
    this.onSaveDataFailed = this.onSaveDataFailed.bind(this);
    this.saveDataSuccessful = true;
  }

  onSaveDataFailed() {
    this.saveDataSuccessful = false;
  }

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-8b-code-instruct
  /**
   * Validates Non Rotating item value
   * @param {object} event - The event object containing information about on change event on Number Input.
   * @returns {void}
   */
  validateNonRotatingItem(event) {
    this.page.state.hasErrors = event.imaginaryTarget.isInvalid;
  }

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-8b-code-instruct
  /**
    * Handles request to navigate away from the Reserve Page.
    * Prompts user to save or discard changes if necessary.
  */
  handlePageExit() {
    if (!this.page.state.disableReservedMaterialAction || this.getReservedRotatingAssetData().length > 0) {
      this.page.state.dialogBMXMessage = this.app.getLocalizedLabel(
        'messages_save_changes',
        'To leave this page, you must first discard or save your changes.'
      );
      this.page.showDialog('saveDiscardDialog_reservePage');
    }
    else {
      this.goBackToReportPage();
    }
  }

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-8b-code-instruct
  /**
    * Goes back to the report page.
    * @returns {void}
  */
  goBackToReportPage() {
    this.page.state.selectedReservedItems = [];
    this.app.findDatasource('woReservedMaterialRotating')?.clearSelections();
    this.app.findDatasource('woReservedMaterialNonRotating')?.clearSelections();
    this.app.findDatasource("reservedItemRotatingAssetJsonDS")?.clearSelections();
    this.app.navigateBack();
  }

  pageResumed() {
    this.page.state.multipleStore = false;
    this.app.state.openedFrom = '';
    this.loadPageResumed();
  }

  // Assisted by WCA@IBM
  /**
  * @function dataListUpdate
  * @description This function is used to update the Rotating and Non-Rotating Json datasources.
  */
  async dataListUpdate() {
    const reserveDs = await this.page.findDatasource('woReservedMaterialds');
    const woReservedMaterialRotating = this.page.findDatasource('woReservedMaterialRotating');
    const woReservedMaterialNonRotating = this.page.findDatasource('woReservedMaterialNonRotating');

    const updatingJsonDS = reserveDs?.items?.some(item => item.isrotating ? woReservedMaterialRotating?.items.length === 0
      : woReservedMaterialNonRotating?.items.length === 0)

    //istanbul ignore next
    if ((updatingJsonDS && !this.page.state.reservedItemAdded) || CommonUtil.sharedData.navigatedFromWOPage) {
      CommonUtil.sharedData.navigatedFromWOPage = false;
      let nonRotatingItems = [], rotatingItems = [];
      if (reserveDs?.items.length) {
        reserveDs.items.forEach(item => item.isrotating ? rotatingItems.push(item) : nonRotatingItems.push(item));
      }
      await Promise.all([
        woReservedMaterialRotating?.load({ src: rotatingItems, noCache: true }),
        woReservedMaterialNonRotating?.load({ src: nonRotatingItems, noCache: true })
      ]);
    }
    if (this.page.state.itemwithZeroQty) {
      const updatedRotatingitems = woReservedMaterialRotating?.items.filter(item => item.reservedqty !== 0);
      await woReservedMaterialRotating?.load({ src: updatedRotatingitems, noCache: true });
      this.page.state.itemwithZeroQty = false;
    }
  }

  /**
   * extended method from the pageResume
   */
  async loadPageResumed() {
    this.app.state.pageLoading = true;
    this.page.state.loading = true;
    const isMobile = Device.get().isMaximoMobile;
    this.page.state.disableReservedMaterialAction = true;
    this.page.state.loadingReserverMaterials = false;
    this.app.findDatasource("woReservedMaterialRotating")?.clearSelections();
    this.app.findDatasource("woReservedMaterialNonRotating")?.clearSelections();
    const woReservedMaterialds = this.app.findDatasource('woReservedMaterialds');
    const loadParams = {
      noCache: true,
      itemUrl: this.page.params.href
    }
    const woMaterialDetailResource = this.app.findDatasource('woMaterialResource');
    if (woMaterialDetailResource) {
      await woMaterialDetailResource.load(loadParams);
    }
    await woReservedMaterialds?.forceReload();
    await this.dataListUpdate();
    // istanbul ignore if
    if (woReservedMaterialds) {
      await woReservedMaterialds.initializeQbe();
      await woReservedMaterialds.searchQBE(undefined, true);

      let actualMatDs = this.app.findDatasource('reservedActualMaterialDs');
      const jreserveds = this.page.findDatasource('woReservedMaterialNonRotating');
      this.page.hasAnyReservedItemAdded = false;

      //Removed the added reserved items from the list in device only.
      if (isMobile) {
        await actualMatDs.load();
        let allActualItems = [];

        for (let i = 0; i < actualMatDs.dataAdapter.totalCount; i++) {
          if (!actualMatDs.isItemLoaded(i)) {
            await actualMatDs.load({ start: i });
          }

          allActualItems.push(actualMatDs.get(i));
        }

        let tempitems = [];
        let tempMatcheditems = [];

        for (let i = 0; i < woReservedMaterialds.items.length; i++) {
          this.page.matched = false;
          allActualItems.forEach((item) => {
            if (
              item?.invreserveid &&
              item?.invreserveid ===
              woReservedMaterialds.items[i].invreserveid &&
              item?.isrotating !== woReservedMaterialds.items[i].isrotating
            ) {
              this.page.matched = true;
              tempMatcheditems.push(woReservedMaterialds.items[i]);
            }
          });

          if (!this.page.matched) {
            this.page.hasAnyReservedItemAdded = true;
            let isExists = tempitems.some(
              (item) =>
                item.invreserveid === woReservedMaterialds.items[i].invreserveid
            );
            if (!isExists && !woReservedMaterialds.items[i].isrotating) {
              tempitems.push(woReservedMaterialds.items[i]);
            }
          }
        }

        this._resetDataSource(jreserveds);
        if (this.page.hasAnyReservedItemAdded) {
          await jreserveds.load({ src: tempitems, noCache: true });
        } else if (
          tempMatcheditems.length > 0 &&
          tempMatcheditems.length === woReservedMaterialds.items.length
        ) {
          await jreserveds.load({ src: [], noCache: true }); //When all items added show no records
        } else {
          await woReservedMaterialds.load({ noCache: true });
        }
      } else {
        this._resetDataSource(jreserveds);
        await woReservedMaterialds.load({ noCache: true });
        const updatedRotatingitems = woReservedMaterialds.items.filter(item => !item.isrotating);
        await jreserveds?.load({ src: updatedRotatingitems, noCache: true });
      }

      this.page.state.reserveItemCount = woReservedMaterialds.items.length;
      this.page.state.showRotatingAssetList = false;
    }
    this.page.state.loading = false;
    this.app.state.pageLoading = false;
  }

  /**
   * Reset DS and set src to load.
   */
  _resetDataSource(ds) {
    ds?.clearState();
    ds?.resetState();
  }

  /*
   * Get the selected items
   */
  async getSelectedItems() {
    const woReservedMaterialRotating = this.app.findDatasource('woReservedMaterialRotating');
    const woReservedMaterialNonRotating = this.app.findDatasource('woReservedMaterialNonRotating');
    const selectedRotating = woReservedMaterialRotating?.getSelectedItems();
    const selectedNonRotating = woReservedMaterialNonRotating?.getSelectedItems();

    const selectedItems = selectedRotating?.length ? selectedRotating : selectedNonRotating;
    this.page.state.selectedReservedItems = selectedItems;

    if (selectedItems?.length > 0) {
      this.page.state.disableReservedMaterialAction = false;
    } else {
      this.page.state.disableReservedMaterialAction = true;
    }
  }

  /**
   * Get Rotating Asset lookup value for rotating material
   */
  async updateReservedItems(rotatingItem, selectedAssetRotating) {
    const initialLength = this.page.state.items.length;
    const newAssets = selectedAssetRotating.slice(initialLength);
    newAssets.forEach((rotAsset) => {
      const rotItem = { ...rotatingItem[0] };
      rotItem.rotassetnum = rotAsset.assetnum;
      this.page.state.items.push(rotItem);
    });
    return newAssets;
  }

  /**
   * List out rotating assets for selected item & selections of assets
   */
  async selectionRotatingAssets() {
    this.page.state.rotatingItemWithAsset ??= [];
    let rotatingItem = this.page.state.rotatingItemWithNoAsset;
    const selectedAssetRotating = this.getReservedRotatingAssetData();
    await this.updateReservedItems(rotatingItem, selectedAssetRotating);

    /**
      * Updates the selected rotating item with the appropriate rotating asset.
      * If a rotating asset is selected from the list, the first condition is executed;
      * It will fetche the required rotating assets for the selected rotating item for initial execution as no rotating asset is selected.
    */
    if (rotatingItem[0] && selectedAssetRotating.length > 0) {
      //istanbul ignore if
      if (this.page.state.sendSelectedAssets) {
        rotatingItem.shift();
        if (rotatingItem.length === 0) {
          this.sendReservedItems();
          this.app.findDatasource("reservedItemRotatingAssetJsonDS")?.clearSelections();
        }
      }
    } else {
      const reservedRotatingAssetDS = this.app.findDatasource('reservedItemRotatingAssetDS');
      const reservedRotatingAssetJsonDS = this.app.findDatasource('reservedItemRotatingAssetJsonDS');
      const reservedActualMaterialItems = this.app.findDatasource('reservedActualMaterialDs')?.items;

      this.page.state.labelRotatingAsset = rotatingItem[0]?.description;

      // Initialize QBE for searching rotating assets
      await reservedRotatingAssetDS?.initializeQbe();
      reservedRotatingAssetDS?.setQBE("itemnum", "=", rotatingItem[0]?.itemnum);
      reservedRotatingAssetDS?.setQBE("location", "=", rotatingItem[0]?.location);
      await reservedRotatingAssetDS?.searchQBE(undefined, true);

      const rotatingAssetData = reservedRotatingAssetDS?.items;

      // Mobile-specific asset sync and filtering based on conditions
      //istanbul ignore if
      if (Device.get().isMaximoMobile) {
        const materialDS = this.app.findDatasource('woReservedMaterialds');
        const woMaterialResource = this.app.findDatasource('woMaterialResource');
        await woMaterialResource.load({
          itemUrl: this.page.params.href,
          noCache: true
        });
        await materialDS.load();

        const selectedIndex = materialDS.items.findIndex(
          (item) => item.itemnum === rotatingItem[0]?.itemnum
        );
        const materialAssets = materialDS.items[selectedIndex]?.itemasset.filter(
          (asset) => asset.location === rotatingItem[0]?.location
        );
        const validAssetNums = materialAssets.map((asset) => asset.assetnum);
        // Filter assets using validAssetNums
        let filteredAssets = this.filterRotatingAssets(rotatingAssetData, validAssetNums);

        // If reservedActualMaterialItems exist, further filter assets
        if (reservedActualMaterialItems?.length) {
          filteredAssets = this.filterRotatingAssetsBasedOnTransactions(filteredAssets, reservedActualMaterialItems);
        }
        // Load final filtered assets into reservedRotatingAssetJsonDS
        reservedRotatingAssetJsonDS.load({ src: filteredAssets, noCache: true });
      }
      else {
        reservedRotatingAssetJsonDS.load({ src: rotatingAssetData, noCache: true });
      }
      this.page.state.showRotatingAssetList = true;
      this.page.state.loadingReserverMaterials = false;
      this.page.state.disableReservedMaterialAction = true;
    }
  }

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-8b-code-instruct
  /**
   * Filters rotating assets based on valid asset numbers.
   * @param {Array} rotatingAssetData - An array of objects representing rotating assets.
   * @param {Array} validAssetNums - An array of valid asset numbers.
   * @return {Array} - Returns an array of filtered rotating assets.
   */
  //istanbul ignore next
  filterRotatingAssets(rotatingAssetData, validAssetNums) {
    return rotatingAssetData.filter(asset => validAssetNums.includes(asset.assetnum));
  }


  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-8b-code-instruct
  /**
   * Filters rotating assets based on transactions.
   * @param {Array} rotatingAssetData - The data of rotating assets.
   * @param {Array} reservedActualMaterialItems - The reserved actual material items/transactions.
   * @returns {Array} - The filtered rotating assets that have not been used in transactions.
   */
  //istanbul ignore next
  filterRotatingAssetsBasedOnTransactions(rotatingAssetData, reservedActualMaterialItems) {
    const uxRotAssetTransactions = {};
    reservedActualMaterialItems.forEach(({ itemnum, rotassetnum }) => {
      if (!uxRotAssetTransactions[itemnum]) {
        uxRotAssetTransactions[itemnum] = [];
      }
      if (rotassetnum && !uxRotAssetTransactions[itemnum].includes(rotassetnum)) {
        uxRotAssetTransactions[itemnum].push(rotassetnum);
      }
    });

    return rotatingAssetData.filter(({ itemnum, assetnum }) => {
      return !uxRotAssetTransactions[itemnum]?.includes(assetnum);
    });
  }

  /**
   * @returns Rotating asset list
   */
  getReservedRotatingAssetData() {
    return this.app.findDatasource("reservedItemRotatingAssetJsonDS").getSelectedItems();
  }

  /**
 * Updates local data sources with the provided item updates.
 *
 * @param {Object} woReservedMaterialRotating - The rotating reserved materials ds.
 * @param {Object} itemToUpdate - an object with similar requestnum.
 * @param {Array} selectedResItems - The selected reserved items to update.
 */
  updateLocalDS(woReservedMaterialRotating, itemToUpdate, selectedResItems) {
    const woReservedMaterialds = this.app?.findDatasource('woReservedMaterialds');
    const indexMaterialRotating = woReservedMaterialRotating.items.findIndex(item => item.requestnum === itemToUpdate.requestnum);
    //istanbul ignore else
    if (indexMaterialRotating !== -1) {
      const itemRotating = woReservedMaterialRotating.items[indexMaterialRotating];
      if (itemRotating.reservedqty - selectedResItems.length < 0) {
        this.page.state.dataFailed = true;
        return;
      }
      //updating values for the localDS
      else {
        woReservedMaterialRotating.items[indexMaterialRotating].reservedqty -= selectedResItems.length;
        woReservedMaterialRotating.items[indexMaterialRotating].actualqty = itemToUpdate.actualqty;
        //istanbul ignore next
        if (woReservedMaterialds?.items) {
          woReservedMaterialds.items[indexMaterialRotating].reservedqty = itemRotating.reservedqty;
          woReservedMaterialds.items[indexMaterialRotating].actualqty = itemRotating.actualqty;
        }
      }
      if (woReservedMaterialRotating?.items[indexMaterialRotating]?.reservedqty === 0) {
        this.page.state.itemwithZeroQty = true;
      }
    }
  }

  /**
   * Prepare the payload and send Reserve items to the server
   */
  async sendReservedItems() {
    let selectedResItems = this.page.state.items;
    const nonRotatingItem = selectedResItems.find((item) => !item.isrotating);
    let localReserveQty = nonRotatingItem ? nonRotatingItem.reservedqty : 1;
    let setDS = this.app.findDatasource('defaultSetDs');
    let synonymdomainData = this.app.findDatasource('synonymdomainData');
    let issueType = await SynonymUtil.getSynonymDomain(synonymdomainData, 'ISSUETYP', 'ISSUE');
    let reserveActualds = this.app.findDatasource('reservedActualMaterialDs');
    let woReservedMaterialNonRotating = this.page.findDatasource('woReservedMaterialNonRotating');
    const woReservedMaterialRotating = this.page.findDatasource('woReservedMaterialRotating');
    let itemsetid = null;
    //loop for selected rows
    let multiMatusetrans = [];
    // istanbul ignore next
    if (setDS?.item['itemsetid']) {
      itemsetid = setDS.item['itemsetid'];
    }
    let itemToUpdate = { ...woReservedMaterialRotating?.items?.find(item => item.requestnum === selectedResItems[0].requestnum) };
    if (selectedResItems && selectedResItems.length > 0) {
      const onDataFailedHandler = this.onSaveDataFailed.bind(this);
      try {
        for (let i = 0; i < selectedResItems.length; i++) {
          const matusetransTemp = {
            itemnum: selectedResItems[i].itemnum,
            storeloc: selectedResItems[i].location,
            binnum: selectedResItems[i].binnum,
            location: selectedResItems[i].oplocation,
            issuetype_maxvalue: issueType.maxvalue,
            positivequantity: localReserveQty,
            requestnum: selectedResItems[i].requestnum,
            description: selectedResItems[i].description,
            locdesc: selectedResItems[i].locationsdesc,
            invreserveid: selectedResItems[i].invreserveid,
            matusetransid: selectedResItems[i].isrotating ? selectedResItems[i].rotassetnum : selectedResItems[i].invreserveid,
            orgid: woReservedMaterialNonRotating.orgid,
            restype: woReservedMaterialNonRotating.restype,
            siteid: selectedResItems[i].storelocsiteid,
            storelocsiteid: woReservedMaterialNonRotating.storelocsiteid,
            itemsetid: itemsetid,
          };

          if (selectedResItems[i].isrotating) {
            itemToUpdate.actualqty += matusetransTemp.positivequantity;
            matusetransTemp.rotassetnum = selectedResItems[i].rotassetnum;
            matusetransTemp.location = selectedResItems[i].oplocation;
          }
          multiMatusetrans.push(matusetransTemp);
        }

        this.updateLocalDS(woReservedMaterialRotating, itemToUpdate, selectedResItems);

        let option = {
          responseProperties: 'matrectransid,anywhererefid,requestnum',
          localpayload: multiMatusetrans
        };
        if (this.page.state.dataFailed) {
          this.saveDataSuccessful = false;
          reserveActualds?.off('put-data-failed', onDataFailedHandler);
          this.app.setCurrentPage({ name: 'report_work', params: { itemhref: this.page.params.href } });
          this.page.state.dataFailed = false;
          this.emptyActualqty = true;
          return;
        }
        this.saveDataSuccessful = true;
        reserveActualds?.on('put-data-failed', onDataFailedHandler);
        await reserveActualds.bulkAdd(multiMatusetrans, option);
      } catch (e) {
        log.t(TAG, 'Error on saving remark : ' + e);
      } finally {
        this.page.state.loadingReserverMaterials = false;
        this.page.state.disableReservedMaterialAction = true;
        this.page.state.selectedReservedItems = [];
        this.page.state.reservedItemAdded = true;

        // istanbul ignore next
        if (this.saveDataSuccessful) {
          this.app.toast(this.app.getLocalizedLabel('resevered_items', `Reserved items added`), 'success');
          reserveActualds?.off('put-data-failed', onDataFailedHandler);
          this.app.setCurrentPage({ name: 'report_work', params: { itemhref: this.page.params.href } });
        }
        /**
        * Displays an error message if the user exceeds the reserved asset quantity for the selected rotating item.
        */
        else if (this.emptyActualqty) {
          this.app.toast(this.app.getLocalizedLabel('empty_actualqty_items', 'Reserved asset quantity has been fully utilized'), 'error');
        }
      }
    }
  }

  /*
   * Save the reserved items
   */
  async setReservedItems(items) {
    // Fetch the reservedRotatingAsset datasource and get selected items
    const selectedAssetRotating = this.getReservedRotatingAssetData();
    this.page.state.sendSelectedAssets = selectedAssetRotating?.length > 0;
    this.page.state.showRotatingAssetList = false;
    this.page.state.loadingReserverMaterials = true;
    this.page.state.rotatingItemWithNoAsset = [];
    this.page.state.items = [];
    if (!this.page.state.selectedReservedItems?.length) {
      this.page.state.selectedReservedItems = items?.item;
    }
    let selectedResItems = this.page.state.selectedReservedItems;
    //loop for selected rows
    if (selectedResItems && selectedResItems.length > 0) {
      for (let i = 0; i < selectedResItems.length; i++) {
        //istanbul ignore else
        if (selectedResItems[i].isrotating) {
          this.page.state.rotatingItemWithNoAsset.push(selectedResItems[i]);
        } else {
          this.page.state.items.push(selectedResItems[i]);
        }
      }
    }
    if (this.page.state.rotatingItemWithNoAsset.length === 0) {
      this.sendReservedItems();
    } else {
      this.selectionRotatingAssets();
    }
  }
}

export default ReserveMaterialsPageController;

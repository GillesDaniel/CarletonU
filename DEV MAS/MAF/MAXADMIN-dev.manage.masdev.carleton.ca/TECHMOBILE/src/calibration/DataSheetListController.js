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

/** Constants */
import DatasheetConstants from "./rules/constants/DatasheetConstants";
import CalibrationPointConstants from './rules/constants/CalibrationPointConstants';
import DatasourceConstants from './rules/constants/DatasourceConstants';

/** Utils */
import CommonUtil from "../utils/CommonUtil";
import getMaxVars from "../utils/getMaxVars";
import SynonymDomain from './rules/models/SynonymDomain';

/** Log */
import { log } from '@maximo/maximo-js-api';

const TAG = 'DataSheetListController';

/**
 * DataSheetListController
 * 
 * @typedef {import('@maximo/maximo-js-api').Page} Page
 * @typedef {import('@maximo/maximo-js-api').Application} Application
 * @typedef {import('@maximo/maximo-js-api').Datasource} Datasource
 */
class DataSheetListController {

    pageInitialized(page, app) {
        log.t(TAG, 'Page Initialized');
        this.app = app;
        this.page = page;
    }

    async pageResumed(page, app) {
        // States
        this.app.state.dataSheetTitle = this.app.state.datasheetName;
        this.page.state.autoupdate = this.getAutoUpdate();

        // Load work order calibration details
        await this.loadWoDetailCalibration(app, page);
    }

    /**
     * Defines if datasheet should be updated manually or automatically
     * after calculations are perfomed in the calibration point page.
     *   If value is "0", then we turn the update off and allow user to
     * change it manually in datasheet page. If value is "1", disable
     * this feature on datasheet page and let it be updated in the
     * CalibrationPointHandler.
     *   If the maxvar "PLUSCAUTOSTATUS" is not set, then use default
     * value "1".
     * 
     * @returns {Boolean}
     */
    // TODO: GRAPHITE-76799 refactor: add autoUpdateDataSheetStatus function into calibration/utils
    getAutoUpdate() {
      let isAutoUpdateStatus = true;
      const [maxvar] = CommonUtil.filterMobileMaxvars(
        DatasheetConstants.PLUSCAUTOSTATUS,
        {
          items: [
            {
              mobilemaxvars: getMaxVars(),
            },
          ],
        }
      ) || [];

      if (maxvar) {
        isAutoUpdateStatus = maxvar.varvalue === DatasheetConstants.UPDATE_DATASHEET_STATUS_AUTOMATICALLY
      }
      return isAutoUpdateStatus;
    }

    /**
     * Load Work Order, Datasheet, Asset Function and Calibration Points.
     * @param {Application} app - Graphite App reference.
     * @param {Page} page - Graphite Page reference.
     * @returns {undefined}
     */
    async loadWoDetailCalibration(app, page) {

        // Start loading
        page.state.loading = true;

        const wonum = app.state.datasheetWonum;

        // Datasources
        const workorderDS = app.findDatasource("woDetailCalibration");
        const datasheetDS = app.findDatasource("pluscWoDs");

        // Load work order details
        await workorderDS.load({ where: `wonum="${wonum}"` });

        // Load datasheet list
        // * Heads up! After we load work order details, we force a 
        // reload for datasheetDS to refresh the cached data with latest
        // state from server. Then we request all datasheets associated
        // to work order to ensure we will have the complete list.
        //   This is necessary because in calibration point page we
        // modify datasheetDS ("pluscWoDs") to hold only the datasheet
        // being used at the time (parent). Without this forced reload,
        // we start experiencing a glitch where the datasheet list 
        // rendered here will only show a single datasheet, after user
        // saves the calibration points in calibration point page.
        await datasheetDS.forceReload();
        await datasheetDS.load({ where: `wonum="${wonum}"` });

        // Complete loading
        page.state.loading = false;
  
        return true;
    }

    goBack() {
        this.app.setCurrentPage({
            name: "workOrderDetails",
            resetScroll: true,
            params: {
                wonum: this.app.state.datasheetWonum,
                href: this.app.state.dataSheethref,
                siteid: this.app.state.datasheetSiteid
            },
        });
    }

    /**
     * Function to handle the click in the Data Sheet List
     * @param {*} item
     */ 
    async openAssetFunctions(context) {
        context.page.state.loading = true;
        
       const ds = context.app.findDatasource("pluscWoDs");
       await ds.load({ where: `pluscwodsid=${context.item.pluscwodsid}` });

       const index = ds.items.findIndex(datasheet => datasheet.pluscwodsid === Number(context.item.pluscwodsid));
       ds.get(index, CalibrationPointConstants.SET_AS_CURRENT);

        await this.loadAssetFunctionsDS(context, ds);
        
        context.page.state.loading = false;
    }

    async loadAssetFunctionsDS(context, datasource) {
        const { app, item }  = context;
        const assetFunctionsDetailsDS = datasource.getChildDatasource("pluscwodsinstr", item, DatasourceConstants.ASSET_FUNCTION_CHILD_OPTIONS);
        const response = await assetFunctionsDetailsDS.load();
        app.state.assetFunctionsDetailsDS = assetFunctionsDetailsDS;
        
        if(!response.length) {
            return;
        }

        app.setCurrentPage({
            name: 'assetfunctions',
            resetScroll: true,
            params: {
                assetfunctiontitle: `${item.dsplannum} ${item.description}`,
                assetrevisionnum: `${item.revisionnum}`,
                wodsnum: item.wodsnum
            }
        });

        return;
    };

    /**
     * Open change status sliding-drawer component and let the user
     * choose the value for the asset function.
     * 
     * @param {Event} event 
     * @returns void
    */
    async openChangeStatus(event) {
      const { item: datasheet, app, page, changeText: field } = event;

      /**
       * Determine whether datasheet status can be manually updated
       * or should be calculated in calibration handler
       * @type {Boolean}
       */
      const autoupdate = this.getAutoUpdate();

      /**
       * Fetch current status; 'changeText' tells which attribute to check.
       * This assignment might affect one of these attributes:
       * @access datasheet.asfoundcalstatus
       * @access datasheet.asleftcalstatus
       * @type {String}
       */
      const status = datasheet[field];

      // Load datasources
      const synonymDS = app.findDatasource("synonymdomainData");
      const statusListDS = app.findDatasource("changeStatusList");

      // Synonym handler
      const synonymHandler = new SynonymDomain(synonymDS, statusListDS);

      // Change state
      page.state.changeText = event?.changeText;
      page.state.currentItem = event?.item;

      // If autoupdate option is set to false, then status won't
      // be calculated by calibration point handler and the user
      // can set any status he wishes.
      if (!autoupdate) {
        await synonymHandler.showAllStatus();
        page.showDialog("dataSheetStatusDialog");
        return;
      }

      // Datasheet status should be calculated by calibration point handler
      // and cannot be changed manually, except if it is empty 
      // (see first case below).
      if (autoupdate) {
        // Check if status has been previously calculated.
        // If so, user cannot change it to Broken/Missing, 
        // but if the status was set to Missing/Broken, 
        // user may be able to change it.
        if (
          status &&
          ![
            DatasheetConstants.STATUS_BROKEN,
            DatasheetConstants.STATUS_MISSING,
          ].includes(status)
        ) {
          log.d(TAG, "User cannot change status that is neither Broken nor Missing.");
          return;

        // Can be marked as BROKEN or MISSING manually by user
        } else {
          log.d(TAG, "Can be updated manually by user.");
          await synonymHandler.showFilteredStatus();
          page.showDialog("dataSheetStatusDialog");
        }
      }
    }

    async selectStatus(itemSelected) {
        // Select the new calibration status
        this.page.state.selectedStatus = itemSelected.value;
        const changeText = this.page.state.changeText;
        let updateValue = this.page.state.currentItem;
        let pluscWoDs = this.app.findDatasource("pluscWoDs");

        updateValue[changeText] = itemSelected.value;

        pluscWoDs.items.push(updateValue);
        if (!itemSelected._selected) {
            this.page.state.selectedStatus = "";
        }
        await this.changeStatus();
    }

    /***
     * saving data
     */
    async changeStatus() {
        this.page.state.statusLoading = true;
        let selectedStatus = this.page.state.selectedStatus;
        const pluscWoDs = this.app.findDatasource('pluscWoDs');
        await pluscWoDs.load();
        if (selectedStatus) {
            await pluscWoDs.save();
        }
        const dataSheetStatusDialog = this.page.findDialog("dataSheetStatusDialog");
        if (dataSheetStatusDialog) {
            await dataSheetStatusDialog.closeDialog();
        }
    }
}

export default DataSheetListController; 
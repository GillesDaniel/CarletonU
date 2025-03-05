/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020, 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
import SRCommonController from './SRCommonController';
import { AppSwitcher } from '@maximo/maximo-js-api';
import { Browser } from '@maximo/maximo-js-api/build/device/Browser';
import 'regenerator-runtime/runtime';

class SRPageController extends SRCommonController {

  /**
   * This method is only ever called once.
   * @param {*} page 
   * @param {*} app 
   */
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    this.loadSRListData("activerequests");
  }



  // istanbul ignore next
  pageResumed(page) {
    this.closePossiblyOpenDialogs();
    // If coming back from createSR page, register srDS back to main page
    if (this.app.findPage("createSR").findDatasource("srDS")) {
      delete this.page.datasources.srDS;
      this.page.registerDatasource(this.app.findDatasource("srDS"));

      if (this.app.findPage("createSR").params?.href) {
        this.page.findDatasource("srDS").clearState();
      }
    }

    this.trackUserLogin(page);
    let incomingContext = this.app.state.incomingContext;
    if (incomingContext && incomingContext.breadcrumb && incomingContext.breadcrumb.enableReturnBreadcrumb) {
      this.page.state.breadcrumbWidth = this.app.state.screen.size === 'sm' ? 68 : 50;
    }
    this.app.state.valuesaved = false;
    this.refreshRequestsInMainPage();
  }



  async closePossiblyOpenDialogs() {
    for (const page of this.app.pages) {
      await page.closeAllDialogs();
    }
  }



  async refreshRequestsInMainPage() {
    const srDS = this.app.findDatasource("srDS");
    srDS.options.selectedRecordHref = "";
    if (this.app.state.refreshActiveRequests || srDS.__newItems || this.app.findPage("createSR").params.href) {
      this.app.state.pageLoading = true;
      try {
        if (this.page.state.selectedDropdown === 'unsyncedrequests') {
          await this.loadUnsyncData();
        } else {
          await srDS.forceReload();
        }
      } finally {
        this.app.state.pageLoading = false;
        this.app.state.refreshActiveRequests = false;
      }
    }
  }



  /*
   * Method to store and load the user login detail
   */
  trackUserLogin(page) {
    let browser = Browser.get();
    let firstLoginData = browser.loadJSON('FirstLoginData', false);
    let date = new Date();
    let newDate = date.toLocaleDateString();
    if (!firstLoginData || !firstLoginData.date) {
      firstLoginData = { 'date': newDate, 'isFirstLogIn': true };
    } else {
      if (firstLoginData.date === newDate) {
        firstLoginData.isFirstLogIn = false;
      } else {
        firstLoginData.date = newDate;
        firstLoginData.isFirstLogIn = true;
      }
    }
    browser.storeJSON('FirstLoginData', firstLoginData, false);
    page.state.firstLogin = firstLoginData.isFirstLogIn;
  }



  /**
   * Load Service Request list data on the basis of selection from dropdown.
   * @param {*} evt Dropdown item selected
   */
  async loadSRListData(arg) {
    if (this.app.datasources.srDS.state.currentSearch) {
      this.app.datasources.srDS.clearState();
    }

    switch (arg) {
      case "completedrequests":
        this.page.state.emptystring = this.app.getLocalizedMessage(this.app.name, 'noCompletedRequests', 'No completed requests');
        this.filterSrByStatus(this.app.state.synonym.completedSrStatusList);
        break;
      case "unsyncedrequests":
        this.page.state.emptystring = this.app.getLocalizedMessage(this.app.name, 'noUnsyncedRequests_text', 'No unsynced requests');
        this.loadUnsyncData();
        break;
      default: //activerequests
        this.page.state.emptystring = this.app.getLocalizedMessage(this.app.name, 'noActiveRequests_text', 'No active requests');
        this.filterSrByStatus(this.app.state.synonym.activeSrStatusList);
    }
  }



  async filterSrByStatus(qbeClause) {
    this.app.state.pageLoading = true;
    try {
      while(this.app.state.synonym.loading) {
        await this.retryWait(50);
      }
      let srDS = this.app.findDatasource("srDS");
      await srDS.initializeQbe();
      this.app.state.canLoad.sr = true;
      srDS.setQBE("status", "in", qbeClause);
      await srDS.searchQBE(undefined, true);
    } finally {
      this.app.state.pageLoading = false;
    }
  }



  /**
   * Loads data that was created in device but yet not sent to server
   */
  //istanbul ignore next
  async loadUnsyncData() {
    if (!this.app.state.isMobileContainer) {
      return;
    }
    let unsyncedData = await this.app.client.txManager.info.recordsWithAllTransactions();
    if (unsyncedData) {
      const unsyncedDataSize = unsyncedData.length;
      const newStatus = this.app.state.synonym.newSRStatus.description;
      let unsyncedDataList = [];
      for (let i = 0; i < unsyncedDataSize; i++) {
        let unsyncedTrans = unsyncedData[i].transactions;
        if (unsyncedTrans && unsyncedTrans[0].app === "srmobile" && unsyncedData[i].record.href.startsWith("TEMP_HREF")) {
          let unsyncedDataRec = unsyncedData[i].record;
          let computedSRStatusPriority = [
            {
              label: newStatus,
              type: 'cool-gray'
            },
            {
              label: this.app.state.numericDom.priorityDescriptionList[unsyncedDataRec.reportedpriority],
              type: 'dark-gray'
            }
          ];
          let computedDoclinksCount = 0;
          let computedWorklogCount = 0;
          for (const transaction of unsyncedTrans) {
            if (transaction.txTitle.includes("worklogDS")) {
              computedWorklogCount++;
            } else if (transaction.txTitle.includes("attachment")) {
              computedDoclinksCount++;
            }
          }
          unsyncedDataList.push({
            ticketid: unsyncedDataRec.ticketid ? unsyncedDataRec.ticketid : undefined,
            ticketuid: unsyncedDataRec.ticketuid,
            status_description: newStatus,
            reportedpriority_description: this.app.state.numericDom.priorityDescriptionList[unsyncedDataRec.reportedpriority],
            assetnum: unsyncedDataRec.assetnum,
            location: unsyncedDataRec.location,
            description: unsyncedDataRec.description,
            description_longdescription: unsyncedDataRec.description_longdescription,
            computedDoclinksCount: computedDoclinksCount,
            computedWorklogCount: computedWorklogCount,
            computedSRDescription: unsyncedDataRec.description,
            computedSRStatusPriority: computedSRStatusPriority,
            href: unsyncedDataRec.href,
            record: unsyncedDataRec,
            transaction: unsyncedTrans[0],
            errored: unsyncedDataRec.errored
          });
        }
      }
      this.page.datasources["unsyncedrequests"].load({
        src: unsyncedDataList
      });
    }
  }



  async openNewRequestPage() {
    this.app.setCurrentPage({
      name: 'newRequest'
    });
  }



  /**
   * Redirects to details page
   * @param {Object} listItem - clicked item from list
   */
  showSRDetail(item) {
    if (this.page.state.selectedDropdown === 'unsyncedrequests') {
      let options = { route: "srDetails" };
      let context = {
        href: item.href,
        record: item.record,
        transaction: item.transaction
      };
      let switcher = AppSwitcher.get();
      switcher.gotoApplication("srmobile", context, options);
      this.app.state.selectedSR = item.record;
      this.app.state.selectedSR.status_description = this.app.state.synonym.newSRStatus.description;
      this.app.state.selectedSR.reportedpriority_description = this.app.state.numericDom.priorityDescriptionList[this.app.state.selectedSR.reportedpriority];
      this.app.state.selectedSR.computedSRDescription = this.app.state.selectedSR.description;
      this.app.state.selectedSR.computedDoclinksCount = item.computedDoclinksCount;
      this.app.state.selectedSR.computedWorklogCount = item.computedWorklogCount;
      this.app.state.selectedSR.computedSRStatusPriority = [
        {
          label: this.app.state.selectedSR.status_description,
          type: 'cool-gray'
        },
        {
          label: this.app.state.selectedSR.reportedpriority_description,
          type: 'dark-gray'
        }
      ];
    
    //Synced data
    } else {
      this.app.state.selectedSR = item;
      this.app.setCurrentPage({
        name: 'srDetails',
        resetScroll: true,
        params: {
          firstLogin: this.page.state.firstLogin
        },
      });
    }
  }



  /**
   * This method is called by clicking on the cancel service request button on the service request list page
   */
  async showCancelSRdialog(evt) {
    this.app.state.selectedSR = evt.item;
    this.page.state.dialogBMXMessage = this.app.getLocalizedMessage(
      this.app.name, 
      'sr_confirm_cancel_msg',
      'Do you want to cancel this Service Request?'
    );
    this.page.showDialog('sysMsgDialog_srpage');
  }



  /**
   * This method is invoked after getting confirmation from showCancelSR-Dialog
   * @param {*} evt 
   * @returns 
   */
  async cancelSR(evt) {

    //istanbul ignore else
    if (evt.item.relatedwoexists) {
      //Display message
      let label = this.app.getLocalizedMessage(
        this.app.name,
        'sr_cannot_cancel_msg',
        'Can not cancel. There are related work orders'
      );
      this.app.toast(label);
      return;
    }

    let sr = evt.item;
    let status = "CANCELLED";
    let synonymDomainsDS = this.app.findDatasource('synonymdomainDS');
    await synonymDomainsDS.initializeQbe();
    synonymDomainsDS.setQBE('domainid', '=', 'SRSTATUS');
    synonymDomainsDS.setQBE('valueid', '=', 'SRSTATUS|CANCELLED');
    const response = await synonymDomainsDS.searchQBE();
    //istanbul ignore else 
    if (response && response[0]) {
      status = response[0].value;
    }

    let option = {
      record: sr,
      parameters: {
        status: status,
      },
      responseProperties: 'status',
      localPayload: {
        status: status,
        status_maxvalue: 'CLOSED'
      },
      query: { interactive: false }
    };

    try {
      this.page.state.loadingcomp = true;

      let srDS = this.app.findDatasource("srDS");
      let response = await srDS.invokeAction('changeStatus', option);

      // istanbul ignore next
      if (response && response.status_maxvalue !== evt.item.status_maxvalue) {
        let label = "";
        if (evt.item.ticketid) {
          label = this.app.getLocalizedMessage(this.app.name, 'srCancelled_msg', 'Request {0} was cancelled', [evt.item.ticketid]);
        } else {
          label = this.app.getLocalizedMessage(this.app.name, 'srCancelled_nonumber_msg', 'Request was cancelled');
        }
        this.app.toast(label, 'success');
        await srDS.forceReload();
      }
    } finally {
      this.page.state.loadingcomp = false;
    }

  }



  /**
   * Sets default state
   */
  setDefaults() {
    this.page.state.selectedSwitch = 0;
  }

} export default SRPageController;

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

class SRDetailsController extends SRCommonController {

  /**
   * This method is only ever called once.
   * @param {*} page 
   * @param {*} app 
   */
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }



  /**
   * Method to resume the page and load service request details
   * @param {*} page 
   * @param {*} app 
   */
  pageResumed(page, app) {
    page.state.gpsLocationSaved = false;
    //istanbul ignore next
    if (page.params.firstLogin) app.state.highlightStop = false;
    this.setCurrentSR();
    this.loadTagCounts();
    this.loadSpecifications();
    this.loadAssignedTo();
  }



  async setCurrentSR() {
    let srDS = this.app.findDatasource("srDS");
    srDS.currentItem = this.app.state.selectedSR;
    //istanbul ignore next
    if (this.app?.lastPage?.name === 'createSR') {
      this.validateReporter(srDS.currentItem);
    }

    // istanbul ignore if - DT379929 this validation is only for real usage scenarios
    if (!this.app.client.fakeClient) {
      srDS.currentItem.reportdate = this.app.dataFormatter.convertDatetoISO(srDS.currentItem.reportdate);
      if (srDS.currentItem.targetfinish) {
        srDS.currentItem.targetfinish = this.app.dataFormatter.convertDatetoISO(srDS.currentItem.targetfinish);
      }
    }
  }

  async validateReporter(currentItem) {
    let reporter;
    
    if (!currentItem?.reportedbyname) {
      let personDS = this.app.findDatasource("personDS");
      await personDS.forceReload();
      await personDS.initializeQbe();
      personDS.setQBE("personid", "=", currentItem.reportedby);
      let personFound = await personDS.searchQBE();
      if (personFound.length <= 0) {
        reporter = personFound[0]?.reportedby;
      } else {
        personDS.clearQBE();
        personDS.setQBE("personid", "=", personFound[0]?.displayname);
        let personIdCheck = await personDS.searchQBE();

        // istanbul ignore next
        if (personIdCheck.length === 0) {
          reporter = personFound[0]?.displayname;
          }
        }
        currentItem.currentReportedByName = reporter;
      } else {
        currentItem.currentReportedByName = currentItem.reportedbyname;
      }
    }


  async loadTagCounts() {
    if (this.page.params.doclinksCountOverridden) {
      this.page.params.doclinksCountOverridden = false;
    } else if (this.app.state.selectedSR) {
      this.page.state.doclinksCount = this.app.state.selectedSR.computedDoclinksCount;
      this.page.state.worklogCount = this.app.state.selectedSR.computedWorklogCount;
    }
  }



  async loadSpecifications() {
    this.app.state.canLoad.ticketspec = true;
    let srDetailSpecItems = await this.app.findDatasource("srSpecDS").forceReload();
    let filteredItems = [];
    //istanbul ignore next
    if (srDetailSpecItems) {
      srDetailSpecItems.forEach((item) => {
        if (item.alnvalue || item.numvalue || item.tablevalue || item.datevalue) {
          filteredItems.push(item);
        }
      });
    }
    this.app.findDatasource("srDetailSpecDSui").load({ src: filteredItems, noCache: true });
  }



  async loadAssignedTo() {
    this.app.state.canLoad.assignedto = true;
    const totalAttempts = (!this.app.state.isMobileContainer || !this.app.state.networkConnected)? 1 : 5;
    this.loadOwnerPerson(totalAttempts);
    this.loadOwnerGroup(totalAttempts);
  }



  async loadOwnerPerson(totalAttempts) {
    let counter = 0;
    let items = [];
    while (!items?.length && counter < totalAttempts) {
      items = await this.app.findDatasource("srOwnerPersonDS").forceReload();
      //istanbul ignore if
      if (totalAttempts > 1) {
        await this.retryWait(1000);
      }
      counter++;
    }
  }



  async loadOwnerGroup(totalAttempts) {
    let counter = 0;
    let items = [];
    while (!items?.length && counter < totalAttempts) {
      items = await this.app.findDatasource("srOwnerGroupDS").forceReload();
      //istanbul ignore if
      if (totalAttempts > 1) {
        await this.retryWait(1000);
      }
      counter++;
    }
  }



  goBack() {
    this.app.setCurrentPage({name:"main"});
    this.app.findDatasource("srDetailSpecDSui").load({ src: [], noCache: true });
  }

} export default SRDetailsController;

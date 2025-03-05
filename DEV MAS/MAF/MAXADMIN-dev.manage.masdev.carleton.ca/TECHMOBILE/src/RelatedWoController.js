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

import {Device,log} from '@maximo/maximo-js-api';
const TAG = 'RelatedWoController';

class RelatedWoController {
  pageInitialized(page, app) {
    log.t(TAG, 'Page Initialized');
    this.app = app;
    this.page = page;
  }

  /**
   * This method is called by clicking on create follow up work order button on
   * related work order page for specific work order accordingly.
   * @param {event} event
   */
  async createRelatedAndFollowUpWo(event) {    
    let workorder = event.item;
    this.app.findPage('workOrderDetails').state.notLoadWoDetailChilds = true;
    let woDetailResource = this.app.findPage('workOrderDetails')?.findDatasource('woDetailResource');
    await woDetailResource?.load({ noCache: true, itemUrl: event?.item?.href });
    this.app.findPage('workOrderDetails').state.notLoadWoDetailChilds = false;
    /* istanbul ignore next */
    if(woDetailResource?.item?.linearrelated){
      let deviceLinear = [];
      deviceLinear.push(woDetailResource?.item?.linearrelated);
      let linearAsset = this.app.findDatasource("linearAsset");
      await linearAsset?.load({ src: deviceLinear, noCache: true });
      this.app.state.linearinfo = this.page.state.linearinfo = woDetailResource?.item?.linearrelated?.[0];
    }
    this.app.setCurrentPage({name: 'woedit', resetScroll: true, params: {workorder, followup:true, href: workorder.href , wonum: workorder.wonum, siteid: workorder.siteid}});
    // istanbul ignore else
    if (this.app.currentPage) {
      this.app.currentPage.callController('loadRecord', workorder);
    }
  }

  /**
   * Redirects to work order detail page
   * @param {event} event
   */
  async showWoDetailPage(event) {
    this.app.setCurrentPage({
      name: "workOrderDetails",
      resetScroll: true,
      params: {wonum: event.item.wonum, siteid: event.item.siteid, href: event.item.href}
    });
  }

  /**
    * Called every time the page is being paused or leaving.
    * @param {Page} page - Page instance.
    * @param {Application} app - Application instance.
    */
  async pagePaused(page, app) {
    let dsName = Device.get().isMaximoMobile ? "myworkCreatedLocally" : "myworkDS";
    const myWorkds = app?.findDatasource(dsName);
    if (Object?.keys(myWorkds?.state?.qbe).length !== 0) {
      myWorkds?.clearQBE();
      myWorkds?.searchQBE();
    }
  }

  /*
   * Method to resume the page and load related workorder datasource
   */
  //istanbul ignore next
  async pageResumed(page, app) {
    this.app.state.pageLoading = true;
    this.page.state.editWo = false;
    if (!page.params?.followupclickable) {
      this.page.state.nonClickAble = true;
      this.page.state.clickAble = false;
    } else {
      this.page.state.nonClickAble = false;
      this.page.state.clickAble = true;
    }
    //to disable the chevron button in devices if we  create new workorder in devices
    if (page.params?.chevronDisable) {
      this.page.state.wonum = undefined;
    }
    const woDetailResource = this.page.findDatasource('woDetailRelatedWorkOrder');
    const syncLeft = this.page.findDatasource('relatedrecwo')?.items.some(item => 'anywhererefid' in item);

    /*
     * While forceSync is generally not recommended, it is applied here to ensure that newly created follow-up work orders are synced in online mode.
     *  This approach updates the single parent work order only if any follow-up work order hasn't been synced with the server and includes the anywhererefid.
     * This is a more efficient operation compared to manually syncing the entire work orders list & depends on forceSyncFollowUP state to be enabled true.
     */
    await woDetailResource?.load(
      {
        noCache: true,
        itemUrl: page.params.itemhref,
        forceSync: syncLeft && this.page.state.forceSyncFollowUP && this.app.state.networkConnected
      });
    this.app.state.pageLoading = false;
    this.page.state.editWo = !['CAN'].includes(woDetailResource?.item?.status_maxvalue);
  }

  /*
   * Method for redirect to workorderdetails page on click of followup workorder
   */
  async openEditWo(event) {
    let device = Device.get();
    const woDetailResource = this.page?.findDatasource('woDetailRelatedWorkOrder');
    this.page.state.itemnum = event.childitem.relatedreckey;
    this.page.state.anywhererefid = event.childitem.anywhererefid;

    let dsName = Device.get().isMaximoMobile ? "myworkCreatedLocally" : "myworkDS";
    const myWorkds = this.app?.findDatasource(dsName);
    if (device.isMaximoMobile) {
      await myWorkds?.forceReload();
    }

    await myWorkds?.initializeQbe();

    const { relatedreckey, relatedwodesc, anywhererefid } = event.childitem;
    myWorkds?.setQBE(relatedreckey ? 'wonum' : 'description', relatedreckey || relatedwodesc);
    if (!relatedreckey) {
      myWorkds?.setQBE('anywhererefid', anywhererefid);
    }
    myWorkds?.setQBE('siteid', event.item.siteid);

    this.page.state.loading = true;
    let filteredDomainValues = await myWorkds?.searchQBE();
    if (filteredDomainValues?.[0]?.href) {
      /*
       * Although forceSync is generally discouraged, it is used here to ensure that newly created follow-up work orders are synced in online mode. 
       * This is specifically implemented to sync follow-up work orders that have changes from the MANAGE end & sync only those whose cheveron has been clicked.
       * The syncing behavior is controlled by the forceSyncFollowUP state variable and the condition below.
       */
      await woDetailResource?.load({
        itemUrl: filteredDomainValues?.[0]?.href,
        noCache: true,
        forceSync: this.app.state.networkConnected && this.page.state.forceSyncFollowUP
      });
      
      // when will click on chveron button then current page will be set to workorderdetails and depth will be equal to 1 and after that chevron button will not be visible
      this.page.state.loading = false;
      const childHref = device.isMaximoMobile ? event?.item?.relatedwo[0]?.href : event.childitem.href;

      this.app.setCurrentPage({
        name: "workOrderDetails",
        resetScroll: false,
        params: { href: filteredDomainValues[0].href, wonum: event.childitem.relatedreckey, depth: 1, lastPage: "relatedWorkOrder", childItemHref: childHref },
        lastPage: "relatedWorkOrder",
        pushStack: true
      });
    } else {
      this.page.state.loading = false;
      this.app.toast(this.app.getLocalizedLabel('record_not_available_device', `Record not available in the device`), 'error');
    }
  }
}

export default RelatedWoController;

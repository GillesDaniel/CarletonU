/*
 * Licensed Materials - Property of IBM
 * 5737-M66, 5900-AAA
 * (C) Copyright IBM Corp. 2021, 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */


class DetailPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    }

  pageResumed(page) {
    this.page = page;
  }
	
	tileClickCallBack(event) {
    this.app.setCurrentPage({name: event.page, params: {serverIdentifier: this.app.state.currentServerId}});
  }

  async handleTestConnection(event) {
    let item = event.item;
    this.page.state.currentQueue = item;
    let resp = await this.page.datasources.testConnectionDs.load({itemUrl:item.testConnection.resource, noCache:true});
    this.page.state.currentQueueConnection = resp[0];
    this.page.showDialog("testConnectionResult");
  }

  async handleBrowseMessage(event) {
    let item = event.item;
    this.page.state.currentQueue = item;
    await this.page.datasources.browseMessagesDs.load({itemUrl:item.browseMessage.resource, noCache:true});
    this.page.showDialog("viewQueueMessages");
  }

  //istanbul ignore next
  async lookupCronClassInfo(event) {
    let item = event.item;
    this.lookupClassInfo(item.cronClass.resource);
  }

  //istanbul ignore next
  async lookupAppserviceInfo(event) {
    let item = event.item;
    this.lookupClassInfo(item.implClass.resource);
  }

  //istanbul ignore next
  async lookupMboInfo(event) {
    let item = event.item;
    this.lookupClassInfo(item.mboSetClass.resource);
  }

  //istanbul ignore next
  async lookupItemClassInfo(event) {
    let item = event.item;
    this.lookupClassInfo(item);
  }

  //istanbul ignore next
  async lookupQname(event) {
    let whereClause = 'qName="' + event.item + '"';
    let resp = await this.page.datasources.classinfods.load({itemUrl:'members/' + this.page.params.serverIdentifier + '/classinfo', where:whereClause, noCache:true});
    this.page.state.currentClassInfo = resp[0];
    this.page.showDialog("classinfodialog");
  }
  
  //istanbul ignore next
  async lookupClassInfo(url) {
    let resp = await this.page.datasources.classinfods.load({itemUrl:url, noCache:true});
    this.page.state.currentClassInfo = resp[0];
    this.page.showDialog("classinfodialog");
  }
}

export default DetailPageController;
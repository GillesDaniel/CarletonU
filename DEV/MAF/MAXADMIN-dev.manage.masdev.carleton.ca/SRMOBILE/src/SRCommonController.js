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
import 'regenerator-runtime/runtime';

class SRCommonController {

  /**
   * Function to open a sliding-drawer dialog to show comments
   * @param {*} event - event containing information about current item.
   */
  async openWorkLogDrawer(event) {
    await this.updateSrErrorStatus();
    let srDS = this.app.findDatasource('srDS');
    srDS.currentItem = event.item;
    const worklogDialogName = (this.page.name === "main")? "srIndexWorkLogDrawer" : "srWorkLogDrawer";
    this.page.state.defaultLogType = '!CLIENTNOTE!';
    await this.loadWorkLogComments();
    this.page.state.chatLogReadOnly = Boolean(event.item.historyflag || (event.item.status_maxvalue === 'CLOSED') || event.item.errored);
    this.page.showDialog(worklogDialogName);
    let schema = this.app.findDatasource('worklogDS').getSchemaInfo('logtype');
    // istanbul ignore else
    if (schema) {
      this.page.state.defaultLogType = schema.default;
    }
  }



  async loadWorkLogComments() {
    this.app.state.canLoad.worklog = true;
    let worklogDS = this.app.findDatasource('worklogDS');
    await worklogDS
      .forceReload()
      .then((response) => {
        // istanbul ignore next
        if (response) {
          response.sort((log1, log2) => { return Date.parse(log1.createdate) - Date.parse(log2.createdate) });
        }
        this.page.state.chatLogGroupData = [];
        //istanbul ignore next
        if (response) {
          let longDescriptionList = [];
          response.forEach((item) => {
            if (item.createdate) {
              let chatItem = {
                createby: ((item.displayname) ? item.displayname : (item.createby === this.app.getUserInfo().personid && this.app.getUserInfo().displayname !== "" ? this.app.getUserInfo().displayname : item.createby)),
                createdate: item.createdate,
                description: item.description,
                description_longdescription: ((item.description_longdescription)? item.description_longdescription : longDescriptionList.filter(ldItem => ldItem.anywhererefid === item.anywhererefid)[0]?.description_longdescription),
              }
              this.page.state.chatLogGroupData.push(chatItem);
            } else {
              //response.sort order by createdate, so all items without createdate are processed first
              longDescriptionList.push(item);
            }
          });
        }
      });
  }



  /**
   * Method to add new work log record
   * @param {*} value The event sent from the button in chat-log
   * @returns Nothing
   */
  async saveWorkLog(value) {
    //istanbul ignore next
    if (!value || (!value.summary && !value.longDescription) || this.app.state.selectedSR.errored) {
      return;
    }

    value.saveWorklog = true;
    await this.watchChatLogChanges(value);

    let worklogDS = await this.app.findDatasource("worklogDS");
    let worklog = await worklogDS.addNew();
    //istanbul ignore next
    if (!worklog.createby) {
      worklog.createby = this.app.userInfo.personId;
    }
    //istanbul ignore next
    if (!worklog.createdate) {
      worklog.createdate = this.app.dataFormatter.currentUserDateTime();
    }
    //istanbul ignore else
    if (value.summary) {
      worklog.description = value.summary;
    }
    //istanbul ignore else
    if (value.longDescription) {
      worklog.description_longdescription = value.longDescription;  
    }
    worklog.clientviewable = true;

    this.page.state.chatLogLoading = true;

    try {
      await worklogDS.save({interactive: false});
      await this.loadWorkLogComments();
      this.updateWorkLogCount();
    } finally {
      this.page.state.chatLogLoading = false;
    }
  }



  /**
   * This method is called when any changes done on work log screen.
   * @param {*} value 
   */
  async watchChatLogChanges(value) {
    if (value && (value.dialogOpen || value.saveWorklog) && value.longDescription && value.longDescription.length > 999999) {
      value.longDescription = value.longDescription.substring(0, 999999);
    }
  }



  /**
   * This will update the comments count badge in SR details page
   */
  async updateWorkLogCount() {
    //istanbul ignore else
    if (this.page.name === "main") {
      if (this.page.state.selectedDropdown === 'unsyncedrequests') {
        this.loadUnsyncData();
      } else {
        let srDS = this.app.findDatasource("srDS");
        let currentSR = {...srDS.currentItem}
        await srDS.forceReload();
        srDS.currentItem = currentSR;
      }
    } else {
      this.page.state.worklogCount++;
      this.app.state.refreshActiveRequests = true;
    }
  }



  /**
   * Redirects to attachments page.
   * @param {*} event Contains the item clicked
   */
  async openAttachmentPage(event) {
    let srDS = this.app.findDatasource("srDS");
    srDS.currentItem = event.item;
    this.app.state.selectedSR = event.item;
    await this.updateSrErrorStatus();
    this.app.setCurrentPage({ name: 'attachments', params: { itemhref: event.item.href } });
  }



  retryWait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  //istanbul ignore next
  async updateSrErrorStatus() {
    if (this.app.state.selectedSR?.href?.startsWith("TEMP_HREF")) {
      let unsyncedData = await this.app.client.txManager.info.recordsWithAllTransactions();
      if (unsyncedData) {
        const unsyncedDataSize = unsyncedData.length;
        for (let i = 0; i < unsyncedDataSize; i++) {
          let unsyncedTrans = unsyncedData[i].transactions;
          if (unsyncedTrans && unsyncedTrans[0].app === "srmobile" && (unsyncedData[i].record.href === this.app.state.selectedSR.href)) {
            this.app.state.selectedSR.errored = unsyncedData[i].record.errored;
            this.app.state.selectedSR.errorMessage = unsyncedData[i].record.errorMessage;
            return;
          }
        }
      } 
    }
  }

} export default SRCommonController;

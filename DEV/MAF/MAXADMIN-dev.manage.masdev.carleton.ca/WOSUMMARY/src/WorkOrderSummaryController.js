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

import {log, Device} from '@maximo/maximo-js-api';

const TAG = 'WorkOrderSummaryController';


class WorkOrderSummaryController {
  
  constructor() {
    log.t(TAG, "Created");
  }

  dialogInitialized(page, app) {
    this.page = page;
    this.app = this.page.getApplication();
    log.t(TAG, 'dialogInitialized : disableDoneButton;');
  }

  /**
   * Set log type 
   * @param {*} selected value from drop down
  */  
  async getSelectedLogtype(arg){
    this.app.state.selectedLogtype = arg.selectedItem.item.value;
  }

  /**
   * Set editorValue on the basis of content
   * @param {*} rich text editor on change event
  */
  async onEditorChange(evt) {
    this.app.state.worklogComment = evt.target.content;
  }

  /*
	 * Method to add new work log
	 */
  async saveWorkLog() {
    let app = this.page.getApplication();
    let woWorklogDs = app.findDatasource('woWorklogDs');
    let longDescription = app.state.worklogComment;
    let value = woWorklogDs.item.description;
    let isViewable = app.state.isViewable;

    let workLog = {
      createby: app.userInfo.personid,
      createdate: new Date(),
      logtype: app.state.selectedLogtype,
      description: value,
      anywhererefid: new Date().getTime(),
      description_longdescription: longDescription,
      clientviewable:isViewable
    };
    try {
      let response = await woWorklogDs.update(workLog);
      this.app.toast(this.app.getLocalizedMessage('WOSUMMARY','success','Success!'),
             'success',
            this.app.getLocalizedMessage(
              'WOSUMMARY',
              'addComment',
              'Your comment was posted.'
            ));
      await woWorklogDs.forceReload();
    } catch {

    } finally {
    }
  }
}

export default WorkOrderSummaryController;

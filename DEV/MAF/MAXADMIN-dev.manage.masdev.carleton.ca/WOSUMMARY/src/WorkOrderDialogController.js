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

import { log } from "@maximo/maximo-js-api";
const TAG = "WorkOrderDialogController";
/* eslint-disable no-console */
class WorkOrderDialogController {
  constructor() {
    log.t(TAG, "Created");
  }
  dialogInitialized(page, app) {
    this.page = page;
    this.app = app;
    log.t(TAG, 'dialogInitialized : disableDoneButton;');
  }

  onAfterLoadData(dataSource, items) {
    log.t(TAG, "On After Load");
    this.handleOwnerSelection=this.handleOwnerSelection.bind(this);
    if (items) {
      items.forEach((item, i) => {
        item.computedpersongroup = this.computedpersongroupteam(item);
        item.computedperson = this.computedperson(item);
      });
      dataSource.on('datasource-selection-changed', this.handleOwnerSelection);
    }else{
      log.t("No Owner or Owner Group found");
    }
  }

  handleOwnerSelection(event){
    let app = this.page.getApplication();
    if(event.selected && event.item.personid){
      this.selectOwnerTable(app,event.item)
    }else if(event.selected && event.item.persongroup){
      this.selectOwnerGroupTable(app,event.item)
    }
  }


  computedpersongroupteam(item) {
    log.t(TAG, "Compute PersonGroup Team");
    let personGroup = "";
    if (item.persongroupteam) {
      personGroup = item.persongroupteam.map(function (elem) {
        return elem.persongroup.persongroup + " (" + elem.persongroup.description + ")";
      }).join(", ").trim();
    }
    return personGroup;
  }
  computedperson(item) {
    log.t(TAG, "Compute Person");
    let person = "";
    if (item.allpeopleinpersongroup) {
      person = item.allpeopleinpersongroup.map(function (elem) {
        return elem.displayname;
      }).join(", ").trim();
    }
    return person;
  }

  selectOwnerTable(app,evt) {
    log.t(TAG, "Select Owner Record");
    app.state.personDS.setSelectedItem(evt, true);
    app.state.currentSelectedItemOfTable1 = evt.personid;
    app.state.currentSelectedItemOfTable2 = undefined;
    app.state.dialogPrimaryButtonDisabled = false;
    app.state.personGroupDS.clearSelections();
  }

  selectOwnerGroupTable(app, evt) {
    log.t(TAG, "Select Owner Group Record");
    app.state.personGroupDS.setSelectedItem(evt, true);
    app.state.currentSelectedItemOfTable2 = evt.persongroup;
    app.state.currentSelectedItemOfTable1 = undefined;
    app.state.dialogPrimaryButtonDisabled = false;
    app.state.personDS.clearSelections();
  }

  async saveOwner(dialogId, woItem, skipInvokeAction) {
    log.t(TAG, "Save Owner or Owner Group");
    let app = this.page.getApplication();
    let workOrderDS = app.state.workOrderDS;
    let selectedItems = woItem!=null ? woItem:{ ...app.state.selectedItems };
    app.state.selectedItemOfTable1 = app.state.currentSelectedItemOfTable1;
    app.state.selectedItemOfTable2 = app.state.currentSelectedItemOfTable2;
    let action = "applyOwner";
    let displayMsg = app.getLocalizedMessage("", "", "Owner ");
    let ownerNameOrOwnerGroup = null;
    // istanbul ignore else
    if (app.state.selectedItemOfTable1 !== undefined) {
      ownerNameOrOwnerGroup = app.state.selectedItemOfTable1;
      let editLabelOwner = app.getLocalizedMessage("", "", "Owner ");
      app.state.editFieldLabel = editLabelOwner + app.state.selectedItemNameOfTable1;
    }
    // istanbul ignore else
    if (app.state.selectedItemOfTable2 !== undefined) {
      ownerNameOrOwnerGroup = app.state.selectedItemOfTable2;
      action = "applyOwnerGroup";
      displayMsg = app.getLocalizedMessage("", "", "Owner group ");
      let editLabelOwnerGrp = app.getLocalizedMessage("", "", "Owner group ");
      app.state.editFieldLabel = editLabelOwnerGrp + app.state.selectedItemNameOfTable2;
    }
    if (selectedItems != null && !isEmpty(selectedItems)) {
      let woSelectedItem = null;
      let bulkSelectedItems = new Array();
      for (var i in selectedItems) {
        woSelectedItem = { ...selectedItems[i] };
        bulkSelectedItems.push({ ...selectedItems[i] });
      }
      let option = {
        record: woSelectedItem,
        parameters: {
          owner: ownerNameOrOwnerGroup,
        },
        headers: {
          "x-method-override": "PATCH",
        }
      };

      if (bulkSelectedItems.length > 1) {
        bulkSelectedItems.forEach((element) => {
          // istanbul ignore if
          if (action === "applyOwner") {
            element.owner = ownerNameOrOwnerGroup;
            // istanbul ignore  else
          } else {
            element.ownergroup = ownerNameOrOwnerGroup;
          }
          option = {
            parameters: bulkSelectedItems,
            headers: {
              "x-method-override": "BULK",
            },
          };
        });
        // istanbul ignore next
      } else if (action === "applyOwnerGroup") {
        option = {
          record: woSelectedItem,
          parameters: {
            ownergroup: ownerNameOrOwnerGroup,
          },
          headers: {
            "x-method-override": "PATCH",
          }
        };
      }
      try {
        let response = skipInvokeAction != null ? "NA" : await workOrderDS.invokeAction(action, option);
        let currentPage = app.state.currentPageName;
           if(currentPage==="WOSummaryPage"){
            await app.state.workOrderSummaryDS.forceReload();
           }else{
            workOrderDS.clearSelections();
            await workOrderDS.forceReload();
           }
        app.toast(app.getLocalizedMessage('WOSUMMARY', 'success', 'Success!'), 'success',
          app.getLocalizedMessage(
            'WOSUMMARY',
            'saveOwner',
            'The {0} was updated for {1} work orders.',
            [displayMsg, bulkSelectedItems.length]));
      } finally {

      }
      log.i(TAG, "Owner or Owner Group Changed");
    } else {
      log.i(TAG, "No Items Selected for Save");
    }
  }

  async getSelectedDate(arg) {
    this.page.parent.state.updateStatusDate = arg;
  }
  async getSelectedupdateStatus(arg) {
    this.page.parent.state.updateStatus = arg.selectedItem.item.value;
    this.page.parent.state.isStatusdisabled = false;
  }

  async getSelectedWorkflow(arg) {
    this.page.state.selectedWorkflow = arg.selectedItem.item.processname;
    this.page.parent.state.isSelectWorkflowDisable = false;
  }

  async onCancelUpdateStatus() {
    let app = this.page.getApplication();
    let page = app.findPage('WOSummaryPage');
    app.currentPage.controllers[0].onCancelUpdateStatus();
  }

  async updateAssignmentStatus(woItem) {
    log.t(TAG, "Update status ");
    let parentPage = this.page.parent;
    let app = this.page.getApplication();
    let workOrderDS = parentPage.state.workOrderDS;
    let selectedItems = woItem!=null ? woItem:{ ...parentPage.state.selectedItems };
    let updateStatus = "";
    // istanbul ignore else
    if (this.page.parent.state.updateStatus === undefined) {
      updateStatus = workOrderDS.currentItem.status;
    } else {
      updateStatus = this.page.parent.state.updateStatus;
    }
    let dataFormatter = app.dataFormatter;
    let updateStatusDate = dataFormatter.convertDatetoISO(parentPage.state.updateStatusDate);
    let updateStatusMemo = parentPage.state.updateStatusComment;
    log.t(TAG, updateStatusMemo, updateStatusDate, updateStatus);
    if (selectedItems != null && !isEmpty(selectedItems)) {
      let action = "changeStatus";
      let woSelectedItem = null;
      let bulkSelectedItems = [];
      for (var i in selectedItems) {
        woSelectedItem = { ...selectedItems[i] };
        bulkSelectedItems.push(woSelectedItem);
      }
      let option;
      if (updateStatusMemo === "") {
        option = {
          record: woSelectedItem,
          parameters: {
            status: updateStatus,
            date: updateStatusDate
          },
          headers: {
            "x-method-override": "PATCH",
          }
        };
      } else {
        option = {
          record: woSelectedItem,
          parameters: {
            status: updateStatus,
            date: updateStatusDate,
            memo: updateStatusMemo
          },
          headers: {
            "x-method-override": "PATCH",
          }
        };
      }
      if (bulkSelectedItems.length > 1) {
        bulkSelectedItems.forEach((element) => {
          element.status = updateStatus;
          element.date = updateStatusDate;
          if (updateStatusMemo !== "") {
            element.memo = updateStatusMemo;
          }
          option = {
            parameters: bulkSelectedItems,
            headers: {
              "x-method-override": "BULK",
            },
          };
        });
      }
      try {
        let response = await workOrderDS.invokeAction(action, option);
        let errorMessage = new Array();
        let successWO = new Array();
        // istanbul ignore else
        if (response && Array.isArray(response) && response.length > 0) {
          response.forEach((responsedata, i) => {
            // istanbul ignore else
            if (responsedata._responsedata && responsedata._responsedata.Error) {
              errorMessage.push(responsedata._responsedata.Error.message)
            }// istanbul ignore else
            else if (responsedata._responsemeta) {
              successWO.push(responsedata._responsemeta._bulkid)
            }
          });
          this.processCompleted();
        } else if (response) {
          successWO.push(woSelectedItem.wonum);
          this.processCompleted();
        }
        let currentPage = parentPage.state.currentPageName;
        if (currentPage === "WOSummaryPage") {
        await app.state.workOrderSummaryDS.forceReload();
        this.processCompleted();
        } else {
        workOrderDS.clearSelections();
        await workOrderDS.forceReload();
        this.processCompleted();
        }
        // istanbul ignore else
        if (successWO.length > 0) {

          app.toast(app.getLocalizedMessage('WOSUMMARY', 'success', 'Success!'),
            'success',
            app.getLocalizedMessage(
              'WOSUMMARY',
              'updateAssignmentStatus',
              'The status of work order {0} was changed.',
              [successWO.join(", ")]
            ));
        }
        if (errorMessage.length > 0) {
          app.toast(app.getLocalizedMessage('WOSUMMARY', 'error', 'Error!'),
            'error',
            app.getLocalizedMessage(
              'WOSUMMARY',
              'updateAssignmentStatus',
              [errorMessage.join(", ")]
            ), 20);
        }
      } finally {

      }

    } else {
      // istanbul ignore next
      app.log.t(TAG, "No Items Selected for Save");
    }
  }

  async initiateWorkflow(query) {
    let parentPage = this.page != null ? this.page.parent : query.parent;
    let selectedItems = query.woItem != null ? query.woItem : { ...parentPage.state.selectedItems };
    let workOrderDS = parentPage.state != null && parentPage.state.workOrderDS != null ? parentPage.state.workOrderDS : query.woDS;
    let app = parentPage.parent === undefined ? parentPage : parentPage.parent;
    let workflowProcess = query.selectedWorkflow;
    if (workflowProcess === undefined || workflowProcess == null) {
      workflowProcess = this.page.state.selectedWorkflow != null ? this.page.state.selectedWorkflow : parentPage.state.selectedWorkflow;
    }
    let initiateWorkflowComment = parentPage.state.initiateWorkflowComment;
    let action = '?action=workflow:' + workflowProcess + "&memo=" + initiateWorkflowComment;

    let woSelectedItem = null;
    log.t(TAG, workflowProcess);
    if (workflowProcess !== undefined && selectedItems !== null && !isEmpty(selectedItems)) {
      let records = new Array();
      let href = "";
      let selectedWO = new Array();
      for (var i in selectedItems) {
        woSelectedItem = { ...selectedItems[i] };
        href = woSelectedItem.href + action;
        selectedWO.push(woSelectedItem.wonum);
        records.push(this.requestPayload(href));
      }
      if (records.length > 1) {
        console.log(records);
        let option = {
          itemUrl: href
        };
        await workOrderDS.bulkAdd(records, option);
      } else {
        log.i(TAG, "Reassign Individual Assignment");
        await workOrderDS.put(records[0]);
      }
      if (parentPage.state.woSummary || (query != null && query.woSummary)) {
        let wosummaryDS = parentPage.findDatasource("woDetailResource");
        await wosummaryDS.forceReload();
      } else {
        await workOrderDS.forceReload();
      }
      app.toast('Success!', 'success',
        app.getLocalizedMessage(
          'WOSUMMARY',
          'updateAssignmentStatus',
          'Workflow process {0} has started for work order {1}.',
          [workflowProcess, selectedWO.join(", ")]
        ));
      log.i(TAG, "Workflow Initiated");
    } else if (workflowProcess === undefined) {
      app.toast('Error!', 'error',
        app.getLocalizedMessage(
          'WOSUMMARY',
          'updateAssignmentStatus',
          'Please select a workflow process.'
        ));
    }
  }

  requestPayload(href) {
    //let parentPage = this.page.parent;
    let record = {
      href: href
    }
    return record;
  }
  async asyncPrimaryEvent() {
    this.dialog = this.page
    this.page.parent.state.dialogIsBusy = true;
    this.dialog = this.page;
    this.updateAssignmentStatus();
  }
  async processCompleted() {
    let res = await this.resolveAfterSeconds("Processing your changes", 1);
    //istanbul ignore next
    this.dialog.closeDialog();
  }
  resolveAfterSeconds(x, seconds = 2) {
    return new Promise(resolve => {
      //istanbul ignore next
      setTimeout(() => {
        resolve(x);
      }, seconds * 1000);
    });
  }

}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default WorkOrderDialogController;

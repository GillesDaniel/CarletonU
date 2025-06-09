/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import {log} from '@maximo/maximo-js-api';

const TAG = 'RouteWorkflowDialogController';

class RouteWorkflowDialogController {
  constructor() {
    log.t(TAG, 'Created');
  }

  dialogInitialized(dialog) {
    log.t(TAG, 'Initialized');
    this.dialog = dialog;
    this.app = dialog.getApplication();
    this.page = this.app.findPage(this.app.state.currentPageName);
    this.app.state.selectedRadioGrpAssignment = "0"
  }

  async selectRouteAction(item) {
    let routeActions = this.app.state.routeActions;    
    routeActions = routeActions.filter(element => element.actionid === item);
    this.app.state.routeAssignmentSelectedItem = routeActions[0];
    log.t(TAG, 'route select status : SelectStatus called .. ' + JSON.stringify(this.app.state.routeAssignmentSelectedItem));    
  }

  dialogOpened() {
    log.t(TAG, 'Opened');
    this.app.state.selectedRadioGrpAssignment = "0";
    this.app.state.routeComment="";
    this.app.state.acceptComment="";
    this.app.state.rejectComment="";
    this.app.state.reassignComment="";
    this.app.state.routeAssignmentSelectedItem=undefined;
  }

  async routeAssignment(){
    log.i(TAG,this.app.state.selectedRadioGrpAssignment);
    let routeLocation = this.app.state.routeLocation;
    //istanbul ignore next
    let routeAssignmentStatus = this.app.state.routeAssignmentSelectedItem == undefined ? this.app.getDatasource("routeActions").item: this.app.state.routeAssignmentSelectedItem;
    this.app.state.routeAssignmentStatus = routeAssignmentStatus;
    //istanbul ignore else
    if(routeLocation){
      this.routeAssignmentWithAdditionalStep()
    }else if(routeAssignmentStatus){
      this.acceptWFAssignment(false,routeAssignmentStatus.ispositive);
    }
    //istanbul ignore next
    this.app.state.routeButtonAction = this.app.state.routeLocation == null ? this.app.state.routeAssignCancel : this.app.state.routeAssignReassign;
  }

  async acceptAssignment(){
    log.i(TAG,"Accept Bulk Assignment");
    this.acceptWFAssignment(true,true);
  }

  async rejectAssignment(){
    log.i(TAG,"Reject Bulk Assignment");
    this.acceptWFAssignment(true,false);
  }

  async acceptWFAssignment(bulkAction,accept) {
    let woSummary = this.app.state.woSummary;
    let wfAssignmentDS=this.app.state.workflowDS;
    let selectedItems = { ...this.app.state.selectedItems}
    log.i(TAG,"Bulk Assignment : " + bulkAction);
     //istanbul ignore else
    if(selectedItems != null){
      let wfSelectedItem = null;
      let bulkSelectedItems = new Array();
      for(var i in selectedItems){
        wfSelectedItem = { ...selectedItems[i]};
        bulkSelectedItems.push({ ...selectedItems[i]});
      }
      
      let action = 'completeAssignment';
      let option = null;

      if (bulkAction && bulkSelectedItems.length>0) {
        bulkSelectedItems.forEach(element => {
          element.accepted = accept;
          if(accept){
            element.memo=this.app.state.acceptComment;
          }else{
            element.memo=this.app.state.rejectComment;
          }
        });
        option = {
          parameters:bulkSelectedItems,
          responseProperties: 'instruction',
          headers: {
            'x-method-override': 'BULK'
          },
          responseHeaders: "location"
        };
      }else if(!bulkAction && wfSelectedItem != null){
        option = {
            record: wfSelectedItem,
            parameters: {
              memo: this.app.state.routeComment,
              accepted: accept
            },
            responseProperties: 'location',
            headers: {
              'x-method-override': 'PATCH'
            },
            responseHeaders: "location"
          };
        }
      try {
        this.saveDataSuccessful = true;
        log.i(TAG,wfAssignmentDS);
        let response = await wfAssignmentDS.invokeAction(action, option);
        //response parsed and populate 
        if(response.responseHeaders.location != undefined && response.nodetype ==='INPUT'){
          let actions = response.member;
          let actionDS = this.app.findDatasource('routeActions');
          actionDS.clearSelections();
          this.app.state.isNodetype = true;
          this.app.state.dialogTitle = "Select route";
          this.app.state.routeLocation=response.responseHeaders.location;
          this.app.state.dialogDescription=response.description;
          this.app.showDialog('routeAssignment');
          //istanbul ignore next
          if(actions != null){
              this.app.state.routeActions = actions;
              await actionDS.load({src:actions,noCache:true});
          }          
        }
        else{
          this.app.state.isNodetype = false;
          if(!woSummary){
            wfAssignmentDS.clearSelections();
            await wfAssignmentDS.forceReload();
          }else{
            let wosummaryDS = this.app.findDatasource("woDetailResource");
            await wosummaryDS.forceReload();
          }
          //istanbul ignore next
          if(this.saveDataSuccessful){
            this.app.toast(this.app.getLocalizedMessage('WOSUMMARY','success','Success!'),
             'success',
            this.app.getLocalizedMessage(
              'WOSUMMARY',
              'routeMessage',
              'The assignment was routed.'
            ));
        }

        }
      }catch (err) {
        // istanbul ignore next - debug logging
        // eslint-disable-next-line no-console
          log.e(TAG,'complete Assignment error' ,err);
        }
       finally {
      
      }
    }
  }

  async reassignAssignment(){
    log.i(TAG,"Reassign Assignment");
    let wfassignDS = this.app.state.workflowDS;
    let href = null;
    let selectedItems = { ...this.app.state.selectedItems};
    let wfSelectedItem = null;
    if(Object.keys(selectedItems).length > 1){
      log.i(TAG,"Reassign Bulk Assignment");
      let records = new Array();
      for(var i in selectedItems){
        wfSelectedItem = { ...selectedItems[i]};
        href = wfSelectedItem.href;
        records.push(this.requestPayload(href));
      }
      await wfassignDS.bulkAdd(records);
    }else{
      log.i(TAG,"Reassign Individual Assignment");
      await wfassignDS.put(this.requestPayload(selectedItems[0].href));
    }
    if(this.app.currentPage.name != "WOSummaryPage"){
      this.app.toast(this.app.getLocalizedMessage('WOSUMMARY','success','Success!'),
            'success',
            this.app.getLocalizedMessage(
              'WOSUMMARY',
              'reassignMessage',
              'The assignments were reassigned.'
            ));
      wfassignDS.clearSelections();
      await wfassignDS.forceReload();
    }else{
      let wosummaryDS = this.app.findDatasource("wosummaryWFAssignment");
      this.app.toast(this.app.getLocalizedMessage('WOSUMMARY','success','Success!'),
             'success',
            this.app.getLocalizedMessage(
              'WOSUMMARY',
              'reassignMessage',
              'The assignment was reassigned.'
            ));
      await wosummaryDS.forceReload();
    }
    //istanbul ignore next
    log.i(TAG,"REASSIGNED");
  }

  requestPayload(href){
    let record = {
      href: href,
      reassignwf: [{
        //istanbul ignore next
        assignee: this.app.state.workflowDS!=null ? this.app.state.workflowDS.item.personid:"",
        memo: this.app.state.reassignComment
      }]
    }
    return record;
  }

  // istanbul ignore next
  toggleAcceptRejectSelection(event) {
    this.app.state.selectedRadioGrpAssignment = event;
  }

  async routeAssignmentWithAdditionalStep() {
    let wfAssignmentDS=this.app.state.workflowDS;
    let woSummary  = this.app.state.woSummary;
    let requestPayload = {
      href: this.app.state.routeLocation,
      actionid : this.app.state.routeAssignmentStatus.actionid,
      memo: this.app.state.routeComment,
      headers: {
        'x-method-override': 'PATCH'
      }
    };
    let response = await wfAssignmentDS.put(requestPayload,{returnResponseOnly:true});
    let location =null;
    if(response.responseHeaders != undefined){
      location = response.responseHeaders.location;
    }else{
      location = this.app.state.routeLocation;
    }
    if(location && response.nodetype ==='INPUT'){
      let actions = response.member;
      let actionDS = this.app.findDatasource('routeActions');
      actionDS.clearSelections();
      this.app.state.isNodetype = true;
      this.app.state.dialogTitle = this.app.getLocalizedMessage(
        'WOSUMMARY',
        'routeAssignment',
        'Select route'
      );
      this.app.state.routeLocation=location;
      this.app.state.dialogDescription=response.description;
      this.app.showDialog('routeAssignment');
      //istanbul ignore else
      if(actions != null){
          this.app.state.routeActions = actions;
          await actionDS.load({src:actions,noCache:true});
      }      
    }
    else{
      this.app.state.isNodetype = false;
      this.app.state.routeLocation=null;
       //istanbul ignore if
      if(!woSummary){
        wfAssignmentDS.clearSelections();
        await wfAssignmentDS.forceReload();
      }else{
        let wosummaryDS = this.app.findDatasource("woDetailResource")
        await wosummaryDS.forceReload();
      }
    }
  }

  onDatasourceSelectionChanged(event) {
    if (event.datasource.name === 'personDS') {
      this.app.state.perLookupPrimaryButtonDisabled = !event.selected;
    }
  }

}

export default RouteWorkflowDialogController;

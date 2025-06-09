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

import { Dialog, JSONDataAdapter, Datasource} from '@maximo/maximo-js-api';
import RouteWorkflowDialogController from './RouteWorkflowDialogController';
import newTestStub from './test/AppTestStub';
import workorderitem from './test/workorder-json-data.js';
import actionDataList from  './test/action-json-data.js';
import woSummaryWorkassignitem from './test/wosummaryWFAssignment-json-data.js'
import workorderdetailitem from './test/workorder-detail-json-data.js';

function newWOSummaryWFAssignmentDatasource(data = woSummaryWorkassignitem, name = 'wosummaryWFAssignment' ) {
  const da = new JSONDataAdapter({
    src: woSummaryWorkassignitem,
    items: 'member',
    schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
    idAttribute: 'wonum',
    name: name
  });
  return ds;
}

function newWorkOrderSummaryDS(data = workorderdetailitem, name = 'woDetailResource' ) {
  const workOrderSummaryData = new JSONDataAdapter({
    src: workorderdetailitem,
    items: 'member',
    schema: 'responseInfo.schema'
  });

  const workorderSummaryds = new Datasource(workOrderSummaryData, {
    idAttribute: 'wonum',
    name: name
  });

  return workorderSummaryds;
}


it('Load Route dialog on Word Order list', async () => {
  let initializeApp = newTestStub({
    currentPage: 'wolist',
    datasources: {
      wolistDS: {
        data: workorderitem
      },
      wosummaryWFAssignment:{
        data:woSummaryWorkassignitem
      },
      woDetailResource: {
        data: workorderdetailitem
      },
      routeActions:{
        data:actionDataList
      }
    }
  });
  let app = await initializeApp();
  app.setCurrentPage('wolist');
  expect(app.currentPage.name).toBe('wolist');
  
  let workassignitemDS = await app.findDatasource('wolistDS');
  await workassignitemDS.load();
  let controller = app.currentPage.controllers[0].app.dialogs[0].controllers[0];
  expect(app.currentPage.controllers[0].app.name).toEqual('WOSUMMARY');  
  controller.dialogInitialized(app);
   
  app.state.routeActions = [];
  app.state.routeActions.push({"wfactionid":1272,"ownernodeid":3,"membernodeid":2,"instruction":"STOP 2","actionid":7,"ispositive":false});
  app.state.routeAssignmentSelectedItem = app.state.routeActions[0];
  app.state.routeActions.filter = function(){return app.state.routeActions[0];};
  controller.selectRouteAction('7');

  app.state.selectedRadioGrpAssignment = "0";
  app.state.routeLocation = null;
  controller.dialogOpened();

  app.state.routeLocation = "oslc/wf/mxapiwfassignment_72272";
  app.state.workflowDS = workassignitemDS;
  let response = {"nodetype":"INPUT","internalnodetype":"WFINPUT","member":[{"wfactionid":1268,"sequence":1,"ownernodeid":6,"membernodeid":4,"instruction":"FIN1","processname":"AK_ROUTE","actionid":3,"href":"null/0-1268","ispositive":true,"processrev":1},{"wfactionid":1269,"sequence":2,"ownernodeid":6,"membernodeid":5,"instruction":"FIN2","processname":"AK_ROUTE","actionid":4,"href":"null/1-1269","ispositive":true,"processrev":1}],"responseInfo":{"href":"oslc/os/mxapiwfassignment/_MjgyOC8zL0FLX1JPVVRFLzEvMjI2NA--?action=wsmethod%3AcompleteAssignment&interactive=1&lean=1&relativeuri=1&internalvalues=1","totalCount":2},"responseHeaders":{"location":"oslc/wf/mxapiwfassignment_72272"}};
  app.state.workflowDS.invokeAction = function() { return response;}  
  expect(response).not.toBeNull();  

  app.state.selectedItems= '{"0":{"app":"WOTRACK","ownerdescription":"Site BEDFORD, Work Order 1651","wfassignmentid":3216,"description":"FIRST TASK","ownerid":135545,"ownertable":"WORKORDER","startdate":"2022-08-29T09:14:17+00:00","assignstatus":"ACTIVE","assignstatus_description":null,"_rowstamp":"17131362","assignstatus_maxvalue":"ACTIVE","duedate":"2022-08-29T09:14:17+00:00","href":"oslc/os/mxapiwfassignment/_MjgyOC8zL0FLX1JPVVRFLzEvMjI2NA--","actions":[{"wfactionid":1272,"ownernodeid":3,"membernodeid":2,"instruction":"STOP 2","actionid":7,"ispositive":false,"_selected":false},{"wfactionid":1267,"ownernodeid":3,"membernodeid":6,"instruction":"IC","actionid":2,"ispositive":true,"_selected":false}],"_bulkid":"3216","dueDateFlag":-2067101905,"_selected":true}}';
  app.state.routeAssignmentSelectedItem = app.state.routeActions[0];
  controller.routeAssignment();

  controller.acceptAssignment();
  
  controller.rejectAssignment();

  app.state.workflowDS = workassignitemDS;
  app.state.woSummary = true;
  let responseNodetype = {"nodetype":"INPUT","internalnodetype":"WFINPUT","member":[{"wfactionid":1268,"sequence":1,"ownernodeid":6,"membernodeid":4,"instruction":"FIN1","processname":"AK_ROUTE","actionid":3,"href":"null/0-1268","ispositive":true,"processrev":1},{"wfactionid":1269,"sequence":2,"ownernodeid":6,"membernodeid":5,"instruction":"FIN2","processname":"AK_ROUTE","actionid":4,"href":"null/1-1269","ispositive":true,"processrev":1}],"responseInfo":{"href":"oslc/os/mxapiwfassignment/_MjgyOC8zL0FLX1JPVVRFLzEvMjI2NA--?action=wsmethod%3AcompleteAssignment&interactive=1&lean=1&relativeuri=1&internalvalues=1","totalCount":2},"responseHeaders":{"location":"oslc/wf/mxapiwfassignment_72272"}};
  app.state.workflowDS.invokeAction = function() { return responseNodetype;}  
  expect(responseNodetype).not.toBeNull();
  controller.routeAssignment();

  let responseAccept = {"nodetype":"INPUT1","internalnodetype":"WFINPUT","member":[{"wfactionid":1268,"sequence":1,"ownernodeid":6,"membernodeid":4,"instruction":"FIN1","processname":"AK_ROUTE","actionid":3,"href":"null/0-1268","ispositive":true,"processrev":1},{"wfactionid":1269,"sequence":2,"ownernodeid":6,"membernodeid":5,"instruction":"FIN2","processname":"AK_ROUTE","actionid":4,"href":"null/1-1269","ispositive":true,"processrev":1}],"responseInfo":{"href":"oslc/os/mxapiwfassignment/_MjgyOC8zL0FLX1JPVVRFLzEvMjI2NA--?action=wsmethod%3AcompleteAssignment&interactive=1&lean=1&relativeuri=1&internalvalues=1","totalCount":2},"responseHeaders":{"location":"oslc/wf/mxapiwfassignment_72272"}};
  app.state.workflowDS.invokeAction = function() { return responseAccept;}  
  expect(responseAccept).not.toBeNull();  
  app.state.selectedItems= '{"0":{"app":"WOTRACK","ownerdescription":"Site BEDFORD, Work Order 1651","wfassignmentid":3216,"description":"FIRST TASK","ownerid":135545,"ownertable":"WORKORDER","startdate":"2022-08-29T09:14:17+00:00","assignstatus":"ACTIVE","assignstatus_description":null,"_rowstamp":"17131362","assignstatus_maxvalue":"ACTIVE","duedate":"2022-08-29T09:14:17+00:00","href":"oslc/os/mxapiwfassignment/_MjgyOC8zL0FLX1JPVVRFLzEvMjI2NA--","actions":[{"wfactionid":1272,"ownernodeid":3,"membernodeid":2,"instruction":"STOP 2","actionid":7,"ispositive":false,"_selected":false},{"wfactionid":1267,"ownernodeid":3,"membernodeid":6,"instruction":"IC","actionid":2,"ispositive":true,"_selected":false}],"_bulkid":"3216","dueDateFlag":-2067101905,"_selected":true}}';
  app.state.isNodetype = false;
  app.saveDataSuccessful = true;
  app.state.woSummary= false;
  controller.acceptWFAssignment(false,true);
  app.state.woSummary= true;
  controller.acceptWFAssignment(false,true);

  let showDialog = jest.fn();
  app.showDialog = showDialog;

  const RouteAssignment = new Dialog({
		name: "routeAssignment",
	});
  app.currentPage.registerDialog(RouteAssignment);
  controller.routeAssignment();
	RouteAssignment.closeDialog = jest.fn();
  
  let wosummaryWFAssignmentDS = newWOSummaryWFAssignmentDatasource(woSummaryWorkassignitem, 'wosummaryWFAssignment');
  app.registerDatasource(wosummaryWFAssignmentDS);

  let woDetailResource = newWorkOrderSummaryDS(workorderdetailitem,'woDetailResource');
  app.registerDatasource(woDetailResource);
  await woDetailResource.load();

  app.state.selectedItems = '{"0":{"app":"WOTRACK","ownerdescription":"Site BEDFORD, Work Order 1651","wfassignmentid":3216,"description":"FIRST TASK","ownerid":135545,"ownertable":"WORKORDER","startdate":"2022-08-29T09:14:17+00:00","assignstatus":"ACTIVE","assignstatus_description":null,"_rowstamp":"17131362","assignstatus_maxvalue":"ACTIVE","duedate":"2022-08-29T09:14:17+00:00","href":"oslc/os/mxapiwfassignment/_MjgyOC8zL0FLX1JPVVRFLzEvMjI2NA--","actions":[{"wfactionid":1272,"ownernodeid":3,"membernodeid":2,"instruction":"STOP 2","actionid":7,"ispositive":false,"_selected":false},{"wfactionid":1267,"ownernodeid":3,"membernodeid":6,"instruction":"IC","actionid":2,"ispositive":true,"_selected":false}],"_bulkid":"3216","dueDateFlag":-2067101905,"_selected":true}}';
  app.currentPage.name = "WOSummaryPage";
  expect(app.currentPage.name).toBe('WOSummaryPage');
  controller.reassignAssignment();

  app.state.selectedItems = [];
  let href = "null/0-1268";
  app.state.selectedItems.push(href);
 
  await wosummaryWFAssignmentDS.load();
  app.currentPage.name = "Wolist";
  controller.reassignAssignment();

  controller.onDatasourceSelectionChanged({"datasource": {"name": 'personDS'},"selected":"true"});
  expect(app.state.perLookupPrimaryButtonDisabled).toBe(false);

  app.state.routeLocation = "oslc/wf/mxapiwfassignment_72272";
  let requestPayload = {
    href: app.state.routeLocation,
    actionid : app.state.routeAssignmentStatus.actionid,
    memo: app.state.routeComment,
    headers: {
      'x-method-override': 'PATCH'
    }
  };
  let responseNodetypeInput = {"nodetype":"INPUT","internalnodetype":"WFINPUT","member":[{"wfactionid":1268,"sequence":1,"ownernodeid":6,"membernodeid":4,"instruction":"FIN1","processname":"AK_ROUTE","actionid":3,"href":"null/0-1268","ispositive":true,"processrev":1},{"wfactionid":1269,"sequence":2,"ownernodeid":6,"membernodeid":5,"instruction":"FIN2","processname":"AK_ROUTE","actionid":4,"href":"null/1-1269","ispositive":true,"processrev":1}],"responseInfo":{"href":"oslc/os/mxapiwfassignment/_MjgyOC8zL0FLX1JPVVRFLzEvMjI2NA--?action=wsmethod%3AcompleteAssignment&interactive=1&lean=1&relativeuri=1&internalvalues=1","totalCount":2},"responseHeaders":{"location":"oslc/wf/mxapiwfassignment_72272"}};
  workassignitemDS.put = function(){return responseNodetypeInput};
  expect(responseNodetypeInput).not.toBeNull();
  workassignitemDS.clearSelections();
  workassignitemDS.forceReload();
  controller.routeAssignmentWithAdditionalStep();

  let responseNode = {"nodetype":"INPUT1","internalnodetype":"WFINPUT","member":[{"wfactionid":1268,"sequence":1,"ownernodeid":6,"membernodeid":4,"instruction":"FIN1","processname":"AK_ROUTE","actionid":3,"href":"null/0-1268","ispositive":true,"processrev":1},{"wfactionid":1269,"sequence":2,"ownernodeid":6,"membernodeid":5,"instruction":"FIN2","processname":"AK_ROUTE","actionid":4,"href":"null/1-1269","ispositive":true,"processrev":1}],"responseInfo":{"href":"oslc/os/mxapiwfassignment/_MjgyOC8zL0FLX1JPVVRFLzEvMjI2NA--?action=wsmethod%3AcompleteAssignment&interactive=1&lean=1&relativeuri=1&internalvalues=1","totalCount":2},"responseHeaders":{"location":"oslc/wf/mxapiwfassignment_72272"}};
  workassignitemDS.put = function(){return responseNode};
  expect(responseNode).not.toBeNull();
  controller.routeAssignmentWithAdditionalStep();

  app.state.workflowDS = {"item":{"personid":"SAM"}}
  expect(app.state.workflowDS.item.personid).toBe('SAM');
  controller.requestPayload(href)
  
});

export default RouteWorkflowDialogController;

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

import { AppSwitcher,log} from '@maximo/maximo-js-api';
import WorkOrderDialogController from './WorkOrderDialogController';
import { StatusWizardManager } from './StatusWizardManager';
import MapPreLoadAPI from "@maximo/map-component/build/ejs/framework/loaders/MapPreLoadAPI";
import "regenerator-runtime/runtime";
const TAG = "PageController";


//symbol for highlighting wo pin on map
let highlightSymbol = {
  url:
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzNweCIgaGVpZ2h0PSI2NXB4IiB2aWV3Qm94PSIwIDAgMzMgNjUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLXdvcmstb3JkZXJfYWN0aXZlX3NlbGVjdGVkPC90aXRsZT4KICAgIDxnIGlkPSJXb3JrLW9yZGVyLC1tYXAtdmlldy0odXBkYXRlZC1zMzMpIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTWFwLWljb25zLS0tc29saWQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjUuMDAwMDAwLCAtMjIwMS4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9InBpbi13b3JrLW9yZGVyX2FjdGl2ZV9zZWxlY3RlZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA5LjA1MDE4OSwgMjIwMS40OTk1MDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMiwwIEM0MC44MzY1NTYsMCA0OCw3LjE2MzQ0NCA0OCwxNiBMNDgsMzUgTDQ3Ljk4MTYxMzYsMzUuMDAwMjUzNSBDNDcuOTkxMTg3OSwzNS4xOTI0NDYxIDQ3Ljk5NzMzNjgsMzUuMzg1NTYxNyA0OCwzNS41Nzk1NDE1IEM0Ny45OTY0NzAxLDM4LjgyOTY4MDMgNDYuOTU5MjU0LDQxLjk5MDc3MjkgNDUuMDQzOTcyMiw0NC42MDc5ODMxIEw0NC44LDQ0LjkzMjI2ODggTDMyLDYzLjYzNzcyMzMgTDE5LjIsNDQuOTMyMjY4OCBDMTcuMTI4OTc1Myw0Mi4yNTQwNDI3IDE2LjAwMzY3NywzOC45NjUxMDI4IDE2LDM1LjU3OTU0MTUgQzE2LjAwMjY2MzIsMzUuMzg1NTYxNyAxNi4wMDg4MTIxLDM1LjE5MjQ0NjEgMTYuMDE4Mzg2NCwzNS4wMDAyNTM1IEwxNiwzNSBMMTYsMTYgQzE2LDcuMTYzNDQ0IDIzLjE2MzQ0NCwwIDMyLDAgWiIgaWQ9IlBhdGgiIGZpbGw9IiMwRjYyRkUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxnIGlkPSJyZWFkeSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYuMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNiwwIEMyNC44MzY1NTYsLTEuNjIzMjQ5ZS0xNSAzMiw3LjE2MzQ0NCAzMiwxNiBMMzIsMjIgTDMyLDIyIEwwLDIyIEwwLDE2IEMtMS4wODIxNjZlLTE1LDcuMTYzNDQ0IDcuMTYzNDQ0LDEuNjIzMjQ5ZS0xNSAxNiwwIFoiIGlkPSJSZWN0YW5nbGUtQ29weS0xOSIgZmlsbD0iIzBGNjJGRSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtQ29weS00IiBmaWxsPSIjRkZGRkZGIiBjeD0iMTYiIGN5PSIxMyIgcj0iNSI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3LjAwMDAwMCwgMjIuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikljb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMDAwMDAwLCA1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNy41NjI1LDEuMjQ5OTY0NTIgQzYuMzYzODg3NTQsMS4yNDU5MjEwMSA1LjE5MDQxOTUsMS41OTM2MTUyNCA0LjE4NzUsMi4yNSBMOC4xODc1LDYuMjUgQzguNDU2NjI2MjUsNi40Nzk2MjIzMSA4LjYyMTY2MDI0LDYuODA4MTY0MzUgOC42NDUxOTI4Nyw3LjE2MTE1MzgxIEM4LjY2ODcyNTUsNy41MTQxNDMyNiA4LjU0ODc2Mzc2LDcuODYxNjg1MDMgOC4zMTI1LDguMTI1IEM4LjA0OTE4NTAzLDguMzYxMjYzNzYgNy43MDE2NDMyNiw4LjQ4MTIyNTUgNy4zNDg2NTM4MSw4LjQ1NzY5Mjg3IEM2Ljk5NTY2NDM1LDguNDM0MTYwMjQgNi42NjcxMjIzMSw4LjI2OTEyNjI1IDYuNDM3NSw4IEwyLjMxMjUsNCBDMS41OTkzMDgxNyw1LjA0OTQ1OTQgMS4yMjgxODEwMyw2LjI5MzgyNjg2IDEuMjUsNy41NjI1IEMxLjI2MzcwMzMzLDExLjA0MzEwNTYgNC4wODE4OTQ0MiwxMy44NjEyOTY3IDcuNTYyNSwxMy44NzUgQzguMTA5NzMxNDMsMTMuODc3OTk0IDguNjU1MzMwMjEsMTMuODE1MDQwMyA5LjE4NzUsMTMuNjg3NSBMMTMuMzc1LDE3Ljg3NSBDMTQuNjAwMzgxOCwxOS4xMDAzODE4IDE2LjU4NzExODIsMTkuMTAwMzgxNyAxNy44MTI1LDE3Ljg3NSBDMTkuMDM3ODgxNywxNi42NDk2MTgyIDE5LjAzNzg4MTgsMTQuNjYyODgxOCAxNy44MTI1LDEzLjQzNzUgTDEzLjYyNSw5LjI1IEMxMy43NTI1NDAzLDguNzE3ODMwMjEgMTMuODE1NDk0LDguMTcyMjMxNDMgMTMuODEyNSw3LjYyNSBDMTMuODQ2MDg5OCw1Ljk0NTg0NjE0IDEzLjIwMjQ2ODIsNC4zMjM4MzE2IDEyLjAyNjcwNTQsMy4xMjQ1NTM1NiBDMTAuODUwOTQyNiwxLjkyNTI3NTUxIDkuMjQxOTg5NzYsMS4yNDk2NjQwNyA3LjU2MjUsMS4yNDk5NjQ1MiBaIE0xMi41NjI1LDcuNTYyNSBDMTIuNTYxNTgzMSw4LjAwNjYwODE4IDEyLjQ5ODQ3LDguNDQ4Mzk5NCAxMi4zNzUsOC44NzUgTDEyLjE4NzUsOS41NjI1IEwxMi42ODc1LDEwLjA2MjUgTDE2Ljg3NSwxNC4yNSBDMTcuMjM1NDM5MywxNC41OTEyMzQyIDE3LjQzODk3ODIsMTUuMDY2MTU4MyAxNy40Mzc1LDE1LjU2MjUgQzE3LjQ1MTc0MTEsMTYuMDYxMzU2NiAxNy4yNDYwNjI1LDE2LjU0MTI3MzUgMTYuODc1LDE2Ljg3NSBDMTYuNTMyOTAzOCwxNy4yMzQyMDEgMTYuMDU4NTM5NCwxNy40Mzc1IDE1LjU2MjUsMTcuNDM3NSBDMTUuMDY2NDYwNiwxNy40Mzc1IDE0LjU5MjA5NjIsMTcuMjM0MjAxIDE0LjI1LDE2Ljg3NSBMMTAuMDYyNSwxMi42ODc1IEw5LjU2MjUsMTIuMTg3NSBMOC44NzUsMTIuMzc1IEM4LjQ0ODM5OTQsMTIuNDk4NDcgOC4wMDY2MDgxOCwxMi41NjE1ODMxIDcuNTYyNSwxMi41NjI1IEM2LjIzNDQyMDU2LDEyLjU1ODgxMTMgNC45NTg3MjA5OCwxMi4wNDQwNTUzIDQsMTEuMTI1IEMzLjAxOTU2MjY3LDEwLjIwMjQ2MDUgMi40NzQ3MzQzNyw4LjkwODQ5MzM0IDIuNSw3LjU2MjUgQzIuNTAwODYxOTUsNy4wOTc4NTMxOSAyLjU2MzkyMiw2LjYzNTQxMjggMi42ODc1LDYuMTg3NSBMNS40Mzc1LDguOTM3NSBDNS45MDY4OTQ1Nyw5LjQ0ODI5NDM4IDYuNTYxNzM4MzIsOS43NDkyMTIxMyA3LjI1NTA1NjI5LDkuNzcyNzE0NDMgQzcuOTQ4Mzc0MjYsOS43OTYyMTY3MyA4LjYyMjA5MjU3LDkuNTQwMzM0OTkgOS4xMjUsOS4wNjI1IEM5LjYwMjgzNDk5LDguNTU5NTkyNTcgOS44NTg3MTY3Myw3Ljg4NTg3NDI2IDkuODM1MjE0NDMsNy4xOTI1NTYyOSBDOS44MTE3MTIxMyw2LjQ5OTIzODMyIDkuNTEwNzk0MzgsNS44NDQzOTQ1NyA5LDUuMzc1IEw2LjI1LDIuNjI1IEM2LjY1NDIxNTI0LDIuNDk3MTYwMjYgNy4wNzYwNjYyLDIuNDMzODgyNjEgNy41LDIuNDM3MzUzMjQgQzguODI4MDc5NDQsMi40NDExODg3IDEwLjEwMzc3OSwyLjk1NTk0NDY3IDExLjA2MjUsMy44NzUgQzEyLjAyMjEwNDQsNC44NjI5MjI5NSAxMi41NTk5OTg5LDYuMTg1MjQ2OTEgMTIuNTYyNSw3LjU2MjUgTDEyLjU2MjUsNy41NjI1IFoiIGlkPSJGaWxsIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=",
  color: "",
  offsetx: 15,
  offsety: 58,
  width: 36,
  height: 40,
  scale: 1,
};

//symbol for highlighting wo cluster on map
let highlightSymbolCluster = {
  url:
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDNweCIgaGVpZ2h0PSI0NXB4IiB2aWV3Qm94PSIwIDAgNDMgNDUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLWNsdXN0ZXJfc2VsZWN0ZWQ8L3RpdGxlPgogICAgPGcgaWQ9Ildvcmstb3JkZXIsLW1hcC12aWV3LSh1cGRhdGVkLXMzMykiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSI2Li1CYWRnZXMtKy1UYWdzL0xvY2F0aW9uLVBpbnMvMzJweC9kYXJrLUNvcHktNTEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMC45NDk4MTEsIC05LjUwMDUwMCkiPgogICAgICAgICAgICA8cGF0aCBkPSJNMzUuMDU5NzEyNiwxMCBMMzcuMjc5NDE0NCwxMC4wMDIxNzg0IEM0NS44ODIyODg0LDEwLjEwNDk2NjggNTIuODgxMjIwNywxNy4wNTM5MTYgNTMsMjUuNzA5NTM5NCBDNTIuOTk2NDc5NiwyOC45NTI0NDg1IDUxLjk3Mjc4NzYsMzIuMTA3NDM0OSA1MC4wODA5MTAyLDM0LjczMDA3OTggTDQ5Ljc3NSwzNS4xMzk2OTI5IEwzNi44NzUsNTQgTDMzLjQ4NTAyNzcsNDkuMDQ0NTc1NCBMNDEuNjgzMjQ2NSwzNy4wNTgxNjEgTDQxLjk0MjIyOTMsMzYuNzE1MDgxMSBDNDQuMjY2MjQ3NSwzMy41MjI0ODIxIDQ1LjUyNDQ1MDYsMjkuNjcxODI1NCA0NS41Mjg3NDgxLDI1LjcxMzEwMiBDNDUuNDM4ODUxNywxOS4xNDYwNTI5IDQxLjk0MjIyOTMsMTIuNzIwNDg1NCAzNS4wNTk3MTI2LDEwIFogTTQzLjI1LDI1LjcwOTUzOTQgQzQzLjI0NjQ3OTYsMjguOTUyNDQ4NSA0Mi4yMjI3ODc2LDMyLjEwNzQzNDkgNDAuMzMwOTEwMiwzNC43MzAwNzk4IEw0MC4wMjUsMzUuMTM5NjkyOSBMMjcuMTI1LDU0IEwxNC4yMjUsMzUuMTM5NjkyOSBDMTIuMTM3Nzk1NCwzMi40MzkyOTUyIDExLjAwMzcwNTcsMjkuMTIzMTI3OSAxMSwyNS43MDk1Mzk0IEMxMS4xMTg3NzkzLDE3LjA1MzkxNiAxOC4xMTc3MTE2LDEwLjEwNDk2NjggMjYuNzIwNTg1NiwxMC4wMDIxNzg0IEwyNy4xMjUsMTAuMDAyMzk0MSBDMzUuOTExODkyLDkuODg4MjI4ODMgNDMuMTI5MzY0OCwxNi45MTg2NzE5IDQzLjI1LDI1LjcwOTUzOTQgWiIgaWQ9IlNoYXBlIiBmaWxsPSIjMEY2MkZFIj48L3BhdGg+CiAgICAgICAgICAgIDxnIGlkPSJOdW1iZXItb3ItaWNvbj8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjAwMDAwMCwgMTAuMDAwMDAwKSI+PC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
  color: "",
  offsetx: 15,
  offsety: 58,
  width: 36,
  height: 40,
  scale: 1,
};

const POINT_PROPS = {
  color: '',
  offsetx: 12,
  offsety: 43,
  width: 36,
  height: 50
};
const LINE_PROPS = {
  color: 5,
  width: 5
};
const POLYGON_PROPS = {
  color: 5,
  width: 5,
  fillcolor: '#C0C0C0'
};
const SYMBOLOGY_PROPS = {
  point: POINT_PROPS,
  linestring: LINE_PROPS,
  polygon: POLYGON_PROPS,
  multilinestring: LINE_PROPS,
  multipolygon: POLYGON_PROPS
};
const roles = ['supervisor','amcrew', 'owner','ownergroup', 'lead','commoditygroup','commodity','crewworkgroup','persongroup','inspector'];

/* eslint-disable no-console */
class PageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
    this.reloadWorkOrderDetail=this.reloadWorkOrderDetail.bind(this);
    this.page.state.lastRefresh = this.app.dataFormatter.convertDatetoISO(new Date());
    this.page.state.dialogPrimaryButtonDisabled = true;
    this.page.state.selectedItemNameOfTable1 = '';
    this.page.state.selectedItemNameOfTable2 = '';
    this.page.state.selectedItemOfTable1 = undefined;
    this.page.state.selectedItemOfTable2 = undefined;
    this.page.state.currentSelectedItemOfTable1 = undefined;
    this.page.state.currentSelectedItemOfTable2 = undefined;
    this.page.state.editFieldLabel = 'Unspecified';
    this.page.state.updateStatusComment="";
    this.page.state.initiateWorkflowComment = "";    
    this.page.state.target_wonum = "";
    this.statusmngr = new StatusWizardManager(this.app,this.page);
    this.app.state.isSelectWorkflowDisable = true;
    this.app.on('embedded-app-changed',this.reloadWorkOrderDetail);
    this.initializedWOListFlag = false;
    this.page.state.woTaskCount = '';
    this.page.state.craftCrewCount = '';
    this.page.state.assignmentCount = '';
    this.app.state.classificationDS = "CLASSIFICATIONLOOKUP";
    this.configureMap();
    // istanbul ignore else
    if(this.page.name==='wolist'){
      let woAIResourceDS = this.app.findDatasource("woAIResourceDS");
      (async (woAIResourceDS) => {
        // istanbul ignore else
        if(woAIResourceDS) {
         await woAIResourceDS.initializeQbe();
         woAIResourceDS.clearQBE();
         woAIResourceDS.setQBE("workorderid", "=", 0);
         await woAIResourceDS.searchQBE(undefined, true);
        }
      })(woAIResourceDS);      
    }
  }

  configureMap() {
    try {
      this.mapPreloadAPI = new MapPreLoadAPI();
    } catch (error) {
      // istanbul ignore next
      log.t(TAG, error);
    }
    this.page.state.mapWorkorderListHeight = "35%";
    this.page.state.mapPaddingBottom = "calc(100vh - 9rem)";
  }

  /**
   * Initialize wolistDS with default where clause
   * @param {object} app 
   */
  async initializewoDS(app) {
      let wolistDS = app.findDatasource("wolistDS");
      // istanbul ignore else
      if(wolistDS) {
        await wolistDS.initializeQbe();
        wolistDS.setQBE('woclass', 'in', ['WORKORDER','ACTIVITY']);
        wolistDS.setQBE('historyflag', '=', 0);
        wolistDS.setQBE('istask', '=', 0);
        // istanbul ignore else
        if(app.client && app.client.userInfo && app.client.userInfo.insertSite) {
          wolistDS.setQBE('siteid', '=', app.client.userInfo.insertSite);
          log.i(TAG,"insertsite not set for user");
        }
        await wolistDS.searchQBE();
        this.app.state.wolistDS = wolistDS;
    }
  }

  pageResumed(page, app)  {

    //default summary panel when moving from WO list
    if(page.name === 'WOSummaryPage'){
      this.page.state.selected_wodpanel_Index=this.page.params.selected_wodpanel_Index?parseInt(this.page.params.selected_wodpanel_Index):0;
      if(this.app.state.editWoClickedFlag === true) {
        this.app.state.defaultSelection = "false";
        this.app.state.editWoClickedFlag = false;
      }else{
        this.app.state.defaultSelection = "true";
        // load the updated task when returning to WO Summary Page from task create/edit breadcrumb
        let woTaskDS = this.app.findDatasource("woTaskDS");
        woTaskDS.forceReload();
      }
    } else if(page.name === 'wolist') {
      this.app.state.defaultSelection = "false";
      this.app.state.editWoClickedFlag = false;
    }

    // istanbul ignore else
    if(page && page.name === 'wolist') {
      // istanbul ignore else
      if(!this.initializedWOListFlag) {
        this.initializedWOListFlag = true;
        this.initializewoDS(app);
      } else {
        let wolistDS = app.findDatasource("wolistDS");
        // istanbul ignore else
        if(wolistDS && wolistDS.state.hasData) {
          wolistDS.forceReload();
        }
    }
    }
  }

  
  reloadWorkOrderDetail(events){
    // istanbul ignore else
    if(events!=null && events.length>0){
      let workOrderSummaryDS = this.page.findDatasource("woDetailResource");
      workOrderSummaryDS.forceReload();
    }
  }

  onBeforeLoadData(ds,query) {
    // istanbul ignore else
    if(ds.name === 'wolistDS' && query.qbe && Object.keys(query.qbe).length === 0) {
      let siteid = '';
      // istanbul ignore else
      if(this.app.client && this.app.client.userInfo && this.app.client.userInfo.insertSite) {
        siteid=this.app.client.userInfo.insertSite;
      }
      query.qbe = {
        "woclass": [
            {
                "unparsedValue": "WORKORDER,ACTIVITY",
                "operator": "in",
                "subType": "UPPER",
                "value": [
                    "WORKORDER",
                    "ACTIVITY"
                ]
            }
        ],
        "historyflag": [
            {
                "unparsedValue": "=0",
                "operator": "=",
                "subType": "YORN",
                "value": "0"
            }
        ],
        "istask": [
            {
                "unparsedValue": "=0",
                "operator": "=",
                "subType": "YORN",
                "value": "0"
            }
        ],
        "siteid": [
            {
                "unparsedValue": "="+siteid,
                "operator": "=",
                "subType": "UPPER",
                "value": siteid
            }
        ]
      };
    }
  }

  onAfterLoadData(dataSource, items) { 
    //Get the status description(from allStatusDS) for a given status(from wostatushistoryDS)
    // istanbul ignore else
    if(this.app) {
      let wostatushistoryDS = this.app.findDatasource("wostatushistoryDS");
      let allStatusDS = this.app.findDatasource("allStatusDS");
      // istanbul ignore else
      if(this.app.state.wolistDS) {
        this.app.state.workorderid=this.app.state.wolistDS.item.workorderid;
      }
      // istanbul ignore if
      if(wostatushistoryDS && allStatusDS) {
        wostatushistoryDS.forEach(item => {
          // istanbul ignore else
          if(item.status) {
            var statusItem = '';
            let allStItems = allStatusDS.items;
            for(let i=0;i<allStItems.length;i++) {
              if(allStItems[i].value === item.status) {
                statusItem = allStItems[i];
                break;
              } 
            }
            //Add the status desc to our DS item.
            // istanbul ignore else
            if(statusItem) {
              item.status_description = statusItem.description;
            } else {
              item.status_description = "";
            }
          }
        });
      }
    }

    if(this.page && this.page.datasources && this.page.datasources.createWizardDS && dataSource && dataSource.name === "woDetailResource") {
      if(items && items.length > 0 && items[0]){
        this.processProgressWizard(items[0]); //Processing Bu Rules for Statuses
        this.app.state.wonum = items[0].wonum;
      } else {
        log.i(TAG,"items empty!");
      }
      log.i(TAG,"called processProgressWizard()");
    }

    // istanbul ignore else
    if(dataSource.name === "wpLaborDS"){
      this.loadWOLabor();
    }
    // istanbul ignore else
    if(dataSource.name === "wpTaskLaborDS"){
      this.loadTaskLabor();
    }
    // istanbul ignore else
    if(dataSource.name === "taskDetailResource"){
      const woResponsibility = Object.fromEntries(Object.entries(items[0]).filter(([key, values]) => roles.includes(key)));
      this.page.state.taskResponsibilityCount  = Object.keys(woResponsibility).length;
    }
    // istanbul ignore else
    if(dataSource.name === "woDetailResource"){
      let woResponsibility = Object.fromEntries(Object.entries(items[0]).filter(([key, values]) => roles.includes(key)));
      this.page.state.responsibilityCount  = Object.keys(woResponsibility).length;

      this.page.state.workorderid = items[0].workorderid;
      this.page.state.loadWOAIResourceDS = true;
      let woAIResourceDS = this.app.findDatasource("woAIResourceDS");
      (async (woAIResourceDS) => {
        // istanbul ignore else
        if(woAIResourceDS){
         await woAIResourceDS.initializeQbe();
         woAIResourceDS.clearQBE();
         woAIResourceDS.setQBE("workorderid", "=", items[0].workorderid);
        let myitems = await woAIResourceDS.searchQBE(undefined, true);
        // istanbul ignore else
        if(myitems && myitems.length > 0) {
          this.page.state.ai_usefortraining = myitems[0].ai_usefortraining;
        }
      }
      })(woAIResourceDS);
    }
  }

  /**
   * Process the data to populate progress wizard
   * @param {object} item object containing wo
   */
  async processProgressWizard(item) {
      log.i(TAG,"new StatusWizardManager()");
      let status_value = await this.statusmngr.execute(item);
      log.i(TAG,"this.statusmngr.execute()");
      await this.statusmngr.populateProgressWizard(status_value, item);
  }

  /**
   * Called when user clicks on the step
   * @param {string} id of the progress wizard
   */  
  onSetProgressWizardStep(id) {
    log.i(TAG,"Current step id ondialog="+this.page.state.progress_wizard_current_step_id);
    let woitem = this.statusmngr.getSelectedWoItem();
    // istanbul ignore else
    if(woitem && woitem.wonum) {
      this.openWOItemDialog(woitem);
    } else {
      log.e(TAG,"Wo item not found inside onSetProgressWizardStep:"+woitem);
    }
  }

  //Handler for click on a link
  async loadApp(args = {}) {
    let appName = args.appName ? args.appName : undefined;
    if (!appName) {
      appName = 'wotrack';
    }
    let options = args.options ? args.options : {};
    let context = args.context ? args.context : {};
    let switcher = AppSwitcher.get();
    await switcher.gotoApplication(appName, context, options);
  }

  async openItemDialog(selectDialog,item,woSummary){
    this.app.state.workflowDS = this.app.findDatasource("wflistDS");
    this.app.state.woSummary=woSummary;
    this.app.state.personDS = this.app.findDatasource("personDS");
    let wfSelectedItems =  null;
    if(selectDialog==="Route")
    {
      if(this.app.currentPage.name === "WOSummaryPage"){
        let items = [];
        items.push(item);
        this.app.state.selectedItems = items;
        wfSelectedItems=item;
      }else{
        wfSelectedItems = { ...this.app.state.workflowDS.getSelectedItems()[0]};
      }
      let memos = wfSelectedItems.memos;
      let memoDS = this.app.findDatasource("earlierMemos");
      memoDS.clearSelections();
      if(memos != null){
        this.app.state.hideEarlierMemo=false;
        this.app.state.earlierMemos = memos;
        await memoDS.load({src: memos, noCache: true});
      }else{
        this.app.state.hideEarlierMemo=true;
      }
      //Action routes 
      let actions = wfSelectedItems.actions;
      let actionDS = this.app.findDatasource('routeActions');
      if(actions != null){
        actionDS.clearSelections();
        this.app.state.routeActions = actions;
        await actionDS.load({src:actions,noCache:true});
      }
      let description = wfSelectedItems.description;
      // istanbul ignore else
      if(description != null){
        this.app.state.routeLocation=null;
        this.app.state.dialogDescription = wfSelectedItems.description;
        this.app.state.dialogTitle = this.app.getLocalizedMessage(
          'WOSUMMARY',
          'routeAssignment',
          'Route assignment'
        ) ;
      }
      this.app.state.routeAssignCancel = this.app.getLocalizedMessage(
        'WOSUMMARY',
        'routeAssignment',
        'Cancel'
      );
      this.app.state.routeAssignReassign = this.app.getLocalizedMessage(
        'WOSUMMARY',
        'routeAssignment',
        'Reassign'
      ) ;
      this.app.state.routeButtonAction = this.app.state.routeAssignReassign;
      this.app.showDialog('routeAssignment');
    }else if(selectDialog === "Reassign" 
        || (selectDialog=== "routeAssignment" && this.app.state.routeLocation == null )){
      this.app.showDialog("reassignItem");
    }
  }

  openChangeOwnerDialog(item) {
    this.app.state.selectedTabIndex = 0;
    let dsChangeOwner = this.app.findDatasource("personDS");
    let dsChangeOwnerGroup = this.app.findDatasource("personGroupDS");
    this.app.state.workOrderDS= this.app.findDatasource("wolistDS");
    this.app.state.workOrderSummaryDS = this.page.findDatasource("woDetailResource");
    this.app.state.selectedItems = this.app.state.workOrderDS.getSelectedItems();
    //WO summary
    if(item!=='changeOwner'){
      this.app.state.selectedItems.push(item);
      this.app.state.selectedItems[0].allowedstates = this.app.state.workOrderDS.item.allowedstates;
    }
    this.app.state.personDS = dsChangeOwner;
    this.app.state.personGroupDS = dsChangeOwnerGroup;
    dsChangeOwner.clearSelections();
    dsChangeOwnerGroup.clearSelections();
    this.app.state.currentSelectedItemOfTable1 = this.app.state.selectedItemOfTable1;
    this.app.state.currentSelectedItemOfTable2 = this.app.state.selectedItemOfTable2;
    this.app.state.dialogPrimaryButtonDisabled = true;
    this.app.showDialog('show_SelectOwnerDialog');
  }

  async onCancelUpdateStatus() {
    log.i(TAG,"Current step id oncancel="+this.page.state.progress_wizard_current_step_id);
    this.page.state.progress_wizard_current_step_id = String(0);
    let item = this.statusmngr.getSelectedWoItem();
    this.statusmngr.pwutil.setCurrentStatus(item.status);
    // istanbul ignore next
    log.i(TAG,"Current step id oncancel="+this.page.state.progress_wizard_current_step_id);
  }

  async openWOItemDialog(item){
      this.app.state.updateStatusComment = "";      
      this.app.state.updateStatusDate = this.app.dataFormatter.convertDatetoISO(new Date().toISOString());
      this.app.state.workOrderDS = this.app.findDatasource("wolistDS");
      this.app.state.workOrderSummaryDS = this.page.findDatasource("woDetailResource");
      this.app.state.selectedItems = this.app.state.workOrderDS.getSelectedItems();
      this.app.state.dialogIsBusy = false;
      //WO summary
      // istanbul ignore else
      if(this.app.state.selectedItems.length===0){
        this.app.state.selectedItems.push(item);
        this.app.state.selectedItems[0].allowedstates = item.allowedstates;
      }
           
      let wfSelectedItems = this.app.state.workOrderDS.getSelectedItems().length === 0 ? item : { ...this.app.state.workOrderDS.getSelectedItems()[0]};
      this.app.state.wfSelectedItems = wfSelectedItems.allowedstates === undefined? wfSelectedItems.allowedstates = item.allowedstates: wfSelectedItems;
      log.t("Allowed States",wfSelectedItems.allowedstates);
      /*Allowedstates*/
      let wostatus = this.computedStates(wfSelectedItems);
      let wostatusDS = this.app.findDatasource("statusDS");
      let allStatusDS = this.app.findDatasource("allStatusDS");
      wostatusDS.clearSelections();
      if(wostatus.length){
        this.app.state.hideEarlierStatusMemo=false;
        this.app.state.wostatus = wostatus;
        if(this.app.state.workOrderDS.getSelectedItems().length>1 && this.app.currentPage.name !== "WOSummaryPage"){
          //IF Bulk WO is selected then fetch WO Status from allStatusDS
          wostatus = this.computedBulkStatus(allStatusDS.items);
        }
      }else{
          this.app.state.hideEarlierStatusMemo=true;
      }
      await wostatusDS.load({src: wostatus, noCache: true});
      let memos = wfSelectedItems.wostatus;
      let memoDS = this.app.findDatasource("earlierStatusMemos");
      memoDS.clearSelections();
      if(memos != null){
        this.app.state.hideEarlierCommentMemo=false;
        this.app.state.earlierMemos = memos;
        await memoDS.load({src: memos, noCache: true});
      }else{
        this.app.state.hideEarlierCommentMemo=true;
      }
      this.app.state.isStatusdisabled = true;  
      this.app.showDialog('updateStatus');
  }

  computedStates(event){
    let statusArr= [];
    // istanbul ignore else
    if (event.allowedstates && this.app) {
      Object.entries(event.allowedstates).forEach(([key, value]) => {
          value.forEach((statValue) => {
            // istanbul ignore else
            if (this.validateWoStates(statValue)){
              let description =  statValue.value +" ("+ statValue.description +")";
              statusArr.push({
              defaults:statValue.defaults,
              description: description,  
              maxvalue: statValue.maxvalue,
              orgid:statValue.orgid,
              siteid:statValue.siteid,
              value: statValue.value,
              valueid: statValue.valueid
            });
          }
          });
      });  
    }
    return statusArr;
  }

  async computedBulkStatus(items){
    let statusArr= [];
    items.forEach(function(item) {
      let description =  item.maxvalue +" ("+ item.description +")";
      statusArr.push({
        defaults:item.defaults,
        description: description,  
        maxvalue: item.maxvalue,
        orgid:item.orgid,
        siteid:item.siteid,
        value: item.value,
        valueid: item.valueid              
      });     
    });
    return statusArr;
  }

    /*
   * validate workorder status with respect to sigoption.
   */
    validateWoStates(statusobj){
      let validWoStatus = true;      
      Object.entries(JSON.parse(this.app.state.woStatSigOptions)).forEach(([key, value]) =>{
        // istanbul ignore else
        if(value === statusobj.maxvalue){       
          validWoStatus = this.app.checkSigOption(`MXAPIWODETAIL.${key}`)? true :false ;
        }else{
          log.t("comparison failed");
        }
      });
      return validWoStatus;
    }

    async openStartWorkflowDialog(selectedItem,workflowProcessList) {
      this.app.state.initiateWorkflowComment = "";
      this.app.state.workOrderDS= this.app.findDatasource("wolistDS");
      this.app.state.processDS= this.app.findDatasource("processDS");
      this.app.state.woSummary=false;
      if(this.app.currentPage.name !== "WOSummaryPage"){
        this.app.state.selectedItems = this.app.state.workOrderDS.getSelectedItems();
      }else{
        let items = [];
        items.push(selectedItem);
        this.app.state.selectedItems = items;
        this.app.state.woSummary=true;
      }
      let woDS = this.app.state.workOrderDS;
      let processDS = this.app.state.processDS;
      let selectedItems = this.app.state.selectedItems;
      let itemURL = "";
      if(selectedItems.length>1){
        itemURL = '/oslc/os/mxapiwodetail/zombie/initiateworkflow/0/getlist~processname?oslc.select=*';
      }else{
        itemURL = selectedItems[0].href+'/initiateworkflow/0/getlist~processname?oslc.select=*'
      }
      processDS.clearSelections();
      // istanbul ignore next
      let wfProcess = workflowProcessList!=null && workflowProcessList.length>0 ?workflowProcessList:await processDS.load({noCache:true, itemUrl: itemURL});
      log.t(wfProcess);
      if(wfProcess.length === 1){
        const woController = new WorkOrderDialogController();
        let saveWOProcess = {
          parent:this.page,
          woDS : woDS,
          woItem:selectedItems,
          selectedWorkflow:wfProcess[0].processname,
          woSummary:this.app.state.woSummary
        };
        woController.initiateWorkflow(saveWOProcess);
        this.app.state.workflowInitiated=true;
      }
      if(wfProcess.length>1){
        this.app.state.selectedWorkflow = processDS.currentItem.selectedWorkflow;
        this.app.showDialog('startWorkflow', {parent: this.page});
        this.app.state.workflowDialogOpened=true;
      }
    }

    async openWOSummary(item){
        const workOrderDetailDS = this.app.findDatasource("woDetailResource");
        let wonum = item.relatedreckey;
        let query = {dependentId: wonum};
        this.page.state.selected_wodpanel_Index='0';
        await workOrderDetailDS.load(query, true);
    }

    async openWOSummaryDialog(woitem){
      this.openItemDialog(woitem.dialog,woitem.item,true);
    }

/**
   * Returns the pages in the pack stack.
   * @returns {Array<Page>} Array of Page objects in the page stack.
   */
 getPageStack(stack,refpage) {
  // istanbul ignore else
  if(stack != null && refpage != null) {
    let wolistpagename = 'wolist';
    let summarypagename = 'WOSummaryPage';
    let page = this.app.findPage(wolistpagename);
    let sumPage = this.app.findPage(summarypagename);
    let workordermsg = this.app.state.dialogTitle = this.app.getLocalizedMessage(
      'WOSUMMARY',
      'workorders',
      'Work orders'
    );
    // istanbul ignore else
    if(page) {
      refpage.dynamicPageTitleUpdate(page, workordermsg);
    }

    if(stack[stack.length-1] === 'LongDescription' || stack[stack.length-1] === 'CommunicationLog'){
      let longdescriptionpagemsg = this.app.getLocalizedMessage(
        'WOSUMMARY',
        'wo_summary_msg',
        'Work order',
        [this.app.state.wonum]
        );

      refpage.dynamicPageTitleUpdate(sumPage, longdescriptionpagemsg);
      return;
    }

    let index = stack.indexOf(wolistpagename);
    // istanbul ignore else
    if (index > -1) {
      stack.splice(index, 1);
    }
    let currpage = stack.pop();
    stack.push(wolistpagename);
    stack.push(currpage);
  }
 }

 async openWorklogComment(woitem){
  this.app.state.worklogComment = "";
  this.app.state.woWorklogDs= this.app.findDatasource("woWorklogDs");
  this.app.state.woWorklogDs.item.description="";
  this.app.state.isViewable=false;
  this.app.showDialog("addWorklogComment");
}

/**
 * API to open Follow up work order page from WO Summary Page
 * @param {*} event 
 */
 async createFollowupWorkOrder(event){
  this.app.state.classificationDS = "CLASSIFICATIONLOOKUP";
  let woSummaryPage = this.app.findPage('WOSummaryPage');
  let woDetailResource = woSummaryPage.datasources['woDetailResource'];
  let woDetail = woSummaryPage.datasources['woDetailResource'].item;
  let option = {
    record:woDetail,
    parameters: {},
  };
  let wonum = null;
  try {
    let response = await woDetailResource.invokeAction("createFollowUp", option);
    // istanbul ignore else
    if (response) {
      wonum = response.wonum;
      log.t("Followup WO Updated Successfully : " + wonum);
      this.app.toast('Success!',
        'success',
        this.app.getLocalizedLabel(
          'relatedwo_created_msg',
        'Follow-up work order {0} was created',
        [wonum]
      )
      );
    }
  } catch (error){
  } finally {
  }
  this.app.state.followupWONum=wonum;
  this.app.state.hideLongDescription=false;
  this.app.state.editWO=false;
  let headerTitle = this.app.getLocalizedLabel(
    'followup_work_order',
    'Follow-up work order {0}',
    [wonum]
  );
  this.app.state.headerTitle=headerTitle;
  this.reloadParentWODS();
  this.app.setCurrentPage({ name: 'FollowupWorkOrder', params: { href: event.item.href }});
}

/**
 * API to open Follow up work order page from WO Summary Page
 * @param {*} event
 */
 async openEditWorkOrder(event){
  this.app.state.classificationDS = "CLASSIFICATIONLOOKUP";
  this.app.state.followupWONum=event.item.wonum;
  this.app.state.hideLongDescription=false;
  this.app.state.editWO=true;
  this.app.state.editWoClickedFlag=true;
  let headerTitle = this.app.getLocalizedLabel(
    'edit_work_order',
    'Edit work order {0}',
    [event.item.wonum]
  );
  this.app.state.headerTitle=headerTitle;
  this.app.setCurrentPage({ name: 'FollowupWorkOrder', params: { href: event.item.href }});
  this.reloadParentWODS();
}

async reloadParentWODS(){
/**
   * If Followup WO is created and edited.
   * Then Followup WO details are edited. In order to 
   * edit Parent WO details ParentWO need to be force reloaded
   */
  let parentWODS = this.app.findDatasource('parentWODS');
  // istanbul ignore else
  if(parentWODS){
    await parentWODS.forceReload();
  }
}

async selectMenuItem(item){
  this.page.state.selected_wodpanel_Index = item;
  this.page.state.selected_tab_WOHistory = item;
  this.page.params.selected_wodpanel_Index=item;
  this.app.state.defaultSelection = "false";
   // istanbul ignore else
  if(item === "1"){
    let woSummaryPage = this.app.findPage('WOSummaryPage');
    let woTaskDS = woSummaryPage.datasources['woTaskDS'];
    let tasks = await woTaskDS.load();
    let completedTasks = tasks.filter(element => element.status === "COMP");
    this.page.state.woTaskCount = completedTasks.length + '/' + tasks.length ;
  }
  this.page.state.displayTaskSummary=false;
}

loadLongDescription(longdescription){
  this.app.state.longDescription=longdescription.longdescription;
  this.app.state.wonum=longdescription.wonum;
  this.app.setCurrentPage({ name: 'LongDescription'});
}

/**
 * API to open Task Long description Page
 * @param {*} longdescription
 */
taskLongDescription(longdescription){
  this.app.state.displayTaskLongDescription=longdescription.longdescription;
  this.page.params.workorderid=longdescription.workorderid;
  this.app.setCurrentPage({ name: 'TaskLongDescription'});
}

/**
 * API to open Work order summary
 * @param {*}
 */
goBackToSummary(wopanelindex=0){
  this.app.setCurrentPage({name: 'WOSummaryPage',params: { selected_wodpanel_Index : wopanelindex}});
}

/**
 * API to open CommunicationLog Page to show complete message and attachment
 * @param {*} commlog
 */
async loadCommunicationLog(commlog){
  this.app.state.commlogSubject=commlog.item.subject;
  this.app.state.commlogMessage=commlog.item.message;
  this.app.state.wonum=commlog.wonum;
  let woCommlogDs = this.app.findDatasource("woCommlogDs");
  let wocommlogAttachDS = woCommlogDs.getChildDatasource("doclinks",commlog.item);
  // istanbul ignore if
  if(wocommlogAttachDS!=null){
    await wocommlogAttachDS.load();
  }
  this.app.setCurrentPage({name: 'CommunicationLog',params: {wocommlogAttachDS:wocommlogAttachDS}});
}

  /**
   * Function to load card view of a selected work order on map-overlay
   */
  /**async handleMapPage(event) {
    let womapPage = this.app.findPage('womap');
    //istanbul ignore else
    if (womapPage) {
      womapPage.state.selectedSwitch = 1;
      womapPage.state.mapOriginPage = 'wolist';
      womapPage.state.previousPage = 'wolist';
      this.app.setCurrentPage(womapPage);
      womapPage.callController('openWOCard', event);
    }
  }**/

  /**
   * Called when map is initialized
   */
  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  onMapInitialized(map) {
    this.app.map = map;
  }
  
  // ignoring as for map openlayers cannot be emulated
  // istanbul ignore next
  openMap(event) {
  if (this.app.map) {
    this.handleItemClick(event.item);
  }

}

  /**
   * Filters datalist on the basis of pin/cluster being clicked
   * @param {*} item item record (wo record) for the pin/cluster being clicked
   */
  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  async handleMapClick(item) {
    let maximoAttributes;
    let datasource = this.app.findDatasource(this.page.state.selectedDS);
    if (
      item.hasFeature &&
      item.featuresAndLayers &&
      item.featuresAndLayers.length > 0
    ) {
        const layer = item.featuresAndLayers[0].layer;
      if (
        item.featuresAndLayers[0].feature.values_.features &&
        item.featuresAndLayers[0].feature.values_.features.length > 1
      ) {
        let featureCluster = item.featuresAndLayers[0].feature;
        let styleCluster = this.app.map.getNewStyle(highlightSymbolCluster);
        this.app.map.changeFeatureStyle(featureCluster, styleCluster, {
                layer: item.featuresAndLayers[0].layer,
        });

        let wonums = [];
        let features = featureCluster.values_.features;
        maximoAttributes = features[0].get("maximoAttributes");
        let layerds = item.featuresAndLayers[0].layer.get('datasource');
        if (layerds) {
          for (let i = 0; i < features.length; i++) {
            wonums.push(features[i].get("maximoAttributes").wonum);
          }
          await datasource.initializeQbe();
          datasource.setQBE("wonum", "in", wonums);
          datasource.setQBE("siteid", "=", maximoAttributes.siteid);
          await datasource.searchQBE(undefined, true);
        } else {
          datasource.clearQBE();
          await datasource.searchQBE(undefined, true);
        }
      } else {
        const isMarkerLayer = layer.get('isMarkerLayer');
        let feature = item.featuresAndLayers[0].feature;

        let style = this.app.map.getNewStyle(highlightSymbol);
        this.app.map.changeFeatureStyle(feature, style, {
          autoRestoreOnZoom: false,
                layer: item.featuresAndLayers[0].layer,
        });
        if (
          (feature.values_ &&
          feature.values_.features &&
          feature.values_.features.length > 0) || isMarkerLayer
        ) {
          const singleFeature = isMarkerLayer
          ? feature
          : feature.get('features')[0];
          if (
            datasource.lastQuery.qbe &&
            JSON.stringify(datasource.lastQuery.qbe) !== "{}"
          ) {
            datasource.clearQBE();
            await datasource.searchQBE(undefined, true);
          } else {        
            maximoAttributes = singleFeature.get(
              "maximoAttributes"
            );
            datasource.setQBE('wonum', '=', maximoAttributes.wonum);
            datasource.searchQBE();  
          }
        }
      }
    } else {
      this.page.state.showMapOverlay = 0;
      this.app.map.clearFeatureStyle();
      datasource.clearQBE();
      await datasource.searchQBE(undefined, true);
      await this.resetDatasource();
    }
  }

  
  // istanbul ignore next
  async resetDatasource() {
    let datasource =  this.app.findDatasource(this.page.state.selectedDS);
    await datasource.reset(datasource.baseQuery);
  }
  /**
   * Highlights the pin on map for the record which was clicked in datalist
   * @param {*} item record for the item which was clicked in datalist
   */
  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  handleItemClick(item) {
    if(!item.autolocate) {
      return;
    }
    let itemGeometry = this.app.map.parseGeometry(item.autolocate);
    let center = this.app.map.getGeometryCenter(itemGeometry);
    let centerCoordinates = center.getCoordinates();
    let itemSpatialReference = this.app.map.getLayerSpatialReference(
      "WORKORDER"
    );
    let basemapSpatialReference = this.app.map.getBasemapSpatialReference();
    if (itemSpatialReference !== basemapSpatialReference) {
      centerCoordinates = this.app.map.convertCoordinates(
        centerCoordinates,
        itemSpatialReference,
        basemapSpatialReference
      );
    }
    let feature = this.app.map.getFeatureByGeo({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: centerCoordinates
      }
    }, "geojson");
    let style = this.app.map.getNewStyle(highlightSymbol);
    if (feature.featuresAndLayers.length > 0) {
      this.app.map.changeFeatureStyle(
        feature.featuresAndLayers[0].feature,
        style,
        { autoRestoreOnZoom: false }
      );
      this.app.map.centerTo(
        centerCoordinates[0],
        centerCoordinates[1],
        false
      );
    }
  }

    /**
   * Change the symbol of feature depending on its data
   * (defines how the pins will show on map)
   */
    createWOSymbology(params) {
      const legends = params.legends;
      let features = params.features;
      let legend = {};
      let geometryType;
      // Is a Cluster
      if (features.length > 1) {
          legend = legends['Cluster'];
          geometryType = 'point';
      } else {
          // Just a single feature
          const feature = features[0];
          let maximoAttributes = feature.get('maximoAttributes');
          let status = maximoAttributes.uxsynonymdomain?.valueid;
          geometryType = feature
              .get('geometry')
              .constructor.name.toLowerCase();
          // istanbul ignore else
          if (geometryType === 'point') {
            if (status && status.toUpperCase() === 'WOSTATUS|INPRG') {
              legend = legends['INPRG'];
            } else if (status && status.toUpperCase() === 'WOSTATUS|APPR') {
              legend = legends['APPR'];
            } else if (status && (status.toUpperCase() === 'WOSTATUS|CAN' || status.toUpperCase() === 'WOSTATUS|CLOSE' || status.toUpperCase() === 'WOSTATUS|COMP')) {
              legend = legends['COMP'];
            } else if (status && (status.toUpperCase() === 'WOSTATUS|WAPPR' || status.toUpperCase() === 'WOSTATUS|WMATL' || status.toUpperCase() === 'WOSTATUS|WPCOND')) {
              legend = legends['Wait'];
            } else {
              legend = legends['Others'];
            }
          }
      }
      const symbologyProps = SYMBOLOGY_PROPS[geometryType];
      let symbol = Object.assign({}, legend);
  
      // istanbul ignore else
      if (symbologyProps) {
          symbologyProps.type = geometryType;
          symbol = Object.assign(legend, symbologyProps);
      }
  
      return symbol;
    }

   /**
   * Returns legends for the symbols/pins being used to display workorders on the map
   * urls here are used to define ui for pin/cluster on map
   */
  retrieveWOLegends(app) {
    const legends = {
      Cluster: {
        label: this.app.getLocalizedLabel('cluster', 'Cluster'),
        url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzNweCIgaGVpZ2h0PSIzNHB4IiB2aWV3Qm94PSIwIDAgMzMgMzQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLWNsdXN0ZXI8L3RpdGxlPgogICAgPGcgaWQ9Ildvcmstb3JkZXIsLW1hcC12aWV3LSh1cGRhdGVkLXMzMykiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJwaW4tY2x1c3RlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5Ljk0OTgxMSwgLTE0LjUwMDUwMCkiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDAuMTM3NDYwNiwxNSBMNDAuMzAwOTU5NSwxNS4wMDE2MjA0IEM0Ni43MDMwOTgzLDE1LjA3ODA3ODcgNTEuOTExNjA2MSwyMC4yNDY5OTk5IDUyLDI2LjY4NTQxNzIgQzUxLjk5NzM4MDEsMjkuMDk3NjI5NiA1MS4yMzU1NjI5LDMxLjQ0NDQ0MTQgNDkuODI3NjU0MSwzMy4zOTUyNzUxIEw0OS42LDMzLjY5OTk2MjYgTDQwLDQ3LjcyOTA1MzUgTDM3LjQ3NzIyOTksNDQuMDQzIEw0My41NzgyMjk5LDM1LjEyNyBMNDMuNzcwOTYxMywzNC44NzE4MDI3IEM0NS41MDA0NjMzLDMyLjQ5NzAxMzEgNDYuNDM2ODAwNCwyOS42MzI3MzI1IDQ2LjQzOTk5ODYsMjYuNjg4MDY3MiBDNDYuMzczMDk5LDIxLjgwMzIxOTQgNDMuODg0NTg2OCwxNy41MzI1NTg3IDQwLjEzNzQ2MDYsMTUgWiBNNDQsMjYuNjg1NDE3MiBDNDMuOTk3MzgwMSwyOS4wOTc2Mjk2IDQzLjIzNTU2MjksMzEuNDQ0NDQxNCA0MS44Mjc2NTQxLDMzLjM5NTI3NTEgTDQxLjYsMzMuNjk5OTYyNiBMMzIsNDcuNzI5MDUzNSBMMjIuNCwzMy42OTk5NjI2IEMyMC44NDY3MzE1LDMxLjY5MTI5MzEgMjAuMDAyNzU3NywyOS4yMjQ1ODgxIDIwLDI2LjY4NTQxNzIgQzIwLjA4ODM5MzksMjAuMjQ2OTk5OSAyNS4yOTY5MDE3LDE1LjA3ODA3ODcgMzEuNjk5MDQwNSwxNS4wMDE2MjA0IEwzMiwxNS4wMDE3ODA4IEMzOC41MzkwODI0LDE0LjkxNjg1OTkgNDMuOTEwMjI1LDIwLjE0NjM5OTYgNDQsMjYuNjg1NDE3MiBaIiBpZD0iU2hhcGUiIGZpbGw9IiMzOTM5MzkiPjwvcGF0aD4KICAgICAgICAgICAgPGcgaWQ9Ik51bWJlci1vci1pY29uPyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjEuNTAwMDAwLCAxNy4wMDAwMDApIj48L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=',
        offsetx: 12,
        offsety: 43,
        width: 33,
        height: 34,
        scale: 1
      },
      INPRG: {
        label: this.app.getLocalizedLabel('inprogress', 'In Progress'),
        url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgMjQgNTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLXdvcmstb3JkZXJfYWN0aXZlPC90aXRsZT4KICAgIDxnIGlkPSJXb3JrLW9yZGVyLC1tYXAtdmlldy0odXBkYXRlZC1zMzMpIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTWFwLWljb25zLS0tc29saWQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjkuMDAwMDAwLCAtMTg3OC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9InBpbi13b3JrLW9yZGVyX2FjdGl2ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA5LjAwMDAwMCwgMTg3MC40OTk1MDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMiw4IEMzOC42Mjc0MTcsOCA0NCwxMy4zNzI1ODMgNDQsMjAgTDQ0LDM2IEM0My45Mjk5NTQyLDM4LjMwMDIyNjcgNDMuMTc0ODk4OSw0MC41MjcwODQgNDEuODI5NjU1Nyw0Mi4zOTIyNDA3IEw0MS42LDQyLjY5OTcwMTYgTDMyLDU2LjcyODc5MjUgTDIyLjQsNDIuNjk5NzAxNiBDMjAuOTI0Mzk0OSw0MC43OTE0NjU1IDIwLjA4ODkyODQsMzguNDY5ODUyNSAyMC4wMDY3MDYzLDM2LjA2NTQ0MDEgTDIwLjAwNSwzNiBMMjAsMzYgTDIwLDIwIEMyMCwxMy4zNzI1ODMgMjUuMzcyNTgzLDggMzIsOCBaIiBpZD0iUGF0aCIgZmlsbD0iIzM5MzkzOSI+PC9wYXRoPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEyLDAgQzE4LjYyNzQxNywtMS4yMTc0MzY3NWUtMTUgMjQsNS4zNzI1ODMgMjQsMTIgTDI0LDE3IEwyNCwxNyBMMCwxNyBMMCwxMiBDOS42NDczMjMzOGUtMTYsNS4zNzI1ODMgNS4zNzI1ODMsMS4yMTc0MzY3NWUtMTUgMTIsMCBaIiBpZD0iUmVjdGFuZ2xlLUNvcHktMTkiIGZpbGw9IiMyNEExNDgiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLUNvcHktNCIgZmlsbD0iI0ZGRkZGRiIgY3g9IjEyIiBjeT0iMTAiIHI9IjQiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMS41MDAwMDAsIDI1LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJJY29uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzLjUwMDAwMCwgMy41MDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTUuMjkzNzUsMC44NzQ5NzUxNjMgQzQuNDU0NzIxMjgsMC44NzIxNDQ3MDUgMy42MzMyOTM2NSwxLjExNTUzMDY3IDIuOTMxMjUsMS41NzUgTDUuNzMxMjUsNC4zNzUgQzUuOTE5NjM4MzcsNC41MzU3MzU2MSA2LjAzNTE2MjE3LDQuNzY1NzE1MDUgNi4wNTE2MzUwMSw1LjAxMjgwNzY3IEM2LjA2ODEwNzg1LDUuMjU5OTAwMjggNS45ODQxMzQ2Myw1LjUwMzE3OTUyIDUuODE4NzUsNS42ODc1IEM1LjYzNDQyOTUyLDUuODUyODg0NjMgNS4zOTExNTAyOCw1LjkzNjg1Nzg1IDUuMTQ0MDU3NjcsNS45MjAzODUwMSBDNC44OTY5NjUwNSw1LjkwMzkxMjE3IDQuNjY2OTg1NjEsNS43ODgzODgzNyA0LjUwNjI1LDUuNiBMMS42MTg3NSwyLjggQzEuMTE5NTE1NzIsMy41MzQ2MjE1OCAwLjg1OTcyNjcyMSw0LjQwNTY3ODggMC44NzUsNS4yOTM3NSBDMC44ODQ1OTIzMzEsNy43MzAxNzM5IDIuODU3MzI2MSw5LjcwMjkwNzY3IDUuMjkzNzUsOS43MTI1IEM1LjY3NjgxMiw5LjcxNDU5NTc3IDYuMDU4NzMxMTUsOS42NzA1MjgxOCA2LjQzMTI1LDkuNTgxMjUgTDkuMzYyNSwxMi41MTI1IEMxMC4yMjAyNjczLDEzLjM3MDI2NzIgMTEuNjEwOTgyNywxMy4zNzAyNjcyIDEyLjQ2ODc1LDEyLjUxMjUgQzEzLjMyNjUxNzIsMTEuNjU0NzMyNyAxMy4zMjY1MTcyLDEwLjI2NDAxNzMgMTIuNDY4NzUsOS40MDYyNSBMOS41Mzc1LDYuNDc1IEM5LjYyNjc3ODE4LDYuMTAyNDgxMTUgOS42NzA4NDU3Nyw1LjcyMDU2MiA5LjY2ODc1LDUuMzM3NSBDOS42OTIyNjI4OCw0LjE2MjA5MjMgOS4yNDE3Mjc3MSwzLjAyNjY4MjEyIDguNDE4NjkzNzYsMi4xODcxODc0OSBDNy41OTU2NTk4MSwxLjM0NzY5Mjg2IDYuNDY5MzkyODMsMC44NzQ3NjQ4NDcgNS4yOTM3NSwwLjg3NDk3NTE2MyBaIE04Ljc5Mzc1LDUuMjkzNzUgQzguNzkzMTA4MTUsNS42MDQ2MjU3MyA4Ljc0ODkyOTAzLDUuOTEzODc5NTggOC42NjI1LDYuMjEyNSBMOC41MzEyNSw2LjY5Mzc1IEw4Ljg4MTI1LDcuMDQzNzUgTDExLjgxMjUsOS45NzUgQzEyLjA2NDgwNzUsMTAuMjEzODY0IDEyLjIwNzI4NDcsMTAuNTQ2MzEwOCAxMi4yMDYyNSwxMC44OTM3NSBDMTIuMjE2MjE4OCwxMS4yNDI5NDk3IDEyLjA3MjI0MzcsMTEuNTc4ODkxNCAxMS44MTI1LDExLjgxMjUgQzExLjU3MzAzMjcsMTIuMDYzOTQwNyAxMS4yNDA5Nzc2LDEyLjIwNjI1IDEwLjg5Mzc1LDEyLjIwNjI1IEMxMC41NDY1MjI0LDEyLjIwNjI1IDEwLjIxNDQ2NzMsMTIuMDYzOTQwNyA5Ljk3NSwxMS44MTI1IEw3LjA0Mzc1LDguODgxMjUgTDYuNjkzNzUsOC41MzEyNSBMNi4yMTI1LDguNjYyNSBDNS45MTM4Nzk1OCw4Ljc0ODkyOTAzIDUuNjA0NjI1NzMsOC43OTMxMDgxNSA1LjI5Mzc1LDguNzkzNzUgQzQuMzY0MDk0MzksOC43OTExNjc5MSAzLjQ3MTEwNDY4LDguNDMwODM4NzMgMi44LDcuNzg3NSBDMi4xMTM2OTM4Nyw3LjE0MTcyMjM4IDEuNzMyMzE0MDYsNi4yMzU5NDUzNCAxLjc1LDUuMjkzNzUgQzEuNzUwNjAzMzYsNC45Njg0OTcyNCAxLjc5NDc0NTQsNC42NDQ3ODg5NiAxLjg4MTI1LDQuMzMxMjUgTDMuODA2MjUsNi4yNTYyNSBDNC4xMzQ4MjYyLDYuNjEzODA2MDYgNC41OTMyMTY4Myw2LjgyNDQ0ODQ5IDUuMDc4NTM5NCw2Ljg0MDkwMDEgQzUuNTYzODYxOTgsNi44NTczNTE3MSA2LjAzNTQ2NDgsNi42NzgyMzQ0OSA2LjM4NzUsNi4zNDM3NSBDNi43MjE5ODQ0OSw1Ljk5MTcxNDggNi45MDExMDE3MSw1LjUyMDExMTk4IDYuODg0NjUwMSw1LjAzNDc4OTQgQzYuODY4MTk4NDksNC41NDk0NjY4MyA2LjY1NzU1NjA2LDQuMDkxMDc2MiA2LjMsMy43NjI1IEw0LjM3NSwxLjgzNzUgQzQuNjU3OTUwNjYsMS43NDgwMTIxOCA0Ljk1MzI0NjM0LDEuNzAzNzE3ODMgNS4yNSwxLjcwNjE0NzI3IEM2LjE3OTY1NTYxLDEuNzA4ODMyMDkgNy4wNzI2NDUzMiwyLjA2OTE2MTI3IDcuNzQzNzUsMi43MTI1IEM4LjQxNTQ3MzA3LDMuNDA0MDQ2MDcgOC43OTE5OTkyMSw0LjMyOTY3MjgzIDguNzkzNzUsNS4yOTM3NSBMOC43OTM3NSw1LjI5Mzc1IFoiIGlkPSJGaWxsIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=',
        offsetx: 12,
        offsety: 43,
        width: 24,
        height: 50,
        scale: 1
      },
      COMP: {
        label: this.app.getLocalizedLabel('completed', 'Completed'),
        url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgMjQgNTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLXdvcmstb3JkZXJfc3RvcDwvdGl0bGU+CiAgICA8ZyBpZD0iV29yay1vcmRlciwtbWFwLXZpZXctKHVwZGF0ZWQtczMzKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1hcC1pY29ucy0tLXNvbGlkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI5LjAwMDAwMCwgLTE5NDIuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJwaW4td29yay1vcmRlcl9zdG9wIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDkuMDAwMDAwLCAxOTM0LjQ5OTUwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTMyLDggQzM4LjYyNzQxNyw4IDQ0LDEzLjM3MjU4MyA0NCwyMCBMNDQsMzYgQzQzLjkyOTk1NDIsMzguMzAwMjI2NyA0My4xNzQ4OTg5LDQwLjUyNzA4NCA0MS44Mjk2NTU3LDQyLjM5MjI0MDcgTDQxLjYsNDIuNjk5NzAxNiBMMzIsNTYuNzI4NzkyNSBMMjIuNCw0Mi42OTk3MDE2IEMyMC45MjQzOTQ5LDQwLjc5MTQ2NTUgMjAuMDg4OTI4NCwzOC40Njk4NTI1IDIwLjAwNjcwNjMsMzYuMDY1NDQwMSBMMjAuMDA1LDM2IEwyMCwzNiBMMjAsMjAgQzIwLDEzLjM3MjU4MyAyNS4zNzI1ODMsOCAzMiw4IFoiIGlkPSJQYXRoIiBmaWxsPSIjMzkzOTM5Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwLjAwMDAwMCwgOC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIsMCBDMTguNjI3NDE3LC0xLjIxNzQzNjc1ZS0xNSAyNCw1LjM3MjU4MyAyNCwxMiBMMjQsMTcgTDI0LDE3IEwwLDE3IEwwLDEyIEM5LjY0NzMyMzM4ZS0xNiw1LjM3MjU4MyA1LjM3MjU4MywxLjIxNzQzNjc1ZS0xNSAxMiwwIFoiIGlkPSJSZWN0YW5nbGUtQ29weS0xOSIgZmlsbD0iIzZGNkY2RiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtQ29weS0xMyIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjEuNyIgeD0iOC44NSIgeT0iNi44NSIgd2lkdGg9IjYuMyIgaGVpZ2h0PSI2LjMiIHJ4PSIyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxLjUwMDAwMCwgMjUuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikljb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuNTAwMDAwLCAzLjUwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS4yOTM3NSwwLjg3NDk3NTE2MyBDNC40NTQ3MjEyOCwwLjg3MjE0NDcwNSAzLjYzMzI5MzY1LDEuMTE1NTMwNjcgMi45MzEyNSwxLjU3NSBMNS43MzEyNSw0LjM3NSBDNS45MTk2MzgzNyw0LjUzNTczNTYxIDYuMDM1MTYyMTcsNC43NjU3MTUwNSA2LjA1MTYzNTAxLDUuMDEyODA3NjcgQzYuMDY4MTA3ODUsNS4yNTk5MDAyOCA1Ljk4NDEzNDYzLDUuNTAzMTc5NTIgNS44MTg3NSw1LjY4NzUgQzUuNjM0NDI5NTIsNS44NTI4ODQ2MyA1LjM5MTE1MDI4LDUuOTM2ODU3ODUgNS4xNDQwNTc2Nyw1LjkyMDM4NTAxIEM0Ljg5Njk2NTA1LDUuOTAzOTEyMTcgNC42NjY5ODU2MSw1Ljc4ODM4ODM3IDQuNTA2MjUsNS42IEwxLjYxODc1LDIuOCBDMS4xMTk1MTU3MiwzLjUzNDYyMTU4IDAuODU5NzI2NzIxLDQuNDA1Njc4OCAwLjg3NSw1LjI5Mzc1IEMwLjg4NDU5MjMzMSw3LjczMDE3MzkgMi44NTczMjYxLDkuNzAyOTA3NjcgNS4yOTM3NSw5LjcxMjUgQzUuNjc2ODEyLDkuNzE0NTk1NzcgNi4wNTg3MzExNSw5LjY3MDUyODE4IDYuNDMxMjUsOS41ODEyNSBMOS4zNjI1LDEyLjUxMjUgQzEwLjIyMDI2NzMsMTMuMzcwMjY3MiAxMS42MTA5ODI3LDEzLjM3MDI2NzIgMTIuNDY4NzUsMTIuNTEyNSBDMTMuMzI2NTE3MiwxMS42NTQ3MzI3IDEzLjMyNjUxNzIsMTAuMjY0MDE3MyAxMi40Njg3NSw5LjQwNjI1IEw5LjUzNzUsNi40NzUgQzkuNjI2Nzc4MTgsNi4xMDI0ODExNSA5LjY3MDg0NTc3LDUuNzIwNTYyIDkuNjY4NzUsNS4zMzc1IEM5LjY5MjI2Mjg4LDQuMTYyMDkyMyA5LjI0MTcyNzcxLDMuMDI2NjgyMTIgOC40MTg2OTM3NiwyLjE4NzE4NzQ5IEM3LjU5NTY1OTgxLDEuMzQ3NjkyODYgNi40NjkzOTI4MywwLjg3NDc2NDg0NyA1LjI5Mzc1LDAuODc0OTc1MTYzIFogTTguNzkzNzUsNS4yOTM3NSBDOC43OTMxMDgxNSw1LjYwNDYyNTczIDguNzQ4OTI5MDMsNS45MTM4Nzk1OCA4LjY2MjUsNi4yMTI1IEw4LjUzMTI1LDYuNjkzNzUgTDguODgxMjUsNy4wNDM3NSBMMTEuODEyNSw5Ljk3NSBDMTIuMDY0ODA3NSwxMC4yMTM4NjQgMTIuMjA3Mjg0NywxMC41NDYzMTA4IDEyLjIwNjI1LDEwLjg5Mzc1IEMxMi4yMTYyMTg4LDExLjI0Mjk0OTcgMTIuMDcyMjQzNywxMS41Nzg4OTE0IDExLjgxMjUsMTEuODEyNSBDMTEuNTczMDMyNywxMi4wNjM5NDA3IDExLjI0MDk3NzYsMTIuMjA2MjUgMTAuODkzNzUsMTIuMjA2MjUgQzEwLjU0NjUyMjQsMTIuMjA2MjUgMTAuMjE0NDY3MywxMi4wNjM5NDA3IDkuOTc1LDExLjgxMjUgTDcuMDQzNzUsOC44ODEyNSBMNi42OTM3NSw4LjUzMTI1IEw2LjIxMjUsOC42NjI1IEM1LjkxMzg3OTU4LDguNzQ4OTI5MDMgNS42MDQ2MjU3Myw4Ljc5MzEwODE1IDUuMjkzNzUsOC43OTM3NSBDNC4zNjQwOTQzOSw4Ljc5MTE2NzkxIDMuNDcxMTA0NjgsOC40MzA4Mzg3MyAyLjgsNy43ODc1IEMyLjExMzY5Mzg3LDcuMTQxNzIyMzggMS43MzIzMTQwNiw2LjIzNTk0NTM0IDEuNzUsNS4yOTM3NSBDMS43NTA2MDMzNiw0Ljk2ODQ5NzI0IDEuNzk0NzQ1NCw0LjY0NDc4ODk2IDEuODgxMjUsNC4zMzEyNSBMMy44MDYyNSw2LjI1NjI1IEM0LjEzNDgyNjIsNi42MTM4MDYwNiA0LjU5MzIxNjgzLDYuODI0NDQ4NDkgNS4wNzg1Mzk0LDYuODQwOTAwMSBDNS41NjM4NjE5OCw2Ljg1NzM1MTcxIDYuMDM1NDY0OCw2LjY3ODIzNDQ5IDYuMzg3NSw2LjM0Mzc1IEM2LjcyMTk4NDQ5LDUuOTkxNzE0OCA2LjkwMTEwMTcxLDUuNTIwMTExOTggNi44ODQ2NTAxLDUuMDM0Nzg5NCBDNi44NjgxOTg0OSw0LjU0OTQ2NjgzIDYuNjU3NTU2MDYsNC4wOTEwNzYyIDYuMywzLjc2MjUgTDQuMzc1LDEuODM3NSBDNC42NTc5NTA2NiwxLjc0ODAxMjE4IDQuOTUzMjQ2MzQsMS43MDM3MTc4MyA1LjI1LDEuNzA2MTQ3MjcgQzYuMTc5NjU1NjEsMS43MDg4MzIwOSA3LjA3MjY0NTMyLDIuMDY5MTYxMjcgNy43NDM3NSwyLjcxMjUgQzguNDE1NDczMDcsMy40MDQwNDYwNyA4Ljc5MTk5OTIxLDQuMzI5NjcyODMgOC43OTM3NSw1LjI5Mzc1IEw4Ljc5Mzc1LDUuMjkzNzUgWiIgaWQ9IkZpbGwiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==',
        offsetx: 12,
        offsety: 43,
        width: 24,
        height: 50,
        scale: 1
      },
      APPR: {
        label: this.app.getLocalizedLabel('approved', 'Approved'),
        url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgMjQgNTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLXdvcmstb3JkZXJfc3RhcnQ8L3RpdGxlPgogICAgPGcgaWQ9Ildvcmstb3JkZXIsLW1hcC12aWV3LSh1cGRhdGVkLXMzMykiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJNYXAtaWNvbnMtLS1zb2xpZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyOS4wMDAwMDAsIC0xODE0LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0icGluLXdvcmstb3JkZXJfc3RhcnQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwOS4wMDAwMDAsIDE4MDYuNDk5NTAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMzIsOCBDMzguNjI3NDE3LDggNDQsMTMuMzcyNTgzIDQ0LDIwIEw0NCwzNiBDNDMuOTI5OTU0MiwzOC4zMDAyMjY3IDQzLjE3NDg5ODksNDAuNTI3MDg0IDQxLjgyOTY1NTcsNDIuMzkyMjQwNyBMNDEuNiw0Mi42OTk3MDE2IEwzMiw1Ni43Mjg3OTI1IEwyMi40LDQyLjY5OTcwMTYgQzIwLjkyNDM5NDksNDAuNzkxNDY1NSAyMC4wODg5Mjg0LDM4LjQ2OTg1MjUgMjAuMDA2NzA2MywzNi4wNjU0NDAxIEwyMC4wMDUsMzYgTDIwLDM2IEwyMCwyMCBDMjAsMTMuMzcyNTgzIDI1LjM3MjU4Myw4IDMyLDggWiIgaWQ9IlBhdGgiIGZpbGw9IiMzOTM5MzkiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAuMDAwMDAwLCA4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMiwwIEMxOC42Mjc0MTcsLTEuMjE3NDM2NzVlLTE1IDI0LDUuMzcyNTgzIDI0LDEyIEwyNCwxNyBMMjQsMTcgTDAsMTcgTDAsMTIgQzkuNjQ3MzIzMzhlLTE2LDUuMzcyNTgzIDUuMzcyNTgzLDEuMjE3NDM2NzVlLTE1IDEyLDAgWiIgaWQ9IlJlY3RhbmdsZS1Db3B5LTE5IiBmaWxsPSIjMEY2MkZFIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtQ29weS0yIiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjExLjIxMzM1MTQgMTMuMzM1NTMzOSA4IDEwLjE4MTk4MDUgOS4wNjA2NjAxNyA5LjEyMTMyMDM0IDExLjE4MTk4MDUgMTEuMjQyNjQwNyAxNS40MjQ2MjEyIDcgMTYuNDg1MjgxNCA4LjA2MDY2MDE3Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxLjUwMDAwMCwgMjUuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikljb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuNTAwMDAwLCAzLjUwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS4yOTM3NSwwLjg3NDk3NTE2MyBDNC40NTQ3MjEyOCwwLjg3MjE0NDcwNSAzLjYzMzI5MzY1LDEuMTE1NTMwNjcgMi45MzEyNSwxLjU3NSBMNS43MzEyNSw0LjM3NSBDNS45MTk2MzgzNyw0LjUzNTczNTYxIDYuMDM1MTYyMTcsNC43NjU3MTUwNSA2LjA1MTYzNTAxLDUuMDEyODA3NjcgQzYuMDY4MTA3ODUsNS4yNTk5MDAyOCA1Ljk4NDEzNDYzLDUuNTAzMTc5NTIgNS44MTg3NSw1LjY4NzUgQzUuNjM0NDI5NTIsNS44NTI4ODQ2MyA1LjM5MTE1MDI4LDUuOTM2ODU3ODUgNS4xNDQwNTc2Nyw1LjkyMDM4NTAxIEM0Ljg5Njk2NTA1LDUuOTAzOTEyMTcgNC42NjY5ODU2MSw1Ljc4ODM4ODM3IDQuNTA2MjUsNS42IEwxLjYxODc1LDIuOCBDMS4xMTk1MTU3MiwzLjUzNDYyMTU4IDAuODU5NzI2NzIxLDQuNDA1Njc4OCAwLjg3NSw1LjI5Mzc1IEMwLjg4NDU5MjMzMSw3LjczMDE3MzkgMi44NTczMjYxLDkuNzAyOTA3NjcgNS4yOTM3NSw5LjcxMjUgQzUuNjc2ODEyLDkuNzE0NTk1NzcgNi4wNTg3MzExNSw5LjY3MDUyODE4IDYuNDMxMjUsOS41ODEyNSBMOS4zNjI1LDEyLjUxMjUgQzEwLjIyMDI2NzMsMTMuMzcwMjY3MiAxMS42MTA5ODI3LDEzLjM3MDI2NzIgMTIuNDY4NzUsMTIuNTEyNSBDMTMuMzI2NTE3MiwxMS42NTQ3MzI3IDEzLjMyNjUxNzIsMTAuMjY0MDE3MyAxMi40Njg3NSw5LjQwNjI1IEw5LjUzNzUsNi40NzUgQzkuNjI2Nzc4MTgsNi4xMDI0ODExNSA5LjY3MDg0NTc3LDUuNzIwNTYyIDkuNjY4NzUsNS4zMzc1IEM5LjY5MjI2Mjg4LDQuMTYyMDkyMyA5LjI0MTcyNzcxLDMuMDI2NjgyMTIgOC40MTg2OTM3NiwyLjE4NzE4NzQ5IEM3LjU5NTY1OTgxLDEuMzQ3NjkyODYgNi40NjkzOTI4MywwLjg3NDc2NDg0NyA1LjI5Mzc1LDAuODc0OTc1MTYzIFogTTguNzkzNzUsNS4yOTM3NSBDOC43OTMxMDgxNSw1LjYwNDYyNTczIDguNzQ4OTI5MDMsNS45MTM4Nzk1OCA4LjY2MjUsNi4yMTI1IEw4LjUzMTI1LDYuNjkzNzUgTDguODgxMjUsNy4wNDM3NSBMMTEuODEyNSw5Ljk3NSBDMTIuMDY0ODA3NSwxMC4yMTM4NjQgMTIuMjA3Mjg0NywxMC41NDYzMTA4IDEyLjIwNjI1LDEwLjg5Mzc1IEMxMi4yMTYyMTg4LDExLjI0Mjk0OTcgMTIuMDcyMjQzNywxMS41Nzg4OTE0IDExLjgxMjUsMTEuODEyNSBDMTEuNTczMDMyNywxMi4wNjM5NDA3IDExLjI0MDk3NzYsMTIuMjA2MjUgMTAuODkzNzUsMTIuMjA2MjUgQzEwLjU0NjUyMjQsMTIuMjA2MjUgMTAuMjE0NDY3MywxMi4wNjM5NDA3IDkuOTc1LDExLjgxMjUgTDcuMDQzNzUsOC44ODEyNSBMNi42OTM3NSw4LjUzMTI1IEw2LjIxMjUsOC42NjI1IEM1LjkxMzg3OTU4LDguNzQ4OTI5MDMgNS42MDQ2MjU3Myw4Ljc5MzEwODE1IDUuMjkzNzUsOC43OTM3NSBDNC4zNjQwOTQzOSw4Ljc5MTE2NzkxIDMuNDcxMTA0NjgsOC40MzA4Mzg3MyAyLjgsNy43ODc1IEMyLjExMzY5Mzg3LDcuMTQxNzIyMzggMS43MzIzMTQwNiw2LjIzNTk0NTM0IDEuNzUsNS4yOTM3NSBDMS43NTA2MDMzNiw0Ljk2ODQ5NzI0IDEuNzk0NzQ1NCw0LjY0NDc4ODk2IDEuODgxMjUsNC4zMzEyNSBMMy44MDYyNSw2LjI1NjI1IEM0LjEzNDgyNjIsNi42MTM4MDYwNiA0LjU5MzIxNjgzLDYuODI0NDQ4NDkgNS4wNzg1Mzk0LDYuODQwOTAwMSBDNS41NjM4NjE5OCw2Ljg1NzM1MTcxIDYuMDM1NDY0OCw2LjY3ODIzNDQ5IDYuMzg3NSw2LjM0Mzc1IEM2LjcyMTk4NDQ5LDUuOTkxNzE0OCA2LjkwMTEwMTcxLDUuNTIwMTExOTggNi44ODQ2NTAxLDUuMDM0Nzg5NCBDNi44NjgxOTg0OSw0LjU0OTQ2NjgzIDYuNjU3NTU2MDYsNC4wOTEwNzYyIDYuMywzLjc2MjUgTDQuMzc1LDEuODM3NSBDNC42NTc5NTA2NiwxLjc0ODAxMjE4IDQuOTUzMjQ2MzQsMS43MDM3MTc4MyA1LjI1LDEuNzA2MTQ3MjcgQzYuMTc5NjU1NjEsMS43MDg4MzIwOSA3LjA3MjY0NTMyLDIuMDY5MTYxMjcgNy43NDM3NSwyLjcxMjUgQzguNDE1NDczMDcsMy40MDQwNDYwNyA4Ljc5MTk5OTIxLDQuMzI5NjcyODMgOC43OTM3NSw1LjI5Mzc1IEw4Ljc5Mzc1LDUuMjkzNzUgWiIgaWQ9IkZpbGwiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==',
        offsetx: 12,
        offsety: 43,
        width: 24,
        height: 50,
        scale: 1
      },
      Wait: {
        label: this.app.getLocalizedLabel('waitappr', 'Waiting for Approval'),
        url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgMjQgNTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLXdvcmstb3JkZXJfd2FpdDwvdGl0bGU+CiAgICA8ZyBpZD0iV29yay1vcmRlciwtbWFwLXZpZXctKHVwZGF0ZWQtczMzKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1hcC1pY29ucy0tLXNvbGlkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI5LjAwMDAwMCwgLTIwMDYuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJwaW4td29yay1vcmRlcl93YWl0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDkuMDAwMDAwLCAxOTk4LjQ5OTUwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTMyLDggQzM4LjYyNzQxNyw4IDQ0LDEzLjM3MjU4MyA0NCwyMCBMNDQsMzYgQzQzLjkyOTk1NDIsMzguMzAwMjI2NyA0My4xNzQ4OTg5LDQwLjUyNzA4NCA0MS44Mjk2NTU3LDQyLjM5MjI0MDcgTDQxLjYsNDIuNjk5NzAxNiBMMzIsNTYuNzI4NzkyNSBMMjIuNCw0Mi42OTk3MDE2IEMyMC45MjQzOTQ5LDQwLjc5MTQ2NTUgMjAuMDg4OTI4NCwzOC40Njk4NTI1IDIwLjAwNjcwNjMsMzYuMDY1NDQwMSBMMjAuMDA1LDM2IEwyMCwzNiBMMjAsMjAgQzIwLDEzLjM3MjU4MyAyNS4zNzI1ODMsOCAzMiw4IFoiIGlkPSJQYXRoIiBmaWxsPSIjMzkzOTM5Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwLjAwMDAwMCwgOC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIsMCBDMTguNjI3NDE3LC0xLjIxNzQzNjc1ZS0xNSAyNCw1LjM3MjU4MyAyNCwxMiBMMjQsMTcgTDI0LDE3IEwwLDE3IEwwLDEyIEM5LjY0NzMyMzM4ZS0xNiw1LjM3MjU4MyA1LjM3MjU4MywxLjIxNzQzNjc1ZS0xNSAxMiwwIFoiIGlkPSJSZWN0YW5nbGUtQ29weS0xOSIgZmlsbD0iI0YxQzIxQiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMi44OTQ0MjcyLDYuNzg4ODU0MzggTDE1LjI3NjM5MzIsMTEuNTUyNzg2NCBDMTUuNTIzMzgyNSwxMi4wNDY3NjQ5IDE1LjMyMzE1ODEsMTIuNjQ3NDM3OSAxNC44MjkxNzk2LDEyLjg5NDQyNzIgQzE0LjY5MDMyNDIsMTIuOTYzODU0OSAxNC41MzcyMTExLDEzIDE0LjM4MTk2NiwxMyBMOS42MTgwMzM5OSwxMyBDOS4wNjU3NDkyNCwxMyA4LjYxODAzMzk5LDEyLjU1MjI4NDcgOC42MTgwMzM5OSwxMiBDOC42MTgwMzM5OSwxMS44NDQ3NTQ5IDguNjU0MTc5MDgsMTEuNjkxNjQxOCA4LjcyMzYwNjgsMTEuNTUyNzg2NCBMMTEuMTA1NTcyOCw2Ljc4ODg1NDM4IEMxMS4zNTI1NjIxLDYuMjk0ODc1ODggMTEuOTUzMjM1MSw2LjA5NDY1MTU0IDEyLjQ0NzIxMzYsNi4zNDE2NDA3OSBDMTIuNjQwNzQxLDYuNDM4NDA0NDkgMTIuNzk3NjYzNSw2LjU5NTMyNjk4IDEyLjg5NDQyNzIsNi43ODg4NTQzOCBaIiBpZD0iVHJpYW5nbGUtQ29weS03IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxLjUwMDAwMCwgMjUuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikljb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuNTAwMDAwLCAzLjUwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS4yOTM3NSwwLjg3NDk3NTE2MyBDNC40NTQ3MjEyOCwwLjg3MjE0NDcwNSAzLjYzMzI5MzY1LDEuMTE1NTMwNjcgMi45MzEyNSwxLjU3NSBMNS43MzEyNSw0LjM3NSBDNS45MTk2MzgzNyw0LjUzNTczNTYxIDYuMDM1MTYyMTcsNC43NjU3MTUwNSA2LjA1MTYzNTAxLDUuMDEyODA3NjcgQzYuMDY4MTA3ODUsNS4yNTk5MDAyOCA1Ljk4NDEzNDYzLDUuNTAzMTc5NTIgNS44MTg3NSw1LjY4NzUgQzUuNjM0NDI5NTIsNS44NTI4ODQ2MyA1LjM5MTE1MDI4LDUuOTM2ODU3ODUgNS4xNDQwNTc2Nyw1LjkyMDM4NTAxIEM0Ljg5Njk2NTA1LDUuOTAzOTEyMTcgNC42NjY5ODU2MSw1Ljc4ODM4ODM3IDQuNTA2MjUsNS42IEwxLjYxODc1LDIuOCBDMS4xMTk1MTU3MiwzLjUzNDYyMTU4IDAuODU5NzI2NzIxLDQuNDA1Njc4OCAwLjg3NSw1LjI5Mzc1IEMwLjg4NDU5MjMzMSw3LjczMDE3MzkgMi44NTczMjYxLDkuNzAyOTA3NjcgNS4yOTM3NSw5LjcxMjUgQzUuNjc2ODEyLDkuNzE0NTk1NzcgNi4wNTg3MzExNSw5LjY3MDUyODE4IDYuNDMxMjUsOS41ODEyNSBMOS4zNjI1LDEyLjUxMjUgQzEwLjIyMDI2NzMsMTMuMzcwMjY3MiAxMS42MTA5ODI3LDEzLjM3MDI2NzIgMTIuNDY4NzUsMTIuNTEyNSBDMTMuMzI2NTE3MiwxMS42NTQ3MzI3IDEzLjMyNjUxNzIsMTAuMjY0MDE3MyAxMi40Njg3NSw5LjQwNjI1IEw5LjUzNzUsNi40NzUgQzkuNjI2Nzc4MTgsNi4xMDI0ODExNSA5LjY3MDg0NTc3LDUuNzIwNTYyIDkuNjY4NzUsNS4zMzc1IEM5LjY5MjI2Mjg4LDQuMTYyMDkyMyA5LjI0MTcyNzcxLDMuMDI2NjgyMTIgOC40MTg2OTM3NiwyLjE4NzE4NzQ5IEM3LjU5NTY1OTgxLDEuMzQ3NjkyODYgNi40NjkzOTI4MywwLjg3NDc2NDg0NyA1LjI5Mzc1LDAuODc0OTc1MTYzIFogTTguNzkzNzUsNS4yOTM3NSBDOC43OTMxMDgxNSw1LjYwNDYyNTczIDguNzQ4OTI5MDMsNS45MTM4Nzk1OCA4LjY2MjUsNi4yMTI1IEw4LjUzMTI1LDYuNjkzNzUgTDguODgxMjUsNy4wNDM3NSBMMTEuODEyNSw5Ljk3NSBDMTIuMDY0ODA3NSwxMC4yMTM4NjQgMTIuMjA3Mjg0NywxMC41NDYzMTA4IDEyLjIwNjI1LDEwLjg5Mzc1IEMxMi4yMTYyMTg4LDExLjI0Mjk0OTcgMTIuMDcyMjQzNywxMS41Nzg4OTE0IDExLjgxMjUsMTEuODEyNSBDMTEuNTczMDMyNywxMi4wNjM5NDA3IDExLjI0MDk3NzYsMTIuMjA2MjUgMTAuODkzNzUsMTIuMjA2MjUgQzEwLjU0NjUyMjQsMTIuMjA2MjUgMTAuMjE0NDY3MywxMi4wNjM5NDA3IDkuOTc1LDExLjgxMjUgTDcuMDQzNzUsOC44ODEyNSBMNi42OTM3NSw4LjUzMTI1IEw2LjIxMjUsOC42NjI1IEM1LjkxMzg3OTU4LDguNzQ4OTI5MDMgNS42MDQ2MjU3Myw4Ljc5MzEwODE1IDUuMjkzNzUsOC43OTM3NSBDNC4zNjQwOTQzOSw4Ljc5MTE2NzkxIDMuNDcxMTA0NjgsOC40MzA4Mzg3MyAyLjgsNy43ODc1IEMyLjExMzY5Mzg3LDcuMTQxNzIyMzggMS43MzIzMTQwNiw2LjIzNTk0NTM0IDEuNzUsNS4yOTM3NSBDMS43NTA2MDMzNiw0Ljk2ODQ5NzI0IDEuNzk0NzQ1NCw0LjY0NDc4ODk2IDEuODgxMjUsNC4zMzEyNSBMMy44MDYyNSw2LjI1NjI1IEM0LjEzNDgyNjIsNi42MTM4MDYwNiA0LjU5MzIxNjgzLDYuODI0NDQ4NDkgNS4wNzg1Mzk0LDYuODQwOTAwMSBDNS41NjM4NjE5OCw2Ljg1NzM1MTcxIDYuMDM1NDY0OCw2LjY3ODIzNDQ5IDYuMzg3NSw2LjM0Mzc1IEM2LjcyMTk4NDQ5LDUuOTkxNzE0OCA2LjkwMTEwMTcxLDUuNTIwMTExOTggNi44ODQ2NTAxLDUuMDM0Nzg5NCBDNi44NjgxOTg0OSw0LjU0OTQ2NjgzIDYuNjU3NTU2MDYsNC4wOTEwNzYyIDYuMywzLjc2MjUgTDQuMzc1LDEuODM3NSBDNC42NTc5NTA2NiwxLjc0ODAxMjE4IDQuOTUzMjQ2MzQsMS43MDM3MTc4MyA1LjI1LDEuNzA2MTQ3MjcgQzYuMTc5NjU1NjEsMS43MDg4MzIwOSA3LjA3MjY0NTMyLDIuMDY5MTYxMjcgNy43NDM3NSwyLjcxMjUgQzguNDE1NDczMDcsMy40MDQwNDYwNyA4Ljc5MTk5OTIxLDQuMzI5NjcyODMgOC43OTM3NSw1LjI5Mzc1IEw4Ljc5Mzc1LDUuMjkzNzUgWiIgaWQ9IkZpbGwiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==',
        offsetx: 12,
        offsety: 43,
        width: 24,
        height: 50,
        scale: 1
      },
      Others: {
        label: this.app.getLocalizedLabel('others', 'Others'),
        url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgMjQgNTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLXdvcmstb3JkZXJfd2FpdDwvdGl0bGU+CiAgICA8ZyBpZD0iV29yay1vcmRlciwtbWFwLXZpZXctKHVwZGF0ZWQtczMzKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1hcC1pY29ucy0tLXNvbGlkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI5LjAwMDAwMCwgLTIwMDYuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJwaW4td29yay1vcmRlcl93YWl0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDkuMDAwMDAwLCAxOTk4LjQ5OTUwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTMyLDggQzM4LjYyNzQxNyw4IDQ0LDEzLjM3MjU4MyA0NCwyMCBMNDQsMzYgQzQzLjkyOTk1NDIsMzguMzAwMjI2NyA0My4xNzQ4OTg5LDQwLjUyNzA4NCA0MS44Mjk2NTU3LDQyLjM5MjI0MDcgTDQxLjYsNDIuNjk5NzAxNiBMMzIsNTYuNzI4NzkyNSBMMjIuNCw0Mi42OTk3MDE2IEMyMC45MjQzOTQ5LDQwLjc5MTQ2NTUgMjAuMDg4OTI4NCwzOC40Njk4NTI1IDIwLjAwNjcwNjMsMzYuMDY1NDQwMSBMMjAuMDA1LDM2IEwyMCwzNiBMMjAsMjAgQzIwLDEzLjM3MjU4MyAyNS4zNzI1ODMsOCAzMiw4IFoiIGlkPSJQYXRoIiBmaWxsPSIjMzkzOTM5Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwLjAwMDAwMCwgOC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIsMCBDMTguNjI3NDE3LC0xLjIxNzQzNjc1ZS0xNSAyNCw1LjM3MjU4MyAyNCwxMiBMMjQsMTcgTDI0LDE3IEwwLDE3IEwwLDEyIEM5LjY0NzMyMzM4ZS0xNiw1LjM3MjU4MyA1LjM3MjU4MywxLjIxNzQzNjc1ZS0xNSAxMiwwIFoiIGlkPSJSZWN0YW5nbGUtQ29weS0xOSIgZmlsbD0iI0YxQzIxQiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMi44OTQ0MjcyLDYuNzg4ODU0MzggTDE1LjI3NjM5MzIsMTEuNTUyNzg2NCBDMTUuNTIzMzgyNSwxMi4wNDY3NjQ5IDE1LjMyMzE1ODEsMTIuNjQ3NDM3OSAxNC44MjkxNzk2LDEyLjg5NDQyNzIgQzE0LjY5MDMyNDIsMTIuOTYzODU0OSAxNC41MzcyMTExLDEzIDE0LjM4MTk2NiwxMyBMOS42MTgwMzM5OSwxMyBDOS4wNjU3NDkyNCwxMyA4LjYxODAzMzk5LDEyLjU1MjI4NDcgOC42MTgwMzM5OSwxMiBDOC42MTgwMzM5OSwxMS44NDQ3NTQ5IDguNjU0MTc5MDgsMTEuNjkxNjQxOCA4LjcyMzYwNjgsMTEuNTUyNzg2NCBMMTEuMTA1NTcyOCw2Ljc4ODg1NDM4IEMxMS4zNTI1NjIxLDYuMjk0ODc1ODggMTEuOTUzMjM1MSw2LjA5NDY1MTU0IDEyLjQ0NzIxMzYsNi4zNDE2NDA3OSBDMTIuNjQwNzQxLDYuNDM4NDA0NDkgMTIuNzk3NjYzNSw2LjU5NTMyNjk4IDEyLjg5NDQyNzIsNi43ODg4NTQzOCBaIiBpZD0iVHJpYW5nbGUtQ29weS03IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxLjUwMDAwMCwgMjUuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikljb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuNTAwMDAwLCAzLjUwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS4yOTM3NSwwLjg3NDk3NTE2MyBDNC40NTQ3MjEyOCwwLjg3MjE0NDcwNSAzLjYzMzI5MzY1LDEuMTE1NTMwNjcgMi45MzEyNSwxLjU3NSBMNS43MzEyNSw0LjM3NSBDNS45MTk2MzgzNyw0LjUzNTczNTYxIDYuMDM1MTYyMTcsNC43NjU3MTUwNSA2LjA1MTYzNTAxLDUuMDEyODA3NjcgQzYuMDY4MTA3ODUsNS4yNTk5MDAyOCA1Ljk4NDEzNDYzLDUuNTAzMTc5NTIgNS44MTg3NSw1LjY4NzUgQzUuNjM0NDI5NTIsNS44NTI4ODQ2MyA1LjM5MTE1MDI4LDUuOTM2ODU3ODUgNS4xNDQwNTc2Nyw1LjkyMDM4NTAxIEM0Ljg5Njk2NTA1LDUuOTAzOTEyMTcgNC42NjY5ODU2MSw1Ljc4ODM4ODM3IDQuNTA2MjUsNS42IEwxLjYxODc1LDIuOCBDMS4xMTk1MTU3MiwzLjUzNDYyMTU4IDAuODU5NzI2NzIxLDQuNDA1Njc4OCAwLjg3NSw1LjI5Mzc1IEMwLjg4NDU5MjMzMSw3LjczMDE3MzkgMi44NTczMjYxLDkuNzAyOTA3NjcgNS4yOTM3NSw5LjcxMjUgQzUuNjc2ODEyLDkuNzE0NTk1NzcgNi4wNTg3MzExNSw5LjY3MDUyODE4IDYuNDMxMjUsOS41ODEyNSBMOS4zNjI1LDEyLjUxMjUgQzEwLjIyMDI2NzMsMTMuMzcwMjY3MiAxMS42MTA5ODI3LDEzLjM3MDI2NzIgMTIuNDY4NzUsMTIuNTEyNSBDMTMuMzI2NTE3MiwxMS42NTQ3MzI3IDEzLjMyNjUxNzIsMTAuMjY0MDE3MyAxMi40Njg3NSw5LjQwNjI1IEw5LjUzNzUsNi40NzUgQzkuNjI2Nzc4MTgsNi4xMDI0ODExNSA5LjY3MDg0NTc3LDUuNzIwNTYyIDkuNjY4NzUsNS4zMzc1IEM5LjY5MjI2Mjg4LDQuMTYyMDkyMyA5LjI0MTcyNzcxLDMuMDI2NjgyMTIgOC40MTg2OTM3NiwyLjE4NzE4NzQ5IEM3LjU5NTY1OTgxLDEuMzQ3NjkyODYgNi40NjkzOTI4MywwLjg3NDc2NDg0NyA1LjI5Mzc1LDAuODc0OTc1MTYzIFogTTguNzkzNzUsNS4yOTM3NSBDOC43OTMxMDgxNSw1LjYwNDYyNTczIDguNzQ4OTI5MDMsNS45MTM4Nzk1OCA4LjY2MjUsNi4yMTI1IEw4LjUzMTI1LDYuNjkzNzUgTDguODgxMjUsNy4wNDM3NSBMMTEuODEyNSw5Ljk3NSBDMTIuMDY0ODA3NSwxMC4yMTM4NjQgMTIuMjA3Mjg0NywxMC41NDYzMTA4IDEyLjIwNjI1LDEwLjg5Mzc1IEMxMi4yMTYyMTg4LDExLjI0Mjk0OTcgMTIuMDcyMjQzNywxMS41Nzg4OTE0IDExLjgxMjUsMTEuODEyNSBDMTEuNTczMDMyNywxMi4wNjM5NDA3IDExLjI0MDk3NzYsMTIuMjA2MjUgMTAuODkzNzUsMTIuMjA2MjUgQzEwLjU0NjUyMjQsMTIuMjA2MjUgMTAuMjE0NDY3MywxMi4wNjM5NDA3IDkuOTc1LDExLjgxMjUgTDcuMDQzNzUsOC44ODEyNSBMNi42OTM3NSw4LjUzMTI1IEw2LjIxMjUsOC42NjI1IEM1LjkxMzg3OTU4LDguNzQ4OTI5MDMgNS42MDQ2MjU3Myw4Ljc5MzEwODE1IDUuMjkzNzUsOC43OTM3NSBDNC4zNjQwOTQzOSw4Ljc5MTE2NzkxIDMuNDcxMTA0NjgsOC40MzA4Mzg3MyAyLjgsNy43ODc1IEMyLjExMzY5Mzg3LDcuMTQxNzIyMzggMS43MzIzMTQwNiw2LjIzNTk0NTM0IDEuNzUsNS4yOTM3NSBDMS43NTA2MDMzNiw0Ljk2ODQ5NzI0IDEuNzk0NzQ1NCw0LjY0NDc4ODk2IDEuODgxMjUsNC4zMzEyNSBMMy44MDYyNSw2LjI1NjI1IEM0LjEzNDgyNjIsNi42MTM4MDYwNiA0LjU5MzIxNjgzLDYuODI0NDQ4NDkgNS4wNzg1Mzk0LDYuODQwOTAwMSBDNS41NjM4NjE5OCw2Ljg1NzM1MTcxIDYuMDM1NDY0OCw2LjY3ODIzNDQ5IDYuMzg3NSw2LjM0Mzc1IEM2LjcyMTk4NDQ5LDUuOTkxNzE0OCA2LjkwMTEwMTcxLDUuNTIwMTExOTggNi44ODQ2NTAxLDUuMDM0Nzg5NCBDNi44NjgxOTg0OSw0LjU0OTQ2NjgzIDYuNjU3NTU2MDYsNC4wOTEwNzYyIDYuMywzLjc2MjUgTDQuMzc1LDEuODM3NSBDNC42NTc5NTA2NiwxLjc0ODAxMjE4IDQuOTUzMjQ2MzQsMS43MDM3MTc4MyA1LjI1LDEuNzA2MTQ3MjcgQzYuMTc5NjU1NjEsMS43MDg4MzIwOSA3LjA3MjY0NTMyLDIuMDY5MTYxMjcgNy43NDM3NSwyLjcxMjUgQzguNDE1NDczMDcsMy40MDQwNDYwNyA4Ljc5MTk5OTIxLDQuMzI5NjcyODMgOC43OTM3NSw1LjI5Mzc1IEw4Ljc5Mzc1LDUuMjkzNzUgWiIgaWQ9IkZpbGwiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==',
        offsetx: 12,
        offsety: 43,
        width: 24,
        height: 50,
        scale: 1
      }
    };
    return legends;
  }


  //istanbul ignore next
  showMapList() {
    let woMapListDS = this.app.findDatasource(this.page.state.selectedDS);
    let wolistDS = this.app.findDatasource("wolistDS");
    // istanbul ignore else
    if(woMapListDS) {
     woMapListDS.reset(wolistDS.lastQuery,true)
    }
  }

  computedWorkType(item) {
    let computedWorkType = null;
    //istanbul ignore else
    if (item && item.wonum) {
      if(item.istask) {
        computedWorkType = item.wogroup + '-' + item.taskid
      } else {
        //istanbul ignore next
        item.worktypename
        ? (computedWorkType = item.worktypename + ' ' + item.wonum)
        : (computedWorkType = item.wonum);
      }
    }
    return computedWorkType;
  }

  /**
   * Compute Resources
   * @param {*} item 
   * @returns 
   */
  computeResources(item) {
    let computedResources = [];
    //istanbul ignore else
    if (item && item.wplabor) {
      computedResources.push("Labor");
    }
    if (item && item.wpmaterial) {
      computedResources.push("Materials");
    }
    if (item && item.wpservice) {
      computedResources.push("Services");
    }
    if (item && item.wptool) {
      computedResources.push("Tools");
    }
    return computedResources.join(', ');
  }

  /**
   * Compute Responsibility
   * @param {*} item 
   * @returns 
   */
  computeResponsibility(item) {
    let responsibility = null;
    //istanbul ignore else
    if (item && item.owner) {
      responsibility=item.owner;
    }else if(item && item.ownergroup){
      responsibility=item.ownergroup;
    }
    return responsibility;
  }

  /**
   * Display Task Summary Page
   * @param {*} item
   */
  showTaskSummary(item){
    this.page.state.displayTaskSummary = true;
    this.page.params.workorderid = item.workorderid;
    this.page.params.localref = item.localref;
    this.loadTaskLabor(item.workorderid);
   }

  /**
   * Navigate Task Summary Page
   * @param {*} page
   */
  gotoPage(page) {
    if (page.value === 'WOSummaryPage') {
      this.page.state.displayTaskSummary = false;
    }
    this.app.setCurrentPage(page.value);
  }


 /**
  * Open Edit Task Page
  * @param {woTaskDS} event
  */
 async editTask(event){
  this.app.state.woPlanSelectedTabIndex=0;
  this.app.state.selectedTabIndex=0;
  this.app.state.woresources=false;
  this.app.state.classificationDS="TASKCLASSIFICATIONLOOKUP";
  let woDetailResource = this.app.findDatasource("woDetailResource");
  this.app.state.workorderid=woDetailResource.item.workorderid;
  this.app.state.editTask = true;
  this.app.setCurrentPage({
    name: 'CreateTask',
    params: { editTask: true, taskid: event.item.taskid, parent: event.item.parent },
  });
 }

   /**
  * Open Edit WO Resource
  */
   async editWOResources(){
    this.app.state.woPlanSelectedTabIndex=1;
    this.app.state.selectedTabIndex=2;
    this.app.state.woresources=true;
    let woDetailResource = this.app.findDatasource("woDetailResource");
    this.app.state.workorderid=woDetailResource.item.workorderid;
    this.app.state.editwo = true;
    this.app.setCurrentPage({name: 'CreateTask',params: { editworesources: true,wonum : woDetailResource.item.wonum}});
   }

 /**
  * API to Load Responsibility for Task
  */
 async loadWOLabor() {
  let wpLaborDS = this.app.findDatasource("wpLaborDS");
  await wpLaborDS.load();

  let woCraftCrewDS = this.app.findDatasource("woCraftCrewDS");
  let craftCrew = wpLaborDS.items?.filter(element => element.craft != null || element.amcrewtype != null);
  await woCraftCrewDS.load({src: craftCrew, noCache: true});

  let woLaborAssignmentDS = this.app.findDatasource("woLaborAssignmentDS");
  let assignment = wpLaborDS.items?.filter(element => element.laborcode != null || element.amcrew != null);
  await woLaborAssignmentDS.load({src: assignment, noCache: true});
}

/**
 * API to Load Responsibility for Task
 */
async loadTaskLabor(workorderid) {
  let taskDetailResource = this.app.findDatasource("taskDetailResource");
  if(workorderid!=null){
    await taskDetailResource.initializeQbe();
    taskDetailResource.clearQBE();
    taskDetailResource.setQBE('workorderid', '=', workorderid);
    await taskDetailResource.searchQBE();
  }else{
    await taskDetailResource.load();
  }

  let wpLaborDS = this.app.findDatasource("wpTaskLaborDS");
  await wpLaborDS.load();

  let taskCraftCrewDS = this.app.findDatasource("taskCraftCrewDS");
  let craftCrew = wpLaborDS.items?.filter(element => element.craft != null || element.amcrewtype != null);
  await taskCraftCrewDS.load({src: craftCrew, noCache: true});

  let taskLaborAssignmentDS = this.app.findDatasource("taskLaborAssignmentDS");
  let assignment = wpLaborDS.items?.filter(element => element.laborcode != null || element.amcrew != null);
  await taskLaborAssignmentDS.load({src: assignment, noCache: true});
}

/**
 * Remove WO from ai training model
 * @param {Object} event 
 */
async removeToAITrianingModel(event) {
  event.removeFromAITrianingModel = true;
  await this.addToAITrianingModel(event);
}

/**
 * Add WO for ai training model
 * @param {Object} event 
 */
async addToAITrianingModel(event) {
    let woAIResourceDS = this.app.findDatasource("woAIResourceDS");
    // istanbul ignore else
    if(woAIResourceDS) {
      let woitem = woAIResourceDS.item;
      if(event && event.removeFromAITrianingModel) {
        woitem.ai_usefortraining=false;
      }else {
        woitem.ai_usefortraining=true;
      }
      await woAIResourceDS.save();
      let myitems = await woAIResourceDS.forceReload();
      // istanbul ignore else
      if(myitems && myitems.length > 0) {
        this.page.state.ai_usefortraining = myitems[0].ai_usefortraining;
      }
    }
  }

  /**
   * Bulk add/remove wos from AI training model
   * @param {Object} event 
   */
  async bulkAddToAITrianingModel(event) {
    // istanbul ignore else
    if(event && event.action && event.target==="wolist") {
      this.app.state.workOrderDS= this.app.findDatasource("wolistDS");
      this.app.state.selectedItems = this.app.state.workOrderDS.getSelectedItems();
      // istanbul ignore else
      if(this.app.state.selectedItems && this.app.state.selectedItems.length > 0) {
        let selectedwonumarray = [];
        this.app.state.selectedItems.forEach(item=>selectedwonumarray.push(item.wonum));
        let woAIResourceDS = this.app.findDatasource("woAIResourceDS");
        await woAIResourceDS.initializeQbe();
        woAIResourceDS.clearQBE();
        woAIResourceDS.clearState();
        woAIResourceDS.setQBE('wonum', 'in', selectedwonumarray);
        let myitems = await woAIResourceDS.searchQBE(undefined, true);
        // istanbul ignore else
        if(myitems && myitems.length > 0) {
          for(let idx=0;idx<myitems.length;idx++){
            if(event.action === "add") {
              myitems[idx].ai_usefortraining = true;
            }
            else if(event.action === "remove") {
              myitems[idx].ai_usefortraining = false;
            }
          }
        }
        let woairesponse = await woAIResourceDS.save();
        // istanbul ignore else
        if(woairesponse && !woairesponse.error){
          let msg = "";
          if(event.action === "add") {
            msg = this.app.getLocalizedMessage(
            'WOSUMMARY',
            'woaiaddedmsg',
            '{0} work orders were added to AI Training model',
            [selectedwonumarray.length]);    
          } else if (event.action === "remove") {
            msg = this.app.getLocalizedMessage(
              'WOSUMMARY',
              'woairemovededmsg',
              '{0} work orders were removed from AI Training model',
              [selectedwonumarray.length]);
          }
          this.app.toast(this.app.getLocalizedMessage('WOSUMMARY', 'success', 'Success!'), 'success',msg);
        }
        myitems = await woAIResourceDS.forceReload();
        this.app.state.workOrderDS.clearSelections();
        await this.app.state.workOrderDS.forceReload();
      }
    }
  }
}
export default PageController;
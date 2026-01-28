/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2018,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/**
 * 
 */
define([
    "dojo/topic",
    "dojo/io-query",
    'dojo/_base/json',
    "dojo/_base/lang",
    "dojo/Deferred",
    "dojo/_base/declare",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
    "com/ibm/tivoli/maximo/miniapps/_MaximoIO"

], function (topic, ioQuery, json, lang, Deferred, declare, log, _MaximoIO) {
    var _LinearMenuBase = declare([_MaximoIO], {
        constructor: function () {
        	thisLinearMenuObj=this;
            this.fetch('get_i18n_MaxMsg_label', {msgKey: "openmap", msgGroup: ""}).then(function(mxLabel){
            	thisLinearMenuObj.i18nMaxMsgOpenMaplabel = mxLabel.label;
            });
            this.fetch('return_mapProvider_type').then(function(mapProviderType){
            	thisLinearMenuObj.mapProviderType = mapProviderType.mapProvider;
    			console.log("mapProvider: " + thisLinearMenuObj.mapProviderType);
            });
       	this.clickedObj = null; 
        },
        
        OnRightClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {

            // only process right clicks on Data Rows
            if (row == null || row.Kind != 'Data') return true;

            log.debug("OnRightClick for row.Kind Data: {}", col);
            if (this.shouldRightClickSelectRow(grid, row, col)) {
                grid.SelectRow(row, 1);
            }
            
            if (col == 'G') {
                var objs = grid.GetGanttXY(row, col, x, y);
                this.clickedObj = grid.GetGanttRunBox(row,col,objs.RunIndex);
                if (objs != null && objs.Type != null && objs.Type != 'line') {
                    return false;
                } else {
                    return true;
                }
            }
            
            return true;
        },
        
		OnGanttMenu : function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, menu, /*Event*/ ganttxy) {
        	if (this.mapProviderType !="SPATIAL" || this.currentTabId == "mxmap" || !this.featureClassLinked) return false;

        	addedMenu = this._AdditionalTableContextMenu(/*TMenu*/menu, /*TGrid*/ grid, /*TRow*/ row, /*string*/ col);

			console.log("menu: " + menu.Items);
//			this.grid.ShowPopup(addedMenu, lang.hitch(this, this.itemMenuHandler));
			
			return false;
		},
		
		OnGanttMenuClick : function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*string*/ name, /*TMenuItem*/ Item, /*object*/ GanttXY) {
        	console.log("Item Handler Text: " + Item.Text);
        	console.log("Item Handler Value: " + Item.Value);

        	console.log("Item Handler Start: " + Item.Start);
        	console.log("Item Handler End: " + Item.End);
        	console.log("Item Handler Row ID: " + Item.rowID);
        	console.log("Item Handler Measure Unit ID: " + Item.measureUnitId);
        	console.log("Item Handler Row Name: " + Item.rowName);
        	if (Item.Value =="_OnOpenMapDialog"){
        		var myJSON = {
        				"linearObjTarget": true,
        				"id": "lvcTargetMapLayer",
        				"rowName": Item.rowName, 
        				"rowId": Item.rowID, 
        				"start": Item.Start, 
        				"end": Item.End, 
        				"measureUnitId": Item.measureUnitId
        		};
        		
    			this.sendMaximoEvent("pluss_open_map", myJSON, this.componentId);       		
        	}

        	return false;
		},
		
        _AdditionalTableContextMenu: function (/*TMenu*/menu, /*TGrid*/ grid, /*TRow*/ row, /*string*/ col) {

            log.debug('_AdditionalTableContextMenu: {}', col);
            if (col == 'name' || col == 'G') {
                menu = menu || {Items: []};
                
                var baseURI = this.dom.baseURI;
                if (baseURI == null) {
                	baseURI = this.servletBase + "/" + window.SKIN + "images/";
                }
                
                menu.Items.push({
                    Name: '-',
                    Grid: grid,
                    Row: row,
                    Col: col
                 });
                menu.Items.push({
                    Name: 'Open Map Dialog',
                    Value: '_OnOpenMapDialog',
                    Text: this.i18nMaxMsgOpenMaplabel,
                    Icon: baseURI + "/miniapps/common/menu_icon_openMap.gif",
                    IconWidth: 25,
                    Height: 25,
                    rowName: this.clickedObj.Row.name,
                    rowID: this.clickedObj.Row.id,
                    Start: this.clickedObj.Start,
                    End: this.clickedObj.End,
                    measureUnitId: this.clickedObj.measureUnitId,
                    Grid: grid,
                    Row: row,
                    Col: col
                });

            }
            return menu;
        },
        
        shouldRightClickSelectRow: function(grid, row, col) {
            var rows = grid.GetSelRows();
            if (rows && rows.length > 0) {
               return true;
            }
            return false;
        }
    });

    return _LinearMenuBase;
});

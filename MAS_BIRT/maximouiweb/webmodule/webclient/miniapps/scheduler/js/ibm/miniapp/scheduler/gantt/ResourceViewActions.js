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

define([
    "dojo/_base/lang",
    "dojo/_base/declare",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog"
], function (lang, declare, log) {
    var _ACTIONS = declare(null, {
    	
        _showWorkAction: function (actionItem, row) {
            log.debug("showWorkAction(): ", actionItem);
            this.ZoomTo(row['startTime'], row['endTime']);
            return true;
        },
        _deleteWorkAction: function (actionItem, row) {
            var rows = this._GetSelectedRows(this.grid, 'G', row);
            this._applyForEachRow(rows, lang.hitch(this, function (row) {
                log.debug("delete activity ", actionItem.Value, row);
                //type =  1 - delete + confirm dialog, 2 - delete, 3 - undelete.
                this.grid.DeleteRow(row, 2);
            }));
            this.Refresh(255);
        },

        _lockAction: function (actionItem, row) {
            var rows = this._GetSelectedRows(this.grid, 'G', row);
            this._applyForEachRow(rows, lang.hitch(this, function (row) {
                log.debug("before lock activity", actionItem.Value, row, row['MODAPPOINTMENT']);
                if (actionItem != ""){
                	row.mxLeftIconClass = "skd-icon-appointment";
                }
                if ( row["MODRESOURCELOCK"] == "1" && actionItem != ""){
                	row.mxLeftIconClass = "skd-icon-appresourceloc";
                }
                row.GGanttRunMove = 'All,Move,Selected,Entire,Vert,Mouse'; // can only move vertically
                row._READONLY_STARTEND = true;
                if (actionItem != ""){
                	this.SetValue(row, 'MODAPPOINTMENT', true, true); // notify other chart
                }
            }));
        },
        _unlockAction: function (actionItem, row) {
            var rows = this._GetSelectedRows(this.grid, 'G', row);
            this._applyForEachRow(rows, lang.hitch(this, function (row) {
                log.debug("before unlock activity", actionItem.Value, row, row['MODAPPOINTMENT'], row["APPTREQUIRED"]);
        	if ( row["APPTREQUIRED"] == "1" || row["APPTREQUIRED"]=="Y" || row["APPTREQUIRED"]==true|| row["APPTREQUIRED"]=="true"){
        		if (actionItem != ""){
	                row.mxLeftIconClass = "skd-icon-requirement";
        		}
        	}
        	else if (row["MODRESOURCELOCK"] == "1" && actionItem != ""){
            	row.mxLeftIconClass = "skd-icon-resourceloc";
            }
        	else {
        		delete row.mxLeftIconClass;
        	}
                delete row.GGanttRunMove;
                delete row._READONLY_STARTEND;
                if (actionItem != ""){
                	this.SetValue(row, 'MODAPPOINTMENT', false, true); // notify other chart
                }
            }));
        },
        
        _reslockAction: function (actionItem, row) {
            var rows = this._GetSelectedRows(this.grid, 'G', row);
            this._applyForEachRow(rows, lang.hitch(this, function (row) {
                log.debug("before lock activity", actionItem.Value, row, row['MODRESOURCELOCK']);
                if (actionItem != ""){
                	row.mxLeftIconClass = "skd-icon-resourceloc";
                }
                if ( row["MODAPPOINTMENT"] == "1" && actionItem != ""){
                	row.mxLeftIconClass = "skd-icon-appresourceloc";
                }
                row.GGanttRunMove = 'All,Move,Selected,Entire,Slide,Mouse'; // can only move vertically
                row._READONLY_ASSIGNMENT = true;
                if (actionItem != ""){
                	this.SetValue(row, 'MODRESOURCELOCK', true, true); // notify other chart
                }
            }));
        },
        _resunlockAction: function (actionItem, row) {
            var rows = this._GetSelectedRows(this.grid, 'G', row);
            this._applyForEachRow(rows, lang.hitch(this, function (row) {
                log.debug("before unlock activity", actionItem.Value, row, row['MODRESOURCELOCK'], row["APPTREQUIRED"]);
        	if ( row["APPTREQUIRED"] == "1" || row["APPTREQUIRED"]=="Y" || row["APPTREQUIRED"]==true|| row["APPTREQUIRED"]=="true"){
        		if (actionItem != ""){
	                row.mxLeftIconClass = "skd-icon-requirement";
        		}
        	}
        	else if (row["MODAPPOINTMENT"] == "1" && actionItem != ""){
            	row.mxLeftIconClass = "skd-icon-appointment";
            }
        	else {
        		delete row.mxLeftIconClass;
        	}
                delete row.GGanttRunMove;
                delete row._READONLY_ASSIGNMENT;
                if (actionItem != ""){
                	this.SetValue(row, 'MODRESOURCELOCK', false, true); // notify other chart
                }
            }));
        },
        
        newWorkActionReply: function (reply, actionItem, row) {
            log.debug("newWorkActionReply()", actionItem.Value, row, reply);
            this.processReply(reply);
        },
        splitActionReply: function (reply, actionItem, row) {
            log.debug("splitActionReply()", actionItem.Value, row, reply);
            this.processReply(reply);
        },
        split3ActionReply: function (reply, actionItem, row) {
            log.debug("split3ActionReply()", actionItem.Value, row, reply);
            this.processReply(reply);
        },
        splitShiftActionReply: function (reply, actionItem, row) {
            log.debug("splitShiftActionReply()", actionItem.Value, row, reply);
            this.processReply(reply);
        },
        mergeWorkActionReply: function (reply, actionItem, row) {
            log.debug("mergeWorkActionReply()", actionItem.Value, row, reply);
            this.processReply(reply);
        },
        assigntoselectedlocationsReply: function (reply, actionItem, row) {
            log.debug("assigntoselectedlocationsReply()", actionItem.Value, row, reply);
            this.reloadModel();
        },
        reloadModel: function () {
            this.grid.Reload(null, null, false);
            this.sendToBeSaved();
        },
        deleteActionReply: function (reply, actionItem, row) {
            log.debug("deleteActionActionReply()", actionItem.Value, row, reply);
        },
        unassignReply: function (reply, actionItem, row) {
            log.debug("unassignReply()", actionItem.Value, row, reply);
            this.processReply(reply);
        },
        assigntoReply: function (reply, actionItem, row) {
            log.debug("assigntoReply()", actionItem.Value, row, reply);
            this.processReply(reply);
        },
        processReply: function (reply) {
        	if (reply && reply.Changes && reply.Changes.length) {
        		var changes = reply.Changes;
        		this.grid.AddDataFromServer(reply);
        		for (var i=0; i<changes.length; i++) {
        			var assignmentRow = changes[i];
        			var newRow = this.grid.GetRowById(assignmentRow['id']);
        			if (newRow != null) {
    					newRow['_INTERNALSTATUS'] = assignmentRow['_INTERNALSTATUS'];
    					newRow['STATUS'] = assignmentRow['STATUS'];
    					newRow['_OBJECTNAME'] = assignmentRow['_OBJECTNAME'];
    					
    					if ((assignmentRow["MODRESOURCELOCK"] == "1") && (assignmentRow["MODAPPOINTMENT"] == "1")){
    	                	newRow.mxLeftIconClass = "skd-icon-appresourceloc";
    	                	newRow._READONLY_STARTEND = true;
    	                	this.SetValue(newRow, 'MODRESOURCELOCK', true, true); // notify other chart
    	                	this.SetValue(newRow, 'MODAPPOINTMENT', true, true); // notify other chart
    	                } else if ((assignmentRow["MODRESOURCELOCK"] == "0") && (assignmentRow["MODAPPOINTMENT"] == "1")){
    	                	newRow.mxLeftIconClass = "skd-icon-appointment";
    	                	newRow._READONLY_STARTEND = true;
    	                	this.SetValue(newRow, 'MODRESOURCELOCK', false, true); // notify other chart
    	                	this.SetValue(newRow, 'MODAPPOINTMENT', true, true); // notify other chart	
    	                }
    	                else if ((assignmentRow["MODRESOURCELOCK"] == "1") && (assignmentRow["MODAPPOINTMENT"] == "0")){
    	                	newRow.mxLeftIconClass = "skd-icon-resourceloc";
    	                	newRow._READONLY_ASSIGNMENT = true;
    	                	this.SetValue(newRow, 'MODRESOURCELOCK', true, true); // notify other chart
    	                	this.SetValue(newRow, 'MODAPPOINTMENT', false, true); // notify other chart	
    	                }
    					
    					delete newRow['_GGanttClassOld'];
    					delete newRow['GGanttClass'];
    					delete newRow['_SKDRunClassOld'];
    					delete newRow['_SKDRunClass'];
    					this.grid.RefreshRow(newRow);
        			}

                    var oldParentID =  assignmentRow['_OLDPARENTID'];
                    var newParentID =  assignmentRow['Parent'];
                    if (oldParentID != null) {
                        var oldParent = this.grid.GetRowById(oldParentID);
                        this.grid.RefreshRow(oldParent);
                    }
                    if (newParentID != null) {
                        var newParent = this.grid.GetRowById(newParentID);
                        this.grid.RefreshRow(newParent);
                    }
        		}
                this._focusGanttObject = null;
                this.grid.RefreshGantt(1);
                this.grid.ClearSelection();
                this.sendToBeSaved();
        	}
        }

        /* Undo/Redo implementation still to be done for right-click actions */
        /*
        OnContextMenuItemSelected: function (item, row, selection) {
        	this.itemSelected = item;
        	this.selection = selection;
        	this.inherited(arguments);
        	this.registerUndo(row, item, selection);
        },

        registerUndo: function (object, item, selection) {
        	var me = this;
        	var itemValue = item.Value;
        	if (item.Value == 'mergeWorkAction') {
        		itemValue = 'splitAction';
        	} else if (item.Value == 'splitAction') {
        		itemValue = 'mergeWorkAction';
        	}

        	undoAction = function () {
                me.fetch("on_handle_context_menu_item", me._ioOptions({
                    projectid: me.projectid,
                    id: me.SetIDFromItem(item),
                    value: itemValue,
                    values: item.Values,
                    selection: selection
                })).then(function (reply) {
                	me.processReply(reply);
                });
        	};

        	redoAction = function () {
        		var me = this;
                me.fetch("on_handle_context_menu_item", me._ioOptions({
                    projectid: me.projectid,
                    id: me.SetIDFromItem(item),
                    value: item.Value,
                    values: item.Values,
                    selection: selection
                })).then(function (reply) {
                	me.processReply(reply);
                });
        	};

        	this.grid.CustomUndo(object, undoAction, redoAction);
        }
        */
    });

    return _ACTIONS;
});

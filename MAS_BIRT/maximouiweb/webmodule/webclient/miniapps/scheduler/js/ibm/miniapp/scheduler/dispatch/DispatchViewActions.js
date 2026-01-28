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
    "dojo/_base/declare",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog"
], function (declare, log) {
    var _ACTIONS = declare(null, {
       
    	createAssignmentReply: function (reply, actionItem, row) {
            log.debug("createAssignmentReply()", actionItem.Value, row, reply);
            var me = this;
            this._autoRefreshData(me);
        },
        splitAssignmentReply: function (reply, actionItem, row) {
            log.debug("splitAssignmentReply()", actionItem.Value, row, reply);
            var me = this;
            this._autoRefreshData(me);
        },
        splitAssignment3Reply: function (reply, actionItem, row) {
            log.debug("splitAssignment3Reply()", actionItem.Value, row, reply);
            var me = this;
            this._autoRefreshData(me);
        },
        splitAssignmentToShiftReply: function (reply, actionItem, row) {
            log.debug("splitAssignmentToShiftReply()", actionItem.Value, row, reply);
            var me = this;
            this._autoRefreshData(me);
        },
        deleteAssignmentReply: function (reply, actionItem, row) {
            log.debug("deleteAssignmentReply()", actionItem.Value, row, reply);
            var me = this;
            this._autoRefreshData(me);
        },
        lockReply: function (reply, actionItem, row) {
            log.debug("lockReply()", actionItem.Value, row, reply);
            row.mxLeftIconClass = "skd-icon-appointment";
            if ( row["MODRESOURCELOCK"] == "1"){
            	row.mxLeftIconClass = "skd-icon-appresourceloc";
            }
            row.GGanttRunMove = 'All,Move,Selected,Entire,Vert,Mouse'; // can only move vertically
            row._READONLY_STARTEND = true;
            this.SetValue(row, 'MODAPPOINTMENT', true, true); // notify other chart
            this.grid.RefreshRow(row);
        },
        unlockReply: function (reply, actionItem, row) {
            log.debug("unlockReply()", actionItem.Value, row, reply);
        	if (row["APPTREQUIRED"] == "1" || row["APPTREQUIRED"]=="Y" || row["APPTREQUIRED"]==true || row["APPTREQUIRED"]=="true") {
        		row.mxLeftIconClass = "skd-icon-requirement";
        	}
        	else if ( row["MODRESOURCELOCK"] == "1"){
            	row.mxLeftIconClass = "skd-icon-resourceloc";
            }
        	else {
        		delete row.mxLeftIconClass;
        	}
        	delete row.GGanttRunMove;
        	delete row._READONLY_STARTEND;
        	this.SetValue(row, 'MODAPPOINTMENT', false, true); // notify other chart
        	this.grid.RefreshRow(row);
        },
        
        reslockReply: function (reply, actionItem, row) {
            log.debug("reslockReply()", actionItem.Value, row, reply);
            row.mxLeftIconClass = "skd-icon-resourceloc";
            if ( row["MODAPPOINTMENT"] == "1"){
            	row.mxLeftIconClass = "skd-icon-appresourceloc";
            }
            row.GGanttRunMove = 'All,Move,Selected,Entire,Slide,Mouse'; // can only move vertically
            row._READONLY_ASSIGNMENT = true;
            this.SetValue(row, 'MODRESOURCELOCK', true, true); // notify other chart
            this.grid.RefreshRow(row);
        },
        resunlockReply: function (reply, actionItem, row) {
            log.debug("resunlockReply()", actionItem.Value, row, reply);
        	if (row["APPTREQUIRED"] == "1" || row["APPTREQUIRED"]=="Y" || row["APPTREQUIRED"]==true || row["APPTREQUIRED"]=="true") {
        		row.mxLeftIconClass = "skd-icon-requirement";
        	}
        	else if ( row["MODAPPOINTMENT"] == "1"){
            	row.mxLeftIconClass = "skd-icon-appointment";
            }
        	else {
        		delete row.mxLeftIconClass;
        	}
        	delete row.GGanttRunMove;
        	delete row._READONLY_ASSIGNMENT;
        	this.SetValue(row, 'MODRESOURCELOCK', false, true); // notify other chart
        	this.grid.RefreshRow(row);
        },
        
        refreshResourceReply: function (reply, actionItem, row) {
            log.debug("unlockReply()", actionItem.Value, row, reply);
            var me = this;
            this._autoRefreshData(me);
        },
        reloadModel: function () {
        	this.firstTime = true;
            this.grid.Reload(null, null, false);
            this.sendToBeSaved();
        }
    });

    return _ACTIONS;
});

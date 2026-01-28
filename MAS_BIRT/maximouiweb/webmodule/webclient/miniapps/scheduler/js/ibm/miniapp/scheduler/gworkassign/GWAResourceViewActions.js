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
    	
    	  _refreshSelected: function(data) {
          	var selection = this._GetSelectedRowIds(this.grid, null, null);
          	var me = this;
          	if (selection == "") {
          		me.grid.ShowMessageTime("No work records selected.", 0);
          		return;
          	}
              this.fetch("_refreshSelected", me._ioOptions({
              	ids: selection
              })).then(function (reply) {
              	me.grid.AddDataFromServer(reply);
            	if (reply && reply.Changes && reply.Changes.length) {
            		var changes = reply.Changes;
            		for (var i=0; i<changes.length; i++) {
            			var assignmentRow = changes[i];
            			var newRow = me.grid.GetRowById(assignmentRow['id']);
            			if (newRow != null) {
            				newRow['_ASSIGNMENTID'] = assignmentRow['_ASSIGNMENTID'];
        					me.grid.RefreshRow(newRow);
            			}
            		}
            	}
              	me.publishLater('skd.workview.updated', {
                      grid: me.grid,
                      result: reply.Result
                  });
                me.grid.RefreshGantt(1);
              	me.grid.ClearSelection();
              	me.showMessage("scheduler#refreshproject");
              });
          },

        _showWorkAction: function (actionItem, row) {
            log.debug("showWorkAction(): ", actionItem);
            this.ZoomTo(row['startTime'], row['endTime']);
            return true;
        },

        _lockAction: function (actionItem, row) {
            var rows = this._GetSelectedRows(this.grid, 'G', row);
            this._applyForEachRow(rows, lang.hitch(this, function (row) {
                log.debug("before lock activity", actionItem.Value, row, row['MODAPPOINTMENT']);
                row.mxLeftIconClass = "skd-icon-appointment";
                row.GGanttRunMove = 'All,Move,Selected,Entire,Vert,Mouse'; // can only move vertically
                row._READONLY_STARTEND = true;
                this.SetValue(row, 'MODAPPOINTMENT', true, true); // notify other chart
            }));
        },
        _unlockAction: function (actionItem, row) {
            var rows = this._GetSelectedRows(this.grid, 'G', row);
            this._applyForEachRow(rows, lang.hitch(this, function (row) {
                log.debug("before unlock activity", actionItem.Value, row, row['MODAPPOINTMENT'], row["APPTREQUIRED"]);
        	if ( row["APPTREQUIRED"] == "1" || row["APPTREQUIRED"]=="Y" || row["APPTREQUIRED"]==true|| row["APPTREQUIRED"]=="true"){
	                row.mxLeftIconClass = "skd-icon-requirement";
        	}
        	else {
        		delete row.mxLeftIconClass;
        	}
                delete row.GGanttRunMove;
                delete row._READONLY_STARTEND;
                this.SetValue(row, 'MODAPPOINTMENT', false, true); // notify other chart
            }));
        },
        
        _reslockAction: function (actionItem, row) {
            var rows = this._GetSelectedRows(this.grid, 'G', row);
            this._applyForEachRow(rows, lang.hitch(this, function (row) {
                log.debug("before lock activity", actionItem.Value, row, row['MODRESOURCELOCK']);
                row.mxLeftIconClass = "skd-icon-appointment";
                row.GGanttRunMove = 'All,Move,Selected,Entire,Slide,Mouse'; // can only move vertically
                row._READONLY_ASSIGNMENT = true;
                this.SetValue(row, 'MODRESOURCELOCK', true, true); // notify other chart
            }));
        },
        _resunlockAction: function (actionItem, row) {
            var rows = this._GetSelectedRows(this.grid, 'G', row);
            this._applyForEachRow(rows, lang.hitch(this, function (row) {
                log.debug("before unlock activity", actionItem.Value, row, row['MODRESOURCELOCK'], row["APPTREQUIRED"]);
        	if ( row["APPTREQUIRED"] == "1" || row["APPTREQUIRED"]=="Y" || row["APPTREQUIRED"]==true|| row["APPTREQUIRED"]=="true"){
	                row.mxLeftIconClass = "skd-icon-requirement";
        	}
        	else {
        		delete row.mxLeftIconClass;
        	}
                delete row.GGanttRunMove;
                delete row._READONLY_ASSIGNMENT;
                this.SetValue(row, 'MODRESOURCELOCK', false, true); // notify other chart
            }));
        },

        newWorkActionReply: function (reply, actionItem, row) {
            log.debug("newWorkActionReply()", actionItem.Value, row, reply);
            this.processReply(reply);
        },
        deleteWorkActionReply: function (reply, actionItem, row) {
            log.debug("deleteWorkActionReply()", actionItem.Value, row, reply);
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
        },
        reloadModel: function () {
            this.grid.Reload(null, null, false);
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
        				newRow['ISASSIGNMENT'] = assignmentRow['ISASSIGNMENT'];
    					newRow['_OBJECTNAME'] = assignmentRow['_OBJECTNAME'];
    					newRow['_REFOBJECTNAME'] = assignmentRow['_REFOBJECTNAME'];
    					newRow['_PARENT_WONUM'] = assignmentRow['_PARENT_WONUM'];
    					newRow['_WONUM'] = assignmentRow['_WONUM'];
    					newRow['WONUM'] = assignmentRow['WONUM'];
    					newRow['WOPARENT'] = assignmentRow['WOPARENT'];
    					newRow['WOGROUP'] = assignmentRow['WOGROUP'];
    					newRow['TASKID'] = assignmentRow['TASKID'];
        				newRow['_INTERNALSTATUS'] = assignmentRow['_INTERNALSTATUS'];
    					newRow['_OBJECTNAME'] = assignmentRow['_OBJECTNAME'];
    					newRow['WORKLOG'] = assignmentRow['WORKLOG'];
    					newRow['STATUS'] = assignmentRow['STATUS'];
    					newRow['SKILLLEVEL'] = assignmentRow['SKILLLEVEL'];
    					newRow['mxRightIconClass'] = assignmentRow['mxRightIconClass'];
    					newRow['mxRightIconClick'] = assignmentRow['mxRightIconClick'];
    					if (assignmentRow['TASKID'] != null)
    						newRow['TASKID'] = assignmentRow['TASKID'];
    					newRow['APPTREQUIRED'] = assignmentRow['APPTREQUIRED'];
    					newRow['MXDURATION'] = assignmentRow['MXDURATION'];
    					newRow['duration'] = assignmentRow['duration'];
    					newRow['startTime'] = assignmentRow['startTime'];
    					newRow['endTime'] = assignmentRow['endTime'];
    					newRow['duration'] = assignmentRow['duration'];
    					newRow['_ASSIGNMENTID'] = assignmentRow['_ASSIGNMENTID'];
    					newRow['_ASSIGNMENTCREW'] = assignmentRow['_ASSIGNMENTCREW'];
    					newRow['_ASSIGNMENTCREWTYPE'] = assignmentRow['_ASSIGNMENTCREWTYPE'];
    					newRow['_ASSIGNMENTSKILL'] = assignmentRow['_ASSIGNMENTSKILL'];
    					newRow['_ASSIGNMENTCRAFT'] = assignmentRow['_ASSIGNMENTCRAFT'];
    					newRow['_Resources'] = assignmentRow['_Resources'];
    					newRow['_ASSIGNMENTLABOR'] = assignmentRow['_ASSIGNMENTLABOR'];
                    	newRow['GGanttBackground'] = assignmentRow['GGanttBackground'];
                    	newRow['IsSummary'] = assignmentRow['IsSummary'];
                    	newRow['ERRVAL'] = assignmentRow['ERRVAL'];
                    	this.SetValue(newRow, 'startTime', newRow['startTime'], true);
						this.SetValue(newRow, 'endTime', newRow['endTime'], true);
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
        		if (this._focusGanttObject != null) {
        			delete this._focusGanttObject._GGanttClassOld;
        			delete this._focusGanttObject.GGanttClass;
        			delete this._focusGanttObject._SKDRunClassOld;
        			delete this._focusGanttObject._SKDRunClass; // run bars
        		}
                this.grid.RefreshGantt(1);
                this._focusGanttObject = null;
                this.grid.ClearSelection();
            	this.publishTo('skd.refreshResource', null);
        	}
        	else{
        		  this._focusGanttObject = null;
                  this.grid.ClearSelection();
        	}
        }
    });

    return _ACTIONS;
});

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
    "dojo/aspect",
    "com/ibm/tivoli/maximo/miniapps/_MaximoIO",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
    "dojo/_base/lang",
    "ibm/miniapp/scheduler/gantt/GanttWidget",
    "ibm/miniapp/scheduler/gantt/BaseResourceViewWidget",
    "com/ibm/tivoli/maximo/miniapps/Handlers",
    "ibm/miniapp/scheduler/gantt/CommonResourceHoursView"
    

], function (declare, aspect, _MaximoIO, log, lang, GanttWidget,
             BaseResourceViewWidget, Handlers, CommonResourceHours) {
	
	var DEFAULT_WIDTH = 1000;
	var ONE_WEEK = 604800000;

    return declare([GanttWidget, _MaximoIO, BaseResourceViewWidget, Handlers, CommonResourceHours], {
        constructor: function (options) {
            // super is called automatically, apparently
            log.debug("{} Base Bean Target set to {} for view", this.gridId, this.mxtargetbean, options);
            this.showCurrentDateLine=false;
            this.aspectShowHideElHandle=null;

            // Mod Avail selection properties
            this.selectedModAvailReasonCode = "";
            this.selectedModAvailDurationType = "FULLDAY";
            //selected activities for assign
            this.selectedActivities = "";

            // Flag to force double-click when top Gantt has been previously selected.
            this.topGanttSelected = false;
            // Used to handle highlighted rows and cells
            this.highlightedRows = [];
            this.highlightedRowsColor = new Map();
            this.highlightedCells = [];
        },

        _newTreeGridOptions: function () {
            var me = this;
            var options = {
                Data: {Url: me.toUrl('async_load_project_data', me._ioOptions({})), Timeout: 300},
                Layout: {
                    Url: me.toUrl('async_load_project_ui', me._ioOptions({
                        appname: me.appname,
                        projectid: me.projectid
                    }))
                }
            };

            return options;
        },

        upgradeTGInstance: function(grid) {
            this.inherited(arguments);

            AddEvent('OnGetGanttHeader', this.gridId, lang.hitch(this, this.OnGetGanttHeader));
            this.grid._onChangeModAvailRsnCode = lang.hitch(this, this._onChangeModAvailRsnCode);
            this.grid._onChangeModAvailDurationType = lang.hitch(this, this._onChangeModAvailDurationType);
            this.grid._showLegendDialogAction = lang.hitch(this, this._showLegendDialogAction);
        },
        
        addCustomActions:function(gridId) {
            // register the FilterResource on the Grids instance so that we can access
            // it statically and without a Grid instance
            window.Grids.FilterResources = function (Grid,Row) {
                for (var i = 0; i < Grid.__FilterResourcesData.length; i++) {
                    if (Row['name'].trim() == Grid.__FilterResourcesData[i].trim()) return true;
                }
                return false;
            };

            window.Grids.FilterResourcesCrewWorkGroup = function (Grid,Row) {
                for (var i = 0; i < Grid.__FilterResourcesCrewWorkGroupData.length; i++) {
                    if (Row['CREWWORKGROUP'] == Grid.__FilterResourcesCrewWorkGroupData[i]) return true;
                }
                return false;
            };
        },

        hideGanttZoomOptions: function() {
        	return true;
        },
        
        OnGetGanttHeader: function (/*TGrid*/ grid, /*string*/ val, /*int*/ index, /*int*/ date, /*int*/ nextdate, /*string*/ units, /*int*/ width, /*int*/ partial, /*string*/ col) {
        	if (index == 3) {
            	val = DateToString(date, 'ddd/dd');
        	}
        	return val;
        },

        OnGanttTip: function( grid,  row,  col,  tip,  XY,  name) {
        	var box;

        	if (row['_OBJECTNAME'] == 'CRAFT' || row['_OBJECTNAME'] == 'AMCREWT')
        		return null;

        	if (name === 'Run' && XY && XY['RunId']){
        	    // acount for run box
                box = this.GetRowById(XY['RunId']);
            }

        	var text = null;
        	var dayIndex = box['id'].split("DAY").pop();
        	var modAvailInfo = row['MODAVAILINFO' + dayIndex];
        	if (modAvailInfo) {
        		modAvailInfo = JSON.parse(modAvailInfo);
        		if (modAvailInfo.length && modAvailInfo.length > 1) {
        			text = this.label('multipleModAvail');
        		}
        		else {
    				var tpl;
    	            var tplKey = 'gantt.MODAVAIL.tip.tpl';
    	            if (this[tplKey] != null) {
    	                tpl = this[tplKey];
    	                if (tpl == null || tpl.trim().length == 0) tpl = '{reasonCode} / {start}-{finish}';
    	            }

    	            var clonedModAvail = Object.assign({}, modAvailInfo[0]);
        			if (clonedModAvail['duration'] != null) {
        				var duration = this.doubleToDuration(clonedModAvail['duration'], false);
        				clonedModAvail['duration'] = duration;
        			}
        			
    	        	// process template
        			text = lang.replace(tpl, lang.hitch({row: clonedModAvail}, this.__rowValFunc));
    	            if (text == null || text.trim().length == 0) {
            			var interval = " / " + start + "-" + finish;
            			text = clonedModAvail['reasonCode'] + interval;
    	            }
        		}
        	}

        	return text;
        },
        
        OnTableContextMenu: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            log.debug("OnTableMenuContextMenu: {}", col, grid.Cols[col]);
            var me = this;
            if (!grid.Cols[col]) return false;

            if (col == 'G') {
                value = row['id'];
            } else {
                value = row[col];
            }
            row = this.GetRow(grid, row, col, x, y);

            var objs = grid.GetGanttXY(row, col, x, y);
            // returns the "selection" as distinct list of resources and activities
            var selectedItems = this.GetSelectionIds(grid, col, row);
            // returns the selection as just a list of row ids
            var selection = this._GetSelectedRowIds(grid, col, row);
            var selecteddate = row['START'];
            var allowedRow = row['_OBJECTNAME'] == 'LABOR' || row['_OBJECTNAME'] == 'AMCREW';
            if (col === 'G' && this.enableModAvail && allowedRow) {
            	var objs = grid.GetGanttXY(row, col, x, y);
            	if (objs != null && objs.Type != null && objs.RunId) {
            		var runId = objs.RunId;
                    if (this.selectedModAvailDurationType == 'FULLWEEK') {
                    	runId = runId.replace(/.$/,"1");
                    }
                    var r = this.GetRowById(runId);
                    var selection = this._GetSelectedObjectIds(grid, null, null);
                    if (selection == "") {
                    	selection = row['_OBJECTID'];
                    }

                    log.debug('Selected Row: {}', r);
                    var selecteddate = r['START'];
            	}
            }
            log.debug("OnTableMenuContextMenu: Context Menu: Selection: {}", selection, selectedItems);
            if (value == undefined)
            	return true;

            this.fetch("async_get_table_context_menu", me._ioOptions({
            	projectid: me.projectid,
            	id: selection,
            	selection: selectedItems,
            	col: col,
            	value: value,
            	selecteddate: selecteddate
            })).then(function (menu) {
            	menu = me._AdditionalTableContextMenu(menu, grid, row, col, x, y, event);
            	me._ShowContextMenu(menu, grid, row, col, x, y, event, selectedItems);
            });

            return true;
        },

        OnShowTooltip: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            //log.debug('COL: [{}]',col, grid.Cols);
            var me = this;
            if ('Panel' == col) return; // skip clicks on the panel col
            if ('name' == col) {
                // filter out the "tree nodes"
                if (!(event && event.srcElement && event.srcElement.id && event.srcElement.id.indexOf('TGCell_') != -1)) {
                    return;
                }
            }
            if ('startTime' == col || 'endTime' == col) {
                // don't show tt for edit fields
                return;
            }
            if ('Data' === row.Kind) {
                if (col == 'G') {
                    // log.debug("GANTT TIP: {} {} {} {}", clientX, clientY, X, Y);
                    var objs = grid.GetGanttXY(row, col, x, y);
                    log.debug("Gantt Object", objs);
                    if (objs != null && objs.Point != null) {
                        // Point Object
                        this.fetch("async_get_tooltip_for_point", me._ioOptions({
                            projectid: me.projectid,
                            id: objs.Row.id,
                            point_index: objs.PointIndex
                        })).then(function (tooltip) {
                            me._showTooltip(tooltip, event, objs.Row);
                        });
                        return false;
                    } else if (objs != null && objs.Main != null) {
                        // normal bar, do nothing
                    } else if (objs != null && objs.RunId != null) {
                        // run bar item
                        row = this.GetRowById(objs.RunId);
                        log.debug('Using RUN BAR for ToolTip',objs, objs.RunId, row);
                    } else if (objs != null && objs.Type == 'dependency') {
                        log.debug('Using Dependency for ToolTip', objs);
                        if (objs.DependencyFromBox === '0') {
                            this._fetchDependencyTooltip(objs.DependencyFrom, objs.DependencyTo, event);
                        } else {
                            this._fetchDependencyTooltip(objs.DependencyFromBox, objs.DependencyToBox, event);
                        }
                        return false;
                    } else {

                        var clickDate = this.getDateForX(x);
                        log.debug("Gantt Click at {} is date {} ({})",x, clickDate, new Date(clickDate).toUTCString());

                        // so no real gantt object for us, so let's fetch a tooltip based on the date
                        this.fetch("async_get_tooltip_for_date", me._ioOptions({
                            projectid: me.projectid,
                            id: row.id,
                            col: col,
                            date: clickDate
                        })).then(function (tooltip) {
                            me._showTooltip(tooltip, event, row);
                        });

                        // don't tooltip non-gantt bar objects
                        return false;
                    }
                }

                // turns on async.js debugging
                // window.DEBUGLEVEL=5;

                var clickDate = this.getDateForX(x);
                var rowId = row.id;
                if (row['_OBJECTNAME'] == 'LABOR' || row['_OBJECTNAME'] == 'AMCREW') {
                	rowId = row['_PARENTID'];
                }
                this.fetch("async_get_tooltip", me._ioOptions({
                    projectid: me.projectid,
                    id: rowId,
                    col: col,
                    date: clickDate
                })).then(function (tooltip) {
                    me._showTooltip(tooltip, event, row);
                });
                return;
            }
        },
        
        _onChangeModAvailRsnCode: function (modAvailReasonCode) {
        	this.selectedModAvailReasonCode = modAvailReasonCode;
        },

        _onChangeModAvailDurationType: function (modAvailDurationType) {
        	this.selectedModAvailDurationType = modAvailDurationType;
        },

        _onSaveModAvailRsnCode: function (selection, objectName, date) {
        	var me = this;
        	this.grid.ShowMessage(this.messages['pleasewait'], /*importance*/ 2, /*type*/ 3);
            this.fetch("async_save_modavail_rsncode", me._ioOptions({
                projectid: me.projectid,
                selection: selection,
                objectName: objectName,
                date: date,
                reasonCode: this.selectedModAvailReasonCode,
                durationType: this.selectedModAvailDurationType
            })).then(function () {
            	 if (me.lastCfg != null) {
            		 me.grid.LoadCfg(me.lastCfg);
            	 }
                 me.grid.ReloadBody(function() {
                	 me.grid.ClearSelection();
                 });
                 if (me.clearReasonCode) {
                	 me.selectedModAvailReasonCode = "";
                 	 me.grid.Toolbar.MODAVAILRSNCODE = "";
                	 me.grid.RefreshRow(me.grid.Toolbar);
                 }
             });
        },

        _onDeleteModAvailRsnCode: function (selection, objectName, date) {
        	var me = this;
        	this.grid.ShowMessage(this.messages['pleasewait'], /*importance*/ 2, /*type*/ 3);
            this.fetch("async_delete_modavail_rsncode", me._ioOptions({
                projectid: me.projectid,
                selection: selection,
                objectName: objectName,
                date: date,
                durationType: this.selectedModAvailDurationType
            })).then(function (reply) {
            	 if (reply.IO.Result >= 1000) {
                	 if (me.lastCfg != null) {
                		 me.grid.LoadCfg(me.lastCfg);
                	 }
                     me.grid.ReloadBody(function() {
                    	 me.grid.ClearSelection();
                     });
            		 if (me.clearReasonCode) {
                    	 me.selectedModAvailReasonCode = "";
                     	 me.grid.Toolbar.MODAVAILRSNCODE = "";
                    	 me.grid.RefreshRow(me.grid.Toolbar);
                     }
            	 } else {
            		 me.HideTGMessage();
            		 me.grid.ShowMessageTime('There is no modified availability to be removed.', 0);
            	 }
             });
        },
        
        onWorkViewReferenceReceived: function(msg) {
            log.debug("Got a Work View Reference'", msg);
            if (msg.grid) {
                this.linkedWorkViewGrid=msg.grid;
                this.linkedWorkView=msg.view;
                //this._updateSync();
                this._workviewChanged();
            }
        },

        /**
         * Called GetSelectedRows and return the IDs as a comma separated list of IDs
         */
        _GetSelectedObjectIds: function (grid, col, curRow) {
            var rows = this._GetSelectedRows(grid, col, curRow);
            var selection = "";
            var comma = "";
            for (var k in rows) {
            	var selRow = rows[k];
            	if (curRow != null && selRow != null && curRow['_OBJECTNAME'] != selRow['_OBJECTNAME'])
            		continue;
                selection = selection + comma + selRow['_OBJECTID'];
                comma = ",";
            }
            return selection;
        },

        _unassignAllAction: function(actionItem, row) {
        	var actionValues = actionItem.Values;
        	var selectedDate = actionValues.selecteddate;
        	var me = this;
        	this.grid.ShowMessage(this.messages['pleasewait'], /*importance*/ 2, /*type*/ 3);
            this.fetch("async_unassign_all", me._ioOptions({
                projectid: me.projectid,
                id: row['_PARENTID'],
                date: selectedDate
            })).then(function (reply) {
            	if (reply && reply.Changes && reply.Changes.length) {
            		var changes = reply.Changes;
            		for (var i=0; i<changes.length; i++) {
            			var assignmentRow = changes[i];
            			var newRow = me._otherGRID.grid.GetRowById(assignmentRow['id']);
            			if (newRow != null) {
        					newRow['_ASSIGNMENTCREW'] = assignmentRow['_ASSIGNMENTCREW'];
        					newRow['_ASSIGNMENTCREWTYPE'] = assignmentRow['_ASSIGNMENTCREWTYPE'];
        					newRow['_ASSIGNMENTSKILL'] = assignmentRow['_ASSIGNMENTSKILL'];
        					newRow['_ASSIGNMENTCRAFT'] = assignmentRow['_ASSIGNMENTCRAFT'];
        					newRow['_ASSIGNMENTLABOR'] = assignmentRow['_ASSIGNMENTLABOR'];
        					newRow['_Resources'] = assignmentRow['_Resources'];
        					newRow['Resources'] = assignmentRow['Resources'];
        					me._otherGRID.grid.RefreshRow(newRow);
            			}
            		}
            	}
                me.HideTGMessage();
                me.publishLater('skd.refreshAssignment', reply, 100, 'skd.refreshAssignment');
            });
        },

        _viewAssignmentsAction: function (actionItem, row) {
        	log.debug('Selected row: {}', row);
            var dialogname = 'view_assign';
            addCommInput('selectedAssignments', row['EXTERNALASSIGNMENTS']);
        	addCommInput('uniqueid', row.parentNode['_OBJECTID']);
        	addCommInput('actionname', dialogname);
    		addCommInput('dialogname', dialogname);
        	addCommInput('skdobjectname', row['_OBJECTNAME']);
        	addCommInput('objectname', row['_OBJECTNAME']);
        	addCommInput('eventtargetid', 'viewerng_resourcetabs_rshb_gantt');
        	addCommInput('projectid', this.projectid);
        	log.debug("sendEvent({},{})", dialogname, this.appname);
        	sendEvent(dialogname, this.appname, '');
        },

        _adjustCrewAssignmentsAction: function (actionItem, row) {
        	log.debug('Selected row: {}', row);
            var actionvalues = actionItem.Values;
            var selectedDate = actionvalues.selecteddate;
            var dialogname = 'crewassign';
        	addCommInput('uniqueid', row.parentNode['_OBJECTID']);
        	addCommInput('selectedDate', selectedDate);
        	addCommInput('actionname', dialogname);
    		addCommInput('dialogname', dialogname);
        	addCommInput('skdobjectname', row['_OBJECTNAME']);
        	addCommInput('objectname', row['_OBJECTNAME']);
        	addCommInput('eventtargetid', 'viewerng_resourcetabs_rshb_gantt');
        	addCommInput('projectid', this.projectid);
        	log.debug("sendEvent({},{})", dialogname, this.appname);
        	sendEvent(dialogname, this.appname, '');
        },

        _exportAssignmentsAction: function (actionItem, row) {
        	log.debug('Selected row: {}', row);
            var actionvalues = actionItem.Values;
            var selection = actionvalues.selection;
            var dialogname = 'export_calendar';
            
            var selectedRows = this.grid.GetSelRows();
            var objectNames = [];
            for (i=0; i<selectedRows.length; i++) {
            	objectNames.push(selectedRows[i]['_OBJECTNAME']);
            }
            
            if (objectNames.length == 0) {
            	objectNames.push(row['_OBJECTNAME']);
            }

            addCommInput('selection', selection);
            addCommInput('objectnames', objectNames.join());
        	addCommInput('actionname', dialogname);
    		addCommInput('dialogname', dialogname);
        	addCommInput('skdobjectname', row['_OBJECTNAME']);
        	addCommInput('objectname', row['_OBJECTNAME']);
        	addCommInput('eventtargetid', 'viewerng_resourcetabs_rshb_gantt');
        	addCommInput('projectid', this.projectid);
        	log.debug("sendEvent({},{})", dialogname, this.appname);
        	sendEvent(dialogname, this.appname, '');
        },

        _modavailAction: function (actionItem, row) 
        {
            var actionvalues = actionItem.Values;
            var selection = actionvalues.selection;
            var selectedDate = actionvalues.selecteddate;
            if (selection == "") {
            	if (row['_OBJECTID']) {
            		selection = row['_OBJECTID'];
            	}
            	else if (actionvalues.uniqueid) {
            		selection = actionvalues.uniqueid;
            	}
            }
        	this._modavailrsncode(selection, selectedDate, row);
        },

        _modavailrsncode: function (selection, selectedDate, row) {
        	var allowedRow = row['_OBJECTNAME'] == 'LABOR' || row['_OBJECTNAME'] == 'AMCREW';
            if (this.enableModAvail && allowedRow) {
                log.debug('Selected Row: {}', row);
                var day = new Date(this.TGDateToTZDate(selectedDate)).getDay() + 1;
                var workHours = 0;
                if (row.parentNode) {
                	var parent = row.parentNode;
                	workHours = parent['WORKHOURSDAY' + day];
                }
                var isWorkingTime = this.reasonCodes[this.selectedModAvailReasonCode] == "WORK";
                if (this.selectedModAvailReasonCode != "" && this.selectedModAvailReasonCode != "REMOVE") {
                	if (this.selectedModAvailDurationType != 'PARTIALDAY' && workHours > 0) {
                		var modAvailList = this.GetModAvailList(row);
                		if (isWorkingTime || (modAvailList && modAvailList.length >= 1)) {
                			this.openModAvailDialog(selection, selectedDate, row);
                		}
                		else {
                			this._onSaveModAvailRsnCode(selection, row['_OBJECTNAME'], selectedDate);
                		}
                	}
                	else if (this.selectedModAvailDurationType == 'FULLWEEK') {
                		var modAvailWeekList = this.GetModAvailWeekList(row);
                		if (!isWorkingTime && modAvailWeekList.length == 0) {
                			this._onSaveModAvailRsnCode(selection, row['_OBJECTNAME'], selectedDate);
                		}
                		else {
                			this.openModAvailDialog(selection, selectedDate, row);
                		}
                	}
                	else {
                		this.openModAvailDialog(selection, selectedDate, row);
                	}
                }
                else if (this.selectedModAvailReasonCode == "REMOVE") {
                	this._onDeleteModAvailRsnCode(selection, row['_OBJECTNAME'], selectedDate);
                }
                else {
                	this.HideTGMessage();
                	this.grid.ShowMessageTime('There is no reason code specified.', 0);
                }
            }
        },
        
        shouldRightClickSelectRow: function(grid, row, col) {
        	return false;
        },


        shouldDblClickSelectRow: function(grid, row, col) {
            return true;
        },
     
        OnDblClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
        	this.inherited(arguments);
        	var allowedRow = row['_OBJECTNAME'] == 'LABOR' || row['_OBJECTNAME'] == 'AMCREW';
            var objs = grid.GetGanttXY(row, col, x, y);
            if (col === 'G' && allowedRow) {
            	if (this.selectedActivities != "") {
                    if (objs != null && objs.Type != null && objs.RunId) {
                    	var runId = objs.RunId;
                    	var r = this.GetRowById(runId);
                        var selection = this.selectedActivities;
                        if (selection == "") {
                        	selection = row['_OBJECTID'];
                        }

                    	log.debug('Selected Row: {}', r);
                    	var selectedDate = r['START'];
                    	var day = new Date(this.TGDateToTZDate(selectedDate)).getDay() + 1;
                    	var workHours = row['WORKHOURSDAY' + day];
                    	this.assignAction(selection, selectedDate, row);              	
                    }
            	}
            	else if (allowedRow && this.enableModAvail) {
                    // returns the "selection" as distinct list of resources and activities
            		var selection = this._GetSelectedObjectIds(grid, col, row);
                    if (selection == "") {
                    	selection = row['_OBJECTID'];
                    }
                    var selectedDate = row['START'];
                    if (objs != null && objs.Type != null && objs.RunId) {
                    	var runId = objs.RunId;
                    	if (this.selectedModAvailDurationType == 'FULLWEEK') {
                    		runId = runId.replace(/.$/,"1");
                    	}
                    	var r = this.GetRowById(runId);

                    	log.debug('Selected Row: {}', r);
                    	selectedDate = r['START'];
                    }
            		this._modavailrsncode(selection, selectedDate, r);
            	}
            }
			else if (col === 'CRAFT' && allowedRow) {
            	if (this.selectedActivities != "") {             
                        var selection = this.selectedActivities;
                        if (selection == "") {
                        	selection = row['_OBJECTID'];
                        }
                       	this.assignResourceAction(selection, row);              	                
            	}
			}
        },

        assignAction: function (selection, selectedDate, row) {
            var dialogname = 'ASSIGNLAB';
            var assignamcrew = row['_OBJECTNAME'] == 'AMCREW' ;
        	if (assignamcrew) {
        		dialogname='CRWASSIGNA';
        	}
        	
        	var activityIDs = this.linkedWorkView._GetSelectedRowIds(this.linkedWorkViewGrid);
        	addCommInput('activities', activityIDs);
        	addCommInput('uniqueid', row['_OBJECTID']);
        	addCommInput('selection', selection);
        	addCommInput('workdate', selectedDate);
        	addCommInput('actionname', dialogname);
    		addCommInput('dialogname', dialogname);
        	addCommInput('skdobjectname', row['_OBJECTNAME']);
        	addCommInput('objectname', row['_OBJECTNAME']);
        	addCommInput('eventtargetid', 'viewerng_resourcetabs_rshb_gantt');
        	addCommInput('projectid', this.projectid);
        	log.debug("sendEvent({},{})", dialogname, this.appname);
        	sendEvent(dialogname, this.appname, '');
        },
		assignResourceAction: function (selection, row) {
            var dialogname = 'ONLYASSIGNLAB';
            var assignamcrew = row['_OBJECTNAME'] == 'AMCREW' ;
        	if (assignamcrew) {
        		dialogname='ONLYCRWASSIGNA';
        	}
        	
        	var activityIDs = this.linkedWorkView._GetSelectedRowIds(this.linkedWorkViewGrid);
        	addCommInput('activities', activityIDs);
        	addCommInput('uniqueid', row['_OBJECTID']);
        	addCommInput('selection', selection);
        	addCommInput('actionname', dialogname);
    		addCommInput('dialogname', dialogname);
        	addCommInput('skdobjectname', row['_OBJECTNAME']);
        	addCommInput('objectname', row['_OBJECTNAME']);
        	addCommInput('eventtargetid', 'viewerng_resourcetabs_rshb_gantt');
        	addCommInput('projectid', this.projectid);
        	log.debug("sendEvent({},{})", dialogname, this.appname);
        	sendEvent(dialogname, this.appname, '');
        },
        
        openModAvailDialog: function (selection, selectedDate, row) {
            var dialogname = 'MODIFYMODAVAIL';
        	addCommInput('selection', selection);
        	addCommInput('workdate', selectedDate);
        	addCommInput('actionname', dialogname);
        	addCommInput('dialogname', dialogname);
        	addCommInput('linkedapp', dialogname);
        	addCommInput('skdobjectname', row['_OBJECTNAME']);
        	addCommInput('objectname', row['_OBJECTNAME']);
        	addCommInput('eventtargetid', 'viewerng_resourcetabs_rshb_gantt');
        	addCommInput('projectid', this.projectid);
        	addCommInput('reasoncode', this.selectedModAvailReasonCode);
        	addCommInput('durationtype', this.selectedModAvailDurationType);
        	log.debug("sendEvent({},{})", dialogname, this.appname);
        	sendEvent(dialogname, this.appname, '');
        },

        attachExtraGridEvents: function (gridId) {
            this.inherited(arguments);
            log.debug('{} Registering extra grid events', this.TAG);

            AddEvent('OnRowFilter', gridId, lang.hitch(this, this.OnRowFilter));
            AddEvent('OnFilterFinish', gridId, lang.hitch(this, this.OnFilterFinish));
            AddEvent('OnMouseOver', gridId, lang.hitch(this, this.OnMouseOver));
            AddEvent('OnGetColor', gridId, lang.hitch(this, this.OnGetColor));

            /*
            Grids.OnRoundDate = function (grid, date, units) {
            	if (units == 'wskd') {
            		var d = new Date(me.TGDateToTZDate(date));
        			d.setHours(0);
        			d.setMinutes(0);
        			d.setSeconds(0);
        			d.setMilliseconds(0);
            		var day = d.getDay();
            		if(day != this.selectedDay) 
            			d.setDate(d.getDate()-day+this.selectedDay);
                	log.debug("OnRoundDate Data: {}", d);
                	var d = d - 0;
                	return me.TZDateToTGDate(d);
            	}
            	return null;
            };

            Grids.OnIncDate = function (grid, date, units, count) {
            	if (units == 'wskd') {
            		var convertedDate = date;
                	var total = (ONE_WEEK-1000) * count;
                	convertedDate = convertedDate + total;
                	var d = new Date(convertedDate);
                	log.debug("OnIncDate Data: {}", d);
                	return d-0;
            	}
            	return null;
            };
            */

            this.subscribeOn('skd.workview.rowselected', lang.hitch(this, this.workViewRowSelected));
            this.subscribeOn('skd.workview.updated', lang.hitch(this, this._workviewChanged));
            this.subscribeOn('skd.response.workview.reference', lang.hitch(this, this.onWorkViewReferenceReceived));
            this.subscribeOn('skd.refreshResource', lang.hitch(this,this._refreshResource));
            this.subscribeOn('skd.cancelModAvailDialog', lang.hitch(this,this._cancelModAvailDialog));
            this.subscribeOn('skd.workview.weekChange', lang.hitch(this, this._weekChanged));
            this.subscribeOn('skd.workview.filtered', lang.hitch(this, this.workViewFiltered));
        },

        setResourcesToHighlight: function (activitiesResources, assignedResources, row, skipAssigned) {
        	if (row['STATUS'] == 'ASSIGNED') {
        		if (!skipAssigned) {
            		var workDay = (row['_WorkDay'] + 1) % 7;
                	var rowId = row['_Resources'] + '_' + row['ORGID'] + '_DAY' + workDay;
            		assignedResources.add(rowId);
        		}

        		var craft = null;
        		if (row['_ASSIGNMENTCRAFT'] != null) {
        			craft = row['_ASSIGNMENTCRAFT'];
        		}
        		else if (row['_ASSIGNMENTCREW'] != null) {
        			craft = row['_ASSIGNMENTCREW'];
        		}
        		activitiesResources.add({craft: craft, skillLevel: row['_ASSIGNMENTSKILL']});
        	}
        	else {
        		activitiesResources.add({craft: row['_Resources'], skillLevel: row['_ASSIGNMENTSKILL']});
        	}
        },
        
        workViewRowSelected: function (msg) {
            if (!this.isVisible() || !this.initialized) return;

            var rows = msg.grid.GetSelRows();
            var activityids = [];
            var activitiesResources = new Set();
            var assignedResources = new Set();

    		var ptStart = this.grid.GetScrollLeft(2);
            var weekStart = this.grid.GetGanttDate(ptStart, "G");
            var weekEnd = weekStart + ONE_WEEK;
            
            if (msg.resourceFilterEnabled && rows && rows.length > 0) {
                var res = [];
                for (var i = 0; i < rows.length; i++) {
                	if (rows[i]['_ASSIGNMENTID'] == undefined) {
                		
                		if (rows[i]['_OBJECTID'] != undefined) {
                		activityids.push("WOID_" +rows[i]['_OBJECTID']);
                		}
                	}
                	else {
                		activityids.push(rows[i]['_ASSIGNMENTID']);
                	}
                    if (!rows[i]['Resources']) continue;
                    res.push(this._parseResources(rows[i]['Resources']));
                    var multires=rows[i]['Resources'].split(",");
                    if (multires && multires.length>1) {
                        for (var k=0;k<multires.length;k++) {
                            res.push(this._parseResource(multires[k]));
                        }
                    }

                    var skipAssigned = !rows[i]['startTime'] || !(rows[i]['startTime'] > weekStart && rows[i]['startTime'] < weekEnd);
                    this.setResourcesToHighlight(activitiesResources, assignedResources, rows[i], skipAssigned);
                }
                this.grid.__FilterResourcesData = res;
                log.debug('{}: Applying Resource Filter', this.TAG, res);
                this.grid.SetFilter('resources', "Grids.FilterResources(Grid,Row)", 'name', 2);
            } else {
            	if (rows && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                    	if (rows[i]['_ASSIGNMENTID'] == undefined) {
                    		activityids.push("WOID_" + rows[i]['_OBJECTID']);
                    	}
                    	else {
                    		activityids.push(rows[i]['_ASSIGNMENTID']);
                    	}
                    	if (!rows[i]['Resources']) continue;

                    	var skipAssigned = !rows[i]['startTime'] || !(rows[i]['startTime'] > weekStart && rows[i]['startTime'] < weekEnd);
                    	this.setResourcesToHighlight(activitiesResources, assignedResources, rows[i], skipAssigned);
                    }
            	}

            	var filterOff = msg.grid.GetFilter().length == 0;
            	if (filterOff) {
            		this.grid.SetFilter('resources', null, 'name', 2);
            		delete this.grid.__FilterResourcesData;
            	}

                log.debug('{}: Removing Resource Filter', this.TAG);
                delete this.grid.__FilterResources;
                //delete this.grid.__FilterResourcesData;
            }
            
            // Highlighting matching rows.
            this._applyRelatedAssignmentsHighlight(activitiesResources, assignedResources);
            
            this.selectedActivities = activityids;
            this._workViewRowSelected(activityids);
        },

        _workViewRowSelected: function (selection) {
        	var me = this;
        	this.grid.ShowMessage(this.messages['pleasewait'], /*importance*/ 2, /*type*/ 3);
            this.fetch("async_workview_selected", me._ioOptions({
                selection: selection              
            })).then(function (reply) {
            	 me.HideTGMessage();
            });
        },
        
        OnRenderFinish: function (/*TGrid*/ grid) {
            this.inherited(arguments);
            this.publishLater('skd.resourceview.loaded', {}, 100, 'skd.resourceview.loaded');
            this.linkedWorkView = this._otherGRID;
            this.linkedWorkViewGrid = this._otherGRID.grid;

            var me = this;
            if (this.isRefresh) {
            	var weekDate = this.currentWeek;
                this.fetch("_gotoWeek", me._ioOptions({
                	startWeekDay: weekDate,
                	resetWeek: false
                })).then(function (reply) {
                	me.grid.ReloadBody(function() {
                        if (me.highlightedRows && me.highlightedRows.length > 0) {
                        	for (var i=0; i<me.highlightedRows.length; i++) {
                        		var color = me.highlightedRowsColor.get(me.highlightedRows[i]);
                        		var row = me.GetRowById(me.highlightedRows[i]);
                        		if (row != null) {
                            		row.Color = color;
                            		me.grid.RefreshRow(row);
                        		}
                        	}
                        }
                	});
                	me.grid.ZoomTo(reply.startWeekDay, reply.endWeekDay, DEFAULT_WIDTH);
                	me.isRefresh = false;
                	me.currentWeek = null;
                });
            }

            // Re-enable the Work Filter state
            if (this.state) {
                if (this.state.WorkFilterEnabled) {
                    grid.Toolbar.FILTERWORK = this.state.WorkFilterEnabled;
                    grid.RefreshRow(grid.FILTERWORK);
                    this.invokeLater(function() {
                    	me._enableFilterWorkAction();
                    }, 100, "EnableFilterWork");
                }
                grid.RefreshRow(grid.Toolbar);
            }

            // Marking this view as initialized
            this.initialized = true;
            // Mark the Resources Filter as enabled if Flag is active
            this.invokeLater(function() {
                if (me.linkedWorkView._ResourceFilterEnabled) {
                	me.linkedWorkView._enableFilterResourcesAction();
                }
            }, 100, "EnableFilterResource");
        },

        OnLoadCustomCfg: function (/*TGrid*/ grid, /*string*/ custom, /*string*/ cfg) {
        	this.inherited(arguments);
        	this._WorkFilterEnabled = this.state.WorkFilterEnabled;
        },
        
        OnSaveCustomCfg: function (/*TGrid*/ grid, /*bool*/ ret) {
            if (!this.state) this.state={};
            // add in Filter state..
            if (grid && grid.Filter) {
                if (!this.state.Filter) this.state.Filter={};
                this.state.Filter.Visible = grid.Filter.Visible;
            }
            this.state.WorkFilterEnabled = this._WorkFilterEnabled;
            var cfg = JSON.stringify(this.state);
            log.debug("Custom State", cfg);
            return cfg;
        },

        _enableFilterWorkAction: function () {
        	this.inherited(arguments);
        	this.grid.SaveCfg();
        },

        _disableFilterWorkAction: function () {
        	this.inherited(arguments);
        	this.grid.SaveCfg();
        },

        workViewFiltered: function (msg) {
            if (!this.isVisible()) return;

            if (msg.grid.__FilterByWork) {
            	var resources = null;
            	var crewWorkGroups = null;
            	if (msg.grid.__FilterByWork.resources.size > 0) {
            		resources = Array.from(msg.grid.__FilterByWork.resources);
            	}
            	if (msg.grid.__FilterByWork.crewWorkGroups.size > 0) {
            		crewWorkGroups = Array.from(msg.grid.__FilterByWork.crewWorkGroups);
            	}

                if (resources == null && crewWorkGroups == null) {
                    log.debug('{}: Removing Resource Filter', this.TAG);
                    this.grid.SetFilter('resources', null, 'name', 2);
                    this.grid.SetFilter('resources', null, 'CREWWORKGROUP', 2);
                    delete this.grid.__FilterResources;
                    delete this.grid.__FilterResourcesData;
                    delete this.grid.__FilterResourcesCrewWorkGroupData;
                    return;
                }

                this.grid.__FilterResourcesData = resources;
                this.grid.__FilterResourcesCrewWorkGroupData = crewWorkGroups;
                if (resources != null) {
                	log.debug('{}: Applying Resource Filter', resources);
                	this.grid.SetFilter('resources', "Grids.FilterResources(Grid,Row)", 'name', 2);
                }
                if (crewWorkGroups != null) {
                	log.debug('{}: Applying Resource Filter', crewWorkGroups);
                	this.grid.SetFilter('resources', "Grids.FilterResourcesCrewWorkGroup(Grid,Row)", 'CREWWORKGROUP', 2);
                }
                delete msg.grid.__FilterByWork;
            } else {
                log.debug('{}: Removing Resource Filter', this.TAG);
                this.grid.SetFilter('resources', null, 'name', 2);
                this.grid.SetFilter('resources', null, 'CREWWORKGROUP', 2);
                delete this.grid.__FilterResources;
                delete this.grid.__FilterResourcesData;
                delete this.grid.__FilterResourcesCrewWorkGroupData;
            }
        },

        _workviewChanged: function (result) {
            if (!this.isVisible() && (this.grid!=null)) return;
  	
            if (this.reloadRequired || this.grid==null) {
                this.reloadRequired=false;
                this._createUI(); // remove the old grid and create new one
                return;
            }

            if (result.isRefresh) {
            	this.isRefresh = result.isRefresh;
            	this.currentWeek = result.currentWeek;
            }

            log.debug("{} WORKVIEW CHANGED", this.TAG);
            // we reload the chart whenever the top view changes
            this.lastScollTop = this.grid.GetScrollTop();
            var me=this;
            try {
            	if (this.lastCfg != null) {
            		this.grid.LoadCfg(this.lastCfg);
            	}
            } catch (e) {
            	log.debug("LoadCfg error", e);
            }
            if (this.linkedWorkView) {
            	this.linkedWorkView.HideTGMessage();
            }
            this.grid.ShowMessage(this.label('loading_resources'), /*importance*/ 2, /*type*/ 3);
            this.grid.ReloadBody(function() {
                if (me.lastScollTop) {
                    me.invokeLater(function() {
                        log.debug("Updating Scroll Top: {}", me.lastScollTop);
                        me.grid.SetScrollTop(me.lastScollTop);
                        me._updateSync();
                    }, 300, "ReloadBody");
                } else {
                    me._updateSync();
                }

                // Re-selecting matching rows
                if (me.linkedWorkViewGrid) {
                    var activitiesResources = new Set();
                    var assignedResources = new Set();

            		var ptStart = me.grid.GetScrollLeft(2);
                    var weekStart = me.grid.GetGanttDate(ptStart, "G");
                    var weekEnd = weekStart + ONE_WEEK;
                    var rows = me.linkedWorkViewGrid.GetSelRows();

                    if (rows && rows.length > 0) {
                        for (var i = 0; i < rows.length; i++) {
                        	var skipAssigned = !rows[i]['startTime'] || !(rows[i]['startTime'] > weekStart && rows[i]['startTime'] < weekEnd);
                            me.setResourcesToHighlight(activitiesResources, assignedResources, rows[i], skipAssigned);
                        }
                    }
                    me._applyRelatedAssignmentsHighlight(activitiesResources, assignedResources);
                }

                // Re-enabling Work Filter
                if (me.state) {
                    if (me.state.WorkFilterEnabled) {
                        me.invokeLater(function() {
                        	me._enableFilterWorkAction();
                        }, 100, "EnableFilterWork");
                    }
                }
            });
        },

        onVisibilityChanged: function(visible) {
            log.debug("Visibility Has Changed: Visible: {}", visible );
            if (visible || this.grid==null) {
               //  this._updateSync();
               this._workviewChanged();
            } else {
                log.debug("Disabling Grid Sync");
                this.grid.SyncId=null;
            }
        },

        postCreate: function() {
            this.inherited(arguments);
            var me = this;
            this.aspectShowHideElHandle = aspect.after(window, "hideShowElement", function (el, display) {
                    if (el && el.querySelector && el.querySelector("#"+me.domId)) {
                        log.debug("ShowHideEl: called with {}", display);
                        me.onVisibilityChanged(me.isVisible());
                    }
                }
                , true);
        },

        destroy: function() {
            this.inherited(arguments);
            if (this.aspectShowHideElHandle) {
                this.aspectShowHideElHandle.remove();
                this.aspectShowHideElHandle=null;
            }
        },

        __refreshAssignment: function (data) {
        	log.debug("Do nothing here...");
        },

        OnGetGanttBarHtml: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ width, /*int*/ comp, /*int*/ crit, /*int*/ plan, /*int*/ index, /*string*/ txt, /*int*/ left, /*int*/ maxwidth, tgClasses, runErrorFlag) {
            //log.debug("1: w: {}, crit: {}, comp: {}, plan: {}, index: {}, txt: {}, left: {}, maxW: {}, cls: {}", width, crit, comp, plan, index, txt, left, maxwidth, tgClasses );
            // find the template
            var tpl = '{name}';
            var style = '';

            // NOTE: you can override the template per OBJECTNAME type
            var tplKey = 'gantt.' + row["_OBJECTNAME"] + ".tpl";
            if (this[tplKey] != null) {
                tpl = this[tplKey];
                if (tpl == null || tpl.trim().length == 0) tpl = '{name}';
            }

            // process template
            var text = lang.replace(tpl, lang.hitch({row: row}, this.__rowValFunc));
            if (text == null || text.trim().length == 0) text = row['name'];

            if (row['IsSummary']) {
                return text;
            } else {
                var cls = '', altCls1 = '', clsInner;
                if (row["_INTERNALSTATUS"] != null) {
                    cls = "SKD" + row['_OBJECTNAME'] + "_" + row["_INTERNALSTATUS"];
                } else {
                    cls = "SKD" + row['_OBJECTNAME'];
                }
                if (this.usePriorityColors && row["WOPRIORITY"]) {
                    cls = "SKD" + row['_OBJECTNAME'] + "_PRIORITY_" + row["WOPRIORITY"];
                }
                clsInner = cls+"-inner";
                if (row["STATUS"]) {
                    var val = ("SKDSYN_" + row['_OBJECTNAME'] + "_" + row["STATUS"].toString().replace(/\s+/g,'-'));
                    cls += (" " + val);
                    clsInner += (" " + val + "-inner");
                }
                if (row.ERRVAL) {
                    // log.debug("ERROR CHECK: {}: {}", row.id, row.ERRVAL);
                    cls = "";
                    if   ((row.ERRVAL & (this.ERRORS.ERR_INVALID_CRAFT_SKILL)) != 0) {
                        // log.debug("ERROR CHECK: {}: invalid skill map: {}; {}", row.id, row.ERRVAL, (row.ERRVAL & (1 << 2)));
                        cls = "skd-InvalidSkillMap";
                    }

                    if ((row.ERRVAL & (this.ERRORS.ERR_CONFLICT_DOUBLE_BOOKED)) != 0 || (row.ERRVAL & (this.ERRORS.ERR_CONFLICT_NON_WORK)) != 0) {
                        // log.debug("ERROR CHECK: {}: conflict: {}; {}", row.id, row.ERRVAL, (row.ERRVAL & (1 << 3)));
            			if (row["_INTERNALSTATUS"] == 'ASSIGNED') {
                        	cls += " skd-Conflict";
			            }
                    }

                    if ((row.ERRVAL & (this.ERRORS.ERR_SCHEDULE_WINDOW)) != 0) {
                        // log.debug("ERROR CHECK: {}: schedule window", row.id);
                        cls += " skd-err-schedule-window";
                    }

                    if (cls == '') {
                        // log.debug("ERROR CHECK: {}: other error: {}", row.id, row.ERRVAL);
                        cls += " skd-error";
                    }
                }

                if (row['EXTRATIMEMODAVAIL'] && row['NONWORKMODAVAIL']) {
                    if (row['FULLDAY']) {
                    	//cls += " WORKANDNONWORK_FULLDAY";
                    }
                    else {
                    	//cls += " WORKANDNONWORK";
                    }
                }
                else if (row['EXTRATIMEMODAVAIL']) {
                    //cls += " EXTRATIME";
                }
                else if (row['NONWORKMODAVAIL']) {
                    if (row['FULLDAY']) {
                    	//cls += " NONWORK_FULLDAY";
                    }
                    else {
                    	//cls += " NONWORK";
                    }
                }
                
                if (row['EXTERNALASSIGNMENTS'] && row['EXTERNALASSIGNMENTS'] != null) {
                	cls += " EXTERNALASSIGNMENTS";
                }
                
                if (row['_ALTCLASS']) {
                    altCls1 = row['_ALTCLASS'];
                }
                var readonly = (row['_READONLY'] == true) ? ' skd-READONLY' : '';
                var readonlyDur = (row['_READONLY_DURATION'] == true) ? ' skd-READONLY_DURATION' : '';
                var readonlyAssign = (row['_READONLY_ASSIGNMENT'] == true) ? ' skd-READONLY_ASSIGNMENT' : '';
                var readonlyStart = (row['_READONLY_STARTEND'] == true) ? ' skd-READONLY_STARTEND' : '';
                var altCls = this._GetAltCSSClassForActivity(row) || '';
                var clses = 'skd-bar ' + cls + ' ' + altCls1 + ' ' + altCls + ' ' + readonlyStart + readonlyDur + readonlyAssign + readonly;
                var altclses = 'skd-bar-inner ' + clsInner + " " + (altCls ? (altCls + '-inner '):'');
                var barStyle=null;
                if (this.GetBarStyle) {
                    barStyle=this.GetBarStyle(row);
                    if (barStyle) {
                        // we need a better way for this
                        var styleName = 'st-'+row.id;
                        var styleEl = document.createElement('style');
                        styleEl.type = 'text/css';
                        styleEl.innerHTML = '.' +styleName+ ' { '+barStyle+' }';
                        clses += ' ' + styleName;

                        if (!tgClasses) {
                            tgClasses=[];
                        }

                        // set the bar colors
                        tgClasses[2] = clses;
                        // set text properties
                        tgClasses[3] = altclses;

                        text = row['TEXT'];
                        var bar = '<div class="' + clses + '" style="'+barStyle+'" >' + ((text) ? text : '') + '</div>';
                        return bar;
                    }
                }

                if (!tgClasses) {
                    tgClasses=[];
                }

                // set the bar colors
                tgClasses[2] = clses;
                // set text properties
                tgClasses[3] = altclses;

                if (text != null) {
                    text = text.replace(/\|/g, '&vert;');
                    text = text.replace(/\'/g, '&apos;');
                }
                return text;
            }
        },

        GetModAvailList: function(row) {
            var dayIndex = row.DAYINDEX % 7;
			if (dayIndex == 0)
				dayIndex = 7;
            var weekIndex = row.WEEK;
            var modAvailList;
            if (row.parentNode) {
            	var modAvailProp = 'WEEK' + weekIndex + '_MODAVAILINFO' + dayIndex;
            	modAvailList = row.parentNode[modAvailProp];
            	if (modAvailList) {
            		modAvailList = JSON.parse(modAvailList);
            	}
            }
            return modAvailList;
        },

        GetModAvailWeekList: function(row) {
            var weekIndex = row.WEEK;
            var modAvailWeekList = [];
            if (row.parentNode) {
            	for (var i=1; i<=7; i++) {
                	var modAvailProp = 'WEEK' + weekIndex + '_MODAVAILINFO' + i;
                	modAvailList = row.parentNode[modAvailProp];
                	if (modAvailList) {
                		modAvailList = JSON.parse(modAvailList);
                		modAvailWeekList.push(modAvailList);
                	}
            	}
            }
            return modAvailWeekList;
        },
        
        GetBarStyle: function(row) {
        	if (row['CREWASSIGNMENT']) {
        		var style="";
        		style+=("background: ");
        		style+=("url('miniapps/scheduler/crews-scheduled.png') no-repeat left center;");
        		style+=("background-position: 3px 5px, top right;");
                if (row['_ASSIGNMENTSELECTED']) {
                	style+=("border-style: dashed;");
                	style+=("border-color: red !important;");
                	style+=("border-width: 2px;");
                	style+=("margin-top: -1px!important;");
                }
        		return style;
        	}

        	if (row['MODAVAILCOLOR']) {
        		var style="";
                var rowColor = row['MODAVAILCOLOR'];
                var modAvailList = this.GetModAvailList(row);
                if (modAvailList) {
                    var multipleModAvail = (modAvailList && modAvailList.length > 1);
                    if (multipleModAvail) {
                    	rowColor = '#B03060';
                    	for (var i=0; i<modAvailList.length; i++) {
                    		if (modAvailList[i]['fullDay']) {
                    			row['FULLDAY'] = 1;
                    			if (modAvailList[i]['color']) {
                    				row['MODAVAILCOLOR'] = modAvailList[i]['color'];
                    			}
                    			if (modAvailList[i]['fontColor']) {
                    				row['MODAVAILFONTCOLOR'] = modAvailList[i]['fontColor'];
                    			}
                    		}
                    	}
                    }
                }

                if (row['FULLDAY'] && row['_INTERNALSTATUS'] != 'OVERBOOKED') {
                    style+=("background-color: " + row['MODAVAILCOLOR'] + "!important;");
                    style+=("color: " + row['MODAVAILFONTCOLOR'] + "!important;");
                }
                if (!row['FULLDAY'] || multipleModAvail) {
                	style+=("background: ");
                	if (row['EXTERNALASSIGNMENTS']) {
                		style+=("url('miniapps/scheduler/labor-scheduled.png') no-repeat left center, ");
                	}
                	style+=("linear-gradient(to top right,transparent 50%," + rowColor + " 0) top right/18px 18px no-repeat,transparent;");
                	if (row['EXTERNALASSIGNMENTS']) {
                		style+=("background-position: 3px 5px, top right;");
                	}
                }
                if (row['_ASSIGNMENTSELECTED']) {
                	style+=("border-style: dashed;");
                	style+=("border-color: red !important;");
                	style+=("border-width: 2px;");
                	style+=("margin-top: -1px!important;");
                }
                return style;
        	}

            if (row['_ASSIGNMENTSELECTED']) {
            	var style="";
            	style+=("border-style: dashed;");
            	style+=("border-color: red !important;");
            	style+=("border-width: 2px;");
            	style+=("margin-top: -1px!important;");
            	return style;
            }
        },
        
        _cancelModAvailDialog: function () {
        	this.HideTGMessage();
        	this.grid.ClearSelection();
        },
        
        _refreshResource: function (data) {
        	var me = this;
        	try {
        		if (this.lastCfg != null) {
        			this.grid.LoadCfg(this.lastCfg);
        		}
            } catch (e) {
    	        log.debug("LoadCfg error", e);
            }
            this.grid.ShowMessage(this.label('loading_resources'), /*importance*/ 2, /*type*/ 3);
        	this.grid.ReloadBody(function() {
                if (me.state) {
                    if (me.state.WorkFilterEnabled) {
                        me.invokeLater(function() {
                        	me._enableFilterWorkAction();
                        }, 100, "EnableFilterWork");
                    }
                }
        	});
        	if (this.clearReasonCode) {
        		this.selectedModAvailReasonCode = "";
            	this.grid.Toolbar.MODAVAILRSNCODE = "";
            	this.grid.RefreshRow(this.grid.Toolbar);
        	}
			if (this.selectedActivities){
        		this.selectedActivities="";
        	}
			if (data != null) {
				this.grid.ClearSelection();
			}
        },

        _weekChanged: function (result) {
        	if (!this.isVisible()) return;
        	var me = this;

        	// importance => Default value is 2 to assure that this message is displayed
            // type => Set to 3 to block the Resource section while its refreshing.  
            this.grid.ShowMessage(this.messages['pleasewait'], /*importance*/ 2, /*type*/ 3);

            // Clearing highlighted rows and cells when moving from one week to another
            this._clearHighlightedRows();
            this._clearHighlightedCells();

            var resetWeek = false;
            if (result.resetWeek) {
            	resetWeek = true;
            }

            this.fetch("_gotoWeek", me._ioOptions({
            	startWeekDay: result.startWeekDay,
            	resetWeek: resetWeek
            })).then(function (reply) {
            	if (me.lastCfg != null) {
            		me.grid.LoadCfg(me.lastCfg);
            	}
            	me.grid.ShowMessage(me.label('loading_resources'), /*importance*/ 2, /*type*/ 3);
            	me.grid.ReloadBody(function() {
                    // Re-selecting matching rows
                    if (me.linkedWorkViewGrid) {
                        var activitiesResources = new Set();
                        var assignedResources = new Set();

                		var ptStart = me.grid.GetScrollLeft(2);
                        var weekStart = me.grid.GetGanttDate(ptStart, "G");
                        var weekEnd = weekStart + ONE_WEEK;
                        var rows = me.linkedWorkViewGrid.GetSelRows();

                        if (rows && rows.length > 0) {
                            for (var i = 0; i < rows.length; i++) {
                            	var skipAssigned = !rows[i]['startTime'] || !(rows[i]['startTime'] > weekStart && rows[i]['startTime'] < weekEnd);
                                me.setResourcesToHighlight(activitiesResources, assignedResources, rows[i], skipAssigned);
                            }
                        }
                        me._applyRelatedAssignmentsHighlight(activitiesResources, assignedResources);
                    }

                    if (me.state) {
                        if (me.state.WorkFilterEnabled) {
                            me.invokeLater(function() {
                            	me._enableFilterWorkAction();
                            }, 100, "EnableFilterWork");
                        }
                    }
            	});

            	me.grid.ZoomTo(result.startWeekDay, result.endWeekDay, DEFAULT_WIDTH);
            });
        },

        OnRowFilter: function (grid, row, show) {
        	if (!this.grid.__FilterResourcesData) {
            	if (!this.grid.__FilterByResource) {
            		this.grid.__FilterByResource = new Set();
            		this.grid.__FilterByResource = {
            				resources: new Set(),
            				crewWorkGroups: new Set()
            		};
            	}

            	var filters = [];
            	for (var i=0; i<grid.GetFilter().length; i++) {
            		filters.push(grid.GetFilter()[i][0]);
            	}
            	
            	if (show == 1) {
            		if (filters.includes('name') && row['name'] && row['name'] != "") {
            			this.grid.__FilterByResource.resources.add(row['name']);
            		}
            		if (filters.includes('CREWWORKGROUP') && row['CREWWORKGROUP'] && row['CREWWORKGROUP'] != "") {
            			this.grid.__FilterByResource.crewWorkGroups.add(row['CREWWORKGROUP']);
            		}
            	}
        	}
        },

        OnFilterFinish: function (grid, type) {
        	if (!this.grid.__FilterResourcesData)
        	{
            	log.info("FilterBy Data: {}", this.grid.__FilterByResource);
                this.publishLater('skd.resourceview.filtered', {
                    grid: grid
                }, 100, 'skd.resourceview.filtered');
        	}

            if (this.grid.__FilterResourcesData && this.highlightedRows.length > 0) {
            	for (var i=0; i<this.highlightedRows.length; i++) {
            		var color = this.highlightedRowsColor.get(this.highlightedRows[i]);
            		var row = this.GetRowById(this.highlightedRows[i]);
            		if (row != null) {
                		row.Color = color;
                		grid.RefreshRow(row);
            		}
            	}
            }
        },

        OnMouseOver: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*TRow*/ orow, /*string*/ ocol, /*Event*/ event) {
        	if (Grids.Focused != null && Grids.Focused.MainTag.id != grid.MainTag.id && row != null)
        	{
        		if (Grids.Focused.GetSelRows() != null && Grids.Focused.GetSelRows().length > 0) {
            		log.info('OnMouseOver - Changing focus to bottom view');
            		grid.ActionFocus();
        		}
        	}
        },

        _applyRelatedAssignmentsHighlight: function(selectedResources, assignedResources) {
            log.debug("Highlighted Resources: {}", selectedResources);
            log.debug("Assigned Resources: {}", assignedResources);
        	var me = this;
        	var resources = Array.from(selectedResources);
            this._clearHighlightedRows();
            this._clearHighlightedCells();

        	if (resources.length > 0) {
        		var keys = Object.keys(this.grid.Rows);
        		for (i=0; i<keys.length; i++) {
        			var row = this.grid.Rows[keys[i]];
        			if (row['_OBJECTNAME'] && !row['TEXT']) {
                        for (x=0; x<resources.length; x++) {
                        	var craft = resources[x].craft;
                        	var skillLevel = resources[x].skillLevel;
                        	if (skillLevel == null) {
                        		skillLevel = "";
                        	}
                        	var craftSkillMap = row['SECONDARYCRAFTS'];
                        	if (craftSkillMap != null && craftSkillMap != '') {
                        		craftSkillMap = JSON.parse(craftSkillMap);
                        	}
                        	var match = false;
                        	if (row['_OBJECTNAME'] == 'LABOR') {
                            	if (row['CRAFT'] == craft || row['PRIMARYCRAFT'] == craft) {
                            		match = true;
                            		if (row['SKILLLEVEL'] == skillLevel) {
                            			row.Color = '#64d9e7';
                            		}
                            		else {
                            			var assignKey = craft + '-' + skillLevel;
                            			var resKey = craft + '-' + row['SKILLLEVEL'];
                            			var assignRank = this.craftSkillRank[assignKey];
                            			var resRank = this.craftSkillRank[resKey];
                            			if (assignRank >= resRank) {
                            				row.Color = '#bceef4';
                            			}
                            		}
                            	}
                            	else if (craftSkillMap != null && craftSkillMap[craft] != null) {
                            		match = true;
                            		var resSkillLevel = craftSkillMap[craft];
                            		if (resSkillLevel == skillLevel) {
                            			row.Color = '#64d9e7';
                            		}
                            		else {
                            			var assignKey = craft + '-' + skillLevel;
                            			var resKey = craft + '-' + resSkillLevel;
                            			var assignRank = this.craftSkillRank[assignKey];
                            			var resRank = this.craftSkillRank[resKey];
                            			if (assignRank >= resRank) {
                            				row.Color = '#bceef4';
                            			}
                            		}
                            	}
                        	}
                        	else if (row['_OBJECTNAME'] == 'AMCREW') {
                            	if (row['CRAFT'] == craft || (row.parentNode && row.parentNode['CRAFT'] && row.parentNode['CRAFT'] == craft)) {
                            		match = true;
                            		row.Color = '#64d9e7';
                            	}
                        	}

                        	if (match && !this.highlightedRows.includes(row.id)) {
                            	this.highlightedRows.push(row.id);
                            	this.highlightedRowsColor.set(row.id, row.Color);
                        		this.grid.RefreshRow(row);
                        	}
                        }    			
        			}
        		}
            } else {
            	this._clearHighlightedRows();
            }

        	resources = Array.from(assignedResources);
        	if (resources.length > 0) {
                for (i=0; i<resources.length; i++) {
                	var row = this.GetRowById(resources[i]);
                	if (row != null) {
                    	if (!row['_ASSIGNMENTSELECTED']) {    		
                    		row['_ASSIGNMENTSELECTED'] = true;
                    	}
                    	this.highlightedCells.push(row.id);
                	}
                }
            } else {
            	this._clearHighlightedCells();
            }
        	this.grid.RefreshGantt(1);
        },
        
        _clearHighlightedRows: function() {
            for (i=0; i<this.highlightedRows.length; i++) {
            	var row = this.GetRowById(this.highlightedRows[i]);
            	if (row) {
                	row.Color = null;
            		this.grid.RefreshRow(row);
            	}
            }
            this.highlightedRows = [];
        },
        
        _clearHighlightedCells: function() {
            for (i=0; i<this.highlightedCells.length; i++) {
            	var row = this.GetRowById(this.highlightedCells[i]);
            	if (row) {
                	delete row['_ASSIGNMENTSELECTED'];
            	}
            }
            this.highlightedCells = [];
        },

        OnGetColor: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ r, /*int*/ g, /*int*/ b) {
        	var result = this.inherited(arguments);
        	if (col == 'ALLOCATION' && row['ALLOCATION'] != null && row['_OBJECTNAME'] != null) {
        		var allocation = row['ALLOCATION'];
        		allocation = allocation.substring(0, allocation.length - 1);
        		var alloc = parseFloat(allocation);
        		if (this.allocationThresholds !=null){
	        		var thresholds = this.allocationThresholds.split(',');
	        		var colors = this.allocationColors.split(',');
	        		if (alloc >= thresholds[0] && alloc <= thresholds[1]) {
	        			var color = colors[0] != '' ? colors[0] : result;
	        			return color;
	        		}
	        		else if (alloc > thresholds[1] && alloc <= thresholds[2]) {
	        			return colors[1];
	        		}
	        		else if (alloc > thresholds[2] && alloc <= thresholds[3]) {
	        			return colors[2];
	        		}
	        		else if (alloc > thresholds[3]) {
	        			return colors[3];
	        		}
        		}
        	}
        	return result;
        },

        _showLegendDialogAction: function() {
        	var me = this;
        	var reasonCodeLabel = this.label('reasonCode');
        	var allocationLabel = this.label('allocation');
        	var closeLabel = this.label('closeButton');
        	var workLabel = this.label('work');
        	var nonWorkLabel = this.label('nonWork');

    		var thresholds = this.allocationThresholds.split(',');
    		var colors = this.allocationColors.split(',');
        	
        	var html = "<table style='border-spacing: 5px;'>";
        	html += "<tr><td colspan='3' style='text-align:center;'><b>" + reasonCodeLabel + "</b></td></tr>";
        	html += "<tr><td colspan='3'>&nbsp;</td></tr>";
        	
        	Object.keys(this.reasonCodeColors).forEach(function(key) {
        	    var colorValue = me.reasonCodeColors[key];
            	html += "<tr><td>" + key + ":<td><td style='width: 35%; border: 1px solid black; background-color: " + colorValue + ";'>&nbsp;</td></tr>";
        	});

        	html += "<tr><td colspan='3'>&nbsp;</td></tr>";
        	html += "<tr><td colspan='3' style='text-align:center;'><b>" + allocationLabel+ "</b></td></tr>";
        	html += "<tr><td colspan='3'>&nbsp;</td></tr>";
        	
        	if (colors[0] != '') {
        		html += "<tr><td>&ge; " + thresholds[0] + "<td><td style='width: 35%; border: 1px solid black; background-color: " + colors[0] + ";'>&nbsp;</td></tr>";
        	}

        	html += "<tr><td>&ge; " + thresholds[1] + "<td><td style='width: 35%; border: 1px solid black; background-color: " + colors[1] + ";'>&nbsp;</td></tr>";
        	html += "<tr><td>&ge; " + thresholds[2] + "<td><td style='width: 35%; border: 1px solid black; background-color: " + colors[2] + ";'>&nbsp;</td></tr>";
        	html += "<tr><td>&ge; " + thresholds[3] + "<td><td style='width: 35%; border: 1px solid black; background-color: " + colors[3] + ";'>&nbsp;</td></tr>";
        	html += "<tr><td colspan='3'>&nbsp;</td></tr>";
        	html += "<tr><td colspan='3' style='text-align:center;'><input type='button' value='" + closeLabel + "' onclick='Grids.forEach(g=>g ? g.CloseDialog() : null);' /></td></tr>";

        	this.grid.CloseDialog();
        	var mousey = window.outerHeight / (2 * 2);
        	var mousex = window.innerWidth / 2;
        	var me = this;
        	this.invokeLater(function() {
        		me.grid.Dialog = ShowDialog(html, {X:mousex, Y:mousey});
            }, 100, "ShowLegend");
        }
    });
});

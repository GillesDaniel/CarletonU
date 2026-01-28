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
    "com/ibm/tivoli/maximo/miniapps/_MaximoIO",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
    "dojo/_base/lang",
    "dojo/_base/array",
    "ibm/miniapp/scheduler/gantt/GanttWidget",
    "ibm/miniapp/scheduler/gantt/BaseResourceViewWidget",
    "ibm/miniapp/scheduler/gantt/ResourceViewActions"

], function (declare, _MaximoIO, log, lang, array, GanttWidget,
             BaseResourceViewWidget, ResourceViewActions) {

    // Alternate Default Row Colors (RGB)
    var ALTERNATE_ROW_COLOR1 = JSON.stringify([235, 255, 255]);
    var ALTERNATE_ROW_COLOR2 = JSON.stringify([224, 244, 244]);

    return declare([GanttWidget, _MaximoIO, BaseResourceViewWidget, ResourceViewActions], {

        constructor: function (options) {
            this.ViewName = 'Assignments';
            this.relatedAssignments = [];
            this.prevDescendants = null;
            // super is called automatically, apparently
            log.debug("{} Base Bean Target set to {} for view", this.gridId, this.mxtargetbean, options);
        },

        attachExtraGridEvents: function (gridId) {
            this.inherited(arguments);

            // add in some custom events
            AddEvent('OnGetDefaultColor', gridId, lang.hitch(this, this.OnGetDefaultColor));
            AddEvent('OnGanttChanged', gridId, function (G, row, col, item, new1, new2, old1, old2, action) {
                G.ColorRow(row);
            });

            // add ZoomToWork action
            // This is called from the ZoomToWork Toolbar Action
            window.Grids.ZoomToWork = lang.hitch(this, this.ZoomToWork);
        },

        upgradeTGInstance: function(grid) {
            this.inherited(arguments);
            var me=this;
            // Toolbar actions for enabling/disabling the link to workview
            grid.ActionEnableLinkToWorkViewFilter = lang.hitch(this, function(grid) {
                log.debug("Enabled Filter");
                this.fetch("async_update_filter_state",{filter: true}).then(lang.hitch(me, me.processServerResponse));
            });

            grid.ActionDisableLinkToWorkViewFilter = lang.hitch(this, function(grid) {
                log.debug("Disable Filter");
                this.fetch("async_update_filter_state",{filter: false}).then(lang.hitch(me, me.processServerResponse));
            });
        },

        OnGetDefaultColor: function (G, row, col, r, g, b) {
            if (row.Kind != 'Data') return;

            // only color labor and crew rows
            if (!(row['_REFOBJECTNAME']==='LABOR' || row['_REFOBJECTNAME']==='AMCREW' || row['_REFOBJECTNAME']==='LOCATIONS')) return;

            // ignore gantt
            if (col=='G') return;
            if (col=='Panel') return;

            // conflict rows
            if (row.ERRVAL && col=='name') {
                // log.debug("COL: {}", col);
                return this._conflictRowColor;
            }
            return null;
        },

        OnGanttRunDrop: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*bool*/ drop, /*object*/ src, /*int*/ index, /*string*/ keyprefix, /*int*/ x, /*int*/ y, /*TGrid*/ togrid, /*TRow*/ torow, /*string*/ tocol, /*int*/ cellx, /*bool*/ accept) {
            var result = this.inherited(arguments);
            var me=this;
            if (drop==1) {
		// after the drop, clear the related assignments
                this.invokeLater(function () {
                    me.relatedAssignments=[];
                    me._applyRelatedAssignmentsHighlight(grid, me.relatedAssignments);
                }, 100, "rundrop");
            }
            return result;
        },



        // @Override
        OnGanttRunBoxChanged: function (/*TGrid*/ grid, /*object*/ box, /*object*/ old, /*int*/ change) {
            this.inherited(arguments);
        },

        OnValidateAssignmentDrop: function (fromrow, torow, activity) {
        },

        /**
         *
         */
        OnUndo: function (grid, action, row, col, val) {
            if (action == 'Move') {
                // revalidate the undo move (we don't know the old parent, so we'll pass the new row as both from and to)
                this.OnValidateAssignmentDrop(row.parentNode, row.parentNode, row);
            }
        },

        OnGanttMenuClick: function(grid, row, col, name, menuItem, gantXY) {
            /**
             * Add a action to gantt menu to handle ToggleTiledMode
             */
            if (menuItem && menuItem.Name == 'ToggleTiledMode') {
                log.debug("ToggleTiledMode", menuItem);
                return this.ToggleTiledMode();
            } else {
                return this.inherited(arguments);
            }
        },

        ToggleTiledMode: function() {
            var me=this;
            var state = [];
            var rootRow = this.grid.Body;
            this.visitRow(rootRow,state,function(row,state) {
               if (row!==rootRow && row._UNASSIGNED) {
                   if (row.GGanttRunErrorsShift===0) {
                       row.GGanttRunErrorsShift = 16;
                   } else {
                       row.GGanttRunErrorsShift = 0
                       ;
                   }
                   state.push(row);
               }
               return true;
            });
            this.invokeLater(function() {
                me.grid.RefreshGantt(255+256);
            },50);
        },

        OnFocus: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*TRow*/ orow, /*string*/ ocol, /*int*/ pagepos) {
            var refreshVal=0;
            // clear the schedule window on re-focus
            if (this.grid.Cols['G'].GanttLines && this.grid.Cols['G'].GanttLines != '') {
                this.grid.Cols['G'].GanttLines = "";
                refreshVal=1;
            }
            if (this.relatedAssignments && this.relatedAssignments.length) {
                this.relatedAssignments = [];
                refreshVal=65;
            }
            if (refreshVal) this.Refresh(refreshVal);
            return false;
        },

        OnClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            this.inherited(arguments);

            if (event.ctrlKey || event.altKey || event.shiftKey) return false;

            if (col === 'G') {
                var objs = grid.GetGanttXY(row, col, x, y);
                if (objs != null && objs.Type != null && objs.RunId) {
                    // log.debug("OnClick Gantt Object");
                    // this._fetchAndShowScheduleWindow(objs.RunId);
                    // this._highlightMultiSkillActivity(objs.RunId);
                    // this._highlightRelatedAssignments(objs.RunId);
                    // This will get called in the Focus Gantt Bar Actions
                } else {
                    // refocus row, remove gantt lines, since no object is selected
                    this.OnFocus(grid, row, col);
                }
            }
            return false;
        },

        _focusGanttBarAdditionalActions: function(row) {
            this.inherited(arguments);

            log.debug("Additional on focus bar actions");
            this._fetchAndShowScheduleWindow(row.id);
            this._highlightMultiSkillActivity(row.id);
            this._highlightRelatedAssignments(row.id);
        },


        _fetchAndShowScheduleWindow: function (id) {
            var me = this;
            this.invokeLater(function() {
                me.fetch("async_get_schedule_window", me._ioOptions({
                    projectid: me.projectid,
                    activityid: id
                })).then(function (schedWin) {
                    me._applyScheduleWindow(me.grid, schedWin);
                });
            }, 100, "async_get_schedule_window");
        },

        _highlightMultiSkillActivity: function (id) {
            log.debug("_highlightMultiSkillActivity (): " + id);
            var me = this;
            this.invokeLater(function() {
                me.fetch("async_get_multi_skill_resourceset", me._ioOptions({
                    projectid: me.projectid,
                    activityid: id
                })).then(function (resourceSetList) {
                    log.debug("_highlightMultiSkillActivity () end");
                    me._applyMultiSkill(me.grid, resourceSetList);
                });
            },100,"async_get_multi_skill_resourceset");
        },

        _highlightRelatedAssignments: function (id) {
            log.debug("highlight related assignments (): " + id);
            var me = this;
            this.invokeLater(function() {
                me.fetch("async_get_related_assignments", me._ioOptions({
                    projectid: me.projectid,
                    activityid: id
                })).then(function (reply) {
                    log.debug("_highlightRelatedAssignments () end", reply);
                    me._applyRelatedAssignmentsHighlight(me.grid, reply.related);
                    if (me.isShowConstraintsOnSelectEnabled) {
                        me._applyDescendantsFor(reply);
                    }
                });
            },100,"async_get_related_assignments");
        },

        isShowConstraintsOnSelectEnabled: function() {
            return true;
        },

        _applyDescendantsFor: function(reply) {
            log.debug("Descendants", reply);

            // clean out data that is not relevant and could cause AddDataFromServer to fail
            delete reply.descendants;
            delete reply.resource;
            delete reply.related;

            if (this.prevDescendants) {
                array.forEach(this.prevDescendants, function(d) {
                    if (d.__clearDescendants) {
                        d.__clearDescendants();
                    }
                });
                this.prevDescendants = null;
                this.RefreshLater(255);
            }

            var me = this;
            if (reply.Changes) {
                this.prevDescendants = [];
                array.forEach(reply.Changes, function(item) {
                    var res = me.grid.GetRowById(item.id);
                    if (res) {
                        res.__clearDescendants = function () {
                            if (res._TG_DESENDANTS) {
                                res._TG_DESENDANTS = "";
                                res.__clearDescendants = null;
                            }
                        };
                        me.prevDescendants.push(res);
                    }
                });
                this.RefreshLater(255);
            }

            this.grid.AddDataFromServer(reply);
        },

        _applyRelatedAssignmentsHighlight: function(gridId, asslist) {
            log.debug("Related Assignments", asslist);
            this.relatedAssignments = asslist;
            this.RefreshLater(65);
        },

        _GetAltCSSClassForActivity: function (row) {
            // do your own checking, and return a new class or return the super (this.inherited is super)

            // don't highlight if WE are the focussed bar, only want to focus things related to us.
            if (this.relatedAssignments && this.relatedAssignments.indexOf(row.id)>-1 && row !== this._focusGanttObject) {
                return "skd-RELATED";
            }

            if (row["_INTERNALPLUSTQUALMET"] != 'undefined' && row["_INTERNALSTATUS"] == 'ASSIGNED' && row["_INTERNALPLUSTQUALMET"] != null && (row["_INTERNALPLUSTQUALMET"] == 'NONE' || row["_INTERNALPLUSTQUALMET"] == 'PARTIAL')) {
                cls = "skd-Conflict";
                return cls;
            }
            if (row["_INTERNALSTATUS"] === 'ASSIGNED' && row["_OBJECTNAME"] === "ASSIGNREPLOC") {

                if (row["_INTPLUSARESERVATION"] != 'undefined' && row["_INTPLUSARESERVATION"] != null && row["_INTPLUSARESERVATION"] === "HARD") {
                    cls = "skd-HardResType";
                    log.debug("_GetAltCSSClassForActivity: {}", cls, row["_INTPLUSARESERVATION"], row["PRIMARYFLAG"]);
                    return cls;
                }

                if (row["PRIMARYFLAG"] != 'undefined' && row["PRIMARYFLAG"] != null && (row["PRIMARYFLAG"] === 0 || row["PRIMARYFLAG"] === 'N' ||  row["PRIMARYFLAG"] === false)) {
                    //log.debug("_GetAltCSSClassForActivity: {}", cls, row, row["PRIMARYFLAG"] , row["_OBJECTNAME"], row["_REFOBJECTNAME"], row["_READONLY"], row["_READONLY_ASSIGNMENT"]);
                    cls = "skd-SecondaryAssignment";
                    return cls;
                }

            }

            if (row["_INTERNALSTATUS"] === 'ASSIGNED' && row['_READONLY'] == true) {
            	cls = "skd-FilteredAssignment";
            	return cls;
            }
            
            return this.inherited(arguments);
        },
        
        _AdditionalTableContextMenu: function (/*TMenu*/menu, /*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
        	var thisMenu = this.inherited(arguments);
        	if (row["_INTERNALSTATUS"] === 'ASSIGNED' && row['_READONLY'] == true ||
        			row["_OBJECTNAME"] === 'OTHERASSIGNMENT' && row['_READONLY'] == true) {
            	var filteredItems = thisMenu.Items.filter(function(value, index, arr) {
            	    return value.Name != null && value.Name.startsWith('Go To');
            	});
            	thisMenu.Items = filteredItems;
        	}
        	return thisMenu;
        },
        
        OnRenderFinish: function (/*TGrid*/ grid) {
            this.inherited(arguments);
            this.relatedAssignments = [];
        },

        _autoRefreshData: function (me) {
            this.fetch("async_auto_refresh_model", me._ioOptions({
                projectid: me.projectid
            })).then(function (reply) {
            	if (reply && reply.Changes && reply.Changes.length) {
            		var changes = reply.Changes;
            		var addedRowIds = [];
            		for (var i=0; i<changes.length; i++) {
            			var assignmentRow = changes[i];
            			addedRowIds.push(assignmentRow['id']);
            		}
            		me.grid.AddDataFromServer(reply);
            		for (var x=0; x<addedRowIds.length; x++) {
            			var newRow = me.grid.GetRowById(addedRowIds[x]);
            			newRow['name'] = changes[x].name;
            			newRow['_idx'] = changes[x]._idx;
            			newRow['mxRightIconClass'] = changes[x].mxRightIconClass;
            			newRow['mxLeftIconClass'] = changes[x].mxLeftIconClass;
            			newRow['_OBJECTNAME'] = changes[x]._OBJECTNAME;
            			newRow['_REFOBJECTNAME'] = changes[x]._REFOBJECTNAME;
            			newRow['_INTERNALSTATUS'] = changes[x]._INTERNALSTATUS;
            			newRow['STATUS'] = changes[x].STATUS;
            		}
            		me.grid.RefreshGantt(1);
            	}

            	window.clearTimeout(window.timeoutId);
                window.timeoutId = setTimeout(function () {
                	me._autoRefreshData(me);
                }, me.dispatchRefreshInterval); // Fires an autorefresh for the amount of seconds set for the Project.
            });
        },

        OnLoadCfg: function() {
            // GA Schedule View needs State Saving/Loading
            return false;
        },

        _NotifyRowSelected: function() {
            // we don't need to notify anyone
            return false;
        },

        _onSyncResponse: function() {
            // we don't sync
            return false;
        },

        _updateSync: function() {
            // we don't need to sync
            return false;
        },

        requestSync: function() {
            // we don't sync
            return false;
        },

        focusGanttBarLater: function() {
            // when dragging bars, don't do the logic of fetching information about the bars, etc... just slows stuff down.
            // User can just select the bar to focus it, and get the selection details (ie, related bars, highlights, etc)
            if (this.Dragging) return false;
            this.inherited(arguments);
        },

        _exportAssignmentsAction: function (actionItem, row) {
        	log.debug('Selected row: {}', row);
            var actionvalues = actionItem.Values;
            var selection = actionvalues.selection;
            var dialogname = 'export_calendar';
            
            selection = JSON.parse(selection).join();
            var gridSelection = this.GetSelection(this.grid, 'G', row);
            var selectedRows = gridSelection.resources;
            var objectNames = [];
            for (i=0; i<selectedRows.length; i++) {
            	var objName = selectedRows[i]['_OBJECTNAME'];
            	if (objName == 'CRAFT')
            		objectNames.push('LABOR');
            	else
            		objectNames.push('AMCREW');
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
        	addCommInput('eventtargetid', 'assignments_miniapp');
        	addCommInput('projectid', this.projectid);
        	log.debug("sendEvent({},{})", dialogname, this.appname);
        	sendEvent(dialogname, this.appname, '');
        },

        OnGetColor: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ r, /*int*/ g, /*int*/ b) {
        	if (!grid.Cols[col] || !grid.Cols[col].Visible) {
        		return null;
        	}

        	var color = null;
        	var rgb = JSON.stringify([r, g, b]);
        	// Checking if RGB color match the Alternate colors for odd rows.
        	if (ALTERNATE_ROW_COLOR1 == rgb || ALTERNATE_ROW_COLOR2 == rgb)
        	{
        		color = "white";
        	}

        	if (!this._firstRender) {
            	if (col == 'name' && row['_REFOBJECTNAME'] && row['_REFOBJECTNAME'] != 'CRAFT' && !color && row && row['GGanttBackground']) {
            		var ganttBackground = row['GGanttBackground'];
            		ganttBackground = ganttBackground.split('White').join('WORKAlternate');
                    row['GGanttBackground'] = ganttBackground;
            	}
        	}

        	return color;
        },

        OnTip: function (/*TGrid */grid, /*TRow */row, /*string */col, /*string */tip, /*int */clientX, /*int */clientY, /*int */X, /*int */Y) {
        	var tip = this.inherited(arguments);
        	if (!tip) {
        		if (row['MODAVAIL']) {
        			var clickDate = this.getDateForX(X, col);
            		var modAvailList = JSON.parse(row['MODAVAIL']);
            		for (var i=0; i<modAvailList.length; i++) {
            			var modAvail = modAvailList[i];
            			if (modAvail.startDate <= clickDate && modAvail.finishDate >= clickDate) {
            				var tpl;
            	            var tplKey = 'gantt.MODAVAIL.tip.tpl';
            	            if (this[tplKey] != null) {
            	                tpl = this[tplKey];
            	                if (tpl == null || tpl.trim().length == 0) tpl = '{reasonCode} / {start}-{finish}';
            	            }

            	            var clonedModAvail = Object.assign({}, modAvail);
                			if (clonedModAvail.duration != null) {
                				var duration = this.doubleToDuration(clonedModAvail.duration, false);
                				clonedModAvail.duration = duration;
                			}

            	        	// process template
            	            tip = lang.replace(tpl, lang.hitch({row: clonedModAvail}, this.__rowValFunc));
            	            if (tip == null || tip.trim().length == 0) {
                    			var interval = " / " + start + "-" + finish;
                    			tip = clonedModAvail.reasonCode + interval;
            	            }
                			break;
            			}
            		}
        		}
        	}
            return tip;
        }
    });
});

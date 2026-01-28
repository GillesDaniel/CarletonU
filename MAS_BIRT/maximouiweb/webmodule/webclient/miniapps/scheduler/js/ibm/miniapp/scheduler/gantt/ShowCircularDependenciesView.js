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
    "dojo/_base/window",
    "dojo/dom-class",
    "dojo/on",
    "dojo/mouse",
    "dojo/_base/declare",
    "com/ibm/tivoli/maximo/miniapps/_MaximoIO",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
    "dojo/topic",
    "ibm/miniapp/scheduler/gantt/GanttActions",
    "dijit/Tooltip",
    "dojo/dom-geometry",
    "dijit/TooltipDialog",
    "dijit/popup",
    "dojo/json",
    "dojo/_base/array",
    "dojo/dom",
    "ibm/miniapp/scheduler/SingleGanttView",
    "ibm/miniapp/scheduler/gantt/SchedulerWorkView"


], function (lang, win, domClass, on, mouse, declare, _MaximoIO,
             log, topic, GanttActions,
             Tooltip, domGeom, TooltipDialog, popup, json, array, dom, SingleGanttView, WorkView) {
    return declare([WorkView], {

        constructor: function (options) {
            this.ViewName = 'ShowCircularDependenciesView';
        },

        addCustomActions: function(gridId) {
            // add ZoomToWork action
            // This is called from the ZoomToWork Toolbar Action
            window.Grids.ZoomToWork = lang.hitch(this, this.ZoomToWork);
        },

        attachExtraGridEvents: function (gridId) {
            //this.inherited(arguments);
            TGSetEvent("OnZoom", gridId, function(/*TGrid*/ grid, /*string*/ zoom, /*int*/ FirstDate, /*int*/ LastDate) {
                log.debug("OnZoom: {}, {}, {}", zoom, FirstDate, LastDate);
            });

            TGSetEvent('OnSelectGanttRunRect', gridId, lang.hitch(this, this.OnSelectGanttObjects));
            TGSetEvent('OnClick', gridId, lang.hitch(this, this.OnClick));
        },

        upgradeTGInstance: function(grid) {
        	this.inherited(arguments);

            // Toolbar actions for showing/hiding the hierarchy
            grid.ActionShowHierarchy = lang.hitch(this, function() {
                log.debug("Show Hierarchy");
                for(var key in this.grid.Rows) {
                	if (key != null && key.startsWith('aidx')) {
                		var obj = this.grid.Rows[key];
                		if (!obj['_IN_LOOP']) {
                			this.grid.ShowRow(obj, 0, 1);
                		}
                	}
                }
            });

            grid.ActionHideHierarchy = lang.hitch(this, function() {
                log.debug("Hide Hierarchy");
                for(var key in this.grid.Rows) {
                	if (key != null && key.startsWith('aidx')) {
                		var obj = this.grid.Rows[key];
                		if (!obj['_IN_LOOP']) {
                			this.grid.HideRow(obj, -1);
                		}
                	}
                }
            });
        },

        OnRenderFinish: function (/*TGrid*/ grid) {
            if (!this._firstRender) {
                this._firstRender=true;
                log.debug("{} Has Been Rendered", this.TAG);

                this.publishLater('skd.ui.new.grid', {grid: this});

                // notify the hide progress
                topic.publish('miniapp.hideprogress', this.domid);
                log.debug("{} TreeGrid Version: {}, Text Version: {}, Defaults Version: {}", this.TAG, Component.Version, this.grid.TextVersion, this.grid.DefaultsVersion, this.grid);
            }

            var me=this;
            this.invokeLater(function() {
                if (me.showCurrentDateLine) {
                    me._updateGanttLinesRepeat();
                }
            }, 500, 'ganttlinesrepeat');

            for(var key in this.grid.Rows) {
            	if (key != null && key.startsWith('aidx')) {
            		var obj = this.grid.Rows[key];
            		if (obj['_IN_LOOP']) {
                		obj.Color = '#FBE8E9';
                		this.grid.RefreshRow(obj);
            		}
            	}
            }

            grid.ExpandAll();
            this.ZoomToWork(grid);
        },

        _newTreeGridOptions: function () {
            var me = this;
            var options = {
                Data: {Url: me.toUrl('async_load_gantt_project', me._ioOptions({})), Timeout: 300, Format: 'JSON', Method: 'POST'},
                Layout: {
                    Url: me.toUrl('async_load_gantt_project_ui', me._ioOptions({
                        appname: me.appname,
                        projectid: me.projectid
                    }))
                }
            };

            return options;
        },

        // ACTIONS
        GOTOTODAYAction: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            this._GotoTodayToolbarAction();
        },

        GOTOSELECTDAYAction: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            this._GotoSelectedDayToolbarAction(event);
        },

        ZOOMWEEKAction: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            this._ZoomToWeekToolbarAction();
        },

        GetRootActivity: function (/*TGrid*/grid) {
        	var treeRoot = grid.Body.firstChild;
        	return treeRoot.firstChild;
        },

        OnCfgSaved: function (/*TGrid*/grid, /*String*/ cfg) {
            this.inherited(arguments);
            // for server paging, TG loses filter/sort states, so we return false so that it can track it
            return false;
        },
        
        OnGetTableCellClass: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*string*/ cls) {
            if (row.Kind==='Data') {
                if (col == 'STATUS') {
                    var cls = '';
                    if (row["_INTERNALSTATUS"] != null) {
                        cls = "SKD" + row['_OBJECTNAME'] + "_" + row["_INTERNALSTATUS"];
                    } else {
                        cls = "SKD" + row['_OBJECTNAME'];
                    }
                    if (row["STATUS"]) {
                        var val = ("SKDSYN_" + row['_OBJECTNAME'] + "_" + row["STATUS"].toString().replace(/\s+/g, '-'));
                        cls += (" " + val);
                    }

                    return cls;
                } else if (col == 'WOPRIORITY') {
                    if (row['WOPRIORITY']) {
                        // SKDWORKORDER_PRIORITY_7
                        cls = ("SKD" + row['_OBJECTNAME'] + "_PRIORITY_" + row['WOPRIORITY']);
                        return cls;
                    }
                }
            }
        },
        
        OnGetGanttSideHtml: function (/*TGrid*/ grid, /*TRow */row, /*string */col, /*int */width, /*int */comp, /*int */crit, /*int */plan, /*int */index, /*string */txt, /*int */side) {
            return null;
        },

        _ShowContextMenu: function (/*TMenu*/menu, /*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event, selectedItems) {
            if (menu) {
                var me = this;
                menu.Items.shift();

                try {
                    // if (col == 'G') {
                    //     // we are in the Gantt Area
                    //     pos = {X: event.clientX, Y: event.clientY};
                    // } else {
                    //     pos = {Tag: grid.GetCell(row, col)};
                    // }

                    pos = {Mouse: 1, X: 0, Y: 0};

                    this._currentContextRow = row;

                    grid.HideTip();
                    grid.CloseDialog();
                    log.debug("Dynamic Menu and Position", menu, pos);
                    var handler = function (/*TMenuItem*/item) {
                        me.OnContextMenuItemSelected(item, row, selectedItems);
                    };
                    // HACK
                    // We need to use the ShowPopup function, otherwise the right-click menus won't work for Firefox or IE.
                    // This affects the automation IDs, so we need to figure that out later.
                    if (this.automationEnabled) {
                        log.debug("ShowMenu for Automation");   
                    }
                    grid.Dialog = grid.ShowPopup(menu, handler);
                } catch (ex) {
                    log.error("error processing menu", ex, menu, col, row);
                }
            } else {
                log.debug('No Menu for {}', col, row);
            }
        },

        _deleteConstraintAction: function(actionItem, row) {
        	log.debug("Delete Constraint", actionItem, this._EDIT_DEPENDENCY);
        	var d = this._EDIT_DEPENDENCY;
        	var depsToRemove = [];
        	var deps = this.grid.GetDependencies(d.DependencyFrom, null, null, d.DependencyTo, d.DependencyType);
        	depsToRemove.push(deps[0]);
        	log.debug("Constraint", depsToRemove);
        	this.grid.DeleteDependencies(depsToRemove);
        },

        OnGanttChanged: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*string*/ item,
                /*type*/ newVal, /*type*/ newVal2, /*type*/ old, /*type*/ old2, /*string*/ action) {
        	if (item == 'Dependency' && (action == 'New' || action == 'Delete')) {
        		return;
        	}
        },
        
        MarkToBeSaved: function() {
        }
    });
});

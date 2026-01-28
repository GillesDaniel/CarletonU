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

    // Alternate Default Row Colors (RGB)
    var ALTERNATE_ROW_COLOR1 = JSON.stringify([235, 255, 255]);
    var ALTERNATE_ROW_COLOR2 = JSON.stringify([224, 244, 244]);

    return declare([WorkView], {

        constructor: function (options) {
            this.ViewName = 'SchedMax';
            this.ganttDisableDependencies = false;
            this.selectedLevel = -1;
        },

        addCustomActions: function(gridId) {
            // add ZoomToWork action
            // This is called from the ZoomToWork Toolbar Action
            window.Grids.ZoomToWork = lang.hitch(this, this.ZoomToWork);
        },

        attachExtraGridEvents: function (gridId) {
            //this.inherited(arguments);
        	var me=this;
            TGSetEvent("OnZoom", gridId, function(/*TGrid*/ grid, /*string*/ zoom, /*int*/ FirstDate, /*int*/ LastDate) {
                log.debug("OnZoom: {}, {}, {}", zoom, FirstDate, LastDate);
                if (me._otherGRID && me._otherGRID.reloadRequired) {
            		me.fetch("_getSelectedTab", me._ioOptions({})).then(function (reply) {
            			var tagId = reply.currentResourceMiniapp + '[' + me._otherGRID.gridId + ']';
                    	if (me._otherGRID.TAG == tagId) {
                        	me._otherGRID.reloadRequired = false;
                        	me._otherGRID._newGridID();
                        	me._otherGRID._initGANTT();
                    	}
                    });
                }
            });

            TGSetEvent('OnSelectGanttRunRect', gridId, lang.hitch(this, this.OnSelectGanttObjects));
            TGSetEvent('OnClick', gridId, lang.hitch(this, this.OnClick));
            TGSetEvent('OnExpand', gridId, lang.hitch(this, this.OnExpand));
            TGSetEvent('OnExport', gridId, lang.hitch(this, this.OnExport));
            TGSetEvent('OnRenderPageFinish', gridId, lang.hitch(this, this.OnRenderPageFinish));

            this.subscribeOn('skd.workview.constraintedited', lang.hitch(this, this._constraintEdited));
            this.subscribeOn('skd.workview.unloadedConstraintRemoved', lang.hitch(this, this._unloadedConstraintsRemoved));
            this.subscribeOn('skd.workview.unloadedConstraintAdded', lang.hitch(this, this._unloadedConstraintsAdded));
            this.subscribeOn('skd.request.workview.reference', lang.hitch(this, this.publishResponseWorkViewReference));
            this.subscribeOn('skd.workview.refreshSelected', lang.hitch(this, this.__refreshSelected));

            AddEvent('OnAfterSectionResize', this.gridId, function() {
                me._onSyncRequest();
            });
        },

        OnExpand: function(grid, row) {
        	if (this.selectedLevel > -1) {
        		this.fetch("_expandToLevel", this._ioOptions({
        			level: -1
        		})).then(function (reply) {
                    // Do nothing
                });
        	}
        },

        OnRenderPageFinish: function(/*TGrid*/ grid, /*TRow*/ row) {
        	var me = this;
        	var rowColor = null;
        	if (!this.ganttBackground && grid.Cols['G'].GanttBackground) {
        		var ganttBackground = grid.Cols['G'].GanttBackground;
        		this.ganttBackground = ganttBackground.split('White').join('WORKAlternate');
            }

        	var rootRow = this.GetRootActivity(grid);
        	if (rootRow.firstChild) {
        		this._applyToRow(rootRow, 1, function(row, state) {
        			if (!rowColor) {
        				rowColor = 0;
        			}
        			
        			if (row['_OBJECTNAME']) {
        				if (rowColor == 1) {
        					row['GGanttBackground'] = me.ganttBackground;
        				}
        				else {
        					delete row['GGanttBackground'];
        				}
        				rowColor = 1 - rowColor;
        			}
        			return true;
        		});
        	}
        	this.Refresh(255);
        },
        
        /**
         * Handler to expand level to selected items
         * @private
         */
        _expandToLevel: function(actionItem, row) {
        	var level = parseInt(actionItem.id);
            var selectedRowID = this._GetSelectedRowIds(this.grid, 'G', row);
            var me = this;
            this.selectedLevel = level;
            this.fetch("_expandToLevel", me._ioOptions({
            	level: level
            })).then(function (reply) {
            	var selectedRow = me.grid.GetRowById(selectedRowID);
            	me.grid.ClearSelection();
            	me.grid.Expand(selectedRow);
                me._applyToRow(selectedRow, [], function (r, state) {
                    if (r.Level >= level) {
                    	me.grid.Collapse(r);
                    }
                    else if (r.Expanded == 0) {
                    	me.grid.Expand(r);
                    }
                    return true;
                });
            });
        },

        publishResponseWorkViewReference: function(msg) {
            this.publishTo('skd.response.workview.reference', {grid: this.grid, view: this});
        },

        OnAfterSave: function (/*TGrid*/grid, /*int*/result, /*boolean*/autoupdate) {
            this.inherited(arguments);
            if (result >= 0 && !this.locked) {
            	this.showMessage("system#saverecord");
            }
        },
        
        OnClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            this.inherited(arguments);
            if (col == 'TOGGLEDEPS') {
            	this.ganttDisableDependencies = !this.ganttDisableDependencies;
            }
        },

        OnGetGanttSideHtml: function (/*TGrid*/ grid, /*TRow */row, /*string */col, /*int */width, /*int */comp, /*int */crit, /*int */plan, /*int */index, /*string */txt, /*int */side) {
        	if (!this.ganttDisableDependencies) {
        		return this.inherited(arguments);
        	}
            return null;
        },

        OnRenderFinish: function (/*TGrid*/ grid) {
            if (!this._firstRender) {
                this._firstRender=true;
                log.debug("{} Has Been Rendered", this.TAG);

                // if there is a waitlockid, then set it, so that other grids can start loading.
                if (this['waitlockid']) {
                    log.debug("{} Sending waitlockcomplete message: {}", this.TAG, this['waitlockid']);
                    topic.publish('miniapp.waitlockcomplete', this['waitlockid']);
                }

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
        },
        
        //__OnNewGridRegistered: function (data) {
        //},
        //
        // OnSaveCfg: function (/*TGrid*/grid, /*Boolean*/ saveToCookie) {
        // },
        //
        // OnCfgSaved: function (/*TGrid*/grid, /*String*/ cfg) {
        // },
        //
        // OnCfgLoaded: function (/*TGrid*/grid, /*String*/ cfg) {
        // },
        //
        // OnLoadCustomCfg: function (/*TGrid*/ grid, /*string*/ custom, /*string*/ cfg) {
        // },
        //
        // OnSaveCustomCfg: function (/*TGrid*/ grid, /*bool*/ ret) {
        // },

        OnFocus: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*TRow*/ orow, /*string*/ ocol, /*int*/ pagepos) {
        	this.inherited(arguments);
        },

        _newTreeGridOptions: function () {
            var me = this;
            var options = {
                Data: {Url: me.toUrl('async_load_gantt_pages', me._ioOptions({})), Timeout: 300, Format: 'JSON', Method: 'POST'},
                Page: {Url: me.toUrl('async_load_gantt_page', me._ioOptions({})), Timeout: 300, Format: 'JSON', Method: 'POST'},
                Layout: {
                    Url: me.toUrl('async_load_gantt_project_ui', me._ioOptions({
                        appname: me.appname,
                        projectid: me.projectid
                    }))
                }
            };

            options.Export = {
                    Format: 'JSON',
                    Url: me.toUrl('async_export_xls', me._ioOptions({})),
                    Type: "Settings"
                };

            options.ExportPDF = options.ExportPDF || {
                Url: this.servletBase + "/utility/tg/ExportPdf.jsp",
                Param: {
                	Source: "ExportPDF.html",
                	Layoutxml: options.Layout.Url,
                	Dataxml: me.toUrl('async_load_gantt_data', me._ioOptions({}))
                },
                Type: "Gantt,Settings,Expanded,Selected,Changes"
            };

            me.Layoutxml = options.Layout.Url;
            me.Dataxml = me.toUrl('async_load_gantt_data', me._ioOptions({}));
            
            return options;
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
                        log.debug('Using RUN BAR for ToolTip', row);
                    } else if (objs != null && objs.Type == 'dependency') {
                        log.debug('Using Dependency for ToolTip', objs);
                        if (objs.DependencyFromBox === '0') {
                            this._fetchDependencyTooltip(objs.DependencyFrom, objs.DependencyTo, event);
                        } else {
                            this._fetchDependencyTooltip(objs.DependencyFromBox, objs.DependencyToBox, event);
                        }
                        return false;
                    } else if ((event && event.originalTarget && event.originalTarget.className && event.originalTarget.className.indexOf("skd-icon") !== -1) ||
                    		(event && event.target && event.target.className && event.target.className.indexOf("skd-icon") !== -1)) {
                    	var fromDep = event.originalTarget? event.originalTarget.className.indexOf("left")>-1 : event.target.className.indexOf("left")>-1;
                    	this._fetchUnloadedDependencyTooltip(objs.Row.id, fromDep, event);
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

                this.fetch("async_get_tooltip", me._ioOptions({
                    projectid: me.projectid,
                    id: row.id,
                    col: col
                })).then(function (tooltip) {
                    me._showTooltip(tooltip, event, row);
                });
                return;
            }
        },

        _fetchUnloadedDependencyTooltip: function (actId, fromDep, event) {
            var me = this;
            this.fetch("async_get_tooltip_unloaded_cpm", me._ioOptions({
                projectid: me.projectid,
                activityid: actId,
                fromdependency: fromDep
            })).then(function (tooltip) {
                me._showTooltip(tooltip, event);
            });

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

        _unloadedConstraintsRemoved: function (data) {
            var item = json.parse(data);
            if (item == null) {
                log.error("Unable to parse dependency item: {}", data);
                return;
            }

            var activityRow = this.grid.GetRowById(item.id);
            if (item.incoming) {
            	delete activityRow.mxLeftIconClass;
            } else {
            	delete activityRow.mxRightIconClass;
            }

            this.grid.RefreshRow(activityRow);
            this.grid.RefreshGantt(1);
        },

        _unloadedConstraintsAdded: function (data) {
            var item = json.parse(data);
            if (item == null) {
                log.error("Unable to parse dependency item: {}", data);
                return;
            }

            var activityRow = this.grid.GetRowById(item.id);
            if (item.incoming) {
            	activityRow.mxLeftIconClass = 'skd-icon-to-dependencies';
            } else {
            	activityRow.mxRightIconClass = 'skd-icon-from-dependencies';
            }

            this.grid.RefreshRow(activityRow);
            this.grid.RefreshGantt(1);
        },

        GetRootActivity: function (/*TGrid*/grid) {
        	if (grid.Body && grid.Body.firstChild) {
        		return grid.Body.firstChild;
        	}
        	return null;
        },

        OnCfgSaved: function (/*TGrid*/grid, /*String*/ cfg) {
            this.inherited(arguments);
            // for server paging, TG loses filter/sort states, so we return false so that it can track it
            return false;
        },

        MarkToBeSaved: function() {
        	this.showMessage("system#saverecord");
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
        		row['WhiteBackground'] = 1;
        	}

        	return color;
        },

        OnContextMenuItemSelected: function (/*TMenuItem*/item, /*TROW*/row, /*List*/ selection) {
        	this.inherited(arguments);
        	if (item.Value == "COMMSELECTED") {
        		row['_UNCOMMITTED'] = 0;
        		this.grid.RefreshRow(row);
        	}
        }
    });
});

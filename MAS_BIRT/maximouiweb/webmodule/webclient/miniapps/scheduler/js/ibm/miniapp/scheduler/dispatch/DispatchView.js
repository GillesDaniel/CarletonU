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
    "com/ibm/tivoli/maximo/miniapps/_MaximoIO",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
    "ibm/miniapp/scheduler/gantt/GanttWidget",
    "com/ibm/tivoli/maximo/miniapps/Handlers",
    "ibm/miniapp/scheduler/dispatch/MapUtil",
    "ibm/miniapp/scheduler/dispatch/DispatchViewActions",
    "dojo/dom-geometry",
    "dojo/dom-style"
], function (lang, declare, _MaximoIO, log, GanttWidget,
             Handlers, MapUtil, DispatchViewActions, geom, style) {

    // Alternate Default Row Colors (RGB)
    var ALTERNATE_ROW_COLOR1 = JSON.stringify([235, 255, 255]);
    var ALTERNATE_ROW_COLOR2 = JSON.stringify([224, 244, 244]);
    var ALTERNATE_ROW_COLOR3 = JSON.stringify([211, 228, 244]);
    var ALTERNATE_ROW_COLOR4 = JSON.stringify([191, 228, 244]);
	
    return declare([GanttWidget, _MaximoIO, Handlers, DispatchViewActions], {
        constructor: function (options) {
            // super is called automatically, apparently
            log.debug("{} Base Bean Target set to {} for view", this.gridId, this.mxtargetbean, options);
            this.mapReady=false;
            this.firstTime=true;
            this.initMap();
            this.showMessage=null;
            this.undoingChanges=false;
            // Array that contains all alternate row IDs
            this.alternateRowIDs = [];

            if (window.timeoutId != null) {
            	window.clearTimeout(window.timeoutId);
            }

            // Overriding array object to add a function to remove by value.
            if (!Array.prototype.remove) {
            	Object.defineProperty(Array.prototype, "remove", {
                	value: function() {
                		var what, a = arguments, L = a.length, ax;
                		while (L && this.length) {
                			what = a[--L];
                			while ((ax = this.indexOf(what)) !== -1) {
                				this.splice(ax, 1);
                			}
                		}
                		return this;
                	},
                	enumerable: false,
                	writable: true,
                	configurable: true
                });
            }
            
            var me = this;
        	(function () {
        	    // An anonymous function wrapper helps you keep oldSendEvent private to this view.
        	    var oldSendEvent = sendEvent;

				// Override the sendEvent function as an interceptor, in order to close the Date Picker.
        	    sendEvent = function (eventtype, targetid, value) {
        	    	// Check if a click over 'tab' event was fired, and close Date Picker before switching to another tab.
        	    	if (eventtype == 'click') {
        	    		me.cancelAutoRefresh();
        	    	}
        	        oldSendEvent(eventtype, targetid, value);
        	    }
        	})();

        	window.onclick = function(e) { 
        		if (e.type == 'click' && e.target && e.target.attributes && e.target.attributes.length > 0) {
        			var input = e.target.attributes[0];
        			if (input.value == "closeBtn") {
        				var dropDownMenu = document.getElementsByClassName("dijitPopup dijitMenuPopup");
        				for (i=0; i<dropDownMenu.length; i++) {
        					dropDownMenu[i].style.display = "none";
        				}
        			}
        		}
        	};

            if (log.isDebug()) {
                try {
                    dojo.config.fwm.debug=true;
                } catch (e) {}
            }
        },
        
        addCustomActions: function(gridId) {
            // add ZoomToWork action
            // This is called from the ZoomToWork Toolbar Action
            window.Grids.ZoomToWork = lang.hitch(this, this.ZoomToWork);
        },

        destroy: function () {
            this.inherited(arguments);
            if (window.timeoutId != null) {
            	window.clearTimeout(window.timeoutId);
            }
            delete window.dispatcher;
        },

        isResourceView: function() {
            return true;
        },

        shouldRightClickSelectRow: function(grid, row, col) {
            // we don't want right clicks to add a row selection for dispatching
            return false;
        },

        initMap: function() {
            log.debug("Begin Init Map");
            var maputil = new MapUtil({dispatchView: this});
            maputil.checkForMap();
            log.debug("End Init Map");
        },

        setMapReady: function(ready) {
            this.mapReady=ready;
            log.debug("MAP READY: {}", this.mapReady)
        },

        OnAfterSave: function (/*TGrid*/grid, /*int*/result, /*boolean*/autoupdate) {
        	this.inherited(arguments);
        	var me = this;
        	if (this.showMessage != null) {
        		this.grid.ShowMessageTime(this.showMessage, 
        			0, 
        			function(result) {
        				me.showMessage = null;
        				if (result==2) {
        					me.undoingChanges = true;
        					me.grid.DoUndo();
        				}
        			},
        			["Yes","Cancel"]
        		);
        	}
        	me.undoingChanges = false;
        },

        OnUpdateRow: function (/*TGrid*/grid, /*TRow*/row, /*TRow*/update) {
        	this.inherited(arguments);
        	if (row.parentNode && row['Moved'] && row['Moved'] >= 2) {
            	var laborCrewRow = row.parentNode;
            	var rowUpdated = false;
            	if (laborCrewRow['_REFOBJECTNAME'] == 'LABOR' || laborCrewRow['_REFOBJECTNAME'] == 'AMCREW') {
                	row['ACTIVITY_RENDER_COLOR'] = laborCrewRow['ACTIVITY_RENDER_COLOR'];
                	row['ACTIVITY_FONT_COLOR'] = laborCrewRow['ACTIVITY_FONT_COLOR'];
                	delete row['_INTERNALSTATUS'];
                	rowUpdated = true;
            	}
            	else if ((laborCrewRow['_REFOBJECTNAME'] == 'CRAFT' || laborCrewRow['_REFOBJECTNAME'] == 'AMCREWT') && !row['_INTERNALSTATUS']) {
                	row['STATUS'] = 'WAITASGN';
                	row['_INTERNALSTATUS'] = 'WAITASGN';
                	rowUpdated = true;
            	}
            	
            	if (row.ERRVAL && this.undoingChanges) {
            		delete row.ERRVAL;
            		rowUpdated = true;
            	}

            	if (rowUpdated) {
            		this.grid.RefreshRow(laborCrewRow);
            		this.grid.RefreshRow(row);
            	}
            	this._updateRoutes();
        	}
        	
        	if (row.parentNode && row['Changed'] && row['Changed'] >= 1) {
            	if (row['_REFOBJECTNAME'] == 'LABOR' || row['_REFOBJECTNAME'] == 'AMCREW') {
            		row['GGanttPoints'] = update['GGanttPoints'];
            		row['GGanttPointsEdit'] = update['GGanttPointsEdit'];
            		row['GGanttPointsIcons'] = update['GGanttPointsIcons'];
            		row['GGanttPointsIDs'] = update['GGanttPointsIDs'];
            		row['_NWPARTS'] = update['_NWPARTS'];
                	this.grid.RefreshRow(row);
            	}
        	}

        	if (update != null && update["_WARNINGMESSAGE"] != null && !this.undoingChanges) {
        		this.showMessage = update["_WARNINGMESSAGE"];
        	}
        },

        OnGetDefaultColor: function (G, row, col, r, g, b) {
            // conflict rows
            if ((row.Height > 30 || (row.ERRVAL && row.ERRVAL > 0)) && col=='RESDESCRIPTION') {
                return this._conflictRowColor;
            }
            return null;
        },

        _newTreeGridOptions: function () {
            var me = this;
            var params = {
                appname: me.appname,
                projectid: null,
                addShiftInfo: true,
                resObj1: null,
                resKey1: null
            };
            var options = {
                Data: {Url: me.toUrl('async_load_dispatch_data', me._ioOptions(params)), Timeout: 300},
                Layout: {Url: me.toUrl('async_load_dispatch_ui', me._ioOptions(params))}
            };

            return options;
        },

        /**
         * jsCallback is called from the Map.
         * @param name function name
         * @param data function data
         */
        jsCallback: function(name, data) {
            if (this[name]) {
                log.debug("{}: jsCallback: ", this.TAG, name, data);
                lang.hitch(this, this[name]).apply(this, [data]);
            } else {
                log.error("{}: Missing Callback Function: {}", this.TAG, name);
            }
        },

        updateProjId: function(projId) {
            log.error("{}: updateProjId() not implemented", this.TAG);
        },

        onSLRTravelTimeUpdated: function(data) {
            log.debug("{}: onSLRTravelTimeUpdated called with data as {}", this.TAG, typeof data, data);

            if (typeof data == "string") {
                data = JSON.parse(data);
            }
            var me=this;
            if (data && data['totalToUpdate']>0) {
                log.debug("Need to reload model travel time");
            	var ganttReloadNeeded = data['ganttReloadNeeded'];
            	if (ganttReloadNeeded == true) {
                    this.fetch("on_reload_model_for_traveltime").then(function(result) {
                    	me.Reload();
                    }, function(err) {
                        log.debug("ERROR:", err);
                    });
            	} else {
            		var updatedResources = data['updatedResources'];
            		if (updatedResources != null) {
                        for (var i=0;i<updatedResources.length;i++) {
                        	var updatedResourceRow = updatedResources[i];
                        	var gridResourceRow = me.grid.GetRowById(updatedResourceRow['id']);
                        	gridResourceRow['GGanttPoints'] = updatedResourceRow['GGanttPoints'];
                        	gridResourceRow['GGanttPointsEdit'] = updatedResourceRow['GGanttPointsEdit'];
                        	gridResourceRow['GGanttPointsIcons'] = updatedResourceRow['GGanttPointsIcons'];
                        	gridResourceRow['GGanttPointsIDs'] = updatedResourceRow['GGanttPointsIDs'];
                        	gridResourceRow['_NWPARTS'] = updatedResourceRow['_NWPARTS'];
                        	me.grid.RefreshRow(gridResourceRow);
                        }
            		}
            		me.grid.RefreshGantt(1);
            	}
            }
        },

        attachExtraGridEvents: function (gridId) {
            TGAddEvent('OnGanttTip', gridId, lang.hitch(this, this.OnGanttTip));
            TGAddEvent('OnScroll', gridId, lang.hitch(this, this.OnScroll));
            TGAddEvent('OnExpand', gridId, lang.hitch(this, this.OnExpandOrCollapse));
            TGAddEvent('OnGetDefaultColor', gridId, lang.hitch(this, this.OnGetDefaultColor));
            TGAddEvent('OnUpdateRow', gridId, lang.hitch(this, this.OnUpdateRow));
            TGAddEvent('OnSizeError', gridId, lang.hitch(this, this.OnSizeError));

            this.subscribeOn('scheduler.ZoomToStart', lang.hitch(this, this.zoomToStart));
            this.subscribeOn('scheduler.dispatch.refresh', lang.hitch(this, this.refreshSchedule));
        },

        OnExpandOrCollapse: function(grid, row) {
            // NOTE: _updateRoutes uses a 150ms delay and this is needed, so that we can rapidly fire
            // OnExpand events but overwhelm the map with update requests.  ie, only the last one will
            // actually cause the map to update.
            this._updateRoutes();
        },

        refreshSchedule: function() {
        	if (this.domNode) {
        		this.dispatchGridWidth = this.domNode.clientWidth;
        	}

        	if (this.grid) {
                this.dispatchGridLeftWidth = this.grid.GetBodyWidth(0);
                this.dispatchGridMidWidth = this.grid.GetBodyWidth(1);
                this.dispatchGridRightWidth = this.grid.GetBodyWidth(2);
        	}

        	var me = this;
            this.fetch("on_reload_model_for_traveltime").then(function(result) {
                me.Reload();
            }, function(err) {
                log.debug("ERROR:", err);
            });
        },

        /**
         * Create the weather params
         * @param row
         * @returns {{wonum: string, objectid: *, objectname: *, start, end}}
         */
        getWeatherParams: function(row) {
            var params = {};
            log.debug("WEATHER ROW", row);
            if (row.WORKORDERID) {
                params.oname = 'WORKORDER';
                params.objectid = row.WORKORDERID;
                params.wonum = row.WONUM;
                params.start = row.startTime;
                params.end=row.endTime;
            }

            return params;
        },

        Reload: function(onCompleteCallback) {
            log.debug("Reload Called");
            if (onCompleteCallback) {
                var cb = function() {
                    log.debug("Removing Reload Callback Handler");
                    TGDelEvent('OnReady', this.gridId, cb);
                    onCompleteCallback();
                };
                log.debug("Added Reload Callback Handler");
                TGAddEvent('OnReady', this.gridId, cb, cb);
            }

            // Reload doesn't have a callback itself
            this.grid.Reload();
            // Reset flag to force fetching routes when reloading the Gantt.
            this.firstTime = true;
        },

        ReloadModel: function() {
            log.debug("Reload Model Called");

            var me = this;
            // Force application to clear the model cache in order to force a model reload. 
            this.fetch("on_reload_model_for_traveltime").then(function(result) {
            	me.Reload();
            }, function(err) {
                log.debug("ERROR:", err);
            });
        },

        OnScroll: function(/*TGrid*/ grid, /*int*/ hpos1, /*int*/ vpos, /*int*/ oldhpos1, /*int*/ oldvpos, /*int*/ hpos0, /*int*/ oldhpos0, /*int*/ right_pos_h, /*int*/ old_right_pos_h) {
            if (old_right_pos_h != right_pos_h) {
                log.debug("Scrolling Gantt: OLD: {}, new: {}", old_right_pos_h, right_pos_h);
                this.invokeLater(lang.hitch(this, this._updateRoutes), 300, "OnScrollUpdateRoutes");
            }
        },

        OnSelectRow: function (/*TGrid*/ grid, /*TRow*/ row, /*int*/ deselect) {
            this.inherited(arguments);
            this._updateRoutes();
        },

        zoomToStart: function() {
            this.zoomToDay(this.grid.Cols['G'].GanttChartMaxStart);
        },

        /**
         * ZoomToDay will zoom into the work for the given day, or the entire day.  It will try to find all routes
         * for the given day, and then zoom to show exactly those routes.
         * @param date
         */
        zoomToDay: function(date) {
            var start = (date instanceof Date) ? date.getTime() : date;
            var startDay = new Date(start);
            startDay.setHours(0, 0, 0, 0);
            start = startDay.getTime();
            var end = start + this.DURATION_ONE_DAY;
            var routes = this.getRoutesForRange(start,end);
            if (routes && routes.length > 0) {
                // get the min/max start/end times
                var range = this.getMinMaxStartEndForRoutes(routes);
                log.debug("Adjusted Start: {}, End: {}", new Date(range.start), new Date(range.end), range.startItem, range.endItem);
                this.grid.ZoomTo(range.start-this.DURATION_ONE_HOUR, range.end+this.DURATION_ONE_HOUR, null);

            } else {
                log.debug('ZoomToDay: start {}, end: {}', new Date(start), new Date(end));
                this.grid.ZoomTo(start, end, null);
            }
        },

        /**
         * Given the list of routes, find the min start time and then max end time
         * @param routes
         * @returns {{start: number, end: number}}
         */
        getMinMaxStartEndForRoutes: function(routes) {
            var range = { start:Math.pow(2, 53), end:Math.pow(-2, 53)};
            routes.forEach(function(route) {
                if (route.startTime<range.start) {
                    range.start=route.startTime;
                    range.startItem=route;
                }
                if (route.endTime > range.end) {
                    range.end=route.endTime;
                    range.endItem=route;
                }
            }, this);
            return range;
        },

        _GetAltCSSClassForActivity: function(row) {

        },

        OnGanttTip: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*string*/ tip, /*object*/ XY, /*string*/ name) {
            log.debug("gantt tip: tip: {}", XY);
            return tip;
        },

        GetBarStyle: function(row) {
            var style="";
            if (row['ACTIVITY_RENDER_COLOR']) style+=("background-color: " + row['ACTIVITY_RENDER_COLOR'] + ";");
            if (row['ACTIVITY_FONT_COLOR']) style+=("color: " + row['ACTIVITY_FONT_COLOR'] + ";");
            return style;
        },

        OnGetGanttBarHtml: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ width, /*int*/ comp, /*int*/ crit, /*int*/ plan, /*int*/ index, /*string*/ txt, /*int*/ left, /*int*/ maxwidth, tgClasses, runErrorFlag) {
            if (row['FWMTYPE'] == 'STARTLOCATION') {
                return "<div class='dispatch-start'></div>";
            } else {
                var text = this.inherited(arguments);
                var barStyle=this.GetBarStyle(row);
                var bar = '<div class="' + tgClasses[2] + '" style="'+barStyle+'" ><span class="' + tgClasses[3] + '">' + ((text) ? text : '') + '</span></div>';
                return bar;
            }
        },

        OnFocus: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*TRow*/ orow, /*string*/ ocol, /*int*/ pagepos) {
            /* ignore doing schedule windows on focus */
        },

        OnRenderFinish: function (/*TGrid*/ grid) {
            this.inherited(arguments);
            
            if (!window.dispatcher || !window.dispatcher.map) {
                // Notify Map to load itself after the Gantt has finished loading.
                this.publishTo('readyToCreateMap', true);
            }

            if (this.firstTime) {
                this.firstTime=false;

                log.debug("Dispatch Render Finish.  Refocus to 1 Day Zoom.");
                var me = this;
                this.invokeLater(function () {
                    // don't re-zoom if there is a previous saved scroll offset
                    if (grid.GetScrollLeft(2) == 0) {
                        // zoom in, and then select all rows
                        me.zoomToStart();
                    }

                    // first time in, select all rows
                    var selected=grid.GetSelRows();
                    if (!selected || selected.length==0) {
                        log.debug("Selecting ALl Rows, since None Are Selected");
                        grid.SelectAllRows(1);
                    }

                    // need to refresh the Map routes
                    if (window.dispatcher && window.dispatcher.map) {
                    	me._updateRoutes();
                    }

                    // need to figure out selection using server side since this will supercede the state
                    // me.grid.SelectAllRows(1);

                    if (window.timeoutId != null) {
                    	window.clearTimeout(window.timeoutId);
                    }

                    if(me.options.scheduler_plus_license) {
                        window.timeoutId = setTimeout(function () {
                        	me._autoRefreshData(me);
                        }, me.dispatchRefreshInterval); // Fires an autorefresh for the amount of seconds set for this Project.
                    }
                }, 100);

                for (i=0; i<this.alternateRowIDs.length; i++) {
                	var altRow = grid.GetRowById(this.alternateRowIDs[i]);
                	if (altRow && altRow['GGanttBackground']) {
                		var ganttBackground = altRow['GGanttBackground'];
                		ganttBackground = ganttBackground.split('White').join('WORKAlternate');
                		altRow['GGanttBackground'] = ganttBackground;
                        grid.RefreshRow(altRow);
                	}
                }
            }

            grid.RefreshGantt(255);
        },

        _updateRoutes: function() {
            this.invokeLater(lang.hitch(this, this.updateRoutesForTimes),150, "_updateRoutes");
        },

        getRoutesForRange: function(start, end) {
            var routes = [];
            this.visitRow(this.grid.Body, {}, function (act) {
                //log.debug("VISIT: ", act);
                if (act['startTime'] >= start && act['endTime'] <= end) {
                    //log.debug("VISIT: Adding", act);
                    routes.push(act);
                }
                return true;
            });
            return routes;
        },

        onlyExpandedRows: function(rows) {
            if (!rows) return null;
            var all = [];
            for (var i=0;i<rows.length;i++) {
                if (this.isRowVisible(rows[i].parentNode)) {
                    all.push(rows[i]);
                }
            }
            return all;
        },

        GetSelectedRowIds: function (rows) {
            var selection = "";
            var comma = "";
            for (var k in rows) {
                selection = selection + comma + rows[k]['id'];
                comma = ",";
            }
            return selection;
        },

        isRowVisible: function (row) {
            if (!row) return false;
            if (row.Level < 0 || row.id=='ROOT') return true; // root row is always visible
            if (row.firstChild && !row.Expanded) return false; // if we are parent, but we are not expanded
            if (row.parentNode) return this.isRowVisible(row.parentNode); // keep moving up the parent nodes
            return true;
        },

        updateRoutesForTimes: function(refreshOptions) {
            var me=this;
            if (!this.grid)
            	return;
            var rows = this.onlyExpandedRows(this.grid.GetSelRows());
            if (rows && rows.length>0) {
                var dates = this.getVisibleRange();
                log.debug("{}: updateRoutes: Processing {} Rows, Dates: ", this.TAG, rows.length, dates);
                log.debug("{}: Date Range: start: {}, end: {}", this.TAG, new Date(dates.start), new Date(dates.end));

                var selection = this.GetSelectedRowIds(rows);
                this.fetch("async_get_route_details_for_resources", me._ioOptions({
                    resources: selection.split(','),
                    start_time: dates.start,
                    end_time: dates.end,
                    refresh_options: refreshOptions || {}
                })).then(function (routes) {
                    log.debug("WE GOT OUR ROUTE DATA", routes);
                    me.clearRoutes();
                    me.drawRoutes(routes, selection);
                });

                if (window.dispatcher) {
                    log.debug("{}: Getting Unassigned work for dates", this.TAG, dates);
                    // normally we don't need to adjust the dates, but, this is handled by the Map and the Map doesn't
                    // know that we've converted the times to GMT0, so we addt he TZ back.
                    //window.dispatcher.updateUnAssignWODates(this.TGDateToTZDate(dates.start), this.TGDateToTZDate(dates.end));
                    window.dispatcher.updateUnAssignWODates(this.TGDateToUserTZDate(dates.start), this.TGDateToUserTZDate(dates.end));
                }
            } else {
                this.clearRoutes();
            }
        },

        drawRoutes: function(routes, selection) {
            if (routes && routes.allRoutes) {
                if (window.dispatcher && window.dispatcher.drawAllRoutes) {
                    log.debug("Telling Dispatcher to draw routes...");
                    window.dispatcher.drawAllRoutes(routes, null, null);
                } else {
                    // wait for dispatcher to arrive
                    var me=this;
                    this.invokeLater(function() {
                        log.debug("Waiting for 'dispatcher' and then we can draw routes");
                        me.drawRoutes(routes, selection);
                    }, 100, "drawRoutes");
                }
            } else {
                log.warn("No ROUTES for {}", selection);
            }
        },

        clearRoutes: function() {
            if (!window.dispatcher) {
                log.debug("No Dispatcher, Ignore Routes");
                return;
            }
            window.dispatcher.clearAllCurrentRoutes();
        },

        /**
         * Called by the MAP directly
         * @param idx
         */
        highlightactivity: function(idx) {
            var row = this.findRowByIDX(idx);
            log.debug("HIGHLIGHT ACTIVITY called from the Map: {}", idx, row);
            if (row) {
                this.focusGanttBar(row);
            }
        },

        /**
         * Called by the MAP directly
         * @param options
         */
        updateModelWithOptions: function(options) {
        	if (this.domNode) {
        		this.dispatchGridWidth = this.domNode.clientWidth;
        	}

        	if (this.grid) {
                this.dispatchGridLeftWidth = this.grid.GetBodyWidth(0);
                this.dispatchGridMidWidth = this.grid.GetBodyWidth(1);
                this.dispatchGridRightWidth = this.grid.GetBodyWidth(2);
        	}

            // {"noZoom":false,"refreshMap":true,"hasCallback":true,"hasErrCallback":true}
            if (typeof options == 'string') {
                options = JSON.parse(options);
            }

            if (!options) return;

            this.clearRoutes();
            var me = this;
            this.fetch("on_reload_model_for_traveltime").then(function(result) {
                // will trigger the OnNotifyMapOnLoad
                if (options && options.hasCallback && window.dispatcher && window.dispatcher._refreshInfo) {
                	me.Reload(window.dispatcher._refreshInfo.callback);
                }
                else {
                	me.Reload();
                }
            }, function(err) {
                log.debug("ERROR:", err);
            });
        },

        /**
         * Called by focusGanttBar when dragging settles down
         * @param row
         * @private
         */
        _focusGanttBarAdditionalActions: function(row) {
            if (!row || !row['_idx']) {
                // not something that we can push to the map
                return;
            }
            if (window.dispatcher) {
                // NOTE: we use _idx for the id's when commnicating to/from the map
                log.debug("Notify Map about Selected Item XXXXX: {}", row['_idx']);
                window.dispatcher.highlightStop(row['_idx']);
            }
        },


        findRowByIDX: function(idx) {
            return this.grid.GetRowById(idx, "_idx", false);
        },

        /**
         * We want to ensure that we always the size of the map, and keep in sync.
         */
        resize: function() {
            // do normal resize
            this.inherited(arguments);

            // now update according the map's static ID
            var mapcontainer_id = 'm35629182-mapcontrol_components_h1_0';
            var mapControl = document.getElementById(mapcontainer_id)
            if (mapControl == null) {
            	return;
            }
            var mapPos = geom.position(mapcontainer_id);
            var h = (mapPos) ? mapPos.h : 0;
            // we only do it, if the map is there, and the
            if (h && h>300) {
                style.set(this.domNode, {
                    "height": h+'px'
                });
                log.debug("{}: Updated Dispatch Height to match the map: {}", this.TAG, h);
            } else {
                log.debug("{}: Ignore Map Size", this.TAG, mapPos);
            }
        },

        OnSizeError: function(/*TGrid*/ grid, /*int*/ width, /*int*/ height) {
        	if (this.dispatchGridWidth && this.dispatchGridLeftWidth
        		&& this.dispatchGridMidWidth && this.dispatchGridRightWidth)
        	{
                this.domNode.style.width = this.dispatchGridWidth+'px';
                grid.LeftWidth = this.dispatchGridLeftWidth;
                grid.MidWidth = this.dispatchGridMidWidth;
                grid.RightWidth = this.dispatchGridRightWidth;
                grid.Update();
        	}
            return true;
        },

        _autoRefreshData: function (me) {
            this.fetch("async_auto_refresh_model", me._ioOptions({
                projectid: me.projectid
            })).then(function (reply) {
            	if (reply && reply.Changes && reply.Changes.length) {
            		var changes = reply.Changes;
            		var addedRowIds = [];
            		var refreshRoutes = false;
            		for (var i=0; i<changes.length; i++) {
            			var assignmentRow = changes[i];
            			if (assignmentRow['Parent'] != null) {
            				var laborCrewRow = me.grid.GetRowById(assignmentRow['Parent']);
            				assignmentRow['ACTIVITY_RENDER_COLOR'] = laborCrewRow['ACTIVITY_RENDER_COLOR'];
            				assignmentRow['ACTIVITY_FONT_COLOR'] = laborCrewRow['ACTIVITY_FONT_COLOR'];
            			}
            			addedRowIds.push(assignmentRow['id']);
            		}
            		me.grid.AddDataFromServer(reply);
            		for (var x=0; x<addedRowIds.length; x++) {
            			var newRow = me.grid.GetRowById(addedRowIds[x]);
            			if (newRow == null)
            				continue;
            			newRow['name'] = changes[x].name;
            			newRow['_idx'] = changes[x]._idx;
            			newRow['HASTRAVELTIME'] = changes[x].HASTRAVELTIME;
            			newRow['TRAVELTIME_SECS'] = changes[x].TRAVELTIME_SECS;
            			newRow['mxRightIconClass'] = changes[x].mxRightIconClass;
            			newRow['mxLeftIconClass'] = changes[x].mxLeftIconClass;

            			if (assignmentRow['Parent'] != null) {
            				refreshRoutes = true;
            				var parentType = assignmentRow['Parent'];
            				if (parentType.includes("CRAFT") || parentType.includes("AMCREWT"))
            				{
            					newRow['_OBJECTNAME'] = changes[x]._OBJECTNAME;
            					newRow['_REFOBJECTNAME'] = changes[x]._REFOBJECTNAME;
            					newRow['_INTERNALSTATUS'] = changes[x]._INTERNALSTATUS;
            					newRow['STATUS'] = changes[x].STATUS;
            				}
            				else
            				{
            					delete newRow['_INTERNALSTATUS'];
            				}
            			}
            			if ((newRow.ERRVAL & (me.ERRORS.ERR_CONFLICT_DOUBLE_BOOKED)) != 0) {
                			newRow.Height = 34;
                			newRow.MaxHeight = 34;
                			newRow.GGanttPointsTop = 0;
                			me.grid.RefreshRow(newRow);
            			}
            		}
            		me.grid.RefreshGantt(1);
            		if (refreshRoutes)
            			me._updateRoutes();
            	}

            	window.clearTimeout(window.timeoutId);
                window.timeoutId = setTimeout(function () {
                	me._autoRefreshData(me);
                }, me.dispatchRefreshInterval); // Fires an autorefresh for the amount of seconds set for the Project.
            });
        },

        cancelAutoRefresh: function () {
        	if (window.timeoutId != null) {
        		window.clearTimeout(window.timeoutId);
        	}
        },

        onRefreshRequested: function(data) {
        	if (this.domNode) {
        		this.dispatchGridWidth = this.domNode.clientWidth;
        	}

        	if (this.grid) {
                this.dispatchGridLeftWidth = this.grid.GetBodyWidth(0);
                this.dispatchGridMidWidth = this.grid.GetBodyWidth(1);
                this.dispatchGridRightWidth = this.grid.GetBodyWidth(2);
                this.ReloadBody();
        	}
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
            	if (row && col == 'RESID' && rgb == ALTERNATE_ROW_COLOR3) {
            		if (!this.alternateRowIDs.includes(row.id)) {
            			this.alternateRowIDs.push(row.id);
            		}
            	}

            	if (row && col == 'RESID' && rgb == ALTERNATE_ROW_COLOR4) {
            		if (this.alternateRowIDs.includes(row.id)) {
            			this.alternateRowIDs.remove(row.id);
            		}
            	}
        	}
        	
        	return color;
        }
    });
});

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
    "dojo/aspect",
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
    "ibm/miniapp/scheduler/SingleGanttView"


], function (lang, aspect, win, domClass, on, mouse, declare, _MaximoIO,
             log, topic, GanttActions,
             Tooltip, domGeom, TooltipDialog, popup, json, array, dom, SingleGanttView) {

    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
    // Alternate Default Row Colors (RGB)
    var ALTERNATE_ROW_COLOR1 = JSON.stringify([235, 255, 255]);
    var ALTERNATE_ROW_COLOR2 = JSON.stringify([224, 244, 244]);

    return declare([_MaximoIO, GanttActions, SingleGanttView], {

        constructor: function (options) {
        	var me = this;

        	// NOTE: Changed this to using Aspects so that we can better control adding and removing it
            // PRevious code would keep hooking into to everytime we loaded the gantt, resulting an the sendEvent
            // being wrapped multiple times
            log.debug("Hooking into sendEvent to be able to close scheduler popup windows");
        	this.aspectSendEventBefore = aspect.before(window, 'sendEvent', function(eventtype, targetid) {
        	    try {
                    if (eventtype === 'click') {
                        me.closeDatePicker();
                        me._hideTooltip();
                    }
                } catch (e) {
        	        log.debug("Scheduler encountered and error before sendEvent", e);
                }
            });

        	this.aspectSetDialogPositionBefore = aspect.before(window, 'setDialogPosition', function(id,ctrlId,max) {
        	    try {
        	    	var dialog = getElement(id + "_inner");
        	    	if (dialog != null) {
        	    		dialog.click();
        	    	}
                } catch (e) {
        	        log.debug("Scheduler encountered and error before setDialogPosition", e);
                }
            });

        	this.ERRORS = {
                ERR_INVALID_CRAFT_SKILL    : (1 << 2),
                ERR_CONFLICT_DOUBLE_BOOKED : (1 << 3), // multiple assignments on the same time
                ERR_SCHEDULE_WINDOW        : (1 << 4),
                ERR_CAPABILITY             : (1 << 5), // ACM Capability Validation
                ERR_CONFLICT_NON_WORK      : (1 << 6) // conflict with NON working time
            };

            // declare private instance objects
            this.options=options||{};
            this.showCurrentDateLine = true; // if true, then it will show the current date/time as a line on the chart

            // various Gantt Lines
            this.SNELINE="";
            this.FNLLINE="";
            this.REPLOCSTARTLINE="";
            this.REPLOCFINISHLINE="";

            /**
             *
             * @type {TreeGrid}
             */
            this.grid = null;

            this.mouseOutHandler = null;
            this._tooltip = null;
            this._focusGanttObject = null;
            this.gridId = null;
            this.mxtargetbean = null;
            this._tooltipTimeout = null;
            // informational
            this.ViewName = 'Gantt';
            // prevent first "auto state save" due to TG bug
            this._noStateSave = true;
            this.TAG = 'NotCreated';

            // this is a timeout to apply to all the TreeGrid communication URLs
            this.TIMEOUT = 1000;

            if (options) this.loglevel = options.loglevel;
            if (options && options.messages) {
                // mix in our messages
                lang.mixin(this.messages, options.messages);
            }
            this._conflictRowColor = "#" + options["ga.conflict.row.color"];
            this._pmreforecastpendingBG = "#" + options["pm.reforecastpending.background"];
            this._pmreforecastpendingFG = "#" + options["pm.reforecastpending.foreground"];

            // use priority colors
            this.usePriorityColors = !options["usestatuscolors"];

            // These control the _createGANTT() and what gets registered as events
            this.ganttDisableRenderers = false;
            this.ganttDisableClicks = false;
            this.ganttDisableEdit = false;

            /** state object for long term persistence **/
            this.state = {};

            this.lastMouseDownEvent = null;

            this.automationEnabled = options.automationEnabled;

            if (this.automationEnabled) {
                log.debug('{} GanttWidget created with Automation.  Performance may be degraded.', this.TAG);
            } else {
                log.debug('{} GanttWidget created', this.TAG);
            }

            this.lastRowChangedId = null;
            this.lastRowChangedStatus = null;
            // Flag used to show/hide load and availability numbers in the Resource Chart.
            this.showLoadAvailNumbers=1;
        },

        /**
         * Given a Resource like "Mechanic (5)" return "Mechanic"
         * @param res
         * @private
         */
        _parseResource: function(res) {
            if (!res) return null;
            var s = res.lastIndexOf("(");
            if (s<0) return res.trim();
            return res.substring(0,s).trim();
        },


        /**
         * Given a Resource like "Mechanic (5), Electrician (3)" return "Mechanic,Electrician"
         * @param res
         * @private
         */
        _parseResources: function(res) {
            if (!res) return null;
            var val = "";
            var multires = res.split(",");
            if (multires && multires.length) {
                for (var i=0;i<multires.length;i++) {
                    if (val.length) val+=",";
                    val += this._parseResource(multires[i]);
                }
            }
            return val;
        },


        _removeOldGrid: function() {
            if (this.grid != null) {
                this.clearHandlers();
                log.debug('{} Cleaning up TreeGrids', this.TAG);
                try {
                    if (this.mouseOutHandler != null) {
                        this.mouseOutHandler.remove();
                    }
                    this._hideTooltip();
                    this.grid.Dispose();
                    // remove all grids, and resets the index
                    // caveat... dialogs would destroy everything... pages with 2 grids would destroy the first grid
                    /// need a way to do this and only do it for a single grid, preserving the indexes of previous
                    // grids...
                    // window.DisposeGrids();
                    var noGrids = true;
                    for (var i=0; i<Grids.length; i++) {
                    	var G = Grids[i];
                    	if (G) {
                    		noGrids = false;
                    		break;
                    	}
                    }
                    if (noGrids) {
                    	window.DisposeGrids();
                    }
                    this.grid=null;
                } catch (ex) {
                    log.warn('{} TreeGrid clean up encountered an error', this.TAG, ex);
                }
                this._firstRender = false;
            }
        },
        
        _getKeyPrefixName: function() {
            return "Ctrl";
        },

        _newGridID: function() {
            // now set the new gridId and TAG so that it's never reused
            this.gridId = "g" + Math.floor((Math.random() * 10000) + 1);
            this.TAG = this.options.TAG + "[" + this.gridId + "]";
        },

        destroy: function () {
            if (this.aspectSendEventBefore) this.aspectSendEventBefore.remove();
            if (this.aspectSetDialogPositionBefore) this.aspectSetDialogPositionBefore.remove();
            this._removeOldGrid();
            this.inherited(arguments);
        },

        progress: function (show) {
            if (show) {
                domClass.add(win.body(), "skd-waiting");
            } else {
                domClass.remove(win.body(), "skd-waiting");
            }
        },

        _ioOptions: function (o) {
            if (this.mxtargetbean != null) {
                o.mxtargetbean = this.mxtargetbean;
            }
            return o;
        },

        _createUI: function() {
            // when _createUI is called and we have a grid then clean it up before creating a new UI
            // if we don't then we end up with many registered handlers
            this._removeOldGrid();

            this._newGridID();

            this.inherited(arguments);

            this._initGANTT();

            //this.mouseOutHandler = on(this.domNode, mouse.leave, lang.hitch(this, this._mouseLeave));
        },

        _mouseLeave: function (e) {
            //log.debug("mouseLeave: ", e);
            if (this.DATE_SELECTION_IN_PROGRESS) return;
            if (e && (e.toElement || e.explicitOriginalTarget || e.srcElement)) {
                var el = (e.toElement || e.explicitOriginalTarget || e.srcElement);
                var id = el.className || el.id;
                if (id && id.indexOf && id.indexOf("Tooltip") != -1) {
                    // don't process mouse out for tooltip
                    return;
                }
            }
            this._hideTooltip();
        },

        _RefreshRowsToTop: function (row) {
            if (row == null) return;
            log.debug("{} refreshing row", this.TAG);
            this.grid.RecalculateRows(row, 1);
            this.grid.Calculate(1, 1);

        },

        _initGANTT: function () {
            log.info('{} Initializing Gantt', this.TAG);
            if (window.TreeGrid) {
                // already loaded, so just created
                this._createGANTT();
            } else {
                log.error("{} This should not happen, TreeGrid would already be loaded!!", this.TAG);
            }
        },
        __DEBUG: function (grid, /*int*/ level) {
            log.debug('[{}]: TreeGrid Debug Message: ', level, arguments, grid);
            return true;
        },

        canRender: function () {
            return true;
        },

        addCustomActions: function(gridId) {
            
        },
        
        _createGANTT: function () {
            var me = this;

            if (!this.canRender()) {
                log.debug('{} Unable to render,yet.', this.TAG);
                return;
            }

            log.debug("{} grid.js loaded, creating/loading data", this.TAG);

            // get options
            var opts = me._newTreeGridOptions();
            // add in defaults
            opts.Text = opts.Text || {Url: me.toUrl('async_load_text', me._ioOptions({})), Format: 'JSON'};
            opts.Debug = opts.Debug || 'Problem,Error,IOError'; // use ,Event to debug TreeGrid Events
                                                                // use ,Info to debug performance #s
            opts.Text.Cache=3; // Cache labels


            if (!this.ganttDisableEdit) {
                opts.Upload = opts.Upload || {
                        Url: me.toUrl('async_upload_changes', me._ioOptions({
                            appname: me.appname,
                            projectid: me.projectid
                        })),
                        Type: 'Changes',
                        Format: 'JSON',
                        Xml: 2
                    };
            }

            if (this.exportEnabled) {
                opts.Export = opts.Export || {
                		Name: "Export",
                        Format: "xlsx"
                    };
            }

            if (this.customUiUrl && opts.Layout) {
                log.debug("Using custome UI URL: {}", this.customUiUrl);
                opts.Layout.Url=this.customUiUrl;
            }

            if (this.customDataUrl) {
                log.debug("Using custome DATA URL: {}", this.customDataUrl);
                opts.Data.Url=this.customDataUrl;
            }

            if (opts.Layout && opts.Layout.Url) {
            	opts.ExportPDF = opts.ExportPDF || {
                    Url: this.servletBase + "/utility/tg/ExportPdf.jsp",
                    Param: {
                    	Source: "ExportPDF.html",
                    	Layoutxml: opts.Layout.Url,
                    	Dataxml: opts.Data.Url
                    },
                    Type: "Gantt,Settings,Expanded,Selected,Changes"
                };

                if (!me.Layoutxml) {
                	me.Layoutxml = opts.Layout.Url;
                }

                if (!me.Dataxml) {
                	me.Dataxml = opts.Data.Url;
                }
            }

            var sections = ['Data', 'Layout', 'Export', 'Text', 'Upload'];
            for (var i = 0; i < sections.length; i++) {
                if (!opts[sections[i]]) {
                    opts[sections[i]] = {};
                }
                opts[sections[i]].Timeout = this.TIMEOUT;
                log.debug("{}: Set Default Timeout for {} to {} seconds", this.TAG, sections[i], this.TIMEOUT);
            }

            if (!opts.Data.Url) {
                // TODO: defer loading until we get a URL
                log.info("{}: No Data Url.  Will wait for a DataUrl before continuing", this.TAG);
                return;
            }

            if (me.grid) {
                this._removeOldGrid();
            }

            log.debug("{} Creating TreeGrid {} with Options", this.TAG, me.gridId, opts);
            
            // register custom actions
            me.addCustomActions(me.gridId);

            // add additional events
            TGSetEvent('OnDataError', me.gridId, function(/*TGrid*/ grid, /*object*/ source, /*int*/ result, /*string*/ message, /*string*/ data) {
                console.log("TreeGrid Data Error", result, message, data, me.domid);
                topic.publish('miniapp.hideprogress', me.domid);
                sendEvent("showwarnings", me.appid);
                console.log("processed error");
            });
            AddEvent('OnLoadError', me.gridId, function (grid) {
                // notify the hide progress
                topic.publish('miniapp.hideprogress', me.domid);
                sendEvent("showwarnings", me.appid);
            });
            if (this.loglevel > 0) {
                // log to console unless DEBUG logging is on
                AddEvent('OnDebug', me.gridId, lang.hitch(me, me.__DEBUG));
            }

            if (!this.ganttDisableRenderers) {
                AddEvent('OnGetGanttSideHtml', me.gridId, lang.hitch(me, me.OnGetGanttSideHtml));
                AddEvent('OnGetGanttHtml', me.gridId, lang.hitch(me, me.OnGetGanttBarHtml));
                AddEvent('OnGanttTip', me.gridId, lang.hitch(me, me.OnGanttTip));
                AddEvent('OnGetGanttRunText', me.gridId, lang.hitch(me, me.OnGetGanttRunHtml));
                AddEvent('OnGetGanttRunSideText', me.gridId, lang.hitch(me, me.OnGetGanttRunSideText));

                AddEvent('OnGetClass', me.gridId, lang.hitch(me, me.OnGetTableCellClass));

                AddEvent('OnTip', me.gridId, lang.hitch(me, me.OnTip));
            }

            if (!this.ganttDisableEdit) {
                AddEvent('OnClick', me.gridId, lang.hitch(me, me.OnClick));
                AddEvent('OnRightClick', me.gridId, lang.hitch(me, me.OnRightClick));
                // better
                AddEvent('OnSelect', me.gridId, lang.hitch(me, me.OnSelectRow));

                AddEvent('OnFocus', me.gridId, lang.hitch(me, me.OnFocus));

                AddEvent('OnIconClick', me.gridId, lang.hitch(me, me.OnIconClick));

                AddEvent('OnAfterColResize', me.gridId, lang.hitch(me, me.OnAfterColResize));
                AddEvent('OnAfterSectionResize', me.gridId, lang.hitch(me, me.OnAfterSectionResize));
                AddEvent('OnAfterValueChanged', me.gridId, lang.hitch(me, me.OnAfterValueChanged));
                AddEvent('OnValueChanged', me.gridId, lang.hitch(me, me.OnValueChanged));
                AddEvent('OnGanttChange', me.gridId, lang.hitch(me, me.OnBeforeGanttChanged));
                AddEvent('OnGanttChanged', me.gridId, lang.hitch(me, me.OnGanttChanged));
                AddEvent('OnCalculateCell', me.gridId, lang.hitch(me, me.OnCalculateCell));

                AddEvent('OnGetHtmlValue', me.gridId, lang.hitch(me, me.OnGetHtmlValue));
                AddEvent('OnGetColor', me.gridId, lang.hitch(me, me.OnGetColor));

                AddEvent('OnGanttDragTip', me.gridId, lang.hitch(me, me.OnGanttDragTip));

                AddEvent('OnStartDragGantt', me.gridId, lang.hitch(me, me.OnStartGanttDrag));
                AddEvent('OnDragGantt', me.gridId, lang.hitch(me, me.OnGanttDrag));
                AddEvent('OnEndDragGantt', me.gridId, lang.hitch(me, me.OnEndDragGantt));

                AddEvent('OnGanttRunDrop', me.gridId, lang.hitch(me, me.OnGanttRunDrop));
                AddEvent('OnDragGanttRun', me.gridId, lang.hitch(me, me.OnDragGanttRun));

               AddEvent('OnLoadCfg', me.gridId, lang.hitch(me, me.OnLoadCfg));
               AddEvent('OnCfgLoaded', me.gridId, lang.hitch(me, me.OnCfgLoaded));

                AddEvent('OnCfgSaved', me.gridId, lang.hitch(me, me.OnCfgSaved));

                AddEvent('OnGanttMainChanged', me.gridId, lang.hitch(me, me.OnActivityChanged));
                AddEvent('OnGanttRunBoxChanged', me.gridId, lang.hitch(me, me.OnGanttRunBoxChanged));

                AddEvent('OnSave', me.gridId, lang.hitch(me, me.OnSave));

                AddEvent('OnAfterSave', me.gridId, lang.hitch(me, me.OnAfterSave));

                AddEvent('OnUpdateRow', me.gridId, lang.hitch(me, me.OnUpdateRow));

                AddEvent('OnUndo', me.gridId, lang.hitch(me, me.OnUndo));
                AddEvent('OnRedo', me.gridId, lang.hitch(me, me.OnRedo));

                AddEvent('OnDataSend', me.gridId, lang.hitch(me, me.OnDataSend));

	    		AddEvent('OnPrint', me.gridId, function(grid, window, report) {
	    		    var rpt = report;
	    		    try {
	    		        log.debug("DOMID: {}, ", me.domid, document.getElementById(me.domid + "_outer"));

                        var styles = document.getElementById(me.domid + "_outer").getElementsByTagName("style");
                        var style = "<style>\n" + styles[0].innerHTML.replace(new RegExp("#" + me.domid, "g"), '') + "\n</style>";
                        report = style + report;
                        return report;
                    } catch (ex) {
	    		        console.log(ex);
	    		        return rpt;
                    }
	    		});

	    		AddEvent('OnPrintFinish', me.gridId, function(grid,window) {
	    			//console.log(window.document.body.h);
	    			// maybe if in debug, return true to print it
	    			//return true;
	    		});


                AddEvent('OnKeyDown', me.gridId, function (grid, key, event, name, prefix) {
                	if (event && event.srcElement && event.srcElement.id && event.srcElement.id == 'nav_search_fld')
                		grid.ActionBlur();
                    me.keyEvent = event;
                });
                AddEvent('OnKeyUp', me.gridId, function (grid, key, event, name, prefix) {
                    delete me.keyEvent;
                });

                AddEvent('OnStartDragGanttDependency', me.gridId, lang.hitch(me, me.OnStartDragGanttDependency));
                AddEvent('OnEndDragGanttDependency', me.gridId, lang.hitch(me, me.OnEndDragGanttDependency));
                AddEvent('OnDragGanttDependency', me.gridId, lang.hitch(me, me.OnDragGanttDependency));

                AddEvent('OnMouseDown', me.gridId, lang.hitch(me, me.OnMouseDown));
                AddEvent('OnMouseUp', me.gridId, lang.hitch(me, me.OnMouseUp));

                // can be used to save state of printable columns.  Currently not implemented.
                AddEvent('OnShowMenu', me.gridId, lang.hitch(me, me.OnShowColumnsMenu));
                AddEvent('OnSaveMenu', me.gridId, lang.hitch(me, me.OnColumnsFinishMenu));

                // custom state
                AddEvent('OnLoadCustomCfg', me.gridId, lang.hitch(me, me.OnLoadCustomCfg));
                AddEvent('OnSaveCustomCfg', me.gridId, lang.hitch(me, me.OnSaveCustomCfg));

                // helps with sorting cols when some of the cols are blank
                TGSetEvent('OnGetSortValue', this.gridId, lang.hitch(this, this.OnGetSortValue));

                // how we can target specific click events
                // just for reference
                // Grids.OnAltClick = function() {
                //     log.debug("we just alt clicked");
                //     return true;
                // };

                // add in "window" level listener that will handle side icon clicks and dispatch them back to
                // this object.
                window[this.gridId + "_SideIconClicked"] = function (el, rowId, iconClass) {
                    me.OnSideIconClick(me.grid, me.GetRowById(rowId), iconClass);
                };
            }

            // isn't really an "edit" function, just refocusses the gantt
            AddEvent('OnDblClick', me.gridId, lang.hitch(me, me.OnDblClick));
            AddEvent('OnGanttMenuClick', me.gridId, lang.hitch(me, me.OnGanttMenuClick));
            AddEvent('OnRenderFinish', me.gridId, lang.hitch(me, me.OnRenderFinish));
            AddEvent('OnRenderPageFinish', me.gridId, lang.hitch(me, me.OnRenderPageFinish));
            
            AddEvent('OnGetAvailability', me.gridId, lang.hitch(me, me.OnGetAvailability));
            AddEvent('OnGetAvailabilityClass', me.gridId, lang.hitch(me, me.OnGetAvailabilityClass));

            TGSetEvent('OnZoom', me.gridId, lang.hitch(me, me.OnZoom));
            TGSetEvent('OnExportInit', me.gridId, lang.hitch(me, me.OnExportInit));

            // OnReady is called when the grid is "ready" to render, but before it is actually rendered
            AddEvent('OnReady', me.gridId, lang.hitch(me, me.OnReady));

            this.attachExtraGridEvents(this.gridId);

            me.subscribeOn('skd.ui.new.grid', lang.hitch(me, me.__OnNewGridRegistered));
            this.subscribeOn('skd.ui.please-wait', lang.hitch(this,this.__pleaseWait));
            this.subscribeOn('skd.ui.zoom-to-fit', lang.hitch(this,this.__zoomToFit));
            this.subscribeOn('skd.refreshAssignment', lang.hitch(this,this.__refreshAssignment));
            this.subscribeOn('skd.reloadBody', lang.hitch(this,this.ReloadBody));

            // create the grid
            me.grid = TreeGrid(opts, me.domNode, me.gridId);

            // call the OnReady to load up the events
            this.upgradeTGInstance(me.grid);

            log.debug("{} TreeGrid Created; Version: {}", me.TAG, Component.Version, me.grid);
        },

        OnExportInit: function(/*TGrid*/ grid, /*string[Name]*/ Cols, /*string[id]*/ Rows, /*object*/ source) {
        	if (source != null) {
        		return false;
        	}

        	for (var id in grid.Rows) {
        		var row = this.GetRowById(id);
        		if (!row.Filtered && !row.CanExport)
        			continue;
        		if (!row.Filtered || row.Filtered == 0)
        			row.CanExport = 1;
        		else
        			row.CanExport = 2;
        	}
        	return false;
        },

        OnGetAvailabilityClass: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ value, /*string*/ src, /*string*/ cls, /*string*/ group) {
        	// If Tools or Zones, check for quantity larger than availability
        	if (row["_OBJECTNAME"] != null && row["_OBJECTNAME"] == "TOOLITEM" || row["_OBJECTNAME"] == "PLUSAZONE") {
        		// Get row availability
        		if (row['availcommon'] != null) {
        			// Convert availability quantity to a number
        			var availList = row['availcommon'].slice(0, -1).split(';')
        			var availQty = 0;
        			for (var i=0; i<availList.length; i++) {
            			var availValues = availList[i].split('#');
            			var segmentVal = parseFloat(availValues[2]);
            			availQty = Math.max(availQty, segmentVal);
        			}
        			// If load is higher than availability, show in resource bar in red color.
                	if (value > availQty && src == 'loadcommon') {
                		return "COGanttAvailabilityRed";
                	}
        		}
        	}
        	return this.inherited(arguments);
        },

        /**
         * Converts double to String duration (0:00) format.
         * 
         * @param value - Double value in minutes or hours.
         * @param inMinutes - Boolean to indicate if the first argument is in minutes.
         */
        doubleToDuration: function (value, inMinutes) {
        	if (!inMinutes) {
        		value = value * 60;
        	}
    		var hoursFloat = value/60;
    		var hours = Math.floor(hoursFloat);
    		var minutes = Math.round((hoursFloat - hours) * 60)

    		if(minutes == 60) {
    			hours++;
    			minutes=0;
    		}

    		var strTime;
    		if (minutes < 10) {
    			strTime = hours + ":" + "0" + minutes;
    		}
    		else {
    			strTime = hours + ":" + minutes;
    		}
    		return strTime;
        },

        OnGetAvailability: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ value, /*string*/ src, /*type[]*/ Values, /*int*/ start, /*int*/ end, /*int*/ min, /*int*/ max, /*string*/ group) {
        	if(this._showResourceValuesInHours && (row["_OBJECTNAME"] !== "TOOLITEM") && (row["_OBJECTNAME"] !== "PLUSAZONE"))  {
        	//if(this._showResourceValuesInHours)  {
				if (value>1)
				{
					var strTime = this.doubleToDuration(value, true);
					value = strTime;
					Values[0] = strTime;
				}
				else
					{Values[0] = '';
				}
        	}

        	if (this.showLoadAvailNumbers == 0) {
        		Values[0] = '';
        	}

        	this.inherited(arguments);
        },

        OnZoom: function (/*TGrid*/ grid, /*string*/ zoom, /*int*/ FirstDate, /*int*/ LastDate) {
            try {
                // do process if we don't have a grid or a Toolbar
                if (!grid || !grid.Toolbar) return;
                // basically if zoom and we then no longer have a horz scroll ability, then just disable
                // zooming out until we do have a scroll ability
                var w1 = grid.GetBodyWidth(2);
                var w2 = grid.GetBodyScrollWidth(2);
                log.debug(grid.id + " OnZoom: {}: start: {}, end: {}, Width: {} ScrollWidth; {}", zoom,  new Date(FirstDate), new Date(LastDate), w1, w2);
                var oldVal = grid.Toolbar.ZoomOutDisabled;
                if (Math.abs(w1 - w2) < 5) {
                    grid.Toolbar.ZoomOutDisabled = 1
                } else {
                    grid.Toolbar.ZoomOutDisabled = 0
                }
                if (oldVal != grid.Toolbar.ZoomOutDisabled) {
                    grid.RefreshRow(grid.Toolbar);
                }
            } catch (e) {
                log.error("OnZoom Hook Failed", e);
            }
        },


        OnLoadCustomCfg: function (/*TGrid*/ grid, /*string*/ custom, /*string*/ cfg) {
            log.debug("Loading Custom CFG:", custom);
            if (custom) {
                try {
                    this.state = json.parse(custom, false);
                    if (!this.state) {
                        this.state={};
                    }
                } catch (e) {
                    log.warn("Failed to restore custom state: ", custom);
                }
            }
        },

        OnSaveCustomCfg: function (/*TGrid*/ grid, /*bool*/ ret) {
            if (!this.state) this.state={};
            // add in Filter state..
            if (grid && grid.Filter) {
                if (!this.state.Filter) this.state.Filter={};
                this.state.Filter.Visible = grid.Filter.Visible;
            }
            var cfg = json.stringify(this.state);
            log.debug("Custom State", cfg);
            return cfg;
        },
        
        /**
         * Called when showing the list of columns menu (ie, for print or table column visibility).  This can be
         * used to alter the state of the visible columns before the menu is shown.
         *
         * @param grid
         * @param menu
         * @constructor
         */
        OnShowColumnsMenu: function(grid, menu) {
        	if (menu && menu.Names) {
        		if (menu.Names.g) {
        			menu.Names.g.Text = this.messages['ganttChart'];
        		}
        		if (menu.Names.panel) {
        			menu.Names.panel.Text = this.messages['panel'];
        		}
        	}

        	// It will recover previous state just for Print Button menu.
        	if (grid.ACol == 'Print' || grid.ACol == 'PRINTPDF') {
        		if (this.state.savedPrintOpt != undefined && this.state.savedPrintOpt != null) {
	        		// Recover saved options
		            var printOptions = this.state.savedPrintOpt;

		            if (printOptions != null) {
			            var printColumns = printOptions[0].value;
			            var ganttChart = printOptions[1].value;

			            // Get Current options to update
		            	var menuItems = menu.Items[1].Items;
		            	var ganttChartOptions = menu.Items[3].Items;

		            	if (printColumns != null) {
			            	for (var i in menuItems) {
				            	// Apply saved options on Gantt
				            	menuItems[i].Value = printColumns[menuItems[i].Name];
				            }		            		
		            	}

		            	if (ganttChart != null) {
			            	for (var i in ganttChartOptions) {
				            	// Apply saved options on Gantt
			            		ganttChartOptions[i].Value = ganttChart[ganttChartOptions[i].Name];
				            }		            		
		            	}
		            }
        		}
        	}
        },

        /**
         * Called after the column menu is closed.
         * This can be used to save the state of the visible columns
         * so that we can apply them again later.
         * @param grid
         * @param menu
         * @constructor
         */
        OnColumnsFinishMenu: function(grid, menu) {
        	// It will save previous state just for Print Button menu.
        	if (grid.ACol == 'Print') {
        		var savedPrintOpt = [];
        		var selectedPrintColumns = {};
        		var selectedGanttChartOptions = {};
        		var columns = menu.Items[1].Items;
        		var ganttChartOptions = menu.Items[3].Items;

        		for (var idx in columns) {
        		    // selectedPrintColumns: simple map[key, value]
        		    // key: column name
        		    // value: checked true/false
        		    selectedPrintColumns[columns[idx].Name] = columns[idx].Value;
        		}

        		for (var idx in ganttChartOptions) {
        			selectedGanttChartOptions[ganttChartOptions[idx].Name] = ganttChartOptions[idx].Value;
        		}
        		
        		// save print columns state
        		if (Object.keys(selectedPrintColumns).length > 0) {
        			//this.state.savedPrintOpt = selectedPrintColumns;
        			savedPrintOpt.push({
        				key:   "printColumns",
        				value: selectedPrintColumns
        			});        			
        		}

        		if (Object.keys(selectedGanttChartOptions).length > 0) {
        			savedPrintOpt.push({
        				key:   "ganttChart",
        				value: selectedGanttChartOptions
        			});
        		}

        		this.state.savedPrintOpt = savedPrintOpt;
        	}
        },

        /**
         * Special Handler that will zoom the grid to fit
         * @param msg object with startTime and endTime fields
         * @private
         */
        __zoomToFit: function(msg) {
            log.debug("Handling ZoomToFit Message", msg);
            if (msg && msg.startTime && msg.endTime) {
            	if (msg.startTime == msg.endTime) {
            		// This hack is required to force TG to render the selected day correctly in the Gantt view.
            		// For some strange reason, if start and end times are equal, TG renders the Gantt somewhere in between
            		// the currently selected day and the next one.
            		msg.endTime = msg.endTime + 1; 
            	}
                this.ZoomTo(msg.startTime, msg.endTime);
            } else {
                log.debug("Apparently no data in the message to zoom to??");
            }
        },

        /**
         * Special Handler that will show the "please wait" model message until the grid reloads
         * @param msg
         * @private
         */
        __pleaseWait: function(msg) {
            this.grid.ShowMessage(msg||(this.messages&&this.messages['pleasewait'])||"Please wait while we process the request");
        },

        label: function(id) {
            var msg = (this.messages&&this.messages[id]);
            if (!msg) {
                msg="[scheduler#"+id+"]";
            }
            return msg;
        },

        ShowTGMessage: function(msg) {
            log.debug("Showing Message: {}", msg);
            this.grid.ShowMessage(msg);
        },

        HideTGMessage: function() {
            log.debug("Hiding Message");
            this.grid.HideMessage();
        },

        OnMouseDown: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            log.debug('Mouse Down', event);
            this.lastMouseDownEvent = event;
            this.Dragging=true;
            this.MouseDown=true;
            if ((event && event.currentTarget && event.currentTarget.className && event.currentTarget.className.indexOf("COResizeGrid") !== -1) ||
            	(event && event.target && event.target.className && event.target.className.indexOf("COResizeGrid") !== -1)) {
            	return true;
            }
        },

        OnMouseUp: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            log.debug("Mouse Up", event);
            this.Dragging=false;
            this.MouseDown=false;
            if ((event && event.currentTarget && event.currentTarget.className && event.currentTarget.className.indexOf("COResizeGrid") !== -1) ||
           	    (event && event.target && event.target.className && event.target.className.indexOf("COResizeGrid") !== -1)) {
            	return true;
            }
        },

        /**
         * Show Single line Tooltip when Drag/Move/Resizing a Gantt Bar
         * @param grid
         * @param row
         * @param col
         * @param tip
         * @param XY
         * @param dir
         * @param start
         * @param end
         * @param duration
         * @param x
         * @param y
         * @returns {*}
         * @constructor
         */
        OnGanttDragTip: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*string*/ tip, /*object*/ XY, /*int*/ dir, /*int*/ start, /*int*/ end, /*int*/ duration, /*int*/ x, /*int*/ y) {
            if (dir==3) {
                // moving, return formatted start state
                if (end) {
                    return DateToString(start, 'h') + " - " + DateToString(end, 'h');
                } else {
                    return DateToString(start, 'h');
                }
            } else if (dir==1) {
                // see http://www.treegrid.com/Doc/TypeDate.htm#DateToString
                // duration is documented as MS is is actually minutes
                //return DateToString(start, 'h') + " (" + DateToString(duration*60*1000, 't') + ")";
                //return DateToString(duration*60*1000, 't');
            	return DateToString(start, 'h') + " (" + this.doubleToDuration(duration/60) + ")";
            } else if (dir==2) {
                // resize right
                //return DateToString(end, 'h') + " (" + DateToString(duration*60*1000, 't') + ")";
                //return DateToString(duration*60*1000, 't');
            	return DateToString(end, 'h') + " (" + this.doubleToDuration(duration/60) + ")";
            }
        },

        /**
         * FireEvent is mainly used by Icon Click Events to send events throughout the system.  It uses
         * publishLater() to send the event on the event bus.
         *
         * @param evtName
         * @param args
         */
        FireEvent: function(evtName, args) {
            this.publishLater(evtName, args);
        },

        /**
         * WIll run an update function inside of a start/end grid update.  This will result in a single transaction update
         * being sent the the server
         */
        doUpdate: function (update) {
            this.grid.StartUpdate();
            update(this.grid);
            this.grid.EndUpdate();
        },

        OnStartDragGanttDependency: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*object*/ XY, /*int*/ color, /*bool*/ start, /*string*/ keyprefix, /*int*/ clientX, /*int*/ clientY) {
            log.debug("Start Dependency");
            // only allow dependencies to be created using ctrl/command
            if (keyprefix != this._getKeyPrefixName()) return true;
            // todo check if should be able to actually start a dependency from here
            if (row["_DUMMY"] == true) return true;
            if(!this.options.scheduler_plus_license) {
            	if (row["_OBJECTNAME"] != "WORKORDER") return true;
            	if (!row["_PARENTID"]) return true;
            }
            // return true to SUPPRESS it
        },

        OnDragGanttDependency: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*object*/ XYSrc, /*TRow*/ torow, /*object*/ XYDest, /*bool*/ end, /*string*/ keyprefix, /*int*/ clientX, /*int*/ clientY) {
            //log.debug("DRAG Dependency");

          if(!this.options.scheduler_plus_license) {
            if (torow && !torow["_PARENTID"]) return -1;
                if (row && !row["_PARENTID"]) return -1;
                if (torow && row && row["_PARENTID"] != torow["_PARENTID"]) return -1;
                if (torow && row && row["_OBJECTNAME"] != torow["_OBJECTNAME"]) return -1;
                if (torow && row && row["_REFOBJECTNAME"] != torow["_REFOBJECTNAME"]) return -1;
                if (torow && torow["_DUMMY"] && torow["_DUMMY"] == true) return -1;
                
          } else {
            //Validate Network Rules for Scheduler+
            if (torow && row && row["_OBJECTNAME"] && torow["_OBJECTNAME"] && row["WONUM"] && torow["WONUM"]
	          && row["_OBJECTNAME"] == torow["_OBJECTNAME"]) {
            	if(this.isAncestor(row, torow) || this.isDescendant(row, torow)) {
                	return -1;
                } 
	        } else if (torow && torow["_DUMMY"] && torow["_DUMMY"] == true) {
	          return -1;	
	        }
          }
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
        	var tb = this.grid.GetRowById("toolbar");
        	if (tb == null || tb.LOCKSCH == "0")
        	{
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
        	}
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

        _lockBulkAction: function () {
            //var rows = this._GetSelectedRows(this.grid, 'G', row);
        	var me=this;
			var boxes = this.grid.Rows;
			var rows = Object.entries(boxes);
			if (boxes != null) {
                for (var i = 0; i < rows.length; i++) {
                    var id = rows[i][0];
                    if ((Object.entries(boxes)[i][1]._INTERNALSTATUS=='ASSIGNED') || (Object.entries(boxes)[i][1]._INTERNALSTATUS=='WAITASGN')) {
                        var row = this.GetRowById(id);
                        if (row != null) {
                        	this._lockAction("", row);
                        }
                    }
                }
            };
        },
        
        _reslockBulkAction: function () {
            //var rows = this._GetSelectedRows(this.grid, 'G', row);
        	var me=this;
        	var boxes = this.grid.Rows;
			var rows = Object.entries(boxes);
			if (boxes != null) {
                for (var i = 0; i < rows.length; i++) {
                    var id = rows[i][0];
                    if (Object.entries(boxes)[i][1]._INTERNALSTATUS=='ASSIGNED') {
                        var row = this.GetRowById(id);
                        if (row != null) {
                        	this._reslockAction("", row);
                        }
                    }
                }
            };
        },
        
        _unlockBulkAction: function () {
            //var rows = this._GetSelectedRows(this.grid, 'G', row);
        	var me=this;
        	var boxes = this.grid.Rows;
			var rows = Object.entries(boxes);
			if (boxes != null) {
                for (var i = 0; i < rows.length; i++) {
                    var id = rows[i][0];
                    if ((Object.entries(boxes)[i][1]._INTERNALSTATUS=='ASSIGNED') || (Object.entries(boxes)[i][1]._INTERNALSTATUS=='WAITASGN')) {
                        var row = this.GetRowById(id);
                        if (row != null) {
                        	this._unlockAction("", row);
                        }
                    }
                }
            };
         },
        
        _resunlockBulkAction: function () {
            //var rows = this._GetSelectedRows(this.grid, 'G', row);
        	var me=this;
        	var boxes = this.grid.Rows;
			var rows = Object.entries(boxes);
			if (boxes != null) {
                for (var i = 0; i < rows.length; i++) {
                    var id = rows[i][0];
                    if (Object.entries(boxes)[i][1]._INTERNALSTATUS=='ASSIGNED') {
                        var row = this.GetRowById(id);
                        if (row != null) {
                        	this._resunlockAction("", row);
                        }
                    }
                }
            };
        },
        
        isDescendant: function(/*TRow*/ row, /*TRow*/ torow) {
        	if(row && torow) {
        		if(torow["_PARENTID"]) {
        			if(torow["_PARENTID"] === row["_idx"]) {
        				return true;
        			} else {
        				if(torow.parentNode) {
        					return this.isDescendant(row, torow.parentNode);
        				}
        			}
        		} 
        	}
        	return false;
        },
        
        isAncestor: function(/*TRow*/ row, /*TRow*/ torow) {
        	return this.isDescendant(torow, row)
        },

        OnEndDragGanttDependency: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*object*/ XYSrc, /*TRow*/ torow, /*object*/ XYDest, /*bool*/ end, /*string*/ keyprefix, /*int*/ clientX, /*int*/ clientY) {
            log.debug("END Dependency");
            // return true to prevent it from happening
        },

        __OnNewGridRegistered: function (data) {
            if (data && data.grid && data.grid != this) {
                this._otherGRID = data.grid;
                log.debug('{} On New Grid Registered', this.TAG, data);
            }
        },

        _FixUI: function () {
            if (!this._otherGRID) {
                log.debug("{} Not Other Grid.  Can't Fix UI", this.TAG);
                return;
            }

                // Fixing Grids
            log.debug('{} Fixing Grids {}, {}', this.TAG, this.grid.id, this._otherGRID.grid.id);
            var me = this;
            require(["dojo/window"], function (win) {
                var winSize = win.getBox();
                var domTabs = dom.byId('m397b0593-co3_0');
                var tabsPos = domGeom.position(domTabs, false);

                log.debug("POSITIONS", winSize, tabsPos);

                var ch = winSize.h;

                var ua = ch - ((tabsPos.h * 2) + tabsPos.y) - (15*4); // remove the top and bottoms tabs from the usable area and margins
                var gh = ua / 2; // optimal size of each grid in equal sizes

                log.debug("SIZES: usable: {}, top:{}, bottom: {}", ua, gh, gh);

                delete me.grid.MaxVScroll;
                domGeom.setContentSize(me.domNode, {h: gh});
                delete me._otherGRID.grid.MaxVScroll;
                domGeom.setContentSize(me._otherGRID.domNode, {h: gh});
            });
        },

        attachExtraGridEvents: function (gridId) {

        },

        OnSideIconClick: function (grid, row, eventName) {
            log.debug('SideIconClicked: {}', eventName, row);
            if (this[eventName]) {
                this[eventName](grid, row);
                return true;
            } else {
                log.error('Nothing Handled Click Event for {}', eventName);
            }
        },

        __ResourceFormula: function (row) {
            //if (row['_INTERNALSTATUS'] == 'ASSIGNED') {
            return row['_Resources'] || '';
            //}
        },

        /**
         *
         */
        OnUndo: function (grid, action, row, col, val) {
            //log.debug("action:{}, col: {}, val: {}", action, col, val);
            if (action == 'Change') {
                if (this._UpdateRelatedColumn(grid, row, col, row[col])) {
                    grid.RefreshGantt(1, "G");
                }

                if (this.state && this.state.Filter && this.state.Filter.Visible) {
                	this.grid.DoFilter();
                }

                if (this.lastRowChangedStatus != null) {
                	grid.SetValue(row, '_UNCOMMITTED', this.lastRowChangedStatus, null);
                	grid.RefreshCell(row, 'name');
                	this.lastRowChangedId = null;
                	this.lastRowChangedStatus = null;
                }
            }
        },

        OnRedo: function (grid, action, row, col, val) {
            //log.debug("action:{}, col: {}, val: {}", action, col, val);
            if (action == 'Change') {
                if (this.state && this.state.Filter && this.state.Filter.Visible) {
                	this.grid.DoFilter();
                }
                this.OnRowChanged(grid, row);
            }
        },
        
        OnTip: function (/*TGrid */grid, /*TRow */row, /*string */col, /*string */tip, /*int */clientX, /*int */clientY, /*int */X, /*int */Y) {
            return tip;
        },

        _LockDurationAction: function (row) {
            log.debug("Locking Duration", row);
            this.grid.Cols['G'].GanttEdit = 'MainMove,Dependency,DependencyTypes,DependencyLags,Run';
            this.grid.Cols['G'].GanttRunResize = '';
        },
        _UnlockDurationAction: function (row) {
            log.debug("UnLocking Duration", row);
            this.grid.Cols['G'].GanttEdit = 'All';
            this.grid.Cols['G'].GanttRunResize = 'All';
        },
        
        _LockScheduleAction: function (row) {
            log.debug("Locking Schedule", row);
            this.grid.Cols['G'].GanttEdit = '';
            this.grid.Cols['startTime'].CanEdit='0';
            this.grid.Cols['endTime'].CanEdit='0';
//            this.grid.Cols['MXDURATION'].CanEdit='0';???
            this.grid.Cols['G'].GanttRunResize = '';
            this._lockBulkAction();
        },
        _UnlockScheduleAction: function (row) {
            log.debug("UnLocking Schedule", row);
            this.grid.Cols['G'].GanttEdit = 'All';
            this.grid.Cols['startTime'].CanEdit='1';
            this.grid.Cols['endTime'].CanEdit='1';
//            this.grid.Cols['MXDURATION'].CanEdit='1';???
            this.grid.Cols['G'].GanttRunResize = 'All';
            this._unlockBulkAction();
        },
        
        _LockResourceAction: function (row) {
            log.debug("Locking Schedule", row);
            this._reslockBulkAction();
        },
        _UnlockResourceAction: function (row) {
            log.debug("UnLocking Schedule", row);
            this._resunlockBulkAction();
        },

        // Normal Gantts can have PM segments that are rendered as Run Bars
        OnDragGanttRun: function (/*TGrid*/ grid, /*TRow*/ row, /*string */col, /*int */index, /*bool */start, /*int */newDate, /*int */oldDate, /*int */change, /*int */dir, /*object */XY, /*string */keyprefix, /*int */clientX, /*int */clientY) {
        	var tb = this.grid.GetRowById("toolbar");
            if (tb != null && tb.LOCKSCH == "1")
            {
            	return false;
            }
        	this.Dragging=true;
            if (start === 1) {
                var box = grid.GetGanttRunBox(row, col, index);
                var row = this.GetRowById(box.Id);
                this.focusGanttBar(row);
                if (this._isReadOnly(row)) {
                    log.debug("OnDragGanttRun: Readonly");
                    return false;
                }

                if (row && dir != 3 && row['_READONLY_DURATION'] == true) return false;
                if (row && row['_READONLY_STARTEND'] == true) return false;
                if (row && row['_READONLY'] == true) return false;

                return null;
            }
        },

        /**
         * @override
         */
        onMeasure: function() {
            var size = this.inherited(arguments);
            if (!size) return size;

            if (!this.grid || this.grid.ResizingMain==0) {
                return size;
            }

            if (this.grid.ResizingMain==1) {
                log.debug("{}: Removing Height From Size because dynamic resizing is enabled", this.TAG);
                // delete the height sizing so that TG can do it for us
                delete size.h;
                delete size.height;
            }
            return size;
        },
        
        SetExtraClass: function (row, className) {
            this.RemoveExtraClass(row);
            row.ExtraClass = className;
        },

        RemoveExtraClass: function (row) {
            if (row.ExtraClass) {
                delete row.ExtraClass;
            }
        },

        OnIconClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int */x, /*int */y) {
            var me = this;
            if (col === 'name') {
            	var startTime = row['startTime'];
            	var endTime = row['endTime'];
            	var duration = 0;

            	if (startTime != null && endTime != null) {
            		duration = endTime - startTime;
            	}

            	if (duration == 0) {
            		endTime = null;
            	}

            	this.ZoomTo(startTime, endTime, -40, true);
            	return;
            }

            var args = row[col + "IconEventArgs"];
            if (args == null) return;

            log.debug("OnIconClick: Icon Click: {}; Args: {}", col, row[col + "IconEventArgs"]);

            var item = json.parse(args);
            log.debug("OnIconClick: ", item);
            if (item == null) return;
            this.OnContextMenuItemSelected(item, null);
        },

        focusGanttObject: function (grid, row, col, x, y, event) {
            if ('Data' === row.Kind) {
                if (col == 'G') {
                    var objs = grid.GetGanttXY(row, col, x, y);
                    if (objs != null && objs.Main != null) {
                        this.focusGanttBar(row);
                    } else if (objs != null && objs.RunId != null) {
                        this.focusGanttBar(this.GetRowById(objs.RunId));
                    } else {
                        this.focusGanttBar(null);
                    }
                }
            }
        },

        OnDataSend: function(/*TGrid*/ grid, /*object*/ source, /*string*/ data, /*function*/ Func) {
            // For some reason TG will sometimes create an empty changeset and we send it to the server.
            // If we select 100s of rows this could be 100s of "saves", so this prevents it from happening
            // log.debug("OnDataSend:",source,data);
            if (source && source.Type === 'Changes' && data && data.indexOf('"Changes":[]')!==-1) {
                log.debug("Prevent Empty Changes", data);
                return true;
            }

            if (source && source.Type === 'Changes' && data && this.isBatchingChanges) { 
            	this.isBatchingChanges = false;
            	return true;
            }
        },

        focusGanttBar: function (row) {
            if (this.Dragging) {
                this.focusGanttBarLater(row);
            } else {
                log.debug("Focus Now Dragging? {}", this.Dragging);
                if (row && row['IgnoreFocus']) return; // can't focus this bar
                if (row && row.CanMove===0) return; // can't focus/move this bar
                if (row && this._focusGanttObject && row.id == this._focusGanttObject.id) return;

                if (this._focusGanttObject != null) {
                    log.debug("Unfocus: {}", this._focusGanttObject.id);
                    if (!this._focusGanttObject['MILESTONE'] || this._focusGanttObject['MILESTONE'] == 0) {
                        this._focusGanttObject.GGanttClass = this._focusGanttObject._GGanttClassOld;
                        this._focusGanttObject._SKDRunClass = this._focusGanttObject._SKDRunClassOld; // run bars
                    }
                    try {
                    	this.grid.Recalculate(this._focusGanttObject, 'G', 1);
                    } catch (ex) {
                    	return;
                    }
                    this._focusGanttObject = null;
                }

                if (row == null) return;

                log.debug("Focus: {}", row.id);
                this._focusGanttObject = row;
                if (!row['MILESTONE'] || row['MILESTONE'] == 0) {
                    row._GGanttClassOld = row.GGanttClass;
                    row.GGanttClass = (row['IsSummary'] ? 'SKDFocusSummary' : 'SKDFocus');
                    row._SKDRunClassOld = row._SKDRunClass;
                    row._SKDRunClass = 'SKDFocus'; // run bars
                }
                try {
                	this.grid.Recalculate(row, 'G', 1);
                } catch (ex) {
                	return;
                }

                // tell the row to change focus...
                //this.OnFocus(this.grid, row, "G");
                if (row.Type == "box") {
                    // remove any row colors
                    this._removeRowColor(this.grid);
                    this.grid.Focus(row.parentNode,"G");
                } else {
                    this.grid.Focus(row,"G");
                }

                // this is used by Assignment view to apply multiskill
                this._focusGanttBarAdditionalActions(row);
            }
        },

        _focusGanttBarAdditionalActions: function(row) {

        },

        focusGanttBarLater: function (row) {
            var me=this;
            var r=row;
            this.invokeLater(function() {
                me.focusGanttBar(r);
            }, 50, "focus");
        },

        processToolbarIconClick: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            if (this[col+"Action"]) {
                this[col+"Action"](/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event);
            }
        },

        // defined here so that subclasses can override it
        OnClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            this._hideTooltip();

//            if (row && row.Kind == 'Filter' && col && col=='Panel') {
//                log.debug("Filter Object", row, col, x, y, event);
//                return true;
//            }
            if (row && row.Kind == 'Toolbar') {
                log.debug("Toolbar Object", row, col, x, y, event);
                if (row[col + "Disabled"] == 1)
                	return true;
                this.processToolbarIconClick(grid, row, col, x, y, event);
                return false;
            }

            if (row && row.Kind == 'Data') {
            	//readonly if schedule locked
           	 	if (col == 'startTime' || col == 'endTime' || col == 'MXDURATION' )
                {
                	 if (grid && grid.Toolbar && grid.Toolbar.LOCKSCH===1)
                		 {return true;}
                }
                // remove any row colors
                this._removeRowColor(grid);
                if (this.shouldOnClickSelectRow(grid, row, col) && !event.altKey) {
                    grid.SelectRow(row, 1);
                }
                this.focusGanttObject(grid, row, col, x, y, event);
            }

            if (event.ctrlKey || event.shiftKey) return false;
            if (row && row.Kind == 'Data' && event.altKey) {
                //var clickDate = this.grid.GetGanttDate(x);
                //log.debug("CLICKED {} -- DATE: {}", col, clickDate, row, event);
                this.OnShowTooltip(grid, row, col, x, y, event);
                return false;
            }
            if (event.metaKey) {
            	return this.OnRightClick(grid, row, col, x, y, event);
            }
            return false;
        },
        
        shouldOnClickSelectRow: function(grid, row, col) {
            return false;
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

        /**
         * Only use this for converting a point from an event into a date/time.
         * @param x
         * @param col
         * @returns {number}
         */
        getDateForX: function(x, col) {
            var clickDate=0;
            if (this.grid && this.grid.Cols && this.grid.Cols['G'] && this.grid.Cols['G'].GanttPaging) {
                // if paging we need to use the Rounding Date and account for paging
                clickDate = this.grid.RoundGanttDate(x,256+64);
            } else {
                clickDate = this.grid.GetGanttDate(x, col);    
            }
            return clickDate;
            
        },

        _fetchDependencyTooltip: function (fromId, toId, event) {
            var me = this;
            this.fetch("async_get_tooltip_cpm", me._ioOptions({
                projectid: me.projectid,
                fromid: fromId,
                toid: toId
            })).then(function (tooltip) {
                me._showTooltip(tooltip, event);
            });

        },

        _adjustTooltipForScreenBounds: function(popup, tooltip, x, y) {
            log.debug("Weather is finished rendering, adjusting tooltip location", popup, tooltip);
            if (!this.isElementInViewport(tooltip.domNode)) {
                log.warn("NOT IN THE VIEWPORT")

                var me=this;
                popup.hide(tooltip);
                popup.open({
                    popup: tooltip,
                    x: x,
                    y: y,
                    onCancel: function () {
                        me._hideTooltip();
                    }
                });
            }
        },

        _showTooltip: function (tooltip, event, row) {
            var me = this;
            log.debug("Have a Tooltip", tooltip);
            if (tooltip != null) {
                //debugger;
                var tip = tooltip.htmlTip;
                me._tooltip = new TooltipDialog({
                    content: tip,
                    style: "width: 100%",
                    onMouseLeave: function () {
                    }
                });
                //popup.moveOffScreen(me._tooltip);
                if (me._tooltip.startup) me._tooltip.startup();
                var section = me._tooltip.domNode.querySelectorAll(".recordHover");
                if (section && section[0]) {
                    var close = '<div class="skd-tt-iconclose"><a href="#" onclick="return false"><img src="dialogclose.gif"></a></div>';
                    section = section[0].parentNode;
                    var newItem = document.createElement("div");
                    newItem.innerHTML=close;
                    section.insertBefore(newItem, section.firstChild);
                }

                log.debug("Tooltip is visible at x: {}, y: {}", event.pageX, event.pageY);
                popup.open({
                    popup: me._tooltip,
                    x: event.pageX,
                    y: event.pageY,
                    onCancel: function () {
                        me._hideTooltip();
                    }
                });
                me._tooltip.on("click", function (e) {
                    // log.debug("clicked");
                    me._hideTooltip();
                });
                if (row && this.weatherEnabled()) {
                    if (!(row['_OBJECTNAME']=="ASSIGNMENT" || row['_OBJECTNAME']=="WORKORDER")) {
                        log.debug("Object Doesn't Support Weather: {}", row['_OBJECTNAME']);
                        return;
                    }

                    log.debug("Weather Row", row);
                    var onWeatherFinish = function() {
                        me._adjustTooltipForScreenBounds(popup, me._tooltip, event.pageX, event.pageY);
                    };
                    var weather = me._tooltip.domNode.querySelectorAll("#weather_tooltip_embedded")
                    if (weather) {
                        var params = this.getWeatherParams(row);
                        log.debug("Weather Lookup Params", row);
                        params.domId = 'weather_tooltip_embedded';
                        params.tz = 'GMT';
                        params.onRenderFinish = onWeatherFinish;
                        this.publishTo("weather.embedded.update", params);
                    }
                }
            }
        },

        /**
         * Create the weather params
         * @param row
         * @returns {{wonum: string, objectid: *, objectname: *, start, end}}
         */
        getWeatherParams: function(row) {
            var oid = row["_OBJECTID"];
            var oname = row["_OBJECTNAME"];
            if (row['_ISTASK'] && row.parentNode) {
                log.debug("Using Weather from PARENT since this is a task.");
                // per lori/pedro/jonatas, use WO when we have a task
                oid = row.parentNode["_OBJECTID"];
                oname = row.parentNode["_OBJECTNAME"];
            }
            if (row['_OBJECTNAME']=="ASSIGNMENT") {
                oid = row["_PARENTOBJID"];
                oname='WORKORDER';
            }

            var params = {
                wonum: '' + row.WONUM,
                objectid: oid,
                objectname: oname,
                start: row.startTime,
                end: row.endTime,
            };
            return params;
        },

        weatherEnabled: function() {
            return this.options.scheduler_plus_weather_license;
        },

        OnFocus: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*TRow*/ orow, /*string*/ ocol, /*int*/ pagepos) {
            if (row && row != orow && row.Kind == 'Data') {
                try {
                    this._applyScheduleWindow(grid, row);
                } catch (ex) {
                    log.error("Error", ex);
                }
            }
        },

        _getSNLFNE: function (row) {
            if (row && (row.SNECONSTRAINT || row.FNLCONSTRAINT || row.REPLOCSTARTDATE || row.REPLOCFINISHDATE)) {
                return row;
            } else {
                if (row) return row.parentNode;
            }
            return null;
        },

        _applyScheduleWindow: function (grid, row) {
            var me=this;
            // defer the painting/applying schedule windows so that it doesn't block the UI
            this.invokeLater(function() {
                me._applyScheduleWindowLater(grid, row);
            }, 200, "_schedulewindow");
        },

        _applyScheduleWindowLater: function (grid, row) {
            row = this._getSNLFNE(row);
            if (!row) return;
            log.debug("_applyScheduleWindow ROW", row);

            // Set the various windows
            if (row.SNECONSTRAINT) {
                //log.debug("SNE DATE: {}", new Date(row.SNECONSTRAINT));
                this.SNELINE = "#" + row.SNECONSTRAINT + "#Red;";
            } else {
                // hide it
                this.SNELINE = "";
            }
            if (row.FNLCONSTRAINT) {
                this.FNLLINE = "#" + row.FNLCONSTRAINT + "#Red3;";
            } else {
                // hide it
                this.FNLLINE = "";
            }
            //reploc window
            if (row.REPLOCSTARTDATE) {
                //log.debug("REPLOC DATE: {}", new Date(row.REPLOCSTARTDATE));
                this.REPLOCSTARTLINE = "#" + row.REPLOCSTARTDATE + "#Blue;";
            } else {
                // hide it
                this.REPLOCSTARTLINE = "";
            }
            if (row.REPLOCFINISHDATE) {
                this.REPLOCFINISHLINE = "#" + row.REPLOCFINISHDATE + "#Blue3;";
            } else {
                // hide it
                this.REPLOCFINISHLINE = "";
            }

            this._updateGanttLines();
        },
        
        _localToMaxTz: function(date) {
        	var time = date.getTime();
        	time -= (new Date().getTimezoneOffset() * 60 * 1000 * -1);
        	time += this.GMT0TZOffset * -1;
        	time -= (new Date().getTimezoneOffset() * 60 * 1000);
        	var result = new Date(time);
        	return result;
        },
        
        _utcToTz: function(time) {
        	return 
        },

        _updateGanttLines: function() {
        	if (this.grid == null || this.grid.Cols == null || !this.grid.Cols['G']) {
        		return;
        	}

            var line = this.grid.Cols['G'].GanttLines;
            var newLine = this.SNELINE + this.FNLLINE + this.REPLOCSTARTLINE + this.REPLOCFINISHLINE;

            var needRefresh = false;

            if (this.showCurrentDateLine) {
        		var now = this._localToMaxTz(new Date());
                now.setSeconds(0);
                now.setMilliseconds(0);

                // only worry when our timeline is visible
                var range = this.getVisibleRange();
                if (range && range.start && range.end) {
                    if (now >= range.start && now <= range.end) {
                        var timeLine = "#" + now.getTime() + "#Orange;";
                        newLine = timeLine + newLine;
                        needRefresh=true;
                    }
                }
            }

            if (newLine == "") {
                if (line != null) {
                    log.debug("Removing Gantt Line: {}", line);
                    delete this.grid.Cols['G'].GanttLines;
                    needRefresh = true;
                }
            } else if (line != newLine) {
                log.debug('UPDATING GANTTLINE: {}', newLine);
                this.grid.Cols['G'].GanttLines = newLine;
                needRefresh = true;
            }

            // for perf reasons, only update gantt, if we need it
            if (needRefresh) {
                log.debug("Refreshing Schedule Window Updates");
                this.Refresh(1);
            }
        },

        _updateGanttLinesRepeat: function() {
            log.debug("{}: Refreshing Gantt Lines", this.TAG);
            this._updateGanttLines();
            if (this.showCurrentDateLine) {
                this.invokeLater(lang.hitch(this, this._updateGanttLinesRepeat), 1000 * 60);
            }
        },

        OnShiftSelectRow: function (/*TGrid*/ grid, /*TRow*/ row, /*int*/ deselect) {
            // we are eating the event, so that the OnShiftClick will be processed
            return true;
        },

        OnSelectRow: function (/*TGrid*/ grid, /*TRow*/ row, /*int*/ deselect) {
            if (this.selectionInProgress) return;
            this.selectionInProgress = true;
            grid.HideTip();
            grid.CloseDialog();
            delete this.selectionInProgress;

            if (deselect) {
                this.LastSelectedRow=null;
            } else {
                this.LastSelectedRow = row;
            }
        },

        /**
         * Used to select/unselect heirarchies of data
         * @param grid
         * @param row
         * @constructor
         */
        OnShiftClickCell: function(grid, row) {
            //log.debug("row:", row, deselect);
            //log.debug("Shift Click", this.LastSelectedRow);
            if (this.LastSelectedRow) {
                this.grid.SelectRange(row, null, this.LastSelectedRow, null, this.LastSelectedRow.Selected);
            } else {
                var state = {};
                var deselect = row.Selected;
                this._applyToRow(row, [], function (r, state) {
                    // log.debug("selecting: {}", deselect);
                    grid.SelectRow(r, (deselect == null || deselect == 0) ? 1 : 0);
                    return true;
                });
            }
        },

        /**
         * Returna an object for start, end for the currently visible date range.  start and end
         * are long values representing the start and end dates
         */
        getVisibleRange: function() {
            return this.getVisibleRangeForGrid(this.grid);
        },

        /**
         * Returna an object for start, end for the currently visible date range.  start and end
         * are long values representing the start and end dates
         */
        getVisibleRangeForGrid: function(grid) {
            var wid = grid.GetBodyWidth(2);
            var ptStart = grid.GetScrollLeft(2);
            var ptEnd = ptStart + wid;
            return {
                start: grid.GetGanttDate(ptStart, "G"),
                end: grid.GetGanttDate(ptEnd, "G")
            };
        },

        getMillisecondsFerPixel: function() {
            var st = this.grid.GetGanttDate(0, "G");
            var et = this.grid.GetGanttDate(1, "G");
            return et-st;
        },

        /**
         * Sets a value for a row, notifying the gantt of the changes
         * @col column name
         * @value volumns value
         */
        SetValue: function (/*TRow*/ row, /*string*/ col, value, notify) {
            this.grid.SetValue(row, col, value, 1);
        },

        OnAfterSave: function (/*TGrid*/grid, /*int*/result, /*boolean*/autoupdate) {
            log.debug("{}: OnAfterSave: {}", this.TAG, result);
            if (result >= 0) {
                this.sendToBeSaved();
            }
        },

        OnUpdateRow: function (/*TGrid*/grid, /*TRow*/ row, /*TRow*/ update) {
        	// The following logic bellow is only applicable for LABOR rows.
        	if (row.FWMTYPE == 'LABOR' || row.FWMTYPE == 'AMCREW') {
        		// Updating row height to default value.
            	row.Height = 28;
            	row.MaxHeight = 28;
            	// Forcing a row height update
            	grid.UpdateRowHeight(row, false);
            	// This is a bit of a hack, in order to force a Map view update,
            	// we are unselecting and selecting once again the updated LABOR rows.
            	if (row.Selected) {
	            	grid.SelectRow(row, 0 /*unselect*/, 0, true);
    	        	grid.SelectRow(row, 1 /*select*/, 0, true);
            	}
        	}
        },
        
        OnSave: function (/*TGrid*/grid, /*TRow*/row, /*boolean*/autoupdate) {
        },

        /**
         * Called when a Gannt Bar is dropped onto a new row.  We can validate if we want to allow the drop to happen.
         *
         * @drop - false/0 when dragging, true when being dropped
         * @src - parsed run that is dragged into two dimensional array of the dragged boxes.
         * @index - RunIndex of the dragged box inside its source cell (not in src), if more boxes are dragged together, this is index of the one that was caught by mouse
         * @accept - true when box can be dropped here
         *
         * return false to prevent the drop
         * @Override
         * @return {boolean}
         */
        OnGanttRunDrop: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*bool*/ drop, /*object*/ src, /*int*/ index, /*string*/ keyprefix, /*int*/ x, /*int*/ y, /*TGrid*/ togrid, /*TRow*/ torow, /*string*/ tocol, /*int*/ cellx, /*bool*/ accept, /*string*/ celly) {
            if (drop) this.Dragging=false;
            if (togrid == null) return false;
            if (tocol != 'G') return false;
            if (torow && (torow['_DUMMY'] == 1 || torow['Kind'] == 'Header' || torow['Kind'] == 'Filter')) return false; // suppress drag

            var verticalMove = row.id != torow.id;
            var intCellX = parseInt(cellx);
            if (drop === false) {
                this.Dragging=true;
                log.debug("START: OnGanttRunDrop: {}", cellx);
                this._dragFreely = true;
                this._boxRow = null;
                if (col == 'G') {
                    box = grid.GetGanttRunBox(row, col, index);
                    if (box == null) {
                        return false;
                    }
                    var row = this.GetRowById(box.Id);
                    this.focusGanttBar(row);
                    this._boxRow = row;
                    
//                    if (this._isReadOnly(row)) {
//                        if (row["_READONLY"] == true) {
//                            this._dragFreely = false;
//                        } else {
//                        	if (verticalMove && intCellX == box.Left) {
//                        		row.GGanttRunMove = 'All,Move,Selected,Entire,Vert,Mouse'; // can only move vertically
//                        		this._dragFreely = cellx;
//                        	} else {
//                                log.debug("OnGanttRunDrop: Making Readonly");
//                                this._dragFreely = "";
//                        	}
//                        }
//                    } else if (row['_READONLY_STARTEND'] == true) {
//                    	if (verticalMove && intCellX == box.Left) {
//                    		row.GGanttRunMove = 'All,Move,Selected,Entire,Vert,Mouse'; // can only move vertically
//                    		this._dragFreely = cellx;
//                    	} else {
//                    		this._dragFreely = "";
//                    	}
//                    }
                    
                    if (row['_READONLY_STARTEND'] == true) {
                    	if (intCellX == box.Left) {
                    		row.GGanttRunMove = 'All,Move,Selected,Entire,Vert,Mouse'; // can only move vertically
                    		this._dragFreely = cellx;
                    	} else {
                    		this._dragFreely = "";
                    	}
                    } else if (this._isReadOnly(row)) {
                        if (row["_READONLY"] == true) {
                            this._dragFreely = false;
                        } else {
                        	if (verticalMove && intCellX == box.Left) {
                        		row.GGanttRunMove = 'All,Move,Selected,Entire,Vert,Mouse'; // can only move vertically
                        		this._dragFreely = cellx;
                        	} else {
                                log.debug("OnGanttRunDrop: Making Readonly");
                                this._dragFreely = "";
                        	}
                        }
                    } 
                    
                }
                return this._dragFreely;
            }

            if (drop === 0) {
                this.Dragging=true;
                if (this._dragFreely === false) return false;

                if (torow && (torow._DUMMY === true || torow._DUMMY == 'true')) return false;
                if (tocol != 'G') return false;
                if (this._boxRow && this._boxRow["_READONLY_ASSIGNMENT"] == true && row && torow && row.id != torow.id) return false;
                //for WO and PM segment
                if (this._boxRow && this._boxRow["_OBJECTNAME"] == "WORKORDER" && row && torow && row.id != torow.id) return false;
                if (this._boxRow && this._boxRow["_OBJECTNAME"] == "PM" && row && torow && row.id != torow.id) return false;

                // moving
                return this._dragFreely;
            }

            if (drop === 1) {
                this.Dragging=false;
                if (this._dragFreely === false) return false;
                log.debug("DROPPED: OnGanttRunDrop");
                if (col == 'G') {
                    // don't drop on dummy rows
                    if (torow && (torow._DUMMY === true || torow._DUMMY == 'true')) return false;

                    if (this._boxRow && this._boxRow["_READONLY_ASSIGNMENT"] == true && row && torow && row.id != torow.id) return false;
                    //for WO and PM segment
                    if (this._boxRow && this._boxRow["_OBJECTNAME"] == "WORKORDER" && row && torow && row.id != torow.id) return false;
                    if (this._boxRow && this._boxRow["_OBJECTNAME"] == "PM" && row && torow && row.id != torow.id) return false;
                    if (this.OnValidatePMsegmentDrop) this.OnValidatePMsegmentDrop(row, torow, this._boxRow);

                    if (this.OnValidateAssignmentDrop) this.OnValidateAssignmentDrop(row, torow, this._boxRow);
                }
                return this._dragFreely;
            }
        },

        OnValueChanged: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*type*/ val, /*type*/ oldval, /*object*/ errors) {
            log.debug("OnValueChanged: col: {}, val: {}", col, val);
			if (col=='WOPRIORITY' || col=='INTSHIFT'|| col=='INTERRUPTIBLE'|| col=='SNECONSTRAINT' ||
					col=='FNLCONSTRAINT'|| col=='TARGSTARTDATE'|| col=='TARGCOMPDATE' ||
					col=='MXDURATION'|| col=='MILESTONE'|| col=='SUPERVISOR'|| col=='name')        
           	{
				if( ( row && row.Kind == 'Data') && (col=='MXDURATION') )
				{
					var startTime = row['startTime'];
					var endTime = row['endTime'];
					var duration = row['MXDURATION'];
					var convertedVal = val;
					if (typeof val === 'string') {
						var hours = 0;
						var minutes = 0;
						if (val.includes(':')) {
							hours = parseInt(val.split(':')[0]) * 60 * 60 * 1000;
							minutes = parseInt(val.split(':')[1]) * 60 * 1000;
						}
						else {
							hours = parseInt(val) * 60 * 60 * 1000;
						}
						convertedVal = hours + minutes;
					}
					var convertedoldVal = oldval;
					if (typeof oldval === 'string') {
						var oldhours = 0;
						var oldminutes = 0;
						if (oldval.includes(':')) {
							oldhours = parseInt(oldval.split(':')[0]) * 60 * 60 * 1000;
							oldminutes = parseInt(oldval.split(':')[1]) * 60 * 1000;
						}
						else {
							oldhours = parseInt(oldval) * 60 * 60 * 1000;
						}
						convertedoldVal = oldhours + oldminutes;
					}
					if (convertedVal  != convertedoldVal )
	                {
						if (startTime != null && val != null) {
							endTime =  startTime + convertedVal;
							this.isBatchingChanges = true;
							this.SetValue(row,'endTime', endTime, true);
						}
                    }
				}

			//	if (col=='SUPERVISOR')
			//	{
			//		val = val.toUpperCase();
			//		var suggestList = grid.Cols[col].Suggest;
			//		if (!grid.InDefaults(row, col, val, suggestList)) {
			//			var errMsg = this.label('supervisornotfound');
			//			grid.ShowMessageTime(errMsg, 0);
			//			return oldval;
			//		}
			//	}
				if (typeof val === 'string' && oldval==val) {
				return;
				}
					   
				this.SetValue(row, '_UNCOMMITTED', 1, true);
				this.grid.RefreshCell(row, 'name');
            }
            if (grid.Cols[col] && grid.Cols[col].RefreshOnChange) {
                log.debug("Updating Linked Column: {} with {}", grid.Cols[col].RefreshOnChange, val);
                row[grid.Cols[col].RefreshOnChange] = val;
                grid.RefreshCell(row, grid.Cols[col].RefreshOnChange);
            }

            this._UpdateRelatedColumn(grid, row, col, val);

            return val;
        },

        _UpdateRelatedColumn: function(grid, row, col, val) {
        	if (grid.Cols[col] && grid.Cols[col].RefreshOnChange) {
                log.debug("Updating Linked Column: {} with {}", grid.Cols[col].RefreshOnChange, val);
                row[grid.Cols[col].RefreshOnChange] = val;
                grid.RefreshCell(row, grid.Cols[col].RefreshOnChange);
                return true;
            }
            return false;
        },

        OnAfterValueChanged: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*type*/ val) {
            //log.debug("CHANGED: {} -> {}", col, val);
            // this.OnRowChanged(grid, row);
        },

        OnBeforeGanttChanged:function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*string*/ item,
                                      /*type*/ newVal, /*type*/ newVal2, /*type*/ old, /*type*/ old2, /*string*/ action) {
        },

        OnGanttChanged: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*string*/ item,
                                 /*type*/ newVal, /*type*/ newVal2, /*type*/ old, /*type*/ old2, /*string*/ action) {
            //log.debug("GANTTCHANGED: {} -> {} {} ({}) (row:)", item, action, col, newVal, row);
            // stop RUN changes from being noticed, since we don't save those anyways
            if (item === 'Run') return;
            this.OnRowChanged(grid, row);
            this.sendToBeSaved();
        },

        OnRowChanged: function(grid, row) {
        	if ((this.lastRowChangedStatus == null && this.lastRowChangedId == null) || this.lastRowChangedId != row.id) {
        		this.lastRowChangedId = row["id"];
        		this.lastRowChangedStatus = row["_UNCOMMITTED"];
        	}

            if (row && row.Kind && row.Kind==='Data') {
            	 if (this.appname != null && this.appname != 'GWORKASSIGN')
            	 {
            		 row['_UNCOMMITTED'] = 1;
            		 this.grid.RefreshCell(row, 'name');
            	 }
            }
        },

        OnCalculateCell: function (/*TGrid*/ grid, /*TRow */row, /*string*/ col, /*type*/ val, /*bool*/ show, /*TCalc*/ Calc) {
            // Marks summary rows as modified
            // if (row && Calc && (col == 'startTime' || col == 'endTime') && (row['startTime'] && row['endTime']) && (row[col] != val)) {
            //     this.OnRowChanged(grid, row);
            // }
        },

        _applyCfgStateDuringRender: function(grid, state) {
            // subclasses can override to set toolbar cfg state settings, etc
            if (grid && grid.Toolbar && grid.Toolbar.TOGGLEDEPS===0) {
                // the default is ON so this can turn it off based on last known state
                grid.Cols.G.GanttDescendants='';grid.RefreshGantt(255);
            }
            
         	// subclasses can override to set toolbar cfg state settings, etc
            if (grid && grid.Toolbar && grid.Toolbar.LOCKDUR===1) {
                // the default is off so this can turn it ON based on last known state
            	 this._updateLockDuration();
            }
            
            // subclasses can override to set toolbar cfg state settings, etc
            if (grid && grid.Toolbar && grid.Toolbar.LOCKSCH===1) {
                // the default is off so this can turn it ON based on last known state
            	 this._updateLockSchedule();
            }
            
            // subclasses can override to set toolbar cfg state settings, etc
            if (grid && grid.Toolbar && grid.Toolbar.LOCKRESOURCE===1) {
                // the default is off so this can turn it ON based on last known state
            	 this._updateLockResource();
            }
        },

        /**
         * Called when the grid is fully rendered
         */
        OnRenderFinish: function (/*TGrid*/ grid) {
            this.grid = grid;
            if (!this._firstRender) {
                // we only do this once, the first time
                this._firstRender = true;

                // re-enable the filter state
                this.EnableFilter(grid);

                this.Refresh(255);
                log.debug("{} Has Been Rendered", this.TAG);

                // if there is a waitlockid, then set it, so that other grids can start loading.
                if (this['waitlockid']) {
                    log.debug("{} Sending waitlockcomplete message: {}", this.TAG, this['waitlockid']);
                    this.publishLater('miniapp.waitlockcomplete', this['waitlockid']);
                }

                this.publishLater('skd.ui.new.grid', {grid: this});

                // notify the hide progress
                topic.publish('miniapp.hideprogress', this.domid);

                log.debug("{} TreeGrid Version: {}, Text Version: {}, Defaults Version: {}", this.TAG, Component.Version, this.grid.TextVersion, this.grid.DefaultsVersion, this.grid);
            } 
            else {
                // re-enable the filter state
            	this.EnableFilter(grid);

                this.Refresh(255);
            }

            var me=this;
            this.invokeLater(function() {
                if (me.showCurrentDateLine) {
                    me._updateGanttLinesRepeat();
                }
            }, 500, 'ganttlinesrepeat');
        },

        EnableFilter: function(/*TGrid*/ grid) {
            // re-enable the filter state
            if (this.state) {
                var filter = grid.Filter;
                if (filter && this.state.Filter) {
                    //filter.Visible = this.state.Filter.Visible;
                    grid.Toolbar.FILTER = this.state.Filter.Visible;
                    if (this.state.Filter.Visible) {
                        grid.ShowRow(grid.Filter);
                    } else {
                        grid.HideRow(grid.Filter);
                    }

                    grid.RefreshRow(grid.Filter);
                }
                else
                	 grid.RefreshRow(grid.Toolbar);
                if (this._applyCfgStateDuringRender) {
                    this._applyCfgStateDuringRender(grid, this.state);
                }
                //grid.RefreshRow(grid.Toolbar);
            }
        },

        OnActivityChanged: function (/*TGrid*/grid, /*TRow*/ row, /*string*/ col, /*int*/ plan, /*object*/ newObj, /*object*/ oldObj, /*string: Resize,Move,New,Delete,DeleteAll,Correct*/ action) {
        },

        /**
         * The change (since 10.0) is bit array of the changes done in the box - &1 - changed, &2 - moved, &4 - resized, &8 - created, &16 - deleted.
         * When box is moved from one row to another, the event is called twice, first for adding the box to new row and next for deleting the box from old row.
         */
        OnGanttRunBoxChanged: function (/*TGrid*/ grid, /*object*/ box, /*object*/ old, /*int*/ change) {
            // bit of hack, but, after a Gantt Box change, reset these in case we dragged/resized
            // since the on gantt drag method is not telling us when the drag is complete
            this.Dragging=false;
            this.MouseDown=false;
        },

        OnLoadCfg: function (/*TGrid*/grid, /*String*/ cfg) {
            log.debug('{} OnLoadCfg: {}', this.TAG, cfg);
            return false;
        },

        _updateLockDuration: function() {
            if (!this.grid || !this.grid._LockDurationAction) {
                log.debug("Lock Duration not ready, waiting...");
                this.invokeLater(lang.hitch(this, this._updateLockDuration), 100, "_lockDuration");
            } else {
                try {
                    log.debug("Lock Duration Applied...");
                    var tb = this.grid.GetRowById("toolbar");
                    this.grid._LockDurationAction(tb);
                } catch (e) {
                    log.error("Failed to apply lock duration", e);
                }
            }
        },
        
        _updateLockSchedule: function() {
            if (!this.grid || !this.grid._LockScheduleAction) {
                log.debug("Lock Schedule not ready, waiting...");
                this.invokeLater(lang.hitch(this, this._updateLockSchedule), 100, "_lockSchedule");
            } else {
                try {
                    log.debug("Lock Schedule Applied...");
                    var tb = this.grid.GetRowById("toolbar");
                    this.grid._LockScheduleAction(tb);
                } catch (e) {
                    log.error("Failed to apply lock Schedule", e);
                }
            }
        },
        
        _updateLockResource: function() {
            if (!this.grid || !this.grid._LockResourceAction) {
                log.debug("Lock Schedule not ready, waiting...");
                this.invokeLater(lang.hitch(this, this._updateLockResource), 100, "_lockResource");
            } else {
                try {
                    log.debug("Lock Resource Applied...");
                    var tb = this.grid.GetRowById("toolbar");
                    this.grid._LockResourceAction(tb);
                } catch (e) {
                    log.error("Failed to apply lock Resource", e);
                }
            }
        },
        
        OnCfgLoaded: function (/*TGrid*/grid, /*String*/ cfg) {
            if (this.grid !== grid) {
                log.warn("OnCfgLoaded but, we have a different grid. Fixing.");
                this.grid=grid;
            }
            //log.debug('{} OnCfgLoaded: {}', this.gridId, cfg, grid);
            var tb = grid.GetRowById("toolbar");
            // reapply locked duration state, if it is on
            if (tb && tb.LOCKDUR == 1) {
                this._updateLockDuration()
            }

            if (tb && !tb.LOCKDUR && this.lockDuration) {
                this._updateLockDuration()
            }
            
            if (tb && tb.LOCKSCH == 1) {
                this._updateLockSchedule()
            }

            if (tb && !tb.LOCKSCH && this.lockSchedule) {
                this._updateLockSchedule()
            }
            
            if (tb && tb.LOCKRESOURCE == 1) {
                this._updateLockResource()
            }

            if (tb && !tb.LOCKRESOURCE && this.lockResource) {
                this._updateLockResource()
            }
            
            log.debug('{}({}) OnCfgLoaded', this.ViewName, this.TAG);
        },

        OnSaveCfg: function (/*TGrid*/grid, /*Boolean*/ saveToCookie) {
            //log.debug('{} OnSaveCfg: saveToCookie: {}', this.gridId, saveToCookie);
            //return false;
        },

        OnCfgSaved: function (/*TGrid*/grid, /*String*/ cfg) {
            // defer actually updating the state saving until we have settled down
            var g=grid;
            var c=cfg;
            var me=this;
            this.invokeLater(function() {
               me.OnCfgSavedDeferred(g,c);
            }, 100, "OnCfgSaved");
            // prevent actual storing cookie, since we have it stored on the server
            return true;
        },

        OnCfgSavedDeferred: function (/*TGrid*/grid, /*String*/ cfg) {
            // Push state to the server
            log.debug('Saving user state');
            
            // ignore duplicate state saving requests
            if (!cfg || this.lastCfg == cfg) {
                log.debug("State Not Changed");
                // don't save to cookie
                return true;
            }
            this.lastCfg=cfg;

            // this uses POST since the data is large
            this.fetch('async_upload_cookie', this._ioOptions({cfgid: grid.CfgId, cookie: cfg})).then(function(reply) {
                // don't do anything
            });

            // prevent actual storing cookie, since we have it stored on the server
            return true;
        },

        /**
         * Return true if the node has a parent, in the heirarchy, that is selected.
         *
         * @param row
         * @returns {*}
         */
        hasParentSelected: function(row) {
            if (!row.parentNode) return false; // we don't have a selected parent
            if (row.parentNode && this.grid.IsSelected(row.parentNode)) return true; // we do have a selected parent
            return this.hasParentSelected(row.parentNode); // let's check the parent's parent
        },

        /**
         * Iterates the selected rows and returns ONLY rows that don't have parents (ie top level nodes).  Since if
         * we apply operations to a parent then the children will already be affected.
         *
         * @param selected
         * @returns {Array}
         */
        normalizeSelectedRows: function(selected) {
            var sel = [];
            for (var i=0;i<selected.length;i++) {
                if (!this.hasParentSelected(selected[i])) {
                    sel.push(selected[i]);
                }
            }
            return sel;
        },


        OnEndDragGantt: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*string*/ name, /*int*/ start, /*int*/ end, /*int*/ oldstart, /*int*/ oldend, /*int*/ dir, /*object*/ XY, /*string*/ keyprefix, /*int*/ clientX, /*int*/ clientY, /*TRow*/ ToRow) {
            this.Dragging=false;

            if (row) this.OnRowChanged(grid, row);

            // drag move, check for multiple
            if (dir==3) {
                // parent with children
            	var selectedRows = [];
            	if (row.firstChild && (row['_INTERRUPTIBLE'] == 1 || !row['_PARENTID'])) {
            		this._applyToRow(row, 1, function(row, state) {
            			if (row.Selected == 0) {
            				selectedRows.push(row);
            			}
            			grid.SelectRow(row, state);
            			return true;
            		});
            	}

                // selected...
            	var selected = this._GetSelectedRows(this.grid, "G", row);
                if (selected && selected.length > 1) {
                    //log.debug("Selected", selected);
                    // selected = this.normalizeSelectedRows(selected);
                    //log.debug("Normaized Selected", selected);
                	var dur = start - oldstart;
                    this.moveToDateOffset(selected, dur);

                    for (i=0; i<selectedRows.length; i++) {
                    	grid.SelectRow(selectedRows[i], 0);
                    }

                    return true;
                }
            }
        },

        OnStartGanttDrag: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*string*/ name, /*int*/ start, /*int*/ end, /*int*/ oldstart, /*int*/ oldend, /*int*/ dir, /*object*/ XY, /*string*/ keyprefix, /*int*/ clientX, /*int*/ clientY, /*TRow*/ ToRow) {
            this.Dragging=true;
            this._hideTooltip();
            this.focusGanttBar(row);
            var tb = this.grid.GetRowById("toolbar");
            if (tb != null && tb.LOCKSCH == "1") return true; // suppress drag
            if (this._isReadOnly(row)) return true; // suppress drag
            if (dir != 3 && row['_READONLY_DURATION'] == true) return true; // suppress drag
            if (row['_READONLY_STARTEND'] == true) return true; // suppress drag
            if (start == oldstart && end == oldend) return;
        },

        OnGanttDrag: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*string*/ name, /*int*/ start, /*int*/ end, /*int*/ oldstart, /*int*/ oldend, /*int*/ dir, /*object*/ XY, /*string*/ keyprefix, /*int*/ clientX, /*int*/ clientY, /*TRow*/ ToRow) {
            this.Dragging=true;
            // this._hideTooltip();
            // //this.focusGanttBar(row);
            // if (this._isReadOnly(row)) return 0;
            // if (dir != 3 && row['_READONLY_DURATION'] == true) return 0;
            // if (row['_READONLY_STARTEND'] == true) return 0;
            // if (start == oldstart && end == oldend) return;
        },

        _isReadOnly: function (/*Trow*/ row) {
            if (row == null) return false;
            return row["_READONLY"] == true || row['MODAPPOINTMENT'] == true || row['MODAPPOINTMENT'] == "true";
        },

        _hideTooltip: function () {
            if (this.Dragging) {
                // if we are dragging then schedule the tooltip to hide later as to prevent it from taking over the focus
                this._hideTooltipLater();
            } else {
                if (this._tooltipTimeout != null) {
                    window.clearTimeout(this._tooltipTimeout);
                }
                // log.debug("Tooltip Closed BY {}", arguments.callee.caller.toString());
                if (this._tooltip != null) {
                    try {
                        popup.hide(this._tooltip);
                        this._tooltip.destroy();
                        this._tooltip = null;
                    } catch (ex) {
                        console.log("error closing tooltip");
                    }
                }

                // hide the date popup as well
                this.closeDatePicker && this.closeDatePicker();
            }
        },

        /**
         * Hides the Tooltip just a little later in the future to prevent it from taking over the focus
         * @private
         */
        _hideTooltipLater: function () {
            this.invokeLater(lang.hitch(this, this._hideTooltip), 20, "_tooltip");
        },


        OnDblClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            this._hideTooltip();

            log.debug("{} DblClick {}", this.TAG, col);
            if (this.shouldDblClickSelectRow(grid, row, col)) {
                grid.SelectRow(row, 1);
            }
            if (row && row.Kind == 'Data') {
            	//readonly if schedule locked
            	 if (col == 'startTime' || col == 'endTime' || col == 'MXDURATION' )
                 {
                 	 if (grid && grid.Toolbar && grid.Toolbar.LOCKSCH===1)
                 		 {return true;}
                 }
            }
            if (col === 'name') {
            	var startTime = row['startTime'];
            	var endTime = row['endTime'];
            	var duration = 0;

            	if (startTime != null && endTime != null) {
            		duration = endTime - startTime;
            	}

            	if (duration == 0) {
            		endTime = null;
            	}

            	this.ZoomTo(startTime, endTime, -40, true);
            } else if (col === 'G') {
                var objs = grid.GetGanttXY(row, col, x, y);
                if (objs != null && objs.Type != null) {
                    log.debug("DblClick GANTT Object", objs);
                    if (objs.RunId) {
                        return true;
                    } else {
                        // gantt object
                        this.ZoomTo(row['startTime'], row['endTime']);
                    }
                }
            }
            else if (col === 'CRAFT') {
                this._removeRowColor(grid);
            }
        },

        /**
         * Given Load/Avail str return the first Date
         * <pre>"#1502089200000~1502118000000#8.0;#1502175600000~1502204400000#8.0;"</pre>
         *
         * @param str
         * @returns {*}
         */
        getDateFromLoad: function(str) {
            // return the first date in the first load
            if (!str) return null;
            var parts = str.split(';');
            if (parts && parts.length) {
                parts = parts[0].split('#');
                if (parts && parts.length) {
                    var part = parts[1];
                    if (!part) return null;
                    parts = part.split("~");
                    if (parts && parts.length) {
                        return parts[0];
                    }
                }
            }
            return null;
        },

        /**
         * OnRightClick is called when an object needs a Context Menu.  The Content Menu is primarily Async, in that
         * A request to server is made, and the server responds with th menu to show.  The menu is then Augmented with
         * any static menu entries.  If the menu ends up with items, then it is shown.  When an item is clicked, IF
         * the item has an internal method then the method called, against the GanttWidget, otherwise, the menu
         * is dispatched to the server to be handled.
         */
        OnRightClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            this._hideTooltip();

            // only process right clicks on Data Rows
            if (row == null || row.Kind != 'Data') return;

            this.focusGanttObject(grid, row, col, x, y, event);

            // keep track of the clicked x,y in this widget, since we'll use it later for showing menus
            this.eventPageX = event.pageX;
            this.eventPageY = event.pageY;
            log.debug("OnRightClick: {}", col);
            if (this.shouldRightClickSelectRow(grid, row, col)) {
                grid.SelectRow(row, 1);
            }
            grid.Focus(row, col, null, false);
            if (col == 'G') {
                var objs = grid.GetGanttXY(row, col, x, y);
                if (objs != null && objs.Type != null && objs.Type != 'line') {
                    this.OnActivityContextMenu(grid, row, col, x, y, event);
                } else if ((event && event.originalTarget && event.originalTarget.className && event.originalTarget.className.indexOf("skd-icon") !== -1) ||
                		(event && event.target && event.target.className && event.target.className.indexOf("skd-icon") !== -1)) {
                	this.OnTableContextMenu(grid, row, col, x, y, event);
                } else {
                    //return false;
                	return this.hideGanttZoomOptions();
                }
            } else {
                this.OnTableContextMenu(grid, row, col, x, y, event);
            }
            return true;
        },

        hideGanttZoomOptions: function() {
        	return false;
        },

        shouldRightClickSelectRow: function(grid, row, col) {
            var rows = grid.GetSelRows();
            if (rows && rows.length > 0) {
               return true;
            }
            return false;
        },
        
        
        shouldDblClickSelectRow: function(grid, row, col) {
            return false;
        },
     

        /**
         * Returns an Array of ALL the selected rows.  If RunBoxes are seleted, it will return those rows as
         * selected rows.  In all cases the curRow is added to the list, IF it's not already in the list of
         * selected rows.  ie, this should always return an array of least 1 item.
         */
        _GetSelectedRows: function (grid, col, curRow) {
            var rows = [];
            if (col == 'G') {
                var boxes = grid.GetGanttRunSelectedBoxes (null, col);
                if (boxes.length > 0) {
                    for (var i = 0; i < boxes.length; i++) {
                        var id = boxes[i].Id;
                        if (id) {
                            var r = this.GetRowById(id);
                            if (r != null) {
                                rows.push(r);
                            }
                        }
                    }
                } else {
                    // No RUN Boxes selected, so get normal rows
                    var rows = grid.GetSelRows();
                }
            } else {
                // normal table rows
                var rows = grid.GetSelRows();
				//if two rows add selected run boxes for assignto action on select resourcerow
                if (rows.length ===2){
                	 var boxes = grid.GetGanttRunSelectedBoxes (null, 'G');
                     if (boxes.length > 0) {
                         for (var i = 0; i < boxes.length; i++) {
                             var id = boxes[i].Id;
                             if (id) {
                                 var r = this.GetRowById(id);
                                 if (r != null) {
                                     rows.push(r);
                                 }
                             }
                         }
                }
             }
            }

            var addRow = true;
            for (var i = 0; i < rows.length; i++) {
                if (curRow != null && rows[i].id == curRow.id) {
                    addRow = false;
                    break;
                }
            }
            if (curRow != null && addRow) {
                rows.push(curRow);
            }
            return rows;
        },
        
        isResourceView: function() {
            return false;
        },
        
        /**
         * Returns an object with 'activities' and 'resources' arrays that contain the selected bars and table rows
         */
        GetSelection: function (grid, col, curRow) {
            var selection = {
                activities: [],
                resources: []
            };
            var resView = this.isResourceView;
            var boxes = grid.GetGanttRunSelectedBoxes (null, "G");
            if (boxes.length > 0) {
                for (var i = 0; i < boxes.length; i++) {
                    var id = boxes[i].Id;
                    if (id) {
                        var r = this.GetRowById(id);
                        if (r != null) {
                            selection.activities.push(r);
                            // for a 'box' bar, add in it's parent, which is a resource node
                            if (r.parentNode && resView) {
                                selection.resources.push(r.parentNode);
                            }
                        }
                    }
                }
            }

            // add the focussed gantt object to the selection
            if (this._focusGanttObject) {
                selection.activities.push(this._focusGanttObject);
            }

            var rows = grid.GetSelRows();
            if (rows && rows.length) {
                if (this.isResourceView()) {
                    selection.resources = selection.resources.concat(rows);
                } else {
                    selection.activities = selection.activities.concat(rows);
                }
            }

            // add in the current row
            if (curRow) {
                if (curRow.Type == 'box') {
                    selection.activities.push(curRow);
                    if (this.isResourceView()) {
                        selection.resources.push(curRow.parentNode);
                    }
                } else {
                    // table row
                    if (this.isResourceView()) {
                        selection.resources.push(curRow);
                    } else {
                        selection.activities.push(curRow);
                    }
                }

                selection.current_row = curRow;
                selection.current_row_parent = curRow.parentNode;
                selection.current_row_type=(this.isResourceView)?1:0;
            }

            if (col) {
                selection.col = col;
                if (curRow && col != 'G') {
                    selection.col_value = curRow[col];
                }
            }

            return selection;
        },

        GetSelectionIds: function (grid, col, curRow) {
            var sel = {
                activities: [],
                resources: []
            };

            var haveit = {};
            var selObjs = this.GetSelection(grid, col, curRow);
            for (var i=0;i<selObjs.activities.length;i++) {
                if (!haveit[selObjs.activities[i].id]) {
                    sel.activities.push(selObjs.activities[i].id);
                    haveit[selObjs.activities[i].id]=1;
                }
            }
            haveit = {};
            for (var i=0;i<selObjs.resources.length;i++) {
                if (!haveit[selObjs.resources[i].id]) {
                    sel.resources.push(selObjs.resources[i].id);
                    haveit[selObjs.resources[i].id]=1;
                }
            }

            if (selObjs.current_row) {
                sel.current_row=selObjs.current_row.id;
            }
            if (selObjs.current_row_parent) {
                sel.current_row_parent=selObjs.current_row_parent.id;
            }

            sel.current_row_type=(this.isResourceView)?1:0;
            sel.col = col;
            sel.col_value = selObjs.col_value;
            return sel;
        },


        /**
         * Converts a GMT0 Time to normal Browser TZ date.
         * @param time {number} as a Date
         * @returns {number}
         */
        TGDateToTZDate: function(time) {
            return (new Date(time + (new Date(time).getTimezoneOffset() * 60 * 1000))).getTime();
        },

        /**
         * Convert a TZ date to GMT0
         * @param time {number} as a Date
         * @returns {number}
         */
        TZDateToTGDate: function(time) {
            return time - (new Date().getTimezoneOffset() * 60 * 1000);
        },

        /**
         * Convert a TG GMT0 Date into a User's TZ Date on the Server
         *
         * @param time {number} as a Date
         * @returns {number}
         */
        TGDateToUserTZDate: function(time) {
            return time+this.GMT0TZOffset;
        },

        /**
         * This is a stub function that get reset/create for every date picker instance.  This just ensure that
         * we don't get NPE when trying to close it.
         */
        closeDatePicker: function() {
        },

        /**
         * Called GetSelectedRows and return the IDs as a comma separated list of IDs
         */
        _GetSelectedRowIds: function (grid, col, curRow) {
            var rows = this._GetSelectedRows(grid, col, curRow);
            var selection = "";
            var comma = "";
            for (var k in rows) {
                selection = selection + comma + rows[k]['id'];
                comma = ",";
            }
            return selection;
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
            if (objs != null && objs.Type == 'dependency') {
                // store the selected dependency for later
                this._EDIT_DEPENDENCY = objs;
                log.debug("Dependency Menu Fetch for", objs);
                this.fetch("async_get_table_context_menu", me._ioOptions({
                    projectid: me.projectid,
                    id: objs.DependencyFrom,
                    col: "dependency",
                    value: objs.DependencyTo + objs.DependencyType
                })).then(function (menu) {
                    //menu = me._AdditionalTableContextMenu(menu, grid, row, col, x, y, event);
                    me._ShowContextMenu(menu, grid, row, col, x, y, event);
                });
            } else if ((event && event.originalTarget && event.originalTarget.className && event.originalTarget.className.indexOf("skd-icon")!==-1) ||
            		(event && event.target && event.target.className != null && event.target.className.indexOf("skd-icon") !== -1)) {
            	var target = event.originalTarget ? event.originalTarget : event.target;
            	var dependencyDir = target.className.indexOf("left") > -1 ? "from" : "to";
                // store the selected dependency for later
                this._EDIT_DEPENDENCY = objs;
                log.debug("Dependency Menu Fetch for", objs);
                this.fetch("async_get_table_context_menu", me._ioOptions({
                    projectid: me.projectid,
                    id: value,
                    col: "multiple-dependency",
                    value: dependencyDir
                })).then(function (menu) {
                    //menu = me._AdditionalTableContextMenu(menu, grid, row, col, x, y, event);
                    me._ShowContextMenu(menu, grid, row, col, x, y, event);
                });
            } else {
		// returns the "selection" as distinct list of resources and activities
                var selectedItems = this.GetSelectionIds(grid, col, row);
                // returns the selection as just a list of row ids
                var selection = this._GetSelectedRowIds(grid, col, row);

                log.debug("OnTableMenuContextMenu: Context Menu: Selection: {}", selection, selectedItems);
                if (value == undefined)
                	return true;

                this.fetch("async_get_table_context_menu", me._ioOptions({
                    projectid: me.projectid,
                    id: selection,
                    selection: selectedItems,
                    col: col,
                    value: value
                })).then(function (menu) {
                    menu = me._AdditionalTableContextMenu(menu, grid, row, col, x, y, event);
                    me._ShowContextMenu(menu, grid, row, col, x, y, event, selectedItems);
                });
            }

            return true;
        },

        _ShowContextMenu: function (/*TMenu*/menu, /*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event, selectedItems) {
            if (menu) {
                var me = this;

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

        /**
         * Child Classes can optionall override this to add static menus
         */
        _AdditionalTableContextMenu: function (/*TMenu*/menu, /*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            log.debug('_AdditionalTableContextMenu: {}', col);
            if (col == 'name' || col == 'G') {
                menu = menu || {Items: []};
                log.debug('Adding Debug Menus');
                if (this.loglevel <= 0) {
                    // if Internal is set to true, then the Value is executed as the action for the item
                    menu.Items.push({
                        Name: '-',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });
                    menu.Items.push({
                        Name: 'Debug Item',
                        Value: '_OnDebugItem',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });
                    menu.Items.push({
                        Name: 'Clear Saved State',
                        Value: '_OnClearSavedState',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });
                    menu.Items.push({
                        Name: 'Fetch UI Model',
                        Value: '_FetchUIModel',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });
                    menu.Items.push({
                        Name: 'Fetch Data Model',
                        Value: '_FetchDataModel',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });
                    menu.Items.push({
                        Name: 'Reload Body',
                        Value: 'ReloadBody',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });

                    menu.Items.push({
                        Name: 'Reload Model',
                        Value: 'ReloadModel',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });

                    menu.Items.push({
                        Name: 'Request Grid Refresh All',
                        Value: 'onRefreshRequested',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });


                    menu.Items.push({
                        Name: 'Load Alternate Model',
                        Value: '_LoadAlternateModel',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });
                }
                else
                {
	 					menu.Items.push({
                        Name: 'Clear Saved State',
                        Value: '_OnClearSavedState',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });
                     menu.Items.push({
                        Name: 'Reload Body',
                        Value: 'ReloadBody',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });
				}
            }
            return menu;
        },

        /**
         * Debug Method For fetching the UI JSON Model
         * @private
         */
        _FetchUIModel: function() {
            window.open(this.grid.Data.Layout.Url);
        },

        _LoadAlternateModel: function() {
            var urls = window.prompt("Enter Comma Separated URLs for UI and Data");
            if (urls!=null) {
                var strs = urls.split(",");
                this.customUiUrl = strs[0];
                this.customDataUrl = strs[1];
                this.onRefreshRequested();
            }
        },

        /**
         * Debug Method For fetching the UI JSON Model
         * @private
         */
        _FetchDataModel: function() {
            window.open(this.grid.Data.Data.Url);
        },

        SetIDFromItem: function (item) {
            if (item.Multi == true) {
                var ids = this._GetSelectedRowIds(this.grid, 'G', null);
                if (!(ids == null || ids == "")) {
                    return ids;
                } else {
                    log.warn("Item has Multi flag, but nothing is selected", item);
                }
            }
            return item.id || item.Value
        },

        /**
         * Called when an action in the Context Menu is selected for the Table Content Menu
         *
         * Context Menu Process / LifeCycle
         *  If item.Values.dialogname is not null, then it will show a Maximo Dialog with that same name.
         *  If item.Values.dialogname is "GOTO" then it will goto the app encoded in the Values
         *  If item.Value resolves to a method in the app, then it will call that method passing the item and row
         *  If none of the above happens, then the menu item is sent the server event handler for 'on_handle_context_menu_item'
         *    - The Reply from the on_handle_context_menu_item should be a JSON Reply
         *    - If this class has a function item.Value+'Reply' then that function is called, passing the reply
         *    - If Reply.IO.Result==1000, then the entire Grid is reloaded
         *    - If Reply.Changes exists, then those changes are applied to the current grid
         *    - If Reply.IO.Result < 0, then an error has happened
         *
         *  E.g., if item.Value = 'getData', then the process will check if this.getData exists as a function and call
         *  it.  If it does not exist, then it pass the call the server, and then process the reply.  When the reply comes
         *  back, IF this.getDataReply exists, then the reply will be passed to that function.  If the reply function
         *  does not exist, and the repsonse is a Changes response, then those changes will be applied to the Grid
         *  automatically.
         */
        OnContextMenuItemSelected: function (/*TMenuItem*/item, /*TROW*/row, /*List*/ selection) {
            var me = this;
            log.debug("OnContextMenuItemSelected", item);
            if (item.Values && item.Values.dialogname) {
                if (item.Values.dialogname != "GOTO") {
                    this.OnShowMaximoDialog(item);
                } else {
                    this.OnGoToMaximoApplication(item);
                }
            } else if (this[item.Value]) {
                // try to invoke this as being an internal method handler
                try {
                    log.debug("Calling ContextMenu Handler: {}", item.Value);
                    this[item.Value](item, row);
                } catch (e) {
                    log.error("Error While Invoking Internal Method for {}", item.Value, e);
                }
            } else {
                if (item.longOpMessage) {
                    //this.grid.ShowMessage(item.longOpMessage);
                    this.publishPleaseWait(item.longOpMessage);
                }

                // send the content menu item back to the server for processing
                this.fetch("on_handle_context_menu_item", this._ioOptions({
                        projectid: this.projectid,
                        id: this.SetIDFromItem(item),
                        value: item.Value,
                        values: item.Values,
                        selection: selection
                    })
                ).then(function (reply) {
                    me.progress(true);
                    if (me[item.Value + "Reply"]) {
                        log.debug(" handle_context_menu_item: Sending Reply To {}", item.Value + "Reply");
                        me[item.Value + "Reply"](reply, item, row);
                    } else {
                        me.processServerResponse(reply);
                    }
                    // if the item requests a clear selection, then do it.
                    if (item.ClearSelection == true || (reply && reply.IO && reply.IO.ClearSelection == true)) {
                        me.grid.ClearSelection();
                    }
                    me.progress(false);
                });
            }
        },

        /**
         * Process A Server Reply.  Return true if the reply was processed as 'ok' ore false if the reply was an 'error'
         * @param reply
         * @returns {boolean}
         */
        processServerResponse: function(reply) {
            var me = this;
            // apply changes as if we got a ReplyBuilder reply
            if (reply && reply.Changes) {
                me.acceptChangesFromServer(reply);
                me.sendToBeSaved();
            } else if (reply && reply.IO) {
                log.debug("Handling Reply.IO", reply);
                if (reply.IO.Result == 1000) {
                    me.ReloadBody();
                    me.sendToBeSaved();
                } else if (reply.IO.Result == 1001) {
                    // send to saved so that we can process any sync requests
                    me.sendToBeSaved();
                } else if (reply.IO.Result < 0) {
                    log.error("acceptServerResponse: Error: {}", reply.IO.Result);
                    return false;
                } else {
                    log.error("acceptServerResponse: OK Result: {}", reply.IO.Result);
                }
            } else {
                log.debug("acceptServerResponse: have no reply to process", reply);
            }
            return true;
        },


        publishPleaseWait: function(msg) {
            this.publishTo("skd.ui.please-wait", msg);
        },

        acceptChangesFromServer: function(changes) {
            if (changes && changes.Changes) {
                log.debug("Begin Applying Changes from server", changes.Changes);
                this.grid.AddDataFromServer(changes);
                log.debug("Done Applying Changes from server");
            } else {
                log.warn("No Changes", changes);
            }
        },

        ReloadBody: function (handler) {
            if (handler == null) handler = function () {
                log.debug('Reload Complete');
            };
            log.debug("Reloading Body");
            this.grid.ReloadBody(handler);
        },

        ReloadModel: function () {
            this.grid.Reload(null, null, false);
            this.sendToBeSaved();
        },

        OnShowMaximoDialog: function (/*TMenuItem*/item) {
            // Thread-28 -  SKDViewer -- addCommInput('linkedapp', 'MODIFYWO');addCommInput('objectname', 'WORKORDER');addCommInput('selection', '[1670]');addCommInput('linkedvalue', '');addCommInput('uniqueid', '1670');addCommInput('linkedattribute', '');sendEvent('MODIFYWO', 'scheduler','');
            log.debug("Show Maximo Dialog", item.Values);
            for (var k in item.Values) {
                log.debug("addCommInput({},{})", k, item.Values[k]);
                addCommInput(k, item.Values[k]);
            }
            //addCommInput('linkedapp', 'MODIFYWO');addCommInput('selection', '[1670]');addCommInput('linkedvalue', '');addCommInput('uniqueid', '1670');addCommInput('linkedattribute', '');
            log.debug("sendEvent({},{})", item.Values.dialogname, this.appname);
            sendEvent(item.Values.dialogname, this.appname, '');
        },

        OnGoToMaximoApplication: function (/*TMenuItem*/item) {
            log.debug("Go To Maximo Application", item.Values);
            for (var k in item.Values) {
                log.debug("addCommInput({},{})", k, item.Values[k]);
                addCommInput(k, item.Values[k]);
            }
            //addCommInput('linkedapp', 'MODIFYWO');addCommInput('selection', '[1670]');addCommInput('linkedvalue', '');addCommInput('uniqueid', '1670');addCommInput('linkedattribute', '');
            log.debug("sendEvent({},{})", item.Values.dialogname, this.appname);
            sendEvent("applink", this.appname, '');
        },

        _OnDebugItem: function (/*TMenuItem*/item) {
            if (item.Col == 'G') {
                log.debug("DEBUG GANTT ITEM", item.Row);
            } else {
                log.debug("DEBUG ITEM {}", item.Row['name'], item.Row);
            }
        },

        _OnClearSavedState: function() {
            this.fetch("clear_saved_state");
        },

        /**
         * Activity Context menu is similar to the Context Menus for the Table, except it is shown for a Gantt Item.
         */
        OnActivityContextMenu: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            log.debug("OnActivityContextMenu: {}", row['id']);
            return this.OnTableContextMenu(grid, row, col, x, y, event);
        },

        OnContextMenu: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*string*/ result) {
            log.debug('OnContextMenu: {} {}', col, result);
        },

        OnAfterSectionResize: function (/*TGrid*/ grid, /*int (0-left, 1 middle, 2 - right) */ section) {
        },

        OnAfterColResize: function (/*TGrid*/ grid, /*string*/ col, /*TRow*/ row, /*int */ chg) {
            log.debug("{} Resized: {} by {}", this.TAG, col, chg);
        },

        // http://www.treegrid.com/treegrid/Doc/DataDownload.htm#OnReady
        // Called when the grid is "ready" it has data and view, but has not rendered the view, yet.
        OnReady: function (/*TGrid*/ grid, /*bool: true/1=creating, false/0=updating*/ start) {
            log.debug('{} TreeGrid.OnReady being called: [start: {}]', this.TAG, start);
            this.upgradeTGInstance(grid);
        },

        OnGanttMenuClick: function(grid, row, col, name, menuItem, gantXY) {
            /**
             * Add a Zoom to Work action that finds the start/end of the all the work, and then zooms to that
             */
            if (menuItem && menuItem.Name == 'ZoomWork') {
                log.debug("ZoomToWork", menuItem);
                return this.ZoomToWork(this.grid);
            }
        },


        ZoomToWork: function(grid, focus, test, show) {
            log.debug("ZoomToWork: focus: {}, test: {}, show: {}", focus, test, show);
            if (test) return;

            var state={start:0,end:0};
            this._applyToRow(grid.Body, state, function(row, state) {
            	
                if (row.startTime && !row["_HIDDEN"]) {
                    if (state.start==0) {
                        state.start=row.startTime;
                        state.startRow=row;
                    } else {
                        if (row.startTime<state.start) {
                            state.start=row.startTime;
                            state.startRow=row;
                        }
                    }
                }

                if (row.endTime && !row["_HIDDEN"]) {
                    if (state.end==0) {
                        state.end=row.endTime;
                        state.endRow=row;
                    } else {
                        if (row.endTime>state.end) {
                            state.end=row.endTime;
                            state.endRow=row;
                        }
                    }
                }
                // If ENDTIME is null, but STARTTIME is not, then we'll use STARTTIME.
                else if (row.startTime && !row["_HIDDEN"]) {
                    if (state.end==0) {
                        state.end=row.startTime;
                        state.endRow=row;
                    } else {
                        if (row.startTime>state.end) {
                            state.end=row.startTime;
                            state.endRow=row;
                        }
                    }
                }

                return true;
            });

            // if we are less than a day, just expand to a day
            var delta = state.end - state.start;
            if (delta <= ONE_DAY) {
                state.start = state.start - ((ONE_DAY - delta) / 2);
                state.end = state.start + ONE_DAY;
            }

            log.debug("ZoomTo", state);
            if (state.start && state.end) {
            	var ganttStart = grid.GetGanttDate(0); // Gantt start date
            	var maxPos = grid.Cols['G'].Width; // Last Gantt position
            	var ganttEnd = grid.GetGanttDate(maxPos); // Gantt end date
            	ganttEnd = grid.RoundGanttDate(ganttEnd, 1, null, null, 'd'); // Gantt end date needs to be rounded up

            	if (state.start < ganttStart || state.end > ganttEnd) {
            		grid.ActionZoomFit();
            	}
            	else {
            		this.ZoomTo(state.start, state.end, null, true);
            	}
            } else {
                log.warn("Nothing To ZoomTo");
            }
            return true;
        },


        OnGetSortValue: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*type*/ val, /*bool*/ desc, /*bool*/ group) {
            if (!val && row.firstChild) {
                return this.OnGetSortValue(grid, row.firstChild, col, row.firstChild[col], desc, group);
            }
            
            if (col && col == 'MXDURATION') {
            	var pad = '000000'; // 0000:00
            	val = val.replace(':', '');
            	val = pad.substring(0, pad.length - val.length) + val;
            }
            
            return val;
        },

        upgradeTGInstance: function(grid) {
            // NOTE: thise need to set on the grid every time it is loaded/relaoded.
            // for custom toolbar actions we need to link the Grid._ToolbarAction to the GanttActions.js
            grid._GotoTodayToolbarAction = lang.hitch(this, this._GotoTodayToolbarAction);
            grid._GotoSelectedDayToolbarAction = lang.hitch(this, this._GotoSelectedDayToolbarAction);
            grid._LockDurationAction = lang.hitch(this, this._LockDurationAction);
            grid._UnlockDurationAction = lang.hitch(this, this._UnlockDurationAction);
            grid._LockScheduleAction = lang.hitch(this, this._LockScheduleAction);
            grid._UnlockScheduleAction = lang.hitch(this, this._UnlockScheduleAction);
            grid._LockResourceAction = lang.hitch(this, this._LockResourceAction);
            grid._UnlockResourceAction = lang.hitch(this, this._UnlockResourceAction);

            grid._ZoomToWeekToolbarAction = lang.hitch(this, this._ZoomToWeekToolbarAction);
            grid.ResourceFormula = lang.hitch(this, this.__ResourceFormula);

            grid.OnHideFilter = function(grid) {
                log.debug("OnHideFilter:  CLearing Filters...");
                // clear the filters when we hide it
                grid.ActionClearFilters();
                grid.Toolbar.Expression='';
                grid.RefreshRow(grid.Toolbar);
                grid.SearchExpression='';
                grid.SearchRows('Mark,Filter');
            };

            grid._FixUIAction = lang.hitch(this, this._FixUI);

            grid.FireEvent = lang.hitch(this, this.FireEvent);

            // Let's use this to select parent and children
            grid.Actions.OnShiftClick = lang.hitch(this, this.OnShiftClickCell);
            grid.Actions.OnShiftClickPanelSelect = lang.hitch(this, this.OnShiftSelectRow);

            /**
             * Note.  You can created your Action Names by creating Functions like
             * grid.ActionYourCustomName = function() {};
             * and then later you can assign them using...
             * grid.Actions.OnCtrlAltClick="YourCustomName"
             * TreeGrid will look for ActionYourCustomName when you specify YourCustomName as the Action.
             */
            var me = this;
            grid.Actions.OnCtrlAltClick = function(grid) {
                if (log.LOG_LEVEL == log.DEBUG) {
                    log.LOG_LEVEL = log.WARN;
                    me.loglevel = log.WARN;
                } else {
                    log.LOG_LEVEL = log.DEBUG;
                    me.loglevel = log.DEBUG;
                }
                log.warn("Debug Logging Changed: {}", log.LOG_LEVEL);
                try {
                    grid.Toolbar.ZoomVisible = (log.LOG_LEVEL == 0 ? 1 : 0);
                    grid.RefreshRow(grid.Toolbar);
                } catch (ex) {
                    log.error("Debug Failed", ex);
                }
            };
        },

        _createZoomRange: function (/*long*/start, /*long*/end) {
            var range = {};
            var delta = end - start;
            if (delta <= ONE_DAY) {
                range.start = start - ((ONE_DAY - delta) / 2);
                range.end = range.start + ONE_DAY;
            } else if (delta <= ONE_WEEK) {
                range.start = start - ((ONE_WEEK - delta) / 2);
                range.end = range.start + ONE_WEEK;
            } else {
                range.start = start - ONE_DAY;
                range.end = end + ONE_DAY;
            }
            return range;
        },

        roundToStartOfDay: function(timeStamp) {
            timeStamp -= timeStamp % (24 * 60 * 60 * 1000);
            return timeStamp;
        },

        ZoomTo: function (start, end, width, exactDates) {
            var exact = exactDates || false;
            if (start && !end) {
                log.debug("ZoomTo: Adjusting end because it is null");
                end = this.roundToStartOfDay(start) + this.DURATION_ONE_DAY; // defined GanttActions.js
                exact = true;
            }

            // adjust the start/end to be day, if are zooming to less that a day
            if (start && end) {
                var dur = end-start;
                if (dur<this.DURATION_ONE_DAY) {
                    start = this.roundToStartOfDay(start);
                    end = start+this.DURATION_ONE_DAY;
                    exact = true;
                }
            }

            log.debug("{} ZoomTo: {}, {}", this.TAG, new Date(start), new Date(end));
            if (!start || !end || start == null || end == null || start <= 0 || end <= 0) {
                log.warn("{} ZoomTo called with invalid start {} and end times {}", this.TAG, start, end);
                return;
            }

            log.debug("{} Zooming Before Create Range: {} - {}", this.TAG, new Date(start), new Date(end));
            if (exact === true) {
                range = {start: start, end: end};
            } else {
                range = this._createZoomRange(start, end);
            }
            log.debug("{} Zooming After Create Range: {} - {}", this.TAG, new Date(range.start), new Date(range.end));
            try {
                log.debug("{} Zooming: {} - {} (exact?: {}) (width: {})", this.TAG, new Date(range.start), new Date(range.end), exact, width);
                this.grid.ZoomTo(new Date(range.start), new Date(range.end), -40);
            } catch (ex) {
                log.error('{} error during ZoomTo', this.TAG, ex);
            }

            log.debug("{} Zoomed: {} - {}", this.TAG, new Date(range.start), new Date(range.end));
        },

        // used by the OnGetGanttBarHtml to return a row value that is not 'undefined'
        __rowValFunc: function (_, key) {
            val = this.row[key];
            if (!val) val = '';
            return val;
        },
        
        /**
         * Used to set the text of the tip shown on mouse hover. User can override the default value adding a skd property like gantt.<object-name>.
         * User can override the Gantt bar template with a simple {field} replacement.
         */
        OnGanttTip: function( grid,  row,  col,  tip,  XY,  name) {
        	var tpl = '{name}';

        	if (name === 'Run' && XY && XY['RunId']){
        	    // acount for run box
                var r = this.GetRowById(XY['RunId']);
                if (r) row=r;
            }

        	// NOTE: you can override the template per OBJECTNAME type
            var tplKey = 'gantt.' + row["_OBJECTNAME"] + ".tip.tpl";
            if (this[tplKey] != null) {
                tpl = this[tplKey];
                if (tpl == null || tpl.trim().length == 0) tpl = '{name}';
            }
        	
        	// process template
            var text = lang.replace(tpl, lang.hitch({row: row}, this.__rowValFunc));
            if (text == null || text.trim().length == 0) text = row['name'];
            
        	return text;
        },
        /**
         * Used to set the background color for a gantt-bar object.
         */
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
			    if (text != null) {
                    text = text.replace(/\|/g, '&vert;');
                    text = text.replace(/\'/g, '&apos;');
                }
                return text;
            } else 
            {
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
			            else if (row['_READONLY'] == true) {
						     cls += " skd-Conflict";
						}
                    }

                    if ((row.ERRVAL & (this.ERRORS.ERR_SCHEDULE_WINDOW)) != 0) {
                        // log.debug("ERROR CHECK: {}: schedule window", row.id);
                        cls += " skd-err-schedule-window";
                    }

                    if (cls == '') {
                        // log.debug("ERROR CHECK: {}: other error: {}", row.id, row.ERRVAL);
                        cls += " skd-err";
                    }
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
                        // log.debug("Creating Custom Style: {}", styleName, styleEl);
                    }
                }

                // var bar = '<div class="' + clses + '" style="'+barStyle+'" ><span class="' + altclses + '">' + ((text) ? text : '') + '</span></div>';
                // return bar;

                if (!tgClasses) {
                    tgClasses=[];
                }

                // set the bar colors
                tgClasses[2] = clses;
                // set text properties
                tgClasses[3] = altclses;

                //log.debug("2: w: {}, crit: {}, comp: {}, plan: {}, index: {}, txt: {}, left: {}, maxW: {}, cls: {}", width, crit, comp, plan, index, txt, left, maxwidth, tgClasses );
                if (text != null) {
                    text = text.replace(/\|/g, '&vert;');
                    text = text.replace(/\'/g, '&apos;');
                }
                return text;


            }
        },

        _GetAltCSSClassForActivity: function (row) {
            //debugger;
            swrow = this._getSNLFNE(row);
            if (!swrow) return;
            //log.debug("_GetAltCSSClassForActivity ROW", swrow);
            if (swrow.SNECONSTRAINT) {
                //log.debug("_GetAltCSSClassForActivity SNE DATE: {}", new Date(swrow.SNECONSTRAINT));
                if (row['startTime'] < swrow.SNECONSTRAINT) {
                    cls = "skd-InvalidSkillMap";
                    //log.debug("_GetAltCSSClassForActivity START: {}", cls, row[cols.STARTTIME], swrow.SNECONSTRAINT );
                    return cls;
                }

            }
            if (swrow.FNLCONSTRAINT) {
                //log.debug("_GetAltCSSClassForActivity FNL DATE: {}", new Date(swrow.SNECONSTRAINT));
                if (row['endTime'] > swrow.FNLCONSTRAINT) {
                    cls = "skd-InvalidSkillMap";
                    //log.debug("_GetAltCSSClassForActivity END: {}", cls, row[cols.ENDTIME], swrow.FNLCONSTRAINT );
                    return cls;
                }
            }
            if (swrow.REPLOCSTARTDATE) {
                //log.debug("_GetAltCSSClassForActivity SNE DATE: {}", new Date(swrow.REPLOCSTARTDATE));
                if (row['startTime'] < swrow.REPLOCSTARTDATE) {
                    cls = "skd-InvalidSkillMap";
                    //log.debug("_GetAltCSSClassForActivity START: {}", cls, row[cols.STARTTIME], swrow.REPLOCSTARTDATE );
                    return cls;
                }

            }
            if (swrow.REPLOCFINISHDATE) {
                //log.debug("_GetAltCSSClassForActivity FNL DATE: {}", new Date(swrow.REPLOCFINISHDATE));
                if (row['endTime'] > swrow.REPLOCFINISHDATE) {
                    cls = "skd-InvalidSkillMap";
                    //log.debug("_GetAltCSSClassForActivity END: {}", cls, row[cols.ENDTIME], swrow.REPLOCFINISHDATE );
                    return cls;
                }
            }
        },

        getVisibleStartDate: function () {
            var scrollLeft = this.grid.GetScrollLeft(2);
            var pt = scrollLeft;
            var date = this.grid.GetGanttDate(pt, "G");
            log.debug("Gantt Date: " + date);
            return date;
        },

        getVisibleMidDate: function () {
            var wid = this.grid.GetBodyWidth(2);
            var scrollLeft = this.grid.GetScrollLeft(2);
            var pt = scrollLeft + (wid/2);
            var date = this.grid.GetGanttDate(pt, "G");
            //log.debug("getVisibleMidDate: left: {}, width: {}, point: {}, date: {}, utc: {}", scrollLeft, wid,pt, date, new Date(date).toUTCString());
            return date;
        },

        escape: function (unsafe) {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        },

        OnGetGanttSideHtml: function (/*TGrid*/ grid, /*TRow */row, /*string */col, /*int */width, /*int */comp, /*int */crit, /*int */plan, /*int */index, /*string */txt, /*int */side) {
            //log.debug("Side Html Called");
            // side 1=left, 2=right
            if (side == 1 && row && row.mxLeftIconClass) {
                var tip = row.mxLeftIconTip;
                if (tip) {
                    tip = ' title="' + this.escape(tip) + '"';
                }
                var onclick = "";
                if (row.mxLeftIconClick) {
                    onclick = " style='cursor: pointer;' onclick='window[\"" + this.gridId + "_SideIconClicked\"](this, \"" + row.id + "\", \"" + row.mxLeftIconClick + "\")' ";
                }
                return "<i class=\"skd-icon-left " + row.mxLeftIconClass + "\" " + tip + onclick + ">&nbsp;</i>";
            } else if (side == 2 && row && row.mxRightIconClass) {
                var tip = row.mxRightIconTip;
                if (tip) {
                    tip = ' title="' + this.escape(tip) + "'";
                }
                var onclick = "";
                if (row.mxRightIconClick) {
                    onclick = " style='cursor: pointer;' onclick='window[\"" + this.gridId + "_SideIconClicked\"](this, \"" + row.id + "\", \"" + row.mxRightIconClick + "\")' ";
                }
                return "<i class=\"skd-icon-right " + row.mxRightIconClass + "\" " + tip + onclick + ">&nbsp;</i>";
            }
            return null;
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
                } else if (col == 'name') {
                    // log.debug("ROW MODIFIED: {}", row['_UNCOMMITTED']);
                    if (row['_UNCOMMITTED']) {
                        return 'skd-modified';
                    }
                }
            }
        },

        OnGetGanttRunHtml: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*object*/ run, /*int*/ index, /*string*/ text, /*int*/ width, /*int*/ left, /*int*/ maxwidth, /*string[]*/ cls) {
            //log.debug("RUN: ", run);
            var row = this.GetRowById(run[index][5]);
            if (row != null) {
                if (run[index].length >= 9) {
                    var errFlag = run[index][8]; // Top shifted, means error
                    // log.debug('RUN: ', run[index]);
                }
                //log.debug("RUN ROW: ", row);
                return this.OnGetGanttBarHtml(grid, row, col, /*width*/null, /*comp*/null, /*crit*/ null, /*plan*/ null, /*index*/ null, text, /*left*/ null, /*maxWidth*/null, cls, errFlag);
            }
        },

        OnGetGanttRunSideText: function (/*TGrid*/ grid, /*TRow */row, /*string */col, /*object */run, /*int */index, /*string */text, /*int */width, /*int */side) {
        	if (run[index][5] != undefined) {
                var row = this.GetRowById(run[index][5]);
                if (row != null) {
                    return this.OnGetGanttSideHtml(grid, row, col, width, null, null, null, index, text, side);
                }
        	}
        },

        GetRowById: function (id) {
            var row = this.grid.GetRowById(id);
            if (!row && id.charAt(0)=='R') {
                row = this.grid.GetRowById(id.substring(1));
            }
            return row;
        },

        /**
         * Used to resolve the 'real' row in case the current row/col is a RunBar, and we want the row of the actual Acttivity item.
         */
        GetRow: function (/*TGrid*/grid, /*TRow*/row, /*String*/col, x, y) {
            if (col != 'G') return row;

            var objs = grid.GetGanttXY(row, col, x, y);
            if (objs != null && objs.Type != null) {
                // console.log("We Have a TIP FOR GANTT", objs);
                if (objs.RunId) {
                    // we have RunBar, look up the actual row with data
                    return this.GetRowById(objs.RunId);
                }
            }

            return row;
        },

        _newTreeGridOptions: function () {
            var me = this;
            var options = {
                Data: {Url: me.toUrl('async_load_gantt_project', me._ioOptions({})), Timeout: 300},
                Layout: {
                    Url: me.toUrl('async_load_gantt_project_ui', me._ioOptions({
                        appname: me.appname,
                        projectid: me.projectid
                    }))
                }
            };
            return options;
        },


        //apply color to resources with multiskill
        _applyMultiSkill: function (grid, resourceSetList) {

            var me = this;

            this._removeRowColor(grid);

            log.debug('_applyMultiSkill', resourceSetList);

            var resourceListMatch = resourceSetList[0];
            var resourceListNotMatch = resourceSetList[1];

            if (resourceListMatch && resourceListMatch.length > 0) {
                for (var i = 0; i < resourceListMatch.length; i++) {
                    var row = me.GetRowById(resourceListMatch[i]);
                    if (row.Color) row._OldColor = row.Color;
                    row.Color = '#64d9e7';
                    row._MultiSkill = true;
                    grid._MultiSkillRows.push(row);
                    this.grid.RefreshRow(row);
                }
            }

            if (resourceListNotMatch && resourceListNotMatch.length > 0) {
                for (var i = 0; i < resourceListNotMatch.length; i++) {
                    var row = me.GetRowById(resourceListNotMatch[i]);
                    if (row.Color) row._OldColor = row.Color;
                    row.Color = '#bceef4';
                    row._MultiSkill = true;
                    grid._MultiSkillRows.push(row);
                    this.grid.RefreshRow(row);
                }
            }
        },


        //remove row color
        _removeRowColor: function (grid) {
            // var rows = this.grid.Rows;
            if (!grid._MultiSkillRows) grid._MultiSkillRows = [];
            var rows = grid._MultiSkillRows;
            if (!rows || rows.length == 0) {
                return;
            }

            log.debug('{}:_removeRowColor begin', this.TAG);

            for (var i in rows) {
                var row = rows[i];
                if (row && row.Kind == 'Data') {
                    delete row._MultiSkill;
                    if (!row._OldColor) {
                        delete row.Color;
                    } else {
                        row.Color = row._OldColor;
                        delete row._OldColor;
                    }
                    this.grid.RefreshRow(row);
                }
            }
            grid._MultiSkillRows = [];
            log.debug('{}: _removeRowColor end', this.TAG);
        },

        /**
         * Apply an action (function) to each row in the rows array
         */
        _applyForEachRow: function (rows, action) {
            if (rows == null || action == null) {
                log.error('_applyForEach requires a valid array of rows and action function');
            }
            for (var i = 0; i < rows.length; i++) {
                var args = [];
                args.push(rows[i]);
                if (arguments.length > 2) {
                    for (var j = 0; j < arguments.length; j++) {
                        args.push(arguments[j]);
                    }
                }
                action.apply(this, args);
            }
        },

        /**
         * generic function that is used to apply a function to the given row, and apply the function recursively
         * to the row's child elements, if any.  If the function returns false the processing stops.
         */
        _applyToRow: function(row, state, func) {
            var me=this;
            if (!row) return true;
            if (func(row, state)) {
                if (row.firstChild) {
                    row=row.firstChild;
                    while (row!=null) {
                        if (!me._applyToRow(row, state, func)) {
                            return false;
                        }
                        row=row.nextSibling;
                    }
                }
                return true;
            }
            return false;
        },

        /**
         * Apply the Array of changes to existing rows
         */
        _applyChanges: function (items) {
            if (items == null) return; // nothing to do

            var me = this;
            array.forEach(items, function (item) {
                log.debug("ITEM: ", item);
                var row = me.GetRowById(item.id);
                if (row) {
                    array.forEach(Object.keys(item), function (k) {
                        if (k != 'id') {
                            row[k] = item[k]
                            log.debug("Setting {} = {}", k, item[k]);
                        }

                    });

                    me.grid.RefreshRow(row);
                    log.debug("_applyChanges: {}", row, row["_ASSIGNMENTDELETED"]);
                    if (row["_ASSIGNMENTDELETED"] === true) {
                        me.grid.DeleteRow(row, 2);
                    }
                    if (row["_OBJECTNAME"] == 'PM' && ( row["ALLSEGMENTSMOVABLE"] == '0' || row["ALLSEGMENTSMOVABLE"] == 'N' || row["ALLSEGMENTSMOVABLE"] == false)) {
                        row.Color = this._pmreforecastpendingBG;
                    }
                }
            });
            me.Refresh(255);
        },

        Refresh: function (val) {
            // val=16+1; // update UI + ganttlines
            log.debug("{}: BEGIN RefreshGantt: {}", this.TAG, val);
            if (this.grid)
                this.grid.RefreshGantt(val);
            log.debug("{}: END RefreshGantt: {}", this.TAG, val);
        },

        RefreshLater: function (val) {
            var me = this;
            this.invokeLater(lang.hitch(this, function() {
                me.Refresh(val);
            }), 100, "refresh_later");
        },


        /**
         * Visit a row, and all child rows recursively.  For each row, func will called with the row being
         * visited and the state object.
         * @param row parent row on which to start visiting
         * @param state object that is passed to each row
         * @param func function to apply to the row.  if it returns false, then processing stops.
         * @returns {boolean} true if processing should continue
         */
        visitRow: function(row, state, func) {
            var me=this;
            if (!row) return true;
            if (func(row, state)) {
                if (row.firstChild) {
                    row=row.firstChild;
                    while (row!=null) {
                        if (!me.visitRow(row, state, func)) {
                            return false;
                        }
                        row=row.nextSibling;
                    }
                }
                return true;
            }
            return false;
        },


        /**
         * Visit a visible row, and all child visible rows recursively.  For each row, func will called with the row being
         * visited and the state object.
         * @param row parent row on which to start visiting
         * @param state object that is passed to each row
         * @param func function to apply to the row.  if it returns false, then processing stops.
         * @returns {boolean} true if processing should continue
         */
        visitVisibleRow: function(row, state, func) {
            var me=this;
            if (!row) return true;
            if (!state.allRows) {
            	state.allRows = [];
            }
            if (state.allRows.includes(row.id)) {
            	return false;
            }
            state.allRows.push(row.id);
            if (func(row, state)) {
                row = me.grid.GetFirstVisible(row);
                while (row) {
                    if (!me.visitVisibleRow(row, state, func)) {
                        return false;
                    }
                    row=me.grid.GetNextSiblingVisible(row);
                }
                return true;
            }
            return false;
        },

        /**
         * Visits all visble rows in this Gantt
         *
         * @param state
         * @param func
         * @returns {*|boolean}
         */
        visitVisibleChiden: function(state, func) {
            return this.visitVisibleRow(this.grid.Body.firstChild.firstChild, state, func);
        },
        
        __refreshAssignment: function (data) {
        	var reply = data;
        	if (typeof data === 'string') {
        		reply = json.parse(data);
        	}
        	if (reply && reply.Changes && reply.Changes.length) {
        		var changes = reply.Changes;
        		this.grid.AddDataFromServer(reply);
        		for (var i=0; i<changes.length; i++) {
        			var assignmentRow = changes[i];
        			var newRow = this.grid.GetRowById(assignmentRow['id']);
        			if (newRow != null) {
        				if (assignmentRow['_INTERNALSTATUS'] != null)
        				{
        					newRow['_INTERNALSTATUS'] = assignmentRow['_INTERNALSTATUS'];
        					newRow['STATUS'] = assignmentRow['STATUS'];
        				}
    					
    					newRow['_OBJECTNAME'] = assignmentRow['_OBJECTNAME'];
    					newRow['WORKLOG'] = assignmentRow['WORKLOG'];
    					newRow['WOPRIORITY'] = assignmentRow['WOPRIORITY'];
    					newRow['TARGSTARTDATE'] = assignmentRow['TARGSTARTDATE'];
    					newRow['TARGCOMPDATE'] = assignmentRow['TARGCOMPDATE'];
    					
    					newRow['mxRightIconClass'] = assignmentRow['mxRightIconClass'];
    					newRow['mxRightIconClick'] = assignmentRow['mxRightIconClick'];
    					if (assignmentRow['TASKID'] != null)
    						newRow['TASKID'] = assignmentRow['TASKID'];
    					newRow['APPTREQUIRED'] = assignmentRow['APPTREQUIRED'];
    					if (assignmentRow['MXDURATION'] != null)
    						newRow['MXDURATION'] = assignmentRow['MXDURATION'];
    					if (assignmentRow['_OBJECTNAME'] !=null && assignmentRow['_OBJECTNAME']==="ASSIGNMENT")
    					{
    						newRow['_ASSIGNMENTID'] = assignmentRow['_ASSIGNMENTID'];
    						newRow['ISASSIGNMENT'] = assignmentRow['ISASSIGNMENT'];
    						newRow['_ASSIGNMENTCREW'] = assignmentRow['_ASSIGNMENTCREW'];
    						newRow['_ASSIGNMENTCREWTYPE'] = assignmentRow['_ASSIGNMENTCREWTYPE'];
    						newRow['_ASSIGNMENTSKILL'] = assignmentRow['_ASSIGNMENTSKILL'];
    						newRow['_ASSIGNMENTCRAFT'] = assignmentRow['_ASSIGNMENTCRAFT'];
    						newRow['_ASSIGNMENTLABOR'] = assignmentRow['_ASSIGNMENTLABOR'];
    					}
    					
    					if (assignmentRow['_Resources'] != null)
    						newRow['_Resources'] = assignmentRow['_Resources'];
    					if (assignmentRow['_WorkDay'] != null)
    						newRow['_WorkDay'] = assignmentRow['_WorkDay'];
    					if (assignmentRow['ORGID'] != null)
    						newRow['ORGID'] = assignmentRow['ORGID'];
    					newRow['GGanttBackground'] = assignmentRow['GGanttBackground'];
                    	newRow['IsSummary'] = assignmentRow['IsSummary'];
                    	newRow['ERRVAL'] = assignmentRow['ERRVAL'];
    					this.grid.RefreshRow(newRow);

    					if (this.appname != null && this.appname == 'schedacm') {
    						this.SetValue(newRow, 'startTime', newRow['startTime'], true);
    						this.SetValue(newRow, 'endTime', newRow['endTime'], true);
    	                    this.SetValue(newRow, '_UNCOMMITTED', 1, true);
    	                }
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
            	this.grid.RefreshGantt(1);
                if (this.appname != null && this.appname != 'rlassign') {
                	this.grid.ClearSelection();
                }
                this.sendToBeSaved();
        	}
        },

        OnGetHtmlValue: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*type*/ val) {
        	if (col == 'name' && row['_UNCOMMITTED'] && row['_UNCOMMITTED'] == 1) {
        		return '* ' + val;
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

        	if (grid.Cols['G'] && grid.Cols['G'].GanttZoom) {
        		var currentZoom = grid.Cols['G'].GanttZoom;
        		var selectedZoom = grid.GanttZoom.filter(function(zoomLevel) {
        			  return zoomLevel.Name.includes(currentZoom);
        		});
        		if (selectedZoom.length > 0 && selectedZoom[0].GanttBackground) {
        			if (row['GGanttBackground']) {
        				delete row['GGanttBackground'];
        				this.RefreshGantt = true;
        			}
        			return color;
        		}
        	}
        	
        	if (!this.ganttBackground && grid.Cols['G'].GanttBackground) {
        		var ganttBackground = grid.Cols['G'].GanttBackground;
        		this.ganttBackground = ganttBackground.split('White').join('WORKAlternate');
        	}

        	if (col == 'name' && !color && row && this.ganttBackground && row['_DATAGROUPNAME']) {
        		if (!row['GGanttBackground'] || row['GGanttBackground'] != this.ganttBackground) {
        			row['GGanttBackground'] = this.ganttBackground;
        			this.RefreshGantt = true;
        		}
        	}

        	return color;
        },

        OnRenderPageFinish: function (/*TGrid*/ grid, /*TRow*/ row) {
        	if (this.RefreshGantt) {
        		delete this.RefreshGantt;
        		grid.RefreshGantt(1);
        	}
        }
    });
});

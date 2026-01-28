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
    "dojo/aspect",
    "dojo/_base/declare",
    "com/ibm/tivoli/maximo/miniapps/_MaximoIO",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
    "dojo/_base/lang",
    "ibm/miniapp/scheduler/gantt/GanttWidget",
    "ibm/miniapp/scheduler/gantt/BaseResourceViewWidget",
    "ibm/miniapp/scheduler/gantt/CommonResourceHoursView",
    "com/ibm/tivoli/maximo/miniapps/Handlers"

], function (aspect, declare, _MaximoIO, log, lang, GanttWidget,
             BaseResourceViewWidget, CommonResourceHoursView, Handlers) {
    return declare([GanttWidget, _MaximoIO, BaseResourceViewWidget, CommonResourceHoursView, Handlers], {
        constructor: function (options) {
            // super is called automatically, apparently
            log.debug("{} Base Bean Target set to {} for view", this.gridId, this.mxtargetbean, options);
            this.showCurrentDateLine=false;
            this.linkedWorkViewGrid=null;
            this.linkedWorkView=null;
            this.aspectShowHideElHandle=null;
            this.RefreshIcon = null;
            this.lastStart=-1;
            this.lastEnd=-1;

            // PDF export
            this.PDFSource = "ExportPDF.html"
            this.Layoutxml = null;
            this.Dataxml = null;
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

        onVisibilityChanged: function(visible) {
            log.debug("Visibility Has Changed: Visible: {}", visible );
            if (visible) {
                this._updateSync();
                this.onUpdateResourceViewRequested();
            } else {
                log.debug("Disabling Grid Sync");
                this.grid.SyncId=null;
                this.lastStart=-1;
                this.lastEnd=-1;
            }
        },

        _newTreeGridOptions: function (start, end) {
            start = start || -1;
            end = end  || -1;

            this.lastStart=start;
            this.lastEnd=end;

            var me = this;
            var options = {
                Data: {Url: me.toUrl('async_load_project_data', {start: start, end: end}), Timeout: 300},
                Layout: {
                    Url: me.toUrl('async_load_project_ui', me._ioOptions({
                        appname: me.appname,
                        projectid: me.projectid
                    }))
                }
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
            me.Dataxml = me.toUrl('async_load_project_data', me._ioOptions({start: this.startDate, end: this.endDate}));
            
            return options;
        },

        addCustomActions:function(gridId) {
        },

        upgradeTGInstance: function(grid) {
            this.inherited(arguments);

            // add please wait dialog function
            this.grid._printToPDF = lang.hitch(this, this._printToPDF);
            this.grid._showLoadAvailNumbersAction = lang.hitch(this, this._showLoadAvailNumbersAction);
            this.grid._hideLoadAvailNumbersAction = lang.hitch(this, this._hideLoadAvailNumbersAction);
        },
        
        attachExtraGridEvents: function (gridId) {
            this.inherited(arguments);
            log.debug('{} Registering extra grid events', this.TAG);
            this.subscribeOn('skd.workview.updated', lang.hitch(this, this.onWorkViewChanged));
            this.subscribeOn('skd.max.update.resourceview', lang.hitch(this, this.onUpdateResourceViewRequested));
            this.subscribeOn('skd.response.workview.reference', lang.hitch(this, this.onWorkViewReferenceReceived));

            AddEvent('OnZoom', gridId, lang.hitch(this, this.OnZoomChanged));
            AddEvent('OnScroll', gridId, lang.hitch(this, this.OnScrollChanged));
            AddEvent('OnUpdated', gridId, lang.hitch(this, this.DisableRefresh));
            AddEvent('OnExport', gridId, lang.hitch(this, this.OnExport));
        },

        OnExport: function(grid, data, pdf) {
        	if (pdf == 1) {
        		var url = this.servletBase + "/utility/tg/ExportPdf.jsp";
        		var servletUIBase = this.servletBase.replace('/webclient', '');
        		var layoutXML = this.Layoutxml;
        		var dataXML = this.Dataxml;
        		if (this.pdfExportBaseUrl) {
        			layoutXML = layoutXML.replace(servletUIBase, this.pdfExportBaseUrl);
        			dataXML = dataXML.replace(this.servletBase, this.pdfExportBaseUrl);
        		}
        		layoutXML = encodeURIComponent(layoutXML);
        		dataXML = encodeURIComponent(dataXML);
        		data = encodeURI(data);
        		var scheduleName = encodeURI(this.projectName);
        		var PrintPageWidth = Math.round(grid.PrintPageWidth*25.4/grid.PrintDPI+grid.PrintMarginWidth);
        		var PrintPageHeight = Math.round(grid.PrintPageHeight*25.4/grid.PrintDPI+grid.PrintMarginHeight);
        		url = url + "?PDFName=" + grid.PDFName + "&PDFFormat=" + grid.PDFFormat + "&Data=" + data + "&PDFPageOrientation=" + grid.PrintPageOrientation;
        		url = url + "&PrintMarginWidth=" + grid.PrintMarginWidth + "&PrintMarginHeight=" + grid.PrintMarginHeight + "&PrintDPI=" + grid.PrintDPI;
        		url = url + "&PDFPageSize=" + grid.PrintPageSize + "&Layoutxml=" + layoutXML + "&Dataxml=" + dataXML + "&Source=" + this.PDFSource;
        		url = url + "&ProjectName=" + scheduleName + "&PrintPageWidth=" + PrintPageWidth + "&PrintPageHeight=" + PrintPageHeight;
        		url = url + "&PDFFitPage=" + grid.PDFFitPage;
        		var xhr = new XMLHttpRequest();
        		xhr.open("POST", url, true);
        		xhr.send(null);
        		this.ShowProgress(grid, 90, 30, 500);
        		return true;
        	}
        	else {
        		return false;
        	}
        },
        
        OnScrollChanged: function(/*TGrid*/ grid, /*int*/ hpos1, /*int*/ vpos, /*int*/ oldhpos1, /*int*/ oldvpos, /*int*/ hpos0, /*int*/ oldhpos0, /*int*/ hpos2, /*int*/ oldhpos2) {
            this.OnZoomChanged();
        },

        OnZoomChanged: function() {
            if (this.lastStart==-1 || this.lastEnd==-1) return; // just ignore if we don't have a date set, yet.
            if (!this.linkedWorkView) return; // we are not linked to a work view, yet.
            // not fully adjusted, yet
            this.invokeLater(lang.hitch(this, this._OnZoomChanged),200,"zoomed");
        },

        _OnZoomChanged: function() {
            this.grid.MidWidth = this.linkedWorkViewGrid.GetBodyWidth(1);
        	var workRange = this.linkedWorkView.getVisibleRange();
            var vis = this.getVisibleRange();
            log.debug("START DATE: {}", new Date(this.grid.GetGanttDate(0,"G")));
            log.debug("WORK RANGE: {} -> {} [SCROLL: {}]", new Date(workRange.start), new Date(workRange.end), this.linkedWorkView.grid.GetScrollLeft(2));
            log.debug("RESV RANGE: {} -> {} [SCROLL: {}]", new Date(vis.start), new Date(vis.end), this.grid.GetScrollLeft(2));
            log.debug("LAST RANGE: {} -> {}", new Date(this.lastStart), new Date(this.lastEnd));
            if (vis.start < this.lastStart  || vis.end > this.lastEnd) {
                var delta = Math.abs(this.lastStart - vis.start) / this.getMillisecondsFerPixel();
                if (delta > 10) {
                    // allow a refresh due to ZoomOut changes
                    this.EnableRefresh();
                }
            }
        },

        showResourceForDateRange: function (startDate, endDate, msg) {
            try {
                log.debug("Requesting resource information: start: {}, end: {}", new Date(startDate), new Date(endDate), msg);
                var options = this._newTreeGridOptions(startDate, endDate);
                this.grid.Data.Data.Url = options.Data.Url;
                this.grid.ShowMessage(this.label('loading_resources'), 10);
                var me=this;
                this.grid.ReloadBody(function() {
                    me._updateSync();
                    me.grid.HideMessage();
                });
            } catch (e) {
                log.error("Refresh Failed", e);
            }
        },

        updateResources: function(dataFromServer) {
            log.debug("Updating Resources", dataFromServer);
        },

        onWorkViewReferenceReceived: function(msg) {
            log.debug("Got a Work View Reference'", msg);
            if (msg.grid) {
                this.linkedWorkViewGrid=msg.grid;
                this.linkedWorkView=msg.view;
                this.onUpdateResourceViewRequested(this.getVisibleRangeForGrid(msg.grid));
            }
        },

        REFRESH_RESOURCESAction: function() {
            log.debug("REFRESH RESOURCES CALLED");
            this.onUpdateResourceViewRequested();
        },

        onUpdateResourceViewRequested: function(msg) {
            if (!this.isVisible()) {
                log.debug("We are not visible:  Ignoring request to update.");
                return;
            }

            this.DisableRefresh();
            
            // if we have start/end, then fetch resources
            if (msg && msg.start && msg.end) {
                this.showResourceForDateRange(msg.start, msg.end, msg);
                return;
            }

            // if we are already linked to workview, then use it.
            if (this.linkedWorkView) {
                this.onUpdateResourceViewRequested(this.linkedWorkView.getVisibleRange());
                return;
            }

            // we don't have a grid reference, so find one...
            this.publishTo('skd.request.workview.reference', null);
        },

        onWorkViewChanged: function (grid, result) {
            if (!this.isVisible()) {
                log.debug("We are not visible:  Ignoring request to update.");
                return;
            }
            // grey out the view
            this.EnableRefresh();
        },

        EnableRefresh: function() {
            log.debug("Enabling Refresh");
            //console.log(new Exception());
            this.grid.Toolbar.REFRESH_RESOURCESDisabled=0;
            this.grid.RefreshRow(this.grid.Toolbar);
        },

        DisableRefresh: function() {
            log.debug("Disabling Refresh.");
            this.grid.Toolbar.REFRESH_RESOURCESDisabled=1;
            this.grid.RefreshRow(this.grid.Toolbar);
        },

        _getRefreshIcon: function () {
            if (this.RefreshIcon) return this.RefreshIcon;

            var nodes = this.grid.Toolbar.r1.querySelectorAll('.COToolHtmlIcon');
            for (var i=0;i<nodes.length;i++) {
                var attr = nodes[i].getAttribute("onmousedown");
                if (attr && attr.indexOf("REFRESH_RESOURCES")>=0) {
                    this.RefreshIcon = nodes[i];
                    break;
                }
            }

            return this.RefreshIcon;
        },

        /**
         * In Scheduler Resource, after Toolbar Save, we don't want to refresh the items
         * @param data
         */
        onRefreshRequested: function(data) {
            if (!this.isVisible()) {
                log.debug("We are not visible:  Ignoring request to update.");
                return;
            }

            if ((data && data.sourceId && data.sourceId.indexOf('_SAVE')!=-1) || 
            		(data && data.sourceId && data.sourceId.indexOf('schedacm')!=-1)) {
                log.warn("Refresh Ignored because of Toolbar Save", data);
            } else {
                this.inherited(arguments);
            }
        },

        __OnNewGridRegistered: function (data) {
        },

        _printToPDF: function () {
        	this.grid.ActionExportPDF();
        },

        ShowProgress: function(grid, total, position, timeout) {
        	var me = this;
    		setTimeout(function () {
    			grid.ShowProgress('Export PDF', 'Preparing Print job...', null, position, total);
    			if (position >= total) {
    				grid.ShowMessageTime('Print job submitted.', 2000);
    			}
    			else {
    				position = position + 30;
    				me.ShowProgress(grid, total, position, timeout);
    			}
            }, timeout);
        },

        _showLoadAvailNumbersAction: function() {
        	this.showLoadAvailNumbers = 1;
            this.grid.ShowMessage(this.label('loading_resources'), 10);
            var me=this;
            this.grid.ReloadBody(function() {
                me.grid.HideMessage();
            });

        },

        _hideLoadAvailNumbersAction: function() {
        	this.showLoadAvailNumbers = 0;
            this.grid.ShowMessage(this.label('loading_resources'), 10);
            var me=this;
            this.grid.ReloadBody(function() {
                me.grid.HideMessage();
            });
        }
    });
});

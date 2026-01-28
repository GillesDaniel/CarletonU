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
    "com/ibm/tivoli/maximo/miniapps/Handlers"

], function (declare, aspect, _MaximoIO, log, lang, GanttWidget,
             Handlers) {
    return declare([GanttWidget, _MaximoIO, Handlers], {
        constructor: function (options) {
            this.linkedWorkView = null;
            this.linkedWorkViewGrid = null;
            this.reloadRequired=false;
            var me = this;

        	this.aspectAfterResize =  aspect.after(me, 'resize', function(eventtype) {
        	    try {
        	    	me._updateGanttPosition();
                } catch (e) {
        	        log.debug("Scheduler encountered and error before resize", e);
                }
            });

        	// All actions that required Resource chart to be reloaded, when Gantt chart is reloaded.
        	this.actions = ["REFRESH", "REFRESHALL", "COMMIT", "COMMITCONSTRAINTS", "VMAINSNRIO", "selectrecord", 
        		"longopcheck", "RECALPC", "MOVETODFLT", "SWSCEN", "cps_optmz", "publish", "scenariocps", "ROLLPRJ", 
        		"PRJCALCRON", "CALCCOST", "snapshot", "reslevel_optmz", "capplan_optmz", "scenariom", "scenarior", 
        		"scenarioc", "manresults", "odmerunreport", "msgbox", "PREVIOUS", "NEXT", "UPDSUM",
        		"schacm_workview_viewermax_miniapp-miniapp_miniapp", "toBeSaved"];
        },
        
        destroy: function() {
        	if (this.aspectAfterResize) this.aspectAfterResize.remove();
        },

        attachExtraGridEvents: function (gridId) {
            this.inherited(arguments);
            log.debug("Listening for Linked WorkView to be destroyed");
            this.subscribeOn('skd.workview.destroyed', lang.hitch(this, this._onLinkedViewDestroyed));
        },

        _onLinkedViewDestroyed: function() {
            log.debug("{}: Destroying our Resource view, since, the WorkView is destroyed", this.TAG);
            // remove the old grid, so that it doesn't start reacting to events from the "new" grid, until we are ready.
            this._removeOldGrid();
            log.debug("{}: Destroyed our Resource view", this.TAG);
        },

        _applyScheduleWindow: function (grid, row) {
            // do nothing
        },

        _updateGanttLines: function() {
            // do nothing
        },

        onSideNavResized: function() {
            log.debug("Resource View: Side Nav Changed");
            this.invokeLater(lang.hitch(this, this._updateSync),100,"resize");
        },

        resize: function() {
            if (!this.isVisible()) return;
            this.inherited(arguments);
            this.invokeLater(lang.hitch(this, this._updateSync),100,"resize");
        },

        OnRenderFinish: function (/*TGrid*/ grid) {
            this.inherited(arguments);
            log.debug("{} Load View Render Fishined, Sending Post Render Events", this.TAG);

            grid.HideCol('_resizer');
            grid.ShowCol('_resizer');

            this.invokeLater(lang.hitch(this, this._updateSync), 100, 'renderfinish');
        },

        OnDblClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            this.OnDblClick_ZoomToResourceLoadAvail(grid, row, col, x, y, event);
        },

        _updateGanttPosition: function () {
            if (!this.isVisible()) return;

            log.debug("{}: Resource View Sync", this.TAG);

            if (this.reloadRequired) {
                this.reloadRequired=false;
                this._createUI(); // remove the old grid and create new one
                return;
            }

            if (this.linkedWorkView) {
                if (this.linkedWorkViewGrid.Rendering || this.linkedWorkViewGrid.Loading || this.grid.Rendering || this.grid.Loading) {
                    log.debug("Resource View is waiting for Work View to complete it's Rendering...");
                    this.invokeLater(lang.hitch(this, this._updateGanttPosition), 100, "resourceRender");
                    return;
                }

                var me = this;
                var nG = this.grid.Cols['G'];
                var oG = this.linkedWorkViewGrid.Cols['G'];
                nG.GanttZoom=oG.GanttZoom;
                nG.GanttZoomDate=oG.GanttZoomDate;
                nG.GanttZoomDateAlign=oG.GanttZoomDateAlign;
                nG.GanttZoomChange=oG.GanttZoomChange;
                nG.GanttZoomFit=oG.GanttZoomFit;
                nG.GanttZoomFitWidth=oG.GanttZoomFitWidth;

                var visRange = this.linkedWorkView.getVisibleRange();
                this.grid.ZoomTo(visRange.start, visRange.end);      
            
                // This function call will make sure that top and bottom grids have their visible ranges in sync.
                /*
                this.invokeLater(lang.hitch(this, function() {
                	me.linkedWorkViewGrid.Render();
                }), 100, "workRender");
                */

                log.debug("Grid Sync Set to {}", this.grid.SyncId);
            } else {
                log.debug("No Registered Linked Work View yet. Resource section position update skipped.");
            }
        },

        _updateSync: function() {
            if (!this.isVisible()) return;

            log.debug("{}: Resource View Sync", this.TAG);

            if (this.reloadRequired) {
                this.reloadRequired=false;
                this._createUI(); // remove the old grid and create new one
                return;
            }

            if (this.linkedWorkView) {
                if (this.linkedWorkViewGrid.Rendering || this.linkedWorkViewGrid.Loading || this.grid.Rendering || this.grid.Loading) {
                    log.debug("Resource View is waiting for Work View to complete it's Rendering...");
                    this.invokeLater(lang.hitch(this, this._updateSync), 100, "resourceRender");
                    return;
                }

                var nG = this.grid.Cols['G'];
                var oG = this.linkedWorkViewGrid.Cols['G'];

                /*
                 * This is needed to avoid repositioning the Gantt without any zoom changes,
                 * after dropping work bars.
                 */
                if (nG.GanttZoom == oG.GanttZoom 
                	&& nG.GanttZoomDate == oG.GanttZoomDate
					&& this.grid.LeftWidth == this.linkedWorkViewGrid.GetBodyWidth(0)
					&& this.grid.RightWidth == this.linkedWorkViewGrid.GetBodyWidth(2))
                {
                	return;
                }

                this.domNode.style.width=this.linkedWorkView.domNode.offsetWidth+'px';

                this.grid.SyncId = null;

                this.grid.LeftWidth=this.linkedWorkViewGrid.GetBodyWidth(0);
                this.grid.MidWidth=this.linkedWorkViewGrid.GetBodyWidth(1);
                this.grid.RightWidth=this.linkedWorkViewGrid.GetBodyWidth(2);
                this.grid.SetScrollLeft(this.linkedWorkViewGrid.GetScrollLeft(2),2);
                this.grid.Cols['G'].Width = this.linkedWorkViewGrid.Cols['G'].Width;
                this.grid.Cols['_gresizer'].Width = this.linkedWorkViewGrid.Cols['_gresizer'].Width;

                this.grid.SyncId = this.linkedWorkViewGrid.SyncId;
                this.grid.Update();
                this.grid.UpdatePos();

                var data = {view: this};
                if (this.linkedWorkView._onChildSizeUpdate) {
                	this.linkedWorkView._onChildSizeUpdate(data);
                }
                log.debug("Grid Sync Set to {}", this.grid.SyncId);
                this.invokeLater(lang.hitch(this, this._updateGanttPosition), 100, "resourceRender");
            } else {
                log.debug("No Registered Linked Work View.  Update Sync Ignored.");
                this.publishTo('skd.request.workview.reference', null);
            }
        },

        _removeOldGrid: function() {
            this.inherited(arguments);

            log.debug("{}: removing old grid reference", this.TAG);
            this.linkedWorkViewGrid=null;
            this.linkedWorkView=null;
        },

        /**
         * In Scheduler Resource, after Toolbar Save, we don't want to refresh the items
         * @param data
         */
        onRefreshRequested: function(data) {
        	if ((data.type && this.actions.includes(data.type)) || (data.targetId && this.actions.includes(data.targetId)))
        	{
        		this.reloadRequired = true;
        	}
        	
        	if (data && data.sourceId && data.sourceId.indexOf('schedacm')!=-1 && data.type && data.type.indexOf('SAVE')!=-1) {
        		this.reloadRequired = true;
        	}
            if (data && data.sourceId && data.sourceId.indexOf('_SAVE')!=-1) {
            	log.warn("Refresh Ignored because of Toolbar Save", data);
            }
            else {
                if (this.grid) {
                    this.grid.Disable();
                }
            }
            // Resource Hours will update ONLY when requested from the main Gantt View
        }

    });
});

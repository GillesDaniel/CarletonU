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
            this.ViewName = 'ShowHierarchyView';
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

        MarkToBeSaved: function() {
        }
    });
});

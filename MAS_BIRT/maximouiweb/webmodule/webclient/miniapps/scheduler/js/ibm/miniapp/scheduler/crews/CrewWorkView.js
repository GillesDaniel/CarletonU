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
    "ibm/miniapp/scheduler/gantt/GanttWidget",
    "com/ibm/tivoli/maximo/miniapps/Handlers",
    "dojo/json",
    "ibm/miniapp/scheduler/gantt/WorkView"

], function (declare, _MaximoIO, log, lang, GanttWidget,
             Handlers, json, WorkView) {
    return declare([GanttWidget, _MaximoIO, Handlers, WorkView], {
        constructor: function (options) {
            this.ViewName = 'CrewWork';
        },

        _getTemplate: function() {
            return '{name}';
        },

        /**
         * Used to set the background color for a gantt-bar object
         */
        OnGetGanttBarHtml: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ width, /*int*/ comp, /*int*/ crit, /*int*/ plan, /*int*/ index, /*string*/ txt, /*int*/ left, /*int*/ maxwidth, runErrorFlag) {
            // find the template
            var tpl = this._getTemplate();
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
                var cls = '', altCls1 = '';

                if (row["_INTERNALSTATUS"] && row['_OBJECTNAME']) {
                    cls = "SKD" + row['_OBJECTNAME'] + "_" + row["_INTERNALSTATUS"];
                } else {
                    if (row["_INTERNALSTATUS"]) {
                        cls = "SKD" + row['_INTERNALSTATUS'];
                    } else if (row['_OBJECTNAME']) {
                        cls = "SKD" + row['_OBJECTNAME'];
                    }
                }
                if (row._HAS_ERRORS == true) {
                    cls = "skd-InvalidSkillMap";
                } else {
                    if (runErrorFlag > 0 && row["_INTERNALSTATUS"] == 'ASSIGNED') {
                        cls = "skd-Conflict";
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
                var clses = 'skd-bar skd-crew-bar ' + cls + ' ' + altCls1 + ' ' + altCls + ' ' + readonlyStart + readonlyDur + readonlyAssign + readonly;
                var altclses = 'skd-bar-inner ' + cls + '-inner ' + altCls + '-inner ';
                var barStyle=null;
                if (this.GetBarStyle) {
                    barStyle=this.GetBarStyle(row);
                }
                var bar = '<div class="' + clses + '" style="'+barStyle+'" ><span class="' + altclses + '">' + ((text) ? text : '') + '</span></div>';
                return bar;
            }
        },

        /**
         * Override the Goto Today to make a call to the server
         * @private
         */
        _GotoTodayToolbarAction: function() {
            log.debug("Goto TODAY Crew Override. Sending Request to the server.");
            this.publishPleaseWait();
            // because this is being handled by the APP Bean we need to convert this TG date into the User's TZ
            // before we send
            var date = this._today();
            this.sendMaximoEvent("GOTODAY", {gotoday: ''+date.getFullYear()+"-"+(date.getUTCMonth()+1)+"-"+date.getUTCDate()}, this.appname);
        },

        _GotoSeletedDateActionHandler: function(action, row, date) {
            log.debug("Goto {} Crew Override. Sending Request to the server.", date);
            this.publishPleaseWait();
            // because this is being handled by the APP Bean we need to convert this TG date into the User's TZ
            // before we send.  Calendar picker returns a browser TZ date, so we convert to TG TZ date and then
            // to the user's server TZ date.
            this.sendMaximoEvent("GOTODAY", {gotoday: ''+date.getFullYear()+"-"+(date.getUTCMonth()+1)+"-"+date.getUTCDate()}, this.appname);
        },

        PRE3WKSAction: function(actionItem, row) {
        	this.publishPleaseWait();
        	var me = this;
        	this.fetch("_pre3wks", {}).then(lang.hitch(me, me.processServerResponse));
        },
        
        NEXT3WKSAction: function(actionItem, row) {
        	this.publishPleaseWait();
        	var me = this;
        	this.fetch("_next3wks", {}).then(lang.hitch(me, me.processServerResponse));
        },

        TOGGLEVIEWAction: function(actionItem, row) {
        	this.publishPleaseWait();
        	var me = this;
        	this.fetch("_toggleview", {}).then(lang.hitch(me, me.processServerResponse));
        },

        OnRenderFinish: function (/*TGrid*/ grid) {
            this.inherited(arguments);
            log.debug("{} Load View Render Fishined, Sending Post Render Events", this.TAG);

            // we want to force the zoom into a zoom to fit all bars on every render so that we can ensure that
            // the UI is showing the bars.
            var me=this;
            this.invokeLater(function() {
                log.debug("Adjusting Crew View to Fit");
                var row = me.GetFirstRowWithData();
                if (row) {
                    me.publishTo('skd.ui.zoom-to-fit', row);
                } else {
                    log.warn("Unable to find a row with start/end time??");
                    grid.ActionZoomFit(grid);
                }

            }, 400);
        },

        GetFirstRowWithData: function () {
            var state = {};
            this._applyToRow(this.grid.Body, state, function(row, state) {
                if (row && row.startTime && row.endTime) {
                    state.row=row;
                    // stop processing
                    return false;
                }
                return true;
            });
            return state.row;
        },

        /**
         * NOT USED for crews, so suppress it
         * @param grid
         * @param row
         * @private
         */
        _applyScheduleWindow: function (grid, row) {
        }
    });

});

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
    "ibm/miniapp/scheduler/gantt/BaseResourceViewWidget"

], function (declare, _MaximoIO, log, lang, GanttWidget,
             BaseResourceViewWidget) {
    return declare([GanttWidget, _MaximoIO, BaseResourceViewWidget], {
        constructor: function (options) {
            // super is called automatically, apparently
            log.debug("{} Base Bean Target set to {} for view", this.gridId, this.mxtargetbean, options);

            this.ganttDisableEdit=true;
        },

        addCustomActions: function(gridId) {
            // add ZoomToWork action
            // This is called from the ZoomToWork Toolbar Action
            window.Grids.ZoomToWork = lang.hitch(this, this.ZoomToWork);
        },

        _newTreeGridOptions: function (uid, st, et) {
            startDate = st | 0;
            endDate = et | 0;
            woUniqueId = uid | 0;

            var me = this;
            var options = {
                Data: {
                    Url: me.toUrl('async_load_other_resources', me._ioOptions({
                        wouniqueid: woUniqueId, startdate: startDate, enddate: endDate
                    })), Timeout: 300
                }
            };

            log.debug("{} Grid options", this.gridId, options);
            return options;
        },

        /**
         * Used to set the background color for a gantt-bar object
         */
        OnGetGanttBarHtml: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ width, /*int*/ comp, /*int*/ crit, /*int*/ plan, /*int*/ index, /*string*/ txt, /*int*/ left, /*int*/ maxwidth) {
            return '<div class="skd-bar" style="background-color: ' + row.mxCOLOR + '"><span>' + ((row.mxTEXT) ? row.mxTEXT : '') + '</span></div>';
        },

        attachExtraGridEvents: function (gridId) {
            this.inherited(arguments);
            this.subscribeOn('skd.workview.rowselected', lang.hitch(this, this.workViewRowSelected));
        },

        workViewRowSelected: function (row) {
            log.debug('{} xxx ROWSELECTED', this.TAG, row);
            this.grid.Reload(this._newTreeGridOptions(row['_OBJECTID'], row['startTime'], row['endTime']));

        },

        OnRenderFinish: function (/*TGrid*/ grid) {
            this.inherited(arguments);
            // prefixing Action to the defined Gantt Action is how you call a predefined GanttAction.
            this.grid.ActionZoomFit();
        }

    });
});

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
    "dojo/topic",
    "ibm/miniapp/scheduler/gantt/GanttWidget",
    "com/ibm/tivoli/maximo/miniapps/Handlers"

], function (declare, _MaximoIO, log, lang, topic, GanttWidget,
             Handlers) {
    return declare([GanttWidget, _MaximoIO, Handlers], {
        constructor: function (options) {
            // super is called automatically, apparently
            log.debug("{} Base Bean Target set to {} for view", this.gridId, this.mxtargetbean, options);
            this.subscribeOn('skd.compare.scenarios', lang.hitch(this, this.CompareScenarios));
            // when this.compareData is non null, we have compare info, and we can render the gantt
            if (options.compare) {
                this.compareData = {compare: options.compare};
            } else {
                this.compareData = null;
            }

            // don't allow editing
            this.ganttDisableEdit = true;
        },

        addCustomActions: function(gridId) {
            // add ZoomToWork action
            // This is called from the ZoomToWork Toolbar Action
            window.Grids.ZoomToWork = lang.hitch(this, this.ZoomToWork);
        },
        
        attachExtraGridEvents: function (gridId) {
            this.inherited(arguments);
        },

        /**
         * Handles the Compare Scenarion server side push event
         * @param args
         */
        CompareScenarios: function (args) {
            log.debug('COMPARE: {}', args);
            this.compareData = args;
            //this._createGANTT();
            var me = this;
            this.fetch("async_update_compare_data", me._ioOptions({
            	compare: args
            }));
            if (!this.grid) {
            	this._createGANTT();
            }
            this.grid.ReloadBody();
        },

        _newTreeGridOptions: function () {
            var me = this;
            var options = {
                Data: {
                    Url: me.toUrl('async_load_compare_data', me._ioOptions({compare: this.compareData})),
                    Timeout: 300
                },
                Layout: {
                    Url: me.toUrl('async_load_compare_ui', me._ioOptions({
                        appname: me.appname,
                        compare: this.compareData
                    }))
                }
            };

            log.debug("{} Grid options", this.gridId, options);
            return options;
        },

        canRender: function () {
            // don't show the progress, since we'll load it later
            topic.publish('miniapp.hideprogress', this.domid);

            if (this.compareData == null) {
                log.debug("No Compare Data yet, will wait.");
                // there is no existing compare data, so send the "COMPARE" event
                log.debug("send Compare Event");
                this.callBean("COMPARE");
                return false;
            }
            return true;
        },

        _GetAltCSSClassForActivity: function (row) {
            return row['_modclass'];
        },

        OnLoadCfg: function() {
            // just suppress the config loading for resource views
            return true;
        }
    });
});

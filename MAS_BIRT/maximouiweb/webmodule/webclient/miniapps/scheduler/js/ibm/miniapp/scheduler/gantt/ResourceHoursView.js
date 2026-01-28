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
    "ibm/miniapp/scheduler/gantt/BaseResourceViewWidget",
    "com/ibm/tivoli/maximo/miniapps/Handlers",
    "ibm/miniapp/scheduler/gantt/CommonResourceHoursView"

], function (declare, aspect, _MaximoIO, log, lang, GanttWidget,
             BaseResourceViewWidget, Handlers, CommonResourceHours) {
    return declare([GanttWidget, _MaximoIO, BaseResourceViewWidget, Handlers, CommonResourceHours], {
        constructor: function (options) {
            // super is called automatically, apparently
            log.debug("{} Base Bean Target set to {} for view", this.gridId, this.mxtargetbean, options);
            this.showCurrentDateLine=false;

            this.aspectShowHideElHandle=null;
        },

        _newTreeGridOptions: function () {
            var me = this;
            var options = {
                Data: {Url: me.toUrl('async_load_project_data', me._ioOptions({})), Timeout: 300},
                Layout: {
                    Url: me.toUrl('async_load_project_ui', me._ioOptions({
                        appname: me.appname,
                        projectid: me.projectid
                    }))
                }
            };

            return options;
        },

        addCustomActions:function(gridId) {
            // register the FilterResource on the Grids instance so that we can access
            // it statically and without a Grid instance
            window.Grids.FilterResources = function (Grid,Row) {
                for (var i = 0; i < Grid.__FilterResourcesData.length; i++) {
                    if (Row['name'].trim() == Grid.__FilterResourcesData[i].trim()) return true;
                }
                return false;
            };
        },

        onWorkViewReferenceReceived: function(msg) {
            log.debug("Got a Work View Reference'", msg);
            if (msg.grid) {
                this.linkedWorkViewGrid=msg.grid;
                this.linkedWorkView=msg.view;
                //this._updateSync();
                this._workviewChanged();
            }
        },

        attachExtraGridEvents: function (gridId) {
            this.inherited(arguments);
            log.debug('{} Registering extra grid events', this.TAG);
            this.subscribeOn('skd.workview.rowselected', lang.hitch(this, this.workViewRowSelected));
            this.subscribeOn('skd.workview.updated', lang.hitch(this, this._workviewChanged));
            this.subscribeOn('skd.response.workview.reference', lang.hitch(this, this.onWorkViewReferenceReceived));
        },

        workViewRowSelected: function (msg) {
            if (!this.isVisible()) return;

            var rows = msg.grid.GetSelRows();
            if (msg.resourceFilterEnabled && rows && rows.length > 0) {
                var res = [];
                for (var i = 0; i < rows.length; i++) {
                    if (!rows[i]['Resources']) continue;
                    res.push(this._parseResources(rows[i]['Resources']));
                    var multires=rows[i]['Resources'].split(",");
                    if (multires && multires.length>1) {
                        for (var k=0;k<multires.length;k++) {
                            res.push(this._parseResource(multires[k]));
                        }
                    }
                }
                this.grid.__FilterResourcesData = res;
                log.debug('{}: Applying Resource Filter', this.TAG, res);
                this.grid.SetFilter('resources', "Grids.FilterResources(Grid,Row)", 'name', 2);
            } else {
                
                log.debug('{}: Removing Resource Filter', this.TAG);
                this.grid.SetFilter('resources', null, 'name', 2);
                delete this.grid.__FilterResources;
                delete this.grid.__FilterResourcesData;
            }
        },
		
        _workviewChanged: function (grid, result) {
            if (!this.isVisible() && (this.grid!=null)) return;
  	
            if (this.reloadRequired || this.grid==null) {
                this.reloadRequired=false;
                this._createUI(); // remove the old grid and create new one
                return;
            }

            log.debug("{} WORKVIEW CHANGED", this.TAG);
            // we reload the chart whenever the top view changes
            this.lastScollTop = this.grid.GetScrollTop();
            var me=this;
            var selectedrows=this.grid.GetSelRows();
            this.grid.ReloadBody(function() {
                if (me.lastScollTop) {
                    me.invokeLater(function() {
                        log.debug("Updating Scroll Top: {}", me.lastScollTop);
                        me.grid.SetScrollTop(me.lastScollTop);
                        me._updateSync();
                    }, 300, "ReloadBody");
                } else {
                    me._updateSync();
                }
                me.grid.ClearSelection();
                for (var i=0;i<selectedrows.length;i++) {
					me.grid.SelectRow(selectedrows[i], 0);
                };               
            });
        },

        onVisibilityChanged: function(visible) {
            log.debug("Visibility Has Changed: Visible: {}", visible );
            if (visible || this.grid==null) {
               //  this._updateSync();
               this._workviewChanged();
            } else {
                log.debug("Disabling Grid Sync");
                this.grid.SyncId=null;
            }
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

        __refreshAssignment: function (data) {
        	log.debug("Do nothing here...");
        }

    });
});

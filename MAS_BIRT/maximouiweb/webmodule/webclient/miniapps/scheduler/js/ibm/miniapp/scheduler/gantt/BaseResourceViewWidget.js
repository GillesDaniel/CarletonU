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
    "com/ibm/tivoli/maximo/miniapps/Handlers"

], function (declare, _MaximoIO, log, lang, Handlers) {
    return declare([_MaximoIO, Handlers], {

        constructor: function (opts) {
            this.initOptions = opts;

            log.debug("{} Base Resource View Constructor called with", this.gridId, opts);
        },

        isResourceView: function() {
            return true;
        },

        attachExtraGridEvents: function (gridId) {
            this.inherited(arguments);
            this.subscribeOn('skd.gantt.sync.response', lang.hitch(this, this._onSyncResponse));

            AddEvent('OnSelect', gridId, lang.hitch(this, this._NotifyRowSelected));
            var me=this;
            AddEvent('OnAfterSectionResize', this.gridId, function() {
                me._onSyncResponse();
            });
        },

        upgradeTGInstance: function(grid) {
            this.inherited(arguments);

            this.grid._enableFilterWorkAction = lang.hitch(this, this._enableFilterWorkAction);
            this.grid._disableFilterWorkAction = lang.hitch(this, this._disableFilterWorkAction);
            this.grid._onChangeResourceDisplay = lang.hitch(this, this._onChangeResourceDisplay);
        },
        
        _onChangeResourceDisplay: function (display) {
        	var me = this;
        	this.__pleaseWait(this.label('loading_resources'));
            this.fetch("async_change_resource_display_mode", me._ioOptions({
                projectid: me.projectid,
                display: display
            })).then(function () {
                 me.grid.ReloadBody();
             });
        },

        _enableFilterWorkAction: function () {
            log.debug("{} Enable Filter Work", this.TAG);
            this._WorkFilterEnabled = true;
            // just notify listeners of selected rows
            this._NotifyRowSelected(this.grid, null);
        },

        _disableFilterWorkAction: function () {
            log.debug("{} Enable Filter Work", this.TAG);
            this._WorkFilterEnabled = false;
            // just notify listeners of selected rows
            this._NotifyRowSelected(this.grid, null);
        },

        _NotifyRowSelected: function (/*TGrid */grid, /*TRow */row, /*string */col, /*TRow */orow, /*string */ocol, /*int */pagepos, /*type[] */rect, /* type[] */orect) {
            // if (orow===row) return;
            this.publishLater('skd.resourceview.rowselected', {
                grid: grid,
                row: row,
                workFilterEnabled: this._WorkFilterEnabled
            }, 100, 'skd.resourceview.rowselected');
            log.debug('{} Resource Row Selected', this.TAG);
        },

        OnDblClick_ZoomToResourceLoadAvail: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            this._hideTooltip();
            if (!row) return;
            
            log.debug("{} DblClick {}", this.TAG, col);
            var date=null;
            if (row.loadcommon) {
                date= this.getDateFromLoad(row.loadcommon);
                log.debug("Using Date from load: {}", date);
            }
            if (!date && row.availcommon) {
                date= this.getDateFromLoad(row.availcommon);
                log.debug("Using Date from avail: {}", date);
            }
            if (date) {
                log.debug("Will Zoom To: {}", date);
                this.ZoomTo(date, null, -40, true);
            }
            if (col === 'CRAFT') {
                this._removeRowColor(grid);
            }
        },

        /**
         * Apply Sync Response to the current grid
         */
        
        _onSyncResponse: function (syncOptions) {
            log.debug('{} Sync Response Received', this.TAG, syncOptions);
            if (this.appname != null) {
            	if (this.appname != 'GWORKASSIGN') {
		            if (this._updateSync) {
		                this._updateSync();
		            } 
            	}
            	else {
            		return;
            	}
            }
        }
    });
});

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
    "ibm/miniapp/scheduler/gantt/WorkView",
    "dojo/json"

], function (declare, _MaximoIO, log, lang, GanttWidget,
             Handlers, WorkView, json) {
    return declare([GanttWidget, _MaximoIO, Handlers, WorkView], {
        constructor: function (options) {
            this.ViewName = 'GAWorkOrders';
        },

        attachExtraGridEvents: function (gridId) {
            this.inherited(arguments);
            TGAddEvent('OnFilterFinish', this.gridId, lang.hitch(this, this.OnFilterEnd));
        },

        /**
         * Handler to filter to selected items
         * @private
         */
        _filterToSelected: function(actionItem, row) {
            var rows = this._GetSelectedRows(this.grid, 'G', row);
            if (rows && rows.length>0) {
                log.debug("Filter to selected items being handled for {} rows", rows.length);
                var query="";
                for (var i=0;i<rows.length;i++) {
                    if (query.length>0) {
                        query += " OR ";
                    }
                    query += ("Identifier = \""+rows[i].id+"\"");
                }
                this.grid.ActionClearFilters();
                this.grid.SetValue(this.grid.Toolbar, "Expression", query, 1);
                this.grid.SearchRows('Filter');
                this.grid.ClearSelection();
                log.debug("Filtered to ", query);
            }
        },

        OnFilterEnd: function(/*TGrid*/ grid, /*int*/ type) {
            log.debug("FILTER END: type: {}, filter: {}", type, this.grid.HasFilter());

            var filters = this.grid.HasFilter();

            var clearFilters = true;
            if ((filters & 1) != 0) {
                log.debug("we have filter row with filter data");
                clearFilters=false;
            } else if ((filters & 2) != 0) {
                log.debug("we have search row");
                if (grid.Toolbar.Expression) {
                    log.debug("We Search Expression: {}", grid.Toolbar.Expression);
                    clearFilters=false;
                }
            }

            if (clearFilters) {
                log.debug("Clearing Assignment Filter");
                this.callBean("async_set_filtered_assignments", this._ioOptions({filter: []}));
            } else {
                var state = {count: 0, rows: []};
                this.visitVisibleChiden(state, function (row, state) {
                    if (row && row['_OBJECTNAME'] === 'ASSIGNREPLOC') {
                        state.count++;
                        state.rows.push(row.id);
                        //log.debug("AF: Visible Row: []", state.count, row);
                    }
                    return true;
                });

                // set global access to the filter
                log.debug("Setting Assignment Filter to ", state.rows);
                this.callBean("async_set_filtered_assignments", this._ioOptions({filter: state.rows}));
            }
        },
        
        OnContextMenuItemSelected: function (/*TMenuItem*/item, /*TROW*/row, /*List*/ selection) {
        	if (row['_OBJECTNAME'] == "ASSIGNREPLOC") {
        		item.Values.selection = "[" + row.parentNode['_OBJECTID'] + "]";
        		item.Values.uniqueid = row.parentNode['_OBJECTID'];
        	}
        	this.inherited(arguments);
        }
    });

});

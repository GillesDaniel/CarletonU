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
    "dojo/json"

], function (declare, _MaximoIO, log, lang, GanttWidget,
             Handlers, json) {
    return declare([GanttWidget, _MaximoIO, Handlers], {
        constructor: function (options) {
            this.ViewName = 'WorkOrders';
        },

        OnGetDefaultColor: function (G, row, col, r, g, b) {
            //color PM isforecast pending row
            if (row["_OBJECTNAME"] == 'PM' && ( row["ALLSEGMENTSMOVABLE"] == '0' || row["ALLSEGMENTSMOVABLE"] == 'N' || row["ALLSEGMENTSMOVABLE"] == false)) {
                return this._pmreforecastpendingBG;
            }
            return null;
        },

        OnValidatePMsegmentDrop: function (fromrow, torow, activity) {
        },

        /**
         */
        addCustomActions: function(gridId) {
            // Attach FilterWork function to grid
            // This is attacted to the Grids object so that it will exist during data loading, etc.
            // Being registered there means if the Filter is saved to the state, then it will not cause
            // issues when the data/state is reloaded.
            var me=this;
            window.Grids.FilterWork = function (Grid, Row) {
                if (!Grid.__FilterWorkData) return true;
                // note using parse resources to convert multiple "res1 (#), res2 (#)" items into "res1, res2"
                var res = me._parseResources(Row['Resources']);
                if (!res) return false;
                //log.debug("Filter work for '{}'", res, Grid.__FilterWorkData);
                var multires = res.split(",");
                for (var i = 0; i < Grid.__FilterWorkData.length; i++) {
                    if (res == Grid.__FilterWorkData[i]) return true;
                    if (multires && multires.length>1) {
                        // we have multiple resources, let's compare each.
                        for (var k = 0; k < multires.length; k++) {
                            if (me._parseResource(multires[k]) == Grid.__FilterWorkData[i]) return true;
                        }
                    }
                }
                return false;
            };

            // add ZoomToWork action
            // This is called from the ZoomToWork Toolbar Action
            window.Grids.ZoomToWork = lang.hitch(this, this.ZoomToWork);
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

        _lockAction: function (actionItem, row) {
            var rows = this._GetSelectedRows(this.grid, 'G', row);
            this._applyForEachRow(rows, lang.hitch(this, function (row) {
                log.debug("before lock activity", actionItem.Value, row, row['MODAPPOINTMENT']);
                var tb = this.grid.GetRowById("toolbar");
                if (tb == null || tb.LOCKSCH == "0"){
                	row.mxLeftIconClass = "skd-icon-appointment";
                }
                if (tb == null || tb.LOCKSCH == "1"){
                	delete row.mxLeftIconClass;
                }
                if ( row["MODRESOURCELOCK"] == "1" && (tb == null || tb.LOCKRESOURCE == "0")){
                	row.mxLeftIconClass = "skd-icon-appresourceloc";
                }
                row.GGanttRunMove = 'All,Move,Selected,Entire,Vert,Mouse'; // can only move vertically
                row._READONLY_STARTEND = true;
                this.SetValue(row, 'MODAPPOINTMENT', true, true); // notify other chart
            }));
        },
        _unlockAction: function (actionItem, row) {
            var rows = this._GetSelectedRows(this.grid, 'G', row);
            this._applyForEachRow(rows, lang.hitch(this, function (row) {
                log.debug("before unlock activity", actionItem.Value, row, row['MODAPPOINTMENT'], row["APPTREQUIRED"]);
        	if ( row["APPTREQUIRED"] == "1" || row["APPTREQUIRED"]=="Y" || row["APPTREQUIRED"]==true|| row["APPTREQUIRED"]=="true"){
	                row.mxLeftIconClass = "skd-icon-requirement";
        	}
        	else if (  (row["MODRESOURCELOCK"] == "1") && (tb.LOCKRESOURCE == "0")){
            	row.mxLeftIconClass = "skd-icon-resourceloc";
            }
        	else {
        		delete row.mxLeftIconClass;
        	}
                delete row.GGanttRunMove;
                delete row._READONLY_STARTEND;
                this.SetValue(row, 'MODAPPOINTMENT', false, true); // notify other chart
            }));
        },
        
        _reslockAction: function (actionItem, row) {
            var rows = this._GetSelectedRows(this.grid, 'G', row);
            this._applyForEachRow(rows, lang.hitch(this, function (row) {
                log.debug("before lock activity", actionItem.Value, row, row['MODRESOURCELOCK']);
                var tb = this.grid.GetRowById("toolbar");
                if (tb == null || tb.LOCKRESOURCE == "0"){
                	row.mxLeftIconClass = "skd-icon-resourceloc";
                }
                if (tb == null || tb.LOCKRESOURCE == "1"){
                	delete row.mxLeftIconClass;
                }
                if ( row["MODAPPOINTMENT"] == "1" && (tb == null || tb.LOCKSCH == "0")){
                	row.mxLeftIconClass = "skd-icon-appresourceloc";
                }
                row.GGanttRunMove = 'All,Move,Selected,Entire,Slide,Mouse'; // can only move vertically
                row._READONLY_ASSIGNMENT = true;
                this.SetValue(row, 'MODRESOURCELOCK', true, true); // notify other chart
            }));
        },
        _resunlockAction: function (actionItem, row) {
            var rows = this._GetSelectedRows(this.grid, 'G', row);
            this._applyForEachRow(rows, lang.hitch(this, function (row) {
                log.debug("before unlock activity", actionItem.Value, row, row['MODRESOURCELOCK'], row["APPTREQUIRED"]);
        	if ( row["APPTREQUIRED"] == "1" || row["APPTREQUIRED"]=="Y" || row["APPTREQUIRED"]==true|| row["APPTREQUIRED"]=="true"){
	                row.mxLeftIconClass = "skd-icon-requirement";
        	}
        	else if ( (row["MODAPPOINTMENT"] == "1") && (tb.LOCKSCH == "0")){
            	row.mxLeftIconClass = "skd-icon-appointment";
            }
        	else {
        		delete row.mxLeftIconClass;
        	}
                delete row.GGanttRunMove;
                delete row._READONLY_ASSIGNMENT;
                this.SetValue(row, 'MODRESOURCELOCK', false, true); // notify other chart
            }));
        },
        
        attachExtraGridEvents: function (gridId) {
            this.inherited(arguments);
            AddEvent('OnSelectGanttRunRect', gridId, lang.hitch(this, this.OnSelectGanttObjects));
            log.debug('{} WorkView adding WorkView events', this.TAG);
            AddEvent('OnSelect', gridId, lang.hitch(this, this._NotifyRowSelected));

            // add in some custom events
            AddEvent('OnGetDefaultColor', this.gridId, lang.hitch(this, this.OnGetDefaultColor));
            AddEvent('OnGanttChanged', this.gridId, function (G, row, col, item, new1, new2, old1, old2, action) {
                G.ColorRow(row);
            });

            var me=this;
            AddEvent('OnAfterSectionResize', this.gridId, function() {
                me._onSyncRequest();
            });

            this.subscribeOn('skd.gantt.sync.request', lang.hitch(this, this._onSyncRequest));
            this.subscribeOn('skd.miniapp.topview.childsize', lang.hitch(this, this._onChildSizeUpdate))

            // listent for work filter requests
            this.subscribeOn('skd.resourceview.rowselected', lang.hitch(this, this._onFilterWorkForResource))
            this.subscribeOn('skd.workview.constraintedited', lang.hitch(this, this._constraintEdited));
            this.subscribeOn('skd.workview.refreshSelected', lang.hitch(this, this.__refreshSelected));
        },

        OnZoom: function (/*TGrid*/ grid, /*string*/ zoom, /*int*/ FirstDate, /*int*/ LastDate) {
            this.inherited(arguments);
            // This a hack required to rebuild the Resource View when triggering a "Refresh Schedule" or 
            // "Discard and Refresh Schedule" action. As the linked Work View is destroyed and rebuilt after refresh
            // a new Gantt ID is generated, hence a JavaScript callback to refresh the resource view does not work.
            if (this._otherGRID && this._otherGRID.reloadRequired) {
        		this._otherGRID.reloadRequired = false;
        		this._otherGRID._newGridID();
                this._otherGRID._initGANTT();
            }
        },

        upgradeTGInstance: function(grid) {
            this.inherited(arguments);

            // add in compliance hooks
            this.grid._enableComplianceAction = lang.hitch(this, this._enableComplianceAction);
            this.grid._disableComplianceAction = lang.hitch(this, this._disableComplianceAction);

            // pm reforecast action
            this.grid._ReforecastPMAction = lang.hitch(this, this._ReforecastPMAction);

            // add filter resources actions
            this.grid._enableFilterResourcesAction = lang.hitch(this, this._enableFilterResourcesAction);
            this.grid._disableFilterResourcesAction = lang.hitch(this, this._disableFilterResourcesAction);
        },

        _constraintEdited: function (data) {
            var item = json.parse(data);
            if (item == null) {
                log.error("Unable to parse dependency item: {}", data);
                return;
            }
            // var row = this.GetRowById(data.from);

            var deps = this.grid.GetDependencies(item.from, "G", null, item.to);
            if (deps == null) {
                log.error("Failed to get dependencies for {}", item);
                return;
            }
            if (deps.length != 1) {
                log.error("Should only have a single dependency for {}", item, deps);
                return;
            }
            var me = this;
            this.doUpdate(function (grid) {
                log.debug("Will Update", deps);

                if (deps[0][2] == item.type && deps[0][3] == (item.lag*60)) {
                	var optimize = item.optimize;
                	var from = me.GetRowById(deps[0][0]);
                	var tgDescendantsEnforceLeadLag = from['_TG_DESENDANTS'] + '|' + optimize;
                	me.SetValue(from, '_TG_DESENDANTS_EnforceLeadLag', tgDescendantsEnforceLeadLag, null);
                }
                else {
                    // TreeGrid doesn't update... so delete it, and then re-add
                    grid.DeleteDependencies(deps);

                    // update hte dependency and re-add
                    deps[0][2] = item.type;
                    // lag is hours, but we need minutes for TG
                    deps[0][3] = item.lag*60;
                    grid.AddDependencies(deps);
                }
            });
        },

        _onFilterWorkForResource: function (msg) {
            var me = this;

            var rows = msg.grid.GetSelRows();
            if (msg.workFilterEnabled === true && rows && rows.length > 0) {
                var res = [];
                for (var i = 0; i < rows.length; i++) {
                    res.push(rows[i]['name']);
                }
                this.grid.__FilterWorkData = res;
                log.debug('{}: Applying Work Filter', this.TAG, res);
                this.grid.SetFilter('work', "Grids.FilterWork(Grid,Row)", 'Resources', 2);
            } else {
                log.debug('{}: Removing Work Filter', this.TAG);
                this.grid.SetFilter('work', null, 'Resources', 2);
                delete this.grid.__FilterWorkData;
            }
        },

        _enableFilterResourcesAction: function () {
            log.debug("{} Enable Filter Resources", this.TAG);
            this._ResourceFilterEnabled = true;
            // just notify listeners of selected rows
            this._NotifyRowSelected(this.grid, null);
        },

        _disableFilterResourcesAction: function () {
            log.debug("{} Disable Filter Resources", this.TAG);
            this._ResourceFilterEnabled = false;
            // just notify listeners of selected rows
            this._NotifyRowSelected(this.grid, null);
        },

        _ReforecastPMAction: function () {
            log.debug('{} Reforecast PMs', this.TAG);
            var me = this;
            this.fetch("async_reforecast_pm", me._ioOptions({
                projectid: me.projectid
            })).then(function () {
                //var _SavedState = me.grid.SaveCfg(true);
                me.grid.ReloadBody(function () {
                    //log.debug("Reloading Grid State");
                    //me.grid.LoadCfg(_SavedState);
                });
            });
        },

        _disableComplianceAction: function () {
            log.debug("disable compliance action");
            this.setCompliance(false);
        },

        _enableComplianceAction: function () {
            log.debug("enable compliance action");
            this.setCompliance(true);
        },

        setCompliance: function (val) {
            var me = this;
            this.fetch("async_set_compliance", me._ioOptions({
                projectid: me.projectid,
                state: val
            })).then(function () {
                //var _SavedState = me.grid.SaveCfg(true);
                me.grid.ReloadBody(function () {
                    //log.debug("Reloading Grid State");
                    //me.grid.LoadCfg(_SavedState);
                });
            });
        },

        _onChildSizeUpdate: function (data) {
            log.debug("{} Child Sizes ", this.TAG, data);

            // size our width and margins so that we align with bottom view.
            // this event will be fired from a bottom view, and will do nothing when the view is
            // on its own
            var me = this;
            // we need to resize the miniapp, and the treegrid will follow
            var par = this;
            if (data && data.pos) {
                require(["dojo/dom-geometry", "dojo/dom-style"], function (domGeom, domStyle) {
                    var pos = domGeom.position(me.domNode, false);
                    var nudge = (data.pos.x - pos.x);
                    domGeom.setContentSize(par.domNode, {w: data.pos.w});
                    domStyle.set(par.domNode, {
                        'margin-left': (nudge) + "px",
                        'margin-right': 0,
                        'padding-right': 0
                    });
                    //me.resize();
                });
            }
            if (data && data.view) {
                // readjust the grid
                this.grid.MidWidth = data.view.grid.MidWidth;
            }
        },

        OnAfterSave: function (/*TGrid*/grid, /*int*/result, /*boolean*/autoupdate) {
            this.inherited(arguments);
            // only notify updates if the update was sucessful
            if (result >= 0) {
                this.publishLater('skd.workview.updated', {
                    grid: grid,
                    result: result
                });
            }
        },

        /**
         *
         * @param row
         * @returns true if row can be selected
         */
        CanSelect: function(row) {
            // don't select hidden or non visible rows
            if (!row || !row.Visible || row.Hidden) return false;

            // for assignment work view, only select assignments
            if (this.appname == 'rlassign') {
                if (this.lastMouseDownEvent) {
                    if (this.lastMouseDownEvent.ctrlKey)
                        return row && row['_OBJECTNAME'] === "WORKORDER";
                    if (this.lastMouseDownEvent.altKey)
                        return row && row['_OBJECTNAME'] === "ASSIGNMENT";
                }
            }
            return true;
        },

        OnSelectGanttObjects: function (grid, r1, x1, y1, r2, x2, y2) {
            log.debug("OnSelectGanttObjects:");
            var row = r1;
            var st = this.getDateForX(x1, 'G'), et = this.getDateForX(x2, 'G');
            while (row != null) {
                if ((row.startTime >= st && row.startTime <= et)
                    || (row.endTime >= st && row.endTime <= et)
                    || (row.startTime < st && row.endTime > et)) {
                    if (this.CanSelect(row)) grid.SelectRow(row, 1);
                }
                row = grid.GetNext(row);
                if (row === r2) {
                    if ((row.startTime >= st && row.startTime <= et)
                        || (row.endTime >= st && row.endTime <= et)
                        || (row.startTime < st && row.endTime > et)) {
                        if (this.CanSelect(row)) grid.SelectRow(row, 1);
                    }
                    break;
                }
            }
        },

        _GetAltCSSClassForActivity: function (row) {
            if (row["_INTERNALPLUSTQUALMET"] != 'undefined' && row["_INTERNALSTATUS"] == 'ASSIGNED' && row["_INTERNALPLUSTQUALMET"] != null && (row["_INTERNALPLUSTQUALMET"] == 'NONE' || row["_INTERNALPLUSTQUALMET"] == 'PARTIAL')) {
                cls = "skd-Conflict";
                return cls;
            }

            if (row["CRITICAL"] != null && row["CRITICAL"]) {
            	cls = "skd-CPM-highlight";
            	return cls;
            }

            return this.inherited(arguments);
        },

        _NotifyRowSelected: function (/*TGrid */grid, /*TRow */row, /*string */col, /*TRow */orow, /*string */ocol, /*int */pagepos, /*type[] */rect, /* type[] */orect) {
            // if (orow===row) return;
            // NOT SURE we want to do this all the time.  We may need to tweak that this is called during an on
            // click and not during the on focus.  OnFocus seems to get call alot
            // log.debug('{} Work View Row Selected', this.TAG);
            this.publishLater('skd.workview.rowselected', {
                grid: grid,
                row: row,
                resourceFilterEnabled: this._ResourceFilterEnabled
            }, 100, 'skd.workview.rowselected');
        },

        _onSyncRequest: function () {
            log.debug('{} Sync Request Received; Sending Response.', this.TAG, this.grid);
            this.publishLater('skd.gantt.sync.response', {}, 50, "sync_request");
        },

        _autoRefreshData: function (me) {
            this.fetch("async_auto_refresh_model", me._ioOptions({
                projectid: me.projectid
            })).then(function (reply) {
            	if (reply && reply.Changes && reply.Changes.length) {
            	    log.debug("Model Refresh Reply", reply);
            		var changes = reply.Changes;
            		var addedRowIds = [];
            		for (var i=0; i<changes.length; i++) {
            			var assignmentRow = changes[i];
            			addedRowIds.push(assignmentRow['id']);
            		}
            		me.grid.AddDataFromServer(reply);
            		for (var x=0; x<addedRowIds.length; x++) {
            			var newRow = me.grid.GetRowById(addedRowIds[x]);
            			newRow['name'] = changes[x].name;
            			newRow['_idx'] = changes[x]._idx;
            			newRow['mxRightIconClass'] = changes[x].mxRightIconClass;
            			newRow['mxLeftIconClass'] = changes[x].mxLeftIconClass;
            			newRow['_OBJECTNAME'] = changes[x]._OBJECTNAME;
            			newRow['_REFOBJECTNAME'] = changes[x]._REFOBJECTNAME;
            			newRow['_INTERNALSTATUS'] = changes[x]._INTERNALSTATUS;
            			newRow['STATUS'] = changes[x].STATUS;
            		}
            		me.grid.RefreshGantt(1);
            	}

            	window.clearTimeout(window.timeoutId);
                window.timeoutId = setTimeout(function () {
                	me._autoRefreshData(me);
                }, me.dispatchRefreshInterval); // Fires an autorefresh for the amount of seconds set for the Project.
            });
        },

        __refreshSelected: function(data) {
        	var reply = json.parse(data);
        	if (reply && reply.Changes && reply.Changes.length) {
        		var changes = reply.Changes;
        		this.grid.AddDataFromServer(reply);
        		for (var i=0; i<changes.length; i++) {
        			var row = changes[i];
        			var newRow = this.grid.GetRowById(row['id']);
        			if (newRow != null) {
        				newRow['_INTERRUPTIBLE'] = row['_INTERRUPTIBLE'];
        				newRow['INTERRUPTIBLE'] = row['INTERRUPTIBLE'];
        				newRow['MILESTONE'] = row['MILESTONE'];
        				newRow['WORKLOG'] = row['WORKLOG'];
        				this.grid.RefreshRow(newRow);
        			}
        		}        	
        	}
        	this.publishLater('skd.workview.updated', {
                grid: this.grid,
                result: data.Result
            });
        }
    });

});

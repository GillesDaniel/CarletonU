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
    "dojo/_base/array",
    "ibm/miniapp/scheduler/gantt/GanttWidget",
    "ibm/miniapp/scheduler/gantt/BaseResourceViewWidget",
    "ibm/miniapp/scheduler/gworkassign/GWAResourceViewActions",
    "dijit/popup"
], function (declare, _MaximoIO, log, lang, array, GanttWidget,
             BaseResourceViewWidget, ResourceViewActions, popup) {

	var ONE_WEEK = 604800000;
	var DEFAULT_WIDTH = 1000;

    return declare([GanttWidget, _MaximoIO, BaseResourceViewWidget, ResourceViewActions], {

        constructor: function (options) {
            this.ViewName = 'Assignments';
            this.initialized = false;

            // super is called automatically, apparently
            log.debug("{} Base Bean Target set to {} for view", this.gridId, this.mxtargetbean, options);
        },

        attachExtraGridEvents: function (gridId) {
            this.inherited(arguments);

            // add in some custom events
            AddEvent('OnGetDefaultColor', gridId, lang.hitch(this, this.OnGetDefaultColor));
            AddEvent('OnGanttChanged', gridId, function (G, row, col, item, new1, new2, old1, old2, action) {
                G.ColorRow(row);
            });
            AddEvent('OnRowFilter', gridId, lang.hitch(this, this.OnRowFilter));
            AddEvent('OnFilterFinish', gridId, lang.hitch(this, this.OnFilterFinish));
            AddEvent('OnSelectGanttRunRect', gridId, lang.hitch(this, this.OnSelectGanttObjects));
            
            var me = this;
            window.Grids.FilterWork = function (Grid, Row) {
                if (!Grid.__FilterWorkData) return true;
                // note using parse resources to convert multiple "res1 (#), res2 (#)" items into "res1, res2"
//                var res = me._parseResources(Row['Resources']);
//                if (!res) return false;
//                var multires = res.split(",");
//                for (var i = 0; i < Grid.__FilterWorkData.length; i++) {
//                    if (res == Grid.__FilterWorkData[i]) return true;
//                    if (multires && multires.length>1) {
//                        // we have multiple resources, let's compare each.
//                        for (var k = 0; k < multires.length; k++) {
//                            if (me._parseResource(multires[k]) == Grid.__FilterWorkData[i]) return true;
//                        }
//                    }
//                }
              //GWW - no mutiple resource for the row-jira MASISMIG-17006
              for (var i = 0; i < Grid.__FilterWorkData.length; i++) {
              if (Row['Resources'] == Grid.__FilterWorkData[i]) return true;
              }
                return false;
            };
            
            window.Grids.FilterCrewWorkGroup = function (Grid,Row) {
                for (var i = 0; i < Grid.__FilterCrewWorkGroupData.length; i++) {
                    if (Row['CREWWORKGROUP'] == Grid.__FilterCrewWorkGroupData[i]) return true;
                }
                return false;
            };
            
            // add ZoomToWork action
            // This is called from the ZoomToWork Toolbar Action
            window.Grids.ZoomToWork = lang.hitch(this, this.ZoomToWork);

            AddEvent('OnGetGanttHeader', this.gridId, lang.hitch(this, this.OnGetGanttHeader));
            AddEvent('OnClickCell', this.gridId, lang.hitch(this, this.OnClickCell));
            this.subscribeOn('skd.resourceview.rowselected', lang.hitch(this, this._onFilterWorkForResource))
            this.subscribeOn('skd.resourceview.filtered', lang.hitch(this, this._onResourceViewFiltered))
            this.subscribeOn('skd.resourceview.loaded', lang.hitch(this, this.filterResourceSection))
            this.subscribeOn('skd.refreshWorkView', lang.hitch(this, this._refreshWork));
        },

        upgradeTGInstance: function(grid) {
            this.inherited(arguments);

            this.grid._previousWeek = lang.hitch(this, this._previousWeek);
            this.grid._nextWeek = lang.hitch(this, this._nextWeek);

            // add filter resources actions
            this.grid._enableFilterResourcesAction = lang.hitch(this, this._enableFilterResourcesAction);
            this.grid._disableFilterResourcesAction = lang.hitch(this, this._disableFilterResourcesAction);
        },

        hideGanttZoomOptions: function() {
        	return true;
        },

        OnClickCell: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*TEvent*/ event) {
        	var objs = grid.GetGanttXY(event.ClientX, event.ClientY);
        	if (objs != null && !objs.Main) {
        		grid.SelectRow(row, 0);
        	}
        },
        
        OnGetGanttHeader: function (/*TGrid*/ grid, /*string*/ val, /*int*/ index, /*int*/ date, /*int*/ nextdate, /*string*/ units, /*int*/ width, /*int*/ partial, /*string*/ col) {
        	if (index == 1) {
        		var midPoint = new Date((date + nextdate) / 2);
        		val = DateToString(midPoint, 'mmm yyyy');
        	}

        	if (index == 3) {
            	val = DateToString(date, 'ddd/dd');
        	}
        	return val;
        },

        OnValueChanged: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*type*/ val, /*type*/ oldval, /*object*/ errors) {
        	if (row && (row.Kind == 'Filter' || row.id == 'Filter' || row.id == 'toolbar')) {
        		return this.inherited(arguments);
        	}
        	
        	log.debug('OnValueChanged: {}', val);
        	if ((col=='startTime' || col=='endTime') && (val !=null && (val < this.projectStart || val > this.projectEnd))) {
				var errMsg = this.label('SelectedDateOutOfWorkListRange');
				grid.ShowMessageTime(errMsg, 0, null, ["OK"]);
				return oldval;
			}
        	// This is needed to avoid sending duplicate changes to the server.
        	return oldval;
        },

        OnAfterSave: function (/*TGrid*/grid, /*int*/result, /*boolean*/autoupdate) {
            this.inherited(arguments);
            // only notify updates if the update was sucessful
            if (result >= 0) {
                this.publishLater('skd.workview.updated', {
                    grid: grid
                });
            }
        },
        
        onRefreshRequested: function(data) {
        	var me = this;
        	this.inherited(arguments);
            this.publishLater('skd.workview.updated', {
                grid: this.grid,
                isRefresh: true,
                currentWeek: me.startWeekDate
            });
        },
        
        OnGetDefaultColor: function (G, row, col, r, g, b) {
            if (row.Kind != 'Data') return;

            // ignore gantt
            if (col=='G') return;
            if (col=='Panel') return;

            // conflict rows
            if (row.ERRVAL && col=='name') {
                // log.debug("COL: {}", col);
                return this._conflictRowColor;
            }
            return null;
        },

        // @Override
        OnGanttRunBoxChanged: function (/*TGrid*/ grid, /*object*/ box, /*object*/ old, /*int*/ change) {
            this.inherited(arguments);
        },

        OnValidateAssignmentDrop: function (fromrow, torow, activity) {
        },

        OnUndo: function (grid, action, row, col, val) {
            if (action == 'Move') {
                // revalidate the undo move (we don't know the old parent, so we'll pass the new row as both from and to)
                this.OnValidateAssignmentDrop(row.parentNode, row.parentNode, row);
            }
        },

        OnFocus: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*TRow*/ orow, /*string*/ ocol, /*int*/ pagepos) {
            var refreshVal=0;
            // clear the schedule window on re-focus
            if (this.grid.Cols['G'].GanttLines && this.grid.Cols['G'].GanttLines != '') {
                this.grid.Cols['G'].GanttLines = "";
                refreshVal=1;
            }
            if (refreshVal) this.Refresh(refreshVal);

            return false;
        },

        OnDblClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
        	if (row && (row.Kind == 'Filter' || row.id == 'Filter' || row.id == 'toolbar')) {
        		return this.inherited(arguments);
        	}

            this._hideTooltip();

            log.debug("{} DblClick {}", this.TAG, col);
        	var moveToWeek = true;
        	var endWeekDate = null;
        	if (this.startWeekDate != null) {
        		endWeekDate = this.startWeekDate + ONE_WEEK;
        	}
        	 if ( col == 'name'  &&  row['id'] !='Filter') {
            	if (this.changingWeek)
            		return true;
            	var startTime = row['startTime'];
            	var endTime = row['endTime'];
            	moveToWeek = (startTime < this.startWeekDate || startTime > endWeekDate);
            	if (moveToWeek) {
            		if (startTime < this.projectStart || startTime > this.projectEnd) {
            			this._rescheduleAction(row);
            		}
            	}
            } else if (col === 'G') {
                var objs = grid.GetGanttXY(row, col, x, y);
                if (objs != null && objs.Type != null) {
                    log.debug("DblClick GANTT Object", objs);
                    if (objs.RunId) {
                        return true;
                    } else {
                        // gantt object
                    	moveToWeek = (row['startTime'] < this.startWeekDate || row['startTime'] > endWeekDate);
                    	if (moveToWeek) {
                    		this._gotoWeekDate(row['startTime']);
                    	}
                    }
                }
            }
            else if (col === 'CRAFT') {
                this._removeRowColor(grid);
            }
        },

        OnClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            this.inherited(arguments);
            if (event.ctrlKey || event.altKey || event.shiftKey) return false;

        	var endWeekDate = null;
        	if (this.startWeekDate != null) {
        		endWeekDate = this.startWeekDate + ONE_WEEK;
        	}
            if ( col == 'name'  && row['id'] !=null && row['id'] !='Filter') {
            	if (this.changingWeek)
            		return true;
            	var startTime = row['startTime'];
            	var endTime = row['endTime'];
            	moveToWeek = (startTime < this.startWeekDate || startTime > endWeekDate);
            	if (moveToWeek) {
            		if (startTime < this.projectStart || startTime > this.projectEnd) {
            			return true;
            		} else {
            			this._gotoWeekDate(startTime);
            		}
            	}
            }

            if (col === 'G') {
            	var me = this;
            	var selRows = this._GetSelectedRows(this.grid, 'G');
            	if (selRows != null && selRows.length > 1) {
                	array.forEach(selRows, function(r) {
                		if (row == null || (row != null && row.id != r.id)) {
                			me.grid.SelectRow(r, 0);
                		}
                	});
            	}

                var objs = grid.GetGanttXY(row, col, x, y);
                if (objs != null && objs.Type != null && objs.RunId) {
                    // This will get called in the Focus Gantt Bar Actions
                } else {
                    // refocus row, remove gantt lines, since no object is selected
                    this.OnFocus(grid, row, col);
                }
            }
            return false;
        },

        OnEndDragGantt: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*string*/ name, /*int*/ start, /*int*/ end, /*int*/ oldstart, /*int*/ oldend, /*int*/ dir, /*object*/ XY, /*string*/ keyprefix, /*int*/ clientX, /*int*/ clientY, /*TRow*/ ToRow) {
        	this.inherited(arguments);

            // drag move, check for multiple
            if (dir==3) {
                // selected...
            	var selectedRows = this._GetSelectedRows(this.grid, "G", row);
                if (selectedRows && selectedRows.length > 1) {
                    for (i=0; i<selectedRows.length; i++) {
                    	grid.SelectRow(selectedRows[i], 0);
                    }
                    return true;
                }
            }
        },
        
        _focusGanttBarAdditionalActions: function(row) {
            this.inherited(arguments);

            // Defocusing selected row
            if (row.Kind == 'Data' && row['_OBJECTNAME'] && row['_OBJECTNAME'] == 'WMASSIGNMENT') {
            	this.grid.Focus(null, null);
            }
        },

        _GetAltCSSClassForActivity: function (row) {
            // do your own checking, and return a new class or return the super (this.inherited is super)

            if (row["_INTERNALPLUSTQUALMET"] != 'undefined' && row["_INTERNALSTATUS"] == 'ASSIGNED' && row["_INTERNALPLUSTQUALMET"] != null && (row["_INTERNALPLUSTQUALMET"] == 'NONE' || row["_INTERNALPLUSTQUALMET"] == 'PARTIAL')) {
                cls = "skd-Conflict";
                return cls;
            }
            if (row["_INTERNALSTATUS"] === 'ASSIGNED' && row["_OBJECTNAME"] === "ASSIGNREPLOC") {

                if (row["_INTPLUSARESERVATION"] != 'undefined' && row["_INTPLUSARESERVATION"] != null && row["_INTPLUSARESERVATION"] === "HARD") {
                    cls = "skd-HardResType";
                    log.debug("_GetAltCSSClassForActivity: {}", cls, row["_INTPLUSARESERVATION"], row["PRIMARYFLAG"]);
                    return cls;
                }

                if (row["PRIMARYFLAG"] != 'undefined' && row["PRIMARYFLAG"] != null && (row["PRIMARYFLAG"] === 0 || row["PRIMARYFLAG"] === 'N' ||  row["PRIMARYFLAG"] === false)) {
                    cls = "skd-SecondaryAssignment";
                    return cls;
                }
            }

            if (row["_INTERNALSTATUS"] === 'ASSIGNED' && row['_READONLY'] == true) {
            	cls = "skd-FilteredAssignment";
            	return cls;
            }
            
            return this.inherited(arguments);
        },
        
        _AdditionalTableContextMenu: function (/*TMenu*/menu, /*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
        	var thisMenu = this.inherited(arguments);
        	if (row["_INTERNALSTATUS"] === 'ASSIGNED' && row['_READONLY'] == true) {
            	var filteredItems = thisMenu.Items.filter(function(value, index, arr) {
            	    return value.Name != null && value.Name.startsWith('Go To');
            	});
            	thisMenu.Items = filteredItems;
        	}
        	return thisMenu;
        },
        
        OnRenderFinish: function (/*TGrid*/ grid) {
            this.inherited(arguments);
            this.initialized = true;

            var ptStart = grid.GetScrollLeft(2);
            var startWeekDate = grid.GetGanttDate(ptStart, "G");
            this._setWeekDate(startWeekDate);

            if ((startWeekDate - ONE_WEEK) < this.projectStart) {
            	grid.Toolbar.PREVIOUSWEEKDisabled = 1;
            }
            else {
            	grid.Toolbar.PREVIOUSWEEKDisabled = 0;
            }

            if ((startWeekDate + ONE_WEEK) > this.projectEnd) {
            	grid.Toolbar.NEXTWEEKDisabled = 1;
            }
            else {
            	grid.Toolbar.NEXTWEEKDisabled = 0;
            }
            
            if (grid.Toolbar.LOCKDUR == 1) {
            	this._LockDurationAction();
            }
            grid.RefreshRow(grid.Toolbar);

            // Re-enable the Resources Filter state
            var me = this;
            if (this.state) {
                if (this.state.ResourceFilterEnabled) {
                    grid.Toolbar.FILTERWORK = this.state.ResourceFilterEnabled;
                    grid.RefreshRow(grid.FILTERWORK);
                    this.invokeLater(function() {
                    	me._enableFilterResourcesAction();
                    }, 100, "EnableFilterResources");
                }
                grid.RefreshRow(grid.Toolbar);
            }
        },

        OnLoadCfg: function() {
            // GA Schedule View needs State Saving/Loading
            return false;
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

        _onSyncResponse: function() {
            // we don't sync
            return false;
        },

        _updateSync: function() {
            // we don't need to sync
            return false;
        },

        requestSync: function() {
            // we don't sync
            return false;
        },

        focusGanttBarLater: function() {
            // when dragging bars, don't do the logic of fetching information about the bars, etc... just slows stuff down.
            // User can just select the bar to focus it, and get the selection details (ie, related bars, highlights, etc)
            if (this.Dragging) return false;
            this.inherited(arguments);
        },

        _setDateTimeAction: function(actionItem, row, date) {        	
        	var rows = this._GetSelectedRows(this.grid, 'G', row);
        	
        	var me=this;
        	date=this.TZDateToTGDate(date.getTime());
        	var dateFunc = this._setDateFunction(date);

        	this.grid.StartUpdate();

    		var state = [];
        	array.forEach(rows, function(r, i) {
            	if ((r['_READONLY'] == undefined || !r['_READONLY']) && (r['_READONLY_STARTEND'] == undefined || !r['_READONLY_STARTEND'])) {
            		me._applyToRow(r, state, dateFunc);
            	}
        	});
        	
        	this.grid.EndUpdate();
        	log.debug("Moved {} rows", state.length);
    		log.debug("Applied Set Date function {} to {} rows with date {}", actionItem.Value, state.length, date);
        },
        
        _applyDatesFunction: function(dur) {
        	var me=this;
        	
        	// function to apply the dates to the row
        	var dateFunc = function(r, state) {
        		if (r==null) return false;
        		
        		// check if we've processed this row
        		if (array.indexOf(state, r.id)>=0) {
        			return true;
        		} 
        		state.push(r.id);
        		
        		// apply the logic
        		if (r.firstChild==null || r.firstChild.CanMove===0 /*parent with child rows that can't be moved*/) {
        			// we are not a parent, so let's apply the time
					// CheckGantt has to be called or else validations/computed formulates will not happen
					if (r && r['startTime']) {
						// only apply to rows that have startTime field
                        var val = me.grid.CheckGantt(r, 'startTime', r['startTime'] + dur);
                        //val = me.TGDateToTZDate(val);
                        if (val != false) {
                            me.SetValue(r, 'startTime', val);
                        }
                    }
        		}
        		return true;        		
        	};
        	
        	return dateFunc;
        },

        _onFilterWorkForResource: function (msg) {
            var me = this;

            if (msg.grid.LoadedCount == 0) {
            	log.debug('Resource Grid is still loading, rescheduling filter for later execution');
                this.publishLater('skd.resourceview.rowselected', {
                    grid: msg.grid,
                    row: msg.row,
                    workFilterEnabled: msg.workFilterEnabled
                }, 100, 'skd.resourceview.rowselected');
                return;
            }

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

        _onResourceViewFiltered: function (msg) {
            if (!this.isVisible()) return;

            if (msg.grid.__FilterByResource) {
            	var resources = null;
            	var crewWorkGroups = null;
            	if (msg.grid.__FilterByResource.resources.size > 0) {
            		resources = Array.from(msg.grid.__FilterByResource.resources);
            	}
            	if (msg.grid.__FilterByResource.crewWorkGroups.size > 0) {
            		crewWorkGroups = Array.from(msg.grid.__FilterByResource.crewWorkGroups);
            	}
            	
                if (resources == null && crewWorkGroups == null) {
                    log.debug('{}: Removing Resource Filter', this.TAG);
                    this.grid.SetFilter('work', null, 'Resources', 2);
                    this.grid.SetFilter('work', null, 'CREWWORKGROUP', 2);
                    delete this.grid.__FilterWorkData;
                    delete this.grid.__FilterCrewWorkGroupData;
                    return;
                }
            	
                this.grid.__FilterWorkData = resources;
                this.grid.__FilterCrewWorkGroupData = crewWorkGroups;
                if (resources != null) {
                	log.debug('{}: Applying Resource Filter', resources);
                	this.grid.SetFilter('work', "Grids.FilterWork(Grid,Row)", 'Resources', 2);
                }
                if (crewWorkGroups != null) {
                	log.debug('{}: Applying Resource Filter', crewWorkGroups);
                	this.grid.SetFilter('work', "Grids.FilterCrewWorkGroup(Grid,Row)", 'CREWWORKGROUP', 2);
                }
                delete msg.grid.__FilterByResource;
            } else {
                log.debug('{}: Removing Work Filter', this.TAG);
                this.grid.SetFilter('work', null, 'Resources', 2);
                this.grid.SetFilter('work', null, 'CREWWORKGROUP', 2);
                delete this.grid.__FilterWorkData;
                delete this.grid.__FilterCrewWorkGroupData;
            }
        },
        
        _previousWeek: function () {
        	if (this.grid.Toolbar.PREVIOUSWEEKDisabled == 0) {
        		this._gotoWeek(0);
        	}
        },

        _nextWeek: function () {
        	if (this.grid.Toolbar.NEXTWEEKDisabled == 0) {
        		this._gotoWeek(1);
        	}        	
        },

        /**
         * Go to previous or next week.
         * 
         * 0 - Previous
         * 1 - Next
         */
        _gotoWeek: function (direction) {
            var me = this;
            this.fetch("_gotoWeek", me._ioOptions({
            	direction: direction
            })).then(function (reply) {
            	var startWeekDay = reply.startWeekDay;
            	me.startWeekDate = startWeekDay;
            	var endWeekDay = startWeekDay + ONE_WEEK;
            	me.grid.ZoomTo(startWeekDay, endWeekDay, DEFAULT_WIDTH);
                me.publishTo('skd.workview.weekChange', {
                	startWeekDay: startWeekDay,
                	endWeekDay: endWeekDay
                });

                if ((startWeekDay - ONE_WEEK) < me.projectStart) {
                	me.grid.Toolbar.PREVIOUSWEEKDisabled = 1;
                }
                else {
                	me.grid.Toolbar.PREVIOUSWEEKDisabled = 0;
                }

                if ((startWeekDay + ONE_WEEK) > me.projectEnd) {
                	me.grid.Toolbar.NEXTWEEKDisabled = 1;
                }
                else {
                	me.grid.Toolbar.NEXTWEEKDisabled = 0;
                }
                me.grid.RefreshRow(me.grid.Toolbar);
            });
        },

        /**
         * Go to the week of the selected date 
         */
        _gotoWeekDate: function (selectedDate) {
            var me = this;
            this.changingWeek = true;
            this.fetch("_gotoWeekDate", me._ioOptions({
            	selectedDate: selectedDate
            })).then(function (reply) {
            	var startWeekDay = reply.startWeekDay;
            	me.startWeekDate = startWeekDay;
            	var endWeekDay = startWeekDay + ONE_WEEK;
            	me.grid.ZoomTo(startWeekDay, endWeekDay, DEFAULT_WIDTH);
                me.publishTo('skd.workview.weekChange', {
                	startWeekDay: startWeekDay,
                	endWeekDay: endWeekDay
                });
                if ((me.startWeekDate - ONE_WEEK) < me.projectStart) {
                	me.grid.Toolbar.PREVIOUSWEEKDisabled = 1;
                }
                else {
                	me.grid.Toolbar.PREVIOUSWEEKDisabled = 0;
                }

                if ((me.startWeekDate + ONE_WEEK) > me.projectEnd) {
                	me.grid.Toolbar.NEXTWEEKDisabled = 1;
                }
                else {
                	me.grid.Toolbar.NEXTWEEKDisabled = 0;
                }
                me.grid.RefreshRow(me.grid.Toolbar);
                delete me.changingWeek;
            });
        },

        /**
         * Send the week date that is stored in the cookie to the server 
         */
        _setWeekDate: function (currentDate) {
            var me = this;
            this.fetch("_setWeekDate", me._ioOptions({
            	currentDate: currentDate
            })).then(function (reply) {
            	var startWeekDay = reply.startWeekDay;
            	me.startWeekDate = startWeekDay;
            });
        },

        OnLoadCustomCfg: function (/*TGrid*/ grid, /*string*/ custom, /*string*/ cfg) {
        	this.inherited(arguments);
        	this._ResourceFilterEnabled = this.state.ResourceFilterEnabled;
        },
        
        OnSaveCustomCfg: function (/*TGrid*/ grid, /*bool*/ ret) {
            if (!this.state) this.state={};
            // add in Filter state..
            if (grid && grid.Filter) {
                if (!this.state.Filter) this.state.Filter={};
                this.state.Filter.Visible = grid.Filter.Visible;
            }
            this.state.ResourceFilterEnabled = this._ResourceFilterEnabled;
            var cfg = JSON.stringify(this.state);
            log.debug("Custom State", cfg);
            return cfg;
        },

        _enableFilterResourcesAction: function () {
            log.debug("{} Enable Filter Resources", this.TAG);
            this._ResourceFilterEnabled = true;
            // just notify listeners of selected rows
            this._NotifyRowSelected(this.grid, null);
            this.grid.SaveCfg();
        },

        _disableFilterResourcesAction: function () {
            log.debug("{} Disable Filter Resources", this.TAG);
            this._ResourceFilterEnabled = false;
            // just notify listeners of selected rows
            this._NotifyRowSelected(this.grid, null);
            this.grid.SaveCfg();
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
           if (this.appname == 'gworkassign') {
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
        
        OnRowFilter: function (grid, row, show) {
        	if (!this.grid.__FilterWorkData) {
            	if (!this.grid.__FilterByWork) {
            		this.grid.__FilterByWork = {
            				resources: new Set(),
            				crewWorkGroups: new Set()
            		};
            	}

            	var filters = [];
            	for (var i=0; i<grid.GetFilter().length; i++) {
            		filters.push(grid.GetFilter()[i][0]);
            	}
            	
            	if (show == 1) {
            		if (filters.includes('Resources') && row['Resources'] && row['Resources'] != "") {
            			this.grid.__FilterByWork.resources.add(row['Resources']);
            		}
            		if (filters.includes('CREWWORKGROUP') && row['CREWWORKGROUP'] && row['CREWWORKGROUP'] != "") {
            			this.grid.__FilterByWork.crewWorkGroups.add(row['CREWWORKGROUP']);
            		}
            	}
        	}
        },

        OnFilterFinish: function (grid, type) {
        	if (!this.grid.__FilterWorkData && this.initialized)
        	{
            	log.info("FilterBy Data: {}", this.grid.__FilterByWork);
                this.publishLater('skd.workview.filtered', {
                    grid: grid
                }, 100, 'skd.workview.filtered');
        	}
        },

        OnActivityChanged: function (/*TGrid*/grid, /*TRow*/ row, /*string*/ col, /*int*/ plan, /*object*/ newObj, /*object*/ oldObj, /*string: Resize,Move,New,Delete,DeleteAll,Correct*/ action) {
        	this.grid.ShowMessage(this.messages['pleasewait'], /*importance*/ 2, /*type*/ 3);
        },
        
        OnUpdateRow: function (/*TGrid*/grid, /*TRow*/ row, /*TRow*/ update) {
        	this.inherited(arguments);
        	row['_WorkDay'] = update['_WorkDay'];
        },
        
        filterResourceSection: function () {
        	if (!this.grid.__FilterWorkData)
        	{
            	log.info("FilterBy Data: {}", this.grid.__FilterByWork);
                this.publishLater('skd.workview.filtered', {
                    grid: this.grid
                }, 100, 'skd.workview.filtered');
        	}
        },
        
        shouldOnClickSelectRow: function(grid, row, col) {
        	if (col == 'G') {
        		if (this.LastSelectedRow != null) {
        			this.grid.SelectRow(this.LastSelectedRow, 0);
        		}
        		return true;
        	}
        	return false;
        },

		_GotoSeletedDateActionHandler: function(action, row, date) {
			var start = this.TZDateToTGDate(date.getTime());
			this._gotoWeekDate(start);
		},
        
        // popup calendar window allowing the user to select a date time.  When a date/time is selected, then
        // the 'applyDateFunc' is called with actionItem, row, and the selected date.
        _showDatePickerAction: function(actionItem, row, CalendarWidget, applyDateFunc) {
			// close any older instances before showing a new one
			if (this.closeDatePicker) {
				this.closeDatePicker();
			}
			
        	var options = this.userinfo.calendarConstraints;
        	var time=this.getVisibleMidDate();
        	if (row!=null) {
        		time=this._findEarliestStartDate(row);
        	}
        	if (!time) time=new Date().getDate();

			// horrible, horrible hack.
			// TreeGrid dates are GMT0, so we need to make the date appear correctly, by adjusting for the TimeZone
			var date;
			//date = this.TGDateToUserTZDate(time);
			date = this.TGDateToTZDate(time);

        	var me=this;
        	var picker;
        	var pickerOpts = {
        			lang: options.lang,
        			lng: options.lng,
        			dir: document.body.dir,
        			constraints: options,
        			value: date,
        			maxHeight: '150',
        			datePackage: options.datePackage,
        			_close: function () {
        				popup.close(picker);
        				picker.destroy();
        				delete picker;
        			},
        			
        			onChange: function (value) {
        				log.debug('OnChange: {}', value);

        				var projectStart = me.TGDateToUserTZDate(me.projectStart);
        				var projectEnd = me.TGDateToUserTZDate(me.projectEnd);
        				var selectedDate = value.getTime();
        				if (selectedDate < projectStart || selectedDate > projectEnd) {
        					this._close();
        					var errMsg = me.label('SelectedDateOutOfWorkListRange');
							me.grid.ShowMessageTime(errMsg, 0, null, ["OK"]);
        				}
        				else {
            				applyDateFunc(actionItem, row, value);
            				this._close();
        				}
        			}
        	};
        	
        	picker = new CalendarWidget(pickerOpts);
        	popup.moveOffScreen(picker);
        	//dojo.marginBox(picker.domNode, { w: 100 });
        	if (picker.startup) picker.startup();

			// set the coseDatePicker function to be this instance.
			this.closeDatePicker = function() {
				try {
					popup.close(picker);
				} catch (e) {}
				me.DATE_SELECTION_IN_PROGRESS=false;
			};
			
			this.DATE_SELECTION_IN_PROGRESS=true;
        	popup.open({
        		popup: picker,
        		x: this.eventPageX,
                y: this.eventPageY,
        	});
        },
        
        __refreshAssignment: function (data) {
        	this.inherited(arguments);
            this.grid.DoFilter();
            this.publishLater('skd.refreshResource', null);
            this.grid.ClearSelection();
        },

        _refreshWork: function (reply) {
            var ptStart = this.grid.GetScrollLeft(2);
        	var startWeekDate = this.grid.GetGanttDate(ptStart, "G");
        	this._setWeekDate(startWeekDate);
        	this.__refreshAssignment(reply)
        },

        sendToBeSaved: function() {
        	// This is a NO-OP in this application.
        },

        _rescheduleAction: function (row) {
        	log.debug('Selected row: {}', row);
            var dialogname = 'reschedule';
        	addCommInput('uniqueid', row['_OBJECTID']);
        	addCommInput('actionname', dialogname);
    		addCommInput('dialogname', dialogname);
        	addCommInput('skdobjectname', row['_OBJECTNAME']);
        	addCommInput('objectname', row['_OBJECTNAME']);
        	addCommInput('eventtargetid', 'schacm_workview_viewer_miniapp');
        	addCommInput('projectid', this.projectid);
        	log.debug("sendEvent({},{})", dialogname, this.appname);
        	sendEvent(dialogname, this.appname, '');
        }
    });
});

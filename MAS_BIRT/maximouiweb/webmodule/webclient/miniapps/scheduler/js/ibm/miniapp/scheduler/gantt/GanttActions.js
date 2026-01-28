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
    "dojo/_base/declare",
    "dojo/_base/array",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
    "dojo/date",
    "ibm/tivoli/mbs/dijit/DateTimeCalendar",
    "dijit/Calendar",
    "dijit/popup"
], function (lang, declare, array, log, dates, DateTimeCalendar, Calendar,
             popup) {
	var _ACTIONS = declare(null, {
		DURATION_ONE_HOUR: 60*60*1000,
		DURATION_ONE_DAY: 60*60*1000 * 24,
		DURATION_ONE_WEEK: 60*60*1000 * 24 * 7,
		
		_unselectAllRunBoxes: function() {
			var me=this;
			var boxes = this.grid.GetGanttRunSelectedBoxes();
			if (boxes) {
				array.forEach(boxes, function(box, i) {
	        		me.grid.SelectGanttRunBox(box, false);
	        	});
			}
			this.grid.ClearSelection();
		},
		
        
		// this action basically fires the context menu, and then looks for the worklog
		// dialog, and then fires the action for the item.
        OnAddViewNotesClicked: function(/*TGrid*/ grid, /*TRow*/ row) {
        	this._unselectAllRunBoxes();
        	
        	var col='G';
        	 //log.debug("OnAddViewNotesClicked: {}", col, grid.Cols[col]);
        	var me=this;
        	if (!grid.Cols[col]) return false;

			// get row under the cursor
        	var curRow=grid.ARow;
        	
    		if (col == 'G' && curRow) {
                value = curRow['id'];
   			} else {
   				value = row[col];
   			}
    		
			var selection = this._GetSelectedRowIds(grid, col, row);
			
			 //log.debug("OnAddViewNotesClicked: Context Menu: Selection: {}", selection);
			
			this.fetch("async_get_table_context_menu", me._ioOptions({
				projectid: me.projectid,
				id: selection, 
				col: col,
				value: value,
				selection: {} // The selection property is actually not being used on the server side, but 
							  // it is required for the MXEvent "async_get_table_context_menu".
			})).then(function(menu) {
				// log.debug('OnAddViewNotesClicked: Menu:', menu);
				// look and find the Item with 'writeworklog' and then fire it
				if (menu && menu.Items) {
					for (var i=0;i<menu.Items.length;i++) {
						if (menu.Items[i].Value=='writeworklog') {
							// fire it
							// log.debug('OnAddViewNotesClicked: Firing Event', menu.Items[i]);
							me.OnContextMenuItemSelected(menu.Items[i], curRow);
							break;
						}
					}
				}
			});

    		return true;
        },        		
		
		// context action for focussing a row to show it's work
        _showWorkAction: function(actionItem, row) {
        	log.debug("showWorkAction(): ", actionItem);
        	if (!row['startTime']) return; // don't zoom if the row has no start time
            this.ZoomTo(row['startTime'], row['endTime']);
        	return true;
        },
        
        _GotoTodayToolbarAction: function() {
        	log.debug("Goto TODAY");
        	try {
        		var start = this._today().getTime();
        		var end = start + this.DURATION_ONE_DAY;
        		this.ZoomTo(start, end);
        	} catch (ex) {
        		log.error("Goto TODAY failed", ex);
        	}
        },

		/**
		 * Returns today's date, no time data
		 * @returns {Date}
         * @private
         */
		_today: function() {
			var d = new Date();
			d.setHours(0);
			d.setMinutes(0);
			d.setSeconds(0);
			d.setMilliseconds(0);

			d = new Date(this.TZDateToTGDate(d.getTime()));
			return d;
		},
        
        _GotoSelectedDayToolbarAction: function(/*TEvent*/event) { 
        	log.debug("Goto Selected DAY [TG Event]>", event);
        	try {
        		// where to show the calendar
            	this.eventPageX=event.ClientX||event.clientX;
            	this.eventPageY=event.ClientY||event.clientY;
                this._selectDatePopupAction('_movetoSelectedDate', null, Calendar, lang.hitch(this, this._GotoSeletedDateActionHandler));

        	} catch (ex) {
        		log.error("Goto TODAY failed", ex);
        	}
        },

		_GotoSeletedDateActionHandler: function(action, row, date) {
			var start = this.TZDateToTGDate(date.getTime());
			var end = start + this.DURATION_ONE_DAY;
			this.ZoomTo(start, end);
		},
        
        _ZoomToWeekToolbarAction: function() {
        	try {
        		var st = this.grid.Cols['G'].GanttChartMaxStart;
        		var et = this.grid.Cols['G'].GanttChartMinEnd;
        		var wk = this.DURATION_ONE_DAY*7;
        		if (et-st < wk) {
        			log.debug('ZoomToWeek Zoom Entire Project: {},{}', new Date(st), new Date(et));
        			// less than a week, so zoom to project
        			this.ZoomTo(st, et, null, true);
        			return;
        		}
        		
        		// calculate a week zoom
        		var wid = this.grid.GetBodyWidth(2);        		
        		var scrollLeft = this.grid.GetScrollLeft(2);
        		var pt = scrollLeft + (wid/2);
        		var date = new Date(this.grid.GetGanttDate(pt, "G"));
        		date.setHours(date.getHours(), 0, 0, 0);
        		var offset = this.DURATION_ONE_DAY * 3.5;
        		var st= new Date(date.getTime()-offset);
        		st.setHours(0,0,0,0);
        		var et= new Date(date.getTime()+offset);
        		et.setHours(23,59,0,0);
        		this.ZoomTo(st.getTime(), et.getTime(), 1000, true);
        	} catch (ex) {
        		log.error("Zoom To Week Failed", ex);
        	}
        },        
        
        _deleteConstraintAction: function(actionItem, row) {
        	log.debug("Delete Constraint", actionItem, this._EDIT_DEPENDENCY);
        	var d = this._EDIT_DEPENDENCY;
        	var deps = this.grid.GetDependencies(d.DependencyFrom, null, null, d.DependencyTo, d.DependencyType);
        	log.debug("Constraint", deps);
        	this.grid.DeleteDependencies(deps);
        },
        
        _moveToNextHourAction: function(actionItem, row) {        	
        	this._moveToDateOffsetAction(actionItem, row, this.DURATION_ONE_HOUR);
        },
        
        _moveToNextDayAction: function(actionItem, row) {        	
        	this._moveToDateOffsetAction(actionItem, row, this.DURATION_ONE_DAY);
        },
        
        _moveToTodayAction: function(actionItem, row) {
			// horrible, horrible hack.
			// TreeGrid dates are GMT0, so we need to make the date appear correctly, by adjusting for the TimeZone
        	//var time = new Date().getTime();
        	//now = this._localToMaxTz(new Date());
			//var date = new Date(this.TGDateToUserTZDate(time));
			var date = this._localToMaxTz(new Date());
        	this._moveToDay(actionItem, row, date);
        },
        
        // move to day will move all selected work where by the start of the work will be the
        // date passed, and all other work will retain their respective time offsets.  ie,
        // shifts everything, but keeps the date/time relationships in tact.
        _moveToDay: function(actionItem, row, date) {
        	//debugger;
        	// need convert to user tz
        	var time= this.TGDateToUserTZDate(this._findEarliestStartDate(row));
        	if (!time||time==0) return;

        	var early = new Date(time);

        	// set the date for today with same hours, minutes, seconds
        	//date.setUTCHours(early.getUTCHours());
        	//date.setUTCMinutes(early.getUTCMinutes());
        	//date.setUTCSeconds(early.getUTCSeconds());
        	date.setHours(early.getHours());
        	date.setMinutes(early.getMinutes());
        	date.setSeconds(early.getSeconds());

        	// calculate the delta
        	var dur = dates.difference(early, date, "day") * this.DURATION_ONE_DAY;
        	log.debug("DUR: {}-{}={}", date, early, dur);
        	this._moveToDateOffsetAction(actionItem, row, dur);
        }, 
        
        
        // shows the popup calenar widget so user can select a Date
        _moveToDayPopupAction: function(actionItem, row) {
            this._selectDatePopupAction(actionItem, row, Calendar, lang.hitch(this, this._moveToDay));
        },
        
        // shows the popup calendar widget so the user can select a date/time, and all work
        // will be set to that exact Date and Time.
        _setToDateTimePopupAction: function(actionItem, row) {
        	this._selectDatePopupAction(actionItem, row, DateTimeCalendar, lang.hitch(this, this._setDateTimeAction));
        },

        // popup calendar window allowing the user to select a date time.  When a date/time is selected, then
        // the 'applyDateFunc' is called with actionItem, row, and the selected date.
        _selectDatePopupAction: function(actionItem, row, CalendarWidget, applyDateFunc) {
        	log.debug("_selectDatePopupAction(): Calendar Constraints ", this.userinfo.calendarConstraints);
        	var options = this.userinfo.calendarConstraints;
        	
        	if (options.datePackage!=null && options.datePackage.length>0) {
        		// need load a date package
    			require(options.datePackage, options.datePackage + ".locale", function() {
            		this._showDatePickerAction(actionItem, row, CalendarWidget, applyDateFunc);
    			});
        	} else {
        		this._showDatePickerAction(actionItem, row, CalendarWidget, applyDateFunc);
        	}
        },

        // popup calendar window allowing the user to select a date time.  When a date/time is selected, then
        // the 'applyDateFunc' is called with actionItem, row, and the selected date.
        _showDatePickerAction: function(actionItem, row, CalendarWidget, applyDateFunc) {
			// close any older instances before showing a new one
			if (this.closeDatePicker) {
				this.closeDatePicker();
			}
			
        	var options = this.userinfo.calendarConstraints;
        	
        	//var time=this.getVisibleStartDate();
        	var time=this.getVisibleMidDate();
        	if (row!=null) {
        		time=this._findEarliestStartDate(row);
        	}
        	if (!time) time=new Date().getDate();

			// horrible, horrible hack.
			// TreeGrid dates are GMT0, so we need to make the date appear correctly, by adjusting for the TimeZone
			var date;
			date = this.TGDateToUserTZDate(time);
			//date = this.TGDateToTZDate(time);  //new Date(time + (new Date(time).getTimezoneOffset() * 60 * 1000));
			log.debug("CalendarWidget: Adjusting Time for TimeZone: {} - {} - {} - {}", date, new Date(time), new Date(time).toISOString(), new Date(time).getTimezoneOffset());

        	var me=this;
        	
        	var picker;
        	
        	var pickerOpts = {
        			//id: dh.getPopupId(element),
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
						// horrible hack.  The date we get from the picker has TZ info, we need to strip it.
						// we added the timezone to show the correct time coming in, now that the user selected
						// a time we need to subtract it
						log.debug("CalendarWidget: Adjusting for TimeZone {}", value.getTimezoneOffset());
						//value = new Date(me.TZDateToTGDate(value.getTime())); // new Date(value.getTime() - (value.getTimezoneOffset() * 60 * 1000));

						if (actionItem.Value == '_setToDateTimePopupAction') {
							var paramDate = new Date(this.params.value);
							// If time has not changed
							if (paramDate.getHours() == value.getHours() && paramDate.getMinutes() == value.getMinutes()) {
								var diffInDays = value.getTime() - paramDate.getTime();
								var origDate = me._findEarliestStartDate(row);
								value = new Date(me.TGDateToTZDate(origDate) + diffInDays);
							}
						}

        				log.debug('OnChange: {}', value);
        				this._close();
        				applyDateFunc(actionItem, row, value)
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
        	
        	log.debug("Showing Calendar Popup: x,y; {},{}", this.eventPageX, this.eventPageY);
        },
        
        
        // it applies a duration to each row (and child rows)
        _moveToDateOffsetAction: function(actionItem, row, dur) { 
        	var tb = this.grid.GetRowById("toolbar");
            if (tb != null && tb.LOCKSCH == "1") return ; // suppress -not move
        	var rows = this._GetSelectedRows(this.grid, 'G', row);
        	this.moveToDateOffset(rows, dur);
        },

        moveToDateOffset: function(rows, dur) {
			// normalize the rows since we if move parents, it will update children
			rows = this.normalizeSelectedRows(rows);

            var me=this;

            var dateFunc = this._applyDatesFunction(dur);

            this.grid.StartUpdate();

            var state = [];
            array.forEach(rows, function(r, i) {
            	if ((r['_READONLY'] == undefined || !r['_READONLY']) && (r['_READONLY_STARTEND'] == undefined || !r['_READONLY_STARTEND'])) {
            		me._applyToRow(r, state, dateFunc);
            	}

            	if (r && r['_OBJECTNAME'] != null && r['_OBJECTNAME'] == 'PM') {
            		me.rightClickMove = true;
            	}
            });

            this.grid.EndUpdate();

            log.debug("Moved {} rows", state.length);

            return state.length;
        },


        // given a starting row, find the earliest start time for the row provided AND including all
        // selected rows
        _findEarliestStartDate: function(row) {        	
        	var rows = this._GetSelectedRows(this.grid, 'G', row);
        	
        	var me=this;
        	
        	// function to track the earliest start time
        	var func = function(row, state) {
                if (row && row['startTime']) {
        			if (state.date==null) {
                        state.date = row['startTime'];
        			} else {
                        if (dates.compare(row['startTime'], state.date) < 0) {
                            state.date = row['startTime'];
        				}
        			}
        		}
        		return true;
        	};
        	
    		var state = {date: null};
        	array.forEach(rows, function(r, i) {
        		me._applyToRow(r, state, func);
        	});
        	return state.date;
        },
        
        // returns a function that will apply the constant duration to a TRow
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
                        if (val != false) {
                            me.SetValue(r, 'startTime', val);
                        }
                    }
        		}
        		return true;        		
        	};
        	
        	return dateFunc;
        },
        
        // returns a function that will set the STARTTIME to be the given date, and retain the DURATION
        _setDateFunction: function(date) {
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
                    // only need to set the start time for a row, since TG will move the end time
                    // CheckGantt has to be called or else validations/computed formulates will not happen
					// only apply to rows that have an existing startTime
                    if (r && r['startTime']) {
						var val = me.grid.CheckGantt(r, 'startTime', date);
						if (val != false) {
							me.SetValue(r, 'startTime', val);
						}
					}
				}
        		return true;        		
        	};
        	
        	return dateFunc;
        },
        
        // action will will apply the given date to EVERY row passed, plus any selected rows, and their children.
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

        _refreshSelected: function(data) {
        	var selection = this._GetSelectedRowIds(this.grid, null, null);
        	var me = this;
        	if (selection == "") {
        		me.grid.ShowMessageTime("No work records selected.", 0);
        		return;
        	}
            this.fetch("_refreshSelected", me._ioOptions({
            	ids: selection
            })).then(function (reply) {
            	me.grid.AddDataFromServer(reply);
            	me.publishLater('skd.workview.updated', {
                    grid: me.grid,
                    result: reply.Result
                });

            	me.grid.ClearSelection();
            	me.showMessage("scheduler#refreshproject");
            });
        },

        _discardRefreshSelected: function(data) {
        	var selection = this._GetSelectedRowIds(this.grid, null, null);
            var me = this;
        	if (selection == "") {
        		me.grid.ShowMessageTime("No work records selected.", 0);
        		return;
        	}
            this.fetch("_discardRefreshSelected", me._ioOptions({
            	ids: selection
            })).then(function (reply) {
            	var changes = reply.Changes;
            	me.grid.AddDataFromServer(reply);
        		for (var i=0; i<changes.length; i++) {
        			var assignmentRow = changes[i];
        			var newRow = me.grid.GetRowById(assignmentRow['id']);
        			if (newRow != null) {
        				newRow['_INTERRUPTIBLE'] = assignmentRow['_INTERRUPTIBLE'];
        				newRow['INTERRUPTIBLE'] = assignmentRow['INTERRUPTIBLE'];
        				newRow['INTSHIFT'] = assignmentRow['INTSHIFT'];
        				me.grid.RefreshRow(newRow);
        			}
        		}	

                var rows = me._GetSelectedRows(me.grid, null, null);
                for (var k in rows) {
                    rows[k]['_UNCOMMITTED'] = 0;
                    me.grid.RefreshCell(rows[k], 'name');
                }

            	me.publishLater('skd.workview.updated', {
                    grid: me.grid,
                    result: reply.Result
                });

            	me.grid.ClearSelection();
            	me.showMessage("scheduler#refreshproject");
            });
        }
	});
        
    return _ACTIONS;
});

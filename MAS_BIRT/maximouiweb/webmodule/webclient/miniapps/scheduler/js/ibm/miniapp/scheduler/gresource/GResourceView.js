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
    "ibm/miniapp/scheduler/gantt/CommonResourceHoursView",
    "dojo/json",
    "dijit/popup"
], function (declare, aspect, _MaximoIO, log, lang, GanttWidget,
             BaseResourceViewWidget, Handlers, CommonResourceHours, json, popup) {
	
	var ONE_WEEK = 604800000;
    // Alternate Default Row Colors (RGB)
    var ALTERNATE_ROW_COLOR1 = JSON.stringify([235, 255, 255]);
    var ALTERNATE_ROW_COLOR2 = JSON.stringify([224, 244, 244]);

    return declare([GanttWidget, _MaximoIO, BaseResourceViewWidget, Handlers, CommonResourceHours], {
        constructor: function (options) {
            // super is called automatically, apparently
            log.debug("{} Base Bean Target set to {} for view", this.gridId, this.mxtargetbean, options);
            this.showCurrentDateLine=false;
            this.aspectShowHideElHandle=null;

            // Mod Avail selection properties
            this.selectedModAvailReasonCode = "";
            this.selectedModAvailDurationType = "FULLDAY";
            this.weekStart = 1;//0-sunday,1-monday
        },

        _newTreeGridOptions: function () {
            var me = this;
            var options = {
                Data: {
                	Url: me.toUrl('async_load_project_data', me._ioOptions({
                		ganttStart: -1
                	})), Timeout: 300},
                Layout: {
                    Url: me.toUrl('async_load_project_ui', me._ioOptions({
                        appname: me.appname,
                        projectid: me.projectid
                    }))
                }
            };

            return options;
        },

        upgradeTGInstance: function(grid) {
            this.inherited(arguments);

            this.grid._onChangeModAvailRsnCode = lang.hitch(this, this._onChangeModAvailRsnCode);
            this.grid._onChangeModAvailDurationType = lang.hitch(this, this._onChangeModAvailDurationType);
            this.grid._showLegendDialogAction = lang.hitch(this, this._showLegendDialogAction);
            this.grid._previous = lang.hitch(this, this._previous);
            this.grid._next = lang.hitch(this, this._next);
            this.grid.ActionZoomOut = lang.hitch(this, this.ZoomOut);
        },

        hideGanttZoomOptions: function() {
        	return true;
        },

        ZoomOut: function() {
        	var me = this;
            var weekStartDate = new Date(this.weekStart);
            var weekEndDate = new Date(this.weekStart + ONE_WEEK);
            var medianDate = new Date((weekStartDate.getTime() + weekEndDate.getTime()) / 2);
            if ((medianDate.getMonth() != weekStartDate.getMonth() || medianDate.getMonth() != weekEndDate.getMonth())
            		&& this.lastGanttZoom) {
                var firstDayMonth = new Date(medianDate.getFullYear(), medianDate.getMonth(), 1);
            	this.__pleaseWait();
                this.fetch("_gotoPeriod", me._ioOptions({
                	direction: -1,
                	zoomLevel: 1,
                	weekStart: firstDayMonth.getTime()
                })).then(function (reply) {
                    var startGanttDate = reply.startGanttDate;
                    var endGanttDate = reply.endGanttDate;
                    var hasChanges = reply && reply.Changes;
                    me.weekStart = startGanttDate;
                    me.grid.ZoomTo(startGanttDate, endGanttDate);

                    if (hasChanges) {
                        me.acceptChangesFromServer(reply);
                    	var changes = reply.Changes;
                    	for (var i=0; i<changes.length; i++) {
                    		var craftRow = changes[i];
                    		var newRow = me.grid.GetRowById(craftRow['id']);
                    		if (newRow != null) {
            					newRow = me.updateCraftRow(newRow, craftRow);
            					me.grid.RefreshRow(newRow);
                    		}
                    	}
                        me.grid.RefreshGantt(1);
                        me.sendToBeSaved();
                    }
                });
            }
            else {
            	this.grid.ChangeZoom('month');
            }
        },

        OnDataSend: function(/*TGrid*/ grid, /*object*/ source, /*string*/ data, /*function*/ Func) {
            // For some reason TG will sometimes create an empty changeset and we send it to the server.
            // If we select 100s of rows this could be 100s of "saves", so this prevents it from happening
            // log.debug("OnDataSend:",source,data);

        	if (source.Name == 'Data' && source.Url.includes('ganttStart') && this.state && this.state.GanttStart) {
        		var replacement = encodeURIComponent('"ganttStart":' + this.state.GanttStart + ",");
        		source.Url = source.Url.replace(/%22ganttStart%22%3A.*%2C/, replacement);
        	}

            if (source && source.Type === 'Changes' && data && data.indexOf('"Changes":[]')!==-1) {
                log.debug("Prevent Empty Changes", data);
                return true;
            }
        },

        OnTableContextMenu: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            log.debug("OnTableMenuContextMenu: {}", col, grid.Cols[col]);
            var me = this;
            if (!grid.Cols[col]) return false;

            if (col == 'G') {
                value = row['id'];
            } else {
                value = row[col];
            }
            row = this.GetRow(grid, row, col, x, y);

            var objs = grid.GetGanttXY(row, col, x, y);
            // returns the "selection" as distinct list of resources and activities
            var selectedItems = this.GetSelectionIds(grid, col, row);
            // returns the selection as just a list of row ids
            var selection = this._GetSelectedRowIds(grid, col, row);
            var selecteddate = row['START'];
            var allowedRow = row['_OBJECTNAME'] == 'LABOR' || row['_OBJECTNAME'] == 'AMCREW';
            if (col === 'G' && this.enableModAvail && allowedRow) {
            	var objs = grid.GetGanttXY(row, col, x, y);
            	if (objs != null && objs.Type != null && objs.RunId) {
            		var runId = objs.RunId;
                    var r = this.GetRowById(runId);
                    var selection = this._GetSelectedObjectIds(grid, null, null);
                    if (selection == "") {
                    	selection = row['_OBJECTID'];
                    }

                    log.debug('Selected Row: {}', r);
                    var selecteddate = r['START'];
            	}
            }
            log.debug("OnTableMenuContextMenu: Context Menu: Selection: {}", selection, selectedItems);
            if (value == undefined)
            	return true;

            this.fetch("async_get_table_context_menu", me._ioOptions({
            	projectid: me.projectid,
            	id: selection,
            	selection: selectedItems,
            	col: col,
            	value: value,
            	selecteddate: selecteddate
            })).then(function (menu) {
            	menu = me._AdditionalTableContextMenu(menu, grid, row, col, x, y, event);
            	me._ShowContextMenu(menu, grid, row, col, x, y, event, selectedItems);
            });

            return true;
        },

        OnShowTooltip: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            //log.debug('COL: [{}]',col, grid.Cols);
            var me = this;
            if ('Panel' == col) return; // skip clicks on the panel col
            if ('name' == col) {
                // filter out the "tree nodes"
                if (!(event && event.srcElement && event.srcElement.id && event.srcElement.id.indexOf('TGCell_') != -1)) {
                    return;
                }
            }
            if ('startTime' == col || 'endTime' == col) {
                // don't show tt for edit fields
                return;
            }
            if ('Data' === row.Kind) {
                if (col == 'G') {
                    // log.debug("GANTT TIP: {} {} {} {}", clientX, clientY, X, Y);
                    var objs = grid.GetGanttXY(row, col, x, y);
                    log.debug("Gantt Object", objs);
                    if (objs != null && objs.Point != null) {
                        // Point Object
                        this.fetch("async_get_tooltip_for_point", me._ioOptions({
                            projectid: me.projectid,
                            id: objs.Row.id,
                            point_index: objs.PointIndex
                        })).then(function (tooltip) {
                            me._showTooltip(tooltip, event, objs.Row);
                        });
                        return false;
                    } else if (objs != null && objs.Main != null) {
                        // normal bar, do nothing
                    } else if (objs != null && objs.RunId != null) {
                        // run bar item
                        row = this.GetRowById(objs.RunId);
                        log.debug('Using RUN BAR for ToolTip',objs, objs.RunId, row);
                    } else if (objs != null && objs.Type == 'dependency') {
                        log.debug('Using Dependency for ToolTip', objs);
                        if (objs.DependencyFromBox === '0') {
                            this._fetchDependencyTooltip(objs.DependencyFrom, objs.DependencyTo, event);
                        } else {
                            this._fetchDependencyTooltip(objs.DependencyFromBox, objs.DependencyToBox, event);
                        }
                        return false;
                    } else {

                        var clickDate = this.getDateForX(x);
                        log.debug("Gantt Click at {} is date {} ({})",x, clickDate, new Date(clickDate).toUTCString());

                        // so no real gantt object for us, so let's fetch a tooltip based on the date
                        this.fetch("async_get_tooltip_for_date", me._ioOptions({
                            projectid: me.projectid,
                            id: row.id,
                            col: col,
                            date: clickDate
                        })).then(function (tooltip) {
                            me._showTooltip(tooltip, event, row);
                        });

                        // don't tooltip non-gantt bar objects
                        return false;
                    }
                }

                var clickDate = this.getDateForX(x);
                var rowId = row.id;
                if (row['_OBJECTNAME'] == 'LABOR' || row['_OBJECTNAME'] == 'AMCREW') {
                	rowId = row['_PARENTID'];
                }
                this.fetch("async_get_tooltip", me._ioOptions({
                    projectid: me.projectid,
                    id: rowId,
                    col: col,
                    date: clickDate
                })).then(function (tooltip) {
                    me._showTooltip(tooltip, event, row);
                });
                return;
            }
        },
        
        _onChangeModAvailRsnCode: function (modAvailReasonCode) {
        	this.selectedModAvailReasonCode = modAvailReasonCode;
        },

        _onChangeModAvailDurationType: function (modAvailDurationType) {
        	this.selectedModAvailDurationType = modAvailDurationType;
        },

        _onSaveModAvailRsnCode: function (selection, objectName, date) {
        	var me = this;
        	this.__pleaseWait();
            this.fetch("async_save_modavail_rsncode", me._ioOptions({
                projectid: me.projectid,
                selection: selection,
                objectName: objectName,
                date: date,
                reasonCode: this.selectedModAvailReasonCode,
                durationType: this.selectedModAvailDurationType
            })).then(function () {
                 me.grid.ReloadBody();
             });
        },

        _onDeleteModAvailRsnCode: function (selection, objectName, date) {
        	var me = this;
        	this.__pleaseWait();
            this.fetch("async_delete_modavail_rsncode", me._ioOptions({
                projectid: me.projectid,
                selection: selection,
                objectName: objectName,
                date: date,
                durationType: this.selectedModAvailDurationType
            })).then(function (reply) {
            	 if (reply.IO.Result >= 1000) {
            		 me.grid.ReloadBody();
            	 } else {
            		 me.HideTGMessage();
            		 me.grid.ShowMessageTime('There is no modified availability to be removed.', 0);
            	 }
             });
        },

        /**
         * Called GetSelectedRows and return the IDs as a comma separated list of IDs
         */
        _GetSelectedObjectIds: function (grid, col, curRow) {
            var rows = this._GetSelectedRows(grid, col, curRow);
            var selection = "";
            var comma = "";
            for (var k in rows) {
                selection = selection + comma + rows[k]['_OBJECTID'];
                comma = ",";
            }
            return selection;
        },

        _viewAssignmentsAction: function (actionItem, row) {
        	log.debug('Selected row: {}', row);
            var dialogname = 'view_assign';
            addCommInput('selectedAssignments', row['EXTERNALASSIGNMENTS']);
        	addCommInput('uniqueid', row.parentNode['_OBJECTID']);
        	addCommInput('actionname', dialogname);
    		addCommInput('dialogname', dialogname);
        	addCommInput('skdobjectname', row['_OBJECTNAME']);
        	addCommInput('objectname', row['_OBJECTNAME']);
        	addCommInput('eventtargetid', 'viewerng_resourcetabs_rshb_gantt');
        	addCommInput('projectid', this.projectid);
        	log.debug("sendEvent({},{})", dialogname, this.appname);
        	sendEvent(dialogname, this.appname, '');
        },
        
        _modavailAction: function (actionItem, row) 
        {
            var actionvalues = actionItem.Values;
            var selection = actionvalues.selection;
            var selectedDate = actionvalues.selecteddate;
            if (selection == "") {
            	selection = row['_OBJECTID'];
            }
        	this._modavailrsncode(selection, selectedDate, row);
        },

        _modavailrsncode: function (selection, selectedDate, row) {
        	var allowedRow = row['_OBJECTNAME'] == 'LABOR' || row['_OBJECTNAME'] == 'AMCREW';
            if (this.enableModAvail && allowedRow) {
                log.debug('Selected Row: {}', row);
                var newDate = new Date(this.TGDateToTZDate(selectedDate));
                var day = newDate.getDay() + 1;
                var week = this.getWeekOfMonth(newDate);
                var workHours = 0;
                if (row.parentNode) {
                	var parent = row.parentNode;
                	workHours = parent['WEEK' + week + '_WORKHOURSDAY' + day];
                }
                var isWorkingTime = this.reasonCodes[this.selectedModAvailReasonCode] == "WORK";
                if (this.selectedModAvailReasonCode != "" && this.selectedModAvailReasonCode != "REMOVE") {
                	if (this.selectedModAvailDurationType != 'PARTIALDAY' && workHours > 0) {
                		var modAvailList = this.GetModAvailList(row);
                		if (isWorkingTime || (modAvailList && modAvailList.length >= 1)) {
                			this.openModAvailDialog(selection, selectedDate, row);
                		}
                		else {
                			this._onSaveModAvailRsnCode(selection, row['_OBJECTNAME'], selectedDate);
                		}
                	}
                	else if (this.selectedModAvailDurationType == 'FULLWEEK') {
                		var modAvailWeekList = this.GetModAvailWeekList(row);
                		if (!isWorkingTime && modAvailWeekList.length == 0) {
                			this._onSaveModAvailRsnCode(selection, row['_OBJECTNAME'], selectedDate);
                		}
                		else {
                			this.openModAvailDialog(selection, selectedDate, row);
                		}
                	}
                	else {
                		this.openModAvailDialog(selection, selectedDate, row);
                	}
                }
                else if (this.selectedModAvailReasonCode == "REMOVE") {
                	this._onDeleteModAvailRsnCode(selection, row['_OBJECTNAME'], selectedDate);
                }
                else {
                	this.HideTGMessage();
                	this.grid.ShowMessageTime('There is no reason code specified.', 0);
                }
            }
        },

        getWeekOfMonth: function(date) {
        	  var day = date.getDate()
        	  day-=(date.getDay()==0?6:date.getDay()-1); //Get monday of this week
        	  //special case handling for 0 (sunday)

        	  day+=7;
        	  //for the first non full week the value was negative

        	  prefixes = ['0', '1', '2', '3', '4', '5'];
        	  return prefixes[0 | (day) / 7];
        },

        shouldRightClickSelectRow: function(grid, row, col) {
        	return false;
        },


        shouldDblClickSelectRow: function(grid, row, col) {
            return true;
        },
     
        OnDblClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
        	this.inherited(arguments);
        	var allowedRow = row['_OBJECTNAME'] == 'LABOR' || row['_OBJECTNAME'] == 'AMCREW';
            var objs = grid.GetGanttXY(row, col, x, y);
            if (col === 'G' && allowedRow) {
            		if (allowedRow && this.enableModAvail) {
                    // returns the "selection" as distinct list of resources and activities
            		var selection = this._GetSelectedObjectIds(grid, col, row);
                    if (selection == "") {
                    	selection = row['_OBJECTID'];
                    }
                    var selectedDate = row['START'];
                    if (objs != null && objs.Type != null && objs.RunId) {
                    	var runId = objs.RunId;
                    	var r = this.GetRowById(runId);

                    	log.debug('Selected Row: {}', r);
                    	selectedDate = r['START'];
                    }
            		this._modavailrsncode(selection, selectedDate, r);
            	}
            }
        },
        
        openModAvailDialog: function (selection, selectedDate, row) {
            var dialogname = 'MODIFYMODAVAIL';
        	addCommInput('selection', selection);
        	addCommInput('workdate', selectedDate);
        	addCommInput('actionname', dialogname);
        	addCommInput('dialogname', dialogname);
        	addCommInput('linkedapp', dialogname);
        	addCommInput('skdobjectname', row['_OBJECTNAME']);
        	addCommInput('objectname', row['_OBJECTNAME']);
        	addCommInput('eventtargetid', 'viewerng_resourcetabs_rshb_gantt');
        	addCommInput('projectid', this.projectid);
        	addCommInput('reasoncode', this.selectedModAvailReasonCode);
        	addCommInput('durationtype', this.selectedModAvailDurationType);
        	log.debug("sendEvent({},{})", dialogname, this.appname);
        	sendEvent(dialogname, this.appname, '');
        },

        attachExtraGridEvents: function (gridId) {
            this.inherited(arguments);
            log.debug('{} Registering extra grid events', this.TAG);

            AddEvent('OnGetGanttHeader', this.gridId, lang.hitch(this, this.OnGetGanttHeader));
            this.subscribeOn('skd.refreshResource', lang.hitch(this,this._refreshResource));
            this.subscribeOn('skd.cancelModAvailDialog', lang.hitch(this,this._cancelModAvailDialog));
        },

        OnGetGanttHeader: function (/*TGrid*/ grid, /*string*/ val, /*int*/ index, /*int*/ date, /*int*/ nextdate, /*string*/ units, /*int*/ width, /*int*/ partial, /*string*/ col) {
        	if (index == 1 && partial == 1) {
        		val = '... ' + DateToString(date, 'MMM yyyy');
        	}

        	var currMonth = DateToString(date, 'MMM yyyy');
        	var nextMonth = DateToString(nextdate, 'MMM yyyy');
        	if (index == 1 && this.grid.Cols['G'].GanttZoom == 'week' && currMonth != nextMonth) {
        		val = currMonth + ' - ' + nextMonth;
        	}
        	return val;
        },

        OnSaveCustomCfg: function (/*TGrid*/ grid, /*bool*/ ret) {
            if (!this.state) this.state={};
            // add in Filter state..
            if (grid && grid.Filter) {
                if (!this.state.Filter) this.state.Filter={};
                this.state.Filter.Visible = grid.Filter.Visible;
            }

            var ptStart = grid.GetScrollLeft(2);
            var ganttStart = grid.GetGanttDate(ptStart, "G");
            if (!isNaN(ganttStart)) {
            	this.state.GanttStart = ganttStart;
            }

            var cfg = json.stringify(this.state);
            log.debug("Custom State", cfg);
            return cfg;
        },

        OnRenderFinish: function (/*TGrid*/ grid) {
            this.inherited(arguments);

            var ptStart = grid.GetScrollLeft(2);
            this.weekStart = grid.GetGanttDate(ptStart, "G");
            this._setStartDate(this.weekStart);
        },
      
        postCreate: function() {
            this.inherited(arguments);
            var me = this;
            this.aspectShowHideElHandle = aspect.after(window, "hideShowElement", function (el, display) {
                    if (el && el.querySelector && el.querySelector("#"+me.domId)) {
                        log.debug("ShowHideEl: called with {}", display);
                    }
                }, true);
        },

        destroy: function() {
            this.inherited(arguments);
            if (this.aspectShowHideElHandle) {
                this.aspectShowHideElHandle.remove();
                this.aspectShowHideElHandle=null;
            }
        },

        OnGetGanttBarHtml: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ width, /*int*/ comp, /*int*/ crit, /*int*/ plan, /*int*/ index, /*string*/ txt, /*int*/ left, /*int*/ maxwidth, tgClasses, runErrorFlag) {
            //log.debug("1: w: {}, crit: {}, comp: {}, plan: {}, index: {}, txt: {}, left: {}, maxW: {}, cls: {}", width, crit, comp, plan, index, txt, left, maxwidth, tgClasses );
            // find the template
            var tpl = '{name}';
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
                var cls = '', altCls1 = '', clsInner;
                if (row["_INTERNALSTATUS"] != null) {
                    cls = "SKD" + row['_OBJECTNAME'] + "_" + row["_INTERNALSTATUS"];
                } else {
                    cls = "SKD" + row['_OBJECTNAME'];
                }
                if (this.usePriorityColors && row["WOPRIORITY"]) {
                    cls = "SKD" + row['_OBJECTNAME'] + "_PRIORITY_" + row["WOPRIORITY"];
                }
                clsInner = cls+"-inner";
                if (row["STATUS"]) {
                    var val = ("SKDSYN_" + row['_OBJECTNAME'] + "_" + row["STATUS"].toString().replace(/\s+/g,'-'));
                    cls += (" " + val);
                    clsInner += (" " + val + "-inner");
                }
                if (row.ERRVAL) {
                    // log.debug("ERROR CHECK: {}: {}", row.id, row.ERRVAL);
                    cls = "";
                    if   ((row.ERRVAL & (this.ERRORS.ERR_INVALID_CRAFT_SKILL)) != 0) {
                        // log.debug("ERROR CHECK: {}: invalid skill map: {}; {}", row.id, row.ERRVAL, (row.ERRVAL & (1 << 2)));
                        cls = "skd-InvalidSkillMap";
                    }

                    if ((row.ERRVAL & (this.ERRORS.ERR_CONFLICT_DOUBLE_BOOKED)) != 0 || (row.ERRVAL & (this.ERRORS.ERR_CONFLICT_NON_WORK)) != 0) {
                        // log.debug("ERROR CHECK: {}: conflict: {}; {}", row.id, row.ERRVAL, (row.ERRVAL & (1 << 3)));
            			if (row["_INTERNALSTATUS"] == 'ASSIGNED') {
                        	cls += " skd-Conflict";
			            }
                    }

                    if ((row.ERRVAL & (this.ERRORS.ERR_SCHEDULE_WINDOW)) != 0) {
                        // log.debug("ERROR CHECK: {}: schedule window", row.id);
                        cls += " skd-err-schedule-window";
                    }

                    if (cls == '') {
                        // log.debug("ERROR CHECK: {}: other error: {}", row.id, row.ERRVAL);
                        cls += " skd-error";
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
                var clses = 'skd-bar ' + cls + ' ' + altCls1 + ' ' + altCls + ' ' + readonlyStart + readonlyDur + readonlyAssign + readonly;
                var altclses = 'skd-bar-inner ' + clsInner + " " + (altCls ? (altCls + '-inner '):'');
                var barStyle=null;
                if (this.GetBarStyle) {
                    barStyle=this.GetBarStyle(row);
                    if (barStyle) {
                        // we need a better way for this
                        var styleName = 'st-'+row.id;
                        var styleEl = document.createElement('style');
                        styleEl.type = 'text/css';
                        styleEl.innerHTML = '.' +styleName+ ' { '+barStyle+' }';
                        clses += ' ' + styleName;

                        if (!tgClasses) {
                            tgClasses=[];
                        }

                        // set the bar colors
                        tgClasses[2] = clses;
                        // set text properties
                        tgClasses[3] = altclses;

                        text = row['TEXT'];
                        var bar = '<div class="' + clses + '" style="'+barStyle+'" >' + ((text) ? text : '') + '</div>';
                        return bar;
                    }
                }

                if (!tgClasses) {
                    tgClasses=[];
                }

                // set the bar colors
                tgClasses[2] = clses;
                // set text properties
                tgClasses[3] = altclses;

                if (text != null) {
                    text = text.replace(/\|/g, '&vert;');
                    text = text.replace(/\'/g, '&apos;');
                }
                return text;
            }
        },

        GetModAvailList: function(row) {
            var dayIndex = row.DAYINDEX % 7;
			if (dayIndex == 0)
				dayIndex = 7;
            var weekIndex = row.WEEK;
            var modAvailList;
            if (row.parentNode) {
            	var modAvailProp = 'WEEK' + weekIndex + '_MODAVAILINFO' + dayIndex;
            	modAvailList = row.parentNode[modAvailProp];
            	if (modAvailList) {
            		modAvailList = JSON.parse(modAvailList);
            	}
            }
            return modAvailList;
        },

        GetModAvailWeekList: function(row) {
            var weekIndex = row.WEEK;
            var modAvailWeekList = [];
            if (row.parentNode) {
            	for (var i=1; i<=7; i++) {
                	var modAvailProp = 'WEEK' + weekIndex + '_MODAVAILINFO' + i;
                	modAvailList = row.parentNode[modAvailProp];
                	if (modAvailList) {
                		modAvailList = JSON.parse(modAvailList);
                		modAvailWeekList.push(modAvailList);
                	}
            	}
            }
            return modAvailWeekList;
        },

        GetBarStyle: function(row) {
        	if (row['MODAVAILCOLOR']) {
                var style="";
                var rowColor = row['MODAVAILCOLOR'];
                var modAvailList = this.GetModAvailList(row);
                if (modAvailList) {
                    var multipleModAvail = (modAvailList && modAvailList.length > 1);
                    if (multipleModAvail) {
                    	rowColor = '#B03060';
                    	for (var i=0; i<modAvailList.length; i++) {
                    		if (modAvailList[i]['fullDay']) {
                    			row['FULLDAY'] = 1;
                    			if (modAvailList[i]['color']) {
                    				row['MODAVAILCOLOR'] = modAvailList[i]['color'];
                    			}
                    			if (modAvailList[i]['fontColor']) {
                    				row['MODAVAILFONTCOLOR'] = modAvailList[i]['fontColor'];
                    			}
                    		}
                    	}
                    }
                }
                if (row['FULLDAY']) {
                    style+=("background-color: " + row['MODAVAILCOLOR'] + "!important;");
                    style+=("color: " + row['MODAVAILFONTCOLOR'] + "!important;");
                    style+=("margin: 0px -15px;");
                }
                if (!row['FULLDAY'] || multipleModAvail) {
                    style+=("background: linear-gradient(to top right,transparent 50%," + rowColor + " 0) top right/25px 25px no-repeat,transparent;");
                    style+=("border-radius: 12px;");
                    style+=("margin: 0px -13px;");
                }
                return style;
        	}
        },
        
        _cancelModAvailDialog: function () {
        	this.grid.ClearSelection();
        },

        _refreshResource: function (data) {
        	this.__pleaseWait(this.label('loading_resources'));
        	this.grid.ReloadBody();
        	this.grid.ClearSelection();
        },

        _showLegendDialogAction: function() {
        	var me = this;
        	var reasonCodeLabel = this.label('reasonCode');
        	var allocationLabel = this.label('allocation');
        	var closeLabel = this.label('closeButton');
        	var workLabel = this.label('work');
        	var nonWorkLabel = this.label('nonWork');

    		var thresholds = this.allocationThresholds.split(',');
    		var colors = this.allocationColors.split(',');
        	
        	var html = "<table style='border-spacing: 5px;'>";
        	html += "<tr><td colspan='3' style='text-align:center;'><b>" + reasonCodeLabel + "</b></td></tr>";
        	html += "<tr><td colspan='3'>&nbsp;</td></tr>";
           	
        	Object.keys(this.reasonCodeColors).forEach(function(key) {
        	    var colorValue = me.reasonCodeColors[key];
            	html += "<tr><td>" + key + ":<td><td style='width: 35%; border: 1px solid black; background-color: " + colorValue + ";'>&nbsp;</td></tr>";
        	});

        	html += "<tr><td colspan='3'>&nbsp;</td></tr>";
        	html += "<tr><td colspan='3' style='text-align:center;'><input type='button' value='" + closeLabel + "' onclick='Grids.forEach(g=>g ? g.CloseDialog() : null);' /></td></tr>";

        	this.grid.CloseDialog();
        	var mousey = window.outerHeight / (2 * 2);
        	var mousex = window.innerWidth / 2;
        	var me = this;
        	this.invokeLater(function() {
        		me.grid.Dialog = ShowDialog(html, {X:mousex, Y:mousey});
            }, 100, "ShowLegend");
        },

        _previous: function () {
        	this._gotoPeriod(0, this.weekStart);
        },

        _next: function () {
        	this._gotoPeriod(1, this.weekStart);
        },

        /**
         * Go to previous or next period based on zoom selection.
         * 
         * 0 - Previous
         * 1 - Next
         */
        _gotoPeriod: function (direction, selectedDate) {
            var me = this;
        	var selectedZoomLevel = this.grid.Cols['G'].GanttZoom;
        	var zoom = null;
        	if (selectedZoomLevel == 'month') {
        		zoom = 1; // Month
        	}
        	else {
        		zoom = 2; // Week
        	}
        	this.__pleaseWait();
            this.fetch("_gotoPeriod", me._ioOptions({
            	direction: direction,
            	zoomLevel: zoom,
            	weekStart: selectedDate
            })).then(function (reply) {
                var startGanttDate = reply.startGanttDate;
                var endGanttDate = reply.endGanttDate;
                var hasChanges = reply && reply.Changes;
                me.weekStart = startGanttDate;
                if (direction > -1) {
                	me.grid.ZoomTo(startGanttDate, endGanttDate);
                }
                else {
                	var scrollDate = me.weekStart;
                	if (!hasChanges) {
                		scrollDate += 86400000; // Add a day to scroll to the selected week.
                	}
                	me.grid.ScrollToDate(scrollDate, 'Left');
                }

                me.state.GanttStart = me.weekStart;
                if (hasChanges) {
                    me.acceptChangesFromServer(reply);
                	var changes = reply.Changes;
                	for (var i=0; i<changes.length; i++) {
                		var craftRow = changes[i];
                		var newRow = me.grid.GetRowById(craftRow['id']);
                		if (newRow != null) {
                			newRow = me.updateCraftRow(newRow, craftRow);
        					me.grid.RefreshRow(newRow);
                		}
                	}
                    me.grid.RefreshGantt(1);
                }
                me.HideTGMessage();
            });
        },

        updateCraftRow: function (newRow, craftRow) {
			newRow['MODAVAILCOLOR'] = craftRow['MODAVAILCOLOR'];
			newRow['MODAVAILFONTCOLOR'] = craftRow['MODAVAILFONTCOLOR'];
			newRow['_INTERNALSTATUS'] = craftRow['_INTERNALSTATUS'];
			newRow['STATUS'] = craftRow['STATUS'];
			newRow['FULLDAY'] = craftRow['FULLDAY'];
			newRow['_OBJECTNAME'] = craftRow['_OBJECTNAME'];
			newRow['TEXT'] = craftRow['TEXT'];
			if (craftRow['Added'] && craftRow['Added'] == 1) {
				delete newRow['name'];
			}

			var filtered = Object.keys(craftRow).filter(key => key.includes('MODAVAILINFO'));
			for (var i=0; i < filtered.length; i++) {
				newRow[filtered[i]] = craftRow[filtered[i]];
			}
			
			return newRow;
        },

        /**
         * Send the week date that is stored in the cookie to the server 
         */
        _setStartDate: function (currentDate) {
            var me = this;
            this.fetch("_setStartDate", me._ioOptions({
            	currentDate: currentDate
            })).then(function (reply) {
            	var startWeekDay = reply.startWeekDay;
            	me.weekStart = startWeekDay;
            });
        },

        OnZoom: function (/*TGrid*/ grid, /*string*/ zoom, /*int*/ FirstDate, /*int*/ LastDate) {
            try {
                // do process if we don't have a grid or a Toolbar
                if (!grid || !grid.Toolbar) return;

                if (this.lastGanttZoom && this.lastGanttZoom == zoom)
                	return;

                var me = this;
                this.lastGanttZoom = zoom;
            	grid.Toolbar.ZoomInDisabled = 0;
            	grid.Toolbar.ZoomOutDisabled = 0;
                if (zoom == 'week') {
                    grid.Toolbar.ZoomInDisabled = 1;
                    var ganttZoomDate = new Date(FirstDate);
                    var firstDayMonth = new Date(ganttZoomDate.getFullYear(), ganttZoomDate.getMonth(), 1);
                    var diff = firstDayMonth.getDate() - firstDayMonth.getDay();
                    var start = new Date(firstDayMonth.setDate(diff));
                    this.weekStart = this.TZDateToTGDate(start);

                	this.invokeLater(function() {
                		grid.ScrollToDate(me.weekStart, 'Left');
                    }, 10, "ScrollToDate");
                }
                else if (zoom == 'month') {
                    grid.Toolbar.ZoomOutDisabled = 1;
                }
                grid.RefreshRow(grid.Toolbar);
            } catch (e) {
                log.error("OnZoom Hook Failed", e);
            }
        },

        OnGetColor: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ r, /*int*/ g, /*int*/ b) {
        	var color = null;
        	var rgb = JSON.stringify([r, g, b]);
        	// Checking if RGB color match the Alternate colors for odd rows.
        	if (ALTERNATE_ROW_COLOR1 == rgb || ALTERNATE_ROW_COLOR2 == rgb)
        	{
        		color = "white";
        	}

        	if (!this._firstRender) {
            	if (!this.ganttBackground && grid.Cols['G'].GanttBackground) {
                    var ganttBackground = grid.Cols['G'].GanttBackground;
                    this.ganttBackground = ganttBackground.split('White').join('WORKAlternate');
            	}
            	
            	if (col == 'name' && !color && row && this.ganttBackground) {
                    row['GGanttBackground'] = this.ganttBackground;
            	}
        	}

        	return color;
        },

		_GotoSeletedDateActionHandler: function(action, row, date) {
			var start = this.TZDateToTGDate(date.getTime());
			this._gotoPeriod(2, start); // Selected Date (not previous or next)
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
            			applyDateFunc(actionItem, row, value);
            			this._close();
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

        /**
         * In Scheduler Resource, after Toolbar Save, we don't want to refresh the items
         * @param data
         */
        onRefreshRequested: function(data) {
        	this._createUI(); // remove the old grid and create new one
        },

        OnGanttTip: function( grid,  row,  col,  tip,  XY,  name) {
        	var box;

        	if (row['_OBJECTNAME'] == 'CRAFT' || row['_OBJECTNAME'] == 'AMCREWT')
        		return null;

        	if (name === 'Run' && XY && XY['RunId']){
        	    // acount for run box
                box = this.GetRowById(XY['RunId']);
            }

        	var text = null;
        	var dayIndex = box['DAYINDEX'] % 7;
        	if (dayIndex == 0)
        		dayIndex = 7;
        	var modAvailInfo = row['WEEK' + box['WEEK'] + '_MODAVAILINFO' + dayIndex];
        	if (modAvailInfo) {
        		modAvailInfo = JSON.parse(modAvailInfo);
        		if (modAvailInfo.length && modAvailInfo.length > 1) {
        			text = this.label('multipleModAvail');
        		}
        		else {
    				var tpl;
    	            var tplKey = 'gantt.MODAVAIL.tip.tpl';
    	            if (this[tplKey] != null) {
    	                tpl = this[tplKey];
    	                if (tpl == null || tpl.trim().length == 0) tpl = '{reasonCode} / {start}-{finish}';
    	            }

    	            var clonedModAvail = Object.assign({}, modAvailInfo[0]);
        			if (clonedModAvail['duration'] != null) {
        				var duration = this.doubleToDuration(clonedModAvail['duration'], false);
        				clonedModAvail['duration'] = duration;
        			}

    	        	// process template
        			text = lang.replace(tpl, lang.hitch({row: clonedModAvail}, this.__rowValFunc));
    	            if (text == null || text.trim().length == 0) {
            			var interval = " / " + start + "-" + finish;
            			text = clonedModAvail['reasonCode'] + interval;
    	            }
        		}
        	}
        	else if (box['PATTERNDAYDESC']) {
        		text = box['TEXT'] + ' = ' + box['PATTERNDAYDESC'];
        	}

        	return text;
        }
    });
});

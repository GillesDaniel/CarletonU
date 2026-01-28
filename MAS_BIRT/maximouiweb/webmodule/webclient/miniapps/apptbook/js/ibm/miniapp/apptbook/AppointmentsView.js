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
    "com/ibm/tivoli/maximo/miniapps/_MiniApp",
    "com/ibm/tivoli/maximo/miniapps/_MaximoIO",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
	"com/ibm/tivoli/maximo/miniapps/Handlers",
    "dojo/date",
    "ibm/tivoli/mbs/dijit/DateTimeCalendar",
    "dijit/Calendar",
    "dijit/popup",
    "dojo/request",
    "dojo/json",
    "dojo/dom"


], function(lang, declare, _MiniApp, _MaximoIO, log, Handlers, dates, DateTimeCalendar, Calendar, popup, request, json, dom){
    return declare([_MiniApp, _MaximoIO, Handlers], {
		// static variables
        GANTTCOL: 'GANTT',
		gridId: 'apptbook',
		grid: null,
        projectid: '',
    	
    	constructor: function(options) {
            this.TAG=options.TAG||'APPTBOOK';

    		if (options.loglevel) {
    			log.LOG_LEVEL=options.loglevel;
    		}
    		
    		log.debug("{} options", this.TAG, options);
    		this.options=options||{};

            // listen for the sample click using dojo publish/subscribe
			this.subscribeOn('apptbook.toolbar.sample', lang.hitch(this, this.OnSampleIconClick));
    	},

		OnSampleIconClick: function(msg) {
			log.debug("Clicked the sample icon in the toolbar, message: {}", msg);
			alert('Sample');
		},

        startup: function() {
        	this.inherited(arguments);

        	var me=this;
        	log.debug("{} Dynamic TreeGrid... loading dynamic library...", this.TAG);
        	if (window.TreeGrid) {
        		me.createUI();
        		return;
        	}
			/**
			 * if useSources==1 then the loader will attempt to load TreeGrid from the TreeGrid sources.
			 * For this to work the TreeGrid sources needs be extracted in the same location as the deployed
			 * source.  ie, GridE.js and GridESrc.js needs to be in the same directory.
			 *
			 * A small change needs to be made to GridESrc.js.  It attempts to use a document.write() which is
			 * not allowed in Google Chrome, remove that section of the try and ond leave the catch part, which
			 * does the same thing except uses createElement.  (ie, look at the code and remove document.write section
			 * and leave the document.createElement section)
             */
			var useSources=0;
			var gridUrl = this.rootUrl + "/libraries/treegrid/Grid/GridE.js";
			if (useSources) {
				gridUrl = this.rootUrl + "/libraries/treegrid/Grid/GridESrc.js";
			}
			this.loadLibrary(
				// check return true when TreeGrid is loaded
				function () {
					return window.TreeGrid!=null;
				},
				gridUrl,
				// call createUI after TreeGrid is loaded
				lang.hitch(me, me.createUI));
        },

		_removeOldGrid: function() {
			if (this.grid != null) {
				log.debug('{} Cleaning up TreeGrids', this.TAG);
				if (this.clearHandlers) this.clearHandlers();
				try {
					this.grid.Dispose();
				} catch (ex) {
					log.warn('{} TreeGrid clean up encountered an error', this.TAG, ex);
				}
			}
		},

		destroy: function () {
			this._removeOldGrid();
			this.inherited(arguments);
		},

		createUI: function() {
			if (window.TreeGrid) {
				log.debug("TreeGrid Release: {}, {}", window.Component.Version, window.Component.Release);
			}
			log.debug("Creating Gantt UI");

            if (this.grid) {
                this._removeOldGrid();
            }

            var options = {
				Data: {
					Url: this.toUrl('get_root_data', {}),
					Timeout: 300
				},
				Page: {
					Url: this.toUrl('get_child_data', {}),
					Timeout: 300,
					Format: 'JSON'
				},
				Layout: {
					Url: this.toUrl('create_ui', { startDate: (new Date).getTime() }),
					Timeout: 300
				}
			};

			// use ,Event to debug TreeGrid Events
			// use ,Info to debug performance #s
			options.Debug = options.Debug || 'Problem,Error,IOError';

			// localized data
			options.Text = options.Text || {Url: this.toUrl('load_labels', {}), Format: 'JSON'};

			// setup your events...
			TGSetEvent('OnLoadError', this.gridId, function (grid, err) {
				log.error(err);
				sendEvent("showwarnings", this.appid);
			});
			TGSetEvent('OnGetGanttHeader', this.gridId, lang.hitch(this, this.OnGetGanttHeader));
			TGSetEvent('OnIncDate', this.gridId, function (grid, ts, units, count) {
				if(units == "t") {  
            		var date = new Date(ts);
            		var tomorrow = new Date(date);
            		tomorrow.setDate(date.getDate() + count); 
            		return tomorrow-0; 
        		} 
				return null;
			});

			// bind a treegrid event to a method of this class
            TGSetEvent('OnRightClick', this.gridId, lang.hitch(this, this.OnRightClick));
			TGSetEvent('OnRenderFinish', this.gridId, lang.hitch(this, this.OnRenderFinish));

            // OnClick hide the calendars
            TGSetEvent('OnClick', this.gridId, lang.hitch(this, this.OnClick));

            // handle toolbar buttons in a better way
            Grids.OnClickButton = lang.hitch(this, function(Grid, Row, IconName, Event) {
                if (this['On'+IconName+'Click']) {
                    log.debug("CLICK Toolbar Icon: {}", IconName, Event);
                    this['On'+IconName+'Click'](Event);
                    return 1;
                }
                log.debug("No On{}Click handler defined", IconName);
            });

			// create the grid
			this.grid = TreeGrid(options, this.domNode, this.gridId);
			window.AddGanttUnits("t",86400000,null);
		},

        OnGetGanttHeader: function (grid, val,index,date,nextdate,units) {
            log.debug(val);
            if(val.indexOf('.') >= 0) {
                return "<div id='date_" + val + "' class=\"weather\"></div>";
            } else {
                var items = val.split(" ");
                var html = "<span class=\"DayNumber\">" + items[0] + "</span><span>" + items[1] + "</span>"
                return html;
            }
        },

		OnRenderFinish: function(/*TGrid*/ grid) {
			log.debug("Resizing to Fit")
			grid.ActionZoomFit();
			this.grid = grid;
		},

        onRefreshRequested: function(data) {
			log.debug("Refresh UI");
    		this.createUI();
        },

		/**
		 * OnRightClick is called when an object needs a Context Menu.  The Content Menu is primarily Async, in that
		 * A request to server is made, and the server responds with th menu to show.  The menu is then Augmented with
		 * any static menu entries.  If the menu ends up with items, then it is shown.  When an item is clicked, IF
		 * the item has an internal method then the method called, against the GanttWidget, otherwise, the menu
		 * is dispatched to the server to be handled.
		 */
		OnRightClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
			if (!event.metaKey) {
				this.closeDatePicker && this.closeDatePicker();
			}

			// only process right clicks on Data Rows
			if (row == null || row.Kind != 'Data') return;

			// this.focusGanttObject(grid, row, col, x, y, event);

			// keep track of the clicked x,y in this widget, since we'll use it later for showing menus
			this.eventPageX = event.pageX;
			this.eventPageY = event.pageY;
			log.debug("OnRightClick: {}", col);
			grid.Focus(row, col, null, false);
			if (col == this.GANTTCOL) {
				var objs = grid.GetGanttXY(row, col, x, y);
				if (objs != null && objs.Type != null && objs.Type != 'line') {
					this.OnActivityContextMenu(grid, row, col, x, y, event);
				} else {
					return false;
				}
			} else {
				this.OnTableContextMenu(grid, row, col, x, y, event);
			}
			return true;
		},

        /**
         * Activity Context menu is similar to the Context Menus for the Table, except it is shown for a Gantt Item.
         */
        OnActivityContextMenu: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            log.debug("OnActivityContextMenu: {}", row['id']);
            return this.OnTableContextMenu(grid, row, col, x, y, event);
        },

        OnContextMenu: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*string*/ result) {
            log.debug('OnContextMenu: {} {}', col, result);
        },

        OnTableContextMenu: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            log.debug("OnTableMenuContextMenu: {}", col, grid.Cols[col]);
            var me = this;
            if (!grid.Cols[col]) return false;

            if (col == this.GANTTCOL) {
                value = row['id'];
            } else {
                value = row[col];
            }
            row = this.GetRow(grid, row, col, x, y);

            var objs = grid.GetGanttXY(row, col, x, y);
            if (objs != null && objs.Type == 'dependency') {
                // store the selected dependency for later
                this._EDIT_DEPENDENCY = objs;
                log.debug("Dependency Menu Fetch for", objs);
                this.fetch("async_get_table_context_menu", {
                    projectid: me.projectid,
                    id: objs.DependencyFrom,
                    col: "dependency",
                    value: objs.DependencyTo + objs.DependencyType
                }).then(function (menu) {
                    //menu = me._AdditionalTableContextMenu(menu, grid, row, col, x, y, event);
                    me._ShowContextMenu(menu, grid, row, col, x, y, event);
                });
            } else {
                // returns the "selection" as distinct list of resources and activities
                var selectedItems = this.GetSelectionIds(grid, col, row);
                // returns the selection as just a list of row ids
                var selection = this._GetSelectedRowIds(grid, col, row);

                log.debug("OnTableMenuContextMenu: Context Menu: Selection: {}", selection, selectedItems);

                this.fetch("async_get_table_context_menu", {
                    projectid: me.projectid,
                    id: selection,
                    selection: selectedItems,
                    col: col,
                    value: value
                }).then(function (menu) {
                    menu = me._AdditionalTableContextMenu(menu, grid, row, col, x, y, event);
                    me._ShowContextMenu(menu, grid, row, col, x, y, event);
                });
            }

            return true;
        },

        /**
         * Returns an Array of ALL the selected rows.  If RunBoxes are seleted, it will return those rows as
         * selected rows.  In all cases the curRow is added to the list, IF it's not already in the list of
         * selected rows.  ie, this should always return an array of least 1 item.
         */
        _GetSelectedRows: function (grid, col, curRow) {
            var rows = [];
            if (col == this.GANTTCOL) {
                var boxes = grid.GetGanttRunSelectedBoxes (null, col);
                if (boxes.length > 0) {
                    for (var i = 0; i < boxes.length; i++) {
                        var id = boxes[i].Id;
                        if (id) {
                            var r = this.GetRowById(id);
                            if (r != null) {
                                rows.push(r);
                            }
                        }
                    }
                } else {
                    // No RUN Boxes selected, so get normal rows
                    var rows = grid.GetSelRows();
                }
            } else {
                // normal table rows
                var rows = grid.GetSelRows();
                //if two rows add selected run boxes for assignto action on select resourcerow
                if (rows.length ===2){
                    var boxes = grid.GetGanttRunSelectedBoxes (null, this.GANTTCOL);
                    if (boxes.length > 0) {
                        for (var i = 0; i < boxes.length; i++) {
                            var id = boxes[i].Id;
                            if (id) {
                                var r = this.GetRowById(id);
                                if (r != null) {
                                    rows.push(r);
                                }
                            }
                        }
                    }
                }
            }

            var addRow = true;
            for (var i = 0; i < rows.length; i++) {
                if (curRow != null && rows[i].id == curRow.id) {
                    addRow = false;
                    break;
                }
            }
            if (curRow != null && addRow) {
                rows.push(curRow);
            }
            return rows;
        },

        /**
         * Called GetSelectedRows and return the IDs as a comma separated list of IDs
         */
        _GetSelectedRowIds: function (grid, col, curRow) {
            var rows = this._GetSelectedRows(grid, col, curRow);
            var selection = "";
            var comma = "";
            for (var k in rows) {
                selection = selection + comma + rows[k]['id'];
                comma = ",";
            }
            return selection;
        },

        isResourceView: function() {
            return false;
        },

        /**
         * Returns an object with 'activities' and 'resources' arrays that contain the selected bars and table rows
         */
        GetSelection: function (grid, col, curRow) {
            var selection = {
                activities: [],
                resources: []
            };
            var resView = this.isResourceView;
            var boxes = grid.GetGanttRunSelectedBoxes (null, this.GANTTCOL);
            if (boxes.length > 0) {
                for (var i = 0; i < boxes.length; i++) {
                    var id = boxes[i].Id;
                    if (id) {
                        var r = this.GetRowById(id);
                        if (r != null) {
                            selection.activities.push(r);
                            // for a 'box' bar, add in it's parent, which is a resource node
                            if (r.parentNode && resView) {
                                selection.resources.push(r.parentNode);
                            }
                        }
                    }
                }
            }

            // add the focussed gantt object to the selection
            if (this._focusGanttObject) {
                selection.activities.push(this._focusGanttObject);
            }

            var rows = grid.GetSelRows();
            if (rows && rows.length) {
                if (this.isResourceView()) {
                    selection.resources = selection.resources.concat(rows);
                } else {
                    selection.activities = selection.activities.concat(rows);
                }
            }

            // add in the current row
            if (curRow) {
                if (curRow.Type == 'box') {
                    selection.activities.push(curRow);
                    if (this.isResourceView()) {
                        selection.resources.push(curRow.parentNode);
                    }
                } else {
                    // table row
                    if (this.isResourceView()) {
                        selection.resources.push(curRow);
                    } else {
                        selection.activities.push(curRow);
                    }
                }

                selection.current_row = curRow;
                selection.current_row_parent = curRow.parentNode;
                selection.current_row_type=(this.isResourceView)?1:0;
            }

            if (col) {
                selection.col = col;
                if (curRow && col != this.GANTTCOL) {
                    selection.col_value = curRow[col];
                }
            }

            return selection;
        },

        GetSelectionIds: function (grid, col, curRow) {
            var sel = {
                activities: [],
                resources: []
            };

            var haveit = {};
            var selObjs = this.GetSelection(grid, col, curRow);
            for (var i=0;i<selObjs.activities.length;i++) {
                if (!haveit[selObjs.activities[i].id]) {
                    sel.activities.push(selObjs.activities[i].id);
                    haveit[selObjs.activities[i].id]=1;
                }
            }
            haveit = {};
            for (var i=0;i<selObjs.resources.length;i++) {
                if (!haveit[selObjs.resources[i].id]) {
                    sel.resources.push(selObjs.resources[i].id);
                    haveit[selObjs.resources[i].id]=1;
                }
            }

            if (selObjs.current_row) {
                sel.current_row=selObjs.current_row.id;
            }
            if (selObjs.current_row_parent) {
                sel.current_row_parent=selObjs.current_row_parent.id;
            }

            sel.current_row_type=(this.isResourceView)?1:0;
            sel.col = col;
            sel.col_value = selObjs.col_value;
            return sel;
        },
        
        
        /**
         * Used to resolve the 'real' row in case the current row/col is a RunBar, and we want the row of the actual Acttivity item.
         */
        GetRow: function (/*TGrid*/grid, /*TRow*/row, /*String*/col, x, y) {
            if (col != this.GANTTCOL) return row;

            var objs = grid.GetGanttXY(row, col, x, y);
            if (objs != null && objs.Type != null) {
                // console.log("We Have a TIP FOR GANTT", objs);
                if (objs.RunId) {
                    // we have RunBar, look up the actual row with data
                    return this.GetRowById(objs.RunId);
                }
            }

            return row;
        },

        GetRowById: function (id) {
            return this.grid.GetRowById(id);
        },

        /**
         * Called when an action in the Context Menu is selected for the Table Content Menu
         *
         * Context Menu Process / LifeCycle
         *  If item.Values.dialogname is not null, then it will show a Maximo Dialog with that same name.
         *  If item.Values.dialogname is "GOTO" then it will goto the app encoded in the Values
         *  If item.Value resolves to a method in the app, then it will call that method passing the item and row
         *  If none of the above happens, then the menu item is sent the server event handler for 'on_handle_context_menu_item'
         *    - The Reply from the on_handle_context_menu_item should be a JSON Reply
         *    - If this class has a function item.Value+'Reply' then that function is called, passing the reply
         *    - If Reply.IO.Result==1000, then the entire Grid is reloaded
         *    - If Reply.Changes exists, then those changes are applied to the current grid
         *    - If Reply.IO.Result < 0, then an error has happened
         *
         *  E.g., if item.Value = 'getData', then the process will check if this.getData exists as a function and call
         *  it.  If it does not exist, then it pass the call the server, and then process the reply.  When the reply comes
         *  back, IF this.getDataReply exists, then the reply will be passed to that function.  If the reply function
         *  does not exist, and the repsonse is a Changes response, then those changes will be applied to the Grid
         *  automatically.
         */
        OnContextMenuItemSelected: function (/*TMenuItem*/item, /*TROW*/row) {
            var me = this;
            log.debug("OnContextMenuItemSelected", item);
            if (item.Values && item.Values.dialogname) {
                if (item.Values.dialogname != "GOTO") {
                    this.OnShowMaximoDialog(item);
                } else {
                    this.OnGoToMaximoApplication(item);
                }
            } else if (this[item.Value]) {
                // try to invoke this as being an internal method handler
                try {
                    log.debug("Calling ContextMenu Handler: {}", item.Value);
                    this[item.Value](item, row);
                } catch (e) {
                    log.error("Error While Invoking Internal Method for {}", item.Value, e);
                }
            } else {
                if (item.longOpMessage) {
                    //this.grid.ShowMessage(item.longOpMessage);
                    this.publishPleaseWait(item.longOpMessage);
                }

                // send the content menu item back to the server for processing
                this.fetch("on_handle_context_menu_item", {
                        projectid: this.projectid,
                        id: this.SetIDFromItem(item),
                        value: item.Value,
                        values: item.Values
                    }
                ).then(function (reply) {
                    me.progress(true);
                    if (me[item.Value + "Reply"]) {
                        log.debug(" handle_context_menu_item: Sending Reply To {}", item.Value + "Reply");
                        me[item.Value + "Reply"](reply, item, row);
                    } else {
                        me.handleServerReply(reply, item);
                    }
                    // if the item requests a clear selection, then do it.
                    if (item.ClearSelection == true || (reply && reply.IO && reply.IO.ClearSelection == true)) {
                        me.grid.ClearSelection();
                    }
                    me.progress(false);
                });
            }
        },

        handleServerReply: function(reply, sourceItem) {
            sourceItem = sourceItem || {};

            // apply changes as if we got a ReplyBuilder reply
            if (reply && reply.Changes) {
                this.acceptChangesFromServer(reply);
                this.sendToBeSaved();
            } else if (reply && reply.IO) {
                log.debug("Handling Reply.IO", reply);
                if (reply.IO.Result == 1000) {
                	this.grid.ActionReload();
                    this.sendToBeSaved();
                } else if (reply.IO.Result == 1001) {
                    // send to saved so that we can process any sync requests
                    this.sendToBeSaved();
                } else if (reply.IO.Result < 0) {
                    log.error("Error Processing Action: {}, Error: {}", sourceItem.Value, reply.IO.Result);
                } else {
                    log.error("Server Reply for Action: {}, OK Result: {}", sourceItem.Value, reply.IO.Result);
                }
            } else {
                log.debug("no reply to process", reply);
            }
        },

        publishPleaseWait: function(msg) {
            this.publishTo("apptbook.ui.please-wait", msg);
        },

        acceptChangesFromServer: function(changes) {
            if (changes && changes.Changes) {
                log.debug("Begin Applying Changes from server")
                this.grid.AddDataFromServer(changes);
                log.debug("Done Applying Changes from server")
            } else {
                log.warn("No Changes", changes);
            }
        },

        ReloadBody: function (handler) {
            if (handler == null) handler = function () {
                log.debug('Reload Complete');
            };
            log.debug("Reloading Body");
            this.grid.ReloadBody(handler);
        },

        OnShowMaximoDialog: function (/*TMenuItem*/item) {
            // Thread-28 -  SKDViewer -- addCommInput('linkedapp', 'MODIFYWO');addCommInput('objectname', 'WORKORDER');addCommInput('selection', '[1670]');addCommInput('linkedvalue', '');addCommInput('uniqueid', '1670');addCommInput('linkedattribute', '');sendEvent('MODIFYWO', 'scheduler','');
            log.debug("Show Maximo Dialog", item.Values);
            for (var k in item.Values) {
                log.debug("addCommInput({},{})", k, item.Values[k]);
                addCommInput(k, item.Values[k]);
            }
            //addCommInput('linkedapp', 'MODIFYWO');addCommInput('selection', '[1670]');addCommInput('linkedvalue', '');addCommInput('uniqueid', '1670');addCommInput('linkedattribute', '');
            log.debug("sendEvent({},{})", item.Values.dialogname, this.appname);
            sendEvent(item.Values.dialogname, this.appname, '');
        },

        OnGoToMaximoApplication: function (/*TMenuItem*/item) {
            log.debug("Go To Maximo Application", item.Values);
            for (var k in item.Values) {
                log.debug("addCommInput({},{})", k, item.Values[k]);
                addCommInput(k, item.Values[k]);
            }
            //addCommInput('linkedapp', 'MODIFYWO');addCommInput('selection', '[1670]');addCommInput('linkedvalue', '');addCommInput('uniqueid', '1670');addCommInput('linkedattribute', '');
            log.debug("sendEvent({},{})", item.Values.dialogname, this.appname);
            sendEvent("applink", this.appname, '');
        },

        _OnDebugItem: function (/*TMenuItem*/item) {
            if (item.Col == this.GANTTCOL) {
                log.debug("DEBUG GANTT ITEM", item.Row);
            } else {
                log.debug("DEBUG ITEM {}", item.Row['name'], item.Row);
            }
        },

        _OnClearSavedState: function() {
            this.fetch("clear_saved_state");
        },


        _ShowContextMenu: function (/*TMenu*/menu, /*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            if (menu) {
                var me = this;
                var pos;
                try {
                    log.debug("Dynamic Menu", menu);

                    if (col == this.GANTTCOL) {
                        // we are in the Gantt Area
                        pos = {X: event.clientX, Y: event.clientY};
                    } else {
                        pos = {Tag: grid.GetCell(row, col)};
                    }

                    this._currentContextRow = row;

                    grid.HideTip();
                    grid.CloseDialog();
                    menu.ZIndex = 50001; // Setting z-index to a value higher than Maximo's Dialog.
                    grid.Dialog = grid.ShowPopup(menu, function (/*TMenuItem*/item) {
                        me.OnContextMenuItemSelected(item, row);
                    });
                } catch (ex) {
                    log.error("error processing menu", ex, menu, col, row);
                }
            } else {
                log.debug('No Menu for {}', col, row);
            }
        },

        /**
         * Child Classes can optionall override this to add static menus
         */
        _AdditionalTableContextMenu: function (/*TMenu*/menu, /*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            log.debug('_AdditionalTableContextMenu: {}', col);
            if (col == 'name' || col == this.GANTTCOL) {
                menu = menu || {Items: []};
                log.debug('Adding Debug Menus');
                if (this.loglevel <= 0) {
                    // if Internal is set to true, then the Value is executed as the action for the item
                    menu.Items.push({
                        Name: '-',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });
                    menu.Items.push({
                        Name: 'Debug Item',
                        Value: '_OnDebugItem',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });
                    menu.Items.push({
                        Name: 'Clear Saved State',
                        Value: '_OnClearSavedState',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });
                    menu.Items.push({
                        Name: 'Fetch UI Model',
                        Value: '_FetchUIModel',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });
                    menu.Items.push({
                        Name: 'Fetch Data Model',
                        Value: '_FetchDataModel',
                        Grid: grid,
                        Row: row,
                        Col: col,
                        X: y,
                        Y: y
                    });
                }
            }
            return menu;
        },

        /**
         * Debug Method For fetching the UI JSON Model
         * @private
         */
        _FetchUIModel: function() {
            window.open(this.grid.Data.Layout.Url);
        },
        /**
         * Debug Method For fetching the UI JSON Model
         * @private
         */
        _FetchDataModel: function() {
            window.open(this.grid.Data.Data.Url);
        },

        /**
         * Converts a GMT0 Time to normal Browser TZ date.
         * @param time {number} as a Date
         * @returns {number}
         */
        TGDateToTZDate: function(time) {
            return (new Date(time + (new Date(time).getTimezoneOffset() * 60 * 1000))).getTime();
        },

        /**
         * Convert a TZ date to GMT0
         * @param time {number} as a Date
         * @returns {number}
         */
        TZDateToTGDate: function(time) {
            return time - (new Date().getTimezoneOffset() * 60 * 1000);
        },

        /**
         * Convert a TG GMT0 Date into a User's TZ Date on the Server
         *
         * @param time {number} as a Date
         * @returns {number}
         */
        TGDateToUserTZDate: function(time) {
            return time+(this.GMT0TZOffset||0);
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

        LoadNewDateForModel: function(date) {
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            var me=this;
            this.fetch("goto_date", {
                projectid: this.projectid,
                tzOffset: date.getTimezoneOffset(),
                date: date.getTime(),
                fmtDate: date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
            }).then(function (reply) {
                me.handleServerReply(reply);
            });
        },

        // toolbar action
        OnNEXTClick: function(event) {
            var me=this;
            this.fetch("goto_date_offset", {
                projectid: this.projectid,
                dateOffset: 1
            }).then(function (reply) {
                me.handleServerReply(reply);
            });
        },

        OnPREVClick: function(event) {
            var me=this;
            this.fetch("goto_date_offset", {
                projectid: this.projectid,
                dateOffset: -1
            }).then(function (reply) {
                me.handleServerReply(reply);
            });
        },

        OnGOTOTODAYClick: function(event) {
            log.debug("Goto TODAY");
            this.LoadNewDateForModel(new Date());
        },
        OnGOTOSELECTDAYClick: function(/*TEvent*/event) {
            log.debug("Goto Selected DAY [TG Event]>", event);
            try {
                // where to show the calendar
                this.eventPageX=event.ClientX;
                this.eventPageY=event.ClientY;
                this._selectDatePopupAction('_movetoSelectedDate', null, Calendar, lang.hitch(this, this._GotoSeletedDateActionHandler));

            } catch (ex) {
                log.error("Goto TODAY failed", ex);
            }
        },

        _GotoSeletedDateActionHandler: function(action, row, date) {
            log.debug("Need to Jump to this date: {}", date);
            this.LoadNewDateForModel(date);
            //this.ZoomTo(this.TZDateToTGDate(date.getTime()), null);
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

            var time=this.getVisibleStartDate();
            if (row!=null) {
                time=this._findEarliestStartDate(row);
            }
            if (!time) time=new Date().getDate();

            // horrible, horrible hack.
            // TreeGrid dates are GMT0, so we need to make the date appear correctly, by adjusting for the TimeZone
            var date = new Date(time);
            //if (CalendarWidget === DateTimeCalendar) {
            date = new Date(time + (new Date(time).getTimezoneOffset() * 60 * 1000));
            log.debug("CalendarWidget: Adjusting Time for TimeZone: {} - {} - {} - {}", time, new Date(time), new Date(time).toISOString(), new Date(time).getTimezoneOffset());
            //}

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

                onChange: function (value){
                    // horrible hack.  The date we get from the picker has TZ info, we need to strip it.
                    // we added the timezone to show the correct time coming in, now that the user selected
                    // a time we need to subtract it
                    if (CalendarWidget === DateTimeCalendar) {
                        log.debug("CalendarWidget: Adjusting for TimeZone {}", value.getTimezoneOffset());
                        value = new Date(value.getTime() - (value.getTimezoneOffset() * 60 * 1000));
                    }
                    log.debug('OnChange: {}', value);
                    this._close();
                    applyDateFunc(actionItem, row, value)
                }
            };

            picker = new CalendarWidget(pickerOpts);
            popup.moveOffScreen(picker);
            dojo.marginBox(picker.domNode, { w: 100 });
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
                y: this.eventPageY
            });

            log.debug("Showing Calendar Popup: x,y; {},{}", this.eventPageX, this.eventPageY);
        },

        _createZoomRange: function (/*long*/start, /*long*/end) {
            var range = {};
            var delta = end - start;
            var ONE_DAY = 24 * 60 * 60 * 1000;
            var ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
            if (delta < ONE_DAY) {
                range.start = start - ((ONE_DAY - delta) / 2);
                range.end = range.start + ONE_DAY;
            } else if (delta < ONE_WEEK) {
                range.start = start - ((ONE_WEEK - delta) / 2);
                range.end = range.start + ONE_WEEK;
            } else {
                range.start = start - ONE_DAY;
                range.end = end + ONE_DAY;
            }
            return range;
        },

        ZoomTo: function (start, end, width, exactDates) {
            var exact = exactDates || false;
            if (start != null && end === null) {
                log.debug("ZoomTo: Adjusting end because it is null");
                end = start + this.DURATION_ONE_DAY; // defined GanttActions.js
                exact = true;
            }
            log.debug("{} ZoomTo: {}, {}", this.TAG, new Date(start), new Date(end));
            if (!start || !end || start == null || end == null || start <= 0 || end <= 0 || start == end) {
                log.warn("{} ZoomTo called with invalid start {} and end times {}", this.TAG, start, end);
                return;
            }
            ;

            log.debug("{} Zooming Befor Create Range: {} - {}", this.TAG, start, end);
            if (exact === true) {
                range = {start: start, end: end};
            } else {
                range = this._createZoomRange(start, end);
            }
            log.debug("{} Zooming After Create Range: {} - {}", this.TAG, range.start, range.end);
            try {
                log.debug("{} Zooming: {} - {}", this.TAG, new Date(range.start), new Date(range.end));
                this.grid.ZoomTo(new Date(range.start), new Date(range.end), width);
            } catch (ex) {
                log.error('{} error during ZoomTo', this.TAG, ex);
            }

            log.debug("{} Zoomed: {} - {}", this.TAG, new Date(range.start), new Date(range.end));
        },

        getVisibleStartDate: function () {
            var scrollLeft = this.grid.GetScrollLeft(2);
            var pt = scrollLeft;
            var date = this.grid.GetGanttDate(pt, this.GANTTCOL);
            log.debug("Gantt Date: " + date);
            return date;
        },

        getVisibleMidDate: function () {
            var wid = this.grid.GetBodyWidth(2);
            var scrollLeft = this.grid.GetScrollLeft(2);
            var pt = scrollLeft + (wid/2);
            var date = this.grid.GetGanttDate(pt, this.GANTTCOL);
            //log.debug("getVisibleMidDate: left: {}, width: {}, point: {}, date: {}, utc: {}", scrollLeft, wid,pt, date, new Date(date).toUTCString());
            return date;
        },

        OnClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
        	this.hideTooltip(grid, row, col, x, y, event);
            return false;
        },

        hideTooltip: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
            this.closeDatePicker && this.closeDatePicker();
            if (event.metaKey) {
            	return this.OnRightClick(grid, row, col, x, y, event);
            }
        }
    });
});

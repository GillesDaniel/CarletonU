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
    "ibm/miniapp/scheduler/gantt/WorkView",
    "com/ibm/tivoli/maximo/miniapps/Handlers",
], function (declare, _MaximoIO, log, lang, WorkView, Handlers) {
    return declare([WorkView, _MaximoIO, Handlers], {
        constructor: function (options) {
            this.ViewName = 'Scheduler';
            this.locked = false;
            this.selectedPMRow = null;
            this.PDFSource = "ExportPDF.html"
            this.Layoutxml = null;
            this.Dataxml = null;
            this.allSegments = {};
            this.modifiedPMRowId = null;
            this.previousPMRowState = null;
            this.Undoing = false;
            this.rightClickMove = false;
        },

        upgradeTGInstance: function(grid) {
            this.inherited(arguments);

            // add filter CPM
            this.grid._enableFilterCPM = lang.hitch(this, this._enableFilterCPM);
            this.grid._disableFilterCPM = lang.hitch(this, this._disableFilterCPM);

            // add please wait dialog function
            this.grid._runCPM = lang.hitch(this, this._runCPM);
            this.grid._runCPMSelected = lang.hitch(this, this._runCPMSelected);
            this.grid._createLinksCPM = lang.hitch(this, this._createLinksCPM);
            this.grid._printToPDF = lang.hitch(this, this._printToPDF);
            this.grid._runUpdateSummary = lang.hitch(this, this._runUpdateSummary);
        },

        attachExtraGridEvents: function (gridId) {
            this.inherited(arguments);

            TGSetEvent('OnSelectGanttRunRect', gridId, lang.hitch(this, this.OnSelectGanttObjects));
            TGSetEvent('OnFocus', gridId, lang.hitch(this, this.OnFocus));
            TGSetEvent('OnExport', gridId, lang.hitch(this, this.OnExport));
            TGSetEvent('OnUpload', gridId, lang.hitch(this, this.OnUpload));

            log.debug('{} Registering extra grid events', this.TAG);
            this.subscribeOn('skd.request.workview.reference', lang.hitch(this, this.publishResponseWorkViewReference));
        },

        publishResponseWorkViewReference: function(msg) {
            this.publishTo('skd.response.workview.reference', {grid: this.grid, view: this});
        },

        _removeOldGrid: function() {
            // tell other views we are being destroyed
            this.publishTo('skd.workview.destroyed');
            this.inherited(arguments);
        },

        /**
         * In Scheduler WorkView, after Toolbar Save, we don't want to refresh the items
         * @param data
         */
        onRefreshRequested: function(data) {
			if ((data && data.sourceId && data.sourceId.indexOf('_SAVE')!=-1)
				|| (data && data.type && data.type == 'toBeSaved')) {
            	log.warn("Refresh Ignored because of Toolbar Save", data);
            }
			else {
                this.inherited(arguments);
            }
        },

        OnAfterSave: function (/*TGrid*/grid, /*int*/result, /*boolean*/autoupdate) {
            // only notify updates if the update was sucessful
            if (result >= 0 && !this.locked) {
                this.inherited(arguments);
                // Check if PM has been actually modified
                var modified = false;
                if (this.allSegments != null) {
                	for (var key in this.allSegments) {
                		var segmentDate = new Date(this.allSegments[key]);
                		segmentDate.setHours(0,0,0,0);
                		var updatedSegment = grid.GetRowById(key);
                		var updatedSegmentDate = new Date(updatedSegment['startTime']);
                		updatedSegmentDate.setHours(0,0,0,0);
                		if (segmentDate.getTime() != updatedSegmentDate.getTime()) {
                			modified = true;
                			break;
                		}
                	}

                	if (!modified && !this.rightClickMove && this.modifiedPMRowId != null) {
                		var pmRow = grid.GetRowById(this.modifiedPMRowId);
                		pmRow.Color = null;
                		pmRow['_UNCOMMITTED'] = 0;
                		grid.RefreshRow(pmRow);
                		this.modifiedPMRowId = null;
                	}
                }
                // Resetting right click move flag.
                this.rightClickMove = false;
            }
        },

        OnExport: function(grid, data, pdf) {
        	if (pdf == 1) {
        		var url = this.servletBase + "/utility/tg/ExportPdf.jsp";
        		var servletUIBase = this.servletBase.replace('/webclient', '');
        		var layoutXML = this.Layoutxml;
        		var dataXML = this.Dataxml;
        		if (this.pdfExportBaseUrl) {
        			layoutXML = layoutXML.replace(servletUIBase, this.pdfExportBaseUrl);
        			dataXML = dataXML.replace(this.servletBase, this.pdfExportBaseUrl);
        		}
        		layoutXML = encodeURIComponent(layoutXML);
        		dataXML = encodeURIComponent(dataXML);
        		data = encodeURI(data);
        		var scheduleName = encodeURI(this.projectName);
        		var PrintPageWidth = Math.round(grid.PrintPageWidth*25.4/grid.PrintDPI+grid.PrintMarginWidth);
        		var PrintPageHeight = Math.round(grid.PrintPageHeight*25.4/grid.PrintDPI+grid.PrintMarginHeight);
        		var postBody = "PDFName=" + grid.PDFName + "&PDFFormat=" + grid.PDFFormat + "&Data=" + data + "&PDFPageOrientation=" + grid.PrintPageOrientation;
        		postBody = postBody + "&PrintMarginWidth=" + grid.PrintMarginWidth + "&PrintMarginHeight=" + grid.PrintMarginHeight + "&PrintDPI=" + grid.PrintDPI;
        		postBody = postBody + "&PDFPageSize=" + grid.PrintPageSize + "&Layoutxml=" + layoutXML + "&Dataxml=" + dataXML + "&Source=" + this.PDFSource;
        		postBody = postBody + "&ProjectName=" + scheduleName + "&PrintPageWidth=" + PrintPageWidth + "&PrintPageHeight=" + PrintPageHeight;
        		postBody = postBody + "&PDFFitPage=" + grid.PDFFitPage;
        		var xhr = new XMLHttpRequest();
        		xhr.open("POST", url, true);
        		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        		xhr.send(postBody);
        		this.ShowProgress(grid, 90, 30, 500);
        		return true;
        	}
        	else {
        		return false;
        	}
        },

        OnUpload: function (/*TGrid*/ grid, /*string*/ xml, /*TRow*/ row, /*bool*/ autoupdate) {
        	if (xml.indexOf('PM_') > -1 && this.previousPMRowState == 0 && this.Undoing) {
        		var changes = JSON.parse(xml);
        		var change = changes.Changes[0];
        		change.Undoing = true;
        		this.Undoing = false;
        		xml = JSON.stringify(changes);
        	}
        	return xml;
        },
        
        _enableFilterCPM: function () {
            log.debug("{} Enable Filter CPM", this.TAG);
            this._CPMFilterEnabled = true;
            this._FilterCPM();
        },

        _disableFilterCPM: function () {
            log.debug("{} Disable Filter CPM", this.TAG);
            this._CPMFilterEnabled = false;
            this._FilterCPM();
        },

        _FilterCPM: function () {
            log.debug('{} Filter CPM', this.TAG);
            var me = this;
            this.fetch("_cpmfilter", me._ioOptions({
            	filteredByCriticalPath: me._CPMFilterEnabled
            })).then(function (reply) {
            	me.grid.AddDataFromServer(reply);
            	me.grid.RefreshGantt(1);
            });
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

        _runCPM: function () {
            log.debug('{} Run CPM', this.TAG);
            this.__pleaseWait();
            var me = this;
            this.fetch("_cpmall", me._ioOptions({
            })).then(function (reply) {
            	me.grid.AddDataFromServer(reply);
            	if (reply.IO.Result > 0) {
            		me._firstRender = false;
                	me.grid.ReloadBody(function() {
                        me.invokeLater(function() {
                        	me.grid.RefreshGantt(1);
                        }, 100, 'cpmGanttRefresh');
                    });
                	var showMessage = true;

                	if (reply.HasCritical) {
                    	showMessage = false;
                	}

                	me.publishLater('skd.workview.updated', {
                        grid: me.grid,
                        result: reply.Result
                    });

                	me.MarkToBeSaved();
            	}
            	else {
            		me.HideTGMessage();
            		me.grid.ShowMessageTime(reply.IO.HtmlMessage, 0);
            	}
            });
        },

        _runCPMSelected: function () {
            log.debug('{} Run CPM Selected', this.TAG);
            this.__pleaseWait();
            var selection = this._GetSelectedRowIds(this.grid, null, null);
            var me = this;
            this.fetch("_cpmselected", me._ioOptions({
            	ids: selection
            })).then(function (reply) {
            	me.HideTGMessage();
            	me.grid.AddDataFromServer(reply);

            	me.publishLater('skd.workview.updated', {
                    grid: me.grid,
                    result: reply.Result
                });

            	me.grid.ClearSelection();
            	me.MarkToBeSaved();

            	var changes = reply.Changes;
            	for (var i=0; i<changes.length; i++) {
            		var row = me.grid.GetRowById(changes[i]['id']);
            		if (row) {
                		row['_UNCOMMITTED'] = changes[i]['_UNCOMMITTED'];
                		me.grid.RefreshRow(row);            			
            		}
            	}
            });
        },

        _createLinksCPM: function () {
            log.debug('{} Create Links CPM', this.TAG);
            this.__pleaseWait();
            var selection = this._GetSelectedRowIds(this.grid, null, null);
            var me = this;
            this.fetch("_cpmcreatelinks", me._ioOptions({
            	ids: selection
            })).then(function (reply) {
            	if (reply.IO.Result >= 0) {
                	me.HideTGMessage();
                	me.grid.AddDataFromServer(reply);

                	me.publishLater('skd.workview.updated', {
                        grid: me.grid,
                        result: reply.Result
                    });

                	me.MarkToBeSaved();
            	}
            	else {
            		me.HideTGMessage();
            		me.grid.ShowMessageTime(reply.IO.HtmlMessage, 0);
            	}
            });
        },

        _printToPDF: function () {
        	this.grid.ActionExportPDF();
        },

        ShowProgress: function(grid, total, position, timeout) {
        	var me = this;
    		setTimeout(function () {
    			grid.ShowProgress('Export PDF', 'Preparing Print job...', null, position, total);
    			if (position >= total) {
    				grid.ShowMessageTime('Print job submitted.', 2000);
    			}
    			else {
    				position = position + 30;
    				me.ShowProgress(grid, total, position, timeout);
    			}
            }, timeout);
        },
        
        _runUpdateSummary: function() {
            log.debug('{} Run Update Summary', this.TAG);
            this.__pleaseWait();
            var me = this;
            this.fetch("_updateSummary", me._ioOptions({
            })).then(function (reply) {
            	if (reply.IO.Result > 0) {
            		me.HideTGMessage();
            		me.grid.AddDataFromServer(reply);

                	me.publishLater('skd.workview.updated', {
                        grid: me.grid,
                        result: reply.Result
                    });

                	me.MarkToBeSaved();
            	}
            });
        },

        OnActivityChanged: function (/*TGrid*/grid, /*TRow*/ row, /*string*/ col, /*int*/ plan, /*object*/ newObj, /*object*/ oldObj, /*string: Resize,Move,New,Delete,DeleteAll,Correct*/ action) {
        	log.debug('{} OnActivityChanged', this.TAG);
        	var me = this;
        	if (action == "Resize" || action == "Move") {
        		var impactCriticalPath = false;
        		var root = this.GetRootActivity(grid);
        		if (root == null) {
        			return;
        		}
        		var projectStart = root['EARLYSTART'];
        		var projectEnd = root['LATEFINISH'];
        		if ((row["CRITICAL"] != null && row["CRITICAL"]) || 
        				(projectStart != null && newObj.StartDate < projectStart) || 
        				(projectEnd != null && newObj.EndDate > projectEnd))
        		{
        			impactCriticalPath = true;
        		}

        		if (impactCriticalPath) {
        			if (this.showCriticalPathImpactWarning) {
                		me.locked = true;
                        this.ask("scheduler#criticalPathActivityMoved").then(function (reply) {
                        	log.debug('Response: {}', reply)
                        	me.locked = false;
                        	// Yes
                        	if (reply == 8) {
                                me.publishLater('skd.workview.updated', {
                                    grid: grid,
                                    result: reply
                                });
                                me.MarkToBeSaved();
                        	}
                        	// No or Cancel
                        	else {
                        		grid.ActionUndo();
                        	}
                        });
        			}
        		}
        		else {
        			this.sendToBeSaved();
        		}
        	}
        },

        focusGanttBar: function (row) {
        	if (row && row['_OBJECTNAME'] != null && row['_OBJECTNAME'] == 'PM' && this.selectedPMRow != null) {
        		this.selectedPMRow = null;
        		return;
        	}
        	this.inherited(arguments);
        },
        
        OnUndo (/*TGrid*/ grid, /*string*/ action, /*TRow*/ row, /*TRow*/ parent, /*TRow*/ next) {
        	if (action == "Change" && parent == "startTime") {
        		var parentRow = row.parentNode;
        		if (parentRow && this.previousPMRowState == 0) {
        			parentRow['_UNCOMMITTED'] = 0;
        			grid.RefreshCell(parentRow, 'name');
        			this.Undoing = true;
        		}
        	}
        },
        
        OnDragGanttRun: function (/*TGrid*/ grid, /*TRow*/ row, /*string */col, /*int */index, /*bool */start, /*int */newDate, /*int */oldDate, /*int */change, /*int */dir, /*object */XY, /*string */keyprefix, /*int */clientX, /*int */clientY) {
        	var result = this.inherited(arguments);
        	if (row && row['_OBJECTNAME'] != null && row['_OBJECTNAME'] == 'PM') {
        		this.allSegments = {};
            	for (i=1; i<=row['_PMFORECAST-SEGMENTCOUNT']; i++) {
            		var segId = row['_idx'] + '__' + i;
            		var segment = grid.GetRowById(segId);
            		if(segment !=null)
            			this.allSegments[segId] = segment.startTime;
            	}
        	}
        	return result;
        },

        OnGanttChanged: function(/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*string*/ item,
                /*type*/ newVal, /*type*/ newVal2, /*type*/ old, /*type*/ old2, /*string*/ action) {
        	if (row['_OBJECTNAME'] != null && row['_OBJECTNAME'] == 'PM' && (action == 'Slide' || action == 'Move')) {
        		if (row['_seq'] && row.parentNode) {
        			row = row.parentNode;
        		}
        		this.selectedPMRow = row;
        		this.modifiedPMRowId = row.id;
        		this.previousPMRowState = row['_UNCOMMITTED'];
        		row.Color = this._pmreforecastpendingBG;
        		grid.RefreshRow(row);
        	}

        	var useSetValue = false;
        	if (item == 'Dependency' && (action == 'New' || action == 'Delete')) {
        		if (newVal2[1]) {
        			var targetRow = grid.GetRowById(newVal2[1]);
        			this.SetValue(targetRow, '_UNCOMMITTED', 1, true);
        			this.OnRowChanged(grid, targetRow);
        		}
        		useSetValue = true;
        	}

            if (useSetValue) {
            	this.SetValue(row, '_UNCOMMITTED', 1, true);
            }

            if (this.state && this.state.Filter && this.state.Filter.Visible  && action != 'Slide' && action != 'Move' && action != 'Correct' ) {
            	var filters = grid.GetFilter();
            	if (Array.isArray(filters) && filters.length && filters.length > 0)
            	{
            		this.grid.DoFilter();
            	}
            }

            this.OnRowChanged(grid, row);
        },

        GetRootActivity: function (/*TGrid*/grid) {
        	return grid.Body.firstChild;
        },

        MarkToBeSaved: function() {
        	this.sendToBeSaved();
        },
    });

});

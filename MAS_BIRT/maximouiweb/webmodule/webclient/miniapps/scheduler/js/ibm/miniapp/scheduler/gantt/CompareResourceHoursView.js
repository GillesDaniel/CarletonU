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
    "ibm/miniapp/scheduler/gantt/CompareWorkView",
    "dojo/_base/lang",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
], function (declare, CompareWorkView, lang, log) {

	var ONE_DAY = 24 * 60 * 60 * 1000;

    return declare([CompareWorkView], {
        // Maybe somday there'll be something unique about Resource Views, but for now, the compare is same as work
        addCustomActions: function(gridId) {
            // add ZoomToWork action
            // This is called from the ZoomToWork Toolbar Action
            window.Grids.ZoomToWork = lang.hitch(this, this.ZoomToWork);
        },
    	
        ZoomToWork: function(grid, focus, test, show) {
            log.debug("ZoomToWork: focus: {}, test: {}, show: {}", focus, test, show);
            if (test) return;

            var state={start:0,end:0};
            this._applyToRow(grid.Body, state, function(row, state) {
                if (row.availcommon) {
                	var availSet = row.availcommon.split(';');
                	for (i=0; i<availSet.length; i++) {
                		var avail = availSet[i].split('#');
                		if (avail == "")
                			continue;
                		var dates = avail[1].split('~');
                        if (state.start==0) {
                            state.start=dates[0];
                            state.startRow=row;
                        } else {
                            if (dates[0]<state.start) {
                                state.start=dates[0];
                                state.startRow=row;
                            }
                        }
                        if (state.end==0) {
                            state.end=dates[1];
                            state.endRow=row;
                        } else {
                            if (dates[1]>state.end) {
                                state.end=dates[1];
                                state.endRow=row;
                            }
                        }
                	}
                }
                if (row.loadcommon) {
                	var availSet = row.loadcommon.split(';');
                	for (i=0; i<availSet.length; i++) {
                		var avail = availSet[i].split('#');
                		if (avail == "")
                			continue;
                		var dates = avail[1].split('~');
                        if (state.start==0) {
                            state.start=dates[0];
                            state.startRow=row;
                        } else {
                            if (dates[0]<state.start) {
                                state.start=dates[0];
                                state.startRow=row;
                            }
                        }
                        if (state.end==0) {
                            state.end=dates[1];
                            state.endRow=row;
                        } else {
                            if (dates[1]>state.end) {
                                state.end=dates[1];
                                state.endRow=row;
                            }
                        }
                	}
                }
                if (row.overloadcommon) {
                	var availSet = row.overloadcommon.split(';');
                	for (i=0; i<availSet.length; i++) {
                		var avail = availSet[i].split('#');
                		if (avail == "")
                			continue;
                		var dates = avail[1].split('~');
                        if (state.start==0) {
                            state.start=dates[0];
                            state.startRow=row;
                        } else {
                            if (dates[0]<state.start) {
                                state.start=dates[0];
                                state.startRow=row;
                            }
                        }
                        if (state.end==0) {
                            state.end=dates[1];
                            state.endRow=row;
                        } else {
                            if (dates[1]>state.end) {
                                state.end=dates[1];
                                state.endRow=row;
                            }
                        }
                	}
                }
                return true;
            });

            // if we are less than a day, just expand to a day
            state.start = parseInt(state.start);
            state.end = parseInt(state.end);
            var delta = state.end - state.start;
            if (delta <= ONE_DAY) {
                state.start = state.start - ((ONE_DAY - delta) / 2);
                state.end = state.start + ONE_DAY;
            }

            log.debug("ZoomTo", state);
            if (state.start && state.end) {
                this.ZoomTo(state.start, state.end, null, true);
            } else {
                log.warn("Nothing To ZoomTo");
            }
            return true;
        }
    });

});

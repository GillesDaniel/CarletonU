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

/**
 * 
 */
define([
	"dojo/_base/lang",
   "dojo/_base/declare",
   "dojo/dom-construct",
   "dojo/_base/array",
   "com/ibm/tivoli/maximo/miniapps/Handlers",
   "com/ibm/tivoli/maximo/miniapps/_MaximoIO"
	
], function (lang, declare, domConstruct, arrayUtils, Handlers, _MaximoIO) {
    var _LocSegFromMap = declare([Handlers, _MaximoIO], {
    	
		Boxes: null,     // Global property to store the actually highlighted boxes
		locateSegFromMap: false,
		
        constructor: function (options) {
			dojo.mixin( this, options );
        	thisLocSegFromMap=this;
        },
        
		OnClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
			console.debug("Clicked row: " + row + " col: " + col + " x: " + x + " y: " + y );

			if (col == "Mark") {
				this.Highlight(grid,row.Text, row, false);
				return false;			
			}			
				
			this.Clear(grid, col, row);
            return false;
		},

		OnRenderPageFinish : function(grid, trowFinished){
			this._delayAfterPostRenderPageFinish(this, grid, trowFinished);
		},

		Highlight: function (G,text, row, loopedOnce){
			this.Clear(G, null, null);

			// --- Highlight selected box ---
			this.Boxes = G.FindGanttRunBoxes({Id:text},2,"Id");
			
			if (this.Boxes.length > 0) {
				if (this.Boxes[0].Length > 1) {
					G. ScrollToDate(this.Boxes[0].Length/2 + this.Boxes[0].Start, "Center")
				} else {
					G. ScrollToDate(this.Boxes[0].Start, "Center")				
				}
				G.ScrollToGanttRunBox(this.Boxes[0], 1);
				G.SetScrollTop(G.GetRowTop(row));
					
				var thisObj = this;
				var T = G.GetGanttRunBoxTag(thisObj.Boxes[0]);
				
				if (T==null && this.Boxes != null && !loopedOnce) {
					setTimeout(function(){
						thisObj.Highlight(G, text, row, true);
					}, 1000);           		
				}
				
				var className = " mark";
				if(T) {
					if(!G.FastGantt && thisObj.Boxes[0].Type != "milestone") {
						T.className += className;
						T = T.firstChild;
					} else if (thisObj.Boxes[0].Type == "milestone") {
						className = " milestoneMark";
					}					
			      	T.className += className;
				}
			}
		},
			 
		// Removes previous highlight
		Clear: function (G, col, row){
			if (this.Boxes && (col == null || (col == "name" && row != null))) {
				if (col == null || this.Boxes[0].Row.id.includes(row.id) ) {					
					console.log(" this name is part of the tree.. remove mark");					
					for(var i=0;i<this.Boxes.length;i++){
						var T = G.GetGanttRunBoxTag(this.Boxes[i]);
						var className = "mark";
						if(T) {
							if(!G.FastGantt && this.Boxes[i].Type != "milestone") {
								if (T.className && T.className.includes(className)) {
									T.className = T.className.replace(className,"");			        	 
								}
								T = T.firstChild;
							} else if (this.Boxes[i].Type == "milestone") {
								className = "milestoneMark";
							}
							if (T.className && T.className.includes(className)) {
								T.className = T.className.replace(className,"");			        	 
							}
						}
					}
					this.Boxes = null;
				}
			}
		},
		
		locateLinearSegment: function(grid, firstPartOfTrowLabel, segInfo) {
        	console.log(" called  locateLinearSegment");
        	var trow = firstPartOfTrowLabel + "--" + segInfo.locLinearSeg;
    		var row = grid.GetRowById(trow);
    		this.linearSegId = segInfo.graphicId;
    		if (row != null) {
    			if (!row.Expanded) {
    				this.locateSegFromMap = true;
    			}
	    		grid.ExpandParents(row);
				grid.Expand(row);
				this.Highlight(grid, segInfo.graphicId, row, false);   			
    		} else {
    			this.Clear(grid, null, null);
    		}
        },
		
        numOfAfterPostRenderPageFinish: 0,

        _delayAfterPostRenderPageFinish: function(thisObj, grid, row) {
			setTimeout(function(){
				if (grid && thisObj.linearSegId) {
					var boxFound = grid.FindGanttRunBoxes(thisObj.linearSegId,2,"Id");
					if (boxFound.length > 0) {
						thisObj.Highlight(grid, thisObj.linearSegId, row, false);
						thisObj.numOfAfterPostRenderPageFinish = 0;
					} else if (thisObj.numOfAfterPostRenderPageFinish++ < 30){
						thisObj._delayAfterPostRenderPageFinish(thisObj, grid, row);
					} else {
						thisObj.numOfAfterPostRenderPageFinish = 0;						
					}
				}
			}, 1000);  
        }
    });

    return _LocSegFromMap;
});

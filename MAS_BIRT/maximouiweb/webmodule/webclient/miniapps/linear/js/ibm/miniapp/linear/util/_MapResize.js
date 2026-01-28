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
   "dojo/_base/declare",
   "dojo/dom-construct"
	
], function (declare, domConstruct) {
    var _MapResizeBase = declare([], {
    	
    	catchClientYStart: 0,
    	mapDivElement: null,
    	mapResizer: null,
    	linearObj: null,
    	
        constructor: function (linearObj) {
        	this.linearObj = linearObj;
        	thisMapResizeObj=this;
        },
        
        create: function () {
			this.mapDivElement = dojo.byId( "mxmap_div-mapcontrol_mapdiv" );
			this.mapResizer = domConstruct.create( "div", {
				"class" : "mapResizer",
				"id" : "mapResizer",
			});
			
			this.mapDivElement.appendChild(this.mapResizer);
			this.mapResizer.addEventListener("mousedown", this.initMapResize, false);
        },
        
        destroy: function() {
			domConstruct.destroy( "mapResizer" );
			thisMapResizeObj.stopMapResize;
        },
        
        initMapResize: function (e) {
			thisMapResizeObj.catchClientYStart = e.clientY;
			window.addEventListener("mousemove", thisMapResizeObj.mapResize, false);
			window.addEventListener("mouseup", thisMapResizeObj.stopMapResize, false);
		},
		
		mapResize: function (e) {
			var MIN_MAP_HEIGHT = 4;
			var availableHeight = thisMapResizeObj.linearObj.getAvailableHeightInMapTab();
			var currentHeight = e.clientY - thisMapResizeObj.catchClientYStart + thisMapResizeObj.mapDivElement.offsetHeight;

			if (currentHeight + thisMapResizeObj.linearObj.MIN_HEIGHT > availableHeight) {
				return;
			}
			
		   	thisMapResizeObj.mapDivElement.style.height = Math.max(currentHeight, MIN_MAP_HEIGHT) + "px";
		   	thisMapResizeObj.catchClientYStart = e.clientY;

			thisMapResizeObj.linearObj.positionTool();
			thisMapResizeObj.linearObj._resize();
		},
		
		stopMapResize: function (e) {
			window.removeEventListener("mousemove", thisMapResizeObj.mapResize, false);
		    window.removeEventListener("mouseup", thisMapResizeObj.stopMapResize, false);
		}
        
    });

    return _MapResizeBase;
});

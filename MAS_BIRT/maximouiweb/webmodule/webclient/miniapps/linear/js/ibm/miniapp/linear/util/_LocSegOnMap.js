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
   "com/ibm/tivoli/maximo/miniapps/_MaximoIO"
	
], function (lang, declare, domConstruct, arrayUtils, _MaximoIO) {
    var _LocSegOnMap = declare([_MaximoIO], {
    	
    	clickedObj: null,
		linearOnMouseOverEvents: null,
		linearOnMouseOutEvents: null,
		map: null,
		linear:null,
		
        constructor: function (options) {
			dojo.mixin( this, options );
        	thisLocSegOnMap=this;
			this.linearOnMouseOverEvents = [];
			this.linearOnMouseOutEvents = [];			
        },
        
		OnClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event, map) {
			console.debug("Clicked row: " + row + " col: " + col + " x: " + x + " y: " + y );
			
			this.map = map;
			
            // only process right clicks on Data Rows
            if (row == null || row.Kind != 'Data') return false;

            console.debug("OClick for row.Kind Data: {}", col);

            if (col == 'G') {
                var objs = grid.GetGanttXY(row, col, x, y);
                this.clickedObj = grid.GetGanttRunBox(row, col, objs.RunIndex);
                let clickedObjMeasureUnitId = null;
                let parsedObject; 

                try {
                    parsedObject = JSON.parse(this.clickedObj.Row.run);
                } catch (error) {
                    parsedObject = this.clickedObj.Row.run;
                    log.warn('{} Could not get measure unit from clicked object', error);
                } finally {
                    clickedObjMeasureUnitId = parsedObject[0].measureUnitId;
                }

                if (objs != null && objs.Type != null && objs.Type != 'line') {
					var maximoMapMeasureUnit = "";

					var mapMeasureUnit;
					if (!this.map || !this.map.isMapGraphite()) {
						mapMeasureUnit = this.map.map._params.units;
					}

        			switch(mapMeasureUnit) {
	    				case "esriMeters":
	    			        maximoMapMeasureUnit = "METER";
	    			        break;
	    				case "esriMiles":
	    			        maximoMapMeasureUnit = "MILES";
	    			        break;
	    				case "esriKilometers":
	    			        maximoMapMeasureUnit = "KM";
	    			        break;
	    				case "esriCentimeters":
	    			        maximoMapMeasureUnit = "CM";
	    			        break;
	    				case "esriMillimeters":
	    			        maximoMapMeasureUnit = "MM";
	    			        break;
	    				case "esriFeet":
	    			        maximoMapMeasureUnit = "FEET";
	    			        break;
	    				case "esriInches":
	    			        maximoMapMeasureUnit = "INCHES";
	    			        break;
	    			    default:
	    			    	maximoMapMeasureUnit = mapMeasureUnit;
	    			    } 
                	
		    		var linearObjTargetInfo = {
	    				"linearObjTarget": true,
	    				"id": "lvcTargetMapLayer",
	    				"rowName": this.clickedObj.Row.name, 
	    				"rowId": this.clickedObj.Row.id, 
	    				"start": "" + this.clickedObj.Start, 
	    				"end": "" + this.clickedObj.End, 
	    				"measureUnitId": clickedObjMeasureUnitId,
	    				"mapMeasure": maximoMapMeasureUnit
	           		};
	        		
	                this.fetch('get_calculatedMeasure', {linearObjTargetInfo: linearObjTargetInfo}).then(function(linearObjTargetInfo){
	                	thisLocSegOnMap.drawTargetMeasuresOnMap(linearObjTargetInfo);
	                });
	                
	                return true;
                } else {
                	return false;
            	}
            }
        
            return false;

		},

		drawTargetMeasuresOnMap: function(linearObjTargetInfo) {
			if (this.map && this.map.isMapGraphite()) {
				this.map.highlightLinearFeature(linearObjTargetInfo);
				return;
			}

			var linearTargetLayer = null;
			require(["esri/layers/GraphicsLayer"],function (GraphicsLayer) {
			    linearTargetLayer = new GraphicsLayer({
					id : "lvcTargetMapLayer"
				});				
			});
			    
		    linearTargetLayer.linearConfig = linearObjTargetInfo;
		    
			var layerExist = this.map.map.getLayer(linearTargetLayer.id);
			if (layerExist) {
				this.map.map.removeLayer(layerExist);
			}
			
			if (dojo.config.fwm.debug == true) {
				console.debug("[Linear] Loading target layer ", linearTargetLayer.id);
			}
			
			if (this.linearOnMouseOverEvents.length > 0) {
				arrayUtils.forEach(this.linearOnMouseOverEvents, lang.hitch(this, function(mouveOverEvent, j){
					dojo.disconnect(mouveOverEvent);
				}));
				this.linearOnMouseOverEvents = [];
			}
			
			if (this.linearOnMouseOutEvents.length > 0) {
				arrayUtils.forEach(this.linearOnMouseOutEvents, lang.hitch(this, function(mouveOutEvent, j){
					dojo.disconnect(mouveOutEvent);
				}));
				this.linearOnMouseOutEvents = [];
			}
			
			if (layerExist) {
				linearTargetLayer.clear();
			}
			
			require(["ibm/tivoli/fwm/mxmap/linear/Linear"], function(Linear){
    			if (thisLocSegOnMap.linear == null) {
    				thisLocSegOnMap.linear = new Linear({map: thisLocSegOnMap.map.map}); 
    				thisLocSegOnMap.linear.symbologyManager = thisLocSegOnMap.map.getSymbologyManager();
    			}				
			});

			this.linear.setMeasureUnits(linearObjTargetInfo.mapMeasure);
			var initialDistanceParameter = linearObjTargetInfo.calculatedStartMeasure;
		    var distanceParameter = Number(linearObjTargetInfo.calculatedEndMeasure) - Number(initialDistanceParameter);
		    var id = linearObjTargetInfo.id;
		    linearTargetLayer.linearConfig.mapConfig = this.map.mapConf;
		    
		    if (this.map.mapConf.currentMbo.FC) {
		    	this.linear.createTargetGraphics(this.map.mapConf.currentMbo.FC.geometry.paths,
		  			initialDistanceParameter, distanceParameter, id, linearTargetLayer, this.map.map);
		    } else {
		    	this.linear.createTargetGraphics(this.map.mapConf.currentMbo.autolocate.FC.geometry.paths,
  			  		initialDistanceParameter, distanceParameter, id, linearTargetLayer, this.map.map);
		    }
			var linearOnMouseOver = dojo.connect(linearTargetLayer, "onMouseOver", lang.hitch(this, function(evt) {
				var g = evt.graphic;
				// this.linear.enableHighlight(g); onMouseOver is Not Leveraged right now
			}));
			this.linearOnMouseOverEvents.push(linearOnMouseOver);
			var linearOnMouseOut = dojo.connect(linearTargetLayer, "onMouseOut", lang.hitch(this, function(evt) {
				var g = evt.graphic;
				setTimeout(lang.hitch(this, function(){
					this.linear.disableHighlight(g);
				}), 1000);
			}));
			this.linearOnMouseOutEvents.push(linearOnMouseOut);
			
			this.map.map.addLayer(linearTargetLayer);

		}, 
		
		cleanUp: function() {
			var layerExist = this.map.map.getLayer("lvcTargetMapLayer");
			if (layerExist) {
				this.map.map.removeLayer(layerExist);
			}
		}
        
    });

    return _LocSegOnMap;
});

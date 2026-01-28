/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2016,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
define( "ibm/tivoli/fwm/mxmap/linear/Linear", [
	"dojo/_base/declare", "dojo/parser", "dojo/ready", "ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/geometry/geometryEngine", "ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/geometry/Point", "ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/symbols/SimpleLineSymbol",
	"ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/graphic", "dojo/_base/array", "dojo/_base/lang", "ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/Color", "ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/geometry/Polyline", "ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/symbols/SimpleFillSymbol",
	"ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/geometry/Circle", "ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/symbols/SimpleMarkerSymbol", "dojo/_base/array", "ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/geometry/geometryEngine",
	"ibm/tivoli/fwm/mxmap/symbology/SymbologyManager", "ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/symbols/PictureMarkerSymbol"
	], function ( declare, parser, ready, geometryEngine, Point, SimpleLineSymbol, Graphic, arrayUtils, lang, Color, Polyline, 
			SimpleFillSymbol, Circle, SimpleMarkerSymbol, array, geometryEngine, SymbologyManager, PictureMarkerSymbol ) {

	return declare( null, {

		map : null,
		linearGraphics : null,
		defaultSymbolColor : null,
		linearGraphicSupportLayer : null,
		linearLayers : null,
		linearLayersFields : null,
		linearLayersFieldsLoaded : null,
		linearLayersFieldsLoading : null,
		measureUnits: null,
		spatialReference: null,
		symbologyManager: null,
		constructor : function ( options ) {
			dojo.mixin( this, options );
			this.defaultSymbolColor = new Color( [
				255, 0, 255, 0.5
				] );
			this.linearGraphics = {};
			this.linearGraphics.totalGraphics = 0;
			this.linearLayers = [];



		},
		setSpatialReference: function (spatialReference) {
			this.spatialReference = spatialReference;
		},
		setMeasureUnits: function( measureUnits) {
			switch(measureUnits) {
			case "METER":
				measureUnits = "meters";
				break;
			case "MILES":
				measureUnits = "miles";
				break;
			case "KM":
				measureUnits = "kilometers";
				break;
			case "FEET":
				measureUnits = "feet";
				break;
			default:
				console.warn(" The measure unit used in the map is not suported [Values suported: 'Meters', 'Miles','kilometers','feet'], trying to use the Map unit: ", measureUnits)
				measureUnits = null;
			} 
			if (dojo.config.fwm.debug == true)
			{
				console.log("[Linear] Measure used for calculating distances ", measureUnits);
			}
			this.measureUnits = measureUnits;
		},
		_highlightGraphic : function ( graphic ) {

			if ( this.map.getLayer( "linearGraphicSupportLayer" ) === undefined ) {
				var layerAdd = this.map.on( "layer-add-result", lang.hitch( this, function ( param ) {
					layerAdd.remove();
					this._highlightGraphic( graphic );
				} ) );

				this.linearGraphicSupportLayer = new esri.layers.GraphicsLayer( {
					id : "linearGraphicSupportLayer"
				} );
				this.map.addLayer( this.linearGraphicSupportLayer );
			} else {
				this.linearGraphicSupportLayer = this.map.getLayer( "linearGraphicSupportLayer" );
				var highlightSymbol;
				var highlightColor = graphic.highlightColor;
				if ( graphic.defaultSymbol.declaredClass == "esri.symbol.SimpleFillSymbol" ) {
					highlightSymbol = new SimpleFillSymbol().setColor( highlightColor );
					highlightSymbol.outline.setColor( highlightColor );
				} else {
					highlightSymbol = new SimpleLineSymbol( graphic.defaultSymbol.style, highlightColor, graphic.defaultSymbol.width );
				}
				var geom = graphic.geometry;
				var graphic = new Graphic( geom, highlightSymbol );
				this.linearGraphicSupportLayer.add( graphic );
			}

		},
		enableHighlight : function ( graphic ) {
			if ( graphic.groupGraphics ) {
				arrayUtils.forEach( graphic.groupGraphics, lang.hitch( this, function ( graphicId, i ) {
					var groupGraphic = graphic._layer.graphics[ graphicId ];
					if ( groupGraphic ) {
						this._highlightGraphic( groupGraphic );
					}
				} ) );
			} else {
				if ( graphic ) {
					this._highlightGraphic( graphic );
				}
			}

		},
		disableHighlight : function ( graphic ) {
			if ( this.linearGraphicSupportLayer ) {
				this.linearGraphicSupportLayer.clear();
			}
		},
		/**
		 * Returns a point between 2 points with distance from the first point.
		 * If the points are in lat/long coordinates, we need to pass distanceBetweenPoints as an input parameter,
		 * as geometryEngine.distance calculates planar distance, not geodesic distance.
		 */
		getIntermediatePoint : function ( pointA, pointB, distanceFromPointA, distanceBetweenPoints ) {
			/*
			 * If we already have the distance between the points, no need to calculate it again.
			 */
			if (distanceBetweenPoints) {
				var distance = distanceBetweenPoints;
			} else {
				// begin - geodesicLength fix RRR
				if ( (this.map.spatialReference) && (this.map.spatialReference.wkid == 4326 
						|| this.map.spatialReference.isWebMercator() )) {
					var newLine = new Polyline(this.map.spatialReference);
					newLine.addPath([pointA, pointB]);
					var distance = geometryEngine.geodesicLength( newLine );
				} else {
					var distance = geometryEngine.distance( pointA, pointB, this.measureUnits );
				}
				// end - geodesicLength fix RRR
			}

			var sinAngle = ( Math.abs( pointB.y ) - Math.abs( pointA.y ) ) / distance;

			var newHeight = Math.abs( sinAngle * distanceFromPointA );
			var cosAngle = ( Math.abs( pointB.x ) - Math.abs( pointA.x ) ) / distance;
			var newWidth = Math.abs( cosAngle * distanceFromPointA );

			var xdifference = pointB.x - pointA.x;
			var ydifference = pointB.y - pointA.y;

			if(xdifference == 0){
				var xsign = 0;
			}else{
				var xsign = ( xdifference ) / Math.abs( xdifference );
			}

			if(ydifference == 0){
				var ysign = 0;
			}else{
				var ysign = ( ydifference ) / Math.abs( ydifference );
			}

			var newX = pointA.x + ( xsign * newWidth );
			var newY = pointA.y + ( ysign * newHeight );
			if (this.map.map) {
				var distancePoint = new Point( newX, newY, new esri.SpatialReference( this.map.spatialReference ) );
			} else {
				var mapReference = pointA.spatialReference;
				var distancePoint = new Point( newX, newY, new esri.SpatialReference( mapReference ) );
			}

			return distancePoint;
		},
		clearLinearGraphics : function () {
			arrayUtils.forEach( this.linearLayers, lang.hitch( this, function ( linearLayerId, i ) {
				this.linearGraphics[ linearLayerId ] = null;
			} ) );
			this.linearLayers = [];
			this.linearGraphics.totalGraphics = 0;
			var linearGraphicLayer = this.map.getLayer( "linearGraphicSupportLayer" );
			if ( linearGraphicLayer ) {
				this.map.removeLayer( linearGraphicLayer );
			}
			var graphicsLayerIds = this.map.graphicsLayerIds;
			arrayUtils.forEach(graphicsLayerIds, lang.hitch(this, function(graphicsLayerId, i){
				var layerExist = this.map.getLayer(graphicsLayerId);
				if (layerExist && layerExist.isLinear) {
					layerExist.clear();
				}
			}));
			this.clearOffSetInfo();
		},
		getPointByDistance: function (arrayPoints, distanceParameter, spatialReference ) {
			var nextPoint = null;
			var pointSpatialReference;
			var useGeodesicDistance = false;
			if (spatialReference) {
				pointSpatialReference = spatialReference;
			} else {
				pointSpatialReference = this.map.spatialReference || this.map.firstLayerSpatialReference;
			}
			if ( (pointSpatialReference) && (pointSpatialReference.wkid == 4326 || pointSpatialReference.isWebMercator() ) ) {
				useGeodesicDistance = true;
			}
			var referencePoint = new Point( arrayPoints[ 0 ][ 0 ], arrayPoints[ 0 ][ 1 ], new esri.SpatialReference( pointSpatialReference ) );
			var remainingDistance = distanceParameter;
			var intermediatePoint = null;
			arrayUtils.forEach( arrayPoints, lang.hitch( this, function ( point, i ) {
				if ( nextPoint != null ) {
					referencePoint = dojo.clone( nextPoint );
				}
				nextPoint = new Point( point[ 0 ], point[ 1 ], new esri.SpatialReference( pointSpatialReference ) );
				if ( (nextPoint.x != referencePoint.x || nextPoint.y != referencePoint.y) && intermediatePoint == null ) {
					var distanceBetweenReferenceAndNextPoint;
					/*
					 * If the spatial reference is passed to the function, and we have lat/long coordinates
					 * the distance will be measured by creating a line between the points and getting the line length.
					 */
					if ( useGeodesicDistance ) {
						var newLine = new Polyline(pointSpatialReference);
						newLine.addPath([referencePoint, nextPoint]);
						distanceBetweenReferenceAndNextPoint = geometryEngine.geodesicLength( newLine );
					} else {
						distanceBetweenReferenceAndNextPoint = geometryEngine.distance( referencePoint, nextPoint, this.measureUnits );
					}

					if ( distanceBetweenReferenceAndNextPoint < remainingDistance) {
						remainingDistance = remainingDistance - distanceBetweenReferenceAndNextPoint;
					} else {
						if (useGeodesicDistance) {
							var circle = new Circle({
								center: referencePoint,
								radius: remainingDistance
							});
							var intersection = geometryEngine.intersect(newLine, circle);
							var intermediatePointX = intersection.paths[0][1][0];
							var intermediatePointY = intersection.paths[0][1][1];
							intermediatePoint =  new Point(intermediatePointX, intermediatePointY, pointSpatialReference );
						} else {
							intermediatePoint = this.getIntermediatePoint( referencePoint, nextPoint, remainingDistance);

						}

					}
				}
			}));
			return intermediatePoint;
		},
		loadLinearSymbology: function(layer, linearConfig, linearObject) {
			var objectName = linearConfig.OBJECTNAME;
			var attributeName = linearObject.ATTRIBUTEIDNAMEVALUE;
			var attributeValue = linearObject.NUMVALUE;
			if (attributeValue == null || attributeValue == undefined || attributeValue == "") {
				attributeValue = linearObject.ALNVALUE;
			}
			var linearSymbology = this.symbologyManager.getLinearSymbologyDefinition(layer, objectName, attributeName, attributeValue);
			if (dojo.config.fwm.debug == true)
			{
				console.log("[Linear] Symbology Parameters: ", layer, objectName, attributeName, attributeValue);
				console.log("[Linear] Symbology found: ", linearSymbology);
			}
			return linearSymbology;

		},

		buildPolylinePath: function ( paths, initialDistanceParameter, distanceParameter ) {
			var pathsPolyline = [];
			var distancePoint = null
			var nextPoint = null;
			var featureCircleCenter;
			var referencePointFounded = false;

			var referencePoint = new Point( paths[ 0 ][ 0 ][ 0 ], paths[ 0 ][ 0 ][ 1 ], this.map.spatialReference );

			arrayUtils.forEach( paths[ 0 ], lang.hitch( this, function ( path, i ) {
				if ( nextPoint != null ) {
					referencePoint = dojo.clone( nextPoint );
				}
				nextPoint = new Point( path[ 0 ], path[ 1 ], this.map.spatialReference );
				if ( nextPoint.x != referencePoint.x || nextPoint.y != referencePoint.y ) {
					// begin - geodesicLength fix RRR
					var distance;
					if ( (this.map.spatialReference) && (this.map.spatialReference.wkid == 4326 
							|| this.map.spatialReference.isWebMercator() ) ) {

						var newLine = new Polyline(this.map.spatialReference);
						newLine.addPath([referencePoint, nextPoint]);
						distance = geometryEngine.geodesicLength( newLine );
					} else {
						distance = geometryEngine.distance( referencePoint, nextPoint, this.measureUnits );						
					}
					// end - geodesicLength fix RRR

					if ( distanceParameter != 0 ) {
						var distanceAux = distance;
						if ( distanceAux > initialDistanceParameter ) {
							if ( initialDistanceParameter > 0 ) {
								referencePoint = this.getIntermediatePoint( referencePoint, nextPoint, initialDistanceParameter );
								distanceAux = distanceAux - initialDistanceParameter;
								initialDistanceParameter = 0;
							}

							pathsPolyline.push( [
								referencePoint.x, referencePoint.y
								] );
							if ( distanceParameter > distanceAux ) {
								distancePoint = new Point( nextPoint.x, nextPoint.y, new esri.SpatialReference( this.map.spatialReference ) );
								distanceParameter = distanceParameter - distanceAux;
							} else {
								distancePoint = this.getIntermediatePoint( referencePoint, nextPoint, distanceParameter );
								distanceParameter = 0;
							}
							pathsPolyline.push( [
								distancePoint.x, distancePoint.y
								] );
						} else {
							initialDistanceParameter = initialDistanceParameter - distanceAux;
						}
					} else {
						if ( pathsPolyline.length == 0 && !referencePointFounded ) {
							if ( distance > initialDistanceParameter ) {
								referencePointFounded = true;
								featureCircleCenter = dojo.clone( this.getIntermediatePoint( referencePoint, nextPoint, initialDistanceParameter ) );
							} else {
								initialDistanceParameter = initialDistanceParameter - distance;
							}
						}

					}
				}
			} ) );

			var polylineBuilt ={};
			polylineBuilt.pathsPolyline = pathsPolyline;
			polylineBuilt.featureCircleCenter = featureCircleCenter;
			polylineBuilt.lastDistancePoint = distancePoint;

			return polylineBuilt;

		},

		createTargetGraphics : function ( paths, initialDistanceParameter, distanceParameter, id, layer, map) {
			var pathsPolyline = []; 
			var lastDistancePoint = null;
			var featureCircleCenter;
			var graphics = [];
			var attributes = {};

			var polylineBuilt = this.buildPolylinePath( paths, initialDistanceParameter, distanceParameter );
			pathsPolyline = polylineBuilt.pathsPolyline;
			featureCircleCenter = polylineBuilt.featureCircleCenter;
			lastDistancePoint = polylineBuilt.lastDistancePoint;

			if ( !this.linearGraphics[ layer.id ] ) {
				this.linearGraphics[ layer.id ] = {};
				this.linearGraphics[ layer.id ].length = 0;
				this.linearLayers.push( layer.id );
			}

			var mboName = layer.linearConfig.mapConfig.currentMbo.mxdata.mboName;
			var linearSymbology = this.symbologyManager.getLinearSymbologyDefinition(mboName,
					"lvcTargetMapLayer", "lvcTargetDefaultAttribute", "lvcTargetDefaultValue");

			var lineColor = new Color([210, 105, 30, 0.9]); 
			var circleColor = new Color([210, 105, 30, 0.9]);
			var circleLineColor = new Color([210, 105, 30, 0.5]);
			var highlightColor = this.defaultSymbolColor;
			var lineThickness = 6;
			var circleSize = 12;
			var circleLineThickness = 8;
			var radius = 500;
			var lineStyle = "solid";

			if (linearSymbology != null) {

				if (linearSymbology.lineColor != null && linearSymbology.lineColor != undefined 
						&& linearSymbology.lineColor != "") {
					lineColor =  new Color(JSON.parse(linearSymbology.lineColor));
				}

				if (linearSymbology.circleColor != null && linearSymbology.circleColor != undefined 
						&& linearSymbology.circleColor != "") {
					circleColor =  new Color(JSON.parse(linearSymbology.circleColor));
				}

				if (linearSymbology.circleLineColor != null && linearSymbology.circleLineColor != undefined 
						&& linearSymbology.circleLineColor != "") {
					circleLineColor =  new Color(JSON.parse(linearSymbology.circleLineColor));
				}

				if (linearSymbology.highlightColor != null && linearSymbology.highlightColor != undefined 
						&& linearSymbology.highlightColor != "") {
					highlightColor =  new Color(JSON.parse(linearSymbology.highlightColor));
				}

				if (linearSymbology.lineThickness != null && linearSymbology.lineThickness != undefined 
						&& linearSymbology.lineThickness != "") {
					lineThickness =  linearSymbology.lineThickness;
				}

				if (linearSymbology.circleSize != null && linearSymbology.circleSize != undefined 
						&& linearSymbology.circleSize != "") {
					circleSize =  linearSymbology.circleSize;
				}

				if (linearSymbology.circleLineThickness != null && linearSymbology.circleLineThickness != undefined 
						&& linearSymbology.circleLineThickness != "") {
					circleLineThickness =  linearSymbology.circleLineThickness;
				}

				if (linearSymbology.radius != null && linearSymbology.radius != undefined 
						&& linearSymbology.radius != "") {
					radius =  linearSymbology.radius;
				}

				if (linearSymbology.lineStyle != null && linearSymbology.lineStyle != undefined 
						&& linearSymbology.lineStyle != "") {
					lineStyle =  linearSymbology.lineStyle.toLowerCase();
				}
			}

			if ( pathsPolyline.length > 0 ) {
				// Create the polyline
				var polylineSymbol = new SimpleLineSymbol( lineStyle, lineColor, lineThickness );
				var polyline = new Polyline( {
					"paths" : [
						pathsPolyline
						],
						"spatialReference" : map.spatialReference
				} );
				attributes[ "GRAPHICID" ] = id;
				this.linearGraphics[ layer.id ].length++;
				var graphicPolyline = new Graphic( polyline, polylineSymbol, attributes )
				graphicPolyline.defaultSymbol = polylineSymbol;
				graphicPolyline.highlightColor = highlightColor;

				graphics.push( graphicPolyline );

				var idPolyline = this.linearGraphics[ layer.id ].length - 1;
				var idFirstCircle = this.linearGraphics[ layer.id ].length - 2;
				var idSecondCircle = this.linearGraphics[ layer.id ].length - 3;

				graphicPolyline.groupGraphics = [
					idPolyline//, idFirstCircle, idSecondCircle
					];

				this.linearGraphics.totalGraphics++;
				map.targetCenter = lastDistancePoint;
				map.centerAt(lastDistancePoint);
			} else {
				attributes[ "GRAPHICID" ] = id;
				this.linearGraphics[ layer.id ].length++;

				var circle = new Circle( {
					center : featureCircleCenter,
					radius : radius
				} );

				var symbol = new SimpleMarkerSymbol(
						SimpleMarkerSymbol.STYLE_CIRCLE, 
						circleSize, 
						new SimpleLineSymbol(
								SimpleLineSymbol.STYLE_SOLID,
								circleLineColor, 
								circleLineThickness
						), 
						circleColor
				);

				var graphicCircle = new Graphic( featureCircleCenter, symbol );
				graphicCircle.highlightColor = highlightColor;

				graphics.push( graphicCircle );
				map.targetCenter = featureCircleCenter;
				map.centerAt( featureCircleCenter );

				this.linearGraphics.totalGraphics++;
			}

			if ( graphics.length > 0 ) {
				arrayUtils.forEach( graphics, lang.hitch( this, function ( graphic ) {
					layer.add( graphic );
				} ) );
			}

		},

		offsetInfo : {},

		clearOffSetInfo : function (option) {
			this.offsetInfo={};
			this.offsetInfo.lastLevel = 0;
			this.offsetInfo.increment = 3; //default
		},

		createGraphics : function ( fc, initialDistanceParameter, distanceParameter, id, layer, linearConfig, linearObject) {
			var pathsPolyline = []; 
			var featureCircleCenter;
			var graphics = [];
			var attributes = {};
			var layerId = linearConfig.LAYERID
			var thisLevel = this.offsetInfo[layerId];

			var linearSymbology = this.loadLinearSymbology( linearConfig.mapConfig.currentMbo.mxdata.mboName, linearConfig, linearObject);

			if (linearSymbology == null) {
				console.error( "No linear symbology was found in the Symbology column (Map Manager)");
				throw "No linear symbology was found in the Symbology column (Map Manager)"; 
			} else {
				var mboLinearSymbologyDef = this.symbologyManager.getLayerConfigById(linearConfig.mapConfig.currentMbo.mxdata.mboName).linearSymbology;
				if ( mboLinearSymbologyDef ) {
					var thisLinearObj = this;
					dojo.forEach(mboLinearSymbologyDef, function(symbology){
						if (symbology.attributes != null) {
							dojo.forEach(symbology.attributes, function(attribute){
								if(attribute.name != null 
										&& attribute.name != "" 
											&& attribute.name == "symbologyLayerOffset" 
												&& !isNaN(+attribute.value) && isFinite(attribute.value)){

									thisLinearObj.offsetInfo.increment = attribute.value; 
								}
							});
						}
					});
				}
			}

			if (thisLevel == null) {
				if (this.offsetInfo.lastLevel == 0) {
					this.offsetInfo.lastLevel =+ this.offsetInfo.increment;
				} else if (this.offsetInfo.lastLevel > 0) {
					this.offsetInfo.lastLevel = -this.offsetInfo.lastLevel;
				} else {
					this.offsetInfo.lastLevel = Math.abs(this.offsetInfo.lastLevel) + this.offsetInfo.increment;
				}
				thisLevel = this.offsetInfo.lastLevel;
				this.offsetInfo[layerId] = thisLevel;
			}

			var offsetDistance = (this.map.extent.getWidth() / this.map.width) * thisLevel;

			var offsetGeometry = geometryEngine.offset(fc.geometry, offsetDistance, this.measureUnits, "round");

			var startMeasureAttribute = linearConfig[ "STARTMEASUREATTRIBUTE" ];
			var endMeasureAttribute = linearConfig[ "ENDMEASUREATTRIBUTE" ];

			attributes[ startMeasureAttribute ] = dojo.clone( initialDistanceParameter );
			attributes[ endMeasureAttribute ] = dojo.clone( initialDistanceParameter + distanceParameter );
			attributes[ "lvcTreeLoc" ] = linearObject.lvcTreeLoc;

			var polylineBuilt = this.buildPolylinePath( offsetGeometry.paths, initialDistanceParameter, distanceParameter );
			pathsPolyline = polylineBuilt.pathsPolyline;
			featureCircleCenter = polylineBuilt.featureCircleCenter;

			var radiusLineVertices = 2;
			if ( !this.linearGraphics[ layer.id ] ) {
				this.linearGraphics[ layer.id ] = {};
				this.linearGraphics[ layer.id ].length = 0;
				this.linearLayers.push( layer.id );
			}

			var colorArray = new Color(JSON.parse(linearSymbology.color));
			var thickness = linearSymbology.thickness;
			if (thickness == null || thickness == undefined || thickness == "") {
				thickness = 4;
			}
			var lineStyle = linearSymbology.lineStyle.toLowerCase();
			var highlightColor = linearSymbology.highlightColor;
			if (highlightColor == null || highlightColor == undefined || highlightColor == "") {
				highlightColor = this.defaultSymbolColor;
			} else {
				highlightColor = new Color(JSON.parse(linearSymbology.highlightColor));
			}

			if ( pathsPolyline.length > 0 ) {
				// Create the polyline
				var polylineSymbol = new SimpleLineSymbol( lineStyle, new Color( colorArray ), thickness );
				var polyline = new Polyline( {
					"paths" : [
						pathsPolyline
						],
						"spatialReference" : this.map.spatialReference
				} );
				attributes[ "GRAPHICID" ] = id;
				this.linearGraphics[ layer.id ].length++;
				var graphicPolyline = new Graphic( polyline, polylineSymbol, attributes )
				graphicPolyline.defaultSymbol = polylineSymbol;
				graphicPolyline.highlightColor = highlightColor;
				graphicPolyline.objectName = linearConfig[ "OBJECTNAME" ];
				graphicPolyline.relationship = linearConfig[ "RELATIONSHIP" ];

				graphics.push( graphicPolyline );

				var idPolyline = this.linearGraphics[ layer.id ].length - 1;
				var idFirstCircle = this.linearGraphics[ layer.id ].length - 2;
				var idSecondCircle = this.linearGraphics[ layer.id ].length - 3;

				graphicPolyline.groupGraphics = [
					idPolyline//, idFirstCircle, idSecondCircle
					];

				this.linearGraphics.totalGraphics++;
			} else {
				attributes[ "GRAPHICID" ] = id;
				this.linearGraphics[ layer.id ].length++;
				var radius = linearSymbology.radius;
				if (radius == null || radius == undefined || radius == "") {
					radius = 3;
				}
				var imgUrl =  linearSymbology.imgUrl;
				var width = linearSymbology.imgWidth;
				var height = linearSymbology.imgHeight;
				var offsetx = linearSymbology.offsetx;
				var offsety = linearSymbology.offsety;
				// If no Image URL was provided in the Symbology config, it creates a Circle
				if (imgUrl == null || imgUrl == undefined || imgUrl == "") {
					var symbol = new SimpleFillSymbol().setColor( colorArray );
					symbol.outline.setColor( colorArray );
					var circle = new Circle( {
						center : featureCircleCenter,
						radius : radius
					} );
					var graphicCircle = new Graphic( circle, symbol, attributes )
					graphicCircle.defaultSymbol = symbol;
					graphicCircle.highlightColor = highlightColor;
					graphicCircle.objectName = linearConfig[ "OBJECTNAME" ];
					graphicCircle.relationship = linearConfig[ "RELATIONSHIP" ];
					graphics.push( graphicCircle );
				} else {
					imgUrl = dojo.config.fwm.servletBase + imgUrl;
					var symbol = new PictureMarkerSymbol(imgUrl, width, height);
					symbol.setOffset(offsetx, offsety);
					var graphicPicture = new Graphic(featureCircleCenter, symbol, attributes);
					graphicPicture.defaultSymbol = symbol;
					graphicPicture.objectName = linearConfig[ "OBJECTNAME" ];
					graphicPicture.relationship = linearConfig[ "RELATIONSHIP" ];
					graphicPicture.isNotLinearObject = true;
					graphics.push( graphicPicture );
					/*
					 * The image can not be used for identify, selection and others tools, so it is necessary
					 * to create a transparency circle on the point, the image is just for the user visualization,
					 * internally this circle will be used.
					 */					
					var symbol = new SimpleFillSymbol().setColor( [0,0,0,0] );
					symbol.outline.setColor( [0,0,0,0] );
					var circle = new Circle( {
						center : featureCircleCenter,
						radius : radius
					} );
					var graphicCircle = new Graphic( circle, symbol, attributes )
					graphicCircle.defaultSymbol = symbol;
					graphicCircle.highlightColor = highlightColor;
					graphicCircle.objectName = linearConfig[ "OBJECTNAME" ];
					graphicCircle.relationship = linearConfig[ "RELATIONSHIP" ];
					graphics.push( graphicCircle );
				}

				this.linearGraphics.totalGraphics++;
			}
			if ( graphics.length > 0 ) {
				arrayUtils.forEach( graphics, lang.hitch( this, function ( graphic ) {
					layer.add( graphic );
				} ) );
			}
		},

		/**
		 * Get the Linear fields based on layerId and LayerOption
		 * LayerOption: 0->Selectable 1->Visible 2->All
		 */
		getLinearFields : function (layerIdParameter, layerOption) {
			if ( this.linearLayersFieldsLoading == true ) {
				return;
			}
			this.linearLayersFieldsLoading = true;
			this.linearLayersFields = [];
			var graphicsLayerIds = this.map.map.graphicsLayerIds;
			var attributes = [];
			var attributesType = [];
			var linearLayersSelectable = [];
			arrayUtils.forEach( graphicsLayerIds, lang.hitch( this, function ( graphicsLayerId ) {
				var graphicLayer = this.map.map.getLayer( graphicsLayerId );
				if ( graphicLayer && graphicLayer.isLinear ) {
					if (layerIdParameter == null || layerIdParameter == undefined || layerIdParameter==graphicLayer.id) {
						if (layerOption == 0 && (graphicLayer.isSelectable == null || graphicLayer.isSelectable == true) ) {
							linearLayersSelectable.push( graphicLayer );
						} else {
							if (layerOption == 1 && graphicLayer.visible == true) {
								linearLayersSelectable.push( graphicLayer );
							} else { // All layers
								linearLayersSelectable.push( graphicLayer );
							}
						} 


					}						

				}
			} ) );
			if ( linearLayersSelectable.length == 0 ) {
				this.linearLayersFieldsLoaded = true;
				return;
			}
			var countLinearLayers = 0;
			arrayUtils.forEach( linearLayersSelectable, lang.hitch( this, function ( graphicLayer ) {
				for ( var key in this.map.mapConf.maplinearConf.maplinearLayers ) {
					// skip loop if the property is from prototype
					if ( !this.map.mapConf.maplinearConf.maplinearLayers.hasOwnProperty( key ) )
						continue;

					var linearLayer = this.map.mapConf.maplinearConf.maplinearLayers[ key ];
					if ( linearLayer.LAYERNAME == graphicLayer.id ) {
						countLinearLayers++;
						this.map.getMaximo().loadAttributesFromLinearAttributeTemplate( linearLayer.INFOATTRIBUTES, linearLayer.OBJECTNAME, lang.hitch( this, function ( response ) {
							if ( response.result == "success" ) {

								arrayUtils.forEach( response.attributes, lang.hitch( this, function ( attribute ) {
									if ( attributes.indexOf( attribute.attributeName ) == -1 ) {
										attributes.push( attribute.attributeName );
										attributesType.push( attribute.attributeType );
									}
								} ) );
								if ( countLinearLayers == linearLayersSelectable.length ) {
									arrayUtils.forEach( attributes, lang.hitch( this, function ( attribute, i ) {
										var attributeTypeTemp = attributesType[ i ];
										var type = "esriFieldTypeString";
										if ( attributeTypeTemp == 3 || attributeTypeTemp == 4 ) {
											type = "esriFieldTypeDate";
										} else if ( attributeTypeTemp == 8 || attributeTypeTemp == 9 ) {
											type = "esriFieldTypeDouble";
										} else if ( attributeTypeTemp == 9 || attributeTypeTemp == 7 || attributeTypeTemp == 19 ) {
											type = "esriFieldTypeSmallInteger";
										}
										this.linearLayersFields.push( {
											layerURL : null,
											attribute : attribute,
											isLinear : true,
											layerName : graphicLayer.id,
											name : attribute,
											alias : attribute.toUpperCase(),
											type : type
										} );
									} ) );
								}
							}
							this.linearLayersFieldsLoaded = true;
						} ), lang.hitch( this, function ( error ) {
							console.error( error );
							this.linearLayersFieldsLoaded = true;
						} ) );
					}

				}

			} ) );

		},
		identifyGraphicsByGeometry : function ( geometry, spatialRelationship ) {
			var graphics = [];
			var graphicsLayerIds = this.map.graphicsLayerIds;
			for ( var i = graphicsLayerIds.length; i > 0; i-- ) {
				var graphicsLayerId = graphicsLayerIds[ i - 1 ];
				var graphicLayer = this.map.getLayer( graphicsLayerId );
				if ( graphicLayer.isLinear ) {
					if ( graphicLayer.isSelectable == null || graphicLayer.isSelectable == true ) {
						arrayUtils.forEach( graphicLayer.graphics, lang.hitch( this, function ( graphic ) {
							if ( !graphic.isNotLinearObject ) {
								var graphicOk = false;
								if ( spatialRelationship == "SPATIAL_REL_CONTAINS" && geometryEngine.contains( geometry, graphic.geometry ) ) {
									graphicOk = true;
								} else if ( spatialRelationship == "SPATIAL_REL_CROSSES" && geometryEngine.crosses( geometry, graphic.geometry ) ) {
									graphicOk = true;
								} else if (spatialRelationship == null) {
									if ( geometryEngine.contains( geometry, graphic.geometry ) ) {
										graphicOk = true;
									} else if (geometryEngine.crosses( geometry, graphic.geometry ) ) {
										graphicOk = true;
									} else if (geometryEngine.within( geometry, graphic.geometry ) ) {
										graphicOk = true;
									} else if (geometryEngine.overlaps( geometry, graphic.geometry ) ) {
										graphicOk = true;
									}
								}
								if ( graphicOk ) {
									graphic.layer = graphicLayer;
									graphics.push( graphic );
								}

							}

						} ) );

					}
				}
			}
			return graphics;
		},
		identifyGraphicsByClick : function ( clickEvent, tolerance ) {
			var graphics = [];
			var graphicsLayerIds = this.map.graphicsLayerIds;
			for ( var i = graphicsLayerIds.length; i > 0; i-- ) {
				var graphicsLayerId = graphicsLayerIds[ i - 1 ];
				var graphicLayer = this.map.getLayer( graphicsLayerId );
				if ( graphicLayer.isLinear ) {
					if ( graphicLayer.isSelectable == null || graphicLayer.isSelectable == true ) {
						arrayUtils.forEach( graphicLayer.graphics, lang.hitch( this, function ( graphic ) {
							var graphicOk = this._clickOnGraphic( graphic, clickEvent, tolerance );
							if ( graphicOk == true ) {
								graphics.push( graphic );
							}
						} ) );

					}
				}
			}
			return graphics;
		},
		_clickOnGraphic : function ( graphic, clickMapPoint, tolerance ) {
			var findGraphic = false;

			if ( graphic.isNotLinearObject == true ) {
				return findGraphic;
			}
			var referencePoint;
			var distance;
			var geometry = graphic.geometry;
			if ( geometry.type == "polygon" ) {
				referencePoint = geometry.center;
				var extentGeom = this.pointToExtent( referencePoint, referencePoint, tolerance );
				if ( extentGeom.contains( clickMapPoint ) ) {
					findGraphic = true;
				}
			} else {
				if ( geometry.type == "polyline" ) {
					var paths = geometry.paths;
					referencePoint = new Point( paths[ 0 ][ 0 ][ 0 ], paths[ 0 ][ 0 ][ 1 ], new esri.SpatialReference( this.map.spatialReference ) );
					var nextPoint = null;
					arrayUtils.forEach( paths[ 0 ], lang.hitch( this, function ( path, i ) {
						if ( nextPoint != null ) {
							referencePoint = dojo.clone( nextPoint );
						}
						nextPoint = new Point( path[ 0 ], path[ 1 ], new esri.SpatialReference( this.map.spatialReference ) );
						if ( nextPoint.x != referencePoint.x || nextPoint.y != referencePoint.y ) {
							var extentGeom = this.pointToExtent( referencePoint, nextPoint, tolerance );
							if ( extentGeom.contains( clickMapPoint ) ) {
								findGraphic = true;
							}
						}
					} ) );

				}
			}
			return findGraphic;
		},
		calculateDistance : function ( pointA, pointB ) {
			var width = Math.abs( Math.abs( pointB.x ) - Math.abs( pointA.x ) );
			var height = Math.abs( Math.abs( pointB.y ) - Math.abs( pointA.y ) );
			var distance = Math.sqrt( Math.pow( width, 2 ) + Math.pow( height, 2 ) );
			return distance;
		},
		pointToExtent : function ( pointA, pointB, toleranceInPixel ) {
			var pixelWidth = this.map.extent.getWidth() / this.map.width;
			//var toleraceInMapCoords = toleranceInPixel * pixelWidth;

			var x1 = ( pointA.x < pointB.x ) ? pointA.x : pointB.x;
			var x2 = ( pointB.x > pointA.x ) ? pointB.x : pointA.x;

			var y1 = ( pointA.y < pointB.y ) ? pointA.y : pointB.y;
			var y2 = ( pointB.y > pointA.y ) ? pointB.y : pointA.y;

			return new esri.geometry.Extent( x1 - toleranceInPixel, y1 - toleranceInPixel, x2 + toleranceInPixel, y2 + toleranceInPixel, this.map.spatialReference );
		},
		/**
		 * Function to query for Linear graphics according the where clause. 
		 */
		queryGraphics : function ( layerName, whereClause, attributesToQuery, callbackFunction, geometry ) {
			var graphics = [];
			var graphicLayer = this.map.map.getLayer( layerName );
			if ( graphicLayer.isLinear ) {
				var attributesCount = 0;
				var regex = /\$\{(\S*?)\}/g;
				while ( ( m = regex.exec( graphicLayer.linearConfig.INFOATTRIBUTES ) ) !== null ) {
					if ( m.length > 1 ) {
						var infoAttributesField = m[ 1 ];
						if ( attributesToQuery.indexOf( infoAttributesField ) > -1 ) {
							attributesCount++;
						}
					}
				}
				if ( attributesCount == attributesToQuery.length ) {
					var objectName = graphicLayer.linearConfig.OBJECTNAME;
					this.map.getMaximo().getLinearGraphicsbyWhereClause( whereClause, objectName, lang.hitch( this, function ( response ) {
						arrayUtils.forEach( graphicLayer.graphics, lang.hitch( this, function ( graphic ) {
							var geometryOk = false;
							if ( geometry != null && geometry != undefined) {
								if (geometryEngine.contains( geometry, graphic.geometry ) ) {
									geometryOk = true;
								} else {
									geometryOk = false;
								}

							} else {
								geometryOk = true;
							}
							if ( !graphic.isNotLinearObject && graphic.attributes 
									&& response.graphics.indexOf( graphic.attributes[ "GRAPHICID" ] ) > -1 
									&& geometryOk == true) {
								graphic.attributes.layerName = graphic._layer.id;
								graphic.isLinearGraphic = true;
								graphics.push( graphic );
							}
						} ) );
						if (graphics.length > 0) {
							lang.hitch( this, callbackFunction( graphics ) );
						}


					} ), lang.hitch( this, function ( error ) {
						console.error( error );
					} ) );
				} else {
					lang.hitch( this, callbackFunction( graphics ) );
				}
			}

		},
		_graphicMatchesCriteria : function ( graphic, whereClause, callbackFunction ) {
			var match = null;
			whereClause = whereClause.split( "'" ).join( "" );
			whereClause = whereClause.split( "(" ).join( "" );
			whereClause = whereClause.split( ")" ).join( "" );
			whereClause = whereClause.split( "is not null" ).join( "!= null" );
			whereClause = whereClause.split( "is null" ).join( "== null" );
			whereClause = whereClause.replace( "/^\s+|\s+$/g", "" );
			var whereClauseArray = whereClause.split( " " );
			var count = 0;
			var attribute = whereClauseArray[ count++ ];
			var operator = whereClauseArray[ count++ ];
			var value = whereClauseArray[ count++ ];
			var whereClausesResults = [];
			var whereClausesJoins = [];
			var objectName = graphic.objectName;
			var graphicId = graphic.attributes[ "GRAPHICID" ];

			this.map.getMaximo().checkLinearGraphicMatchesWhereClause( whereClause, objectName, graphicId, lang.hitch( this, function ( response ) {
				if ( response.linearGraphicMatches ) {
					graphic.attributes.layerName = graphic._layer.id;
					graphic.isLinearGraphic = true;
					lang.hitch( this, callbackFunction( [
						graphic
						] ) );
				}

			} ), lang.hitch( this, function ( error ) {
				console.error( error );
			} ) );
		},

		hideControls: function() {
			var data = {
				enabled: false,
			};

			dojo.publish("miniapp.visibility", JSON.stringify(data));
		},

	} );
});

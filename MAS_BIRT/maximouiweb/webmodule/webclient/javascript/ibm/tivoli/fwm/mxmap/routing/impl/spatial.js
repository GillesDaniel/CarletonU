/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2011,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
define([
	"dojo/_base/declare", "ibm/tivoli/fwm/mxmap/_Base", "ibm/tivoli/fwm/mxmap/routing/Router", "ibm/tivoli/fwm/mxmap/routing/Route",
	"ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/tasks/RouteTask", "ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/symbols/SimpleMarkerSymbol",
	"ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/symbols/SimpleLineSymbol", "ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/tasks/FeatureSet",
	"ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/tasks/RouteParameters", "ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/geometry/Point", 
	"ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/symbols/TextSymbol", "ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/symbols/Font",
	"ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/graphic", "ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/SpatialReference",
	"ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/IdentityManager", "ibm/tivoli/fwm/mxmap/LoadEsriPlugin!esri/urlUtils"
	], function(declare, _Base, Router, Route, RouteTask, SimpleMarkerSymbol, 
			SimpleLineSymbol, FeatureSet, RouteParameters, Point, TextSymbol, Font, Graphic, SpatialReference, esriId, urlUtils){

	return declare("ibm.tivoli.fwm.mxmap.routing.impl.spatial", [ibm.tivoli.fwm.mxmap.routing.Router, ibm.tivoli.fwm.mxmap._Base], {


		directionsService: null,
		map: null,
		_stopSymbol: null,
		_routeSymbol: null,
		_spatialReference: null,
		_esriMap: null,
		_spatialReference: null,
		conf: null,
		_lastStop: null,
		_successCallback: null,
		_failureCallback: null,
		_routeLimits: 10,
		_oldWGS84Point: null,
		_token: null,
		// Token expiration period: 12h
		_tokenExpirationPeriod: 720,
		_isRequestingToken: false,
		_routeQueue: null,
		constructor: function(params)
		{
			console.log("Router esri", params);
			dojo.mixin(this, params);// will set conf and map
			this._routeQueue = [];

			// setting stop symbols
			this._stopSymbol = new SimpleMarkerSymbol().setStyle(SimpleMarkerSymbol.STYLE_CROSS).setSize(15);
			this._stopSymbol.outline.setWidth(4);
			// setting route line symbols

			this._routeSymbol = new SimpleLineSymbol().setColor(new dojo.Color()).setWidth(this.routeLineWidth);
			this._esriMap = this.map.getProviderMap();
			this._spatialReference = this._esriMap.spatialReference;
		},
		_init: function()
		{
			// When the router is instantiated, request a token to be added to all future route requests
			// using the user/password passed by the server.
			if((this.getRoutingServiceUserName() != "") && (this.getRoutingServicePassword() != ""))
			{
				this.requestToken();
			} else {
				this.directionsService = new RouteTask(this.routeUrl);			
			}
		},
		/*
		 * Final route step, calls callback function with routeSummary params
		 */
		_onSolveRoute: function(routeSummary, callback)
		{
			if (callback)
			{
				callback(routeSummary);
			}
		},
		_routeFailed: function(error, errCb, errorCode)
		{
			console.log("route failed", error);
			if (errCb)
			{
				if (!errorCode)
				{
					errorCode = ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.UNKNOWN;
				}
				errCb(errorCode, error);
			}
		},
		/**
		 * Based on a lat/lng it creates an esri geometry point.
		 * 
		 * @param lat
		 * @param lng
		 * @returns
		 */
		_createStop: function(lat, lng, text, pointSR)
		{
			var spatialReference = pointSR ? new SpatialReference(pointSR) : this._spatialReference;
			var mappoint = new Point(lng, lat, spatialReference);

			var ss = new TextSymbol(text).setColor(new dojo.Color([ 256, 0, 0 ])).setAlign(Font.ALIGN_START).setFont(
					new Font("12pt").setWeight(Font.WEIGHT_BOLD));
			var stop = new Graphic(mappoint, ss);
			if (window.DEBUGLEVEL && window.DEBUGLEVEL > 1)
			{
				this.map.getProviderMap().graphics.add(stop);
			}

			return stop;

		},

		_getLatLngFromStop: function(stop)
		{
			var point = null;

			// Using the MXRecord wrapper to handle mboInfo's properties
			var mxRec = new ibm.tivoli.fwm.mxmap.MXRecord({
				mboInfo: stop,
				map: this.map
			});
			if (mxRec.hasGISData())
			{
				console.log("mbo SPATIAL? AUTOSPATIAL? stop", mxRec.hasSPATIALCoordinates(), mxRec.hasAutolocateSpatialData(), stop);
				// The first thing is to check if LBS data needs to be used
				// otherwise, go with the existing autolocate fall through logic
				if (mxRec.useLBSData() && mxRec.hasPointInCurrentSR())
				{
					point = mxRec.getPointInCurrentSR();
				}
				else if (mxRec.hasSPATIALCoordinates())
				{
					point = this.map.getPointFromMboInfo(mxRec.getMboInfo());
				}
				else if (mxRec.hasGISCoordinates())
				{
					point = mxRec.getGISPoint();
				}
				else if (mxRec.hasAutolocateSpatialData())
				{

					point = this.map.getPointFromMboInfo(mxRec.getAutolocateMboInfo());
				}
				else if (mxRec.hasAutolocateGISCoordinates())
				{
					point = mxRec.getAutolocateGISPoint();
				}
				else
				{
					console.warn("Stop doesn't have gis coords", stop);
				}
			}

			else
			{
				console.log("stop is calculated", stop);
				if (stop.lat == null)
				{
					console.error("stop does not have lat/lng", stop);
				}
				else
				{
					point = this.map.latLng(stop.lat, stop.lng);
				}
			}
			return point;
		},

		/*
		 * prepare params in order to avoid any esri route limit.
		 */
		_prepareParams: function(start, offset, stops)
		{
			var stopData = new FeatureSet();
			console.info("offset", start, offset, "/", stops.length);
			for ( var i = start; i < offset; i++)
			{
				var stop = stops[i];
				var stopEsri = null;

				var point = this._getLatLngFromStop(stop);
				if(point)
				{
					stopEsri = this._createStop(point.lat, point.lng, i, point.sr);
					if(stopEsri)
					{
						stopData.features.push(stopEsri);
					}
				}
			}
			return stopData;
		},
		/**
		 * converst a si
		 */
		_getLatLngArrayFromStops: function(stops)
		{
			var lls = [];
			for ( var index = 0; index < stops.length; index++)
			{
				lls.push(this._getLatLngFromStop(stops[index]));
			}
			return lls;
		},
		/**
		 * Executes the routing on esri maps provider.
		 * 
		 * @see Router.js#showRoute
		 */
		showRoute: function(stops, successCb, failCb, a, instanceConf)
		{
			if (this._isRequestingToken == true)
			{
				console.warn("Token validation going on, queue the route request.");
				this._routeQueue.push({
					stops: stops,
					callback: successCb,
					errCb: failCb,
					instanceConf: instanceConf
				});
				return;
			}

			// first step, check if any stop is a FEATURE CLASS if so need to get
			// it's X/Y from server
			if (this._checkIfAnyFeaturedClass(stops) == true)
			{
				var fct = function()
				{
					this._showRouteAllPointsWithXY(stops, successCb, failCb, instanceConf);
				};
				this._convertAnyFeatureStop(stops, dojo.hitch(this, fct), failCb);
			}
			else
			{
				console.log("ALL Features have XY");
				this._showRouteAllPointsWithXY(stops, successCb, failCb, instanceConf);
			}

		},
		_convertAnyFeatureStop: function(stops, callback, errCallback)
		{


			var stopsToConvert = [];
			for ( var j = 0; j < stops.length; j++)
			{
				var stop = stops[j];
				// Using the MXRecord wrapper to handle mboInfo's properties
				var mxRec = new ibm.tivoli.fwm.mxmap.MXRecord({
					mboInfo: stop,
					map: this.map
				});
				if ((stop.calculatedStop == null) && !mxRec.useLBSData())
				{
					if (mxRec.hasSPATIALCoordinates() == true)
					{
						stopsToConvert.push(mxRec.getMboInfo());
					}
					else if (mxRec.hasAutolocateSpatialData())
					{
						stopsToConvert.push(mxRec.getAutolocateMboInfo());
					}
					else
					{
						console.warn("no SPATIAL GIS info for stop ", stop);
					}

				}
			}
			var test = function(args)
			{
				callback();
			};
			this.map.queryMultipleRecordsAtOnce(stopsToConvert, test, errCallback);
		},// maybe merge it in maximospatial.js
		_checkIfAnyFeaturedClass: function(stops)
		{
			for ( var i in stops)
			{
				var stop = stops[i];
				var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({
					mboInfo: stop,
					map: this.map
				});

				if (!mxrec.useLBSData() && mxrec.hasSPATIALCoordinates() || (mxrec.hasGISCoordinates() == false && mxrec.hasAutolocateSpatialData() == true))
				{
					return true;
				}
			}
		},
		_retrieveStopInfo: function(pt, mboInfo, legIndex, itinerary, geocodeCache)
		{
			var txt = "";
			if (mboInfo.mxdata != null && mboInfo.mxdata.attributes != null && mboInfo.mxdata.attributes.formattedaddress != null && mboInfo.mxdata.attributes.formattedaddress.length > 0)
			{
				geocodeCache[pt] = mboInfo.mxdata.attributes.formattedaddress;
				txt = geocodeCache[pt];
			}
			else
			{
				// geocode it
				var legIndex = itinerary.legs.length;
				var fctSuccess = function(location)
				{
					var address = location[0].formattedAddress;
					if (legIndex >= 0)
					{
						itinerary.legs[legIndex].info = address;
					}
					else
					{
						itinerary.initialLocation.info = address;
					}
					geocodeCache[pt] = address;
				};
				var fctError = function(error)
				{
					console.error("could not find leg ", legIndex, "info");
				};
				this.map.geocoder.reverseGeocode(pt.lat, pt.lng, dojo.hitch(this, fctSuccess), dojo.hitch(this, fctError));

			}
			return txt;

		},
		_showRouteAllPointsWithXY: function(stops, successCb, failCb, instanceConf)
		{
			var routeColor = instanceConf.routecolor;
			if (routeColor.indexOf("#") != 0)
			{
				routeColor = "#" + routeColor;
			}

			var routeParams = new RouteParameters();
			if (dojo.config.fwm.debug == true)
			{
				console.info("stops", stops.length, {
					stops: stops
				});
			}

			routeParams.outSpatialReference = new SpatialReference({
				wkid: this._spatialReference
			});

			routeParams.returnDirections = true;
			if (this.isOptimizeRoute())
			{
				// makes optimization but does not change 1st and last stops
				routeParams.findBestSequence = true;
				routeParams.preserveFirstStop = true;
				routeParams.preserveLastStop = true;

			}
			routeParams.directionsLengthUnits = "esriKilometers";// Always in km

			routeParams.travelMode = this.getTravelMode();
			routeParams.returnRoutes = true;
			routeParams.returnStops = true;
			var offset = 0;
			var routeSummary = {
					totalDuration: 0,
					totalDistance: 0,
					stops: [],
					legsData: null,
					polyline: null,
					copyrights: "",
					map: this.map
			};
			var polylinePoints = [];
			var th = this._startTimer();
			var ItineraryClass = dojo.require("ibm.tivoli.fwm.mxmap.routing.itinerary.Itinerary");
			var itinerary = new ItineraryClass();
			var start = 0;
			var successFct = function(solveResult)
			{
				console.log("solveResult", solveResult);
				this._stopTimer(th, stops.length);
				var stopsFromResponse = solveResult.routeResults[0].stops;
				if (solveResult.messages && solveResult.messages.length > 0)
				{
					// not sure what to do.. the routing task never fails, just add
					// messages to the solve result AND documentation is still TBA
					// :(
					// http://help.arcgis.com/en/webapi/javascript/arcgis/help/jsapi/routetask.htm#onSolveComplete
					console.warn("Route service returend the following messages :");
					for ( var i = 0; i < solveResult.messages.length; i++)
					{
						var msg = solveResult.messages[i];
						console.warn(msg.description, msg);
					}
					//TODO check if msf type 50 (warning) should be considered an error
					if (msg.type == 50)
					{
						// Check whether the markers should be drawn even when the provider fails to generate a route
						if(this.map.getShowMarkersOnRouteError() == true)
						{
							this.renderRoute([], routeSummary, itinerary, stops, successCb, failCb, instanceConf, routeColor, stopsFromResponse);
						}
						else
						{
							this._routeFailed(msg, failCb, ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.ZERO_RESULTS);
						}

						if (!solveResult.routeResults || solveResult.routeResults.length == 0 || !solveResult.routeResults[0].directions || !solveResult.routeResults[0].directions.features || solveResult.routeResults[0].directions.features.length == 0)
						{
							return;
						}
					}
				}
				var directions = solveResult.routeResults[0].directions;

				var steps = [];
				var c = 1;
				var legDistance = 0.0;
				var legDuration = 0.0;
				var flagEndStart = false;

				console.log("total route stops", solveResult.routeResults[0].directions.features.length);
				var featuresArray = solveResult.routeResults[0].directions.features;
				for ( var i = 0; i < featuresArray.length; i++)
				{
					var feature = solveResult.routeResults[0].directions.features[i];

					var step = {
							distance: feature.attributes.length,
							duration: feature.attributes.time,
							info: feature.attributes.text,
							location: this.map._getLatLngFromFeature(feature)
					};
					steps.push(step);
					legDistance += feature.attributes.length;
					legDuration += feature.attributes.time;
					// check if this i the last step of a leg
					if (flagEndStart == true && feature.attributes.length == 0)
					{
						console.log("Ok leg completed ", legDuration);
						var pt = this.map._getLatLngFromFeature(feature);

						var txt = feature.attributes.text;
						console.log("legs ", itinerary.legs.length, stops[itinerary.legs.length + 1]);

						var lpos = itinerary.addLeg(pt, txt, legDistance, legDuration, null, steps, null);
						var sInfo = stops[lpos + 1];
						var needsToGeocode = true;
						if (sInfo.mxdata)
						{
							var mxrec = new ibm.tivoli.fwm.mxmap.MXRecord({
								mboInfo: sInfo,
								map: this.map
							});
							if (mxrec.hasGISCoordinates() == true || mxrec.hasSPATIALCoordinates() == true)
							{
								if (mxrec.hasAddress() == true)
								{
									needsToGeocode = false;
									itinerary.legs[lpos].info = mxrec.getAddress();
								}
							}
							else if (mxrec.hasAutolocateGISOnlyCoordinates() == true || mxrec.hasAutolocateSpatialData() == true)
							{
								var autolocateMboInfoAddress = mxrec.getAutolocateAddress();
								if (autolocateMboInfoAddress != null && autolocateMboInfoAddress.length > 0)
								{
									needsToGeocode = false;
									itinerary.legs[lpos].info = autolocateMboInfoAddress;
								}
							}
						}
						itinerary.legs[lpos].needsToGeocode = needsToGeocode;

						steps = [];
						legDistance = 0;
						legDuration = 0;
						c++;
						flagEndStart = false;

					}
					else if (flagEndStart == false && feature.attributes.length == 0)
					{
						flagEndStart = true;
					}
				}

				if (start == 0)
				{
					var geom = solveResult.routeResults[0].directions.features[0].geometry;
					var pt = this.map._getLatLngFromFeature(solveResult.routeResults[0].directions.features[0]);
					var txt = solveResult.routeResults[0].directions.features[0].attributes.text;
					itinerary.setInitialLocation(txt, pt, null, null, true);

				}
				// add this esriroute polyline to the main route polyline points
				// array;
				var PolylineClass = dojo.require("ibm.tivoli.fwm.mxmap.impl.polyline.MaximoSpatialPolyline");
				var pol = new PolylineClass({map: this.map});
				pol.fromProprietary(directions.mergedGeometry);
				polylinePoints = polylinePoints.concat(pol.points);

				// sum total distance and time
				routeSummary.totalDistance += directions.totalLength;
				routeSummary.totalDuration += directions.totalTime;

				// if we still have stops to be added
				if (offset < stops.length)
				{
					start = offset - 1;
					offset = offset + this._routeLimits;
					if (offset > stops.length)
					{
						offset = stops.length;
					}
					if ((offset - start) >= this._routeLimits)
					{
						offset--;
					}
					routeParams.stops = this._prepareParams(start, offset, stops);
					th = this._startTimer(th, stops.length);
					var errorFctAux = function(error)
					{
						this._routeFailed(error, failCb);
					};

					this.directionsService.solve(routeParams, dojo.hitch(this, successFct), dojo.hitch(this, errorFctAux));
				}
				else
				{
					this.renderRoute(polylinePoints, routeSummary, itinerary, stops, successCb, failCb, instanceConf, routeColor, stopsFromResponse);
				}

			};

			if (stops.length > this._routeLimits)
			{

				offset = offset + this._routeLimits;
			}
			else
			{
				offset = stops.length;
			}

			routeParams.stops = this._prepareParams(start, offset, stops);

			if (routeParams.stops.features.length >= 2)
			{
				var errorFctAux = function(error)
				{
					// Check whether the markers should be drawn even when the provider fails to generate a route
					if(this.map.getShowMarkersOnRouteError() == true)
					{
						this.renderRoute([], routeSummary, itinerary, stops, successCb, failCb, instanceConf, routeColor, stopsFromResponse);
					}
					else
					{
						this._routeFailed(error, failCb);
					}
				};

				this.directionsService.solve(routeParams, dojo.hitch(this, successFct), dojo.hitch(this, errorFctAux));
				// this._lastStop = routeParams.stops.features.splice(0,1)[0];
			}
			else
			{
				// We need to consider the possibility of one or more stops
				// failing to comply with Esri's requirements to create the route. 
				// In this case, the number of stops may be lower than 2 and a route cannot be created.
				this._routeFailed("at least 2 stops are needed", failCb, ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.MIN_STOPS_REQ);

			}

		},

		// Steps to create the route data and run the callback.
		// They have been added to this function to avoid code repetition.
		renderRoute: function(polylinePoints, routeSummary, itineraryInfo, stops, callback, errCb, instanceConf, routeColor, stopsFromResponse)
		{
			//get the stops from the route service response
			routeSummary.stops = stopsFromResponse.map(dojo.hitch(this, function(stop) {
				return this.map.latLng(stop.geometry.y, stop.geometry.x, JSON.stringify(stop.geometry.spatialReference));
			}));
			routeSummary.itinerary = itineraryInfo;
			routeSummary.inputInfo = {
					stops: stops,
					successCb: callback,
					errorCb: errCb
			};
			routeSummary.originalRouter = this;
			routeSummary.instanceConf = instanceConf;
			routeSummary.distanceUnit = this.getCurrentDistanceUnit();
			// all route stops were calculated
			var PolylineClass = dojo.require("ibm.tivoli.fwm.mxmap.impl.polyline.MaximoSpatialPolyline");
			var poly = new PolylineClass({points: polylinePoints, map: this.map});
			poly.addData({
				color: routeColor,
				opacity: this.routeOpacity,
				width: this.routeLineWidth
			});
			routeSummary.polyline = poly;

			var routeInfo = new ibm.tivoli.fwm.mxmap.routing.Route(routeSummary);
			routeInfo.setSupportAvoidToll(false);
			routeInfo.setSupportAvoidHighway(false);

			this._onSolveRoute(routeInfo, callback);
			if (dojo.config.fwm.debug == true)
			{
				console.info("stopsEnd", {
					stops: stops
				});
			}
			this._stopTimer(null, stops.length);
		},
		/**
		 * This intercepts the user location call and converts it to spatial
		 * coordinate system.
		 */
		getUserLocation: function(callback, errorCb)
		{
			if (this.myCurrentLocationInstance)
			{
				var errorCallback = function()
				{
					if (this.map)
					{
						this.map.failedToGetLocation();
					}
					errorCb();
				};
				var success = function()
				{
					this._convertToSpatialCoordSystem(callback);
				};

				this.myCurrentLocationInstance.getUserLocation(dojo.hitch(this, success), dojo.hitch(this, errorCallback));
			}
		},
		_convertToSpatialCoordSystem: function(callback)
		{
			var storeConvertedPoint = function(point)
			{
				this.myCurrentLocationInstance._esriSRLatLng = point;
				this.myCurrentLocationInstance._oldWGS84Point = this.myCurrentLocationInstance.getPosition();
				if (callback)
				{
					callback();
				}
			};
			this.myCurrentLocationInstance.convertPositionToMapPoint(this.map, dojo.hitch(this, storeConvertedPoint));
		},
		_isESRIUpToDate: function()
		{
			var currPosition = this.myCurrentLocationInstance.getPosition();
			var esriRefPoint = this.myCurrentLocationInstance._oldWGS84Point;
			if (esriRefPoint == null)
			{
				this._convertToSpatialCoordSystem();
				return false;
			}
			if (currPosition.coords != esriRefPoint.coords)
			{
				this._convertToSpatialCoordSystem();
				return false;
			}
			return true;
		},
		/**
		 * we must convert the w3c position into the same map spatial reference.
		 */
		_getUserLocationStop: function()
		{
			return this.myCurrentLocationInstance._esriSRLatLng;
		},
		isLocationStatusUnassigned: function()
		{
			if (this.myCurrentLocationInstance.isStatusHasLocation())
			{
				return !this.isLocationStatusHasLocation();
			}
			return this.inherited(arguments);
		},
		isLocationStatusHasLocation: function()
		{
			if (this.myCurrentLocationInstance.isStatusHasLocation())
			{
				return this._isESRIUpToDate();
			}
			return this.inherited(arguments);

		},
		/**
		 * Makes a request to ESRI's generateToken service using the credentials
		 * from the map configuration data
		 */
		requestToken: function()
		{
			this._isRequestingToken = true;
			var me = this;
			var _spatialTokenRequestCallback = function(data)
			{
				if(data && data.token)
				{
					// Token obtained successfully
					// Recreate the RouteTask API appending the token to the service URL
					me._token = data.token;

					urlUtils.addProxyRule({
						urlPrefix: "route.arcgis.com",  
						proxyUrl: "/maximo/webclient/pluss/plusstokenproxy.jsp?token=" + me._token + "&"
					});
					me.directionsService = new RouteTask(me.routeUrl + "/plusstokenstart/" + me._token + "/plusstokenend/");
				}
				else if (data && data.error)
				{
					// An error has occurred when trying to obtain the token
					// Show the error message
					var errorData = data.error;
					errorMsg = errorData.message
					if(errorData.details && (errorData.details.length > 0))
					{
						for(var i=0; i < errorData.details.length; i++)
						{
							errorMsg += " " + errorData.details[i];
						}
					}
					console.error("Error validating token: " + errorData.code + ": " + errorMsg);
					var maximo = me.map.getMaximo();
					maximo.showMessage("mapserver", "route_unknown_failure", [ errorMsg ]);
				}
				// Execute all queued route requests
				me._isRequestingToken = false;
				me.executeQueuedRouteRequests();
			};

			var username = this.getRoutingServiceUserName();
			var password = this.getRoutingServicePassword();
			var routeServiceUrl = this.getRoutingServiceUrl();
			var referer = window.location.href.substring(0, window.location.href.indexOf('?'));
			var tokenRequest = "https://www.arcgis.com/sharing/generateToken";
			//var tokenRequest =  routeServiceUrl + "generateToken?username=" + username + "&password=" + password + "&referer=" + referer + "&f=pjson&callback=_spatialTokenRequestCallback";
			//dojo.io.script.get({
			//	url : tokenRequest,
			//	timeout : 10000,
			//	error : function(error) {
			//		var maximo = me.map.getMaximo();
			//		maximo.showMessage("mapserver", "route_unknown_failure", [ error.message ]);
			//		me._isRequestingToken = false;
			//		me.executeQueuedRouteRequests();
			//	}
			//});

			var xhr = this.createCORSRequest('POST', tokenRequest);
			if (!xhr) {
				console.log('CORS not supported');
				return;
			}

			// Response handlers.
			xhr.onreadystatechange = function() {
				if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
					var data = xhr.responseText;
					console.log('Response from CORS request: ' + data);
					if (typeof data == "string") {
						data = JSON.parse(data);
					}
					_spatialTokenRequestCallback(data);
				}
			};

			xhr.onerror = function() {
				var data = xhr.responseText;
				if (typeof error == "string") {
					data = JSON.parse(data);
				}
				var maximo = me.map.getMaximo();
				maximo.showMessage("mapserver", "route_unknown_failure", [ data.error.message ]);
				me._isRequestingToken = false;
				me.executeQueuedRouteRequests();
			};
			xhr.send("username=" + username + "&password=" + password + "&referer=" + referer + "&f=pjson");
		},

		createCORSRequest: function(method, url)
		{
			var xhr = new XMLHttpRequest();
			if ("withCredentials" in xhr) {
				// XHR for Chrome/Firefox/Opera/Safari.
				xhr.open(method, url, true);
			} else if (typeof XDomainRequest != "undefined") {
				// XDomainRequest for IE.
				xhr = new XDomainRequest();
				xhr.open(method, url);
			} else {
				// CORS not supported.
				xhr = null;
			}
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			return xhr;
		},

		// Since direct REST requests seems to work in all browserss,
		// this solution below (using javascript API) has been commented out
		// because it only works in FF and Chrome
//		requestTokenNonIEBrowsers: function()
//		{
//		this._isRequestingToken = true;
//		var tokenReceived = function(tokenData)
//		{
//		// Token obtained successfully
//		// Recreate the RouteTask API appending the token to the service URL
//		this._token = tokenData.token;
//		this.directionsService = new esri.tasks.RouteTask(this.routeUrl + "?token=" + this._token);
//		// Execute all queued route requests
//		this._isRequestingToken = false;
//		this.executeQueuedRouteRequests();
//		}
//		var tokenRequestError = function(errorData)
//		{
//		// An error has occurred when trying to obtain the token
//		// Show the error message
//		var errorMsg = null;
//		if(errorData && errorData.message)
//		{
//		errorMsg = errorData.message;
//		if(errorData.details && (errorData.details.length > 0))
//		{
//		for(var i=0; i < errorData.details.length; i++)
//		{
//		errorMsg += " " + errorData.details[i];
//		}
//		}
//		}
//		console.error("Error validating token: " + errorData.code + ": " + errorMsg);
//		var maximo = this.map.getMaximo();
//		maximo.showMessage("mapserver", "route_unknown_failure", [ errorMsg ]);
//		// Execute all queued route requests (if the routing service requires a valid token,
//		// then an error is expected when requesting a route).
//		this._isRequestingToken = false;
//		this.executeQueuedRouteRequests();
//		}
//		// Request the token
//		// TODO: This way of requesting a token currently doesn't work in IE
//		esri.request({
//		url: "https://www.arcgis.com/sharing/generateToken",
//		content: {
//		referer: window.location.href.substring(0, window.location.href.indexOf('?')),
//		username: this.getRoutingServiceUserName(),
//		password: this.getRoutingServicePassword(),
//		expiration: this._tokenExpirationPeriod,
//		f: "pjson"
//		},
//		handleAs: "json",
//		load: dojo.hitch(this,tokenReceived),
//		error: dojo.hitch(this,tokenRequestError)
//		},{
//		usePost: true
//		});
//		},
		/**
		 * Returns the username to access ESRI's paid services
		 */
		getRoutingServiceUserName: function()
		{
			var mapConf = this.map.mapConf;
			if((mapConf != null) && (mapConf!= undefined) && (mapConf.username != null) && (mapConf.username != undefined))
			{
				return mapConf.username;
			}
			else
			{
				return "";
			}
		},
		/**
		 * Returns the password to access ESRI's paid services
		 */
		getRoutingServicePassword: function()
		{
			var mapConf = this.map.mapConf;
			if((mapConf != null) && (mapConf!= undefined) && (mapConf.password != null) && (mapConf.password != undefined))
			{
				return mapConf.password;
			}
			else
			{
				return "";
			}
		},
		/**
		 * Returns the Route Service URL to access ESRI's paid services
		 */
		getRoutingServiceUrl: function()
		{
			var mapConf = this.map.mapConf;
			if((mapConf != null) && (mapConf!= undefined) && (mapConf.routeServiceUrl != null) && (mapConf.routeServiceUrl != undefined))
			{
				return mapConf.routeServiceUrl;
			}
			else
			{
				return "";
			}
		},
		/**
		 * Returns the Route Service URL to access ESRI's paid services
		 */
		getTravelMode: function()
		{
			var mapConf = this.map.mapConf;
			if((mapConf != null) && (mapConf!= undefined) && (mapConf.travelMode != null) && (mapConf.travelMode != undefined))
			{
				return mapConf.travelMode;
			}
			else
			{
				return 1; // Driving Time
			}
		},
		/**
		 * Executes all route requests from the queue
		 */
		executeQueuedRouteRequests: function()
		{
			console.log("Executing queued route requests ", this._routeQueue.length);
			while (this._routeQueue.length > 0)
			{
				var obj = this._routeQueue.pop();
				this.showRoute(obj.stops, obj.callback, obj.errCb, null, obj.instanceConf);
			}
		}
	});
});

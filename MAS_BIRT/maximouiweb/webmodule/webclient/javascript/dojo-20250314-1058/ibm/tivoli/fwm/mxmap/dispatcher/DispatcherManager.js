// wrapped by build app
define("ibm/tivoli/fwm/mxmap/dispatcher/DispatcherManager", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/routing/MultipleRoutesManager,ibm/tivoli/fwm/mxmap/ImageLibraryManager"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.dispatcher.DispatcherManager");
dojo.require("ibm.tivoli.fwm.mxmap.routing.MultipleRoutesManager");
dojo.require("ibm.tivoli.fwm.mxmap.ImageLibraryManager");
/**
 * Controls the communication between the map,routing and the applet.<br>
 * By default it sets the map symbology to be based on the routes.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.dispatcher.DispatcherManager", ibm.tivoli.fwm.mxmap._Base, {
	// these are all static... not sure that is intentional
	map: null,
	_needsModelRefresh: false,
	applet: null,
	routeCache: null,
	routeManager: null,
	_calculatingRoutes: false,
	_callBuffer: [],
	_totalRequested: 0,
	_totalCompleted: 0,
	travelTimeToSave: [],
	errorCodes: null,
	_updateProjTries: 10,
	constructor: function(params)
	{
		dojo.mixin(this, params);

		if (this.map.isMapGraphite()) {
			return;
		}

		this.map.registerDatasourceRefresh(dojo.hitch(this, this.refreshDS));
		this._executionOptions = {};
		this.routeManager = this.map.routeManager;
		this.addSubscription("onWorkAssigned_" + this.map.getId(), dojo.hitch(this, this.onWorkAssigned));
		this.routeCache = {};
		this._calculatingRoutes = false;
		this._callBuffer = [];
		this._needsModelRefresh = false;
		this.errorCodes = [];
		this._totalRequested = 0;
		this._totalCompleted = 0;
		this.travelTimeToSave = [];
		this._updateProjTries = 10;
	},

	/**
	 * Set the default symbology to be based on the Route.
	 */
	init: function()
	{
		if (this.map.isMapGraphite()) {
			this.map.initRoutes();
			return;
		}

		var workOrderMarkerInfo = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getDefaultWorkOrderMarkerImageInfo();
		var resourceSymbology = {
			"id": "resource",
			"labelGroup": "map",
			"labelKey": "resourcesymbologylabel",
			"legendTitleGroup": "map",
			"legendTitleKey": "workorderresourcelegendtitle",
			"type": "dynamic",
			"legends": [ {
				"id": "fwm_default",
				"labelGroup": "map",
				"labelKey": "defaultlayerlabel",
				"symbol": {
					"url": workOrderMarkerInfo.getImageURL(),
					"color": "",
					"offsetx": workOrderMarkerInfo.getImageAnchor()[0],
					"offsety": workOrderMarkerInfo.getImageAnchor()[1],
					"width": workOrderMarkerInfo.getImageSize()[0],
					"height": workOrderMarkerInfo.getImageSize()[1]
				},
				"isDefault": true
			} ]
		};
		var layer = this.map.layersManager.getLayerForObjectName("WORKORDER");
		this.routeSymbology = layer.createNewChildLayer({
			layerName: ibm.tivoli.fwm.i18n.getMaxMsg("map", "resourcesymbologylabel"),
			layerId: resourceSymbology.id,
			layerConf: resourceSymbology,
			map: this.map,
			layerType: ibm.tivoli.fwm.mxmap.layers.LayerType.SYMBOLOGY,
			symbologyType: resourceSymbology.type,
			childrenTitle: ""
		});
		this.routeSymbology.toggleState();
		this.routeSymbology.setDefault();
		
		// Create the route layer if it does not already exist
		// It has nothing to do with the route symbology created above
		// This layer is just to allow for enabling/disabling route lines
		this.map.createRouteLayer();

		this.map.setDispatcher(this);
		
		this.addSubscription("onMarkerClicked_" + this.map.getId(), dojo.hitch(this, this._sendActivityToHighlight));
	},
	clearAllCurrentRoutes: function()
	{
		if (this.map.isMapGraphite()) {
			this.map.clearRoutes();
			return;
		}

		this.data = {};
		this.routeManager.clearAll();
		this.routeCache = {};
	},
	drawAllRoutes: function(routeData, successCallback, errorCallback)
	{
		if (this.map.isMapGraphite()) {
			this.map.drawRoutes(routeData);
			return;
		}

		this.resetMaximoTimer();
		// TODO find a way tocancel a previous request, like when user clicks
		// twice on the next calendar view page
		// 12-13571 - Since the applet can make more than one multiple route request for a given set of resources,
		// we cannot reset the this.travelTimeToSave buffer inside the _addRoute() method because would erase all
		// travel times from the previous request before sending to Maximo. So we only reset this.travelTimeToSave
		// if this is the first multiple route request from the applet.
		if(this._calculatingRoutes == false)
		{
			this.travelTimeToSave = [];
			// This variable cannot be reset in _addRoute() method as well because errors that might
			// happen in the first applet request will be ignored.
			this.errorCodes = [];
		}
		this._loadedData(routeData);
	},
	/**
	 * If several routing requests were done, we buffer the last one in order to
	 * execute after the other calls
	 */
	_triggerBufferedCalls: function()
	{
		if (this._callBuffer.length > 0)
		{
			console.log("executing buffered calls", this._callBuffer.length);
			// Using .shift() instead of .pop() because the route requests must be
			// processed in the same order they were received
			// We were using .pop() because we were only storing the last route request (which was wrong)
			this._loadedData(this._callBuffer.shift());
		}
	},
	/**
	 * Creates the routesfor the current Dispatch data. Data comes from the
	 * dispatch applet and contains the assignments per resources for a certain
	 * day.<br>
	 * 
	 * We only buffer the last request, so if a routing request is being handled
	 * and another 2 requests from dispatch are done, only the last one needs to
	 * be executed, improving usability and performance.
	 * 
	 * @param data
	 */
	_loadedData: function(data)
	{
		if (!window.ccc)
		{
			window.ccc = 0;
		}
		data.id = window.ccc++;
		console.info("DISPATCH loaded data", data.id, data);
		if (this._calculatingRoutes == true)
		{
			console.log("BUFFERING IN DISPATCH route being executed buffering call");

			var bufdata = this._callBuffer[0];
			if (bufdata && bufdata.options)
			{
				if (bufdata.options.hasErrCallback == true)
				{
					this._refreshInfo.errorCb();
				}
				else if (bufdata.options.hasCallback == true)
				{
					this._refreshInfo.callback();
				}
			}			
			//this._callBuffer[0] = (data);
			// Instead of just replacing the last stored route request, we buffer all of them
			// because if we scroll through more than one group of work orders and more than 2 route
			// requests are made, we can't ignore the intermediate ones because they may be "clear route"
			// requests. When scrolling from a group of WOs to another without running the "clear route" request
			// for all resources, some old routes may not be deleted if the second group of WOs do not
			// contain routes for some resources that the first group had.
			this._callBuffer.push(data);
			// Previous (wrong) comment: only one is buffered, we only
			// calculate the last requested
			// route
		}
		else
		{
			console.log("executing", data.options);
			var routes = data.allRoutes;
			this._totalRequested = routes.length;
			this.data = data;
			if (this._totalRequested > 0)
			{
				this._startTime = new Date().getTime();
				// This variable cannot be reset here because errors that might happen in the first applet
				// request will be ignored.
				//this.errorCodes = [];
				this._calculatingRoutes = true;
				// simple mutex
				this._needsModelRefresh = false;
				if (dojo.config.fwm.debug == true)
				{
					// console.log("map", this.map);
					// console.log(routes.length, data);
				}

				this._totalCompleted = 0;

				for ( var i = 0; i < routes.length; i++)
				{
					var routeInfo = routes[i];
					this._addRoute(id, routeInfo);
				}

			}
			else
			{
				// 12-13612. Sometimes (not sure why) a buffered call runs and the logic flow ends up here
				// because this._totalRequested = 0. When this happens (mostly because the user scrolled
				// the applet from one day do another skipping one day between the two), the zoomAndCenterOverAll() function
				// is not called when the routes are done loading. So I added the logic below (the same as in allSLRRequestsComplete())
				// to guarantee that zoomAndCenterOverAll() runs.
				this.allSLRRequestsComplete();
			}
		}
	},
	/*
	 * DEBUGGGING purposes, would add a stop marker
	 */
	__debugAddStopToMap: function(record)
	{
		var point = this.map.latLng(record.lat, record.lng);
		this.map.addMarker(point);
	},
	/**
	 * Draws a route based on the route info of a resource
	 * 
	 * @param id
	 * @param routeInfo
	 */
	_addRoute: function(id, routeInfo)
	{

		var color = routeInfo.color;
		if (color.substring(0, 1) != '#')
		{
			color = "#" + color;
		}

		var stops = [];
		// 12-13571 - Since the applet can make more than one multiple route request for a given set of resources,
		// we cannot reset the this.travelTimeToSave buffer here because would erase all
		// travel times from the previous request before sending to Maximo. So we only reset this.travelTimeToSave
		// in the first multiple route request from the applet.
		//this.travelTimeToSave = [];
		var cf = this.map.routeConf;
		cf.routecolor = color;
		stops = routeInfo.stops;
		var routeInfoAux = routeInfo;
		if (routeInfo.noroute != true && stops.length > 1)
		{

			var complete = function(route)
			{
				if (this.routeCache[routeInfoAux.resource.id])
				{
					this.routeCache[routeInfoAux.resource.id].clear();
				}
				this.routeCache[routeInfoAux.resource.id] = route;
				this.completeRoute(route, routeInfoAux);

			};
			var error = function(errorCode, msg)
			{
				this._totalCompleted++;
				this.onError(errorCode, routeInfoAux, msg);
				// 12-13610 - We need to try to remove this cached route if the route creation was successful for this resource
				// in a previous day. Otherwise, if the route fails for this day (which is the case here), the old route
				// will not be deleted and may confuse the user.
				if (this.routeCache[routeInfo.resource.id])
				{
					this.routeCache[routeInfo.resource.id].clear();
					this.routeCache[routeInfo.resource.id] = null;
				}
				if (this._totalCompleted == this._totalRequested)
				{
					this.allSLRRequestsComplete();
				}
			};
			this.routeManager.createRoute(stops, cf, dojo.hitch(this, complete), dojo.hitch(this, error), true);
		}
		else
		{
			this._totalCompleted++;
			if (routeInfo.noroute == true)
			{
				if (dojo.config.fwm.debug == true)
				{
					console.log("no route for this resource", routeInfo);
				}
			}
			else
			{
				this.onError("MIN_STOPS_REQ", routeInfoAux);
			}
			if (this.routeCache[routeInfo.resource.id])
			{
				this.routeCache[routeInfo.resource.id].clear();
				this.routeCache[routeInfo.resource.id] = null;
			}
			if (this._totalCompleted == this._totalRequested)
			{
				this.allSLRRequestsComplete();
			}
		}
	},
	/**
	 * this method is called when a route is completed. It will handle any need
	 * to save the travel time.
	 * 
	 * @param route
	 * @param routeInfo
	 */
	completeRoute: function(route, routeInfo)
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("route", route);
			console.log("routeInfo", routeInfo);
		}
		this._totalCompleted++;
		for ( var j in routeInfo.stops)
		{
			var item = routeInfo.stops[j];

			if (j > 0)
			{
				var legInfo = route.itinerary.legs[j - 1];

				var routedata = item.routedata;
				if (routedata == null)
				{
					console.error("Assignment ", item, " with no route data info");
					continue;
				}
				if (routedata.HASTRAVELTIME == false)
				{

					if (legInfo)
					{
						var totalSecondsToStop = this.convertDurationToSeconds(legInfo.durationToLeg);
						if (totalSecondsToStop)
						{

							var slrTravelData = {
								ASSIGNMENTID: routedata.ASSIGNMENTID,
								SLROUTEID: routedata.SLROUTEID,
								FROMLOCATIONSID: routedata.FROMLOCATIONSID,
								TOLOCATIONSID: routedata.TOLOCATIONSID,
								FROMASSIGNMENT: routedata.FROMASSIGNMENT,
								TRAVELTIME_SECS: totalSecondsToStop
							};

							this.travelTimeToSave.push(slrTravelData);
							this._needsModelRefresh = true;
						}
					}
				}
			}

		}

		console.log(this._totalCompleted, "/", this._totalRequested, "routes created");

		if (this._totalCompleted == this._totalRequested)
		{
			this.allSLRRequestsComplete();
		}
	},
	/**
	 * Simple conversion from duration double to seconds
	 * 
	 * @param duration
	 * @returns
	 */
	convertDurationToSeconds: function(/* in minutes */duration)
	{
		return Math.round(duration * 60);
	},
	/**
	 * On a failure of creating a route we buffer it and only display after all
	 * routes are drawn. We buffer the error, the route info and any message
	 * from the routing service.
	 * 
	 * @param errorCode
	 * @param routeInfo
	 * @param msg
	 */
	onError: function(errorCode, routeInfo, msg)
	{
		console.warn("Failed to draw route", errorCode);
		var errorMsg = msg;
		if (msg && msg.message)
		{
			errorMsg = msg.message;
		}

		this.errorCodes.push({
			errorInfo: {
				code: errorCode,
				msg: errorMsg
			},
			routeInfo: routeInfo
		});

	},

	/**
	 * function to post events to maximo, subclasses can override
     */
	postEvent: function(name, data, onSuccess, onError) {
		var myEvent = new Event(name, 'mapdispatcher-mxdispatcherctrl', data, REQUESTTYPE_HIGHASYNC);
		queueManager.queueEvent(myEvent, "application/json", "json", onSuccess, onError);
	},

	/**
	 * If any traveltime needs to be saved, this is executed and saves ALL the
	 * traveltime calculated in this routing execution
	 */
	_saveBulkOfSLRTravelTime: function()
	{
		var success = function(result)
		{
			console.log("result", result);
			this._handleServerData(result, "onSLRTravelTimeUpdated");
		};
		this.postEvent("SAVEBULKTRAVELTIME", this.travelTimeToSave, dojo.hitch(this, success), dojo.hitch(this, this.genericError));
		// var myEvent = new Event("SAVEBULKTRAVELTIME", 'mapdispatcher-mxdispatcherctrl', this.travelTimeToSave, REQUESTTYPE_HIGHASYNC);
		// queueManager.queueEvent(myEvent, "application/json", "json", dojo.hitch(this, success), dojo.hitch(this, this.genericError));
	},
	/**
	 * @deprecated use _saveBulkOfSLRTravelTime
	 * @param slrTravel
	 */
	_saveSLRTravelTime: function(slrTravel)
	{
		var success = function(data)
		{
			console.log("Saved SLRTravel Time ", data, slrTravel);

		};
		this.postEvent("SAVETRAVELTIME", slrTravel, success, this.genericError);
		// var myEvent = new Event("SAVETRAVELTIME", this.mxdispatcherctrl, slrTravel, REQUESTTYPE_HIGHASYNC);
		// queueManager.queueEvent(myEvent, "application/json", "json", success, this.genericError);
	},
	/**
	 * This is a method to wrap up the applet calls to the server.
	 * 
	 * @param p
	 * @param appletCallbackFunction
	 * @param appletErrorCallback
	 */
	sendActionToServer: function(p, appletCallbackFunction, appletErrorCallback)
	{
		var beanMethodName = p.servermethod;
		var params = p.serverparams;
		if (dojo.config.fwm.debug == true)
		{
			console.log("sendActionToServer", beanMethodName, params, appletCallbackFunction);
		}
		var callback = function(data)
		{
			this._handleServerData(data, appletCallbackFunction, appletErrorCallback);

		};

		this.postEvent(beanMethodName, params, dojo.hitch(this, callback), dojo.hitch(this, callback));
		// var myEvent = new Event(beanMethodName, this.mxdispatcherctrl, params, REQUESTTYPE_HIGHASYNC);
		// queueManager.queueEvent(myEvent, "application/json", "json", dojo.hitch(this, callback), dojo.hitch(this, callback));
	},

	/**
	 * When all routes are completed for a certain dispatch request this method
	 * handles the results.<br>
	 * If there are buffered calls just skip the final methods and go on with
	 * the routing calculation of the buffered scripts.
	 */
	allSLRRequestsComplete: function()
	{

		this._calculatingRoutes = false;
		console.log("completed ", this.data.id, this.data.options);
		if (this._callBuffer.length > 0)
		{
			this.handleExecutionFinished();
			this._triggerBufferedCalls();
		}
		else
		{
			if (!this.data.options || this.data.options.noZoom != true)
			{
				// Pass the routes to be zoomed at. If not, routeManager will use
				// all of its routes (visible and invisible), which is wrong.
				this.routeManager.zoomAndCenterOverAll(this.routeCache);
			}

			var _endTime = new Date().getTime();
			console.info("Total for all routes b4 saving travel time: ", (_endTime - this._startTime), "ms");
			if (this.travelTimeToSave != null && this.travelTimeToSave.length > 0)
			{
				this._saveBulkOfSLRTravelTime();
			}

			if (this.map)
			{
				if (this.errorCodes != null && this.errorCodes.length > 0)
				{
					var returnedFct = function(data)
					{
						this.triggerMsgs();
						this.handleExecutionFinished();
					};

					this.postEvent("SHOWMULTIPLEROUTEERRORS", this.errorCodes, dojo.hitch(this, returnedFct), dojo.hitch(this, returnedFct));
					// var myEvent = new Event("SHOWMULTIPLEROUTEERRORS", this.mxdispatcherctrl, this.errorCodes, REQUESTTYPE_HIGHASYNC);
					// queueManager.queueEvent(myEvent, "application/json", "json", dojo.hitch(this, returnedFct), dojo.hitch(this, returnedFct));

				}
				else
				{
					this.handleExecutionFinished();

				}
			}
		}

	},
	handleExecutionFinished: function()
	{
		if (this.data.options && this.data.options.hasCallback == true)
		{
			this._refreshInfo.callback(this.routeManager);
		}
	},
	/**
	 * This is to force maximo to show messages on any error
	 * 
	 * @param error
	 */
	genericError: function(error)
	{
		this._calculatingRoutes = false;
		this.triggerMsgs();
		console.error("Error ", error);
	},
	/**
	 * All data returned from server is handled by this method that can trigger
	 * other messages or just call the success function back
	 */
	_handleServerData: function(data, callback, errCallback)
	{
		if (data && data.result == 'failed')
		{
			console.warn("there was an error on server", data);
			if (data.mxerror == true)
			{
				this.triggerMsgs();
			}
			if (errCallback)
			{
				this.getApplet().jsCallback(errCallback, dojo.toJson(data));
			}
		}
		else
		{
			this.getApplet().jsCallback(callback, dojo.toJson(data));
		}
	},
	/**
	 * Update several asignments at once
	 */
	bulkAssignmentsUpdates: function(arrayOfAssignments)
	{
		var success = function(data)
		{
			this._handleServerData(data, "onBulkAssignments");
			// this.getApplet().jsCallback("onBulkAssignments",
			// dojo.toJson(data));
		};

		this.postEvent("UPDATEASSIGNMENTS", arrayOfAssignments, dojo.hitch(this, success), dojo.hitch(this, this.genericError));
		// var myEvent = new Event("UPDATEASSIGNMENTS", this.mxdispatcherctrl, arrayOfAssignments, REQUESTTYPE_HIGHASYNC);
		// queueManager.queueEvent(myEvent, "application/json", "json", dojo.hitch(this, success), dojo.hitch(this, this.genericError));
		this.resetMaximoTimer();
	},
	/**
	 * On SKDProject updates it is called to reload the projects data.
	 * 
	 * @param projId
	 */
	updateProject: function(projId)
	{
		console.log("Project changed");
		if (!this.getApplet())
		{
			this._updateProjTries--;
			if (this._updateProjTries <= 0)
			{
				this._updateProjTries = 10;
				console.error("Can't find the applet or it's not loaded!");
			}
			else
			{
				var fct = function()
				{
					this.updateProject(projId);
				};
				setTimeout(dojo.hitch(this, fct), 1000);
			}
		}
		this._updateProjTries = 10;
		this.getApplet().updateProjId(projId);
		this.resetMaximoTimer();
	},
	/**
	 * Due the high async calls, we need to force maximo to trigger its actions
	 * thru sync calls to trigger messages and actions
	 */
	triggerMsgs: function()
	{
		sendEvent("TRIGGERMSGS", 'mapdispatcher-mxdispatcherctrl');
		this.resetMaximoTimer();
	},
	/**
	 * Applets reference gets lost when changing tabs or re loading it. So this
	 * method tries "hard" to get its reference
	 * 
	 * @returns
	 */
	getApplet: function()
	{
		try
		{

			this.applet.isLoaded();
			return this.applet;
		}
		catch (e)
		{
			console.log("trying to refecth the applet with dojo.byId ", dojo.byId("CalendarViewId"), e);
			this.applet = dojo.byId("CalendarViewId");
			try
			{
				this.applet.isLoaded();
				return this.applet;
			}
			catch (e2)
			{
				console.log("trying to refecth the applet with window.CalendarViewId", window.CalendarViewId, e2);
				this.applet = window.CalendarViewId;
				try
				{
					this.applet.isLoaded();
					return this.applet;
				}
				catch (e3)
				{
					console.warn("can't find applet to start communication", e3);
				}
			}
		}
	},
	/**
	 * Forces the applet to get refreshed
	 */
	refresh: function()
	{

		this.getApplet().updateModel();

	},
	_refreshInfo: null,
	refreshDS: function(callback, errorCallback, noZoom)
	{
		console.log("calling updateModel");
		// dangerous... but that's what i can do now Ideally we should pass it
		// to the applet
		this._refreshInfo = {
			callback: callback,
			errorCb: errorCallback
		};
		var _executionOptions = {
			noZoom: noZoom,
			refreshMap: true,
			hasCallback: false,
			hasErrCallback: false
		};
		if (callback)
		{
			_executionOptions.hasCallback = true;
		}
		if (callback)
		{
			_executionOptions.hasErrCallback = true;
		}
		this.getApplet().updateModelWithOptions(dojo.toJson(_executionOptions));
		console.log("done");
	},
	/**
	 * If any work order gets assigned we need to update the applets data.
	 */
	onWorkAssigned: function()
	{
		// need to refresh the model to load the assignmenton the applet.
		this.getApplet().updateModel();

	},
	/**
	 * On any action we must reset maximo timer.
	 */
	resetMaximoTimer: function()
	{
		resetLogoutTimer(false);
	},
	/**
	 * Shows route lines and calculated markers only for the
	 * resources that are currently active in calendar view
	 */
	showCachedRoutesLinesAndCalculatedMarkers: function()
	{
		for(resourceId in this.routeCache)
		{
			if(this.routeCache[resourceId] != null)
			{
				this.routeCache[resourceId].setLineVisible(true);
				this.routeCache[resourceId].showCalculatedMarkers();
			}
		}
	},
	/**
	 * Returns the route from routeCache which corresponds to the resource defined 
	 * by resourceType (LABOR or AMCREW) and resourceId (value of LABORCODE or AMCREW) 
	 */
	getRouteInfoForResource: function(resourceType, resourceId)
	{
		// The applet sends route data using a "key" in the following format:
		// "RESOURCE_TYPE : RESOURCE_ID", where RESOURCE_TYPE is either LABOR or AMCREW
		// and RESOURCE_ID is the value of the ID attribute (LABORCODE for labor and AMCREW for crew) 
		var routeInfo = this.routeCache[resourceType + ":" + resourceId];
		return routeInfo;
	},
	/**
	* highlight on the map the stop with the activityid of activityId, called from the applet on select
	*/
	highlightStop: function(activityId)
	{
		var markers = this.map.getMarkers();
		// Iterate over all markers that are showing on the map and, 
		// if the activityId is the same, then highlight it (show maptip)
		dojo.forEach(markers, function(marker)
		{
			if(marker.hasActivityId(activityId))
			{
				marker.openBubble();
			}
		});
	},
	
	/**
	 * Method that is triggered whenever a marker is clicked.
	 * The idea is to pass the activity ID to the applet so the assignment can be highlighted.
	 */
	_sendActivityToHighlight: function(params)
	{
		if(this.getApplet() != undefined)
		{
			var marker = params.marker;
			if(marker != undefined)
			{
				var activityIdArray = marker.getActivityIdArray();
				if(activityIdArray != null)
				{
					dojo.forEach(activityIdArray,  dojo.hitch(this, function(activityId)
					{
						// Highlight the activity that corresponds to
						// this marker if it contains activityId
						this.getApplet().highlightactivity(activityId);
					}));
				}

				// If this is a multi-marker, go for its children
				// and highlight their activities
				if(marker.hasReferencedMarkers())
				{
					referencedMarkers = marker.getReferencedMarkers();
					dojo.forEach(referencedMarkers, dojo.hitch(this, function(referencedMarker)
					{
						activityIdArray = referencedMarker.getActivityIdArray();
						if(activityIdArray != null)
						{
							dojo.forEach(activityIdArray, dojo.hitch(this,function(activityId)
							{
								// Highlight the activity that corresponds to
								// this marker if it contains activityId
								this.getApplet().highlightactivity(activityId);
							}));
						}
					}));
				}
			}
		}
		else
		{
			console.error("Could not call this.getApplet().highlightactivity(activityId) because this.getApplet() returned undefined");
		}
	},

	/**
	 * Method that is triggered by the applet whenever the unassigned work orders
	 * need to be updated on the map.
	 */
	updateUnAssignWODates: function(startDate, endDate)
	{
		var data = {
				startDate: dojo.number.parse(startDate),
				endDate: dojo.number.parse(endDate)
			};
		dojo.publish("onDispatcherRefresh_" + this.map.getId(), [data]);
	}
});

});

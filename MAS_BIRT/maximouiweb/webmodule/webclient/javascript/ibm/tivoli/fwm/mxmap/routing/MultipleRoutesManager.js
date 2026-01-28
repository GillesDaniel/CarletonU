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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.MultipleRoutesManager");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.routing.RouterFactory");
dojo.require("ibm.tivoli.fwm.mxmap.routing.itinerary.Itinerary");
/**
 * Manage multiple routes.<br>
 * 
 */
dojo.declare("ibm.tivoli.fwm.mxmap.routing.MultipleRoutesManager", ibm.tivoli.fwm.mxmap._Base, {
	routeConf: null,
	provider: null,
	map: null,
	routeUrl: null,
	routingData: null,
	routes: null,
	visible: true,

	constructor: function(params)
	{
		dojo.mixin(this, params);
		this.factory = new ibm.tivoli.fwm.mxmap.routing.RouterFactory({
			map: this.map,
			provider: this.provider
		});
		this.routeConf.routeUrl = this.routeUrl;
		this.routes = [];
	},
	createRoute: function(stops, config, callback, errcallback, noZoom)
	{
		var routeConf = {
			routecolor: config.routecolor,
			routeOpacity: 0.5,
			routeLineWidth: 5,
			endLocation: config.end,
			startLocation: config.start,
			optimizeroute: config.optimizeroute,
			startwithcurrentlocation: config.startwithcurrentlocation,
			routeUrl: config.routeUrl,
			map: this.map
		};

		var router = this.factory.createRouter(routeConf);

		var fct = function(route)
		{
			route.id = this.routes.length;
			this.routes.push(route);
			route.setLineVisible(this.visible);
			route.show();
			if (noZoom != true)
			{
				route.zoomToRoute();
				console.log("zooming to single route!");
				var routeWarning = this.getWarning();
				if(routeWarning)
				{
					this.map.showWarning(routeWarning);
				}
			}
			if (callback)
			{
				callback(route);
			}
		};

		if (!errcallback)
		{
			errcallback = dojo.hitch(this, this.routingError);
		}

		var me = this;
		if (router.then) {
			router.then(function(objRouter) {
				objRouter.customConf = me.customConf;
				objRouter.drawRoute(stops, dojo.hitch(me, fct), errcallback, routeConf);
			});
		}
		else {
			router.customConf = me.customConf;
			router.drawRoute(stops, dojo.hitch(me, fct), errcallback, routeConf);
		}
	},
	customConf: null,
	reGenerate: function(route, customConf, callback, errorCallback)
	{
		this.customConf = customConf;
		if (dojo.config.fwm.debug == true)
		{
			console.log("route id " + route.id);
		}
		route.originalRouter.customConf = customConf;

		// The instanceConf parameter was added because it contains information on the route that cannot
		// be retrieved from originalRouter
		route.originalRouter.drawRoute(route.inputInfo.stops, callback, errorCallback, route.instanceConf);
		// this.createRoute(conf.stops,conf.successCb,conf.errorCb);
	},
	replaceRoute: function(route, id)
	{
		this.removeRoute(this.routes[id]);
		this.routes[id] = route;
		route.id = id;
	},
	removeRoute: function(route)
	{
		route.clear();
	},
	clearAll: function()
	{
		if (dojo.config.fwm.debug == true)
		{
			console.log("[MultipleRoutesManager] Clearing all route information");
		}
		while (this.routes.length > 0)
		{
			this.routes.pop().clear();
		}
		if (dojo.config.fwm.debug == true)
		{
			console.log("[MultipleRoutesManager] Done");
		}
	},
	redrawAll: function()
	{
		dojo.forEach(this.routes, function(route)
		{
			route.redraw();
		});
	},
	setLineVisible: function(visible)
	{
		dojo.forEach(this.routes, function(route)
		{
			route.setLineVisible(visible);
		});
	},
	hideRoutesLinesAndCalculatedMarkers: function()
	{
		this.visible = false;
		dojo.forEach(this.routes, function(route)
		{
			route.setLineVisible(false);
			route.hideCalculatedMarkers();
		});
	},
	showRoutesLinesAndCalculatedMarkers: function()
	{
		this.visible = true;
		var disp = this.getDispatcher()
		// Defect 56204 - If dispatcher is the one handling this class,
		// do not show every route's lines because some of them may not be
		// active at a given time. And only dispatcher knows which routes are active
		// because it holds "routeCache".
		// This workaround is not so elegant but it is the only one I could think of that does
		// not break anything else and that is not risky.
		// The elegant way would be to make this class hold the route cache
		// but this would involve too many changes to the logic and it is risky.
		if(disp)
		{
			disp.showCachedRoutesLinesAndCalculatedMarkers();
		}
		else
		{
			dojo.forEach(this.routes, function(route)
			{
				route.setLineVisible(true);
				route.showCalculatedMarkers();
			});
		}
	},
	// _addItinerary: function(route)
	// {},
	centerAndZoom: function()
	{
		this.zoomAndCenterOverAll();
	},
	// Zoom to every route in this.routes. If "routes" is passed
	// as argument, zoom to those routes instead of this.routes.
	zoomAndCenterOverAll: function(routes)
	{
		var routesToZoomTo = (routes != undefined && routes != null) ? routes : this.routes;
		
		var bounds = null;
		for(var idx in routesToZoomTo)
		{
			if((routesToZoomTo[idx] != null) && (routesToZoomTo[idx] != undefined))
			{
				if(bounds)
				{
					bounds.merge(routesToZoomTo[idx].getBounds());
				}
				else
				{
					bounds = routesToZoomTo[idx].getBounds();
				}
			}
		};
		
		if(bounds)
		{
			this.map.setBounds(bounds);
		}
		else
		{
			console.warn("[MultipleRoutesManager] No routes to center on");
		}
	},
	routingError: function(statusCode, error)
	{

		var maximo = this.map.getMaximo();
		switch (statusCode)
		{

			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.MIN_STOPS_REQ:
				maximo.showMessage("mapserver", "route_min_stops_failure");
				break;
			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.ZERO_RESULTS:
				maximo.showMessage("mapserver", "route_zero_results");
				break;
			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.INVALID_REQUEST:
				maximo.showMessage("mapserver", "route_invalid_request");
				break;
			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.REQUEST_DENIED:
				maximo.showMessage("mapserver", "route_request_denied");
				break;
			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.OVER_LIMIT:
				maximo.showMessage("mapserver", "route_over_limit");
				break;
			case ibm.tivoli.fwm.mxmap.routing.RoutingErrorCodes.TIMEOUT:
				maximo.showMessage("mapserver", "route_timeout");
				break;

			default:
				var msg = error;
				if (error && error.message)
				{
					msg = error.message;
				}
				maximo.showMessage("mapserver", "route_unknown_failure", [ msg ]);
				break;
		}

	},
	destroyRecursive: function()
	{
		if (this.router)
		{
			this.router.destroyRecursive();
		}
		this.inherited(arguments);
	},
	getItinerary: function()
	{
		return this.routes[0].itinerary;
	},
	getDispatcher: function()
	{
		return this.map.getDispatcher();
	},
	getWarning: function()
	{
		var warning = null;
		for(var i=0; i<this.routes.length; i++)
		{
			var warningsArray = this.routes[i].getRouteWarningCodes();
			// TODO: For now there is only one possible warning
			// Add the code to handle more when necessary
			if(warningsArray && (warningsArray.length > 0))
			{
				warning = warningsArray[0];
				break;
			}
		}
		return warning;
	}
});

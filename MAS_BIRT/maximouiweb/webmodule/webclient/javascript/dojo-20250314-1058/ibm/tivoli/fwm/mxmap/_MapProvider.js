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


define("ibm/tivoli/fwm/mxmap/_MapProvider", [
	"dojo/_base/declare",
	"dojo/main",
	"dijit/main", "dojox/main",
	"dojo/topic",
	"ibm/tivoli/fwm/mxmap/_Base",
	"ibm/tivoli/fwm/mxmap/Radius",
	"ibm/tivoli/fwm/mxmap/_BoundingBox"
	],
	function (declare, dojo, dijit, dojox, topic, _Base, Radius,  _BoundingBox  ) {

	return declare([_Base], {
		WGS84WKID: 4326,
		Events: {
			click: 'click',
			rightclick: 'righclick',
			endPan: 'endPan',
			changeZoom: 'changeZoom',
			dragEnd: 'dragEnd',
			load: 'load'
		},
		MapType: {
			ROAD: 1,
			SATELLITE: 2,
			HYBRID: 3,
			PHYSICAL: 4
		},
		providerInitialized: false,
		/**
		 * The markers currently loaded.
		 */
		markers: [],

		/**
		 * The polylines currently loaded.
		 */
		polylines: [],

		map: null,

		element: null,

		init: function(element, options)
		{
			var me = this;
			this.providerInitialized = true;
			var def = new dojo.Deferred();
			if (this.mapConf.provider == "spatial") {
				this._init(element, options).then(function(){
					me.addSubscription("startedUserInteractionOnMap_" + me.compId, dojo.hitch(me, me.closeAllOtherMarkerInfoBubbles));
					def.callback(me);
				});
			} else {
				this._init(element, options);
				this.addSubscription("startedUserInteractionOnMap_" + me.compId, dojo.hitch(me, me.closeAllOtherMarkerInfoBubbles));
			}


			return def;
		},
		/* To be implemented by providers */
		_init: function(element, options)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},
		isProviderInitialized: function()
		{
			return this.providerInitialized;
		},
		destroyMap: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		isLoaded: function()
		{
			return this.loaded;
		},
		addOnload: function(fct)
		{
			this.addSubscription(this.Events.load + this.getId(), dojo.hitch(this, fct));
		},
		_loaded: function()
		{
			dojo.publish(this.Events.load + this.getId());
		},

		/* Returns the map's container DOM element. */
		getElement: function()
		{
			return this.element;
		},

		getProviderMap: function()
		{
			return this.map;
		},

		getMapType: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},
		setMapType: function(type)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		getCenter: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},
		setCenter: function(point, options)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		getZoom: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},
		setZoom: function(zoom)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		setCenterAndZoom: function(point, zoom)
		{
			this.setCenter(point);
			this.setZoom(zoom);
		},
		/* center and zoom over all markers on the map */
		autoCenterAndZoom: function(mboInfoArray)
		{
			// In spatial, there may be some delay between the markers being drawn
			// and the autoCenterAndZoom method being called, so if markers have not yet being drawn,
			// we wait some time and try again
			if((mboInfoArray != undefined) && (mboInfoArray.length > this.markers.length))
			{
				var me = this;
				setTimeout(function()
						{
					me.autoCenterAndZoom();
						},
						5000);
			}
			else
			{
				var atLeastOnePoint = false;
				//TODO Code copied from Mapstraction
				// var lat_max = -90;
				// var lat_min = 90;
				// var lon_max = -180;
				// var lon_min = 180;
				// limits changed due to x,y coordinates of ESRI
				var lat_max = -(2e32);
				var lat_min = (2e32);
				var lon_max = -(2e32);
				var lon_min = (2e32);

				var lat, lon;
				var checkMinMax = function()
				{
					if (lat > lat_max)
					{
						lat_max = lat;
					}
					if (lat < lat_min)
					{
						lat_min = lat;
					}
					if (lon > lon_max)
					{
						lon_max = lon;
					}
					if (lon < lon_min)
					{
						lon_min = lon;
					}
				};
				for ( var i = 0; i < this.markers.length; i++)
				{
					lat = this.markers[i].location.lat;
					lon = this.markers[i].location.lon;
					checkMinMax();
					atLeastOnePoint = true;
				}
				for (i = 0; i < this.polylines.length; i++)
				{
					for ( var j = 0; j < this.polylines[i].points.length; j++)
					{
						lat = this.polylines[i].points[j].lat;
						lon = this.polylines[i].points[j].lon;
						checkMinMax();
					}
					atLeastOnePoint = true;
				}
				if(atLeastOnePoint == true)
				{
					this.setBounds(new this.getBoundingBox(lat_min, lon_min, lat_max, lon_max));
				}
			}
		},

		getBounds: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},
		setBounds: function(bounds)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		getBoundingBox: function(swLat, swLng, neLat, neLng)
		{
			return new ibm.tivoli.fwm.mxmap._BoundingBox(swLat, swLng, neLat, neLng);
		},
		getBoundingBoxFromPoints: function(points)
		{
			var bounds = null;
			if(points && points.length > 0)
			{
				bounds = this.getBoundingBox(points[0].lat, points[0].lng, points[0].lat, points[0].lng);
				for ( var i = 1, len = points.length; i < len; i++)
				{
					bounds.extend(points[i]);
				}
			}
			return bounds;
		},

		getBoundingBoxFromSwAndNe: function(sw, ne)
		{
			var bounds = null;
			if(sw && ne)
			{
				bounds = this.getBoundingBox(sw.lat, sw.lng, ne.lat, ne.lng);
			}
			return bounds;
		},

		getAllPointsFromWGS84: function(points, callback, errCb)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},
		getAllPointsInWGS84: function(points, callback, errCb)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		resizeTo: function(width, height)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		addMarker: function(point, markerData)
		{
			// the placeMarker replaces the invoker from mapstraction
			var marker = this.createProviderMarker(point, markerData);

			this.markers.push(marker);

			return marker;
		},

		// Implemented by specific provider code
		createProviderMarker: function(params)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},


		removeMarker: function(marker)
		{
			var current_marker;
			for ( var i = 0; i < this.markers.length; i++)
			{
				current_marker = this.markers[i];
				if (marker == current_marker)
				{
					this.removeProviderMarker(marker);
					marker.onmap = false;
					this.markers.splice(i, 1);
					current_marker.destroyRecursive();
					break;
				}
			}
		},

		// Implemented by specific provider code
		removeProviderMarker: function(marker)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		removeAllMarkers: function()
		{
			var current_marker;
			while (this.markers.length > 0)
			{
				current_marker = this.markers.pop();
				this.removeProviderMarker(current_marker);
				current_marker.destroyRecursive();
			}
		},

		addPolyline: function(polyline, polylineData)
		{
			var propPoly = this.createProviderPolyline(polyline, polylineData);
			polyline.setChild(propPoly);
			this.polylines.push(polyline);
		},

		// Implemented by specific provider code
		createProviderPolyline: function(params)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		removePolyline: function(polyline)
		{
			var current_polyline;
			for ( var i = 0; i < this.polylines.length; i++)
			{
				current_polyline = this.polylines[i];
				if (polyline == current_polyline)
				{
					this.polylines.splice(i, 1);
					this.removeProviderPolyline(polyline);
					polyline.onmap = false;
					break;
				}
			}
		},

		// Implemented by specific provider code
		removeProviderPolyline: function(polyline)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		removeAllPolylines: function()
		{
			var current_polyline;
			while (this.polylines.length > 0)
			{
				current_polyline = this.polylines.pop();
				this.removeProviderPolyline(current_polyline);
				current_polyline.onmap = false;
			}
		},

		/* enables or disables the traffic layer */
		setShowTraffic: function(state)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		latLng: function(lat, lng, sr)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		polyline: function(points)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		// Looks like there is no specific implementation of Radius for the providers
		radius: function(center, quality)
		{
			var params = {center: center, quality: quality, map: this};
			return new Radius(params);
		},

		addMapEventHandler: function(event, handler)
		{
			this.addSubscription('mapProvider_' + event + '_' + this.getId(), handler);
		},
		removeMapEventHandler: function(event, handler)
		{
			this.removeSubscription('mapProvider_' + event + '_' + this.getId(), handler);
		},
		fireMapEvent: function(event, data)
		{
			dojo.publish('mapProvider_' + event + '_' + this.getId(), data);
		},

		pointToProprietary: function(point)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},
		pointFromProprietary: function(point)
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},


		geocode: function(callback, errorCallback, key, address)
		{
			this.providerGeocode(callback, errorCallback, key, address);
		},
		reverseGeocode: function(callback, errorCallback, key, lat, lng)
		{
			this.providerReverseGeocode(callback, errorCallback, key, lat, lng);
		},

		// Implemented by specific provider code
		providerGeocode: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},
		providerReverseGeocode: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},
		getMarkers: function()
		{
			return this.markers;
		},

		destroyRecursive: function()
		{
			if (this.markers)
			{
				this.removeAllMarkers();
				this.removeAllPolylines();
			}
			this.inherited(arguments)
		},

		stopEventPropagation: function (e)
		{
			if (!e) var e = window.event;

			e.cancelBubble = true;
			if (e.stopPropagation){
				e.stopPropagation();
			}
			if (e.stopEvent){
				e.stopEvent();
			}
			e.handled=true;
			if(e.originalEvent){
				e.originalEvent.cancelBubble=true;
				e.originalEvent.handled=true;
				stopBubble(e.originalEvent);
				cancelEvent(e.originalEvent);
				if (e.originalEvent.stopPropagation){
					e.originalEvent.stopPropagation();
				}
			}
		},
		// Whenever a maptip opens, check all other markers
		// and close their maptips if necessary (i.e. if they are showing)
		closeAllOtherMarkerInfoBubbles: function(e)
		{
			if(e.eventName == "openBubble")
			{
				var sourceMarker = e.objectSource;
				if((sourceMarker != null) && (sourceMarker != undefined))
				{
					for ( var i = 0; i < this.markers.length; i++)
					{
						if(this.markers[i] != sourceMarker)
						{
							this.markers[i].closeBubbleIfNecessary();
						}
					}
				}
			}
		}

	});

});





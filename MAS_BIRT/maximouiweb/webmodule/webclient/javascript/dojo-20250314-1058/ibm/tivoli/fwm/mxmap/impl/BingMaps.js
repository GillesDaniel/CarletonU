// wrapped by build app
define("ibm/tivoli/fwm/mxmap/impl/BingMaps", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/Map,ibm/tivoli/fwm/mxmap/impl/marker/BingMarker,ibm/tivoli/fwm/mxmap/impl/point/BingLatLonPoint,ibm/tivoli/fwm/mxmap/impl/polyline/BingPolyline,ibm/tivoli/fwm/mxmap/impl/boundingbox/BingBoundingBox,ibm/tivoli/fwm/mxmap/impl/geocoder/BingGeocoder,ibm/tivoli/fwm/mxmap/InfoWindow"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.impl.BingMaps");
dojo.require("ibm.tivoli.fwm.mxmap.Map");
dojo.require("ibm.tivoli.fwm.mxmap.impl.marker.BingMarker");
dojo.require("ibm.tivoli.fwm.mxmap.impl.point.BingLatLonPoint");
dojo.require("ibm.tivoli.fwm.mxmap.impl.polyline.BingPolyline");
dojo.require("ibm.tivoli.fwm.mxmap.impl.boundingbox.BingBoundingBox");
dojo.require("ibm.tivoli.fwm.mxmap.impl.geocoder.BingGeocoder");

dojo.declare("ibm.tivoli.fwm.mxmap.impl.BingMaps", ibm.tivoli.fwm.mxmap.Map, {

	constructor: function(options)
	{
		this.providerName = "microsoftv8";
	},
	/**
	 * These options will refine maps UI. See their descriptions at:
	 * http://msdn.microsoft.com/en-us/library/gg427603.aspx
	 */
	_getInitOptions: function()
	{
		var options = {};
		
		options.fixedMapPosition = false;
		options.useInertia = true;
		options.showScalebar = true;
		options.disableTouchInput = false;// allows user to touch screen.
		options.enableClickableLogo = false;
		options.enableSearchLogo = false;
		options.showCopyright = true;
		options.mapTypeId = Microsoft.Maps.MapTypeId.road;
		/* FWM opts */
		options.isIE = dojo.isIE;
		
		if (this.isMobile == true)
		{
			// 12-12979 Commenting out the line below because this option was making
			// the repositioning of maptips fail when resizing the mapcontrol div
			// options.fixedMapPosition = true;
			options.showScalebar = false;
		}
		
		options.initialLocation=this._getInitialLocation();
		
		
		return options;

	},
	_getCustomInitOptions: function()
	{
		if (this.customInitialMapOptions)
		{
			return this.customInitialMapOptions.bingmaps;
		}
		log.info("no custom configuration");
		return {};
	},
	destroyMap: function()
	{
		console.log("Destroying map!");
		try
		{
			var map = this.getProviderMap();

			if (typeof (map) != 'undefined' && map != null)
			{
				this._destroyProviderMap();
			}
			if (dojo.config.fwm.debug == true)
			{
				console.log("map was destroyed!");
			}
		}
		catch (e)
		{
			console.error("cannot destroy bing maps ", e.message);
		}

	},
	/**
	 * Initializes the map and all the initial setup for it. Also the
	 * handlers are added to the map in this map. Special attention in Bing
	 * maps for this method because it doesn't support changes of map
	 * components on demand and we create the map instance in this method.
	 * Therefore many of unchangeable stuff is set up here in this method.
	 */
	_init:function(element, options)
	{
		function _overrideBingMapConf(mapConf) {
			var isHttps = mapConf.https || location.protocol === 'https:';
	
			if (isHttps) {
				mapConf.https = true;
				
				if (mapConf.route && !mapConf.route.includes('https')) {
					mapConf.route = mapConf.route.replace('http', 'https');
				}
	
				if (mapConf.geocode && !mapConf.geocode.includes('https')) {
					mapConf.geocode = mapConf.geocode.replace('http', 'https');
				}
			}
		}
		_overrideBingMapConf(this.mapConf);

		this.element = element;

		var me = this;
		dojo.require("ibm.tivoli.fwm.mxmap.InfoWindow");
		if (!Microsoft || !Microsoft.Maps)
		{
			throw api + ' map script not imported';
		}

		options.credentials = this.mapConf.key;
		
		if (options.isIE && (!options.width || !options.height))
		{
			var width = 600;
			var height = 800;
			/**
			 * must not have px in the value
			 */
			if (element.style && element.style.width)
			{
				width = element.style.width;
				if (width.substr(width.length - 2) == 'px')
				{
					width = width.substr(0, width.length - 2);
				}
			}
			if (element.style && element.style.height)
			{
				height = element.style.height;
				if (height.substr(height.length - 2) == 'px')
				{
					height = height.substr(0, height.length - 2);
				}
			}
			options.width = width;// 'inherit';
			options.height = height;// 'inherit';
		}

		if (options.initialLocation && options.initialLocation.lat != null)
		{
			options.center = new Microsoft.Maps.Location(options.initialLocation.lat, options.initialLocation.lng);
		}
		if (options.initialLocation && options.initialLocation.level != null)
		{
			options.zoom = options.initialLocation.level;
		}
		// options.center=Location
		// zoom

		this.map = new Microsoft.Maps.Map(element, options);

		if (options.isIE)
		{
			/**
			 * ALL THIS CODE IS FOR INTERNET EXPLORER WINDOW RESIZE LOGIC IE
			 * doesn't update the map div width/height correctly in bingmaps
			 * so it doesn't fit in the available space. This logic listens
			 * to window.resize event to update the map width/height based
			 * on it's parent node and the view port available.
			 * 
			 * **IT DEPENDS ON DIJIT **
			 */

			var addEvent = function(elem, type, eventHandle)
			{
				if (elem == null || elem == undefined)
					return;
				if (elem.addEventListener)
				{
					elem.addEventListener(type, eventHandle, false);
				}
				else if (elem.attachEvent)
				{
					elem.attachEvent("on" + type, eventHandle);
				}
			};

			var mapDivElement = element.childNodes[0];

			var ieBingMapsResize = function()
			{
				try
				{
					// Issue 12-12453. The _resize() method in Map.js takes
					// care of the Map's parent div,
					// so I think that there is no need to calculate the
					// dimensions of this div.
					// var availableHorRegion =
					// parseInt(dijit.getViewport().h -
					// mapDivElement.parentNode.offsetTop - 20);
					// mapDivElement.style.height = (availableHorRegion) +
					// "px";
					mapDivElement.style.height = "100%";
					// var availableVerRegion =
					// parseInt(dijit.getViewport().w -
					// mapDivElement.offsetLeft - 20);
					// mapDivElement.style.width = (availableVerRegion) +
					// "px";
					mapDivElement.style.width = "100%";
				}
				catch (e)
				{
					console.error("Could not resize map element.", e.message);
				}
			};
			addEvent(window, "resize", ieBingMapsResize);

		}
		// dojo.create("div", {
		// id: "infoCustom",
		// style: {
		// top: 0,
		// left: 0,
		// width: '100px',
		// height: '150px',
		// zIndex: 1000000,
		// position: "absolute",
		// backgroundColor: "white",
		// display: "none"
		// }
		// }, dojo.body());

		var clickHandler = function(e)
		{
			var map = me.map;
			switch (e.targetType)
			{
				case 'map':
					var msLatLng = e.location;
					var latLng = me.latLng(msLatLng.latitude, msLatLng.longitude);
					me.fireMapEvent(me.Events.click, {
						'location': latLng
					});
					break;
				case 'pushpin':
				{
					break;
				}
				default:
					break;
			}

		};
		Microsoft.Maps.Events.addHandler(this.map, 'click', clickHandler);
		var rclickHandler = function(event)
		{
			if (event.targetType && event.targetType == 'map')
			{

				var point = new Microsoft.Maps.Point(event.getX(), event.getY());
				var msLatLng = me.map.tryPixelToLocation(point);
				var latLng = me.latLng(msLatLng.latitude, msLatLng.longitude);
				var pixel = {
					x: event.pageX - event.target.getPageX(),
					y: event.pageY - event.target.getPageY()
				};
				me.fireMapEvent(me.Events.rightclick,{
					'location': latLng,
					'pixel': pixel
				});

			}

			me.stopEventPropagation(event);
			return true;
		};
		// deal with mouse right click
		Microsoft.Maps.Events.addHandler(this.map, 'rightclick', rclickHandler);
		// deal with zoom change
		Microsoft.Maps.Events.addHandler(this.map, 'viewchange', function()
		{
			me.fireMapEvent(me.Events.changeZoom);
		});

		// deal with map movement
		Microsoft.Maps.Events.addHandler(this.map, 'viewchangeend', function()
		{
			me.fireMapEvent(me.Events.endPan);
		});

		this.loaded = true;
	},
	
	/**
	 * disposes map
	 */
	_destroyProviderMap: function()
	{
		var map = this.getProviderMap();
		console.log("[Bingv8] Going to dispose");
		map.dispose();
		console.log("[Bingv8] Disposed");
		this.loaded = false;
		map = null;

	},
	
	
	/**
	 * Resizes the map.
	 */
	resizeTo: function(nWidth, nHeight)
	{
		
		var mapCtrl = dojo.byId( this.divId );
		var height = mapCtrl.offsetHeight;
		dojo.style( this.divId , {"height": height-1+"px"});
		if (dojo.isIE)
		{
			if (this.getElement().childNodes)
			{
				this.getElement().childNodes[0].style.width = nWidth;
				this.getElement().childNodes[0].style.height = nHeight;
			}
			var map = this.getProviderMap();

			map.setOptions({
				width: "0px"
			});
		} 
	},

	/**
	 * Reset to small controls. ** Bing provider only accept options set in
	 * map contructor ***
	 */
	addSmallControls: function()
	{
		// not implemented
	},
	/*
	 * Always in WGS84
	 */
	getAllPointsFromWGS84: function(points, callback)
	{
		callback(points);
	},
	getAllPointsInWGS84: function(points, callback)
	{
		callback(points);
	},
	/**
	 * reset to large controls ** Bing provider only accept options set in
	 * map contructor ***
	 */
	addLargeControls: function()
	{
		// not implemented
	},

	/**
	 * Enable map type control (ROAD, MAP, etc) ** Bing provider only accept
	 * options set in map contructor ***
	 */
	addMapTypeControls: function()
	{
		// not implemented
	},

	/**
	 * Set map center point and zoom level.
	 */
	setCenterAndZoom: function(nPoint, nZoom)
	{
		var map = this.getProviderMap();
		var options = {
			zoom: nZoom,
			center: nPoint.toProprietary()
		};
		map.setView(options);
	},

	/**
	 * Add a marker (Microsoft.Maps.Pushpin) to the map. Also the event
	 * handlers are added using the specific code of Bing provider.
	 */
	createProviderMarker: function(point, markerData)
	{
		var marker = null;
		if(point)
		{
			var params = {point: point, map: this.getProviderMap(), compId: this.compId, isMobile: this.isMobile};
			var marker = new ibm.tivoli.fwm.mxmap.impl.marker.BingMarker(params);
			if(marker && markerData)
			{
				marker.addData(markerData);
			}
			var map = this.getProviderMap();
			marker.pinID = "ms7pin-" + new Date().getTime() + '-' + (Math.floor(Math.random() * Math.pow(2, 16)));// TODO
			// why
			// is
			// it
			// needed?
			var propMarker = marker.toProprietary();
			var len = map.entities.getLength();
			map.entities.push(propMarker);

			// If this is a multi marker, we need to reorder the list of entities in order to show multi markers on top of all 
			// the other markers displayed in the same position.
			if (markerData.isMultiMarker == true)
			{
				propMarker.isMultiMarker = true;
				for (var i = 0; i < len; i++)
				{
					var pushpin = map.entities.get(i);
					if (pushpin instanceof Microsoft.Maps.Pushpin)
					{
						// If x/y coordinates for existing push pins are the same as the multi marker lat/lng
						// and the existing push pin is not a multi marker itself, then we remove it and push it to the end
						// of the list.
						if (pushpin.geometry.x == point.lng && pushpin.geometry.y == point.lat && !pushpin.isMultiMarker)
						{
							map.entities.removeAt(i);
							map.entities.push(pushpin);
						}
					}
				}
			}	

			// This line ensures that the "mxmapMarker" property is added to the marker
			// and it is required when displaying the map tip
			marker.setChild(propMarker);
		}
		return marker;

	},
	
	/**
	 * Remove the marker (Microsoft.Maps.Pushpin) from the map.
	 * 
	 * Not sure why but map.entities.remove doesn't work correctly. So we
	 * need to iterate over all entities in order to remove them correctly.
	 */
	removeProviderMarker: function(marker)
	{
		var map = this.getProviderMap();
		marker.closeBubble();
		var msPushPin = marker.proprietary_marker;

		var ppIndex = map.entities.indexOf(msPushPin);
		var found = false;
		for ( var i = 0; i < map.entities.getLength(); i++)
		{

			var pushpin = map.entities.get(i);

			if (pushpin instanceof Microsoft.Maps.Pushpin)
			{
				if (msPushPin == pushpin)
				{
					var ii = map.entities.indexOf(pushpin);
					map.entities.removeAt(i);
					found = true;
					break;
				}

			}
		}
		try
		{
			map.entities.remove(msPushPin);

		}
		catch (e)
		{
			console.warn("failed to remove pushpin", e);
		}
		return;

	},

	/**
	 * Not supported.
	 */
	declutterMarkers: function(opts)
	{
		throw 'Not supported';
	},
	
	polyline: function(params)
	{
		return new ibm.tivoli.fwm.mxmap.impl.polyline.BingPolyline(params);
	},


	/**
	 * Add polyline (Microsoft.Map.Polyline) to the map.
	 */
	createProviderPolyline: function(polyline, polylineData)
	{
		var propPolyline = null;
		if(polyline)
		{
			if(polyline.points)
			{
				if(polylineData)
				{
					polyline.addData(polylineData);
				}
				
				var map = this.getProviderMap();
				propPolyline = polyline.toProprietary();
				map.entities.push(propPolyline);
			}
		}
		return propPolyline;

	},

	/**
	 * Remove polyline (Microsoft.Map.Polyline) from the map.
	 */
	removeProviderPolyline: function(polyline)
	{
		var map = this.getProviderMap();
		map.entities.remove(polyline.proprietary_polyline);
	},

	/**
	 * Returns center point of the map.
	 */
	getCenter: function()
	{
		var map = this.getProviderMap();
		var pt = map.getCenter();
		return this.latLng(pt.latitude, pt.longitude);
	},

	/**
	 * Set center point in the map.
	 */
	setCenter: function(point, options)
	{
		// var options ={zoom: nZoom, center:
		// nPoint.toProprietary(this.api)};
		var map = this.getProviderMap();
		this.setCenterAndZoom(point, map.getZoom());

		// var pt = point.toProprietary(this.api);
		// var options = map.getOptions();
		// options.center = pt;
		// map.setView(options);
	},

	/**
	 * Set zoom level in the map.
	 */
	setZoom: function(zoom)
	{
		var map = this.getProviderMap();
		var options = {};
		options.zoom = zoom;
		map.setView(options);
	},

	/**
	 * Returns zoom level of the map.
	 */
	getZoom: function()
	{
		var map = this.getProviderMap();
		return map.getZoom();
	},

	/**
	 * Returns the zoom level of specific rectangle.
	 */
	getZoomLevelForBoundingBox: function(bbox)
	{
		var map = this.getProviderMap();			
		var se = bbox.getSoutheast().toProprietary();
		var nw = bbox.getNorthwest().toProprietary();
		var latLongBounds = Microsoft.Maps.LocationRect.fromCorners(se, nw);
		map.setView({
			bounds: latLongBounds
		});
		return map.getZoom();
	},

	/**
	 * Set the map type according to Microsoft.Maps.MapTypeId enumeration.
	 */
	setMapType: function(type)
	{
		var map = this.getProviderMap();
		switch (type)
		{
			case this.MapType.ROAD:
				map.setMapType(Microsoft.Maps.MapTypeId.road);
				break;
			case this.MapType.SATELLITE:
				map.setMapType(Microsoft.Maps.MapTypeId.aerial);
				break;
			case this.MapType.HYBRID:
				map.setMapType(Microsoft.Maps.MapTypeId.birdseye);
				break;
			default:
				map.setMapType(Microsoft.Maps.MapTypeId.road);
		}
	},

	/**
	 * Returns the map type according to Microsoft.Maps.MapTypeId
	 * enumeration.
	 */
	getMapType: function()
	{
		var map = this.getProviderMap();
		var mode = map.GetMapStyle();
		switch (mode)
		{
			case Microsoft.Maps.MapTypeId.aerial:
				return MapType.SATELLITE;
			case Microsoft.Maps.MapTypeId.road:
				return MapType.ROAD;
			case Microsoft.Maps.MapTypeId.birdseye:
				return MapType.HYBRID;
			default:
				return null;
		}
	},

	getBoundingBox: function(swLat, swLng, neLat, neLng)
	{
		return new ibm.tivoli.fwm.mxmap.impl.boundingbox.BingBoundingBox(swLat, swLng, neLat, neLng);
	},


	/**
	 * Returns the rectancgle of current view.
	 */
	getBounds: function()
	{
		var map = this.getProviderMap();
		var view = map.getBounds();
		var bottomright = view.getSoutheast();
		var topleft = view.getNorthwest();
		
		return this.getBoundingBox(bottomright.latitude,topleft.longitude, topleft.latitude,  bottomright.longitude);
	},

	/**
	 * Set the rectangle of current view.
	 */
	setBounds: function(bounds)
	{
		var map = this.getProviderMap();
		var ne = bounds.getNorthEast();
		var sw = bounds.getSouthWest();
		var nw = new Microsoft.Maps.Location(ne.lat, sw.lon);
		var se = new Microsoft.Maps.Location(sw.lat, ne.lon);
		var rec = Microsoft.Maps.LocationRect.fromCorners(nw, se);

		var vopt = map.getOptions();

		// Set the zoom level of the map
		vopt.bounds = rec;
		map.setView(vopt);

	},

	/**
	 * TODO update comment. check if it is possible to overlay image on map
	 */
	addImageOverlay: function(id, src, nOpacity, west, south, east, north, oContext)
	{
		var map = this.getProviderMap();
		// TODO Rafael, n�o consegu� entender como usar as cordenadas para
		// image overlay, as options do bing n�o possuem propriedades para
		// coordeanadas.
		// var imageBounds =
		// Microsoft.Maps.LocationRect.fromEdges(north,west,south,east)
		var tileSource = new Microsoft.Maps.TileSource({
			uriConstructor: src
		});
		var tileLayer = new Microsoft.Maps.TileLayer({
			mercator: tileSource,
			opacity: nOpacity,
			visible: true
		});
		map.entities.push(tileLayer);
	},

	/*
	 * TODO to be investigated
	 */
	setImagePosition: function(id, oContext)
	{
		var map = this.getProviderMap();
		var topLeftPoint;
		var bottomRightPoint;
		throw "not implemented";
	},

	/*
	 * TODO to be investigated
	 */
	addOverlay: function(url, autoCenterAndZoom)
	{
		var map = this.getProviderMap();;
		// Create the tile layer source
		var tileSource = new Microsoft.Maps.TileSource({
			uriConstructor: url
		});

		// Construct the layer using the tile source
		var tilelayer = new Microsoft.Maps.TileLayer({
			mercator: tileSource
		});

		// Push the tile layer to the map
		map.entities.push(tilelayer);

	},

	/*
	 * TODO to be investigated
	 */
	addTileLayer: function(tile_url, opacity, copyright_text, min_zoom, max_zoom)
	{
		var map = this.getProviderMap();;
		// Create the tile layer source
		var tileSource = new Microsoft.Maps.TileSource({
			uriConstructor: tile_url
		});

		// Construct the layer using the tile source
		var tilelayer = new Microsoft.Maps.TileLayer({
			mercator: tileSource,
			opacity: opacity,
			visible: true
		});

		// Push the tile layer to the map
		map.entities.push(tilelayer);
	},

	/*
	 * TODO to be implemented.
	 */
	toggleTileLayer: function(tile_url)
	{
		throw 'Not implemented';
	},

	trafficLayer: null,

	setShowTraffic: function(state)
	{
		var map = this.getProviderMap();
		if (state == true)
		{
			if (this.trafficLayer != null)
			{
				this.trafficLayer.show();
			}
			else
			{

				var me = this;
				var enableTraffic = function()
				{
					me.trafficManager = new Microsoft.Maps.Traffic.TrafficManager(map);
					if (me.trafficLayer != null)
					{
						me.trafficLayer.show();
					}
				};
				if (!Microsoft.Maps.Traffic)
				{
					Microsoft.Maps.loadModule('Microsoft.Maps.Traffic', {
						callback: enableTraffic
					});
				}
				else
				{
					enableTraffic();
				}

			}
		}
		else
		{
			if (this.trafficLayer != null)
			{
				this.trafficLayer.hide();
			}
		}
	},

	/*
	 * TODO to be investigated.
	 */
	getPixelRatio: function()
	{
		throw 'Not implemented';
	},

	/**
	 * Returns the mouse position based on an element. The 'mousemove' event
	 * listener has been registered to get the current mouse point.
	 */
	mousePosition: function(element)
	{
		var locDisp = document.getElementById(element);
		if (locDisp !== null)
		{
			var map = this.getProviderMap();
			Microsoft.Maps.Events.addHandler(map, 'mousemove', function(eventArgs)
			{
				var point = new Microsoft.Maps.Point(eventArgs.pageX, eventArgs.pageY);
				var _location = map.tryPixelToLocation(point);
				var loc = _location.latitude.toFixed(4) + " / " + _location.longitude.toFixed(4);
				locDisp.textContent = loc;
			});
			locDisp.textContent = "0.0000 / 0.0000";
		}
	},
	
	latLng: function(lat, lng, sr)
	{
		var params = {lat: lat, lng: lng, sr: sr};
		return new ibm.tivoli.fwm.mxmap.impl.point.BingLatLonPoint(params);
	},
	providerGeocode: function(callback, errorCallback, key, address)
	{
		var geocoder = new ibm.tivoli.fwm.mxmap.impl.geocoder.BingGeocoder(callback, errorCallback,
		{
			key : key,
			map : this,
			customParams : this.getGeoCoderConf() 
		});
		geocoder.geocode({
			address : address
		});
	},
	providerReverseGeocode: function(callback, errorCallback, key, lat, lng)
	{
		var geocoder = new ibm.tivoli.fwm.mxmap.impl.geocoder.BingGeocoder(callback, errorCallback,
		{
			key : key,
			map : this,
			customParams : this.getGeoCoderConf() 
		});
		geocoder.geocode({
			lat : lat,
			lng : lng
		});
	},
	/**
	 * Returns the geocode configuration url
	 */
	getGeoCoderConf: function()
	{
		var options = {
			url: this.mapConf.geocode
		};
		return options;
	}
});

});

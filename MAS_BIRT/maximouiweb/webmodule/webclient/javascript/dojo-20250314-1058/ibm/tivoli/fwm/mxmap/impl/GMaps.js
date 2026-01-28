// wrapped by build app
define("ibm/tivoli/fwm/mxmap/impl/GMaps", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/Map,ibm/tivoli/fwm/mxmap/impl/marker/GmapsMarker,ibm/tivoli/fwm/mxmap/impl/point/GmapsLatLonPoint,ibm/tivoli/fwm/mxmap/impl/polyline/GmapsPolyline,ibm/tivoli/fwm/mxmap/impl/boundingbox/GmapsBoundingBox,ibm/tivoli/fwm/mxmap/impl/geocoder/GmapsGeocoder"], function(dijit,dojo,dojox){
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

dojo.provide("ibm.tivoli.fwm.mxmap.impl.GMaps");
dojo.require("ibm.tivoli.fwm.mxmap.Map");
dojo.require("ibm.tivoli.fwm.mxmap.impl.marker.GmapsMarker");
dojo.require("ibm.tivoli.fwm.mxmap.impl.point.GmapsLatLonPoint");
dojo.require("ibm.tivoli.fwm.mxmap.impl.polyline.GmapsPolyline");
dojo.require("ibm.tivoli.fwm.mxmap.impl.boundingbox.GmapsBoundingBox");
dojo.require("ibm.tivoli.fwm.mxmap.impl.geocoder.GmapsGeocoder");

dojo.declare("ibm.tivoli.fwm.mxmap.impl.GMaps", ibm.tivoli.fwm.mxmap.Map, {
	
	constructor : function(options) {
		this.providerName="googlev3";
		// This zoom is used only when trying to setCenter before setting a zoom level
		this._defaultZoom = 10;
	},
	_getCustomInitOptions:function(){
		
		if(this.customInitialMapOptions){
			return this.customInitialMapOptions.gmaps;
		}
		log.info("no custom configuration");
		return {};
	},
	_getInitOptions : function() {
		var options = {
			panControl : true,
			mapTypeControl : true,
			scaleControl : true,
			overviewMapControl : true,
			streetViewControl : true,
			scaleControlOptions : {
				style : google.maps.ScaleControlStyle.DEFAULT
			},
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};

		if (this.isMobile == true) {
			options.panControl = false; //does not work and looks bad on native android browser
			options.overviewMapControl = false;
			options.scaleControl = false; //looks bad on native android browser and takes space from map
		}

		return options;
	},
	
	_init:function(element, options)
	{
		this.element = element;

		if (options.zoom)
		{
			options.navigationControl = true;
			if (options.zoom == 'small')
			{
				options.navigationControlOptions = {
					style: google.maps.NavigationControlStyle.SMALL
				};
			}
			if (options.zoom == 'large')
			{
				options.navigationControlOptions = {
					style: google.maps.NavigationControlStyle.ZOOM_PAN
				};
			}
			delete options.zoom;
		}
		if (options.map_type)
		{
			options.mapTypeControl = true;
			options.mapTypeControlOptions = {
				style: google.maps.MapTypeControlStyle.DEFAULT
			};
			delete options.map_type;
		}
		
		var map = new google.maps.Map(element, options);
		
		var fireOnNextIdle = [];
		
		var me = this;
		/**
		 * This event is fired after a zoom or pan operation ands, so
		 * it's necessary to handle those events.
		 */
		google.maps.event.addListener(map, 'idle', function()
		{
			var fireListCount = fireOnNextIdle.length;
			if (fireListCount > 0)
			{
				var fireList = fireOnNextIdle.splice(0, fireListCount);
				var handler;
				while ((handler = fireList.shift()))
				{
					handler();
				}
			}
		});
		google.maps.event.addListener(map, 'rightclick', function(location)
		{
			me.fireMapEvent(me.Events.rightclick, {
				'location': me.latLng(location.latLng.lat(), location.latLng.lng()),
				'pixel': location.pixel,
				'point': location.point
			});
		});
		// deal with click
		google.maps.event.addListener(map, 'click', function(location)
		{
			me.fireMapEvent(me.Events.click, {
				'location': me.latLng(location.latLng.lat(), location.latLng.lng())
			});
		});

		// deal with zoom change
		google.maps.event.addListener(map, 'zoom_changed', function()
		{
			// zoom_changed fires before the
			// zooming has finished so we
			// wait for the next idle event
			// before firing our changezoom
			// so that method calls report the
			// correct values
			fireOnNextIdle.push(function()
			{
				me.fireMapEvent(me.Events.changeZoom);
			});
		});

		// deal with map movement
		google.maps.event.addListener(map, 'center_changed', function()
		{
			// TODO: Understand what the line below does
			//me.moveendHandler(me);
			me.fireMapEvent(me.Events.endPan);
		});

		// deal with initial tile loading
		var loadListener = google.maps.event.addListener(map, 'tilesloaded', function()
		{
			me.fireMapEvent(me.Events.load);

			// Some elements might be added on map
			// Configure their positions
			me.mapZIndexHandler.configureMapElements();
			
			google.maps.event.removeListener(loadListener);
		});


		map.LabelMarkerOverlay = function LabelMarkerOverlay(labelText, latLong, _map, marker, icon, iconAnchor, iconSize)
		{
			this.labelText = ((labelText != null) ? labelText : "");
			this.labelLatLong = latLong;
			this.labelDiv = null;
			this.icon = icon;
			this.iconAnchor = iconAnchor;
			this.iconSize = iconSize;

			this.marker = marker;
			this.setMap(_map);

			var me = this;
			google.maps.event.addListener(this.marker, "zindex_changed", function()
			{
				me.setZIndex();
			});
		};
		map.LabelMarkerOverlay.prototype = new google.maps.OverlayView();
		map.LabelMarkerOverlay.prototype.onAdd = function()
		{
			var div = document.createElement('div');
			div.style.position = "absolute";

			var ax = (this.iconAnchor && this.iconAnchor[0]) ? this.iconAnchor[0] : 0; // anchor
			// x
			var ay = (this.iconAnchor && this.iconAnchor[1]) ? this.iconAnchor[1] : 0; // anchor
			// y
			var img = document.createElement("img");
			img.style.position = "absolute";
			img.style.left = "-22px";// ax + 'px';
			img.style.top = "-10px";// ay + 'px';
			if (dojo.isIE)
			{
				img.style.left = "-19px";// ax + 'px';
				img.style.top = "-9px";// ay + 'px';
			}
			img.style.width = this.iconSize[0] + "px";
			img.style.zIndex = "0";
			img.src = this.icon;
			div.appendChild(img);

			var textDiv = document.createElement('div');
			textDiv.style.position = "absolute";
			textDiv.style.left = '-20px';
			if (dojo.isIE)
			{
				textDiv.style.left = "-19px";// ax + 'px';
			}
			
			textDiv.style.top = '0px';
			textDiv.style.width = this.iconSize[0] + 'px';
			textDiv.style.zIndex = "1";
			textDiv.style.color = "white";
			textDiv.style.fontSize = "12px";
			textDiv.style.textAlign = "center";
			textDiv.style.className = "fwmMarkerLabelGoogle";
			div.appendChild(textDiv);
			var txt = document.createTextNode(this.labelText);
			textDiv.appendChild(txt);

			this.labelDiv = div;

			this.getPanes().overlayImage.appendChild(div);
		};
		map.LabelMarkerOverlay.prototype.draw = function()
		{
			var sw = this.getProjection().fromLatLngToDivPixel(this.labelLatLong);

			var div = this.labelDiv;
			// FIXME Ideally we shouldn't have hard-coded offsets...
			div.style.left = (sw.x - 3) + 'px';
			div.style.top = (sw.y - 27) + 'px';
			div.style.width = this.iconSize[0] + "px";

			this.setZIndex();
		};
		map.LabelMarkerOverlay.prototype.setZIndex = function()
		{
			if (typeof this.marker.getZIndex() === "undefined")
			{
				this.labelDiv.style.zIndex = parseInt(this.labelDiv.style.top, 10) + 1;
			}
			else
			{
				this.labelDiv.style.zIndex = this.marker.getZIndex() + 1;
			}
		};
		map.LabelMarkerOverlay.prototype.onRemove = function()
		{
			if (this.labelDiv && this.labelDiv.parentNode)
			{
				this.labelDiv.parentNode.removeChild(this.labelDiv);
				this.labelDiv = null;
			}
		};
		
		this.map = map;
		this.loaded = true;
	},
	destroyMap: function(){},
	
	getMapType: function()
	{
		var type = this.getProviderMap().getMapTypeId();
		switch (type)
		{
			case google.maps.MapTypeId.ROADMAP:
				return MapType.ROAD;
			case google.maps.MapTypeId.SATELLITE:
				return MapType.SATELLITE;
			case google.maps.MapTypeId.HYBRID:
				return MapType.HYBRID;
			case google.maps.MapTypeId.TERRAIN:
				return MapType.PHYSICAL;
			default:
				return null;
		}
	},
	setMapType: function(type)
	{
		switch (type)
		{
			case this.MapType.ROAD:
				this.getProviderMap().setMapTypeId(google.maps.MapTypeId.ROADMAP);
				break;
			case this.MapType.SATELLITE:
				this.getProviderMap().setMapTypeId(google.maps.MapTypeId.SATELLITE);
				break;
			case this.MapType.HYBRID:
				this.getProviderMap().setMapTypeId(google.maps.MapTypeId.HYBRID);
				break;
			case this.MapType.PHYSICAL:
				this.getProviderMap().setMapTypeId(google.maps.MapTypeId.TERRAIN);
				break;
			default:
				this.getProviderMap().setMapTypeId(google.maps.MapTypeId.ROADMAP);
		}
	},

	getCenter:function()
	{
		var pt = this.getProviderMap().getCenter();
		return this.latLng(pt.lat(), pt.lng());
	},
	setCenter: function(point, options)
	{
		this.getProviderMap().setCenter(this.pointToProprietary(point));
		if(this.getZoom() == undefined)
		{
			// If there is no zoom set yet, use a default one, otherwise the map won't show up
			this.setZoom(this._defaultZoom);
		}
	},
	
	getZoom: function()
	{
		return this.getProviderMap().getZoom();
	},
	setZoom: function(zoom)
	{
		this.getProviderMap().setZoom(zoom);
	},
	
	getBoundingBox: function(swLat, swLng, neLat, neLng)
	{
		return new ibm.tivoli.fwm.mxmap.impl.boundingbox.GmapsBoundingBox(swLat, swLng, neLat, neLng);
	},


	getBounds: function()
	{
		var bounds = this.getProviderMap().getBounds();

		var sw = bounds.getSouthWest();
		var ne = bounds.getNorthEast();
		
		var swLatLng = {lat: sw.lat(), lng: sw.lng(), lon: sw.lng()};
		var neLatLng = {lat: ne.lat(), lng: ne.lng(), lon: ne.lng()};

		return this.getBoundingBoxFromSwAndNe(swLatLng, neLatLng);
	},
	setBounds: function(bounds)
	{
		if(bounds)
		{
			var sw = new google.maps.LatLng(bounds.sw.lat, bounds.sw.lng);
			var ne = new google.maps.LatLng(bounds.ne.lat, bounds.ne.lng);
			var gBounds = new google.maps.LatLngBounds(sw, ne);
			this.getProviderMap().fitBounds(gBounds);
		}
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

	resizeTo: function(width, height)
	{
		var mapCtrl = dojo.byId( this.divId );
		var height = mapCtrl.offsetHeight;
		dojo.style( this.divId , {"height": height-1+"px"});
		
		this.getElement().style.width = width;
		this.getElement().style.height = height;
		google.maps.event.trigger(this.getProviderMap(), 'resize');
	},
	
	createProviderMarker: function(point, markerData)
	{
		var marker = null;
		if(point)
		{
			var params = {point: point, map: this.getProviderMap(), compId: this.compId};
			var marker = new ibm.tivoli.fwm.mxmap.impl.marker.GmapsMarker(params);
			if(marker && markerData)
			{
				marker.addData(markerData);
			}
			var propMarker = marker.toProprietary();
			// This line ensures that the "mxmapMarker" property is added to the marker
			// and it is required when displaying the map tip
			marker.setChild(propMarker);
		}
		return marker;
	},
	removeProviderMarker: function(marker)
	{
		marker.closeBubble();
		marker.remove();
	},
	
	polyline: function(params)
	{
		return new ibm.tivoli.fwm.mxmap.impl.polyline.GmapsPolyline(params);
	},
	
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
				
				propPolyline = polyline.toProprietary();
				propPolyline.setMap(this.getProviderMap());
			}
		}
		return propPolyline;
	},

	
	removeProviderPolyline: function(polyline)
	{
		polyline.proprietary_polyline.setMap(null);
	},
	
	/* enables or disables the traffic layer */
	trafficLayer: null,
	setShowTraffic: function(state)
	{
		var map = this.getProviderMap();
		if (state == true)
		{
			if (this.trafficLayer == null)
			{
				this.trafficLayer = new google.maps.TrafficLayer();
				this.trafficLayer.setMap(map);
			}
		}
		else
		{
			if (this.trafficLayer != null)
			{
				this.trafficLayer.setMap(null);
				this.trafficLayer = null;
			}
		}
	},
	
	pointToProprietary: function(point)
	{
		return new google.maps.LatLng(point.lat, point.lng);
	},

	pointFromProprietary: function(point)
	{
		if(!point)
		{
			return null;
		}
		return this.latLng(point.lat(), point.lng(), null);
	},
	latLng: function(lat, lng, sr)
	{
		var params = {lat: lat, lng: lng, sr: sr};
		return new ibm.tivoli.fwm.mxmap.impl.point.GmapsLatLonPoint(params);
	},
	
	providerGeocode: function(callback, errorCallback, key, address)
	{
		var geocoder = new ibm.tivoli.fwm.mxmap.impl.geocoder.GmapsGeocoder(callback, errorCallback,
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
		var geocoder = new ibm.tivoli.fwm.mxmap.impl.geocoder.GmapsGeocoder(callback, errorCallback,
		{
			key : key,
			map : this,
			customParams : this.getGeoCoderConf() 
		});
		geocoder.geocode({
			lat : lat,
			lng : lng
		});
	}
});

});

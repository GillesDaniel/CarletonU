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

define("ibm/tivoli/fwm/mxmap/CurrentMXRecManager", ["dojo/main", "dojo/_base/declare",
	"ibm/tivoli/fwm/mxmap/MXRecord",
	"ibm/tivoli/fwm/mxmap/_Base",
	"ibm/tivoli/fwm/mxmap/ImageLibraryManager"],
	function(dojo, declare, MXRecord, _Base, ImageLibraryManager) {

	return declare([MXRecord], {

		map: null,
		currentMarker: null,
		markerImgUrl: null,
		recordSet: null,
		currentFromRecSet: false,
		mbo: null,
		mboInfo: null,
		draggable: true,
		constructor: function(options)
		{
			dojo.mixin(this, options);
			if (!this.markerImgUrl)
			{
				this.markerImgUrl = ImageLibraryManager.getImageLibraryManager().getDefaultMarkerImageInfo().getImageURL();
			}
			this.addSubscription("onCurrentRecordUpdate_" + this.map.getId(), dojo.hitch(this, this.serverUpdated));
			this.recordSet = this.map.getCurrentRecordSetControl();
			this.mboInfo = options.mbo;
		},
		disposeMarker: function()
		{
			this._removeMarker();
			// remove current marker listener, return it to rec set if needed
			// if (this.currentFromRecSet == true)
			// {
			// this.recordSet.updateMXRecord(this.mboInfo.mxdata.uid,
			// this.mboInfo.mxdata, this.mboInfo.gisdata);
			// this.recordSet.showMXRecord(this.mboInfo.mxdata.uid);
			//
			// }
		},
		showCurrentRecord: function(noZoom)
		{
			if (this.mbo)
			{
				this.serverUpdated(this.mbo, noZoom);
			}
		},
		/**
		 * Triggered always that any new data from server is received. It will
		 * update the current representation of the current record on the map.
		 */
		serverUpdated: function(data, noZoom)
		{

			console.log("[CurrentMXRecManager] Server Updated with data", data);

			if (this.mboInfo && this.mboInfo.mxdata)
			{

				console.log("[CurrentMXRecManager] Trying to dispose current marker", this.mboInfo.mxdata);

				if (this.mboInfo.mxdata.uid.name != data.mxdata.uid.name || this.mboInfo.mxdata.uid.value != data.mxdata.uid.value)
				{
					this.disposeMarker();
					this.isMboOnMap = false;
				}
			}

			this.currentFromRecSet = false;
			if (this.mboInfo.highlightGraphic) {
				data.highlightGraphic = this.mboInfo.highlightGraphic;
			}
			this.mboInfo = data;
			this.mbo = data;
			this._updateMarkerLocation(data, noZoom);

		},

		/**
		 * Places a marker for the current record. Also adds a handler for dragging
		 * event of this marker.
		 */
		_placeMarker: function()
		{
			var that = this;
			var convertedPoint;

			if (this.map.mapConf.provider == 'spatial') {
				if (this.mboInfo.gisdata.isCoordLatLong && this.map.map.spatialReference.wkid != "4326") {
					var inputPoint = new esri.geometry.Point(that.mboInfo.gisdata.lng, that.mboInfo.gisdata.lat, new esri.SpatialReference({wkid: 4326}));
					convertedPoint = esri.geometry.project(inputPoint, this.map.map.spatialReference);

					that.mboInfo.gisdata.lng = convertedPoint.x;
					that.mboInfo.gisdata.lat = convertedPoint.y;
					that.mboInfo.gisdata.isCoordLatLong = false;
					that.mboInfo.gisdata.convertedFromLatLong = true;
				}
			}		

			var markerOptions = {
					"events": {
						"onMoveEnd": dojo.hitch(that, that.movedMarker)
					},
					"enableMapTips": true,
					"dontDrawAsOverlay": true
			};
			that.map.addMboToLayerManager(that.mboInfo, markerOptions);
			that.isMboOnMap = true;

		},

		/**
		 * Updates the current marker based on the new location data. It also
		 * publishes the event that the current record location has been updated
		 * thru 'onCurrentLocationUpdated' event
		 */
		_updateMarkerLocation: function(newMboInfo, noZoom)
		{
			this.inherited(arguments);
			dojo.publish("onCurrentLocationUpdated_" + this.map.getId());
			// if (noZoom != true)
			// {
			// this.center();
			// }
		},

		/**
		 * Returns a simple map tip for the current record TBD
		 */
		/*
		 * getMapTipData: function(mxdata) { var textBubble = mxdata.mboName + "\n" +
		 * mxdata.mboInfo.ADDRESSCODE + "\n" + mxdata.mboInfo.ORGID; return {
		 * infoBubble: textBubble, label: null,// nothing specified in spec. marker:
		 * 4, icon: this.markerImgUrl, iconSize: [ 32, 32 ], draggable:
		 * this._isDraggable(), hover: false }; },
		 */

		/**
		 * Triggered after the current record marker is moved. It then sends to the
		 * server the new record location
		 */
		movedMarker: function(event_args)
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[CurrentMXRecManager] Marker moved", event_args.newLocation);
			}
			this.reverseGeocodeCurrentRecord(event_args.newLocation, false);
		},

		/**
		 * Set the current SA record location
		 * 
		 * @param {lat,lng,address}
		 */
		setServersCurrentRecordLocation: function(newGISlocation)
		{
			this.map.getMaximo().setCurrentRecordLocation(newGISlocation);
		},

		/**
		 * Reverse geocode the current record.
		 * 
		 * @param newGISlocation -
		 *            Opcional, only if want to use a different position than the
		 *            current marker one.
		 */
		reverseGeocodeCurrentRecord: function(newGISlocation, addressOnly)
		{
			if (!newGISlocation)
			{
				if (dojo.config.fwm.debug == true)
				{
					console.log("[CurrentMXRecManager] New Location has no GIS Data - Using current location");
				}
				newGISlocation = this.currentMarker.location;
			}
			var fctError = function(error)
			{
				this.reverseGeocodeCallbackError(error, newGISlocation, addressOnly);
			};
			var fctSuccess = function(revData)
			{
				this.reverseGeocodeCallback(revData, newGISlocation);
			};

			this.map.geocoder.reverseGeocode(newGISlocation.lat, newGISlocation.lng, dojo.hitch(this, fctSuccess), dojo.hitch(this, fctError));
		},
		reverseGeocodeAddressOnly: function()
		{
			this.reverseGeocodeCurrentRecord(null, true);
		},
		/**
		 * In case it fails to find an address based on the coordinates only the
		 * coordinates are set. If the coordinates has not changed nothing is
		 * updated on the server.
		 * 
		 * @param error -
		 *            error code
		 * @see ibm.tivoli.fwm.mxmap.Geocoder.ErrorCodes
		 * @param point -
		 *            from this reverse geocode was executed
		 */
		reverseGeocodeCallbackError: function(error, point, addressOnly)
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[CurrentMXRecManager] Error during reverse geocoding for current record", error);
			}
			if (addressOnly && addressOnly == true)
			{
				// only address is needed. no x/y needed.
				if (dojo.config.fwm.debug == true)
				{
					console.log("[CurrentMXRecManager] No address found");
				}
				this.map.getMaximo().showMessage("mapserver", "auto_revgeocode_noresults");
				return;
			}
			else
			{
				if (!this.currentMaker || point.lat != this.currentMarker.location.lat || point.lng != this.currentMarker.location.lng)
				{
					if (dojo.config.fwm.debug == true)
					{
						console.log("[CurrentMXRecManager] Coordinates changed, setting value on server", point);
					}
					if (point.lat && point.lng)
					{
						this.map.getMaximo().setCurrentRecordLocation({
							lat: point.lat,
							lng: point.lng
						}, "FAILED_REV_GEOCODE");
					}
				}
			}
		},

		/**
		 * An address was during reverse geocoding. Only its address is set into the
		 * SA record. The coordinates are the same of the marker.
		 * 
		 * @param location -
		 *            usually where marker was dropped
		 * @param originalLocation -
		 *            from where it was moved
		 */
		reverseGeocodeCallback: function(location, originalLocation)
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[CurrentMXRecManager] Processing reverseGeocodeCallback: ", location);
			}
			var point = originalLocation;

			if (this.map.mapConf.provider == 'spatial') {
				if ((this.mboInfo.gisdata.isCoordLatLong || this.mboInfo.gisdata.convertedFromLatLong) && this.map.map.spatialReference.wkid != "4326") {
					var inputPoint = new esri.geometry.Point(point.lng, point.lat, this.map.map.spatialReference);
					convertedPoint = esri.geometry.project(inputPoint, new esri.SpatialReference({wkid: 4326}) );
					point.lng = convertedPoint.x;
					point.lat = convertedPoint.y;
				}
			}		


			// gets the address of the first record as
			// we are working with x/y coordinates
			var address = location[0].formattedAddress;
			this.map.getMaximo().setCurrentRecordLocation({
				lat: point.lat,
				lng: point.lng,
				address: address
			});
		},

		convertFromLatLongToXY: function(lat, lon, callback) {

			if (this.map.mapConf.provider != 'spatial') {
				callback(lat, lon);
				return;
			}

			console.log("[CurrentMXRecManager] Provider is spatial, running convertFromLatLongToXY()");

			if (this.map.mapConf.geometryServiceUrl) {
				console.log("[CurrentMXRecManager] Geometry Service turned on");

				//var GS = new esri.tasks.GeometryService(this.map.mapConf.geometryServiceUrl);

				// LatLong Spatial Reference = 102100
				var SR = new esri.SpatialReference({
					wkid: 102100
				});			

				var p = new esri.geometry.Point(lon, lat, SR);
				console.log("[CurrentMXRecManager] Point Converted to SR 102100");
				console.log("[CurrentMXRecManager] Spatial Ref: "+this.map.map.spatialReference.wkid);
				console.log("[CurrentMXRecManager] Call back");
				callback(p.y, p.x);

			} else {
				console.log("[CurrentMXRecManager] Geometry Service URL is null, skipping convertFromLatLongToXY()");
				callback(lat, lon);
			}			
		}
	});
});

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

define("ibm/tivoli/fwm/mxmap/MXRecord", ["dojo/_base/declare",
	"ibm/tivoli/fwm/mxmap/_Base",
	"ibm/tivoli/fwm/mxmap/ImageLibraryManager"],
	function(declare, _Base, ImageLibraryManager) {
		
		var LATLONGWKID = 4326;

	return declare( [_Base], {

		mboInfo: null,
		map: null,

		markerImgUrl: null,
		markerImgInfo: null,
		lbsMarker: null,
		lbsMarkerImgInfo: null,
		lbsCircle: null,
		imageLibManager: null,
		isMboOnMap: false,
		constructor: function(options)
		{
			dojo.mixin(this, options);
			// this.imageLibManager =
				// ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager();
		},

		/**
		 * Checks if the currrent SA record has an address
		 * 
		 * @returns true if it has any address different than ""
		 */
		hasAddress: function()
		{
			return (this.mboInfo && this.mboInfo.gisdata && this.mboInfo.gisdata.address != null && this.mboInfo.gisdata.address != "");
		},
		getAddress: function()
		{
			return this.getGISData().address;
		},
		getMXData: function()
		{
			return this.mboInfo.mxdata;
		},
		getMboName: function()
		{
			return this.getMXData().mboName;
		},
		setIsOnMap: function(isOnMap)
		{
			this.mboInfo.isOnMap = isOnMap;
		},
		hasAutolocateAddress: function()
		{
			return (this.mboInfo && this.mboInfo.gisdata && this.mboInfo.gisdata.address != null && this.mboInfo.gisdata.address != "");
		},
		getAutolocateAddress: function()
		{
			return this.getAutolocateGISData().address;
		},
		hasGISData: function()
		{
			return (this.mboInfo && (this.mboInfo.gisdata != null) && (this.mboInfo.gisdata != undefined));
		},
		hasGISCoordinates: function()
		{
			return (this.hasGISData() && (this.mboInfo.gisdata.lat != null) && (this.mboInfo.gisdata.lng != null));
		},
		hasAutolocateData: function()
		{
			return (this.mboInfo && this.mboInfo.autolocate != null && this.mboInfo.autolocate.gisdata != null);
		},
		hasAutolocateGISCoordinates: function()
		{
			return (this.hasAutolocateData() && this.getAutolocateGISData().lng != null)
			|| this.hasAutolocateSpatialData();
		},
		hasAutolocateGISOnlyCoordinates: function()
		{
			return (this.hasAutolocateData() && this.mboInfo.autolocate.gisdata.lng != null);
		},
		hasAutolocateSpatialData: function()
		{
			return (this.hasAutolocateData() && this.mboInfo.autolocate.gisdata.PLUSSISGIS != null && this.mboInfo.autolocate.gisdata.PLUSSISGIS == true);
		},
		getAutolocateGISData: function()
		{
			return this.getAutolocateMboInfo().gisdata;
		},
		getAutolocateGISLat: function()
		{
			return this.getAutolocateGISData().lat;
		},
		getAutolocateGISLng: function()
		{
			return this.getAutolocateGISData().lng;
		},
		/*
		 * Returns the latLng point for the GIS data
		 * If the sr is null, it means it has the map Spatial Reference
	 	 */
		getAutolocateGISPoint: function()
		{
			var sr = this.areGISCoordinatesLatLong() ? {"wkid": LATLONGWKID} : null;
			return this.map.latLng(this.getAutolocateGISLat(), this.getAutolocateGISLng(), sr);
		},
		hasAnyGISCoordinates: function()
		{
			return this.hasGISCoordinates() || this.hasAutolocateGISCoordinates() || this.hasSPATIALCoordinates();
		},
		hasAnyCoordinates: function()
		{
			return this.useLBSData() || this.hasAnyGISCoordinates();
		},
		hasLBSData: function()
		{
			return (this.mboInfo && (this.mboInfo.lbsdata != null) && (this.mboInfo.lbsdata != undefined));
		},
		isLBS: function()
		{
			return (this.hasGISData() && (this.getGISData().islbs == true));
		},
		isLBSOnly: function()
		{
			return (this.hasLBSData() && (this.mboInfo.lbsdata.lbsonly == true));
		},
		hasLBSCoordinates: function()
		{
			return (this.hasLBSData() && (this.mboInfo.lbsdata.lat != null));
		},
		getLBSData: function()
		{
			return this.mboInfo.lbsdata;
		},
		getLBSLat: function()
		{
			return this.getLBSData().lat;
		},
		getLBSLng: function()
		{
			return this.getLBSData().lng;
		},
		getLBSPoint: function()
		{
			return this.map.latLng(this.getLBSLat(), this.getLBSLng());
		},
		hasOwnLatLngProperties: function()
		{
			return this.mboInfo.hasOwnProperty("lat") && this.mboInfo.hasOwnProperty("lng");
		},
		getOwnLat: function()
		{
			return this.mboInfo.lat;
		},
		getOwnLng: function()
		{
			return this.mboInfo.lng;
		},
		getOwnLatLng: function()
		{
			return this.map.latLng(this.getOwnLat(), this.getOwnLng());
		},
		hasMouseover: function()
		{
			return (this.getMboInfo().mouseover != null) && (this.getMboInfo() != undefined);
		},
		getMouseover: function()
		{
			return this.getMboInfo().mouseover;
		},
		setMarker: function(marker)
		{
			this.mboInfo.marker = marker;
		},
		useLBSData: function()
		{
			var useLBSData = false;

			if(this.isLBS())
			{
				if(this.isLBSOnly())
				{
					if(this.hasLBSCoordinates())
					{
						useLBSData = true;
					}
				}
				else
				{
					var layer = this.map.getLayersManager().getLayerForObjectName(this.getMboName());
					if(layer)
					{
						var lbsDataEnabledForLayer = layer.useLBSPosition();
						if(lbsDataEnabledForLayer)
						{
							if(this.hasLBSCoordinates())
							{
								useLBSData = lbsDataEnabledForLayer;
							}
							else
							{
								// If the flow has reached here, it means that this record is a 
								// CombinedLBS record (see CombinedLBS.java) that was supposed to be
								// displayed using its LBS coordinates but does not have any.
								// A warning msg should be added to this record so that it can be retrieved later
								// and sent to Maximo
								this.mboInfo.warning = ibm.tivoli.fwm.mxmap.WarningCodes.NO_LBS_LOCATION_FOUND;
							}
						}
					}
				}
			}
			return useLBSData;
		},

		hasSPATIALCoordinates: function()
		{
			return (this.hasGISData() && this.mboInfo.gisdata.PLUSSISGIS == true);
		},
		_removeHighlight: function() {
			console.log("[mxmap.MXRecord._removeHighlight] calling map.removeMboMarker " + this.mboInfo.mxdata.uid.value);
			this.map.removeMboHighligh(this.mboInfo);						
		},
		_removeMarker: function()
		{
			console.log("[mxmap.MXRecord._removeMarker] calling map.removeMboMarker " + this.mboInfo.mxdata.uid.value);
			this.map.removeMboMarker(this.mboInfo);
			this.isMboOnMap = false;
		},
		/**
		 * Triggered always that any new data from server is
		 * received. It will update the current representation of
		 * the current record on the map.
		 */
		serverUpdated: function(data)
		{
			console.log("MXRecord.serverUpdated ");
			this.mboInfo = data;
			this.isMboOnMap = false;
			this._updateMarkerLocation(data);
		},
		/**
		 * Updates the current marker based on the new location
		 * data. It also publishes the event that the current record
		 * location has been updated thru 'onCurrentLocationUpdated'
		 * event
		 */
		_updateMarkerLocation: function(newMboInfo, noZoom)
		{
			console.log("[MXrecord] Updating  Location ", newMboInfo);
			this._removeMarker();
			this._removeHighlight();
			this.mboInfo = newMboInfo;
			if (this.hasAnyCoordinates())
			{
				this._placeMarker();
				if (noZoom != true)
				{
					this.center();
				}
			}

		},

		/**
		 * Places a marker for the current record. Also adds a
		 * handler for dragging event of this marker.
		 */
		_placeMarker: function()
		{

			this.map.addMboToLayerManager(this.mboInfo);
			this.isMboOnMap = true;
		},

		/**
		 * Center the map over the current record
		 */
		center: function()
		{
			this.centerAndZoom();
		},

		/**
		 * Center the map over the current record and zoom.
		 * 
		 * @param zoom
		 *            level
		 */
		centerAndZoom: function(zoomLevel)
		{
			if (this.hasAnyCoordinates())
			{
				console.log("[MXRecord] About to center and zoom on record on marker");
				if (this.isMboOnMap == false)
				{
					this._placeMarker();
				}

				this.map.centerOnMbo(this.mboInfo, zoomLevel);

			}
		},
		getGISData: function()
		{
			return this.mboInfo.gisdata;
		},
		getGISLat: function()
		{
			return this.getGISData().lat;
		},
		getGISLng: function()
		{
			return this.getGISData().lng;
		},
		/*
		 * Returns the latLng point for the GIS data
		 * If the sr is null, it means it has the map Spatial Reference
	 	 */
		getGISPoint: function()
		{
			var sr = this.areGISCoordinatesLatLong() ? {"wkid": LATLONGWKID} : null;
			return this.map.latLng(this.getGISLat(), this.getGISLng(), sr);
		},
		getGISDataFlags: function()
		{
			return this.getGISData().flags;
		},
		areGISCoordinatesLatLong: function() {
			var latLongCoordinates = false;
			if (this.map.providerName == "maximospatial") {
				var gisData = this.getGISData();
				if (gisData && gisData.isCoordLatLong) {
					latLongCoordinates = true;
				}
			}
			return latLongCoordinates;
		},
		isGISDataReadOnly: function()
		{
			return (this.getGISDataFlags().readonly == true);
		},
		hasPointInCurrentSR: function()
		{
			return (this.mboInfo && (this.mboInfo.pointInCurrentSR != null) && (this.mboInfo.pointInCurrentSR != undefined))
		},
		getPointInCurrentSRLat: function()
		{
			return this.mboInfo.pointInCurrentSR.lat;
		},
		getPointInCurrentSRLng: function()
		{
			return this.mboInfo.pointInCurrentSR.lng;
		},
		getPointInCurrentSR: function()
		{
			return this.map.latLng(this.getPointInCurrentSRLat(), this.getPointInCurrentSRLng());
		},
		setPointInCurrentSR: function(point)
		{
			this.mboInfo.pointInCurrentSR = point;
		},
		getMboInfo: function()
		{
			return this.mboInfo;
		},
		getAutolocateMboInfo: function()
		{
			return this.mboInfo.autolocate;
		},
		/* 12-100070 */
		_isDraggable: function()
		{
			if (this.mboInfo.gisdata && this.mboInfo.gisdata.flags && this.mboInfo.gisdata.flags.readonly == true)
			{
				return false;
			}
			return (this.draggable && this.draggable == true);
		},
		hide: function()
		{
			console.log("[MXRecord] hiding marker", this);

		},
		remove: function()
		{
			this._removeMarker();
		},
		show: function()
		{
			if (this.isMboOnMap == false)
			{
				if (this.hasAnyCoordinates() == true)
				{
					this._placeMarker();

				}
			}
		},
		getWarning: function()
		{
			return this.mboInfo.warning;
		},
		getActivityId: function()
		{
			return this.mboInfo.activityid;
		},
		getMapTipOverrides: function()
		{
			return this.mboInfo.maptipoverrides;
		}
	});
});

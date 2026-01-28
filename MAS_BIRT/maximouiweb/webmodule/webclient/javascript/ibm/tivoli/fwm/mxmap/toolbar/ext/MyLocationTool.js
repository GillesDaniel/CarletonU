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



/**
 * My Location tool bar action.
 */

define(["dojo/_base/declare", "ibm/tivoli/fwm/mxmap/_Base", "ibm/tivoli/fwm/mxmap/toolbar/ext/_ToggleTool",
	"dijit/form/Button", "ibm/tivoli/fwm/mxmap/ImageLibraryManager",
	"ibm/tivoli/fwm/mxmap/geolocation/MyCurrentLocation", "ibm/tivoli/fwm/mxmap/Radius"], 
	function(declare, _Base, _ToggleTool, Button,  ImageLibraryManager, MyCurrentLocation, Radius) {

	ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus = {
			DISABLED: -1,
			MARKER_CENTERED: 0,
			MARKER_NOT_CENTERED: 1
	};


	return declare([_ToggleTool], {
		label: "My Location",
		iconClass: "basicMapToolbarBtn myLocationMapToolbarBtn",
		map: null,
		myLocationToolStatus: null,
		myLocationMarker: null,
		lbsCircle: null,
		imageLibManager: null,
		myCurrentLocationInstance: null,
		_executedAtLeastOnce: false,
		_onEndPanFct: null,
		_createOnEndPanFct: null,
		_setCenterTimer: null,
		_setCenterTimerInterval: 0,
		_setCenterPending: false,
		constructor: function(params)
		{
			dojo.mixin(this, params);
			var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "mylocationtool");

			this.resetMyLocationTool();

			this.label = _label || this.label;

			this.imageLibManager = ImageLibraryManager.getImageLibraryManager();
			this.myCurrentLocationInstance = MyCurrentLocation.getMyCurrentLocationInstance();

			// Create the reference for the handler functions here only once. Running dojo.hitch twice on the 
			// same function does not yield the exact same reference (i.e. checking for equality will fail)
			this._onEndPanFct = dojo.hitch(this,this.onEndPan);
			this._createOnEndPanFct = dojo.hitch(this,this.createOnEndPan);

			// When the tool is active and on MARKER_CENTERED status, the map will recenter
			// around the user location marker only once per this._setCenterTimerInterval seconds
			// regardless of the number of updates to the marker position
			this._setCenterTimerInterval = this.getSetCenterInterval();
		},

		disable: function()
		{
			// does nothing
		},
		destroy: function()
		{
			this.stopSetCenterControlTimer();
			this.resetMyLocationTool();
			this.destroyRecursive();
		},
		toggleStatus: function()
		{
			this.toggleMyLocationStatus();
		},
		/**
		 * Changes the status of the tool From DISABLED to MARKER_CENTERED, from
		 * MARKER_CENTERED to DISABLED and from MARKER_NOT_CENTERED to
		 * MARKER_CENTERED
		 */
		toggleMyLocationStatus: function()
		{
			switch (this.myLocationToolStatus)
			{
			case ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.DISABLED:
				// 12-13616. Moving this.setActive(true) here (before this.watchMyLocationMarkerPosition()), because
				// the latter can result in an error and, if so, the error callback will reset the button status to "off"
				this.setActive(true);
				this.myLocationToolStatus = ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_CENTERED;
				this.watchMyLocationMarkerPosition();
				// The tool is active, start the map recentering timer
				this.startSetCenterControlTimer();
				break;
			case ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_NOT_CENTERED:
				this.setActive(true);
				this.myLocationToolStatus = ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_CENTERED;
				// When the tool status change from MARKER_NOT_CENTERED to MARKER_CENTERED
				// for a recenter now.
				this.setCenterAndUpdateMarkerPosition({recenter: true});
				break;
			case ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_CENTERED:
				this.resetMyLocationTool();
				// Tool is not active, stop the map recentering timer
				this.stopSetCenterControlTimer();
				break;
			default:
				break;
			}
			;

		},
		/**
		 * Updates the My Location marker position according to the new current
		 * location If the current status is MARKER_CENTERED, forces the map to be
		 * centered around the marker
		 */
		setCenterAndUpdateMarkerPosition: function(params)
		{
			// This variable indicates whether or not the marker position is to be updated on the map.
			// It should be updated whenever this function is called as a callback from
			// the browsers geolocation API. However, then this function is called explicitly
			// by the map recentering timer or when the user changes the tool status from MARKER_NOT_CENTERED
			// to MARKER_CENTERED, then, only a map recentering is needed (and this variable will be false).
			var updateMarkerPosition = ((params == null) || (params == undefined) || (params.recenter == undefined) || (params.recenter != true)) ? true : false;
			// This cariable Indicates whether or not the map should be recentered around the marker.
			// Basically, only when setCenterAndUpdateMarkerPosition is called explicitly (i.e. when updateMarkerPosition is false).
			// There are 2 exceptions (for which this variable will be true):
			// 1. The this._setCenterTimerInterval is zero: because it means that there is no interval set, i.e. need to recenter the map whenever the marker location is updated.
			// 2. This is the first time that setCenterAndUpdateMarkerPosition is being called since the tool has been activated last.
			var recenterMap = ((this._setCenterTimerInterval == 0) || (this._executedAtLeastOnce == false) || (updateMarkerPosition == false)) ? true: false;

			this._executedAtLeastOnce = true;
			if (this.myLocationToolStatus != ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.DISABLED)
			{
				if (this.myCurrentLocationInstance)
				{
					if (this.myCurrentLocationInstance.getPosition() && this.myCurrentLocationInstance.getPosition().coords)
					{
						// Retrieve the properties related to My Location
						var coords = this.myCurrentLocationInstance.getPosition().coords;
						var lat = coords.latitude;
						var lng = coords.longitude;
						var accuracy = coords.accuracy;
						var latLonPoint = this.map.latLng(lat, lng);

						if(updateMarkerPosition == true)
						{
							// Remove existing My Location marker (if any)
							this.removeMyLocationMarker();

							// Add the My Location marker with accuracy circle
							this.createMyLocationMarker(latLonPoint, accuracy);

							this._setCenterPending = true;
						}

						if(recenterMap == true)
						{
							this._setCenterPending = false;
							// Move map around the marker only if the marker was already
							// centered
							if (this.myLocationToolStatus == ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_CENTERED)
							{
								// TODO: The event handler calls have been commented out because of a javascript error (_4bc.remove is not a function). Investigate that!
								this.map.removeMapEventHandler(this.map.Events.endPan, this._onEndPanFct);
								this.map.addMapEventHandler(this.map.Events.endPan, this._createOnEndPanFct);
								this._center(latLonPoint);						
							}
						}
					}
				}
			}
		},	
		/**
		 * Changes the position of the marker on the map. This method must be called
		 * when the status changes from DISABLED to MARKER_CENTERED.
		 */
		_handler: null,
		watchMyLocationMarkerPosition: function()
		{
			if (this.myCurrentLocationInstance)
			{
				// The method this.setCenterAndUpdateMarkerPosition must be called
				// whenever the user's current position changes.
				// 12-13674. We need to create the listener prior to calling watchUserLocation on myCurrentLocationInstance
				// because some errors may happen synchronously. When an error happens during the listenToUserLocation() call,
				// the error callback is executed before the handler is returned, so the myCurrentLocationInstance.removeListeners
				// tries to remove the listener using a handler that does not exist yet.
				this._handler = this.myCurrentLocationInstance.createListener(dojo.hitch(this, this.setCenterAndUpdateMarkerPosition), dojo.hitch(this, this.failedToGetLocation));
				this.myCurrentLocationInstance.listenToUserLocation(this._handler);
			}
		},
		/**
		 * Creates the My Location marker according to the specifications (blue dot
		 * with a blue hollow accuracy circle around it)
		 */
		convertedPoints:{},
		createMyLocationMarker: function(latLonPoint, accuracy)
		{

			var succFct = function(points)
			{
				var p = points[0];
				this.convertedPoints[latLonPoint]=p;
				var markerData = this.imageLibManager.getMyLocationMarkerImageInfo().generateMarkerData("");
				this.createAccuracyCircle(p, accuracy);
				this.myLocationMarker = this.map.addMarker(p, markerData);
			};
			var errFct = function(error)
			{
				console.error("error", error);
			};
			this.map.getAllPointsFromWGS84([ latLonPoint ], dojo.hitch(this, succFct), dojo.hitch(this, errFct));


		},
		_center:function(latLonPoint){
			var succFct = function(points)
			{
				var p = points[0];
				this.map.setCenter(p);
			};
			var errFct = function(error)
			{
				console.error("error", error);
			};
			this.map.getAllPointsFromWGS84([ latLonPoint ], dojo.hitch(this, succFct), dojo.hitch(this, errFct));
		},
		/**
		 * Removes the My Location marker and the accuracy circle
		 */
		removeMyLocationMarker: function()
		{
			if (this.myLocationMarker)
			{
				this.map.removeMarker(this.myLocationMarker);
				this.myLocationMarker = null;
			}
			if (this.lbsCircle)
			{
				this.map.removePolyline(this.lbsCircle);
				this.lbsCircle = null;
			}
		},
		// Sends the error message to Maximo (according to specifications) and
		// resets the status of the tool
		failedToGetLocation: function()
		{
			if (this._executedAtLeastOnce == false)
			{
				this.map.failedToGetLocation();
				this.resetMyLocationTool();
			}
			else
			{
				// Send status message to maximo
				this.map.failedToGetLocationStatusMessages();
			}
		},
		/**
		 * Puts the tool in the DISABLED status and removes the marker
		 */
		resetMyLocationTool: function()
		{
			this.myLocationToolStatus = ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.DISABLED;
			this.removeMyLocationMarker();
			this.stopWatchingMyLocationMarkerPosition();
			this._executedAtLeastOnce = false;
			this.setActive(false);
			this.map.removeMapEventHandler(this.map.Events.endPan, this._onEndPanFct);
		},
		/**
		 * Disables the browser's watchPosition API
		 */
		stopWatchingMyLocationMarkerPosition: function()
		{
			if (this.myCurrentLocationInstance != null)
			{
				this.myCurrentLocationInstance.removeListeners(this._handler);
			}
		},
		/**
		 * This is an auxiliary handler that is added just before the setCenter()
		 * function. The purpose is to avoid the onEndPan being triggered by
		 * the setCenter call.
		 */
		createOnEndPan: function()
		{
			this.map.removeMapEventHandler(this.map.Events.endPan, this._createOnEndPanFct);
			this.map.addMapEventHandler(this.map.Events.endPan, this._onEndPanFct);
		},

		/**
		 * Handler function that changes the status of the tool from MARKER_CENTERED
		 * to MARKER_NOT_CENTERED whenever an endPan event is captured.
		 */
		onEndPan: function(event_name, event_source, event_args)
		{
			if (this.myLocationToolStatus == ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_CENTERED)
			{
				// Defect 57860 - Ignore the pan event if it was triggered by the map full screen operations
				if(this.map.isExecutingFullScreen() == false)
				{
					this.myLocationToolStatus = ibm.tivoli.fwm.mxmap.toolbar.ext.MyLocationToolStatus.MARKER_NOT_CENTERED;			
				}
			}
		},
		// TODO: Refactor: this logic should be moved somewhere else
		createAccuracyCircle: function(point, accuracy)
		{
			if (this.lbsCircle == null)
			{
				var circle = this.map.radius(point, 10);
				var radiusInKms = (accuracy / 1000);
				if(this.lbsCircle){
					this.removeMyLocationMarker();
				}
				this.lbsCircle = circle.getPolyline(radiusInKms, "#C6DBEB");
				this.map.addPolyline(this.lbsCircle, {
					centerPoint: point,
					width: 3,
					opacity: 0.5,
					fillColor: "#D0E0EC",
					closed: true,
					radiusInKMs: radiusInKms
				});
			}
		},
		/**
		 * Creates the instance of dojox.timing.Timer and changes the onTick,
		 * onStart and onStop functions. 
		 * Checks whether or not a map recentering is needed on onTick
		 */
		_doStart: function()
		{
			this._setCenterTimer = new dojox.timing.Timer(this._setCenterTimerInterval * 1000);
			this._setCenterTimer.onTick = dojo.hitch(this, function()
					{
				if (this._setCenterPending == true)
				{
					this.setCenterAndUpdateMarkerPosition({recenter: true});
					this._setCenterPending = false;
				}
					});
			this._setCenterTimer.onStart = dojo.hitch(this, function()
					{
				if (dojo.config.fwm.debug == true)
				{
					console.log("[MyLocationTool] Started timer to recenter map whenever needed");
				}
					});
			this._setCenterTimer.onStop = dojo.hitch(this, function()
					{
				if (dojo.config.fwm.debug == true)
				{
					console.log("[MyLocationTool] Stopped timer to recenter map whenever needed");
				}
					});
			this._setCenterTimer.start();
		},
		/**
		 * Starts the timer (if needed) to control the map recentering.
		 * only if the timer has not yet been created and the interval is greater than zero
		 */
		startSetCenterControlTimer: function()
		{
			if (this._setCenterTimer == null)
			{
				if (this._setCenterTimerInterval > 0)
				{
					if (dojo.config.fwm.debug == true)
					{
						console.log("[MyLocationTool] Starting timer with interval " + this._setCenterTimerInterval);
					}
					this._doStart();
				}
				else
				{
					if (dojo.config.fwm.debug == true)
					{
						console.log("[MyLocationTool] Interal must be greater than zero -- Start ignored.");
					}
				}
			}
			else
			{
				if (dojo.config.fwm.debug == true)
				{
					console.log("[MyLocationTool] Timer already started. Ignoring start");
				}
			}
		},

		/**
		 * Stops the timer
		 */
		stopSetCenterControlTimer: function()
		{
			if (this._setCenterTimer == null)
			{
				if (dojo.config.fwm.debug == true)
				{
					console.log("[MyLocationTool] Timer not started. Ignoring stop");
				}
			}
			else
			{
				if (dojo.config.fwm.debug == true)
				{
					console.log("[MyLocationTool] Stopping timer");
				}
				this._setCenterTimer.stop();
				this._setCenterTimer = null;
			}
		},
		getSetCenterInterval: function()
		{
			return this.map.mapConf.myLocationToolSetCenterInterval;
		}
	});
});

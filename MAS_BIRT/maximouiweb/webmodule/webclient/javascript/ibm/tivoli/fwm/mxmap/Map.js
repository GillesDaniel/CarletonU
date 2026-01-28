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
	"dojo/main", "dijit/main", "dojox/main", "dojo/on",
	"dojo/_base/declare", "ibm/tivoli/fwm/mxmap/_MapProvider",
	"ibm/tivoli/fwm/mxmap/ContextMenu",
	"ibm/tivoli/fwm/mxmap/CurrentMXRecordSet",
	"ibm/tivoli/fwm/mxmap/MXRecord",
	"ibm/tivoli/fwm/mxmap/MaximoIntegration",
	"ibm/tivoli/fwm/mxmap/helpers/GeocoderHelper",
	"ibm/tivoli/fwm/mxmap/UserSessionManager",
	"ibm/tivoli/fwm/mxmap/MapTipsManager",
	"ibm/tivoli/fwm/mxmap/helpers/MapMarkersRefresher",
	"ibm/tivoli/fwm/mxmap/toolbar/ToolbarManager",
	"ibm/tivoli/fwm/mxmap/CurrentMXRecManager",
	"ibm/tivoli/fwm/mxmap/helpers/MapFullScreenHelper",
	"ibm/tivoli/fwm/mxmap/layers/manager/LayersManager",
	"ibm/tivoli/fwm/mxmap/symbology/SymbologyManager",
	"ibm/tivoli/fwm/mxmap/ImageLibraryManager",
	"dijit/Tooltip",
	"dojo/topic",
	"dojo/dom-style",
	"dojo/dom-construct",
	"dojo/dom-class",
	"ibm/tivoli/fwm/mxmap/MapZIndexHandler"
], function(dojo, dijit, dojox, on, declare, _MapProvider, ContextMenu, CurrentMXRecordSet, MXRecord, MaximoIntegration, GeocoderHelper, UserSessionManager, MapTipsManager, 
		MapMarkersRefresher, ToolbarManager, CurrentMXRecManager, MapFullScreenHelper, LayersManager,
		SymbologyManager, ImageLibraryManager, Tooltip, topic, domStyle, domConstruct, domClass, MapZIndexHandler) {
	ibm.tivoli.fwm.mxmap.WarningCodes =
	{
		NO_LBS_LOCATION_FOUND: "NO_LBS_LOCATION_FOUND"
	};
	
	return declare(_MapProvider, {
		events: {
			mapLoaded: "mxmap.mapLoaded"
		},
		maptraction: null,
		_actionsAreEnabled: true,
		routeManager: null,
		divId: null,
		height: null,
		width: null,
		heightPx: null,
		widthPx: null,
		compId: null,
		mapConf: null,
		routeConf: null,
		providerName: null,
		isMobile: false,
		router: null,
		isFullScreen: false,
		customInitialMapOptions: {},
		fullScreenHelper: null,
		geocoder: null,
		maximo: null,
		currentRecordSetControl: null,
		userSessionManager: null,
		initialized: false,
		markerRefresher: null,
		toolbar: null,
		currentRecordMgr: null,
		maptips: null,
		contextMenu: null,
		layersManager: null,
		symbologyManager: null,
		_executingFullScreen: null,
		defaultRouteColor: "#ffffff",
		dispatcher: null,
		showDelayTimeTooltip: null,
		toolbarStartupHandle: null,
		DEFAULT_INITIAL_ZOOM: 3,
		mapZIndexHandler: null,
		_providerOK: null,
		MAP_TAB_PARENT_ID: "SystemNavAppContent-sc_div",
		NAV_LIST_COLLAPSE_ID: "nav_list_collapse",
		_isLayoutReady: null,
		LATLONGWKID: 4326,
		getId: function()
		{
			return this.compId;
		},
		constructor: function(options)
		{
			this._datasources = [];

			// MAXIMOLBS-1606 - initiating handler of z-indexes
			this.mapZIndexHandler = new MapZIndexHandler({
				map: this
			});
		},
		getMaximo: function()
		{
			return this.maximo;
		},
		getSessionData: function()
		{
			if (this.mapConf)
			{
				return this.mapConf.sessionData;
			}
			return {};
		},

		/**
		 * In case no configuration was made
		 */
		_getDefaultInitialLocation: function()
		{
			return {
				lat: 0.0,
				lng: 0.0,
				level: 3
			};
		},
		_getInitialLocation: function()
		{
			var location = this.mapConf.initialLocation;

			console.log("[Map] Configured Initial Location ", location);
			var loc = this._getDefaultInitialLocation();

			if (this.userSessionManager != null && this.userSessionManager.hasLastUserLocation())
			{
				location = this.userSessionManager.getLastUserLocation();
			}
			if (location && location.lat && location.lng)
			{
				loc.lat = location.lat;
				loc.lng = location.lng;
			}

			if (location && location.level)
			{
				loc.level = location.level;
			}
			console.log("[Map] Initial Location to be used if no record", loc);
			return loc;

		},
		getMapTipsManager: function()
		{
			return this.maptips;
		},
		_afterInit: function(options, mapDiv) {
			console.log("[Map] Options", options);

			this.mapZIndexHandler.postCreate();

			if (options.isTesting == true)
			{
				console.log("[Map] UT ENABLED");
				this.maximo = options.maximoImpl;
			}
			else
			{
				if( !this.maximo )
				{
					this.maximo = new MaximoIntegration(options);			
				}
			}
			this.maptips = new MapTipsManager({
				maximo: this.maximo
			});
		
			
			if (this.allowsTrafficLayer() == true)
			{
				// Create the traffic layer
				var trafficLayerOptions = {
					layerName: ibm.tivoli.fwm.i18n.getMaxMsg("map", "traffic"),// "Traffic";
					layerId: "traffic",
					map: this
				};
				var TrafficLayerClass = dojo.require("ibm.tivoli.fwm.mxmap.layers.TrafficLayer");
				var trafficLayer = new TrafficLayerClass(trafficLayerOptions);
				this.layersManager.addLayer(trafficLayer, false);
			}

			if(this.mapConf.inputConfs.routedatasrc != null)
			{
			// Create the route layer
				this.createRouteLayer();
			}

			var interval = this.mapConf.inputConfs.refreshmapinterval;
			if (interval != null && interval > 0)
			{
				this.markerRefresher = new MapMarkersRefresher({
					map: this,
					maximo: this.maximo,
					interval: interval
				});
			}

			var me = this;

			/* 12-13622 */
			if (me._sectionExpanded)
			{
				me._showConfErrors();
			}

			this.geocoder = new GeocoderHelper({
				map: me,
				key: this.mapConf.key
			});
			this.setMapType(this.MapType.ROAD);

			console.log("[Map] Input Configurations", this.mapConf.inputConfs);
			if (this.mapConf.inputConfs.toolbarenabled == 1 || this.mapConf.inputConfs.toolbarenabled == true || this.mapConf.inputConfs.toolbarenabled=="true")
			{
				if (dojo.config.fwm.debug == true)
				{
					console.log("[Map] Toolbar enabled with these additional items", this.mapConf.inputConfs.toolitems);
				}
				var additionalItems = [];
				if (this.mapConf.inputConfs.toolitems)
				{
					additionalItems = dojo.fromJson(this.mapConf.inputConfs.toolitems);
				}

				this.toolbar = new ToolbarManager({
					gisdata: this.mapConf.gisdata,
					mxdata: this.mapConf.mxdata,
					items: additionalItems,
					map: me
				});
				
				if (this.mapConf.provider == "spatial") {
					this.toolbarStartupHandle = dojo.subscribe("startupToolbarMapInit", dojo.hitch(this,function(data){
						console.log("[TOOLBAR] startupToolbarMapInit");
						this.toolbar.toolbarWidth = this.width;
						this._startToolbar();
						dojo.unsubscribe(this.toolbarStartupHandle);
					}));
				} else {
					this._startToolbar();
				}
				
			} else {
				if (this.mapConf.provider == "spatial") {
					this.toolbarStartupHandle = dojo.subscribe("startupToolbarMapInit", dojo.hitch(this,function(data){
						//If there is no toolbar, we need to hide the loading image here
						this.hideLoadingImg();
						dojo.unsubscribe(this.toolbarStartupHandle);
					}));
				}			
			}

			this.isFullScreen = (this.mapConf.inputConfs.fullscreenmode == "true");
			this.fullScreenHelper = new MapFullScreenHelper({
				map: me,
				mapToolbar: me.toolbar,
				mapDivElement: dojo.byId(me.divId),
				mapDivWidth: me.widthPx,
				mapDivHeight: me.heightPx
			});
			console.log("[Map] Map configured, waiting for Map loading");
			if (!this.isLoaded())
			{
				this.addOnload(dojo.hitch(this, this._completeInitAfterMapLoads));
			}
			else
			{
				this._completeInitAfterMapLoads();
			}

			if (this.mapConf.isInMapManager)
			{
				var updateExtentsFn = dojo.hitch(this, this.saveExtent);

				this.addMapEventHandler('changeZoom',updateExtentsFn);
				this.addMapEventHandler('endPan',updateExtentsFn);
			} else if (!this.mapConf.isOpenMap && this.mapConf.currentMbo) {
				
				// Create the symbologyManager object and build the layer tree
				// according to the symbology configuration file
				this.mapConf.inputConfs.defaultsymbology = dojo.fromJson(this.mapConf.inputConfs.defaultsymbology);
			    if (!this.symbologyManager)
                {
                    this.symbologyManager = new SymbologyManager({
                        map: this,
                        defaultSymbologyConfig: this.mapConf.inputConfs.defaultsymbology
                    });
                }
                else
                {
                    this.symbologyManager.defaultSymbologyConfig = this.mapConf.inputConfs.defaultsymbology;
                }
				
				this.labelConfs = this.getLabelConfs();
				/*
				 * Create the Service Address label
				 */
				if (this.mapConf.currentMbo.gisdata) {
					var address = this.mapConf.currentMbo.gisdata.address;
					if (address) {
						this.createMapLabel("address");
						this.updateMapAddressLabel(address);
					}
				}
				
				/*
				 * Create the mbo label 
				 */
				if (!this.mboAttributesLabel) {
					this.createMapLabel("attributes");  
				}
				this.updateMboAttributesLabelContent();
				/*
				 * Create the tooltip with the mbo long description
				 */
				var longDescription = this.mapConf.currentMbo.mxdata.attributes.description_longdescription;
				var longDescToolTip = dijit.byId("tooltipAttributesLabel");
				if (longDescToolTip) {
					longDescToolTip.destroyRecursive(true);
				}
				this.longDescriptionToolTip = new Tooltip({
					id : "tooltipAttributesLabel",
					connectId : this.mboAttributesLabel,
					label : longDescription,
					showDelay : this.showDelayTimeTooltip
				});	
				
				/*
				 * Labels update
				 */
				dojo.subscribe("onCurrentRecordUpdate_"+this.getId(), dojo.hitch(this, function(data) {
					var address;
					if (data && data.gisdata) {
						address = data.gisdata.address;
					} 
					if (address) {
						this.updateMapAddressLabel(address);
					} else {
						this.hideMapAddressLabel();
					}
					
					if (data && data.mxdata) {
						this.updateMboAttributesLabelContent(data.mxdata);
						this.updateLongDescToolTip(data.mxdata);
					}
					
				}));
			}
			
			// reset timeout timer
			this.endPanMapEventHandler = this.addMapEventHandler('endPan',dojo.hitch(this, function()
			{
				this.maximo.resetMaximoTimeout(false);
			}));
		},
		convertPoint: function(x, y, sourceWKID, targetWKID) {
			var sourcePoint = new esri.geometry.Point(x, y, new esri.SpatialReference({ wkid: sourceWKID }));
			var	targetPoint = esri.geometry.project(sourcePoint, new esri.SpatialReference({ wkid: targetWKID }));

			return {
				x: targetPoint.x,
				y: targetPoint.y
			};
		},
		convertXYToLongLat: function(x, y, sourceWKID) {
			return this.convertPoint(x, y, sourceWKID, this.LATLONGWKID);
		},
		getMapWKID: function() {
			if (this.mapConf.provider !== "spatial") {
				return this.LATLONGWKID;
			}

			if (!this.map || !this.map.spatialReference) {
				return null;
			}

			return this.map.spatialReference.wkid;
		},
		saveExtent: function(context, args)
		{
			var spatialReference = this.getMapWKID();
			var locInfo = {
				lat: this.getCenter().lat,
				lng: this.getCenter().lng,
				level: this.getZoom(),
				spatialReference: spatialReference
			};
			if (this.selectionTool) {
				locInfo.geometry = this.selectionTool.geometrySelected;
				locInfo.lng = this.selectionTool.geometryCentroid.x;
				locInfo.lat = this.selectionTool.geometryCentroid.y;
			} else {
				var extent = this.map.extent;
				
				if (extent != undefined && extent != null)
				{
					locInfo.xmin = extent.xmin;
					locInfo.ymin = extent.ymin;
					locInfo.xmax = extent.xmax;
					locInfo.ymax = extent.ymax;
				}
				
			}
			
			this.storeUserLocation(locInfo);
		},
		storeUserLocation: function(locInfo) {
			var shouldConvertToLatLong = this.mapConf && this.mapConf.isCoordinatesLatLong;
			if (shouldConvertToLatLong) {
				console.info("[Map] Convert Location to LatLong before saving", locInfo);
				this.convertLocInfoToLatLong(locInfo);
			}

			console.info("[Map] Saving Location", locInfo);
			this.getMaximo().storeUserLocation(locInfo);
		},
		convertLocInfoToLatLong: function (locInfo) {
			var mapWKID = this.getMapWKID();
			var convertXYToLongLat = dojo.hitch(this, this.convertXYToLongLat);

			if (mapWKID === this.LATLONGWKID) {
				return;
			}

			function convertXYFieldsToLongLat(x, y) {
				if (locInfo[x] === undefined || locInfo[y] === undefined) {
					return;
				}

				var point = convertXYToLongLat(locInfo[x], locInfo[y], mapWKID);

				locInfo[x] = point.x;
				locInfo[y] = point.y;
			}

			convertXYFieldsToLongLat('lng', 'lat');
			convertXYFieldsToLongLat('xmin', 'ymin');
			convertXYFieldsToLongLat('xmax', 'ymax');
			locInfo.spatialReference = this.LATLONGWKID;
		},
		/**
		 * Creates a map based on the props of the options param.
		 */
		createMap: function(options)
		{
			console.log('[Map] Map Component Id ', options.compId);
			if (options.compId.indexOf("open_map") > 0) {
				options.mapConf.isOpenMap = true;
			} else {
				options.mapConf.isOpenMap = false;
			}		
			this.refreshListener = [];
			this.compId = options.compId;
			this._sectionExpanded = options.isInExpanded;
			try
			{

				if (this.initialized === true)
				{
					console.warn("already created!");
					return;
				}
				if (options.isInExpanded == false)
				{
					this.disableActions();
				}
				dojo.mixin(this, options);
				
				var mapDiv = dojo.byId(this.divId);
				
				this.userSessionManager = new UserSessionManager({
					map: this,
					persistence: this.mapConf.inputConfs.contextpersistent
				});

				var mapInitOptions = this.getInitOptions();
				if (this.isMobile == true)
				{
					dojo.mixin(mapInitOptions, {
						pan: true,
						zoom: 'small',
						scale: true,
						enableScrollWheelZoom: true,
						map_type: true
					});
				}
				else
				{
					dojo.mixin(mapInitOptions, {
						pan: true,
						zoom: 'large',
						scale: true,
						enableScrollWheelZoom: true,
						map_type: true
					});
				}

				function initializeToolsJson(options) {
					var mapConf = options.mapConf;
					var isSpatialProvider = mapConf && mapConf.provider === "spatial";

					function extractToolsJsonFromOptions(options) {
						if (mapConf) {
							var toolsPersistenceEnable = options.mapConf.toolsPersistenceEnable;
							var loadedToolsConfiguration = options.mapConf.loadedToolsConfiguration;
	
							if (toolsPersistenceEnable && loadedToolsConfiguration) {
								return loadedToolsConfiguration;
							}
						}
					}
					var optionsToolsJson = extractToolsJsonFromOptions(options);

					if (optionsToolsJson) {
						return optionsToolsJson;
					}

					if (isSpatialProvider) {
						return {};
					}

					// Other providers do not have Tools persistence
					return undefined;
				}
				this.toolsJson = initializeToolsJson(options);

				/*
				 * Instantiate these objects here, for being able to use them in the _init method
				 * 
				 */
				this.currentRecordMgr = new CurrentMXRecManager({
					mbo: this.mapConf.currentMbo,
					map: this,
					draggable: (this.isMapViewOnly() == false),
					markerImgUrl: this.mapConf.inputConfs.markerimgurl
				});
				this.symbologyManager = new SymbologyManager({
					map: this,
					defaultSymbologyConfig: this.mapConf.inputConfs.defaultsymbology
				});
				this.layersManager = new LayersManager({
					symbManager: this.symbologyManager,
					layerType: ibm.tivoli.fwm.mxmap.layers.LayerType.LAYER,
					map: this
				});
				this.currentRecordSetControl = new CurrentMXRecordSet({
					records: this.mapConf.records,
					markerImgUrl: this.mapConf.inputConfs.markerimgurl,
					map: this
				});
				
				this.showDelayTimeTooltip = this.mapConf.tooltipDelayTime;
				var backToThisObj = this;
				
				this.adjustMapSize();
				this.resizeInterval = setInterval(dojo.hitch(this, function() {
					if (this._getIsLayoutReady()) {
						clearInterval(this.resizeInterval);
						this._createScroolbarsObserver();
						this._resize();
					}
				}), 50);

				this.navListCollapse = dojo.byId(this.NAV_LIST_COLLAPSE_ID);
				if (this.navListCollapse) {
					this.onNavListCollapseClick = on(this.navListCollapse, "click", dojo.hitch(this, function() {
						setTimeout(dojo.hitch(this, function() {
							this._resize();
							setTimeout(dojo.hitch(this, function() {
								this._resize();
							}), 100);
						}), 250);
					}));
				}

				if (this.mapConf.provider == "spatial") {
					this.init(mapDiv, mapInitOptions).then(dojo.hitch(this, function() {
						this._providerOK = true;
						this._afterInit(options, mapDiv);
					}));
				} else {
					this.init(mapDiv, mapInitOptions);
					this._providerOK = true;
					this._afterInit(options, mapDiv);
				}
			}
			catch (e)
			{
				console.error("Error in map creation", e, dojo.toJson(e));
				sendEvent('showErrors', options.compId, "mapcreationerror");
			}
		},
		adjustMapSize: function() 
		{
			var tableBodyElements = document.getElementsByClassName("tabBodyTableStretch");
			if (tableBodyElements.length > 0) {
				var tableBodyTable = tableBodyElements[0];
				dojo.setStyle(tableBodyTable, "border-spacing", "0px");
			}

		},
		centerAndZoomMap: function()
		{

			if (this.routerManager != null && this.routeConf.hasRoute == true)
			{
				return;
			}
			var initialLocation = this._getInitialLocation();
			if (this.mapConf.zoomToDataInput == true)
			{

				console.log("[Map] Zoom to data input enabled ", this.currentRecordSetControl.isEmpty(), this.currentRecordMgr.hasAnyCoordinates());

				if (this.currentRecordSetControl.isEmpty() == true && this.currentRecordMgr.hasAnyCoordinates() != true)
				{
					if (!this.toolsJson || this.toolsJson.saveMapExtent == "0")
					{
						console.log("[Map] Center and Zoom Map - on default location");
						this._setDefaultLocation(initialLocation);
					}

				}
				else
				{
					if (this.currentRecordMgr.hasAnyCoordinates() == true)
					{
						console.log("[Map] Center and Zoom Map - with current record ");
						this._zoomToCurrentMboRec(initialLocation);
					}
					else
					{
						console.log("[Map] Center and Zoom Map - with multiple records and Zoom Data Enabled");
						this.zoomToMbos(this.currentRecordSetControl.mboInfoArray);
					}
				}

			}
			else
			{
				if (!this.toolsJson || this.toolsJson.saveMapExtent == "0") {
					console.log(this.getId(), "[Map] Center and Zoom Map - on default location", initialLocation);
					this._setDefaultLocation(initialLocation);
				}
			}

		},
		_zoomToCurrentMboRec: function(initialLocation)
		{
			this.currentRecordMgr.centerAndZoom(initialLocation.level);
		},
		_fixMapConfLocation: function(location) {
			var mapWKID = this.getMapWKID();
				
			if (!location.wkid) {
				location.wkid = this.mapConf.isCoordinatesLatLong ? this.LATLONGWKID : mapWKID;
			}

			if (location.wkid !== mapWKID) {
				var lng = location.lng;
				var lat = location.lat;

				var convertedPoint = this.convertPoint(lng, lat, location.wkid, mapWKID);
				location.lng = convertedPoint.x;
				location.lat = convertedPoint.y;
				location.wkid = mapWKID;
			}
		},
		_completeInitAfterMapLoads: function()
		{
			this._checkMapLoadedCorrectly();
			if (dojo.config.fwm.debug == true)
			{
				console.log("[Map] Loading actions", this.mapConf);
			}
			if (this.mapConf.initialLocation) {
				this._fixMapConfLocation(this.mapConf.initialLocation);
			}
			if (this.mapConf.mapFullExtent) {
				this._fixMapConfLocation(this.mapConf.mapFullExtent);
			}
			if (this.mapConf.action)
			{
				switch (this.mapConf.action)
				{
					case "showMBOLocation":
						if (dojo.config.fwm.debug == true)
						{
							console.log("[Map] Show Mbos Location");
						}
						this.currentRecordSetControl.showMXRecordsOnMap();
						
						// IV96441: GOOGLE MAPS NOT SHOWING ALL WORKORDERS
						// If there is a multi-marker at the location of the current record, then the current record will be
						// included in the multi-marker so there is no reason to show the current record. If the current record
						// is in the multi-marker, isMboOnMap is set to true so a separate marker isn't added through the
						// centerAndZoomMap function
						var multiMarkerInfoForCurrentMbo = this._getMultiMarkerInfoUsingGisData(this.currentRecordMgr.mbo);
						if(this.mapConf.provider != "gmaps" || !multiMarkerInfoForCurrentMbo)
						{
							if (this.currentRecordMgr.hasAnyCoordinates())
							{
								this.currentRecordMgr.showCurrentRecord(true);
							}
						}
						else if (this.mapConf.provider == "gmaps" && multiMarkerInfoForCurrentMbo)
						{
							this.currentRecordMgr.isMboOnMap = true;
						}
						/*
						 * If the provider is spatial, and the Map was created with no center, centralize map.
						 * This happens when the mbo position is stored without SpatialReference, or we are at the List Tab
						 */
						if (this.mapConf.provider == "spatial") { 
							if ( this.centerWithNoSpatialReference ) {
								this.centerAndZoomMap();
							} else {
								var initialLocation = this._getInitialLocation();
							this._setDefaultLocation(initialLocation);
							}
						} else {
							this.centerAndZoomMap();
						}

						break;
					case "noAction":
						var initialLocation = this._getInitialLocation();
						this._setDefaultLocation(initialLocation);
						break;
					default:
						console.error("[Map] Unknown initial action", this.mapConf.action);
						break;
				}
			}

			dojo.connect(window, "onresize", this, this._resize);
			if (this.isMobile == true)
			{
				// 12-13046. Safari triggers onorientationchange instead of onresize
				// upon tilting the device.
				var res = function()
				{
					var rr = function()
					{
						this._resize();
					};
					setTimeout(dojo.hitch(this, rr), 200);
				};
				dojo.connect(window, "onorientationchange", this, res);
			}

			this.addSubscription("mxmap_section_expanded_" + this.getId(), dojo.hitch(this, this._mapSectionExpanded));

			if (this.isMapViewOnly() == false)
			{
				console.log("[Map] Map is not read only - creating context menu");
				this.contextMenu = new ContextMenu({
					divId: this.divId,
					compId: this.getId(),
					map: this
				});
				
				// In future we must be able to load
				require(["ibm/tivoli/fwm/mxmap/actions/SetRecordLocation"], dojo.hitch(this, function(SetRecordLocation) {
					var setLocationConf = {
							map: this,
							compId: this.getId(),
							label: "Set record location"
						};
					this.contextMenu.addChild(new SetRecordLocation(setLocationConf));
					this.contextMenu.serverUpdated(this.currentRecordMgr.mboInfo);
				}));
				
			}

			if (this.markerRefresher)
			{
				console.log("[Map] Starting Map Marker Refresher");
				this.markerRefresher.start();
			}
			console.log("[Map] Route Configuration Info: ", this.routeConf);
			if (this.routeConf)
			{

				var rparam = {
					routeUrl: this.mapConf.route,
					map: this,
					provider: this.mapConf.provider,
					routeConf: this.routeConf

				};
				dojo.require("ibm.tivoli.fwm.mxmap.routing.MultipleRoutesManager");
				this.routeManager = new ibm.tivoli.fwm.mxmap.routing.MultipleRoutesManager(rparam);


				if (this._sectionExpanded)
				{
					this._showRouteConfErrors();
				}
				else if (this.routeConf.hasRoute == true)
				{
					var opendirectionsdialog = this.routeConf.showdirectionsonload;

					this.refreshRoute(true, opendirectionsdialog);
				}
				var fctR = function()
				{
					this.refreshRoute(true, false, true);
				};
				this.addSubscription("refreshroute_" + this.getId(), dojo.hitch(this, fctR));
			}

			console.log("[Map] Map is full screen", this.isFullScreen);
			
			this.initialized = true;
			console.log("[Map] Publishing event to indicate map loaded.", this.events.mapLoaded);
			/*
			 * Need to publish using esri API Dojo and Maximo Dojo
			 * window.dojo will always be Maximo Dojo
			 * if the provider is Spatial, dojo will point to esriDojo
			 */
			window.dojo.publish(this.events.mapLoaded, [ this, this.getId(), this ]);
			if (this.mapConf.provider == "spatial") {
				dojo.publish(this.events.mapLoaded, [ this, this.getId(), this ]);
			}
			console.log("[Map] Done");
			var webMapDefined = this.mapConf.SPATIAL && this.mapConf.SPATIAL.webMap && this.mapConf.SPATIAL.webMap.webMapDefined;
			if ((this.mapConf.maplinearConf && this.mapConf.maplinearConf.layersLenght == 0) && (webMapDefined==false)) {
				dojo.publish("startupToolbarMapInit",[]);
			}			
			if (this.isMobile == true)
			{
				// need to handle fullscreen when dialogs are opened/closed
				var onDialogOpen = function()
				{
					if (this.fullScreenHelper._fullScreenOn == true)
					{
						this.fullScreenOff();
						this._mustResetFullScreen = true;
					}
					else
					{
						this._mustResetFullScreen = false;
					}
				};
				var onDialogClose = function()
				{
					if (this._mustResetFullScreen == true)
					{
						this.fullScreenOn();
						this._mustResetFullScreen = false;
					}
				};
				this.addSubscription("onDialogRequested_" + this.getId(), dojo.hitch(this, onDialogOpen));
				this.addSubscription("onDialogClosed_" + this.getId(), dojo.hitch(this, onDialogClose));
			}
			if (this.mapConf.provider != "spatial") {
				// Keeping consistency between spatial and other map providers:
				// When map loads, resize
				this._resize();
			}

		},
		getMapConfiguration: function()
		{
			return this.mapConf;
		},
		getSymbologyManager: function()
		{
			return this.symbologyManager;
		},

		_routeRefreshRunning: false,
		refreshRoute: function(forceRefresh, opendirectionsdialog, servercallback, noZoom, routeFinishCallback, routeErrorCallback)
		{
			if (this._actionsAreEnabled == false)
			{
				console.log("[Map] Actions are disabled maybe map is in a collapsed section");
				return;
			}
			console.log("[Map] Refreshing Routes");
			if (this.routeManager)
			{
				if (this._routeRefreshRunning == true)
				{
					console.warn("Route is already being refreshed");
					return;
				}
				this._routeRefreshRunning = true;
				var fct = function(data)
				{
					this.routeManager.clearAll();
					if (data.hasRoute == true)
					{
						var callback = dojo.hitch(this, function()
						{
							this._routeRefreshRunning = false;
							if (routeFinishCallback)
							{
								routeFinishCallback(this.routeManager);
							}
						});
						console.log("opendirectionsdialog", opendirectionsdialog);
						if (opendirectionsdialog == "true")
						{
							callback = dojo.hitch(this, function()
							{
								// forces the itinerary dialog to open per conf.
								dojo.publish("showItinerary_" + this.getId());
								console.log("forcing dialog to show route info");
								this._routeRefreshRunning = false;
							});
						}
						var errFct2 = dojo.hitch(this, function(statusCode, error)
						{
							this._routeRefreshRunning = false;
							if (routeErrorCallback)
							{
								routeErrorCallback(statusCode, error);
							}
							else
							{
								this.routeManager.routingError(statusCode, error);
							}

						});
						this.routeManager.createRoute(data.stops, this.routeConf, callback, errFct2, noZoom);

					}
					else
					{
	                                    this._routeRefreshRunning = false;
						if (routeFinishCallback)
						{
							routeFinishCallback();
						}
					}

				};
				var fctErr = function(data)
				{
					console.warn("[Map] Error refreshing route", data);
					this._routeRefreshRunning = false;
					if (routeErrorCallback)
					{
						routeErrorCallback(data);
					}
					else
					{
						if (data.error)
						{
							this.maximo.showMessage(data.error.group, data.error.key, [ data.error.params ]);
						}
						else
						{
							this.maximo.showMessage("mapserver", "route_unknown_failure", [ data ]);
						}
					}

				};
				this.maximo.getRouteStops(dojo.hitch(this, fct), dojo.hitch(this, fctErr), forceRefresh, servercallback);
			}
			else
			{
				console.warn("[Map] No route manager on map - could not refresh route.", this.compId);
			}
		},
		refreshDatasource: function(callback, errcallback)
		{
			if (this._actionsAreEnabled == false)
			{
				console.log("[Map] Actions are disabled maybe map is in a collapsed section");
				return;
			}
			var success = dojo.hitch(this, function(response)
			{
				var noZoom = true;
				var datasource = null;
				if(response != null && response != undefined)
				{
				if (response.action.data.currentMbo)
				{
					this.currentRecordMgr.serverUpdated(response.action.data.currentMbo, noZoom);
					datasource = this.currentRecordMgr;
				}
				else
				{
					this.currentRecordSetControl.updateRecordSetAndRefresh(response.action.data.records, noZoom);
					datasource = this.currentRecordSetControl;
				}
				}
				if (callback)
				{
					callback(datasource);
				}
			});
			var error = dojo.hitch(this, function()
			{
				if (errcallback)
				{
					errcallback(response);
				}
			});
			this.maximo.refreshDatasource(success, error);
		},
		_datasources: [],
		registerDatasourceRefresh: function(callback)
		{
			this._datasources.push(callback);

		},
		_refreshEntireMapRunning: null,
		clearMarkerLayer: function() {
			console.log("Map clearMarkerLayer method must be implemented by each map factory");
		},
		refreshMap: function(refreshOptions)
		{
			if (this._actionsAreEnabled == false)
			{
				console.log("[Map] Actions are disabled maybe map is in a collapsed section");
				return;
			}
			if (this._refreshEntireMapRunning == true)
			{
				console.warn("[Map] refresh going on, ignoring second request");
				return;
			}
			console.info("Refresh:Started");
			this._refreshEntireMapRunning = true;
			this.clearMarkerLayer();
			var datasourceToZoomTo = null;
			var finalRefreshStep = dojo.hitch(this, function(routeDatasource)
			{

				var i = -1;
				var mustZoom = true;
				if (refreshOptions && refreshOptions.zoom == false)
				{
					mustZoom = false;
				}
				var fct = dojo.hitch(this, function(datasourceObjectToZoom)
				{

					i++;
					if (datasourceObjectToZoom)
					{
						datasourceToZoomTo = datasourceObjectToZoom;
					}
					if (i < this._datasources.length)
					{
						this._datasources[i](fct, null, !mustZoom);
					}
					else
					{
						if (datasourceToZoomTo != null && mustZoom)
						{
							datasourceToZoomTo.centerAndZoom();
							if(datasourceToZoomTo.getWarning != undefined)
							{
								var warning = datasourceToZoomTo.getWarning();
								if(warning)
								{
									this.showWarning(warning);
						}
							}
						}
						console.info("Refresh:Ended");
						//Remove linear layer if the currentMbo is not linked
						if (this.mapConf.currentMbo != null 
								&& this.mapConf.currentMbo.gisdata != null
								&& this.mapConf.currentMbo.gisdata.PLUSSISGIS == false)
						{
							var layersToRemove = [];
							
							var graphicsLayerIds = this.map.graphicsLayerIds;
							dojo.forEach(graphicsLayerIds, dojo.hitch(this, function(graphicsLayerId, i){
								var layerExist = this.map.getLayer(graphicsLayerId);
								if (layerExist && layerExist.isLinear) {
									layersToRemove.push(graphicsLayerId);
								} 
							}));
							if (layersToRemove.length == 0) {
								dojo.publish("refreshMapTools", []);
							} else {
								var layerRemoveEvent = this.map.on("layer-remove", dojo.hitch(this, function(layerRemoved){
									if (layerRemoved.layer) {
										var layerId = layerRemoved.layer.id;
										var index = layersToRemove.indexOf(layerId);
										if (index > -1) {
											layersToRemove.splice(index, 1);
										}
										if (layersToRemove.length == 0) {
											layerRemoveEvent.remove();
											dojo.publish("refreshMapTools", []);
										}
									}
								}));
								var layersToRemoveClone = dojo.clone(layersToRemove);
								dojo.forEach(layersToRemoveClone, dojo.hitch(this, function(layerToRemove, i){
									if (layerToRemove != undefined && layerToRemove != null) {
										var layer = this.map.getLayer(layerToRemove);
										this.map.removeLayer(layer);
									}								
								}));
							}
						};
						this._refreshEntireMapRunning = false;
						dojo.publish("onMapRefresh_" + this.getId(), [ refreshOptions ]);

					}
				});
				fct(routeDatasource);
			});
			// this only happens if we have the applet as datasource so we can skip
			// to the last step directly
			if (this._datasources.length > 0 && (this.mapConf.inputConfs.datasrc == 'MAINRECORD' && this.currentRecordMgr.hasAnyCoordinates() == false) || this.mapConf.inputConfs.datasrc == null
					|| this.mapConf.inputConfs.datasrc.length == 0)
			{
				finalRefreshStep();
			}
			else
			{

				var routeTrigger = dojo.hitch(this, function(datasource)
				{
					datasourceToZoomTo = datasource;
					var routeError = dojo.hitch(this, function(statusCode, error)
					{
						if (refreshOptions && refreshOptions.automatic == false)
						{
							this.routeManager.routingError(statusCode, error);
						}
						finalRefreshStep();
					});
					this.refreshRoute(true, false, false, true, finalRefreshStep, routeError);
				});
				this.refreshDatasource(routeTrigger);
			}

		},
		setRecordLocation: function()
		{
			console.log("[Map] Setting current record location: ", this.contextMenu.map.point);
			dijit.popup.close(this.contextMenu);
		},
		clearMarkers: function()
		{
			this.removeAllMarkers();
		},
		getMultipleRoutesManager: function()
		{
			return this.routeManager;
		},
		/**
		 * Return any initial provider specific configuration. If any custom conf is
		 * set (by MapControl or presentations 'initialMapOptions' property) it will
		 * override the current code conf.
		 *
		 */
		getInitOptions: function()
		{
			var defOptions = this._getInitOptions();
			var customInitOptions = this._getCustomInitOptions(this.mapConf.mapoptions);
			for ( var propName in customInitOptions)
			{
				if (customInitOptions.hasOwnProperty(propName))
				{
					var propValue = customInitOptions[propName];
					defOptions[propName] = propValue;
				}
			}
			return defOptions;
		},
		_getCustomInitOptions: function()
		{
			throw "Cannot find custom init options";
		},
		_getInitOptions: function()
		{
			console.warn("No implementation found");
			return {};
		},
		getGeoCoderConf: function()
		{
			return {};
		},
		/**
		 * Set the map current location based on lat/lng and zoom level
		 */
		_setLocation: function(lat, lng, level)
		{
			var latLng = this.latLng(lat, lng);
			this.setCenterAndZoom(latLng, level);
		},
		/**
		 * Set the map current location based on location object {latitude,
		 * longitude, zoomlevel}
		 */
		_setDefaultLocation: function(location)
		{

			if (location && location.lat && location.lng)
			{
				console.log("[Map] setDefaultLocation", location);
				var latLng = this.latLng(location.lat, location.lng);
				this.setCenterAndZoom(latLng, location.level);
			}
			else
			{
				console.log("[Map] setDefaultLocation missing default location");
				this.setCenterAndZoom(this.latLng(0, 0), this.DEFAULT_INITIAL_ZOOM);
			}

		},
		/**
		 * this function resizes the map div based on the input.
		 */
		_resize: function()
		{
			if (!this._getIsLayoutReady()) {
				return;
			}
			
			var mapElement = dojo.byId(this.divId);

			if (!mapElement) {
				if (dojo.config.fwm.debug) {
					console.info('[Map] Ignoring resize as map element does not exist');
				}

				return;
			}

			var h = this.height;
			var w = this.width;
			if (!this.height)
			{
				h = '100%';
			}
			if (!this.width)
			{
				w = '100%';
			}

			if ((typeof h.substr != 'undefined') && (h.substr(h.length - 1, 1) == '%'))
			{

				// 100% is not valid in maximo, so we need to
				// configure
				// FYI... offsetTop is only returned when the
				// style on the div is position:absolute or
				// position:relative (in
				// some
				// cases)
				// we minus 50, since there is extra padding in
				// maximo that causes
				// scrolling
				// 12-10712 negative values breaks in ie
				if(!this.mapConf.isOpenMap)
				{
					
					h = this._getHeightInPixels(h, mapElement);
					if (h <= 0)
					{
						h = 200;
					}
					
				}
				else //In OpenMap context, we must calculate it differently so we hide vertical scroll-bar
				{
					h = this._getHeightInPixels(h, mapElement) * 0.7;
					if (h <= 0)
					{
						h = 200;
					}
					
					var openMapDialog = dojo.byId("pluss_open_map-dialog_inner");
					domStyle.set(openMapDialog,'top', '80px' );
				}
			}

			// 142350 - Someone has appended a "px" in both w and h without even checking if
			// it is a number, or a string, or if it already contains either a "px" or a "%" sufix... :(
			var widthWithUom = w;
			var heightWithUom = h;
			if (typeof h == 'string' || h instanceof String)
			{
				if ((h.indexOf("px") < 0) && (h.indexOf("%") < 0))
				{
					heightWithUom = h + "px";
				}
			}
			else
			{
				heightWithUom = h + "px";
			}

			if (typeof w == 'string' || w instanceof String)
			{
				if ((w.indexOf("px") < 0) && (w.indexOf("%") < 0))
				{
					widthWithUom = w + "px";
				}
			}
			else
			{
				widthWithUom = w + "px";
			}

			// we don't do the same for width, since maximo components are in TD
			// rows and the map inherits the row width.
			domStyle.set(mapElement, 'width', widthWithUom);
			domStyle.set(mapElement, 'height', heightWithUom);

			if (this.toolbar)
			{
				this.toolbar.updateToolbarWidth(w);
			}
			this.heightPx = parseInt(("" + h).match(/\d+/) || 0);

			this.widthPx = this._getWidthInPixels(w);

			if (this._providerOK)
			{
				// 12-10810 - it is needed not only for the full
				// screen but also if the user resizes the screen
				// without fullscreen.
				this.resizeTo(w, h, this.widthPx, this.heightPx);
				// Issue 12-12704. If in fullscreen mode, the map div needs to be
				// resized differently

				if (this.fullScreenHelper)
				{
					this.fullScreenHelper.updateMapDimensions(w, h);
				}
			}

		},
		/**
		 * Converts values in % into actual pixel ones
		 */
		_getHeightInPixels: function(height, mapElement)
		{
			var h = height.substr(0, height.length - 1);
			var parentHeight = this._getMapParentHeight();
			var availableHorRegion = parseInt(parentHeight - mapElement.offsetTop);
			var pct = parseInt(h);

			h = (availableHorRegion * (pct / 100.0));

			if (!dojo.isWebKit) {
				h -= 1;
			}

			return h;
		},

		_getWidthInPixels: function(w)
		{
			if (w.substr(w.length - 1, 1) == '%')
			{
				var mapElement = dojo.byId(this.divId);
				var widthPercentageStr = w.substr(0, w.length - 1);
				var availableHorRegion = parseInt(dojo.window.getBox(dojo.doc).w - this._getMapOffsetLeft());
				var widthPercentage = parseInt(widthPercentageStr);
				var width = (availableHorRegion * (widthPercentage / 100.0));
				width -= 15;
				return parseInt(("" + width).match(/\d+/) || 0);//
			}
			else
			{
				return parseInt(("" + w).match(/\d+/) || 0);//
			}
		},

		getCurrentRecordSetControl: function()
		{
			return this.currentRecordSetControl;
		},
		destroyRecursive: function()
		{
			if (this.longDescriptionToolTip) {
				this.longDescriptionToolTip.destroyRecursive();
			}
			if (this.toolbarStartupHandle ) {
				dojo.unsubscribe(this.toolbarStartupHandle);
			}
			this.userSessionManager.onMapExit();
			if (this.markerRefresher)
			{
				this.markerRefresher.destroyRecursive();
				this.markerRefresher = null;
			}
			if (this.routeManager)
			{
				this.routeManager.destroyRecursive();
			}
			if (this.isProviderInitialized())
			{
				this.destroyMap();
			}
			if (this.maximo)
			{
				this.maximo.destroyRecursive();
			}
			if (this.geocoder)
			{
				this.geocoder.destroyRecursive();
			}
			if (this.currentRecordSetControl)
			{
				this.currentRecordSetControl.destroyRecursive();
			}
			if (this.currentRecordMgr)
			{
				this.currentRecordMgr.destroyRecursive();
			}
			if (this.contextMenu)
			{
				this.contextMenu.destroyRecursive();
			}
			if (this.maptips)
			{
				this.maptips.destroyRecursive();
			}
			if (this.toolbar)
			{
				this.toolbar.destroyRecursive();
			}
			if (this.fullScreenHelper)
			{
				this.fullScreenHelper.destroyRecursive();
			}
			if (this.layersManager)
			{
				this.layersManager.destroyRecursive();
			}
			if(this.dispatcher)
			{
				this.dispatcher.destroyRecursive();
			}

			// MAXIMOLBS-1606 - destroy handler of z-indexes
			if (this.mapZIndexHandler) {
				this.mapZIndexHandler.destroy();
			}

			this._isLayoutReady = null;
			this._providerOK = null;

			if (this.onNavListCollapseClick) {
				this.onNavListCollapseClick.remove();
			}

			if (this.resizeInterval) {
				clearInterval(this.resizeInterval);
			}

			if (this.scrollbarsObserver) {
				this.scrollbarsObserver.disconnect();
				this.scrollbarsObserver = null;
			}

			this.inherited(arguments);
		},
		destroyMap: function()
		{
			throw "To be implemented by provider";
		},
		// Defect 57860 - Reset the flag that indicates that full screen operations
		// were being executed
		_resetExecutingFullscreen: function()
		{
			this._executingFullScreen = false;
		},
		fullScreenOn: function()
		{
			// Defect 57860 - Turn on a flag stating that full screen operations
			// are being executed at the moment. This is so that pan events are not misinterpreted
			// by the MyLocation tool. This flag resets after 2s.
			this._executingFullScreen = true;
			setTimeout(dojo.hitch(this, this._resetExecutingFullscreen), 2000);
			this.fullScreenHelper.fullScreenModeOn();
			this.map.isFullScreen = true;
		},
		fullScreenOff: function()
		{
			// Defect 57860 - Turn on a flag stating that full screen operations
			// are being executed at the moment. This is so that pan events are not misinterpreted
			// by the MyLocation tool. This flag resets after 2s.
			this._executingFullScreen = true;
			setTimeout(dojo.hitch(this, this._resetExecutingFullscreen), 2000);
			this.fullScreenHelper.fullScreenModeOff();
			this.map.isFullScreen = false;
		},
		// Defect 57860 - Used by MyLocation tool. Only accept pan events
		// if there are no full screen operations being executed.
		isExecutingFullScreen: function()
		{
			return (this._executingFullScreen == true);
		},
		getWidthInPixels: function()
		{
			var w = this.width;
			if (!this.width)
			{
				w = '100%';
			}
			this.widthPx = this._getWidthInPixels(w);
			return this.widthPx;
		},
		getHeightInPixels: function()
		{
			return this.heightPx;
		},
		/**
		 * If we failed to retrieve user location. The possible errors are:<br>
		 * code 1 - Permission denied, user did not allow to share his location<br>
		 * code 2 - Position unavailable, the position of the device could not be
		 * determined<br>
		 * code 3 - Timeout, device took too long (longer than the timeout
		 * specified) to return current location<br>
		 * code 4 - Geolocation not supported, this device does not support
		 * geolocation, this is a custom error code<br>
		 *
		 * @see http://dev.w3.org/geo/api/spec-source.html#permission_denied_error
		 * @param error:
		 *            {code,message}
		 */
		failedToGetLocation: function()
		{
			var maximo = this.getMaximo();
			var myLocationInstance = ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation.getMyCurrentLocationInstance();
			switch (myLocationInstance.getStatus())
			{
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.PERMISSION_DENIED:
					maximo.showMessage("map", "curr_loc_perm_denied");
					break;
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.TIMEOUT:
					maximo.showMessage("map", "curr_loc_timeout");
					break;
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.POSITION_UNAVAILABLE:
					maximo.showMessage("map", "curr_loc_position_unavailable");
					break;
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.GEOLOCATION_NOT_SUPPORTED:
					maximo.showMessage("map", "curr_loc_not_supported");
					break;
				default:
					maximo.showMessage("mapserver", "current_loc_failure", [ error.code ]);
			}
			;
		},
		failedToGetLocationStatusMessages: function()
		{
			var maximo = this.getMaximo();
			var myLocationInstance = ibm.tivoli.fwm.mxmap.geolocation.MyCurrentLocation.getMyCurrentLocationInstance();
			switch (myLocationInstance.getStatus())
			{
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.PERMISSION_DENIED:
					maximo.showMessage("map", "curr_loc_perm_denied_statusmsg");
					break;
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.TIMEOUT:
					maximo.showMessage("map", "curr_loc_timeout_statusmsg");
					break;
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.POSITION_UNAVAILABLE:
					maximo.showMessage("map", "curr_loc_position_unavailable_statusmsg");
					break;
				case ibm.tivoli.fwm.mxmap.geolocation.GeoLocationStatus.GEOLOCATION_NOT_SUPPORTED:
					maximo.showMessage("map", "curr_loc_not_supported_statusmsg");
					break;
				default:
					maximo.showMessage("mapserver", "current_loc_failure", [ error.code ]);
			}
			;
		},
		getLayersManager: function()
		{
			return this.layersManager;
		},
		_checkMapLoadedCorrectly: function()
		{
			// this is to allow async map services loading to check for errors.
		},
		/* mboInfo:{mxdata,gisdata,autolocatedata,lbsdata} */
		handlerMapping: {
			"onMoveEnd": "dragend"
		},
		centerOnMbo: function(mboInfo, zoomlevel)
		{
			// Using the MXRecord wrapper to handle mboInfo's properties
			var mxRec = new MXRecord({
				mboInfo: mboInfo,
				map: this
			});

			var localgisdata = mxRec.getGISData();
			if (mxRec.getAutolocateMboInfo() != null)
			{
				localgisdata = mxRec.getAutolocateGISData();
			}
			if (dojo.config.fwm.debug == true)
			{
				console.log("Center on  ", mboInfo.mxdata.mboName, localgisdata.lat, localgisdata.lng);
				console.log("Is autolocated ", mboInfo.autolocate != null);
			}
			var point = this.latLng(localgisdata.lat, localgisdata.lng);

			// For GIS points and autolocate GIS points, the coordinate system
			// is expected to match the map's coordinate system. However, LBS
			// points are always in Web Mercator format so we need to run
			// the point through getAllPointsFromWGS84() before attempting to
			// display it.
			if (mxRec.useLBSData())
			{
				point = mxRec.getLBSPoint();
				point.sr = this.WGS84WKID;
				var auxFct = function(/* array of projected points */points)
				{
					this._centerOnPoint(points[0], zoomlevel);
				};
				this.getAllPointsFromWGS84([ point ], dojo.hitch(this, auxFct));
			}
			else
			{
				// Adding a null check to make sure that the marker is only drawn if the coordinates are not null.
				// The only possible scenario for this to happen is if the record is linked to a spatial feature class
				// and after that the user tries to see the the record on another map provider.
				// There is a MXRecord.hasAnyCoordinates() check before the code reaches here, but, if the record is
				// linked to a spatial feature class, that method will return true even if no GIS lat/lng exist for the Maximo record
				if(point.lat != null && point.lng != null)
				{
				this._centerOnPoint(point, zoomlevel);
			}
				else
				{
					console.warn("Cannot center on null lat/lng.");
				}
			}

		},
		_centerOnPoint: function(cp, zoomlevel)
		{

			if (zoomlevel)
			{
				this.setCenterAndZoom(cp, zoomlevel);
			}
			else
			{
				this.setCenter(cp);
			}

		},
		/*
		 * Removes the given MBO's highlight from the map, each provider implements your own method
		 */
		removeMboHighligh: function(mboInfo)
		{
			
		},
		/*
		 * Removes the given MBO's marker from the map
		 */
		removeMboMarker: function(mboInfo, layerId)
		{
			var info = this._getMboMarkerInfo(mboInfo, layerId);
			if (info != null)
			{
				if (!layerId)
				{
					this.removeMboFromLayerManager(mboInfo);
				}
				else
				{
					this.removeMboMarkerFromMap(mboInfo, layerId);
				}

			}
			else
			{
				console.warn("There was no marker for ", mboInfo);
			}
		},
		/*
		 * Removes the MBO from the map
		 */
		removeMboMarkerFromMap: function(mboInfo, layerId)
		{
			var info = this._getMboMarkerInfo(mboInfo, layerId);
			if (info != null)
			{
				console.log("[%% mxmap.Map.removeMboMarkerFromMap]", layerId, " mbo=" + mboInfo.mxdata.mboName + "," + mboInfo.mxdata.uid.value + " removing marker");

				// Before removing this marker from the map, remove all the references to this record from
				// other records that are at the same spot
				var remainingRecordsAtTheSpot = this.removeRecordsAtTheSameSpotReferences(mboInfo);
				mboInfo.isOnMap = info.isOnMap = false;
				this.removeMarker(info.marker);
				if (info.lbsCircle || info.lbsMarker)
				{
					this.removePolyline(info.lbsCircle);
					this.removeMarker(info.lbsMarker);
				}

				// If there are still 2 or more markers at the same spot as the removed marker,
				// update the multimarker records (maptip and tooltip)
				if(remainingRecordsAtTheSpot.length > 1)
				{
					this._updateMultiMarkerRecords(remainingRecordsAtTheSpot);
				}
				// If there is only one remaining record at the spot
				// multimarker is not needed anymore, remove it
				else if(remainingRecordsAtTheSpot.length == 1)
				{
					this._removeMultiMarker(remainingRecordsAtTheSpot[0]);
				}
				info = {};
			}
			else
			{
				console.warn("no marker for ", mboInfo);
			}
		},
		/*
		 * If the given MBO has been previously added to the map, show its marker
		 * using the stored marker options.
		 */
		showMboMarker: function(mboInfo, layerId)
		{
			var info = this._getMboMarkerInfo(mboInfo, layerId);
			if (info != null)
			{
				mboInfo.isOnMap = info.isOnMap = true;
				this.addMboMarker(mboInfo, info.markerOptions, layerId);
			}
		},
		/*
		 * Adds the MBO to its default layer (based on type).
		 */
		addMboToLayerManager: function(mboInfo, markerOptions)
		{
			this.layersManager.addRecord(mboInfo, markerOptions);
		},
		/*
		 * Removes the MBO from its default layer (based on type).
		 */
		removeMboFromLayerManager: function(mboInfo)
		{
			this.layersManager.removeRecord(mboInfo);
		},
		/*
		 * Adds a reference to the given MBO, and if this is the first reference
		 * also creates a marker for it using the given marker options.
		 */
		addMboMarker: function(mboInfo, options, layerId)
		{
			// Using the MXRecord wrapper to handle mboInfo's properties
			var mxRec = new MXRecord({
				mboInfo: mboInfo,
				map: this
			});

			var point = mxRec.getGISPoint();
			if (mxRec.getAutolocateMboInfo() != null)
			{
				point = mxRec.getAutolocateGISPoint();
			}

			// The converted coordinates may have already been calculated
			// by routing logic
			if(mxRec.hasPointInCurrentSR())
			{
				this._createMarker(mxRec, options, mxRec.getPointInCurrentSR(), layerId);
			}
			// For GIS points and autolocate GIS points, the coordinate system
			// is expected to match the map's coordinate system. However, LBS
			// points are always in Web Mercator format so we need to run
			// the point through getAllPointsFromWGS84() before attempting to
			// display it.
			else if (mxRec.useLBSData())
			{

				point = mxRec.getLBSPoint();
				// must be sure to convert the WGS point into the current coord
				// system
				point.sr = this.WGS84WKID;
				var succFct = function(pointInCurrentSR)
				{
					// Add the converted coorditates to a known variable in the mboInfo
					// regardless of provider, type of conversion, etc, so that the lat/lng point
					// can be retrieved from the layer records
					mxRec.setPointInCurrentSR(pointInCurrentSR[0]);
					this._createMarker(mxRec, options, pointInCurrentSR[0], layerId);
				};
				var errFct = function(err)
				{
					console.error("Error converting point to current SR", err);
				};

				this.getAllPointsFromWGS84([ point ], dojo.hitch(this, succFct), dojo.hitch(this, errFct));

			}
			else
			{
				// Add the coorditates to a known variable in the mboInfo
				// regardless of provider, type of conversion, etc, so that the lat/lng point
				// can be retrieved from the layer records
				mxRec.setPointInCurrentSR(point);
				// Adding a null check to make sure that the marker is only drawn if the coordinates are not null.
				// The only possible scenario for this to happen is if the record is linked to a spatial feature class
				// and after that the user tries to see the the record on another map provider.
				// There is a MXRecord.hasAnyCoordinates() check before the code reaches here, but, if the record is
				// linked to a spatial feature class, that method will return true even if no GIS lat/lng exist for the Maximo record
				if(point.lat != null && point.lng != null)
				{
					this._createMarker(mxRec, options, point, layerId);
				}
				else
				{
					console.warn("Cannot create marker when lat/lng is null.");
				}
			}

		},
		/*
		 * Creates a marker in the map for the given MBO, with the given marker
		 * options, in the given point.
		 */
		// Using the MXRecord wrapper to handle mboInfo's properties
		_createMarker: function(mxRecord, options, point, layerId)
		{	
			if (dojo.config.fwm.debug == true)
			{
				console.log("[Map._createMarker] Beginning");
			}

			var draggable = true;
			if (mxRecord.isGISDataReadOnly())
			{
				draggable = false;
			}
			else if (this.isMapViewOnly() == true)
			{
				draggable = false;
			}
			else if (options && options.draggable)
			{
				draggable = options.draggable;
			}

			if (mxRecord.useLBSData() && point.lat != null)
			{
				// When the record comes from the LBS table, it cannot be dragged
				draggable = false;
				var lbsData = mxRecord.getLBSData();
				var accuracyMarker = this._addLBSAccuracyMarker(lbsData, point);
				var circle = this._addLBSAccuracyCircle(lbsData, point);

				this._updateMboMarkerHash(mxRecord.getMboInfo(), {
					lbsMarker: accuracyMarker,
					lbsCircle: circle
				}, layerId);

			}
			var color = options ? options.color : this.getDefaultRouteColor();
			var symbol = this.getSymbologyManager().getLegendSymbolForObject(mxRecord.getMboInfo(), color);
			var icon = symbol.url;
			var tooltip = "";
			// Now the mouseover (tooltip) is part of the mboInfo received from the server
			if (this.isMobile != true)
			{
				tooltip = mxRecord.hasMouseover() ? mxRecord.getMouseover() : "";
			}

			var activityId = mxRecord.getActivityId();

			// Defect 67228 - See explanation in GmapsMarker (toProprietary method)
			var dontDrawAsOverlay = false;
			if (options && (options.dontDrawAsOverlay == true))
			{
				dontDrawAsOverlay = options.dontDrawAsOverlay;
			}

			var markerdata = {
				infoBubble: "FWMMAPTIPS",
				label: null,
				tooltip: tooltip,
				marker: 4,
				icon: icon,
				iconSize: [ symbol.width, symbol.height ],
				iconAnchor: [ symbol.offsetx, symbol.offsety ],
				draggable: draggable,
				hover: false,
				// Defect 67228 - See explanation in GmapsMarker (toProprietary method)
				dontDrawAsOverlay: dontDrawAsOverlay,
				activityId: activityId
			};
			if (options != null)
			{
				markerdata.label = options.label;
				markerdata.hover = options.hover;
			}

			var marker = this.addMarker(point, markerdata);
			// Add the marker to the mboInfo so that it can be retrieved by the multimarker logic
			// in case this mbo is at the same spot as another one. The multimarker logic needs
			// to retrieve the marker for all mbos at the same spot so that the openBubble callback function
			// of all these markers are bound to the maptip summary of the multimarker.
			mxRecord.setMarker(marker);
			if (options && options.events)
			{
				for ( var eventName in options.events)
				{
					var eventFtc = options.events[eventName];
					var markerEventName = this.handlerMapping[eventName];
					marker.addMarkerEventHandler(markerEventName, eventFtc);
				}
			}
			console.log("[mxmap.Map._createMarker] mbo=" + mxRecord.mboInfo.mxdata.mboName + "," + mxRecord.mboInfo.mxdata.uid.value + " creating marker");

			this.getMapTipsManager().enableMarker(marker, mxRecord.getMXData(), mxRecord.getMapTipOverrides());

			mxRecord.setIsOnMap(true);
			this._updateMboMarkerHash(mxRecord.getMboInfo(), {
				isOnMap: true,
				marker: marker,
				markerOptions: options
			}, layerId);
			if (options && options.markerReferenceCallback)
			{
				try
				{
					options.markerReferenceCallback(marker);
				}
				catch (e)
				{
					console.error("cannot call reference ftc", e);
				}
			}
			// Check if there are other markers at the same spot
			// This method below adds references to other records at the same spot in mboInfo and
			// it also adds references to this record in all other records at the same spot
			var recordsAtTheSameSpot = this.addRecordsAtTheSameSpotReferences(mxRecord.getMboInfo());
			if(recordsAtTheSameSpot.length > 1)
			{
				// If there are more than 2 markers at the same spot (i.e. the multimarker is already showing),
				// we need to remove the multimarker and add it again after we add the new marker
				// to force the multimarker to be always on top
				if(recordsAtTheSameSpot.length > 2)
				{
					this._removeMultiMarker(mxRecord.getMboInfo());
				}
				this._addMultiMarker(point, recordsAtTheSameSpot, options);
			}
		},
		/*
		 * Stores a reference for the given MBO with the given options. If a
		 * reference already exists, updates all of its properties with the given
		 * ones.
		 */
		_updateMboMarkerHash: function(mboInfo, opt, layerId)
		{
			return this.layersManager.setMboMarkerInfo(mboInfo, opt, layerId);
		},
		/*
		 * Returns the stored info for the given MBO.
		 */
		_getMboMarkerInfo: function(mboInfo, layerId)
		{
			return this.layersManager.getMboMarkerInfo(mboInfo, layerId);
		},
		/*
		 * Stores a reference for the multi marker of the given MBO with the given options. If a
		 * reference already exists, updates all of its properties with the given
		 * ones.
		 */
		_updateMultiMarkerHash: function(mboInfo, opt)
		{
			return this.layersManager.setMultiMarkerInfo(mboInfo, opt);
		},
		/*
		 * Returns the stored info for the multi marker of the given MBO.
		 */
		_getMultiMarkerInfo: function(mboInfo)
		{
			return this.layersManager.getMultiMarkerInfo(mboInfo);
		},
		/*
		 * Returns the stored info for the multi marker of the given MBO.
		 * This function uses the lat/lng in gisdata to retrieve the info 
		 * instead of the lat/lng in pointInCurrentSR.
		 */
		_getMultiMarkerInfoUsingGisData: function(mbo)
		{
			return this.layersManager.getMultiMarkerInfoUsingGisData(mbo);
		},
		/**
		 * in order to place several markers at once, can improve performance by
		 * using this method
		 */
		showAllMboRecords: function(mboInfoArray, options, zoom)
		{
			if (!mboInfoArray || mboInfoArray.length == 0)
			{
				return;
			}
			for ( var index in mboInfoArray)
			{
				// Using the MXRecord wrapper to handle mboInfo's properties
				var mxRec = new MXRecord({
					mboInfo: mboInfoArray[index],
					map: this
				});

				// Fix the issue where records with no lat/lng were displayed in 0/0
				if(mxRec.hasAnyCoordinates())
				{
					this.addMboToLayerManager(mxRec.getMboInfo());
				}
			}
			if (zoom == true)
			{
				this.zoomToMbos(mboInfoArray);
			}

		},
		/**
		 * Forces zoom to cover all the current records on the map.
		 */
		zoomToMbos: function(mboInfoArray)
		{
			if (!mboInfoArray || mboInfoArray.length == 0)
			{
				return;
			}
			if (mboInfoArray && mboInfoArray.length == 1)
			{
				this.centerOnMbo(mboInfoArray[0]);
			}
			else
			{
				this.autoCenterAndZoom(mboInfoArray);
			}
		},
		_addLBSAccuracyCircle: function(lbsdata, point)
		{
			console.log("LBS", lbsdata, lbsdata.max_accuracy_state);
			if ("EXCEEDED_TOLERANCE" !== lbsdata.max_accuracy_state)
			{
				var circle = this.radius(point, 10);
				var radiusInKms = (lbsdata.location_accuracy / 1000);
				var lbsCircle = circle.getPolyline(radiusInKms, lbsdata.circle_border_color);
				var borderOpacity = null;
				if (lbsdata.is_weather_alert_impact) {
					borderOpacity = lbsdata.circle_opacity;
				}
				this.addPolyline(lbsCircle, {
					centerPoint: point,
					width: lbsdata.circle_border_width,
					opacity: lbsdata.circle_opacity,
					fillColor: lbsdata.circle_fill_color,
					borderOpacity: borderOpacity,
					closed: true,
					radiusInKMs: radiusInKms
				});
			}
			else
			{
				console.log("accuracy exceeded tolerance");
			}
			return lbsCircle;
		},
		_addLBSAccuracyMarker: function(lbsdata, point)
		{
			var accuracyMarkerInfo = ImageLibraryManager.getImageLibraryManager().getLBSMarkerImageInfo(lbsdata);
			var markerdata2 = {
				infoBubble: "",
				label: null,// nothing specified in spec.
				marker: 4,
				icon: accuracyMarkerInfo.getImageURL(),
				iconSize: accuracyMarkerInfo.getImageSize(),
				iconAnchor: accuracyMarkerInfo.getImageAnchor(),
				draggable: false,
				hover: false,
				// Defect 67228 - See explanation in GmapsMarker (toProprietary method)
				dontDrawAsOverlay: true
			};
			return this.addMarker(point, markerdata2);
		},
		enableTraffic: function()
		{
			this.setShowTraffic(true);
		},
		disableTraffic: function()
		{
			this.setShowTraffic(false);
		},
		enableRoutes: function()
		{
			if (this.getMultipleRoutesManager())
			{
				this.getMultipleRoutesManager().showRoutesLinesAndCalculatedMarkers();
			}
		},
		disableRoutes: function()
		{
			this.getMultipleRoutesManager().hideRoutesLinesAndCalculatedMarkers();
		},
		disableActions: function()
		{
			this._actionsAreEnabled = false;
		},

		enableActions: function()
		{
			this._actionsAreEnabled = true;
		},
		isMapViewOnly: function()
		{
			var confs = this.mapConf.inputConfs;
			if (confs != null && confs.mapviewonly != null)
			{
				return confs.mapviewonly == "1" || confs.mapviewonly == "true";
			}
			// map default is read only
			return true;
		},
		allowsTrafficLayer: function()
		{
			return true;
		},
		getDefaultLengthUnit: function()
		{
			return this.mapConf.lengthunit;
		},
		/**
		 * when map is ina section and it just got expanded we force map to refresh
		 * its data.
		 */
		_mapSectionExpanded: function()
		{
			this.enableActions();
			var showdirectionsonload = false;
			if (this.routeConf && this.routeConf.showdirectionsonload == true)
			{
				showdirectionsonload = true;
			}
			// this.refreshRoute(true, showdirectionsonload);
			// Issue 12-13542. The line below shouldn't have been commented out.
			this._resize();
			var refreshOptions = {
					zoom: true,
					disableMsgs: false,
					automatic: false
				};
			this.refreshMap(refreshOptions);
			if (this._sectionExpanded == false)
			{
				this.centerAndZoomMap();
				this._sectionExpanded = true;
			}
			this._showConfErrors();
		},
		_showConfErrors: function() {
			if (this.mapConf.error) {
				this.maximo.showMessage(this.mapConf.error.group, this.mapConf.error.key, [this.mapConf.error.params]);
			}
		},	
		_showRouteConfErrors: function() {
			if (this.routeConf && this.routeConf.error) {
				this.maximo.showMessage(this.routeConf.error.group, this.routeConf.error.key, [this.routeConf.error.params]);
			}
		},
		getInitialLocationCustomInfo: function()
		{
			return {};
		},
		autoRefreshMap: function()
		{
			var refreshOptions = {
				zoom: false,
				disableMsgs: true,
				automatic: true
			};
			this.refreshMap(refreshOptions);
		},
		_getMapOffsetLeft: function()
		{
			var mapDiv = dojo.byId(this.divId);
			return mapDiv.offsetLeft;
		},
		_getMapOffsetTop: function()
		{
			var mapDiv = dojo.byId(this.divId);
			return mapDiv.offsetTop;
		},
		createRouteLayer: function()
		{
			if(this.layersManager.getLayerById("route") == null)
			{
				var routeLayerOptions = {
						layerName: ibm.tivoli.fwm.i18n.getMaxMsg("map", "routelayer"),// "Route";
						layerId: "route",
						map: this
					};
				var RouteLayerClass = dojo.require("ibm.tivoli.fwm.mxmap.layers.RouteLayer");
				var routeLayer = new RouteLayerClass(routeLayerOptions);
				this.layersManager.addLayer(routeLayer, false);
			}
		},
		// This method returns the lat/lng point from a known mboInfo property
		// because the lat/lng info can be scattered across the mboInfo object
		// in different places depending on "autolocate", if it is spatial, etc...
		getLatLngFromMboInfo: function(mboInfo)
		{
			var point = null;
			if(mboInfo.pointInCurrentSR)
			{
				point = this.latLng(mboInfo.pointInCurrentSR.lat, mboInfo.pointInCurrentSR.lng);
			}
			return point;
		},
		addRecordsAtTheSameSpotReferences: function (newMboInfo)
		{
			return this.layersManager.addRecordsAtTheSameSpotReferences(newMboInfo);
		},
		removeRecordsAtTheSameSpotReferences: function(mboInfoToBeRemoved)
		{
			return this.layersManager.removeRecordsAtTheSameSpotReferences(mboInfoToBeRemoved);
		},
		_addMultiMarker: function(point, recordsAtTheSameSpot, options)
		{
			// Multimarker info
			var multiMarkerImgInfo = ImageLibraryManager.getImageLibraryManager().getMultiMarkerImageInfo();

			var multiMarkerTooltip = this._getMultiMarkerMouseover(recordsAtTheSameSpot);

			var multiMarkerData = {
					infoBubble: "FWMMAPTIPS",
					label: null,
					tooltip: multiMarkerTooltip,
					icon: multiMarkerImgInfo.imageUrl,
					iconSize: multiMarkerImgInfo.imageSize,
					iconAnchor: multiMarkerImgInfo.imageAnchor,
					draggable: false,
					hover: false,
					isMultiMarker: true,
					// IV96441: GOOGLE MAPS NOT SHOWING ALL WORKORDERS
					// See explanation in GMapsMarker.js, toProprietary function
					dontDrawAsOverlay: false
				};
			// Add the multimarker
			var multiMarker = this.addMarker(point, multiMarkerData);
			// It doesn't matter which of the records is used to update the hash
			// because the hash key is the lat/lon (which is the same for all records).
			this._updateMultiMarkerHash(recordsAtTheSameSpot[0],{
					marker: multiMarker,
					markerOptions: options
				});
			this.getMapTipsManager().enableMultiMarker(multiMarker, recordsAtTheSameSpot);
		},
		_removeMultiMarker: function(mboInfo)
		{
			var multiMarkerInfo = this._getMultiMarkerInfo(mboInfo);
			if(multiMarkerInfo != null)
			{
				this.removeMarker(multiMarkerInfo.marker);
				multiMarkerInfo = {};
			}
		},
		_updateMultiMarkerRecords: function(recordsAtTheSameSpot)
		{
			// It doesn't matter which of the records is used to retrieve the mboInfo from the hash table
			// because the hash key is the lat/lon (which is the same for all records).
			var multiMarkerInfo = this._getMultiMarkerInfo(recordsAtTheSameSpot[0]);
			this.getMapTipsManager().updateMultiMarkerOpenBubbleHandler(multiMarkerInfo.marker, recordsAtTheSameSpot);
			var mouseover = this._getMultiMarkerMouseover(recordsAtTheSameSpot);
			multiMarkerInfo.marker.setTooltip(mouseover);
		},
		_getMultiMarkerMouseover: function(recordsAtTheSameSpot)
		{
			var multiMarkerTooltip = "";
			// Stacking the mouseover data from all markers within this multimarker
			// Tooltip does not make sense for mobile devices
			if(this.isMobile != true)
			{
				var horizontalLineTag = "<hr>";
				// Remember, it is no use adding "max-" and "min-" style properties in IE... what a shame.
				if(dojo.isIE)
				{
					horizontalLineTag = "<hr style=\"width=200px\">";
				}

				for(var i=0; i<recordsAtTheSameSpot.length; i++)
				{
					multiMarkerTooltip += ((recordsAtTheSameSpot[i].mouseover != null) && (recordsAtTheSameSpot[i].mouseover != undefined)) ? recordsAtTheSameSpot[i].mouseover : "";
					if(i < (recordsAtTheSameSpot.length - 1))
					{
						multiMarkerTooltip += horizontalLineTag;
					}
				}
			}
			return multiMarkerTooltip;
		},
		getDefaultRouteColor: function()
		{
			return this.defaultRouteColor;
		},
		getDispatcher: function()
		{
			return this.dispatcher;
		},
		setDispatcher: function(dispatcher)
		{
			this.dispatcher = dispatcher;
		},
		showWarningMessage: function(msgGroup, msgKey, params) {
			 this.getMaximo().showMessage(msgGroup, msgKey, params);
		},
		showWarning: function(warningCode)
		{
			var maximo = this.getMaximo();
			switch (warningCode)
			{
				case ibm.tivoli.fwm.mxmap.WarningCodes.NO_LBS_LOCATION_FOUND:
					if (this.mapConf.provider != "spatial") {
						maximo.showMessage("mapcontrol", "nogeolocationfound");
					}
					break;
				default:
					break;
			}
		},

		/**
		 * Returns whether or not the markers should be drawn even when the provider fails to generate a route
		 */
		getShowMarkersOnRouteError: function()
		{
			var showMarkersOnRouteError = false;
			var mapConf = this.mapConf;
			if((mapConf != null) && (mapConf!= undefined) && (mapConf.showMarkersOnRouteError != null) && (mapConf.showMarkersOnRouteError != undefined))
			{
				if(mapConf.showMarkersOnRouteError > 0)
				{
					showMarkersOnRouteError = true;
				}
			}
			return showMarkersOnRouteError;
		},
		/**
		 * Get the label configuration from the symbology manager
		 * @return the label configuration from the Map Manager symbology
		 */
		getLabelConfs: function() {
			var labelConfs;
			var symbologyLayerId = this.mapConf.currentMbo.mxdata.mboName.toLowerCase();
			var layerSymbologyConfig = this.symbologyManager.getLayerConfigById(symbologyLayerId);
			labelConfs = (layerSymbologyConfig) ? layerSymbologyConfig.mapLabelsStyle : null;
			return labelConfs;
		},
		
		/**
		 * Create the labels on the map
		 * Can be of type "address" or "attributes"
		 */
		createMapLabel: function(labelType) {
			var label;

			if ( labelType == "address" && !this.addressLabel) {
				label = domConstruct.create("span", {
					id: "mapAddresslabel"
				});
				this.addressLabel = label;
				domConstruct.place( label, this.element, "last" );
				
			} else if ("attributes" && !this.mboAttributesLabel) {
				label = domConstruct.create("span", {
					id: "mapAttributeslabel"
				});	
				this.mboAttributesLabel = label;
				domConstruct.place( label, this.element, "first" );
			}
			

			try {
					
				this.setLabelStyle(label, this.labelConfs, labelType);
					
			} catch (e) {
				if ((this.mapConf.provider == "spatial") && (this.messageDiv)) {
					this.writeMessageInBox( this.messageDiv, "map", "errorInMapLabelParams", [], true );
				} else {
					console.error(ibm.tivoli.fwm.i18n.getMaxMsg( "map", "errorInMapLabelParams" ));
				}
			}
				
			this.setLabelProviderClass(labelType);
				
		},
		setLabelStyle: function( label, labelStyleConf, labelType) {
			if (labelStyleConf) {
				domStyle.set(label,"color", "rgb("+labelStyleConf.fontColor+")" );
				domStyle.set(label,"font-size", labelStyleConf.fontSize );
				domStyle.set(label,"max-width", labelStyleConf.labelLength );
					
				var backgroundColor = "rgb("+ labelStyleConf.backgroundColor + "," + labelStyleConf.backgroundTransparency +")" ;
				domStyle.set(label,"background-color", backgroundColor );
				if (labelType == "attributes") {
					if (labelStyleConf.attributesLabel && labelStyleConf.attributesLabel.left) {
						domStyle.set(label,"left", labelStyleConf.attributesLabel.left);
					}
					if (labelStyleConf.attributesLabel && labelStyleConf.attributesLabel.top) {
						domStyle.set(label,"top", labelStyleConf.attributesLabel.top);
					}
				}
			}
		},
		/**
		 * Updates the Address label
		 * @param address the new address to be displayed
		 */
		updateMapAddressLabel: function(address) {
			if (!this.addressLabel) {
				this.createMapLabel("address");
			}
			
			if (this.addressLabel.textContent != address) {
				this.addressLabel.textContent = address;
			}
			domStyle.set(this.addressLabel,"display", "inline" );
		}, 
		/**
		 * Set the css class for the address label based on the provider
		 */
		setLabelProviderClass: function(labelType) {
			
			var providerClasses;
			if (labelType == "address") {
				
				providerClasses = {
						"spatial": "spatialMapAddressLabel",
						"gmaps" : "gMapAddressLabel",
						"bingmaps":"bMapAddressLabel"
				};
				domClass.add(this.addressLabel, providerClasses[this.mapConf.provider]);
				
			} else if (labelType == "attributes") {
				
				providerClasses = {
						"spatial": "spatialAttributesLabel",
						"gmaps" : "gMapAttributesLabel",
						"bingmaps":"bMapAttributesLabel"
				};
				domClass.add(this.mboAttributesLabel, providerClasses[this.mapConf.provider]);
			}
		}, 
		/**
		 * Hide the Address label
		 */
		hideMapAddressLabel: function() {
			if (this.addressLabel) {
				this.addressLabel.content = null;
				domStyle.set(this.addressLabel,"display", "none" );
			}
		},
		/**
		 * Update the content of the mbo attributes label
		 */
		updateMboAttributesLabelContent: function(mxdata) {
			var attributes;
			var invalidAttribute = false;
			if (mxdata) {
				attributes = mxdata.attributes;
			} else {
				attributes = this.mapConf.currentMbo.mxdata.attributes;
			}
			var attributesNameArray = this.labelConfs != null ? this.labelConfs.labelAttributes.split(",") : [];
			var textContent = "";
			dojo.forEach(attributesNameArray, function(attributeName, i) {
				var trimmedAttributeName = attributeName.trim();
				if (attributes.hasOwnProperty(trimmedAttributeName)) {
					var newContent = attributes[trimmedAttributeName] || "";
					if ( (i > 0) && !(newContent == "")) {
						textContent = textContent + " - ";
					}
					textContent = textContent + newContent;
				} else {
					invalidAttribute = true;
				}
				
			}, this);
			if (invalidAttribute) {
				this.mboAttributesLabel.textContent = "INVALID BINDING"
			} else if (this.mboAttributesLabel.textContent != textContent) {
				this.mboAttributesLabel.textContent = textContent;
			}
		},
		updateLongDescToolTip: function(mxdata) {
			if (mxdata && mxdata.attributes) {
				var longDescription = mxdata.attributes.longDescription;
				this.longDescriptionToolTip.label = longDescription;
			}
			
		},

		_getMapParentHeight: function() {
			if (this.mapConf.isOpenMap) {
				return dojo.window.getBox(dojo.doc).h;
			}

			return dojo.byId(this.MAP_TAB_PARENT_ID).offsetHeight;
		},

		_getIsLayoutReady: function() {
			if (this._isLayoutReady) {
				return this._isLayoutReady;
			}

			var isTabGroupDefined = this.mapConf && this.mapConf.tabGroupId;
			var isUsingOverlay = this.skinVersion === 'mas8';
			if (isUsingOverlay && isTabGroupDefined) {
				return this._isLayoutReady = dojo.byId(this.mapConf.tabGroupId).style.paddingTop === '3rem';
			}

			return this._isLayoutReady = true;
		},

		_startToolbar: function() {
			var mapElement = dojo.byId(this.divId);
			dojo.style(mapElement, "height", (this.heightPx - this.toolbar.getToolbarHeight()) + "px");

			this.toolbar.startup();
		},

		_createScroolbarsObserver: function() {
			var scrollbars = this._getScrollbars();
			if (!scrollbars.length) {
				return;
			}

			if (!this.scrollbarsObserver) {
				this.scrollbarsObserver = new MutationObserver(dojo.hitch(this, this._onScrollbarChanged));
			}

			dojo.forEach(scrollbars, dojo.hitch(this, function(scrollbar) {
				this.scrollbarsObserver.observe(scrollbar, { attributes: true });
			}));
		},

		_onScrollbarChanged: function() {
			if (this.map && this.map.isFullScreen) {
				return;
			}
			
			var scroller = dojo.query('.custom-scroller', this.MAP_TAB_PARENT_ID)[0];
			if (scroller) {
				var firstChild = scroller.children[0];
				if (firstChild) {
					dojo.style(firstChild, {
						'margin-inline-end': '0px',
						'margin-bottom': '0px'
					});
				}
			}
			
			this._resize();
			this._hideScrollbars();
		},

		_getScrollbars: function() {
			return dojo.query('.custom-scroller-track', this.MAP_TAB_PARENT_ID);
		},

		_hideScrollbars: function() {
			var scrollbars = this._getScrollbars();
			if (scrollbars) {
				dojo.forEach(scrollbars, dojo.hitch(this, function(scrollbar) {
					dojo.style(scrollbar, 'display', 'none');
				}));
			}
		},

		isMapGraphite: function() {
			return false;
		},

		inFullScreen: function() {
			if (!this.map) {
				return false;
			}

			return this.map.inFuisFullScreen;
		},

	});
});

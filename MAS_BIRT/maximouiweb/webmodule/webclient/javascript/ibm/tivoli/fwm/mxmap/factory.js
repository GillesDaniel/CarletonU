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
	"dojo/main", 
	"dijit/main", 
	"dojox/main",  
	"dojo/io/script",
	"ibm/tivoli/fwm/mxmap/MapGraphite"
], function(
	dojo, 
	dijit, 
	dojox, 
	script,
	MapGraphite
) {
	
	/*
	* Set the mxmap global object
	*/
	if (!ibm.tivoli.fwm.mxmap) {
		ibm.tivoli.fwm.mxmap = {};
	}
	if (!ibm.tivoli.fwm.mxmap.stack) {	
		ibm.tivoli.fwm.mxmap.stack = {};	
	}
	
	/*
	 * factory will be available globally
	 */
	ibm.tivoli.fwm.mxmap.factory =  {
		events: {
			mapImplLoaded: "mxmap.mapImplLoaded"
		},
		dojoToDomId: null,
		esriVersion: "3.42",
		options: null,
		initialized: false,
		readyToCreateMap: false,
		tries: 10,
		/**
		 * In IE we need to first load MXN standard files and only after we can load
		 * the other ones. Otherwise IE will break complaining MXN object is not
		 * defined.
		 */

		/**
		 * Loads the core Mapstraction javascripts
		 */
		init: function()
		{
			// must be loaded first otherwise it breaks the other

			console.log("[Factory] is Ie?", (dojo.isIE != null));

			this.initialized = true;
			this.registry = {};
			console.log("[Factory] Initiated factory");
		},

		/**
		 * This method creates the provider implementation and triggers its
		 * createMap method
		 */
		createMap: function(options)
		{
			console.log("[Factory] Component ID: " + options.compId);
			console.log("[Factory] Is error in Map Configuration? " + options.mapConf.error);
			if (options.mapConf.error && options.mapConf.error == true)
			{
				if (options.mapConf.showErrorObject && options.mapConf.showErrorObject == true) {
					var params = {
							msgKey : options.mapConf.key,
							msgGroup : options.mapConf.group,
							params: options.mapConf.params
					};
					console.log("[Factory] Errors param: ", params);

					sendEvent('showErrorsParamObject', options.compId, JSON.stringify(params));	
				} else {
					console.log("[Factory] Options.mapConf.key: ", options.mapConf.key);
					addCommInput('msgKey', options.mapConf.key);
					addCommInput('msgGroup', options.mapConf.group);
					sendEvent('showErrors', options.compId, options.mapConf.key);
				}

				return;
			}
			if (this.initialized != true)
			{
				this.init();
			}

			if (this.mapExists(options.compId))
			{
				console.log("[Factory]  Map exists, destroying", options.compId);
				this.destroyCurrentMap(options.compId);
			}

			var providerName = options.mapConf.provider;
			var providerImplFactory = "ibm/tivoli/fwm/mxmap/factories/" + providerName;

			this.options = options;

			var me = this;

			if (providerName == "spatial" || providerName == "openmaps") {
				var mapGraphite = this.buildMapGraphite(options);
				this.registry[options.compId] = {
					currentMap: mapGraphite
				};
			} else {
				if (!this.loaded[providerName]) {
					ibm.tivoli.fwm.mxmap.stack[providerName] = [];
					ibm.tivoli.fwm.mxmap.stack[providerName].push(options);
					this.loaded[providerName] = -1;
					require([providerImplFactory], function(factory) {
						factory.init(options);
						console.log("[Factory]  Provider initiated.");
					});
				} else {
					if (this.loaded[providerName] == -1)
					{
						console.log("[Factory] Api is NOT loaded, queueing options");
						ibm.tivoli.fwm.mxmap.stack[providerName].push(options);
					}
					else
					{
						console.log("[Factory] Api is loaded");
						dojo.publish(this.events.mapImplLoaded, [ this.loaded[providerName], providerName ]);
						this._createProviderMap(options, this.loaded[providerName]);
					}
				}
			}
		},

		skipGraphite: function() {
			return window.localStorage.getItem('skipGraphiteMap');
		},

		buildMapGraphite: function(options) {
			var mapGraphite = new MapGraphite(options);

			return mapGraphite;
		},

		/**
		 * 
		 * Set the property map readyToCreateMap
		 * Used when the map creation has to wait for something else to load
		 */
		setReadyToCreateMap: function(isReadyToCreate) {
			this.readyToCreateMap = isReadyToCreate;
		},
		mapExists: function(compId)
		{

			return this.registry[compId] && this.registry[compId].currentMap;
		},
		destroyCurrentMap: function(compId)
		{
			console.log("[Factory] Destroying map", compId, this.registry[compId]);
			try
			{
				if (this.readyToCreateMapHandle) {
					dojo.unsubscribe(this.readyToCreateMapHandle);
				}
				if (this.openMaximoDialogHandler) {
					this.openMaximoDialogHandler.remove();
					this.openMaximoDialogHandler = null;
				}
				if (this.registry[compId] && this.registry[compId].currentMap)
				{
					this.registry[compId].currentMap.destroyRecursive();
				}
			}
			catch (e)
			{
				console.log("[Factory]  Could not destroy", e);
			}
			this.registry[compId] = null;
		},
		loaded: {},
		/**
		 * When the provider api is initializes this method is called.
		 */
		apiInitialized: function(mapImpl, provider)
		{
			console.log("[Factory] Loaded: ", mapImpl, provider);
			this.loaded[provider] = mapImpl;
			dojo.publish(this.events.mapImplLoaded, [ mapImpl, provider ]);
			this.executeStack(mapImpl, provider);
		},
		/**
		 * publish an event from Maximo 
		 * If the provider is Spatial, we need to publish the event from Esri Dojo
		 */
		publishMapEvent: function(compId, eventType, eventParams) {
			if (!this.skipGraphite()) {
				window.mapBus.onServerUpdates(eventType, eventParams);
				return;
			}

			if (this.registry && this.registry[compId]) {
				var mapImpl = this.registry[compId].currentMap;
				if (mapImpl.providerName === 'maximospatial') {
					mapImpl.publishMapEvent(eventType, eventParams);
				} else {
					dojo.publish(eventType, eventParams);
				}
			}
		},
		executeStack: function(mapImpl, provider)
		{
			if (ibm.tivoli.fwm.mxmap.stack[provider])
			{
				var queuedRequest = ibm.tivoli.fwm.mxmap.stack[provider];

				for ( var id = 0; id < queuedRequest.length; id++)
				{
					var options = queuedRequest[id];
					this._createProviderMap(options, mapImpl);
				}
			}
		},
		_createProviderMap: function(options, mapImpl)
		{
			console.log("[Factory] Create: ", mapImpl, options);
			var instance = null;
			eval("this._instance = new " + mapImpl + "();");
			instance = this._instance;
			console.log("[Factory] Instance: ", instance);
			instance.createMap(options);
			this.registry[options.compId] = {
					currentMap: instance
			};
		},
	}
	
	return ibm.tivoli.fwm.mxmap.factory;
});

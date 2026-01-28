/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2012,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */

define("ibm/tivoli/fwm/mxmap/symbology/SymbologyManager", ["dojo/_base/declare",
	"ibm/tivoli/fwm/mxmap/_Base"], function(declare, _Base) {
	return declare([_Base], {
		_mapSymbologyJson: null,
		_map: null,
		_objectMap: null,
		_defaultSymbologyConfig: null,
		constructor: function(options)
		{
			dojo.mixin(this, options);
			this._map = options.map;
			this._mapSymbologyJson = this._map.mapConf.symbologyConfig;
			this._objectMap = this._buildObjectMap(this._mapSymbologyJson);
			this._defaultSymbologyConfig = options.defaultSymbologyConfig;
		},
		_buildObjectMap: function(symbologyConfig)
		{

			var retval = {};
			if((this._mapSymbologyJson != null) && (this._mapSymbologyJson.layers != null)){
				for (id in this._mapSymbologyJson.layers)
				{
					var layer = this._mapSymbologyJson.layers[id];
					retval[layer.id] = layer;
					if (layer.symbologies && layer.symbologies[0]) 
						this.setActiveSymbologyForLayer(layer, layer.symbologies[0]);
				}
			}
			return retval;
		},
		getDefaultLayerConfigFor:function(_id){
			this._layerIdXlation[_id]="others";
			return this.getLayerConfigById(_id);
		},
		/**
		 * Retrieves the symbology config for the layer (object type) specified by id
		 */
		getLayerConfigById: function(id2)
		{
			var _id = id2.toLowerCase();
			if(this._layerIdXlation[_id]!=null){
				_id=this._layerIdXlation[_id];
			} 
			return this._objectMap[_id];
		},
		/**
		 * Retrieves an array with all the symbologies for a given layer
		 */
		getSymbologyConfigArrayByLayer: function(layerConfig){
			var symbologyArray = {};
			if((layerConfig != null) && (layerConfig.symbologies != null)){
				dojo.forEach(layerConfig.symbologies, function(symbology){
					if(symbology.id != null && symbology.id != ""){
						symbologyArray[symbology.id] = symbology; 
					}
				});
			}
			return symbologyArray;
		},
		/**Retrieves the Linear Symbology Definition for an application (id),
		 * Linear object name, Linear attribute and Linear value
		 * 
		 */
		getLinearSymbologyDefinition: function(mboName, objectName, attributeName, attributeValue){
			var layer = this.getLayerConfigById(mboName);
			var linearSymbologyDef = null;
			var linearSymbologyAttributes = null;
			var linearSymbologyValues = null;
			var linearSymbologyResponse = null;
			if ( layer ) {
				linearSymbologyDef = layer.linearSymbology;
				if ( linearSymbologyDef ) {
					dojo.forEach(linearSymbologyDef, function(symbology){
						if(symbology.objectName != null && symbology.objectName != "" && symbology.objectName == objectName){
							linearSymbologyAttributes = symbology; 
						}
					});
					if (linearSymbologyAttributes) {
						var attributes = linearSymbologyAttributes.attributes;
						dojo.forEach(attributes, function(attribute){
							if(attribute.name != null && attribute.name == attributeName){
								linearSymbologyValues = attribute; 
							}
						});
						if (!linearSymbologyValues) {
							// Defaults values were not found in the Symbology column (Map Manager)
							if (attributeName == "linearDefaultAttribute" &&  attributeValue == "linearDefaultValue") {
								return null;
							}
							return this.getLinearSymbologyDefinition(mboName, objectName, "linearDefaultAttribute", "linearDefaultValue");
						}

						var attributeValues = linearSymbologyValues.values;
						dojo.forEach(attributeValues, function(attrValue){
							if (!linearSymbologyResponse) {
								if(attrValue.value != null && attrValue.value != "" && attrValue.value == attributeValue){
									linearSymbologyResponse = attrValue; 
								} else {
									if (attrValue.value == null || attrValue.value == undefined || attrValue.value == "") {
										var initialValue = attrValue.startValue;
										var finalValue = attrValue.endValue;
										if (initialValue != null && initialValue != undefined && initialValue != "" &&
												finalValue != null && finalValue != undefined && finalValue != "") {
											if (initialValue <= attributeValue && attributeValue <= finalValue) {
												linearSymbologyResponse = attrValue; 
											}
										} else {
											if ((initialValue == null || initialValue == undefined || initialValue == "") &&
													(finalValue == null || finalValue == undefined || finalValue == "")) {
												linearSymbologyResponse = attrValue;
											}
										}
									}								
								}
							}						
						});
						if (!linearSymbologyResponse) {
							// Defaults values were not found in the Symbology column (Map Manager)
							if (attributeName == "linearDefaultAttribute" &&  attributeValue == "linearDefaultValue") {
								return null;
							}
							return this.getLinearSymbologyDefinition(mboName, objectName, "linearDefaultAttribute", "linearDefaultValue");
						}


					}
				}
			}
			return linearSymbologyResponse.symbology;
		},
		/**Retrieves the Pin Point Definition for a layer specified by id
		 * 
		 */
		getPinPointDefinition: function(id){
			var layer = this.getLayerConfigById(id);
			var pinPointDef = null;
			if ( layer ) {
				pinPointDef = layer.pinPointDefinition;
			}
			return pinPointDef;
		},
		/**
		 * Retrieves the Highlight configutation for a given layer
		 */
		getHighlightConfigByLayer: function(layerConfig, id){
			return layerConfig.highlightGeometry;
		},
		/**
		 * Retrieves an array with all the legends for a given symbology
		 */
		getLegendConfigArrayBySymbology: function(symbologyConfig){
			var legendArray = {};
			if((symbologyConfig != null) && (symbologyConfig.legends != null)){
				dojo.forEach(symbologyConfig.legends, function(legend){
					if(legend.id != null && legend.id != ""){
						legendArray[legend.id] = legend; 
					}
				});
			}
			return legendArray;
		},
		_layerIdXlation:{},
		setActiveSymbology: function(layerId, symbology)
		{

			var layer = this.getLayerConfigById(layerId);
			this.setActiveSymbologyForLayer(layer, symbology);
		},
		setActiveSymbologyForLayer: function(layer, symbology)
		{
			layer.activeSymbology = symbology;
		},
		getActiveSymbology: function(layerId)
		{
			var layer = this.getLayerConfigById(layerId);
			var activeSymbology = null;
			if(layer)
			{
				activeSymbology = layer.activeSymbology;
			}
			return activeSymbology;
		},
		getLegendSymbolForObject: function(object, routeColor)
		{
			var layer = this.getLayerConfigById(object.mxdata.mboName);
			return this.getLegendSymbolForObjectAndLayer(layer, object, routeColor);
		},
		fixSymbolUrl: function(symbol)
		{
			if(!symbol.urlFixed)
			{
				symbol.url = dojo.config.fwm.servletBase + symbol.url;
				symbol.urlRTL = dojo.config.fwm.servletBase + symbol.urlRTL;
				symbol.urlFixed = true;
			}
			return symbol;
		},
		/*
		 * Given an object and the currently active symbology, returns the symbol
		 * for the object in the symbology. If a color is given and the selected
		 * symbology is based on resource, the given color is used to find the right
		 * symbol.
		 */
		getLegendSymbolForObjectAndLayer: function(layer, object, routeColor)
		{
			var activeSymbology = layer.activeSymbology;
			if (activeSymbology == null)
			{
				return ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getDefaultMarkerImageInfo();
			}

			// Resource symbology is one of the exceptions to the symbology configuration file.
			// Icon file names are not configurable.
			if (activeSymbology.id == "resource")
			{
				if (object.routedata == null)
				{
					if (object.ownDefaultMarker != null)
					{
						return object.ownDefaultMarker;
					}
					else
					{
						return this._getDefaultSymbol(activeSymbology);
					}
				}
				else
				{
					var rtlDir = "";
					if(document.body.dir == "rtl")
					{
						rtlDir = "/rtl";
					}
					// Symbology type: resource.
					// We use the route color to find the right symbol.
					return {
						"url": ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getResourcesPath() + rtlDir + "/symbology/workorder/map_WO_" + routeColor.replace("#", "").toLowerCase() + ".png",
						"color": "",
						"offsetx": 24,
						"offsety": 36,
						"width": 47,
						"height": 36
					};
				}
			}
			// Labors/Crews retrieved from the dispatcher version of the "Nearby Resources" tool
			// are another exception to the symbology configuration file.
			// Icon file names are not configurable.
			else if( ((layer.id == "labor") || (layer.id == "amcrew")) && (object.routeInfo != undefined) && (object.routeInfo.polyline != undefined))
			{
				var routeColor = object.routeInfo.polyline.color;
				var resourceIconPrefix = (layer.id == "labor") ? "/labor/map_locationLabor_":"/crew/map_locationCrew_";
				var rtlDir = (document.body.dir == "rtl") ? "/rtl":"";
				// Labor/crew marker to be displayed in a dispatch map,
				// use the icon that match the route color
				return {
					"url": ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getResourcesPath() + rtlDir + "/symbology" + resourceIconPrefix + routeColor.replace("#", "").toLowerCase() + ".png",
					"color": "",
					"offsetx": 24,
					"offsety": 36,
					"width": 47,
					"height": 36
				};
			}

			else if (activeSymbology.id == "fwm_default")
			{
				if (object.ownDefaultMarker != null)
				{
					return object.ownDefaultMarker;
				}
				else
				{
					// Symbology type: default
					// We assume there's only one value and return it.
					return this.fixSymbolUrl(activeSymbology.legends[0].symbol);
				}
			}
			else
			{
				if (activeSymbology.type == "numeric")
				{
					return this._getNumericSymbol(object, activeSymbology);
				}
				else if (activeSymbology.type == "domainvalue" || activeSymbology.type == "tablevalue")
				{
					return this._getDomainSymbol(object, activeSymbology);
				}
				// Shouldn't ever happen, but just in case...
				return this._getDefaultSymbol(activeSymbology);
			}
		},
		/*
		 * Returns the default symbol for the given symbology.
		 */
		_getDefaultSymbol: function(symbology)
		{
			var defaultSymbols = dojo.filter(symbology.legends, function(legend)
					{
				return legend.isDefault == true;
					});
			return defaultSymbols.length > 0 ? this.fixSymbolUrl(defaultSymbols[0].symbol) : null;
		},
		/*
		 * Returns the right symbol for the given object in the given symbology,
		 * based on the relevant attribute's value and the configured ranges.
		 */
		_getNumericSymbol: function(object, symbology)
		{
			// Symbology type: numeric
			// We try to convert the value to a number and find a range that
			// contains that number. If either fails we return the default symbol.
			var val = object.mxdata.attributes[symbology.id];
			if (val == "")
			{
				val = "null";
				var symbols = dojo.filter(symbology.legends, function(legend)
						{
					return (legend.id == val);
						});
				return (symbols.length > 0 ? this.fixSymbolUrl(symbols[0].symbol) : this._getDefaultSymbol(symbology));
			}
			else if (!val)
			{
				return this._getDefaultSymbol(symbology);
			}
			else
			{
				var attrVal = parseInt(val);
				var symbols = dojo.filter(symbology.legends, function(legend)
						{
					return (attrVal >= parseInt(legend.minValue) && attrVal <= parseInt(legend.maxValue));
						});
				return (symbols.length > 0 ? this.fixSymbolUrl(symbols[0].symbol) : this._getDefaultSymbol(symbology));
			}
		},
		/*
		 * Returns the right symbol for the given object in the given symbology,
		 * based on the relevant attribute's value and the configured value/symbol
		 * pairs.
		 */
		_getDomainSymbol: function(object, symbology)
		{
			var attrVal = String(object.mxdata.attributes[symbology.id]).toLowerCase();
			if (attrVal == "")
				attrVal = "null";
			var symbols = dojo.filter(symbology.legends, function(legend)
					{
				return (legend.id == attrVal);
					});
			return (symbols.length > 0 ? this.fixSymbolUrl(symbols[0].symbol) : this._getDefaultSymbol(symbology));
		},
		/*
		 * Returns the default symbology for the layer
		 * The default symbology is a configuration in the presentation.
		 */
		getDefaultSymbologyForLayer: function(layer)
		{
			var defaultSymbology = null;
			if(this._defaultSymbologyConfig != null)
			{
				var layerSymbologyPair = null;
				layerSymbologyPair = dojo.filter(this._defaultSymbologyConfig, function(pair)
						{
					return (pair.layer == layer);
						});
				if(layerSymbologyPair.length > 0)
				{
					defaultSymbology = layerSymbologyPair[0].symbology;
				}
			}
			return defaultSymbology;
		}

	});
});

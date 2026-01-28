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

/**
 * Controls the map layers
 * 
 * Creates/removes layers based on the records added to them.<br>
 * Sets the records symbologies when added<br>
 */
define([
	"dojo/main",
	"dojo/_base/declare",
	"ibm/tivoli/fwm/mxmap/_Base",
	"ibm/tivoli/fwm/mxmap/layers/Layer",
	"ibm/tivoli/fwm/mxmap/ImageLibraryManager",
	"ibm/tivoli/fwm/mxmap/layers/VirtualLayer"
	], function(dojo, declare, _Base, Layer, ImageLibraryManager, VirtualLayer) {
	return declare([_Base], {
		_layers: null,
		_layersById: null,
		symbManager: null,
		_map: null,
		_mboMarkerOptions: null,
		_visibleLayers: null,
		constructor: function(options)
		{
			dojo.mixin(this, options);
			this._layers = {};
			this._layersById = {};
			this._visibleLayers = [];
			this._map = options.map;
			this._multiMarkerOptions = new this.MultiMarkerOptionsTable();
			this.addSubscription("addRecordsToLayer_" + this._map.getId(), dojo.hitch(this, this.addRecordCustomLayer));
			this.addSubscription("removeRecordsFromLayer_" + this._map.getId(), dojo.hitch(this, this.removeRecordsFromLayer));
			this.addSubscription("removeLayer_" + this._map.getId(), dojo.hitch(this, this.removeLayerByName));
			this.addSubscription("changeLayerLatLngSource_" + this._map.getId(), dojo.hitch(this, this.changeLayerLatLngSource));

		},
		getVisibleLayers: function()
		{
			return this._visibleLayers;
		},
		addVisibleLayer: function(layerId)
		{
			var index = this._visibleLayers.indexOf(layerId);
			if (index < 0)
			{
				this._visibleLayers.push(layerId);
			}
			if (this._visibleLayers.length === 0) {
				this._visibleLayers.push(-1);
			}
		},	
		removeVisibleLayer: function(layerId)
		{
			var index = this._visibleLayers.indexOf(layerId);
			if (index > -1)
			{
				this._visibleLayers.splice(index, 1);
			}
			if (this._visibleLayers.length === 0) {
				this._visibleLayers.push(-1);
			}		
		},	
		addRecord: function(mboInfo, markerOptions)
		{
			var layer = this._getLayerForMbo(mboInfo);
			layer.addRecord(mboInfo, markerOptions);
		},
		// find layerid based on the objectname
		_getLayerForMbo: function(mboInfo)
		{
			var mboName = mboInfo.mxdata.mboName;
			return this.getLayerForObjectName(mboName);
		},
		getLayerForObjectName: function(mboName)
		{

			var layer = this.getLayerById(mboName);
			if (layer == null)
			{
				// create Layer
				layer = new Layer({
					layerId: mboName.toLowerCase(),
					layerType: ibm.tivoli.fwm.mxmap.layers.LayerType.LAYER,
					symbManager: this.symbManager,
					map: this.map
				});
				this.addLayer(layer, false);
				layer.enable();
			}
			return layer;
		},
		getLayerIdForMbo: function(mboInfo)
		{
			var mboName = mboInfo.mxdata.mboName;
			return this.getLayerForObjectName(mboName).getLayerId();
		},
		removeRecord: function(mboInfo)
		{
			var mboName = mboInfo.mxdata.mboName;
			var layer = this.getLayerById(mboName);
			if (layer != null)
			{
				layer.removeRecord(mboInfo);
			}
		},
		addRecordCustomLayer: function(layerName, data, cleanBeforeAdd, layerId, childrenTitle, avoidLayerEnabled)
		{
			if (data.length > 0)
			{
				var virtualLayer = this.getLayerById(layerName);
				if (virtualLayer == null)
				{
					virtualLayer = new VirtualLayer({
						layerId: layerName,
						layerType: ibm.tivoli.fwm.mxmap.layers.LayerType.VIRTUAL_LAYER,
						symbManager: this.symbManager,
						map: this.map,
						objectType: data[0].mxdata.mboName
					});
				}
				this.resetLayer(virtualLayer, avoidLayerEnabled);

				for ( var i in data)
				{
					virtualLayer.addRecord(data[i]);
				}

			}
		},
		removeLayerByName: function(layerName, keepLayerEntry, layerId)
		{
			var _layer = this.getLayer(layerName);

			if (_layer)
			{
				_layer.removeMXRecordSetData();
				if (keepLayerEntry != true)
				{
					this._layers[layerName] = null;
					delete this._layers[layerName];
				}
			}

			if (layerId && this._layersById[layerId])
			{
				this._layersById[layerId] = null;
			}

		},
		removeLayer: function(layer)
		{
			delete this._layersById[layer.getLayerId()];
			delete this._layers[layer.getLayerName()];
		},
		addLayer: function(layer, cleanBeforeAdd)
		{
			var layerName = layer.getLayerName();
			var layerId = layer.getLayerId();
			if (dojo.config.fwm.debug == true)
			{
				console.log("[mxmap.layers.LayersManager.addLayer] LayerId: " + layerId);
			}
			var _layer = this.getLayer(layerName);
			if (_layer)
			{
				if (cleanBeforeAdd)
				{
					this.removeLayerByName(layerName, false, layerId);
				}
				_layer.addMXRecordSet(layer.getMXRecordSet());
			}
			else
			{
				this._layers[layerName] = layer;
				if (layerId)
				{
					this._layersById[layerId] = layer;
				}
			}
		},
		resetLayer: function(layer, avoidLayerEnabled)
		{
			var layerName = layer.getLayerName();
			var layerId = layer.getLayerId();
			var _layer = this.getLayer(layerName);
			if (_layer)
			{
				this.removeLayerByName(layerName, false, layerId);
			}
			if (layerName)
			{
				this._layers[layerName] = layer;
			}
			if (layerId)
			{
				this._layersById[layerId] = layer;
			}
			if (layer.isDisabled() && avoidLayerEnabled != true)
			{
				layer.enable();
			}

		},
		showLayer: function(layerName)
		{
			var layer = this.getLayer(layerName);
			if (layer)
			{
				layer.show();
			}
			else
			{
				console.warn("[LayersManager] Cannot show layer " + layerName + " because it was not found.");
			}
		},
		hideLayer: function(layerName)
		{
			var layer = this.getLayer(layerName);
			if (layer)
			{
				layer.hide();
			}
			else
			{
				console.warn("[LayersManager] Cannot hide layer " + layerName + " because it was not found.");
			}
		},
		getLayer: function(layerName)
		{
			if (this._layers.hasOwnProperty(layerName) == true)
			{
				return this._layers[layerName];
			}
			return null;
		},
		redrawMarkers: function()
		{
			for ( var key in this._layers)
			{
				this._layers[key].redrawMarkers();
			}
		},
		getLayerById: function(layerId)
		{
			layerId = layerId.toLowerCase();

			for (id in this._layersById)
			{
				var idLowerCase = id.toLowerCase();
				if (idLowerCase == layerId)
				{
					return this._layersById[id];
				}
			}
			return null;
		},
		/* returns an array with all the existing layers */
		getLayers: function()
		{
			var array = [];
			for ( var key in this._layers)
			{
				array.push(this._layers[key]);
			}
			return array;
		},
		removeRecordsFromLayer: function(layerName, data)
		{
			var layer = this.getLayer(layerName);
			if (layer)
			{
				for ( var i = 0; i < data.length; i++)
				{
					layer.removeRecord(data[i]);
				}
			}
			else
			{
				console.log("[LayerManager] Layer " + layerName + " not found to remove records.");
			}
			this._map.refreshMap();
		},
		_getLayerByIdOrDefaultForMbo: function(layerId, mboInfo)
		{
			if (layerId)
			{
				return this.getLayerById(layerId);
			}
			else
			{
				return this._getLayerForMbo(mboInfo);
			}
		},
		setMboMarkerInfo: function(mboInfo, opt, layerId)
		{
			var layer = this._getLayerByIdOrDefaultForMbo(layerId, mboInfo);
			return layer.setMboMarkerInfo(mboInfo, opt);
		},
		getMboMarkerInfo: function(mboInfo, layerId)
		{
			var layer = this._getLayerByIdOrDefaultForMbo(layerId, mboInfo);
			return layer.getMboMarkerInfo(mboInfo);
		},
		// Retrieves the legend for the mboInfo
		getLegendForRecord: function(mboInfo, layer)
		{
			var lyr = layer;
			var symbology = null;
			var legend = null;
			var activeSymbology = this.symbManager.getActiveSymbology(lyr.getLayerId());
			// Check if active symbology is null because some layers do not
			// have symbologies (like route, traffic and nearby labors/crews)
			if(activeSymbology == null)
			{
				// If symbology is null for the given layer, check if the mbo belongs to any other layer
				// because if it does, then that layer may have a symbology and legends
				// that can be either enabled or disabled. This is true for unassigned work orders.
				lyr = this.getLayerById(mboInfo.mxdata.mboName);
				if(lyr)
				{
					activeSymbology = this.symbManager.getActiveSymbology(lyr.getLayerId());
				}
			}

			if(activeSymbology != null)
			{
				symbologyFound = dojo.filter(lyr.getChildren(), function(child)
						{
					return (child.getLayerId() == activeSymbology.id);
						});
				if (symbologyFound.length > 0)
				{
					var symbology = symbologyFound[0];

					if (activeSymbology.id == "fwm_default")
					{
						// Symbology type: default
						// We assume there's only one value and return it.
						legend = this._getDefaultLegend(symbology);
					}
					else
					{
						if (activeSymbology.type == "numeric")
						{
							legend =  this._getNumericLegend(mboInfo, symbology);
						}
						else if (activeSymbology.type == "domainvalue" || activeSymbology.type == "tablevalue")
						{
							legend =  this._getDomainLegend(mboInfo, symbology);
						}
						else
						{
							// Shouldn't ever happen, but just in case...
							legend = this._getDefaultLegend(symbology);
						}
					}
				}
			}
			return legend;
		},
		/*
		 * Returns the default legend for the given symbology.
		 */
		_getDefaultLegend: function(symbology)
		{
			var legends = symbology.getChildren();

			var defaultLegend = dojo.filter(legends, function(legend)
					{
				return legend.getLayerConfig().isDefault == true;
					});
			return defaultLegend.length > 0 ? defaultLegend[0] : null;
		},
		/*
		 * Returns the legend for the given object in the given symbology,
		 * based on the relevant attribute's value and the configured ranges.
		 */
		_getNumericLegend: function(object, symbology)
		{
			// Symbology type: numeric
			// We try to convert the value to a number and find a range that
			// contains that number. If either fails we return the legend.
			var legends = symbology.getChildren();
			var val = object.mxdata.attributes[symbology.getLayerId()];
			if (val == "")
			{
				val = "null";
				var legendFound = dojo.filter(legends, function(legend)
						{
					return (legend.getLayerId() == val);
						});
				return (legendFound.length > 0 ? legendFound[0] : this._getDefaultLegend(symbology));
			}
			else if (!val)
			{
				return this._getDefaultLegend(symbology);
			}
			else
			{
				var attrVal = parseInt(val);
				var legendFound = dojo.filter(legends, function(legend)
						{
					return (attrVal >= parseInt(legend.getLayerConfig().minValue) && attrVal <= parseInt(legend.getLayerConfig().maxValue));
						});
				return (legendFound.length > 0 ? legendFound[0] : this._getDefaultLegend(symbology));
			}
		},
		/*
		 * Returns the right symbol for the given object in the given symbology,
		 * based on the relevant attribute's value and the configured value/symbol
		 * pairs.
		 */
		_getDomainLegend: function(object, symbology)
		{
			var legends = symbology.getChildren();
			var attrVal = String(object.mxdata.attributes[symbology.getLayerId()]).toLowerCase();
			if (attrVal == "")
				attrVal = "null";
			var legendFound = dojo.filter(legends, function(legend)
					{
				return (legend.getLayerId() == attrVal);
					});
			return (legendFound.length > 0 ? legendFound[0] : this._getDefaultLegend(symbology));
		},
		isLegendEnabledForRecord: function(legend)
		{
			// By default, show the mbo marker, unless it's legend is disabled
			var legendEnabled = true;
			if(legend != null)
			{
				if(legend.isDisabled() == true)
				{
					legendEnabled = false;
				}
			}
			return legendEnabled;
		},
		// Resets all layers (enable) for symbology
		resetLegends: function(symbology, dontRedrawMarkers)
		{
			var legends = symbology.getChildren();
			for(var i = 0; i < legends.length; i++)
			{
				legends[i].enableButDontRedrawMarkers();
			}
			if(!dontRedrawMarkers)
			{
				this.redrawMarkers();
			}
		},
		// Resets the symbology (enable the default one) for a given layer
		// and reset all their legends (enable them)
		resetSymbologies: function(layer, dontRedrawMarkers)
		{
			var symbologies = layer.getChildren();
			for(var i = 0; i < symbologies.length; i++)
			{
				this.resetLegends(symbologies[i], true);
				if(symbologies[i].isDefault())
				{
					symbologies[i].toggleStateButDontRedrawMarkers();
				}
			}
			if(!dontRedrawMarkers)
			{
				this.redrawMarkers();
			}
		},
		// Resets the layers, symbologies and legends to default values
		// Layers: All of them enabled except for Traffic
		// Symbologies: Enable the default one for each layer
		// Legends: Enable all of them
		resetLayers: function()
		{
			for ( var layerKey in this._layers)
			{
				var layer = this._layers[layerKey];
				// Reset all layers but for the traffic layer 
				if(layer.getLayerId() != "traffic")
				{
					this.resetSymbologies(layer, true);
					if(layer.isDisabled())
					{
						layer.enable();
					}
					else
					{
						layer.redrawMarkers();
					}
				}
				else
				{
					// The traffic layer is disabled by default
					layer.disable();
				}
			}
		},
		iterateOverAllRecords: function(fct)
		{
			for (var layerKey in this._layers)
			{
				var layer = this._layers[layerKey];
				var records = layer.getRecords();
				for (var i = 0; i < records.length; i++)
				{
					if(fct)
					{
						fct(records[i]);
					}
				}
			}
		},
		// Compares lat/lon of this record with the lat/lon of all the other existing records
		// If any other record is at the same spot as this one, add references to both of them. 
		// Returns an array with the records at the same spot as newRecord (including newRecord)
		addRecordsAtTheSameSpotReferences: function(newRecord)
		{
			recordsAtTheSameSpot = [];
			this.iterateOverAllRecords(dojo.hitch(this, function(existingRecord){
				// The existing record needs to be currently showing up on the map
				if((existingRecord.isOnMap == true))
				{
					// There is no point in comparing the records if they are the same... duh!
					if(!this.areMboInfosEqual(newRecord, existingRecord))
					{
						// Check lat/lon values for both records, if they are exactly the same,
						// then add references to both
						if(this.areMbosAtTheSameSpot(newRecord, existingRecord))
						{
							// Just in case the array has not yet been defined
							if(newRecord.recordsAtTheSameSpot == undefined)
							{
								newRecord.recordsAtTheSameSpot = [];
							}
							if(existingRecord.recordsAtTheSameSpot == undefined)
							{
								existingRecord.recordsAtTheSameSpot = [];
							}
							// Add the references
							newRecord.recordsAtTheSameSpot.push(existingRecord);
							existingRecord.recordsAtTheSameSpot.push(newRecord);
							recordsAtTheSameSpot.push(existingRecord);
						}
					}
				}
			}));
			recordsAtTheSameSpot.push(newRecord);
			return recordsAtTheSameSpot;
		},
		// Removes the references to records at the same spot when removing a record from the map
		// Returns an array with the remaining records at the same spot as removedRecord
		removeRecordsAtTheSameSpotReferences: function(removedRecord)
		{
			var remainingRecordsAtTheSpot = [];
			var referencedRecord = null;
			if(removedRecord.recordsAtTheSameSpot != undefined)
			{
				// Remove all the references from removedRecord
				// and also remove the reference to removedRecord from all other records that are at the same spot
				if(removedRecord.recordsAtTheSameSpot.length > 0)
				{
					while(removedRecord.recordsAtTheSameSpot.length)
					{
						// Remove the reference from removedRecord
						referencedRecord = removedRecord.recordsAtTheSameSpot.shift();
						// Now, search all references in referencedRecord and remove the one
						// pointing to removedRecord
						if(referencedRecord.recordsAtTheSameSpot != undefined)
						{
							remainingRecordsAtTheSpot.push(referencedRecord);
							for(var i=0; i<referencedRecord.recordsAtTheSameSpot.length; i++)
							{
								if(this.areMboInfosEqual(removedRecord, referencedRecord.recordsAtTheSameSpot[i]))
								{
									referencedRecord.recordsAtTheSameSpot.splice(i,1);
									i--;
								}
							}
						}
					}
				}
			}
			return remainingRecordsAtTheSpot;
		},
		// Check if a mboInfo1 and mboInfo2 are the same record
		areMboInfosEqual: function(mboInfo1, mboInfo2)
		{
			var mbosEqual = (mboInfo1.mxdata.mboName == mboInfo2.mxdata.mboName) && (mboInfo1.mxdata.uid.value == mboInfo2.mxdata.uid.value);
			if((mboInfo1.extrakey != null) && (mboInfo1.extrakey != undefined) && (mboInfo2.extrakey != null) && (mboInfo2.extrakey != undefined))
			{
				if(mboInfo1.extrakey != mboInfo2.extrakey)
				{
					mbosEqual = false;
				}
			}
			return (mbosEqual);
		},
		// Check if mboInfo1 and mboInfo2 are at the same lat/lng
		areMbosAtTheSameSpot: function(mboInfo1, mboInfo2)
		{
			var sameSpot = false;
			var point1 = this.map.getLatLngFromMboInfo(mboInfo1);
			var point2 = this.map.getLatLngFromMboInfo(mboInfo2);
			if((point1 != null) && (point2 != null))
			{
				sameSpot = ((point1.lat == point2.lat) && (point1.lng == point2.lng)); 
			}
			return sameSpot;
		},
		setMultiMarkerInfo: function(mboInfo, opt)
		{
			return this._multiMarkerOptions.setMultiMarkerInfo(mboInfo, opt);
		},
		getMultiMarkerInfo: function(mboInfo)
		{
			return this._multiMarkerOptions.getMultiMarkerInfo(mboInfo);
		},
		// If useLBSPosition is true for a layer, it means that lat/lng
		// should be retrieved from the mbo's "lbsdata" instead of "gisdata"
		changeLayerLatLngSource: function(layerId, useLBSPosition)
		{
			var layer = this.getLayerById(layerId);
			if(layer)
			{
				layer.setUseLBSPosition(useLBSPosition);
				this._map.refreshMap();
			}
		},
		getMultiMarkerInfoUsingGisData: function(mbo)
		{
			return this._multiMarkerOptions.getMultiMarkerInfoUsingGisData(mbo);
		},
		// Same as MboMultiMarkerOptionsTable in Layer.js but this one uses
		// the lat/lng as hash key
		MultiMarkerOptionsTable: function ()  {
			this.multiMarkersOnMap = {};
			/*
			 * Stores a reference for the given multimarker with the given options. If a
			 * reference already exists, updates all of its properties with the given
			 * ones.
			 */
			this.setMultiMarkerInfo = function(mboInfo, opt)
			{
				this._createMultiMarkerHashRecord(mboInfo);
				for ( var propName in opt)
				{
					this.multiMarkersOnMap[mboInfo.pointInCurrentSR.lat][mboInfo.pointInCurrentSR.lng][propName] = opt[propName];
				}

			};
			/*
			 * Creates a reference for the given MBO in the map's MBO marker map. The
			 * reference count is initialized to 0.
			 */
			this._createMultiMarkerHashRecord = function(mboInfo)
			{
				if (!this.multiMarkersOnMap[mboInfo.pointInCurrentSR.lat])
				{
					this.multiMarkersOnMap[mboInfo.pointInCurrentSR.lat] = {};
				}
				if (!this.multiMarkersOnMap[mboInfo.pointInCurrentSR.lat][mboInfo.pointInCurrentSR.lng])
				{
					this.multiMarkersOnMap[mboInfo.pointInCurrentSR.lat][mboInfo.pointInCurrentSR.lng] = {};
				}
			};
			/*
			 * Returns the stored multi marker info for the given MBO.
			 */
			this.getMultiMarkerInfo = function(mboInfo)
			{
				if (mboInfo == null || !mboInfo.pointInCurrentSR)
				{
					return null;
				}
				if (!this.multiMarkersOnMap[mboInfo.pointInCurrentSR.lat])
				{
					return null;
				}
				if (!this.multiMarkersOnMap[mboInfo.pointInCurrentSR.lat][mboInfo.pointInCurrentSR.lng])
				{
					return null;
				}
				return this.multiMarkersOnMap[mboInfo.pointInCurrentSR.lat][mboInfo.pointInCurrentSR.lng];
			};

			/*
			 * Returns the stored multi marker info for the given MBO. 
			 * This function uses the lat/lng in gisdata to retrieve the info 
			 * instead of the lat/lng in pointInCurrentSR.
			 */
			this.getMultiMarkerInfoUsingGisData = function(mbo)
			{
				if (mbo == null || !mbo.gisdata)
				{
					return null;
				}
				if (!this.multiMarkersOnMap[mbo.gisdata.lat])
				{
					return null;
				}
				if (!this.multiMarkersOnMap[mbo.gisdata.lat][mbo.gisdata.lng])
				{
					return null;
				}
				return this.multiMarkersOnMap[mbo.gisdata.lat][mbo.gisdata.lng];
			};
		}
	});

});

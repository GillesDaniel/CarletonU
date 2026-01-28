// wrapped by build app
define("ibm/tivoli/fwm/mxmap/toolbar/ext/QueryNearResources", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/toolbar/ext/_ComboTool,dijit/form/Button"], function(dijit,dojo,dojox){
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


dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryNearResources");

dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ComboTool");
dojo.require("dijit.form.Button");

/**
 * Query nearby resources tool
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryNearResources", ibm.tivoli.fwm.mxmap.toolbar.ext._ComboTool, {
	label: "Nearby resources",
	iconClass: "basicMapToolbarBtn nearbyResourcesMapToolbarBtn",
	map: null,
	nearbyCrewsLabel: "",
	nearbyLaborsLabel: "",
	allLaborAndCrewsLabel: "",
	laborAndCrewsOnShiftLabel: "",
	constructor: function(params)
	{
		dojo.mixin(this, params);
		var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "nearresourcestool");
		this.label = _label || this.label;
		this.nearbyCrewsLabel = ibm.tivoli.fwm.i18n.getMaxMsg("map", "nearbycrews");
		this.nearbyLaborsLabel = ibm.tivoli.fwm.i18n.getMaxMsg("map", "nearbylabors");
		this.laborAndCrewsOnShiftLabel = ibm.tivoli.fwm.i18n.getMaxMsg("map", "laborandcrewsonshift");
		this.allLaborAndCrewsLabel = ibm.tivoli.fwm.i18n.getMaxMsg("map", "alllaborandcrews");
		
		this._initMenuItems();

		this.addSubscription("onMapRefresh_" + this.map.getId(), dojo.hitch(this, this._onMapRefresh));
	},
	_initMenuItems: function()
	{
		this.addMenuItem("onSameShiftAsUser", this.laborAndCrewsOnShiftLabel, true);
		this.addMenuItem("all", this.allLaborAndCrewsLabel);
	},
	updateLayers: function(crewsData, laborsData, refreshOptions)
	{
		var isAutomaticRefresh = refreshOptions && refreshOptions.automatic;
		var avoidLayerEnabled = false;
		if (refreshOptions) // if this parameter exists, it's a refresh and we don't enable the layers
		{
			avoidLayerEnabled = true;
		}
		if (crewsData && crewsData.length > 0)
		{
			this._sendEventToLayer(this.nearbyCrewsLabel, crewsData, avoidLayerEnabled);
		}
		else
		{
			this._sendEventToRemoveLayer(this.nearbyCrewsLabel);
		}
		if (laborsData && laborsData.length > 0)
		{
			this._sendEventToLayer(this.nearbyLaborsLabel, laborsData, avoidLayerEnabled);
		}
		else
		{
			this._sendEventToRemoveLayer(this.nearbyLaborsLabel);
		}
		if (isAutomaticRefresh != true && laborsData.length == 0 && crewsData.length == 0)
		{
			this.setActive(false);
			this.map.getMaximo().showMessage("mapserver", "noresourcesinarea");
		}
	},
	disable: function()
	{

	},
	destroy: function()
	{
		this.destroyRecursive();
	},
	// util method - gets an array of lbs data to send to spatial for conversion
	// returns null if records is null or any record in records does not have
	// lbsdata.
	_getLBSData: function(records)
	{
		var array = [];
		if (records)
		{
			for ( var index in records)
			{
				if (records[index].lbsdata)
				{
					array.push(records[index].lbsdata);
				}
				else
				{
					console.warn("[QueryNearResouces] Records has a record without lbsdata.", records);
					return null;
				}
			}
		}
		else
		{
			console.warn("[QueryNearResouces] Records has a record without lbsdata.", records);
			return null;
		}
		return array;
	},

	// util function to add the records in the new layer.
	_sendEventToLayer: function(layerName, layerData, avoidLayerEnabled)
	{
		dojo.publish("addRecordsToLayer_" + this.map.getId(), [ layerName, layerData, true, null, null, avoidLayerEnabled ]);
	},
	_sendEventToRemoveLayer: function(layerName)
	{
		dojo.publish("removeLayer_" + this.map.getId(), [ layerName ]);
	},
	// Enables the Nearby Resources tool (show nearby resources)
	executeOn: function(params)
	{
		var fct = function(data)
		{
			if (data.status == "TOOMANYRECORDS")
			{
				this.setActive(false);
				this.map.getMaximo().showMessage(data.error.group, data.error.key, [data.error.params]);
				return;
			}
			var crewsData = data.crews;
			var laborsData = data.labors;

			/*
			 * just a small perf improvement to cache all the LBS points
			 * conversion to current coordsystem at once
			 */
			
			var toProject = [];
			if (crewsData != null)
				toProject.join(this._getLBSData(crewsData));
			if (laborsData != null)
				toProject.join(this._getLBSData(laborsData));
			if (toProject.length > 0)
			{
				this.map.getAllPointsFromWGS84(toProject, dojo.hitch(this, function()
				{
					/*
					 * do not update the crews/labor data. Map is aware these
					 * are WGS84 if we convert it here, it will get converted
					 * again later in the code, so we need to keep it in wgs84
					 */
					this.updateLayers(crewsData, laborsData, params.refreshOptions);
				}), dojo.hitch(this, function(error)
				{
					if (error && error.msgkey)
					{
						this.map.getMaximo().showMessage(error.msggroup, error.msgkey);
					}
				}));
			}
			else
			{
				this.updateLayers(crewsData, laborsData, params.refreshOptions);
			}
		};

		var fctErr = function(data)
		{
			console.warn("[QueryNearResources] Error querying nearby resources", data);
		};

		var bounds = this.map.getBounds();
		var auxFct = function(ps)
		{
			var xlatedBounds = this.map.getBoundingBoxFromPoints(ps);
			var queryOption = (params.menuItem != undefined) ? params.menuItem.id : "all";
			var queryParams = {"bounds": xlatedBounds, "filterOption": queryOption};
			this.map.getMaximo().getCrewLaborByQueryParams(dojo.hitch(this, fct), dojo.hitch(this, fctErr), queryParams);
		};
		// resources always use LBS that is in wgs84 so we need to convert the
		// boundaries to this coordinate system
		this.map.getAllPointsInWGS84([ bounds.sw, bounds.ne ], dojo.hitch(this, auxFct));
	},
	// Disables the Nearby Resources tool (hides nearby resources)
	executeOff: function()
	{
		this._sendEventToRemoveLayer(this.nearbyLaborsLabel);
		this._sendEventToRemoveLayer(this.nearbyCrewsLabel);
	},
	_onMapRefresh: function(refreshOpts)
	{
		if (this.isActive() == true)
		{
			this.executeOff();
			this.executeOn({refreshOptions: refreshOpts});
		}
	}
});

});

// wrapped by build app
define("ibm/tivoli/fwm/mxmap/toolbar/ext/QueryWeatherAlerts", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/toolbar/ext/_ToggleTool,dijit/form/Button"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryWeatherAlerts");

dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool");
dojo.require("dijit.form.Button");

/**
 * Query nearby resources tool
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryWeatherAlerts", ibm.tivoli.fwm.mxmap.toolbar.ext._ToggleTool, {
	label: "Weather Alerts",
	iconClass: "basicMapToolbarBtn weatherAlertsMapToolbarBtn",
	map: null,
	constructor: function(params)
	{
		dojo.mixin(this, params);
		var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "weatheralertstool");
		this.label = _label || this.label;

		this.addSubscription("onMapRefresh_" + this.map.getId(), dojo.hitch(this, this._onMapRefresh));
	},
	updateLayers: function(weatherAlertsData, refreshOptions)
	{
		var isAutomaticRefresh = refreshOptions && refreshOptions.automatic;
		var avoidLayerEnabled = false;
		if (refreshOptions) // if this parameter exists, it's a refresh and we don't enable the layers
		{
			avoidLayerEnabled = true;
		}
		if (weatherAlertsData && weatherAlertsData.length > 0)
		{
			this._sendEventToLayer(this.label, weatherAlertsData, avoidLayerEnabled);
		}
		else
		{
			this._sendEventToRemoveLayer(this.label);
		}
		if (isAutomaticRefresh != true && weatherAlertsData.length == 0)
		{
			this.setActive(false);
			this.map.getMaximo().showMessage("mapserver", "noweatheralertsinarea");
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
	// returns null if records is null or any record in records does not have lbsdata.
	_getLBSData: function(records)
	{
		var array = [];
		if (records)
		{
			for (var index in records)
			{
				if (records[index].lbsdata)
				{
					array.push(records[index].lbsdata);
				}
				else
				{
					console.warn("[QueryWeatherAlerts] Records has a record without lbsdata.", records);
					return null;
				}
			}
		}
		else
		{
			console.warn("[QueryWeatherAlerts] Records has a record without lbsdata.", records);
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
	// Enables the Weather Alerts tool
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
			var weatherAlertsData = data.weatherAlerts;

			/*
			 * just a small perf improvement to cache all the LBS points
			 * conversion to current coordsystem at once
			 */
			var toProject = [];
			if (weatherAlertsData != null)
				toProject.join(this._getLBSData(weatherAlertsData));
			if (toProject.length > 0)
			{
				this.map.getAllPointsFromWGS84(toProject, dojo.hitch(this, function()
				{
					/*
					 * do not update the weather alerts data. Map is aware these
					 * are WGS84 if we convert it here, it will get converted
					 * again later in the code, so we need to keep it in wgs84
					 */
					this.updateLayers(weatherAlertsData, params.refreshOptions);
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
				this.updateLayers(weatherAlertsData, params.refreshOptions);
			}
		};

		var fctErr = function(data)
		{
			console.warn("[QueryWeatherAlerts] Error querying nearby resources", data);
		};

		var bounds = this.map.getBounds();
		var auxFct = function(ps)
		{
			var xlatedBounds = this.map.getBoundingBoxFromPoints(ps);
			var queryOption = (params.menuItem != undefined) ? params.menuItem.id : "all";
			var queryParams = {"bounds": xlatedBounds, "filterOption": queryOption};
			this.map.getMaximo().getWeatherAlertsByQueryParams(dojo.hitch(this, fct), dojo.hitch(this, fctErr), queryParams);
		};
		// resources always use LBS that is in wgs84 so we need to convert the
		// boundaries to this coordinate system
		this.map.getAllPointsInWGS84([ bounds.sw, bounds.ne ], dojo.hitch(this, auxFct));
	},
	// Disables the Nearby Resources tool (hides nearby resources)
	executeOff: function()
	{
		this._sendEventToRemoveLayer(this.label);
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

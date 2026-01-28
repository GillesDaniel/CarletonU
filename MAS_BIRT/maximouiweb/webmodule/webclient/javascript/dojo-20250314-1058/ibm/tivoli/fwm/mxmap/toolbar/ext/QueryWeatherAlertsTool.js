// wrapped by build app
define("ibm/tivoli/fwm/mxmap/toolbar/ext/QueryWeatherAlertsTool", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/toolbar/ext/QueryWeatherAlerts"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryWeatherAlertsTool");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryWeatherAlerts");

/**
 * Query nearby resources tool (with one more menu option)
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryWeatherAlertsTool", ibm.tivoli.fwm.mxmap.toolbar.ext.QueryWeatherAlerts, {
	
	// This version of _sendEventToLayer tries to append routeInfo to the resource record
	// so that the route color can be obtained and the icon color can match the route color
	_sendEventToLayer: function(layerName, layerData, avoidLayerEnabled)
	{
		var disp = this.map.getDispatcher();
		if(disp)
		{
			for (var i in layerData)
			{
				// Convert location accuracy from kilometers to meters.
				layerData[i].lbsdata.location_accuracy = layerData[i].lbsdata.location_accuracy * 1000;
			}

		}
		dojo.publish("addRecordsToLayer_" + this.map.getId(), [ layerName, layerData, true, null, null, avoidLayerEnabled ]);
	}
});

});

// wrapped by build app
define("ibm/tivoli/fwm/mxmap/toolbar/ext/QueryNearResourcesDispatcher", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/toolbar/ext/QueryNearResources"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryNearResourcesDispatcher");
dojo.require("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryNearResources");

/**
 * Query nearby resources tool (with one more menu option)
 */
dojo.declare("ibm.tivoli.fwm.mxmap.toolbar.ext.QueryNearResourcesDispatcher", ibm.tivoli.fwm.mxmap.toolbar.ext.QueryNearResources, {
	laborAndCrewsOnListLabel: "",
	_initMenuItems: function()
	{
		this.laborAndCrewsOnListLabel = ibm.tivoli.fwm.i18n.getMaxMsg("map", "laborandcrewsonlist");
		this.addMenuItem("onSameShiftAsList", this.laborAndCrewsOnShiftLabel, true);
		this.addMenuItem("onList", this.laborAndCrewsOnListLabel);
		this.addMenuItem("all", this.allLaborAndCrewsLabel);
	},
	
	// This version of _sendEventToLayer tries to append routeInfo to the resource record
	// so that the route color can be obtained and the icon color can match the route color
	_sendEventToLayer: function(layerName, layerData, avoidLayerEnabled)
	{
		var disp = this.map.getDispatcher();
		if(disp)
		{
			for (var i = 0; i < layerData.length; i++)
			{
				// Resource can be either labor (type LABOR) or crew (type AMCREW)
				var resourceType = layerData[i].mxdata.extendsMboName;

				// If the resource is a labor, the ID attribute is "laborcode". if the resource is a crew, the ID is "amcrew"
				var resourceId = (layerData[i].mxdata.attributes.laborcode != undefined) ? layerData[i].mxdata.attributes.laborcode : layerData[i].mxdata.attributes.amcrew;
				layerData[i].routeInfo = disp.getRouteInfoForResource(resourceType, resourceId);
			}

		}
		dojo.publish("addRecordsToLayer_" + this.map.getId(), [ layerName, layerData, true, null, null, avoidLayerEnabled ]);
	}
});

});

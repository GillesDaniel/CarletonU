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

dojo.require("ibm.tivoli.fwm.mxmap._LatLonPoint");
dojo.provide("ibm.tivoli.fwm.mxmap.impl.point.GmapsLatLonPoint");

/**
 * GmapsLatLonPoint
 */
dojo.declare("ibm.tivoli.fwm.mxmap.impl.point.GmapsLatLonPoint", ibm.tivoli.fwm.mxmap._LatLonPoint, {
	
	toProprietary: function()
	{
		return new google.maps.LatLng(this.lat, this.lon);
	},

	fromProprietary: function(googlePoint)
	{
		this.lat = googlePoint.lat();
		this.lon = googlePoint.lng();
		this.lng = googlePoint.lng();
	}
	
});

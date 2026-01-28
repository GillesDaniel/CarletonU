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
dojo.provide("ibm.tivoli.fwm.mxmap.impl.point.BingLatLonPoint");

/**
 * BingLatLonPoint
 */
dojo.declare("ibm.tivoli.fwm.mxmap.impl.point.BingLatLonPoint", ibm.tivoli.fwm.mxmap._LatLonPoint, {
	
	/**
	 * Returns a new proprietary instance of Microsoft.Maps.Location object.
	 */
	toProprietary: function()
	{
		return new Microsoft.Maps.Location(this.lat, this.lon);
	},

	/**
	 * Encapsulates the latitute/longitude coordinates into lat/lon
	 * mapstraction attributes.
	 */
	fromProprietary: function(mpoint)
	{
		// Converts from Microsoft Point to LatLng
		if((mpoint.latitude != undefined) && (mpoint.latitude != undefined))
		{
			this.lat = mpoint.latitude;
			this.lon = mpoint.longitude;
			this.lng = mpoint.longitude;
		}
		// Just another way of parsing the lat/lon point (MS Point returned from Bing REST API)
		else if(mpoint.coordinates != undefined)
		{
			this.lat = mpoint.coordinates[0];
			this.lon = mpoint.coordinates[1];
			this.lng = mpoint.coordinates[1];
		}
	}
	
});

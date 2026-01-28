// wrapped by build app
define("ibm/tivoli/fwm/mxmap/impl/boundingbox/BingBoundingBox", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_BoundingBox"], function(dijit,dojo,dojox){
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

dojo.require("ibm.tivoli.fwm.mxmap._BoundingBox");
dojo.provide("ibm.tivoli.fwm.mxmap.impl.boundingbox.BingBoundingBox");

dojo.declare("ibm.tivoli.fwm.mxmap.impl.boundingbox.BingBoundingBox", ibm.tivoli.fwm.mxmap._BoundingBox, {
	
	_init: function(swLat, swLon, neLat, neLon)
	{
		// FIXME throw error if box bigger than world
		// alert('new bbox ' + swlat + ',' + swlon + ',' + nelat + ',' + nelon);
		this.sw = new ibm.tivoli.fwm.mxmap.impl.point.BingLatLonPoint({lat: swLat, lon: swLon, lng: swLon});
		this.ne = new ibm.tivoli.fwm.mxmap.impl.point.BingLatLonPoint({lat: neLat, lon: neLon, lng: neLon});
	}
});

});

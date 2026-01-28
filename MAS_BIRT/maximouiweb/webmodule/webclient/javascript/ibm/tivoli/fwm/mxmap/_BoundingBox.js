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


define(["dojo/_base/declare"], function(declare) {
	return declare( null, {

		sw: null,
		ne: null,
		/**
		 * BoundingBox creates a new bounding box object
		 * 
		 * @name mxn.BoundingBox
		 * @constructor
		 * @param {double}
		 *            swlat the latitude of the south-west point
		 * @param {double}
		 *            swlon the longitude of the south-west point
		 * @param {double}
		 *            nelat the latitude of the north-east point
		 * @param {double}
		 *            nelon the longitude of the north-east point
		 * @exports BoundingBox as mxn.BoundingBox
		 */
		constructor: function(swLat, swLon, neLat, neLon)
		{
			this._init(swLat, swLon, neLat, neLon);
		},

		_init: function(swLat, swLon, neLat, neLon)
		{
			// FIXME throw error if box bigger than world
			// alert('new bbox ' + swlat + ',' + swlon + ',' + nelat + ',' + nelon);
			this.sw = new ibm.tivoli.fwm.mxmap._LatLonPoint({lat: swLat, lon: swLon, lng: swLon});
			this.ne = new ibm.tivoli.fwm.mxmap._LatLonPoint({lat: neLat, lon: neLon, lng: neLon});
		},

		/**
		 * getSouthWest returns a LatLonPoint of the south-west point of the
		 * bounding box
		 * 
		 * @returns the south-west point of the bounding box
		 * @type LatLonPoint
		 */
		getSouthWest: function()
		{
			return this.sw;
		},

		/**
		 * getNorthEast returns a LatLonPoint of the north-east point of the
		 * bounding box
		 * 
		 * @returns the north-east point of the bounding box
		 * @type LatLonPoint
		 */
		getNorthEast: function()
		{
			return this.ne;
		},

		merge: function(bbox)
		{
			if(bbox)
			{
				this.extend(bbox.sw);
				this.extend(bbox.ne);
			}
		},
		/**
		 * extend extends the bounding box to include the new point
		 */
		extend: function(point)
		{
			// console.log(this.sw.lat,point.lat,(this.sw.lat > point.lat));
			// console.log(this.sw.lon,point.lon,(this.sw.lon > point.lon));
			// console.log(this.ne.lat,point.lat,(this.ne.lat < point.lat));
			// console.log(this.ne.lon,point.lon,(this.ne.lon < point.lon));

			if(point)
			{
				if (this.sw.lat > point.lat)
				{
					this.sw.lat = point.lat;
				}
				if (this.sw.lng > point.lng)
				{
					this.sw.lng = this.sw.lon = point.lng;
				}
				if (this.ne.lat < point.lat)
				{
					this.ne.lat = point.lat;
				}
				if (this.ne.lng < point.lng)
				{
					this.ne.lng = this.ne.lon = point.lng;
				}
			}
			return;
		}
	});
});

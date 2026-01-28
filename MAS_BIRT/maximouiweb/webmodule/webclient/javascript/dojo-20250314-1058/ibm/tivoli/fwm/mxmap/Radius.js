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


define("ibm/tivoli/fwm/mxmap/Radius", ["dojo/_base/declare"], function(declare) {
	return declare( null, {

		/**
		 * Creates a new radius object for drawing circles around a point, does a
		 * lot of initial calculation to increase load time
		 * 
		 * @name mxn.Radius
		 * @constructor
		 * @param {LatLonPoint}
		 *            center LatLonPoint of the radius
		 * @param {Number}
		 *            quality Number of points that comprise the approximated circle
		 *            (20 is a good starting point)
		 * @exports Radius as mxn.Radius
		 */
		constructor: function(params)
		{
			dojo.mixin(this, params);
			if(this.center && this.quality)
			{
				var _latConv = this.center.latConv();
				var _lonConv = this.center.lonConv();

				// Create Radian conversion constant
				var rad = Math.PI / 180;
				this.calcs = [];

				for ( var i = 0; i < 360; i += this.quality)
				{
					this.calcs.push([ Math.cos(i * rad) / _latConv, Math.sin(i * rad) / _lonConv ]);
				}
			}
		},

		/**
		 * Returns polyline of a circle around the point based on new radius
		 * 
		 * @param {Radius}
		 *            radius
		 * @param {Color}
		 *            color
		 * @returns {Polyline} Polyline
		 */
		getPolyline: function(radius, color)
		{
			var points = [];
			for ( var i = 0; i < this.calcs.length; i++)
			{
				var point = this.map.latLng(this.center.lat + (radius * this.calcs[i][0]), this.center.lon + (radius * this.calcs[i][1]));
				points.push(point);
			}

			// Add first point
			points.push(points[0]);

			var line = this.map.polyline({points: points});
			line.setColor(color);

			return line;
		}
	});
});

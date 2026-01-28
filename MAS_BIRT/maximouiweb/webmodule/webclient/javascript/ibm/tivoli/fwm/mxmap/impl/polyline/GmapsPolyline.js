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

dojo.require("ibm.tivoli.fwm.mxmap._Polyline");
dojo.provide("ibm.tivoli.fwm.mxmap.impl.polyline.GmapsPolyline");

/**
 * GmapsPolyline
 */
dojo.declare("ibm.tivoli.fwm.mxmap.impl.polyline.GmapsPolyline", ibm.tivoli.fwm.mxmap._Polyline, {
	
	toProprietary: function()
	{
		var points = [];
		for ( var i = 0; i < this.points.length; i++)
		{
			points.push(this.points[i].toProprietary('googlev3'));
		}
		var polyline = null;
		/* if it is closed, created a polygon */
		if (this.closed && this.closed == true)
		{
			var polygonOptions = {
				paths: [ points ],
				fillColor: this.fillColor || '#000000',
				fillOpacy: this.opacity || 1.0,
				strokeColor: this.color || '#000000',
				strokeOpacity: this.borderOpacity || 1.0,
				strokeWeight: this.width || 3,
				clickable: false,
				editable: false
			};
			polyline = new google.maps.Polygon(polygonOptions);
		}
		else
		{
			var polyOptions = {
				path: points,
				strokeColor: this.color || '#000000',
				strokeOpacity: this.opacity || 1.0,
				strokeWeight: this.width || 3,
				clickable: false
			};

			polyline = new google.maps.Polyline(polyOptions);
		}

		return polyline;
	}

});

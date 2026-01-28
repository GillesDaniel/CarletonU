// wrapped by build app
define("ibm/tivoli/fwm/mxmap/impl/polyline/BingPolyline", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Polyline"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.impl.polyline.BingPolyline");

/**
 * BingPolyline
 */
dojo.declare("ibm.tivoli.fwm.mxmap.impl.polyline.BingPolyline", ibm.tivoli.fwm.mxmap._Polyline, {
	
	toProprietary: function() 
	{
		var mpoints = [];
	
		for ( var i = 0; i < this.points.length; i++)
		{
			mpoints.push(this.points[i].toProprietary('microsoftv8'));
		}
		var mpolyline = null;
		var opacity = this.opacity ? Math.round(this.opacity * 255) : 255;
		var color = Microsoft.Maps.Color.fromHex(this.color);
		// 12-13693. Using the correct stroke width for route lines.
		var strokeWidth = this.width || 3;
		var borderOpacity = this.borderOpacity ? Math.round(this.borderOpacity * 255) : 255;

		// 12-10633
		if (this.fillColor)
		{
			var fillColor = Microsoft.Maps.Color.fromHex(this.fillColor);
			var fillColorWithOpacity = new Microsoft.Maps.Color(opacity, fillColor.r, fillColor.g, fillColor.b);
		}
	
		/* if it is closed, created a polygon */
		if (this.closed && this.closed == true)
		{
			color.a = borderOpacity;
			mpolyline = new Microsoft.Maps.Polygon(mpoints, {
				fillColor: fillColorWithOpacity || "#000000",
				strokeColor: color,
				strokeThickness: strokeWidth,
				visible: true
			});
		}
		else
		{
			// 12-13693. Using the correct stroke opacity for route lines.
			color.a = opacity;
			mpolyline = new Microsoft.Maps.Polyline(mpoints, {
				strokeColor: color,
				strokeThickness: strokeWidth,
				visible: true
			});
		}
		this.proprietary_polyline = mpolyline;
		return mpolyline;
	},
	/**
	 * Shows the polyline.
	 */
	show: function()
	{
		this.proprietary_polyline.setOptions({
			visible: true
		});
	},

	/**
	 * Hide the polyline.
	 */
	hide: function()
	{
		this.proprietary_polyline.setOptions({
			visible: false
		});
	}

});

});

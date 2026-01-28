/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

define(["dojo/_base/declare", "./Default"], function(declare, Default){

	return declare("dojox.charting.plot2d.Markers", Default, {
		// summary:
		//		A convenience plot to draw a line chart with markers.
		constructor: function(){
			// summary:
			//		Set up the plot for lines and markers.
			this.opt.markers = true;
		}
	});
});

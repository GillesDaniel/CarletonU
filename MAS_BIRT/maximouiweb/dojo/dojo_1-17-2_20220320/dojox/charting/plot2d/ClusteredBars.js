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

define(["dojo/_base/declare", "dojo/_base/array", "./Bars", "./common"], 
	function(declare, array, Bars, dc){

	return declare("dojox.charting.plot2d.ClusteredBars", Bars, {
		// summary:
		//		A plot representing grouped or clustered bars (horizontal bars)
		getBarProperties: function(){
			var length = this.series.length;
			array.forEach(this.series, function(serie){if(serie.hidden){length--;}});
			var f = dc.calculateBarSize(this._vScaler.bounds.scale, this.opt, length);
			return {gap: f.gap, height: f.size, thickness: f.size};
		}
	});
});

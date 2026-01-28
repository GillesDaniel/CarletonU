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

define("dojox/charting/plot2d/ClusteredColumns", ["dojo/_base/declare", "dojo/_base/array", "./Columns", "./common"], 
	function(declare, array, Columns, dc){

	return declare("dojox.charting.plot2d.ClusteredColumns", Columns, {
		// summary:
		//		A plot representing grouped or clustered columns (vertical bars)
		getBarProperties: function(){
			var length = this.series.length;
			array.forEach(this.series, function(serie){if(serie.hidden){length--;}});
			var f = dc.calculateBarSize(this._hScaler.bounds.scale, this.opt, length);
			return {gap: f.gap, width: f.size, thickness: f.size, clusterSize: length};
		}
	});
});

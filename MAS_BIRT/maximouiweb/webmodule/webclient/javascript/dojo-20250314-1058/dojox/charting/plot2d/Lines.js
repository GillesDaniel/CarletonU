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

define("dojox/charting/plot2d/Lines", ["dojo/_base/declare", "./Default"], function(declare, Default){

	return declare("dojox.charting.plot2d.Lines", Default, {
		// summary:
		//		A convenience constructor to create a typical line chart.
		constructor: function(){
			// summary:
			//		Preset our default plot to be line-based.
			this.opt.lines = true;
		}
	});
});

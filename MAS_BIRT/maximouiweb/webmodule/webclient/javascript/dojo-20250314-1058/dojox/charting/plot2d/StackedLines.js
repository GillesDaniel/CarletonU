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

define("dojox/charting/plot2d/StackedLines", ["dojo/_base/declare", "./Stacked"], function(declare, Stacked){

	return declare("dojox.charting.plot2d.StackedLines", Stacked, {
		// summary:
		//		A convenience object to create a stacked line chart.
		constructor: function(){
			// summary:
			//		Force our Stacked base to be lines only.
			this.opt.lines = true;
		}
	});
});

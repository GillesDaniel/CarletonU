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

define("dojox/charting/themes/PlotKit/blue", ["./base", "../../Theme"], function(pk, Theme){
	pk.blue = pk.base.clone();
	pk.blue.chart.fill = pk.blue.plotarea.fill = "#e7eef6";
	pk.blue.colors = Theme.defineColors({hue: 217, saturation: 60, low: 40, high: 88});
	
	return pk.blue;
});

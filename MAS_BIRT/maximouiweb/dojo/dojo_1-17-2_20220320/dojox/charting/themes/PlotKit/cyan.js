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

define(["./base", "../../Theme"], function(pk, Theme){
	pk.cyan = pk.base.clone();
	pk.cyan.chart.fill = pk.cyan.plotarea.fill = "#e6f1f5";
	pk.cyan.colors = Theme.defineColors({hue: 194, saturation: 60, low: 40, high: 88});
	
	return pk.cyan;
});

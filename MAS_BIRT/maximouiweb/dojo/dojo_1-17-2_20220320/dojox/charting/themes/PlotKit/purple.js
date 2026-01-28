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
	pk.purple = pk.base.clone();
	pk.purple.chart.fill = pk.purple.plotarea.fill = "#eee6f5";
	pk.purple.colors = Theme.defineColors({hue: 271, saturation: 60, low: 40, high: 88});
	
	return pk.purple;
});

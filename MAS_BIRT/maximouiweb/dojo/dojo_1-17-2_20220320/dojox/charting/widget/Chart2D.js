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

define(["dojo/_base/kernel", "dojo/_base/lang", "./Chart", "../Chart2D",
	"../action2d/Highlight", "../action2d/Magnify", 
	"../action2d/MoveSlice", "../action2d/Shake", "../action2d/Tooltip"], function(kernel, lang, Chart) {
	kernel.deprecated("dojox.charting.widget.Chart2D", "Use dojo.charting.widget.Chart instead and require all other components explicitly", "2.0");
	return lang.setObject("dojox.charting.widget.Chart2D", Chart);
});

/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18, 5737-M66
 * 
 * (C) COPYRIGHT IBM CORP. 2014,2024 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

dojo.require("dojox.charting.Chart");

define("ibm/tivoli/mbs/dojox/charting/Chart", ["dojo/_base/lang", "dojo/_base/html", "dojox/charting/Chart"], function(lang, html, Chart){

	lang.extend(Chart, {
		getCoords: function(){
			//	summary:
			//		Get the coordinates and dimensions of the containing DOMNode, as
			//		returned by dojo.coords.
			//	returns: Object
			//		The resulting coordinates of the chart.  See dojo.coords for details.
         	return html.coords(this.node, true); // Object
		}
	});
});

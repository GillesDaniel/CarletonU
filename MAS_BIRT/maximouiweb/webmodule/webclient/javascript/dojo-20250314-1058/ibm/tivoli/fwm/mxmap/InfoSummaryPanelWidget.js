/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2011,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */

define("ibm/tivoli/fwm/mxmap/InfoSummaryPanelWidget", ["dojo/_base/declare",
	"dijit/_Widget",
	"dijit/_Templated"],
	function(declare, _Widget, _Templated ) {
	return declare([_Widget, _Templated], {
		templateString: dojo.cache("ibm.tivoli.fwm.mxmap", "templates/InfoSummaryPanelWidget.html", "<div class=\"text\">\n\t<div data-dojo-attach-point=\"infoSummaryPanel\"></div>\n</div>"),
		constructor:function(params)
		{
			dojo.mixin(this, params);				
		}
	});

});


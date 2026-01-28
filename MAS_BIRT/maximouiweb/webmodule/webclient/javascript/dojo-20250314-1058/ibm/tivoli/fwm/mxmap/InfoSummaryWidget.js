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

define("ibm/tivoli/fwm/mxmap/InfoSummaryWidget", ["dojo/_base/declare",
	"ibm/tivoli/fwm/mxmap/_Base",
	"dijit/_Widget",
	"dijit/_Templated"],
	function(declare, _Base,_Widget, _Templated) {
	return declare([_Widget, _Templated], {
		templateString: dojo.cache("ibm.tivoli.fwm.mxmap", "templates/InfoSummaryWidget.html", "<div>\n<table style=\"height:35px;\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td style=\"width: 90%;\">\n\t\t\t\t<div dojoAttachPoint=\"infoSummary\"></div>\n\t\t\t</td>\n\t\t\t<td style=\"padding: 0px 4px 0px 12px; height: 35px;\">\n\t\t\t\t<div dojoAttachPoint=\"rightArrow\"></div>\n\t\t\t</td>\n\t\t</tr>\n\t</tbody>\n</table>\n</div>"),
		_openBubbleFunction: null,
		constructor:function(params)
		{
			dojo.mixin(this, params);				
		},
		postCreate:function()
		{	
			var me = this;
			this._setArrowIcon();
			// Defect 66953: Cannot use dojoAttachEvent in the html template to attach more than one event
			// to the same dojoAttachPoint (maybe a bug in dojo?), so the solution is to make 2 connections
			// for each dojoAttachPoint.
			// The "touchend" connections are for mobile devices
			dojo.connect(this.infoSummary, "click", function(evt)
					{
				me._executeMarkerOpenBubble();
					});
			dojo.connect(this.infoSummary, "touchend", function(evt)
					{
				me._executeMarkerOpenBubble();
					});
			dojo.connect(this.rightArrow, "click", function(evt)
					{
				me._executeMarkerOpenBubble();
					});
			dojo.connect(this.rightArrow, "touchend", function(evt)
					{
				me._executeMarkerOpenBubble();
					});

		},
		setContent:function(content)
		{
			if(typeof(content) == 'object'){
				this._setDomContent(content);
			}else{
				dojo.empty(this.infoSummary);
				dojo.create("div",{innerHTML:content},this.infoSummary);
			}
		},
		_setDomContent:function(domToAppend){
			dojo.place(domToAppend, this.infoSummary, "only");
		},
		// This method is executed whenever the section is clicked
		_executeMarkerOpenBubble: function()
		{
			if(this._openBubbleFunction)
			{
				this._openBubbleFunction();
			}
		},
		destroyRecursive: function()
		{
			this.inherited(arguments);
			if(this._arrowImageDom){
				dojo.destroy(this._arrowImageDom);
			}
		},
		_setArrowIcon: function()
		{
			var arrowIconURL = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getLayerDetailsImageInfo().imageUrl;
			this._arrowImageDom = dojo.create("img",{src: arrowIconURL},this.rightArrow,"last");
		},
		// Set the specific marker openBubble function to be executed when this section is clicked
		setMarkerOpenBubbleFunction: function(openBubbleFunction)
		{
			this._openBubbleFunction = openBubbleFunction;
		}
	});
});		


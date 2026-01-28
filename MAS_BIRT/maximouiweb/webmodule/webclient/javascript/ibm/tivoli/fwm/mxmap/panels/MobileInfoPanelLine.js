/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2012,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */

define(["dojo/_base/declare",
	"dijit/_Widget",
	"dijit/_Templated"],
	 function(declare, _Widget, _Templated  ) {
	
	return declare([_Widget, _Templated], {
		templatePath: dojo.moduleUrl("ibm.tivoli.fwm.mxmap", "templates/MobileInfoPanelLine.html"),	
		domNode:null,
		row: null,
		content: null,
		clickable: null,	
		constructor : function(options) {
			dojo.mixin(this,options);
		},
		postCreate:function(){
			dojo.parser.parse(this.domNode);		
		},	
		setCallbackFunction: function(callback)
		{
			this.clickable.onclick = callback;
		},
		setRowClass: function(newClass)
		{
			dojo.addClass(this.row, newClass);
		},
		setContent: function(content)
		{
			this.content.textContent = content;
		}
	});

});

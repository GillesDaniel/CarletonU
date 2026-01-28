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

define("dojox/mobile/bidi/ToolBarButton", [
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class"
], function(declare, lang, domClass){

	// module:
	//		dojox/mobile/ToolBarButton

	return declare(null, {
		buildRendering: function(){
			this.inherited(arguments);
			//dojox.mobile mirroring support
			if(!this.isLeftToRight() && this.arrow){
				var cRemove1 = (this.arrow === "left" ? "mblToolBarButtonLeftArrow" : "mblToolBarButtonRightArrow");
				var cRemove2 = (this.arrow === "left" ? "mblToolBarButtonHasLeftArrow" : "mblToolBarButtonHasRightArrow");
				var cAdd1 = (this.arrow === "left" ? "mblToolBarButtonRightArrow" : "mblToolBarButtonLeftArrow");
				var cAdd2 = (this.arrow === "left" ? "mblToolBarButtonHasRightArrow" : "mblToolBarButtonHasLeftArrow");
				domClass.remove(this.arrowNode, cRemove1);
				domClass.add(this.arrowNode, cAdd1);
				domClass.remove(this.domNode, cRemove2);
				domClass.add(this.domNode, cAdd2);
			}
		},
		_setLabelAttr: function(/*String*/text){
			// summary:
			//		Sets the button label text.
			this.inherited(arguments);
			// dojox.mobile mirroring support
			if(!this.isLeftToRight()){
				domClass.toggle(this.tableNode, "mblToolBarButtonTextRtl", text || this.arrow);
			}
		}
	});
});

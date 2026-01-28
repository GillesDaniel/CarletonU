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

define("dojox/mobile/bidi/_PickerBase", [
	"dojo/_base/declare",
	"dojo/dom-construct"
], function(declare, domConstruct){

	// module:
	//		dojox/mobile/bidi/_PickerBase

	return declare(null, {

		buildRendering:function(){
			this.inherited(arguments);
			if(!this.isLeftToRight()){
				for(var i = this.domNode.children.length; i > 0; i--){
					domConstruct.place(this.domNode.children[0], this.domNode.children[i - 1], "after");
				}
			}
		}
	});
});

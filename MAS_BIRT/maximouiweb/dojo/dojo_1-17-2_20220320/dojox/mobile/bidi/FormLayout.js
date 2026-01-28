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

define([
	"dojo/_base/declare",
	"dojo/dom-class"
], function(declare, domClass){

	// module:
	//		mobile/bidi/FormLayout

	return declare(null, {

		buildRendering:function(){
			this.inherited(arguments);
			if(!this.isLeftToRight() && this.rightAlign){
				domClass.add(this.domNode, "mblFormLayoutRightAlignRtl");
			}
		}
	});
});

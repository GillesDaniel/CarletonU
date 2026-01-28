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

define("dojox/mobile/EdgeToEdgeCategory", [
	"dojo/_base/declare",
	"./RoundRectCategory"
], function(declare, RoundRectCategory){

	// module:
	//		dojox/mobile/EdgeToEdgeCategory

	return declare("dojox.mobile.EdgeToEdgeCategory", RoundRectCategory, {
		// summary:
		//		A category header for an edge-to-edge list.
		buildRendering: function(){
			this.inherited(arguments);
			this.domNode.className = "mblEdgeToEdgeCategory";

			if(this.type && this.type == "long"){
				this.domNode.className += " mblEdgeToEdgeCategoryLong";
			}
		}
	});
});

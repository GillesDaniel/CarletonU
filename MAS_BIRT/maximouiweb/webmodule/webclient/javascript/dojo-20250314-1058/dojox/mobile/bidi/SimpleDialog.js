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

define("dojox/mobile/bidi/SimpleDialog", [
	"dojo/_base/declare"
], function(declare){

	// module:
	//		dojox/mobile/bidi/SimpleDialog

	return declare(null, {

		refresh:function(){
			this.inherited(arguments);
			if(!this.isLeftToRight() && this.closeButton){
				var s = Math.round(this.closeButtonNode.offsetHeight / 2);
				this.closeButtonNode.style.left = -s + "px";
			}
		}

	});
});


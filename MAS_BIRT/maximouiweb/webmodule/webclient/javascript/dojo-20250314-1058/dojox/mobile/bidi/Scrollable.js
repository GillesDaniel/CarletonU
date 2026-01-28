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

define("dojox/mobile/bidi/Scrollable", [
	"dojo/_base/declare"
], function(declare){

	// module:
	//		dojox/mobile/bidi/Scrollable

	return declare(null, {

		showScrollBar:function(){
			this.inherited(arguments);
			if(!this.isLeftToRight() && this._scrollBarWrapperV){
				this._scrollBarWrapperV.style.right = "auto";
				this._scrollBarWrapperV.style.left = "2px";
			}
		}

	});
});


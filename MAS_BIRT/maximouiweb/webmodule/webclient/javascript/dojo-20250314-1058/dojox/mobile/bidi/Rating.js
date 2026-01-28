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

define("dojox/mobile/bidi/Rating", [
	"dojo/_base/declare",
	"dojo/dom-style",
	"../_css3"
], function(declare, domStyle, css3){

	// module:
	//		mobile/bidi/Rating

	return declare(null, {

		_setCustomTransform:function(/*Object*/parent){
			domStyle.set(parent, css3.add({"float":"right"}, {transform:"scaleX(-1)"}));
			return parent;
		}
	});
});

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

define("dojox/mobile/dh/StringDataSource", [
	"dojo/_base/declare"
], function(declare){

	// module:
	//		dojox/mobile/dh/StringDataSource

	return declare("dojox.mobile.dh.StringDataSource", null, {
		// summary:
		//		A component that simply returns the given text.

		text: "",

		constructor: function(/*String*/ text){
			// summary:
			//		Creates a new instance of the class.
			this.text = text;
		},

		getData: function(){
			// summary:
			//		Returns the given text.			
			return this.text;
		}
	});
});

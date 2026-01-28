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
	"dojo/_base/declare"
], function(declare){

	// module:
	//		dojox/mobile/bidi/_StoreListMixin

	return declare(null, {
		// summary:
		//		Support for control over text direction for mobile _StoreListMixin and _DataListMixin.
		// description:
		//		Property textDir is set to created ListItem.
		//		This class should not be used directly.
		//		Mobile _StoreListMixin and _DataListMixin load this module when user sets "has: {'dojo-bidi': true }" in data-dojo-config.
		createListItem: function(item){
			var w = this.inherited(arguments);
			w.set("textDir", this.textDir);
			return w;
		}
	});
});

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
	"dojox/mobile/dh/DataHandler"
], function(declare, DataHandler){

	// module:
	//		dojox/mobile/tests/doh/MyDataHandler
	// summary:

	return declare("dojox.mobile.tsets.doh.DataHandler", DataHandler, {

		constructor: function(){
			console.log("This is MyDataHandler");
			window._MyDataHandlerFlag = true;
			this.inherited(arguments);
		}
	});
});

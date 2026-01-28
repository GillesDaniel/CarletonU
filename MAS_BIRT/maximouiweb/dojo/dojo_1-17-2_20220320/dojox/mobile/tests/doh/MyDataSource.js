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
	"dojox/mobile/dh/UrlDataSource"
], function(declare, UrlDataSource){

	return declare("dojox.mobile.tests.doh.MyDataSource", UrlDataSource, {
		constructor: function(){
			console.log("This is MyDataSource");
			window._MyDataSourceFlag = true;
			this.inherited(arguments);
		}
	});
});

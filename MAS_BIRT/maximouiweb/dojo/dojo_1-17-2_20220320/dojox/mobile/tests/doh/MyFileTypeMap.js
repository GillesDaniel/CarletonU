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
	"dojo/_base/lang"
], function(lang){

	var o = lang.getObject("dojox.mobile.tests.doh.MyFileTypeMap", true);

	o.map = {
		"html": "html",
		"json": "json",
		"mydata": "json"
	};

	o.add = function(/*String*/ key, /*String*/ contentType){
		this.map[key] = contentType;
	};

	o.getContentType = function(/*String*/ fileName){
		var fileType = (fileName || "").replace(/.*\./, "");
		return this.map[fileType];
	};
	
	console.log("This is MyFileTypeMap");
	window._MyFileTypeMapFlag = true;

	return o;

});

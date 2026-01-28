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

require(["dojox/app/build/buildControlApp"], function(bc){
});

var profile = {
	basePath: "..",
	releaseDir: "./layoutApp/release",
	action: "release",
	cssOptimize: "comments",
/*	multipleAppConfigLayers: true,*/
	packages:[{
		name: "dojo",
		location: "../../../dojo"
	},{
		name: "dijit",
		location: "../../../dijit"
	},{
		name: "layoutApp",
		location: "../../../dojox/app/tests/layoutApp",
		destLocation: "./dojox/app/tests/layoutApp"
	},{
		name: "dojox",
		location: "../../../dojox"
	}],
	layers: {
		"layoutApp/layoutApp": {
			include: [ "layoutApp/index.html" ]
		}
	}
};




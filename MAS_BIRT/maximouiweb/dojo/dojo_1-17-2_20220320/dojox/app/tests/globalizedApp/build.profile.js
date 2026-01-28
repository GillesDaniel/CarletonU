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
	releaseDir: "./globalizedApp/release",
	action: "release",
	cssOptimize: "comments",
	packages:[{
		name: "dojo",
		location: "../../../dojo"
	},{
		name: "dijit",
		location: "../../../dijit"
	},{
		name: "globalizedApp",
		location: "../../../dojox/app/tests/globalizedApp",
		destLocation: "./dojox/app/tests/globalizedApp"
	},{
		name: "dojox",
		location: "../../../dojox"
	}],
	layers: {
		"globalizedApp/globalizedApp": {
			include: [ "globalizedApp/index.html" ]
		}
	}
};




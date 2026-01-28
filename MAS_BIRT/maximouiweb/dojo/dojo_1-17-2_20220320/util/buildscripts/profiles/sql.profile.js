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

dependencies = {
	//This option configures dojox.storage to just include the Gears
	//storage provider for an offline use.
	dojoxStorageBuildOption: "offline",

	layers: [
		{
			name: "../dojox/sql.js",
			layerDependencies: [
			],
			dependencies: [
				"dojox.sql"
			]
		}
	],

	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ]
	]
};

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
	layers: [
		{
			name: "../dojox/storage/storage-browser.js",
			layerDependencies: [
			],
			dependencies: [
				"dojox.storage",
				"dojox.storage.GearsStorageProvider",
				"dojox.storage.WhatWGStorageProvider",
				"dojox.storage.FlashStorageProvider",
				"dojox.flash"
			]
		}
	],

	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		[ "themes", "../themes" ]
	]
};

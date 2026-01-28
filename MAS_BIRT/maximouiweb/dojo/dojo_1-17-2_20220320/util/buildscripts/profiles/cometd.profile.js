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
			name: "../dojox/cometd.js",
			dependencies: [
				"dojox.cometd"
			]
		}
	],

	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		[ "themes", "../themes" ]
	]
};

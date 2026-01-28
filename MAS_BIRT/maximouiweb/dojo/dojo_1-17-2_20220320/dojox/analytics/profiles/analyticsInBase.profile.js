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
			//name: "../dojox/analytics.js",
			name: "dojo.js",
                        dependencies: [
								"dojox.analytics",
								"dojox.analytics.plugins.dojo",
								"dojox.analytics.plugins.window",
								"dojox.analytics.plugins.consoleMessages",
								"dojox.analytics.plugins.mouseOver",
								"dojox.analytics.plugins.mouseClick",
								"dojox.analytics.plugins.touchPress",
								"dojox.analytics.plugins.touchMove",
								"dojox.analytics.plugins.gestureEvents",
								"dojox.analytics.plugins.idle"]
                }
	],

	prefixes: [
                [ "dojox", "../dojox" ],
                [ "dijit", "../dijit" ]
        ]
}

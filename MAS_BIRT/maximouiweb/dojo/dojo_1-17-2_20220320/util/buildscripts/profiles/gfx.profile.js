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
	action:"clean,release",
	optimize:"shrinksafe",
	stripConsole: "normal",
	layers: [{
		name: "dojo.js",
		dependencies: [
		"dojo.colors",
		"dojox.gfx",
		"dojox.gfx.util",
		"dojox.fx",
		"dojox.gfx.renderer",
		"dojox.gfx.svg_attach",
		"dojox.gfx.vml_attach",
		"dojox.gfx.silverlight_attach",
		"dojox.gfx.canvas_attach",
		"dojox.gfx.canvasWithEvents",
		"dojox.gfx.gradutils",
		"dojox.gfx.VectorText",
		"dojox.gfx.move"]}
	],
	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		[ "themes", "../themes" ]
	]
};

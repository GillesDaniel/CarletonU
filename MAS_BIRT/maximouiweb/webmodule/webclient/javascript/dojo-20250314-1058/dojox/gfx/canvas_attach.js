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

define("dojox/gfx/canvas_attach", ["dojo/_base/lang", "dojo/_base/kernel","dojox/gfx/canvas"], function(lang,kernel,canvas){
	lang.getObject("dojox.gfx.canvas_attach", true);
	kernel.experimental("dojox.gfx.canvas_attach");

	// not implemented
	canvas.attachSurface = canvas.attachNode = function(){
		return null;	// for now
	};

	return canvas;
});

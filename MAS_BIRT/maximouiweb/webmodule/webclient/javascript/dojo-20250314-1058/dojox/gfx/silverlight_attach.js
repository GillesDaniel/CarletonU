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

define("dojox/gfx/silverlight_attach", ["dojo/_base/kernel", "dojo/_base/lang", "./_base", "./silverlight"], 
  function(kernel, lang, g, sl){
	lang.getObject("dojox.gfx.silverlight_attach", true);
	kernel.experimental("dojox.gfx.silverlight_attach");
	
	sl.attachNode = function(node){
		// summary:
		//		creates a shape from a Node
		// node: Node
		//		a Silverlight node
		return null;	// not implemented
	};

	sl.attachSurface = function(node){
		// summary:
		//		creates a surface from a Node
		// node: Node
		//		a Silverlight node
		return null;	// dojox/gfx.Surface
	};
	
	return sl; // return augmented silverlight api
});

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

define(["dojo/_base/lang"],function(lang){
var fxArg = lang.getObject("dojox.fx._arg",true);
fxArg.StyleArgs = function(/*Object*/ args){
	// summary:
	//		The node and CSS class to use for style manipulations.
	// node: DOMNode
	//		The node to manipulate
	// cssClass: String
	//		The class to use during the manipulation
	this.node = args.node;
	this.cssClass = args.cssClass;
}

fxArg.ShadowResizeArgs = function(/*Object*/ args){
	// summary:
	//	The odd way to document object parameters.
	// x: Integer
	//	the width to set
	// y: Integer
	//	the height to set
	this.x = args.x;
	this.y = args.y;
}
return fxArg;
});

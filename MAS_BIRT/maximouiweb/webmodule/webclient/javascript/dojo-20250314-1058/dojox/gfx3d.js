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

// AMD-ID "dojox/gfx3d"
define("dojox/gfx3d", ["dojo/_base/kernel","dojox","./gfx3d/matrix","./gfx3d/_base","./gfx3d/object"], function(dojo,dojox) {
	dojo.getObject("gfx3d", true, dojox);

	/*=====
	 return {
	 // summary:
	 //		Deprecated.  Should require dojox/gfx3d modules directly rather than trying to access them through
	 //		this module.
	 };
	 =====*/

	return dojox.gfx3d;
});

/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2014,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

dojo.provide("ibm.tivoli.fwm.doh.fullscreen.StartedWithFullScreenOffAndChangedTwice");

dojo.require("ibm.tivoli.fwm.doh.fullscreen.FullScreen");
dojo.require('ibm.tivoli.fwm.mxmap.factory');
dojo.require('ibm.tivoli.fwm.i18n');
dojo.require('ibm.tivoli.fwm.doh.ConfigHelper');

dojo.declare("ibm.tivoli.fwm.doh.fullscreen.StartedWithFullScreenOffAndChangedTwice", [ibm.tivoli.fwm.doh.fullscreen.FullScreen], {
	name: "Started with Full Screen off and changed to on and back to off",
	constructor: function(params)
	{
		dojo.mixin(this, params);
	},	
	_validate: function(map)
	{
		console.log("My Map: **********", map);
		var baseParams = {width: map.getWidthInPixels() + "px", height: map.getHeightInPixels() + "px"};
		ibm.tivoli.fwm.doh.fullscreen.validateMapWithoutFullScreen(map, baseParams);
		map.fullScreenOn();
		ibm.tivoli.fwm.doh.fullscreen.validateMapWithFullScreen(map);
		map.fullScreenOff();
		ibm.tivoli.fwm.doh.fullscreen.validateMapWithoutFullScreen(map, baseParams);
	}
});


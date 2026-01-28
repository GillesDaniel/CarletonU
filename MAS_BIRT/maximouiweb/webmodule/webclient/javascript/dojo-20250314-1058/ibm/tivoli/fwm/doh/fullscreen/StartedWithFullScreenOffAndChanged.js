// wrapped by build app
define("ibm/tivoli/fwm/doh/fullscreen/StartedWithFullScreenOffAndChanged", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/doh/fullscreen/FullScreen,ibm/tivoli/fwm/mxmap/factory,ibm/tivoli/fwm/i18n,ibm/tivoli/fwm/doh/ConfigHelper"], function(dijit,dojo,dojox){
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

dojo.provide("ibm.tivoli.fwm.doh.fullscreen.StartedWithFullScreenOffAndChanged");

dojo.require("ibm.tivoli.fwm.doh.fullscreen.FullScreen");
dojo.require('ibm.tivoli.fwm.mxmap.factory');
dojo.require('ibm.tivoli.fwm.i18n');
dojo.require('ibm.tivoli.fwm.doh.ConfigHelper');

dojo.declare("ibm.tivoli.fwm.doh.fullscreen.StartedWithFullScreenOffAndChanged", [ibm.tivoli.fwm.doh.fullscreen.FullScreen], {		
	name: "Started with Full Screen off and not changed",
	constructor: function(params)
	{
		dojo.mixin(this, params);
	},	
	_validate: function(map)
	{
		var baseParams = {width: map.getWidthInPixels() + "px", height: map.getHeightInPixels() + "px"};
		ibm.tivoli.fwm.doh.fullscreen.validateMapWithoutFullScreen(map, baseParams);
	}
});

});

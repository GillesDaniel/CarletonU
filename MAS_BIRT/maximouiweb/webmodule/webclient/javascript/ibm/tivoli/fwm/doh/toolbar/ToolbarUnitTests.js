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

dojo.provide("ibm.tivoli.fwm.doh.toolbar.ToolbarUnitTests");
dojo.require("ibm.tivoli.fwm.doh.toolbar.RefresherToolTest");
dojo.require("ibm.tivoli.fwm.doh.toolbar.MyLocationToolTest");
dojo.require('ibm.tivoli.fwm.mxmap.factory');
dojo.require('ibm.tivoli.fwm.doh.gisdoh');
dojo.require('ibm.tivoli.fwm.i18n');
dojo.require('ibm.tivoli.fwm.doh.ConfigHelper');
/**
 * Toolbar unit test module
 */

// Retrieve the array of provider names
var PROVIDERNAMES = ibm.tivoli.fwm.doh.ConfigData.maps;

// Execute all tests for each provider
for ( var mapProvId = 0; mapProvId < PROVIDERNAMES.length; mapProvId++)
{
	var mapProvider = PROVIDERNAMES[mapProvId];
	ibm.tivoli.fwm.doh.ConfigHelper.provider = mapProvider;
	var mapProviderConf = {
		mapProvider: mapProvider
	};
	if(mapProvId == 0){
		doh.register("ToolbarUnitTests " + mapProvider, [ 
		                                                 // Run the RefresherToolTest for provider mapProvider
		                                         	    new ibm.tivoli.fwm.doh.toolbar.RefresherToolTest(mapProviderConf)
		                                         	]);
		doh.register("ToolbarUnitTests " + mapProvider, [ 
		                                                 // Run the MyLocationToolTest for provider mapProvider
		                                         	    new ibm.tivoli.fwm.doh.toolbar.MyLocationToolTest(mapProviderConf)
		                                         	]);
	}
}

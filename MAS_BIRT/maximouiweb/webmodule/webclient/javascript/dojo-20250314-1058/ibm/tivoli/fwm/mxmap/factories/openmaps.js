// wrapped by build app
define("ibm/tivoli/fwm/mxmap/factories/openmaps", ["dijit","dojo","dojox","dojo/require!dojo/io/script"], function(dijit,dojo,dojox){
/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2011,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
dojo.provide("ibm.tivoli.fwm.mxmap.factories.openmaps");
dojo.require("dojo.io.script");
/**
 * Factory to load openmaps maps api javascripts
 */
ibm.tivoli.fwm.mxmap.factories.openmaps = {
	/**
	 * After we load the openmaps javascripts this method is called. 
	 */
	apiLoaded : function() {
		console.log('***openmaps Maps API is now available');		
		ibm.tivoli.fwm.mxmap.factories.openmaps.loaded = true;
		ibm.tivoli.fwm.mxmap.factory.apiInitialized("ibm.tivoli.fwm.mxmap.impl.OpenMaps","openmaps");
	},
	/**
	 * method to be overriden by all map factory implementation 
	 * @param options
	 */
	init : function(options) {		
		console.log('***openmaps Maps API init');		
		
		this._loadJSApi();
	},
	/**
	 * this method loads the openmaps api.
	 */
	_loadJSApi : function() {
				console.log('***openmaps Maps API _loadJSApi');		

	}
};

});

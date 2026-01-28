// wrapped by build app
define("ibm/tivoli/fwm/mxmap/factories/gmaps", ["dijit","dojo","dojox","dojo/require!dojo/io/script,ibm/tivoli/fwm/mxmap/impl/GMaps"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.factories.gmaps");
dojo.require("dojo.io.script");
dojo.require("ibm.tivoli.fwm.mxmap.impl.GMaps");
/**
 * Factory to load google maps api javascripts
 */
ibm.tivoli.fwm.mxmap.factories.gmaps = {
	compId:null,
	/**
	 * After we load the google maps javascripts this method is called. 
	 */
	apiLoaded : function() {
		console.log('Google Maps API is now available');		
		ibm.tivoli.fwm.mxmap.factory.apiInitialized("ibm.tivoli.fwm.mxmap.impl.GMaps","gmaps");
	},
	/**
	 * method to be overriden by all map factory implementation 
	 * @param options
	 */
	init : function(options) {		
		var apiVersion = "3.8"; // default API version
		var gmapsConfig = options.mapConf.GMAPS;
		if(gmapsConfig && gmapsConfig.apiVersion)
		{
			apiVersion = gmapsConfig.apiVersion;
			apiVersion.toString();
		}
		
		var license = '';	
		var secret = options.mapConf.clientSecret;
		
		if ( options.mapConf.gmapAuthMethod == "CLIENTID" )
		{
			if( options.mapConf.key )
				license = '&client=' + options.mapConf.key;
				if ( secret != ""  && secret != null && secret != undefined)	
					license = license + '&signature=' + secret;
		} else {
			if( options.mapConf.apiKey )
				license = '&key=' + options.mapConf.apiKey;
		}
		
		
		this._loadJSApi(options.mapConf.key, options.mapConf.https, apiVersion, license);
	},
	/**
	 * this method loads the google maps api and the mapstraction js for google.
	 */
	_loadJSApi : function(key, https, apiVersion, license) {
		
		console.log(license);
		var protocol = 'http';
		if(https)
			protocol = 'https';
		
		dojo.io.script.get({
			url : protocol + '://maps.google.com/maps/api/js?v=' + apiVersion + '&sensor=true&callback=ibm.tivoli.fwm.mxmap.factories.gmaps.apiLoaded' + license,
			timeout : 30000,
			error : function() {
				console.error('Failed to load google apis');
				alert('Failed to load google maps api, check your internet conncetion.');
			}
		});
	}
};

});

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
dojo.provide("ibm.tivoli.fwm.mxmap.factories.bingmaps");
dojo.require("dojo.io.script");
dojo.require("ibm.tivoli.fwm.mxmap.impl.BingMaps");
/**
 * Factory to load bing maps api javascripts
 */
ibm.tivoli.fwm.mxmap.factories.bingmaps = {
	/**
	 * After we load the bing maps javascripts this method is called. 
	 */
	loaded:false,
	apiLoaded : function() {		
		console.log('Bing Maps API is now available');
		ibm.tivoli.fwm.mxmap.factories.bingmaps.loaded=true;
		ibm.tivoli.fwm.mxmap.factory.apiInitialized("ibm.tivoli.fwm.mxmap.impl.BingMaps","bingmaps");
	},
	/**
	 * method to be overriden by all map factory implementation 
	 * @param options
	 */
	init : function(options) {
		this._loadJSApi(options.mapConf.key, options.mapConf.https, options.mapConf.locale);
	},
	/**
	 * this method loads the bing maps api and the mapstraction js for bing.
	 */
	_loadJSApi : function(key, https, locale) {
		var queryStr = "";
		var protocol = 'http';
		var license = '';
		if(https){
			protocol = 'https';
		}
		if(key){
			license = '&key=' + key;
			queryStr+=license;
		}else{
			console.warn("no bing maps key was set.");
		}
		
		window.fwmBingMapsLoaded=function(){
			ibm.tivoli.fwm.mxmap.factories.bingmaps.apiLoaded();
		};
		dojo.io.script.get({
			url : protocol + '://www.bing.com/api/maps/mapcontrol?callback=fwmBingMapsLoaded' + queryStr,
			timeout : 30000,
			error : function() {
				console.error('Failed to load bing apis');
				alert('Failed to load bing maps api');
			}
		});
		//NOT NEEDED since the onscriptload method is working.
		//ibm.tivoli.fwm.mxmap.factories.bingmaps.apiPooler();
	},
	 
	apiPooler:function(){
		try{
		if(Microsoft && Microsoft.Maps){
			ibm.tivoli.fwm.mxmap.factories.bingmaps.apiLoaded();
			return;
		}
		}catch (e) {
			// todo: handle exception
		}
		
			if(ibm.tivoli.fwm.mxmap.factories.bingmaps.loaded!=true){
				setTimeout("ibm.tivoli.fwm.mxmap.factories.bingmaps.apiPooler",500);
			}
		
		
	}
};

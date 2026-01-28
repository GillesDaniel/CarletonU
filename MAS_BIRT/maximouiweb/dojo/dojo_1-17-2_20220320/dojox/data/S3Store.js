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

define(["dojo/_base/declare", "dojox/data/JsonRestStore", "dojox/rpc/ProxiedPath"], 
  function(declare, JsonRestStore, ProxiedPath) {
return declare("dojox.data.S3Store", JsonRestStore,
	{
	// summary:
	//		S3JsonRestStore is an extension of JsonRestStore to handle
	//		Amazon's S3 service using JSON data
		_processResults : function(results){
			// unfortunately, S3 returns query results in XML form
			var keyElements = results.getElementsByTagName("Key");
			var jsResults = [];
			var self = this;
			for(var i=0; i <keyElements.length;i++){
				var keyElement = keyElements[i];
				// manually create lazy loaded Deferred items for each item in the result array
				var val = {
					_loadObject: (function(key,val){
						return function(callback){
							// when a callback is added we will fetch it
							delete this._loadObject;
							self.service(key).addCallback(callback);
						};
					})(keyElement.firstChild.nodeValue,val)
				};
				jsResults.push(val);
			}
			
			return {totalCount:jsResults.length, items: jsResults};
		}
	}
);

});

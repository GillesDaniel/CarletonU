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

require(["dojox/app/main", "dojox/json/ref", "dojo/sniff"],
	function(Application, json, has){

	var configurationFile = "./config.json";

	require(["dojo/text!"+configurationFile], function(configJson){
		var config = json.fromJson(configJson);
		var width = window.innerWidth || document.documentElement.clientWidth;
		if(width <= 600){
			has.add("phone", true);
		}
		has.add("ie9orLess", has("ie") && (has("ie") <= 9));
		Application(config);
	});
});

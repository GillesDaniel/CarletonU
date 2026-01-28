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

require(["dojo/_base/window","dojox/app/main", "dojox/json/ref", "dojo/text!./config.json", "dojox/app/utils/config", "dojo/sniff"],
function(win, Application, jsonRef, config, configUtil, has){
	var originalConfig = jsonRef.fromJson(config);
	var isTablet = false;
	var width = window.innerWidth || document.documentElement.clientWidth;
	if(width > 600){
		isTablet = true;
	}

	has.add("testTrue", true);
	has.add("phone", !isTablet);
						
	// using originalConfig here because main.js will automatically process the has
	Application(originalConfig);
});

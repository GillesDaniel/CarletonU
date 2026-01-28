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

define(["dojo/_base/lang", "../_base", "dojo/_base/config", "dojo/aspect"
], function(lang, dxa, config, aspect){

	var consoleMessages = lang.getObject("dojox.analytics.plugins.consoleMessages", true);

		// summary:
		//		plugin to have analyitcs return the base info dojo collects
		consoleMessages.addData = lang.hitch(dxa, "addData", "consoleMessages");

		var lvls = config["consoleLogFuncs"] || ["error", "warn", "info", "rlog"];
		if(!console){
			console = {};
		}

		for(var i = 0; i < lvls.length; i++){
			var fnName = lvls[i], _addData = lang.hitch(consoleMessages, "addData", fnName);
			if(console[fnName]){
				aspect.after(console, fnName, _addData,true);
			}else{
				console[fnName] = _addData;
			}
		}
	return consoleMessages;
});

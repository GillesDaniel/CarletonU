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

define("dojox/analytics/plugins/window", ["dojo/_base/lang","../_base", "dojo/ready", "dojo/_base/config", "dojo/aspect"
], function(lang, dxa, ready, config, aspect){

	// window startup data
	return (dxa.plugins.window = new (function(){
		this.addData = lang.hitch(dxa, "addData", "window");
		this.windowConnects = config["windowConnects"] || ["open", "onerror"];

		for(var i = 0; i < this.windowConnects.length;i++){
			aspect.after(window, this.windowConnects[i], lang.hitch(this, "addData", this.windowConnects[i]),true);
		}

		ready(lang.hitch(this, function(){
			var data = {};
			for(var i in window){
				if(typeof window[i] == "object" || typeof window[i] == "function"){
					switch(i){
						case "location":
						case "console":
							data[i] = window[i];
							break;
						default:
							break;
					}
				}else{
					data[i] = window[i];
				}
			}
			this.addData(data);
		}));
	})());
});

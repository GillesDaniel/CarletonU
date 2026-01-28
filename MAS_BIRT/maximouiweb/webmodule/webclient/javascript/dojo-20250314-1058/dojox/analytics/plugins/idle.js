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

define("dojox/analytics/plugins/idle", ["dojo/_base/lang", "../_base", "dojo/_base/config", "dojo/ready", 
		"dojo/aspect", "dojo/_base/window"
], function(lang, dxa, config, ready, aspect, window){

	// window startup data
	return (dxa.plugins.idle = new (function(){
		this.addData = lang.hitch(dxa, "addData", "idle");
		this.idleTime = config["idleTime"] || 60000;
		this.idle = true;

		this.setIdle = function(){
			this.addData("isIdle");
			this.idle = true;

		}

		ready(lang.hitch(this, function(){
			var idleResets = ["onmousemove","onkeydown","onclick","onscroll"];
			for(var i = 0;i < idleResets.length;i++){
				aspect.after(window.doc,idleResets[i],lang.hitch(this, function(e){
					if(this.idle){
						this.idle = false;
						this.addData("isActive");
						this.idleTimer = setTimeout(lang.hitch(this,"setIdle"), this.idleTime);
					}else{
						clearTimeout(this.idleTimer);
						this.idleTimer = setTimeout(lang.hitch(this,"setIdle"), this.idleTime);
					}
				}),true);
			}
		}));
	})());
});

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
dojo.provide("ibm.tivoli.fwm.mxmap.routing.RouterFactory");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
/**
 * This class creates a new Router implementation based on the current map provider.
 */

dojo.declare("ibm.tivoli.fwm.mxmap.routing.RouterFactory", ibm.tivoli.fwm.mxmap._Base, {
	provider:null,
	router:null,
	map:null,
	constructor:function(params){
		dojo.mixin(this,params);
	},
	createRouter:function(params){
		var routerName ="ibm.tivoli.fwm.mxmap.routing.impl."+this.provider;		
		var reqStr = "dojo." + "require('" + routerName+ "')"; // breaking up dojo. and require necessary to fool the dojo parser!

		eval(reqStr);
		//trying to keep one instance of bing maps and google maps only;
		if(this.router!=null)
		{
			return this.router;
		}

		var me = this;
		var routerPromise = new Promise(function(resolve, reject) {
			dojo.ready(function() {
				me._params=params;
				var itemDijitStr = " me._routerInstance = new ibm.tivoli.fwm.mxmap.routing.impl."+me.provider+"(me._params)";
				eval(itemDijitStr);
				me.router = me._routerInstance;
				me._routerInstance.init();
				resolve(me._routerInstance);
			});
		});

		return routerPromise;
	}
});

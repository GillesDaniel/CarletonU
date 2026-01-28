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

define(["dojo/dom", "dojo/_base/connect", "dijit/registry", "dojo/dom-style"],
function(dom, connect, registry, domStyle){
	var _connectResults = []; // events connect results
	return {
		// simple view init
		init: function(){
			var dir = domStyle.get(this.domNode,"direction");
			dom.byId("headerH1").innerHTML = "APP HEADER dir = "+dir;
		}
	};
});

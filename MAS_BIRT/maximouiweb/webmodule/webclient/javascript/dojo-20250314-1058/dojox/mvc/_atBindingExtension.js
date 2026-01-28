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

define("dojox/mvc/_atBindingExtension", [
	"dojo/_base/config",
	"dojo/has",
	"dijit/_WidgetBase",
	"./atBindingExtension"
], function(config, has, _WidgetBase, atBindingExtension){
	has.add("mvc-extension-per-widget", (config["mvc"] || {}).extensionPerWidget);
	if(!has("mvc-extension-per-widget")){
		atBindingExtension(_WidgetBase.prototype);
	}
});

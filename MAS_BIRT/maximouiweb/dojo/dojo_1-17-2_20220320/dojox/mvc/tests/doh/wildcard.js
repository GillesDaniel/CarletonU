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

define([
	"doh",
	"dojo/Stateful",
	"dojox/mvc/at",
	"dijit/form/TextBox"
], function(doh, Stateful, at, TextBox){
	doh.register("dojox.mvc.tests.doh.wildcard", [
		function wildcard(){
			var m0 = new Stateful({"placeHolder": "placeHolder0", "value": "Value0"}),
			 m1 = new Stateful({"placeHolder": "placeHolder1", "value": "Value1"}),
			 w = new TextBox({
				"*": at(m1, "*"),
				"placeHolder": at(m0, "placeHolder")
			}, document.createElement("div"));

			w.startup();

			doh.is("Value1", w.textbox.value, "Widget's value should come from m1");
		}
	]);
});

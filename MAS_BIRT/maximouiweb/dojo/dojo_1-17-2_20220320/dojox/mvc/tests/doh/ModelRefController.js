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
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/Stateful",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"../doh/ModelRefController",
	"dojo/text!../templates/ModelRefControllerInTemplate.html"
], function(doh, declare, lang, Stateful, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, ModelRefController, template){
	doh.register("dojox.mvc.tests.doh.ModelRefController", [
		{
			name: "attachPoint",
			runTest: function(){
				lang.setObject("model", new Stateful());
				var w = new (declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
					templateString: template
				}))();
				w.startup();
				doh.t(w.controllerNode, "The controllerNode exists in the template widget");
			},
			tearDown: function(){
				lang.setObject("model", void 0);
			}
		}
	]);
});

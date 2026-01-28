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
	"dojo/_base/declare",
	"dojox/mvc/Templated",
	"dijit/registry",
	"dojo/text!./test_mvc_widget_template.html",
	"dojox/mvc/at",
	"dijit/form/TextBox",
	"dojox/mvc/Group",
	"dojox/mvc/Output",
	"dojox/mvc/Repeat"
], function(declare, Templated, registry, template, at){
	return dojo.declare("dojox.mvc.tests.test_templatedWidgetList.myMvcTemplated", [Templated], {
		// summary:
		//		A sample templated widget for dojox.mvc
		// description:
		//		This template is used to show how to use exprchar to avoid instance of _TemplatedMixin error in dojo.mvc data binding.
		//		If the templateString contains ${xxx}, it will throw an template error, use #{xxx} with exprchar :"#" instead.
		//		See how it works in test_mvc_widget.html and test_mvc_widget_template.html

		// ctrl: dojox.mvc.ModelRefController
		//		The controller that the form widgets in the template refer to.
		ctrl: null,

		templateString: template,

		startup: function(){
			console.log("startup called  in myMvcTemplated!!! ");
			this.labelNode.set("value", at("rel:", "Serial"));
			this.inputNode.set("value", at("rel:", "First"));
//			this.nameInputNode.set("value", at("rel:", "First"));
			this.inherited("startup", arguments);
		},

		buildRendering: function(){
			console.log("call myMvcTemplated buildRendering");
			window.at = at;			
			this.inherited(arguments);
		},

		getParent: function(){
			console.log("Call myMvcTemplated getParent");
			return null;
		}
	});
});

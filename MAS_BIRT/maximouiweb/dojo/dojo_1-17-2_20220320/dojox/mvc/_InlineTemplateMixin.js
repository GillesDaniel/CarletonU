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
	"dojo/_base/lang",
	"dojo/has"
], function(declare, lang, has){
	has.add("dom-qsa", !!document.createElement("div").querySelectorAll);

	return declare("dojox.mvc._InlineTemplateMixin", null, {
		// summary:
		//		A mixin for template widget, which will look for `<script type="dojox/mvc/InlineTemplate">`
		//		and treat the HTML in there as the template string.

		buildRendering: function(){
			var root = this.srcNodeRef;
			if(root){
				var nodes = has("dom-qsa") ? root.querySelectorAll("script[type='dojox/mvc/InlineTemplate']") : root.getElementsByTagName("script"),
				 templates = [];
				for(var i = 0, l = nodes.length; i < l; ++i){
					if(!has("dom-qsa") && nodes[i].getAttribute("type") != "dojox/mvc/InlineTemplate"){ continue; }
					templates.push(nodes[i].innerHTML);
				}
				var templateString = lang.trim(templates.join(""));
				if(templateString){
					this.templateString = templateString;
				}
			}
			this.inherited(arguments);
		}
	});
});

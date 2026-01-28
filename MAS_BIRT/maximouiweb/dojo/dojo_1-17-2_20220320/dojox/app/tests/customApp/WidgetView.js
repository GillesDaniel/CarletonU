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

define(["dojo/_base/declare", "dojox/app/ViewBase", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin"],
	function(declare, ViewBase, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin){
		return declare([_WidgetBase, ViewBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
			postCreate: function(){
				this.inherited(arguments);
				// use the dojo attach point
				this.myButton.on("click", function(){
					console.log("I was correctly attached!")
				});
			}
		});
	}
);

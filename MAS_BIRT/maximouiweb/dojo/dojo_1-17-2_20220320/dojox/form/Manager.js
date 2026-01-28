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
	"dijit/_Widget",
	"dijit/_AttachMixin",
	"dijit/_WidgetsInTemplateMixin",
	"./manager/_Mixin",
	"./manager/_NodeMixin",
	"./manager/_FormMixin",
	"./manager/_ValueMixin",
	"./manager/_EnableMixin",
	"./manager/_DisplayMixin",
	"./manager/_ClassMixin",
	"dojo/_base/declare"
], function(_Widget, _AttachMixin, _WidgetsInTemplateMixin, _Mixin, _NodeMixin, _FormMixin, _ValueMixin, _EnableMixin, _DisplayMixin, _ClassMixin, declare){

return declare("dojox.form.Manager", [ _Widget, _WidgetsInTemplateMixin, _AttachMixin, _Mixin, _NodeMixin, _FormMixin, _ValueMixin, _EnableMixin, _DisplayMixin, _ClassMixin ], {
	// summary:
	//		The widget to orchestrate dynamic forms.
	// description:
	//		This widget hosts dojox.form.manager mixins.
	//		See _Mixin for more info.

	// Set _AttachMixin.searchContainerNode to true for back-compat for widgets
	// that have data-dojo-attach-point's and events inside this.containerNode.
   	// Remove for 2.0.
	searchContainerNode: true,

	buildRendering: function(){
		if(!this.containerNode){
			// all widgets with descendants must set containerNode
			this.containerNode = this.srcNodeRef;
		}
		this.inherited(arguments);
	}
});
});

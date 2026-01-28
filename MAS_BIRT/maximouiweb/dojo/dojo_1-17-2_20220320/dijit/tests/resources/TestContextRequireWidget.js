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
	"require",
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"./TestWidget"
], function(require, declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin){

	// This module requires utilises a relative MID in the template.  Because of the synchronous nature of the widget
	// lifecycle, you need to require in any modules in the template into the parent module (as auto-require will not
	// work) as well as require in the context require and pass it as part of the declare.
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString: '<div><div data-dojo-type="./TestWidget" data-dojo-attach-point="fooNode"></div></div>',
		contextRequire: require
	});
});

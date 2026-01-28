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
	"dojo/dom-construct",
	"dojo/parser",
	"./AMDWidget2"
], function(require, declare, domConstruct, parser) {

	return declare(null, {
		constructor : function() {
			var node = domConstruct.create("div", {
				innerHTML : '<div data-testing-type="./AMDWidget2"></div>'
			});
			this.child = parser.parse(node, {
				contextRequire : require
			})[0];
		}
	});
});

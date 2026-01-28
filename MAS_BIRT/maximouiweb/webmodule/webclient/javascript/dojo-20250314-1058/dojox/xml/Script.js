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

define("dojox/xml/Script", [
	"dojo/_base/kernel",	// dojo.getObject
	"dojo/_base/declare",
	"dojo/parser",
	"./widgetParser"
], function(declare, parser, widgetParser){

dojo.getObject("xml", true, dojox);

declare("dojox.xml.Script", null, {
	constructor: function(props, node){
		parser.instantiate(
			widgetParser._processScript(node)
		);
	}
});

return dojox.xml.Script;

});

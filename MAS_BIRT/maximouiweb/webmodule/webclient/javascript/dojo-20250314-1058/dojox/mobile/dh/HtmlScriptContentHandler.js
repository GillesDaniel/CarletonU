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

define("dojox/mobile/dh/HtmlScriptContentHandler", [
	"dojo/_base/declare",
	"./HtmlContentHandler",
	"../_ExecScriptMixin"
], function(declare, HtmlContentHandler, _ExecScriptMixin){

	// module:
	//		dojox/mobile/dh/HtmlScriptContentHandler

	return declare("dojox.mobile.dh.HtmlScriptContentHandler", [HtmlContentHandler, _ExecScriptMixin], {
		// summary:
		//		An HTML content handler that has script execution capability.
	});
});

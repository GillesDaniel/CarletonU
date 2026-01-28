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
	"dojo/_base/declare", "dijit/Dialog", "dojox/layout/ContentPane"
], function(declare, Dialog, ContentPane){

	return declare("dojox.widget.DialogSimple", [ContentPane, Dialog._DialogBase], {
		// summary:
		//		A Simple Dialog Mixing the `dojox.layout.ContentPane` functionality over
		//		top of a vanilla `dijit.Dialog`. See `dojox.widget.Dialog` for a more flexible
		//		dialog option allowing animations and different styles/theme support.
	});
});


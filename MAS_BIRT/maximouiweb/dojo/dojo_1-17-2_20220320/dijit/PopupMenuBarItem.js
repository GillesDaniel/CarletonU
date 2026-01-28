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
	"dojo/_base/declare", // declare
	"./PopupMenuItem",
	"./MenuBarItem"
], function(declare, PopupMenuItem, MenuBarItem){

	// module:
	//		dijit/PopupMenuBarItem

	var _MenuBarItemMixin = MenuBarItem._MenuBarItemMixin;

	return declare("dijit.PopupMenuBarItem", [PopupMenuItem, _MenuBarItemMixin], {
		// summary:
		//		Item in a MenuBar like "File" or "Edit", that spawns a submenu when pressed (or hovered)
	});
});

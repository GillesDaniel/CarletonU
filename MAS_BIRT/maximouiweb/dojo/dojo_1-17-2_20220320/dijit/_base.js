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
	"./main",
	"./a11y",	// used to be in dijit/_base/manager
	"./WidgetSet",	// used to be in dijit/_base/manager
	"./_base/focus",
	"./_base/manager",
	"./_base/place",
	"./_base/popup",
	"./_base/scroll",
	"./_base/sniff",
	"./_base/typematic",
	"./_base/wai",
	"./_base/window"
], function(dijit){

	// module:
	//		dijit/_base

	/*=====
	return {
		// summary:
		//		Includes all the modules in dijit/_base
	};
	=====*/

	return dijit._base;
});

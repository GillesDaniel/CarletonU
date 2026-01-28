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
	"dojox/mvc/EditModelRefController",
	"dojox/mvc/ListController"
], function(declare, EditModelRefController, ListController){
	// module:
	//		dojox/mvc/tests/mobile/demo/ContactController
	// summary:
	//		The controller for contact info for this demo.

	return declare([EditModelRefController, ListController]);
});

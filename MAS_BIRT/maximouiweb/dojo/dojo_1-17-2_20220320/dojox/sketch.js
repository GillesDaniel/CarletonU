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
	"dojo/_base/kernel",
	"dojo/_base/lang", 
	"./xml/DomParser", 
	"./sketch/UndoStack", 
	"./sketch/Figure", 
	"./sketch/Toolbar"
], function(dojo){
	dojo.getObject("sketch", true, dojox);

	/*=====
	 return {
	 // summary:
	 //		Deprecated.  Should require dojox/sketch modules directly rather than trying to access them through
	 //		this module.
	 };
	 =====*/
	return dojox.sketch;
});

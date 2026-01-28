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

dojo.provide("dojox.collections.tests.collections");
dojo.require("dojox.collections");

try{
	dojo.require("dojox.collections.tests._base");
	dojo.require("dojox.collections.tests.ArrayList");
	dojo.require("dojox.collections.tests.BinaryTree");
	dojo.require("dojox.collections.tests.Dictionary");
	dojo.require("dojox.collections.tests.Queue");
	dojo.require("dojox.collections.tests.Set");
	dojo.require("dojox.collections.tests.SortedList");
	dojo.require("dojox.collections.tests.Stack");
}catch(e){
	doh.debug(e);
}

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

dojo.provide("dojox.lang.tests.main");

try{
	dojo.require("dojox.lang.tests.listcomp");
	dojo.require("dojox.lang.tests.lambda");
	dojo.require("dojox.lang.tests.fold");
	dojo.require("dojox.lang.tests.curry");
	dojo.require("dojox.lang.tests.misc");
	dojo.require("dojox.lang.tests.array");
	dojo.require("dojox.lang.tests.object");
	dojo.require("dojox.lang.tests.oo_mixin");
	dojo.require("dojox.lang.tests.async");
	dojo.require("dojox.lang.tests.recomb");
	dojo.require("dojox.lang.tests.observable");
	dojo.require("dojox.lang.tests.docs");
	dojo.require("dojox.lang.tests.typed");
}catch(e){
	doh.debug(e);
}

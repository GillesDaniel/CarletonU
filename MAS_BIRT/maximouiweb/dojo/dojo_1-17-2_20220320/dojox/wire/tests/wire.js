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

dojo.provide("dojox.wire.tests.wire");

try{
	dojo.require("dojox.wire.tests.programmatic._base");
	dojo.require("dojox.wire.tests.programmatic.Wire");
	dojo.requireIf(dojo.isBrowser, "dojox.wire.tests.programmatic.DataWire");
	dojo.requireIf(dojo.isBrowser, "dojox.wire.tests.programmatic.XmlWire");
	dojo.require("dojox.wire.tests.programmatic.CompositeWire");
	dojo.require("dojox.wire.tests.programmatic.TableAdapter");
	dojo.require("dojox.wire.tests.programmatic.TreeAdapter");
	dojo.require("dojox.wire.tests.programmatic.TextAdapter");
}catch(e){
	doh.debug(e);
}

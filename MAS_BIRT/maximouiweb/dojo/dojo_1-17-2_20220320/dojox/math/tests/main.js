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

dojo.provide("dojox.math.tests.main");

try{
	// functional block
	dojo.require("dojox.math.tests.math");
	dojo.require("dojox.math.tests.stats");
	dojo.require("dojox.math.tests.round");
	dojo.require("dojox.math.tests.BigInteger");
	dojo.require("dojox.math.tests.BigInteger-ext");
	dojo.require("dojox.math.tests.random");
}catch(e){
	doh.debug(e);
}

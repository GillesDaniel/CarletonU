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

dojo.provide("dojox.wire.tests.wireml");

try{
	if(dojo.isBrowser){
		doh.registerUrl("dojox.wire.tests.ml.Action", dojo.moduleUrl("dojox", "wire/tests/markup/Action.html"));
		doh.registerUrl("dojox.wire.tests.ml.Transfer", dojo.moduleUrl("dojox", "wire/tests/markup/Transfer.html"));
		doh.registerUrl("dojox.wire.tests.ml.Invocation", dojo.moduleUrl("dojox", "wire/tests/markup/Invocation.html"));
		doh.registerUrl("dojox.wire.tests.ml.Data", dojo.moduleUrl("dojox", "wire/tests/markup/Data.html"));
		doh.registerUrl("dojox.wire.tests.ml.DataStore", dojo.moduleUrl("dojox", "wire/tests/markup/DataStore.html"));
		doh.registerUrl("dojox.wire.tests.ml.Service", dojo.moduleUrl("dojox", "wire/tests/markup/Service.html"));
	}
}catch(e){
	doh.debug(e);
}

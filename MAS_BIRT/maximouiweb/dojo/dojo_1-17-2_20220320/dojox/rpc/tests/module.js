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

dojo.provide("dojox.rpc.tests.module");

try{
	dojo.require("dojox.rpc.tests.Service");
	dojo.require("dojox.rpc.tests.stores.JsonRestStore");
}catch(e){
	doh.debug(e);
}


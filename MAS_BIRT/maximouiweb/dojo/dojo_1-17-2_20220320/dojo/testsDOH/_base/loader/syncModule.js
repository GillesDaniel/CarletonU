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

if (typeof dojoCdnTestLog=="undefined"){
	dojoCdnTestLog= [];
}
dojoCdnTestLog.push("in-dojo.testsDOH._base.loader.syncModule");
dojo.provide("dojo.testsDOH._base.loader.syncModule");
dojo.declare("dojo.testsDOH._base.loader.syncModule", null, {});
dojo.testsDOH._base.loader.syncModule.status= "OK";
dojo.require("dojo.testsDOH._base.loader.syncModuleDep");
dojoCdnTestLog.push("out-dojo.testsDOH._base.loader.syncModule");

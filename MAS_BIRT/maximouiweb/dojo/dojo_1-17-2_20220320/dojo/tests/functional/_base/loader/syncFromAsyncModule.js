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

dojo.provide("dojo.tests._base.loader.syncFromAsyncModule");
dojo.declare("dojo.tests._base.loader.syncFromAsyncModule", null, {});
window.syncFromAsyncModule = "OK";
dojo.require("dojo.tests._base.loader.syncFromAsyncModuleDep");

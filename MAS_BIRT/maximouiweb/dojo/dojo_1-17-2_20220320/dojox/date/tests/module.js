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

dojo.provide("dojox.date.tests.module");

try{
	dojo.require("dojox.date.tests.timezone");
	dojo.require("dojox.date.tests.timezoneFormatting");
	dojo.require("dojox.date.tests.relative");
	dojo.require("dojox.date.tests.hebrew.Date");
	dojo.require("dojox.date.tests.islamic.Date");
	dojo.require("dojox.date.tests.umalqura.Date");
	dojo.require("dojox.date.tests.buddhist.Date");
	dojo.require("dojox.date.tests.posix");
}catch(e){
	doh.debug(e);
}


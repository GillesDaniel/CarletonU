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

dojo.provide("dojox.image.tests.module");

try{

	doh.registerUrl("dojox.image.tests._base", dojo.moduleUrl("dojox.image.tests", "test_base.html"));
	doh.registerUrl("dojox.image.tests.Lightbox", dojo.moduleUrl("dojox.image.tests", "Lightbox.html"));
	doh.registerUrl("dojox.image.tests.onloads", dojo.moduleUrl("dojox.image.tests", "onloads.html"));
	
}catch(e){
	doh.debug(e);
}



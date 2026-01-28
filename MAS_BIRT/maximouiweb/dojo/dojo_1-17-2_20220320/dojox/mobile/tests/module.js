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

dojo.provide("dojox.mobile.tests.module");

try{
	dojo.require("dojox.mobile.tests.doh.module");
	if(!dojo.isBB && !dojo.isAndroid && !dojo.isIPhone && !dojo.isIPad && !dojo.isIPod) {
		dojo.require("dojox.mobile.tests.robot.module");
	}

}catch(e){
	doh.debug(e);
}


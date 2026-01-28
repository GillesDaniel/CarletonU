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

dojo.provide("dojox.robot.tests.robotml");

try{
	if(dojo.isBrowser){
		doh.registerUrl("dojox.robot.tests.test_recorder", dojo.moduleUrl("dojox", "robot/tests/test_recorder.html"), 999999);
	}
}catch(e){
	doh.debug(e);
}

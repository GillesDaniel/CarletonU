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

dojo.provide("dojox.editor.tests.module");

try{
	var userArgs = window.location.search.replace(/[\?&](dojoUrl|testUrl|testModule)=[^&]*/g,"").replace(/^&/,"?");

	// Base editor functionality
	doh.registerUrl("dojox.editor.tests.robot.Editor_Smiley", dojo.moduleUrl("dojox","editor/tests/robot/Editor_Smiley.html"+userArgs), 99999999);

    
}catch(e){
	doh.debug(e);
}




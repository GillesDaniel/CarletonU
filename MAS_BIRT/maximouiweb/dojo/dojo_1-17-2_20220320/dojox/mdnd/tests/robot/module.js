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

dojo.provide("dojox.mdnd.tests.robot.module");

try{
	doh.registerUrl("dojox.mdnd.tests.robot.Acceptance",
			dojo.moduleUrl("dojox.mdnd","tests/robot/test_dnd_acceptance.html"),60000);
	doh.registerUrl("dojox.mdnd.tests.robot.VerticalDropMode",
			dojo.moduleUrl("dojox.mdnd","tests/robot/test_dnd_verticalDropMode.html"),60000);
	doh.registerUrl("dojox.mdnd.tests.robot.OverDropMode",
			dojo.moduleUrl("dojox.mdnd","tests/robot/test_dnd_overDropMode.html"),60000);
	doh.registerUrl("dojox.mdnd.tests.robot.DndToDojo",
			dojo.moduleUrl("dojox.mdnd","tests/robot/test_dnd_dndToDojo.html"),60000);
	doh.registerUrl("dojox.mdnd.tests.robot.DndFromDojo",
			dojo.moduleUrl("dojox.mdnd","tests/robot/test_dnd_dndFromDojo.html"),60000);
}catch(e){
	doh.debug(e);
}

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

dojo.provide('dojox.dnd.tests.testAll');

try {
	doh.registerUrl('dojox.dnd.tests.selector', dojo.moduleUrl('dojox.dnd.tests', 'test_selector.html'));
	doh.registerUrl('dojox.dnd.tests.boundingbox', dojo.moduleUrl('dojox.dnd.tests', 'test_boundingBoxController.html'));
}catch (e) {
	doh.debug(e);
}

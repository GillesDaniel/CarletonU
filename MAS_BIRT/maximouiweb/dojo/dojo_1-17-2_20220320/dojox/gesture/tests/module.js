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

dojo.provide('dojox.gesture.tests.module');

try {
	doh.registerUrl('dojox.gesture.tests.tap', dojo.moduleUrl('dojox.gesture.tests', 'doh/tap.html'));
	doh.registerUrl('dojox.gesture.tests.swipe', dojo.moduleUrl('dojox.gesture.tests', 'doh/swipe.html'));
	doh.registerUrl('dojox.gesture.tests.bubble', dojo.moduleUrl('dojox.gesture.tests', 'doh/bubble.html'));
}catch (e) {
	doh.debug(e);
}

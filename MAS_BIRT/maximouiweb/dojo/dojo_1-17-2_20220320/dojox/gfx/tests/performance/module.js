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

dojo.provide("dojox.gfx.tests.performance.module");
if(dojo.isBrowser){
	doh.registerUrl("GFX: Primitives", dojo.moduleUrl("dojox", "gfx/tests/performance/gfx_primitives.html"), 3600000);
	doh.registerUrl("GFX: Fill", dojo.moduleUrl("dojox", "gfx/tests/performance/gfx_fill.html"), 3600000);
	doh.registerUrl("GFX: Complex Scenes", dojo.moduleUrl("dojox", "gfx/tests/performance/gfx_scenes.html"), 3600000);
}



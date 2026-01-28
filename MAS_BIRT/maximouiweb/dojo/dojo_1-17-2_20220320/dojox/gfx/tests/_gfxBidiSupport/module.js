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

dojo.provide("dojox.gfx.tests._gfxBidiSupport.module");

try{
	doh.registerUrl("dojox.gfx.tests._gfxBidiSupport.test_SurfaceGroup", dojo.moduleUrl("dojox", "gfx/tests/_gfxBidiSupport/test_SurfaceGroup.html"));

	if(dojo.isIE){
		doh.registerUrl("dojox.gfx.tests._gfxBidiSupport.silverlight.test_SurfaceGroupSilverlight", dojo.moduleUrl("dojox", "gfx/tests/_gfxBidiSupport/silverlight/test_SurfaceGroupSilverlight.html"));
	}else{
		doh.registerUrl("dojox.gfx.tests._gfxBidiSupport.canvas.test_SurfaceGroupCanvas", dojo.moduleUrl("dojox", "gfx/tests/_gfxBidiSupport/canvas/test_SurfaceGroupCanvas.html"));
	}
	doh.registerUrl("dojox.gfx.tests._gfxBidiSupport.svgWeb.test_SurfaceGroupSvgWeb", dojo.moduleUrl("dojox", "gfx/tests/_gfxBidiSupport/svgWeb/test_SurfaceGroupSvgWeb.html"));

}catch(e){
     doh.debug(e);
}

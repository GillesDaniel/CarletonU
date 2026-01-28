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

define([
	"require",
	"doh/runner"
], function(require, doh){
	try{
		var userArgs = window.location.search.replace(/[\?&](dojoUrl|testUrl|testModule)=[^&]*/g, "").replace(/^&/, "?");
		// DOH
		doh.registerUrl("dojox.app.tests.doh.lifecycleTest", require.toUrl("./lifecycleTest/" + userArgs), 999999);
		doh.registerUrl("dojox.app.tests.doh.hasConfigTest", require.toUrl("./hasConfigTest/" + userArgs), 999999);
		doh.registerUrl("dojox.app.tests.doh.simpleModelApp", require.toUrl("./simpleModelApp/" + userArgs), 999999);
		doh.registerUrl("dojox.app.tests.doh.globalizedApp", require.toUrl("./globalizedApp/" + userArgs), 999999);
		doh.registerUrl("dojox.app.tests.doh.borderLayoutApp", require.toUrl("./borderLayoutApp/" + userArgs), 999999);
		doh.registerUrl("dojox.app.tests.doh.layoutApp", require.toUrl("./layoutApp/" + userArgs), 999999);
		doh.registerUrl("dojox.app.tests.doh.mediaQuery3ColumnApp", require.toUrl("./mediaQuery3ColumnApp/" + userArgs), 999999);
		doh.registerUrl("dojox.app.tests.doh.domOrderByConstraint", require.toUrl("./domOrderByConstraint/" + userArgs), 999999);
		doh.registerUrl("dojox.app.tests.doh.domOrderByConfig", require.toUrl("./domOrderByConfig/" + userArgs), 999999);
		doh.registerUrl("dojox.app.tests.doh.domOrderByConstraintRTL", require.toUrl("./domOrderByConstraintRTL/" + userArgs), 999999);
	}catch(e){
		doh.debug(e);
	}
});

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

define(["doh/main", "require", "dojo/sniff"], function(doh, require, has){

	if(!(has("ie") < 10)){
		doh.registerUrl("dojox.mobile.tests.doh.PageIndicator", require.toUrl("./PageIndicatorTests1.html"),999999);
		doh.registerUrl("dojox.mobile.tests.doh.PageIndicator", require.toUrl("./PageIndicatorTests2.html"),999999);
		doh.registerUrl("dojox.mobile.tests.doh.PageIndicator", require.toUrl("./PageIndicatorTests3.html"),999999);
	}
});




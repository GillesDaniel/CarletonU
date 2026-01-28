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
	if(has("ie") === 10 || (!has("ie") && has("trident") > 6)){
		// ComboBox is broken on IE10 with the native WindowsPhone theme
		doh.registerUrl("dojox.mobile.tests.doh.ComboBoxTests", require.toUrl("./ComboBoxTests.html?theme=iPhone"),999999);
	}else{
		doh.registerUrl("dojox.mobile.tests.doh.ComboBoxTests", require.toUrl("./ComboBoxTests.html"),999999);
	}
});


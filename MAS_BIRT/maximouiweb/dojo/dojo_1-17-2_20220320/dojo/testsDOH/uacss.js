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

define(["dojo/sniff", "doh", "require"], function(has, doh, require){

	// IE9+ cannot handle quirks mode in test runner, see #14321
	has("ie") >= 9 || doh.register("testsDOH.uacss.sniffQuirks", require.toUrl("./uacss/sniffQuirks.html"));
	doh.register("testsDOH.uacss.sniffStandards", require.toUrl("./uacss/sniffStandards.html"));

});


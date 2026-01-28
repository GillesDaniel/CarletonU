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

define(["doh/main", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("testsDOH.html", require.toUrl("./html/test_set.html"), 30000);
	}
});

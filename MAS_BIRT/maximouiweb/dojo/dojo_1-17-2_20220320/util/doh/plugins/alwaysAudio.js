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

define(["dojo", "doh/runner"], function(dojo, doh) {

	// Checks the 'sounds' checkbox in the browser test runner 
	// so we get Homer's feedback on the test run
	dojo.ready(function(){
		var chkNode = dojo.byId("audio");
	    if(chkNode) {
			chkNode.checked=true;
		}
	});
});

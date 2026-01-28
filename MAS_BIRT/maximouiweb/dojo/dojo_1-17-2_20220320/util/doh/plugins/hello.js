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

define(["doh/runner"], function(doh) {
	// summary:
	//		A sample DOH plugin showing wrapping/augmentation of DOH
	//		We extend the 'run' method	to inject a 'hello world' kind of statement into the output
	var origRun = doh.run, 
		registered = false;

	doh.run = function() {
		if(!registered) {
			doh.debug("doh.plugins.hello plugin says Hello!");
			registered = true;
		}
		origRun.apply(doh, arguments);
	}
});

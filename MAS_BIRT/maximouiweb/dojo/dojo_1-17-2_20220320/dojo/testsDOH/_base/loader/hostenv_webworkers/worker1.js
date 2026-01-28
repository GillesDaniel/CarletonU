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

// summary:
//		Test whether Dojo will load inside the webworker.

var dojoConfig = {
	baseUrl: "../../../../../",
	packages: [{
		name: "dojo", location: "dojo"
	}]
};

try{
	importScripts("../../../../dojo.js", "console.js");

	self.postMessage({
		type: "testResult",
		test: "dojo loaded",
		value: true
	});
}catch(e){
	self.postMessage({
		type: "testResult",
		test: "dojo loaded",
		value: false
	});
}






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
//		Test whether subworkers work.

var dojoConfig = {
	baseUrl: "../../../../../",
	async: true,
	packages: [{
		name: "dojo", location: "dojo"
	}]
};

importScripts("../../../../dojo.js", "console.js");

try{
	require(["dojo/testsDOH/_base/loader/hostenv_webworkers/strings"], function(strings){
		self.postMessage({
			type: "testResult",
			test: "subworkers are working",
			value: true
		});
	});
}catch(e){
	self.postMessage({
		type: "testResult",
		test: "subworkers are working",
		value: false
	});
}

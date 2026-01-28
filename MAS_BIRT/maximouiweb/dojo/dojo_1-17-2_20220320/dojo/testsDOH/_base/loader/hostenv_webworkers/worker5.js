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
//		Test loading json via dojo/request in a worker.

var dojoConfig = {
	baseUrl: "../../../../../",
	async: true,
	packages: [{
		name: "dojo", location: "dojo"
	}]
};

importScripts("../../../../dojo.js", "console.js");

try{
	require(["dojo/request"], function(request){
		request("../../../../testsDOH/_base/loader/hostenv_webworkers/worker5.json", {
			handleAs: "json"
		}).then(function(data) {
				if(data.foo && !data.bar){
					self.postMessage({
						type: "testResult",
						test: data,
						value: true
					});
				}else{
					self.postMessage({
						type: "testResult",
						test: "require is working",
						value: false
					});
				}
			}, function(){
				self.postMessage({
					type: "testResult",
					test: "request in a worker is working",
					value: false
				});
			});
	});
}catch(e){
	self.postMessage({
		type: "testResult",
		test: "request in a worker is working",
		value: false
	});
}

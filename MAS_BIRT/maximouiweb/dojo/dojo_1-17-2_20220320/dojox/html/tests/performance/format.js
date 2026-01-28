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

dojo.provide("dojox.html.tests.performance.format");

dojo.require("dojox.html.format");


dojox.html.tests.performance.docText = null;
doh.register("format.prettyprint.performance", [
	{
		name: "smallDoc",
		testType: "perf",
		trialDuration: 100,
		trialDelay: 50,
		trialIterations: 50,
		setUp: function() {
			var deferred = dojo.xhrGet({
				preventCache: true,
				url: dojo.moduleUrl("dojox", "html/tests/performance/smalldoc.txt").toString(),
				handleAs: "text",
				sync: true
			});
			deferred.addCallback(function(txt){
				dojox.html.tests.performance.docText = txt;
			});
			deferred.addErrback(function(e){
				console.log(e);
			});
		},
		tearDown: function(){
			dojox.html.tests.performance.docText = null;
		},
		runTest: function(){
			var s = dojox.html.format.prettyPrint(dojox.html.tests.performance.docText);
		}
	},
	{
		name: "largeDoc",
		testType: "perf",
		trialDuration: 100,
		trialDelay: 50,
		trialIterations: 50,
		setUp: function() {
			var deferred = dojo.xhrGet({
				preventCache: true,
				url: dojo.moduleUrl("dojox", "html/tests/performance/largedoc.txt").toString(),
				handleAs: "text",
				sync: true
			});
			deferred.addCallback(function(txt){
				dojox.html.tests.performance.docText = txt;
			});
			deferred.addErrback(function(e){
				console.log(e);
			});
		},
		tearDown: function(){
			dojox.html.tests.performance.docText = null;
		},
		runTest: function(){
			var s = dojox.html.format.prettyPrint(dojox.html.tests.performance.docText);
		}
	}
]);


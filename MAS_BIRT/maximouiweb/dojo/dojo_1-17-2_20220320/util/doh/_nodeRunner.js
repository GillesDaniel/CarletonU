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

define(["doh/runner", "require", "dojo/_base/config"], function(doh, require, config){
	/*=====
	return {
		// summary:
		//		Module for running DOH tests in node (as opposed to a browser).
		//		Augments return value from doh/runner.
	};
	=====*/

	doh.debug= console.log;
	doh.error= console.log;

	// Override the doh._report method to make it quit with an
	// appropriate exit code in case of test failures.
	var oldReport = doh._report;
	doh._report = function(){
		oldReport.apply(doh, arguments);
		if(this._failureCount > 0 || this._errorCount > 0){
			process.exit(1);
		}
	};

	console.log("\n"+doh._line);
	console.log("The Dojo Unit Test Harness, $Rev: c950c9a $");
	console.log("Copyright (c) 2018, The JS Foundation, All Rights Reserved");
	console.log("Running with node.js");
	for (var tests= [], args= config["commandLineArgs"], i= 0, arg; i<args.length; i++) {
		arg= args[i];
		if (arg.length==2 && arg[0]=="test") {
			var test= arg[1];
			console.log("loading test " + test);
			tests.push(test);
		}
	}
	console.log(doh._line, "\n");

	require(tests, function() {
		doh.run();
	});
});

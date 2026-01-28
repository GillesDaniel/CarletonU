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
	 //		Module for running DOH tests in rhino (as opposed to a browser).
	 //		Augments return value from doh/runner.
	 };
	 =====*/

	doh.debug= print;
	doh.error= print;

	// Override the doh._report method to make it quit with an
	// appropriate exit code in case of test failures.
	var oldReport = doh._report;
	doh._report = function(){
		oldReport.apply(doh, arguments);
		if(this._failureCount > 0 || this._errorCount > 0){
			quit(1);
		}
	};

	print("\n"+doh._line);
	print("The Dojo Unit Test Harness, $Rev: c950c9a $");
	print("Copyright (c) 2018, The JS Foundation, All Rights Reserved");
	for (var tests= [], args= config["commandLineArgs"], i= 0, arg; i<args.length; i++) {
		arg= (args[i]+"").split("=");
		if (arg.length==2 && arg[0]=="test") {
			var test= arg[1];
			print("loading test " + test);
			tests.push(test);
		}
	}
	print(doh._line, "\n");

	require(tests, function() {
		doh.run();
	});
});

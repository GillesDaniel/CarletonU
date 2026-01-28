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

//Test file for the conditional comment inclusion/exclusion code.
//Run this file from the util/buildscripts/tests directory.

load("../jslib/fileUtil.js");
load("../jslib/logger.js");
load("../jslib/buildUtil.js");




var result = buildUtil.processConditionals(
	"conditionalTest.txt",
	fileUtil.readFile("conditionalTest.txt"),
	{
		loader: "xdomain",
		shouldInclude: true,
		nesting: 1
	}
);

print(result);

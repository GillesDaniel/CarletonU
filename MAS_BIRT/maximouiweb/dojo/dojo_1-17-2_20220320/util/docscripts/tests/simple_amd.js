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

define(["dojo", "dojo/cookie"], function(dojo, cook){

	dojo.thisIsAtestFunction = function(/* String */a){
		// summary: Testing a function
		// a: String
		//		Testing a string parameter
		return a.toUpperCase(); // String
	}
	
	dojo.testFunction2 = function(/* String? */id){
		// summary: Simple summary
		// description:
		//		Simple Description.
		//		On Multiple lines.
		// id: String?
		//		Duplicate matched in signature and in line
		return (id || "").toUpperCase(); // String
	}

	dojo.declare("foo.Bar", null, {
		// summary: Nondojo NS populated
	})

	return dojo;
});

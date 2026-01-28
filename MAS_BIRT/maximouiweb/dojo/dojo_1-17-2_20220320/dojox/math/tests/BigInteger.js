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

dojo.provide("dojox.math.tests.BigInteger");

dojo.require("dojox.math.BigInteger");

tests.register("dojox.math.tests.BigInteger",
	[
		function sanity_check(t){
			var x = new dojox.math.BigInteger("abcd1234", 16),
				y = new dojox.math.BigInteger("beef", 16),
				z = x.mod(y);
			t.is("b60c", z.toString(16));
		}
	]
);

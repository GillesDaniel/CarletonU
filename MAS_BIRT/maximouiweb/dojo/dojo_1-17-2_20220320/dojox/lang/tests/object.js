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

dojo.provide("dojox.lang.tests.object");

dojo.require("dojox.lang.functional.object");

(function(){
	var df = dojox.lang.functional, x = {a: 1, b: 2, c: 3},
		print = function(v, i){ this.push("[" + i + "] = " + v); },
		show = function(o){ return df.forIn(o, print, []).sort().join(", "); };
	
	tests.register("dojox.lang.tests.object", [
		function testKeys(t){ t.assertEqual(df.keys(x).sort(), ["a", "b", "c"]); },
		function testValues(t){ t.assertEqual(df.values(x).sort(), [1, 2, 3]); },
		
		function testForIn(t){ t.assertEqual(show(x), "[a] = 1, [b] = 2, [c] = 3"); },
		function testFilterIn(t){ t.assertEqual(show(df.filterIn(x, "%2")), "[a] = 1, [c] = 3"); },
		function testMapIn(t){ t.assertEqual(show(df.mapIn(x, "+3")), "[a] = 4, [b] = 5, [c] = 6"); }
	]);
})();

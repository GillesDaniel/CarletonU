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

define(["doh", "dojo/_base/declare", "../TreeMap", "dojo/store/JsonRest", "dojo/when"],
	function(doh, declare, TreeMap, JsonRest, when){
	doh.register("dojox.treemap.tests.Store", [
		function test_Error(t){
			var treeMap = new TreeMap();
			var d = when(treeMap.set("store", new JsonRest({ target: "/" }), function(){
				t.f(true, "ok fct must not have been called");
			}, function(){
				t.t(true, "failure fct must have been called");
			}));
			treeMap.startup();
		}
	]);
});

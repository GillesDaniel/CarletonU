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

define(["doh", "../Calendar", "dojo/when", "dojo/store/JsonRest"],
	function(doh, Calendar, when, JsonRest){
	doh.register("tests.unitTest_Store", [
		function test_Error(t){
			var calendar = new Calendar();
			var d = when(calendar.set("store", new JsonRest({ target: "/" }), function(){
				t.f(true, "ok fct must not have been called");
			}, function(){
				t.t(true, "failure fct must have been called");
			}));
			calendar.startup();
		}
	]);
});

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

define(["doh", "dojo/_base/lang"], function(doh, lang){

// setup the test object
dojo = dojo || {};
dojo.zoo = { a:1, c: { d:1 } };

	doh.register("testsDOH._base.object", [

		function getBasic(t){
			var x = lang.getObject('dojo.zoo.a');
			t.is(1, x);
		},

		function setObject2(t){
			lang.setObject("dojo.zoo.foo.bar", 42);
			t.is(42, dojo.zoo.foo.bar);
		},

		function setWithContext(t){
			// c is already {}
			lang.setObject("zoo.c.x", "foo!", dojo);
			t.is("foo!", dojo.zoo.c.x);
		},

		function getUndefined(t){
			var x = lang.getObject('dojo.zoo.b');
			t.is(undefined, x);
		},

		function setDeep(t){
			lang.setObject("dojo.zoo.c.e.f.g.h.i", 42);
			t.is(42, dojo.zoo.c.e.f.g.h.i);
		},

		function getDeep(t){
			lang.getObject("dojo.zoo.bar.baz.bam", true);
			dojo.zoo.bar.baz.bam.x = 10;
			t.is(10, dojo.zoo.bar.baz.bam.x);
		}

	]);
});

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

dojo.provide("dojox.wire.tests.programmatic.TableAdapter");

dojo.require("dojox.wire.TableAdapter");

tests.register("dojox.wire.tests.programmatic.TableAdapter", [

	function test_TableAdapter_columns(t){
		var source = [
			{a: "A1", b: "B1", c: "C1"},
			{a: "A2", b: "B2", c: "C2"},
			{a: "A3", b: "B3", c: "C3"}
		];
		var columns = {x: {property: "a"}, y: {property: "b"}, z: {property: "c"}};
		var value = new dojox.wire.TableAdapter({object: source, columns: columns}).getValue();
		t.assertEqual(source[0].a, value[0].x);
		t.assertEqual(source[1].b, value[1].y);
		t.assertEqual(source[2].c, value[2].z);
	}

]);

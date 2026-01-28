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

define(["doh", "dojo/_base/declare", "../Selection", "dijit/_WidgetBase"], 
	function(doh, declare, Selection, _WidgetBase){
	doh.register("tests.Selection", [
		function test_Lifecycle(t){
			var C = declare("MyWidget", [_WidgetBase, Selection], {
				updateRenderers: function(){
				}
			});
			var o = new C();
			o.set("selectedItem", "1");
			t.is("1", o.get("selectedItem"));
			t.is(["1"], o.get("selectedItems"));
			o.set("selectedItems", ["2"]);
			t.is("2", o.get("selectedItem"));
			t.is(["2"], o.get("selectedItems"));
			o = new C({selectedItem: "1"});
			t.is("1", o.get("selectedItem"));
			t.is(["1"], o.get("selectedItems"));
		}
	]);
});

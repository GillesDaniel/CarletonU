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

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/sniff",
	"dojo/dom-class",
	"dijit/registry",
	"doh/runner"
], function(declare, lang, has, domClass, registry, runner){

	// module:
	//		dojox/mobile/tests/doh/TestHelper
	// summary:
	//		A DOH test Helper class

	var TestHelper = new function(){

		this.fireOnClick = function(obj){
			var node;
			if(typeof obj === "string"){
				var widget = registry.byId(obj);
				node = widget.domNode;
			}else{
				node = obj;
			}
			if (has("ie") === 10 || (!has("ie") && has("trident") > 6)){
				this.fireOnEvent(node, "MSPointerDown");
				this.fireOnEvent(node, "MSPointerUp");
			}else{
				this.fireOnEvent(node, "mousedown");
				this.fireOnEvent(node, "mouseup");
			}
		};

		this.fireOnEvent = function(node, evstr){
			if(has("ie")<9){
				node.fireEvent( "on" + evstr );
			}else{
				var e = document.createEvent('Events');
				e.initEvent(evstr, true, true);
				node.dispatchEvent(e);
			}
		};
		this.verifyImageSrc = function(node, regExp, hintPrefix, hintSuffix) {
			hintPrefix = hintPrefix || "";
			hintSuffix = hintSuffix || "";
			if(!has("ie") && regExp && node){
				doh.assertTrue(node.src.search(regExp) != -1, hintPrefix + "search " + regExp.toString() + hintSuffix);
			}
		};
	};
	return TestHelper;
});

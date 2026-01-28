// wrapped by build app
define("dojox/lang/aspect/counter", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
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

dojo.provide("dojox.lang.aspect.counter");

(function(){
	var aop = dojox.lang.aspect;
	
	var Counter = function(){
		this.reset();
	};
	dojo.extend(Counter, {
		before: function(/*arguments*/){
			++this.calls;
		},
		afterThrowing: function(/*excp*/){
			++this.errors;
		},
		reset: function(){
			this.calls = this.errors = 0;
		}
	});
	
	aop.counter = function(){
		// summary:
		//		Returns an object, which can be used to count calls to methods.
	
		return new Counter;	// Object
	};
})();

});

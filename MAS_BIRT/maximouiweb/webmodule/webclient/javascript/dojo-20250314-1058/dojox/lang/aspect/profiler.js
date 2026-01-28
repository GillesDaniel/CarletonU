// wrapped by build app
define("dojox/lang/aspect/profiler", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
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

dojo.provide("dojox.lang.aspect.profiler");

(function(){
	var aop = dojox.lang.aspect,
		uniqueNumber = 0;
	
	var Profiler = function(title){
		this.args = title ? [title] : [];
		this.inCall = 0;
	};
	dojo.extend(Profiler, {
		before: function(/*arguments*/){
			if(!(this.inCall++)){
				console.profile.apply(console, this.args);
			}
		},
		after: function(/*excp*/){
			if(!--this.inCall){
				console.profileEnd();
			}
		}
	});
	
	aop.profiler = function(/*String?*/ title){
		// summary:
		//		Returns an object, which can be used to time calls to methods.
		//
		// title:
		//		The optional name of the profile section.
	
		return new Profiler(title);	// Object
	};
})();

});

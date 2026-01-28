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

dojo.provide("dojox.lang.aspect.timer");

(function(){
	var aop = dojox.lang.aspect,
		uniqueNumber = 0;
	
	var Timer = function(name){
		this.name = name || ("DojoAopTimer #" + ++uniqueNumber);
		this.inCall = 0;
	};
	dojo.extend(Timer, {
		before: function(/*arguments*/){
			if(!(this.inCall++)){
				console.time(this.name);
			}
		},
		after: function(/*excp*/){
			if(!--this.inCall){
				console.timeEnd(this.name);
			}
		}
	});
	
	aop.timer = function(/*String?*/ name){
		// summary:
		//		Returns an object, which can be used to time calls to methods.
		//
		// name:
		//		The optional unique name of the timer.

		return new Timer(name);	// Object
	};
})();

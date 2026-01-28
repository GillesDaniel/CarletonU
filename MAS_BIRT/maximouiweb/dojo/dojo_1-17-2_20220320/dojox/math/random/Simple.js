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

define(["dojo"], function(dojo) {

	return dojo.declare("dojox.math.random.Simple", null, {
		// summary:
		//		Super simple implementation of a random number generator,
		//		which relies on Math.random().
	
		destroy: function(){
			// summary:
			//		Prepares the object for GC. (empty in this case)
		},
	
		nextBytes: function(/* Array */ byteArray){
			// summary:
			//		Fills in an array of bytes with random numbers
			// byteArray: Array
			//		array to be filled in with random numbers, only existing
			//		elements will be filled.
			for(var i = 0, l = byteArray.length; i < l; ++i){
				byteArray[i] = Math.floor(256 * Math.random());
			}
		}
	});
});

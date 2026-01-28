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

// testing a simple var list with embedded things.
var result = 0;

(function(){
	var a = 2,
		b = 3,
		superLong = 4,
		aFunction = function(arg){
			var inList = superLong;
			result = inList;
		}
	;
	
	aFunction(superLong);
	
})();

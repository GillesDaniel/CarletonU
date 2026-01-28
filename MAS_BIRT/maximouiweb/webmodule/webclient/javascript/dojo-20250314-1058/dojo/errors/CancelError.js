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

define("dojo/errors/CancelError", ["./create"], function(create){
	// module:
	//		dojo/errors/CancelError

	/*=====
	return function(){
		// summary:
		//		Default error if a promise is canceled without a reason.
	};
	=====*/

	return create("CancelError", null, null, { dojoType: "cancel", log: false });
});

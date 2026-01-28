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

define([], function(){

	return {
		init: function(){
			console.log("In view5 init called");
		},

		beforeActivate: function(){
			console.log("In view5 beforeActivate called");
		},

		afterActivate: function(){
			console.log("In view5 afterActivate called");
		},

		beforeDeactivate: function(){
			console.log("In view5 beforeDeactivate called");
		},

		afterDeactivate: function(){
			console.log("In view5 afterDeactivate called");
		}
	}
});

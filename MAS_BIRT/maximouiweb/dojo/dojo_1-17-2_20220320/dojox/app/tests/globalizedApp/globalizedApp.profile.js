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

var profile = {
	resourceTags:{
		declarative: function(filename){
	 		return /\.html?$/.test(filename); // tags any .html or .htm files as declarative
	 	},
		amd: function(filename){
			return /\.js$/.test(filename);
		},
		copyOnly: function(filename, mid){
			return mid == "globalizedApp/build.profile";
		}
	}
};

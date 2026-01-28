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
	basePath:"../../..",
	releaseDir:"./trees-dirs-files-ouput",
	releaseName:"",
	trees:[
		["dojo/tests", "./dojo-tests", /(\/\.)|(~$)/],
		["dijit/tests", "./dijit-tests", /(\/\.)|(~$)/]
 	],
	dirs:[
		["dojo", "./dojo-root", /(\/\.)|(~$)/],
		["dijit", "./dijit-root", /(\/\.)|(~$)/]
	],
	files:[
		["dojo/dojo.js", "./dojo.js"],
		["dijit/dijit.js", "./dijit.js"]
	],
	resourceTags:{
		copyOnly: function(filename, mid){
			return true;
		}
	}
};

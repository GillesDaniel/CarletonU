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

var profile = (function(){
	return {
		resourceTags:{
			ignore: function(filename, mid){
				return /(profile\.js|html)$/.test(filename);
			},

			amd: function(filename, mid){
				return mid=="i18nTest/amdModule";
			}
		},

		// relative to this file
		basePath:"..",

		scopeMap:[["dojo", "dojo"], ["dijit",0], ["dojox",0]],

		packages:[{
			name:"dojo",
			location:"./dojo"
		},{
			name:"i18nTest",
			location:"./i18n-test"
		}],

		releaseDir:"./built-i18n-test",
		releaseName:"built"
	};

})();

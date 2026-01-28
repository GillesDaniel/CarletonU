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
	var testResourceRe = /^dijit\/tests\//,
	nodeModulesRe = /\/node_modules\//,

		copyOnly = function(filename, mid){
			var list = {
				"themes/themes.profile":1,
				"themes/package.json":1,
				"themes/Gruntfile":1
			};
			return (mid in list) ||
				(/^dijit\/resources\//.test(mid) && !/\.css$/.test(filename)) ||
				/(png|jpg|jpeg|gif|tiff)$/.test(filename)
				nodeModulesRe.test(mid);
		};

	return {
		resourceTags:{
			test: function(filename, mid){
				return testResourceRe.test(mid);
			},

			copyOnly: function(filename, mid){
				return copyOnly(filename, mid);
			},

			amd: function(filename, mid){
				return !testResourceRe.test(mid) && !copyOnly(filename, mid) && /\.js$/.test(filename);
			},

			miniExclude: function(filename, mid){
				return /\.styl$/.test(filename) ||
				/^dijit\/bench\//.test(mid) ||
				/^dijit\/themes\/themeTest/.test(mid) ||
				nodeModulesRe.test(mid);
			}
		}
	};
})();

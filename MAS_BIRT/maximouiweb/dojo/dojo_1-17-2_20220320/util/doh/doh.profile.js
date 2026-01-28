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

var testResourceRe = /^doh\/tests/,
	list = {
		"doh/doh.profile": 1,
		"doh/package.json": 1,
		"doh/tests": 1,
		"doh/_parseURLargs": 1
	},
	copyOnly = function(mid){
		return (mid in list);
	};

var profile = {
	resourceTags: {
		test: function(filename, mid){
			return testResourceRe.test(mid);
		},

		copyOnly: function(filename, mid){
			return copyOnly(mid);
		},

		amd: function(filename, mid){
			return !testResourceRe.test(mid) && !copyOnly(mid) && /\.js$/.test(filename);
		}
	}
};

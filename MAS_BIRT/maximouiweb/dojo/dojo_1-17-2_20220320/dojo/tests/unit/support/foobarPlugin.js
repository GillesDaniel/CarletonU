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

define(["dojo/has"], function(has) {
	/* Loads a string based on the value of defined features */
	var data = has("foo") ? "foo" : has("bar") ? "bar" : "undefined";
	return {
		load: function(id, parentRequire, loaded) {
			loaded(data);
		}
	}
});

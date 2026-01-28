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

define(["./m2", "module", "require"], function (m2, module, require) {
	// m2 just configs one of it's dependents in several ways

	var config = {};
	if (!module.config().isMapped) {
		require({config: {"pkg/m2": {config1: "config1"}}});
		require({config: {"./m2": {config2: "config2"}}});
		config[module.id + "/../m2"] = {config3: "config3"};
		require({config: config});
	} else {
		require({config: {"pkg/m2": {config1: "mapped-config1"}}});
		require({config: {"./m2": {config2: "mapped-config2"}}});
		config[module.id + "/../m2"] = {config3: "mapped-config3"};
		require({config: config});
	}
	return {getConfig: function () {
		return module.config();
	}};
});



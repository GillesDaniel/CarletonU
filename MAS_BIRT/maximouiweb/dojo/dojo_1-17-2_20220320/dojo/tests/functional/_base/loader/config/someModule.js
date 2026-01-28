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

define(["pkg/m1", "pkg/m2", "require", "module"], function (m1, m2, require, module) {
	require({config: {
		"pkg/m1": {configThroughMappedRefForM1: "configThroughMappedRefForM1"},
		"pkg/m2": {configThroughMappedRefForM1: "configThroughMappedRefForM1"}
	}});
	return {
		getConfig: function () {
			return module.config();
		},
		m1: m1,
		m2: m2
	};
});

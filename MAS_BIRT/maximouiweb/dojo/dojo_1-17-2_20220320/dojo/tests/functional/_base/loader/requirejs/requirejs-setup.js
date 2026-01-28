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

var testArgs = {
	async: (location.search.match(/(\&|\?)async/) == null) ? 0 : 1,
	baseUrl: '.'
};
var requirejsArgs = requirejsArgs || {
	dojoLocation: '../../../../..'
};

var ready = 0;
var dojoConfig = {
	async: testArgs.async,
	baseUrl: testArgs.baseUrl || '.',
	packages: [
		{ name: 'testing', location: requirejsArgs.dojoLocation },
		{ name: 'dojo', location: requirejsArgs.dojoLocation + '/node_modules/dojo' },
		{ name: 'dojox', location: requirejsArgs.dojoLocation + '/node_modules/dojo/../dojox' }
	],
	has: {
		'dojo-requirejs-api': 1,
		'config-tlmSiblingOfDojo': 0
	}
};

if (typeof require !== 'undefined') {
	(function () {
		for (var p in require) {
			dojoConfig[p] = require[p];
		}
	})();
}

(function () {
	var callback = dojoConfig.callback;
	dojoConfig.callback = function () {
		callback && callback.apply(this, arguments);
		ready = 1;
	};
})();

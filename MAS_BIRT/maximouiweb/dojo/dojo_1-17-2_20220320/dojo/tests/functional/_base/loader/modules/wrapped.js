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

if (require.has('dojo-amd-factory-scan')) {
	define(function (require, exports, module) {
		exports.five = require('./data').five;
		exports.exports = module.exports;
	});
}
else {
	define([ 'require', 'exports', 'module' ], function (require, exports, module) {
		exports.five = require('./data').five;
		exports.exports = module.exports;
	});
}

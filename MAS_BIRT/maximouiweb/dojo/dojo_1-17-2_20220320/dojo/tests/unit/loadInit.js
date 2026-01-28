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

define([
	'intern!object',
	'intern/chai!assert',
	'../../loadInit',
	'../../_base/loader'
], function (registerSuite, assert, loadInit, loader) {
	registerSuite({
		name: 'dojo/loadInit',

		'construction': function () {
			assert.equal(loadInit.dynamic, 0);
			assert.isDefined(loadInit.normalize);
			assert.equal(loadInit.load, loader.loadInit);
		},

		'.normalize': function () {
			var id = Math.random();
			assert.equal(loadInit.normalize(id), id);
		}
	});
});

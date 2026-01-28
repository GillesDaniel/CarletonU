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
	'require',
	'intern!object',
	'intern/chai!assert',
	'dojo/json'
], function (require, registerSuite, assert, JSON) {
	registerSuite({
		name: 'dojo/text',

		'no X-Requested-With header': function () {
			var dfd = this.async();

			require([ '../../text!/__services/request/xhr' ], dfd.callback(function (data) {
				data = JSON.parse(data);
				assert.ok(typeof data.headers['x-requested-with'] === 'undefined');
			}));
		}
	});
});

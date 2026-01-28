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
	'../../rpc/JsonService',
	'../../rpc/JsonpService',
	'../../_base/array',
	'dojo/_base/array'
], function (require, registerSuite, assert, JsonService, JsonpService, array1, array2) {
	assert.notStrictEqual(array1, array2);
	registerSuite({
		name: 'dojo/rpc',

		'JsonService': {
			'echo': function () {
				var testSmd = {
					serviceURL: '/__services/rpc/json',
					methods: [{
						name: 'myecho',
						parameters: [{
							name: 'somestring',
							type: 'STRING'
						}]
					}]
				};

				var svc = new JsonService(testSmd);
				return svc.myecho('RPC TEST').then(function (result) {
					assert.strictEqual(result, '<P>RPC TEST</P>');
				});
			},

			'empty param': function () {
				var testSmd = {
					serviceURL: '/__services/rpc/json',
					methods: [{ name: 'contentB' }]
				};

				var svc = new JsonService(testSmd);
				return svc.contentB().then(function (result) {
					assert.strictEqual(result, '<P>Content B</P>');
				});
			},

			'SMD loading': function () {
				var svc = new JsonService(require.toUrl('./rpc/support/testClass.smd'));
				assert.strictEqual(svc.smd.objectName, 'testClass');
			}
		},

		'JsonpService': function () {
			var testSmd = {
				methods: [{
					name: 'jsonp',
					serviceURL: '/__services/rpc/jsonp',
					parameters: [{
						name: 'query',
						type: 'STRING'
					}]
				}]
			};

			var svc = new JsonpService(testSmd);
			return svc.jsonp({ query: 'dojotoolkit' }).then(function (result) {
				assert.strictEqual(result.url, 'dojotoolkit.org/');
			});
		}
	});
});

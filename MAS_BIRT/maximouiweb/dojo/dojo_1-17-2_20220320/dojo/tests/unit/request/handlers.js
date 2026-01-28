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
	'../../../request/handlers',
	'dojo/has',
	'dojo/json',
	'dojo/has!host-browser?dojo/domReady!'
], function (registerSuite, assert, handlers, has, JSON) {
	var global = this;

	registerSuite({
		name: 'dojo/request/handlers',

		'text': function () {
			var response = handlers({
				text: 'foo bar baz ',
				options: {}
			});

			assert.strictEqual(response.data, 'foo bar baz ');
		},

		'json': function () {
			var object = {
				foo: 'bar',
				baz: [
					{ thonk: 'blarg' },
					'xyzzy!'
				]
			};

			var response = handlers({
				text: JSON.stringify(object),
				options: {
					handleAs: 'json'
				}
			});

			assert.deepEqual(response.data, object);
		},

		'javascript': function () {
			var object = {
				foo: 'bar',
				baz: [
					{ thonk: 'blarg' },
					'xyzzy!'
				]
			};
			var response = handlers({
				text: '(' + JSON.stringify(object) + ')',
				options: {
					handleAs: 'javascript'
				}
			});

			assert.deepEqual(response.data, object);

			response = handlers({
				text: 'true;',
				options: {
					handleAs: 'javascript'
				}
			});
			assert.ok(response.data);

			response = handlers({
				text: 'false;',
				options: {
					handleAs: 'javascript'
				}
			});
			assert.ok(!response.data);
		},

		'xml': function () {
			if (!has('host-browser')) {
				return;
			}

			var response = {
				text: '<foo><bar baz="thonk">blarg</bar></foo>',
				options: {
					handleAs: 'xml'
				}
			};

			if ('DOMParser' in global) {
				var parser = new DOMParser();
				response.data = parser.parseFromString(response.text, 'text/xml');
			}

			response = handlers(response);
			assert.strictEqual(response.data.documentElement.tagName, 'foo');
		},

		'register': {
			'custom handler': function () {
				handlers.register('custom', function () {
					return 'custom response';
				});

				var response = handlers({
					text: 'foo bar baz',
					options: {
						handleAs: 'custom'
					}
				});

				assert.strictEqual(response.data, 'custom response');
			}
		}
	});
});

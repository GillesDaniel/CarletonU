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
	'../../support/ready'
], function (require, registerSuite, assert, ready) {
	registerSuite({
		name: 'dojo/parser - parseOnLoad + auto-require',

		test: function () {
			return ready(this.get('remote'), require.toUrl('./parseOnLoadAutoRequire.html'))
				.setExecuteAsyncTimeout(5000)
				.executeAsync(function (done) {
					require([ 'testing/parser', 'dojo/domReady!' ], function (parser) {
						parser.parse().then(function () {
							/* global dr1, dr2, dr3 */
							done({
								typeofDr1: typeof dr1,
								dr1Foo: dr1.params.foo,
								typeofDr2: typeof dr2,
								dr2Foo: dr2.params.foo,
								typeofDr3: typeof dr3,
								dr3Foo: dr3.params.foo
							});
						});
					});
				})
				.then(function (results) {
					assert.deepEqual(results, {
						typeofDr1: 'object',
						dr1Foo: 'bar',
						typeofDr2: 'object',
						dr2Foo: 'bar',
						typeofDr3: 'object',
						dr3Foo: 'bar'
					});
				});
		}
	});
});

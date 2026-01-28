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
	/* global parsePromise, asyncWidget, syncWidget, finishCreatingAsyncWidgets */
	registerSuite({
		name: 'dojo/parser - async',

		test: function () {
			var remote = this.get('remote');
			return ready(remote, require.toUrl('./parserAsync.html'))
				.setExecuteAsyncTimeout(5000)
				.executeAsync(function (done) {
					require([
						'dojo/parser',
						'dojo/dom'
					], function (parser, dom) {
						window.parsePromise = parser.parse(dom.byId('main'));

						done({
							fulfilled: window.parsePromise.isFulfilled(),
							asyncWidget: typeof asyncWidget,
							syncStarted: syncWidget._started
						});
					});
				})
				.then(function (results) {
					console.log('here');
					assert.deepEqual(results, {
						fulfilled: false,
						asyncWidget: 'undefined',
						syncStarted: false
					});

					return remote
						.executeAsync(function (done) {
							require([ 'dojo/_base/array' ], function (array) {
								parsePromise.then(function (list) {
									done({
										asyncStarted: asyncWidget._started,
										syncStarted: syncWidget._started,
										classes: array.map(list, function (cls) {
											return cls.declaredClass;
										}).join(', ')
									});
								});
								finishCreatingAsyncWidgets.resolve(true);
							});
						})
						.then(function (results) {
							assert.deepEqual(results, {
								asyncStarted: true,
								syncStarted: true,
								classes: 'AsyncWidget, SyncWidget'
							});
						});
				});
		}
	});
});

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
	'sinon',
	'../../cache',
	'dojo/_base/url',
	'dojo/_base/lang'
], function (require, module, registerSuite, assert, sinon, cache, Url, lang) {
	var expected = '<h1>Hello World</h1>';
	var cacheNamespace = require.toAbsMid('./support/cache').replace(/\//g, '.');
	var cacheSanitizeOptions = { sanitize: true };

	registerSuite(function () {
		return {
			name: 'dojo/cache',

			'caches xhr request': function () {
				var actual = lang.trim(cache(cacheNamespace, 'regular.html'));
				assert.equal(actual, expected);
			},

			'sanatizes request': function () {
				var actual = lang.trim(cache(cacheNamespace, 'sanitized.html', cacheSanitizeOptions));
				assert.equal(actual, expected);
			},

			'object variant passed as module': function () {
				var objPath = require.toUrl('./__support/cache/object.html');
				var actual = lang.trim(cache(new Url(objPath), cacheSanitizeOptions));
				assert.equal(actual, expected);
			},

			'unset cache returns null and does not throw': function () {
				assert.isNull(cache(cacheNamespace, 'regular.html', null));
			},

			'set value': function () {
				assert.equal('', cache(cacheNamespace, 'regular.html', ''));
				assert.equal('', cache(cacheNamespace, 'regular.html'));
			}
		};
	});
});

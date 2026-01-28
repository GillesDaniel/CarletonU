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
	'../../regexp'
], function (registerSuite, assert, regexp) {
	var regexpString = '\f\b\n\t\r+.$?*|{}()[]\\/^';

	registerSuite({
		name: 'dojo/regexp',

		'escape': function () {
			var re1 = new RegExp(regexp.escapeString(regexpString));
			var re2 = new RegExp(regexp.escapeString(regexpString, '.'));

			assert.match('TEST\f\b\n\t\r+.$?*|{}()[]\\/^TEST', re1);
			assert.match('TEST\f\b\n\t\r+X$?*|{}()[]\\/^TEST', re2);
			assert.equal('a\\-z', regexp.escapeString('a-z'));
		}
	});
});

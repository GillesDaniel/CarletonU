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
	'../../../cldr/monetary'
], function (registerSuite, assert, monetary) {
	registerSuite({
		name: 'dojo/cldr/monetary',

		'.getData': {
			'known special case': function () {
				var actual = monetary.getData('ITL');

				assert.equal(actual.places, 0);
				assert.equal(actual.round, 0);
			},

			'defaults for cases not specifically defined': function () {
				var actual = monetary.getData('USD');

				assert.equal(actual.places, 2);
				assert.equal(actual.round, 0);
			}
		}
	});
});

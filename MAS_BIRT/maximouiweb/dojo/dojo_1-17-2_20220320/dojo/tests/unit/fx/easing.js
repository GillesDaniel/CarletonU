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
	'../../../fx/easing'
], function (registerSuite, assert, easing) {
	registerSuite({
		name: 'dojo/fx/easing',

		'module': {
			'full of functions': function () {
				for(var i in easing){
					assert.isFunction(easing[i]);
				}
			}
		},

		'performs some calculation': function () {
			for(var i in easing){
				assert.isFalse(isNaN(easing[i](0.5)));
			}
		}
	});
});

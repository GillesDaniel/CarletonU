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
		name: 'dojo/hash',

		sethash: function () {
			return ready(this.get('remote'), require.toUrl('./basehref.html'))
				.findById('sethash').click().end()
				.execute('return window.location.href').then(function(url){
					assert.isTrue(/basehref\.html#myhash1$/.test(url), 'setHash("myhash1"), location.href: ' + url);
				})
				.findById('sethashtrue').click().end()
				.execute('return window.location.href').then(function(url){
					assert.isTrue(/basehref\.html#myhash2$/.test(url),
						'setHash("myhash1", true), location.href: ' + url);
				})
		}
	});
});

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
	'intern/dojo/node!leadfoot/helpers/pollUntil'
], function (pollUntil) {
	function ready(remote, url, timeout) {
		return remote
			.get(url)
			.then(pollUntil(
				'return typeof ready !== "undefined" && ready ? true : undefined;',
				[],
				typeof timeout === 'undefined' ? 5000 : timeout
			));
	}

	return ready;
});

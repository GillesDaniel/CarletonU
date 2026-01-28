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

define('foo/bar/one',
	['require', './two', '../three', 'text!./message.txt'],
	function (require, two, three, message) {
		return {
			name: 'one',
			twoName: two.name,
			threeName: three.name,
			message: message
		};
	});

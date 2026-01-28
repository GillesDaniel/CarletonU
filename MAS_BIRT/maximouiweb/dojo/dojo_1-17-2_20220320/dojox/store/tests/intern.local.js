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
	'./intern'
], function (intern) {
	intern.useSauceConnect = false;
	intern.webdriver = {
		host: 'localhost',
		port: 4444
	};

	intern.environments = [
		{ browserName: 'firefox' },
		{ browserName: 'chrome' }
	];

	return intern;
});

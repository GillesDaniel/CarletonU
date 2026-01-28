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

define('testing/tests/functional/_base/loader/modules/full', [
	'./anon',
	'../a',
	'./wrapped',
	'require'
], function (anon, a, wrapped, require) {
	return {
		twiceTheAnswer: a.number + require('../a').number
	};
});

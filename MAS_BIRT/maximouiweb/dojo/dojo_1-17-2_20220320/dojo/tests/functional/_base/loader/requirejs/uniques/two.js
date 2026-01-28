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

define('two', ['one', 'three', 'one'], function (one, three, one2) {
	return {
		name: 'two',
		oneName: one.name,
		oneName2: one2.name,
		threeName: three.name
	};
});

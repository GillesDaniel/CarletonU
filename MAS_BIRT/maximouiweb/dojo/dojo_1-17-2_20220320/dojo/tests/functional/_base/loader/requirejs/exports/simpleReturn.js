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

//This file does not use exports, just
//return, but need to test that it does not
//automatically get an exports object assigned
define(
	function () {
		return function () {
			return 'simpleReturn';
		};
	}
);

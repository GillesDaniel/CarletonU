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

define('funcTwo',
	['require', 'funcOne'],
	function (require) {
		var two = function (name) {
			this.name = name;
			this.one = new (require('funcOne'))('ONE');
		};

		two.prototype.oneName = function () {
			return this.one.getName();
		};

		return two;
	}
);

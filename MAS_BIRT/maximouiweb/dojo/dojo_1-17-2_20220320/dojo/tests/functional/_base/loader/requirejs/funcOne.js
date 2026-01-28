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

define('funcOne',
	['require', 'funcTwo'],
	function (require) {
		var one = function (name) {
			this.name = name;
		};

		one.prototype.getName = function () {
			var inst = new (require('funcTwo'))('-NESTED');
			return this.name + inst.name;
		};

		return one;
	}
);

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

require({
		baseUrl: './'
	},
	['require', 'map', 'simple', 'dimple', 'func', 'doh'],
	function (require, map, simple, dimple, func, doh) {
		doh.register(
			'simple',
			[
				function colors(t) {
					t.is('map', map.name);
					t.is('blue', simple.color);
					t.is('dimple-blue', dimple.color);
					t.is('You called a function', func());
				}
			]
		);

		//In rhino there is no more simple tests, but in web browser there is.
		if (typeof moreSimpleTests === 'undefined') {
			doh.run();
		}
	}
);

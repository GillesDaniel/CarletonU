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

define("dojo/on/debounce", ['../debounce', '../on', './asyncEventListener'], function(debounce, on, asyncEventListener){
	// summary:
	//		This module provides an event debouncer for dojo/on
	// module:
	//		dojo/on/debounce

	return function(selector, delay){
		// summary:
		//		event parser for custom events
		// selector: String
		//		The selector to check against
		// delay: Interger
		//		The amount of ms before testing the selector

		return function(node, listenerFnc){
			return on(node, selector, asyncEventListener(debounce(listenerFnc, delay)));
		};
	};
});

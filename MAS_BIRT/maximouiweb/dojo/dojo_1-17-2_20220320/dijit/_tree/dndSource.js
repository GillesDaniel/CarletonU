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
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/lang", // lang.setObject
	"../tree/dndSource"
], function(kernel, lang, dndSource){
	// module:
	//		dijit/_tree/dndSource

	/*=====
	return {
		// summary:
		//		Deprecated module, use dijit/tree/dndSource instead.
	};
	=====*/

	// TODO: remove this file in 2.0
	kernel.deprecated("dijit._tree.dndSource has been moved to dijit.tree.dndSource, use that instead", "", "2.0");

	lang.setObject("dijit._tree.dndSource", dndSource);
});

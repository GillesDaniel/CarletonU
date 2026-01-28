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
	"dojo/_base/kernel",
	"dojo/_base/declare",
	"./Container"
], function(kernel, declare, Container){

	kernel.deprecated("dojox/mobile/FixedSplitterPane", "Use dojox/mobile/Container instead", 2.0);

	// module:
	//		dojox/mobile/FixedSplitterPane

	return declare("dojox.mobile.FixedSplitterPane", Container, {
		// summary:
		//		Deprecated widget. Use dojox/mobile/Container instead.

		baseClass: "mblFixedSplitterPane"
	});
});

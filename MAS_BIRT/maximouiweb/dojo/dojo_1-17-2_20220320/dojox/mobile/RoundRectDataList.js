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
	"./RoundRectList",
	"./_DataListMixin"
], function(kernel, declare, RoundRectList, DataListMixin){

	// module:
	//		dojox/mobile/RoundRectDataList

	kernel.deprecated("dojox/mobile/RoundRectDataList", 
		"Use dojox/mobile/RoundRectStoreList instead", "2.0");
		
	return declare("dojox.mobile.RoundRectDataList", [RoundRectList, DataListMixin], {
		// summary:
		//		A dojo/data-enabled version of RoundRectList.
		// description:
		//		RoundRectDataList is a subclass RoundRectList which
		//		can generate ListItems according to the given dojo/data store.
	});
});

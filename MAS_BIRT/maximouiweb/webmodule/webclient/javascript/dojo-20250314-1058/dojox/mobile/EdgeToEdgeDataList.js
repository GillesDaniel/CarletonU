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

define("dojox/mobile/EdgeToEdgeDataList", [
	"dojo/_base/kernel",
	"dojo/_base/declare",
	"./EdgeToEdgeList",
	"./_DataListMixin"
], function(kernel, declare, EdgeToEdgeList, DataListMixin){

	// module:
	//		dojox/mobile/EdgeToEdgeDataList

	kernel.deprecated("dojox/mobile/EdgeToEdgeDataList", 
		"Use dojox/mobile/EdgeToEdgeStoreList instead", "2.0");
	
	return declare("dojox.mobile.EdgeToEdgeDataList", [EdgeToEdgeList, DataListMixin],{
		// summary:
		//		A dojo/data-enabled version of EdgeToEdgeList.
		// description:
		//		EdgeToEdgeDataList is a subclass of EdgeToEdgeList which
		//		can generate ListItems according to the given dojo/data store.
	});
});

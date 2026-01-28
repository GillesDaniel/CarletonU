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

define("dojox/mobile/DataCarousel", [
	"dojo/_base/kernel",
	"dojo/_base/declare",
	"./Carousel",
	"./_DataMixin"
], function(kernel, declare, Carousel, DataMixin){

	// module:
	//		dojox/mobile/DataCarousel

	kernel.deprecated("dojox/mobile/DataCarousel", "Use dojox/mobile/StoreCarousel instead", 2.0);
	return declare("dojox.mobile.DataCarousel", [Carousel, DataMixin], {
		// summary:
		//		A dojo/data-enabled Carousel.
		// description:
		//		DataCarousel is a subclass of dojox/mobile/Carousel which
		//		can generate contents according to the given dojo/data store.
	});
});

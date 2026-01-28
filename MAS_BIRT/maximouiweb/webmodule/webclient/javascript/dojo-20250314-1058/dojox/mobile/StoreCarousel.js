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

define("dojox/mobile/StoreCarousel", [
	"dojo/_base/declare",
	"./Carousel",
	"./_StoreMixin"
], function(declare, Carousel, StoreMixin){

	// module:
	//		dojox/mobile/StoreCarousel

	return declare("dojox.mobile.StoreCarousel", [Carousel, StoreMixin], {
		// summary:
		//		A dojo/store enabled Carousel.
		// description:
		//		StoreCarousel is a subclass of dojox/mobile/Carousel which
		//		can generate contents according to the given dojo/store store.
	});
});

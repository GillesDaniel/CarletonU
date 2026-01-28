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

define("dojox/form/RangeSlider", [
	"dojo/_base/kernel", // kernel.deprecated
	"./_RangeSliderMixin",
	"./HorizontalRangeSlider",
	"./VerticalRangeSlider"
], function(kernel, RangeSliderMixin){

	// module:
	//		dojox/form/RangeSlider

	kernel.deprecated("Call require() for HorizontalRangeSlider / VerticalRangeSlider, explicitly rather than 'dojox.form.RangeSlider' itself", "", "2.0");

	/*=====
	 return {
		 // summary:
		 //		Rollup of all the the Slider related widgets
		 //		For back-compat, remove for 2.0
	 };
	=====*/
	return RangeSliderMixin; // for backward compatibility
});

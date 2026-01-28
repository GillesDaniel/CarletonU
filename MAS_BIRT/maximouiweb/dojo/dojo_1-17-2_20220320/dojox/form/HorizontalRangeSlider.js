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
	"dojo/_base/declare",
	"dojox/form/_RangeSliderMixin",
	"dojo/text!./resources/HorizontalRangeSlider.html",
	"dijit/form/HorizontalSlider"
], function(declare, RangeSliderMixin, template, baseSlider){

	return declare("dojox.form.HorizontalRangeSlider", [baseSlider, RangeSliderMixin], {
		// summary:
		//		A form widget that allows one to select a range with two horizontally draggable images
		templateString: template
	});
});

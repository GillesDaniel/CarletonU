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

define(["dojo/_base/lang"], 
  function(lang){
	var primitive = lang.getObject("dojox.charting.scaler.primitive", true);
	return lang.mixin(primitive, {
		buildScaler: function(/*Number*/ min, /*Number*/ max, /*Number*/ span, /*Object*/ kwArgs){
			if(min == max){
				// artificially extend bounds
				min -= 0.5;
				max += 0.5;
				// now the line will be centered
			}
			return {
				bounds: {
					lower: min,
					upper: max,
					from:  min,
					to:    max,
					scale: span / (max - min),
					span:  span
				},
				scaler: primitive
			};
		},
		buildTicks: function(/*Object*/ scaler, /*Object*/ kwArgs){
			return {major: [], minor: [], micro: []};	// Object
		},
		getTransformerFromModel: function(/*Object*/ scaler){
			var offset = scaler.bounds.from, scale = scaler.bounds.scale;
			return function(x){ return (x - offset) * scale; };	// Function
		},
		getTransformerFromPlot: function(/*Object*/ scaler){
			var offset = scaler.bounds.from, scale = scaler.bounds.scale;
			return function(x){ return x / scale + offset; };	// Function
		}
	});
});

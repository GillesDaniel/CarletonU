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
	"./_PickerBase",
	"./ValuePickerSlot" // to load ValuePickerSlot for you (no direct references)
], function(declare, PickerBase){

	// module:
	//		dojox/mobile/ValuePicker

	return declare("dojox.mobile.ValuePicker", PickerBase, {
		// summary:
		//		A value picker that has a stepper.
		// description:
		//		ValuePicker is a widget for selecting values. The values
		//		can be selected by using the Plus or Minus buttons, or by
		//		entering the value directly into the input field.
		//		This type of value picker is typically seen on Android devices.

		/* internal properties */	
		baseClass: "mblValuePicker",

		onValueChanged: function(/*dojox/mobile/ValuePickerSlot*/slot){
			// summary:
			//		Callback when the slot value is changed.
			// slot:
			//		The slot widget whose value has been changed.
			// tags:
			//		callback
		}
	});
});

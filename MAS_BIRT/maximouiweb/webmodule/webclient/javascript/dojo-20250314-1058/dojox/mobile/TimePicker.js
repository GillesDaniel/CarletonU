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

define("dojox/mobile/TimePicker", [
	"dojo/_base/lang",
	"./_PickerChooser!TimePicker"
], function(lang, TimePicker){

	/*=====
	return function(){
		// module:
		//		dojox/mobile/TimePicker
		// summary:
		//		A wrapper widget around SpinWheelTimePicker or ValuePickerTimePicker.
		//		Returns ValuePickerTimePicker when the current theme is "android" or "holodark".
		//		Returns SpinWheelTimePicker otherwise.

		 // TODO: need to list all the properties/methods in the interface provided by
		 // SpinWheelTimePicker / ValuePickerTimePicker
	 };
	=====*/

	return lang.setObject("dojox.mobile.TimePicker", TimePicker);
});

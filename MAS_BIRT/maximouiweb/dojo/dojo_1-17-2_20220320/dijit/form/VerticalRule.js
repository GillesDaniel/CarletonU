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
	"dojo/_base/declare", // declare
	"./HorizontalRule"
], function(declare, HorizontalRule){

	// module:
	//		dijit/form/VerticalRule

	return declare("dijit.form.VerticalRule", HorizontalRule, {
		// summary:
		//		Hash marks for the `dijit/form/VerticalSlider`

		templateString: '<div class="dijitRuleContainer dijitRuleContainerV"></div>',
		_positionPrefix: '<div class="dijitRuleMark dijitRuleMarkV" style="top:',

	/*=====
		// container: String
		//		This is either "leftDecoration" or "rightDecoration",
		//		to indicate whether this rule goes to the left or to the right of the slider.
		//		Note that on RTL system, "leftDecoration" would actually go to the right, and vice-versa.
		container: "",
	=====*/

		// Overrides HorizontalRule._isHorizontal
		_isHorizontal: false

	});
});

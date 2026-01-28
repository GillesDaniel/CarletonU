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

define("dijit/form/VerticalRuleLabels", [
	"dojo/_base/declare", // declare
	"./HorizontalRuleLabels"
], function(declare, HorizontalRuleLabels){

	// module:
	//		dijit/form/VerticalRuleLabels

	return declare("dijit.form.VerticalRuleLabels", HorizontalRuleLabels, {
		// summary:
		//		Labels for the `dijit/form/VerticalSlider`

		templateString: '<div class="dijitRuleContainer dijitRuleContainerV dijitRuleLabelsContainer dijitRuleLabelsContainerV"></div>',

		_positionPrefix: '<div class="dijitRuleLabelContainer dijitRuleLabelContainerV" style="top:',
		_labelPrefix: '"><span class="dijitRuleLabel dijitRuleLabelV">',

		_calcPosition: function(pos){
			// Overrides HorizontalRuleLabel._calcPosition()
			return 100-pos;
		},

		// needed to prevent labels from being reversed in RTL mode
		_isHorizontal: false
	});
});

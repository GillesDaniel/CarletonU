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
	"./main",
	"./dijit",
	"./ColorPalette",
	"./Declaration",
	"./Dialog",
	"./DialogUnderlay",
	"./TooltipDialog",
	"./Editor",
	"./_editor/plugins/FontChoice",
	"./_editor/plugins/LinkDialog",
	"./Menu",
	"./MenuItem",
	"./PopupMenuItem",
	"./CheckedMenuItem",
	"./MenuBar",
	"./MenuBarItem",
	"./PopupMenuBarItem",
	"./MenuSeparator",
	"./ProgressBar",
	"./TitlePane",
	"./Toolbar",
	"./Tooltip",
	"./Tree",
	"./InlineEditBox",
	"./form/Form",
	"./form/Button",
	"./form/DropDownButton",
	"./form/ComboButton",
	"./form/ToggleButton",
	"./form/CheckBox",
	"./form/RadioButton",
	"./form/TextBox",
	"./form/ValidationTextBox",
	"./form/CurrencyTextBox",
	"./form/DateTextBox",
	"./form/TimeTextBox",
	"./form/NumberSpinner",
	"./form/NumberTextBox",
	"./form/ComboBox",
	"./form/FilteringSelect",
	"./form/MultiSelect",
	"./form/Select",
	"./form/HorizontalSlider",
	"./form/VerticalSlider",
	"./form/HorizontalRule",
	"./form/VerticalRule",
	"./form/HorizontalRuleLabels",
	"./form/VerticalRuleLabels",
	"./form/SimpleTextarea",
	"./form/Textarea",
	"./layout/AccordionContainer",
	"./layout/ContentPane",
	"./layout/BorderContainer",
	"./layout/LayoutContainer",
	"./layout/LinkPane",
	"./layout/SplitContainer",
	"./layout/StackContainer",
	"./layout/TabContainer"
], function(dijit){

	// module:
	//		dijit/dijit-all

	/*=====
	return {
		// summary:
		//		A rollup that includes every dijit. You probably don't need this.
	};
	=====*/

	console.warn("dijit-all may include much more code than your application actually requires. We strongly recommend that you investigate a custom build or the web build tool");

	return dijit;
});

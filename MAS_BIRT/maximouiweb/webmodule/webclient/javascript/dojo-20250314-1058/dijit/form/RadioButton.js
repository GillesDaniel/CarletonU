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

define("dijit/form/RadioButton", [
	"dojo/_base/declare", // declare
	"./CheckBox",
	"./_RadioButtonMixin"
], function(declare, CheckBox, _RadioButtonMixin){

	// module:
	//		dijit/form/RadioButton

	return declare("dijit.form.RadioButton", [CheckBox, _RadioButtonMixin], {
		// summary:
		//		Same as an HTML radio, but with fancy styling.

		baseClass: "dijitRadio"
	});
});

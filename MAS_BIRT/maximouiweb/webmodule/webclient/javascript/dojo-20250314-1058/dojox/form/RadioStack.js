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

define("dojox/form/RadioStack", [
	"./CheckedMultiSelect",
	"./_SelectStackMixin",
	"dojo/_base/declare"
], function(CheckedMultiSelect, _SelectStackMixin, declare){
/*=====
return {
	// summary:
	//		A radio-based select stack.
};
=====*/
	return declare("dojox.form.RadioStack", [ CheckedMultiSelect, _SelectStackMixin ]);
});

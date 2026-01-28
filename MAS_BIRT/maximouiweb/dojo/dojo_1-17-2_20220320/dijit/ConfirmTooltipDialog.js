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
	"./TooltipDialog",
	"./_ConfirmDialogMixin"
], function(declare, TooltipDialog, _ConfirmDialogMixin) {
	
	return declare("dijit.ConfirmTooltipDialog", [TooltipDialog, _ConfirmDialogMixin], {
		// summary:
		//		A TooltipDialog with OK/Cancel buttons.
	});
});

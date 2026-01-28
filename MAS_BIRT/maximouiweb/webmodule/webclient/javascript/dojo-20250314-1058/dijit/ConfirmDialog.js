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

define("dijit/ConfirmDialog", [
	"dojo/_base/declare",
	"./Dialog",
	"./_ConfirmDialogMixin"
], function(declare, Dialog, _ConfirmDialogMixin) {

	return declare("dijit.ConfirmDialog", [Dialog, _ConfirmDialogMixin], {
		// summary:
		//		A Dialog with OK/Cancel buttons.
	});
});

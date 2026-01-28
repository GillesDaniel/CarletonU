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

define("dojox/form/BusyDropDownButton", [
	"./_BusyButtonMixin",
	"dijit/form/DropDownButton",
	"dojo/_base/declare"
], function(_BusyButtonMixin, DropDownButton, declare){
return declare("dojox.form.BusyDropDownButton", [DropDownButton, _BusyButtonMixin], {});
});

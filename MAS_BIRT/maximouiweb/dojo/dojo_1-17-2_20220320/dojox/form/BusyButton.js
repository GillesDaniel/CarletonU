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
	"./_BusyButtonMixin",
	"dijit/form/Button",
	"dojo/_base/declare"
], function(_BusyButtonMixin, Button, declare){

var BusyButton = declare("dojox.form.BusyButton", [Button, _BusyButtonMixin], {
	// summary:
	//		BusyButton is a simple widget which provides implementing more
	//		user friendly form submission.
	// description:
	//		When a form gets submitted by a user, many times it is recommended to disable
	//		the submit buttons to prevent double submission. BusyButton provides a simple set
	//		of features for this purpose

});
return BusyButton;
});

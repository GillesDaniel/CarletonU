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
	"dojo/_base/kernel",
	"dojo/_base/lang",
	"dijit/_HasDropDown"
], function(kernel, _HasDropDown){
	kernel.deprecated("dojox.form._HasDropDown", "Use dijit._HasDropDown instead", "2.0");

	lang.setObject("dojox.form._HasDropDown", _HasDropDown);
	return _HasDropDown;
});

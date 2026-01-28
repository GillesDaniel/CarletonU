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

define("dojox/form/DropDownSelect", [
	"dojo/_base/kernel",
	"dojo/_base/lang",
	"dijit/form/Select"
], function(kernel, lang, Select){
	kernel.deprecated("dojox.form.DropDownSelect", "Use Select instead", "2.0");

	lang.setObject("dojox.form.DropDownSelect", Select);
	return Select;
});

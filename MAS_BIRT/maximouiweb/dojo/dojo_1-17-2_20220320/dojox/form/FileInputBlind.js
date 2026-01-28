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
	"dojo/_base/lang",
	"dojox/form/FileInputAuto"
], function(lang, FileInputAuto){
// TODO: break out code in 2.0. Leave this stub in place until then. Leave FileInputBlind code in Auto.js for
// backwards compatibility.
	lang.setObject("dojox.form.FileInputBlind", FileInputAuto);
	return FileInputAuto;
});

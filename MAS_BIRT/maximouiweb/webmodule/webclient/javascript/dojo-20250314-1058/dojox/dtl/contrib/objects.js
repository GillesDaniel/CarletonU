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

define("dojox/dtl/contrib/objects", [
	"dojo/_base/lang",
	"../_base"	
], function(lang,dd){

	var objects = lang.getObject("contrib.objects", true, dd);
/*=====
	objects = {
		// TODO: summary
	};
=====*/

	lang.mixin(objects, {
		key: function(value, arg){
			return value[arg];
		}
	});

	dd.register.filters("dojox.dtl.contrib", {
		"objects": ["key"]
	});

	return objects;
});

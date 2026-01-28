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

define(["dojo/has"], function(has){
	// FIXME: this module should be replaced with a proper parser to correctly remove comments
	// see extensive commentary in dojo/_base/loader.js

	if(has("host-rhino")){
		return function(text){
			return text.replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg, "");
			// FIXME: try something like the following in rhino...
			//var f = new Function(text);
			//return f.toString();
		};
	}else{
		return function(text){
			return text.replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg, "");
		};
	}
});

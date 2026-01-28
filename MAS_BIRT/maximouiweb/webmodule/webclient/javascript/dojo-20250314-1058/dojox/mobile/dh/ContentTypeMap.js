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

define("dojox/mobile/dh/ContentTypeMap", [
	"dojo/_base/lang"
], function(lang){

	// module:
	//		dojox/mobile/dh/ContentTypeMap

	var o = {
		// summary:
		//		A component that provides a map for determining the content handler
		//		class from a content-type.
	};
	lang.setObject("dojox.mobile.dh.ContentTypeMap", o);

	o.map = {
		"html": "dojox/mobile/dh/HtmlContentHandler",
		"json": "dojox/mobile/dh/JsonContentHandler"
	};

	o.add = function(/*String*/ contentType, /*String*/ handlerClass){
		// summary:
		//		Adds a handler class for the given content type.
		this.map[contentType] = handlerClass;
	};

	o.getHandlerClass = function(/*String*/ contentType){
		// summary:
		//		Returns the handler class for the given content type.
		return this.map[contentType];
	};

	return o;
});

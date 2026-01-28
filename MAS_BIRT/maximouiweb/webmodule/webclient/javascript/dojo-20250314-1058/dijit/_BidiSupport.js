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

define("dijit/_BidiSupport", ["dojo/has", "./_WidgetBase", "./_BidiMixin"], function(has, _WidgetBase, _BidiMixin){

	// module:
	//		dijit/_BidiSupport

	/*=====
	return function(){
		// summary:
		//		Deprecated module for enabling textdir support in the dijit widgets.   New code should just define
		//		has("dojo-bidi") to return true, rather than manually requiring this module.
	};
	=====*/

	_WidgetBase.extend(_BidiMixin);

	// Back-compat with version 1.8: just including _BidiSupport should trigger bidi support in all the widgets.
	// Although this statement doesn't do much because the other widgets have likely already been loaded.
	has.add("dojo-bidi", true);

	return _WidgetBase;
});

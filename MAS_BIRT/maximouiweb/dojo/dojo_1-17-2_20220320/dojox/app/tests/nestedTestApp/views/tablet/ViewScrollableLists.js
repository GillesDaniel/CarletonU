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

define([], function(){
	return {
		init: function(){
			//console.log("navigation view init ok");
		},

		beforeActivate: function(){
			// summary:
			//		view life cycle afterActivate()
			//console.log("ViewScrollableLists view beforeActivate called");
		// this will be done in the other views, since beforeActivate is not called for the left view...
		//	if(dom.byId("tab1WrapperA")){ 
		//		domStyle.set(dom.byId("tab1WrapperA"), "visibility", "visible");  // show the nav view if it being used
		//		domStyle.set(dom.byId("tab1WrapperB"), "visibility", "visible");  // show the nav view if it being used
		//	}
		},

		afterActivate: function(){
			// summary:
			//		view life cycle afterActivate()
			//console.log("ViewScrollableLists view beforeActivate called");
		}
		
		
	};
});

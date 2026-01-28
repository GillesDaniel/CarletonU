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

define(["dojo/dom", "dojo/dom-class"], function(dom, domClass){

	return {
		// view init
		init: function(){
		},
		
		beforeActivate: function(view, data){
			// summary:
			//		view life cycle beforeActivate()
			//
			this.previousView = view;
			var backButtomDom = dom.byId('headerBackButton');
			domClass.remove(backButtomDom, "showOnPhone");
			domClass.add(backButtomDom, "hide");
			
			// setup code to watch for the navigation pane being visible
			
		},

		beforeDeactivate: function(){
			// summary:
			//		view life cycle beforeActivate()
			//
			var backButtomDom = dom.byId('headerBackButton');
			domClass.remove(backButtomDom, "hide");
			domClass.add(backButtomDom, "showOnPhone");
		}
	}
});

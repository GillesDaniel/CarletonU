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

define(["dojo/dom", "dojo/dom-style", "dojo/_base/connect", "dojo/_base/lang"], function(dom, domStyle, connect, lang){
	var _connectResults = []; // events connect result
	var doneOnce = false;

	return {
		// view init
		init: function(){
		},
		
		beforeActivate: function(){
			// summary:
			//		view life cycle beforeActivate()
			//
			// this code was added to get the testInfo to resize to fix the layout.
			if(!doneOnce){
				var dm = lang.getObject("dojox.mobile", true);
				dm.resizeAll();
				doneOnce = true;
			}
		},


		afterDeactivate: function(){
			// summary:
			//		view life cycle beforeActivate()
			//
			var connectResult = _connectResults.pop();
			while(connectResult){
				connect.disconnect(connectResult);
				connectResult = _connectResults.pop();
			}
		},
		
		// view destroy
		destroy: function(){
			var connectResult = _connectResults.pop();
			while(connectResult){
				connect.disconnect(connectResult);
				connectResult = _connectResults.pop();
			}

		}
	};
});

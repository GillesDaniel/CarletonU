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

dojo.provide("dojox.grid.tests.performance.module");

doh.register("dojox.grid.tests.performance.module", []);

try{
	var numRows = [100];
	var layouts = ["Single", "Dual"];
	var selectors = [false, true];
	dojo.forEach(numRows, function(r){
		dojo.forEach(layouts, function(l){
			dojo.forEach(selectors, function(s){
				// 5-minute timeout on each of these - since they can take quite a while...
				doh.registerUrl("Grid Creation - " + r + " Rows, " + l + " Layout" + (s ? "w/ selector" : ""),
					dojo.moduleUrl("dojox.grid.tests.performance", "creation.html") +
									"?rows=" + r + "&layout=" + l.toLowerCase() + "&rowSelector=" + s,
					300000);
				doh.registerUrl("Grid dojo.data Notification - " + r + " Rows, " + l + " Layout" + (s ? "w/ selector" : ""),
					dojo.moduleUrl("dojox.grid.tests.performance", "dataNotification.html") +
									"?rows=" + r + "&layout=" + l.toLowerCase() + "&rowSelector=" + s,
					300000);
			});
		});
	});
}catch(e){
	doh.debug(e);
}

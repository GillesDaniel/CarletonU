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
	"dojo/_base/declare",
	"./_CalendarYearView"
], function(declare, _CalendarYearView){
	return declare("dojox.widget._CalendarYear", null, {
		// summary:
		//		Mixin class for adding a view listing 12 years to the
		//		dojox/widget/_CalendarBase

		parent: null,

		constructor: function(){
			// summary:
			//		Adds a dojox/widget/_CalendarYearView view to the
			//		dojo/widget/_CalendarBase widget.
			this._addView(_CalendarYearView);
		}
	});
});

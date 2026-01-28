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
	"./_CalendarMonthYearView"
], function(declare, _CalendarMonthYearView){
	return declare("dojox.widget._CalendarMonthYear", null, {
		// summary:
		//		Mixin class for adding a view listing all 12
		//		months of the year to the dojox/widget/_CalendarBase

		constructor: function(){
			// summary:
			//		Adds a dojox/widget/_CalendarMonthView view to the calendar widget.
			this._addView(_CalendarMonthYearView);
		}
	});
});

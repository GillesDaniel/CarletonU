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

define("dojox/widget/YearlyCalendar", [
	"dojo/_base/declare",
	"./_CalendarBase",
	"./_CalendarYear"
], function(declare, _CalendarBase, _CalendarYear){
	return declare("dojox.widget.YearlyCalendar", [_CalendarBase, _CalendarYear], {
		// summary:
		//		A calendar with only a year view.
		_makeDate: function(value){
			var now = new Date();
			now.setFullYear(value);
			return now;
		}
	});
});

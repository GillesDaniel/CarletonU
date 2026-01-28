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

define("dojox/widget/MonthlyCalendar", [
	"dojo/_base/declare",
	"./_CalendarBase",
	"./_CalendarMonth"
], function(declare, _CalendarBase, _CalendarMonth){
	return declare("dojox.widget.MonthlyCalendar", [_CalendarBase, _CalendarMonth], {
		// summary:
		//		A calendar with only a month view.
		_makeDate: function(value){
			var now = new Date();
			now.setMonth(value);
			return now;
		}
	});
});

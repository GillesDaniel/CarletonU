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

define("dojox/widget/DailyCalendar", [
	"dojo/_base/declare",
	"./_CalendarBase",
	"./_CalendarDay"
], function(declare, _CalendarBase, _CalendarDay){
	return declare("dojox.widget.DailyCalendar", [_CalendarBase, _CalendarDay], {
		// summary:
		//		A calendar with only a daily view.
		_makeDate: function(value){
			var now = new Date();
			now.setDate(value);
			return now;
		}
	});
});

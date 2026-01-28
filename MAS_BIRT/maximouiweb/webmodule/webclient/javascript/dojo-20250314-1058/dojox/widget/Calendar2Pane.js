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

define("dojox/widget/Calendar2Pane", [
	"dojo/_base/declare",
	"./_CalendarBase",
	"./_CalendarDay",
	"./_CalendarMonthYear"
	], function(declare, _CalendarBase, _CalendarDay, _CalendarMonthYear){
		return declare("dojox.widget.Calendar2Pane", [_CalendarBase, _CalendarDay, _CalendarMonthYear], {
			// summary:
			//		A Calendar with two panes, the second one containing both month and year
	});
});

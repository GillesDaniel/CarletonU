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

define("dojox/widget/Calendar3Pane", [
	"dojo/_base/declare",
	"./_CalendarBase",
	"./_CalendarDay",
	"./_CalendarMonth",
	"./_CalendarYear"
	], function(declare, _CalendarBase, _CalendarDay, _CalendarMonth, _CalendarYear){
		return declare("dojox.widget.Calendar3Pane", [_CalendarBase, _CalendarDay, _CalendarMonth, _CalendarYear], {
			// summary:
			//		A Calendar with three panes, includes day, month, and year views
	});
});

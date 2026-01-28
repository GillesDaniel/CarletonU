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

define("dojox/widget/Calendar", [
	"dojo/_base/kernel",
	"dojo/_base/declare",
	"./_CalendarBase",
	"./_CalendarDay",
	"./_CalendarMonthYear"
], function(kernel, declare, _CalendarBase, _CalendarDay, _CalendarMonthYear){
	kernel.experimental("dojox/widget/Calendar");

	return declare("dojox.widget.Calendar", [_CalendarBase, _CalendarDay, _CalendarMonthYear], {
		// summary:
		//		The standard Calendar. It includes day and month/year views.
		//		No visual effects are included.
	});
});

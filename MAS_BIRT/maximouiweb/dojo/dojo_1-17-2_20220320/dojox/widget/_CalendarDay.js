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
	"./_CalendarDayView"
], function(declare, _CalendarDayView){
	return declare("dojox.widget._CalendarDay", null, {
		// summary:
		//		Mixin for the dojox.widget.Calendar which provides
		//		the standard day-view. A single month is shown at a time.
		parent: null,

		constructor: function(){
			this._addView(_CalendarDayView);
		}
	});
});

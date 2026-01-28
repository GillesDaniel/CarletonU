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

define("dojox/widget/CalendarFisheye", [
	"dojo/_base/declare",
	"./Calendar",
	"./_FisheyeFX"
], function(declare, Calendar, _FisheyeFX) {
	return declare("dojox.widget.CalendarFisheye", [ Calendar, _FisheyeFX ], {
		// summary:
		//		The standard Calendar. It includes day, month and year views.
		//		FisheyeLite effects are included.
	});
});

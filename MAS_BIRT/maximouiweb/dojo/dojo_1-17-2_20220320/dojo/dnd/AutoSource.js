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

define(["../_base/declare", "./Source"], function(declare, Source){
	return declare("dojo.dnd.AutoSource", Source, {
		// summary:
		//		a source that syncs its DnD nodes by default

		constructor: function(/*===== node, params =====*/){
			// summary:
			//		constructor of the AutoSource --- see the Source constructor for details
			this.autoSync = true;
		}
	});
});

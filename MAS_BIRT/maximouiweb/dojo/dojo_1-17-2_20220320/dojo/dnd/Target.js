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

define([ "../_base/declare", "../dom-class", "./Source" ], function(declare, domClass, Source){
	return declare("dojo.dnd.Target", Source, {
		// summary:
		//		a Target object, which can be used as a DnD target

		constructor: function(/*===== node, params =====*/){
			// summary:
			//		a constructor of the Target --- see the `dojo/dnd/Source` constructor for details
			this.isSource = false;
			domClass.remove(this.node, "dojoDndSource");
		}
	});
});

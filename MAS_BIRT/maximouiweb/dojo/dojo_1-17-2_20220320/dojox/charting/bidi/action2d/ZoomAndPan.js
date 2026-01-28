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

define(["dojo/_base/declare"],
	function(declare){
	// module:
	//		dojox/charting/bidi/action2d/ZoomAndPan	
	return declare(null, {
		_getDelta: function(event){
			var delta = this.inherited(arguments);
			return delta * (this.chart.isRightToLeft()? -1 : 1);				
		}
	});
});

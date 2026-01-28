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

define(["dojo/_base/declare", "dojox/widget/_Invalidating"], function(declare, _Invalidating){
	return declare("dojox.dgauges.IndicatorBase", _Invalidating, {
		// summary:
		//		The base class for indicators. Basically, an indicator is used to render a value.

		// value: Number
		//		The value of this indicator.
		value: null
	});
});

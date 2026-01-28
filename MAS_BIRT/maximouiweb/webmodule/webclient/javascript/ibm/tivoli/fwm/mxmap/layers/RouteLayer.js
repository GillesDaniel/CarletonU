/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2012,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */

/**
 * Represents the routes layer. Turning this layer on or off shows or hider the route paths.
 */
define(["dojo/_base/declare", 
	"ibm/tivoli/fwm/mxmap/layers/Layer"], function(declare, Layer) {
	return declare([Layer], {
		/**
		 * Starts the layer as enabled.
		 */
		init: function()
		{
			this.inherited(arguments);
			this.enable();
		},
		/**
		 * Enables this layer
		 */
		enable: function()
		{
			this.inherited(arguments);
			this._map.enableRoutes();
		},
		/**
		 * Disables this layer
		 */
		disable: function()
		{
			this.inherited(arguments);
			this._map.disableRoutes();
		}
	});
});

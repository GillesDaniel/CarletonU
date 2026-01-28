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
 * Represents a symbology legend
 * 
 * The constructor receive the following parameters:
 * 
 * {layerName: a string e.g.: "Approved",
 *  parentLayer: the layer that is creating this layer,
 * }
 */
define("ibm/tivoli/fwm/mxmap/layers/LegendLayer", ["dojo/_base/declare", "ibm/tivoli/fwm/mxmap/layers/Layer"], function(declare, Layer) {
	return declare([Layer], {
		symbol: null,
		minValue: null,
		maxValue: null,
		isDefault: false,
		/**
		 * Sets the right icon (legend marker)
		 */
		init: function()
		{
			this._disabled = false;
			this.inherited(arguments);
			this._setRightIconURL();
		},
		/**
		 * Updates the status of the legend but do not redraw markers
		 */
		enableButDontRedrawMarkers: function()
		{
			this._disabled = false;
			this._setLeftIconURL();
		},

		/**
		 * Shows markers of this legend
		 */
		enable: function()
		{
			this.enableButDontRedrawMarkers()
			this._map.getLayersManager().redrawMarkers();
		},
		/**
		 * Shows markers of this legend
		 */
		disable: function()
		{
			this._disabled = true;
			this._setLeftIconURL();
			this._map.getLayersManager().redrawMarkers();
		},
		getSymbolURL: function()
		{
			var symbolURL = null;
			if (this.symbol != null){
				symbolURL = this.symbol.url;
			}
			return symbolURL;
		},
		getMinValue: function()
		{
			return this.minValue;
		},
		getMaxValue: function()
		{
			return this.maxValue;
		},
		isDefaultLegend: function()
		{
			return this.isDefault;
		},
		/**
		 * Sets the right icon (legend marker)
		 */
		_setRightIconURL: function()
		{
			this._rightIconURL = this.getSymbolURL();
		}
	});
});

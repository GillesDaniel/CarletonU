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

define("ibm/tivoli/fwm/mxmap/layers/SymbologyLayer", ["dojo/_base/declare", "ibm/tivoli/fwm/mxmap/layers/Layer"], function(declare, Layer) {
	/**
	 * Represents a map symbology
	 * 
	 * The constructor receive the following parameters:
	 * 
	 * {layerName: a string e.g.: "Status",
	 *  parentLayer: the layer that is creating this layer,
	 * }
	 */
	return declare([Layer], {
		symbologyType: null,
		_defaultSymbology: null,
		/**
		 * Disables all the other sibling symbologies
		 */
		_disableSiblings: function()
		{
			var siblings = this.getSiblings();
			dojo.forEach(siblings, function(sibling){
				sibling.disable();
			});
		},
		/**
		 * Enables this symbology layer, executes the action that configures the markers for this symbology
		 * and disables all the other sibling symbologies
		 * (but do not redraw markers)
		 */
		toggleStateButDontRedrawMarkers: function()
		{
			this._disableSiblings();
			this.enableButDontRedrawMarkers();
		},
		/**
		 * Enables this symbology layer, executes the action that configures the markers for this symbology
		 * and disables all the other sibling symbologies
		 */
		toggleState: function()
		{
			this._disableSiblings();
			this.enable();
		},
		/**
		 * Enables this layer and configures the markers for the records according 
		 * to the legends (children of this symbology)
		 */
		enableButDontRedrawMarkers: function()
		{
			this._disabled = false;
			this._setLeftIconURL();
			var layerId = this.getParentLayer().getLayerId();
			this._map.getSymbologyManager().setActiveSymbology(layerId, this.layerConf);
		},
		enable: function()
		{
			this.enableButDontRedrawMarkers();
			this._map.getLayersManager().redrawMarkers();
		},
		/**
		 * Disables this layer
		 */
		disable: function()
		{
			this._disabled = true;
			this._setLeftIconURL();
		},
		_setDefault: function(value)
		{
			this._defaultSymbology = value;
		},
		setDefault: function()
		{
			var siblings = this.getSiblings();
			dojo.forEach(siblings, function(sibling){
				sibling._setDefault(false);
			});
			this._setDefault(true);
		},
		isDefault: function()
		{
			return (this._defaultSymbology == true);
		}
	});
});


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

define(["dojo/_base/declare",
	"ibm/tivoli/fwm/mxmap/layers/Layer",
	"ibm/tivoli/fwm/mxmap/_Base"], 
	function(declare, Layer, _Base) {
	return declare([Layer], {
		constructor: function(options)
		{
			this._layerName = options.layerId;
			this._layerId = options.layerId;
			this.enable();
			this.layerConf = this.symbManager.getLayerConfigById(options.objectType);
		}
	});
});

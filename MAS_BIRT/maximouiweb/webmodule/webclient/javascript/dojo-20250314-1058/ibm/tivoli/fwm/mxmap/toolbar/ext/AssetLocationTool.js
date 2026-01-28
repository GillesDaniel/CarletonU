/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2011,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
define("ibm/tivoli/fwm/mxmap/toolbar/ext/AssetLocationTool", ["dojo/main", "dojo/_base/declare",
		"ibm/tivoli/fwm/mxmap/toolbar/ext/_ToggleTool",
		"dijit/form/Button"
	], function(dojo, declare, _ToggleTool, Button) {
	
	/**
	 * Asset Location tool.
	 */
	return declare([_ToggleTool], {
		label: "Current Asset Location",
		iconClass: "basicMapToolbarBtn assetLocationMapToolbarBtn",
		map: null,
		constructor: function(params)
		{
			dojo.mixin(this, params);
			var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "assetlocationtool");
			this.label = _label || this.label;
		},
		executeOn: function()
		{
			dojo.publish("changeLayerLatLngSource_" + this.map.getId(), [ "asset", true ]);
		},
		executeOff:function()
		{
			dojo.publish("changeLayerLatLngSource_" + this.map.getId(), [ "asset", false ]);
		},

		disable: function()
		{
			// does nothing
		},
		destroy: function()
		{
			this.destroyRecursive();
		}
		
	});
	
});

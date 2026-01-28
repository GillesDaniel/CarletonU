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
define("ibm/tivoli/fwm/mxmap/toolbar/ext/WorkOrderSymbologyTool", ["dojo/_base/declare", "ibm/tivoli/fwm/mxmap/layers/LayerPanelWidget", "ibm/tivoli/fwm/mxmap/_Base",
	"ibm/tivoli/fwm/mxmap/toolbar/ext/LayersTool", "dijit/form/Button" ], function(declare, LayerPanelWidget, _Base, 
			LayersTool, Button) {
	
	/**
	 * Work order symbology tool (this is just a shortcut to Layers -> Work Order)
	 */
	ibm.tivoli.fwm.mxmap.toolbar.ext.WorkOrderSymbologyTool = declare([LayersTool], {
		iconClass: "basicMapToolbarBtn workOrderSymbologyMapToolbarBtn",
		constructor: function(params)
		{			
			dojo.mixin(this, params); 
			var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "workordersymbology");
			this.label = _label || this.label;
		},
		execute: function()
		{
			var layer = this.map.getLayersManager().getLayerById("workorder");
			if((layer != null) && (layer.hasChildren()))
			{
				this._destroyCurrentPanelWidget();
				var _layerPanelManager = new ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget({map: this.map, tool: this, title: layer.getChildrenTitle()});		
				_layerPanelManager.updateLayers(layer.getChildren());
			}
		}
	});
	return ibm.tivoli.fwm.mxmap.toolbar.ext.WorkOrderSymbologyTool;
});

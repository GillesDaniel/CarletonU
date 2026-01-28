/* IBM Confidential
 *
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

define( "ibm/tivoli/fwm/mxmap/toolbar/ext/FindLocationTool", ["dojo/_base/declare", 
		"dojo/dom-construct",
		"ibm/tivoli/fwm/mxmap/findlocation/FindLocationPanelWidget",
		"ibm/tivoli/fwm/mxmap/toolbar/ext/_ToggleTool"], function (declare, domConstruct, FindLocationBar, _ToggleTool ) {

	return declare( [_ToggleTool], {
		
		/* The label that will be shown as a tooltip for the tool */
		label: ibm.tivoli.fwm.i18n.getMaxMsg("map", "findLocation")	,
		
		iconClass: "basicMapToolbarBtn findLocationToolbarBtn",
		
		toolName: "findLocationTool",
		/* Tool initialization. The params argument,
		 * by default, contains only the Map reference */
		constructor: function(params)
		{
			dojo.mixin(this, params);
		},
		executeOn: function()
		{		
			this.map.getMaximo().isCurrentMboAddressable(dojo.hitch(this, function(data) {
				if (data) {
					if (data.result == "success") {
						if (!data.isAddressable) {
							this.map.getMaximo().showMessage("map", "ServiceAddressNotAvailable");
							return;
						}
						if (!data.isAddressEditable) {
							this.map.getMaximo().showMessage("map", "ServiceAddressNotEditable");
							return;
						}	
						if (!this.findLocationBar) {
							this.findLocationBar = new FindLocationBar({
								map: this.map, 
								tool: this,
								toolName: this.toolName
							});
							this.findLocationBar.createBar();
						}
						this.findLocationBar.show();
					} else if (data.result == "fail") {
						this.getMaximo().showMessage(data.group, data.key, data.params);
					}
				}
				
				
			}));
			
			
			
		},
		executeOff: function() {
			if (this.findLocationBar) {
				this.findLocationBar.hide();
			}
		},
		saveToolConfiguration: function() {

		},
		disable: function()
		{
					
		},
		destroy: function()
		{
			if (this.findLocationBar) {
				this.findLocationBar.destroy();
			}
		}
	})
});

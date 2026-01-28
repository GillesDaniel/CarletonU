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

define(["dojo/main","dijit/main",
		"dojo/_base/declare","ibm/tivoli/fwm/mxmap/_Base",
		"dijit/_Widget",
		"dijit/_Templated",
		"ibm/tivoli/fwm/mxmap/panels/MobileInfoPanelDialog",
		"ibm/tivoli/fwm/mxmap/layers/LayerWidget",
		"ibm/tivoli/fwm/mxmap/layers/LegendLayer",
		"ibm/tivoli/fwm/mxmap/layers/SymbologyLayer"], 
		function(dojo, dijit, declare, _Base, _Widget, _Templated, MobileInfoPanelDialog, LayerWidget, LegendLayer, SymbologyLayer) {
	
	var LayerPanelWidget = declare([_Widget, _Templated, _Base], {
		templateString: dojo.cache("ibm.tivoli.fwm.mxmap", "templates/LayerPanelWidget.html"),
		infoPanel: null,
		map: null,
		_layers: null,
		_title: null,
		_div: null,
		constructor: function(params) 
		{
			dojo.mixin(this, params);
			this._layers = [];
			this._title = params.title;
			if((params.tool != undefined) && (params.tool != null))
			{
				params.tool.setPanelWidget(this);
			}
			// this._title = ibm.tivoli.fwm.i18n.getMaxMsg("map", "layers");
		},
		postCreate: function()
		{
		},
		// newLayers can be any type of Layer object (layer, symbology, legend)
		updateLayers: function(newLayers /* [] of Layer */)
		{
			if (dojo.config.fwm.debug == true)
			{
				console.log("[LayerPanelWidget] Update Layers: ", newLayers);
			}
			dojo.forEach(this._layers, function(layer)
			{
				layer.destroyRecursive(true);
			});
			var div = dojo.create("div");
			
			
			dojo.style(div, {
				borderBottom : '1px solid #E0E0E0'
			});
			
			this._layers = [];

			for ( var i = 0; i < newLayers.length; i++)
			{
				if (newLayers[i].isVisibleInUI()) // Don't show empty layers
				{
					var layerWidget = new LayerWidget({
						layer: newLayers[i],
						layerPanel: this,
						closeOnAction: false
					});
					dojo.place(layerWidget.domNode, div, 'last');
					this._layers.push(layerWidget);
				}
			}
			dojo.place(div, this.layers, 'only');
			
			var customButtonArray = [];
			var resetBtn = null;
			var resetButtonLabel = ibm.tivoli.fwm.i18n.getMaxMsg("map", "resetlayers");
			var backBtn = null;
			var backButtonLabel = ibm.tivoli.fwm.i18n.getMaxMsg("map", "layersbackbtn");

			// Change the title of the panel according to the type of symbology
			if (newLayers[0] instanceof SymbologyLayer)
			{
				this._title = this._title || ibm.tivoli.fwm.i18n.getMaxMsg("map", "symbologydialogtitle");
				// Button to reset all symbologies for a layer
				resetBtn = this.createButtonParams(
					dojo.hitch(this, 
						function()
						{
							var layer = newLayers[0].getParentLayer();
							this.map.getLayersManager().resetSymbologies(layer);
							this.updateIcons();
						}
					),
					resetButtonLabel
				);
				customButtonArray.push(resetBtn);
			}
			else if (newLayers[0] instanceof LegendLayer)
			{
				this._title = this._title || ibm.tivoli.fwm.i18n.getMaxMsg("map", "legenddialogtitle");
				// Button to go back to the symbology dialog
				backBtn = this.createButtonParams(
					dojo.hitch(this, 
						function()
						{
							// The idea here is to get the Layer (which is the grandparent of legend - Layer->Symbology->Legend)  
							var layer = newLayers[0].getParentLayer().getParentLayer();
							if(layer != null)
							{
								// Create another dialog for the children of layer (symbologies)
								var panel = new LayerPanelWidget({map: this.map, tool: this.tool, title: layer.getChildrenTitle()});	
								// populate the dialog with the simbologies
								panel.updateLayers(layer.getChildren());
								// Close the current dialog
								this.close();
							}
						}
					),
					backButtonLabel
				);
				customButtonArray.push(backBtn);

				// Button to reset all legends for a symbology
				resetBtn = this.createButtonParams(
					dojo.hitch(this, 
						function()
						{
							var symbology = newLayers[0].getParentLayer();
							this.map.getLayersManager().resetLegends(symbology);
							this.updateIcons();
						}
					),
					resetButtonLabel
				);
				customButtonArray.push(resetBtn);
			}
			else
			{
				this._title = this._title || ibm.tivoli.fwm.i18n.getMaxMsg("map", "layers");
				// Button to reset all layers
				resetBtn = this.createButtonParams(
					dojo.hitch(this, 
						function()
						{
							this.map.getLayersManager().resetLayers();
							this.updateIcons();
						}
					),
					resetButtonLabel
				);
				customButtonArray.push(resetBtn);
			}

			this.close();

			this.infoPanel = new MobileInfoPanelDialog({
				map: this.map,
				title: this._title,
				nonModal: true,
				customButtons: customButtonArray
			});
			this.infoPanel.setContent(this.domNode);
			this.infoPanel.show(true);
		},
		close: function()
		{
			if (this.infoPanel)
			{
				this.infoPanel.close();
				this.infoPanel = null;
			}
		},
		updateIcons: function()
		{
			dojo.forEach(this._layers, function(layer)
					{
						layer.setLeftIcon();
					});
		},
		createButtonParams: function(action, label)
		{
			return btnParams = {
				label: label,
				onClick: dojo.hitch(this, function()
				{
					action();
				})
			};
		}
	});
	
	return LayerPanelWidget;
});

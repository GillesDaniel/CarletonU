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
define(["dojo/_base/declare", "ibm/tivoli/fwm/mxmap/_Base", "dijit/_Widget", "dijit/_Templated"], 
		function(declare, _Base, _Widget, _Templated) {
	
	ibm.tivoli.fwm.mxmap.layers.LayerWidget = declare([_Widget, _Templated], {
		templateString: dojo.cache("ibm.tivoli.fwm.mxmap", "templates/LayerWidget.html"),
		layer: null,
		_layerLeftImageDom: null,
		_layerRightImageDom: null,
		layerPanel: null,
		_symbologyPanelManager: null,
		constructor:function(params){
			dojo.mixin(this, params);				
		},
		postCreate:function(){	
			this.layerInfo.textContent = this.layer.getLayerName();
			this.setLeftIcon();
			this.setRightIcon();
			dojo.style(this.layerInfo, "float", (document.body.dir == "rtl") ? "right" : "left");
		},
		_showChildrenLayerWidget: function(){
			if(this.layer.hasChildren() == true){
				// When clicking on the arrow, enable the current layer (or symbology) if it was disabled
				if(this.layer.isDisabled())
				{
					this.layer.toggleState();
				}
				var _childPanelManager = new ibm.tivoli.fwm.mxmap.layers.LayerPanelWidget({map: this.layerPanel.map, tool: this.layerPanel.tool, title: this.layer.getChildrenTitle()});		
				_childPanelManager.updateLayers(this.layer.getChildren());
				this.layerPanel.close();
			}
		},
		_enableOrDisableLayer: function(){
			this.layer.toggleState();
			
			if(this.layerPanel && this.closeOnAction){
				this.layerPanel.close();
			}
			else
			{
				this.layerPanel.updateIcons();
			}
		},
		destroyRecursive: function(){
			this.inherited(arguments);
			if(this._layerImageDom){
				dojo.destroy(this._layerImageDom);
			}
			if(this._layerRightImageDom){
				dojo.destroy(this._layerRightImageDom);
			}
		},
		setLeftIcon: function()
		{
			var leftIconURL = this.layer.getLeftIconURL();
			if(leftIconURL != null)
			{
				// Since this is called both when creating and updating the widget,
				// we only create the image element if it doesn't already exist.
				if (this._layerLeftImageDom)
				{
					dojo.attr(this._layerLeftImageDom, "src", leftIconURL);
				}
				else
				{
					this._layerLeftImageDom = dojo.create("img",{src: leftIconURL},this.activeOrHiddenImage, "only");
					dojo.style(this._layerLeftImageDom, {opacity: 1.0, visibility: "visible"});
				}
			}
		},
		setRightIcon: function()
		{
			var rightIconURL = this.layer.getRightIconURL();
			this._layerRightImageDom = dojo.create("img",{src: rightIconURL},this.submenu,"last");
			// If the layer has no right icon, make it invisible in order to avoid showing a broken image icon.
			if(rightIconURL == null){
				dojo.style(this._layerRightImageDom, {visibility: "hidden"});
			}
		}
	});
	return ibm.tivoli.fwm.mxmap.layers.LayerWidget;
});

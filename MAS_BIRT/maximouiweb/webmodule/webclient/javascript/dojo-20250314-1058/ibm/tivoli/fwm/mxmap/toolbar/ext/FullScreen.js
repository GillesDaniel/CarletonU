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

define("ibm/tivoli/fwm/mxmap/toolbar/ext/FullScreen", ["dojo/main","dijit/main",
		"dojo/_base/declare",
		"ibm/tivoli/fwm/mxmap/toolbar/ext/_ToggleTool", 
		"dijit/form/Button"], 
		function(dojo, dijit,declare, _ToggleTool, Button) {
	/**
	 * Full Screen tool bar action.
	 */
	return declare([_ToggleTool], {
		_labelOn: "Set Full Screen On",
		_labelOff: "Set Full Screen Off",
		iconClass: "basicMapToolbarBtn fullScreenMapToolbarBtn",
		map: null,
		openMap: null,
		_isFullScreen: false,
		constructor: function(params)
		{
			dojo.mixin(this, params);
			this._isFullScreen = false;
			this._handlers=[];
			var labelOn = ibm.tivoli.fwm.i18n.getMaxMsg("map", "toolbarfullscreenon");
			var labelOff = ibm.tivoli.fwm.i18n.getMaxMsg("map", "toolbarfullscreenoff");
			this._labelOn = labelOn || this._labelOn; 
			this._labelOff = labelOff || this._labelOff;
			
			// listen to these events to update the button label/image by external
			// full screen changes
			this.addSubscription("mapFullScreenModeChanged_"+this.map.getId(), dojo.hitch(this, this._updateFullScreenState));
			if(this.map.mapConf.isOpenMap)
			{
				this.openMap = dojo.byId("pluss_open_map_bodydiv");
			}
			
		},
		createToolbarButton: function()
		{
			this._button = new Button({
				label: this._labelOn,
				showLabel: false,
				iconClass: this.iconClass,
				onClick: dojo.hitch(this, function()
				{	
					this.execute();
				})
			});
			return this._button;
		},
		executeOn: function()
		{	
			if(this.openMap)
			{
				dojo.addClass(this.openMap, "fullScreenOpenMap");
				this.map.fullScreenOn();
			}else
			{
				this._doFullScreen();
			}
		},
		executeOff:function()
		{
			if(this.openMap)
			{
				dojo.removeClass(this.openMap, "fullScreenOpenMap");
				this.map.fullScreenOff();
			}else
			{
				this._restoreOriginalSize();
			}
		
		},
		disable: function()
		{
			// does nothing
		},

		_doFullScreen: function()
		{
			this._changeButtonState(true, this._labelOff);
			this.map.fullScreenOn();
		},
		_restoreOriginalSize: function(event)
		{
			this._changeButtonState(false, this._labelOn);
			this.map.fullScreenOff();
		},
		_updateFullScreenState: function(event)
		{
			if (event.modeOn == true)
			{
				this.setActive(true);
				this._changeButtonState(true, this._labelOff);			
			}
			else
			{
				this.setActive(false);
				this._changeButtonState(false, this._labelOn);
			}
		},
		_changeButtonState: function(fullScreenMode, newLabel)
		{
			this._button.set({
				label: newLabel
			});
			this._isFullScreen = fullScreenMode;
		}	
		
	});
});

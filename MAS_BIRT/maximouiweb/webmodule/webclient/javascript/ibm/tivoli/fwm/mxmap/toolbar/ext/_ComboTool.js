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


define(["dojo/main","dijit/main", "dojox/main",
	"dojo/_base/declare", 
	"ibm/tivoli/fwm/mxmap/_Base",
	"dijit/Menu",
	"dijit/MenuItem",
	"dijit/form/ComboButton",
	"ibm/tivoli/fwm/mxmap/toolbar/ext/_ToggleTool",
	"ibm/tivoli/fwm/mxmap/toolbar/ext/ToggleComboButton"], 
	function(dojo, dijit, dojox, declare, _Base, Menu, MenuItem, ComboButton, _ToggleTool, ToggleComboButton ) {
	return declare([_ToggleTool], {
		_menu: null,
		_selectedOption: null,
		constructor: function(params)
		{
			dojo.mixin(this, params);
			this._menu = new dijit.Menu();
		},
		// All menu items must be added prior to button creation
		addMenuItem: function(menuItemId, menuItemLabel, defaultMenuItem)
		{
			if(menuItemId != undefined && menuItemLabel != undefined)
			{
				var existingItem = dijit.byId(menuItemId);
				if (existingItem) {
					existingItem.destroyRecursive(true);
				}
				var menuItem = new dijit.MenuItem({
					id: menuItemId,
					iconClass: defaultMenuItem == true ? "menuItemSelected" : "menuItemUnselected",
							label: menuItemLabel
				});
				if(defaultMenuItem == true)
				{
					this._selectedOption = menuItem;
				}

				this._menu.addChild(menuItem);
			}
			else
			{
				console.error("[_ComboTool] Menu items must have an ID and a label");
			}
		},
		createToolbarButton: function()
		{
			this._button = new ToggleComboButton({
				label: this.label,
				showLabel: false,
				iconClass: this.iconClass,
				"class": "mapComboTool",
				dropDown: this._menu,
				onClick: dojo.hitch(this, function()
						{
					this.execute({menuItem: this.getSelectedOption()});
						})

			});
			this.addConnection("onItemClick", dojo.hitch(this,this._onMenuItemClick), this._menu, this);
			return this._button;
		},
		_onMenuItemClick: function(evt)
		{
			var menuItems = this._menu.getChildren();
			for(var i = 0; i < menuItems.length; i++)
			{
				if(menuItems[i] == evt)
				{
					this._selectedOption = evt;
					this._selectedOption.set("iconClass", "menuItemSelected"); 
				}
				else
				{
					menuItems[i].set("iconClass", "menuItemUnselected"); 
				}
			}
			this.setActive(true);
			this.executeOn({menuItem: this.getSelectedOption()});
		},
		getSelectedOption: function()
		{
			return this._selectedOption;
		},
		destroyRecursive: function()
		{
			this._menu.destroyRecursive();
			this.inherited(arguments);
		}

	});
});

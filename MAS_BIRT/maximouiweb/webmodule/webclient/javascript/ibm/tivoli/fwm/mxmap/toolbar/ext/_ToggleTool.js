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


define(["dojo/main", "dijit/main", "dojox/main", "dojo/_base/declare",
	"ibm/tivoli/fwm/mxmap/_Base",
	"dijit/form/ToggleButton",
	"ibm/tivoli/fwm/mxmap/toolbar/ext/_ToolTemplate"], 
	function(dojo, dijit, dojox, declare, _Base, ToggleButton, _ToolTemplate) {
	return declare([_ToolTemplate], {
		toolActive: false,
		constructor: function(params)
		{
			dojo.mixin(this, params);
		},
		createToolbarButton: function()
		{
			this._button = new dijit.form.ToggleButton({
				label: this.label,
				showLabel: false,
				iconClass: this.iconClass,
				onClick: dojo.hitch(this, function(params)
						{
					this.execute(params);
						})

			});
			return this._button;

		},
		/**
		 * The execute method has been overridden here to run toggleStatus()
		 */
		execute: function(params)
		{
			this.toggleStatus(params);
		},
		/**
		 * Runs either executeOn or executeOff, depending on the toolActive status.
		 * The executeOff and executeOn methods must be implemented.
		 * Should any error occur in the executeOff and executeOn routines that requires the status to remain the same,
		 * the setActive(true/false) method must be called explicitly.
		 */
		toggleStatus: function(params)
		{
			if(this.isActive() == true)
			{
				this.setActive(false);
				this.executeOff(params);
			}
			else
			{
				this.setActive(true);
				this.executeOn(params);
			}
		},
		/**
		 * Checks if the tool is active
		 */
		isActive: function()
		{
			return this.toolActive;
		},
		executeOn: function()
		{
			console.error("to be implemented");
		},
		executeOff: function()
		{
			console.error("to be implemented");
		},
		/**
		 * Changes the status of the tool (and the button)
		 */
		setActive: function(active)
		{
			if(this._button != null){
				this._button.set({
					checked: active
				});
			}
			this.toolActive = active;
		}	
	});
});

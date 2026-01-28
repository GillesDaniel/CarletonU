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


define(["dojo/main", "dojo/_base/declare",
	"ibm/tivoli/fwm/mxmap/toolbar/ext/QueryUnassignedWorkTool", 
	"dijit/form/Button"], function(dojo, declare, QueryUnassignedWorkTool, Button) {
	
	/**
	 * Specialized query unassigned work tool for the Dispatcher view. Bypasses the
	 * dialog and uses the data received by the calendar applet.
	 */
	return declare([QueryUnassignedWorkTool], {
		lastDateIntervalsData: null,
		dispatcherDefaultRefreshOptions: null,
		constructor: function(params)
		{
			this.inherited(arguments);
			this.addSubscription("onMapRefresh_"+this.map.getId(), dojo.hitch(this, this._onMapRefresh));
			this.addSubscription("onDispatcherRefresh_"+this.map.getId(), dojo.hitch(this, this._onDispatcherRefresh));
			// Hardcoded refresh options for every Unassigned WO update when this tool is active
			// (don't show any warning message and don't disable the tool automatically)
			this.dispatcherDefaultRefreshOptions = {
					zoom: false,
					disableMsgs: false,
					automatic: true
				};
		},
		// Uses the last data received by the calendar applet to update the unassigned WOs
		executeOn: function(params)
		{			
			if(this.lastDateIntervalsData != null)
			{
				this.map.getMaximo().queryUnassignedWorkDispatcher(this.lastDateIntervalsData, 
						dojo.hitch(this, function(data) {
							this.queryReturned(data, this.dispatcherDefaultRefreshOptions);
						}),
						dojo.hitch(this, this.cancelQuery));
			}
			
		},
		_onMapRefresh: function(refreshOpts){
			this._refreshUnassignedWorkOrders();
		},
		// Method that is called when the calendar applet
		// sends unassigned WO data
		_onDispatcherRefresh: function(data)
		{
			this.lastDateIntervalsData = {queryData: data};
			this._refreshUnassignedWorkOrders();
		},
		// Disable the tool and reenable it
		_refreshUnassignedWorkOrders: function()
		{
			if(this.isActive() == true){
				this.executeOff();
				this.executeOn({refreshOptions: this.dispatcherDefaultRefreshOptions});
			}
		}
	});
});

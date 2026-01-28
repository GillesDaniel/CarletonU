/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2013,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */

define(["dojo/_base/declare", "dojo/main", "dijit/main",
	"ibm/tivoli/fwm/mxmap/toolbar/ext/_ToggleTool",
	"dijit/form/Button"], function(declare, dojo, dijit, _ToggleTool, Button) {
	return declare([_ToggleTool], {
	
		label: "Audit Location",
		iconClass: "basicMapToolbarBtn locationHistoryToolbarBtn",
		map: null,
		layerLabel: null,
		constructor: function(params)
		{
			dojo.mixin(this, params);
			var _label = ibm.tivoli.fwm.i18n.getMaxMsg("map", "auditlocationtool");
			this.label = _label || this.label;
			this.layerLabel = ibm.tivoli.fwm.i18n.getMaxMsg("map", "auditlocationlayer");
			this.addSubscription("onAuditLBSLocationResult_" + this.map.getId(), dojo.hitch(this, this.queryReturned));
			this.addSubscription("onAuditLBSLocationCancel_" + this.map.getId(), dojo.hitch(this, this.cancelQuery));
		},	
	
		// Enables the Audit Location tool (show multiple instances of an LBS record
		// according to the updates made to the audit version of the table)
		executeOn: function(params)
		{
			this.map.getMaximo().showAuditLBSLocationDialog();
		},
		// Disables the Audit Location tool (hides audit records)
		queryReturned: function(data)
		{
			if ((data.status != undefined) && (data.status != null) && (data.error != undefined) && (data.error != null))
			{
				this.setActive(false);
				this.map.getMaximo().showMessage(data.error.group, data.error.key, [data.error.params]);
				return;
			}
			var records = data.records;

			/*
			 * just a small perf improvement to cache all the LBS points
			 * conversion to current coordsystem at once
			 */
			var lbsDataArray = this._getLBSData(records);
			if (lbsDataArray.length > 0)
			{
				this.map.getAllPointsFromWGS84(lbsDataArray, dojo.hitch(this, function()
						{
					/*
					 * do not update the crews/labor data. Map is aware these
					 * are WGS84 if we convert it here, it will get converted
					 * again later in the code, so we need to keep it in wgs84
					 */
					this.updateLayer(records);
						}), dojo.hitch(this, function(error)
								{
							if (error && error.msgkey)
							{
								this.map.getMaximo().showMessage(error.msggroup, error.msgkey);
							}
								}));
			}
			else
			{
				this.updateLayer(records);
			}
		},
		executeOff: function()
		{
			this._clearLBSAuditLayer();
		},
		_clearLBSAuditLayer: function()
		{
			if (this.layerLabel != null)
			{
				dojo.publish("removeLayer_" + this.map.getId(), [ this.layerLabel ]);
			}
		},
		updateLayer: function(records)
		{
			if (records && records.length > 0)
			{
				dojo.publish("addRecordsToLayer_" + this.map.getId(), [ this.layerLabel, records, true, null, null, false ]);
				this.map.zoomToMbos(records);
			}
			else
			{
				dojo.publish("removeLayer_" + this.map.getId(), [ this.layerLabel ]);
				this.setActive(false);
				this.map.getMaximo().showMessage("map", "noauditdataavailable");
			}
		},
		// util method - gets an array of lbs data to send to spatial for conversion
		// returns null if records is null or any record in records does not have
		// lbsdata.
		_getLBSData: function(records)
		{
			var array = [];
			if (records)
			{
				for ( var index in records)
				{
					if (records[index].lbsdata)
					{
						array.push(records[index].lbsdata);
					}
					else
					{
						console.warn("[AuditLocationTool] Records has a record without lbsdata.", records);
						return null;
					}
				}
			}
			else
			{
				console.warn("[AuditLocationTool] Records has a record without lbsdata.", records);
				return null;
			}
			return array;
		},
		// Handles the response from the server when the cancel button is clicked
		cancelQuery: function(data)
		{
			this.setActive(false);
		},
		disable: function()
		{
		},
		destroy: function()
		{
			this.destroyRecursive();
		}
	});
});

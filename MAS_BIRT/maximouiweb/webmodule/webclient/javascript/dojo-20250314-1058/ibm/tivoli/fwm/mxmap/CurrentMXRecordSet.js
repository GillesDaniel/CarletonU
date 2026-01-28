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


define("ibm/tivoli/fwm/mxmap/CurrentMXRecordSet", ["dojo/main", "dojo/_base/declare",
		 "ibm/tivoli/fwm/mxmap/_Base",
		 "ibm/tivoli/fwm/mxmap/MXRecord"],
		 function(dojo, declare, _Base, MXRecord) {

	return declare( [_Base], {
		map: null,
		records: null,
		mxRecords: null,
		mboInfoArray: null,
		markerImgUrl: null,
		_hidden: false,
		constructor: function(options)
		{
			dojo.mixin(this, options);
			this.mxRecords = [];
			this.mboInfoArray = [];
			// this.records = new ibm.tivoli.fwm.mxmap.MXRecordSet({map: this.map,
			// records: this.records, markerImgUrl: this.markerImgUrl});
			this.addSubscription("onCurrentRecordSetUpdated_" + this.map.getId(), dojo.hitch(this, this.updateRecordSetAndRefresh));
			if (this.records != null)
			{
				this.updateRecordSet(this.records);
			}
		},
		isEmpty: function()
		{
			if (this.mxRecords)
			{
				for ( var id in this.mxRecords)
				{
					return false;
				}
			}
			return true;
		},
		centerAndZoom: function()
		{
			this.map.zoomToMbos(this.mboInfoArray);
		},
		showMXRecordsOnMap: function(noZoom)
		{
			var markerOptions = {
					"enableMapTips": true
			};

			this.map.showAllMboRecords(this.mboInfoArray, markerOptions, noZoom != true);
			this._hidden = false;
		},
		updateRecordSetAndRefresh: function(newRecords, noZoom)
		{
			this.updateRecordSet(newRecords);
			this.showMXRecordsOnMap(noZoom);
		},
		length: function()
		{
			return this.mxRecords.length;
		},
		updateRecordSet: function(newRecords)
		{
			while (this.mxRecords.length > 0)
			{
				var mxRec = this.mxRecords.pop();
				mxRec._removeMarker();
			}

			this.records = newRecords;
			this.mxRecords = [];
			this.mboInfoArray = [];
			for ( var id in this.records)
			{
				var mxRec = new MXRecord({
					mboInfo: this.records[id],
					map: this.map
				});
				if (mxRec.hasAnyCoordinates())
				{
					this.mxRecords.push(mxRec);
					this.mboInfoArray.push(this.records[id]);
				}
			}
		},

		destroyRecursive: function()
		{
			this.inherited(arguments);

		},
		getWarning: function()
		{
			var warning = null;
			for(var i=0; i<this.mxRecords.length; i++)
			{
				warning = this.mxRecords[i].getWarning();
				// TODO: For now there is only one possible warning
				// Add the code to handle more when necessary
				if(warning)
				{
					break;
				}
			}
			return warning;
		}
	});
});

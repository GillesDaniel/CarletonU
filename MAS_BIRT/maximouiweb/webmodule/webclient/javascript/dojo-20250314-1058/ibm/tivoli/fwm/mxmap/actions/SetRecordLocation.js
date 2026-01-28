// wrapped by build app
define("ibm/tivoli/fwm/mxmap/actions/SetRecordLocation", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/actions/Actions,ibm/tivoli/fwm/mxmap/_Base,ibm/tivoli/fwm/mxmap/ImageLibraryManager"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.actions.SetRecordLocation");
dojo.require("ibm.tivoli.fwm.mxmap.actions.Actions");
dojo.require("ibm.tivoli.fwm.mxmap._Base");
dojo.require("ibm.tivoli.fwm.mxmap.ImageLibraryManager");

/**
 * Action to set the location of the current record.
 */
dojo.declare("ibm.tivoli.fwm.mxmap.actions.SetRecordLocation", [ ibm.tivoli.fwm.mxmap.actions.Actions, ibm.tivoli.fwm.mxmap._Base ], {

	constructor : function(params) {
		dojo.mixin(this, params);
		this.label = ibm.tivoli.fwm.i18n.getMaxMsg("map","set_recloc_label");//"Set record Location";
		/* used to remove the temp pushpin */
		this.addSubscription("onCurrentLocationUpdated_"+this.map.getId(), dojo.hitch(this, this._clearMarker));
		this.addSubscription("onServerException_"+this.map.getId(), dojo.hitch(this, this._clearMarker));
	},
	mapstraction : null,
	/**
	 * Removes the temp marker after the current record location was updated.
	 */
	_clearMarker : function() {
		
		if (this.marker != null) {
			if (dojo.config.fwm.debug == true)
			{
				console.log("[SetRecordLocation] Clearing Temporary Marker", this.marker);
			}
			this.map.removeMarker(this.marker);
		}
	},
	/**
	 * Returns the image path to be used. Checks for a custom path or returns the default.
	 * */
	_getPushPinImagePath: function(){
		var defaultImagePath = ibm.tivoli.fwm.mxmap.ImageLibraryManager.getImageLibraryManager().getDefaultReadOnlyMarkerImageInfo().getImageURL();
		var custom = this.map.mapConf.markerimgurl;
		if(custom != null && custom.trim().length > 0){
			return custom;
		}
		return defaultImagePath;
		 
	},
	/**
	 * Load the current right click position and updates server's current record
	 * data
	 * 
	 * @Override Action method
	 */
	execute : function(args) {
		if (this.marker != null) {
			this.map.removeMarker(this.marker);
		}
		var tempPushPin = this._getPushPinImagePath();
		var markerData = {
			draggable : true,
			icon : tempPushPin,
			iconSize : [ 36, 36 ],
			iconAnchor : [ 18, 36 ],
			hover : true
		};
		
		// middle and not bottom right.
		this.marker = this.map.addMarker(args.mapLocation, markerData);
		// adds are only allowed if we have the mainrecord as DS, so we use the first record
		this.map.currentRecordMgr.reverseGeocodeCurrentRecord(args.mapLocation);		
	}

});

});

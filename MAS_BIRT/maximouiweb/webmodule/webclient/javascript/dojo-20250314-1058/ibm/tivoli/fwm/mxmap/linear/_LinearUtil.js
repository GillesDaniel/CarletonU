/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2018,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/**
 * 
 */
define("ibm/tivoli/fwm/mxmap/linear/_LinearUtil", [
   "dojo/_base/declare",
   "dojo/dom-construct"
	
], function (declare, domConstruct) {
    var _LinearUtilBase = declare([], {

        constructor: function (options) {
        },
        
        refreshNextMboView: function (map, nextMbo) {
        	var data = [];
        	
			if (nextMbo.mxdata.mboName == "ASSET" ){
				data.firstPartOfTrowLabel = nextMbo.mxdata.mboInfo.ASSETNUM;
			}
			
			data.linearLicense = nextMbo.mxdata.attributes.islinear 
				|| map.mapConf.currentMbo.mxdata.attributes.islinear;
			
			data.isLinear = nextMbo.mxdata.attributes.islinear;
			data.isLinked = nextMbo.mxdata.attributes.plussisgis;
									
			this.linearViewMaintenance(map, data);
        },
        
    	linearViewMaintenance: function (map, data) {
    		var currentMboName = map.mapConf.currentMbo.mxdata.mboName;
    		var linearLicense = data.linearLicense;
    		var isMboLinear = data.isLinear && data.isLinked;
    		var isCurrentMboLinear = false;

    		map.map.targetCenter = null;
    		if (currentMboName == "ASSET" && linearLicense) {
    			isCurrentMboLinear = map.mapConf.currentMbo.mxdata.attributes.islinear
    				&& map.mapConf.plussIsGis;
    		}
    		if (isCurrentMboLinear && !isMboLinear && map.RefLinearView){
    			map.RefLinearView.removeMapResizing(map);
    		} else if (isCurrentMboLinear && isMboLinear) {
    			// reset LVC and remove LVC map layer
    			if (map.RefLinearView && map.RefLinearView.LocSegOnMap) {
    				map.RefLinearView.LocSegOnMap.cleanUp();
    				map.RefLinearView.grid.Reload();
    				map.RefLinearView.firstPartOfTrowLabel = data.firstPartOfTrowLabel;
    			}
    		} else if (!isCurrentMboLinear && isMboLinear) {
    			if (map.RefLinearView) {
    				if (map.RefLinearView.LocSegOnMap) {
    					map.RefLinearView.LocSegOnMap.cleanUp();								
    				}
    				map.RefLinearView.grid.Reload();
    				map.RefLinearView.createMapResizing(map);
    				map.RefLinearView.firstPartOfTrowLabel = data.firstPartOfTrowLabel;
    			}
    		}
    	}
        
    });

    return _LinearUtilBase;
});

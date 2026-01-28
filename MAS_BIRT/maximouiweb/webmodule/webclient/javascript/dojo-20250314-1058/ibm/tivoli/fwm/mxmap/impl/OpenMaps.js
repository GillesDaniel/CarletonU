// wrapped by build app
define("ibm/tivoli/fwm/mxmap/impl/OpenMaps", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/Map,ibm/tivoli/fwm/mxmap/libol/ol"], function(dijit,dojo,dojox){
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

dojo.provide("ibm.tivoli.fwm.mxmap.impl.OpenMaps");
dojo.require("ibm.tivoli.fwm.mxmap.Map");
dojo.require("ibm.tivoli.fwm.mxmap.libol.ol");

dojo.declare("ibm.tivoli.fwm.mxmap.impl.OpenMaps", ibm.tivoli.fwm.mxmap.Map, {
	
	constructor : function(options) {
		this.providerName="openmaps";
		this._defaultZoom = 10;
	},
	_getCustomInitOptions:function(){
		
		log.info("no custom configuration");
		return {};
	},
	_getInitOptions : function() {
		var options = {
			panControl : true,
			mapTypeControl : true,
			scaleControl : true,
			overviewMapControl : false,
			streetViewControl : false
		};

		if (this.isMobile == true) {
			options.panControl = false; //does not work and looks bad on native android browser
			options.overviewMapControl = false;
			options.scaleControl = false; //looks bad on native android browser and takes space from map
		}

		return options;
	},
	
	_init:function(element, options)
	{
		this.element = element;
		console.info('**element = ' + element);

		var me = this;
		this.map = new Map( element.id, options );
		this.setMapLoadingImage(element.id);
		this.showLoadingImg();
		this._initAfterMapCreation( this, element, options, false,
			null );		
		this.map.on('moveend', function(evt)
	  {
			const map = evt.map;
			const extent = this.map.getView().calculateExtent(map.getSize());
			const bottomLeft = ol.proj.toLonLat(ol.extent.getBottomLeft(extent));
			const topRight = ol.proj.toLonLat(ol.extent.getTopRight(extent));
			const zoomvalue = map.getView().getZoom();
			const mapprojection = map.getView().getProjection();
			const mapcoordinates = map.getView().getCenter();
			var locInfo = {
				lat: map.getView().getCenter()[0],
				lng: map.getView().getCenter()[1],
				level: map.getView().getZoom(),
				spatialReference: map.getView().getProjection().getCode()
			};
			this.getMaximo().storeUserLocation(locInfo);

		});
		this.loaded = true;
	},
	destroyMap: function(){},
	
});

});

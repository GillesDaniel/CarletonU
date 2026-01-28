/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */

define( 
    "ibm/tivoli/fwm/mxmap/MapGraphite", [
        "dojo/main",
        "dojo/_base/declare",
        "ibm/tivoli/fwm/mxmap/MapBus",
	    "ibm/tivoli/fwm/mxmap/MapResize"
    ], 
    function ( 
        dojo,
        declare,
        MapBus,
        MapResize
    ) {
        return declare(null, {

            constructor: function (options) {
                this.mapConf = options.mapConf;
                this.compId = options.compId;
                this.mapBus = new MapBus(options, this);
                this.mapResize = new MapResize(options, this);
    
                this.mapBus.subscribeMapLoaded(dojo.hitch(this, this.onMapLoaded));
                window.mapBus = this.mapBus;
			    this.mapResize.resize();
            },

            destroyRecursive: function() {
                delete window.mapBus;

                this.mapResize.destroy();
            },

            onMapLoaded: function() {
                dojo.publish("mxmap.mapLoaded", [this, this.compId, this]);
            },

            getId: function() {
                return this.compId;
            },

            isMapGraphite: function() {
                return true;
            },

            initRoutes: function() {
                this.mapBus.initRoutes();
            },

            drawRoutes: function(routes) {
                this.mapBus.drawRoutes(routes);
            },

            clearRoutes: function() {
                this.mapBus.clearRoutes();
            },

            highlightLinearFeature: function(linearFeature) {
                this.mapBus.highlightLinearFeature(linearFeature);
            },

            inFullScreen: function() {
                return false;
            },

            // Legacy interface
            _resize: function() {},

        });
    } 
);

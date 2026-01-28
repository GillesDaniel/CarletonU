/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2023,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */

define( 
    "ibm/tivoli/fwm/mxmap/MapBus", [
        "dojo/_base/declare",
        "ibm/tivoli/fwm/mxmap/MaximoIntegration",
    ], 
    function ( 
        declare,
        MaximoIntegration
    ) {
        return declare(null, {

            serverUpdatesHandler: null,

            constructor: function (options, map) {
                this.options = options;
                this.map = map;
                this.maximo = new MaximoIntegration(options);
            },

            getMapConf: function() {
                return this.options.mapConf;
            },

            getRouteConf: function(){
                return this.options.routeConf;
            },

            getMaximoIntegration: function() {
                return this.maximo;
            },

            subscribeServerUpdates: function(handler) {
                this.serverUpdatesHandler = handler;
            },

            onServerUpdates: function(eventName, eventParams) {
                if (!this.serverUpdatesHandler) {
                    return;
                }

                this.serverUpdatesHandler(eventName, eventParams);
            },

            subscribeMapLoaded: function(handler) {
                this.mapLoadedHandler = handler;
            },

            onMapLoaded: function() {
                if (!this.mapLoadedHandler) {
                    return;
                }

                this.mapLoadedHandler();
            },

            setRoutesStore: function(routesStore) {
                this.routesStore = routesStore
            },

            initRoutes: function() {
                if (!this.routesStore) {
                    return;
                }

                this.routesStore.init();
            },

            drawRoutes: function(routes) {
                if (!this.routesStore) {
                    return;
                }

                this.routesStore.drawRoutes(routes);
            },

            clearRoutes: function() {
                this.routesStore.clearRoutes();
            },

            setLinearStoreAndInit: function(linearStore) {
                var mapConf = this.getMapConf();
                this.linearStore = linearStore;
                this.linearStore.init(mapConf.parentApplication);
                this.drawLinearSegments();
                this.linearStore.subscribeToOpen(dojo.hitch(this, this.openLinearVisualControl));
                this.linearStore.subscribeToClose(dojo.hitch(this, this.closeLinearVisualControl));
            },

            openLinearVisualControl: function(assetnum) {
                dojo.publish("linear.map.visibility", [{
                    enabled: true,
                    trow: assetnum,
                    currentTabId: 'mxmap',
                    mapObj: this.map
                }]);
            },

            closeLinearVisualControl: function(assetnum) {
                dojo.publish("linear.map.visibility", [{
                    enabled: false,
                    trow: assetnum,
                    currentTabId: 'mxmap',
                    mapObj: this.map
                }]);
            },

            highlightLinearFeature: function(linearFeature) {
                this.linearStore.highlightLinearFeature(linearFeature);
            },

            drawLinearSegments: function() {
                var mapConf = this.getMapConf();
                var linearConf = mapConf.maplinearConf;
                this.linearStore.drawSegments(linearConf.maplinearLayers)
            }

        });
    } 
);

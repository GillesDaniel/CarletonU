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

define([
    "dojo/_base/lang",
    "dojo/_base/declare",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog"], function (lang, declare, log) {
    return declare([], {
        constructor: function (options) {
            this.dispatchView=null;

            lang.mixin(this, options);

            log.debug("Dispatch Manager Map Facade");
        },

        attachToMap: function (map) {
            console.log("attachToMap(): Attaching Map to Dispatch View", map);
            //console.log("applet:",window.CalendarViewId);
            ibm.tivoli.fwm.mxmap.factory.setReadyToCreateMap(true);
            require(["ibm/miniapp/scheduler/dispatch/DispatchManagerTG"], dojo.hitch(this, function (DispatchManagerTG) {
            	var disp = new DispatchManagerTG({map: map, applet: this.dispatchView});
                disp.init();
                window.dispatcher = disp;

                //notify applet:
                try {
                    //CalendarViewId.isLoaded();
                    //CalendarViewId.setJSCommunicationReady();
                    console.info("attachToMap(): ok to execute methods on DispatchManager", dispatcher);
                    this.dispatchView.setMapReady(true);
                    this.dispatchView._updateRoutes();
                } catch (e) {
                    console.warn("Attaching to map but applet is not yet there", e);
                }
            }));
            
        },

        checkForMap: function () {
            var _h;
            var mapLoadedHandler;
            //handler to hide anyremaining javascript menus on the map
            var fct = function (arg) {
                if (_h != null) {
                    dojo.unsubscribe(_h);
                }
                if (mapLoadedHandler != null) {
                    dojo.unsubscribe(mapLoadedHandler);
                }
            };

            _h = dojo.subscribe('mxnmap_onTabOut', fct);
            var attached = false;
            try {
                if (ibm.tivoli.fwm.mxmap.factory && ibm.tivoli.fwm.mxmap.factory.registry) {
                	console.log(ibm.tivoli.fwm.mxmap.factory.registry);
                    for (var id in ibm.tivoli.fwm.mxmap.factory.registry) {
                        var map = ibm.tivoli.fwm.mxmap.factory.registry[id].currentMap;
                        attached = this.attachToMap(map);
                    }
                }
            }
            catch (e) {
                //console.warn("map is not there", e);
            }

            var me = this;
            if (attached == false) {
                mapLoadedHandler = dojo.subscribe("mxmap.mapLoaded", function (mapProvider, id, map) {
                    attached = me.attachToMap(map);
                });
            }
        },

        verifyDispatchMapInRegistry: function () {
            if (ibm.tivoli.fwm.mxmap.factory.registry) {
                for (var id in ibm.tivoli.fwm.mxmap.factory.registry) {
                    var map = ibm.tivoli.fwm.mxmap.factory.registry[id].currentMap;
                    if (map) {
                        console.log('map found, going to subscribe and attach map');
                        ibm.tivoli.fwm.mxmap.dispatcher.checkForMap();
                    }
                    else {
                        console.log('map not found, check again in half a second');
                        window.setTimeout(lang.hitch(this, this.verifyDispatchMapInRegistry), 500);
                    }
                }
            }
            else {
                console.log('map registry not found, check again in half a second');
                window.setTimeout(lang.hitch(this, this.verifyDispatchMapInRegistry), 500);
            }
        }


    });
});

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
 * Core MiniApp Loader
 * @param config configuration for the MiniApp
 * @constructor
 */
window.LoadMiniApp = window.LoadMiniApp || function (config) {
        // this mainly to document the config options
        config.appid = config.appid || 'MiniApp'; // app directory name under miniapps
        config.domid = config.domid || console.log('[MiniAppLoader]: ERROR: Missing DOM Element ID'); // id to which to attach the miniapp
        config.rootUrl = config.rootUrl || console.log('[MiniAppLoader]: ERROR: Missing rootUrl'); // Root URL for all Mini Apps
        config.baseUrl = config.baseUrl || console.log('[MiniAppLoader]: ERROR: Missing baseUrl'); // base URL for THIS miniapp
        config.componentId = config.componentId || console.log('[MiniAppLoader]: ERROR: Missing componentId'); // maximo componentid (used to target events)
        config.appname = config.appname || 'MiniApp'; // Typically the Maximo application name that is loading the miniapp
        config.preferredWidth = config.preferredWidth || '800px'; // width property from the presentation xml
        config.preferredHeight = config.preferredHeight || '500px'; // height property from the presentation xml
        config.sizeToParentId = config.sizeToParentId || null; // domid to which this control should be sized (usually for width)
        // if the element to which need to size to, does not exist, then we null it out
        if (config.sizeToParentId) {
            var el = document.getElementById(config.sizeToParentId);
            if (!el) {
                console.log("missing element to which to size to: " + config.sizeToParentId + " usging SystemNavAppContent.");
                config.sizeToParentId='SystemNavAppContent-sc';
                el = document.getElementById(config.sizeToParentId);
                if (!el) {
                    console.log("missing element to which to size to: " + config.sizeToParentId + ".  Will used fixed height and width");
                    config.sizeToParentId=null;
                }
            }
        }
        config.fillHeight = config.fillHeight || false; // have the control fill remaining page height
        config.TAG = config.domid; // log statements are prefixed with this ID
        config.hasWait = config.hasWait || false; // control needs to wait for another control to load before loading ourself
        config.waitLockId = config.waitLockId || null; // the wait lock id to wait for
        config.singleInstance = config.singleInstance || false; // only single instance of app can live in the dom
        config.singleInstanceId = config.singleInstanceId || null; // single instance id to use when checking for single instance
        config.dojoExtraPaths = config.dojoExtraPaths || null; // array of objects for dojo extra module paths to add
        config.entryPoint = config.entryPoint || console.log('[MiniAppLoader]: Missing Mini App Main Class'); // main JS class to load

        var LOG_PREFIX = '[MiniAppLoader][' + config.appid + '][' + config.domid + ']: ';
        console.log(LOG_PREFIX + 'begin miniapp', config);

        // track some mini app parts
        console.log(LOG_PREFIX + "MiniApps", window.miniapps);
        window.miniapps = window.miniapps || {};
        window.miniapps.rootUrl = config.rootUrl;
        window.miniapps[config.appid] = window.miniapps[config.appid] || {};
        window.miniapps[config.appid].baseUrl = config.baseUrl;
        window.miniapps[config.appid].instances = window.miniapps[config.appid].instances || {};

        if (config.singleInstance) {
            // only a single instance of this app can live on the page/dom
            config.singleInstanceId = config.singleInstanceId || config.appid || 'MiniApp';
        } else {
            // Multiple apps can be on the same page, but different DOM ids
            config.singleInstanceId = config.domid;
        }

        // tear down any previous instances of the app for the one we are now loading
        if (window.miniapps[config.appid].instances[config.singleInstanceId]) {
            console.log(LOG_PREFIX + 'Destroying OLD MiniApp instance for SingleInstanceID: ' + config.singleInstanceId);
            if (window.miniapps[config.appid].instances[config.singleInstanceId].destroy) {
                window.miniapps[config.appid].instances[config.singleInstanceId].destroy();
            } else {
                console.log(LOG_PREFIX + 'Missing .destroy() method for SingleInstanceID: ' + config.singleInstanceId);
            }
            delete window.miniapps[config.appid].instances[config.singleInstanceId];
            console.log(LOG_PREFIX + 'Destroyed OLD MiniApp instance for ' + config.singleInstanceId);
        }

        // startup function for loading the actual miniapp
        var startup;
        startup = function () {
            require(['dojo/_base/kernel', 'dojo/ready'], function (dojo, ready) {
                dojo.registerModulePath('com/ibm/tivoli/maximo/miniapps/libraries', config.baseUrl + '/../libraries');
                dojo.registerModulePath('com/ibm/tivoli/maximo/miniapps', config.baseUrl + '/../base/com/ibm/tivoli/maximo/miniapps');
                if (config.dojoExtraPaths) {
                    config.dojoExtraPaths.forEach(function (path) {
                        dojo.registerModulePath(path.name, path.location);
                    });
                }
                dojo.registerModulePath('ibm/miniapp/' + config.appid, config.baseUrl + '/../' + config.appid + '/js/ibm/miniapp/' + config.appid);
                require(['ibm/miniapp/' + config.appid + '/' + config.entryPoint], function (MiniApp) {
                    ready(function () {
                        console.log(LOG_PREFIX + "loaded miniapp " + config.entryPoint);
                        var app = new MiniApp(config, config.domid);

                        // store the app instance so we can destroy it later, if needed
                        window.miniapps[config.appid].instances[config.singleInstanceId] = app;

                        console.log(LOG_PREFIX + "begin calling startup() for " + config.entryPoint);
                        app.startup();
                        console.log(LOG_PREFIX + "end calling startup() for " + config.entryPoint);
                    });
                });
            });
        };

        // do the startup
        require(['dojo/topic', "dojo/dom", "dojo/dom-style"], function (topic, dom, domStyle) {
            // register handler to remove the please wait
            var dhandler = topic.subscribe('miniapp.hideprogress', function (id) {
                console.log(LOG_PREFIX + 'HideProgress: ' + id);
                if (id != config.domid) {
                    return;
                }
                var node = dom.byId(config.domid + "_progress");
                if (node) {
                    domStyle.set(node, "display", "none");
                }
                dhandler.remove();
            });

            // if we are not waiting, then start immediately
            if (!config.hasWait) {
                startup();
                return;
            }

            // register callback to know when to start
            console.log(LOG_PREFIX + 'Waiting for Event miniapp.waitlockcomplete with id ' + config.waitLockId);
            var handler = topic.subscribe('miniapp.waitlockcomplete', function (id) {
                if (id == config.waitLockId) {
                    console.log(LOG_PREFIX + 'Wait lock id received: ' + id + ' Continue starting MiniApp ' + config.entryPoint);
                    handler.remove();
                    startup();
                }
            });
        });
    };

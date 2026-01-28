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
    "dojo/_base/declare",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
    "com/ibm/tivoli/maximo/miniapps/_MaximoIO",
    "ibm/tivoli/fwm/mxmap/dispatcher/DispatcherManager"
], function (declare, log, io, DispatcherManager) {
    return declare([DispatcherManager, io], {
        constructor: function (options) {
            log.debug("Dispatch Manager V2");
            // needed for the IO to work
            this.componentId=this.applet.componentId;
        },

        getApplet: function () {
            log.debug("getApplet()", this.applet);
            return this.applet;
        },

        triggerMsgs: function() {
            log.debug("TRIGGER MESSAGES")
            sendEvent("TRIGGERMSGS", this.componentId);
            this.resetMaximoTimer();
        },

    	/**
    	 * If any work order gets assigned we need to update the applets data.
    	 */
    	onWorkAssigned: function()
    	{
    		// need to refresh the model to load the assignmenton the applet.
    		this.getApplet().ReloadModel();
    	},
        
        postEvent: function(name, data, onSuccess, onError) {
            log.debug("postEvent({})", name);
            this.fetch(name, {"data": data}).then(onSuccess, onError);
            // var myEvent = new Event(name, 'mapdispatcher-mxdispatcherctrl', data, REQUESTTYPE_HIGHASYNC);
            // queueManager.queueEvent(myEvent, "application/json", "json", onSuccess, onError);
        }
    });
});

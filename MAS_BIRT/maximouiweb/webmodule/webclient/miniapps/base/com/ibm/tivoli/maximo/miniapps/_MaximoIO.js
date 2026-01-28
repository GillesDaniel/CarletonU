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
    "dojo/topic",
    "dojo/io-query",
    'dojo/_base/json',
    "dojo/_base/lang",
    "dojo/Deferred",
    "dojo/_base/declare"
], function (topic, ioQuery, json, lang, Deferred, declare) {
    var _MaximoIOBase = declare(null, {
        constructor: function () {
            this.appid = null;
            this.componentId = null;
        },

        /**
         * Calls a remote bean method, and returns a Deferred object
         * @param {string} beanMethod - event id (ie, bean method to call)
         * @param {map} options - map of options to pass in the event
         * @return {Deferred} Deferred Object to which you can chain a response handler
         */
        fetch: function (beanMethod, options) {
            var defer = new Deferred(function (reason) {
                console.log("Fetch Cancelled for " + beanMethod);
            });

            console.log('Calling Bean Method ASYNC ' + beanMethod, options);
            if (!options) options = {};
            var me = this;
            var fetchEvent = new Event("event_fetch", me.componentId, "", REQUESTTYPE_HIGHASYNC);
            lang.mixin(fetchEvent, options);
            fetchEvent["mxeventname"] = beanMethod;
            queueManager.queueEvent(fetchEvent, "text/json", "json", function (data, ioArgs) {
                //console.log("IOARGS", ioArgs);
                defer.resolve(data);
            }, function (error) {
                console.log("fetch(): Error: ", error);
                sendEvent("showwarnings", me.appid);
            });

            return defer;
        },

        callBean: function (beanMethod, options) {
            if (!options) options = {};
            console.log('Calling Bean Method SYNC ' + beanMethod, options);
            var me = this;
            var fetchEvent = new Event("event_callbean", me.componentId, "", REQUESTTYPE_SYNC);
            lang.mixin(fetchEvent, options);
            fetchEvent["mxeventname"] = beanMethod;
            fetchEvent.setPriority(2);
            queueManager.queueEvent(fetchEvent, "text/xml", "xml", processXHR, null);
        },

        /**
         * Issues a Maximo sendEvent with the given event name and values for the specified target
         * @param event
         * @param target
         * @param values
         */
        sendMaximoEvent: function(event, values, target) {
            values = values || {};
            for (var k in values) {
                addCommInput(k, values[k]);
                console.log('Adding Communication Input for ' + k + "="+values[k]);
            }
            sendEvent(event, target, '');
        },

        showMessage: function (msgid) {
            // TODO: add message options
            console.log('showMessage:' + msgid);
            var me = this;
            var fetchEvent = new Event("event_show_message", me.componentId, "", REQUESTTYPE_SYNC);
            if (msgid)
                fetchEvent["msgid"] = msgid;
            fetchEvent.setPriority(2);
            queueManager.queueEvent(fetchEvent, "text/xml", "xml", processXHR, null);
        },

        ask: function (msgid) {
            var defer = new Deferred(function (reason) {
                console.log("ask Cancelled for " + msgid + " with reason " + reason);
            });

            var handler = topic.subscribe("miniapp.ync", function (resp) {
                handler.remove();
                defer.resolve(parseInt(resp));
            });

            console.log('ask:' + msgid);
            var me = this;
            var fetchEvent = new Event("event_yes_no_cancel", me.componentId, "", REQUESTTYPE_SYNC);
            fetchEvent["msgid"] = msgid;
            fetchEvent.setPriority(2);
            queueManager.queueEvent(fetchEvent, "text/xml", "xml", processXHR, null);

            return defer;
        },

        /**
         * used to convert an xhr event into a direct url.  This is used when you need to have your server side event
         * used as a URL to another library.
         *
         * @param {string} beanMethod - event id (ie, bean method or @MXEvent to call)
         * @param {map} options - map of options to pass in the event
         */
        toUrl: function (beanMethod, options) {
            if (!options) options = {};
            var me = this;
            if (!me.componentId) throw "_MaxmioIO requires componentId to be set";
            var fetchEvent = new Event("event_fetch", me.componentId, "", REQUESTTYPE_HIGHASYNC);
            lang.mixin(fetchEvent, options);
            fetchEvent["mxeventname"] = beanMethod;

            var content = {
                uisessionid: queueManager.sessionId,
                csrftoken: queueManager.csrftoken,
                currentfocus: queueManager.currentfocus,
                scrollleftpos: queueManager.scrollleftpos,
                localStorage: queueManager.localStorage,
                scrolltoppos: queueManager.scrolltoppos,
                requesttype: REQUESTTYPE_HIGHASYNC,
                responsetype: "json",
                events: json.toJson([fetchEvent])
            };

			if (fetchEvent.targetId.toUpperCase().includes("LINEAR")) {
				delete content.csrftoken;
			}
            var queryStr = ioQuery.objectToQuery(content);
            var uri = XHRACTION + (XHRACTION.includes("?")?"&":"?") + queryStr;
            console.log('xhr url: ' + uri);
            return uri;
        },

        sendToBeSaved: function () {
            sendEvent('toBeSaved', this.componentId);
        },

        resetMaximoTimer: function() {
            // defined in session timer
            resetLogoutTimer(false);
        }
    });

    // App Constants for message dialogs
    _MaximoIOBase.OK = 2;
    _MaximoIOBase.CANCEL = 4;
    _MaximoIOBase.YES = 8;
    _MaximoIOBase.NO = 16;
    _MaximoIOBase.NULL = -1;

    return _MaximoIOBase;
});

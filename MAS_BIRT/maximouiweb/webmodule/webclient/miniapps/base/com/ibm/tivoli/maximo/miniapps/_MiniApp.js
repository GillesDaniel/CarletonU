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
    "dojo/aspect",
    "dojo/topic",
    "dojo/_base/lang",
    "dojo/_base/window",
    "dojo/on",
    "dojo/_base/declare",
    "dojo/window",
    "dojo/dom-style",
    "dojo/dom-attr",
    "com/ibm/tivoli/maximo/miniapps/_MaximoIO",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
    "dojo/dom-geometry", "dojo/dom"
], function (aspect, topic, lang, bwin, on, declare, win, domStyle, domAttr, _MaximoIO, log, geom, dom) {
    var _MiniAppWidget = declare([_MaximoIO], {
        // padding when resizing the control (to prevent scrollbars)
        PAD:15,

        constructor: function (options, domid) {
            this.refreshHandle = null;
            this.resizeHandle = null;
            this.apectSizePanesHandle = null;

            this.resizeTimeoutHandle = null;

            // h and w set from presentation xml
            this.preferredWidth = null;
            this.preferredHeight = null;

            // id of dom element to match h and w
            this.sizeToParentId = null;

            // if true will try ot match the "remaining" heigh of the browser window
            this.fillHeight = false;

            // log TAG
            this.TAG = '[' + options.appid + ':' + domid + ']';

            this.domNode = dom.byId(domid);
            this.domId = domid;

            // set the properties from the passed options
            lang.mixin(this, options);
        },

        /*** called after the widget is created, to hook into any final events, etc */
        postCreate: function () {
            this.inherited(arguments);

            // listen for refresh changes
            // should look something like... miniapp.scheduler.refresh
            var me = this;
            var topicId = "miniapp." + this.appid + ".refresh";
            log.debug('{}: listening for {} event', this.TAG, topicId);
            this.refreshHandle = topic.subscribe(topicId, function (data) {
                log.debug("{}: received event: {}", me.TAG, topicId, data);
                try {
                    me.onRefreshRequested(data);
                } catch (ex) {
                    log.error("{}: onRefreshRequestedFailed!", me.TAG, ex, me);
                }
            });
            me._deferredResize(1);
            this.apectSizePanesHandle = aspect.after(window, "toggleNavContainer", function () {
                log.debug("toggleNavContainer was called");
                me._deferredResize(1);
            });
            window.addEventListener("resize",()=>{    me._deferredResize(1); }  );
            log.debug('{}: postCreate() called', this.TAG);
        },

        startup: function () {
            this.inherited(arguments);
            log.debug('{}: startup() called', this.TAG);
            this._connectResize();
            this.resize();
            this.postCreate();
        },

        destroy: function () {
            log.debug('{}: destroy() called', this.TAG);
            if (this.refreshHandle) {
                this.refreshHandle.remove();
                this.refreshHandle = null;
            }
            if (this.resizeHandle) {
                this.resizeHandle.remove();
                this.resizeHandle = null;
            }
            if (this.apectSizePanesHandle) {
                this.apectSizePanesHandle.remove();
                this.apectSizePanesHandle = null;
            }
            this.inherited(arguments);
        },

        _deferredResize: function (source /*1=sidename, null is default*/) {
        	//cause look on load on MASSKIN
        	//return;
            //waits 100ms before actually doing the resize
            window.clearTimeout(this.resizeTimeoutHandle);
            var me=this;
            this.resizeTimeoutHandle = window.setTimeout(function() {
                if (source===1) {
                    me.onSideNavResized();
                }
                me.resize()
            }, 450);
        },

        onSideNavResized: function() {
        },

        resize: function () {
            var size = this.onMeasure();
            log.debug('{}: resize() called with measure', this.TAG, size);
            if (size && (size.w||size.h)) {
                geom.setContentSize(this.domNode, size);
            } else if (size && (size.width||size.height)) {
                domStyle.set(this.domNode, size);
            } else {
                log.warn("Failed to calculate size of miniapp??", size);
            }
        },

        /**
         * Either returns an object with w,h or width,height.  The latter being a css measurement vs a pixel box measurement.
         */
        onMeasure: function () {
            log.debug('{}: onMeasure() called', this.TAG);
            /**
             * Size to parent id is a bit misleading.  It will size to the parent node, but, if fillheight=true
             * it will use the available screen heigh instead of the parent height.
             */
            if (this.sizeToParentId != null) {
                // set our size
                var control = this.domNode;
                var controlPos = geom.position(control);

                var parent = dom.byId(this.sizeToParentId);
                var parentBox = geom.getContentBox(parent);
                var parentPos = geom.position(parent);

                // calculate margins
                log.debug("{}: control, parent:", this.TAG, controlPos, parentPos);

                var my = Math.abs((controlPos.y - parentPos.y)) * 2 + this.PAD;
                var dirAttr = domAttr.get(bwin.body(), 'dir');
                var rtl = dirAttr == 'RTL' || dirAttr == 'rtl';
                if (rtl) {
                    var mx = (Math.abs(( (controlPos.x + controlPos.w) - (parentPos.x + parentPos.w))) * 2) + this.PAD;
                } else {
                    var mx = (Math.abs((controlPos.x - parentPos.x)) * 2) + this.PAD;
                }

                // don't make preferred height larger than the visibile window
                var pi = parseInt(this.preferredHeight);
                if (isNaN(pi)) pi=0;
                var prefH = Math.max(400, pi); // can't be less than 200pixels
                var prefW = (parentBox.w - mx);

                log.debug("{}: SIZING DEBUG: prefH: {}, prefW: {}, parentBox.h: {}, my: {}, this.preferredHeight: {}, this.fixedheight: {}, this.fillHeight: {}", this.TAG, prefH, prefW, parentBox.h, my, this.preferredHeight, this.fixedheight, this.fillHeight);

                // override height if we need to fill vs use provided
                if (this.fillHeight) {
                    // try to expand vertically to fill the window
                    var winSize = win.getBox();
                    var h = winSize.h - controlPos.y - (my / 2) - (2*this.PAD);  // some padding to remove the scollbars
                    prefH = h;
                    log.debug("{}: Filling Vertical Space: {}", this.TAG, h);
                }

                return {w: prefW, h: prefH};
                // log.debug("{}: Sizing to Parent Size", this.TAG, size);
                // geom.setContentSize(control, size);
            } else {
                log.debug("{}: Fixed Size: W:{} H: {}", this.TAG, this.preferredWidth, this.preferredHeight);
                var h = this.preferredHeight;
                var w = this.preferredWidth;
                if (this.fillHeight) {
                    var size=win.getBox();
                    var pos = geom.position(this.domNode);
                    h = (size.h - pos.y - this.PAD) + "px";
                    log.debug("{}: Sizing to Screen Height: Screen: {}, Pos: {}, H: ", this.TAG, size, pos, h);
                }
                // domStyle.set(this.domNode, {
                //     "width": w,
                //     "height": h
                // });
                return {
                    "width": w,
                    "height": h
                };
            }
        },

        /*** private method to handle the browser resizing, and pass those events to the resize() method */
        _connectResize: function () {
            var me = this;
            if (this.sizeToParentId != null) {
                var el = document.getElementById(this.sizeToParentId);
                if (el) {
                    // on(window, resize) doesn't appear to work
                    this.resizeHandle = on(window, "resize", lang.hitch(me, me._deferredResize));
                } else {
                    log.debug("Can't hook resize handler since {} element does not exist", this.sizeToParentId);
                }
            }
        },

        /**
         * Called when the control needs to refresh its data, ie, the record changed
         * @topic miniapp.{APPID}.refresh
         */
        onRefreshRequested: function (data) {
            log.debug("{}: onRefreshRequested()", this.TAG, data);
        },

        loadLibrary: function(checkFunc, jsUrl, callback) {
            log.debug("{}: Loading Dynamic Library: {}", this.TAG, jsUrl)
            try {
                // check if we are already loaded
                if (checkFunc()) {
                    if (callback) callback();
                    return;
                }

                // add the script to head and want for it to appear
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = jsUrl;
                document.documentElement.getElementsByTagName("head")[0].appendChild(script);
                log.debug("{}: Added Script Element", this.TAG, script);
                var checkedFunc=checkFunc;
                var callbackFunc=callback;
                var me=this;
                function checkProgress(){
                    log.debug("{}: Checking if loaded {}", me.TAG, jsUrl);
                    if(checkedFunc()) {
                        if(callbackFunc)
                            callbackFunc();
                    } else {
                        setTimeout(checkProgress,100);
                    }
                }
                checkProgress();
            }
            catch(e){
                log.error("ERROR: Can't Load {}", jsUrl, e);
            }
        },

        /**
         * Test if an element is in a viewport, completely.  ie if only part of the element is being displayed, then it returns false.
         * @param el
         * @returns {boolean}
         */
        isElementInViewport: function (el) {
            var rect = el.getBoundingClientRect();
            return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) ); /*or $(window).width() */
        },

        isElementVisible: function (e) {
            return !!( e.offsetWidth || e.offsetHeight || e.getClientRects().length );
        },

        isVisible: function() {
            if (this.domNode) {
                return this.isElementVisible(this.domNode);
            }
            return false;
        }

    });

    // App Constants for message dialogs
    _MiniAppWidget.OK = 2;
    _MiniAppWidget.CANCEL = 4;
    _MiniAppWidget.YES = 8;
    _MiniAppWidget.NO = 16;
    _MiniAppWidget.NULL = -1;

    return _MiniAppWidget;
});

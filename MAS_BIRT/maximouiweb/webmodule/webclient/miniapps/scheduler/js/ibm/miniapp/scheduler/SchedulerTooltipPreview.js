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
	"dojo/dom-geometry",
	"dojo/dom",
	"dojo/dom-style",
	"dojo/dom-attr",
    "dojo/dom-class",
	"dojo/_base/window",
    "com/ibm/tivoli/maximo/miniapps/_MiniApp",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
	"com/ibm/tivoli/maximo/miniapps/Handlers"

], function(lang, declare, geom, dom, domStyle, domAttr, domClass, bwin, _MiniApp, log, Handlers){
    return declare([_MiniApp, Handlers], {
		// static variables
		TAG: "TOOLTIP",

    /**
         * Known Options
         * height: max height of the weather component
         * show_current_button: true
         * show_daily_button: true
         * show_hourly_button: true
         *
         * @param options
         */
    	constructor: function(options) {
            this.options = options||{};

    		log.debug("{} options", this.TAG, options);

            this.sectionHeight = options.height || 330;
            
            this.createUI();
    	},

        label: function(key, defValue) {
            return this[key] || defValue;
        },

        startup: function() {
        	this.inherited(arguments);

        },

		destroy: function () {
			this.inherited(arguments);
		},

		createUI: function() {

            this.domId = "tooltip";
            if (this.embedded && this.domId) {
                log.debug("Tool tip preview, trying to find DOMID: {}", this.domId);
                this.tooltipNode = document.getElementById(this.domId);
                if (!this.weatherNode) {
                    log.error("Missing DOMID: {} in which to embed the tooltip control", this.domId);
                    return;
                }
            } else {
                this.tooltipNode = this.domNode;
            }
            var me = this;
            this.fetch("get_template").then(function (res) {
            	me.tooltipNode.innerHTML=res.template;
            });
		}       
    });
});

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
    "com/ibm/tivoli/maximo/miniapps/_MiniApp",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog"

], function(lang, declare, _MiniApp, log){
    return declare([_MiniApp], {
    	constructor: function(options) {
        	this.initOptions = null;
            this.TAG=options.TAG;

    		if (options.loglevel) {
    			log.LOG_LEVEL=options.loglevel;
    		}
    		
    		// we keep a reference to this since want to pass them to the child WidgetViews as well
    		this.initOptions=options;

    		log.debug("{} options", this.TAG, options);
    		
    		if (!options.appname) {
    			log.error("Missing 'appname' required option.  'appname' should be set in the options attribute in the presentation xml.");
    			throw "Missing 'appname' required option.  'appname' should be set in the options attribute in the presentation xml."
    		}
    	},
    	
        startup: function() {
        	this.inherited(arguments);

        	var me=this;
        	log.debug("{} Dynanic TreeGrid... loading dynamic library...", this.TAG);
        	if (window.TreeGrid) {
        		me.createUI();
        		return;
        	}
			/**
			 * if useSources==1 then the loader will attempt to load TreeGrid from the TreeGrid sources.
			 * For this to work the TreeGrid sources needs be extracted in the same location as the deployed
			 * source.  ie, GridE.js and GridESrc.js needs to be in the same directory.
			 *
			 * A small change needs to be made to GridESrc.js.  It attempts to use a document.write() which is
			 * not allowed in Google Chrome, remove that section of the try and ond leave the catch part, which
			 * does the same thing except uses createElement.  (ie, look at the code and remove document.write section
			 * and leave the document.createElement section)
             */
			var useSources=0;
			var gridUrl = this.rootUrl + "/libraries/treegrid/Grid/GridE.js";
			if (useSources) {
				gridUrl = this.rootUrl + "/libraries/treegrid/Grid/GridESrc.js";
			}
			this.loadLibrary(
				// check return true when TreeGrid is loaded
				function () {
					return window.TreeGrid!=null;
				},
				gridUrl,
				// call createUI after TreeGrid is loaded
				lang.hitch(me, me.createUI));
        },
        
        createUI: function() {
			if (window.TreeGrid) {
				log.debug("TreeGrid Release: {}, {}", window.Component.Version, window.Component.Release);
			}

			// adding new GanttUnits for each day of week
			AddGanttUnits("w2", 86400000*7);
			AddGanttUnits("w3", 86400000*7);
			AddGanttUnits("w4", 86400000*7);
			AddGanttUnits("w5", 86400000*7);
       		this._createUI();
        },
        
        onRefreshRequested: function(data) {
    		this.createUI();
        },
        
        _createUI: function(uiinfo) {
        }
    });
});

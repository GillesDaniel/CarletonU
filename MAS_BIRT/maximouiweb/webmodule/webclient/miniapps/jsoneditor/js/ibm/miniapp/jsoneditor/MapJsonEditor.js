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
	"dojo/_base/window",
    "dojo/Deferred",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/aspect",
    "dojo/window",
    "com/ibm/tivoli/maximo/miniapps/_MaximoIO",
    "com/ibm/tivoli/maximo/miniapps/_MiniApp",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
	"com/ibm/tivoli/maximo/miniapps/Handlers",
	"ibm/miniapp/jsoneditor/JsonEditorBase"

], function(lang, declare, geom, dom, domStyle, domAttr, bwin, Deferred, domConstruct, 
		arrayUtils, aspect, win, _MaximoIO, _MiniApp, log, Handlers, JsonEditorBase){
    return declare([_MaximoIO, _MiniApp, Handlers, JsonEditorBase], {
		// static variables
    	jsoneditor: null,
    	i18nJElabels: null,    	
    	options: null,
		sizetoparentdomid: null,
		dom: null,
    
		constructor: function(options) {
    		this.options = options;
    		this.sizetoparentdomid = options.sizetoparentdomid;
            if(options.dom) {
            	this.dom = options.dom;
            } else {
            	this.dom = this.domNode;
            }

    		if (options.loglevel) {
    			log.LOG_LEVEL=options.loglevel;
    		}

    		log.debug("{} options", this.TAG, options);
    		
    	},

		jsonEditorOptions: function() {
            var options = {
	    	    mode: 'code',
	    	    modes: ['code', 'tree'], // allowed modes
	    	    enableSort: false,
	    	    enableTransform: false,
	    	    
	    	    onError: function (err) {
        	    	console.error('Validation Failed onError', err);
        	    	thisJEObjectObj.showMessage("jsoneditor#jsonValidationFailed");
	    	    },
	    	    
	    	    onChange: function () {
	    	    	thisJEObjectObj.onChange();
	    	    },

	    	    onModeChange: function (newMode, oldMode) {
	    	    	thisJEObjectObj.currentMode = newMode;
	    	    	this.onRefreshMode(newMode);

	    	    	if (thisJEObjectObj._onModeChange) {
	    				thisJEObjectObj._onModeChange();
	    	    	}
	    	    	
	    	    	console.log('Mode switched from', oldMode, 'to', newMode);
	    	    },
	    	    
	    	    onRefreshMode: function(mode) {
	    	    	if (mode == 'tree') {
	    	    		thisJEObjectObj.jsoneditor.node.expand(false);
	    	    		thisJEObjectObj.jsoneditor.node.childs[0].expand(false);
	    	    		var children = thisJEObjectObj.jsoneditor.node.childs[0].childs;
	    	    		children.forEach(function(child) {
	    		    	    child.expand(false);    			
	    	    		});
	    	    	}
	    	    	console.log('Refresh Mode ', mode);
	    	    },
	    	    
	    	    onUpdate: function () {
	        	      console.log('onUpdate --JSONEditor');
	        	      try {
	            	      var editedJSON = thisJEObjectObj.jsoneditor.get();
	            	      var editedJSONString = JSON.stringify(editedJSON);
	            	      thisJEObjectObj.sendMaximoEvent("updateConfig", {config: editedJSONString}, thisJEObjectObj.componentId);             	    	  
	        	      } catch (err) {
	        	    	console.error('Validation Failed onUpdate', err);
	        	    	thisJEObjectObj.showMessage("jsoneditor#jsonValidationFailed");
	        	      }
	
	      	    },
	      	    
	      	    onRestore: function () {
	      	    	var thisObj = this;
	      	    	thisJEObjectObj.ask("mapmanager#restoredefaultsymbology").then(function (reply) {
	                	log.debug('Response: {}', reply)
	                	// Yes==8, OK==2
	                	if (reply == 8 || reply == 2) {
	                		thisJEObjectObj.invokeLater(function() {
	                			thisJEObjectObj.fetch('restoreConfig').then(function(configRestored){
	                				thisJEObjectObj.jsoneditor.set(configRestored);
	                				thisObj.onRefreshMode(thisJEObjectObj.currentMode);
	                            });
	                		}, 500, "configRestoreId");                    	
	                	}
	                	// No or Cancel
	                	else {
	                		console.log("onRestore Canceled");
	                	}
	                });
	    	    },
	    	    
	    	    onHelp: function () {
	    	    	try {
	    	    		thisJEObjectObj.sendMaximoEvent("mapSymbologyInfo", "", thisJEObjectObj.componentId);
	    	    	} catch (err) {
	    	    		console.error('Failed: configHelpInfo', err);
	    	    	}
	    	    },

	    	    showGraph: function () {
	    	    	try {
	    	    		thisJEObjectObj.sendMaximoEvent("mapJSONGraph", "", thisJEObjectObj.componentId);
	    	    	} catch (err) {
	    	    		console.error('Failed: mapJSONGraph', err);
	    	    	}
	    	    }
            };
            
            return options;
        },        
        
		onRefreshRequested: function(data) {
        	thisJEObjectObj.fetch('getSymbologyConfig').then(function(config) {
        		var ValidationID = dojo.byId( "ValidationID" );
            	var thisJson = config.json;
            	var thisJsonSchema = config.jsonSchema;
				thisJEObjectObj.jsoneditor.set(thisJson);
      	      	if ( ValidationID ) {
      	      		domConstruct.destroy( "ValidationID" );
      	      	}
        	});
        },
        
        setDomStyle: function (domEditor, domEditor_outer, size) {
			domStyle.set(domEditor_outer, {width: "100%", margin: "30px 0px 0px 10px"});				
			domStyle.set(domEditor, size);
        }
        
	});
});

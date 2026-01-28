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
	"com/ibm/tivoli/maximo/miniapps/Handlers"

], function(lang, declare, geom, dom, domStyle, domAttr, bwin, Deferred, domConstruct, 
		arrayUtils, aspect, win, _MaximoIO, _MiniApp, log, Handlers){
    return declare([_MaximoIO, _MiniApp, Handlers], {
		// static variables
    	jsoneditor: null,
    	i18nJElabels: null,    	
    	options: null,
		sizetoparentdomid: null,
		dom: null,
		currentMode: 'code',
		onChangeTimedOut: true,

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

        startup: function() {
        	this.inherited(arguments);

        	var me=this;
        	if (window.JSONEditor) {
        		me.createUI(null);
        		return;
        	}
        },

		createUI: function() {
			if (!this.dom) {
				dnode = this.domNode;
			}

			log.debug("Creating JSONEditor UI");

        	thisJEObjectObj=this;
            
			var container = domConstruct.create( "div", {
				"id" : "jsonEditorID",
				"width": "100%",
				"margin-left": "20px"
			});
			
			domConstruct.place(container, this.domNode, "first");
			
			var jsonOptions = this.jsonEditorOptions();

            this.fetch('get_i18n_JELabels').then(function(jeLabels){
            	thisJEObjectObj.i18nJElabels = jeLabels;
            	thisJEObjectObj.fetch('getSymbologyConfig').then(function(config) {
                	var thisJson = config.json;
                	var thisJsonSchema = config.jsonSchema;
                	
                	var jsPath = thisJEObjectObj.rootUrl + "/libraries/jsoneditor/jsoneditor.min.js";
                	if (thisJEObjectObj.options.loglevel == 0) {
                		jsPath = thisJEObjectObj.rootUrl + "/libraries/jsoneditor/jsoneditor.js";
                	}
                	
	                require([jsPath], function (JSONEditor) {
	                	if (thisJsonSchema && thisJsonSchema != "") {
	                		jsonOptions["schema"] = thisJsonSchema;
	                	}
	                	thisJEObjectObj.jsoneditor = new JSONEditor(container, jsonOptions, thisJson, thisJEObjectObj.i18nJElabels);
	                	thisJEObjectObj.updateEditorMenu();
	                });
                });
            });

			this._resize();
			
			aspect.after(window, "onresize", lang.hitch(this,this._deferredResize));

		},
		
		resize: function() {
			this._resize();
		},
		
        _resize: function () {
        	console.log("_resize occured");
            var size = this.onMeasure();

            var domEditor = document.getElementById('jsonEditorID');
            var domEditor_outer = document.getElementById('JSONEditor_outer');
                          
			log.debug('{}: resize() called with measure', this.TAG, size);
			if (size && (size.w||size.h)) {
			    var width = Number((size.w).replace("px", ""));
			    var height = Number((size.h).replace("px", ""));
			    
			    if (this.fillHeight) {
			        var winSize = win.getBox();
			        var pos = geom.position(this.domNode);
			        size.w = (winSize.w - pos.x - this.PAD - 25) + "px";
			    }
			    size.h = (height - this.getHeightPad()) + "px";
			
			} else if (size && (size.width||size.height)) {
			    var width = Number((size.width).replace("px", ""));
			    var height = Number((size.height).replace("px", ""));
			
			    if (this.fillHeight) {
			        var winSize = win.getBox();
			        var pos = geom.position(this.domNode);
			        size.width = (winSize.w - pos.x - this.PAD - 25) + "px";
			    }
			    size.height = (height - this.getHeightPad()) + "px";
			
			} else {
			    log.warn("Failed to calculate size of miniapp??", size);
			}
			
			domStyle.set(this.domNode, size);
			if (domEditor != null) {
				this.setDomStyle(domEditor, domEditor_outer, size);
				this.refreshData();
			}
        },

		_removeOldEditor: function() {
			if (this.jsoneditor != null) {
				log.debug('{} Cleaning up jsoneditor', this.TAG);
				if (this.clearHandlers) this.clearHandlers();
			}
		},

		destroy: function () {
			this._removeOldEditor();
			this.inherited(arguments);
		},

		onRefreshRequested: function(data) {
			log.debug("Refresh UI -- nothing to refresh");
			log.debug(data);
        },
        
        jsonEditorOptions: function() {
            var options = {
	    	    mode: 'code',
	    	    modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
	    	    enableSort: false,
	    	    enableTransform: false,
	    	    
	    	    onError: function (err) {
	    	      alert(err.toString());
	    	    },
	    	    
	    	    onModeChange: function (newMode, oldMode) {
	    	    	thisJEObjectObj.currentMode = newMode;

	    	    	if (thisJEObjectObj._onModeChange) {
	    				thisJEObjectObj._onModeChange();
	    	    	}

	    	    	console.log('Mode switched from', oldMode, 'to', newMode);
	    	    }
            };
            
            return options;
        },
        
        getHeightPad: function () {
        	return 50;
        },
        
        setDomStyle: function (domEditor, domEditor_outer, size) {
			domStyle.set(domEditor_outer, {width: "100%"});				
			domStyle.set(domEditor, size);
        },
   
        _deferredResize: function () {
            var me=this;
			setTimeout(function(){
                me._resize();
            }, 300);
        },
        
        refreshData: function () {
			if (this.jsoneditor) { // fix data viewing issue when resizing
				if (thisJEObjectObj.currentMode == 'code') {
					var editedJSON = this.jsoneditor.get();
 	      			this.jsoneditor.set(editedJSON);
				}
			}
        },
        
	    onChange: function () {
	    	console.log('onUpdate --JSONEditor');
	    	var ValidationID = dojo.byId( "ValidationID" ); // jsonStructureError  -- thisJEObjectObj.i18nJElabels
	    	
	    	var message = thisJEObjectObj.i18nJElabels.jsonStructureError;
	    	
	    	if (message == null) {
		    	message = "JSON Structure Error -- Please Correct<br>" +
		    	"Any additional modifications will not be saved and will be lost when navigated away from this page!!";	    		
	    	}
	    	
	    	function sendOnChangeEvent() {
	    		var ValidationID = dojo.byId( "ValidationID" );

	    		try {
	    			var editedJSON = thisJEObjectObj.jsoneditor.get();
	    			thisJEObjectObj.onChangeTimedOut = true;
	    			var editedJSONString = JSON.stringify(editedJSON);

	    			if ( ValidationID ) {
	    				domConstruct.destroy( "ValidationID" );
	    			}

	    			stopFocus = true; // very important

	    			thisJEObjectObj.sendMaximoEvent("editChange", {change: editedJSONString}, thisJEObjectObj.componentId);
	    		} catch (err) {
	    			thisJEObjectObj.onChangeTimedOut = true;
	    			console.error('JSON Structure Validation Failed onUpdate', err);

	    			if ( !ValidationID ) {
	    				var JSONEditor_outer = dojo.byId( "JSONEditor_outer" );
	    				var n = domConstruct.create("div", { 
	    					"id" : "ValidationID",
	    					"title" : "Validation Titel",
	    					"innerHTML": message,
	    					"style": "color:Red;font-size:150%;text-align:center;"},
	    					JSONEditor_outer, "first");
	    			}
	    		}
	    	}

	    	if (thisJEObjectObj.onChangeTimedOut) {
	    		thisJEObjectObj.onChangeTimedOut = false;
	    		window.setTimeout(sendOnChangeEvent, 1000);
	    	}

	    	try {
	    		var editedJSON = thisJEObjectObj.jsoneditor.get();
	    		if ( ValidationID ) {
	    			domConstruct.destroy( "ValidationID" );
	    		}
	    	} catch (err) {
	    		console.error('Validation Failed onUpdate', err);

	    		if ( !ValidationID ) {
	    			var JSONEditor_outer = dojo.byId( "JSONEditor_outer" );
	    			var n = domConstruct.create("div", { 
	    				"id" : "ValidationID",
	    				"title" : "Validation Titel",
	    				"innerHTML": message,
	    				"style": "color:Red;font-size:150%;text-align:center;"},
	    				JSONEditor_outer, "first");
	    		}
	    	}
	    },

		_onModeChange: function() {
		  this.updateEditorMenu();
		},
  
		/**
		 * Update menu of json editor plugin with custom buttons
		 */
		updateEditorMenu: function() {
		  var editor = this.jsoneditor;
		  var i8nLabels = this.i18nJElabels;
  
		  var baseButton = document.createElement('button');
		  baseButton.type = 'button';
		  baseButton.className = 'jsoneditor-modes';
		  baseButton.onclick = function() {}
	
		  var baseContainer = document.createElement('div');
		  baseContainer.className = 'jsoneditor-modes';
		  baseContainer.style.position = 'relative';
		  baseContainer.style.float = 'right';
  
		  var copyright = document.querySelector('.jsoneditor-menu a.jsoneditor-poweredBy');
  
		  if (copyright) {
			copyright.style.display = 'none';
		  }
  
		  var searchBox = document.querySelector('.jsoneditor-search');
  
		  if (searchBox) {
			searchBox.style.float = 'right';
			searchBox.style.position = 'relative'
		  }
		
		  // create help html element and append to editor
		  if (editor.options.onHelp) {
			var helpButton = baseButton.cloneNode(true);
			helpButton.title = i8nLabels['configAssistance'];
  
			helpButton.style.backgroundImage = 'url(jsoneditor/btn_help.gif)';
			helpButton.style.backgroundRepeat = 'no-repeat'; 
			helpButton.style.backgroundPosition = 'center'; 
			helpButton.style.float = 'right';
			
			helpButton.onclick = function () {
			  editor.options.onHelp();
			}
		
			editor.menu.appendChild(helpButton);
		  }
	  
		  // create graph html element and append to editor
		  if (editor.mode === 'code' && editor.options.showGraph) {
			var graphButton = baseButton.cloneNode(true);
	
			graphButton.type = 'button';
			graphButton.innerHTML = i8nLabels['graph'];
			graphButton.title = i8nLabels['graphTitle'];
			graphButton.onclick = function () {
			  editor.options.showGraph();
			};
  
			var graphContainer = baseContainer.cloneNode(true);
			graphContainer.appendChild(graphButton);
		
			editor.menu.appendChild(graphContainer);
		  }
  
		  // create restore html element
		  if (editor.options.onRestore) {
			var restoreButton = baseButton.cloneNode(true);
	
			restoreButton.type = 'button';
			restoreButton.innerHTML = i8nLabels['restore'];
			restoreButton.title = i8nLabels['restoreConfig'];
			restoreButton.onclick = function () {
			  editor.options.onRestore();
			};
		
			var restoreContainer = baseContainer.cloneNode(true);
			restoreContainer.appendChild(restoreButton);
		
			editor.menu.appendChild(restoreContainer);
		  }
		  
		  // create update html element and append to editor
		  if (editor.options.onUpdate) {
			var updateButton = baseButton.cloneNode(true);
			updateButton.innerHTML =  i8nLabels['update'];
			updateButton.title = i8nLabels['updateConfig'];
			updateButton.onclick = function () {
			  editor.options.onUpdate();
			};
		
			var updateContainer = baseContainer.cloneNode(true);
			updateContainer.style.float = 'left';
			updateContainer.appendChild(updateButton);
		
			editor.menu.appendChild(updateContainer);
		  } 
		}
    });
});

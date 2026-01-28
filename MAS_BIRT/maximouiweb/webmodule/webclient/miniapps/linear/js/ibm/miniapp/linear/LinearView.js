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
    "dojo/window",
    "dojo/Deferred",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/aspect",
    "com/ibm/tivoli/maximo/miniapps/_MaximoIO",
    "com/ibm/tivoli/maximo/miniapps/_MiniApp",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
	"com/ibm/tivoli/maximo/miniapps/Handlers",
	"ibm/miniapp/linear/util/_LinearMenu",
	"ibm/miniapp/linear/util/_MapResize",
	"ibm/miniapp/linear/util/_LocSegOnMap",
	"ibm/miniapp/linear/util/_LocSegFromMap"

], function(lang, declare, geom, dom, domStyle, domAttr, bwin, win, Deferred, domConstruct, 
		arrayUtils, aspect, _MaximoIO, _MiniApp, log, Handlers, _LinearMenu, _MapResize, _LocSegOnMap, _LocSegFromMap){
    return declare([_MaximoIO, _MiniApp, Handlers, _LinearMenu], {
		// static variables
    	GRID_VERSION: 'Grid11.0',
		gridId: null,
		options: null,
		grid: null,
		reCreateGrid: false,
		sizetoparentdomid: null,
		dom: null,
		setMapVisibleCtrl: false,
		expand: true,
		currentTabId: "",
		featureClassLinked: false,
		firstPartOfTrowLabel: null,
		resizeMapObject: null,
		LocSegOnMap: null,
		LocSegFromMap: null,
		mapObj: null,
		MIN_HEIGHT: 150,

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
        	log.debug("{} Dynamic TreeGrid... loading dynamic library...", this.TAG);
        	if (window.TreeGrid) {
        		me.createUI(null);
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

		_removeOldGrid: function() {
			if (this.grid != null) {
				log.debug('{} Cleaning up TreeGrids', this.TAG);
				if (this.clearHandlers) this.clearHandlers();
				try {
					this.grid.Clear();
					this.grid.Dispose();
				} catch (ex) {
					log.warn('{} TreeGrid clean up encountered an error', this.TAG, ex);
				}
			}
		},

		destroy: function () {
			this._removeOldGrid();
			this.inherited(arguments);
	        this.subscribeOn('miniapp.visibility', lang.hitch(this,this.onVisibilityRequest));
	        this.subscribeOn('linear.set.grid', lang.hitch(this,this.createUI));


			if (this.fullScreenListener) {
				this.removeFullScreenListener();
			}
		},

		removeFullScreenListener: function() {
			this.onFullscreenModeChanged({ modeOn: false });
			this.fullScreenListener.remove();
		},

		createUI: function() {
			if (!this.dom) {
				dnode = this.domNode;
			}
			if (window.TreeGrid) {
				log.debug("TreeGrid Release: {}, {}", window.Component.Version, window.Component.Release);
			}
			log.debug("Creating Gantt UI");

            if (this.grid) {
                this._removeOldGrid();
            }

            this._newGridID();

			var headers = {};
			if (this.options.mx_csrftoken!=null) {
				headers = { 
					"csrftoken": this.options.mx_csrftoken
				};
			}

            var options = {
				Data: {
					Url: this.toUrl('get_root_data', {}),
					Header: headers,
					Timeout: 300
				},
				Page: {
					Url: this.toUrl('get_child_data', {}),
					Header: headers,
					Timeout: 300,
					Format: 'JSON'
				},
				Layout: {
					Url: this.toUrl('create_ui', {}),
					Header: headers,
					Timeout: 300
				}
			};

			// use ,Event to debug TreeGrid Events
			// use ,Info to debug performance #s
		
            // TreeGrid recommends that in final release you should set Debug="" to disable debugging.
            // Debug should only be enabled for Development and Debugging issues 
            // log level: 0=DEBUG, 1=INFO, 2=WARN, 3=ERROR
            
            if (log.LOG_LEVEL == 0) {
            	options.Debug = options.Debug || 'Problem,Error,IOError,Check,Info';
            } else if (log.LOG_LEVEL == 3) {
                options.DebugTag="Console";
            	options.Debug = options.Debug || 'Problem,Error,IOError';
            } else {
            	options.Debug = "";
            }

			// localized data
			options.Text = options.Text || {Url: this.toUrl('load_labels', {}), Format: 'JSON', Header: {"csrftoken": this.options.mx_csrftoken}};

			// setup your events...
			TGSetEvent('OnLoadError', this.gridId, new function (grid, err) {
				log.error(err);
				sendEvent("showwarnings", this.appid);
			});

			// bind a treegrid event to a method of this class
			TGSetEvent('OnClick', this.gridId, lang.hitch(this, this.OnClick));
			TGSetEvent('OnTip', this.gridId, lang.hitch(this, this.OnTip));
			TGSetEvent('OnRenderPageFinish', this.gridId, lang.hitch(this, this.OnRenderPageFinish));
			TGSetEvent('OnRightClick', this.gridId, lang.hitch(this, this.OnRightClick));
			TGSetEvent('OnGanttMenu', this.gridId, lang.hitch(this, this.OnGanttMenu));
			TGSetEvent('OnGanttMenuClick', this.gridId, lang.hitch(this, this.OnGanttMenuClick));
			TGSetEvent('OnDataGet', this.gridId, lang.hitch(this, this.OnDataGet));
			
			// create the grid
			this.grid = TreeGrid(options, this.dom, this.gridId);

			this.subscribeOn('linear.ui.refresh.grid', lang.hitch(this,this.onRefreshRequested));
			this.subscribeOn('linear.ui.reset.grid', lang.hitch(this,this.onResetRequested));
			this.subscribeOn('linear.ui.from.to.measure', lang.hitch(this,this.fromToMeasure));
			this.subscribeOn('miniapp.visibility', lang.hitch(this,this.onVisibilityRequest));
			this.subscribeOn('linear.set.grid', lang.hitch(this,this.setGrid));
			this.subscribeOn('linear.destroy.grid', lang.hitch(this,this.destroy));
			this.subscribeOn('linear.getOptions', lang.hitch(this,this.getOptions));
			this.subscribeOn('linear.map.visibility', lang.hitch(this,this.mapVisibilityCtrl));
			this.subscribeOn('linear.reset.map.visibility', lang.hitch(this,this.resetMapVisibilityCtrl));
			this.subscribeOn('locate.LVCLinearSeg.from.map', lang.hitch(this,this.locateLinearSegment));
			
			this.grid.MainTag.hidden=this.options.hidden;
			this.dom.style['padding-left']="10px";
			this.hideDebugDisplay();
			
			aspect.after(window, "onresize", lang.hitch(this,this._deferredResize));
		},
		
		catchConsecutiveDupFeatureSpecCalls: "",
		
		OnDataGet: function(/*TGrid*/ grid, /*object*/ source, /*string*/ data, /*object*/ IO){
			try {
	        	var jsonData = JSON.parse(data);

	        	// There seems to be an issue with treeGrid issuing double consecutive calls for refreshing
	        	// of third level expanded features attribute tree 
	        	// not sure why this is happening
	        	// correcting the issue here
				console.log("OnDataGet data:" + jsonData);
				if (jsonData.Body && jsonData.Body[0] && jsonData.Body[0].id){
					var id = jsonData.Body[0].id;
					if (id.includes("--features--")) {
						if (!this.catchConsecutiveDupFeatureSpecCalls) {
							this.catchConsecutiveDupFeatureSpecCalls = id;
							return data;
						} else {
							this.catchConsecutiveDupFeatureSpecCalls = "";
							return "{}";
						}
					} else {
						this.catchConsecutiveDupFeatureSpecCalls = "";
					}
				}
			} catch (e) {
				// do nothing
			}
		},
		
		getGrid: function( id, name) {
			if (this.grid == null) return "";
		 	return this.grid.IsCellExpanded(id,name);
		},
				
        /************************************************************************************************************/
        /**
         * Used to resolve the 'real' row in case the current row/col is a RunBar, and we want the row of the actual Acttivity item.
         */
        GetRow: function (/*TGrid*/grid, /*TRow*/row, /*String*/col, x, y) {
            if (col != 'G') return row;

            var objs = grid.GetGanttXY(row, col, x, y);
            if (objs != null && objs.Type != null) {
                // console.log("We Have a TIP FOR GANTT", objs);
                if (objs.RunId) {
                    // we have RunBar, look up the actual row with data
                    return this.GetRowById(objs.RunId);
                }
            }

            return row;
        },
        
        GetRowById: function (id) {
            var row = this.grid.GetRowById(id);
            if (!row && id.charAt(0)=='R') {
                row = this.grid.GetRowById(id.substring(1));
            }
            return row;
        },

        _newGridID: function() {
            // now set the new gridId and TAG so that it's never reused
            this.gridId = "g" + Math.floor((Math.random() * 10000) + 1);            
            this.TAG = (this.options.TAG || 'Linear') + "[" + this.gridId + "]";
        },

		getOptions: function() {
	           this.publishTo('getOptions',{rootUrl: this.rootUrl, tag: this.TAG, loglevel: this.loglevel, Header:{"csrftoken": this.options.mx_csrftoken}} );
		},
		
		OnTip: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*string*/ tip, /*int*/ clientX, /*int*/ clientY, /*int*/ X, /*int*/ Y) {
			log.debug('Can do something different with the tooltip, if we want', tip);
			return tip;
		},
		
		OnClick: function (/*TGrid*/ grid, /*TRow*/ row, /*string*/ col, /*int*/ x, /*int*/ y, /*Event*/ event) {
			if (this.LocSegFromMap != null && (col == "name" || col == "Mark")) {
				return this.LocSegFromMap.OnClick(grid, row, col, x, y, event);
			}
			if (this.LocSegOnMap != null) {
				return this.LocSegOnMap.OnClick(grid, row, col, x, y, event, this.mapObj);
			}
			return false
		},
		
		mapVisibilityCtrl: function (options) {
        	if (options.enabled == "toggle"){
        		this.setMapVisibleCtrl = !this.setMapVisibleCtrl;
        	} else {
               	this.setMapVisibleCtrl = options.enabled;      		
        	}
        	
        	this.currentTabId = options.currentTabId;
        	if (!miniapps.linear.instances._MiniAppInstance.reCreateGrid){
        		this.onVisibilityRequest('{enabled: true, currentTabId: \"' + options.currentTabId + '\"}');
        	}
        	this.firstPartOfTrowLabel = options.trow;

			if (this.fullScreenListener) {
				this.removeFullScreenListener();
			}

    		if (this.setMapVisibleCtrl) {
				this.fullScreenListener = dojo.subscribe("mapFullScreenModeChanged_" + options.mapObj.getId(), lang.hitch(this, this.onFullscreenModeChanged));

    			if (options.mapObj != null) {
    				this.mapObj = options.mapObj;
    				options.mapObj.RefLinearView = this;

    				if (!this.LocSegOnMap){
        				this.LocSegOnMap = new _LocSegOnMap({map: options.mapObj, componentId: this.componentId, appid: this.appid});    					
    				}
    				if (!this.LocSegFromMap){
        				this.LocSegFromMap = new _LocSegFromMap({map: options.mapObj, componentId: this.componentId, appid: this.appid, firstPartOfTrowLabel: options.trow});    					
    				}
    			}
    			
        		this._resize();;
        		
        		this.createMapResizing(options.mapObj);
        		
        	}else {
        		this.removeMapResizing(options.mapObj);
        	}
        	
        	if (this.setMapVisibleCtrl) {
    			this._resize();
    			this.delayActionZoomFit(this);
           		this.grid.Reload();
        	}
		},

		removeMapResizing: function (map) {
    		var mapResizerCreated = dojo.byId( "mapResizer" );
			if ( mapResizerCreated ) {
				this.grid.MainTag.hidden = true;
				this.setMapVisibleCtrl = false;
				this.resizeMapObject.destroy();
				this.LocSegOnMap.cleanUp();
				map.height = '100%';
				map._resize();
			}			
		},
		
		createMapResizing: function (map) {
    		var mapResizerCreated = dojo.byId( "mapResizer" );
    		if (mapResizerCreated == null) {
				this.inFullScreenMode = map.inFullScreen();
				this.setMapVisibleCtrl = true;
    			this.grid.MainTag.hidden = false;
    			if (this.resizeMapObject == null) {
    				this.resizeMapObject = new _MapResize(this);
    			}

				if (!this.inFullScreenMode) {
					map.height = "50%";					
					map._resize();
				}
    			
				this.resizeMapObject.create();

				if (this.inFullScreenMode) {
					this.onFullscreenModeChanged({ modeOn: true });
				}
    		}			
		},
		
		resetMapVisibilityCtrl: function (data) {
        	var options = dojo.fromJson(data);
            this.setMapVisibleCtrl = options.enabled;
            this.reCreateGrid = false;
		},

		onVisibilityRequest: function(data) {
			var thisFetch = this;
            this.fetch('isMboLinkedToFeatureClass').then(function(featureClassLinked){
            	thisFetch.featureClassLinked = featureClassLinked.plussIsGis;
            });

        	var options = dojo.fromJson(data);
        	this.currentTabId = options.currentTabId;
        	
        	if (this.setMapVisibleCtrl) {
        		this.setVisible = true;
        	} else {
            	this.setVisible = options.enabled;     		
        	}
			log.debug("Visibility Set: " + this.setVisible);
			if (this.setVisible && this.grid == null) {
				this.startup();
			} else if (!this.setVisible && this.grid != null) {
				this.grid.MainTag.hidden=true;
			} else if (this.grid != null && !this.reCreateGrid) {
				this.createUI();
				if (this.grid.MainTag.hidden) {
					this._resize(); // resize before displaying in map tab
					this.grid.MainTag.hidden=false;
				}
				this.reCreateGrid = true;
			} else if (this.grid != null) {
				if (this.setVisible) {
					this.grid.MainTag.hidden=false;
				} else {
					this.grid.MainTag.hidden=true;
				}
			}
			
			this._resize();
			this.delayActionZoomFit(this);
        },
        
        numOfDelayActionZoomFitIter: 0,
        delayActionZoomFitInProgress: false,
        
        delayActionZoomFit: function(thisObj) {
        	if ((thisObj.setVisible || thisObj.setMapVisibleCtrl) && thisObj.reCreateGrid) {
        		if (thisObj.grid && !thisObj.delayActionZoomFitInProgress) {
            		thisObj.delayActionZoomFitInProgress = true;
	        		if (thisObj.grid.CanZoomIn() || thisObj.grid.CanZoomOut()) {
	    				setTimeout(function(){
		        			thisObj.numOfDelayActionZoomFitIter = 0;
	    					thisObj.grid.ActionZoomFit();
	                		thisObj.delayActionZoomFitInProgress = false;
		            		console.log("ActionZoomFit function called");
	    				}, 1000);           		       			
	        		} else if(thisObj.numOfDelayActionZoomFitIter++ < 30){
	    				setTimeout(function(){
	                		thisObj.delayActionZoomFitInProgress = false;
	    					thisObj.delayActionZoomFit(thisObj);
	    				}, 1500);           		
	        		} else {
	        			thisObj.numOfDelayActionZoomFitIter = 0;
	            		thisObj.delayActionZoomFitInProgress = false;
	        		}
        		} 
        	}
        },

        setGrid: function(innerGrid) {
        	innerGrid = this.grid;
        },
        
        onRefreshRequested: function(data) {
			log.debug("Refresh UI");
			log.debug(data);
    		GetGrids();
       		var trow = this.grid.GetRowById(data);

    		if (trow != null) {
    			this.grid.Expand(trow);
    			this.grid.ExpandParents(trow);
           		this.grid.Reload();

    		}
        },
                        
        OnRenderPageFinish : function(grid, trowFinished){
    		console.log("OnRenderFinish "  + trowFinished.id);

    		this.grid = grid;
    		if (this.currentTabId == "mxmap") {
				this.hideResizer();
				this._resize();

    			if (this.LocSegFromMap != null && this.LocSegFromMap.locateSegFromMap) {
    				this.LocSegFromMap.OnRenderPageFinish(grid, trowFinished);    				
    			} else {
	    			if (this.mapObj != null && this.mapObj.targetCenter != null) {
	    				this.mapObj.centerAt(this.map.targetCenter);
	    				this.mapObj.targetCenter = null;    				
	    			} else if (this.mapObj != null && this.mapObj.currentRecordMgr && this.mapObj.currentRecordMgr.mboInfo.marker) {
	    				var point = this.mapObj.currentRecordMgr.mboInfo.marker.point
	    				var pt = point.toProprietary();
						if ( this.mapObj.map.spatialMapManager.isPointInFullExtent( pt ) == false ) {
							return;
						}
						this.mapObj.map.centerAt(pt);
	    			}
    			}
    			
    			var nodes = document.getElementsByTagName("div");
    			for(var x = 0; x < nodes.length; x++){
    			  if(nodes[x].id.indexOf("TGTmpFocusGrid") !== -1 ){
    				  domConstruct.destroy(nodes[x].id);
    			  }
    			}
    		}
        },
       
        onResetRequested: function(data) {
			log.debug("Reset UI");
			if (this.reCreateGrid) {
				this.createUI();
			}
    		this.reCreateGrid = false;
    		this.grid.MainTag.hidden = true;
        },

        fromToMeasure: function(data) {
			log.debug("From-To Measure: " + data);

			var toFromMeaseureData = dojo.fromJson(data);
			if (this.reCreateGrid && this.grid.GetGanttBase() != null && this.grid.GetGanttBase() != "") {
	    		this.grid.SetGanttBase(toFromMeaseureData.SetGanttBase);
	    		this.grid.SetGanttFinish(toFromMeaseureData.SetGanttFinish);
			}
        },

        _resize: function () {
        	if ((this.setVisible || this.setMapVisibleCtrl)) {
				if (this.inMapTab()) {
					this.resizeInMapTab();
					return;	
				}

				this.fixToolStyleOutsideMapTab();

	            var size = this.onMeasure();
	            log.debug('{}: resize() called with measure', this.TAG, size);
	            if (size && (size.w||size.h)) {
	                geom.setContentSize(this.domNode, size);
	            } else if (size && (size.width||size.height)) {
	                domStyle.set(this.domNode, size);
	            } else {
	                log.warn("Failed to calculate size of miniapp??", size);
	            }
                domStyle.set(this.domNode, {"margin-bottom": "25px", "margin-left": "10px", "margin-right": "25px"});

        	}
        },

        _deferredResize: function () {
            var me=this;
			setTimeout(function(){
                me._resize();
            }, 300);
        },
        
        /**
         * Either returns an object with w,h or width,height.  The latter being a css measurement vs a pixel box measurement.
         */
        onMeasure: function () {
            log.debug('{}: onMeasure() RRR called', this.TAG);
            /**
             * Size to parent id is a bit misleading.  It will size to the parent node, but, if fillheight=true
             * it will use the available screen heigh instead of the parent height.
             */
            if (this.sizetoparentdomid != null) {
                // set our size
                var control = this.domNode;
                var controlPos = geom.position(control);
    			var systemNavAppContent = dojo.byId( "SystemNavAppContent-sc_div" );

                var parent = dom.byId(this.sizetoparentdomid);
                if(this.currentTabId == "mxmap" && systemNavAppContent != null) {
                	parent = dom.byId(systemNavAppContent);
                }
                var parentBox = geom.getContentBox(parent);
                var parentPos = geom.position(parent);
                
				if ( parentBox.w >= window.innerWidth && this.currentTabId == "mxmap") {
					parentBox.w = window.innerWidth;
				}
				
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
                var prefH = Math.max(200, parseInt(this.preferredHeight)) - 50; // can't be less than 200pixels
                var prefW = parentBox.w - 35; // removed -mx
                if (this.currentTabId == "mxmap") prefW = (parentBox.w -35);

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

        hideDebugDisplay: function() {
        	var debugWindow = dom.byId("_TreeGridDebug");
        	var debugButtons = dom.byId("_TreeGridDebugButtons");
        	if (debugWindow && Grids && log.LOG_LEVEL == 0) {
        		debugWindow.style.display="none";
        		debugButtons.style.display="none";
        		Grids.DebugHidden=1;
        	}
        },
        
        locateLinearSegment: function(segInfo) {
        	if (this.LocSegFromMap) {
        		this.LocSegFromMap.locateLinearSegment(this.grid, this.firstPartOfTrowLabel, segInfo);
        	}
        },

		inMapTab: function() {
			return this.currentTabId == "mxmap";
		},

		resizeInMapTab: function() {
			var map = this.getMap();
			var availableHeight = this.getAvailableHeightInMapTab() - map.offsetHeight;
			
			this.fixToolStyleOnMapTab();

			domStyle.set(this.domNode, {
				height: availableHeight + "px",
				width: '100%',
				margin: "",
				padding: ""
			});
		},

		getMap: function() {
			return dojo.byId("mxmap_div-mapcontrol_mapdiv");
		},

		getAvailableHeightInMapTab: function() {
			var map = this.getMap();
			var offsetParent = map.offsetParent || document.body;
			var availableHeight = offsetParent.offsetHeight - map.offsetTop;

			if (!dojo.isWebKit) {
				availableHeight -= 1;
			}

			return availableHeight;
		},

		hideResizer: function() {
			var resizer = dojo.query(".CGResizeGrid", this.dom)[0];
			if (resizer) {
				domStyle.set(resizer, {
					display: "none"
				});
			}
		},

		getTable: function() {
			return dojo.query(".CGMainTable", this.dom)[0];
		},

		getTableHeight: function() {
			var table = this.getTable();
			if (table) {
				return table.offsetHeight;
			}
			
			return 0;
		},

		getHeader: function() {
			return dojo.query('.CGToolbarRow', this.dom)[0];
		},

		fixToolStyleOnMapTab: function() {
			var header = this.getHeader();
			if (header) {
				domStyle.set(header, { border: 'none' });
			}

			var table = this.getTable();
			if (table) {
				domStyle.set(table, { 
					border: 'none',
					borderBottom: '1px solid rgba(192, 192, 255)'
				});
			}

			domStyle.set(this.dom, { 
				border: '1px solid rgba(0, 0, 0, 0.72)',
				backgroundColor: '#FFFFFF'
			});
		},

		fixToolStyleOutsideMapTab: function() {
			domStyle.set(this.dom, {
				border: "",
				backgroundColor: ""
			});
		},

		onFullscreenModeChanged: function(event) {
			var map = this.getMap();
			var modeOn = event.modeOn;
			
			map.style.height = (this.getAvailableHeightInMapTab() / 2) + 'px';
			
			if (modeOn) {
				this.inFullScreenMode = true;

				this.positionTool();
			} else {
				this.inFullScreenMode = false;

				domStyle.set(this.dom, {
					position: '',
					left: '',
					top: '',
					width: '',
					height: '',
					zIndex: ''
				});
			}

			this._resize();
		},

		positionTool: function() {
			if (!this.inFullScreenMode) {
				return;
			}

			var map = this.getMap();
			var width = map.offsetWidth;
			var top = map.offsetHeight + map.offsetTop;
			var left = 0;

			var applicationNavigationMenu = dojo.query('.application-navigation-menu')[0];
			if (applicationNavigationMenu) {
				left = parseInt(dojo.style(applicationNavigationMenu, 'width')) || 0;
			}

			domStyle.set(this.dom, {
				position: 'fixed',
				left: left + 'px',
				width: width + 'px',
				top: top + 'px',
				zIndex: 1001
			});
		}
        
	});
});

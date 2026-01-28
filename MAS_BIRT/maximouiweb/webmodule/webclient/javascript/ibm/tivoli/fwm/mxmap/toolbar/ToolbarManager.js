/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2011,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */
/**
 * Controls the toolbar actions
 */
define(["dojo/main", "dijit/main", "dojox/main", "dojo/_base/declare", "dojo/parser", 
	"dijit/_WidgetBase", "ibm/tivoli/fwm/mxmap/_Base", "dijit/Toolbar", "ibm/tivoli/fwm/mxmap/toolbar/ToolbarSeparator",
	"dojo/_base/Deferred", "dojo/_base/lang", "dojo/dom-attr"],
	function(dojo, dijit, dojox, declare, parser, _WidgetBase, _Base,
			Toolbar, ToolbarSeparator, Deferred, lang, domAttr){

	if (!ibm.tivoli.fwm.mxmap.toolbar) {
		ibm.tivoli.fwm.mxmap.toolbar = {};
	}
	if (!ibm.tivoli.fwm.mxmap.toolbar.ext) {
		ibm.tivoli.fwm.mxmap.toolbar.ext = {};
	}
	
	return declare([_Base], {
		gisdata: null,
		mxdata: null,
		map: null,			
		items:[],
		toolbarItems:null,
		toolbarDivElement: null,
		addOnsAvailable: null,
		_toolbarHeight: 40,
		toolbarWidth:null,
		destroyingToolbar: null,
		currentTool: null,
		previousTool: null,
		isStartUp: null,

		/**
		 * Subscribes to the server updates to the current record
		 */
		constructor: function(options)
		{
			dojo.mixin(this, options);
			this.toolbarItems = [];
			this.addOnsAvailable = [];
			this.destroyingToolbar = false;
			// ['FullScreen','RefresherTool','MyLocationTool','ItineraryTool','QueryUnassignedWorkTool','QueryNearResources', 'LayersTool'];
			//if(this.map.isMobile == true){
			//this._defaultItems.push('MobileInfoPanel');
			//}
		},
		postCreate: function(){
			this.addSubscription("onCurrentRecordUpdate_"+this.map.getId(),
					dojo.hitch(this, this.serverUpdated));
		},
		container:null,
		toolbar:null, 
		loadToolBar: function() {

			var borderBottomStyle = dojo.isIE ? '1px solid #AAA' : '0px solid #AAA';
			this.container = dojo.create("div", {
				id: this.map.divId + "_toolbar",
				style: {
					whiteSpace: 'normal',
					'background-color': '#FFFFFF',
					'border':'1px solid #AAA',
					'border-bottom-color':'black','display':'block',
					'borderBottom' : borderBottomStyle,
					width: this.map.getWidthInPixels() + "px",
					height: this._toolbarHeight + "px"
				}
			}, dojo.byId(this.map.divId), 'before');
			var div = dojo.create("div", null, this.container);
			this.toolbar = new dijit.Toolbar(
				/* Object? */ 
				{
					style: {
						width: '100%',
						'border':'0',
						'background-position-y':'4%',
						'display': 'flex',
						'align-items': 'center',
						'height': '100%'
					}, 
					splitter: "true"
				}, 
				/* DomNode|String */
				div
			);				



			var mapid = this.map.getId();	
			var addOns = this.addOnsAvailable;
			var createItemButton = function(item){
				if(item == "sep"){
					var d = new ibm.tivoli.fwm.mxmap.toolbar.ToolbarSeparator();
					this.toolbar.addChild(d);
				}else{
					if (item == 'QueryWeatherAlertsTool' && !this.map.mapConf.schedulerPlusLicenseEnabled)
						return;

					var dijitName ="ibm/tivoli/fwm/mxmap/toolbar/ext/"+item;
					
					require([dijitName], dojo.hitch(this, function(itemName){ 
						try
						{
							this.itemDojo =  new itemName({map: this.map});
							if(this.map.mapConf.mapViewOnly && this.itemDojo.modifiesMap){
								if (dojo.config.fwm.debug == true)
								{
									console.debug("Tool will not be added in the toolbar: " + item);
								}
							}else{
								var itemDojo=this.itemDojo;// breaking up dojo. and require necessary to fool the dojo parser!
								if (itemDojo.isAddOn) 
								{
									addOns.push(itemDojo.addOnName);
								}
								var button = null;
								if (itemDojo.createToolbarButton) {
									button = itemDojo.createToolbarButton();
								}
								if (button == null){									
									return;
								}		
								var clickListener = function(){	
									if(this.lastItemClicked && this.lastItemClicked.declaredClass!=itemDojo.declaredClass){
										this.lastItemClicked.disable();
									}
									dojo.publish("mxnToolbarClicked_"+this.map.getId(),[itemDojo, this.lastItemClicked]);
									this.lastItemClicked=itemDojo;
								};
								this.addConnection("onClick", clickListener, button, this);
								this.toolbar.addChild(button);
								this.toolbarItems.push(itemDojo); 
							}								
						}
						catch(e)
						{
							console.log("Error ");
							console.log(e);
						}							
					})
					);
				}					
			};
			console.log("Toolbar items",this.items);
			dojo.forEach(this.items, createItemButton, this);

			this.map.mapConf.addOnsAvailable = addOns;
			// toolbar div is necessary for the full screen feature
			this.toolbarDivElement = this.container;

			if (this.map.providerName == "maximospatial" && this.map.mapConf.toolsPersistenceEnable == "1")
			{
				dojo.forEach(this.toolbarItems, function(toolbarItem){		
					if (typeof toolbarItem.loadToolConfiguration == 'function') {
						toolbarItem.loadToolConfiguration();
					}				
				});
			    /*
				 * Calls the events after the creation of all
				 */
				 dojo.forEach(this.toolbarItems, function(toolbarItem){
				 if (typeof toolbarItem.postCreate == 'function') {
			      toolbarItem.postCreate();
				 }
				 });

			}
			this.updateToolbarWidth(this.toolbarWidth);

			//Hide the loading icon after the toobar items are loaded
			if (this.map.providerName == "maximospatial")
			{
				this.map.hideLoadingImg();
			}

			if (this.map.isFullScreen == true)
			{
				this.map.fullScreenOn();
			} else {
				this.map._resize();
			}
		},
		disableTools: function(currentTool) {
			this.previousTool = this.currentTool;
			this.currentTool = currentTool;
			dojo.forEach(this.toolbarItems, function(itemDojo){							
				if (currentTool == null || currentTool.toolName != itemDojo.toolName) {
					if (typeof itemDojo.disableHighlightButton == 'function') {
						itemDojo.disableActions();
						itemDojo.disableHighlightButton();
					}
				}									
			});
		},
		startup:function(){
			this.loadToolBar();
		},
		lastItemClicked:null,
		serverUpdated: function()
		{
			this.mxdata = data.mxdata;
			this.gisdata = data.gisdata;
		},
		destroyToolbar: function() {
			dojo.forEach(this.toolbarItems, function(item){										
				item.destroy();					
			});				
			if (this.toolbar) {
				this.toolbar.destroyRecursive(true);
			}
			if (this.container) {
				dojo.empty(this.container);
			}
		},
		destroyRecursive: function(){
			this.inherited(arguments);

			if (!this.destroyingToolbar) {
				this.destroyingToolbar = true;
				if (this.map.providerName == "maximospatial")
				{
					if (this.map.mapConf.toolsPersistenceEnable == "1") {
						dojo.forEach(this.toolbarItems, function(item){		
							if (typeof item.saveToolConfiguration == 'function') {
								item.saveToolConfiguration();
							}				
						});
						var toolsJson = this.map.toolsJson;
						if (toolsJson) {
							toolsJson.saveMapExtent = this.map.mapConf.saveMapExtent;
							toolsJson.mapExtent = this.map.map.extent.toJson();
							toolsJson.zoomLevel = this.map.map.getLevel();
							this.map.getMaximo().saveToolsConfiguration(toolsJson, dojo.hitch(this, function(success) {
								this.destroyToolbar();
							}));
						} else {
							this.destroyToolbar();
						}

					} else {
						this.destroyToolbar();
					}

				} else {
					this.destroyToolbar();
				}
			}
		},
		getToolbarDivElement: function(){				
			return this.toolbarDivElement;
		},
		updateToolbarWidth: function(newWidth)
		{
			if (!newWidth)
			{
				newWidth = '99%';
			}
			if (this.toolbarDivElement) {
				if (newWidth.substr(newWidth.length - 1, 1) == '%')
				{
					dojo.style(this.toolbarDivElement, {width: newWidth});
				}
				else
				{
					dojo.style(this.toolbarDivElement, {width: newWidth + "px"});
				}					
			}

		},
		getToolbarHeight: function()
		{
			return this._toolbarHeight;
		},
		getToolItems: function() {
			return this.toolbarItems;
		}
	});
});

/* IBM Confidential
 *
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

define( "ibm/tivoli/fwm/mxmap/findlocation/FindLocationPanelWidget", ["dojo/_base/declare", "dojo/dom-construct",
		"dijit/_Widget",
		"dijit/_Templated",
		"ibm/tivoli/fwm/mxmap/_Base",
		"dojo/dom", "dojo/dom-style",
		"dojo/on", "dojo/dom-class",
		"dijit/form/Button", "dijit/form/TextBox"
	], function (declare, domConstruct, _Widget, _Templated,_Base,  dom, domStyle, on, domClass, Button, TextBox) {

	return declare( [_Widget, _Templated, _Base], {
		templateString: dojo.cache("ibm.tivoli.fwm.mxmap", "templates/FindLocationPanelWidget.html", "<div>\n\t<div data-dojo-attach-point=\"findLocationDiv\" id=\"findLocationToolDiv\" class=\"findLocationBar\"></div>\n</div>\n"),
		
		/* Tool initialization. The params argument,
		 * by default, contains only the Map reference */
		constructor: function(params)
		{
			dojo.mixin(this, params);	
		},
		/**
		 * Create the Find Location bar on the map
		 */
		createBar: function() {
			var mapDiv = this.map.element;
			
			this.searchField = new TextBox({
 	  		        id: "findLocationToolInputField",
 	  		        "class": "findLocationToolInputTxt",
 	  		        value: "",
 	  		        placeHolder: ibm.tivoli.fwm.i18n.getMaxMsg("map", "findLocation")
 	  		    });
			
			
			this.searchButton = new Button( {
				label : "",
				showLabel : false,
				iconClass : "findLocationToolButton findLocationToolFindButton",
				id: "findLocationToolFindButton",
				onClick : dojo.hitch( this, function() {
					this.searchButton.set("disabled", true);
					this.findAddressLocation();
					}),
				onDblClick : dojo.hitch( this, function(event ) {
					event.stopPropagation();
					})
			});
			this.searchButton.set("disabled", true);
			dojo.subscribe('findLocationSelected',dojo.hitch(this,function(){
				this.searchButton.set("disabled", false);
			}));
			on(this.searchField, "keyUp", dojo.hitch(this, function(evt) {
				if (this.searchButton.get("disabled")) {
					if (!this.searchField.displayedValue == "") {
						this.searchButton.set("disabled", false);
					}
				} else if (this.searchField.displayedValue == "") {
					this.searchButton.set("disabled", true);
				}
			}));
			on(this.searchField, "keyDown", dojo.hitch(this, function(evt) {
				if (evt.keyCode == "13") {
					evt.preventDefault();
					this.findAddressLocation();
				}
				if (evt.keyCode == "27") {
					this.tool.execute();
				}
			}));
			
			/*
			 * Set the css class for the find location bar based on the provider
			 */
			if (this.map.mapConf.provider == "spatial") {
				domClass.add(this.findLocationDiv, "spatialFindLocationBar");
			} else if (this.map.mapConf.provider == "gmaps") {
				domClass.add(this.findLocationDiv, "gMapsFindLocationBar");
			} else if (this.map.mapConf.provider) {
				domClass.add(this.findLocationDiv, "bmapsFindLocationBar");
			}
			
			domStyle.set(this.findLocationDiv, "z-index", "1000");
			
			domConstruct.place(this.domNode, mapDiv, "first");
			domConstruct.place(this.searchField.domNode, this.findLocationDiv, "first");
			domConstruct.place(this.searchButton.domNode, this.findLocationDiv, "last");
			
			this.searchButton.startup();
		},
		/**
		 * Calls the geocoder findlocation methos, using as a parameter the search field value
		 */
		findAddressLocation: function() {
			var locationString = this.searchField.getValue();
			this.map.geocoder.findLocation(locationString);
		},
		/**
		 * Show the Find Location bar on the map
		 */
		show: function() {
			domStyle.set(this.findLocationDiv, "display", "inline");
		},
		hide: function() {
			domStyle.set(this.findLocationDiv, "display", "none");
		},
		destroy: function()
		{
			if (this.searchField) {
				this.searchField.destroyRecursive();
			}
			if (this.searchButton) {
				this.searchButton.destroyRecursive();
			}
			if (this.closeButton) {
				this.closeButton.destroyRecursive();
			}
			
		}
	})
});

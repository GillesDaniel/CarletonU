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




define(["dojo/main", "dijit/main", "dojox/main","dojo/_base/declare",
	"ibm/tivoli/fwm/mxmap/_Base"], 
	function(dojo, dijit, dojox, declare, _Base) {
	return declare([_Base], {

		api: null,
		location: null,
		onmap: false,
		proprietary_marker: false,
		attributes: null,
		// If this marker is a "Multi Marker", this property will hold the other
		// markers that are part of the multi marker.
		referencedMarkers: null,
		infoBubbleOpen: false,

		/**
		 * Marker create's a new marker pin
		 * 
		 * @name mxn.Marker
		 * @constructor
		 * @param {LatLonPoint}
		 *            point the point on the map where the marker should go
		 */
		constructor: function(params)
		{
			this.attributes = [];
			this.referencedMarkers = [];
			dojo.mixin(this, params);
			this.location = params.point;
		},

		/**
		 * Retrieve the settings from a proprietary marker.
		 * 
		 * @name mxn.Marker#fromProprietary
		 * @function
		 * @param {String}
		 *            apiId The API ID of the proprietary point.
		 * @param {Object}
		 *            marker The proprietary marker.
		 */
		fromProprietary: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		/**
		 * Hide the marker.
		 * 
		 * @name mxn.Marker#hide
		 * @function
		 */
		hide: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		/**
		 * Remove the marker.
		 * 
		 * @name mxn.Marker#remove
		 * @function
		 */
		remove: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		/**
		 * Open the marker's info bubble.
		 * 
		 * @name mxn.Marker#openBubble
		 * @function
		 */
		openBubble: function()
		{
			this.infoBubbleOpen = true;
		},

		/**
		 * Closes the marker's info bubble.
		 * 
		 * @name mxn.Marker#closeBubble
		 * @function
		 */
		closeBubble: function()
		{
			this.infoBubbleOpen = false;
		},

		closeBubbleIfNecessary: function()
		{
			if(this.infoBubbleOpen == true)
			{
				this.infoBubbleOpen = false;
				this.closeBubble();
				this._sendCloseBubbleEventIfNecessary();
			}
		},

		/**
		 * Show the marker.
		 * 
		 * @name mxn.Marker#show
		 * @function
		 */
		show: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		/**
		 * Converts the current Marker to a proprietary one for the API specified by
		 * apiId.
		 * 
		 * @name mxn.Marker#toProprietary
		 * @function
		 * @param {String}
		 *            apiId The API ID of the proprietary marker.
		 * @returns A proprietary marker.
		 */
		toProprietary: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		/**
		 * Updates the Marker with the location of the attached proprietary marker
		 * on the map.
		 * 
		 * @name mxn.Marker#update
		 * @function
		 */
		update: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		setChild: function(some_proprietary_marker)
		{
			this.proprietary_marker = some_proprietary_marker;
			some_proprietary_marker.mxmapMarker = this;
			this.onmap = true;
		},

		setLabel: function(labelText)
		{
			this.labelText = labelText;
		},
		setTooltip: function(labelText)
		{
			this.tooltip = labelText;
		},
		showTooltip: function(screenPoint, mapDom)
		{
			if (this.tooltip && this.tooltip.length > 0)
			{
				var topPx = screenPoint.y + "px";
				var leftPx = screenPoint.x + "px";
				var dom = dojo.create("div", {
					style: {
						position: "absolute",
						top: topPx,
						left: leftPx					
					}
				}, mapDom);
				var rtl=false;
				var mapRtl=dojo.style(mapDom,'directions');
				if(document.body.dir=='rtl' && mapRtl!='ltr'){
					rtl=true;
				}

				dijit.showTooltip(this.tooltip, dom,['after'],rtl);
				this._tooltipDom = dom;
			}
		},
		hideTooltip: function()
		{
			dijit.hideTooltip(this._tooltipDom);
		},
		/**
		 * addData conviniently set a hash of options on a marker
		 * 
		 * @param {Object}
		 *            options An object literal hash of key value pairs. Keys are:
		 *            label, infoBubble, icon, iconShadow, infoDiv, draggable,
		 *            hover, hoverIcon, openBubble, groupName.
		 */
		addData: function(options)
		{
			for (var sOptKey in options)
			{
				if (options.hasOwnProperty(sOptKey))
				{
					switch (sOptKey)
					{
					case 'label':
						this.setLabel(options.label);
						break;
					case 'tooltip':
						this.setTooltip(options.tooltip);
						break;
					case 'infoBubble':
						this.setInfoBubble(options.infoBubble);
						break;
					case 'icon':
						if (options.iconSize && options.iconAnchor)
						{
							this.setIcon(options.icon, options.iconSize, options.iconAnchor);
						}
						else if (options.iconSize)
						{
							this.setIcon(options.icon, options.iconSize);
						}
						else
						{
							this.setIcon(options.icon);
						}
						break;
					case 'iconShadow':
						if (options.iconShadowSize)
						{
							this.setShadowIcon(options.iconShadow, [ options.iconShadowSize[0], options.iconShadowSize[1] ]);
						}
						else
						{
							this.setIcon(options.iconShadow);
						}
						break;
					case 'infoDiv':
						this.setInfoDiv(options.infoDiv[0], options.infoDiv[1]);
						break;
					case 'draggable':
						this.setDraggable(options.draggable);
						break;
					case 'hover':
						this.setHover(options.hover);
						this.setHoverIcon(options.hoverIcon);
						break;
					case 'hoverIcon':
						this.setHoverIcon(options.hoverIcon);
						break;
					case 'openBubble':
						this.openBubble();
						break;
					case 'closeBubble':
						this.closeBubble();
						break;
					default:
						// don't have a specific action for this bit of
						// data so set a named attribute
						this.setAttribute(sOptKey, options[sOptKey]);
					break;
					}
				}
			}
		},

		/**
		 * Sets the html/text content for a bubble popup for a marker
		 * 
		 * @param {String}
		 *            infoBubble the html/text you want displayed
		 */
		setInfoBubble: function(infoBubble)
		{
			this.infoBubble = infoBubble;
		},

		/**
		 * Sets the text and the id of the div element where to the information
		 * useful for putting information in a div outside of the map
		 * 
		 * @param {String}
		 *            infoDiv the html/text you want displayed
		 * @param {String}
		 *            div the element id to use for displaying the text/html
		 */
		setInfoDiv: function(infoDiv, div)
		{
			this.infoDiv = infoDiv;
			this.div = div;
		},

		/**
		 * Sets the icon for a marker
		 * 
		 * @param {String}
		 *            iconUrl The URL of the image you want to be the icon
		 */
		setIcon: function(iconUrl, iconSize, iconAnchor)
		{
			this.iconUrl = iconUrl;
			if (iconSize)
			{
				this.iconSize = iconSize;
			}
			if (iconAnchor)
			{
				this.iconAnchor = iconAnchor;
			}
		},

		/**
		 * Sets the icon for a marker
		 * 
		 * @param {String}
		 *            iconUrl The URL of the image you want to be the icon
		 */
		setShadowIcon: function(iconShadowUrl, iconShadowSize)
		{
			this.iconShadowUrl = iconShadowUrl;
			if (iconShadowSize)
			{
				this.iconShadowSize = iconShadowSize;
			}
		},

		setHoverIcon: function(hoverIconUrl)
		{
			this.hoverIconUrl = hoverIconUrl;
		},

		/**
		 * Sets the draggable state of the marker
		 * 
		 * @param {Bool}
		 *            draggable set to true if marker should be draggable by the
		 *            user
		 */
		setDraggable: function(draggable)
		{
			this.draggable = draggable;
		},

		/**
		 * Sets that the marker info is displayed on hover
		 * 
		 * @param {Boolean}
		 *            hover set to true if marker should display info on hover
		 */
		setHover: function(hover)
		{
			this.hover = hover;
		},

		/**
		 * Set an arbitrary key/value pair on a marker
		 * 
		 * @param {String}
		 *            key
		 * @param value
		 */
		setAttribute: function(key, value)
		{
			this.attributes[key] = value;
		},

		/**
		 * getAttribute: gets the value of "key"
		 * 
		 * @param {String}
		 *            key
		 * @returns value
		 */
		getAttribute: function(key)
		{
			return this.attributes[key];
		},

		addMarkerEventHandler: function(event, handler)
		{
			this.addSubscription('marker_' + event + '_' + this.compId, handler);
		},
		removeMarkerEventHandler: function(event, handler)
		{
			this.removeSubscription('marker_' + event + '_' + this.compId, handler);
		},
		fireMarkerEvent: function(event, data)
		{
			dojo.publish('marker_' + event + '_' + this.compId, data);
		},
		getTooltip: function()
		{
			return this.tooltip;
		},
		hasReferencedMarkers: function()
		{
			return ((this.referencedMarkers != null) && (this.referencedMarkers != undefined) && (this.referencedMarkers.length > 0)) ? true : false;
		},
		// If this marker is a "Multi Marker", there will be other markers at the same spot
		// as this one. Those markers are the referenced markers.
		addReferencedMarker: function(marker)
		{
			if((marker != null) && (marker != undefined))
			{
				if(this._isReferencedMarkerNew(marker) == true)
				{
					this.referencedMarkers.push(marker);
				}
			}
		},
		clearReferencedMarkers: function()
		{
			this.referencedMarkers = [];
		},
		getReferencedMarkers: function()
		{
			return this.referencedMarkers;
		},

		_isReferencedMarkerNew: function(marker)
		{
			for(var i=0; i<this.referencedMarkers.length; i++)
			{
				if(marker == this.referencedMarkers[i])
				{
					return false;
				}
			}
			return true;
		},
		// Only necessary for google because it's info window is the only one that is proprietary and the only
		// way to trigger closing bubble events is by clicking on the X button 
		// For other providers, the closing of the infoWindow object triggers the necessary events, even
		// if someone else (besides clicking on the X button) closes it
		_sendCloseBubbleEventIfNecessary: function() {},

		// The activity ID (if it exists) can be either a property or an array,
		// so this method return it (or them) as an array
		// This method is used only by DispatcherManager
		getActivityIdArray: function()
		{
			var activityId = this.getAttribute("activityId");
			if(activityId != null && activityId != undefined)
			{
				if (activityId instanceof Array)
				{
					return activityId;
				}
				else
				{
					return [activityId];
				}
			}
			return null;
		},

		// Checks whether whether the "id" exists in the marker's activityId array
		// This method is used only by DispatcherManager
		hasActivityId: function(id)
		{
			var foundExistingActivityId = false;
			var activityIdArray = this.getActivityIdArray();
			if(activityIdArray != null)
			{
				dojo.forEach(activityIdArray, function(activityId)
						{
					if(activityId == id)
					{
						foundExistingActivityId = true;
					}
						});
			}
			return foundExistingActivityId;
		},

		MarkerEvents:
		{
			openInfoBubble: 'openInfoBubble', // Info bubble opened
			closeInfoBubble: 'closeInfoBubble', // Info bubble closed
			dragstart: 'dragstart', // when the marker starts to be dragged
			drag: 'drag', // while the marker is being dragged
			dragend: 'dragend', // when the marker ends to be dragged
			click: 'click' // Marker clicked
		}

	});
});

// wrapped by build app
define("ibm/tivoli/fwm/mxmap/impl/marker/BingMarker", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Marker"], function(dijit,dojo,dojox){
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

dojo.require("ibm.tivoli.fwm.mxmap._Marker");
dojo.provide("ibm.tivoli.fwm.mxmap.impl.marker.BingMarker");

/**
 * Marker
 */
dojo.declare("ibm.tivoli.fwm.mxmap.impl.marker.BingMarker", ibm.tivoli.fwm.mxmap._Marker, {
	
	/**
	 * Returns a new proprietary instance of Microsoft.Maps.Pushpin object.
	 */
	toProprietary: function()
	{
		var pin;
		var map = this.map;
		
		var pinOptions = {
			draggable: this.draggable,
			visible: true
		};
		if (this.labelText != null && this.labelText.length > 0)
		{
			pinOptions.text = this.labelText;
			pinOptions.textOffset = new Microsoft.Maps.Point(2, 6);
		}
	
		if (this.iconUrl)
		{
			pinOptions.icon = this.iconUrl;
		}
		if (this.iconSize)
		{
			pinOptions.height = this.iconSize[1] + "px";
			pinOptions.width = this.iconSize[0] + "px";
		}
	
		if (this.iconAnchor)
		{				
			pinOptions.anchor = new Microsoft.Maps.Point(this.iconAnchor[0] - 2, this.iconAnchor[1] - 2);
		}
		pin = new Microsoft.Maps.Pushpin(this.location.toProprietary(), pinOptions);
		
		var me = this;
	
		Microsoft.Maps.Events.addHandler(pin, "mouseout", function()
		{
			pin.mxmapMarker.dragging = false;
		});
	
		var rootElement = map.getRootElement();
		if (this.infoBubble)
		{
			// Passing in the marker as well so that, when the infoIndow is closed,
			// it will be possible to detect which marker generated this event
			var infoWindow = new ibm.tivoli.fwm.mxmap.InfoWindow({
				map: map,
				mapId: me.compId,
				rootElement: rootElement,
				marker: me,
				isMobile: this.isMobile
			});
			this.proprietary_infowindow = infoWindow;
	
			Microsoft.Maps.Events.addHandler(pin, "click", function(e)
			{
				dojo.publish("onMarkerClicked_" + me.compId, [ {
					marker: pin.mxmapMarker
				} ]);
				// 12-10255
				if (pin.mxmapMarker.dragging == true)
				{
					return;
				}
				pin.mxmapMarker.openBubble(e);
			});
		}
		if (this.draggable == true)
		{
			var m = this;
			Microsoft.Maps.Events.addHandler(pin, "dragstart", function()
			{
				// Passing in the marker (not the proprietaty one) as objectSource
				// Defect 66864: The map id was wrong, it was undefined and the marker auto refresh was broken.
				// This happened during mapstraction removal
				dojo.publish("startedUserInteractionOnMap_" + me.compId, [ {
					objectSource: me,
					objectSourceName: 'microsoftv8',
					eventName: 'dragstart'
				} ]);
				
				// Looks like the event below is not handled anywhere
				//var latLng = this.map.latLng(pin.getLocation().latitude, pin.getLocation().longitude);
				//me.fireMarkerEvent(me.MarkerEvents.dragstart, latLng)
				pin.mxmapMarker.hideTooltip();
	
			});
			Microsoft.Maps.Events.addHandler(pin, "drag", function()
			{
				// Looks like the event below is not handled anywhere
				//var latLng = this.map.latLng(pin.getLocation().latitude, pin.getLocation().longitude);
				//me.fireMarkerEvent(me.MarkerEvents.drag, latLng)
				pin.mxmapMarker.dragging = true;
			});
			Microsoft.Maps.Events.addHandler(pin, "dragend", function()
			{
				if (pin.mxmapMarker.dragging != true)
				{
					return;
				}
	
			
				me.fireMarkerEvent(me.MarkerEvents.dragend, {
					marker: me,
					newLocation: {
						lng: pin.getLocation().longitude,
						lat: pin.getLocation().latitude
					}
				});

				// Passing in the marker (not the proprietaty one) as objectSource
				// Defect 66864: The map id was wrong, it was undefined and the marker auto refresh was broken.
				// This happened during mapstraction removal
				dojo.publish("endedUserInteractionOnMap_" + me.compId, [ {
					objectSource: me,
					objectSourceName: 'microsoftv8',
					eventName: 'dragend'
				} ]);
			});
		}
		if (this.tooltip && this.tooltip.length > 0)
		{
	
			Microsoft.Maps.Events.addHandler(pin, "mouseover", function()
			{
				var screenPoint = map.tryLocationToPixel(pin.getLocation(), Microsoft.Maps.PixelReference.control);
	
				pin.mxmapMarker.showTooltip(screenPoint, map.getRootElement());
	
			});
			Microsoft.Maps.Events.addHandler(pin, "mouseout", function()
			{
				pin.mxmapMarker.hideTooltip();
	
			});
	
		}
		if (this.hoverIconUrl)
		{
			Microsoft.Maps.Events.addHandler(pin, "mouseover", function()
			{
				pinOptions.icon = hIcon;
				pin.setOptions(pinOptions);
			});
			Microsoft.Maps.Events.addHandler(pin, "mouseout", function()
			{
				pinOptions.icon = hIcon;
				pin.setOptions(pinOptions);
	
			});
	
		}
		map.entities.push(pin);
		return pin;
	},

	/**
	 * Shows the marker's bubble (Microsoft.Maps.Infobox).
	 */
	openBubble: function()
	{
		// Defect 99060: Adding this condition so that markers that have been removed
		// from the map cannot have a maptip showing.
		if(this.onmap == true)
		{
			var me = this;
			// Passing in the marker (not the proprietaty one) as objectSource
			// Defect 66864: The map id was wrong, it was undefined and the marker auto refresh was broken.
			// This happened during mapstraction removal
			dojo.publish("startedUserInteractionOnMap_" + me.compId, [ {
				objectSource: me,
				objectSourceName: 'microsoftv8',
				eventName: 'openBubble'
			} ]);

			this.hideTooltip();
			var infowindow = this.proprietary_infowindow;

			var loc = this.proprietary_marker.getLocation();

			var pinPixel = this.map.tryLocationToPixel(loc, Microsoft.Maps.PixelReference.control);

			this.proprietary_infowindow.setContent(this.infoBubble);
			// Defect 67260 - Moves the main dialog up so that that the infoWindow can be closed
			// even when child dialogs are showing
			if(this.hasReferencedMarkers() == true)
			{
				this.proprietary_infowindow.moveUp();
			}
			this.proprietary_infowindow.show(pinPixel.x, pinPixel.y);
			var marker = this;
			var map = this.map;

			Microsoft.Maps.Events.addHandler(map, 'viewchange', function(e)
			{
				var pinPixel = marker.map.tryLocationToPixel(marker.proprietary_marker.getLocation(), Microsoft.Maps.PixelReference.control);
				infowindow.updatePosition(pinPixel.x, pinPixel.y);
			});

			this.fireMarkerEvent(this.MarkerEvents.openInfoBubble,{
				'marker': this
			});
			
			
			// Defect 88220: Whenever the maptip opens, center the map around the marker.
			// Note: The logic that automatically closes the maptip when it hits the map edges has been commented out
			// as it was affecting this logic that recenters the map.
			var options = {
				zoom: map.getZoom(),
				center: loc
			};
			map.setView(options);

			
			this.inherited(arguments);
		}
	},

	/**
	 * Hide the marker's bubble (Microsoft.Maps.Infobox).
	 */
	closeBubble: function()
	{
		if (this.hasOwnProperty('proprietary_infowindow'))
		{
			this.proprietary_infowindow.close();
			this.fireMarkerEvent(this.MarkerEvents.closeInfoBubble,{
				'marker': this
			});
		}
		this.inherited(arguments);
	},

	/**
	 * Hide the marker (Microsoft.Maps.Pushpin).
	 */
	hide: function()
	{
		var pin = this.proprietary_marker;
		pin.setOptions({
			visible: false
		});
		this.hideTooltip();
	},

	/**
	 * Shows the marker (Microsoft.Maps.Pushpin).
	 */
	show: function()
	{
		var pin = this.proprietary_marker;
		pin.setOptions({
			visible: true
		});
	}

	
});

});

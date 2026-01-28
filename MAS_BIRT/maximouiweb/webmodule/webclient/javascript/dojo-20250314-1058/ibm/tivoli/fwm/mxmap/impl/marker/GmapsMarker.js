// wrapped by build app
define("ibm/tivoli/fwm/mxmap/impl/marker/GmapsMarker", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Marker"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.impl.marker.GmapsMarker");

//This variable is always increased so that the last marker added is always on top
ibm.tivoli.fwm.mxmap.impl.marker.markerZIndex = 1000;
ibm.tivoli.fwm.mxmap.impl.marker.getNextMarkerZIndex = function()
{
	return ibm.tivoli.fwm.mxmap.impl.marker.markerZIndex++;
};

/**
 * Marker
 */
dojo.declare("ibm.tivoli.fwm.mxmap.impl.marker.GmapsMarker", ibm.tivoli.fwm.mxmap._Marker, {
	
	toProprietary: function()
	{

		var options = {};

		// do we have an Anchor?
		var ax = 0; // anchor x
		var ay = 0; // anchor y

		if (this.iconAnchor)
		{
			ax = this.iconAnchor[0];
			ay = this.iconAnchor[1];
		}
		if (!this.iconSize)
		{
			this.iconSize = [ 32, 32 ];
		}
		
		// Defect 67228 - The "overlay" logic is a very ugly workaround that was implemented as a solution
		// to a problem in the positioning of label text.
		// However, markers drawn as "overlay" take precedence (position: absolute) over all other markers
		// which would break the multimarker logic (that draws multimarkers last expecting them to be on top) if multimarkers weren't also drawn as "overlay".
		// So the initial solution was to always draw markers as "overlay". The problem with this solution is that the overlay logic has so many
		// hardcoded positioning numbers that, if a marker has different dimensions and different anchor point than those of regular
		// markers (size [47, 36] anchor [24, 36]) then the positioning of such marker (if drawn as "overlay") will be wrong.
		// So, the solution to the "duplicated My Location marker" is to only apply the "overlay" logic to markers that are expected
		// to be part of a multimarker group. Those who are not will have an extra property in the markerdata: dontDrawAsOverlay.
		// This is still very ugly, but it is not uglier than the current implementation...
		var drawMarkerAsOverlay = (this.attributes['dontDrawAsOverlay'] != true);
		
		var gAnchorPoint = new google.maps.Point(ax, ay);
		if (this.iconUrl)
		{
			// Defect 67228 - See the whole explanation in the beginning of this method
//			if (this.labelText != null && this.labelText.length > 0)
//			{
			if (drawMarkerAsOverlay == true)
			{
				// IV96441: GOOGLE MAPS NOT SHOWING ALL WORKORDERS
				// Transparent markers should not be draggable
			    this.draggable = false;
			    
				// If there's a label, overwrite the default icon with a
				// transparent one, because the real one will be in the
				// overlay
				
				// IV96441: GOOGLE MAPS NOT SHOWING ALL WORKORDERS
				// Use correct path to transparent.png; do not hard code
				// Replaced hard-coded path "../webclient/javascript/ibm/tivoli/fwm/mxmap/resources/transparent.png"
				var rtlDir = "";
				if(document.body.dir == "rtl")
				{
					rtlDir = "/rtl";
				}
				options.icon = new google.maps.MarkerImage(dojo.moduleUrl("ibm.tivoli.fwm.mxmap", "resources") + rtlDir + "/transparent.png", new google.maps.Size(this.iconSize[0], this.iconSize[1]),
						new google.maps.Point(0, 0), gAnchorPoint);
			}
			else
			{
				options.icon = new google.maps.MarkerImage(this.iconUrl, new google.maps.Size(this.iconSize[0], this.iconSize[1]), new google.maps.Point(0, 0), gAnchorPoint);
			}

			// do we have a Shadow?
			if (this.iconShadowUrl)
			{
				if (this.iconShadowSize)
				{
					var x = this.iconShadowSize[0];
					var y = this.iconShadowSize[1];
					options.shadow = new google.maps.MarkerImage(this.iconShadowUrl, new google.maps.Size(x, y), new google.maps.Point(0, 0), gAnchorPoint);
				}
				else
				{
					options.shadow = new google.maps.MarkerImage(this.iconShadowUrl);
				}
			}
		}

		if (this.draggable)
		{
			options.draggable = this.draggable;
		}

		// else
		// {
		// if (this.labelText != null && this.labelText.length > 0)
		// {
		// options.title = this.labelText;
		// }
		// }
		if (this.imageMap)
		{
			options.shape = {
				coord: this.imageMap,
				type: 'poly'
			};
		}
		var latLong = this.location.toProprietary();
		options.position = latLong;
		options.map = this.map;
		// Forcing the last marker added to be always on top
		options.zIndex = ibm.tivoli.fwm.mxmap.impl.marker.getNextMarkerZIndex();

		var marker = new google.maps.Marker(options);
		
		var me = this;

		// Defect 67228 - See the whole explanation in the beginning of this method
//		if ((this.labelText != null && this.labelText.length > 0) || (this.getAttribute("isMultiMarker") == true))
//		{
		if (drawMarkerAsOverlay == true)
		{
			var overlay = new this.map.LabelMarkerOverlay(this.labelText, latLong, this.map, marker, this.iconUrl, this.iconAnchor, this.iconSize);
			this._labelOverlay = overlay;
		}

		if (this.infoBubble)
		{
			var event_action = "click";
			if (this.hover)
			{
				event_action = "mouseover";
			}
			google.maps.event.addListener(marker, event_action, function()
			{
				marker.mxmapMarker.closeBubble();
				marker.mxmapMarker.openBubble();
			});
		}
		if (this.tooltip && this.tooltip.length > 0)
		{
			google.maps.event.addListener(marker, "mouseover", function(a)
			{
				var map = marker.map;
				var scale = Math.pow(2, map.getZoom());
				var nw = new google.maps.LatLng(map.getBounds().getNorthEast().lat(), map.getBounds().getSouthWest().lng());
				var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
				var worldCoordinate = map.getProjection().fromLatLngToPoint(marker.getPosition());
				var pixelOffset = new google.maps.Point(Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale), Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale));

				marker.mxmapMarker.showTooltip(pixelOffset, map.getDiv());

			});
			google.maps.event.addListener(marker, "mouseout", function()
			{
				marker.mxmapMarker.hideTooltip();
			});
		}
		if (this.hoverIconUrl)
		{
			var gSize = new google.maps.Size(this.iconSize[0], this.iconSize[1]);
			var zerozero = new google.maps.Point(0, 0);
			var hIcon = new google.maps.MarkerImage(this.hoverIconUrl, gSize, zerozero, gAnchorPoint);
			var Icon = new google.maps.MarkerImage(this.iconUrl, gSize, zerozero, gAnchorPoint);
			google.maps.event.addListener(marker, "mouseover", function()
			{
				marker.setIcon(hIcon);
			});
			google.maps.event.addListener(marker, "mouseout", function()
			{
				marker.setIcon(Icon);
			});
		}
		
		if (this.draggable)
		{
			google.maps.event.addListener(marker, 'dragstart', function(arg)
			{
				marker.mxmapMarker.hideTooltip();
				// Passing in the marker (not the proprietaty one) as objectSource
				// Defect 66864: The map id was wrong, it was undefined and the marker auto refresh was broken.
				// This happened during mapstraction removal
				dojo.publish("startedUserInteractionOnMap_" + me.compId, [ {
					objectSource: me,
					objectSourceName: 'googlev3',
					eventName: 'dragstart'
				} ]);
				
				me.fireMarkerEvent(me.MarkerEvents.dragstart, {
					marker: me,
					newLocation: {
						lng: arg.latLng.lng(),
						lat: arg.latLng.lat()
					}
				});

			});
			google.maps.event.addListener(marker, 'drag', function(arg)
			{
				me.fireMarkerEvent(me.MarkerEvents.drag,{
					marker: me,
					newLocation: {
						lng: arg.latLng.lng(),
						lat: arg.latLng.lat()
					}
				}); 
						
			});
			google.maps.event.addListener(marker, 'dragend', function(arg)
			{
				me.fireMarkerEvent(me.MarkerEvents.dragend, {
					marker: me,
					newLocation: {
						lng: arg.latLng.lng(),
						lat: arg.latLng.lat()
					}
				});
				// Passing in the marker (not the proprietaty one) as objectSource
				// Defect 66864: The map id was wrong, it was undefined and the marker auto refresh was broken.
				// This happened during mapstraction removal
				dojo.publish("endedUserInteractionOnMap_" + me.compId, [ {
					objectSource: me,
					objectSourceName: 'googlev3',
					eventName: 'dragend'
				} ]);
			});
		}
		google.maps.event.addListener(marker, 'click', function()
		{
			dojo.publish("onMarkerClicked_" + me.compId, [ {
				marker: marker.mxmapMarker
			} ]);

			me.fireMarkerEvent(me.MarkerEvents.click);
		});
		var infowindow = new google.maps.InfoWindow({
			content: this.infoBubble
		});
		this.proprietary_infowindow = infowindow;
		return marker;
	},

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
				objectSourceName: 'googlev3',
				eventName: 'openBubble'
			} ]);
			this.hideTooltip();
			var infowindow = this.proprietary_infowindow;
			infowindow.setContent(this.infoBubble);
			google.maps.event.addListenerOnce(infowindow, 'closeclick', function(closedWindow)
			{
				// Passing in the marker (not the proprietaty one) as objectSource
				// Defect 66864: The map id was wrong, it was undefined and the marker auto refresh was broken.
				// This happened during mapstraction removal
				dojo.publish("endedUserInteractionOnMap_" + me.compId, [ {
					objectSource: me,
					objectSourceName: 'googlev3',
					eventName: 'closeBubble'
				} ]);
			});
			
			this.fireMarkerEvent(this.MarkerEvents.openInfoBubble,{
				'marker': this
			});

			// Save
			// so we
			// can
			// close
			// it later
			infowindow.open(this.map, this.proprietary_marker);
			this.inherited(arguments);
		}
	},

	closeBubble: function()
	{
		if (this.hasOwnProperty('proprietary_infowindow'))
		{
			this.proprietary_infowindow.close();
		}
		this.inherited(arguments);
	},

	hide: function()
	{
		this.hideTooltip();

		this.proprietary_marker.setOptions({
			visible: false
		});
	},

	remove: function()
	{
		this.hideTooltip();
		this.proprietary_marker.setMap(null);
		try
		{
			if (this._labelOverlay != null)
			{
				this._labelOverlay.setMap(null);
				this._labelOverlay = null;
			}
		}
		catch (e)
		{
			console.warn("[GMapsMarker.remove()]", e);
		}
	},

	show: function()
	{
		this.proprietary_marker.setOptions({
			visible: true
		});
		if (this._labelOverlay != null)
		{
			this._labelOverlay.onAdd();
		}
	},
	
	_sendCloseBubbleEventIfNecessary: function()
	{
		dojo.publish("endedUserInteractionOnMap_" + this.compId, [ {
			objectSource: this,
			objectSourceName: 'googlev3',
			eventName: 'closeBubble'
		} ]);
	}
});

});

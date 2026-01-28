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

dojo.require("ibm.tivoli.fwm.mxmap._Geocoder");
dojo.provide("ibm.tivoli.fwm.mxmap.impl.geocoder.BingGeocoder");

//This variable is always increased so that there can be multiple parallel requests
//to dojo.io.script.get without overwriting the callback function 
ibm.tivoli.fwm.mxmap.impl.geocoder.geocoderCallbackId = 0;
ibm.tivoli.fwm.mxmap.impl.geocoder.getGeocoderCallbackId = function()
{
	return ibm.tivoli.fwm.mxmap.impl.geocoder.geocoderCallbackId++;
};

/**
 * BingGeocoder
 */
dojo.declare("ibm.tivoli.fwm.mxmap.impl.geocoder.BingGeocoder", ibm.tivoli.fwm.mxmap._Geocoder, {
	callbackFctName: null,
	geocodeURL: null,
	_init : function() {
		var me = this;		
		//  There's no native bing location api, just a REST interface. That's why we
		//  set an empty object into the this.geocoder.
		this.geocoder = {};
	
		this.callbackFctName = "bingGeocodeCallback" + ibm.tivoli.fwm.mxmap.impl.geocoder.getGeocoderCallbackId();
		
		this.geocodeURL = this.optParams.customParams.url;
		
		window[this.callbackFctName] = function(args)
		{
			me.geocode_callback(args);
			// Defect 79410: For some mysterious reason, after a "Set Record Location" or after
			// moving the marker, the "map dragging reference point" is lost if we set this
			// callback function to null
			if(!dojo.isIE)
			{
				window[this.callbackFctName] = null;
			}
		};
	},

	geocode : function(address)
	{
		var me = this;			
		if (!address.hasOwnProperty('address') || address.address === null || address.address === '') {
			// we can use this strucuted info to improve the search in the
			// future:
			// http://msdn.microsoft.com/en-us/library/ff701714.aspx
			address.address = [ address.street, address.locality, address.region, address.country ].join(', ');
		}

		if (address.hasOwnProperty('lat') && (address.hasOwnProperty('lon') || address.hasOwnProperty('lng'))) {
			var lat = address.lat;
			var lng = address.lng;
			if (!lng) {
				lng = address.lon;
			}
			
			var geocodeRequest = this.geocodeURL + "/" + lat + "," + lng + "?output=json&jsonp=" + this.callbackFctName + "&key=" + me.optParams.key;
			dojo.io.script.get({
				url : geocodeRequest,
				timeout : 13000,
				error : function(error) {
					console.error('Failed to access bing maps geocoding api',error);
					alert('Failed to access bing maps geocoding api');
				}
			});
		} else {
			var mapView="";
			
			if(me.optParams.map && me.optParams.map.getBounds()){
				
				var ne = me.optParams.map.getBounds().getNorthEast();
				var sw = me.optParams.map.getBounds().getSouthWest();
				
				mapView = "mapView="+sw.lat+","+sw.lng+","+ne.lat+","+ne.lng;
			}
			var geocodeRequest = this.geocodeURL + "/" + address.address + "?output=json&jsonp=" + this.callbackFctName + "&key=" + me.optParams.key+"&"+mapView;
			
			dojo.io.script.get({
				url : geocodeRequest,
				timeout : 13000,
				error : function(error) {
					console.error('Failed to access bing maps geocoding api',error);
					alert('Failed to access bing maps geocoding api');
				}
			});

		}
	},

	geocode_callback : function(response) {
		var me = this;			

		var isBestMatch = function(candidate){
			var confidence = candidate.confidence || "";
			var matchCodes = candidate.matchCodes[0] || "";				
			var calculationMethod = "";
			if(candidate.geocodePoints){
				calculationMethod = candidate.geocodePoints[0].calculationMethod || ""; 
			}
			return (confidence == "High" && matchCodes == "Good" && calculationMethod == "Rooftop"); 				
		};
		var convertBingToMapstraction = function(bingResult) {
			var _location = {};
			_location.formattedAddress = bingResult.address.formattedAddress;
			_location.street = bingResult.address.street;
			_location.locality = bingResult.address.locality;
			_location.region = bingResult.address.adminDistrict;
			_location.country = bingResult.address.countryRegion;
			
			_location.point = me.optParams.map.latLng(bingResult.point.coordinates[0], bingResult.point.coordinates[1]);
			return _location;
		};
		var all_locations = [];
		if (response.authenticationResultCode != "ValidCredentials") {
			// throw "Invalid credentials. Check if the Bing Maps geocode
			// api key is valid.";
			this.error_callback(response.authenticationResultCode);
			return;
		}
		if (response.statusCode == 200) {
			var results = response.resourceSets;
			for (var setId in results) {
				var set = results[setId];
				if (set.estimatedTotal == 0) {
					this.error_callback("ZERO_RESULTS");
					return;
				}
				for (var rid in set.resources) {
					var result = set.resources[rid];						
					if(isBestMatch(result) == true)
					{
						this.callback([convertBingToMapstraction(result)]);
						return;
					}
					all_locations.push(convertBingToMapstraction(result));
				}
			}
		} else {
			this.error_callback(response.statusDescription);
			return;
		}

		this.callback(all_locations);
	}
});

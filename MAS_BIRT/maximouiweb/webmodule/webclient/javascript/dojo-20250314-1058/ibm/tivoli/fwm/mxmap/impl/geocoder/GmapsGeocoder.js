// wrapped by build app
define("ibm/tivoli/fwm/mxmap/impl/geocoder/GmapsGeocoder", ["dijit","dojo","dojox","dojo/require!ibm/tivoli/fwm/mxmap/_Geocoder"], function(dijit,dojo,dojox){
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
dojo.provide("ibm.tivoli.fwm.mxmap.impl.geocoder.GmapsGeocoder");

/**
 * GmapsGeocoder
 */
dojo.declare("ibm.tivoli.fwm.mxmap.impl.geocoder.GmapsGeocoder", ibm.tivoli.fwm.mxmap._Geocoder, {
	
	_init : function() {
		this.geocoder = new google.maps.Geocoder();
	},

	geocode : function(address)
	{
		var me = this;

		if (!address.hasOwnProperty('address') || address.address === null || address.address === '') {
			address.address = [ address.street, address.locality, address.region, address.country ].join(', ');
		}
		
		if (address.hasOwnProperty('lat') && (address.hasOwnProperty('lon') || address.hasOwnProperty('lng'))) {
			// command from mxn default implementation
			var lng = (address.lng) ? address.lng : address.lon;
			var lat = address.lat;
			var latlon = new google.maps.LatLng(lat,lng);
			
			this.geocoder.geocode( {
								'latLng': latlon
							}, function(results, status)
							{
								me.geocode_callback(results, status);
							});
		} else {
			
			var params= {
					'address' : address.address						
			};
			
			if(me.optParams.map && me.optParams.map.getBounds()){
				var ne = me.optParams.map.getBounds().getNorthEast();
				var sw = me.optParams.map.getBounds().getSouthWest();
				
				var bounds = new google.maps.LatLngBounds(sw.toProprietary(),ne.toProprietary());
				params.bounds=bounds;
				
			}
			
			this.geocoder.geocode(params, function(results, status) {
				me.geocode_callback(results, status);
			});
		}
	},

	geocode_callback : function(results, status) {
		var isBestMatch = function(candidate){
			var result = false;
			if(candidate.geometry && candidate.geometry.location_type){
				var locationType = candidate.geometry.location_type;				
				result = (locationType == google.maps.GeocoderLocationType.ROOFTOP);
			}
			return result;
		};
		
		// this is Maximo team update:
		var all_locations = [];
		if (status != google.maps.GeocoderStatus.OK) {
			this.error_callback(status);
		} else {
			for ( var rid in results) {
				var place = results[rid];
				var streetparts = [];
				var return_location = {
					street : '',
					locality : '',
					postcode : '',
					region : '',
					country : '',
					formatted_address : ''
				};
				return_location.formattedAddress = place.formatted_address;
				for ( var i = 0; i < place.address_components.length; i++) {
					var addressComponent = place.address_components[i];

					for ( var j = 0; j < addressComponent.types.length; j++) {
						var componentType = addressComponent.types[j];
						switch (componentType) {
						case 'country':
							return_location.country = addressComponent.long_name;
							break;
						case 'administrative_area_level_1':
							return_location.region = addressComponent.long_name;
							break;
						case 'locality':
							return_location.locality = addressComponent.long_name;
							break;
						case 'street_address':
							return_location.street = addressComponent.long_name;
							break;
						case 'postal_code':
							return_location.postcode = addressComponent.long_name;
							break;
						case 'street_number':
							streetparts.unshift(addressComponent.long_name);
							break;
						case 'route':
							streetparts.push(addressComponent.long_name);
							break;
						}
					}
				}

				if (return_location.street === '' && streetparts.length > 0) {
					return_location.street = streetparts.join(' ');
				}

				return_location.point = this.optParams.map.latLng(place.geometry.location.lat(), place.geometry.location.lng());

				if(isBestMatch(place) == true)
				{
					this.callback([return_location]);
					return;
				}					
				all_locations.push(return_location);					
			}			
			this.callback(all_locations);				
		}
	}
});

});

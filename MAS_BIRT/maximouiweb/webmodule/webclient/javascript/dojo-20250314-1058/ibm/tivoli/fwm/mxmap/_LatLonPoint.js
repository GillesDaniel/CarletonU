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


define("ibm/tivoli/fwm/mxmap/_LatLonPoint", ["dojo/_base/declare"], 
		function(declare) {
	var _LatLonPoint =  declare(null, {

		lat: null,
		lon: null,
		lng: null, // lets be lon/lng agnostic
		sr: null,

		/**
		 * LatLonPoint is a point containing a latitude and longitude with helper
		 * methods
		 * 
		 * @name mxn.LatLonPoint
		 * @constructor
		 * @param {double}
		 *            lat is the latitude
		 * @param {double}
		 *            lon (or lng) is the longitude
		 * @param {int}
		 *            sr is the spatial reference, if any
		 */
		constructor: function(params)
		{
			// TODO error if undefined?
			// if (lat == undefined) alert('undefined lat');
			// if (lon == undefined) alert('undefined lon');
			dojo.mixin(this, params);
			if(params.lon != undefined && params.lon != null)
			{
				this.lng = params.lon; // lets be lon/lng agnostic
			} else if(params.lng != undefined && params.lng != null)
			{
				this.lon = params.lng; // lets be lon/lng agnostic
			}
			// TODO: Check to see if this Invoker is needed.
			//this.invoker = new mxn.Invoker(this, 'LatLonPoint');
		},


		/**
		 * Retrieve the lat and lon values from a proprietary point.
		 * 
		 * @name mxn.LatLonPoint#fromProprietary
		 * @function
		 * @param {String}
		 *            apiId The API ID of the proprietary point.
		 * @param {Object}
		 *            point The proprietary point.
		 */
		fromProprietary: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		/**
		 * Converts the current LatLonPoint to a proprietary one for the API
		 * specified by apiId.
		 * 
		 * @name mxn.LatLonPoint#toProprietary
		 * @function
		 * @param {String}
		 *            apiId The API ID of the proprietary point.
		 * @returns A proprietary point.
		 */
		toProprietary: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		/**
		 * toString returns a string represntation of a point
		 * 
		 * @returns a string like '51.23, -0.123'
		 * @type String
		 */
		toString: function()
		{
			return this.lat + ', ' + this.lon;
		},
		isWGS84: function()
		{
			return this.sr == 4326;
		},
		/*
		 * LatLonPoint.prototype.toWGS84 = function(callback,errCallback){ //on most
		 * of the providers it's the same coordinate system try{
		 * this.invoker.go('toWGS84', arguments); }catch(e){ console.log("using
		 * default code for toWGS84"); callback(this); } };
		 */
		// LatLonPoint.prototype.fromWGS84 = function(callback,errCallback){
		// //on most of the providers it's the same coordinate system
		// try{
		// this.invoker.go('fromWGS84', arguments);
		// }catch(e){
		// console.log("using default code for fromWGS84");
		// callback(this);
		// }
		// };
		/**
		 * distance returns the distance in kilometers between two points
		 * 
		 * @param {LatLonPoint}
		 *            otherPoint The other point to measure the distance from to
		 *            this one
		 * @returns the distance between the points in kilometers
		 * @type double
		 */
		distance: function(otherPoint)
		{
			// Uses Haversine formula from http://www.movable-type.co.uk
			var rads = Math.PI / 180;
			var diffLat = (this.lat - otherPoint.lat) * rads;
			var diffLon = (this.lon - otherPoint.lon) * rads;
			var a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) + Math.cos(this.lat * rads) * Math.cos(otherPoint.lat * rads) * Math.sin(diffLon / 2) * Math.sin(diffLon / 2);
			return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 6371; // Earth's
			// mean
			// radius
			// in km
		},

		/**
		 * equals tests if this point is the same as some other one
		 * 
		 * @param {LatLonPoint}
		 *            otherPoint The other point to test with
		 * @returns true or false
		 * @type boolean
		 */
		equals: function(otherPoint)
		{
			return this.lat == otherPoint.lat && this.lon == otherPoint.lon;
		},

		/**
		 * Returns latitude conversion based on current projection
		 * 
		 * @returns {Float} conversion
		 */
		latConv: function()
		{
			return this.distance(new _LatLonPoint({lat: this.lat + 0.1, lon: this.lon})) * 10;
		},

		/**
		 * Returns longitude conversion based on current projection
		 * 
		 * @returns {Float} conversion
		 */
		lonConv: function()
		{
			return this.distance(new _LatLonPoint({lat: this.lat, lon: this.lon + 0.1})) * 10;
		}
	});
	
	return _LatLonPoint;
});

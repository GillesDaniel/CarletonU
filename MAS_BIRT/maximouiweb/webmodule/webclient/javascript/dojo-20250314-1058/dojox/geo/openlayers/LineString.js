/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

define("dojox/geo/openlayers/LineString", [
	"dojo/_base/declare",
	"./Geometry"
], function(declare, Geometry){

	return declare("dojox.geo.openlayers.LineString", Geometry, {
		// summary:
		//		The `dojox.geo.openlayers.LineString` geometry. This geometry holds an array
		//		of coordinates.

		setPoints: function(p){
			// summary:
			//		Sets the points for this geometry.
			// p: Object[]
			//		An array of {x, y} objects
			this.coordinates = p;
		},

		getPoints: function(){
			// summary:
			//		Gets the points of this geometry.
			// returns:
			//		The points of this geometry.
			return this.coordinates; // Object[]
		}

	});
});

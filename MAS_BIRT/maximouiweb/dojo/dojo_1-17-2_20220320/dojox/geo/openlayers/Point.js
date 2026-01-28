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

define([
	"dojo/_base/declare",
	"./Geometry"
], function(declare, Geometry){

	return declare("dojox.geo.openlayers.Point", Geometry, {
		// summary:
		//		A Point geometry handles description of points to be rendered in a GfxLayer

		setPoint: function(p){
			// summary:
			//		Sets the point for this geometry.
			// p: Object
			//		The point geometry expressed as a {x, y} object.
			this.coordinates = p;
		},

		getPoint: function(){
			// summary:
			//		Gets the point defining this geometry.
			// returns:
			//		The point defining this geometry.
			return this.coordinates; // Object
		}
	});
});

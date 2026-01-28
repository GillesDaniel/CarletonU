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

define(["dojo/_base/declare", "dojo/has"], 
  function(declare, has) {
	var Base = declare("dojox.charting.plot3d.Base", null, {
		constructor: function(width, height, kwArgs){
			this.width  = width;
			this.height = height;
		},
		setData: function(data){
			this.data = data ? data : [];
			return this;
		},
		getDepth: function(){
			return this.depth;
		},
		generate: function(chart, creator){
		}
	});
	if(has("dojo-bidi")){
		Base.extend({
			_checkOrientation: function(chart){
				if(chart.isMirrored){
					chart.applyMirroring(chart.view, {width: this.width, height: this.height}, {l: 0, r: 0, t: 0, b: 0});
				}			
			}			
		});
	}
	return Base;
});


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

define(["dojo", "../util/oo"],
function(dojo, oo){

//dojox.drawing.plugins._Plugin = 
return oo.declare(
	function(options){
		this._cons = [];
		dojo.mixin(this, options);
		if(this.button && this.onClick){
			this.connect(this.button, "onClick", this, "onClick")
		}
	},
	{
		// summary:
		//		Base class for plugins.
		// description:
		//		When creating a plugin, use this class as the
		//		base to ensure full functionality.

		util:null,
		keys:null,
		mouse:null,
		drawing:null,
		stencils:null,
		anchors:null,
		canvas:null,
		node:null,
		button:null,//gfx button
		type:"dojox.drawing.plugins._Plugin",
		connect: function(){
			this._cons.push(dojo.connect.apply(dojo, arguments));
		},
		disconnect: function(/*Handle|Array*/ handles){
			// summary:
			//		Removes connections based on passed
			//		handles arguments
			if(!handles){ return };
			if(!dojo.isArray(handles)){ handles=[handles]; }
			dojo.forEach(handles, dojo.disconnect, dojo);
		}
	}
);
});

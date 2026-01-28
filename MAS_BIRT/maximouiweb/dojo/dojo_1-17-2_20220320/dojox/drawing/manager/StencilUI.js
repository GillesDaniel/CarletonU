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

define(["dojo", "../util/oo"],//, "../defaults"], 
function(dojo, oo){
	var surface, surfaceNode;
	//dojox.drawing.manager.StencilUI = 
	return oo.declare(
		function(options){

			// TODO: mixin props

			surface = options.surface;
			this.canvas = options.canvas;
			
			//this.defaults = defaults.copy();
			this.mouse = options.mouse;
			this.keys = options.keys;
			this._mouseHandle = this.mouse.register(this);
			this.stencils = {};
		},
		{
			// summary:
			//		Used for handling Stencils as UI components.
			// description:
			//		Replaces manager.Stencil. Handles basic UI mouse
			//		events like onmouseover. Does not handle selections
			//		or support delete, etc.

			register: function(/*Object*/stencil){
				this.stencils[stencil.id] = stencil;
				return stencil;
			},
			onUiDown: function(/*EventObject*/obj){
				// summary:
				//		Event fired on mousedown on a stencil

				if(!this._isStencil(obj)){ return; }
				this.stencils[obj.id].onDown(obj);
			},
			onUiUp: function(/*EventObject*/obj){
				// summary:
				//		Event fired on mousedown on a stencil

				if(!this._isStencil(obj)){ return; }
				this.stencils[obj.id].onUp(obj);
			},
			onOver: function(/*EventObject*/obj){
				// summary:
				//		Event fired on mousedown on a stencil

				if(!this._isStencil(obj)){ return; }
				this.stencils[obj.id].onOver(obj);
			},
			onOut: function(/*EventObject*/obj){
				// summary:
				//		Event fired on mousedown on a stencil

				if(!this._isStencil(obj)){ return; }
				this.stencils[obj.id].onOut(obj);
			},
			_isStencil: function(/*EventObject*/obj){
				return !!obj.id && !!this.stencils[obj.id] && this.stencils[obj.id].type == "drawing.library.UI.Button";
			}
		}
	);
	
});

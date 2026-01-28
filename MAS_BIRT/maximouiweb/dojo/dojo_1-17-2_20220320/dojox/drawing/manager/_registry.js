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

define([], function(){
	var _registered = {
		tool:{},
		stencil:{},
		drawing:{},
		plugin:{},
		button:{}
	};
	
	return {
		register: function(item, type){
			if(type=="drawing"){
				_registered.drawing[item.id] = item;
			}else if(type=="tool"){
				_registered.tool[item.name] = item;
			}else if(type=="stencil"){
				_registered.stencil[item.name] = item;
			}else if(type=="plugin"){
				_registered.plugin[item.name] = item;
			}else if(type=="button"){
				_registered.button[item.toolType] = item;
			}
		},
		
		getRegistered: function(type, id){
			return id ? _registered[type][id] : _registered[type];
		}
	};
});

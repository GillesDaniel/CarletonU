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

dojo.provide("dojox.data.demos.widgets.PicasaViewList");
dojo.require("dijit._Templated");
dojo.require("dijit._Widget");
dojo.require("dojox.data.demos.widgets.PicasaView");

dojo.declare("dojox.data.demos.widgets.PicasaViewList", [dijit._Widget, dijit._Templated], {
	//Simple demo widget that is just a list of PicasaView Widgets.

	templateString: dojo.cache("dojox", "data/demos/widgets/templates/PicasaViewList.html"),

	//Attach points for reference.
	listNode: null,

	postCreate: function(){
		this.fViewWidgets = [];
	},

	clearList: function(){
		while(this.list.firstChild){
			this.list.removeChild(this.list.firstChild);
		}
		for(var i = 0; i < this.fViewWidgets.length; i++){
			this.fViewWidgets[i].destroy();
		}
		this.fViewWidgets = [];
	},

	addView: function(viewData){
		var newView  = new dojox.data.demos.widgets.PicasaView(viewData);
		this.fViewWidgets.push(newView);
		this.list.appendChild(newView.domNode);
	}
});

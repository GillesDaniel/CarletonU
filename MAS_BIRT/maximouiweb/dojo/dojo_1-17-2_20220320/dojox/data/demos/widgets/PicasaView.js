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

dojo.provide("dojox.data.demos.widgets.PicasaView");
dojo.require("dijit._Templated");
dojo.require("dijit._Widget");

dojo.declare("dojox.data.demos.widgets.PicasaView", [dijit._Widget, dijit._Templated], {
	//Simple demo widget for representing a view of a Picasa Item.

	templateString: dojo.cache("dojox", "data/demos/widgets/templates/PicasaView.html"),

	//Attach points for reference.
	titleNode: null,
	descriptionNode: null,
	imageNode: null,
	authorNode: null,

	title: "",
	author: "",
	imageUrl: "",
	iconUrl: "",

	postCreate: function(){
		this.titleNode.appendChild(document.createTextNode(this.title));
		this.authorNode.appendChild(document.createTextNode(this.author));
		this.descriptionNode.appendChild(document.createTextNode(this.description));
		var href = document.createElement("a");
		href.setAttribute("href", this.imageUrl);
		href.setAttribute("target", "_blank");
        var imageTag = document.createElement("img");
		imageTag.setAttribute("src", this.iconUrl);
		href.appendChild(imageTag);
		this.imageNode.appendChild(href);
	}
});

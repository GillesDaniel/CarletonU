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

dojo.require("dojox.mobile.app.SceneAssistant");

dojo.declare("MainAssistant", dojox.mobile.app.SceneAssistant, {
	setup: function(){
		console.log("In main assistant setup");
		
		this.controller.parse();
		
		var scenes = [
		  {
		    label: "Simple ImageView Test",
			scene: "image-view"
		  },
		  {
		    label: "Flickr ImageView Test",
			scene: "flickr-image-view"
		  },
		  {
		    label: "Browse Flickr",
			scene: "flickr-search-selection"
		  }
		];
		
		var listWidget = dijit.byId("listWidget");
		listWidget.set("items", scenes);
		
		var _this = this;
		
		dojo.connect(listWidget, "onSelect", function(data, index, rowNode){
		  _this.controller.stageController.pushScene(data.scene);
		});
  },
  
  activate: function(){
    console.log("In main assistant activate");
    
    
  }
});

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

dojo.declare("FlickrSearchSelectionAssistant", dojox.mobile.app.SceneAssistant, {
  
	setup: function(){
    
		// Instantiate widgets in the template HTML.
		this.controller.parse();
		
		var scenes = [
		  {
		    label: "Interesting Photos",
			scene: "flickr-image-view",
			type: "interesting"
		  },
		  {
		    label: "Search for Group",
			scene: "flickr-search-group",
			type: "group"
		  },
		  {
		    label: "Search for Text",
			scene: "flickr-image-thumb-view",
			type: "text"
		  },
		  {
		    label: "Search Tags",
			scene: "flickr-image-thumb-view",
			type: "tag"
		  }
		];
		
		var listWidget = dijit.byId("browseFlickrList");
		listWidget.set("items", scenes);
		
		var _this = this;
		
		dojo.connect(listWidget, "onSelect", function(data, index, rowNode){
			// Push the chosen scene, and pass in the data type, if any.
			// The serach scene uses the "type" to determine
			// what to search for
			_this.controller.stageController.pushScene(data.scene, {
				type: data.type
			});
		});
  },
  
  activate: function(){
    
    
  }
  
});

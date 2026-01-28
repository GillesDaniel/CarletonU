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

dojo.declare("ThirdAssistant", dojox.mobile.app.SceneAssistant, {
  
  setup: function(){
    console.log("In third assistant setup");
    
    // Instantiate widgets in the template HTML.
    this.controller.parse();
    
    var _this = this;
    this.connect(dijit.byId("btn3"), "onClick", function(){
      _this.controller.stageController.popScenesTo("main", "From Third Scene");
    });
    this.connect(dijit.byId("btn4"), "onClick", function(){
      _this.controller.stageController.popScene("From Third Scene");
    });
  },
  
  activate: function(data){
    console.log("In third assistant activate");
    var node = this.controller.query(".inputData")[0];
    if(data) {
      node.innerHTML = "Scene got the data: " + data;
    } else {
      node.innerHTML = "Scene did not receive data";
    }
    
  }
  
});

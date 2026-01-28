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

dojo.declare("SecondAssistant", dojox.mobile.app.SceneAssistant, {
  
  setup: function(){
    console.log("In second assistant setup");
    
    // Instantiate widgets in the template HTML.
    this.controller.parse();
    
    var _this = this;
     this.connect(dijit.byId("btn1"), "onClick", function(){
      _this.controller.stageController.popScene("Button 1");
    });
    this.connect(dijit.byId("btn2"), "onClick", function(){
      _this.controller.stageController.pushScene("third", "Came from second scene");
    });
  },
  
  activate: function(data){
    console.log("In main assistant activate");
    var node = this.controller.query(".inputData")[0];
    if(data) {
      node.innerHTML = "Scene got the data: " + data;
    } else {
      node.innerHTML = "Scene did not receive data";
    }
  }
  
});

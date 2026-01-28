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
    
    var appInfoNode = this.controller.query(".appInfoArea")[0];
    
    appInfoNode.innerHTML =
      "This app has the following info: \n"
        + dojo.toJson(dojox.mobile.app.info, true).split("\t").join("  ");
        
    // Instantiate widgets in the template HTML.
    this.controller.parse();
    
    var _this = this;
    var launcher = dijit.byId("secondSceneLauncher");
    
    console.log("launcher = " , launcher, " node = ", this.domNode);
    this.connect(launcher.domNode, "onclick", function(){
      console.log("launching the second scene");
      
      _this.controller.stageController.pushScene("second", "Came from Main Scene");
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

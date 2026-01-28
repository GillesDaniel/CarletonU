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
    
    // Instantiate widgets in the template HTML.
    this.controller.parse();
    
    var appInfoNode = this.controller.query(".appInfoArea")[0];
    
    appInfoNode.innerHTML =
      "This app has the following info: \n"
        + dojo.toJson(dojox.mobile.app.info, true);
        
    function handleChoose(value){
      appInfoNode.innerHTML = "Value selected: " + value;
      
    }
    
    
    var controller = this.controller;
    
    console.log("btn1 = ", dijit.byId("btn1"));
    
    dojo.connect(dijit.byId("btn1"), "onClick", function(){
      console.log("Clicked btn1");
      controller.showAlertDialog({
        title: "First Dialog",
        text: "This is a simple text message",
        onChoose: handleChoose,
        
        buttons: [
          {
            label: "Tap Me!",
            value: "tapped",
            "class": "mblBlueButton"
          }
        ]
      })
    });
    
    dojo.connect(dijit.byId("btn2"), "onClick", function(){
      console.log("Clicked btn2");
      controller.showAlertDialog({
        title: "Second Dialog",
        text: "These two buttons return different values, 'value one' and 'value two'",
        onChoose: handleChoose,
        
        buttons: [
          {
            label: "Im Am Button 1",
            value: "value one",
            "class": "mblBlueButton"
          },
          {
            label: "Im Am Button 2",
            value: "value two",
            "class": "mblBlueButton"
          }
        ]
      })
    });
    
  },
  
  activate: function(){
    console.log("In main assistant activate");
    
    
  }
  
});

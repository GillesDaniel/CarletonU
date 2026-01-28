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

dojo.declare("TextInputAssistant", dojox.mobile.app.SceneAssistant, {
  
  setup: function(){
    console.log("In main assistant setup");
    
    // Instantiate widgets in the template HTML.
    this.controller.parse();
    
    
  },
  
  activate: function(){
    console.log("In main assistant activate");
    
    
  }
  
});

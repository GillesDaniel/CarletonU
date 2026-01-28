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

// Include this file instead of DesignerE.js if you want to download the script only on demand
// When you will want to create and show Designers on your page, load DesignerE.js by calling the LoadDesignerE() function
// The path is url of DesignerE.js file like "../Designer/DesignerE.js".
// The path can be relative to the main page url as usual or can be absolute
// For empty path is used the path to the DesignerEOnDemand.js if exists
// Check the script path carefully, the most errors are caused because of wrong path
// The LoadDesignerE is asynchronous function, set func to be called after the script is loaded

function LoadDesignerE(path, func){
if(LoadDesignerE.Loaded!=null) return;
if(!path) { 
   var S = document.getElementsByTagName("script");
   for(var i=0;i<S.length;i++){
      if(S[i].src && S[i].src.indexOf("DesignerEOnDemand.js")>=0){
         path = S[i].src.replace("DesignerEOnDemand.js","DesignerE.js"); break;
         }
      }
   if(!path){ alert("Cannot download Designer script!\r\n\r\nThe script path is empty"); return; }
   }
try {
   var script = document.createElement("script");
   script.type = "text/javascript";
   script.src = path;
   document.documentElement.getElementsByTagName("head")[0].appendChild(script);
   LoadDesignerE.Loaded = false;
   function Finish(){
      if(window.StartDesigner) { StartDesigner(); if(func) func(); }
      else setTimeout(Finish,100);
      }
   Finish();   
   }
catch(e){
   alert("Cannot download Designer script!\r\n\r\nError message:\r\n"+(e.message ? e.message:e));
   }
}

if(!window.Designers){ 
   var Designers = new Array();
   Designers.OnDemand = true;
   }

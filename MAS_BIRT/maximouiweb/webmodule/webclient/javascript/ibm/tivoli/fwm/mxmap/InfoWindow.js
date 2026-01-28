/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2012,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */


define(["dojo/main",
        "dojo/_base/declare",
        "ibm/tivoli/fwm/mxmap/_Base",
        "dijit/_Widget",
        "dijit/_Templated",
        "dojo/parser",
        "dojo/dom-style"], function(dojo, declare, _Base, _Widget,  _Templated, parser, domStyle ) {

        // This z-index is always increased when an info window show up so that
        // the info window can always be on top of the others 
        ibm.tivoli.fwm.mxmap.infoWindowZIndex = 0;
        ibm.tivoli.fwm.mxmap.getNextInfoWindowZIndex = function()
        {
            return ibm.tivoli.fwm.mxmap.infoWindowZIndex++;
        };


        return declare([_Base, _Widget, _Templated], {
                map:null,
                isRTL:null,
                templatePath: dojo.moduleUrl("ibm.tivoli.fwm.mxmap", "templates/InfoWindow.html"),
                _display: null,
                rootElement:null,
                domNode:null,
                mapId:null,
                constructor : function(options) {
                        dojo.mixin(this,options);
                        this._display = false;
                        if(!this.isRTL){
                                this.isRTL=document.body.dir=='rtl';
                        }
                },
                postCreate:function(){
                        var me = this;
                        parser.parse(this.domNode );
                        domStyle.set(this.domNode,"display","none");
                        domStyle.set(this.domNode,"position","absolute");
                        // Defect 70995 - There is no way to make the InfoWindow become scrollable in mobile browsers
                        // (or maybe there is, but I could not find out how to do that in 1 week)
                       // so the solution is to allow the maptip summary to be as huge as necessary so that no scrolling is needed,
                        // also, we cannot let the InfoWindow close when it touches the map edges.
                        // To sum up, scrolling is disabled only if this is a mobile device and the marker is a multiple marker.
                        if(this.enableScrollBars())
                        {
                                // Defect 66760 - Force the maximum height of the infoWindow to be 50% of the map width
                                // (as it seems to be like when gmaps is selected)
                                // so that a vertical scroll will show up for maptip summaries with many records.
                                // However, since IE ignores "max-" attributes (microsoft says it doesn't since IE7, but this is a big fat lie)
                                // so the solution involves forcing the height of the content div to be mapHeight / 2 in the show() method below.
                                // Not sure why spatial map does not have the getHeight method
                                var mapHeight = this.map.getHeight ? this.map.getHeight() : this.map.height;
                                domStyle.set(this.content,"maxHeight", mapHeight / 2);
                        }

                        this._display = false;
                        this.placeAt(this.rootElement);
                        domStyle.set(this.closeBtn, "background", "url(" + dojo.config.fwm.servletBase + "/javascript/ibm/tivoli/fwm/mxmap/resources/ac16_winClose.png) no-repeat");
                        // Moves the close button to the left if bidi is enabled
                        if(this.isRTL==true)
                        {
                                domStyle.set(this.closeBtn, "float", "left");
                                domStyle.set(this.closeBtn, "left", "3px");
                                domStyle.set(this.content, "marginLeft", "20px");
                                domStyle.set(this.domNode, "direction", "rtl");
                        } else {
                                domStyle.set(this.closeBtn, "float", "right");
                                domStyle.set(this.closeBtn, "right", "3px");
                                domStyle.set(this.content, "marginRight", "20px");
                                domStyle.set(this.domNode, "direction", "ltr");
                        }
                        if (dojo.isIE) {
                                if (this.content) {
                                        domStyle.set(this.content,"overflow","hidden");
                                        domStyle.set(this.content,"overflow-x","hidden");
                                }
                        }
                        dojo.connect(this.domNode, "oncontextmenu", function(evt)
                                        {
                                dojo.stopEvent(evt);
                                        });
                        // Defect 67358 - Prevent map panning when the user is interacting with the maptip
                        dojo.connect(this.domNode, "mousedown", function(evt)
                                        {
                                dojo.stopEvent(evt);
                                        });
                        dojo.connect(this.domNode, "touchstart", function(evt)
                                        {
                                dojo.stopEvent(evt);
                                        });
                        // Defect 66953: Cannot use dojoAttachEvent in the html template to attach more than one event
                        // to the same dojoAttachPoint (maybe a bug in dojo?), so the solution is to make 2 connections.
                        // The "touchend" connection is for mobile devices
                        dojo.connect(this.closeBtn, "click", function(evt)
                                        {
                                me.close();
                                        });
                        dojo.connect(this.closeBtn, "touchend", function(evt)
                                        {
                                me.close();
                                        });

                },
                updatePosition:function(x,y){ 
                        var coords ={x:0,y:0};// dojo.position(this.rootElement,true);          
                        var px = x+coords.x+this.offset.x;
                        var py = y+coords.y+this.offset.y;
                        domStyle.set(this.domNode,"left",px + "px");
                        domStyle.set(this.domNode,"top",py + "px");

                        // Commenting out this code that closes the maptip whenever it hits the map edges per Lisa's request.
                        // The code below gets in the way of the logic that automatically centers the map around the marker
                        // when its maptip opens (defect 88220). If this change brings back the issue where the maptip overlaps
                        // other maximo UI components, then it should be rolled back.
//                      if(this.isDisplayed() && this.enableScrollBars()){
//                      if(parseInt(px)<0 || parseInt(py)<0 || parseInt(domStyle.set(this.domNode, "right"))<0 || parseInt(domStyle.set(this.domNode, "bottom"))<0){
//                      this.close();
//                      }
//                      }
                },
                isDisplayed:function(){
                        return (this._display == true);
                },
                setContent:function(content){
                        if(typeof(content) == 'object'){
                                this.setDomContent(content);
                        }else{
                                dojo.empty(this.content);
                                dojo.create("div",{innerHTML:content},this.content);
                        }
                },
                setDomContent:function(domToAppend){
                        dojo.place(domToAppend, this.content, "only");
                },
                close:function(){ 
                        domStyle.set(this.domNode,"display",'none');
                        this._display = false;
                        dojo.publish("endedUserInteractionOnMap_"+this.mapId, [ {
                                objectSource: this,
                                objectSourceName: 'infowindow',
                                eventName: 'closeBubble'
                        } ]);
                },
                offset:{
                        y:-15,
                        x:0
                },
                show:function(x,y){

                        var coords ={x:0,y:0};// dojo.position(this.rootElement,true);          

                        var px = x+coords.x+this.offset.x;
                        var py = y+coords.y+this.offset.y;

                        domStyle.set(this.domNode,"top",py + "px");
                        domStyle.set(this.domNode,"left",px + "px");
                        domStyle.set(this.domNode,"display",'block');
                        domStyle.set(this.domNode,"zIndex",ibm.tivoli.fwm.mxmap.getNextInfoWindowZIndex());
                        this._display = true;

                        // Very ugly workaround for IE because it does not support maxHeight. Besides,
                        // it is impossible to retrieve the actual height of the content div by reading the 'height'
                        // style property... it only works by reading the offsetHeight property directly from the div
                        if(dojo.isIE)
                        {
                                var mapHeight = this.map.getHeight ? this.map.getHeight() : this.map.height;
                                var maxInfoWindowHeight = mapHeight/2;
                                if(this.content.offsetHeight > maxInfoWindowHeight)
                                {
//                                      domStyle.set(this.content,"overflow", "auto");
                                        domStyle.set(this.content,"height", maxInfoWindowHeight + "px");
                                }
                        }
                },
                // Defect 67260 - Moves the main dialog up so that that the infoWindow can be closed
                // even when child dialogs are showing
                moveUp: function()
                {
                        domStyle.set(this.mainDialog, "marginTop", "-40px");
                },
                // Defect 70995 - There is no way to make the InfoWindow become scrollable in mobile browsers
                // (or maybe there is, but I could not find out how to do that in 1 week)
                // so the solution is to allow the maptip summary to be as huge as necessary so that no scrolling is needed,
                // also, we cannot let the InfoWindow close when it touches the map edges.
                // To sum up, scrolling is disabled only if this is a mobile device and the marker is a multiple marker.
                enableScrollBars: function()
                {
                        return (this.isMobile != true);
                }
        });
});

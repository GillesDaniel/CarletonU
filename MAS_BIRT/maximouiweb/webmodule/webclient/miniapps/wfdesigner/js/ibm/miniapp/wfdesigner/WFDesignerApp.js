/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2018,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

define([
	"dojo/_base/lang",
	"dojo/_base/declare",
    "com/ibm/tivoli/maximo/miniapps/_MiniApp",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
    "com/ibm/tivoli/maximo/miniapps/Handlers",
    "dojo/topic"

], function(lang, declare, _MiniApp, log, Handlers, topic){
   	var boxCount = 0;
   	var offset = WFPIXELS; //Should match value in WFDesignerMiniAppBean
   	var addStarted = false;
   	var lineStarted = false;
   	showProperties=function(item){
		if(saveButton){
			setButtonEnabled(saveButton, true);
		}
		var targetId = item.Parent.Item.D.MainTag.parentElement.parentElement.id;
		if(item.Parent.Item.Kind=="Box"){
			var values = {"node_row": item.Parent.Item.node_row, "targetid": targetId};
			sendXHREvent("properties", "nodes_table", values, REQUESTTYPE_SYNC, "xml", "text/xml", processXHR, null);			
		}
		else if(item.Parent.Item.Kind=="Line"){
			var values = {"node_row": item.Parent.Item.D.Boxes[item.Parent.Item.From].node_row, "action_row": item.Parent.Item.action_row,"targetid": targetId};
			sendXHREvent("properties", "actions_table", values, REQUESTTYPE_SYNC, "xml", "text/xml", processXHR, null);			
		}
		return true;
	};
        
   	
    return declare([_MiniApp, Handlers], {
    	constructor: function(options) {
            this.TAG=options.TAG;

    		if (options.loglevel) {
    			log.LOG_LEVEL=options.loglevel;
    		}
    		
    		log.debug("{} DOM Node and options", this.TAG, this.domNode, options);
    	},
    	
        startup: function() {
        	this.inherited(arguments);

        	log.debug("{} startup called", this.TAG);

            // dynamically load the designer library and call createUI once the library is loaded
            function checkDesigner() {
                return window.Designer!=null;
            }
            this.loadLibrary(checkDesigner, this.rootUrl + "/libraries/designer/DesignerE.js" , lang.hitch(this, this.createUI));
        },
        
		createUI: function() {
			// find our actual dom node
			var parent = document.getElementById(this.domid);
			parent.appendChild(document.createElement("hr"));

			// create the ids for the toolbar and designer
			this.mainGridId = this.domid+"_mainGrid";
			this.toolbarId = this.domid+"_toolbar";
			this.dwrapperId = this.domid+"_dwrapper";
			this.designerId = this.domid+"_designer";

			this.toolbarTable = document.createElement("table");
			this.toolbarTable.setAttribute("role","presentation");
			this.toolbarTR = document.createElement("tr");
			this.toolbarTD1 = document.createElement("td");
			this.toolbarTD2 = document.createElement("td");
			this.buttonDiv = document.createElement("div");
			this.buttonDiv.style.height="40px";
			this.buttonDiv.style.verticalAlign="top";
			this.fullSpan = document.createElement("span");
			this.fullSpan.setAttribute("onclick", "Designers[1].SetZoom(1)");
			this.fullSpan.style.width="25%";
			this.fullSpan.setAttribute("role","button");
			this.fullSpanImg = document.createElement("img");
			this.fullSpanImg.setAttribute("src","ac22_zoomToActualSize.png");
			this.fullSpanImg.setAttribute("id","zoomToActualImg");
			this.fullSpanImg.setAttribute("title", ""); //this needs to be loaded later from localized WFText
			this.fullSpanImg.setAttribute("alt", ""); //this needs to be loaded later from localized WFText
			this.fullSpan.appendChild(this.fullSpanImg);
			this.buttonDiv.appendChild(this.fullSpan);
			
			this.plusSpan = document.createElement("span");
			this.plusSpan.setAttribute("onclick", "Designers[1].SetZoom(Designers[1].Zoom*1.1)");
			this.plusSpan.style.width="25%";
			this.plusSpan.setAttribute("role","button");
			this.plusSpanImg = document.createElement("img");
			this.plusSpanImg.setAttribute("src","ac22_zoomin.png");
			this.plusSpanImg.setAttribute("id","zoomInImg");
			this.plusSpanImg.setAttribute("title", "");
			this.plusSpanImg.setAttribute("alt", "");
			this.plusSpan.appendChild(this.plusSpanImg);
			this.buttonDiv.appendChild(this.plusSpan);
			
			this.minusSpan = document.createElement("span");
			this.minusSpan.setAttribute("onclick", "Designers[1].SetZoom(Designers[1].Zoom*0.9)");
			this.minusSpan.style.width="25%";
			this.minusSpan.setAttribute("role","button");
			this.minusSpanImg = document.createElement("img");
			this.minusSpanImg.setAttribute("src","ac22_zoomout.png");
			this.minusSpanImg.setAttribute("id","zoomOutImg");
			this.minusSpanImg.setAttribute("title", "");
			this.minusSpanImg.setAttribute("alt", "");
			this.minusSpan.appendChild(this.minusSpanImg);
			
			this.buttonDiv.appendChild(this.minusSpan);

			// create the main grid that will hold the toolbar and wf designer
			this.mainGridDiv = document.createElement("div");
			this.mainGridDiv.setAttribute("id", this.mainGridId);
			parent.appendChild(this.mainGridDiv);
			parent.setAttribute("dir","ltr");
			
			// create the toolbar, and set the size, etc
			this.toolbarDiv = document.createElement("div");
			this.toolbarDiv.setAttribute("id", this.toolbarId);
			this.toolbarDiv.style.borderLeft="1px solid #b3b3b3";
			this.toolbarTD1.appendChild(this.buttonDiv);
			this.toolbarTD2.appendChild(this.toolbarDiv);
			this.toolbarTR.appendChild(this.toolbarTD1);
			this.toolbarTR.appendChild(this.toolbarTD2);
			this.toolbarTable.appendChild(this.toolbarTR);
			this.mainGridDiv.appendChild(this.toolbarTable);
			
			this.mainGridDiv.appendChild(document.createElement("hr"));

			/* create wrapper div for designer div */
			this.wrapperDiv = document.createElement("div");
			this.wrapperDiv.setAttribute("id", this.dwrapperId);
			this.wrapperDiv.style.position="relative";
			
			/* create the designer div*/
			this.designerDiv = document.createElement("div");
			this.designerDiv.setAttribute("id", this.designerId);
			this.designerDiv.style.overflow="hidden";
			this.designerDiv.style.position="absolute";
			this.designerDiv.style.borderRight="none";
			
			this.wrapperDiv.appendChild(this.designerDiv);
			this.mainGridDiv.appendChild(this.wrapperDiv);
			
			// So, now, you can create a createUIToolbar and createUIDesigner methods and just call them passing the respective id...
			this.createUIToolbar(this.toolbarId);
			this.createUIDesigner(this.designerId);
			        
            // hide the progress... (set progressindicator="false" on the <miniapp> element if you don't want progress at all
            topic.publish('miniapp.hideprogress', this.domid);
		},
        
      	createUIToolbar: function(id) {
            // Each Toolbar Intance needs a unique ID in the Browser's Page lifetime.
            // this just sets a random ID for the toolbar
            this.toolbarUniqueId = id +"_"+ new Date().getTime();
			
			//ADD EVENTS
			TDSetEvent ("OnRendered", this.toolbarUniqueId, lang.hitch(this, this.OnToolbarRendered));
            TDSetEvent ("OnStartDragBox", this.toolbarUniqueId, lang.hitch(this, this.OnStartDragBox));
            TDSetEvent ("OnLoaded", this.toolbarUniqueId, lang.hitch(this, this.OnToolBarLoaded));

			var options = {
				Layout: {
					Url: this.baseUrl + '/Def4.xml'
				},
				Base: {
					Url: this.baseUrl + '/Shapes.xml'
				},
				Boxes: {
					Url: this.baseUrl + '/WFBoxes.xml'
				},
				Text: {
					Url: this.toUrl("async_load_wfdesigner_string_data", {value: null, project: null}),
					Cache: 3
				},
				Data: {
					Url: this.baseUrl + '/wftoolbar.xml'
				}
			};

            this.toolbar = Designer(options, id, this.toolbarUniqueId);
            log.debug("TOOLBAR: ", this.toolbar);
		},
      	  
        createUIDesigner: function(id) {
            // Each Designer Intance needs a unique ID in the Browser's Page lifetime.
            // this just sets a random ID for the designer
            this.designerUniqueId = id +"_"+ new Date().getTime();

            // ADD EVENTS...
            TDSetEvent ("OnBoxMove", this.designerUniqueId, lang.hitch(this, this.OnBoxMove));
            TDSetEvent ("OnBoxAdded", this.designerUniqueId, lang.hitch(this, this.OnBoxAdded));
            TDSetEvent ("OnBoxDeleted", this.designerUniqueId, lang.hitch(this, this.OnBoxDeleted));
            TDSetEvent ("OnEndDragBox", this.designerUniqueId, lang.hitch(this, this.OnEndDragBox));
            TDSetEvent ("OnLineAdd", this.designerUniqueId, lang.hitch(this, this.OnLineAdd));
            TDSetEvent ("OnLineDeleted", this.designerUniqueId, lang.hitch(this, this.OnLineDeleted));
            TDSetEvent ("OnEndDragLine", this.designerUniqueId, lang.hitch(this, this.OnEndDragLine));
            TDSetEvent ("OnDblClick", this.designerUniqueId, lang.hitch(this, this.OnDblClick));
			TDSetEvent ("OnRendered", this.designerUniqueId, lang.hitch(this, this.OnRendered));
			TDSetEvent ("OnMenu", this.designerUniqueId, lang.hitch(this, this.OnMenu));                                

            // listen for prop change requests
            this.subscribeOn('wf.designer.propchange', lang.hitch(this, this.onPropChange));
            
            // listen for errors displayed, back out those changes
			this.subscribeOn('wf.designer.refresh', lang.hitch(this, this.onRefreshRequested));
			
			var values = {"nodedatasrc": "nodes_table",
				"actiondatasrc": "actions_table"};
					
			var options = {
				Layout: {
					Url: this.baseUrl + '/Def4.xml'
				},
				Base: {
					Url: this.baseUrl + '/Shapes.xml'
				},
				Boxes: {
					Url: this.baseUrl + '/WFBoxes.xml'
				},
				Lines: {
					Url: this.baseUrl + '/WFLines.xml'
				},
				Text: {
					Url: this.toUrl("async_load_wfdesigner_string_data", {value: null, project: null}),
					Cache: 3
				},
				Data: {
					Url: this.toUrl("async_load_wfdesigner_xml_data", {value: values, project: null})
				}
			};

			this.designer = Designer(options, id, this.designerUniqueId);

			log.debug("DESIGNER: ", this.designer);
		},

		OnToolbarRendered: function (/*TDesigner*/ designer) {
			log.debug("Toolbar is Rendered, adjust zoom.");

			// to make to sure it is set
			this.toolbar=designer;
			this.toolbar.SetZoom(.75)
		},

		OnMenu: function (/*TDesigner*/ designer, /*object*/ item, /*TMenu*/ menu) {
		
			if(item.Def && item.Def.indexOf("ShapeStart") >= 0){ //no properties or delete allowed on start box, so no context menu
				return true;
			}
			else{ 							// if its the designer canvas clicked, don't show menu
				return item.Kind=="Object"; // will be "Box" or "Line" or "Object" (for designer)
			}
		},
		
		OnToolBarLoaded: function (/*TDesigner*/ designer, next) {
			console.log(this.toolbar.Lang.Text);
			//this.toolbarTD1.firstChild.childNodes[1].firstChild
			var idx = 0;
            while(idx < this.toolbarTD1.firstChild.childNodes.length){
            	//var srcName = this.toolbarTD1.firstChild.childNodes[idx].firstChild.src;
            	var elId = this.toolbarTD1.firstChild.childNodes[idx].firstChild.id;
            	if(elId == "zoomToActualImg"){
            		this.toolbarTD1.firstChild.childNodes[idx].firstChild.title=this.toolbar.Lang.Text['ZoomActual']
            		this.toolbarTD1.firstChild.childNodes[idx].firstChild.alt=this.toolbar.Lang.Text['ZoomActual']
            	}
            	else if(elId == "zoomInImg"){
            		this.toolbarTD1.firstChild.childNodes[idx].firstChild.title=this.toolbar.Lang.Text['ZoomIn']
            		this.toolbarTD1.firstChild.childNodes[idx].firstChild.alt=this.toolbar.Lang.Text['ZoomIn']
            	}
            	else if(elId == "zoomOutImg"){
            		this.toolbarTD1.firstChild.childNodes[idx].firstChild.title=this.toolbar.Lang.Text['ZoomOut']
            		this.toolbarTD1.firstChild.childNodes[idx].firstChild.alt=this.toolbar.Lang.Text['ZoomOut']
            	}
            	idx++;
           }
		},
		
		OnRendered: function (/*TDesigner*/ designer) {
			log.debug("Designer is Rendered, Updating state.");

			// to make to sure it is set
			this.designer=designer;
			//this.designer.SetZoom(1);  sets to full size
			this.designer.ZoomFit();  //set to fit it all

			//Determine the count of nodes so we know where to start when adding
			var canvas = document.getElementById("wfdesigner_miniapp_designer");
			var boxes = canvas.getElementsByClassName("Box");
			var lines = canvas.getElementsByClassName("Line");
			boxCount = boxes.length;
			log.debug("Designer: Boxes: {}, Lines: {}", boxCount, lines.length);
		},

	    OnLineAdd: function(/*TDesigner*/ designer, /*TLine*/ line) {
			if(saveButton){
				setButtonEnabled(saveButton, true);
			}			
			lineStarted = true;
            log.debug("LINE MOVED: ", line);
        },

        OnLineDeleted: function(/*TDesigner*/ designer, /*TLine*/ line) {
			if(saveButton){
				setButtonEnabled(saveButton, true);
			}
			var values = {"action_row": line.action_row,
				"node_row": line.D.Boxes[line.From].node_row};
			sendXHREvent("deleteaction", this.domid, values, REQUESTTYPE_SYNC, "xml", "text/xml", processXHR, null);
            log.debug("LINE DELETED: ", line);
        },

		OnEndDragLine: function(/*TDesigner*/ designer, /*TLine*/ line){
			if(lineStarted){
				var values = {"action_positive": line.Color!="#F00",
					"owner_node_id": (typeof line.From == "string")?parseInt(line.From.replace(/[.,\s]/g, "")):line.From,
					"member_node_id": (typeof line.To == "string")?parseInt(line.To.replace(/[.,\s]/g, "")):line.To,
					"node_row": line.F.node_row};
				line.action_row=this.getActionRow(line);
				sendXHREvent("addaction", this.domid, values, REQUESTTYPE_SYNC, "xml", "text/xml", processXHR, null);
			}
			log.debug("LINE ADDED: ", line);
		},
		
        OnStartDragBox: function(designer, box, selected, copy){
        	addStarted = true;
         	console.log("about to drag a new box");
         	return [0,1];
        },
        
		OnEndDragBox: function(designer, box, dest, selected, copy, dx, dy, deleted){
			if(addStarted){ //then this drag is an add, so do NOT do the move processing
				addStarted = false;
			}
			else{
				if(saveButton){
					setButtonEnabled(saveButton, true);
				}
				var valX = Math.round((parseInt(box.X,10))/offset);
				var valY = Math.round((parseInt(box.Y,10))/offset);
				var values = 
					{"node_x": valX.toString(),
					"node_y": valY.toString(),
					"node_row": box.node_row};
				sendXHREvent("movenode", this.domid, values, REQUESTTYPE_SYNC, "xml", "text/xml", processXHR, null);
	            log.debug("MOVED TO: x: {}, y: {}", box.X, box.Y, box);
			}
			// IJ42468 - Fixes issue where focus causing scrolling to the top of the canvas when moving a node. This code will scroll back to
			// the node position.
		    let scrollElement = document.getElementById('SystemNavAppContent-sc_div').firstElementChild;
		    let scrollPoint = {x: scrollElement.scrollLeft, y:scrollElement.scrollTop};
		    let fixScroll = ()=>{
		      scrollElement.scrollTo(scrollPoint.x,scrollPoint.y);
		      scrollElement.removeEventListener('scroll',fixScroll);
		    }
		    scrollElement.addEventListener('scroll',fixScroll);
		    window.setTimeout(()=>{
		      fixScroll();
		    },300);
		    stopFocus = true;
		},
 
        OnBoxAdded: function(/*TDesigner*/ designer, /*TBox*/ box) {
			if(saveButton){
				setButtonEnabled(saveButton, true);
			}
			var valX = Math.round((parseInt(box.X,10))/offset);
			var valY = Math.round((parseInt(box.Y,10))/offset);
			var values = {
				"node_x": valX.toString(),
				"node_y": valY.toString(),
				"node_type": box.Text};
			box.node_row=boxCount;
			boxCount++;
			sendXHREvent("addnode", this.domid, values, REQUESTTYPE_SYNC, "xml", "text/xml", processXHR, null);
            log.debug("BOX ADDED: ", box);
        },

        OnDblClick: function(/*TDesigner*/ designer, /*Object*/ item, /*Event*/ event) {
			if(saveButton){
				setButtonEnabled(saveButton, true);
			}
			designer.Selected=item;
			if(item.Kind=="Box"){
				var values;
				values = {"node_row": item.Item.node_row, "targetid": this.domid};
				sendXHREvent("properties", "nodes_table", values, REQUESTTYPE_SYNC, "xml", "text/xml", processXHR, null);			
			}
			else if(item.Kind=="Line"){
				var values;
				values = {"node_row": item.Item.D.Boxes[item.Item.From].node_row, "action_row": item.Item.action_row, "targetid": this.domid};
				sendXHREvent("properties", "actions_table", values, REQUESTTYPE_SYNC, "xml", "text/xml", processXHR, null);			
			}
			
            log.debug("DOUBLE CLICK: ", item);
            return true;
        },

        OnBoxDeleted: function(/*TDesigner*/ designer, /*TBox*/ box) {
			if(saveButton){
				setButtonEnabled(saveButton, true);
			}
			sendXHREvent("deletenode", this.domid, box.node_row, REQUESTTYPE_SYNC, "xml", "text/xml", processXHR, null);
            log.debug("BOX DELETED: ", box);
        },

        OnBoxMove: function(/*TDesigner*/ designer, /*TBox*/ box, /*int*/ dx, /*int*/ dy) {
			addStarted = false;
        },

		/**
		 * Called by the MiniAppControl jsp when a refresh is requested
		 */
        onRefreshRequested: function() {
			this.designer.Reload();
        },

		/**
		 * Called by the MiniAppControl jsp when a property changes on the server
		 */
        onPropChange: function(evtName, evtData) {
        	var json = JSON.parse(evtName);
        	var text = json.title;
        	var id = json.id;
        	if(this.designer.Selected.Kind=="Box"){
	        	this.designer.Boxes[id].Text = text;
        		this.designer.RefreshItem(this.designer.Boxes[id]);
        	}
        	else if(this.designer.Selected.Kind=="Line"){
	        	this.designer.Lines[id].Text = text;
        		this.designer.RefreshItem(this.designer.Lines[id]);
        	}
        },

		clearDesigners: function(){
			console.log(Designers);
		},
		
		getActionRow: function(line) {
		
			var actionRow = 0;
			var idx = 0;
            while(idx < line.F.Lines.length){
            	if(line.F.Lines[idx].From == line.From) {
            		//if line.action_row doesn't already exist, then it shouldn't be counted as this is the new one
            		if(line.F.Lines[idx].action_row != null){
	            		actionRow++;
	            	}
            	}
            	idx++;
            }
            return actionRow;
		},
		
        /**
         * Destroy is called by the framework.
         */
        destroy: function () {
            // Once COQSoft implements the Dispose this will free up memory, etc.
            if (this.designer && this.designer.Dispose) {
                log.debug('Cleaning up Designer {}', this.designerId);
                try {
                    this.designer.Dispose();
                } catch (ex) {
                    log.warn('Designer clean up encountered an error {}', this.designerId, ex);
                }
            }
            if (this.toolbar && this.toolbar.Dispose) {
                log.debug('Cleaning up Designer Toolbar {}', this.toolbarId);
                try {
                    this.toolbar.Dispose();
                } catch (ex) {
                    log.warn('Designer clean up encountered an error {}', this.toolbarId, ex);
                }
            }
            //Need to remove null entries in Designers array or it causes problems on my zoom buttons.
            while(Designers.length>0){
            	var idx = length-1;
            	if(Designers[idx] == null){
            		Designers.splice(idx,1);
            	}
            }
            this.inherited(arguments);
        }
    });
});

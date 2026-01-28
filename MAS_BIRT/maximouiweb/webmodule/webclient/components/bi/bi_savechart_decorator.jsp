<%--
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
--%>

<%@ include file="../../common/simpleheader.jsp"%>
<%
	if(designmode) {
%>

<%	
	} else {
		if (component.needsRender()) {
%>
<script>
require([JAVASCRIPT_BASE + '../html2canvas-0.4.0.js']); // javascript base is DOJO base
require(["dijit/Menu", "dijit/MenuItem", "dojo/query", 
"dojox/gfx", "dojox/gfx/utils", "dijit/registry", "dojo/dom-geometry", "dojo/dom-attr", 
"dojo/has", "dojo/_base/sniff", 'dojo/_base/json', "dojo/io-query"
], 
function(Menu, MenuItem, query, gfx, gfxutils, registry, geom, attr, has, sniff, json, urlquery) {
	// find first svq node
	function svgEl(el) {
		var els = el.getElementsByTagName('svg');
		if (els||els.length>0) return els[0];
		return null;
	}
	
	// convert node to xml
	function xml2string(node) {
	   if (typeof(XMLSerializer) !== 'undefined') {
	      var serializer = new XMLSerializer();
	      return serializer.serializeToString(node);
	   } else if (node.xml) {
	      return node.xml;
	   }
	}	

	// Main entry point for saving the chart
	function saveIt(node, chartOnly, chartId) {
		// find positions of the main node and the inner svg to calculate an offset for the svg image
   		  var obj1 = geom.position(node, true);
   		  var svg = svgEl(node);
   		  var obj2 = geom.position(svg, true);
   		  
   		  // calculate the offset of this svg image in relation to the parent
   		  // we'll "draw" this on the canvas later
   		  var dx = obj2.x - obj1.x;
   		  var dy = obj2.y - obj1.y;
		
		  html2canvas(node, {
			  onrendered: function(canvas) {
			    var xml = xml2string(svg)
			    //console.log(xml);
			    
			    // send image as event so that it is POSTed to the server
		    	var event = new Event("async_set_download_image", chartId, "", REQUESTTYPE_HIGHASYNC);
		    	event['image']=canvas.toDataURL('image/png');
		    	event['svg']=xml;
		    	event['dx']=dx;
		    	event['dy']=dy;
				event['svgonly']=chartOnly;
							    	
				queueManager.queueEvent(event, "text/json", "json", function(data) {
					// image was set on the server (posted)
					// now lets download it.
					//console.log('Image set on the server, now attempting to download it');
					// create an xhr event as a GET so that we can trigger a download
			    	var event = new Event("async_create_and_download_image", chartId, "", REQUESTTYPE_HIGHASYNC);
			    	var events = new Array();
			    	events.push(event);
		    		var content = {
						uisessionid   : queueManager.sessionId,
						csrftoken     : queueManager.csrftoken,
						requesttype   : REQUESTTYPE_HIGHASYNC,
						responsetype  : "binary",
						events        : json.toJson(events)
					};
			    	
			    	//console.log("url: "+ XHRACTION);
			    	//console.log("content: ", content);
			    	var iframe = document.createElement("iframe");
			    	iframe.style.display="none";
			    	var src = XHRACTION + "?" + urlquery.objectToQuery(content);
			    	//console.log(src);
			    	document.body.appendChild(iframe);
			    	// this triggers a download since the event handler responds with
			    	// content-disposition header with file attachement
			    	iframe.src = src;
				}, null);			    
			  }
			});
	}
	
	// check if we should enable
	if (!(has('ie')>9 || has('ff')>25 || has('chrome') > 30 || has("trident") >=7 )) {
		console.log('bi_savechart_decorator: Browser Support for IE > 9, FF > 25, or Chrome > 30.  Save Chart is disabled');
		return;
	}
	// initialize the control
	var selector = '<%=control.getProperty("selector")%>';
	var saveChartLabel = "<%=control.getProperty("savechartlabel")%>";
	var saveChartOnlyLabel = "<%=control.getProperty("savechartonlylabel")%>";
	var compId = "${currentcomponent.id}"; 
	query(selector).forEach(function(node, index, arr){
		if (node==null) {
			console.log('bi_savechart_decorator: Unable to bind the context menu to chart using the selector: ' + selector);
			return;
		}
		var id = attr.get(node, "id");
		if (id==null) {
			id = 'bi_id' + (new Date()).getTime();
			attr.set(node, "id", id);
		}
		console.log("bi_savechart_decorator: Attaching Content Menu to: " + id);
		var pNode = node;
	    var pMenu;
	    
	    pMenu = new Menu({
	        targetNodeIds: [id]
	    });
	    pMenu.addChild(new MenuItem({
	        label: saveChartLabel,
	        onClick: function(){saveIt(node, false, compId)}
	    }));
	    
	    pMenu.addChild(new MenuItem({
	        label: saveChartOnlyLabel,
	        onClick: function(){saveIt(node, true, compId)}
	        
	    }));
	    try {
	    	pMenu.startup();
	    } catch (e) {
	    	console.log("bi_savechart_decorator: Failed to attach context menu" + e);
	    }		
	});	
});
</script>
<%			
		} else {		
%>
<component id="${currentcomponent.id}_holder"><%="<![CDATA["%>
	<script type="text/javascript">
	</script>	
<%="]]>"%></component>

<%
		}		
	}
%>	

<%--
 * IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2011,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 *
--%>
<%@ page contentType="text/html;charset=UTF-8"
	import="java.util.List, psdi.webclient.system.controller.*, psdi.webclient.system.runtime.*, psdi.webclient.system.session.*, com.ibm.tivoli.maximo.map.dispatcher.*"%>
<%@include file="../../common/simpleheader.jsp"%>
<%
	if(component == null)
		component = (ComponentInstance)session.getAttribute("currentcomponent");

	WebClientSession wcSession = component.getWebClientSession();
	boolean designMode = wcSession.getDesignmode();
	boolean useAbbrRenderID = Boolean.parseBoolean(WebClientRuntime.getWebClientProperty("webclient.useabbrrenderid"));

	id = component.getId();
	if(useAbbrRenderID  && !designMode && id.charAt(id.length() - 1) != ':'){
		id = component.getRenderId();		
	}
	if(designMode){
	//not sure
	}else{
		String dataSource = component.getControl().getProperty("datasrc");
		if(dataSource==null || dataSource.length()==0){
			dataSource="MAINRECORD";
		}
		DataBean skdAppBean = wcs.getDataBean(dataSource);
		MboValueData mvd = skdAppBean.getMboValueData("SKDPROJECTID");
		long projectid = 0;
		if(mvd != null)
		{
			projectid = mvd.getDataAsLong();
		}
		String skdProjectId = Long.toString(projectid);
	if (component.needsRender())
	{		
		
		String height = component.getControl().getProperty("height");
		String width = component.getControl().getProperty("width");	
		
		height = wcSession.attachUOM(height);
		width = wcSession.attachUOM(width);
		
		String mapControlId = component.getControl().getProperty("mapControlId");
		if(mapControlId==null || mapControlId.length()==0 ){
			mapControlId="mxmap_div";
		}
		String skdServletBase = wcs.getMaximoRequestContextURL() + "/skd";		
		
		String userProps = com.ibm.tivoli.maximo.skd.control.SKDViewerUtil.serializeViewerProperties(wcs.getMXSession());
	
%>
<script pre="true">
	<%	if (debuglevel == 0)
	{%>
		console.info("Using MXMAP built version. dispatcher");
		dojohelper.loadfile("<%=servletBase%>/javascript/<%=dojoDirectory%>/layers/map/mxmap.js", "js");
	<%}%>
		dojo.registerModulePath('ibm.tivoli.fwm', '<%=servletBase%>/javascript/ibm/tivoli/fwm');
		dojo.addOnLoad(function(){
	// Load the dojo modules that we need
	dojo.require("ibm.tivoli.fwm.mxmap.dispatcher.DispatcherManager");

	// If the user switched tabs and came back, we need to cleanup 
	//  the previous widget before we create a new one.
	
	ibm.tivoli.fwm.mxmap.dispatcher.attachToMap=function(map){
		console.log("map",map);
		console.log("applet:",window.CalendarViewId);
		var disp = new ibm.tivoli.fwm.mxmap.dispatcher.DispatcherManager({map:map,applet:CalendarViewId});
		disp.init();
		window.dispatcher=disp;
		
		//notify applet:
		try {
			CalendarViewId.isLoaded();
			CalendarViewId.setJSCommunicationReady();				
			console.info("ok to execute methods",dispatcher);
		} catch(e) {
			console.warn("Attaching to map but applet is not yet there", e);
		}	
	};
	
	ibm.tivoli.fwm.mxmap.dispatcher.checkForMap=function(){
		var _h;
		var mapLoadedHandler;
		//handler to hide anyremaining javascript menus on the map
		var fct = function(arg){				
				if(_h!=null){
					dojo.unsubscribe(_h);
				}
				if(mapLoadedHandler!=null){
					dojo.unsubscribe(mapLoadedHandler);
				}				
		};
		
		_h=dojo.subscribe('mxnmap_onTabOut',fct);
		var attached=false;
		try{
			console.log(ibm.tivoli.fwm.mxmap.factory.registry);
			if(ibm.tivoli.fwm.mxmap.factory.registry){
				for(var id in ibm.tivoli.fwm.mxmap.factory.registry){
						var map = ibm.tivoli.fwm.mxmap.factory.registry[id].currentMap;
						attached = ibm.tivoli.fwm.mxmap.dispatcher.attachToMap(map);
					}
				}
			}
			catch (e)
			{
				console.warn("map is not there", e);
			}
			
			if (attached == false)
			{
				mapLoadedHandler=dojo.subscribe("mxmap.mapLoaded", function(mapProvider, id, map)
				{
					attached = ibm.tivoli.fwm.mxmap.dispatcher.attachToMap(map);
				});
			}
		};
	});
	
	function verifyDispatchMapInRegistry()
	{
		if(ibm.tivoli.fwm.mxmap.factory.registry) {
			for(var id in ibm.tivoli.fwm.mxmap.factory.registry){			
				var map = ibm.tivoli.fwm.mxmap.factory.registry[id].currentMap;
				if (map) {
					console.log('map found, going to subscribe and attach map');
					ibm.tivoli.fwm.mxmap.dispatcher.checkForMap();					
				}
				else {
					console.log('map not found, check again in half a second');
					window.setTimeout("verifyDispatchMapInRegistry()", 500);
				}
			}
		}
		else {
			console.log('map registry not found, check again in half a second');
			window.setTimeout("verifyDispatchMapInRegistry()", 500);
		}
	}
	
	window.verifyDispatchMapInRegistry=verifyDispatchMapInRegistry;
	
	function hideProgressInd()
	{
		var progressind = document.getElementById("calviewAppletDiv_loading");
		if (progressind)
		{
			progressind.style.display="none";
		}
		window.CalendarViewId = document.getElementById("CalendarViewId");
		dojo.connect(window,"resize", makeDispViewerFullheight);		
		window.setTimeout("makeDispViewerFullheight()", 500);
		verifyDispatchMapInRegistry();
	}
	
	window.hideProgressInd=hideProgressInd;
	
	// Used to send messages to Applet Event Bus
	function sendFWMAppletEvent(id, eventName, data, decode) 
	{
		var ilogViewerApplet = document.getElementById(id);
		if(!ilogViewerApplet) {
			console.log(id + ' Applet not found.  Unable to deliver Applet Message for ' + eventName);
			return;			
		}
				
		if (decode==undefined) decode=true;
		try
		{
			ilogViewerApplet.handleAppletEvent(eventName, data, decode);
		}
		catch (err)
		{
			console.log(err);
		}
	}
	window.sendFWMAppletEvent=sendFWMAppletEvent;

	// Invokes Servlet Command using Javascript Communications (work around for httpOnly cookies)
	function FWMInvokeUrl(url, reply_event_id, postData) {
		console.log("FWM Sending Async Request:" + url);
		var xhrArgs = {
		    url: url,
		    handleAs: "text",
		    preventCache: true,
		    // NEEDS to be true, or else it will conflict with base Maximo xhr requests
		    // and this will block forever
		    sync: true,
		    
		    handle: function(data, ioargs){
		    	console.log("FWM Reply ("+ioargs.xhr.status+") for " + url);
		        switch(ioargs.xhr.status){
		           case 200:
						sendFWMAppletEvent('CalendarViewId', reply_event_id, data, false);
		             break;
		           default:
						sendFWMAppletEvent('CalendarViewId', reply_event_id, null, false);
		        }
		      }		    
		};
		
		try {
			if (postData!=undefined) {
				console.log('FWM POST: ' + postData);
				xhrArgs.postData = postData;
			    // Call the asynchronous xhrPost
				dojo.xhrPost(xhrArgs);
			} else {
			    // Call the asynchronous xhrGet
				dojo.xhrGet(xhrArgs);
			}
		} catch (ex) {
			console.log(ex);
			sendFWMAppletEvent('CalendarViewId', reply_event_id, null, false);
		}
	}
	window.FWMInvokeUrl=FWMInvokeUrl;	
	// ----------			
	function makeDispViewerFullheight(params)
	{	
		var dispatchApplet = document.getElementById("CalendarViewId");
		if(!dispatchApplet)
			return;		
		var dispatchAppletControl = getControl(dispatchApplet);
		if(!dispatchAppletControl)
			return;
			
		var calviewtable = document.getElementById("calviewtable");
		var vs = dojo.window.getBox();
		var available = parseInt(vs.h) - parseInt(getTopPosition(dispatchAppletControl));

		// Values to be subtracted from dispatchApplet and calviewtable hieghts,
		// due to map style setup (applet gets a little bigger than the map).
		// calviewtable height must be a little smaller than dispatchApplet height. 
		var appletAjustment = 17;
		var dispatchAppletHeight = (available - appletAjustment);
		dispatchApplet.height = dispatchAppletHeight + "px";
		dispatchApplet.style.height=dispatchAppletHeight + "px";
		
		var appletDiv = document.getElementById("calviewAppletDiv");
		var mapDiv = document.getElementById("calviewMapDiv");
		
		mapDiv.height = appletDiv.clientHeight + "px";		
		mapDiv.style.height = appletDiv.clientHeight + "px";				
		
		if (calviewtable)
		{					
			if(params && params.map)
			{
				params.map.height = mapDiv.clientHeight - map.toolbar.getToolbarHeight();
				params.map._resize();
			}
			else
			{
				try
				{
					if(ibm.tivoli.fwm.mxmap.factory.registry)
					{
						for(var id in ibm.tivoli.fwm.mxmap.factory.registry)
						{
							var map = ibm.tivoli.fwm.mxmap.factory.registry[id].currentMap;
							if(map)
							{
								map.height = mapDiv.clientHeight - map.toolbar.getToolbarHeight();
								map._resize();
							}
						}
					}
				}
				catch (e)
				{
					console.warn("map is not there", e);
				}				
			}
		}
	}
	window.makeDispViewerFullheight = makeDispViewerFullheight;
</script>			
<tr>
<td aria-hidden=true">
	<div id="calviewFrameDiv" style="width:100%;">		
		<div id="calviewAppletDiv_loading" width="100%" align="center" height="100px">
			<img alt="loading..." src="<%=IMAGE_PATH + "progressbar.gif"%>" align="middle">
		</div>
		<div id="calviewAppletDiv"
			style="padding-right: 1px; margin: 0px; align: top; width:50%; float:left;">
			<table role="presentation" id="calviewtable" width="100%"
				align="left" control="true" controltype="testapplet"
				style="background-color: #E7E7E7; width: 100%; height:<%=height%>;">
				<tr>
					<td align="left"><object id="CalendarViewId"
							name="CalendarViewer"
							type="<%= WebClientRuntime.getWebClientProperty("mxe.javaApplet.Type", WebClientConstants.JAVA_APPLET_OBJECT_TYPE) %>"
							mxpart="applet" width="100%" height="<%=height%>"
							align="baseline" style="margin-top: 0px; position: relative;"
							datasrc="MAINRECORD" tabindex="-1"
							<%							if(USERAGENT.equals("IE"))
							{
%>
							classid="clsid:<%= WebClientRuntime.getWebClientProperty("mxe.javaApplet.Classid", WebClientConstants.JAVA_APPLET_OBJECT_CLASSID_GUID) %>"
							<%								String hostProtocol = WebClientRuntime.getWebClientProperty("maximo_extended_host_protocol");
								if (hostProtocol == null)
								{
									hostProtocol = request.getScheme();
								}
%>
							codebase="<%=hostProtocol+"://"+control.getProperty("codebase", WebClientRuntime.getWebClientProperty("mxe.javaApplet.CodebaseNoProtocol", WebClientConstants.JAVA_APPLET_OBJECT_CODEBASE_NO_PROTOCOL) )%>"
							<%							}
							else
							{
%>
							classid="java:com.ibm.tivoli.maximo.skd.dispatcher.applet.DispatcherViewerApplet"
							<%							}
%>>
							<param name="type"
								value="<%= WebClientRuntime.getWebClientProperty("mxe.javaApplet.Type", WebClientConstants.JAVA_APPLET_OBJECT_TYPE) %>" />
							<param name="SERVLETURL" value="<%=skdServletBase%>" />
							<param name="SKDPROJECTID" value="<%=skdProjectId%>" />
							<param name="UISESSION" value="<%=wcs.getUISessionID()%>" />

							<param name="CODE"
								value="com.ibm.tivoli.maximo.skd.dispatcher.applet.DispatcherViewerApplet" />
							<!-- this seems wrong -->
							<param name="CODEBASE"
								value="<%=servletBase%>/applets/scheduler/" />
							<param name="IMAGE_PATH" value="../webclient/images/" />
							<param name="ARCHIVE"
								value="json4j.jar,dummyClasses.jar,skdviewerlicense.jar,dispatcherviewer.jar,jviews-gantt.jar,jviews-framework-lib.jar,jviews-chart.jar,jhbasic-2.0_05.jar,icu4j-4_0_1.jar,tablelayout.jar,balloontip-1.2.1.jar" />
							<param name="NAME" value="Dispatcher" />
							<param name="JSNAMESPACE" value="dispatcher" />
							<param NAME="APPNAME" value="<%=wcs.getCurrentApp().getId()%>" />
							<param name="DEBUG" value="<%=debug%>" />
							<param name="ISBIDION"
								value="<%=BidiClientUtils.isBidiEnabled()%>" />
							<param name="LANGCODE"
								value="<%=control.getWebClientSession().getUserInfo().getLangCode() %>" />
							<param name="dispatchcontrol" value="<%=control.getId() %>" />
							<param name="scriptable" value="true" />
							<param name="USERDATA" value="<%=userProps%>" />
							<param name="mayscript" value="true" />
							<PARAM name="separate_jvm" value="true">
							<param name="codebase_lookup" value="false">
							<param name="java_arguments"
								value="-Djnlp.packEnabled=false -Xmx256m" />
							<span style="color: red">Calendar View failed to load! --
								Please check browser security settings and get the Java Plugin</span>
							No Java 2 SDK, Standard Edition Support for applet
						</object>
					</td>
				</tr>
			</table>
		</div>
		<div id="calviewMapDiv" style="padding-left: 1px; width:50%; float:right;">
			<table width="100%"><tr width="100%">
<%		
control.renderChildren();
%>				
			</tr></table>					
		</div>
	</div>
<% }else{
%> <component id="${currentcomponent.id}_holder"><%="<![CDATA["%>
		<script>
			console.log("must check if dispatcher exists ${currentcomponent.id}", window.dispatcher)
			try {
				if(!window.dispatcher){
					console.error("no dispatcher integration with map found");
				}else{					
					window.dispatcher.updateProject('<%=skdProjectId%>');
				}
			}
			catch (e)
			{
				console.warn("applet is not yet there", e.message);
			}
		<%
			MapDispatcherControl mapcontrol = (MapDispatcherControl) component.getControl();
			JSONObject refreshparams = mapcontrol.getCallBackInfo();
			if (refreshparams != null)
			{								
				%>window.dispatcher.getApplet().jsCallback('onRefreshResources','<%=refreshparams.serialize()%>');
				<%
				mapcontrol.clearCallbackInfo();
			}
		%></script> <%="]]>"%></component> <%}
}%>

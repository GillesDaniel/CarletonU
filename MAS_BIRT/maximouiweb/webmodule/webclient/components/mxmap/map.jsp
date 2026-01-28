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
<%@page import="com.ibm.tivoli.maximo.map.MapControl,com.ibm.tivoli.maximo.miniapps.control.MiniAppControl,psdi.webclient.system.dojo.Dojo"%>
<%@page import="com.ibm.tivoli.maximo.map.MapControlClientEvent"%>
<%@page import="com.ibm.tivoli.maximo.map.ClientEvent"%>
<%@ include file="../../common/simpleheader.jsp" %><%
	request.setAttribute("mxmap_control", control);
	MapControl mapControl = (MapControl)control;
	MapControlClientEvent mapClientEvent = mapControl.getClientEventCtrl();
	String width = mapControl.getWidth();
	width = component.getWebClientSession().attachUOM(width);
	String height = mapControl.getHeight();
	height = component.getWebClientSession().attachUOM(height);
	String skinDir = servletBase + "/" + Dojo.getSkinsDirectory(request);
	String skinVersion = component.getWebClientSession().getSkinName();
	boolean isExpanded = true;
	if(mapControl.getParentInstance() instanceof Section){
		Section mapParentSection = ((Section)mapControl.getParentInstance());
		isExpanded="true".equals(mapParentSection.isExpanded());	
	}
	if(designmode)
	{
		%><tr style="min-height:50px;"><td><div style="min-height:10px;background-color: green;width:<%=width%>; height:<%=height%>;background-image:url('<%=request.getContextPath()%>/webclient/images/designer/map/mapdesigner.jpg');"></div></td></tr><%
	}else{		
	if (component.needsRender()) {
		// Defect 78393 - This is to prevent refresh events from being buffered by 
		// MapComponent's structureChangedEvent() method when the list structure changes while no map exists
		mapControl.clearNextEventData();
		JSONObject mapConf =  mapControl.getMapConfiguration();
		JSONObject routeConf =  mapControl.getRouteConfiguration();
%><script type="text/javascript" language="javascript">	
<%	if (debuglevel == 0 || com.ibm.tivoli.maximo.miniapps.control.MiniAppControl.isInDevelopment())
{%>
	console.info("Using MXMAP built version.");
	dojohelper.loadfile("<%=servletBase%>/javascript/<%=dojoDirectory%>/layers/map/mxmap.js", "js");
<%}%>
	dojo.config.dojoDirectory = "<%=servletBase%>/javascript/<%=dojoDirectory%>";
	dojo.registerModulePath('ibm.tivoli.fwm', '<%=servletBase%>/javascript/ibm/tivoli/fwm');
	dojo.addOnLoad(function(){	
		<%if(ismobile){
		//this metatag was defined by Gmaps for Iphone/Ipad
		%>
		var viewPortMeta=dojo.query('meta[name="viewport"]')[0];
		/* 12-11086: changed user-scalable to yes*/		
		if(viewPortMeta){
			dojo.attr(viewPortMeta,"content","initial-scale=1.0, user-scalable=yes");
		}else{
			var meta = dojo.create("meta",{name:"viewport",content:"initial-scale=1.0, user-scalable=yes"});
			document.getElementsByTagName("head")[0].appendChild(meta);
		}

		dojohelper.loadfile("<%=skinDir%>/mobile/css/<%if(rtl){%>RTL<%}%>mxmap.css", "css");
		
		<%}else{%>
		dojohelper.loadfile("<%=skinDir%>/<%=skinVersion%>/css/<%if(rtl){%>RTL<%}%>mxmap.css", "css");
		<%
		}%>
		
		var dojoConfigBackup = dojo.config;
		
		require(["ibm/tivoli/fwm/i18n", "ibm/tivoli/fwm/mxmap/factory"], function(i18n, factory) {
			
			if(!dojo.config.fwm){
				dojo.config.fwm={
					ctxRoot:'<%=request.getContextPath()%>',
					fwmRoot:'<%=servletBase%>/javascript/ibm/tivoli/fwm',
					servletBase: '<%=servletBase%>',
					debug:(window.DEBUGLEVEL>0)//allows some timing/debugging functions
				};
			};
			
			i18n.preLoadMsgGroup("map");
			var _h;
			//handler to hide anyremaining javascript menus on the map
			var fct = function(arg){
				var renderId= "${currentcomponent.renderId}";			
				if(arg && arg.listeners && dojo.indexOf(arg.listeners,renderId)>-1){
					//topic published to Maximo Dojo only
					dojo.publish("mxnmap_onTabOut");
					factory.destroyCurrentMap('${currentcomponent.id}');
					if(_h!=null){
						dojo.unsubscribe(_h);
					}
				}
			};
			_h=dojo.subscribe('widgetCleanup',fct);	
			
			/*
			* We listen to channel publishEventToMapDojo from Maximo Dojo
			* in order to publish to Esri API Dojo the channel name in the parameters if it is the case
			*/
			dojo.subscribe("publishEventToMapDojo", function(eventObject) {
				if (eventObject.compId == null || eventObject.compId == "${currentcomponent.id}") {
					factory.publishMapEvent("${currentcomponent.id}", eventObject.type, eventObject.params)
				}
			});
			factory.createMap({
				"compId":"${currentcomponent.id}",
				"divId":"${currentcomponent.id}_mapdiv",			
				"mapConf":<%=mapConf.serialize()%>,
				"routeConf":<%=routeConf.serialize()%>,
				"isInExpanded":<%=isExpanded%>,
				"isMobile":${mxmap_control.mobile},		
				"width":"${mxmap_control.width}",
				"height":"${mxmap_control.height}",
				"skinVersion":"<%=skinVersion%>"
			});
		});
	}); 
	
</script>
<style type="text/css"><%-- This is because maximo.css sets that imgs must have a margin of 2px, and was breaking the map tiles--%>
.NavBar_compassControlContainer{
left:0px !important;
}
</style>
<iframe id="${currentcomponent.id}_mapdiv"  src="../../../../../../../../maximo/oslc/graphite/mapapp"  width="100%" height="100%" style="position: relative; background-color: rgb(255, 255, 255); border-width: 1px; border-style: solid; border-image: initial; border-color: rgb(170, 170, 170) !important; direction: ltr; width: 800px; height: 500px;" ></iframe>
<%
	request.getSession().setAttribute("fwmMapInitialCollapsedState",mapControl.getParentInstance().getProperty("collapsed"));
		
	} else {
%><component id="${currentcomponent.id}_holder"><%="<![CDATA["%>
		<script type="text/javascript">
			var state = [${mxmap_control.currentState}];
			console.log("current state", state);
			dojo.publish("publishEventToMapDojo",
				[{"compId": '${currentcomponent.id}',"type": "mxmap_onServerData_${currentcomponent.id}" ,"params": state }]
			);
			<%
			if (mapClientEvent.hasClientEvents()) {
				List<ClientEvent> events = mapClientEvent.getClientEvents();
				for (ClientEvent ce: events) {
			%>
					dojo.publish("publishEventToMapDojo", 
						[{"compId": '${currentcomponent.id}',"type": '<%=ce.eventName%>' ,"params": '<%=psdi.util.Javascript.escape(ce.data)%>' }]
					);
			<%
				}
			}
			boolean wasExpanded=false;
			if(mapControl.getParentInstance() instanceof Section){
				Section mapParentSection = ((Section)mapControl.getParentInstance());
				wasExpanded=mapParentSection.hasExpandedChanged() && "true".equals(mapParentSection.isExpanded());	
			}
			
			if(ismobile && wasExpanded==true){
			%>
			setTimeout(function(){
				dojo.publish("publishEventToMapDojo", 
					[{"compId": '${currentcomponent.id}',"type": "mxmap_section_expanded_${currentcomponent.id}" ,"params": null }]
				);
			},500);				
			<%}
			
			%>
		</script>
	<%="]]>"%></component>
<%
	}
}
%>

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
<%@page import="com.ibm.tivoli.maximo.map.OpenMapControl,com.ibm.tivoli.maximo.miniapps.control.MiniAppControl"%>
<%@page import="com.ibm.tivoli.maximo.map.MapControlClientEvent"%>
<%@page import="com.ibm.tivoli.maximo.map.ClientEvent"%>
<%@ include file="../../common/simpleheader.jsp" %><%
	request.setAttribute("mxmap_control", control);
	OpenMapControl openMapControl = (OpenMapControl)control;
	MapControlClientEvent mapClientEvent = openMapControl.getClientEventCtrl();
	String width = openMapControl.getWidth();
	width = component.getWebClientSession().attachUOM(width);
	String height = openMapControl.getHeight();
	height = component.getWebClientSession().attachUOM(height);
	String skinDir = servletBase + "/" + ""; //Dojo.getSkinsDirectory(request);
	String skinVersion = component.getWebClientSession().getSkinName();
	boolean isExpanded = true;
	if(openMapControl.getParentInstance() instanceof Section){
		Section mapParentSection = ((Section)openMapControl.getParentInstance());
		isExpanded="true".equals(mapParentSection.isExpanded());	
	}
	if(designmode)
	{
		%><tr style="min-height:50px;"><td><div style="min-height:10px;background-color: green;width:<%=width%>; height:<%=height%>;background-image:url('<%=request.getContextPath()%>/webclient/images/designer/map/mapdesigner.jpg');"></div></td></tr><%
	}else{		
	if (component.needsRender()) {
		// Defect 78393 - This is to prevent refresh events from being buffered by 
		// MapComponent's structureChangedEvent() method when the list structure changes while no map exists
		openMapControl.clearNextEventData();
		JSONObject mapConf =  openMapControl.getMapConfiguration();
		JSONObject currentMBO = (JSONObject)mapConf.get("currentMbo");
		JSONObject mxData = currentMBO != null ? (JSONObject)currentMBO.get("mxdata") : null;
		JSONObject attributesJSON = mxData != null ? (JSONObject)mxData.get("attributes") : null;
		String openMapURL = attributesJSON != null ? attributesJSON.get("openmapurl").toString() : "";
		String openMapProvider = attributesJSON != null ? attributesJSON.get("openmapprovider").toString() : "";
		JSONObject iniLocation = (JSONObject)mapConf.get("initialLocation");
		Double iniLat = 0.0;
		Double iniLng = 0.0;
		Double iniZoom = 5.0;
		if(iniLocation != null && !iniLocation.isEmpty())
		{
			iniLat = (Double)iniLocation.get("lat");
			iniLng = (Double)iniLocation.get("lng");
			iniZoom = (Double)iniLocation.get("level");
			if(iniZoom == null)
			{
				iniZoom = 5.0;
			}
		}
%>
<script type="text/javascript" language="javascript">	
<%	if (debuglevel == 0 || com.ibm.tivoli.maximo.miniapps.control.MiniAppControl.isInDevelopment())
{%>
	console.info("Using MXOPENMAP built version.");

<%}%>
</script>
<link rel="stylesheet" href="<%=servletBase%>/javascript/ibm/tivoli/fwm/mxmap/libol/ol.css">
<script type="text/javascript">

(function (doc) {

	let amd;

	if (typeof define === 'function') {
		amd = define.amd;
		delete define.amd;
		console.info("define.amd was removed from scope");
	}

	function createScript(url, onLoadFunction) {
		const script = doc.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", url);
		if (onLoadFunction) {
			script.onload = onLoadFunction;
		}
		doc.body.appendChild(script);
	}

	createScript("<%=servletBase%>/javascript/ibm/tivoli/fwm/mxmap/libol/ol.js", function () {
		createScript("<%=servletBase%>/javascript/ibm/tivoli/fwm/mxmap/libol/olms.js", function () {
			if (typeof define === 'function' && !define.amd) {
				define.amd = amd;
				console.info("define.amd was added again to scope");
			}
			createScript("<%=servletBase%>/javascript/ibm/tivoli/fwm/mxmap/OpenMap.js", function() {
				createMap(
					'<%=openMapProvider%>', 
					'<%=openMapURL%>', 
					'<%=iniLat%>', 
					'<%=iniLng%>', 
					'<%=iniZoom%>', 
					'${currentcomponent.id}', 
					<%=mapConf%>
				);
			});
		});
	});

})(document)

</script>
<style type="text/css"><%-- This is because maximo.css sets that imgs must have a margin of 2px, and was breaking the map tiles--%>
.NavBar_compassControlContainer{
left:0px !important;
}
</style><div id="${currentcomponent.id}_mapdiv" style="height:${mxmap_control.height}px; width:${mxmap_control.width}px; position:relative; background-color: #FFFFFF; border:1px solid; border-color:#AAA !important; border-top-color:lightgray"></div>

<%
	request.getSession().setAttribute("fwmMapInitialCollapsedState",openMapControl.getParentInstance().getProperty("collapsed"));
		
	} else {
%><component id="${currentcomponent.id}_holder"><%="<![CDATA["%>
		<script type="text/javascript">
			var state = [${mxmap_control.currentState}];
			console.log("current state", state);
			<%
			if (mapClientEvent.hasClientEvents()) {
				List<ClientEvent> events = mapClientEvent.getClientEvents();
				for (ClientEvent ce: events) {
			%>
			<%
				}
			}
			boolean wasExpanded=false;
			if(openMapControl.getParentInstance() instanceof Section){
				Section mapParentSection = ((Section)openMapControl.getParentInstance());
				wasExpanded=mapParentSection.hasExpandedChanged() && "true".equals(mapParentSection.isExpanded());	
			}
			
			if(ismobile && wasExpanded==true){
			%>
			setTimeout(function(){
				console.log("On setTimeout");
			},500);				
			<%}
			
			%>
		</script>
	<%="]]>"%></component>
<%
	}
}
%>

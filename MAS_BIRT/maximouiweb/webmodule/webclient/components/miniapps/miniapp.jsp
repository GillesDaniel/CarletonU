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

<%@page import="com.ibm.tivoli.maximo.miniapps.control.HasExtraResources"%>
<%@page import="com.ibm.tivoli.maximo.miniapps.control.WebResource"%>
<%@page import="com.ibm.tivoli.maximo.miniapps.control.MiniAppControl.ClientEvent"%>
<%@page import="com.ibm.tivoli.maximo.miniapps.control.MiniAppControl"%>
<%@ include file="../../common/simpleheader.jsp"%>
<%
String waitlockId = component.getProperty("waitlockid");
boolean hasWait = (waitlockId!=null && waitlockId.trim().length()>0);
String MINIAPP_ID=component.getProperty("appid");
MiniAppControl miniControl = (MiniAppControl) control;
String MINIAPP_ENTRY_POINT = miniControl.getProperty("mainclass");
// passing an empty string return the miniapps ROOT dir for all miniapps
String MINIAPP_ROOTURL=miniControl.getMiniAppRootDir(servletBase, "");
// returns the miniapp base url for THIS miniapp
String MINIAPP_BASEURL=miniControl.getMiniAppRootDir(servletBase, MINIAPP_ID);

String MINIAPP_DOMID = miniControl.createDOMId(MINIAPP_ID, MINIAPP_ENTRY_POINT);
java.util.List<WebResource> extraPaths = miniControl.resolveExtraPaths(servletBase, MINIAPP_BASEURL);
String width = miniControl.getProperty("width");
if (width==null) width="500px";
String height= miniControl.getProperty("height");
if (height==null) height="500px";
if ("100%".equals(height)) {
	System.out.println(MINIAPP_ID + ": MiniApps should not set height=100%. Consider using a fixed height, and resize the control using JavaScript.");
	//height="500px";
}
boolean autosize = miniControl.getBoolean("autosize");
width = component.getWebClientSession().attachUOM(width);
height = component.getWebClientSession().attachUOM(height);

boolean hasProgress = miniControl.getBoolean("progressindicator");
String displayProgress="";
if (!hasProgress) {
    displayProgress="display:none";
}

boolean singleInstance=component.getBoolean("singleinstance");
String singleInstanceId=component.getProperty("singleinstanceid");


String sessionUrlParam = wcs.getUISessionUrlParameter();
%>
<%
	if(designmode) {
%>

<!-- include designer view -->
<%miniControl.loadDesigner(MINIAPP_ID); %>

<%
	} else {
		if (component.needsRender()) {
%>
<div role="none" class="miniapp" id="<%=MINIAPP_DOMID%>_outer" style="width:<%=width %>;padding:0px;margin: 0px;border: 0px;">
	<style>
	<%=miniControl.loadCSS()%>
	</style>
	<img id="<%=MINIAPP_DOMID%>_progress" alt="loading..." src="<%=IMAGE_PATH + "progressbar.gif"%>" align="middle" style="margin:0;position:absolute;top:50%;left:50%;margin-right:-50%;transform: translate(-50%,-50%);<%=displayProgress%>"/>
	<div role="none" tabindex="0" onfocus="javascript: setCurrentfocusId(event, this);" class="miniapp <%="miniapp_"+UAGENT%>" id="<%=MINIAPP_DOMID%>" style="width:<%=width %>;padding:0px;margin: 0px;border: 0px">
	</div>
	<script>
(function(){
	var config = <%=miniControl.loadMiniAppConfig()%>;
	if (config==null) config={};
	config.appid='<%=MINIAPP_ID%>';
	config.domid='<%=MINIAPP_DOMID%>';
	config.baseUrl='<%=MINIAPP_BASEURL%>';
    config.rootUrl='<%=MINIAPP_ROOTURL%>';
	config.servletBase='<%=servletBase%>';
    config.entryPoint='<%=MINIAPP_ENTRY_POINT%>';
	config.componentId="${currentcomponent.id}";
	config.appname='<%=wcs.getCurrentApp().getId()%>';
	config.preferredWidth='<%=width%>';
	config.preferredHeight='<%=height%>';
	config.sizeToParentId=<%=(miniControl.isSizedToParent()?(miniControl.getSizeToParentIdForJS()):null)%>;
	config.fillHeight=<%=miniControl.getProperty("fillheight")%>;
	config.hasWait = <%=hasWait%>;
	config.waitLockId = '<%=waitlockId%>';
	config.singleInstance=<%=singleInstance%>;
	config.singleInstanceId='<%=singleInstanceId%>';

	config.mx_uisessionid='<%=wcs.getUISessionID()%>';
	config.mx_csrftoken='<%=wcs.getCSRFToken()%>';
	config.mx_session_url_param='<%=sessionUrlParam%>';

    <%if (extraPaths!=null) {
        for (WebResource r: extraPaths) {
            if (r.requireImmediate==false) continue;
            
            out.println("dojohelper.loadfile('"+r.location+"', '"+r.name+"');");
        }
    }%>
	
    <%if (extraPaths!=null) {
        %>
        config.dojoExtraPaths = [];
        <%
        for (WebResource r: extraPaths) {
            if (r.requireImmediate==true) continue;
        %>
        config.dojoExtraPaths.push({name: '<%=r.name%>', location: '<%=r.location%>'});
        <%}}%>

    require(["<%=MINIAPP_ROOTURL%>base/miniloader.js"], function(){
        window.LoadMiniApp(config);
    });
})();
	</script>
</div>
<%
		} else {
			if (miniControl.hasClientEvents()) {
			%>
	<script type="text/javascript">
	require(["dojo/topic"], function(topic){
			<%
			List<ClientEvent> events = miniControl.getClientEvents();
			for (ClientEvent ce: events) {
				%>
				topic.publish('<%=ce.eventName%>','<%=psdi.util.Javascript.escape(ce.data)%>');
				<%
			}
			%>
	});
	</script>
			<%
			}
			else {
				JSONObject evt = miniControl.getLastWebClientEventInstance();
				evt.put("miniapp_id",MINIAPP_ID);
				evt.put("miniapp_entry_point",MINIAPP_ENTRY_POINT);
%>

	<script type="text/javascript">
require(["dojo/topic"], function(topic){
    topic.publish("miniapp.<%=MINIAPP_ID%>.refresh", <%=evt%>);
});
	</script>

<%
			}
		}		
	}
%>

<%@ include file="../../common/componentfooter.jsp" %>

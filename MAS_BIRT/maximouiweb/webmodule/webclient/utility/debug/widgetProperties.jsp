<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18, 5737-M66
* 
* (C) COPYRIGHT IBM CORP. 2012,2024 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
%><%@page import="psdi.webclient.system.controller.AppInstance"
%><%@page import="psdi.webclient.system.controller.BaseInstance"
%><%@page import="psdi.webclient.system.controller.PageInstance"
%><%@page import="psdi.webclient.system.runtime.BaseDescriptor"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="java.util.Stack"
%><%@page import="psdi.util.HTML"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@include file="checkAuthorized.jsp"
%><%@include file="session.jsp"
%><%@include file="encodeProperties.jsp"
%><%
	WebClientSession wcs = getWebClientSession(session, request);
	AppInstance app = wcs.getCurrentApp();

	JSONArray items = null;
	String type = request.getParameter("type");
	if (type != null)
		type = HTML.securitySafeWithHTMLEncoding(type);
	if(type != null && !type.isEmpty())
	{
		boolean isComponent = type.equals("component");
		String id = request.getParameter("widgetId");
		if (id != null)
			id = HTML.securitySafeWithHTMLEncoding(id);

		Stack<PageInstance> pages = app.getPageStack();
		for(PageInstance pageInstance: pages)
		{
			BaseInstance instance = isComponent ? pageInstance.getComponentInstance(id) : pageInstance.getControlInstance(id);
			if (instance != null)
			{
				items = encodeProperties(instance);
			}
		}
	}

	JSONObject json = new JSONObject();
	json.put("identifier", "property");
	if(items == null)
	{
		items = new JSONArray();
	}
	json.put("items", items);

%><%=json.serialize()%>

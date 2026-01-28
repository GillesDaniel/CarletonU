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
%><%@page import="psdi.util.HTML"
%><%@include file="checkAuthorized.jsp"
%><%@include file="xmlFormat.jsp"
%><%
	String name = request.getParameter("name");
	if (name != null)
		name = HTML.securitySafeWithHTMLEncoding(name);
	if(name == null)
	{
		response.setStatus(response.SC_BAD_REQUEST);
		%>The name of the registry must be given.<%
		return;
	}
	else if(name.equals("control"))
	{
		%><%=xmlFormat(WebClientRuntime.getWebClientRuntime().serviceability.getControlRegistry())%><%
	}
	else if(name.equals("component"))
	{
		%><%=xmlFormat(WebClientRuntime.getWebClientRuntime().serviceability.getComponentRegistry())%><%
	}
	else
	{
		response.setStatus(response.SC_BAD_REQUEST);
		%>The registry name given is not valid.<%
	}
%>

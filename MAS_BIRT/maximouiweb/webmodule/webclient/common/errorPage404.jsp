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

<%@ page contentType="text/html;charset=UTF-8" buffer="128kb" autoFlush="true"
%><%@page import="java.util.Locale"
%><%@page import="psdi.server.MXServer"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@page import="psdi.util.MXSession"
%><%
	response.setStatus(404);

	MXServer server = MXServer.getMXServer();
	MXSession mxSession=(MXSession)session.getAttribute("MXSession");
	if(mxSession==null || !mxSession.isConnected())
	{
		mxSession=(MXSession) session.getAttribute("MXSessionReport");
	}
	
	String langcode = null;
	if (mxSession != null && mxSession.isConnected() && mxSession.getUserInfo() != null)
	{
		langcode = mxSession.getUserInfo().getLangCode();
	}
	else
	{
		Object[] settings = WebClientRuntime.getLocaleFromRequest(request);
		if (settings[0] instanceof String)
		{
			langcode = (String)settings[0];
		}
	}
	if (langcode == null)
	{
		langcode = server.getBaseLang();
	}

	String error404body = server.getMessage("ui", "unknowservererror", langcode);
	error404body = error404body.replace("{0}","404");
	error404body = error404body.replace("\n","<br/>");
%>
 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>404 Not Found</title>
  </head>
  <body>
  	<%=error404body%>
  </body>
</html>

<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18, 5737-M66
* 
* (C) COPYRIGHT IBM CORP. 2006,2024 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%>
<%--
*********************************************************************************************************

This page logs out a user from the MAXIMO. This can be customized for any further calls for LDAP

*********************************************************************************************************
--%>
<%@ page contentType="text/html;charset=UTF-8" buffer="128kb" autoFlush="true" 
%><%@page import="java.util.Locale"
%><%@page import="psdi.util.*"
%><%@page import="psdi.server.MXServer"
%><%@page import="psdi.webclient.system.session.*"
%><%@page import="psdi.webclient.system.runtime.*"
%><%@page import="psdi.webclient.system.websession.*"
%><%@page import="psdi.iface.util.SecurityUtil"
%><%@include file="langcode.jsp"%><%
	WebClientRuntime wcr = WebClientRuntime.getWebClientRuntime();
	boolean subFrameAllowed = false;
	boolean csrftokenInvalid = true;
	MXSession mxs = WebClientRuntime.getMXSession(session);
	boolean validateToken = !"0".equals(mxs.getProperty("mxe.server.enableCSRFBlocking")) && "1".equals(mxs.getProperty(WebClientConstants.WEBCLIENT_CHECK_CSRF_LOGOUT));
	WebClientSessionManager wcsm = WebClientSessionManager.getWebClientSessionManager(session);
	if (wcsm != null)
	{
		// Since we have a web client session manager, then this must be a validated session. We must validate the CSRF token
		// against at least one session. If it cannot be validated, show the MXCSRF exception error message.
		
		try
		{
			WebClientSession wcs = wcsm.getWebClientSession(request);
			String csrftoken = request.getParameter(WebClientSessionManager.CSRFTOKEN);
			String oneTimeToken = request.getParameter(WebClientSession.TEMP_TOKEN_PARAM);
			if (wcs != null && (!validateToken || (csrftoken != null && (csrftoken.equals(wcs.getCSRFToken()) || wcs.isTempTokenValid(oneTimeToken)))))
			{
				csrftokenInvalid = false;
				subFrameAllowed = wcs.subFrameAllowed();
				wcsm.removeWebClientSession(wcs);
			}
		}
		catch (MXException mxe)
		{
			validateToken = false;
			//wcs timedout so it's been already removed so continue on
		}
	}
	else
	{
		// If there was no web client session manager, then were not in a validated session and no need to
		// validate the CSRF token.
		validateToken = false;
	}
	
	if (csrftokenInvalid && validateToken)
	{
		String startCenterURL = new java.net.URL(wcr.getMaximoRequestContextURL(request)+"/ui/maximo").toString();
		MXCSRFException csrfExc = new MXCSRFException("system", "securitycontextreadonly");
		csrfExc.printStackTrace();
%>	<script>
		alert('<%=csrfExc.getMessage()%>');
		document.location="<%=startCenterURL%>";
	</script>
<%		return;
	}
	boolean timeout = request.getParameter("timeout") != null;
	boolean unavailable = request.getParameter("unavailable") != null;
	boolean formAuth = session.getAttribute("formAuth") != null;
    boolean unSecure =request.getParameter("unsecure") !=null;
	MXException loginException = (MXException)session.getAttribute("loginexception");
    
	String exitpage;
	if (unavailable)
	{
		exitpage = "/webclient/login/loginerror.jsp?unavailable=true" + (formAuth ? "" : "&basic=true");
	}
	else if (loginException != null)
	{
		exitpage = "/webclient/login/loginerror.jsp?group=" + loginException.getErrorGroup() + "&key=" + loginException.getErrorKey() + (formAuth ? "&formAuth=true" : "");
	}
	else
	{
		exitpage = MXServer.getMXServer().getProperty("webclient.exitpage");
		if (exitpage == null)
		{
			exitpage = "/webclient/login/exit.jsp?langcode=" + langcode + (formAuth ? "&formAuth=true" : "");
		}
	}
	String message = null;
	String loginurl = null;
	String exiturl = WebClientRuntime.getMaximoRequestContextURL(request) + exitpage;
	String loginPage = WebClientRuntime.getWebClientProperty("webclient.loginpage");
	boolean isBotc = MXServer.isBotcInstalled();
	String masLogoutURL = System.getenv("MAS_LOGOUT_URL");

	boolean isMAS = masLogoutURL != null;
	if (timeout)
	{
		if (wcsm != null && wcsm.hasSessions())
		{
			//Still has valid sessions so don't logout the user. Just redirect to exit.jsp with 
			response.sendRedirect(exiturl + (formAuth?"&":"?") + "wcstimeout=true");
			return;
		}
		loginurl = new java.net.URL(new java.net.URL(WebClientRuntime.getMaximoRequestContextURL(request) + "/ui/maximo"), loginPage).toString();
		message = MXServer.getMXServer().getMessage("jspmessages", "session_timeout", langcode);
		// Added for Defect 94023
		exitpage = exitpage + (formAuth?"&":"?") + "logintimeout=true";
	}
	else if (!isBotc && !isMAS)
	{
		String goback = (String)session.getAttribute("signoutfrom");
		if(goback != null)
		{
			loginurl = new java.net.URL(new java.net.URL(goback), loginPage).toString();
		}
		else
		{
			loginurl = new java.net.URL(new java.net.URL(WebClientRuntime.getMaximoRequestContextURL(request) + "/ui/maximo"), loginPage).toString();
		}
		if (!unSecure)
			message = (String)session.getAttribute("signoutmessage");
		else
		{	
			message =  MXServer.getMXServer().getMessage("jspmessages", "unsecure_parameter", langcode) ; 			
		}	
	}
	boolean isWAS = false;
	if (isBotc || isMAS){
		mxSession.disconnect();	
		SecurityUtil.invalidateSSOSession(request, response);
	}
	else{
		if(message != null)
		{
			message = WebClientRuntime.replaceString(message, "\'", "\\\'");
		}

		mxSession.disconnect();

		if (session.getAttribute("redirecturl") != null)
		{
			loginurl = (String)session.getAttribute("redirecturl");
		}

		if(WebAppEnv.useAppServerSecurity() || message == null)
		{
			session.removeAttribute("signoutmessage");
		}

		if(subFrameAllowed)
		{
			loginurl += (loginurl.contains("?") ? "&" : "?") + "allowinsubframe=true";
		}

		session.invalidate();

		HttpSession s = request.getSession(true);
		if (s != null)
		{
			s.setAttribute("langcode", langcode);
			mxSession.setLocale(null);
			s.setAttribute("signoutmessage", message);
		}
		if (!WebAppEnv.useAppServerSecurity())
		{
			response.sendRedirect(loginurl);
			return;
		}

		if (System.getProperty("was.install.root") != null)
		{
			isWAS = true;
			if (unavailable && WebClientRuntime.send503Error(response, mxSession, exiturl))
			{
				return;
			}
		}
	}

%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="<%=langcode.toLowerCase()%>">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>	
	<title>...</title>
</head>
<body role="main">
<%	if (isWAS)
	{
%>	<form method="post" action="ibm_security_logout" name="logoutfrm">
		<input type="hidden" name="logoutExitPage" value="<%=exitpage%>">
	</form> 
<%	}
%>	<script language="JavaScript">
<%	
	if (isWAS)
	{
%>		document.logoutfrm.submit();
<%	}
	else if(isBotc){
		try{
			String maximoxURL =  MXServer.getMXServer().getProperty("mxe.oslc.webappurl");
			maximoxURL += (maximoxURL.endsWith("/")?"":"/") + "logout?invalidatesso=1";
			String blueIDLogoutURL =  MXServer.getMXServer().getProperty("mxe.blueidlogouturl");
			String maximoURL = new java.net.URL(WebClientRuntime.getMaximoRequestContextURL(request) + "/ui/maximo").toString();
			if(!WebClientRuntime.isNullCheck(maximoxURL)){
%>		
				var maximoXReq = new XMLHttpRequest();
				maximoXReq.withCredentials = true;
				maximoXReq.open("GET", "<%=maximoxURL%>");
				maximoXReq.send();		
<%
		    }
			if(!WebClientRuntime.isNullCheck(blueIDLogoutURL)){
							
%>
				document.location = "<%=blueIDLogoutURL%>";
<%						
			}
			else{
%>						
		    	document.location = "<%=maximoURL%>";
<%
		    }
		}
		catch(Exception e){
			
		}		
	}
	else if(isMAS){
%>						
		document.location = "<%=masLogoutURL%>";
<%
	}
	else
	{
%>		document.location = "<%=exiturl%>";
<%}
%>	</script>
</body>  
</html>

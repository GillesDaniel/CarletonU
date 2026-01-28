<%--
* Licensed Materials - Property of IBM
* Restricted Materials of IBM
* 
* (C) COPYRIGHT IBM CORP. 2010,2024 All Rights Reserved.
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%>
<%@ page contentType="text/html;charset=UTF-8" buffer="none"%>
<%@page import="org.w3c.dom.*, psdi.mbo.*, psdi.util.*, psdi.webclient.system.controller.*, psdi.webclient.system.beans.*, psdi.webclient.system.runtime.*"%>
<%@page import="psdi.webclient.servlet.*, psdi.webclient.system.session.*, psdi.webclient.controls.*, psdi.webclient.components.*"%>
<%@page import="psdi.webclient.system.dojo.Dojo"%>

<%
String id = "";
String IMAGE_PATH = "";
String CSS_PATH = "";

/*
String uiSessionId           = request.getParameter("uisessionid");
WebClientSessionManager wcsm = WebClientSessionManager.getWebClientSessionManager(session);
WebClientSession wcs         = wcsm.getWebClientSession(uiSessionId);
String servletBase           = wcs.getMaximoRequestContextURL() +  "/webclient";
*/
String servletBase           = WebClientRuntime.getMaximoRequestContextURL( request )  +  "/webclient";
String skinDir               = Dojo.getSkinsDirectory(request);

// String skin         = wcs.getSkin();
String skin = "";
String defaultAlign ="left";
String reverseAlign ="right";
boolean rtl         = false;

psdi.util.MXSession _session = psdi.webclient.system.runtime.WebClientRuntime.getMXSession(session);

/*
String langcode              = _session.getUserInfo().getLangCode();

if( langcode.equalsIgnoreCase("AR") || langcode.equalsIgnoreCase("HE") )
{
	defaultAlign = "right";
	reverseAlign = "left";
	rtl = true;
}
*/

// IMAGE_PATH = servletBase + "/"+skin+"images/"+ (rtl?"rtl/":"") + wcs.getImagePath();
// CSS_PATH   = servletBase + "/"+skin+"css/"   + (rtl?"rtl":"")  + wcs.getCssPath();
%>

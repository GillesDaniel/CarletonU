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
--%><%@page contentType="text/html;charset=UTF-8" autoFlush="true"
%><%@include file="../common/simpleheader.jsp"%>
<%
	// Dynamic Variables for control aand JavaScript
	String ILOG_VIEWER_APPLET_NAME = "CASNViewer";
	String ILOG_VIEWER_APPLET_CLASS = "com.ibm.tivoli.maximo.skd.applet.CASNViewerApplet";
	String ILOG_VIEWER_APPLET_TITLE = "Crew Graphical Assignment Manager";
	
	// For targeting events
	String ILOG_VIEWER_APP_COMPONENT_ID = "casnviewerId";

	// Ids for accessing UI elements via dom
	String ILOG_VIEWER_APPLET_ID = "CASNViewerId";
	String ILOG_VIEWER_APPLET_DIV = "casnViewerAppletDiv";	
	String ILOG_VIEWER_LOADING_ID = "casnviewer_loading"; 
	String ILOG_VIEWER_TABLE = "casnviewertable";
	
%>
<%@include file="ilogviewer_common.jsp"%>
<%@ include file="../common/componentfooter.jsp" %>

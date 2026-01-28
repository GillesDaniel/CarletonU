<%--
/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
--%>

<%@ page buffer="none" import= "org.w3c.dom.*,psdi.mbo.*, psdi.util.*, psdi.webclient.system.controller.*, psdi.webclient.system.beans.*, psdi.webclient.system.runtime.*, psdi.webclient.servlet.*, psdi.webclient.system.session.*, psdi.webclient.controls.*, psdi.webclient.components.*, java.util.*, com.ibm.json.java.*" %>
<%
	String action = request.getParameter("action");
	String actionTarget = request.getParameter("actionTarget");
	String buttonAutoClickId = request.getParameter("buttonautoclickid");

	if(WebClientRuntime.isNull(buttonAutoClickId) || WebClientRuntime.isNull(action))
		return;
	
	WebClientSession webClientSession = WebClientRuntime.getWebClientRuntime().getWebClientSession(request);
	
	if (webClientSession == null)
		return;
		
	AppInstance currentapp = webClientSession.getCurrentApp();
	
	ComponentInstance buttonAutoClickComponent = currentapp.getComponent(currentapp.getOrigId(buttonAutoClickId));
	
	if( buttonAutoClickComponent == null)
	{
		return;
	}
	
	psdi.webclient.controls.ButtonAutoClick buttonAutoClickControl = (psdi.webclient.controls.ButtonAutoClick)buttonAutoClickComponent.getControl();

	java.io.PrintWriter writer = response.getWriter();
	
	if(action.equals("GETVALUES"))
	{
		writer.println(buttonAutoClickControl.getValues());
	}

%>

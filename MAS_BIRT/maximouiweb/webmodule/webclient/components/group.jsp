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
--%><%
%><%@page contentType="text/html;charset=UTF-8" buffer="none"
%><%@page import="java.util.Iterator"
%><%@page import="java.util.List"
%><%@page import="psdi.webclient.system.controller.AppInstance"
%><%@page import="psdi.webclient.system.controller.BoundComponentInstance"
%><%@page import="psdi.webclient.system.controller.ComponentInstance"
%><%@page import="psdi.webclient.system.controller.ControlInstance"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="psdi.webclient.system.session.WebClientSession.Alignment"
%><%
	ComponentInstance component = ComponentInstance.getCurrent(request);
	ControlInstance control = component.getControl();
	WebClientSession wcs = control.getWebClientSession();
	String id = component.getRenderId();
	Alignment alignment = wcs.getAlignment();
	boolean hiddenFrame = Boolean.parseBoolean(request.getParameter("hiddenframe"));
	boolean designmode = wcs.getDesignmode();
	AppInstance app = control.getPage().getAppInstance();
	boolean componentVisible = component.isVisible();
	String componentValue = null;
	String textcss = component.getProperty("textcss");
	String cssclass = component.getCssClass();
	boolean onTableRow = control.isOnTableRow() || control.isOnTableFilterRow() || control.isOnTableTitleRow();
	boolean defaultRender = component.isDefaultRender();
	if(defaultRender)
	{
		%><%@ include file="../common/componentholder_begin.jsp" %><%
	}
	/*
	 * Used to group more than one component for layout
	 */
	String layout = component.getProperty("layout");
	String width = component.getProperty("width");
	String valign = component.getProperty("valign");
	String height = component.getProperty("height");
	String displayStyle = component.getProperty("displaystyle");
	if(!componentVisible){
		displayStyle = "none";
	}
	if(displayStyle.equalsIgnoreCase("_none"))
		displayStyle="";
	else
		displayStyle="display:"+displayStyle+";";
	
	if(!width.equals(""))
		width="width=\""+width+"\"";

	if(!valign.equals(""))
		valign="vertical-align:"+valign+";";

	if(!height.equals(""))
		height="height=\""+height+"\"";

	cssclass=textcss+" "+cssclass;
	if(!cssclass.equals(""))
		cssclass="class=\""+cssclass+"\"";

	String cellspacing = component.getProperty("cellspacing");
	if(!WebClientRuntime.isNull(cellspacing))
	{
		int spacing = Integer.parseInt(cellspacing);
		cellspacing="cellspacing='"+cellspacing+"'";
	}
  boolean verticalLabels = wcs.useVerticalLabels() && component.getBoolean("makevertical") && 
		!control.getProperty("labellayout").equals("horizontal");
	if(component.needsRender())
	{
		if(layout.equalsIgnoreCase("table"))
		{
			%><table role="presentation" id="<%=id%>" <%=cellspacing%> <%=width%> <%=height%> <%=cssclass%><%
					%> summary="" style="<%=valign%><%=displayStyle%>"<%
					if(wcs.isAutomationOn())
					{
						%> automationid="<%=component.getId()%>"<%
					}
					%>><%
		}
		else if(layout.equalsIgnoreCase("div"))
		{
			%><div id="<%=id%>" <%=width%> <%=height%> nowrap="nowrap" <%=cssclass%><%
					%> style="<%=displayStyle%>"<%
					if(wcs.isAutomationOn())
					{
						%> automationid="<%=component.getId()%>"<%
					}
					%>><%
		}
    else if(verticalLabels)
		{
        List children = component.getChildren();
        if (children != null )
        {
          Iterator i = children.iterator();
          %><div class="verticalSpacerDiv"><%
          while (i.hasNext())
          {
            ComponentInstance child = (ComponentInstance)i.next();
             child.render();
          }
          %></div><%
        }
	  }
  }
  //if needs render
  if(!verticalLabels){
	  component.renderChildComponents();
  }
	if(component.needsRender())
	{
		if(layout.equalsIgnoreCase("table"))
		{
			%></table><%
		}
		else if(layout.equalsIgnoreCase("div"))
		{
			%></div><%
		}
	}
%><%@ include file="../common/componentfooter.jsp" %>

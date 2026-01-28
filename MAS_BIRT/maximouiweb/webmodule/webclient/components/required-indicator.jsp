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
%><%@page import="psdi.webclient.system.controller.AppInstance"
%><%@page import="psdi.webclient.system.controller.BoundComponentInstance"
%><%@page import="psdi.webclient.system.controller.ComponentInstance"
%><%@page import="psdi.webclient.system.controller.ControlInstance"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%
	ComponentInstance component = ComponentInstance.getCurrent(request);
	ControlInstance control = component.getControl();
	boolean onTableRow = control.isOnTableRow() || control.isOnTableFilterRow() || control.isOnTableTitleRow();
	WebClientSession wcs = control.getWebClientSession();
	boolean part2 = component.getProperty("id").indexOf("ri2") > -1 && control.getType().equals("multiparttextbox");
	if(!wcs.isPostTivoli09Skin() || part2){
		String id = component.getRenderId();
		String controlType= control.getType();
		AppInstance app = control.getPage().getAppInstance();
		String IMAGE_PATH = "";
		boolean componentVisible = component.isVisible();
		String componentValue = null;
		boolean hiddenFrame = Boolean.parseBoolean(request.getParameter("hiddenframe"));
		boolean accessibilityMode = wcs.getAccessibilityMode();
		boolean designmode = wcs.getDesignmode();
		String cssclass = component.getCssClass();
		
		boolean defaultRender = component.isDefaultRender();
		if(defaultRender)
		{
			%><%@ include file="../common/componentholder_begin.jsp" %><%
		}
		boolean hideOnTable = component.getProperty("hideontable").equalsIgnoreCase("true");
		BoundComponentInstance boundComponent = null;
		String onfilterrow = component.getProperty("onfilterrow");
		String maskedTitle = "";
		String requiredString = wcs.getMaxMessage("ui","required").getMessage();
		if(component instanceof BoundComponentInstance)
			boundComponent = (BoundComponentInstance)component;
		if(!(hideOnTable && component.isOnTableRow()))
		{
			String hide = component.getProperty("hide");
			boolean visible = (boundComponent.isRequired() && !boundComponent.isReadOnly() && !hide.equalsIgnoreCase("true"));
			boolean allowOnNewSkin =  ("tivoli09".equals(wcs.getSkinName()) && Boolean.valueOf(component.getProperty("ignoreskin")).booleanValue());
			allowOnNewSkin = allowOnNewSkin || part2;
			String imageName = "required.gif";
			//used to allow multparttextbox to show required on part 2 without a label
			//if we use the default image it is blank in tivoli skin so we change it for these
			if(allowOnNewSkin)
			{
				imageName = "required_label.gif";
				if(component.getProperty("id").indexOf("ri2") == -1){
					cssclass="required_label";
				}
			}
            if(accessibilityMode && wcs.getSkinName().equals("iot18")) {
                imageName = "required_label_a11y.gif";
            }

			String vis = "";
			if(!visible)
			{
				requiredString="";
				if(allowOnNewSkin){
					vis ="display:none";
				}
				else{
					vis ="visibility:hidden;";
				}
			}
			else if(part2){
				vis ="visibility:visible;";
			}
			String componentDisplay = "";
			if(component.needsRender() &&((!designmode && !component.isVisible()) || control.isHiddenByLicense()))
			{
				requiredString="";
				componentDisplay="display:none";
			}
	
			%><img id="<%=id%>" alt="<%=requiredString%>" align='absmiddle'<%
				%> src='<%=IMAGE_PATH%><%=imageName%>' style="<%=vis%><%=componentDisplay%>" class="<%=cssclass%>"<%
				if(wcs.isAutomationOn())
				{
					%> automationid="<%=component.getId()%>"<%
				}
				%>/><%
		} %><%@ include file="../common/componentfooter.jsp" %><%
	}	%>

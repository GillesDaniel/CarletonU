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
%><%@page import="psdi.webclient.system.controller.ControlInstance"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%
	boolean designSelected = false;
	String designerSelected = "";
	String designerSelectedColor = "";
	if(designmode)
	{
		if(control.getType().equals("page"))
		{
			ControlInstance selectedControl = control.getDesignerSelectedControl();
			if(selectedControl != null)
			{
				String selControlType = selectedControl.getType();
				if(selControlType.equals("page")){
					designSelected = true;
				}
				if(selControlType.equals("presentation")){
					designSelected = false;
					app.put("selectcomponentid", "mainrec-lb");
				}
			}
		}
		else
		{
			designSelected = component.getDesignerSelected();
		}
		if(designSelected)
		{
			String selectedControlId = (String)app.get("selectcomponentid");
			if(WebClientRuntime.isNull(selectedControlId)){
				app.put("selectcomponentid", component.getRenderId());
			}
			designerSelectedColor = "#D7E8B1";
			designerSelected = "background-color:" + designerSelectedColor + " !important";
		}
		%><%@ include file="designerevents.jsp" %><%
		//Set the variable "showallcontrols" to true or false;
		if (Boolean.parseBoolean((String)app.get("showallcontrols")))
			showallcontrols = true;
	}
%>

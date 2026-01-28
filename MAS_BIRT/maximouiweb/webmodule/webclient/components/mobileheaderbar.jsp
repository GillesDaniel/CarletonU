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
--%><%@ include file="../common/simpleheader.jsp" %><%
	boolean onTableDetails = control.getProperty("ontabledetails").equalsIgnoreCase("true");
	String label = control.getProperty("text").trim();
	String headerheight = component.getProperty("headerheight");
	String width = "width:100%;";
	if(label==null || label.equals(""))
		label = control.getProperty("label").trim();
	boolean border = control.getProperty("border").equalsIgnoreCase("true");
	String type = component.getProperty("type");
	boolean rounded = Boolean.valueOf(component.getProperty("rounded")).booleanValue();
	boolean inverted = Boolean.valueOf(component.getProperty("inverted")).booleanValue();
	String tableclass = "";
	if(inverted)
	{
		cssclass="hbi";
		tableclass="hbit";
	}
	componentDisplay = "";
	String rightEnd = component.getProperty("rightend");
	String rightEndClass = component.getProperty("rightendclass");
	
	boolean tableExpanded = false;
	if(control instanceof Table && ((Table)control).getFlagValue(DataBean.TABLE_EXPANDED))
	{
		tableExpanded = true;
	}
	
	if((!designmode && !componentVisible) || (!tableExpanded && inverted)) 	// don't show bottom header (inverted=true) if !tableExpanded
	{
		componentDisplay="display:none";
	}
	String innerCss = "";
	if(onTableDetails)
		cssclass="tdhb";
	boolean labelIsType = label.startsWith(control.getLocalizedType()) && designmode;
	if(controlType.equalsIgnoreCase("section"))
	{
		if(label.equals("") || labelIsType)
		{
			if(onTableDetails)
			{
				cssclass="tdhbnb";
			}
			else
				cssclass="hbnb";
		}
		if(border && !designmode)
		{
			cssclass="hbb";
		}
	}
	if(!WebClientRuntime.isNull(rightEnd))
	{
		innerCss = cssclass;
		cssclass="";
	}
	ControlInstance parentControl = (ControlInstance)control.getParentInstance();

	String tdleftAutoId="";
	String tdmiddleAutoId="";
	String tdrightAutoId="";
	if(automation) {
		tdleftAutoId="automationid=\""+realId+"_left\"";
		tdmiddleAutoId="automationid=\""+realId+"_middle\"";
		tdrightAutoId="automationid=\""+realId+"_right\"";
	}
	if(component.needsRender()) {
        %><div class="mobileheaderbar" style="display: flex"><%
        List children = component.getChildren();
        Iterator i = children.iterator();
        while (i.hasNext()) {
            ComponentInstance child = (ComponentInstance)i.next();
            %><div style="align-self: center;flex:<%= child.getType().equals("blankline")?100:1%>"><%
            child.render();
            %></div><%
        }
        %></div><%
	}
	else
	{
%>	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
		var el = document.getElementById("<%=id%>");
		if(el)
		{ 
		<%	boolean disp = true;
			if((!designmode && !componentVisible) || (!tableExpanded && inverted)){
				disp = false;
			}
			%>hideShowElement(el,<%=disp%>);<%
			if(component.hasPropertyChanged("cssclass"))
			{
%>			el.className="<%=cssclass%>";
<%			}
			if(component.hasPropertyChanged("border"))
			{
%>			el.border="<%=border%>";
<%			}
%>		}
<%		
		if(component.hasPropertyChanged("cssclass"))
		{
%>			el = document.getElementById("<%=id%>_left");
			if(el)
				el.className="<%=cssclass.trim()%>_left";
			el = document.getElementById("<%=id%>_middle");
			if(el)
				el.className="<%=cssclass.trim()%>_middle";
			el = document.getElementById("<%=id%>_1");
			if(el)
				el.className="<%=cssclass%>_1";
			el = document.getElementById("<%=id%>_right");
			if(el)
				el.className="<%=cssclass.trim()%>_right";
<%		}
		if(component.hasPropertyChanged("text"))
		{
%>			el = document.getElementById("<%=id%>_1");
			if(el)
				el.innerHTML="<%=label%>";
<%		}
%>	</script><%="]]>"%></component>
<%		List children = component.getChildren();
		if (children != null )
		{
			int childCount = children.size();
			Iterator i = children.iterator();
			while (i.hasNext())
			{
				ComponentInstance child = (ComponentInstance)i.next();
				boolean internalAlign = false;
				child.render();
			}
		}
	}
%><%@ include file="../common/componentfooter.jsp" %>

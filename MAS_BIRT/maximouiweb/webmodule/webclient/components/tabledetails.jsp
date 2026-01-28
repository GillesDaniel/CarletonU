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
--%><%@ include file="../common/componentheader.jsp" %><%
    if(designmode)
	{	%>
		<%@ include file="../common/designerevents.jsp" %>
<%  }
	TableDetails tableDetailsControl = (TableDetails)control;
  Table tableControl = ((Table)tableDetailsControl.getParentInstance());
	boolean expanded = tableDetailsControl.expanded().equals("true");
  String tableId = tableControl.getId();//tableControl.getBody().getId().substring(0,tableControl.getBody().getId().lastIndexOf("_"));
	String display = "";
	if(!expanded || !componentVisible)
		display="none";
	int rowNum = ((Table)control.getParentInstance()).getCurrentRow();
	if(component.needsRender())
	{
        String newAutomationId = "";
        if(automation)
            newAutomationId="automationid=\""+realId+"_inner\"";
		String width = "width:100%";
    %>
	<td id="<%=id%>" rownum="<%=rowNum%>" <%=automationId%> tabledetails="true" class="std <%=cssclass%>" style="display:<%=display%>">
		<%if(!skin.equals("")){%><div id="<%=tableId%>_detailsBar" class="tdbar"></div><%}%><div id="<%=id%>_inner" <%=newAutomationId%> style="<%=width%>;display:<%=display%>"><%
	}
	if(designmode || component.needsRender() || ((Table)control.getParentInstance()).getFlagValue(DataBean.TABLE_DETAILS_EXPANDED) || control.getBoolean("alwaysrefresh"))
		component.renderChildComponents();
	if(component.needsRender())
	{	%>
		</div>
	</td>
<%	}
	else
	{	%>
	<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
        el = document.getElementById("<%=id%>");
        if(el)
        {
            <%if(component.hasPropertyChanged("cssclass")){%>
                el.className="<%=cssclass%>";
            <%}%>
            hideShowElement(el,"<%=display%>");
			el.setAttribute("rownum", "<%=rowNum%>" );
		}
		el = document.getElementById("<%=id%>_inner");
		if(el)
		{
			hideShowElement(el,"<%=display%>");
		}
	</script>]]></component>
<%	}	%><%@ include file="../common/componentfooter.jsp" %>

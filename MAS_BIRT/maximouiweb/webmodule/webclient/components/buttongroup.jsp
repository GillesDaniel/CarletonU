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
	cssclass += " invisbuttongroup";
	String label = component.getProperty("label");
	String labelledBy = component.getProperty("labelledby");
	String ariaLabel = component.getProperty("arialabel");
	String align = component.getProperty("align");
	String showGroup = component.getProperty("showbackground");
	if(showGroup.equals("true"))
	{
		cssclass = "buttongroup";
	}
	//IBMBIDI Start
	//Fix for Static Aligns
	if(defaultAlign.equalsIgnoreCase("right"))
	{
		if(align != null)
		{
			if(align.equalsIgnoreCase("right"))
			{
				align = "left";
			}
			else if(align.equalsIgnoreCase("left"))
			{
				align = "right";
			}
		}
	}
	//IBMBIDI End
	String labelalign = component.getProperty("labelalign");
  boolean onTable = "table".equals(control.getParentInstance().getType().toLowerCase());
	if(onTable)
	{
		cssclass+=" tablebuttongroup";
	}
	String lType = null;
	boolean display = true;
	String width ="width:100%;";

	if(component.getProperty("buttonsenabled").equals("false"))
	{
		display=false;
	}

	display = (display && componentVisible);

	String tableIdExt = "_table";
  String hasData = "";
  if(onTable){
    Table tableControl = (Table)control.getParentInstance();
    DataBean tableBean = tableControl.getDataBean();
    hasData = " data-has-data='"+ tableBean.hasPageRows() +"' ";
  }
	if(component.needsRender())
	{
		String tableAutomationId ="";
		if(automation)
		{
			tableAutomationId="automationid=\""+realId+tableIdExt+"\"";
		}
		String threeButtons = "";
		if(control.getChildren().size() == 3) {
			threeButtons = " data-three-buttons=\"true\"";
		}
	%>
<td <%=hasData%> colspan="7" height="0" align="<%=align%>" id="<%=id%>" <%=automationId%> style="<% if(!display){%>display:none;<%}%><%=designerSelected%>;white-space: nowrap;" class="<%= cssclass %>">
	<div style="<%=width%>; justify-content:<%=align%>;" <%=threeButtons%> ctype="buttongroup">
		<table <%if(designmode){%>width="100%" <%}%>id="<%=id + tableIdExt%>" <%=tableAutomationId%> summary="" role="group"<%if(labelledBy.length()>0){%> aria-labelledby="<%=labelledBy%>"<%}%><%if(ariaLabel.length()>0){%> aria-label="<%=ariaLabel%>"<%}%> >
			<tr>
<%  }
	List children = component.getChildren();
	Iterator i = children.iterator();
	
	while (i.hasNext())
	{
		ComponentInstance child = (ComponentInstance)i.next();
		String tempAlign = align;
		if(child.getProperty("designonly").equals("true") && !designmode)
		{
			continue;
		}
		if(component.needsRender())
		{
			if(child.getType().equals("label"))
			{
				if(child.getProperty("title").length()==0) {
					continue;
				}
				tempAlign=defaultAlign;
			}
%>			<td align="<%=tempAlign%>" style="white-space:nowrap;">
<%		}
		child.render();
		if(component.needsRender())
		{
%>			</td>
<%		}
	}
	if(component.needsRender())
	{
%>			</tr>
		</table>
	</div>
</td>
<%	}
	else
	{
%>		<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
		addLoadMethod("updateDisplay('<%=id%>','<%if(!display){%>none<%}%>')");
		</script><%="]]>"%></component>
<%		if(designmode)
		{
%>		<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
		el=document.getElementById("<%=id%>");
		if(el)
			el.style.backgroundColor="<%=designerSelectedColor%>";
		</script><%="]]>"%></component>
<%		}
	}
%><%@ include file="../common/componentfooter.jsp" %>

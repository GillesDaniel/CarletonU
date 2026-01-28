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
    String ulAriaLabel = wcs.getMessage("ui","toolbar");
    if(accessibilityMode && control instanceof DynamicToolbar){
        ulAriaLabel=ulAriaLabel+" "+((DynamicToolbar)control).getToolbarNumber();
    }
	if(component.needsRender())
	{
%>	<ul  class="toolbar" role="toolbar" aria-label="<%=ulAriaLabel%>"><%
	}
	control.renderChildren();
	if(component.needsRender())
	{
%>	</ul>
<%		if(control instanceof ToolbarActions){
			JSONArray renderScripts = ((ToolbarActions)control).getRenderScripts();
			if(renderScripts.size()>0){
			%><script><%
				ListIterator scripts = renderScripts.listIterator();
				while(scripts.hasNext()){
					%>
					<%=(String)scripts.next()%><%
				}
			%></script><%
			}
		}
		if(control instanceof ToolbarActions)
		{
			String saveButtonId = ((ToolbarActions)control).getSaveButtonId();
			if(saveButtonId!=null)
			{	%>
	<script>
		saveButton = "<%=saveButtonId%>";
	</script>
<%			}
		}
	}
%>

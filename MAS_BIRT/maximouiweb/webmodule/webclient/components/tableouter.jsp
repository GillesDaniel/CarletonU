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
	boolean forceRender = false;
	if(control.hasPropertyChanged("display") && !component.needsRender())
	{
		control.setNeedsRender(true);
		forceRender=true;
	}
	if(component.needsRender())
	{	
        String newAutomationId = "";
        if(automation)
            newAutomationId="automationid=\""+realId+"_holder\"";        
		if(component.rerendering() && hiddenFrame)
		{	
			%><%@ include file="../common/componentholder_start.jsp" %><%
		}
		else
		{	%>
	<%if(debug){%><!-- BEGIN Tableouter --><%}%>
	<div nowrap id="<%=id%>_holder" class="tableouter-div" <%=newAutomationId%> style="<%=componentDisplay%>;background-color: inherit !important">
	<%	} 

        String width = control.getProperty("width"); 
        width = component.getWebClientSession().attachUOM(width);
        if(!ismobile && !WebClientRuntime.isNull(width))
        	width="width:"+width+";overflow-x:auto;";
        else if(skin.indexOf("iot18")==-1)
        	width="width: calc(100% - 12px)";	%>
		<table role="presentation" id="<%=id%>" <%=automationId%> valign="top" summary="" class="tableouter <%=cssclass%>" style="<%=width%>;border-collapse: collapse;">
<%	}
	if(control.isVisible()){
		component.renderChildComponents();
		if(!component.needsRender()){
		%>
			<component replacemethod="NONE" vis="true" id="<%=id%>_holder" compid="<%=id%>"><![CDATA[
		<%
		}
		%>
		<script>
			if(!DESIGNMODE){
				if(tpaeConfig.tableButtonPlacement){
					relocateTableButtons("<%=control.getRenderId()%>","<%=component.needsRender()%>","true");
				}
			}
		</script>
		<%if(!component.needsRender()){
		%>	
			]]></component>
		<%
		}
	}
	if(component.needsRender())
	{	
%>		</table>
	<%	if(component.rerendering() && hiddenFrame)
		{
			%><%@ include file="../common/componentholder_end.jsp" %><%
		}
		else
		{	%>
	</div>
<%if(debug){%><!-- END Tableouter --><%}%>
<%		}
	} 
	if(forceRender)
	{
		control.setNeedsRender(false);
		forceRender=false;
		%>
		<script>
			addRerendered("<%=id%>_holder",true);
		</script>
<%	}	
%><%@ include file="../common/componentfooter.jsp" %>

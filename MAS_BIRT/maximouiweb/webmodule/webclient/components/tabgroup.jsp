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

    String tabStyle = control.getProperty("style");
	String format = control.getProperty("format");
	if(format.equalsIgnoreCase("carddeck")){
		cssclass+=" carddeck";
	}
	String ariaRole = "";
	boolean isMainTab = ((TabGroup)control).isMainTab();
	if(isMainTab)
	{
        ariaRole = "role=\"main\"";
    }

	if(component.needsRender())
	{
		if(component.rerendering())
		{	%>
			<%@ include file="../common/componentholder_start.jsp" %><%
				String style = control.getProperty("style");%>
				<script>
					dojo.publish(<%if(style.equals("form")){%>"maintabchange"<%}else{%>"subtabchange"<%}%>,[{"id":"<%=id%>","listtab":<%=app.onListTab()%>}]);
					<% if(style.equals("form") && !ismobile) { %>
							hideURLbar();
					<% } %>
				</script>	
	<%	}
		else
		{
%>
		<tr>
			<td id="<%=id%>_td" class="<%=cssclass%>" style="vertical-align:top;padding:0px;margin:0px">
				<% 	if(accessibilityMode && ariaRole.length()>0)
				{	%>
					<h1 class="ah" id="main_content" tabindex="-1"><%= wcs.getMessage("ui","mainform")%></h1>
					<label class="text help">&nbsp;<%= HTML.decode(wcs.getMessage("ui","reqFieldMsg"))%></label>
			<%	}	%>
				<%@ include file="../common/componentholder_start.jsp" %>
<%		}	
		if(format.equals("wizard")){
			cssclass+=" wizard";	
		}%>
					<table role="presentation"  id="<%=id%>" width="100%" class="<%=cssclass%>">
						<%if(debug){%><!-- begin tabgroup <%=id %>--><%}%>
<%	}

	component.renderChildComponents();

	if(component.needsRender())
	{
%>
						<%if(debug){%><!-- end   tabgroup <%=id %>--><%}%>
					</table>
<%		if(component.rerendering())
		{
			control.setNeedsRender(false);
%>
			<%@ include file="../common/componentholder_end.jsp" %>
<%		}
		else
		{
%>				<%@ include file="../common/componentholder_end.jsp" %>
			</td>
		</tr>
<%		}
	}	%>

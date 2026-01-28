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
	if(defaultRender)
	{
		%><%@ include file="componentholder_end.jsp" %><%
	}
	if (component.needsRender() && component.getProperty("mxevent").equals("returntoapp"))
	{	%>
		<script>
			var breadcrumbsId="<%=id%>";
		</script>
<%	}	%>

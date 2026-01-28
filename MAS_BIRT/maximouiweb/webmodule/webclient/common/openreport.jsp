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
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@page import="java.util.*"
%><%
	response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
	response.setHeader("Pragma","no-cache"); //HTTP 1.0
	response.setDateHeader ("Expires", 0); // Proxy request
String reportType = (String)session.getAttribute("reportType");
Hashtable reportParams = (Hashtable)session.getAttribute("reportParams");
%>
		<html>
			<head>
				<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<%
				if(reportType != null && reportType.equals("COGNOS"))
				{
%>
				<script>	
				
					window.onload = function()
					{
						reportForm.submit();
					};
				</script>
<%
				} else {
%>
				<script>			
					window.onload = function()
					{
						var actionURL;
						var theForm = document.forms['reportForm'];
					<%
					// Incase of BROS do not post baseURl as parameter it will be set in Servlet
					// Incase of Non-Bros the url of the browser is treated as baseURL.
					String redirUrl=(String)reportParams.get("redir");
					redirUrl=redirUrl.toUpperCase();
					if(redirUrl.startsWith("HTTP://") ||  redirUrl.startsWith("HTTPS://"))
					{
					%>
						actionURL="<%=reportParams.get("redir")%>";
					<%
					}
					else
					{
					%>
						var docURL = document.URL;
						var urlStartingFromContext="<%=request.getContextPath()%>/webclient/common/openreport.jsp";
						var n =docURL.indexOf(urlStartingFromContext);
						var baseUrl=docURL.substring(0,n);
						if(baseUrl)
						{
							var input = document.createElement('input');
							input.type = 'hidden';
							input.name = 'baseUrl';
							input.value = baseUrl;
							theForm.appendChild(input);
							actionURL=baseUrl+"<%=reportParams.get("redir")%>";
						}
						else
							actionURL="<%=reportParams.get("redir")%>";
					<%
					}
					%>
					theForm.action =actionURL;
					reportForm.submit();
					};
				</script>
<% 
				} 
%>
			</head>
			<%
				String redirUrl=(String)reportParams.get("redir");
				String p_where=(String)reportParams.get("p_where");
				String cognosprompt=(String)reportParams.get("cognosprompt");
				String contentLocale=(String)reportParams.get("contentLocale");
				String cognosPathRef=(String)reportParams.get("cognosPathRef");
				String isCognosDashboard=(String)reportParams.get("iscognosdashboard");
				if(reportType != null && reportType.equals("COGNOS")) {
					if (isCognosDashboard == "true") {
						redirUrl = redirUrl + "&perspective=dashboard";
						if (cognosPathRef != null) {
							redirUrl = redirUrl + "&pathRef=" + cognosPathRef;
						}
					}
				}
			%>
			<body>
				<form name="reportForm" id="reportForm" action="<%=redirUrl%>" method="post">
<%				
				if(reportType != null && reportType.equals("COGNOS"))
				{
%>
					<input type="hidden" name="p_where" id="p_where" 
            			value="<%=p_where%>" style="display: none">
					<input type="hidden" name="prompt" id="prompt" 
            			value="<%=cognosprompt%>" style="display: none">
					<input type="hidden" name="contentLocale" id="contentLocale" 
            			value="<%=contentLocale%>" style="display: none">
					<input type="hidden" name="pathRef" id="pathRef" 
            			value="<%=cognosPathRef%>" style="display: none">	
<%
				} else {
					Object pKeys[] = reportParams.keySet().toArray();
						for(int i = 0; i < pKeys.length; i++)
					{
						String keyName=pKeys[i].toString();
						if(keyName.equals("__islocale"))
						{
							String value=(String) reportParams.get(keyName);
							StringTokenizer st= new StringTokenizer(value,"||");
							while(st.hasMoreTokens())
							{
%>							
								<input type="hidden" name="__islocale" value="<%=st.nextToken() %>">
<%						
							}
						}
						else
						{
							if (reportParams.get(pKeys[i].toString()) instanceof String)
							{
								String paramValue = (String)reportParams.get(pKeys[i].toString());
								paramValue = paramValue.replace("\"", "&quot;");
								//paramValue = paramValue.replace("\\", "\\\\");
								String utf8String = new String(paramValue.getBytes("UTF-8"), "ISO-8859-1");
%>							
								<input type="hidden" name="<%=pKeys[i].toString() %>" value = "<%=utf8String%>">
<%
							}
							else
							{
%>							
								<input type="hidden" name="<%=pKeys[i].toString() %>" value = "<%=reportParams.get(pKeys[i].toString()) %>">
<%						
							}
						}
					}			
				}
%>
				</form>
			</body>
		</html>
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
%><%@page import="psdi.server.MXServer"
%><%
String cognosURL = MXServer.getMXServer().getProperty("mxe.report.cognos.serverURL");
String redir = (String)session.getAttribute("redir");
%>
		<html>
			<head>
				<script type="text/javascript">	
						function processWait(cogWin) {
							cogWin.close();
							window.location = "<%=redir%>";
						}
						
						var logoffURL = "<%=cognosURL%>?b_action=xts.run&m=portal/logoff.xts&h_CAM_action=logoff";
						var newWin = window.open(logoffURL,'','width=100,height=100,left=3000,top=3000');
						window.setTimeout(function(){processWait(newWin)},2000);
				</script>
			</head>
			<body>

			</body>
		</html>



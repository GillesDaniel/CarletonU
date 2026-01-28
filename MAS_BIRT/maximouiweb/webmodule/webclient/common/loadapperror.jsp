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
--%><%--
* This jsp is loaded when an error occurs while an application is being initialized. This is because if 
* the application cannot initialize properly, then the normal render process cannot be used as it requires
* a valid appliation instance.
*
* Buttons are provided here to retry the action that the user was originally attempting or just go to the
* Start Center if the application cannot be loaded.
--%>
<%@page import="psdi.util.BidiUtils"
%><%@page import="java.net.URLEncoder"
%><%@page import="psdi.webclient.system.runtime.WebClientConstants"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@page contentType="text/html;charset=UTF-8" buffer="128kb" autoFlush="true"
%><%@include file="../login/langcode.jsp"
%><%
String errorMessage = (String)session.getAttribute(WebClientConstants.WEBCLIENT_LOADAPP_EXC);
if (errorMessage == null)
{
	errorMessage = mxSession.getMessage("ui", "loadapperrorgeneric");
}
String retryURL = (String)session.getAttribute(WebClientConstants.WEBCLIENT_LOADAPP_RETRYURL);
String retryQuery = (String)session.getAttribute(WebClientConstants.WEBCLIENT_LOADAPP_RETRYQUERY);
String returnURL = WebClientRuntime.getMaximoRequestContextURL(request) + request.getServletPath();
if (retryURL == null)
{
	retryURL = returnURL;
}
String errorLabel = mxSession.getMessage("ui", "loadapperror");
String returnBtnLabel = mxSession.getMessage("ui", "loadapperrorreturnlabel");
String retryBtnLabel = mxSession.getMessage("ui", "loadapperrorretrylabel");
 %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="<%=langcode.toLowerCase()%>" style="background: #fff">
<head>
	<base href="<%=WebClientRuntime.getMaximoRequestContextURL(request)+"/webclient/common/"%>"/>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title><%=mxSession.getMessage("fusion","CompanyName")%></title>
	<link href="../login/css/mas8/login.css" rel="stylesheet" type="text/css" />
<%	String reverseAlign = "right";
	if(BidiUtils.isGUIMirrored(langcode))
	{
		reverseAlign = "left";
%>	<link href="../login/css/mas8/RTLlogin.css" rel="stylesheet" type="text/css" />
<%	} 
%>
	<script>
		function executeRetry()
		{
<%--		 Since the response could come back very quickly showing the same error if it hasn't been resolved,
			 show a working icon for a second just to show that the request actually happened.			
--%>		var iconImg = document.getElementById("icon");
			iconImg.src = "../images/progressbar.gif";
      iconImg.style.height = '34px';
			window.setTimeout(function() {
				var retryURL = '<%=retryURL%>';
				var retryQuery = '';
<%				if (retryQuery != null)
				{
					// If there's a query string component, encode it so that no one can inject any script.
%>					retryURL += '?' + decodeURIComponent('<%=URLEncoder.encode(retryQuery)%>');
<%				}
%>				location.href = retryURL + retryQuery;
			}, 1000);
		}
	</script>
</head>
<body>
	<div style='Background: transparent'>
		<div class="main_tbl" style="margin: auto">
			<div class="dialog" role="main">
        <div style='background: #fff;box-shadow: 2px 2px 12px #999;'>
          <div style="display: flex; align-items: start; padding: 5px 10px;">
            <img id="icon" class="messageIcon" src="../login/images/st34critical_shad.png" alt="" />
            <h1 style="margin-inline-start: 10px; margin-top: 0; color: #525252;" class="message"><%=errorLabel%></h1>
          </div>
          <p class="messageDesc" style='margin-inline-start: 44px; margin-top: 0; color: #525252;'><%=errorMessage%></p>
        
          <div style="display: flex; margin-top: 30px; background: transparent;">
            <button style="flex: 1; height: 50px; margin: 0; border-width: 0 1px 0 0; background" type="button" class="tiv_btn tiv_btn_secondary" onClick="location.href='<%=returnURL%>'"><%=returnBtnLabel%></button>
            <button style="flex: 1; height: 50px; margin: 0; border: 0" type="button" class="tiv_btn" onClick="executeRetry()"><%=retryBtnLabel%></button>
          </div>
        </div>
			</div>
		</div>
	</div>
</body>
</html>

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
--%><%@ page contentType="text/html;charset=UTF-8" buffer="none" import= "org.w3c.dom.*, java.util.*, java.io.*,psdi.util.*" %>
<%
String params="?";
Enumeration e=request.getParameterNames();
while (e.hasMoreElements())
{
    String key=(String) e.nextElement();
    String keyTemp = request.getParameter(key);
    if (keyTemp != null)
    	keyTemp = HTML.securitySafeWithHTMLEncoding(keyTemp);
    params+=key + "=" + keyTemp + "&";
}
String reposturl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()+"/ui/" + params;
%>
<script type="text/javascript">
parent.document.location="<%=reposturl%>"
</script>

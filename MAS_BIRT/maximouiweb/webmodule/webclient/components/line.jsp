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
--%><%@ include file="../common/simpleheader.jsp" %><%

String width= component.getProperty("width");
width = component.getWebClientSession().attachUOM(width);
String pixelsize = component.getProperty("pixelsize");
pixelsize = component.getWebClientSession().attachUOM(pixelsize);
%>	
<hr style="height:<%=pixelsize %>;width:<%=width%>" class="<%=cssclass%>"/>
<%@ include file="../common/componentfooter.jsp" %>

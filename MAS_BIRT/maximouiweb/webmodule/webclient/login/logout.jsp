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
--%>
<%--
*********************************************************************************************************

This page logs out a user from the MAXIMO. This can be customized for any further calls for LDAP

*********************************************************************************************************
--%>
<%@ page contentType="text/html;charset=UTF-8" buffer="128kb" autoFlush="true" 
%><%@page import="java.util.Locale"
%><%@page import="psdi.util.*"
%><%@page import="psdi.server.MXServer"
%><%@page import="psdi.webclient.system.session.*"
%><%@page import="psdi.webclient.system.runtime.*"
%><%@page import="psdi.webclient.system.websession.*"
%><%@page import="psdi.iface.util.SecurityUtil"
%><%@include file="langcode.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="<%=langcode.toLowerCase()%>">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>	
    <title>...</title>
</head>
<body role="main">
    <script language="JavaScript">
        console.warn('logging out via MAS');
        window.top.postMessage(JSON.stringify({"id":"mas-shell-session-timeout","type":'graphite'}))
    </script>
</body>  
</html>

<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18
* 
* (C) COPYRIGHT IBM CORP. 2021,2024 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%--
* Use this for the customHeaderPage in conjunction with customHeaderPage.css
* NOTE: This file is intended for client modifications, but they must be maintained by the client as we do not guarantee 
* that it will not change or be overwritten in fix packs or upgrades.
* --%><%@page import="com.ibm.json.java.JSONObject"%>
<%
// JSP / JAVA CODE HERE
// The following is purely example code to help with understanding how it can be used.
JSONObject userJSON = new JSONObject();
s.getUserInfo().toJSON(userJSON, false);
String userFullName = HTML.encode(HTML.cleanHtml(s.getUserInfo().getDisplayName(), false, false));
String defaultSite = HTML.encode(HTML.cleanHtml(s.getProfile().getDefaultSite(), true, false));
%>
<!-- html here -->
<!-- The following is purely example code to help with understanding how it can be used. -->
<h4><%=userFullName%></h4>
<div>Default Site: <%=defaultSite%></div>

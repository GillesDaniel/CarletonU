<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18, 5737-M66
* 
* (C) COPYRIGHT IBM CORP. 2020,2024 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@page import="psdi.webclient.controls.*"%>
<%@page import="psdi.webclient.system.dojo.Dojo"%>
<%@include file="../../common/simpleheader.jsp"%>

<%
DojoTreeNode treeNode = (DojoTreeNode)control;

if ( treeNode.hasChanged() && !designmode) {
	%>
	<%
}
%>
<%@ include file="../../common/componentfooter.jsp" %>

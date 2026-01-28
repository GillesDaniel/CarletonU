<%--
/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2018,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
--%>

<%@ include file="../../common/simpleheader.jsp"%>
<%
String tag=component.getProperty("tag");
String attrs=component.getProperty("attrs");
%>
<%
	if(designmode) {
%>
out.print("<"+tag+" "+ attrs +"></"+tag+">");
<%	
	} else {
		if (component.needsRender()) {
            out.print("<"+tag+" "+ attrs +"></"+tag+">");			
		} else {
		  // do nothing here
		}		
	}
%>	
<%@ include file="../../common/componentfooter.jsp" %>

<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18, 5737-M66
* 
* (C) COPYRIGHT IBM CORP. 2013,2024 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ include file="../common/simpleheader.jsp" %><%
	String count = component.getProperty("count");
	int countInt = 0;
	if(count!=null && count.length()>0) {
		countInt = Integer.parseInt(count);
		if(countInt<0) {
			countInt = 0;
		}
		%><div id="<%=id%>" class="bulletinCount" title="<%=countInt%>"><%=countInt%></div><%if(wcs.getAlignment().rtl){%><script>addLoadMethod('adjustBBCountLocation()');</script><%}
	}
%><%@ include file="../common/componentfooter.jsp" %>

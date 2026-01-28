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
<% if (sortType!="") { %>
<a tabindex="0" title="<%=sortLabel %>" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) { sendEvent('sort','<%=id %>','<%=sortIndex%>');}"  href="javascript:sendEvent('sort','<%=id %>','<%=sortIndex%>')"><img align="absbottom" src="<%= IMAGE_PATH %>col_sort_<%=sortType %>.gif" border="0" alt="<%=sortLabel %>" /></a>
<% } %>

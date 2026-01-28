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
if (component.needsRender()) {
    java.util.List children = control.getChildren();
    String css = control.getProperty("cssclass");
    String layout=control.getProperty("childlayout");
    if (children.size()>0) {
        float wid=100f/(float)children.size();
        for (Object child: children) {
            psdi.webclient.system.controller.ControlInstance ci = (psdi.webclient.system.controller.ControlInstance)child;
            ci.setNeedsRender(true);
%>
            <td role="presentation" nowrap="nowrap" width="<%=wid%>%" valign="top" class="<%=(css!=null)?css:""%>">
<%            
            if ("table".equals(layout)) {
%>
            <table role="presentation" width="100%" class="hbox-table"><tr>
<%
            }
            ci.render();
            if ("table".equals(layout)) {
%>
            </tr></table>
<%                                
            }
%>
            </td>
<%
        }
    }
} else {
  // do nothing here
}
%>
<%@ include file="../../common/componentfooter.jsp" %>

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
This JSP is the handler for StartCenter-Options component.
It provides a wrapper user interface for children hyperlink controls
--%>
<%@ include file="../common/simpleheader.jsp" %><%
StartCenterOptions scOptions =((StartCenterOptions)control);
psdi.webclient.beans.startcntr.StartCenterAppBean scAppBean = (psdi.webclient.beans.startcntr.StartCenterAppBean)app.getAppBean();
Object scInfo[] = scAppBean.getStartCenters();
ArrayList startCenters= null;
if (scInfo == null)
	startCenters = new ArrayList();
else if (scInfo[0] == null)
	startCenters = new ArrayList();
else
	startCenters = (ArrayList)scInfo[0];

if(component.needsRender())
{
	String style = "";
	if(startCenters.size() > 1){
		style = " style='padding-top:4rem;' ";
	}
%>
		<table role="presentation" id="<%=id%>" class='scoo' <%=automationId%> border="0" width="100%" align="<%=reverseAlign%>" "<%=style%>">
			<tr>
				<td valign="top" align="<%=reverseAlign%>" nowrap>
					<table role="presentation" border="0" cellpadding="2" bordercolor="#111111" align="<%=reverseAlign%>">
					   <tr>
					<%
}//if render
					List children = scOptions.getChildren();

					if (children != null )
					{
						Iterator i = children.iterator();
						while (i.hasNext())
						{
							DatasrcInstance child = (DatasrcInstance)i.next();
							child.render();
						}
					}

if(component.needsRender())
{
					%>
				</tr>
				</table>
				</td>
			</tr>
		</table>
<%
}
%><%@ include file="../common/componentfooter.jsp" %>

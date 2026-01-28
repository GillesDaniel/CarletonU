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
--%><%@ include file="../common/componentheader.jsp" 

%><%
String appName = "";
Stack appStack = wcs.getAppStack();
String floatDir = "float:right;";
if(rtl){
	floatDir = "float:left;";
}
if (!designmode && component.needsRender())
{
	if(control.hasChildElements())
	{	
		if(((Toolbar)control).needsRendering())
		{
			control.setNeedsRender(true);
		}
		if(appStack.size()>1){ 
			appName = wcs.getCurrentApp().getAppTitle();
		}
		else{
			appName = "";
		}
    boolean pageRender = false;
//div is only needed on a full page render and this control switches 
// to a full render at a higher level wihch causes the div to render again.
if(((ControlInstance)control.getParentInstance()).needsRender()==true){%>
<div id="<%=id%>_holder" aria-hidden="false" aria-busy="false" style="display: inline;">
<%}%>
	<table id="<%=id%>" <%=automationId%>valign="top" summary="" style="position:relative;padding-inline-end:1rem;z-index:1;<%=floatDir%>" role="presentation">
		<tr>
<%	if(!ismobile){ %><td role="presentation">&nbsp;</td><%}else {%><td class="mobileHomeTD"><button class='mobileHome' onClick="sendEvent('changeapp',APPID,'startcntr')"><img src="btn_home.png"/></button></td><%}
		component.renderChildrenControls();%>
		</tr>
	</table>
<%	if(control.getBoolean("showappname")){ %><table id="<%=id%>_appName" <%if(ismobile){%>style="position:relative;"<%}%> class="titleAppName" role="presentation"><tbody><tr><td><%=wcs.getCurrentApp().getAppTitle()%></td></tr></tbody></table><%}
if(((ControlInstance)control.getParentInstance()).needsRender()==true){%>
</div>
<%}%>
<%if(!rtl){%><script>
	var breadcrumbPresent = document.getElementsByClassName('bottomApp').length > 0;
	if(breadcrumbPresent){
		//move the toolbar to the right to align with buttons
		document.getElementById('<%=id%>').style.marginInlineEnd = '-1.5rem';
	}
</script><%
  	}
  }
}
%><%@ include file="../common/componentfooter.jsp" %>

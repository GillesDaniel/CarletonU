<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18, 5737-M66
* 
* (C) COPYRIGHT IBM CORP. 2019,2024 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
%><%@page contentType="text/html;charset=UTF-8" buffer="none"
%><%@page import="org.w3c.dom.Element"
%><%@page import="psdi.mbo.MaxMessage"
%><%@page import="psdi.security.UserInfo"
%><%@page import="psdi.util.MXFormat"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="psdi.webclient.components.Image"
%><%@page import="psdi.webclient.system.controller.AppInstance"
%><%@page import="psdi.webclient.system.controller.BoundComponentInstance"
%><%@page import="psdi.webclient.system.controller.ComponentInstance"
%><%@page import="psdi.webclient.system.controller.ControlInstance"
%><%@page import="psdi.webclient.system.controller.LabelCache"
%><%@page import="psdi.webclient.system.controller.LabelCacheMgr"
%><%@page import="psdi.webclient.system.controller.PageInstance"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="psdi.webclient.system.session.WebClientSession.Alignment"
%><%@include file="../common/simpleheader.jsp"
%><%
	psdi.webclient.controls.ButtonAutoClick buttonAutoClickControl = ((psdi.webclient.controls.ButtonAutoClick) control);
	Alignment alignment = wcs.getAlignment();
	UserInfo userInfo = wcs.getUserInfo();
%>

<script type="text/javascript">

function getAutoClickValues()
{
	setTimeout(function () {
    	
		var posturl = "<%=wcs.getMaximoRequestContextURL() %>/webclient/components/buttonautoclick_getvalues.jsp?action=GETVALUES&buttonautoclickid=<%=id %>&uisessionid=<%=wcs.getUISessionID() %>";

		dojo.xhrPost({
			url: posturl,
			preventCache: true,
		    handleAs: "text",
		    load: function(result) 
		    {
		    		try
		    		{
					var values = eval('(' + result + ')');
					window.clickInterval = values.clickinterval;
					window.autoClick = values.autoclick;
		    		} catch (err)
		    		{
		    			window.doAutoClick = false;
		    		}
		    }
		}); 	
		
		if (window.doAutoClick)
		{
			getAutoClickValues();
		}
			
	}, 1000);

}

function autoClick()
{
	var clickInterval = <%=buttonAutoClickControl.getClickInterval()%>;
	
	if (window.clickInterval != null)
	{
		clickInterval = window.clickInterval;
	}
	
	if (clickInterval <= 0)
	{
		clickInterval = 5000;	
	} else
	{
		clickInterval = clickInterval * 1000;
	}

    	setTimeout(function () 
    	{
    		var renderId = "<%=buttonAutoClickControl.getAutoClickButtonRenderId()%>";
    		
    		renderId = renderId + "-pb";
    		
    		var autoClickButton = document.getElementById(renderId);
    		
    		if (autoClickButton != null)
    		{
    			if (window.autoClick)
    			{
    				autoClickButton.click();
    			}
    			autoClick();
    		}
    		
    }, clickInterval);
}
</script>

<script type="text/javascript">
	window.doAutoClick = <%=buttonAutoClickControl.isAutoClickEnabled()%>;
	getAutoClickValues();
	autoClick();
</script>

<%@ include file="../common/componentfooter.jsp" %>

<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18, 5737-M66
* 
* (C) COPYRIGHT IBM CORP. 2012,2024 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@page import="com.ibm.tivoli.maximo.skd.applet.SKDViewerApplet"%>
<%@page import="psdi.webclient.system.runtime.WebClientRuntime"%>
<%@page import="java.io.StringWriter"%>
<%@page import="java.io.PrintWriter"%>
<%@page import="psdi.server.*"%>
<%@page contentType="text/html;charset=UTF-8" autoFlush="true"
%><%@page import="com.ibm.tivoli.maximo.skd.control.*"
%><%@page import="java.net.URLEncoder"
%><%
	// Dynamic Variables for control aand JavaScript
	// set from the parent control jsp file, there are listed here for reference only
//	String ILOG_VIEWER_APPLET_NAME = "ASNViewer";
//	String ILOG_VIEWER_APPLET_CLASS = "com.ibm.tivoli.maximo.skd.applet.ASNViewerApplet";
//	String ILOG_VIEWER_APPLET_TITLE = "Graphical Assignment Manager";
//	String ILOG_VIEWER_APPLET_DIV = "ilogviewerAppletDiv";	
//	String ILOG_VIEWER_APPLET_ID = "ilogViewerId"
//	String ILOG_VIEWER_APP_COMPONENT_ID = "asnviewerId";
//	String ILOG_VIEWER_LOADING_ID = "ilogviewer_loading"; 
//	String ILOG_VIEWER_TABLE = "ilogviewertable";
	

	// depending on Java Versions, etc, sometimes we need to change the packEnabled flag.
	// Currenly Qiuping/Misha have determined that it should be false
	String ILOG_VIEWER_APPLET_PACK = "false";

	// Serialize cookies so that we can pass it to the Applet
	String cookieData = SKDViewerUtil.serializeCookies(request);

	BaseViewerControl ilogViewerControl = (BaseViewerControl) control;
	// Serialize user properties
	String userProps = SKDViewerUtil.serializeViewerProperties(wcs.getMXSession());

	id = component.getId();
	app.put(ILOG_VIEWER_APP_COMPONENT_ID, ilogViewerControl.getId());
	
	
	String extensionJars = "";
	try {
		extensionJars = MXServer.getMXServer().getProperty("mxe.skd.extensionjars");
		if ((extensionJars != null) && (extensionJars.trim().length() > 0))
		{
			extensionJars = ", " + extensionJars;
		}
		// make sure extensionJars is never null
		if (extensionJars==null) extensionJars="";
	} catch (Throwable t) { t.printStackTrace(); }
	// --- BUILD Applet Injection
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		pw.println("<object");
		pw.println("mxhideapplet=\"true\""); // hide the applet for dialogs because of issues in chrome and IE
		pw.println("id=\"" + ILOG_VIEWER_APPLET_ID + "\"");
		pw.println("name=\"" + ILOG_VIEWER_APPLET_NAME + "\"");						 
		pw.println("type=\""+ WebClientRuntime.getWebClientProperty("mxe.javaApplet.Type", WebClientConstants.JAVA_APPLET_OBJECT_TYPE) +"\"");								
		pw.println("mxpart=\"applet\"");							
		pw.println("width=\"100%\" height=\"100%\"");							 
		pw.println("align=\"baseline\"");							 
		pw.println("style=\"position:relative;\"");							
		pw.println("datasrc=\"MAINRECORD\"");
		pw.println("tabindex=\"-1\"");
		if(USERAGENT.equals("IE"))
		{
			pw.println("classid=\"clsid:"+ WebClientRuntime.getWebClientProperty("mxe.javaApplet.ClassidNoMinimum", WebClientConstants.JAVA_APPLET_OBJECT_CLASSID_GUID_NO_MINIMUM) +"\"");
			String hostProtocol = WebClientRuntime.getWebClientProperty("maximo_extended_host_protocol");
			if (hostProtocol == null)
			{
				hostProtocol = request.getScheme();
			}

			pw.println("codebase=\""+ hostProtocol+"://"+control.getProperty("codebase", WebClientRuntime.getWebClientProperty("mxe.javaApplet.CodebaseNoProtocol", WebClientConstants.JAVA_APPLET_OBJECT_CODEBASE_NO_PROTOCOL) ) + "\"");
			
		} 
		else
		{
			pw.println("classid=\"java:"+ ILOG_VIEWER_APPLET_CLASS+"\""); 
		}
		
		pw.println(">");
		pw.println("<param name=\"type\"           value=\""+ WebClientRuntime.getWebClientProperty("mxe.javaApplet.Type", WebClientConstants.JAVA_APPLET_OBJECT_TYPE) +"\" />");
		pw.println("<param name=\"CODE\"           value=\""+ ILOG_VIEWER_APPLET_CLASS + "\" />");						
		pw.println("<param name=\"CODEBASE\"       value=\""+ servletBase + "/applets/scheduler/\" />");						
		pw.println("<param name=\"IMAGE_PATH\"     value=\"../webclient/images/\" />");
		pw.println("<param name=\"ARCHIVE\"        value=\"dummyClasses.jar,skdviewerlicense.jar,skdviewer.jar,jviews-gantt.jar,jviews-framework-lib.jar,jviews-chart.jar,jhbasic-2.0_05.jar,icu4j-4_0_1.jar,tablelayout.jar,balloontip-1.2.1.jar" + extensionJars + "\" />");	
		pw.println("<param name=\"NAME\"           value=\""+ ILOG_VIEWER_APPLET_NAME +"\" />");						
		pw.println("<param NAME=\"APPNAME\"        value=\"" + wcs.getCurrentApp().getId()+ "\" />");						
		pw.println("<param name=\"DEBUG\"          value=\"true\" />");						
		pw.println("<param name=\"ISBIDION\"       value=\""+ BidiClientUtils.isBidiEnabled()+"\" />");						
		pw.println("<param name=\"LANGCODE\"       value=\""+ control.getWebClientSession().getUserInfo().getLangCode() + "\" />");						
		pw.println("<param name=\"scriptable\"     value=\"true\" />");						
		pw.println("<param name=\"mayscript\"      value=\"true\" />");						
		pw.println("<param name=\"TOKENS\"         value=\"" + cookieData+ "\"/>");						
		pw.println("<param name=\"USERDATA\"       value=\"" + userProps+ "\"/>");
		pw.println("<param name=\""+SKDViewerApplet.APPLET_STATE_KEY+"\"       value=\"" + session.getAttribute(SKDViewerApplet.APPLET_STATE_KEY) + "\"/>");						
		pw.println("<param name=\"codebase_lookup\" value=\"false\">");						
		pw.println("<param name=\"java_arguments\" value=\"-Djnlp.packEnabled="+ILOG_VIEWER_APPLET_PACK+ "\" />");						
		pw.println("<span style=\"color:red\">"+ILOG_VIEWER_APPLET_TITLE+" failed to load! -- Please check browser security settings and get the Java Plugin</span> No Java 2 Plugin, Standard Edition Support for applet");						
		pw.println("</object>");
		
		pw.flush();
		String objectTag = sw.getBuffer().toString();
	// --- Applet Injection
	
	if(component.needsRender())
	{
%>	<tr>
		<td aria-hidden=true">
			<script type="text/javascript">
	var ILOG_VIEWER_APPLET_NAME = "<%=ILOG_VIEWER_APPLET_NAME%>";
	var ILOG_VIEWER_APPLET_CLASS = "<%=ILOG_VIEWER_APPLET_CLASS%>";
	var ILOG_VIEWER_APPLET_TITLE = "<%=ILOG_VIEWER_APPLET_TITLE%>";

	var ILOG_VIEWER_APPLET_DIV = "<%=ILOG_VIEWER_APPLET_DIV%>";	
	var ILOG_VIEWER_APPLET_ID = "<%=ILOG_VIEWER_APPLET_ID%>"
	var ILOG_VIEWER_LOADING_ID = "<%=ILOG_VIEWER_LOADING_ID%>"; 
	var ILOG_VIEWER_TABLE = "<%=ILOG_VIEWER_TABLE%>";
	var ILOG_APPLET_IMPL = '<%=WebClientRuntime.makesafejavascriptstringparameter(objectTag)%>';
			</script>
			<script type="text/javascript" src="<%=servletBase%>/javascript/ilogviewer.js"></script>
			<%-- 110572 use relative position so that container doesn't overflow screen --%>
			<div id="<%=ILOG_VIEWER_APPLET_DIV%>" style="padding: 0px; margin:0px; align:top;width:100%;position:relative;height:1px;">
			<div id="<%=ILOG_VIEWER_LOADING_ID%>" width="100%" align="center" height="100px" style="display:none;">
				<img alt="loading..." src="<%=IMAGE_PATH + "progressbar.gif"%>" align="middle"">
			</div>
			<table role="presentation" id="<%=ILOG_VIEWER_TABLE%>" width="100%" align="left" control="true" controltype="testapplet" style="background-color:#E7E7E7;position:relative;top:-5000px" >
				<tr>
					<td align="left">
<%			if(!designmode) // Don't write the applet in designmode
			{
%>				<div id="<%=ILOG_VIEWER_APPLET_ID%>_object_holder" width="100%" height="100%">
					<!-- applet gets injected here -->
				</div>
<%			} //!designmode
%>					</td>
				</tr>
			</table>
			</div>
			<table id="<%=ILOG_VIEWER_APPLET_ID%>_back"<%
				if(automation)
				{
					%> automationid="<%=realId%>_filler"<%
				}
				%> class="mdw" style="position:relative;display:none;"><tr><td class="din"></td></tr></table>
		</td>
	</tr>
<%	} // Component needs render.
	else
	{
		// 139262: In the Gantt view of the GA app, the Save button is not available after you make a change to the work list 
		if (!ilogViewerControl.toBeSaved()) {
			%>	
				<component id="<%=id%>_holder_tobesaved"<%=compType%>><%="<![CDATA["%><script>
					if (document.getElementById("<%=ILOG_VIEWER_APPLET_ID%>")) {
						sendSKDAppletEvent("<%=ILOG_VIEWER_APPLET_ID%>", "reset_to_be_saved", null);
					}
				</script>]]></component>
			<%			
		}
		if(!designmode)
		{
			if ( ilogViewerControl.hasAppletEvent())
			{
			    // send the applet event to the applet
				%>	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
						sendSKDAppletEvent("<%=ILOG_VIEWER_APPLET_ID%>", "<%=ilogViewerControl.getAppletEventName()%>", "<%=ilogViewerControl.getEncodedAppletEventData()%>");
				</script>]]></component>
				<%
				ilogViewerControl.clearAppletEvent();	
			}
%>	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
		addLoadMethod("makeSchedulerVisibile(<%=ilogViewerControl.getAppletVisible()%>, '<%=ILOG_VIEWER_APPLET_ID%>')");
	</script>]]></component>
<%		}//designmode
	}	//if component needs render

if(!designmode)
{
	String dataSource = ilogViewerControl.getProperty("datasrc");

	//if filter applied
	//call method on applet via JS
	//reset apply filter flag if value is not ""
	if ( ilogViewerControl.isfilterapplied())
	{
		String skdActivityQBE = wcs.getDataBean(dataSource).getString("SKDACTIVITYQBE");
		if (skdActivityQBE != null && !skdActivityQBE.equals(""))
		{
%>	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
		setSKDActivityQBE("<%=ILOG_VIEWER_APPLET_ID%>", "<%=skdActivityQBE%>");
	</script>]]></component>
<%		}
		ilogViewerControl.setApplyFilter(false);	
	}
	if (ilogViewerControl.wasConstraintEdited())
	{
		String newConstraintValues = wcs.getDataBean(dataSource).getString("EDITCONSTRAINTVALUES");

		if (newConstraintValues != null && !newConstraintValues.isEmpty())
		{
%>
	<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%><script>
<%			if ( ilogViewerControl.needsRender() && ilogViewerControl.getAppletVisible())
			{
%>				setConstraintValues("<%=ILOG_VIEWER_APPLET_ID%>", "<%=newConstraintValues%>");
<%			}
			else
			{
%>				parent.setConstraintValues("<%=ILOG_VIEWER_APPLET_ID%>", "<%=newConstraintValues%>");
<%			}
%>	</script>]]></component>
<%		}
		ilogViewerControl.setConstraintEdited(false);
	}

	// refresh applet data
	if (!ilogViewerControl.wasConstraintEdited()
			&& !ilogViewerControl.isfilterapplied() 
			&& ((ilogViewerControl.hasChanged() && !component.needsRender()) || ilogViewerControl.needsRender())
			&& ilogViewerControl.getAppletVisible())
	{
		DataBean skdAppBean = wcs.getDataBean(dataSource);
		MboValueData mvd = skdAppBean.getMboValueData("skdprojectid");
		long projectid = 0;
		if(mvd != null)
		{
			projectid = mvd.getDataAsLong();
		}
		String skdProjectId = Long.toString(projectid);
		String skdProjectsString=ilogViewerControl.replaceSingleQuotes(skdAppBean.getString("SCENARIOPROJECTSSTRING"));
		String skdServletBase = wcs.getMaximoRequestContextURL() + "/skd";
		boolean projectChanged = false;
		if(!app.containsKey("projectid") || !app.get("projectid").equals(skdProjectId))
		{
			app.put("projectid", skdProjectId);
			projectChanged = true;
		}

		if (ilogViewerControl.needToRefreshProjectData())
		{
			projectChanged = true;
		}

		if(!control.needsRender() )
		{
%>		<component id="<%=id%>_holder"<%=compType%>><%="<![CDATA["%>
<%		}
%>		<script>
<%		if(ilogViewerControl.needsRender() || app.get("applinked") != null || projectChanged)
		{
%>			addLoadMethod("skdviewerprojectchanged('<%=ILOG_VIEWER_APPLET_ID%>','<%=skdServletBase%>',decodeURIComponent('<%=URLEncoder.encode(wcs.getUISessionID())%>'),'<%=skdProjectsString%>', <%=ilogViewerControl.hasClearState()%>)");
<%		}
%>		</script>
<%		if(!control.needsRender())
		{
%>		]]></component>
<%		}

		if(ilogViewerControl.needsRender() && app.get("applinked") != null)
		{
			app.remove("applinked");
		}
	}
}//design mode
%>

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
--%><%@ page contentType="text/html;charset=UTF-8" buffer="none" import= "org.w3c.dom.*,psdi.webclient.system.controller.*, psdi.webclient.system.runtime.*, psdi.webclient.servlet.*, psdi.webclient.system.session.*, psdi.server.*, psdi.util.*, java.util.*, java.io.*" %><%@ include file="../common/constants.jsp" %><%
	String disabledStr = "";
	String componentStyle ="";
	//String servletBase = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
	final String BROWSER_KEYWORD = "#{BROWSER}";
	String USERAGENT = request.getHeader("User-Agent");

	if(USERAGENT.toUpperCase().indexOf("GECKO")>-1 || USERAGENT.toUpperCase().indexOf("OPERA")>-1)
		USERAGENT="FIREFOX"; //OPERA seems to render more like firefox
	else if(USERAGENT.toUpperCase().indexOf("MSIE")>-1)
		USERAGENT="IE";
	WebClientSession wcs = WebClientRuntime.getWebClientRuntime().getWebClientSession(request);
	String servletBase = wcs.getMaximoRequestContextURL();
	AppInstance app = wcs.getCurrentApp();
	String componentId = request.getParameter("componentId");
	if (componentId != null)
		componentId = HTML.securitySafeWithHTMLEncoding(componentId);
	String controlId = request.getParameter("controlId");
	if (controlId != null)
		controlId = HTML.securitySafeWithHTMLEncoding(controlId);
	ControlInstance uploadfileControl = wcs.getControlInstance(controlId);
	String title = "";
	if(uploadfileControl!=null)
		title = uploadfileControl.getProperty("label");
	String eventName = "";
	if (uploadfileControl !=null)
	{
		eventName = uploadfileControl.getProperty("event");
		if (eventName.equals("uploadimage"))
		{
	    		if (((psdi.webclient.controls.UploadFile) uploadfileControl).hasImageAttached())
    			{
    				componentStyle = "background: #DEDEDE; color:#000000; -moz-opacity:.6;filter:alpha(opacity=60);";
    			}
		}
	}
%>
<%String defaultAlign="left";
	String reverseAlign="right";
	boolean rtl = false;
	String realDir = "ltr";
	String fSize = USERAGENT.equals("FIREFOX")? "34" : "35";
	psdi.util.MXSession s = psdi.webclient.system.runtime.WebClientRuntime.getMXSession(session);
	String langcode = s.getUserInfo().getLangCode();
	if(langcode.equalsIgnoreCase("AR")||langcode.equalsIgnoreCase("HE"))
	{
		defaultAlign="right";
		reverseAlign="left";
		realDir = "rtl";
		rtl = true;
	}
	String hPosition = (realDir == "rtl"? "right:" : "left:");
	hPosition += "0px";		
	String skin = wcs.getSkin();
	boolean iot18 = skin.indexOf("iot18") > -1;
	%><html>
<head>
	<META http-equiv="Content-Type" content="text/html; charset=utf-8">
	<BASE HREF="<%= servletBase%>/webclient/utility">
	<link rel=stylesheet type="text/css" href="../webclient/<%=skin%>css/<%if(rtl){%>RTL<%}%>maximo.css">
</head>
<body style="background: transparent; background-color: transparent">
<form name="IMPORT" id="IMPORT" enctype="multipart/form-data" method="post">
   	<input type="hidden" NAME="componetId" VALUE="<%=componentId%>">
   	<input type="hidden" NAME="controlId" VALUE="<%=controlId%>">
	<table width="100%" cellspacing="0" align="center" class="maintable">
		<tr>
<%	String fileStyle = "";
	String dir = "";
	if(iot18 && rtl){
		dir = "style='direction:rtl'";
	}
%>
			<td align="<%=defaultAlign%>" <%=dir%> style="white-space: nowrap;">
<%	if(iot18){
		fileStyle = "	width: 0.1px;height: 0.1px !important;fileStyle: 0;overflow: hidden;position: absolute;z-index: -1;opacity: 0;";
	}
	String selectFile = MXServer.getMXServer().getMessage("system", "upload", langcode);
	if(BidiUtils.isBidiEnabled()) { //bidi-hcg-SC 
				if(iot18){%>
					<label for="file" class="pb default"><%=selectFile%></label>
					<input id="fileName" type="text" value="" class="fld fld_ro text ib" readonly size="50"/>
				<%}%>
				<input id="file" name="value" type="file" size="35" class="text" style="<%=fileStyle%>" dir="<%= realDir %>" value="" <%=disabledStr%> onchange="parent.processChange(this)" onkeydown="return parent.onFileKeyDown(this);" onmousedown="return parent.onFileMouseDown(this);" onfocus="parent.fileOnFocus(this)">
				<input id="faked_file" size="<%=fSize%>" class="text" value="" <%=disabledStr%> style="position: absolute; <%=hPosition%>; z-index: 2; background-color: #C0C0C0" dir="ltr" onfocus="parent.fakeOnFocus(this)" onkeydown="return parent.onFakeKeyDown(event,this);" oncopy="parent.processCopy(this)" onpaste="return false;" oncut="return false;" type="text">
<% } else { 
				if(iot18){%>
					<label for="file" class="pb default" style="display: inline-block;margin: 5px 10px;"><%=selectFile%></label>
					<input id="fileName" onmousedown="" type="text" value="" class="fld fld_ro text ib" readonly size="50"/> 
				<%}%>
				<input id="file" type="file" name="value" title="<%=title%>" onchange="" size="35" class="text" <%=disabledStr%> style="<%=fileStyle%><%=componentStyle%>" value="" onclick="if(!parent.undef(parent.firingControl) && parent.firingControl.id==this.id){parent.sendEvent('clientonly','clickFileButton', this.id)}">
<% } %>
			</td>
		</tr>
	</table>
</form>
</body>
<script>
	document.querySelector('#file').addEventListener('change', function(e){
		document.querySelector('#fileName').value = e.currentTarget.files[0].name;
	});
</script>
<%	if (MPFormData.isRequestMultipart(request))
	{
		if (eventName.equalsIgnoreCase("dolongop"))
		{
			MPFormData mpData = null;
			try
			{
				String maxfilesize = uploadfileControl.getProperty("maxfilesize");
				mpData = new MPFormData(request, Integer.parseInt(maxfilesize));
			}
			catch(psdi.util.MXException mxe)
			{
				wcs.addWarning(mxe);
			}
			if(mpData!=null)
			{
				UploadFile file = new UploadFile(mpData.getFileName(), mpData.getFullFileName(), mpData.getFileContentType(), mpData.getFileOutputStream());
				if (file != null)
				{
					String pageId = uploadfileControl.getPage().getId();
					app.put("importfile", file);	%>
					<script>
						parent.sendEvent("importdata", "<%=pageId%>", "");
					</script>
			<%	}
		    }
		    else
		    {
				%>
					<script>
	    				parent.sendEvent('showwarnings', '<%=app.getId()%>', null, null, null, null, null);
					</script>
				<%
			}
	
		}
		else if ((uploadfileControl !=null)&& (uploadfileControl.getPage()!=null))
	    {
			String pageId = uploadfileControl.getPage().getId();
			WebClientEvent wce = new WebClientEvent (eventName, uploadfileControl.getType(), "", wcs);
			wce.setSourceControl(uploadfileControl);
			wcs.setRequest(request);
			wcs.setResponse(response);
		    int status = wcs.handleEvent(wce);
			if (status ==EventQueue.PROCESS_NEXT_EVENT )
			{
				%>
					<script>
						parent.sendEvent("dialogok", "<%=pageId%>", "");
					</script>
				<%
			}
			else
			{
				%>
					<script>
	    				parent.sendEvent('showwarnings', '<%=app.getId()%>', null, null, null, null, null);
					</script>
				<%
			}
		}
		else
		{
			%>
				<script>
	    			parent.sendEvent('showwarnings', '<%=app.getId()%>', null, null, null, null, null);
				</script>
			<%
		}
	}	%>
</html>

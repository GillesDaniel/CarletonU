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
--%><%@ page contentType="text/html;charset=UTF-8" buffer="none" import="psdi.util.*,java.util.*,psdi.webclient.system.controller.*,psdi.webclient.system.session.*,psdi.webclient.system.runtime.*,psdi.server.* "%><%
	WebClientSession wcs = WebClientRuntime.getWebClientRuntime().getWebClientSession(request);
	String fName = "";
	String USERAGENT = request.getHeader("User-Agent");
	if(USERAGENT.toUpperCase().indexOf("GECKO")>-1 || USERAGENT.toUpperCase().indexOf("OPERA")>-1)
		USERAGENT="FIREFOX"; //OPERA seems to render more like firefox
	else if(USERAGENT.toUpperCase().indexOf("MSIE")>-1)
		USERAGENT="IE";

	//String servletBase = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
	String servletBase = wcs.getMaximoRequestContextURL();
	MPFormData mpData = null;
	if (MPFormData.isRequestMultipart(request))
	{
		// get the multipart data, the 10 as a parameter is the maximum file size in MB.
		try
		{
			mpData = new MPFormData(request, 10);
			fName = mpData.getFullFileName();
		}
		catch(psdi.util.MXException mxe)
		{
			MXException[] exceptions = new MXException[1];
			exceptions[0]=mxe;
			wcs.addMXWarnings(exceptions);
		}

	}
%>
<% String defaultAlign="left";
	String reverseAlign="right";
	boolean rtl = false;
	String realDir = "ltr";
	String fSize = USERAGENT.equals("FIREFOX")? "29" : "30";
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
%>
<html>
<head>
	<BASE HREF="<%= servletBase%>/webclient/utility">
	<link rel=stylesheet type="text/css" href="../webclient/<%=skin%>css/<%if(rtl){%>RTL<%}%>maximo.css">
</head>
<body style="background: transparent; background-color: transparent"><form name="IMPORT" id="IMPORT" enctype="multipart/form-data" method="post">
	<input type="hidden" NAME="event" VALUE="importapp">
	<input type="hidden" NAME="<%=WebClientSessionManager.CSRFTOKEN%>" VALUE="<%=wcs.getCSRFToken()%>">
	<table width="100%" cellspacing="0" align="center" class="maintable">
		<tr>
<%	String fileStyle = "";
	String dir = "";
	boolean iot18 = skin.indexOf("iot18") > -1;
	if(iot18 && rtl){
		dir = "style='direction:rtl'";
	}
%>
			<td align="<%=defaultAlign%>" <%=dir%> style="white-space: nowrap;">
<%	if(iot18){
		fileStyle = "	width: 0.1px;height: 0.1px !important;fileStyle: 0;overflow: hidden;position: absolute;z-index: -1; opacity: 0;";
	}
	String selectFile = MXServer.getMXServer().getMessage("system", "upload", langcode);
	if(BidiUtils.isBidiEnabled()) { /*bidi-hcg-AS/SC*/
		String bfName = fName;
		if (bfName.length() > 1)
			bfName = BidiUtils.processComplexexpression(bfName, BidiUtils.PATH, null);
				if(iot18){%>
				<label for="file" class="pb default"><%=selectFile%></label>
				<input id="fileName" type="text" value="" class="fld fld_ro text ib" readonly size="50"/><%}%>
				<input id="file" name="value" class="text ib" type="file" accept="text/xml" style="<%=fileStyle%>" size="30" dir="<%= realDir %>" value="<%=fName%>" accept="text/css" onchange="parent.processChange(this)" onkeydown="return parent.onFileKeyDown(this);" onmousedown="return parent.onFileMouseDown(this);" onfocus="parent.fileOnFocus(this)">
				<input id="faked_file" size="<%=fSize%>"  class="text ib" value="<%=bfName%>" accept="text/css" style="position: absolute; <%=hPosition%>;top:0px; z-index: 2; background-color: #C0C0C0" dir="ltr" onfocus="parent.fakeOnFocus(this)" onkeydown="return parent.onFakeKeyDown(event,this);" oncopy="parent.processCopy(this)" onpaste="return false;" oncut="return false;" type="text">
<%	} else { 
				if(iot18){%>
				<label for="file" class="pb default" style="display: inline-block;margin: 5px 10px;"><%=selectFile%></label>
				<input id="fileName" onmousedown="" type="text" value="" class="fld fld_ro text ib" readonly size="50"/> <%}%>
				<input id="file" type="file" onchange="" accept="text/xml" class="text ib" style="<%=fileStyle%>height:inherit" name="value" size="30" value="<%= fName %>" accept="text/css">
<%	} %>
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
		if(mpData!=null)
		{
			UploadFile file = new UploadFile(mpData.getFileName(), mpData.getFullFileName(), mpData.getFileContentType(), mpData.getFileOutputStream());

			if (file != null)
			{
				AppInstance myApp = wcs.getCurrentApp();
				PageInstance myPage = myApp.getCurrentPage();
				String targetId = (String)myPage.get("doclinkuploadclicktargetid");

				myApp.put("importfile", file);	%>
				<script>
					parent.sendEvent("click", "<%=targetId%>", "");
				</script>
		<%	}
	    }
	    else
	    {
		    AppInstance currentApp = wcs.getCurrentApp();	%>
			<script>
		    	parent.sendEvent('showwarnings', '<%=currentApp.getId()%>', null, null, null, null, null);
			</script>
	<%	}
	}	%>
</html>

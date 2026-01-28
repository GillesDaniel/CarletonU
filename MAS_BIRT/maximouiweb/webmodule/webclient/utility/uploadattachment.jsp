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
	//String servletBase = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()+"/webclient";;
	final String BROWSER_KEYWORD = "#{BROWSER}";
	String USERAGENT = request.getHeader("User-Agent");
	if(USERAGENT.toUpperCase().indexOf("GECKO")>-1 || USERAGENT.toUpperCase().indexOf("OPERA")>-1)
		USERAGENT="FIREFOX"; //OPERA seems to render more like firefox
	else if(USERAGENT.toUpperCase().indexOf("MSIE")>-1)
		USERAGENT="IE";
	WebClientSession wcs = WebClientRuntime.getWebClientRuntime().getWebClientSession(request);
	String controlId = request.getParameter("controlId");
	if (controlId != null)
		controlId = HTML.securitySafeWithHTMLEncoding(controlId);
	ControlInstance control = wcs.getControlInstance(controlId);
	String title = "";
	if(control!=null)
		title = control.getProperty("label");
	String servletBase = wcs.getMaximoRequestContextURL()+"/webclient";
	AppInstance app = wcs.getCurrentApp();
	String fName = "";
	MPFormData mpData = null;
	if (MPFormData.isRequestMultipart(request))
	{
		// get the multipart data
		try
		{
		    mpData = new MPFormData(request);
			fName = mpData.getFullFileName();
		}
		catch(psdi.util.MXException mxe)
		{
			wcs.addWarning(mxe);
		}
	}
%><%String defaultAlign="left";
	String reverseAlign="right";
	String realDir = "ltr";
	boolean rtl = false;
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
	boolean isMobile = wcs.getCurrentApp().isMobile();
%>
<html>
<head>
	<META http-equiv="Content-Type" content="text/html; charset=utf-8">
	<BASE HREF="<%= servletBase%>/utility">
	<link rel=stylesheet type="text/css" href="../webclient/<%=skin%>css/<%if(rtl){%>RTL<%}%>maximo.css">
</head>
<body style="background: transparent; background-color: transparent">
<form name="IMPORT" id="IMPORT" enctype="multipart/form-data" method="post" class="file_dropArea">
  <input type="hidden" NAME="event" VALUE="addattachment">
  <table width="100%" cellspacing="0" align="center" class="maintable">
    <tr>
      <%	String fileStyle = "";
        String dir = "";
        if(iot18 && rtl){
          dir = "style='direction:rtl'";
        } %>
      <td align="<%=defaultAlign%>" <%=dir%> style="white-space: nowrap;">
      <%
		 if(isMobile){
			fileStyle = "	font-size: .9rem !important; overflow: hidden;z-index: -1;";
		 }
	   else if (iot18){
			fileStyle = "	width: 0.1px;height: 0.1px !important;fileStyle: 0;overflow: hidden;position: absolute;z-index: -1;opacity: 0;";
		  }
      
        String selectFile = MXServer.getMXServer().getMessage("system", "uploadFiles", langcode);
        if(BidiUtils.isBidiEnabled()) { /*bidi-hcg-SC*/
          String bfName = fName;
          if (bfName != null && bfName.length() > 1)
            bfName = BidiUtils.processComplexexpression(bfName, BidiUtils.PATH, null);%>
          <input id="file" name="value" type="file" style="<%=fileStyle%>" class="text" size="35" dir="<%= realDir %>" value="<%=fName%>" onchange="parent.processChange(this)" onkeydown="return parent.onFileKeyDown(this);" onmousedown="return parent.onFileMouseDown(this);" onfocus="parent.fileOnFocus(this)">
          <input id="faked_file" multiple size="29" value="<%=bfName%>" style="position: absolute; <%=hPosition%>;top:0px; z-index: 2; background-color: #C0C0C0" dir="ltr" onfocus="parent.fakeOnFocus(this)" onkeydown="return parent.onFakeKeyDown(event,this);" oncopy="parent.processCopy(this)" onpaste="return false;" oncut="return false;" type="text">  
      <%	} else { %>						
        <input id="file" multiple type="file" class="text" style="<%=fileStyle%>" name="value" size="35" value="<%=fName%>" onclick="if(!parent.undef(parent.firingControl) && parent.firingControl.id==this.id){parent.sendEvent('clientonly','clickFileButton', this.id)}">
        <input id="fileName" multiple type="hidden">
      <%	} %>
      </td>
    </tr>
  </table>
  <div id="file_dropArea_div" aria-hidden="true">
    <div><svg class="box__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg></div>
    <%=wcs.getMessage("ui","attachfiledroparea")%>
  </div>
</form>
</body>
<script>
	document.querySelector('#file').addEventListener('change', function(e){
		if(e.currentTarget.files.length>1){
			var multiFileName='';
			var i = 0;
			while(e.currentTarget.files[i]){
				multiFileName = multiFileName + (i==0?'':',  ') + e.currentTarget.files[i].name;
				i++;
			}
			document.querySelector('#fileName').value = multiFileName;
		}
		else{
			document.querySelector('#fileName').value = e.currentTarget.files[0].name;
		}
		parent.hideOrShowNameInput(e.currentTarget);
	});
	

		function preventDefaults(e) {
		  e.preventDefault()
		  e.stopPropagation()
		}

    setTimeout(()=>{
		let dropArea = document.querySelector('#file_dropArea_div');
		//let dropAreaButton = document.getElementById('selectFileButton');
    ['dragenter', 'dragover'].forEach(function(eventName){
      dropArea.addEventListener(eventName, (evt)=>{
        preventDefaults(evt);
        evt.currentTarget.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'dragend'].forEach(function(eventName){
      dropArea.addEventListener(eventName, (evt)=>{
        preventDefaults(evt);
        evt.currentTarget.classList.remove('dragover');
      }, false);
    });

    dropArea.addEventListener('drop', (evt)=>{
      evt.currentTarget.classList.remove('dragover');
      preventDefaults(evt);
		  document.querySelector('#file').files = evt.dataTransfer.files;
		  Array.from(evt.dataTransfer.files).forEach(function(file, index){if(index===0){document.querySelector('#fileName').value = file.name}});
		  parent.hideOrShowNameInput(document.querySelector('#file'));
		} , false)
	}, 200);

</script>
<%
if (MPFormData.isRequestMultipart(request))
	{
		if(mpData!=null)
		{
			Set fileKeys = mpData.getFileParams().keySet();
			Iterator fileIt = fileKeys.iterator();
			boolean processUpload = true;
			ArrayList <Object>fileList = new ArrayList<Object>();
			while (fileIt.hasNext()){
				String fileKey = (String)fileIt.next();
				HashMap fileData = (HashMap)mpData.getFileParamsForFile(fileKey);
				UploadFile df = new UploadFile(fileKey, (String)fileData.get("fullFileName"), (String)fileData.get("contentType"), mpData.getFileOutputStreamForFile(fileKey));
				if(mpData.getFileOutputStreamForFile(fileKey).size() == 0)
	            {
	                String[] param= {(String)fileData.get("fullFileName")};
	                // IJ31153-Problem is only replicated for single file attachments, so only need to do the first one
	                param[0] = param[0].replace("\\", "\\\\");
					String msg = wcs.getMessage("doclink","emptyfile",param);
				%>
					<script>
	              	 	alert("<%=HTML.encode(msg)%>");
						parent.sendEvent('showwarnings', '<%=app.getId()%>', null, null, null, null, null);
	                </script>
	            <%
					processUpload = false;
	            }
	            else { 
					boolean uploadChecked = control.getDataBean().getBoolean("upload");
					boolean pathExists = mpData.getFullFileName().indexOf("\\") >= 0;
					//Check if we are trying to attach a file that has no path
					if( (!uploadChecked) && (!pathExists) ) 
					{ //We are trying to attach a file, without uploading but the path isn't present, so invalid
						String msg = wcs.getMessage("doclink","browseunsupported");
					%>
						<script>
		              	 	alert("<%=msg%>");
							parent.sendEvent('showwarnings', '<%=app.getId()%>', null, null, null, null, null);
		                </script>
		            <%
						processUpload = false;
		            }
				}
				if (df != null)
				{
					fileList.add(df);
				}
			}
			if (processUpload)
		    {
				//app.put("doclinkfile", df);
				app.put("doclinkfiles", fileList);
				String pageId = control.getPage().getId();
				%>
				<script>
					parent.sendEvent("dialogok", "<%=pageId%>", "");
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

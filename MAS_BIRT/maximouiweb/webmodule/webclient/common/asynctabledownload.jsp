<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18, 5737-M66
* 
* (C) COPYRIGHT IBM CORP. 2023,2024 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
%><%@page contentType="text/html;charset=UTF-8" buffer="none"
%><%@page import="org.w3c.dom.*"
%><%@page import="psdi.mbo.*"
%><%@page import="psdi.iface.mic.MicUtil"
%><%@page import="psdi.util.*"
%><%@page import="java.io.File"
%><%@page import="java.util.Map"
%><%@page import="java.util.HashMap"
%><%@page import="java.util.Iterator"
%><%@page import="java.util.ArrayList"
%><%@page import="java.util.List"
%><%@page import="psdi.webclient.system.controller.*"
%><%@page import="psdi.webclient.system.beans.*"
%><%@page import="psdi.webclient.system.runtime.*"
%><%@page import="psdi.webclient.servlet.*"
%><%@page import="psdi.webclient.system.session.*"
%><%@page import="psdi.webclient.system.serviceability.*"
%><%@page import="psdi.webclient.controls.*"
%><%@page import="psdi.webclient.components.*"
%><%@page import="psdi.webclient.system.session.WebClientSession.Alignment"
%><%@include file="constants.jsp"
%><%

	File filepath = new File(MicUtil.getMeaGlobalDir());
	WebClientRuntime wcr = WebClientRuntime.getWebClientRuntime();
	WebClientSession wcs = wcr.getWebClientSession(request);
	String sessionid = wcs.getUISessionID();
	String downloadFormat = request.getParameter("downloadformat");
	Boolean cancelthread = false;
	
	Long threadid = request.getParameter("_threadid")==null ? null : Long.parseLong(request.getParameter("_threadid"));
	if(threadid!=null){
		wcs.updateThreadTimestamp(threadid);
		cancelthread = wcs.getTableDownloadInstance(threadid).isCancelled();
	}
	
	Thread storedThread = threadid!=null ? wcs.getThreadById(threadid) : null;
	String filename = request.getParameter("filename");
	String tblid = request.getParameter("_tbldnld");
	String uisessionid = request.getParameter("uisessionid");
	if(storedThread == null && cancelthread==false) {				
		if (wcs != null)
		{
			wcs.stamp();
			RequestEntry entry = wcs.serviceability.requests.log(request, response);
			try
			{
				String encoding = request.getCharacterEncoding();
				String controlID = request.getParameter("_tbldnld");
				// handle table download
				if (controlID != null)
				{
					String uri = request.getRequestURI();
					if (encoding == null)
						encoding = "UTF-8";
					response.setHeader("Pragma", "public");
					response.setHeader("Cache-Control", "max-age=0");
					response.setCharacterEncoding(encoding);
					
					String tableDownloadFormat = WebClientRuntime.getWebClientProperty("webclient.tabledownloadformat", "xlsx");
					String startcenterDownloadFormat = WebClientRuntime.getWebClientProperty("webclient.startcenterdownloadformat", "xlsx");
					
					Object control = wcs.getControlInstance(controlID,true);
					if(control instanceof Table) {
						//default table download to xlsx
						if(!tableDownloadFormat.equalsIgnoreCase("xls") && !tableDownloadFormat.equalsIgnoreCase("xlsx") && !tableDownloadFormat.equalsIgnoreCase("csv")) {
							tableDownloadFormat = "xlsx";
						}
						downloadFormat = tableDownloadFormat;
					} else {
						//default startcenter download format to xlsx
						if(!startcenterDownloadFormat.equalsIgnoreCase("xlsx") && !startcenterDownloadFormat.equalsIgnoreCase("csv")) {
							startcenterDownloadFormat = "xlsx";
						}
						downloadFormat = startcenterDownloadFormat;
					}
					
					//Add filename to be downloaded into the session, so that the servlet can find it and download it.
					List<String> existingList = (List<String>)wcs.getHttpSession().getAttribute("tbldownloadfilename");
					if (existingList == null) {
						existingList = new ArrayList<String>();
					}
					existingList.add(filename+"."+downloadFormat);
					wcs.getHttpSession().setAttribute("tbldownloadfilename", existingList);

					response.setContentType("text/html");
					try {
						if(downloadFormat.equalsIgnoreCase("csv")){
							TableDownload td = new TableDownload(request, wcs, response,"csv");
							final Thread thread = new Thread(td);					
							thread.start();								
							wcs.setThread(thread,td);	
							request.setAttribute("threadid", thread.getId());
							threadid = thread.getId();
						} else if(downloadFormat.equalsIgnoreCase("xlsx")) {
							TableDownload td = new TableDownload(request, wcs, response,"xlsx");
							final Thread thread = new Thread(td);					
							thread.start();
							wcs.setThread(thread,td);									
							request.setAttribute("threadid", thread.getId());
							threadid = thread.getId();		 
						}
					} catch (Exception mxe) {
						//log error
					}
					
				}
			} catch(Exception e){
				throw e;
			}
		}
	}
%>

<html>
	<head>
		<link rel=stylesheet type="text/css" href="../skins/mas8/css/maximo.css">
    </head>
<body>
	<div id="wait" class="wait" style="top: 0px; left: 0px;  display: block; cursor: wait; opacity: 1;">   
	    <div>
		    <div class="bx--loading-overlay">
			    <div style="display:block">
			         <div data-loading="" class="bx--loading">  
	 			    		<svg class="bx--loading__svg" viewBox="-75 -75 150 150">
					        <title>Loading</title>
					        <circle cx="0" cy="0" r="37.5"></circle>
			      		</svg>
			    	 </div>
			    </div>
	    	</div>
	    </div>
	</div>
</body>
<script>
	let cancelthread = <%=cancelthread%>;
	let threadid = <%=threadid%>;
	
	<%
	
	if(((Thread)wcs.getThreadById(threadid)).isAlive()) {%>	
		setTimeout(()=>{
			window.location.href = '<%=request.getRequestURI()%>?_threadid=<%=threadid%>&filename=<%=filename%>&downloadformat=<%=downloadFormat%>&_tbldnld=<%=tblid%>&uisessionid=<%=uisessionid%>';	
		},3000);<%
	} else {
		wcs.removeThreadById(threadid);%>
		if(cancelthread==true){
			//do not download
		} else {
			let filename = '<%=filename%>';
			let type = '<%=downloadFormat%>';
			
			fetch("/maximo/tabledownload?download="+filename+"."+type+"&filename="+filename+"."+type, {
				headers: {
					"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
				}
			}).then(response => {
				if (response.status != 200) { 
					// status ok 
					document.location = "/maximo/tabledownload?filename="+filename+"."+type; 
				} else {  
					(response.blob()).then(blob => URL.createObjectURL(blob)).then(fileUrl => {
						var a = document.createElement('a');
						a.href = fileUrl;
						a.download = filename+"."+type;
						document.body.appendChild(a);
						a.click();    
						document.body.removeChild(a);  
						})
				
					setTimeout(()=>{
						window.close();
					},500);
				}
			})
		}

		<%
	}
	%>
	
	</script>
</html>

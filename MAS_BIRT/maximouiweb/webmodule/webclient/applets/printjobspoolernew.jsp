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
<%@ page contentType="text/html;charset=UTF-8" session="true" import="java.util.*,psdi.webclient.system.runtime.WebClientRuntime,
 psdi.util.MXSession,psdi.server.MXServer,java.util.StringTokenizer,psdi.util.MXSession,psdi.util.logging.MXLoggerFactory,
 psdi.util.logging.MXLogger,psdi.app.report.ReportUtil"%>
<%
	MXLogger myLogger = MXLoggerFactory.getLogger("maximo.report.directprint");
	response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
	response.setHeader("Pragma","no-cache"); //HTTP 1.0
	response.setDateHeader ("Expires", 0); // Proxy request
	MXSession mxsession= (MXSession)request.getSession().getAttribute("MXSession");
	if (!mxsession.isConnected())
	{
	       	//Do something which will show error on the page like redirect to login
	       	String url = WebClientRuntime.getMaximoRequestContextURL(request)+"/ui/login";
	       	response.sendRedirect(url);
			return;
	}
	String ibmdirectprintkey=(String) request.getParameter("ibmdirectprintkey");
	myLogger.debug("printjobspoolernew.jsp ibmdirectprintkey="+ibmdirectprintkey+" SessionId="+request.getSession().getId());
	if(ibmdirectprintkey==null) 
	{
		ibmdirectprintkey="";
	}
	else
	{
		if (!ReportUtil.validateDPKey(ibmdirectprintkey))
		{
			String errmsg="The format of the ibmdirectprintkey parameter is invalid: " + ibmdirectprintkey;
			myLogger.error(errmsg);
			String replyMsg="Invalid request.  Ask your system administrator to check the logs for details.";
			response.getWriter().write(replyMsg);
			return;
		}
	}
	Hashtable msDocs = new Hashtable();
	String message  = (String)session.getAttribute("printmessage"+ibmdirectprintkey); 
	String printwait = (String)session.getAttribute("printwait"+ibmdirectprintkey);
	String baseUrl=(String) request.getParameter("baseUrl");
	if(baseUrl==null)
		baseUrl="";
	else
	{
	
		String baseUrlDefault=WebClientRuntime.getMaximoBaseURL(request);
		if(!baseUrl.equalsIgnoreCase(baseUrlDefault))
		{
			String baseUrlNoPort=baseUrl.replace(":80","");
			baseUrlNoPort=baseUrlNoPort.replace(":443","");
			if(!baseUrlNoPort.equalsIgnoreCase(baseUrlDefault))
			{
				boolean needBaseUrls=false;
				String baseUrls=MXServer.getMXServer().getProperty("mxe.report.birt.proxyurlredirect");
				if(baseUrls==null || baseUrls.isEmpty())
					needBaseUrls=true;
				else
				{
					boolean foundMatch=false;
					StringTokenizer st=new StringTokenizer(baseUrls,",");
					while(st.hasMoreTokens())
					{
						String nextUrl=st.nextToken().trim();
						if(baseUrl.equalsIgnoreCase(nextUrl))
						{
							foundMatch=true;
							break;
						}
					}
					if(!foundMatch)
						needBaseUrls=true;
				}
				if(needBaseUrls)
				{
					String errmsg="A proxy server has been detected which modifies the url. "+  
							"Contact the system administrator to add "+baseUrl+" to the property mxe.report.birt.proxyurlredirect. "+
							"You can have multiple values separated by commas.";
					myLogger.error(errmsg);
					String replyMsg="A proxy server has been detected which modifies the url. "+  
							"Contact the system administrator to set the property mxe.report.birt.proxyurlredirect. "+
    						"The server log will have the exact value to be set to this property. Check for an entry around the time this error was received.";
					response.getWriter().write(replyMsg);
					return;
				}
			}
		}

	}
		
		
		
	long timeInMillis=System.currentTimeMillis();
	String	timeInMillisStr=timeInMillis+"";
	timeInMillisStr=timeInMillisStr.substring(timeInMillisStr.length()-8);	
	String tokenurlPart= (String)session.getAttribute("tokenurlPart"+ibmdirectprintkey);
	String tokenurl= baseUrl+request.getContextPath()+tokenurlPart;
	String csrftoken=(String)session.getAttribute("csrftoken");
	String uisessionid=(String)session.getAttribute("uisessionid");
	String urlWithCsrfAndUISession=tokenurl.replace("doaction=22", "")+"&ibmdirectprintkey="+ibmdirectprintkey+"&dummyparam="+timeInMillisStr;
 	String downloadRecordPack="";
	String printRecordPackString =MXServer.getMXServer().getProperty("mxe.directprint.PrintRecordPack");
	if(printRecordPackString!=null && (printRecordPackString.equalsIgnoreCase("true") || printRecordPackString.equals("1")    ))
	{
		downloadRecordPack="false";
	}
	else
	{
		downloadRecordPack="true";
	}		
%>

<html>

<BODY onload="printDocument()">
	<form name="reportForm" id="reportForm" action="" target="pdfRender1" method="post">
		<input type="hidden" name="csrftoken" value="">
		<input type="hidden" name="uisessionid" value="">
	</form>
<!--
USE SIGNED VERSIONS OF JAR FILES IF NEEDED
JARS ARE IN maximouiweb\webmodule\webclient\applets\quickprint
ALSO CHANGE THE JAR NAMES BELOW (ARCHIVE and CODE) TO THE SIGNED JAR FILE NAMES
-->
<img src="../images/printprogressbar.gif" alt=""/>
<br>
<b><%=message%></b>
<br><br><br><br><br><br><br><br>



<!--<![endif]-->

<!--Use to render and invoke adobe reader to print PDF -->    


<IFRAME onload="isLoaded()" id="pdfRender1" name="pdfRender1" width=350 height=340 src="">
</IFRAME>


</BODY>

<SCRIPT>
var printNow=false;
var downloadRecordPack=<%=downloadRecordPack%>;
var IBMthreadIdParam=null;
var sleepTime=0;

var urlWithCsrfAndUISession="<%=urlWithCsrfAndUISession%>";
function printDocument()
{

	try
	{
		var  newUrl=urlWithCsrfAndUISession+"&doaction=55";
		invokeUrl(newUrl);
	}
	catch(err)
	{
		alert('printNextDocument Error:'+err.message);	
	}
}


function invokeUrl(url) {
	try
	{
		if (window.XMLHttpRequest)
		{
			// code for most browsers except older IE
			xmlHttp = new XMLHttpRequest();
		}
		else
		{
			// code for Older IE
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlHttp.onreadystatechange = ProcessRequest;
		xmlHttp.open( "POST", url, true );
		xmlHttp.setRequestHeader("csrftoken", "<%=csrftoken%>");
		xmlHttp.setRequestHeader("uisessionid", "<%=uisessionid%>");
		xmlHttp.send(null);
	}
	catch(err)
	{
		alert('printNextDocument Error:'+err.message);
		alert('StackTrace'+err.stack);		
	}
}


function ProcessRequest() 
{
	try
	{
		if ( xmlHttp.readyState == 4) 
		{
			if(xmlHttp.status == 202)
			{
				var replyString=xmlHttp.responseText;	
				if(replyString.startsWith("IBMTHREADID"))
				{
					//Only one tile there will be IBMTREADID in Reply
					// So control comes here only once
					threadid=replyString.substring(12);
					IBMthreadIdParam="IBMTHREADID="+threadid;
					setTimeout(()=>{ invokeUrl(urlWithCsrfAndUISession+"&doaction=66&"+IBMthreadIdParam); },250);
				}
				else
				{
					if(sleepTime<3000)
						sleepTime=sleepTime+250;
					setTimeout(()=>{ invokeUrl(urlWithCsrfAndUISession+"&doaction=66&"+IBMthreadIdParam); },1000);
				}
			}
			else
			{
			//var silentPrintApplet = document.getElementById("SilentPrint");
				if(xmlHttp.status == 200)
				{	
					var replyString=xmlHttp.responseText;
					if(replyString.length<6)
						alert('Note current time and ask your system admin to check server log. Reply:'+replyString);
					else
					{
						var replyCode=replyString.substring(0,6);
						if(replyCode=='GENKEY')
						{ 
							// It worked without any error
							self.focus();
							var url=urlWithCsrfAndUISession+"&doaction=33&rptparam="+replyString;
							printNow=true;
							printPDF1(url);
							var useragent=navigator.userAgent;
							if(!(useragent.indexOf("Chrome")>-1 || useragent.indexOf("Firefox")>-1 || useragent.indexOf("Edge")>-1))
							{
								setTimeout(closeWindow, 20000);
							}
						}
						
						
						else
						{
							if(replyCode=='GENERR')
							{
								// mxe.directprint.ActionPackageIncomplete=0; 
								// There were errors but it still created a pdf of rest of the files.
								var ind=replyString.indexOf("ERROR");
								var errorString;
								var genkey;
								if(ind>0)
								{
									genkey=replyString.substring(0,ind);
									errorString=replyString.substring(ind+6);
								}
								else
								{
									genkey=replyString.substring(0);
									errorString="";						
								}
								self.focus();
								alert('Errors encountered. This will download or print rest of the reports and attachments. For details of the error note current time and ask your system admin to check server log. First error:'+errorString);
								var url=urlWithCsrfAndUISession+"&doaction=33&rptparam="+genkey;
								printNow=true;
								printPDF1(url);
								var useragent=navigator.userAgent;
								if(!(useragent.indexOf("Chrome")>-1 || useragent.indexOf("Firefox")>-1 || useragent.indexOf("Edge")>-1))
								{
									setTimeout(closeWindow, 20000);
								}
							}
							else
							{
								// mxe.directprint.ActionPackageIncomplete=1 and an error occured
								// Or an exception happened which we did not handle.
								alert('Errors encountered. For details of the error note current time and ask your system admin to check server log. Error:'+replyString);				  
							}
						}
					}
					
				}
				else
				{
						alert('Reply was not a HTTP 200, note current time and ask your system admin to check server log. Reply:'+replyString);

				}                    
			}
		}
	}
	catch(err)
	{ 
		alert('printNextDocument Error:'+err.message);
		alert('StackTrace'+err.stack);
	}
}


function printPDF1(inPDFDoc)
{
	var theForm = document.forms['reportForm'];
	theForm.csrftoken.value = "<%=csrftoken%>";
	theForm.uisessionid.value = "<%=uisessionid%>";
	theForm.action=inPDFDoc;
	reportForm.submit();
	//document.getElementById('pdfRender1').src=inPDFDoc;
	
}

function closeWindow()
{
	self.close();
}

function isLoaded()
{
	if(downloadRecordPack)
		return;

	/*
	var edgeOrChrome77=false;
	var browserVersion=navigator.userAgent;
	var majorVersion=0;
	if(browserVersion.indexOf("Chrome")>-1 && browserVersion.indexOf("Edge") < 0 )
	{
		var versionList = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
		if(versionList != null)
		{
			var majorVersionTemp= parseInt(versionList[2], 10);
			if(majorVersionTemp!=null)
				majorVersion=majorVersionTemp;
		}
	   if(majorVersion >= 77)
		  edgeOrChrome77=true;
	}
	if(navigator.userAgent.indexOf("Edge") >= 0)
			edgeOrChrome77=true;
	
	*/
	
	if(printNow)
	{
        var pdfFrame = window.frames["pdfRender1"];
        pdfFrame.focus();
        pdfFrame.print();
	}
	/*
	else
	{
		// Pop up the print dialog only for Edge browser. All other browser automatically pop up print dialog. 
		if(navigator.userAgent.indexOf("Edge") >= 0)
			printNow=true;
	}
	*/
}

</SCRIPT>
</html>

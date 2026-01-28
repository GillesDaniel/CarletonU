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
<%
%><%@page import="java.net.URLEncoder"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%
	Hashtable reportParams = (Hashtable)app.get("spawnreport");
	app.remove("spawnreport");
	if(!component.needsRender() && reportParams != null)
	{
		//System.out.println("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
		// Silent printing
		if (reportParams.containsKey("submitPrintJob") && ((Boolean)reportParams.get("submitPrintJob")).booleanValue())
		{
			 if( !reportParams.containsKey("authenticate"))
			 {				
				String urlToOpen=null;
				String formCSRFToken=(String)session.getAttribute("csrftoken");
				String formUISessionID=(String)session.getAttribute("uisessionid");
				urlToOpen= request.getContextPath() + "/webclient/applets/printjobspoolernew.jsp";
%>				<finalscript>
					var urlStartingFromContext="<%=request.getContextPath()%>"+"/ui";
					var docURL = document.URL;
					var n =docURL.indexOf(urlStartingFromContext);
					var baseUrl=docURL.substring(0,n);	
					if(baseUrl==null)
						baseUrl="";
						var winURL=baseUrl+"<%=urlToOpen%>"+"?baseUrl="+baseUrl+"&amp;ibmdirectprintkey="+"<%=session.getAttribute("rptParmKey")%>";
						printW = window.open(winURL,"",'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,left=450,top=350,width=30,height=10');
						printW.resizeTo(500,350);
						printW.focus();
				</finalscript>
		
<%			}
			else
			{
				String reportType=(String) reportParams.get("reportType");			
				session.setAttribute("reportParams", reportParams);
				session.setAttribute("reportType", reportType);
%>				<component id='<%=id%>_holder'><![CDATA[<script>
				var urlStartingFromContext="<%=request.getContextPath()%>"+"/ui";
				var docURL = document.URL;
				var n =docURL.indexOf(urlStartingFromContext);
				var baseUrl=docURL.substring(0,n);
				if(baseUrl==null)
					baseUrl="";
				var win = window.open(baseUrl+"<%=request.getContextPath()%>/webclient/common/openreport.jsp","",'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,left=450,top=350,width=30,height=10');
				win.resizeTo(500,350);
				win.focus();
				</script>]]></component>
<%			}
		}
		else
		{
			String reportType=(String) reportParams.get("reportType");			
			session.setAttribute("reportParams", reportParams);
			session.setAttribute("reportType", reportType);
			
			String targetValue = reportType;
			if (targetValue == null) targetValue = "DefaultTarget";
			targetValue += wcs.getUISessionID();
			System.out.println("Target value"+targetValue);
%>			<component id='<%=id%>_holder'><![CDATA[<script>

				var urlStartingFromContext="<%=request.getContextPath()%>"+"/ui";
				var docURL = document.URL;
				var n =docURL.indexOf(urlStartingFromContext);
				var baseUrl=docURL.substring(0,n);
				if(baseUrl==null)
					baseUrl="";
				var win = window.open(baseUrl+"<%=request.getContextPath()%>/webclient/common/openreport.jsp",decodeURIComponent("<%=URLEncoder.encode(targetValue)%>"));
			win.focus();
			</script>]]></component>
<%		}
	}%>

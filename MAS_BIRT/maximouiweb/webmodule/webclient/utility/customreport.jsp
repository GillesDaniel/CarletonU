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
<%@ page language="java" %>
<%@ page contentType="text/html; charset=utf-8" %>

<%--
The ReportEncryption class is required for decrypting passwords.  It is included in encrypt.jar, 
which should be taken from <maximo>\reports\eri and made available to the 
web application running this JSP file (for example by placing it in the WEB-INF\lib directory).
--%>
<%@ page import="psdi.util.ReportEncryption,psdi.util.HTML" %>


<%
response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
response.setHeader("Pragma","no-cache"); //HTTP 1.0
response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
%>

<%
	String reportFile=null;
	String reportDesc=null;	
	String reportFolder=null;
	String reportType=null;
	String userName=null;
	String password=null;
	String ParmUserName=null;
	String ParmPassword=null;
	String mroDBType=null;
	String schema=null;
	String where=null;
	String mroOrg=null;
	String mroSite=null;
	String baseTable=null;
	String appname=null;
	String mroLangCode=null;
	String locale=null;
	String localTZ=null;
	String customserverURL=null;
	String customrptServerLogonPass=null;
	
	
	String reportFileTemp = HTML.decode((String)request.getParameter("reportFile"));
	if(reportFileTemp != null)
		reportFile = HTML.securitySafeWithHTMLEncoding(reportFileTemp);
	String reportDescTemp = HTML.decode((String)request.getParameter("reportDesc"));
	if(reportDescTemp != null)
		reportDesc = HTML.securitySafeWithHTMLEncoding(reportDescTemp);	
	String reportFolderTemp = HTML.decode((String)request.getParameter("reportFolder"));
	if(reportFolderTemp != null)
		reportFolder = HTML.securitySafeWithHTMLEncoding(reportFolderTemp);
	String reportTypeTemp = HTML.decode((String)request.getParameter("reportType"));
	if(reportTypeTemp != null)
		reportType = HTML.securitySafeWithHTMLEncoding(reportTypeTemp);
	String userNameTemp = HTML.decode((String)request.getParameter("userName"));
	if(userNameTemp != null)
		userName = HTML.securitySafeWithHTMLEncoding(userNameTemp);
	String passwordTemp = HTML.decode((String)request.getParameter("maxPass"));
	if(passwordTemp != null)
		password = HTML.securitySafeWithHTMLEncoding(passwordTemp);
	String ParmUserNameTemp = HTML.decode((String)request.getParameter("ParmUserName"));
	if(ParmUserNameTemp != null)
		ParmUserName = HTML.securitySafeWithHTMLEncoding(ParmUserNameTemp);
	String ParmPasswordTemp = HTML.decode((String)request.getParameter("ParmPassword"));
	if(ParmPasswordTemp != null)
		ParmPassword = HTML.securitySafeWithHTMLEncoding(ParmPasswordTemp);
	String mroDBTypeTemp = HTML.decode((String)request.getParameter("mroDBType"));
	if(mroDBTypeTemp != null)
		mroDBType = HTML.securitySafeWithHTMLEncoding(mroDBTypeTemp);
	String schemaTemp = HTML.decode((String)request.getParameter("schema"));
	if(schemaTemp != null)
		schema = HTML.securitySafeWithHTMLEncoding(schemaTemp);
	String whereTemp = HTML.decode((String)request.getParameter("where"));
	if(whereTemp != null)
		where = HTML.securitySafeWithHTMLEncoding(whereTemp);
	String mroOrgTemp = HTML.decode((String)request.getParameter("mroOrg"));
	if(mroOrgTemp != null)
		mroOrg = HTML.securitySafeWithHTMLEncoding(mroOrgTemp);
	String mroSiteTemp = HTML.decode((String)request.getParameter("mroSite"));
	if(mroSiteTemp != null)
		mroSite = HTML.securitySafeWithHTMLEncoding(mroSiteTemp);
	String baseTableTemp = HTML.decode((String)request.getParameter("baseTable"));
	if(baseTableTemp != null)
		baseTable = HTML.securitySafeWithHTMLEncoding(baseTableTemp);
	String appnameTemp = HTML.decode((String)request.getParameter("appname"));
	if(appnameTemp != null)
		appname = HTML.securitySafeWithHTMLEncoding(appnameTemp);
	String mroLangCodeTemp = HTML.decode((String)request.getParameter("mroLangCode"));
	if(mroLangCodeTemp != null)
		mroLangCode = HTML.securitySafeWithHTMLEncoding(mroLangCodeTemp);
	String localeTemp = HTML.decode((String)request.getParameter("locale"));
	if(localeTemp != null)
		locale = HTML.securitySafeWithHTMLEncoding(localeTemp);
	String localTZTemp = HTML.decode((String)request.getParameter("localTZ"));
	if(localTZTemp != null)
		localTZ = HTML.securitySafeWithHTMLEncoding(localTZTemp);
	String customserverURLTemp = HTML.decode((String)request.getParameter("customserverURL"));
	if(customserverURLTemp != null)
		customserverURL = HTML.securitySafeWithHTMLEncoding(customserverURLTemp);
	String customrptServerLogonPassTemp = HTML.decode((String)request.getParameter("customrptServerLogonPass"));
	if(customrptServerLogonPassTemp != null)
		customrptServerLogonPass = HTML.securitySafeWithHTMLEncoding(customrptServerLogonPassTemp);

	// Decrypt passwords
	try	
	{
		// Database password
		ParmPassword = ReportEncryption.decrypt(ParmPassword, true);
		// User password
		password = ReportEncryption.decrypt(password, true);
		// Custom report server password
		if (!customrptServerLogonPass.equals(""))
		{
			customrptServerLogonPass = ReportEncryption.decrypt(customrptServerLogonPass, true);
		}
	}
	catch (Exception e)
	{
		System.out.println(e.getMessage());
	}
%>

<html>
<head>
<title>Maximo Custom Report Integration</title>
</head>
<body>	
<p>
<h4>The table below displays the standard values passed as request parameters from Maximo.  
Additional values may be passed in the following ways:</p><p>

Maximo System Properties</h4>
All customer-defined properties having names beginning with <i>mxe.report.custom</i> will
be passed as parameters to this page.  The request parameter name will be the word custom 
prepended to the last segment of the property name.  For example, a property named:<br>
&#160;&#160;&#160;mxe.report.custom.databasename<br>
would be accessed as follows (Note that HTML.cleanHtml does not take null value, check the source .jsp file for example):<br>
&#160;&#160;&#160;String dbName = HTML.cleanHtml(HTML.decode((String)request.getParameter("customdatabasename")), false);</p><p>

<h4>Report parameters</h4>
All report parameters will be passed.  The value in the Parameter Name field in the report definition will 
be used as the request parameter name. For example, the location parameter from Summary of Asset Failures
would be accessed as follows (Note that HTML.cleanHtml does not take null value, check the source .jsp file for example):<br>
&#160;&#160;&#160;String loc = HTML.cleanHtml(HTML.decode((String)request.getParameter("location")), false);<br>
If the parameter is bound, it will also be included in the where clause so the individual value may not be 
needed, but it is always available.</p>

<h4>Standard Maximo values</h4>
<table rules="all" cellpadding="3">
<tr><td>Report File Name</td><td><%=reportFile%></td></tr>
<tr><td>Report Description</td><td><%=reportDesc%></td></tr>
<tr><td>Report Folder</td><td><%=reportFolder%></td></tr>
<tr><td>Report Type</td><td><%=reportType%></td></tr>
<tr><td>Maximo User Name</td><td><%=userName%></td></tr>
<tr><td>Maximo Password</td><td><i>See file source for details</i></td></tr>
<tr><td>Database User Name</td><td><%=ParmUserName%></td></tr>
<tr><td>Database Password</td><td><i>See file source for details</i></td></tr>
<tr><td>Schema</td><td><%=schema%></td></tr>
<tr><td>Maximo Where Clause</td><td><%=where%></td></tr>
<tr><td>User Org</td><td><%=mroOrg%></td></tr>
<tr><td>User Site</td><td><%=mroSite%></td></tr>
<tr><td>App Main Table</td><td><%=baseTable%></td></tr>
<tr><td>App Name</td><td><%=appname%></td></tr>
<tr><td>Language Code</td><td><%=mroLangCode%></td></tr>
<tr><td>Locale</td><td><%=locale%></td></tr>
<tr><td>User's Local Timezone</td><td><%=localTZ%></td></tr>
<tr><td>Report Server URL</td><td><%=customserverURL%></td></tr>
<tr><td>Report Server Password</td><td><i>See file source for details</i></td></tr>

</body>
</html>

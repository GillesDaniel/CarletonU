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
--%><%
%><%@page import="java.net.URLEncoder"
%><%@page import="com.ibm.json.java.JSONArray"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@page import="psdi.webclient.system.controller.LabelCache"
%><%@page import="psdi.webclient.system.controller.LabelCacheMgr"
%><%@page import="psdi.webclient.system.runtime.WebClientConstants"
%><%@page import="psdi.server.MXServer"
%><%@page import="psdi.webclient.system.dojo.Dojo"
%><%@include file="../common/simpleheader.jsp"
%><%@include file="../common/reportrunner.jsp"
%><%@page import="psdi.util.CipherPlusBase64"
%><%

HashSet allowedApps = wcs.getMXSession().getProfile().getApps();
boolean opDashboardReadAccess = (allowedApps!=null && allowedApps.contains("OPDASHBOARD"));
boolean startCenterReadAccess = (allowedApps!=null && allowedApps.contains("STARTCNTR"));
boolean debugHiddenFrame = (debug && Boolean.parseBoolean(WebClientRuntime.getWebClientProperty("debughiddenframe", "false")));
boolean hideSetModESigKey = "1".equals(WebClientRuntime.getWebClientSystemProperty("mxe.webclient.hideModEsigKey", "0"));
boolean allowInSubFrame = true;
boolean mobileDatePicker = ismobile;
String sessionid = wcs.getUISessionID();
String sessionUrlParam = wcs.getUISessionUrlParameter();
String presentationid = app.getId();
boolean everyplace = WebClientRuntime.getWebClientRuntime().hasLicenseAccess("EVERYPLACE");
String userLocale = s.getUserInfo().getLocale().getLanguage();
String viewportSize = app.getProperty("viewport");
String viewportWidth = "0";
String viewportHeight = "0";
String addFocusTitles = WebClientRuntime.getWebClientSystemProperty("mxe.webclient.a11y.addFocusTitleListeners");
java.util.Locale locale = new java.util.Locale(userLocale);
String datePattern=MXFormat.getDatePattern(locale);
String timePattern=MXFormat.getTimePattern(locale);
String dateTimePattern = MXFormat.getDateTimePattern(locale);
Boolean simpledomainDownload = WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_SIMPLEDOMAINDOWNLOAD, "1").equals("1");
Boolean clientDataValidation = app.isAsyncEnabled() && WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_CLIENTDATAVALIDATION, "0").equals("1");
Boolean systemNavBar = wcs.showSystemNavBar(currentPage);
String bodyRole = WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_BODY_ARIAROLE, "main");
String maximoJSDirectory = Dojo.getMaximoJavascriptDirectory(request);
boolean newApplinking = app.inAppLinkMode();
int applinkDivs = 0;
int xIndex = viewportSize.indexOf('x');
String filePromptText = WebClientRuntime.getWebClientSystemProperty("mxe.doclink.usefileprompt", "0");
String labelOrientation = request.getParameter("label-orientation");
if(!WebClientRuntime.isNull(labelOrientation)){
  wcs.setLabelOrientation(labelOrientation);
}
boolean vertLabels = wcs.useVerticalLabels();
int workflowPixelsPerNode = new Integer(WebClientRuntime.getWebClientSystemProperty("mxe.webclient.wfdesigner.pixelsPerNode", "80")).intValue();
if(xIndex!=-1)
{
	viewportWidth  = viewportSize.substring(0,xIndex);
	viewportHeight = viewportSize.substring(xIndex+1);
}
String skinName = wcs.getSkinName();
int baseMobileFontSize = Integer.parseInt(WebClientRuntime.getWebClientProperty("mxe.webclient.mobileFontSize","11"));
String presentationMobileFontSize = app.getProperty("mobile-font-size");
if(presentationMobileFontSize.equals("")){
	presentationMobileFontSize = Integer.toString(baseMobileFontSize);
}
if(ismobile){
	String mobileSkin = WebClientRuntime.getWebClientSystemProperty("mxe.webclient.mobileSkin", "iot18");
	//Mobile apps will always use the mobile skin.
	if(!mobileSkin.equals("mobile")){
		skinName = "mobile/"+mobileSkin;
	}
	else {
		skinName = mobileSkin;
	}
	app.setSkin(skinName);
}
else{	//Otherwise if a skin is defined for the presentation that will be used.
	app.setSkin(app.getProperty("skin"));
}
wcs.applySkin();
skin = wcs.getSkin();
String maximoJSSkinDirectory = (skinName.equals("") || skinName.equals("classic"))?"/javascript/"+maximoJSDirectory:"/"+skin+"css/../js/";
IMAGE_PATH = "";
CSS_PATH = wcs.getCssURL();
int tableButtonPlacement = Integer.parseInt(WebClientRuntime.getWebClientProperty("mxe.webclient.tableButtonPlacement","1"));

boolean debugDojo = "1".equals(WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_DOJO_DEBUG, "false")) || "1".equals(request.getParameter("debugDojo"));

String cssFile = component.getProperty("cssfile");
if(rtl)
{
	cssFile = "RTL"+cssFile;
}
app.getHotkeys().reset();
request.setAttribute(WebClientSessionManager.UISESSIONID, sessionid);
boolean rerender = (designmode && component.needsRender() && hiddenFrame);
if(component.needsRender())
{
  String outerApplication = (String)request.getParameter("embedded-in");
  if(!WebClientRuntime.isNull(outerApplication)){
    wcs.setOuterApplication(outerApplication);
  }
	String messagePrefix = (String)request.getParameter("embedded-message-prefix");
  if(!WebClientRuntime.isNull(messagePrefix)){
    wcs.setEmbeddedMessagePrefix(messagePrefix);
  }
  outerApplication = wcs.getOuterApplication();
	String apptitle = control.getWebClientSession().getCurrentApp().getAppTitle();
	if(!rerender)
	{
		if(BidiUtils.isBidiEnabled())
		{

			String[] bidiTagAttributes = {"","",""};
			bidiTagAttributes = BidiClientUtils.getTagAttributes(null,null,apptitle,false);
			if(bidiTagAttributes[2] != null && bidiTagAttributes[2].length() > 0)
			{
				apptitle = BidiUtils.enforceBidiDirection(apptitle,bidiTagAttributes[2]);
			}
		}
//HTML 5 doctype
%><!DOCTYPE html>
<html lang="<%=langcode.toLowerCase()%>">
	<head>
		<meta http-equiv="imagetoolbar" content="no"/>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
		<meta http-equiv="Content-Script-Type" content="text/javascript"/>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<%  if(ismobile || skinName.indexOf("mobile") > -1){%><style>html { font-size: <%=presentationMobileFontSize%>px; }</style><%}
	if(rtl) //viewport not well supported for bidi settings by mobile browsers
	{
		if(wcs.getUserAgent()!=WebClientSession.AGENT_SAFARI) {
		//rtl on safari ios6 is having issues when yo ufocus on a field. (scrolls to incorrect location)
		// We have decided to not set a viewpport in ios at this time to solve this problem until ios fixes it.
	%>	<meta name="viewport" content="initial-scale=1.0"/>
	<%	}
	}
	else
	{
		String viewportMeta = app.getProperty("viewport-meta");
%>		<meta name="viewport" content="<%=viewportMeta%>"/>
<%	}
String imageURL = wcs.getImageURL().replace("..","");
if(rtl && imageURL.indexOf("/rtl")==-1){
    imageURL += imageURL.endsWith("/")?"rtl/":"/rtl/";
}
%>		<meta name="format-detection" content="telephone=no"/>
		<base href="<%=wcs.getMaximoRequestContextURL()%><%=imageURL%>" target="_self"/>
		<% 	boolean useabsimgpath = Boolean.parseBoolean(WebClientRuntime.getWebClientProperty("webclient.useabsoluteimagepath"));
			if(useabsimgpath==true) { %>
				<script>
					var loc = String(document.location);
					if(loc.indexOf("/ui/")==-1) {
						window.location= "<%=request.getRequestURL()%>";
					}
				</script>
		<%	} %>
		<title><%=apptitle %></title>
		<link rel="stylesheet" type="text/css" href="<%=servletBase%>/javascript/<%=dojoDirectory%>/dojo/resources/dojo.css"/>
		<link rel="stylesheet" type="text/css" href="<%=servletBase%>/javascript/<%=dojoDirectory%>/dojox/html/resources/ellipsis.css"/>
		<link rel="stylesheet" type="text/css" href="<%=servletBase%>/javascript/<%=dojoDirectory%>/dijit/themes/tundra/tundra.css"/>
		<link id="csslink1" rel="stylesheet" type="text/css" href="<%=servletBase%>/<%=skin%>css/<%=cssFile%>"/>
		<link id="csslink2" rel="stylesheet" type="text/css" href="<%=servletBase%>/skins/hc.css"/>
<%
	if(mobileDatePicker)
	{
%>		<link id="datecsslink" rel="stylesheet" type="text/css" href="<%=servletBase%>/<%=skin%>css/datepicker.css"/>
<%	}
%>		<link rel="shortcut icon" href="<%=servletBase%>/<%=skin%>images/<%=app.getProperty("favoriteicon")%>?v2"/>
		<link rel="apple-touch-icon" href="<%=servletBase%>/<%=skin%>images/<%=app.getProperty("appleicon")%>?v2"/>
<%@ include file="../common/imagepreload.jsp" %>
		<script>
			if (self == top) {
				let queries=window.location.search
				if(!new URLSearchParams(queries).has("ignoreRedirect") && !sessionStorage.ignoreRedirect){
					let split  = (window.location.pathname || "").split("/")
					let contextPath = split.length >=1 ? split[1] : "maximo";
					let graphiteUrl = "/oslc/graphite/manage-shell/index.html"+queries;
					let separator = graphiteUrl.indexOf("&")==-1 ? "?" : "&";
					graphiteUrl = graphiteUrl.includes("uisessionid") ? graphiteUrl : graphiteUrl+separator+"uisessionid="+<%=sessionid%>;
						// when 'ui' shows up as the context, it means we don't have one
						if (contextPath !== 'ui') {
						// if we have a context then append it
						graphiteUrl = "/"+contextPath+graphiteUrl
					}

					//redirect to shell since we are not inside iframe with all query params
					window.location = graphiteUrl;
				}
                else {
                    sessionStorage['ignoreRedirect'] = true;
                }
			}
		</script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>constants.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>prototype.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>browser_library.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>menus.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>navsection.js"></script>
    	<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>scrollbars.js"></script>
<%
	if(BidiUtils.isBidiEnabled())
	{
%>		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>bidi_library.js"></script>
<%	}
%>		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>library.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>maximo-shell-communicator.min.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>masheader_communication.js"></script>
<%if(accessibilityMode){%>
    <script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>accessibleTitles.js"></script>
<%}%>
		<script type="text/javascript" src="<%=servletBase%><%=maximoJSSkinDirectory%>skinlibrary.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>async.js"></script>
<%	if(mobileDatePicker)
	{
%>		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>datepicker.js"></script>
<%	}
%>		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>designer.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>wfdesign.js"></script>
<%	if(!designmode)
	{ %>
<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>sessiontimer.js"></script>
<%	}
  int labelStyle = 1; //always vertical
	int dynamicFontSize = 0;
	String labelCssFile = "labels-horizontal.css";
	if(skinName.indexOf("mobile") > -1) {
		dynamicFontSize = 1;
	}
	if(dynamicFontSize != 0){
		switch(labelStyle){
			case 1:
				labelCssFile = "labels-vertical.css";
				break;
			case 2:
				labelCssFile = "labels-dynamic.css";
				break;
		}
		%>
		<link id="labelcsslinkdynamic" rel="stylesheet" type="text/css" href="<%=servletBase%>/<%=skin%>css/dynamic-base.css"/>
		<link id="labelcsslink" rel="stylesheet" type="text/css" href="<%=servletBase%>/<%=skin%>css/<%=labelCssFile%>"/><%
	}
	else {
		if (labelStyle != 1)
		{
			labelCssFile = "labels-dynamic-fixedFont.css";
			%><link id="labelcsslink" rel="stylesheet" type="text/css" href="<%=servletBase%>/<%=skin%>css/<%=labelCssFile%>"/><%
		}
	}
  if(accessibilityMode){%>
    <link id="accessiblecsslink" rel="stylesheet" type="text/css" href="<%=servletBase%>/skins/accessible.css"/>
    <%}%>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>dataproxy.js"></script>
		<script type="text/javascript">
			var highContrast = false;
			var clientAreaId = "";
			var SYSTEMNAVBAR = <%=wcs.showSystemNavBar(currentPage)%>;
			<%
				String nextGenURL = WebClientRuntime.getWebClientSystemProperty("mxe.x_context","");
				String webAppURL = WebClientRuntime.getWebClientSystemProperty("mxe.oslc.webappurl");
				if(nextGenURL.indexOf("http")==-1){
					nextGenURL = WebClientRuntime.getWebClientRuntime().getWebClientSession(request).getMaximoBaseURL() + nextGenURL;
				}
			%>
			var webAppUrl = "<%=webAppURL%>";
			var nextGenUrl = "<%=nextGenURL%>";
			document.title="<%=apptitle%>";
			isBidiEnabled = <%=BidiUtils.isBidiEnabled()%>;
			var APP_KEY_LABEL = "<%=app.getKeyLabel()%>";
			var IMAGE_PATH="<%=IMAGE_PATH%>";
			var MAINDOC=document;
			var addFocusTitles = <%=!"false".equals(addFocusTitles)%>;
			// No more hidden document, so set it to current document for backwards compatibility.
			var HIDDENDOC=document;
			var IFRAMEPAGE = "<%=wcs.getMaximoRequestContextURL() + "/ui/maximo.jsp?" + sessionUrlParam + (designmode ? "&designmode=true" : "")%>";
<%			String XHRAction = wcs.getMaximoRequestContextURL()+"/ui/maximo.jsp";
      Stack appStack = control.getWebClientSession().getAppStack();
			if(wcs.getTipPortalMode())
				XHRAction = wcs.getProxyRequestContextURL()+"?hiddenform=true&" + sessionUrlParam;
%>			var XHRACTION = "<%=XHRAction%>";
<%
			String PORTLETACTION = wcs.getMaximoRequestContextURL()+"/webclient/components/portletrenderer.jsp?" + sessionUrlParam;
			if(wcs.getTipPortalMode())
				PORTLETACTION = wcs.getProxyRequestContextURL()+"/webclient/components/portletrenderer.jsp?hiddenform=true&" + sessionUrlParam;

%>			var PORTLETACTION = "<%=PORTLETACTION%>";
            var USEFILEPROMPT = "<%=filePromptText%>";
            var VERTLABELS = "<%=vertLabels%>";
            var WFPIXELS = "<%=workflowPixelsPerNode%>";
			var APP_STACK_SIZE = <%=appStack.size()%>;
			var DESIGNMODE=<%=designmode%>;
			var APPTARGET="<%=app.getId()%>";
			var DEBUGLEVEL = <%=debuglevel%>;
			var SCREENREADER = <%=accessibilityMode%>;
			var DATE_PATTERN = "<%=datePattern%>";
			var TIME_PATTERN = "<%=timePattern%>";
			var DATE_TIME_PATTERN = "<%=dateTimePattern%>";
			var SELECT_VALUE = "<%=wcs.getMessage("jspmessages","selectValueButton")%>";
			var WEBREPLAY = <%=wcs.isWebReplayEnabled()%>;
			var FOCUSDELAY = 300;
			var EMBEDDED_MESSAGE_PREFIX = "<%=wcs.getEmbeddedMessagePrefix()%>";
			var EMBEDDED_RETURN_DATA;
			var OUTER_APPLICATION = <% if(wcs.getOuterApplication() == null){%>null<%}else{%>"<%=wcs.getOuterApplication()%>"<%}%>
			var UNLOAD_WARN = "<%=wcs.getMessage("ui","unload")%>";
			var TODAY = "<%=wcs.getMessage("scheduler","Today")%>";
			var SKIN = "<%=skin%>";
			var USERLOCALE="<%=userLocale%>";
			var MSG_BTNCLOSE = <%=wcs.MSG_BTNCLOSE%>;
			var MSG_BTNOK = <%=wcs.MSG_BTNOK%>;
			var MSG_BTNCANCEL = <%=wcs.MSG_BTNCANCEL%>;
			var MSG_BTNYES = <%=wcs.MSG_BTNYES%>;
			var MSG_BTNNO = <%=wcs.MSG_BTNNO%>;
			var MSGBOX_TITLE = "<%=wcs.getMessage("ui","msgboxtitle")%>";
			var EXCEPTION_NONE          = <%=BaseInstance.EXCEPTION_NONE %>;
			var EXCEPTION_WARNING       = <%=BaseInstance.EXCEPTION_WARNING %>;
			var EXCEPTION_ERROR         = <%=BaseInstance.EXCEPTION_ERROR %>;
			var EXCEPTION_YESNOCANCEL   = <%=BaseInstance.EXCEPTION_YESNOCANCEL %>;
			var EXCEPTION_REQUIREDFIELD = <%=BaseInstance.EXCEPTION_REQUIREDFIELD %>;
			var EXCEPTION_INFO          = <%=BaseInstance.EXCEPTION_INFO %>;
			var REQUESTTYPE_ASYNC     = "<%=WebClientSession.RequestType.ASYNC.toString()%>";
			var REQUESTTYPE_HIGHASYNC = "<%=WebClientSession.RequestType.HIGHASYNC.toString()%>";
			var REQUESTTYPE_SYNC      = "<%=WebClientSession.RequestType.SYNC.toString()%>";
			var REQUESTTYPE_SYNC_WAIT = "<%=WebClientSession.RequestType.SYNC.toString()%>_WAIT";
			var REQUESTTYPE_NORENDER  = "<%=WebClientSession.RequestType.NORENDER.toString()%>";
			var REQUESTTYPE_NONE      = "none";
      var CLEAR_SEARCH = null;
			var REQUESTTYPE_DEFAULT   = "default";
			var HOME_LINK_TEXT = "<%=wcs.getMessage("ui","homelinktext")%>";
			var OPDASHBOARD_LINK_TEXT = "<%=wcs.getMessage("ui","opdashboardlinktxt")%>";
			var REQUESTTYPE = "<%=WebClientSession.REQUESTTYPE%>";
			var JAVASCRIPT_BASE = "<%=servletBase%>/javascript/<%=dojoDirectory%>/";
			var DEBUG_DOJO = <%=debugDojo%>;
      var QUERY_DROPDOWN = <%=Boolean.valueOf(WebClientRuntime.getWebClientProperty("mxe.webclient.showQueriesInDropdown","true")).booleanValue()%>;
			var SERVER_UPDATE_WARN="<%=wcs.getMessage("async","server_update_field")%>";
			var SERVER_UPDATE_BUTTON="<%=wcs.getMessage("async","server_update_insert")%>";
			var SERVER_CLEAR_WARN="<%=wcs.getMessage("async","server_update_field_clear")%>";
			var SERVER_CLEAR_BUTTON="<%=wcs.getMessage("async","server_update_clear")%>";
			var CONTAINER_ERROR_ICONS = <%=wcs.getContainerErrorIconJSON().serialize()%>;
			var MAX_LENGTH="<%=wcs.getMessage("system","maximumlength")%>";
			var OPDASHBOARDACCESS=<%=opDashboardReadAccess%>;
			var STARTCENTERACCESS=<%=startCenterReadAccess%>;			
			var menus;
			var NAV_SECTION = false;
			var topLevelMenus = new Array();
			var saveUnlocked = <%=((AppBean)app.getAppBean()).canSaveBasedOnLocks()%>;
			var EXPANDED="<%= wcs.getMessage("ui","expanded")%>";
			var COLLASED="<%= wcs.getMessage("ui","collapsed")%>";
			var ACTIONS="<%= wcs.getMessage("ui","actionsmx")%>";
			var NEWROW="<%= wcs.getMessage("ui","newrowmx")%>";
			<% 
			String uploadFailWarn = wcs.getMessage("ui","upldfailwarn");
        	String uploadFailReason = wcs.getMessage("ui","upldfailreason"); 
			%>
			var UPLOAD_FAIL_WARN = '<%=!uploadFailWarn.equals("ui/upldfailwarn")?uploadFailWarn:"Upload may have failed. Please confirm and retry if neccessary."%>';
			var UPLOAD_FAIL_REASON='<%=!uploadFailReason.equals("ui/upldfailreason")?uploadFailReason:"Upload failed for following reason: "%>';
		  var ACCESSIBLE_TITLES = false;
			<%if(accessibilityMode){%>
			var TEXT_ENTRY = " <%=wcs.getMessage("ui","textentry")%>";
			var NAV_MENU = "<%=wcs.getMessage("reports","birtmsgTitleNavigation")%>"+" <%=wcs.getMessage("ui","menu")%>";
			ACCESSIBLE_TITLES = <%=!Boolean.valueOf(WebClientRuntime.getWebClientProperty("mxe.webclient.screenReader.hideAccessibleTitles","false")).booleanValue()%>;
			var accessibleLabels = {
				"readonly":" <%=wcs.getMessage("ui","readonly")%>",
				"required":" <%=wcs.getMessage("ui","required")%>",
				"checked":" <%=wcs.getMessage("ui","checked")%>",
				"unchecked":" <%=wcs.getMessage("ui","unchecked")%>",
				"description":"<%=wcs.getMessage("ui","description")%>",
				"filter":"<%=wcs.getMessage("ui","filter")%>",
			};
			<%}%>
			var tpaeConfig = {
				extendedTooltipShowDelay: 1000,
				extendedTooltipHideDelay: 500,
				readOnlyMsg: "<%=wcs.getMessage("access","field")%>",
				hotKeyLabel: "<%=wcs.getMessage("ui","hotkey")%>",
				tabBreadCrumbs: true,
				clientDataValidation: <%=clientDataValidation%>,
				tableButtonPlacement: <%=tableButtonPlacement%>,
				validationOn: <%=WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_CLIENTDATAVALIDATION, "0").equals("1")%>,
				menuHideDelay : <%=WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_MENUHIDE_DELAY, "750")%>,
				clientEventQueue: {
					timeout: <%=WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_CLIENTEVENTQUEUETIMEOUT, "10000")%>,
<%					if(clientDataValidation)
					{
%>					threshold: <%=WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_CLIENTEVENTQUEUETHRESHOLD, "2")%>
<%					}
					else
					{
%>					threshold: 1
<%					}
%>				}
			};

			queueManager = new QueueManager({sessionid:decodeURIComponent("<%=URLEncoder.encode(sessionid)%>"), designmode:<%=designmode%>, threshold:tpaeConfig.clientEventQueue.threshold, timeout:tpaeConfig.clientEventQueue.timeout, csrftoken:'<%=wcs.getCSRFToken()%>'});
			/*
			*	Do images last so that special bindings done in inputs do not overwrite related field events for hover images
			* 	May wish to change all bindings in bindEvents to use dojo.connect in the future
			*/
			var eventBindObjects = new Array("a","div","input","button","select","span","textarea","fieldset","img","td","label");
			var LEAVE_TIMEOUT = <%=WebClientRuntime.getWebClientSystemProperty("mxe.webclient.exitcontexttimeout", "0")%>;
            var LEAVETOOLTIPOPEN = <%=MXFormat.stringToBoolean(WebClientRuntime.getWebClientProperty("mxe.webclient.leavetooltipopen", "0"))%>;
<%			if(!designmode)
			{
				String product;
				if(session.getAttribute("product") == null)
				{
					if(wcs.isMaximoOrTivoliBrand())
						product = wcs.getMessage("system","maximoproductname");
					else
						product = wcs.getMessage("system","nonmaximoproductname");

					session.setAttribute("product", product);
				}
				else
				{
					product = (String)session.getAttribute("product");
				}
				product += " - " + wcs.getAppDesc(wcs.getCurrentAppId());  //e.g Maximo - Purchase Orders or CCMDB - Service Desk
				String logOutPage = WebClientRuntime.getWebClientProperty("webclient.logoutpage");
				String maximoRequestURL = wcs.getMaximoRequestURL();
				String logOutUrl = null;
				if (logOutPage.indexOf("webclient/login/logout.jsp") != -1)
				{
					logOutUrl = wcs.getMaximoRequestContextURL() + "/webclient/login/logout.jsp?" +  sessionUrlParam;
				}
				else
				{
					// IJ33081: BEGIN: THE CALL "IDP URL LOGOUT" IS NOT HAPPENING WHEN THERE IS A SESSION TIMEOUT
					String separator = logOutPage.indexOf("?") > -1 ? "&" : "?";
					logOutUrl = new java.net.URL(new java.net.URL(maximoRequestURL), logOutPage).toString() + separator + sessionUrlParam;
					// IJ33081: END
				}
				if ("1".equals(WebClientRuntime.getWebClientSystemProperty(WebClientConstants.WEBCLIENT_CHECK_CSRF_LOGOUT))){
					logOutUrl += wcs.getCSRFTokenParameter();
				}
%>
			var PRODUCTNAME = "<%= product%>";
			SESSION_TIMEOUT = 0;
			<%if(control.getWebClientSession().getLightningPortalMode() == true){
				%>SESSION_TIMEOUT = -1;<%
			}%>
			timeUntilLogout=SESSION_TIMEOUT;//in seconds
			SESSION_WARNTIMEOUT = <%=Integer.parseInt(WebClientRuntime.getWebClientProperty("webclient.sessiontimeoutwarningtime","0"))*60%>;//in seconds.
			SESSIONRESETTHRESHHOLD = SESSION_TIMEOUT/3;//in seconds.
			var WARNTEXTMINS = "<%=wcs.getMessage("ui","warnbrowsersessiontimeout")%>";
			var WARNTEXTSECS = "<%=wcs.getMessage("ui","warnbrowsersessiontimeoutsecs")%>";
			var WARNLOSTCONNECTION =  "<%=wcs.getMessage("ui","warnlostconnection")%>";
			var WARNCONNECTIONRESTORED =  "<%=wcs.getMessage("ui","warnconnectionrestored")%>";
			var CONNECTIONRESTOREDBTNTEXT =  "<%=wcs.getMessage("messagebox", "MSG_BTNOK")%>";
			var WARNLOSTURL  = "<%=wcs.getMaximoRequestContextURL()+"/ui/" + System.currentTimeMillis() + "?checkhiddenandconnection=true&" + sessionUrlParam%>";
			var SHOWLOSTCONNECTIONWARNINGONLY = <%=designmode?"false":WebClientRuntime.getWebClientSystemProperty("mxe.webclient.lostconnectionwarningonly","false")%>;
			var CONNECTIONREDRAWURL  = "<%=wcs.getMaximoRequestContextURL()+ "/ui/maximo.jsp?event=render&targetid=" + presentationid + "&value=rerender&conectionwarningclosed=true&" + sessionUrlParam%>";
			CONNECTIONWARNINGINTERVAL = <%=Integer.parseInt(WebClientRuntime.getWebClientSystemProperty("mxe.webclient.lostconnectionwarninginterval","15"))*1000%>;//in milliseconds.
			CONNECTIONRECHECKINTERVAL = <%=Integer.parseInt(WebClientRuntime.getWebClientSystemProperty("mxe.webclient.lostconnectionrecheckinterval","2"))*1000%>;//in milliseconds.
			var ASYNCTOOLTIPWAITEBEFOREOPEN = <%=Integer.parseInt(WebClientRuntime.getWebClientSystemProperty("mxe.webclient.asyncerrortooltipwaitbeforeopen","2"))*1000%>;//in milliseconds.
			var ASYNCTOOLTIPUSERVALUE =  "<%=wcs.getMessage("messagebox","MSG_LBENTER")%>";
			var MAXRCURL = "<%=wcs.getMaximoRequestContextURL()%>";
			var TIMEOUTRESETURL = "<%=wcs.getMaximoRequestContextURL()+"/servlet/sessionservlet?resetsession=true&uisessionid="+sessionid%>";
			var LOGOUTURL = "<%= logOutUrl%>";
			var APPID = "<%=wcs.getCurrentAppId()%>";
            <% LabelCache syscache = LabelCacheMgr.getSystemLabelCache(wcs); %>
			function intializeMASHeader(){
				let config = window.getMasHeaderConfig();
                config.helpActions = [
                    {   id:"appHelpItem",
				        label: "<%=wcs.getMessage("jspmessages", "apphelpmx", new String[] { apptitle })%>",
				        clickAction: "sendEvent",
				        clickArgs: { type: "apphelp" }
				    }
                ];
            <%
						try {
	         		// Load the menu from the xml
							Element menuElement = WebClientRuntime.getWebClientRuntime().getLibraryDescriptor("menus", wcs).getElement("MASHELP");
							if (menuElement!=null) {
								NodeList menuitems = menuElement.getElementsByTagName("menuitem");
								for (int i = 0; i < menuitems.getLength(); i++)
								{
									Element itemElement = (Element)menuitems.item(i);
									NamedNodeMap nm = menuitems.item(i).getAttributes();
									String attributeString = "";
									for(int attributeIndex=0;attributeIndex<nm.getLength();attributeIndex++){
										Node attribute = nm.item(attributeIndex);
										attributeString+=attribute.getNodeName()+":\""+attribute.getNodeValue()+"\",";
									}
											%> config.helpActions.push({<%=attributeString%>
									clickAction: "callFunction",
													clickArgs: {
															functionName: "handleMASMenuItem",
															args: [{<%=attributeString%>}]
													}
									});<%
								}
							}
						} catch(Exception e){
							//ignore if error exists
							e.printStackTrace();
						}

					String adminMode = "";
					if (psdi.server.MXServer.getMXServer().isAdminModeOn(true)){
						adminMode = wcs.getMaxMessage("system", "EndAdminModeOn").getMessage();
						adminMode = adminMode.replaceAll("\\.", "");
						%> config.bannerTitle = "<%=adminMode%>";
					<% } else {
						adminMode = wcs.getMaxMessage("system", "EndAdminModeOff").getMessage();
						adminMode = adminMode.replaceAll("\\.", "");
						%> config.bannerTitle = "";
					<% } %>

                    config.profileActions = [
                    {
                        id:"personalMenuItem1",
                        label: "<%=syscache.getString("profiledefault", "label")%>",
                        clickAction: "sendEvent",
                        clickArgs: { type: "DEFAULT" },
                    },
                    {
                        id:"personalMenuItem2",
                        label: "<%=syscache.getString("profilepersonal", "label")%>",
                        clickAction: "sendEvent",
                        clickArgs: { type: "PERSONAL" },
                    },
					<% if(!hideSetModESigKey) { %>
                    {
                        id:"personalMenuItem4",
                        label: "<%=syscache.getString("profilemodesigkey", "label")%>",
                        clickAction: "sendEvent",
                        clickArgs: { type: "MODESIGKEY" },
                    } <% } %>
                ];
                config.headerActions = [
                    {
                        id:"Bulletin",
                        label: "<%=syscache.getString("bboardlink", "label")%>",
						count: "<%=currentPage.getCountForBBIcon()%>",
                        icon: "carbon:bullhorn",
                        clickAction: "callFunction",
						clickArgs: { 
							functionName: "sendHeaderEvent",
							args: [{eventType: 'showbboard',
									targetid: APPID,
									value: ''}]
						},
                    },
                    {
                        id:"Report",
                        label: "<%=syscache.getString("reportslink", "label")%>",
                        icon: "carbon:report",
                        clickAction: "callFunction",
						clickArgs: { 
							functionName: "sendHeaderEvent",
							args: [{eventType: 'showmenu',
									targetid: 'mainrec_menus',
									value: 'MASHEADER:reportsmenu'}]
						},
                    }
                ];
                config.hasSideNav = <%=!ismobile%>;
                config.sideNavProps = null;
				config.hideMenuButton = <%=ismobile%>;
                config.uisessionid = "<%=sessionid%>";
				changeMasHeader(config);
			}

			intializeMASHeader();
			var HOSTNAME = "<%=request.getServerName().trim()%>";
			var HOSTPORT = "<%=request.getServerPort()%>";
			var ALWAYSOPENATTACHMENTS = <%=MXFormat.stringToBoolean(WebClientRuntime.getWebClientProperty("mxe.webclient.alwaysopenattachments", "0"))%>;
<%			} //endif !designmode
			long pageSeqNumber = 1;
			AsyncRequestManager asyncManager = wcs.getAsyncRequestManager();
			if (asyncManager != null)
			{
				asyncManager.resetRequestSequenceNumber();
				pageSeqNumber = asyncManager.getNextPageRenderSeqNumber();
			}
%>			var PAGESEQNUM = "<%=pageSeqNumber%>";
			var UISESSIONID = decodeURIComponent("<%=URLEncoder.encode(sessionid)%>");
			var CSRFTOKEN = "<%=wcs.getCSRFToken()%>";
			var loadMethods = new Array;
			function addLoadMethod(method)
			{
				loadMethods.push(method);
			}
			var LIGHTNINGPORTALMODE=false;
      var PORTALMODE=false;
			<%if(wcs.getLightningPortalMode()){%>
				window.parent.postMessage({[EMBEDDED_MESSAGE_PREFIX+"ui-sessionid"]:"<%=sessionid%>"},'*');
				LIGHTNINGPORTALMODE=true;
			<%}%>
      <%if(!WebClientRuntime.isNull(wcs.getOuterApplication())){%>
				console.log('Using session id '+ "<%=sessionid%>");
				window.parent.postMessage({[EMBEDDED_MESSAGE_PREFIX+"ui-sessionid"]:"<%=sessionid%>"},'*');
				PORTALMODE=true;
			<%}
			String userData_name = HTML.encode(HTML.cleanHtml(s.getUserInfo().getUserName(), true, false));
			%>
			var USERNAME="<%=userData_name%>";
			var SECURE_USERNAME = "<%=CipherPlusBase64.encrypt(userData_name, true)%>";
			var USERLANG="<%=langcode%>";
			var MOBILE=<%=ismobile%>;
			var MOBILEAGENT = <%=wcs.isMobileUserAgent()%>;
			var MOBILEDATEPICKER=<%=mobileDatePicker%>;
			var OUTOFSEQERRORMSG="<%=wcs.getMessage("system", "outOfOrderReqTimeout")%>";
			var OUTOFSEQERRORRELOADBUTTON="<%=wcs.getMessage("system", "outOfOrderReloadButtonTxt")%>";
			var CONNECTIONERRORMSG="<%=WebClientRuntime.replaceString(wcs.getMessage("ui", "cannotconnect"), "\n", "<br/>")%>";
			var UNKNOWSERVERERRORMSG="<%=WebClientRuntime.replaceString(wcs.getMessage("ui", "unknowservererror"), "\n", "<br/>")%>";
			var PAGEID="<%=id%>";
			var clientDate = new Date().getTime();
			var clientTimer = <%=MXFormat.stringToBoolean(WebClientRuntime.getWebClientProperty(WebClientConstants.WEBCLIENT_USECLIENTTIMER, "0"))%>;
			var serverTZOffset = <%=s.getUserInfo().getTimeZone().getOffset(new Date().getTime())%>;
			var clientTZOffset = new Date().getTimezoneOffset() * 60 * 1000;
			var tzAdjustment = serverTZOffset + clientTZOffset;
			var systemDate = <%=new Date().getTime()%> + tzAdjustment;
			var NEW_APPLINK = false;
      var EMBEDDED = self !== top;
			var PROXYLOGINSTRINGCHECK = "<%=WebClientRuntime.getWebClientProperty(WebClientConstants.WEBCLIENT_PROXYLOGINSTRINGCHECK, "pkmslogin")%>";
      var navSearchString = "<%=wcs.getMessage("ui","navsearch")%>";
<%		if(mobileDatePicker)
		{
%>			var calDate = new Date();
<%		}
%>		var warnExit = <%="1".equals(WebClientRuntime.getWebClientSystemProperty("webclient.exitwarn", "1"))%>;
		addLoadMethod("hideURLbar();");
		addLoadMethod("stopDocScroll();");
		<%if(accessibilityMode){%>
		addLoadMethod("makeChildrenMoreAccessible();")
		<%}%>
		var INVALIDFILENAMEMSG="<%=WebClientRuntime.replaceString(wcs.getMessage("iface", "InvalidFileName"),"{0}","")%>";
<%
		if(clientDataValidation)
		{
			JSONArray domainList = new JSONArray();
			for(Map.Entry<String, DataStoreInfo> dataStoreEntry : app.getEntityRelationshipModel().getDataStoreList().entrySet())
			{
				DataStoreInfo dataStoreInfo = dataStoreEntry.getValue();
				if (simpledomainDownload || !dataStoreInfo.isSimpleDomain())
				{
					domainList.add(dataStoreInfo.getAsJSONForDownload());
				}
			}
%>			var TABLEDOMAINLIST = <%=domainList.serialize(debug)%>;
<%		}
%>		</script>
<%
		String dojoTextDirection = "";
		String dojoLocale;
		// Handle a few special cases where the Maximo language code needs a little massage to
		// be the correct dojo locale.
		if ("ZHT".equalsIgnoreCase(langcode))
			dojoLocale = "zh-tw";
		else if ("NO".equalsIgnoreCase(langcode))
			dojoLocale = "nb";
		else
			dojoLocale = langcode.toLowerCase().replace('_', '-');

		if(rtl)
		{
			dojoTextDirection = "dir=\"rtl\"";
		}
		int wraplength = Integer.parseInt(WebClientRuntime.getWebClientProperty("webclient.wraplength"));
		boolean wrapReadOnly = Boolean.valueOf(WebClientRuntime.getWebClientProperty("webclient.wrapreadonlycolumns","true")).booleanValue();
		if(wrapReadOnly && wraplength > 0){
			%><style> td.tc { white-space: normal !important; }</style><%
		}%>
		<script type="text/javascript">
			var djConfig =
			{
<%				if (debuglevel >= 3)
				{
%>					popup: true,
<%				}
%>				isDebug: <%=debugDojo && debuglevel >= 3%>,
				modulePaths: {
<%						if(Dojo.isDevelopmentBuild()) {
%>							'ibm':'../../ibm',
<%						}
%>							'com.ibm.mm':'/enabler/js/com/ibm/mm',
							'com.ibm.mashups':'/enabler/js/com/ibm/mm',
							'com.ibm.widgets':'/enabler/js/com/ibm/widgets'},
				parseOnLoad: false,
				locale: '<%=dojoLocale%>',
				extraLocale: ['<%=userLocale.toLowerCase().replace('_', '-')%>']
			};
			var DOJOLOCALE="<%=dojoLocale%>";
			var DOJOLOCALEFORDATEFORMAT = "<%=s.getUserInfo().getLocale().toString().toLowerCase().replace('_', '-')%>";
		</script>
<%	if (debugDojo)
	{
		// If we're in debug mode, load the uncompressed layers
%>		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=dojoDirectory%>/dojo/dojo.js.uncompressed.js"></script>
<%		for (String layer : Dojo.getDojoLayers("/webclient/javascript/" + dojoDirectory + "/layers/", request.getSession().getServletContext()))
		{
%>		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=dojoDirectory%>/layers/<%=layer%>"></script>
<%		}
	}
	else
	{
%>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=dojoDirectory%>/dojo/dojo.js"></script>
<%	}
		// We need to load window.js as it is used in the showwait() function in library.js.
%>		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=dojoDirectory%>/dojo/window.js"></script>
		<script type="text/javascript" src="<%=servletBase%>/javascript/<%=maximoJSDirectory%>dojo_library.js"></script>
		<script>
			window.addEventListener("message", function(e){
        //handle app wrapper messages
        // setup a post message function
				var postMsg = window.parent.postMessage || window.top.postMessage;			
				if(e.data['page-stack']){
					let breadCrumbs = document.querySelector('.text.bottomApp');
					if(breadCrumbs){
						let data = e.data['page-stack'];
						if(data.navigationType!=='none'){
							let crumbArray = Array.from(data.stack).reverse();
							crumbArray.shift();
							crumbArray.forEach((crumb, crumbIndex) => {
								let element = document.createElement(data.navigationType==='full'?'a':'span');
								element.innerText = crumb.title;
								element.tabIndex = '0';
								if(data.navigationType==='full'){
									element.href = 'Javascript: applinkReturnNoValue('+(crumbIndex+1)+')';
								}
								let span = document.createElement('span');
								span.innerText = '/';
								span.className = 'breadcrumbSep';
								breadCrumbs.insertBefore(span,breadCrumbs.firstElementChild);
								breadCrumbs.insertBefore(element,breadCrumbs.firstElementChild);
							});
						}
					}
				}
				if(e.data['close-tpae-iframe'] || e.data['close-embedded-app']){
					EMBEDDED_RETURN_DATA = e.data['close-tpae-iframe'];
					setValueForFocusChange();
					queueManager.appInfo().then(function(appInfo){
						let enableSave = false;
						if(appInfo){
							if(systemDialogShowing()){
								postMsg({[EMBEDDED_MESSAGE_PREFIX+'maximo-app-notification']:'contains-errors'},'*');
								postMsg({[EMBEDDED_MESSAGE_PREFIX+'app-error-notification']:'contains-errors'},'*');
							}
							else if(appInfo.exceptionmessage !== ''){ //should close messagebox
								postMsg({[EMBEDDED_MESSAGE_PREFIX+'maximo-app-notification']:appInfo.exceptionmessage},'*');
								postMsg({[EMBEDDED_MESSAGE_PREFIX+"inner-app-ready"]:true},'*');
								enableSave=true;
							}
							else if(appInfo.saveneeded === true || appInfo.haserrors === true){
								if(appInfo.haserrors === true){
									if(LIGHTNINGPORTALMODE){
										postMsg({[EMBEDDED_MESSAGE_PREFIX+'maximo-app-notification']:'contains-errors'},'*');										
									}
									postMsg({[EMBEDDED_MESSAGE_PREFIX+'app-error-notification']:'contains-errors'},'*');
									if(!LIGHTNINGPORTALMODE){
										sendEvent('cannotsave', APPTARGET, null);
									}
									enableSave=true;
								}
								else { //ASK IF USER WANTS TO SAVE
									window.parent.postMessage({[EMBEDDED_MESSAGE_PREFIX+"inner-app-ready"]:true},'*');
									if(LIGHTNINGPORTALMODE){
										postMsg({[EMBEDDED_MESSAGE_PREFIX+'maximo-app-notification']:'tpae-save-option'},'*');
									}
									else {
										sendEvent('closeembedded', APPTARGET, null);
									}
								}
							}
							else { //good to close
								postMsg({[EMBEDDED_MESSAGE_PREFIX+'close-tpae-iframe']:true},'*');
								postMsg({[EMBEDDED_MESSAGE_PREFIX+'close-embedded-iframe']:EMBEDDED_RETURN_DATA},'*');
							}
						}
						else {
							$M.toggleWait(false);
						}
						if(enableSave && tpaeConfig.validationOn){
							setTimeout(()=>{
								setButtonEnabled(saveButton,true);
							}, 300);
						}
					});
				}
				if(e.data['save-tpae']){
					queueManager.saveApp().then(function(e){
						window.setTimeout(function(){
							queueManager.appInfo().then(function(appInfo){
								if(appInfo.saveneeded !== true){
									postMsg({[EMBEDDED_MESSAGE_PREFIX+'close-tpae-iframe']:true},'*');
									postMsg({[EMBEDDED_MESSAGE_PREFIX+'close-embedded-iframe']:true},'*');
								}
								else {
									window.postMessage({'close-tpae-iframe':true},'*');
								}
							});

						}, 1000);
					});
				}
			}, false);

			var MAXRECENTAPPS = <%=WebClientRuntime.getWebClientSystemProperty("webclient.maxRecentApps", "8")%>;
			var RECENTAPPTEXT = "<%=wcs.getMessage("ui", "recentApps")%>";
			var tenantID = "<%if(WebClientRuntime.isMTEnabled()){%><%=WebClientRuntime.getMTtenantId()%><%}%>";
			<%	String appId = wcs.getCurrentAppId();
				if(app.getTrackInRecents() && !app.inAppLinkMode() && !wcs.getDesignmode()){%>
					addToAppCache({"text":"<%=apptitle%>","id":"recentApp_<%=appId%>","eventvalue":"<%=appId%>"});
			<%}%>
			var hebrew=false;
			var islamic=false;
			dojo.require('layers.mbs.popuplayer');
			dojo.addOnLoad(function() {
				if(dojo.isFF >= 4 || dojo.isFF==0){ //problem with 3.6 and dojox.html.ellipsis
					dojo.require("dojox.html.ellipsis");
				}
				dojo.require("ibm.tivoli.mbs.html");
				dojo.require("dojox.html.entities");
				dojo.require("dojo.number");
				dojo.require('dijit._base.popup');
				dojo.require('dijit.Tooltip');
				dojo.require('dojo.dnd.Moveable');
				dojo.require("dojo.dnd.move");
				dojo.require("dojo.fx");
				// Workaround to set the starting z index for dojo popups and tooltips above the maximo dialog.
				dojo.addOnLoad(dojohelper.fixPopupZIndex);
			});
		</script>
<%
		// In portal mode and designmode, don't put in the iframe busting code as we need to run in an iframe.
		if (!wcs.getPortalMode() && !allowInSubFrame && !designmode)
		{
%>			<style type="text/css">html { display:none }</style>
			<script>
				if (self == top) {
					document.documentElement.style.display = 'block';
				} else {
					top.location = self.location;
				}
			</script>
<%		}
	//Allows support of internal srolling in apps with navbar
	String scroll = component.getProperty("scroll");
	if(ismobile){
		scroll="true";
	}
	else if(systemNavBar)
	{
		scroll="false";
	}
	String overflow = "";
	if(scroll.equals("false") && !designmode)
	{
		scroll = " scroll='no' ";
		overflow = "overflow:hidden;";
	}
	else
	{
		scroll = " ";
	}
	boolean enableAutoComplete = Boolean.parseBoolean(WebClientRuntime.getWebClientProperty("mxe.webclient.enableautocomplete", "true"));
	bodyRole = "navigation";
%>	</head>
	<body <%=scroll%> data-designmode="<%=designmode%>" data-is-mobile="<%=ismobile%>" data-appid="<%=app.getId()%>"class="tundra<%if(app.getId().equals("startcntr")){%> scBody<%}%><%if(wcs.getLightningPortalMode()){%> lightning-portal<%}%><%if(accessibilityMode){%> screenReader<%}%>" data-applinking="<%if(newApplinking){%>true<%}else{%>false<%}%>"" <%=dojoTextDirection%> style="<%=overflow%>cursor:wait;padding:0px;margin:0px;height:100%;width:100%"
		data-a11y="<%=accessibilityMode%>" <%if(vertLabels){%>data-vertical-labels <%}%> <% if(designmode || app.getId().equals("designer")){%>oncontextmenu="return false;"<%}%>>
		<form <%if(!enableAutoComplete){%>autocomplete="off" <%}%> id="psuedoForm" aria-label="<%=wcs.getMessage("ui","mainform")%>" 
			action="<%=servletBase%>/maximo.jsp" method="post" onsubmit="return false"
			onkeypress="if(event.keyCode=='13' && getSourceElement(event).tagName!='TEXTAREA' && getSourceElement(event).tagName!='A'){if(event.preventDefault){ event.preventDefault(); }else{ event.returnValue = false;}}">
      <%if(Boolean.parseBoolean(WebClientRuntime.getWebClientProperty("mxe.webclient.customPageHeader", "false"))){%>
        <div class="mx--custom-header"><%@ include file="../customHeader/customHeaderPage.jsp" %></div>
      <%}%>
      <div class="appBreadCrumbs" <%if(!WebClientRuntime.isNull(bodyRole)){%> aria-label="<%=apptitle%>" role="<%=bodyRole%>"<%}%>>
	 	<script>
			if(browserSupportsLocalStorage()) {
				var dataString =  localStorage.getItem("tpaeInspectorData");
				if(dataString && dataString.length>0){
					var data = JSON.parse(dataString);
					if(data && data.inspectorURL){ //was run here
						require([data.inspectorURL, "dojo/domReady!"], function(inspector){
							window.setTimeout(function(){
								new inspector().startup(/*headless*/false, data.inspectorURL);
							}, 1000);
						});
					}
				}
			}
		</script>
<%!
/**
	If we are using the new style app linking, then return enough div's to close the apps, otherwise just an empty string
*/
public String getClosingDivs(boolean newApplinking, int applinkDivs)
{
	String rtnDivs="";
	if(newApplinking)
	{
		rtnDivs="</div>";
		for(int i=0;i<applinkDivs;i++)
		{
			rtnDivs+="</div>";
		}
	}
	return rtnDivs;
}
%>		
<%
if(newApplinking || !WebClientRuntime.isNull(outerApplication)) {
	Iterator appIterator = appStack.iterator();
	int appCount = 1; %>
		<script>NEW_APPLINK = true;</script>
		<div class="text bottomApp" style="clear:both;" >
        <%if(!WebClientRuntime.isNull(outerApplication)){
        String outerAppdescription = wcs.getAppDesc(outerApplication);
        %>
        <a id="<%=outerApplication%>" href="javascript: applinkReturnNoValue(0)">
						<%=outerAppdescription%> 
				</a><span class="breadcrumbSep">/</span><%}%>
		<% String appName = "";
			if(appIterator.hasNext())
			{
        AppInstance lastStackApp = null;
				while(appIterator.hasNext())
				{
   				AppInstance stackApp = (AppInstance) appIterator.next();
					String readonlyflag = null;
          if(lastStackApp != null){
            readonlyflag = (String) lastStackApp.get("returninputR/O");
          }
					boolean isReadOnly = ((readonlyflag != null) && ("true".equals(readonlyflag)));
					boolean last = !appIterator.hasNext();
          lastStackApp = stackApp;
          appName = stackApp.getAppTitle();
          String crumbId = stackApp.getId() + (app.getId().equals(stackApp.getId())?"_breadcrumb":"");
						if (!last)
						{%><a id="<%=crumbId%>" href="javascript: sendEvent('returntoapp',APPTARGET,<%=appCount%>)"><%=stackApp.getAppTitle()%></a><span class="breadcrumbSep">/</span>
						<%}
						else{%>
							</div>
              <% 
              String returnNoValue = wcs.getMessage("ui","returnapp",new String[] { appName });
              if(!accessibilityMode){
                returnNoValue = wcs.getMessage("ui","return");
              }

              String returnValue = wcs.getMessage("ui","returnvalueapp",new String[] { appName });
              if(!accessibilityMode){
                returnValue = wcs.getMessage("ui","returnvalue");
              }

              if(newApplinking || !WebClientRuntime.isNull(outerApplication)) {%>
						  <div id="retButtons" class="retButtons"><button type="button" id="<%=id%>_retBut" title="<%=returnNoValue%> ALT+R" onkeypress="if(event.key === 'Enter'){ event.target.click()}" onclick="applinkReturnNoValue(<%=last && appStack.size() == 1%>)">
                			<%=returnNoValue%></button>
							<% 
							  if (!isReadOnly && appCount>1)
							  { %><button type="button" id="<%=id%>_retValBut" title="<%=returnValue%> ALT+W" onkeypress="if(event.key === 'Enter'){ event.target.click()}" onclick="sendEvent('returnwithvalue',APPTARGET,'')">
  								<%=returnValue%></button><%
							  } %></div><%
						}}%>
					<%	applinkDivs++;
          appCount++;
				}
			}%>
      <script>addLoadMethod("addHotKey('ALT+W','<%=id%>_retValBut', '')");addLoadMethod("addHotKey('ALT+R','<%=id%>_retBut', '')");</script>
      	</div>
      </div>
			</div>
			<div id="pagecurrentappdiv" class="currentApp" style="clear:both;" role="main">
<% }
		if(wcs.getLightningPortalMode()){
			%><script>
			addLoadMethod("window.parent.postMessage({\"app-title\":\"<%=control.getWebClientSession().getCurrentApp().getAppTitle()%>\"},'*');");
			</script><%
		}
		if(designmode)
		{
%>			<div id="body_double">
<%		}
	}
	else	// else for if (!rerender) block
	{

		// gets executed when viewport is changed in designer (DesignerAppBean.setValue calls setRerenderFlags)
		// or when toggle viewport button is clicked
		if (designmode)
		{
			holderId = "body_double";
%><%@ include file="../common/componentholder_start.jsp" %>
	<script>
			setSkin('<%=servletBase%>/<%=skin%>css/<%=cssFile%>');

			parent.viewportHeight = <%= viewportHeight %>;
			parent.viewportWidth = <%= viewportWidth %>;
			viewportHeight = <%= viewportHeight %>;
			viewportWidth = <%= viewportWidth %>;

<%			if (currentPage.showViewport() && everyplace)
			{
%>				parent.showViewport();
<%			}
			else
			{
%>				parent.fadeViewport();
<%			}
		}
%>
	</script>
<%	}	// end else for if (!rerender) block

%>		<table id="menuholder" style="position:absolute;z-index:50000;top:0px;left:0px;display:inline;" role="presentation"><tr><td id="menuholdertd" width="100%" aria-live="assertive"></td></tr></table>
		<%-- used to remove select of text when item cannot take select DO NOT REMOVE --%><label for="tempselect" aria-hidden="true" style="display:none">TEMPSELECT</label><input type="text" id="tempselect" style="display:none" aria-hidden="true" <%if(accessibilityMode){%>tabindex="-1" <%}%>style="position:absolute;top:-1000px"/>
		<table id="<%=id%>" class="<%=cssclass%>" summary="" width="100%" <%if(!designmode){%>height="100%"<%}%> style="vertical-align:top;" role="presentation">
<%}  // end if(component.needsRender() block
boolean longOpRunning = wcs.hasLongOpStarted() && !wcs.hasLongOpCompleted();
if ( !component.skipRender()  && !longOpRunning)
{
	component.renderChildComponents();
}
%><%@ include file="../common/webreplay.jsp" %><%
if(component.needsRender())
{
%>	</table>
<%	// Bidi_BDL: PMR 54898,003,756: place the dialogholder element in viewport coordinates with left position defined, since dojo constrainedMoveable always operates as though a moveable is LTR
	String position = rtl ? "fixed" : "absolute";
%>	<table id="dialogholder" style="position:<%=position%>;top:0px;left:0px;" role="presentation">
		<tr>
			<td id="dialogholdertd" width="100%" aria-live="polite"></td>
			<td id="popupholdertd" width="100%" onClick="cancelBubble(event);" aria-live="polite" role="presentation"></td>
<%if (longOpRunning)
	{
		//long op is in progress so only want to render the the longop dialog
		PageInstance longOpWait = app.getCurrentPage();
		if (longOpWait.get("_longopPage") != null)
		{
			%><td><%
			((PageComponent)component).renderDialog(longOpWait, true);
			%></td><%
		}
	}
	else
	{
		for (int pageidx = 1; pageidx < app.getPageStack().size(); pageidx++)
		{
%>		<td aria-live="polite"><%
			PageInstance dialogPage = (PageInstance)app.getPageStack().get(pageidx);
			((PageComponent)component).renderDialog(dialogPage, true);
		%></td>
<%		}
	}
%>		</tr>
	</table>
<%		if(!designmode)
		{
			int timeOutWarning = Integer.parseInt(WebClientRuntime.getWebClientProperty("webclient.sessiontimeoutwarningtime","0"));
			if(timeOutWarning !=0 )
			{
				%><%@ include file="timeoutwarning.jsp" %><%
			}
		}
%>		<div id="wait" width="100%" height="100%" class="wait" style="position:absolute;top:0px;<%=defaultAlign%>:0px;height:100%;width:100%">
		    <div class="bx--loading-overlay">
			    <div data-loading class="bx--loading">
  			    <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
			        <title>Loading</title>
			        <circle cx="0" cy="0" r="37.5" />
			      </svg>
			    </div>
			  </div>
		</div>
	</div></form>

	<script>
		dialogCount=0;//all dialogs increase the count when _init (on refresh and straight render of page)
<%		// Build the hotkey array of arrays
		Hotkeys hotkeys = app.getHotkeys();
		Iterator i = hotkeys.getKeycodes().iterator();
		while (i.hasNext())
		{
			int keycode = ((Integer)i.next()).intValue();
			Iterator keys = hotkeys.getHotkeysForKeycode(keycode).iterator();
			while (keys.hasNext())
			{
				List params = (List)keys.next();

				boolean ctrl = ((Boolean)params.get(Hotkeys.IDX_CTRL)).booleanValue();
				boolean alt = ((Boolean)params.get(Hotkeys.IDX_ALT)).booleanValue();
				String target = (String)params.get(Hotkeys.IDX_TARGET);
				String eventname = (String)params.get(Hotkeys.IDX_EVENT);
				String character = (String)params.get(Hotkeys.IDX_CHAR);
				String accessKey = (ctrl?"CTRL+":"")+(alt?"ALT+":"")+character;
%>		addLoadMethod("addHotKey('<%=accessKey%>','<%=target%>', '<%=eventname%>')");
<%			}
		}
%>		fixPasswordFields();
		if(DESIGNMODE)
		{
			parent.unLockWait();
			parent.hideWait();
		}
<%		if(!designmode)
		{
%>		    startLogoutTimer();
			startTimer();
<%		}	%>
	</script>
<%	if(designmode)
	{	%>
	</div>
<%	}	%>
	<script>
		if(tpaeConfig.validationOn)
		{
			setButtonEnabled(saveButton,<%=((AppBean)app.getAppBean()).hasModifications()%>);
		}
	</script>
<%
}	// end if(component.needsRender()) block
JSONObject autoFillInfo = ((PageInstance)control).getAutoFillInfo();
if(!rerender)
{

	if(component.needsRender())
	{

		if(designmode)
		{
			// if in designmode and rendering for the first time... whether it's shown or not, set the viewport
			// and ismobile values on maxapps.  event is handled by DesignerAppBean
%>			<script>
				addLoadMethod("parent.sendEvent('setmobilefields', 'designer', '<%= viewportSize %>')");
			</script>
<%
			if(currentPage.showViewport())
			{
%>	<div id="viewport_right" class="viewport" style="height: <%=viewportHeight%>px;"></div>
	<div id="viewport_left" class="viewport" style="height: <%=viewportHeight%>px;"></div>
	<div id="viewport_bottom" class="viewport" style="width: <%=viewportWidth%>px; overflow: hidden; top: <%=viewportHeight%>px;"></div>
	<div id="viewport_top" class="viewport" style="width: <%=viewportWidth%>px; overflow: hidden; top: 1px;"></div>
	<div id="viewport_tail" class="viewport" style="height: 5000px; top: <%=viewportHeight%>px;"></div>
	<div id="viewport_corner" class="viewport" style="overflow: hidden; top: <%=viewportHeight%>px;"></div>
<%			}	// end if(currentPage.showViewport())
		}	// end if(designmode)
		Map<String, String> changedErrorContainers = currentPage.getChangedErrorContainers();
		if(changedErrorContainers != null)
		{
			changedErrorContainers.clear();
		}
%>
	<div id="storage" style="display:none"></div>
<%
		if(mobileDatePicker)
		{
		%><%@ include file="../common/datepicker.jsp" %><%
		}
	%><%@ include file="asyncerrortooltipdialog.jsp" %>
</body>
<script>
require(["dojo/hccss"]);
require(["dojo/domReady!"], function(){
	tpaeConfig['hc'] = new HighContrast(document.body.className.indexOf('dj_a11y')>=0);
	tpaeConfig['isHighContrast'] = function(){return this.hc._isHC();};
});
menus = new MenuController("shared","<%=wcs.getMessage("ui","typeahead_next")%>","<%=wcs.getMessage("ui","typeahead_previous")%>","<%=wcs.getMessage("ui","typeaheadsearch")%>","<%=wcs.getMessage("ui","typeaheadsearchfor")%>");
menus["handlerId"] = "<%=currentPage.getMenuHandlerId()%>";
<%	if(autoFillInfo!=null)
	{
%>updateAutoFill("<%=control.getPage().getPageAutoFillId()%>",<%=autoFillInfo.serialize()%>);
<%	}
%>
function processLoadMethods()
{
	document.body.addEventListener('click', bodyEvent); 
  	document.body.addEventListener('keydown', bodyEvent); 
	while(loadMethods.length > 0)
	{
		var loadMethod = loadMethods.shift();
		try
		{
			if(DEBUGLEVEL > 1)
			{
				console.debug(loadMethod);
			}
			eval(loadMethod);
		}
		catch(error)
		{
			console.error("LoadMethod error["+error.message+"]. Unable to process: ["+loadMethod+"]");
		}
	}
}

function getQSTB()
{
	return getElement("<%=component.getControl().getPage().get("quicksearchtextbox")%>");
}
sizeCanvas();
</script>

<%@ include file="hiddenframe.jsp" %>

<script>
	if (window.parent && window.parent.postMessage)
	{
		window.parent.postMessage({[EMBEDDED_MESSAGE_PREFIX+"inner-app-ready"]:true},'*');
  	window.parent.postMessage({[EMBEDDED_MESSAGE_PREFIX+"inner-app-started"]:true},'*');
  }
	window.onunload = function(){
		window.top.postMessage({[EMBEDDED_MESSAGE_PREFIX+"inner-app-ready"]:false},"*");
	};
<% 	if(!designmode && !wcs.getPortalMode())
	{
%>	window.onbeforeunload = promptSessionLeave;
<%	}
%><%@ include file="menucache.jsp" %>
<%	if(clientDataValidation)
	{
%>
		loadDomains(TABLEDOMAINLIST);
<%	}	%>
</script>
</html>
<%	}
	else	// else block for if(component.needsRender())
	{ %>
		<finalscript>
	      let config = window.getMasHeaderConfig();
	      config.headerActions.forEach(headerAction=>{
	        if(headerAction.id==='Bulletin'){
	          let oldbulletinCount	= headerAction.count;
	          let newbulletinCount = "<%=currentPage.getCountForBBIcon()%>"
	          if(oldbulletinCount !== newbulletinCount) {
	          	headerAction.count = newbulletinCount;
	          	changeMasHeader(config);
	          }
	        }
	      });
	    </finalscript>
		<%
		((PageComponent)component).renderDialogs(false);
		// Check if we've been instructed to open a URL in a new window
		List listurls = (List)app.remove("openMultipleUrls");
		if(listurls != null)
		{
			for (int i = 0; i < listurls.size(); i++)
			{
				Map<String,String> urlprop = (Map<String,String>)listurls.get(i);
				String url = urlprop.get("url");
				// Double escape special chars since the url goes into a quoted string inside another quoted strings in javascript
				StringBuilder builder = new StringBuilder();
				int length = url.length();
				for(int j = 0; j < length; j++)
				{
					char ch = url.charAt(j);
					if(ch == '\\')
					{
						builder.append("\\\\\\");
					}
					else if(ch == '\"')
					{
						builder.append("\\\\");
					}
					else if(ch == '\'')
					{
						builder.append('\\');
					}
					builder.append(ch);
				}
				url = builder.toString();
				String windowId = urlprop.get("windowId");
				if(windowId != null)
				{
%>				<finalscript><![CDATA[
					stopFocus=true;
					addLoadMethod('openURL("<%=url%>", "<%=windowId%>" <%
							String options = urlprop.get("windowOptions");
							if(options != null && !options.isEmpty())
							{
								%>, "<%=options%>"<%
							}
						%>);');
				]]></finalscript>
<%				}
				else
				{
%>				<finalscript><![CDATA[
					if (parent==null)
					{
						document.location="<%=url%>";
					}
					else
					{
						parent.document.location="<%=url%>";
					}
				]]></finalscript>
<%				}
			}
		}
		String external = (String)app.get("launchexternal");
		if (!WebClientRuntime.isNull(external))
		{
			app.remove("launchexternal");
%>			<finalscript><![CDATA[
				var WshShell =  new ActiveXObject("WScript.Shell");
				var external = "<%=external%>";
				WshShell.Run(external,10,false)
			]]></finalscript>
<%		}
		if(clientDataValidation)
		{
			List<DataStoreInfo> createdDataStores = control.getPage().getDialogDataStores();
			if (createdDataStores != null)
			{
				JSONArray domainList = new JSONArray();
				for(DataStoreInfo dataStoreInfo : createdDataStores)
				{
					if (simpledomainDownload || !dataStoreInfo.isSimpleDomain())
					{
						domainList.add(dataStoreInfo.getAsJSONForDownload());
					}
				}
%>			<finalscript><![CDATA[
				loadDomains(<%=domainList.serialize(debug)%>);
			]]></finalscript>
<%			}
		}

		if(autoFillInfo != null)
		{
%>			<finalscript><![CDATA[
				updateAutoFill("<%=control.getPage().getPageAutoFillId()%>",<%=autoFillInfo.serialize()%>);
			]]></finalscript>
<%		}
	}	// 	end else block for if(component.needsRender())
	control.getPage().remove("controlrenderhash");
}
else	// else block for if(!rerender)
{
%>	<%@ include file="../common/componentholder_end.jsp" %>
<%}		// end else block for if(!rerender)
%><%@ include file="../common/componentfooter.jsp" %>

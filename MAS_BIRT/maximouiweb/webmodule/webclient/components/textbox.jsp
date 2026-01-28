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
%><%@page contentType="text/html;charset=UTF-8" buffer="none"
%><%@page import="com.ibm.json.java.JSONObject"
%><%@page import="java.net.URLEncoder"
%><%@page import="org.w3c.dom.Element"
%><%@page import="psdi.mbo.MaxMessage"
%><%@page import="psdi.webclient.components.CalendarTextBox"
%><%@page import="psdi.webclient.system.controller.AppInstance"
%><%@page import="psdi.webclient.system.controller.BoundComponentInstance"
%><%@page import="psdi.webclient.system.controller.ComponentInstance"
%><%@page import="psdi.webclient.system.controller.ControlInstance"
%><%@page import="psdi.webclient.system.controller.PageInstance"
%><%@page import="psdi.webclient.system.runtime.BidiClientUtils"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%@page import="psdi.webclient.system.session.WebClientSession.Alignment"
%><%@page import="psdi.security.UserInfo"
%><%@page import="psdi.util.BidiUtils"
%><%@page import="psdi.util.MXFormat"
%><%@page import="psdi.util.MXSession"
%><%
	ComponentInstance component = ComponentInstance.getCurrent(request);
	ControlInstance control = component.getControl();
	boolean onTableRow = control.isOnTableRow() || control.isOnTableFilterRow() || control.isOnTableTitleRow();
	WebClientSession wcs = control.getWebClientSession();
	String id = component.getRenderId();
	String controlType = control.getType();
	Alignment alignment = wcs.getAlignment();
	boolean hiddenFrame = Boolean.parseBoolean(request.getParameter("hiddenframe"));
	boolean accessibilityMode = wcs.getAccessibilityMode();
	boolean designmode = wcs.getDesignmode();
	UserInfo userInfo = wcs.getUserInfo();
	String langcode = userInfo.getLangCode();
	PageInstance currentPage = control.getPage();
	AppInstance app = currentPage.getAppInstance();
	boolean componentVisible = component.isVisible();
	String componentValue = null;
	String textcss = component.getProperty("textcss");
	String cssclass = component.getCssClass();
	String tabindex = "0";
	String exceptionClass = "";
	String excImageClass = "";
	boolean hidelabel = component.getBoolean("hidelabel");
	boolean async = component.isAsyncEnabled();
	
	String asyncevents = "";
	if(async)
	{
		asyncevents = component.getProperty("asyncevents");
		if(!WebClientRuntime.isNull(asyncevents))
		{
			asyncevents = "ae=\"" + asyncevents + "\"";
		}
	}
	
	boolean defaultRender = component.isDefaultRender();
	if(defaultRender)
	{	
		%><%@ include file="../common/componentholder_begin.jsp" %><%
	}

	String value = "";
	boolean userEditable= component.getProperty("usereditable").equalsIgnoreCase("true");
	String width = component.getProperty("width");
	width = component.getWebClientSession().attachUOM(width);
	String tabIndexProp = component.getProperty("tabindex");
	if(!tabIndexProp.equals(""))
		tabindex=tabIndexProp;
	String numericonly= component.getProperty("numericonly");
	String isdatefield = "";
	String menutype=component.getMenuType();
	String lookup=component.getLookupName();
	String requiredString = " " +wcs.getMaxMessage("ui","required").getMessage() + " ";
	ComponentInstance linkBack = null;
	boolean longdesc = false;
	boolean isReadOnly = false;
	boolean isMasked = false;
	boolean isRequired = false;
	boolean isunbound = component.getProperty("isunbound").equalsIgnoreCase("true");
	boolean comboBox = controlType.indexOf("combobox")!=-1 || (controlType.equals("reasonchange") && control.getProperty("usecombo").equalsIgnoreCase("true"));
	String ariaRole = "";
    String ariaLabelledBy = "";
	if(comboBox)
	{
		ariaRole=" role=\"combobox\" aria-autocomplete=\"none\" ";
	}
    else {
		ariaRole=" role=\"textbox\" ";
		if(!"".equals(component.getProperty("labelledby"))){
			String labelledBy = component.getLabelledByRenderId();
			if(WebClientRuntime.isNull(labelledBy) || component.isOnTableFilterRow() || component.isOnTableRow()|| component.isOnTableTitleRow()){
				BaseInstance parent = control.getParentInstance();
				if(parent instanceof psdi.webclient.controls.TableCell){
					labelledBy = ((psdi.webclient.controls.TableCell)control.getParentInstance()).getTableCol().getHeaderId();
				}
			}
			if(!WebClientRuntime.isNull(labelledBy)){
        		ariaLabelledBy = " aria-labelledby=\""+labelledBy+"\"";
			}
        }
    }
	boolean hidetooltip = Boolean.valueOf(component.getProperty("hidetooltip")).booleanValue();
	String min="";
	String max="";
	if(component.getClass().getName().endsWith("CalendarTextBox"))
	{
		min="min='"+((CalendarTextBox)component).getLowerLimit()+"'";
		max="max='"+((CalendarTextBox)component).getUpperLimit()+"'";
	}
	BoundComponentInstance boundComponent = null;
	String maskedTitle = "";
	boolean isQuery = false;
	JSONObject fieldInfo = null;
	String intType= component.getProperty("inttype");
	int dataType = -1;
	if(!WebClientRuntime.isNull(intType))
		dataType=Integer.parseInt(intType);

	boolean useMaxLength = true;
	if(component instanceof BoundComponentInstance)
	{
		boundComponent = (BoundComponentInstance)component;
		isReadOnly = boundComponent.isReadOnly();
		isQuery = boundComponent.isQuery();
		isMasked = boundComponent.isMasked();
		isRequired = boundComponent.isRequired();
		fieldInfo = boundComponent.getFieldInfo();
		if(comboBox && fieldInfo!=null)
			fieldInfo.remove("domain");
		if(isRequired)
			fieldInfo.put("required",true);
		linkBack = ((BoundComponentInstance)component).getLinkBack();
		if(linkBack!=null)
			longdesc=linkBack.getProperty("longdesc").equalsIgnoreCase("true");
		if(isMasked)
			maskedTitle=wcs.getMaxMessage("ui","maskedtitle").getMessage();
		useMaxLength = boundComponent.useMaxLength();
	}
	String fieldSize = component.getProperty("size");
	if(fieldSize.equals(""))
		fieldSize="0";
	// Another hack for firefox on linux. For some reason it calculates size for INPUT elements differently than on windows.
	// When a size of 2 is used, the box is much smaller than it needs to be.
	if (request.getHeader("user-agent").indexOf("Linux") >= 0 && request.getHeader("user-agent").indexOf("Firefox") >= 0 && (fieldSize.equals("2") || fieldSize.equals("3")))
		fieldSize="4";

	// Size defined for presentation overrides 
	String controlSize = control.getProperty("size");
	if(!controlSize.equals(""))
	{
		fieldSize = controlSize;
	}

	String title = component.getProperty("title");
	double size = Double.parseDouble(fieldSize);
	boolean isDate = (dataType == MXFormat.DATE || dataType == MXFormat.TIME || dataType == MXFormat.DATETIME || lookup.equalsIgnoreCase("datelookup")|| lookup.equalsIgnoreCase("datetimelookup"));
	boolean isLdOwner = boundComponent!=null && boundComponent.getProperty(BoundComponentInstance.HAS_LONG_DESCRIPTION).equalsIgnoreCase("true");
	String linkBackId = "";
	if(linkBack!=null)
		linkBackId=linkBack.getRenderId();
	String onfilterrow = component.getProperty("onfilterrow");
	String skin = wcs.getSkin();
	boolean modernSkin = skin.indexOf("iot18")>-1 || skin.indexOf("mas8")>-1;
	String[] titleSepParam = {""};
	String bidiSep = BidiUtils.isBidiEnabled()? BidiUtils.getDelimeterPrefix(langcode) : "";
	String titleSep = bidiSep + " " + bidiSep;
	boolean focused = false;
	String length= component.getProperty("length");
	String staticname = component.getProperty("staticname");
	if (!"".equals(staticname))
	{
		staticname = "name=\"" + staticname + "\" ";
	}
	String trd = "";
	%><%@ include file="../common/inputcss.jsp" %><%
	boolean hadInvalidXMLChars = false;
	if(!isMasked)
	{
		value = boundComponent.getString();
		if(WebClientRuntime.hasInvalidXMLChars(value))
		{
			hadInvalidXMLChars = true;
		}
	}
	else
	{
		value="";
	}
  if(width.equals("")){	
    size = (size*1.1);
    if(size<5){
      size = 5;
    }
    size = size*1.1;
    if(controlSize.equals("")) {
      if (!control.getType().equals("multiparttextbox") && size > 40){
        size = 40;
      }
      if(component.isOnTableRow() && size > 30){
        size = 30;
      }
    }
    size = size+4;  //Since 16px spacing is added to either sides off <input/> so adding 4 to increase the width by 4 characters. 
    if(control.getType().equals("combobox")){
      width = "width:calc("+size+"ch + 40px)";
    }
    else {
      width = "width:"+size+"ch";
    }
  }
  else {
    width= "width:" + width;
  }
	
	if(component.getProperty("inputmode").equals("readonly"))
		userEditable = false;

	//Issue 08-17739: Adding code for special case when input begins with accent grave
	//if(hiddenFrame)
	//{
	//	while(value.startsWith("`"))
	//	{
	//		value=value.substring(1,value.length());
	//	}
	//}
	String cancelClickBubble = "";
	if(component.isOnTableRow())
		cancelClickBubble=" cancelEvent(event); ";
	boolean isNumeric= component.getProperty("isnumeric").equalsIgnoreCase("true");
	isNumeric=(isNumeric || numericonly.equalsIgnoreCase("true"));
	String defaultButton = "";
	if(!designmode)//don't bother
	{
		if( userEditable || !comboBox)
		{
			boolean globalDefaultButton = MXFormat.stringToBoolean(WebClientRuntime.getWebClientProperty("webclient.defaultbutton","true"));
			defaultButton = component.getProperty("defaultbutton");
			ComponentInstance dButton=currentPage.getComponentInstance(defaultButton);
			if(dButton!=null && !WebClientRuntime.isNull(defaultButton) && !component.isOnTableFilterRow() && globalDefaultButton)
				defaultButton="db=\""+dButton.getRenderId()+"\"";
			else
				defaultButton="";
		}
	}
	String stopUserEdit="";
	if(!userEditable)
	{
		readOnly="readonly=\"readonly\"";
		stopUserEdit="sue=\"1\""; //keys not allowed, but readonly color is not used
	}
	String numericStyle = (isNumeric && !component.getProperty("numericalignment").equals("false")) ? "padding-"+alignment.end+":2px;text-align: right;" : "";
	String numericAttribute = "";
	if(isNumeric) {
		numericAttribute = "dir=\"ltr\""; 
	}
	if (BidiUtils.isBidiEnabled()) {
		if (isNumeric)
			numericAttribute = "numericAttribute=\"" + (!component.getProperty("numericalignment").equals("false")? "right" : "") + "\"";
	}
	String inputType = "text";
	String inputMode = component.getProperty("inputmode").toLowerCase();
	boolean isPasssword=inputMode.indexOf("password")>-1;

	String maxlength = "maxlength=\"" + length + "\"";
	if(!useMaxLength || (isNumeric && !isunbound))
		maxlength = "";

	if (isDate)
		isdatefield ="df=\"1\"";

	String dojoTypeInput = "";
	if(isDate)
	{
		MXSession s = wcs.getMXSession();
		%><%@ include file="../common/dateoptions.jsp" %><%
	}

	if(isPasssword)
		inputType="password";
	if(component.isOnTableFilterRow())
	{
		String filter =wcs.getMessage("ui","filter");
		if(filter.indexOf("{0}")>=0)
		{
			title=wcs.getMessage("ui","filter",new String[]{title});
		}
		else
		{
			if (wcs.getSettingsProperty("filtertitlespace").equals("true"))
				title+=" "+filter;
			else
				title+=filter;
		}
	}
	else if(!accessibilityMode) {
		title = "";
	}
	
	if(accessibilityMode)
	{	
		String prependString = component.getProperty("prepend");
		if(!WebClientRuntime.isNull(prependString))
		{
			prependString = WebClientRuntime.getPrependValue(prependString);
			if(prependString.indexOf(">") > -1)
			{
				prependString = wcs.getMaxMessage("ui","prependfrom").getMessage();
			}
			else if(prependString.indexOf("<") > -1)
			{
				prependString = wcs.getMaxMessage("ui","prependto").getMessage();
			}
			title=title+titleSep+prependString;
		}
		if(accessibilityMode){
			if(!WebClientRuntime.isNull(menutype))
			{
				Element menuElement = WebClientRuntime.getWebClientRuntime().getLibraryDescriptor("menus",wcs).getDialog(menutype,wcs);
				String menuString = "";
				if(menuElement!=null)
					menuString = menuElement.getAttribute("label");
	
				if(WebClientRuntime.isNull(menuString))
					menuString+=" "+wcs.getMaxMessage("jspmessages","showmenu").getMessage();
				title+=" "+menuString;
			}
			else if(!WebClientRuntime.isNull(lookup))
				title+=" "+wcs.getMaxMessage("jspmessages","selectValueButton").getMessage();
			else if(longdesc && isLdOwner)
				title+=" "+wcs.getMaxMessage("jspmessages","longDescriptionButton").getMessage();
		}
	}
	int controlTitleIndex = title.indexOf("{control}");
	if(!WebClientRuntime.isNull(title) && !WebClientRuntime.isNull(value) || !WebClientRuntime.isNull(maskedTitle))
	{
		if(controlTitleIndex==-1)
			title+=titleSep;
	}
	String titleValue = value;
//bidi-hcg-AS start
	String[] bidiTagAttributes = {"","",""};
	if(BidiUtils.isBidiEnabled() && !comboBox &&!isPasssword) {
		bidiTagAttributes = BidiClientUtils.getTagAttributes(component,app,value,true,langcode);
		if(BidiUtils.isChain(bidiTagAttributes[1]))
		{
			value = BidiUtils.processComplexexpression(value,bidiTagAttributes[2],bidiTagAttributes[1],WebClientRuntime.getMXSession(session));
			titleValue = BidiUtils.processComplexexpression(titleValue,bidiTagAttributes[2],bidiTagAttributes[1],WebClientRuntime.getMXSession(session));
		}
		else
		{
			value = BidiUtils.processComplexexpression(value,bidiTagAttributes[1],WebClientRuntime.getMXSession(session));
			titleValue = BidiUtils.processComplexexpression(titleValue,bidiTagAttributes[1],WebClientRuntime.getMXSession(session));
			titleValue = BidiUtils.enforceBidiDirection(titleValue,bidiTagAttributes[2]);
		}
		if(!isNumeric)
		{
			numericStyle = BidiClientUtils.getTextAlignmentStyle(bidiTagAttributes[1],WebClientRuntime.getMXSession(session));
		}
		else
		{
			bidiTagAttributes[0] = "";
		}
	}
//bidi-hcg-AS end
	String emptyControlVal = "__";
	title = WebClientRuntime.makesafevalue(title);
	titleValue = WebClientRuntime.makesafevalue(titleValue);
	value = WebClientRuntime.makesafevalue(value);
	if(accessibilityMode)
	{
		titleValue="";
		if(isRequired)
			requiredString+=titleSep;
		else
			requiredString="";
		if(controlTitleIndex==-1) 
		{
			if (!BidiUtils.isBidiEnabled())
				title=title+titleValue+requiredString+titleSep+maskedTitle;
			else
				title = BidiUtils.enforceBidiDirection(title+titleValue+requiredString+titleSep+maskedTitle,
								BidiUtils.getLayoutOrientation(langcode)); 
		}	
		else
		{
			if(titleValue.equals(""))
				titleValue=emptyControlVal;
			if (!BidiUtils.isBidiEnabled())
				title=WebClientRuntime.replaceString(title, "{control}", titleValue)+requiredString+titleSep+maskedTitle;
			else
				title=BidiUtils.enforceBidiDirection(WebClientRuntime.replaceString(title, "{control}", titleValue) +
								requiredString + titleSep+maskedTitle, BidiUtils.getLayoutOrientation(langcode));
		}
		String msgKey=component.getProperty("msgkey");
		String msgGroup=component.getProperty("msggroup");

		if(!WebClientRuntime.isNull(msgKey))
		{
			MaxMessage message = wcs.getMaxMessage(msgGroup,msgKey);
			if(message!=null)
				title=wcs.getMessage(msgGroup,msgKey,new String[]{title});
		}		
		title="title=\""+title+"\"";
	}
	else
	{
		if(isPasssword)
			titleValue="";
		if(controlTitleIndex==-1)
		{
			if (!BidiUtils.isBidiEnabled())
				title="title=\""+title+titleValue+"\"";
			else
				title="title=\"" + BidiUtils.enforceBidiDirection(title+titleValue, BidiUtils.getLayoutOrientation(langcode)) + "\"";
		}	
		else
		{
			if(titleValue.equals(""))
				titleValue=emptyControlVal;
			if (!BidiUtils.isBidiEnabled())
				title="title=\""+WebClientRuntime.replaceString(title, "{control}", titleValue)+"\"";
			else
				title="title=\"" + BidiUtils.enforceBidiDirection(WebClientRuntime.replaceString(title, "{control}", titleValue),
								BidiUtils.getLayoutOrientation(langcode)) + "\""; 
		}
	}
	if(!tabindex.equals("0"))
		tabindex="tabindex=\""+tabindex+"\"";
	else
		tabindex="";
	if(linkBack!=null)
		linkBackId="li=\""+linkBackId+"\"";
	String hasValue = "";
	int pwordVal = 0;
	if(inputType.equals("password"))
	{
		if(!WebClientRuntime.isNull(value))
			pwordVal=1;
		hasValue="hasvalue=\""+pwordVal+"\"";
	}
	String num = "";
	if(numericonly.equalsIgnoreCase("true"))
		num="num=\"1\"";
	String liClick="";
	if(comboBox && !userEditable)
	{
		liClick="liclick=\"1\"";
	}
	if(control.getType().equals("quicksearch"))
		control.getPage().put("quicksearchtextbox",id);

	String ontr="";
	if(control.isOnTableRow())
		ontr="ontr='true'";
	
	String stopAlign="";
	if(isunbound)
		stopAlign="sa=\"1\"";
	if(!accessibilityMode){
		title="";
	}
	boolean switchIcon = (isNumeric && !alignment.rtl);
	boolean canShowIcon = !component.getProperty("erroricon").equals("false");
	//must set all of these if there is an exception/warning

	%><%@ include file="../common/componentexception.jsp" %><%
	if(hadInvalidXMLChars && exceptionType == ComponentInstance.EXCEPTION_NONE)
	{
		exceptionType = BaseInstance.EXCEPTION_INFO;
		exceptionClass+=" fld_info";
		exc="exc=\""+exceptionType+"\"";

		JSONObject err = new JSONObject();
		err.put("compid", id);
		err.put("exception", wcs.getMaxMessage("ui","ctrlCharsRemoved").getMessage());
		err.put("exceptiontype", BaseInstance.EXCEPTION_INFO);
		fieldInfo.put("err", err);
	}

	if(accessibilityMode && !component.isOnTableRow())
	{
		if(!component.getProperty("dataattribute").equals(control.getProperty("descdataattribute")))		
		{
			title="";
		}
	}
	String helpImage = "";

	if(exceptionType == ComponentInstance.EXCEPTION_NONE && component.isHoversActive() && (!control.isOnTableFilterRow() || designmode))
	{
		%><%@ include file="../common/extendedtooltip.jsp" %><%
	}
	if(helpImage.length()>0){
		cssclass += " helpHover";
	}
	String ariaLabel = component.getProperty("arialabel");
	if(componentVisible && component.getProperty("visible").equals("true"))
	{
	%><input datatype="<%=dataType%>" id="<%=id%>" <%=ariaString%> <%=staticname%><%=ariaRole%><%=ariaLabelledBy%> class="fld <%=cssclass%> <%=exceptionClass%>" <%=exc%><%
		%> <%=stopAlign%> <%=min%> <%=max%> ctype="textbox" <%=bidiTagAttributes[0]%> <%=numericAttribute%><%
		%> <%=linkBackId%> <%=liClick%> <%=defaultButton%> <%=hasValue%> <%=num%> <%=maxlength%><%
		%> style="<%=numericStyle%>;<%=width%>;" <%=isdatefield %> <%=ontr%> <%=dojoTypeInput%> <%if(!isReadOnly){%><%=asyncStr%> <%=asyncevents%><%}%><%
		%> <%=stopUserEdit%> <%=tabindex%> <%=readOnly%> type="<%=inputType%>" <%=title%> <%if(hidelabel){ title=component.getProperty("title");%> placeholder="<%=title%>" promptValue="<%=title%>" aria-label="<%=title%>"<%}else if(ariaLabel.length()>0){%> aria-label="<%=ariaLabel%>"<%}
		if(isDate)
		{
			%> value=""<%
		}
		else
		{
			%> value="<%=value%>"<%if(!isReadOnly){%> ov="<%=value%>"<%}%><%
		}
		if(wcs.isAutomationOn())
		{
			%> automationid="<%=component.getId()%>"<%
		}
		if(!control.isOnTableFilterRow())
		{
			%> work="1"<%
		}
		if(fieldInfo!=null && !isReadOnly)
		{
			%> fldInfo='<%=WebClientRuntime.makesafevalue(fieldInfo.serialize())%>'<%
		}
		%>/><%=helpImage%><%
		if(isDate)
		{
	%><script type="text/javascript">
			require(["ibm/tivoli/mbs/html"], function(html){
				formatCalendar('<%=id%>',html.decodeEntities('<%=value%>'));
			});
		</script><%	}
	}
	if(isPasssword && !WebClientRuntime.isNull(value))
	{
%>		<script>addPasswordField("<%=id%>");</script>
<%	}
	//Set the input up as the one that has changed if data was not valid
	if (!boundComponent.isDataValid())
	{
		if (app.getCurrentPage().getComponentInstance(id) != null)
		{
			if(!component.getProperty("forceclear").equalsIgnoreCase("true"))
			{
%>			<script>
				el=document.getElementById("<%=id%>");
				if (el != null)
					input_changed(null,el);
			</script>
<%			}
		}
	}
	if (control.getParentInstance().getType().equalsIgnoreCase("tablecell") 
		&& control.getConditonallyChanged()!=null && control.getConditonallyChanged().contains("cssclass"))
	{
%>
	<script>
		el=document.getElementById("<%=id%>");
		if (el != null)
		{
			el.parentElement.className = "<%=cssclass%>";
		}
	</script>
<%
	}
%><%@ include file="../common/componentfooter.jsp" %>

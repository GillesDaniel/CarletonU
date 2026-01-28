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
--%><%@ include file="../common/componentheader.jsp" %><%
	boolean defaultButton=component.getProperty("default").equalsIgnoreCase("true");
	boolean globalDefaultButton = MXFormat.stringToBoolean(WebClientRuntime.getWebClientProperty("webclient.defaultbutton","true"));
	String labelcss = component.getProperty("labelcss");
	cssclass = cssclass + " " + labelcss + " " + textcss+" pb";

	String width = "";
	if(!(component.getProperty("width").equals("")) )
		width = "width:"+component.getWebClientSession().attachUOM(component.getProperty("width"));
	if(defaultButton && globalDefaultButton)
		cssclass +=" default";
	String text = component.getProperty("label");
	boolean dataAddrow = false;
	String addrow = "";
	if(component.getProperty("mxevent").equals("addrow")) {
		addrow = "data-addrow='true'";
		dataAddrow = true;
	} 
	String sigoptionInd = "";
	if(!"".equals(control.getProperty("sigoption"))){
		sigoptionInd = "data-hasSigoption='true'";
	} 
	String btn_img = component.getProperty("image");
	String inner_img = component.getProperty("innerimage");
	boolean hasmenu = false;
	boolean disabled = component.getProperty("disabled").equalsIgnoreCase("true");
	String menuType = component.getProperty("menutype");
	String mxEventJSHandler = component.getProperty("mxeventjshandler");
	String dojoTypeInput = "";
	if(component.needsRender()) {
		String mxeJSEventHandlerPost = component.getProperty("mxeventjshandlerpost");
		if(mxeJSEventHandlerPost.length()>0) {
			app.addMXJSPostEvent(component.getId(), mxeJSEventHandlerPost);
		}
	}
	if(!"".equals(mxEventJSHandler))
	{
		if("dateLookupHdlr".equals(mxEventJSHandler))
		{
			String value="";
			dataType=MXFormat.DATETIME;
			%><%@ include file="../common/dateoptions.jsp" %><%
		}
		mxEventJSHandler=" mxejse='"+mxEventJSHandler+"' ";
	}

	hasmenu = !menuType.equals("NONE");
	String dub = "";
	if(designmode)
	{
		if (text.equals(""))
			text = control.getType();
	}
	else if(!disabled)
	{
		if(component.getProperty("doclinkuploadbutton").equals("true") )
		{
			dub="dub=\"1\"";
			currentPage.put("doclinkuploadclicktargetid", id);
		}
		else
		{
			if(hasmenu)
			{
				component.setProperty("mxevent","showmenu");
				component.setProperty("eventvalue",menuType);
			}
		}
	}

	if(text != null)
	{
		String elementType = "button";
		String src = "";
		String alt = "";
		if(wcs.getAccessibilityMode() && hasmenu){
			alt = "title=\"" + HTML.encodeTolerant(text + " " + wcs.getMaxMessage("ui", "menu").getMessage()) + "\"";
		}
		else {
			alt = "title=\"" + HTML.encodeTolerant(text) + "\"";
		}
		String type = "type=\"button\"";
		if (btn_img != "")
		{
			elementType = "img";
			src = "src=\"" + IMAGE_PATH + btn_img + "\"";
			text = "";
			type = "";
		}
		boolean addTR = control.getBoolean("inlinebutton") != true && (control.getParentInstance().getType().equals("section") || control.getParentInstance().getType().equals("sectioncol")) ;
		if(inner_img.length()>0) {
			inner_img = "<img src="+IMAGE_PATH+inner_img+" class='pbi'/>";
		}%><%if(addTR){%><tr><td style="padding-top:20px"><%if(wcs.useVerticalLabels()){%>&nbsp;</td></tr><tr><td><%}}%><%
		if(designmode)
		{
			designerSelected="background: #cdcdcd;"+designerSelected;
%>			<a href='' id="<%=id%>" class="<%=cssclass%>" style="margin:3px;text-decoration:none;color:#000000" onclick='return false;'>
<%		}
		if(componentVisible && component.getProperty("visible").equals("true"))
		{
		%><%@ include file="../common/uistatusindicator.jsp" %>
		<<%=elementType%> ctype="pushbutton" <%=src%> <%=alt%> <%=type%> <%=dub%> <%=addrow%> <%=sigoptionInd%> <%=dojoTypeInput%> <%=mxEventJSHandler%> control="true" id="<%=id%>"<%
				%> <%=automationId%> class="<%=cssclass%>" <%=componentEvents%><%
				if(designmode)
				{
					%> onclick='return false;'<%
					%> style="padding:2px;padding-bottom:0px;border:1px solid #999999;<%=designerSelected%>"<% 
				}
				else 
				{
					if(component.getProperty("doclinkuploadbutton").equals("true"))
					{
						%> onclick="setCurrentfocusFromId(null,'<%=id%>');setClickPosition(this,null);doclinkuploadbutton(null,this);"<% 
					}
					%> style="<%=width%>"<%
				}
				if(disabled)
				{
					%> disabled="disabled" aria-disabled="true" <%
				}
				%>><%
			%><%=inner_img%><%=text%><%
			if(hasmenu)
			{
				if(skin == null || skin.isEmpty())
				{
					%><img border="0" valign="middle" style="position:relative;top:2px;margin:0px" src="<%= IMAGE_PATH + "pushbtn_divider.gif" %>" alt=""/><%
				}
				%><img border="0" tabindex="-1" align="absmiddle" style="padding:0px 2px;margin:0px" src="<%= IMAGE_PATH + "pushbtn_down.gif" %>" alt=""/><%
			}
		%></<%=elementType%>><%
		if(designmode)
		{
%>			</a>
<%		} %><%if(addTR){%></td></tr><%}%>

			<script>
				// Where to display table buttons. 0=Display at bottom. 1=Display at top. 2=Display both.
				if(tpaeConfig.tableButtonPlacement!="0") {
					if(<%=dataAddrow%>) {
						setTimeout(function(){
							// Create the "new row plus icon" only if new row button exist
							var newRowBlueBtn  = getElement("<%=id%>");
							if(newRowBlueBtn) {
								let newRowPlusIcon = getElement("<%=id+"_addrow_a"%>");
								if(!newRowPlusIcon) {
									let componentId = "<%=control.getRenderId()%>";
									let tblId = componentId.slice(0, componentId.indexOf('_'));
									// Creating a "new row plus icon"
									relocateTableButtons(tblId,"true","false");
								} else {
									// Show the "new row plus icon" If already exist in DOM
									hideShowElement("<%=id+"_addrow_a"%>",true);
								}
							}
						}, 500);
					}
				}
			</script>
<%
	  }
		else {%>
			<script>
				// Along with the new row button, hide "new row icon button" as well
				if(tpaeConfig.tableButtonPlacement!="0") {
					hideShowElement("<%=id+"_addrow_a"%>",false);
				}
				hideShowElement("<%=id%>",false);
			</script>
		<%}
	}
%><%@ include file="../common/componentfooter.jsp" %>

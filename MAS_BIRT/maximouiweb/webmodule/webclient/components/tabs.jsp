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
--%><%@ include file="../common/componentheader.jsp" %>
<%!
/**
	Returns the html necessary to generate a button to be used as the back to list page button
*/
public String getButtonHtml(String id, WebClientSession wcs, boolean designmode)
{
	String onclick = "javascript:sendEvent('gotolisttab','"+id+"','')";
	if(designmode)
	{
		onclick="return false;";
	}
	String text = wcs.getMessage("ui", "backtolisttab");
	String events = "";
	if(!designmode) {
		events = "onmouseover=\"appendClass(this, 'bchover')\" onmouseout=\"removeClass(this, 'bchover')\" onkeydown=\"if(hasKeyCode(event,'KEYCODE_SPACEBAR|KEYCODE_ENTER')){stopBubble(event);"+onclick+";return true;}\" onclick=\""+onclick+"\"";
	}

	return "<div id='"+id+"_backToList' tabindex='0' role='button' aria-labelledby='"+id+"_middle' "+events+"><table role='presentation'><tr><td class='pbspecialwest'></td><td id='"+id+"_middle' class='pbspecialmiddle' class=\"text\">" + text + "</td><td class='pbspecialeast'></td></tr></table></div>";
}

/**
/**
	Returns any additional properties that are necessary on the button section on the breadcrumb line
*/
public String getAdditionalBreadcrumbProperty()
{
	return "style=\"padding-bottom:2px\"";
}
%>
<%
	String format = component.getProperty("format");
	TabGroup tabGroup = ((TabGroup)control);
	Tab currentTab = tabGroup.getCurrentTab();
	boolean isOnDialog = "dialog".equals(currentTab.getPage().getType().toLowerCase());
	boolean hideForFormat = !app.isMobile() && (format.equalsIgnoreCase("navigation") && currentTab != null && currentTab.getProperty("type").equals("list") && !designmode);
	String breadCrumbs = "";
	boolean isWizard = false;
	String wizardHeightClass = " ";
    String buttons = "";
    if(app.isMobile() && !app.onListTab()){
        buttons = getButtonHtml(id, wcs, designmode);
    }
	if(format.equalsIgnoreCase("wizard")){
		isWizard = true;
		wizardHeightClass = "tabwHeight";
	}
	if(!hideForFormat && ((!app.onListTab() || (app.onListTab() && isOnDialog)) || designmode))
	{
    boolean isSubGroup = false;
		if(component.needsRender() && (!format.equalsIgnoreCase("carddeck")))
		{	
			String style = component.getProperty("style");
			if(!style.equalsIgnoreCase("form"))
			{
				cssclass="sub"+cssclass;
        isSubGroup = true;
			}	
			String innerClass = "tabgroup"; 
			if(isWizard)
			{
				innerClass+="w";
				cssclass+=" wizard";
			}	
			if(tabGroup.isMainTab())
			{
				cssclass+=" maintabgroup";
			}
			%>
		<td data-designmode="<%=designmode%>" class="<%=cssclass%>" <%if(format.equalsIgnoreCase("navigation")){%>style="padding: 5px 5px 0px 5px;"<%}%>>
		<%	if(!hideForFormat || (designmode))
			{	
				String opaque = "";
				String cursor = "cursor: pointer;";
				if(designmode) {
					opaque = " opacity_55";
					cursor="cursor: default;";
				}
				String textFloat = WebClientRuntime.getWebClientSystemProperty("webclient.tabBreadCrumbsFloat");
				if(!WebClientRuntime.isNull(textFloat))
				{
					textFloat = "float: " + textFloat + ";";
				}
				String flex = "";
				//Default for main pages is true. Default for dialogs is false
				if(!component.getBoolean("wrap") || (component.getProperty("wrap").length()==0 && control.getPage() != wcs.getCurrentApp().getPageStack().firstElement())){
					flex = " flex";
				}
				if(format.equalsIgnoreCase("navigation") && !accessibilityMode) { %>
					<table role="presentation" class="text tabBreadCrumbs<%=opaque%>" style="<%=cursor%><%=textFloat%>display: inline"><tr><td class="breadcrumbButtonGroup" <%=getAdditionalBreadcrumbProperty()%>><%=buttons%></td><td id="<%=id%>_breadCrumbs"><%=breadCrumbs%></td></tr></table>
				<%}%>
      	<% 	if(accessibilityMode && !isSubGroup)
					{	%>
						<div class="ahBacking">
							<h1 class="ah" id="main_content_tabs" tabindex="-1"><%= wcs.getMessage("ui","mainform")%></h1>
							<label class="text help" >&nbsp;<%= HTML.decode(wcs.getMessage("ui","reqFieldMsg"))%></label>
						</div>
				<%	}	%>
				<div class="tabgroupShell <%=wizardHeightClass%>" style="display:flex;">
					<div class="tabContainer">
						<div class="tabScroller tabScroll_left">
							<img id="testing1-img" alt="Scroll Left" src="btn_tab_start_fade.svg" onClick="tabScrollLeft(event)" source="btn_tab_start_fade"
								imgtype=".svg" aria-haspopup="true" role="button" align="center" no-bg-hover="" tabindex="-1" title="Scroll Left" draggable="false" 
								clicked="true" onmouseover="src='btn_tab_start_fade_over.svg'" onmouseout="src='btn_tab_start_fade.svg'"/>
						</div>
						<div class="tabScroller tabScroll_right">
							<img id="testing2-img" alt="Scroll Right" src="btn_tab_end_fade.svg" onClick="tabScrollRight(event)" source="btn_tab_end_fade" 
								imgtype=".svg" aria-haspopup="true" role="button" align="center" no-bg-hover="" tabindex="-1" title="Scroll Right" draggable="false" 
								clicked="true" onmouseover="src='btn_tab_end_fade_over.svg'" onmouseout="src='btn_tab_end_fade.svg'"/>
						</div>
						<div class="tabsWrapper <%=wizardHeightClass%>">
							<ul class="<%=innerClass%><%=flex%>" nowrap="nowrap" role="tablist" style="height:4.5rem;white-space:nowrap;<%if(!app.isMobile()){%>;;overflow:auto;<%}if(breadCrumbs.length()>0){%>;padding-top: 3px;<%}%>"><%
											
			}
		}
		component.renderChildrenControls(); 
		if(component.needsRender() && (!format.equalsIgnoreCase("carddeck") || designmode))
		{
		  %>
							</ul>
						</div>
					</div>
				<div class="tabMenuDiv">
					<img id="<%=id%>_overflow_tabs" sf="1" onClick="buildTabMenu(event)"  tabindex="0" alt="Detail Menu" src="btn_tab_menu.svg" source="img_row_select" imgtype=".svg" border="0" aria-haspopup="true"  class="tabMenu " align="center" no-bg-hover=""
						tabindex="-1" title="Tabs Dropdown" draggable="false" role="button" clicked="true" onmouseover="src='btn_tab_menu_over.svg'" onmouseout="src='btn_tab_menu.svg'"
						onkeypress="if(event.key === 'Enter'){event.target.click();}"/>
				</div>
			</div>
		</td>
		<script>
			setChangingTabs(true);
			if(!DESIGNMODE){
                dojo.connect(window, 'resize', function() {resizeTabs()});
			    addLoadMethod('window.setTimeout(sizeTabGroup("<%=tabGroup.getRenderId()%>"+"-tabg"),10);');
			    addLoadMethod('scrollToCurrentTab("<%=tabGroup.getRenderId()%>"+"-tabg");setChangingTabs(false);');
            }
            var tabgroup = document.getElementById("<%=tabGroup.getRenderId()%>"+"-tabg");
            var ul = tabgroup.getElementsByTagName('ul')[0];
            if(ul.childElementCount <= 1 || DESIGNMODE || MOBILE){
                var dropdownButton = tabgroup.getElementsByClassName('tabMenuDiv')[0];
                dojo.style(dropdownButton, {"display": "none"});
            }
		</script>
	<%	}
		if(!component.needsRender())
		{	%>
			<component id="<%=id%>_breadCrumbs"<%=compType%> ignrdispstyle="true"><![CDATA[<%=breadCrumbs%>]]></component>	
	<%	}
	}	%><%@ include file="../common/componentfooter.jsp" %>

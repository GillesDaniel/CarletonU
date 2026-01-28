<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18, 5737-M66
* 
* (C) COPYRIGHT IBM CORP. 2012,2024 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ page contentType="text/html;charset=UTF-8" buffer="none"
%><%@page import="com.ibm.json.java.*"
%><%@page import="psdi.webclient.components.*"
%><%@page import="psdi.webclient.controls.*"
%><%@page import="psdi.webclient.controls.Menus"
%><%@page import="psdi.webclient.system.controller.*"
%><%@page import="psdi.webclient.system.runtime.*"
%><%@page import="psdi.webclient.system.session.*"
%><%@page import="psdi.webclient.system.session.WebClientSession.Alignment"
%><%ComponentInstance component = ComponentInstance.getCurrent(request);
	ControlInstance control = component.getControl();
	WebClientSession wcs = control.getWebClientSession();
	boolean accessibilityMode = wcs.getAccessibilityMode();
	boolean show = !wcs.getMobile() && (!component.getProperty("menutype").equals("goto") || 
			!control.getPage().getAppInstance().inAppLinkMode()); 
	if(show) {
		Alignment align = wcs.getAlignment();
		String imagePath = "";
		String id = ((BaseInstance)component).getRenderId().replaceAll("-","_"); //we need to make sure there are no '-' in the IDs
		String title = component.getProperty("title");
		boolean pageNav = control.getParentInstance().getBoolean("pagenav");
		String image = component.getProperty("image");
		boolean expanded = component.getBoolean("expanded");
		int sectionCount = control.getParentInstance().getChildCount();
		if(sectionCount==1) {
			expanded = true;
		}
		String icon = component.getProperty("icon");
		boolean showImages = component.getBoolean("showimages");
		boolean exclusive = component.getBoolean("exclusive");
		String height = component.getProperty("height");
		height = wcs.attachUOM(height);
		String display = "";
		if(!expanded && !accessibilityMode) {
			display = "none";
		}
		if(image.length() > 0) {
			image = "<img src='" + imagePath + "tasknav/" + image + "' style='margin: 3px;' alt=''/>";
		}
		String minimize = ((NavSection)component).minimize;
		String maximize = ((NavSection)component).maximize;
		String restore = ((NavSection)component).restore;
		String containerId = control.getParentInstance().getProperty("containerid");
		String ariaRole = control.getProperty("ariarole");
		if(accessibilityMode){
			ariaRole = "navigation";
		}
		if(component.needsRender() && !control.getProperty("menutype").equals("goto")) {%>
		<div id="<%=id%>" class="navSection" role="<%=ariaRole%>" aria-labelledby="<%=id%>_label"  containerId="<%=containerId%>">
			<div class="navHeadOuter">
			  <div id="<%=id%>_head" title="<%=title%>" role="presentation" style="width:100%" class="navHead" onkeyup="navHeadingKey(event,'<%=id%>')">
					<div style="display:inline;white-space: nowrap">
						<table role="presentation">
							<tr>
								<td>
									<<%if(accessibilityMode){%>h1 <%}else{%>div<%}%> ondblclick="toggleSectionState('<%=id%>');hideAllMenusNF();stopBubble(event);" id="<%=id%>_label" class="navTitle dojoxEllipsis" style="<%if(accessibilityMode){%>display: inline-block;<%}%>user-select: none;-moz-user-select: none;"><%=image%><%=title%></<%if(accessibilityMode){%>h1<%}else{%>div<%}%>>
								</td>
								<td>
							</tr>
						</table>
					</div>
				</div>
			</div>
	<%	}
		String dataString = ((NavSection)component).getDataString();
		boolean needsClose = false;
		if(!wcs.getDesignmode())
		{	
			if(component.needsRender()) {%>
			<div id="<%=id%>_content" style="display:<%=display%>;" class="navContent"	 tabindex="-1">
				<div id="<%=id%>_content_inner">
				</div>
			</div>
			<%}
			else if(component.hasChanged()){ 
				String currentQueryDescription = wcs.getCurrentApp().getAppBean().getCurrentQueryDescription();%>
				<component id="<%=id%>_holder" compid="<%=id%>"><%="<![CDATA["%>
				<% needsClose = true;
			}	
			if(component.needsRender() || component.hasChanged()) { 
        String navContainerId = (String)component.getPage().get("navcontainerid");
        %>
			<script type="text/javascript">
			<%  boolean tryCache = (component.getProperty("datasrcid").equalsIgnoreCase("menus") && component.getProperty("menutype").equals("goto")); 
				boolean isQuery = component.getProperty("menutype").equals("query");
        boolean onListTab = wcs.getCurrentApp().onListTab(); %>
				var state<%=id%> = "<%if(expanded){%>normal<%}else{%>min<%}%>";
				if(<%=containerId%>navSections["<%=id%>"]) {
					state<%=id%> = <%=containerId%>navSections["<%=id%>"]["state"];
				}
				<%=containerId%>navSections["<%=id%>"]={"height":"<%=height%>","state":state<%=id%>,"loaded":false};
				<%=containerId%>navSectionsOrder.push("<%=id%>");
        <% if(Boolean.valueOf((String)control.getPage().getAppInstance().get("app-has-list-tab"))) { %>
        dojo.byId("<%=navContainerId%>_list_button").style.display="<%=onListTab?"none":"flex"%>";
        if(CLEAR_SEARCH){
          CLEAR_SEARCH(dojo.byId('nav_search_field_clear'));
        }
        <%if(onListTab){
          %>dojo.byId("<%=navContainerId%>_list_button").setAttribute('hidden','true');
          document.querySelector('.navContainer').setAttribute('onListTab', 'true');<%
        }
        else {
          %>dojo.byId("<%=navContainerId%>_list_button").removeAttribute('hidden');
          document.querySelector('.navContainer').setAttribute('onListTab', 'false');<%
        }%>
        if(dojo.byId("nav_search_collapse")){
          dojo.byId("nav_search_collapse").style.display="<%=onListTab?"flex":"none"%>";
        }
        <%}%>
        <% String methodName = component.getProperty("menutype").equals("goto")?"fillAppNavSection":"fillNavSection"; 
        if(request.getParameterMap().containsKey("hide-navmenu")){
          wcs.setHideNavMenu(Boolean.valueOf((String)request.getParameter("hide-navmenu")));
        }
        if(!methodName.equals("fillAppNavSection") || !wcs.getHideNavMenu()) {%>
          <%=methodName%>(<%=dataString%>, {"labelledBy":"<%=id%>_label","args":{"content":{"events": dojo.toJson([{"navSectionId":"<%=id%>","containerId" : "<%=containerId%>","classname":"ns_<%=component.getProperty("menutype")%>","showImages" : "<%=showImages%>","isQuery" : "<%=isQuery%>","render" : "true"}])}}});
        <%}%>
				</script>
		<%	}	
		}
		else if(component.needsRender())
		{	%>
			<div style="height: 40px">
				&nbsp;
			</div> 
	<%	}
		if(component.needsRender()) {%>
	<%	}
		else if(needsClose){
			%>]]></component><%
		}
	}	%>
  

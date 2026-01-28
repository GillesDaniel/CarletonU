<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18, 5737-M66
* 
* (C) COPYRIGHT IBM CORP. 2011,2024 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ page contentType="text/html;charset=UTF-8" buffer="none"
%><%@page import="java.util.Iterator"
%><%@page import="psdi.webclient.system.controller.AppInstance"
%><%@page import="psdi.webclient.system.controller.BaseInstance"
%><%@page import="psdi.webclient.system.controller.ComponentInstance"
%><%@page import="psdi.webclient.system.controller.ControlInstance"
%><%@page import="psdi.webclient.system.controller.PageInstance"
%><%@page import="psdi.webclient.system.runtime.WebClientConstants"
%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
%><%@page import="psdi.webclient.system.session.WebClientSession"
%><%
	//This component has no refresh. It's contents are intended to refresh themselves
	ComponentInstance component = ComponentInstance.getCurrent(request);
	ControlInstance control = component.getControl();
	WebClientSession wcs = control.getWebClientSession();
	boolean accessibilityMode = wcs.getAccessibilityMode();
	boolean onListTab = wcs.getCurrentApp().onListTab();
	String id = ((BaseInstance)component).getRenderId().replaceAll("-","_"); //we need to make sure there are no '-' in the IDs
	if(component.needsRender()) {
		Boolean systemNavBar = true; //wcs.showSystemNavBar(control.getPage());
		String servletBase = wcs.getMaximoRequestContextURL() + "/webclient";
		AppInstance app = control.getPage().getAppInstance();
		boolean pageNav = component.getBoolean("pagenav");
		boolean expanded = component.getBoolean("expanded");
		boolean collapsible = component.getBoolean("collapsible");
		String leftNavWidth = wcs.getLeftNavWidth(control.getPage());
		String width = component.getProperty("width");
		String defaultWidth = width;
		String height = component.getProperty("height");
	    String pageMainTabsId = (String)component.getPage().get("maintabsId") != null ? (String)component.getPage().get("maintabsId") : (String)component.getPage().getMainTabId();
	    component.getPage().put("navcontainerid", id);
		if(collapsible){
			width = leftNavWidth;
		}
		String IMAGE_PATH = "";
		if(pageNav) {
			height = "";
		}
		if(!collapsible) {
			expanded = true;
		}
		else if(width.length()>0) {
			int wdth = Integer.valueOf(width);
			wdth -= 9;
			width = String.valueOf(wdth);
		}
			
		if(!height.equals("")) {
			height = "overflow-y:auto; margin-top: 1px; height:"+height+"px;";
		}
		control.setProperty("containerid", id);	
		boolean designMode = wcs.getDesignmode();	
		boolean hideIt = (pageNav && (!systemNavBar)) || wcs.getMobile() || app.isMobile(); %>
	<script type="text/javascript">
		var <%=id%>navSections = {};
		var <%=id%>navSectionsOrder = new Array();
	</script>
	<%
    boolean appHasListTab = Boolean.valueOf((String)app.get("app-has-list-tab"));
   	String searchString = wcs.getMessage("ui","navsearch");
		if("ui/navsearch".equals(searchString)){
			searchString = "Search navigation sections";
		} %>
	<div class="navContainer" style="width:<%=control.getProperty("width")%>px" onListTab='<%=onListTab%>'>
  <%
	String openClose = wcs.getMessage("jspmessages","DrillDownOpenClose");
    String searchWidth = "100%"; 
    String navSearchWidth = "100%"; %>  
    <div style="position: sticky; top: 0px !important; padding-top: 16px">
      <% if(appHasListTab) {  %>
        <div id="<%=id%>_list_button" class="nav-header nav-list-link" style="align-items: center; display: <%=onListTab?"none":"flex"%>">
          <ul class="navMenus" static='true' style='width: calc(100% - 40px);'><li><a href="Javascript: sendEvent('gotolisttab','<%=pageMainTabsId%>','')"><img src="btn_iot18_previous.gif" class="menuimg" aria-label="<%=wcs.getMessage("ui", "backtolisttab")%>"/><%=wcs.getMessage("ui", "backtolisttab")%></a></li></ul>
          <button id="nav_list_collapse" aria-label="<%=openClose%>" class="collapseNav" onClick="toggleNavContainer(event)"><img src="img_menu.gif" aria-label="<%=openClose%>"/></button>
        </div>
      <% } %>
      <div navSearch="true" id="<%=id%>_search" class="nav-header nav-search-field dojoxEllipsis" style="display: flex; align-items: center; width: <%=navSearchWidth%>;">
        <input id="nav_search_field" style='width: <%=searchWidth%>' ctype="navsearch" autocomplete="off" navContainerId="<%=id%>" type="text" class="fld text tt queryField menuSearch" placeholder="<%=searchString%>" promptValue="<%=searchString%>" style="width: 100%; margin-left: 0px;"/>
        <%if(!accessibilityMode){%>
        <button id="nav_search_field_clear" class="clearButton" style="position: absolute;">
          <img id="quicksearch_closebtn" alt="Clear" src="close.gif" draggable="false">
        </button>
        <%}%>
          <button id="nav_search_collapse" aria-label="<%=openClose%>" class="collapseNav" onClick="toggleNavContainer(event)" ><img src="img_menu.gif" aria-label="<%=openClose%>"/></button>  
      </div>
    </div>
    <div id="<%=id%>_search_results" data-search-input-id="nav_search_field" data-menu-holder-id="<%=id%>" class="menu-search-results">
    </div>
		<div id="<%=id%>" state="<%if("1".equals(leftNavWidth)){%>closed<%}else{%>open<%}%>" <%if(designMode){%>onmousedown="stopBubble(event)"<%}%>  cellspacing="0" collapsible="<%=collapsible%>" style="<%if("1".equals(leftNavWidth)){%>display:none;<%}%>overflow: hidden;<%if(designMode){%>cursor: not-allowed;<%}%><%=height%>vertical-align:top;border-spacing: collapse;width:<%=width%>px" pagenav="<%=pageNav%>">
  	<%	if(!hideIt) {
				Iterator i = control.getChildren().iterator();
				boolean needsRender = control.needsRender();
				while (i.hasNext())
				{
					ControlInstance child = (ControlInstance)i.next();
					if(child.getType().equals("navsection")) {
						child.setNeedsRender(control.needsRender());
						child.render();
					}
				}
			}	%>
	  </div>
	</div> 
<% if(!hideIt) { %>
	<script type="text/javascript">
		require(["dojo/on", "dojo/dom"], function(on , dom){
			var searchField = dom.byId('nav_search_field');
      if(searchField){
			  dojo.attr("<%=id%>", {"searchFieldId" : searchField.id});
        on(searchField, 'focus', function(event){
          menus.collapseAll();
          setCurrentfocusFromId(event, this.id);
        });
			  on(searchField, 'keyup', function(event){
  				if(!hasKeyCode(event, KEYCODE_ESC)){
					  menus.menuSearch('<%=id%>','<%=id%>_search_results',this, {'group':'div.navSection','title':'.navTitle'});
            if(event.currentTarget.value){
              event.currentTarget.classList.add('with-value');
            }else {
              event.currentTarget.classList.remove('with-value');
            }
            let appQueryMenu = document.getElementById('app_query_menu');
            if(appQueryMenu){
              let count = getFilteredQueryItemsLength(QUERY_MENU_ITEMS,searchField.value);
              let stringCount = (count?count:'0') + '';
              appQueryMenu.setAttribute('data-count', stringCount);
              if(searchField.value){
                appQueryMenu.classList.add('filtered-queries');
                if(!count){
                  appQueryMenu.classList.add('no-pointer-events');
                  appQueryMenu.setAttribute('aria-disabled', 'true');
                }
                else {
                  appQueryMenu.classList.remove('no-pointer-events');
                  appQueryMenu.removeAttribute('aria-disabled');
                }
                appQueryMenu.firstElementChild.style.paddingInlineEnd = ((stringCount.length * 10) + 46) +'px';
              }
              else {
                searchField.classList.remove('with-value');
                appQueryMenu.classList.remove('filtered-queries');
                appQueryMenu.classList.remove('no-pointer-events');
                appQueryMenu.removeAttribute('aria-disabled');
                appQueryMenu.style.paddingInlineEnd = '0';
              }
            }
				  }
			  });
        let clearSearch = CLEAR_SEARCH = !SCREENREADER && function(field){
          field.value='';	
          field.classList.remove('with-value');
          menus.menuSearch('<%=id%>','<%=id%>_search_results', field, {'group':'div.navSection','title':'.navTitle'});
          if(document.getElementById('app_query_menu')){ 
			let appQueryMenu = document.getElementById('app_query_menu');
			appQueryMenu.classList.remove('filtered-queries');
			appQueryMenu.classList.remove('no-pointer-events');
			appQueryMenu.removeAttribute('aria-disabled');
		  }	
          field.focus();
        }
        
        var searchFieldClear = dom.byId('nav_search_field_clear');
        if(searchFieldClear){
          on(searchFieldClear, 'keypress', function(event){
            if(event.key === 'Enter'){
              clearSearch(event.currentTarget.previousElementSibling);
            }
          });
          on(searchFieldClear, 'click', function(event){
            clearSearch(event.currentTarget.previousElementSibling);
          });
        }
      }
		})

		// delay this as IE wraps the toolbar late in the process and the navbar top position is calculated incorrectly
		function fixIt() {
			fixNavContainer('<%=id%>');
			var navContainer = dojo.byId('<%=id%>');
			<% if (!expanded) { %>
				if (navContainer)
					setNavContainerState(navContainer, 'icon');
			<% } %>
			dojo.connect(window, 'resize', function() {sizePanes('<%=id%>', true)});
			var header = dojo.byId('<%=id%>navcontainerheader');
			if(header) {
				addLoadMethod("dojo.publish('sizeNavHeader', dojo.byId('<%=id%>').clientWidth);");
			}
			if(navContainer) {
				var navWidth = parseInt(navContainer.offsetWidth);
				sizeAnchors(navContainer, navWidth);
			}
			var state = "open";
			if(<%=leftNavWidth%>==1){
				state = "closed";
			}
			dojo.attr(navContainer, "maxwidth", <%=defaultWidth%>);
			setNavContainerState(navContainer, state, false, true);
      addLoadMethod("window.setTimeout(fixIt, 200);");
		}
		var navContainerStrings = {"collapse":"<%=wcs.getMessage("jspmessages","collapsesection",new String[]{""}).replace("  "," ")%>","expand":"<%=wcs.getMessage("jspmessages","expandsection",new String[]{""}).replace("  "," ")%>"};
		addLoadMethod("window.setTimeout(fixIt, 200);");
	</script>
<%		}
		else { %>
	<script type="text/javascript">
		addLoadMethod("killNavContainer('<%=id%>')");
	</script>
	<%	}
	} %>

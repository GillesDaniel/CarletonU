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
%><%@page import="psdi.webclient.controls.Tab"%><%
%><%@page import="psdi.webclient.controls.TabGroup"%><%
	if(component.needsRender() && component.isVisible())
	{
		%><%@ include file="../common/exceptioncontainericon.jsp" %><%
		TabGroup tabGroup = ((TabGroup)control.getParentInstance());
		String format = tabGroup.getProperty("format");
		Tab currentTab = tabGroup.getCurrentTab();
		String currentTabType = currentTab.getProperty("type");
        String tabStep = control.getProperty("step");
		boolean hideForFormat = (format.equalsIgnoreCase("carddeck") || (format.equalsIgnoreCase("navigation") && (currentTabType.equals("list") || control.getProperty("type").equals("list"))));
		if (!hideForFormat || designmode)
		{
			String labelcss = component.getProperty("labelcss");

			if(designmode)
			{
				componentEvents+=" href=\"javascript: showWait(); parent.sendEvent('selecttab','designer','" + id + "');\"";
			}
			else
			{
				componentEvents=" onmouseover=\"return noStatus()\"";
				componentEvents+=" href=\"javascript: sendEvent('click','" + id + "','');\"";
			}
			String tabLabel = component.getProperty("label");
			String tabnum = (String)session.getAttribute("RENDER_tabNum");
			int tabNum = 0;
			if(tabnum != null)
			{
				tabNum = Integer.parseInt(tabnum);
			}

			String tabOnOff = "on";
            String expandedTrueFalse = "true";
			String tabIndex = "-1";
			String done = "";
			if(((Tab)control).isCurrent())
			{
				tabOnOff = "on";
				tabIndex = "0";
                expandedTrueFalse = "true";
			}
			else
			{
				tabOnOff = "off";
                expandedTrueFalse = "false";
    			if(format.equalsIgnoreCase("wizard")){
    				int childIndex = control.getChildIndex();
    				int currentIndex = tabGroup.getCurrentTab().getChildIndex();
    				if(childIndex < currentIndex){
    					done = " done";
    				}
    			}
			}
			if (designSelected && designmode)
			{
				tabOnOff += "sel";
			}

			if(componentDisplay.equals("display:inline"))
			{
				componentDisplay="";
			}

			String automationIdAnchor = "";
			if(automation)
			{
				automationIdAnchor=" automationid=\""+realId+"_anchor\" ";
			}

			String tabImage = "";
			String xmlImage = component.getProperty("image");
			if(format.equalsIgnoreCase("wizard") || xmlImage.length()>0)
			{
				String image = xmlImage; 
				if(format.equalsIgnoreCase("wizard")){
					image = "wizard_step.gif";
				}
				tabImage = "<img src='"+IMAGE_PATH+image+"' border='0' alt=''/>";
			}	
            String wizardLabel = tabLabel;
            if(format.equalsIgnoreCase("wizard")){
                //load the step count into the tablabel, but still need to use label for other part
                tabLabel = tabStep;
                if(!done.equals("")){
                    tabLabel = "";
                }
            }
            %>
			<li role="presentation" class="tab_li_<%=tabOnOff%><%=done%>" id="<%=id%>" ctype="tab"><%
				%><a role="tab" tabindex="<%=tabIndex%>" onFocus="setClickPosition(this)" id="<%=id%>_anchor"<%=automationIdAnchor%> title="<%=tabLabel%>" <%
						if(((Tab)control).isCurrent())
						{
							%> onfocus="setCurrentfocusId(event, this);"<%
						}
						else
						{
							%> onfocus="appendClass(this,'offhover')" onblur="removeClass(this,'offhover')"<%  
						}
						%> class="text tablabel<%=tabOnOff%> <%=tabOnOff%> <%=labelcss%>"aria-expanded="<%=expandedTrueFalse%>" <%
						%> onkeydown="if(event.keyCode==KEYCODE_SPACEBAR){sendEvent('click','<%=id%>','');cancelEvent(event);}else {itemAKey(event,this)}"<%
						%><%=componentEvents%>><%
					if(designmode)
					{
						%><span style="cursor:pointer" onmouseover="this.style.textDecoration='underline';" onmouseout="this.style.textDecoration='';" <%
							%><%=componentEvents%> onclick="parent.sendEvent('selecttab','designer','<%=id%>');cancelEvent(event);"><%
					}
					%><%@ include file="../common/uistatusindicator.jsp" %><%=tabImage%><%=error_icon%><%=tabLabel%><%
					if(designmode)
					{
						%></span><%
					}
                    if(format.equalsIgnoreCase("wizard")){
                        %><div style="padding-top:0.5rem; color:#000000"><%=wizardLabel%></div><%
                    }
				%></a><%

			%></li><%
			tabNum++;
			session.setAttribute("RENDER_tabNum", tabNum + "");
		}
	}	%><%@ include file="../common/componentfooter.jsp" %>

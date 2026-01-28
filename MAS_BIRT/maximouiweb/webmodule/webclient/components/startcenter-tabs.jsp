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
--%><%--
This JSP is the handler for StartCenter-Tabs component.
It provides a container as well implmentation for individual tab that are 
drawn based on the start center settings

Events fire by this component are
- Change Tab - load applicaiton with a unique id
--%>
<%@ include file="../common/simpleheader.jsp" %><%
StartCenterTabs scTabsControl =((StartCenterTabs)control);
ArrayList startCenters = scTabsControl.getRenderData(); %>
<table id="<%=control.getRenderId()%>-tabg" role="presentation" border="0" cellspacing="0" cellpadding="0" class="tabg" width="100%">
	<tr>
		<td class="scTabGroup tabgroupback">
			<div class="tabgroupShell" style="display:flex;">
				<div class="tabContainer">
					<div class="tabScroller tabScroll_left">
						<img id="testing1-img" alt="Scroll Left" src="btn_tab_start_fade.svg" onClick="tabScrollLeft(event)" source="btn_tab_start_fade"
							imgtype=".svg" aria-haspopup="true" align="center" no-bg-hover="" role="button" tabindex="-1" title="Scroll Left" draggable="false" 
							clicked="true" onmouseover="src='btn_tab_start_fade_over.svg'" onmouseout="src='btn_tab_start_fade.svg'"/>
					</div>
					<div class="tabScroller tabScroll_right">
						<img id="testing2-img" alt="Scroll Right" src="btn_tab_end_fade.svg" onClick="tabScrollRight(event)" source="btn_tab_end_fade" 
							imgtype=".svg" aria-haspopup="true" role="button" align="center" no-bg-hover="" tabindex="-1" title="Scroll Right" draggable="false" 
							clicked="true" onmouseover="src='btn_tab_end_fade_over.svg'" onmouseout="src='btn_tab_end_fade.svg'"/>
					</div>
					<div class="tabsWrapper">
						<ul class="tabgroup" nowrap="nowrap" style="white-space:nowrap;overflow:auto;" role="tablist"><%
						String tabOnOff= "on";
						for(int i = 0; i < startCenters.size() ;i++)
						{
							Hashtable htSC = (Hashtable)startCenters.get(i);
							String scconfigId =  htSC.get("scconfigid").toString();
							String scDescription =  WebClientRuntime.makesafevalue(htSC.get("description").toString());					
							boolean current = scconfigId.equals(scTabsControl.getCurrentStartCenterId());
							String highlight="";
							String tabIndex = "-1";
							if(!current)
							{
								tabOnOff= "off";
								highlight="onfocus=\"appendClass(this,'offhover')\" onblur=\"removeClass(this,'offhover')\" ";
							}
							else
							{
								tabOnOff = "on";
								tabIndex = "0";
							}
							//bidi-hcg-AS start	
								if(BidiUtils.isBidiEnabled()) 
								{
									String[] bidiTagAttributes = {"","",""};	
									bidiTagAttributes = BidiClientUtils.getTagAttributes(null,null,"",false);
									if(bidiTagAttributes[2] != null && bidiTagAttributes[2].length() > 0) 
									{
										scDescription = BidiUtils.enforceBidiDirection(scDescription,bidiTagAttributes[2]);		
									} 
								}
							//bidi-hcg-AS end		
							String automationIdAnchor = "";
							if(automation)
							{
								automationIdAnchor="automationid=\""+realId+"_"+scconfigId+"_anchor\"";
							}
								%><li role="presentation" id="<%=id%>_<%=scconfigId%>" ctype="tab"><a onkeydown="itemAKey(event,this)" <%if(current){%>aria-expanded="true"<%}%> role="tab" tabindex="<%=tabIndex%>" nowrap="nowrap" <%=highlight%>href="Javascript: sendEvent('changesc','<%=id%>','<%=scconfigId%>')" id="<%=id%>_anchor_<%=i%>"<%=automationIdAnchor%> title="<%=scDescription%>" class="text tablabel<%=tabOnOff%> <%=tabOnOff%>" onkeypress="if(event.keyCode==KEYCODE_SPACEBAR){sendEvent('changesc','<%=id%>','<%=scconfigId%>')}" onfocus="setCurrentfocusId(event, this);"<%=componentEvents%>>&nbsp;<%=scDescription%></a></li><%
						}	%></ul>
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
			    addLoadMethod('window.setTimeout(sizeTabGroup("<%=control.getRenderId()%>"+"-tabg"),10);');
			    addLoadMethod('scrollToCurrentTab("<%=control.getRenderId()%>"+"-tabg");setChangingTabs(false);');
            }
            var tabgroup = document.getElementById("<%=control.getRenderId()%>"+"-tabg");
            var ul = tabgroup.getElementsByTagName('ul')[0];
            if(ul.childElementCount <= 1 || DESIGNMODE || MOBILE){
                var dropdownButton = tabgroup.getElementsByClassName('tabMenuDiv')[0];
                dojo.style(dropdownButton, {"display": "none"});
            }
		</script>		 
	</tr>
</table>
<%@ include file="../common/componentfooter.jsp" %>

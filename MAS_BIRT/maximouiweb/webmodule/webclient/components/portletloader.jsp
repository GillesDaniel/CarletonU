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
--%><%@page import="psdi.util.HTML"%><%
	String title = HTML.cleanHtml(control.getProperty("label"), true, true, false);%>
<div role="navigation" aria-label="<%=title%>" aria-hidden="<%=!portletStateManager.isMaximised()%>" id='portletbody_<%=layoutId%>_outer' style='display: <%=portletStateManager.isMaximised()?"inline":"none" %>; top:0px;'>
	<table cellspacing="0" cellpadding="0" width="100%" height="100%" role="presentation">
		<tr>
			<td id='portletbody_<%=layoutId%>'>
			</td>
		</tr>	
		<tr>
			<td id="load_<%=layoutId%>" class="plinner plc"><% 
				
				String loading = wcs.getMessage("jspmessages","waitMessage"); 
				String reload = wcs.getMessage("startcntr","reload");
				if(skin.indexOf("iot18")>-1){%><div style="width: 4rem;height: 4rem;" data-loading class="bx--loading bx--loading--small" id="<%=id%>_image" alt="<%=loading%>" aria-label="<%=loading%>" loadinglabel="<%=loading%>" refreshlabel="<%=reload%>">
  					<svg class=" bx--loading__svg " viewBox="-75 -75 150 150 ">
					    <title><%=loading%></title>
					    <circle cx="0 " cy="0 " r="37.5" />
				  	</svg>
				</div><%}else {%><img id="<%=id%>_image" src="<%= IMAGE_PATH + "progressbar.gif"%>" alt="<%=loading%>" aria-label="<%=loading%>" class="pli" loadinglabel="<%=loading%>" refreshlabel="<%=reload%>"/><%}
				String reloadLink = "";//"<a id='"+id+"_retryanchor' aria-label="+reload+" href=\"javascript: sendEvent('refreshdata','"+id+"','refresh')\"><img src='"+IMAGE_PATH+"small_refresh.png' alt='' style='vertical-align: bottom;border: 0px' aria-hidden='true'/>"+reload+"</a>";
				String error = wcs.getMessage("startcntr","failedPortlet", new String[] {reloadLink});
				%></br>
				<span id="<%=id%>_retrylink" style="display:none"><%=error%></span>
			</td>	
		</tr>
	</table> 
</div>                                         
<script><%
	%>
	var def = {};
	def["id"] = "<%=id%>";
	def["title"] = "<%=title%>";
	def["layoutId"] = "<%=layoutId%>";
	def["headerId"] = "<%=control.getProperty("headerid")%>";
	def["reload"] = "<%=reload%>";
	setupPortlet(def);
	addLoadMethod("refreshPortlet('<%=id%>','<%=layoutId%>')");
</script>

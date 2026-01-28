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
This JSP provides the user interface for the graph legend for result set portlet.

Main Events fired from this component are,
- Open Record

CREATED ON: May 2, 2006
--%><%
	String bAlign = ""; 
    if (BidiUtils.isBidiEnabled() && graphDetails.getProperty("align") != null) {
       bAlign = graphDetails.getProperty("align").toString().equals("left")? "style='text-align: left'" : "";
    }
%>    
<table border="0" width="90%" cellspacing="0" cellpadding="0" align="center">
	<tr>
	    <th id="<%=id%>_legend1" width="5%" class="<%=textcss%> khtc">&nbsp;</th>
	    <th id="<%=id%>_legend2" width="55%" class="<%=textcss%> khtc" <%= bAlign%>>&nbsp;&nbsp;<%=HTML.encode(graphDetails.getProperty("attributename"))%></th>							    
	    <th id="<%=id%>_legend3" width="20%" class="<%=textcss%> khtnc"><%=HTML.encode(graphDetails.getProperty("valuetitle"))%>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
	    <th id="<%=id%>_legend4" width="20%" class="<%=textcss%> khtnc"><%=labels[3] %> (%)</th>
	</tr>
	<%
	for(int i = 0; i < graphData.size(); i++)			
	{
		Hashtable htData =  (Hashtable)graphData.get(i);
		String filter = Integer.toString(i+1);

	%>
	<tr>
	    <td width="5%" align="center" valign="middle" headers="<%=id%>_legend1">
	    <%  
	    if(!(groupByAttribute[0].indexOf(".") > -1)) 
	       {
	    %>
			<a tabindex="0" title="<%=openRecordlbl %>" class="text" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) { sendEvent('showrsdata','<%=portletControl.getId() %>',<%= filter %>);}"  href="javascript:sendEvent('showrsdata','<%=portletControl.getId() %>',<%= filter %>);">
		<% } %>	
			    <img alt="TEST" style="background-color:#<%=rsGraph.getColor(i)%>" src="<%= IMAGE_PATH %>chartlegend_frame.gif" border="0" align="absmiddle"/>
		<% 
		if(!(groupByAttribute[0].indexOf(".") > -1)) 
		{ 
		%>		    
			</a>
		<% } %>	    
	    </td>
	    <td width="55%" class="<%=textcss%> rslv"  headers="<%=id%>_legend2" <%= bAlign%>>&nbsp;&nbsp;<%= WebClientRuntime.makesafevalue(htData.get("value").toString()) %></td>
    	<td width="20%" class="<%=textcss%> rslc"  headers="<%=id%>_legend3"><%= htData.get("count").toString() %>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    	</td>
	    <td width="20%" class="<%=textcss%> rslc" headers="<%=id%>_legend4"><%= htData.get("percent").toString() %></td>			    
	</tr>								
<%	}	%>
</table>

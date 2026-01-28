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
String dataAttribute = component.getProperty("dataattribute");
boolean showProperty = true;
String label = component.getProperty("label");
String value = "";

if ( dataAttribute.equalsIgnoreCase("trialexpdays") )
{
	showProperty = false;
	if (!wcs.isPermanentLicense() )
	{
		value = wcs.getEvalDaysRemaining();
		showProperty = true;
	}
}
else
{
	String[] propVal = wcs.getSystemProperty(dataAttribute);
	if(propVal.length==1){
		value = propVal[0];
	}
	else {
		for(int x = 0;x<propVal.length;x++){
			String innerId =  propVal[x];
			innerId = innerId.replaceAll("\\s","_");
			innerId = innerId.replaceAll("'","");
			innerId = innerId.replaceAll("\"","");
			innerId = innerId.substring(0, 30);
			value+="<span style='display:block;' id='"+innerId+"'>"+propVal[x]+"</span>";
		}
	}
}

if (showProperty)
{
%>	<tr id="<%=id%>" <%=automationId%>>
		<td id="<%=id%>_lbl" class="<%=textcss%> label" style="white-space:nowrap;vertical-align:top;" align="<%=reverseAlign%>"><%=label%></td>
		<td id="<%=id%>_value" class="<%=textcss%> label" style="white-space:nowrap;padding-<%=defaultAlign%>:15px;"><%=value%></td>
	</tr>
	<tr height="5px;"><td colspan="2"></td></tr>
<%
}
%><%@ include file="../common/componentfooter.jsp" %>

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
	//String servPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
	String servPath = wcs.getMaximoRequestContextURL();
    String imagePath = "";
	String width = component.getProperty("width");
	String height = component.getProperty("height");
	String thumbnailflag = component.getProperty("thumbnail");
	String label = component.getProperty("label");
	// unsure of this... why did we use this?
	String catchedImageSrc = ((RecordImage)component).getCachedImageSrc();
	String imageSource = ((RecordImage)component).getImageSrc()[0];
	String altText = component.getProperty("alttext");
	if (altText.equals(""))
	{
		altText = ((RecordImage)component).getImageSrc()[1];
	}
	String imageSize = "";
	imageSize = "height=\""+height+"\" width=\""+width+"\" ";
	if(thumbnailflag.equals("true"))
	{
		if(!designmode) {
			componentEvents+="onfocus=\"setCurrentfocusFromId(null, '"+id+"')\" onclick=\"setCurrentfocusFromId('"+id+"');sendEvent('click', '"+id+"', ' ')\" onkeypress=\"if(event.key == 'Enter' || event.key==' '){setCurrentfocusFromId('"+id+"');sendEvent('click', '"+id+"', ' ')}\"";
		}
		imagePath = IMAGE_PATH + "img_placeholder.jpg";
		imageSize = "height=\""+height+"\" width=\""+width+"\" ";
	}
	else
		imagePath = IMAGE_PATH + "img_placeholderEnlarged.jpg";
	
	if (imageSource !=null)
	{
		imagePath = servPath + imageSource;
	} 
	else 
	{
		MaxMessage message = wcs.getMaxMessage("jspmessages","noimageavailable");
		if(message!=null)
			altText = message.getMessage();
		else
			altText="";
	}
	String jsAltText = Javascript.escape(altText);
	String htmlAltText = HTML.encode(altText);
	imagePath += "?" +wcs.getUISessionUrlParameter();
	String margin="";
	String notThumbnail = "";
	String display = "inline";
	if(component.isOnTableRow()){
		display="block";
	}
	if(!thumbnailflag.equals("true"))
	{
		notThumbnail = "tabindex=\"-1\" style=\"padding:0px;overflow:auto;width:"+width+"px; height:"+height+"px\" class=\"recordimagediv\" align=\"center\" ";
	}
	else
	{	
		margin="margin-"+defaultAlign+":3px;";
	}
	
	if(component.needsRender()) 
	{	
        String newAutomationId = "";
        if(automation)
        	newAutomationId="automationid=\""+id+"\"";%>
		<div id="<%=id%>_div" <%=automationId%> <%=notThumbnail%>>
			<img role="button" tabindex="0" id="<%=id%>" class="recordImage <%=cssclass%>" <%=newAutomationId%> aria-live="polite" <%=imageSize%> src="<%=HTML.encodeTolerant(imagePath)%>" style="cursor:pointer;display:<%=display%>;margin:0px;<%=margin%>" alt="<%=htmlAltText %>" title="<%=htmlAltText%>" <%=componentEvents%> align="top">
		</div>
<%	}	
	else
	{	%>
	<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
		el=document.getElementById("<%=id%>");
		if(el)
		{
			el.src="<%=imagePath%>";
			el.alt="<%=jsAltText%>";
			el.title="<%=jsAltText%>";
		}
	</script>]]></component>
<%	}
	%><%@ include file="../common/componentfooter.jsp" %>

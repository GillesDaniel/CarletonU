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
--%><%
	if(!app.isMobile() && !accessibilityMode){
		String moreHelp = wcs.getMaxMessage("jspmessages", "morehelp").getMessage(); 
		String extendedtooltip = component.getProperty("extendedtooltip");
		String rechover = component.getProperty("rechover");
		String hovertooltip = " hovertooltip='"+extendedtooltip+"' ";
		String tooltiptype = WebClientSession.RequestType.HIGHASYNC.toString();
		if(rechover.length()>0) {
			tooltiptype = WebClientSession.RequestType.SYNC.toString();
	        hovertooltip = " hovertooltip='"+rechover+"' ";
	    }
		String tttype = " tttype='"+tooltiptype+"' ";
		int tabIndex = -1;
		if(accessibilityMode) {
			tabIndex = 0;
		}
		String labelId = "";
		if(component.getType().equals("tabletext")){
			labelId = "labelId='"+id+"'";
		}
		String skinName = wcs.getSkin();
		boolean iot18Skin = skinName.indexOf("iot18")>-1;
		String hidden = "";
		String src = "btn10_moreInfo.png";
		if(iot18Skin){
			if(!component.isOnTableRow()){
				hidden = "hidden";
			}
			else {
				src = "img_information.gif";
			}
		}
		helpImage = "<img id='"+id+"_tt' "+hidden+" src='"+src+"' role='button' aria-label='"+component.getProperty("title")+" "+moreHelp+"' class='tooltipMarker' compid='"+id+"' tabindex='"+tabIndex+"' "+hovertooltip+tttype+" ctype='ttimage' "+labelId+" alt=''/>";
	}
%>

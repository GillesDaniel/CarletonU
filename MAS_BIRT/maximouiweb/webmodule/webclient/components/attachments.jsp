<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18, 5737-M66
* 
* (C) COPYRIGHT IBM CORP. 2023,2024 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ include file="../common/componentheader.jsp" %><%

  String attachEvent = control.getProperty("attachevent");
  String attachmentCountProp = component.getProperty("count");
  int attachmentCount = 0;
  if(!WebClientRuntime.isNull(attachmentCountProp)){
    attachmentCount = Integer.parseInt(attachmentCountProp);
  }
  
//TODO - These must come from label or message for localization 
  String mainLabel = wcs.getMessage("ui","attachmentslabelwithcount");
  String mainButtonTitle = wcs.getMessage("ui","viewattachmentstt");
  String menuButtonTitle = wcs.getMessage("ui","attachmentmenutt");
  String replacement = "";
  if(attachmentCount>0){
    replacement = "("+attachmentCount+")";
  }
  mainLabel = mainLabel.replace("{0}", replacement);
  if(component.needsRender()) {
    %><div role="presentation" class="attachments-wrapper" id="<%=id%>_wrapper">
      <div id="<%=id%>_wrapper_sub">
        <button id="<%=id%>_mainbutton" aria-label="<%=mainButtonTitle%>" onkeypress="(()=>{if(event.key==='Enter'){event.currentTarget.click()}})()" onclick="(()=>{setFocusId(event, event.currentTarget);sendEvent('<%=attachEvent%>', '<%=id%>')})()" class="attachments-button" title="<%=mainButtonTitle%>"><%=mainLabel%></button>
        <button id="<%=id%>_menubutton" aria-label="<%=menuButtonTitle%>" onkeypress="(()=>{if(event.key==='Enter'){event.currentTarget.click()}})()" onclick="(()=>{setFocusId(event, event.currentTarget);lastClickElement=event.currentTarget;sendEvent('click', '<%=id%>')})()" title="<%=menuButtonTitle%>"></button>
      </div>
    </div><%
  }
  else {%>
    <script>
        let button = document.getElementById("<%=id%>_mainbutton");
        if(button){
          button.innerText = "<%=mainLabel%>";
        }
    </script>
  <%}
  %><%@ include file="../common/componentfooter.jsp" %>

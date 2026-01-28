<%--
 @license 
 Licensed Materials - Property of IBM
 5724-U18, 5737-M66
 (C) Copyright IBM Corp. 2020,2024 All Rights Reserved.
 US Government Users Restricted Rights - Use, duplication, or disclosure
 restricted by GSA ADP Schedule Contract with IBM Corp.
--%>
<%@page contentType="text/html;charset=UTF-8" buffer="128kb" autoFlush="true" import= "psdi.webclient.system.runtime.WebClientRuntime, psdi.webclient.system.session.WebClientSession, psdi.webclient.system.session.WebClientSessionManager, psdi.webclient.system.controller.*"
%>
<%

	RequestManager mgr = new RequestManager();
	request.setCharacterEncoding("UTF-8");
	WebClientSession wcs = mgr.authenticateRequest(request, response);
	if (wcs != null){
		String uisessionid = wcs.getUISessionID();
		String redirectURL = "../../ui/login";
		if(uisessionid != null)
		{
			redirectURL += "?" + wcs.getUISessionUrlParameter();
		}
		String queryString = request.getQueryString();
		if (queryString != null && queryString.length() > 0){
			redirectURL += (redirectURL.contains("?") ? "&": "?") + queryString;
		}
		response.sendRedirect(redirectURL);
	}
	if (true) return;

%>

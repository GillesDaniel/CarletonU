<%--
* Licensed Materials - Property of IBM
* Restricted Materials of IBM
* 5724-U18, 5737-M66
* (C) COPYRIGHT IBM CORP. 2011,2024 All Rights Reserved.
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
--%><%
	// if menus have already been cached for this seesion we just need to call create with null to allow setting menuControl.cache from cache if there is any
	if(wcs.getMenusCached()==false || !wcs.supportsLocalStorage())
	{
		Menus menuHandler = (Menus)currentPage.getControlInstance(currentPage.getMenuHandlerId());	%>
		menus.createMenuCache(<%=menuHandler.buildMenuCache(component.getId()).serialize()%>);
<%	}
	else
	{	%>
		menus.createMenuCache(null);
<%	}	%>

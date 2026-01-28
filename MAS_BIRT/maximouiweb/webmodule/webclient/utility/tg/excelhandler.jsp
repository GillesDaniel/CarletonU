<%--
/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2018,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
--%>

<%@page contentType="application/vnd.ms-excel"%><%@page pageEncoding="UTF-8"%><%
request.setCharacterEncoding("utf-8");
response.addHeader("Content-Disposition","attachment; filename=\"Export.xls\"");
response.addHeader("Cache-Control","max-age=1, must-revalidate");
out.print(psdi.util.HTML.decode(request.getParameter("Data").replaceAll("&amp;","&"))); %>

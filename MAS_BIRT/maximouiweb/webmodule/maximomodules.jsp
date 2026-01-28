<%--
/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
--%>

<!DOCTYPE html>
<%@ page import="java.util.*" %>
<html>
<head>
  <meta charset="UTF-8">
	<style rel="stylesheet" type="text/css">
	th {
	  height: 50px;
	  font-weight: bold;
	  text-align: left;
	  background-color: #cccccc;
	}
	h1.bold { 
	    text-align: center; 
		font-weight:bolder;
		font-weight:600; }
	p.bold { font-weight:bold; }
	</style>
	

  <title>Maximo APIs</title>
  <link rel="icon" type="image/png" href="images/favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="images/favicon-16x16.png" sizes="16x16" />
 
  <!-- Some basic translations -->
  <!-- <script src='lang/translator.js' type='text/javascript'></script> -->
  <!-- <script src='lang/ru.js' type='text/javascript'></script> -->
  <!-- <script src='lang/en.js' type='text/javascript'></script> -->

  <script type="text/javascript">
  window.onload = function() {
      var url = window.location.href;
	 
      function log() {
        if ('console' in window) {
          console.log.apply(console, arguments);
        }
      }
  }
  </script>
</head>

<body >
<h1 class="bold">MAXIMO API Categories</h1>
<br style = �line-height:1;�><br>
<p class="bold"> Maximo APIs are grouped into modules based on the functional aspect of the software they cater to. You can click the tag in module to see the details for the APIs.</p>
<br style = �line-height:1;�><br>
<div >
<table >
<tr>
<th style="width:25%" align="left" >API Modules</th>
<th style="width:43%" align="left">Description</th>
<th style="width:15%" align="left" >Show All</th>
</tr>
<%
    double num = Math.random();
	Map<String,String> modules = com.ibm.tivoli.maximo.oslc.OslcUtils.getApiModules();
    if (modules != null) {
		Set<Map.Entry<String,String>> set = modules.entrySet();
		for(Map.Entry<String,String> entry : set)
		{
%>
<tr>
<td><a  href="oas3/api.html?module=<%=entry.getKey()%>&#38;includeactions=1&primary=1"> <%=entry.getKey()%></a>&nbsp;</td>
<td style="width:43%"> <%=entry.getValue()%></td>
<td><a  href="oas3/api.html?module=<%=entry.getKey()%>&#38;includeactions=1"><%=entry.getKey()%></a>&nbsp;</td>
</tr>
<%
		}
	}
%>
</table>

</body>
</html>

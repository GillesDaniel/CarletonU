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
--%><%@ include file="../common/simpleheader.jsp" %><%
	TableBody tableBodyControl = (TableBody)control.getParentInstance();
	Table tableControl = (Table)tableBodyControl.getParentInstance();
	TableRow tableRow = (TableRow)control;
	DataBean tableBean = tableControl.getDataBean();
	String rownum = control.getProperty("rownum");
	int row = -5;
	int currentRow = tableBean.getCurrentRow();
	boolean expanded = control.getParentInstance().getProperty("filterexpanded").equalsIgnoreCase("true");
	int rowType = tableRow.getRowType();

	String control_events="";
	String component_events = "";
	String display = component.getProperty("display");
	String rowHeight = "";
	if(tableRow instanceof TableDataRow)
		rowHeight = tableControl.getProperty("datarowheight");
	else if(tableRow instanceof TableTitleRow)
		rowHeight = tableControl.getProperty("titlerowheight");
	else if(tableRow instanceof TableFilterRow)
		rowHeight = tableControl.getProperty("filterrowheight");
	if(!WebClientRuntime.isNull(rowHeight))
		rowHeight="height:"+ component.getWebClientSession().attachUOM(rowHeight);
	boolean evenRow = true;
	String currentRowMarker = "";
	if(rownum!=null)
	{
		row = Integer.parseInt(rownum);
		if(row>=0 && tableRow instanceof TableDataRow)
		{
			if(row==currentRow)
			{
				cssclass+=" tcr";
				currentRowMarker = " currentrow=\"true\"";
				((TableDataRow)tableRow).setCurrentRow(true);
			}
			else
				((TableDataRow)tableRow).setCurrentRow(false);
// Story 06-13334
			if (tableControl.isListTabRetain() && ((ResultsBean)tableControl.getDataBean()).isModifiedRow(row)) 
			{
				String style = tableRow.getProperty("celltext");
				style+= " trmod";
				tableRow.setProperty("celltext",style);	
			}					
		}
		if(row%2==0)
		{
			evenRow = false;
			cssclass+=" trodd";
		}
		else
			cssclass+=" treven";
	}

	if(tableRow.rowVisible())
		display="";
	else
		display="none";

	String keyUp = "";
	String keyDown = "";
	if(rowType==tableRow.FILTERROW)
	{
		keyDown="onkeydown=\"if(event.keyCode == KEYCODE_ENTER) tableRowEnterKeyFlag=1; else tableRowEnterKeyFlag=0;\""; 
    	keyUp="onkeyup=\"if(tableRowEnterKeyFlag==1 && event.keyCode==KEYCODE_ENTER){sendEvent('filterrows','"+id+"','');cancelEvent(event);}\"";
	}
	%><%@ include file="../common/exceptioncontainericon.jsp" %><%
	if(!(tableRow instanceof TableDataRow))
		error_icon = "";
	boolean addCompWrapper = false;
	int newTableRow = tableControl.getNewRowNum();
	boolean forceRender =  newTableRow>=0 && newTableRow==row;
	if(forceRender)
	{
		control.setNeedsRender(true);
	}
	String ariaState = "";

	if(accessibilityMode && (error_icon.equals("") || error_icon.contains("src='blank.gif'"))){
  		ariaState = " aria-hidden=\"true\" ";
	}
	else{
		ariaState = "";
	}
	
	if(component.needsRender())
	{	
		String cData = (String)app.get("incdata");	
		if(hiddenFrame && !Boolean.parseBoolean(cData))
		{	
			addCompWrapper = true; %>
			<component id="<%=id%>_holder" compid="<%=id%>" replacemethod="addTableRow" tableBodyId="<%=tableBodyControl.getTableBodyComponentRenderId()%>" <%=compType%>><![CDATA[
			<table role="presentation" id="<%=id%>_rowholder">
		<%	app.put("incdata","true");
			app.put("startedcdata",component.getId());
		}	
	String tableRenderId = tableControl.getRenderId();
	if(tableRow instanceof TableTitleRow) {
		error_icon="<th id='"+tableRenderId+"errtitle[R:-1]' class='tc'"+ariaState+"style='border-"+reverseAlign+":0px; width: 1px;'>"+error_icon+"</th>";
	}
	else {
		error_icon="<td headers='"+tableRenderId+"errtitle[R:-1]'"+ariaState+"aria-labelledby='"+tableRenderId+"errtitle[R:-1]' class='tc' style='border-"+reverseAlign+":0px; width: 1px;'>"+error_icon+"</td>";
	}
	if(control.getType().equals("tabletoggleselectrows")) {
		cssclass+="tsr";
	}
		String filterInfo = ""; 
		if(tableRow instanceof TableFilterRow){
			String tableLabel = tableControl.getProperty("label");
			if(tableLabel.length() == 0){
				tableLabel = control.getPage().getProperty("label");
			}
			filterInfo += "filter=\"true\" aria-label=\""+HTML.cleanText(tableLabel)+" "+wcs.getMessage("jspmessages","qf_search")+"\"";
		}	%>
	<tr data-has-data="<%=tableBean.hasPageRows()%>" data-filter-open="<%=tableControl.isFilterOpen()%>" id="<%=id%>" <%=filterInfo%> <%=automationId%><%=currentRowMarker%> <%=keyUp%> <%=keyDown%> class="<%=cssclass%>"<%if(display.equals("none")){%> aria-hidden="true" <%}%> style="display:<%=display%>;" <%if(control.getType().equals("tabletoggleselectrows")){%>selectrows="true"<%}%>>
	<% if(!(control instanceof TableToggleSelectRow) && !(tableBean.isSubSelect())){%><%=error_icon%><%} 
	}%><%	component.renderChildComponents(); %><%
	if(component.needsRender())
	{	%>
	</tr>
<%		if(addCompWrapper)
		{	%>
			</table>
		<%@ include file="../common/componentholder_end.jsp" %>
	<%	}
	}
	else
	{	%>
	<%@ include file="../common/componentholder_start.jsp" %>
	<script>
		var row = dojo.byId("<%=id%>");
		if(row)
		{
			hideShowElement(row,"<%=display%>");
      if(row.className.includes('tfr')){
        Array.from(row.parentElement.rows).forEach(row=>{
          row.setAttribute('data-filter-open', "<%=display%>"!=="none")
          row.setAttribute('data-has-data', "<%=tableBean.hasPageRows()%>")
        });
      }
			if("<%=cssclass%>".indexOf("tcr")>-1){
				dojo.query('tr[currentrow="true"]', row.parentNode).forEach(function(tr){
					tr.removeAttribute('currentrow');
				});
			}
			row.className="<%=cssclass%>";
			<% if (newTableRow < 0 && row==currentRow) {%>
				row.setAttribute('currentrow', 'true');
			<%}%>
		}
	</script>
	<%@ include file="../common/componentholder_end.jsp" %>
<%	}	
	if(forceRender)
	{
		control.setNeedsRender(false);
	}
%><%@ include file="../common/componentfooter.jsp" %>

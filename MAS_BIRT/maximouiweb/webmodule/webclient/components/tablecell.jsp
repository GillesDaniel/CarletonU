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
	TableBody tableBodyControl = (TableBody)control.getParentInstance().getParentInstance();
	Table tableControl = (Table)tableBodyControl.getParentInstance();
	int columnCount = tableControl.getColumnCount();
	psdi.webclient.controls.TableCell tableCell = (psdi.webclient.controls.TableCell)component.getControl();
	TableCol tableCol = tableCell.getTableCol();
	String attribute = tableCol !=null ? tableCol.getProperty("dataattribute"):null;
	if(designmode){
		cssclass="scell";
	}
	else{
		cssclass="tc "+cssclass.trim();
	}
	boolean numeric = tableCell.isNumeric();
	boolean ltrOnly = tableCell.isLTROnly();
	boolean preserveTitleAlign = false;
	String leftDir = "dir='ltr' ";
	String rowHeight = "";
	String rtlAlign = "";
    String headerId = "";
	boolean onFilter = false;
	String width = ""; 
	if(((TableRow)control.getParentInstance()) instanceof TableDataRow) {
		rowHeight = tableControl.getProperty("datarowheight");
		headerId = "headers=\""+tableCol.getHeaderId()+"\"";
		String widthProp = control.getProperty("width");
		if(widthProp.length()>0){
			width = "width:"+ component.getWebClientSession().attachUOM(widthProp)+";";
		}
    }
	else if(((TableRow)control.getParentInstance()) instanceof TableTitleRow)
	{
        tableCol.setHeaderId(id);
        rowHeight = tableControl.getProperty("titlerowheight");
		leftDir = "";
		if (BidiUtils.isBidiEnabled() || rtl)
			preserveTitleAlign = true;
	}	
	else if(((TableRow)control.getParentInstance()) instanceof TableFilterRow)
	{
		rowHeight = tableControl.getProperty("filterrowheight");
		onFilter = true;
		headerId = "headers=\""+tableCol.getHeaderId()+"\"";
	}
	else if(((TableRow)control.getParentInstance()) instanceof TableEmptyRow)
    {
        headerId = "";
    }

	if(!WebClientRuntime.isNull(rowHeight))
		rowHeight="height:"+ component.getWebClientSession().attachUOM(rowHeight);

	// This is a bit of a hack for Firefox on Linux and Firefox 3.x on Windows.  For some reason, there is no space
	// between the cells so a 5px padding on the right of each cell is added.
	String padright = "";
	if (((numeric && !onFilter) || request.getHeader("user-agent").indexOf("Linux") > -1 && request.getHeader("user-agent").indexOf("Firefox") > -1)
		|| (request.getHeader("user-agent").indexOf("Firefox/3.") > -1)
		|| ((BidiUtils.isBidiEnabled()) && (request.getHeader("user-agent").toUpperCase().indexOf("MSIE")>-1)) )  //bidi-hcg-SC
	{   //Don't insert padding after last column
		if(!tableControl.isLastColumn(tableCell.getColumnId()))
			padright = "padding-"+reverseAlign+":5px;";
	}

	String extraspace = "";
	if (tableControl.getProperty("spacecolumns").equals("true"))
	{   //Don't insert space after last column
		if(!tableControl.isLastColumn(tableCell.getColumnId()))
			extraspace = "<td>&nbsp</td>";
	}

	DataBean tableBean = tableControl.getDataBean();
	String colSpan = component.getProperty("colspan");
	String height=component.getProperty("height");
	String align=component.getProperty("align");

	//Fix for Static Aligns
	if(defaultAlign.equalsIgnoreCase("right"))
	{
		if(align!=null)
		{
			if(align.equalsIgnoreCase("right"))
			{
				align = "left";
			}
			else
			{
				if(align.equalsIgnoreCase("left"))
					align = "right";
			}
		}
	}
  try{
    if(control.getParentInstance().getType().equalsIgnoreCase("TableEmptyRow") && !WebClientRuntime.isNull(colSpan)){
      int colspanInt = Integer.parseInt(colSpan);
      colSpan = Integer.toString(colspanInt + 1);
    }
  }
  catch(Exception ex){
    //do nothing
  }

  if(!WebClientRuntime.isNull(colSpan)){
    colSpan="colspan=\""+colSpan+"\"";
  }

	if(!WebClientRuntime.isNull(align))
		align="align=\""+align+"\"";

	/*
	 * Used to expand components within a table column
	 */
		int currentRow = tableBean.getCurrentRow();
		int myRow = ((TableRow)control.getParentInstance()).getRow();
		String click="";
		boolean current = false;
		String over = "";
		if(myRow>=0)
		{
			if(myRow==currentRow)
				current=true;
			click="tcClick(event,'"+id+"')";
			//if(!(tableControl.isTableSelectRowsOpen().equals("true")))
				//over+=" onmouseover=\"appendClass(this.parentNode,'trh')\" onmouseout=\"removeClass(this.parentNode,'trh')\"";
		}


	if(designmode)
	{
		if(myRow==-1)
			cssclass="tcdm";
	}
	
	String columnDisplay = "";
	boolean hiddenBySigOrLic = ((!designmode && !componentVisible) || control.isHiddenByLicense());
	boolean rowByRow = false;
    String ariaState = "";
	if( hiddenBySigOrLic || (tableCol!=null && tableCol.getProperty("mxevent").equals("toggleselectrow") && !tableControl.getRowSelectVis() && !designmode)) {
		String sigoptionDatasrc = tableCol.getProperty("sigoptiondatasrc"); //12-11288 && 12-11590 - must hide column in a different way depending on how sigoption is implemented
		if(!"".equals(sigoptionDatasrc)) {
			DataBean dataBean = app.getDataBean(sigoptionDatasrc);
			if(dataBean == tableControl.getDataBean()) {
				rowByRow = true;
			}
		}
		else {
			rowByRow = true;
		}
		if(!rowByRow) {
			columnDisplay="display:none;";
      		ariaState = " aria-hidden=\"true\" ";
		}
		else {
			componentDisplay="display:none;";
		}
	}
	boolean isRowDeleted=(myRow>=0 && tableControl.getDataBean().isRowDeleted(myRow));
	if(isRowDeleted)
		cssclass+=" trdr";
	String elementType = "td";
	String scope = "";
	if(tableCell.getRow() instanceof TableTitleRow)
	{
		elementType = "th";
		scope = " scope='col' ";
		if(preserveTitleAlign)
		{
			rtlAlign = "text-align:right;";
		}
		
		if(tableCol.getProperty("mxevent").equals("toggleselectrow") && (request.getHeader("user-agent").toUpperCase().indexOf("MSIE")>-1))
		{
			cssclass+=" tcolmulti";
		}
	}
	if(!hiddenBySigOrLic || rowByRow) {
		if(component.needsRender())
		{
			String rMargin = "3";
			if(myRow<0)
				rMargin="3";
		String style = "";
		if(numeric){
			style+="text-align:"+reverseAlign+";";
		}
		style+=columnDisplay;
		style+=rowHeight;
		style+=padright;
		style+=rtlAlign;
		style+=designerSelected;
		style+=width;
		
		if(tableCol!=null && tableCol.hasRecordHover(component) && !app.isMobile() && !accessibilityMode){
			cssclass += " helpHover";
		}
	%>	<<%=elementType%> id="<%=id%>" tablecell="1"<%=scope%><%if(designmode){%> control="true" <%}%><%=automationId%> <%=ariaState%> <%=colSpan%> <%=over%> <%if(numeric){%>numeric="true"<%}%> <%
				if(control.getParentInstance().getType().equals("tabletitlerow") && skin.indexOf("iot18")>-1){
					int size = 5; 
					if(!WebClientRuntime.isNull(attribute)){
						MboValueInfoStatic mboValueInfo = tableControl.getDataBean().getMboValueInfo(attribute);
						if(mboValueInfo != null){
							size = WebClientRuntime.getWebClientRuntime().getFieldSize(true,mboValueInfo.getTypeAsInt(), (int)tableCol.size) + (tableCol.getProperty("lookup").length()>0?4:0);
							if(size < 8){
								size = 8;
							}
						}
					}
					double dSize = (size*1.2);
					if(dSize > 40 && tableControl.getProperty("inputmode").indexOf("readonly")==-1){
						dSize = 40;
					}
					style += "; width: " +dSize+"ch";
				}
				List children = control.getChildren();
				if(children != null && children.size() > 0){
					ControlInstance child = (ControlInstance)children.get(0);
					if(child != null && (child.getType().equals("textbox") || child.getType().equals("combobox"))){
						style += ";white-space: nowrap !important;";
					}
				}
				if(style.length()>0){
					style = "style='"+style+"'";
				}
				%> <%=style%><%
				%> class="<%=cssclass%>" <%=headerId%> <%=componentEvents%> <%=align%>><%if(rowByRow && hiddenBySigOrLic){%><br/><%}%><%	}
		List groupChildren = component.getChildren();
		if (groupChildren != null )
		{
			Iterator childIterator = groupChildren.iterator();
			while (childIterator.hasNext())
			{
				ComponentInstance groupChild = (ComponentInstance)childIterator.next();
				groupChild.setChangedFlag();
				groupChild.render();
			}
		}
		if(component.needsRender())
		{
	%><%=extraspace%></<%=elementType%>>
	<%	}
		else
		{
			String compDisplay = componentVisible?"inline":"none";								
	%>		<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
				el = document.getElementById("<%=id%>");
				if(el)
				{
					el.className="<%=cssclass%>";
					el.setAttribute("currentrow","<%=current%>");
				}
				el_inner=document.getElementById("<%=id%>_inner");
				if(el_inner)
				{
					hideShowElement(el_inner,"<%=compDisplay%>");
				}
			</script>]]></component>
	<%	}
	}
	else
	{	%>
			<script>
				dojo.query('td[headers="<%=id%>"]').forEach(function(td){
					dojo.style(td,{"display":"none"});
				});
			</script>
<%	}
	
%><%@ include file="../common/componentfooter.jsp" %>

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
	if(designmode)
	{	%>
		<%@ include file="../common/designerevents.jsp" %>
<%  }
	/*
	 * Used to pass render/refresh to the dynamically created children in table columns
	*/
        Table tableControl = (Table)control.getParentInstance();
        boolean tableExpanded=tableControl.getFlagValue(DataBean.TABLE_EXPANDED) || designmode;
        int currentRow = tableControl.getCurrentRow();
        String disp = "";
        String width = tableControl.getProperty("width");
        width = component.getWebClientSession().attachUOM(width);
        boolean useWidth = false;
        if(!tableExpanded || !componentVisible)
            disp="display:none";
        if(!ismobile && !WebClientRuntime.isNull(width))
        {
        	width="width:"+width+";overflow-x:scroll;";
        	useWidth=true;
        }
        else
        	width="width:100%";	
		boolean refreshAll = tableControl.getFlagValue(DataBean.TABLE_REFRESH_ALL_ROWS) && tableControl.getNewRowNum()==-1;
		String displayRowsPerPage = control.getProperty("displayrowsperpage");
		int displayRows=tableControl.getDataBean().getPageRowCount();
		//APAR IJ46369 CHECK BOXES ON TABLES ROWS ARE NOT BEING REFRESHED WHEN EDIT MODE IS ENABLED
		String recLock = (String)control.getPage().getAppInstance().get("RECLOCKCHANGED");
		//APAR IJ46369
		if(component.needsRender() || refreshAll || !WebClientRuntime.isNull(recLock))
    	{
       		control.setNeedsRender(true);
            String newAutomationId = "";
            if(automation)
                newAutomationId="automationid=\""+realId+"_bodyholder\"";
            String borderCollapse = "";
            if(!USERAGENT.equals("IE"))
            	borderCollapse="border-collapse:separate;";
  			if(component.rerendering() && hiddenFrame)
			{	
				holderId=id+"_bodyholder";
				%><%@ include file="../common/componentholder_start.jsp" %>
        <script pre="true">
          moveTableDetailsBack('<%=tableControl.getRenderId()%>');
        </script><%
			}
			TableBody bodyControl = (TableBody)control;
			ComponentInstance labelledByComponent = tableControl.findUseForLablledByComponent();
			bodyControl.setTableBodyComponentRenderId(id); 
  			String summary = "";
  			String tableLabel = tableControl.getProperty("label");
  			boolean tableHasLabel = tableLabel.length()>0;
      DataBean dataBean = tableControl.getDataBean();
      boolean subSelectOn = dataBean.getTableStateFlags().isFlagSet(dataBean.TABLE_SUBSELECT_ON);
			if(!tableHasLabel){
				tableLabel = control.getPage().getProperty("label");
				tableHasLabel = tableLabel.length()>0;
			}

  			if(tableHasLabel){
  				summary = tableLabel;
  				labelledByComponent = null;
			}
  			else {
				summary = labelledByComponent.getProperty("title");
  			}%><%if(debug){%><!-- BEGIN Tablebody --><%}%>
  			<%if(!accessibilityMode){%>
					<div aria-hidden="true" id="<%=control.getId()%>_rowholder" style='display:none'></div><%}
			%>
					<table data-multi="<%=subSelectOn%>" id="<%=id%>" aria-label="<%=HTML.cleanText(summary)%>" rownum="<%=currentRow%>" <%if(tableHasLabel && labelledByComponent!=null){%>aria-labelledby="<%=labelledByComponent.getRenderId()%>"<%}%> rowsperpage="<%=displayRowsPerPage%>" displayrows="<%=displayRows%>" <%=automationId%> valign="top" summary="<%=HTML.cleanText(summary)%>" <%=componentEvents%> style="<%=borderCollapse%><%=disp%>" class="<%=cssclass%>">
	<%	}
       	if(tableExpanded)
       	{
       		Iterator i = control.getChildren().iterator();
		    boolean needsRender = component.needsRender();
		    DataBean tableBean = tableControl.getDataBean();
		    ResultsBean resultsBean = app.getResultsBean();
		    boolean subsel = tableControl.getFlagValue(DataBean.TABLE_SUBSELECT_ON) && (tableBean==resultsBean || (resultsBean==null && tableBean==app.getAppBean()));
	       	TableDataRow row =
	       	 (TableDataRow) tableControl.getRowControl();
	   		int offsetNum = tableControl.getDataBean().getTableOffset();
			int oldCurrent = tableControl.getOldCurrentRow();
		    while (i.hasNext())
			{
		        ControlInstance child = (ControlInstance)i.next();
		        if(child instanceof TableRow)
				{
		        	if(child instanceof TableDataRow && (!subsel && !(child instanceof TableDataRowMock)) || (subsel && child instanceof TableDataRowMock))
					{
						int thisRow = -1;
			   			if(needsRender || designmode || refreshAll)
			   			{
					   		for(int rowNum=0; rowNum<displayRows;rowNum++)
					   		{
					   			thisRow = offsetNum+rowNum;
								if(needsRender)
									row.setNeedsRender(true);
					   			row.renderDataRow(thisRow);
					   			if(thisRow==currentRow)
					   				tableControl.setOldCurrentRow(thisRow);
					   		}
			   			}
			   			else
			   			{
			   				int eventRow = -1;
			   				if (originalEvent.getSourceControlInstance() != null && currentPage.equals(originalEvent.getSourceControlInstance().getPage()))
			   				{
				   				eventRow = originalEvent.getRow();
			   				}

			   				thisRow = oldCurrent;
			   				if (thisRow != eventRow)
			   				{
			   					if(thisRow>=0 && offsetNum <= thisRow && thisRow < (offsetNum + displayRows))
			   					{
                    %> <!-- begin data row --> <%
			   						row.renderDataRow(thisRow);
                    %> <!-- end data row --> <%
			   					}
			   				}
			   				
			   				thisRow = currentRow;
			   				tableControl.setOldCurrentRow(thisRow);
			   				if (thisRow != eventRow && thisRow != oldCurrent)
			   				{
				   				if(thisRow>=0 && offsetNum <= thisRow && thisRow < (offsetNum + displayRows))
				   				{
				   					%> <!-- begin data row --> <%
			   						row.renderDataRow(thisRow);
                    %> <!-- end data row --> <%
				   				}
			   				}

			   				// IV72730: The control properties are set to the last row rendered. So we need to render the event row last.
			   				thisRow = eventRow;
			   				if (thisRow != -1)
			   				{
				   				if(thisRow>=0 && offsetNum <= thisRow && thisRow < (offsetNum + displayRows))
				   				{
				   					%> <!-- begin data row --> <%
			   						row.renderDataRow(thisRow);
                    %> <!-- end data row --> <%
				   				}
			   				}
			   			}
					}
					else
					{
						if(!(tableControl.getDataBean().isSubSelect() && child instanceof TableFilterRow))
						{
							boolean doRender = false;
							if(child instanceof TableToggleSelectRow && tableControl.getFlagValue(DataBean.TABLE_SUBSELECT_ON))
								doRender=true;
							else if(child instanceof TableFilterRow)
								doRender=true;
							else if(child instanceof TableTitleRow && tableControl.getFlagValue(DataBean.TABLE_REFRESH_TITLE))
								doRender=true;
							else
								doRender=false;
							if(doRender || needsRender)
							{
								if(needsRender)
									child.setNeedsRender(true);
								if(debug){%><!-- <%=child.getType()%> --><%}
								child.render();
							}
						}
					}
				}
			}
       	}
        if(component.needsRender())
		{	%>
						</table>
						<script>
							window.setTimeout(function(){
								fixTableAndHeader('<%=tableControl.getRenderId()%>');
							}, 50);
						</script>
				<%	if(useWidth)
					{	%>
					<script>
						//This code fixes problem when the header is too wide to fit in defined width of the table.
						//It will look at the body width and match it to it's parent.
						var outer = document.getElementById("<%=id%>_bodyholder");
						var inner = document.getElementById("<%=id%>_bodyholder1");
						if(outer && inner && (outer.offsetWidth>inner.offsetWidth))
							inner.style.width=outer.offsetWidth + "px";
					</script>
				<%	}
					if(component.rerendering() && hiddenFrame)
					{
						%><%@ include file="../common/componentholder_end.jsp" %><%
					}
    		if(component.rerendering())
    		{
   				control.setNeedsRender(false);
    		}
		}
        else
        {	%>
	<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
        window.setTimeout(function(){
			fixTableAndHeader('<%=tableControl.getRenderId()%>');
		}, 50);
	</script>]]></component>
	<%	}	
        tableControl.wasTableRowChanged();
	%><%@ include file="../common/componentfooter.jsp" %>

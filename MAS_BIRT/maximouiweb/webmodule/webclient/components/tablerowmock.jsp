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
	TableBody tableBodyControl = (TableBody)control.getParentInstance();
	Table tableControl = (Table)tableBodyControl.getParentInstance();
	TableRow tableRow = (TableRow)control;
	String tableRenderId = tableControl.getRenderId();
	DataBean dataSource = tableControl.getDataBean();
	int row = tableRow.getRow();
	int currentRow = dataSource.getCurrentRow();
	String cbSrc=IMAGE_PATH+"table_cb_unchecked.gif";
	String cbTtitle = wcs.getMaxMessage("tableinfo","cntrlTableAltSelectDataRow").getMessage();
	String control_events="";
	String component_events = "";
	String display = "";
	String mxejse = "";
	if(row%2==0)
		cssclass+=" trodd";
	else
		cssclass+=" treven";
	if(tableRow.rowVisible())
		display="";
	else
		display="none";
	String checked = "unchecked";
	if(tableRow.rowVisible()) //Don't try to call methods on invisible rows as they probably don't have data.
	{
		if(dataSource.isSelected(row))
		{
			cbSrc=IMAGE_PATH+"table_cb_checked.gif";
			cbTtitle += " " +wcs.getMessage("ui","checked");
			checked = "checked";
		}
		else
			cbTtitle += " " +wcs.getMessage("ui","unchecked");
	}
	if(component.needsRender() || row==currentRow)
	{
		boolean expanded = control.getParentInstance().getProperty("filterexpanded").equalsIgnoreCase("true");
		int rowType = tableRow.getRowType();

		if(rownum!=null)
		{
			if(row>=0 && tableRow instanceof TableDataRow)
			{
				if(row==currentRow)
				{
					cssclass+=" tcr";
					((TableDataRow)tableRow).setCurrentRow(true);
				}
				else
					((TableDataRow)tableRow).setCurrentRow(false);
			}
		}
	}
// Story 06-13334
	String hoverClass = "trh";
	if (tableControl.isListTabRetain()) 
	{
		if (tableControl.getDataBean().isModifiedRow(row)) 
		{
			cssclass+= " trmod";
		}
		else if (tableControl.getDataBean().isRowDeleted(row)) 
		{
			if(row==currentRow)
			{		
				cssclass = cssclass.replaceAll("tcr","trdrcr");
			} 
			else 
			{
				cssclass+= " trdr";
			}
			hoverClass = "trdrch";
		}			
	}	
	if(component.needsRender())
	{	%>
<tr id="<%=tableRow.getRenderId()%>[R:<%=row%>]" class="<%=cssclass%>" style="display:<%=display%>;"> <%
//we need to render all of the column data now
		List columnControls = tableBodyControl.getChildren();
		Iterator cols = columnControls.iterator();
		String dataString = "&nbsp;";
		int colCount = 0;
		String eventIcon = null;
		String eventDesc = null;
		String mxEvent = null;
		componentEvents="";
		//componentEvents+=" onmouseover=\"return noStatus();\"";
		//componentEvents+=" onfocus=\"input_onfocus(event,this);\"";
		//componentEvents+=" onblur=\"input_onblur(event,this);\"";
		String compEvents = "";
		String newId = WebClientRuntime.parseParamForRow(wcs,id)[0];
		String webclientWrap = WebClientRuntime.getWebClientProperty("webclient.wraplength", "75");
		boolean canBreakWords=Boolean.valueOf(WebClientRuntime.getWebClientProperty("webclient.canbreakwords","true")).booleanValue();
		boolean hyphenBreaks=Boolean.valueOf(WebClientRuntime.getWebClientProperty("webclient.addhyphentobreak","false")).booleanValue();
		String fldInfo = "";
		String mainTab = control.getPage().getMainTabId();
		boolean rowSelected = dataSource.isSelected(row); 
		// APAR 69800	
		boolean wrapReadOnlyColumns = Boolean.valueOf(WebClientRuntime.getWebClientProperty("webclient.wrapreadonlycolumns","true")).booleanValue();
		String selected = null;
		String className = null;
		boolean recLock = false;
		String headerId = "";
		while (cols.hasNext())
		{
			className = "";
			Object col = (Object)cols.next();
			if(col instanceof TableCol)
			{
				String renderId = control.getRenderId()+"[R:"+row+"][C:"+colCount+"]";//tableRenderId + "[R:"+row+"]"+ "[C:"+colCount+"]";
				TableCol columnControl = (TableCol) col;
				headerId = "headers=\""+columnControl.getHeaderId()+"\"";
				recLock = "ISRECLOCK".equals(columnControl.getProperty("sigoption")) && dataSource!=null && dataSource.isRowLocked(row);
				isNumeric = columnControl.isNumeric();
				eventIcon = columnControl.getProperty("mxevent_icon");
				eventDesc = columnControl.getProperty("mxevent_desc");
				mxEvent = columnControl.getProperty("mxevent");
				dataString="";
				if((!WebClientRuntime.isNull(mxEvent) && !mxEvent.equalsIgnoreCase("selectrecord")) && (!isNumeric || mxEvent.equalsIgnoreCase("toggleselectrow")) || (recLock))
				{
					if(mxEvent.equalsIgnoreCase("toggleselectrow"))
					{
						mxejse="mxejse='trmHdlr' ";
						//specialized id, we don't want to walk the columns to find the select for the refresh
						compEvents+=" onfocus=\"input_onfocus(event,this);\"";
						compEvents+=" onblur=\"input_onblur(event,this);\"";
						compEvents+=" onclick=\"cancelEvent(event);setCurrentfocusFromId(event, '"+newId+"_"+row+"_sel_a'); fixMockedLink('"+id+"_"+row+"_sel', '"+id+"_row_link'); sendEvent('toggleselectrow','"+renderId+"','"+row+"');\"";
						compEvents+=" onkeydown=\"if(event.keyCode==KEYCODE_SPACEBAR || event.keyCode==KEYCODE_ENTER){console.log('clickit');cancelEvent(event);setCurrentfocusFromId(event, '"+newId+"_"+row+"_sel_a'); fixMockedLink('"+id+"_"+row+"_sel', '"+id+"_row_link');sendEvent('toggleselectrow','"+renderId+"','"+row+"');}\"";
						dataString="<a id=\""+newId+"_"+row+"_sel_a\" href=\"javascript: void(0);\" title=\""+cbTtitle+"\"  style=\"cursor:default\" "+componentEvents+" "+compEvents+"><img border=\"0\" alt=\""+cbTtitle+"\" tabindex=\"-1\" align=\"texttop\" id=\""+id+"_"+row+"_sel\" selrow=\"true\" class=\"\" src=\""+cbSrc+"\" style=\"cursor:default\" checked=\""+checked+"\" /></a>";
					}
					else if(!WebClientRuntime.isNull(eventIcon))
					{
						if(!recLock){
							compEvents=" onclick=\"cancelEvent(event);setCurrentfocusFromId(event, '"+newId+"_"+row+"_sel_a');sendEvent('click','"+renderId+"','"+mxEvent+"[R:"+row+"]');\"";
							//compEvents+=" onkeydown=\"if(event.keyCode==KEYCODE_SPACEBAR || event.keyCode==KEYCODE_ENTER){cancelEvent(event);setCurrentfocusFromId(event, '"+newId+"_"+row+"_sel_a');sendEvent('toggleselectrow','"+renderId+"','"+row+"');}\"";
							dataString="<a href=\"javascript: cancelEvent(event);setCurrentfocusFromId(event, '"+newId+"_"+row+"_sel_a');sendEvent('toggleselectrow','"+renderId+"','"+row+"');\" title=\""+cbTtitle+"\" tabindex=\"0\" style=\"cursor:default\" "+componentEvents+" "+compEvents+">";
						}
						else {
							String lockedDisplayName = dataSource.getMbo(row).getLockedByDisplayName();
							eventDesc = wcs.getMessage("jspmessages", "lockedby", new String[] { lockedDisplayName });
						}
						dataString+="<img id=\""+newId+"_"+row+"_"+colCount+"\" border=\"0\" "+componentEvents+" src=\""+IMAGE_PATH+""+eventIcon+"\" style=\"cursor:pointer;margin:0px;\" alt=\""+eventDesc+"\"/>";
						if(!recLock){
							dataString+="</a>";
						}
					}
				}
				else if(dataSource!=null)
				{
					String da = columnControl.getProperty("dataattribute");
					String ds = columnControl.getProperty("datasource");
					if(!WebClientRuntime.isNull(da))
					{
						dataString = dataSource.getString(row,da);
						if (dataSource.isMboHidden(row) || dataSource.getMboValueData(row, da).isHidden())
						{
							dataString = "XXXXXX";
						} 
						if(columnControl.hasInternalControls() && columnControl.getChildren().get(0).getType().equals("image"))
						{
							if (dataString == null || dataString.trim().length() == 0)
							{
								dataString = "blank";
							}
							if (dataString.indexOf(".gif")==-1 && dataString.indexOf(".jpg")==-1 && dataString.indexOf(".png")==-1)
							{
								dataString += ".gif";
							}
							dataString="<img id=\""+newId+"_"+colCount+"[R:"+row+"]\" border=\"0\" src=\""+IMAGE_PATH+dataString+"\" style=\"display:block;margin:0px;margin-top:2px;margin-"+wcs.getAlignment().begin+":2px;\" alt=\"\"/>";
						}
						else
						{
							if (dataString.indexOf(HTML.RICH_TEXT_MARKER) > 0)
							{
								dataString = HTML.toPlainText(dataString);
							}
							//must handle get properties from column directly as renderPropertyCache prevents us from resetting it for each column
							int wrapInt = 75;
							String wrap = columnControl.getProperty("wraplength");
							if(WebClientRuntime.isNull(wrap))
							{
								wrap = component.getProperty("wraplength");
								if(WebClientRuntime.isNull(wrap))
									wrap = webclientWrap;
							}
							// 	APAR 69800	
							boolean wrapText = wrapReadOnlyColumns;
																			
							if (!wrapText)
							{
								if(dataString.length() > Integer.parseInt(wrap))
									dataString = dataString.substring(0, Integer.parseInt(wrap)-4) + "...";
							}
							
							// End 	APAR 69800	
							try
							{
								wrapInt=Integer.parseInt(wrap);
							}
							catch(NumberFormatException numEx)
							{
	
							}
							String localCanBreak = columnControl.getProperty("canbreakwords");
							if(!WebClientRuntime.isNull(localCanBreak))
								canBreakWords=Boolean.valueOf(localCanBreak).booleanValue();
							String localHyphenBreak = columnControl.getProperty("addhyphentobreak");
							if(!WebClientRuntime.isNull(localHyphenBreak))
								hyphenBreaks=Boolean.valueOf(localHyphenBreak).booleanValue();
							dataString = WebClientRuntime.wrapText(dataString, wrapInt, canBreakWords, hyphenBreaks);
							dataString = HTML.encodeTolerant(dataString);
						}
						if(colCount == 1) {
							if(rowSelected) {
								className = " anchor cur_h";
								selected=" selected='true' row='"+row+"' ";
							}
						}
					}
				}
				if(WebClientRuntime.isNull(dataString))
					dataString="&nbsp";

				String align = "";
				String padding="";
				if(isNumeric && !mxEvent.equalsIgnoreCase("toggleselectrow"))
				{
					align="align='"+reverseAlign+"'";
					padding="style='padding-"+reverseAlign+":10px'";
				} 
				%>
				<td <%=mxejse%><%=selected%><%=fldInfo%> <%=headerId%> id="<%=renderId%>" <%if(async){%>async="1" <%}%> ctype="mockrow" hoverclass="<%=hoverClass%>" class="text tcolmulti tabletext<%=className%>" <%=align%> <%=padding%>><%=dataString %></td>
			<%	colCount++;
			}
		}	%>
 </tr><%
	}
	else
	{	%>
	<component id="<%=id%>_holder"<%=compType%>><![CDATA[<script>
		tRow = document.getElementById("<%=id%>");
		if(tRow)
		{
			hideShowElement(tRow,"<%=display%>");
			tRow.className="<%=cssclass%>";
		}
		addLoadMethod("document.getElementById('<%=tableRow.getRenderId()%>[R:<%=row%>]').className='<%=cssclass%>';");
		cb = document.getElementById("<%=id+"_"+row+"_sel"%>");
		if(cb)
		{
			cb.src="<%=cbSrc%>";
			cb.alt="<%=cbTtitle%>";
			if(SCREENREADER && cb.parentElement && cb.parentElement.title){
				cb.parentElement.title = cb.alt;
			}
		}
	</script>]]></component>
<%	}
 %><%@ include file="../common/componentfooter.jsp" %>

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
--%><%--
This JSP is the handler for Inbox Portlet component.
It provides the user interface for the portlet.

Main Events fired by this component are
- Open Assignment Record
- Update Inbox
- Route Assignment

CREATED ON: April 18, 2006
--%>
<%@ include file="../common/simpleheader.jsp" %><%
String layoutId =  component.getProperty("layoutid");
InboxPortlet portletControl = (InboxPortlet)control;
PortletStateImpl portletStateManager = portletControl.getStateManager();

//intially when the portlet has not been loaded
//if the portlet has not been loaded ever call this.
//once its loaded we do not clear the flag
if(portletStateManager.isPortletNotLoaded(component))
{
%><%@ include file="portletloader.jsp" %><%
}
else
{
	synchronized (portletControl.getAppBean().getPortletLoadingSync())
	{
	String sortLabel = wcs.getMessage("startcntr","sortlbl");
	Vector inboxColumns = null;
	ArrayList inboxNonPersistentColumns = null;
	String arrColumn[] = null;
	MboValueData assignments[][] =  null;
	MboValueData keyAttributeData[][] =  null;
	MboSetInfo[] mboSets = null;
	int noOfRecords = 0;
	int iStart 			= 0;
	int iEnd  			= 0;
	int rowsToDisplay = 5;
	String latestDate = "";
	String descTitle = "";
	String sortType = "";
	String sortAttribute = "";
	String nextSort = "";
	String labels[] = portletControl.getLabels();
	int noOfCols = 0 ;
	String calType = control.getWebClientSession().getUserInfo().getCaltype();
	
	//Take off labels 1,2,3,8
	boolean changed = control.hasChanged();
	boolean stateChanged = portletStateManager.isPortletStateChanged();
	
	String statusEvents = "onmouseout=\"return noStatus();\" "+
					"onfocus=\"return noStatus();\" "+
					"onmouseover=\"return noStatus();\" "+
					"onkeypress=\"if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('refreshdata','"+control.getId()+"','refresh');}\" ";
	
	//if just porlet was minimised  then don't re render as there is no need to redraw
	//but this flag had to be turned on when these events were fired so that jsp could be hit
	if(stateChanged)
		portletControl.setChangedFlag(false);
	boolean load = false;
	if((portletStateManager.wasPortletLoadCalled()) 
			|| (portletStateManager.isPortletLoaded() && component.hasChanged() && !stateChanged))
	{
		load = true;
	 	try
	 	{
			inboxColumns 		= portletControl.getInboxColumns();
			noOfCols = inboxColumns.size();
	
			//If portlet is not configured with columns, then just get count
			if(noOfCols > 0)
			{
				mboSets = portletControl.getSetsInfo();         //bidi-hcg-SC
				assignments 		= portletControl.getAssignments();
				noOfRecords 		= portletControl.getNoOfAssignments();
				descTitle 			= portletControl.getDescTitle();
				if (BidiUtils.isBidiEnabled() && mboSets[1] != null)           //bidi-hcg-SC
					descTitle = BidiUtils.applyBidiAttributes(mboSets[1], "", descTitle, s);
				keyAttributeData 	= portletControl.getKeyAttributeData();
				latestDate			= portletControl.getLatestDate();
				inboxNonPersistentColumns =  portletControl.getNonPersistentColumns();
			}
	
			sortType = component.getProperty("sorttype");
			sortAttribute = component.getProperty("sortattribute");
			
			iStart = Integer.parseInt(component.getProperty("start"));
			
			rowsToDisplay	= Integer.parseInt(component.getProperty("rowstodisplay"));
			if(rowsToDisplay == 0)
				rowsToDisplay = 10;
	
			iEnd 	= iStart+rowsToDisplay;		
		}
	 	catch(Throwable e ) {
	 		if(wcs.getDebugLevel() > 0) {
				e.printStackTrace();
	 		}
			load = false;
		}
		
		
		holderId="portletbody_"+layoutId;
	%><component vis="true"  ignrdispstyle="true" id="<%=id%>_holder" holder="<%=holderId%>" comptype="<%=component.getType()%>"><![CDATA[<%
		String colId = "col_"+id;
	   if(load) { %>
	     		<table aria-label="<%=HTML.encodeTolerant(component.getProperty("arialabel"))%>" summary="<%=HTML.encodeTolerant(component.getProperty("arialabel"))%>"width="100%" cellspacing="0" cellpadding="0" align="<%=defaultAlign%>" class="plinner">     		
	           	 <%
	           	 	String headingsString = "";
	     	   	  if(noOfCols > 0)
	     	   	  {
	     	     %>
				 	 <tr class="<%if(noOfRecords==0){%>norecordsHeading<%}%>">
				 <%
				 	//Display all column heading, both dynamic and fixed
					String headingId = "";
			 		for(int i = 0;i < noOfCols; i++)
				 	{
			 			headingId = colId+i;
				 		boolean setSort = true;
				 		String hdrClass = textcss+" khtc";
	
			 			String sortField = "";
			 			headingsString += headingId+" ";
			 			int sortIndex = i;
			 			if(i==0)///first columns always description
			 			{
			 				sortField = "DESCRIPTION";
			 				sortIndex = -1;
			 				if(inboxNonPersistentColumns.contains(sortField))
			 				{
			 					setSort = false;
			 				}
			 	 %>
		    	   		 <th id="<%=colId%><%=i%>" class="<%= hdrClass %>" nowrap>
		    	   		 	&nbsp;
		    	   		 	<a <% if(setSort && noOfRecords > 0) { %>tabindex="0" title="<%= WebClientRuntime.makesafevalue(descTitle) %>" class='text pl ibhc' onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('sort','<%= id %>','<%=sortIndex%>');}"  href="javascript:sendEvent('sort','<%= id %>','<%=sortIndex%>')" <% } else {%>href="Javascript: void"<%}%>>
		    	   		 		<%= descTitle %>
		    	   		 	</a>
		    	   		 	<% if(sortAttribute.equalsIgnoreCase(sortField)){%>
								<%@ include file="portletsort.jsp" %>
							<% } %>
		    	   		 </th>
			 	 <%
			 	 			setSort = true;
			 				sortIndex = i;
			 			}
				 		if( ((String[])inboxColumns.elementAt(i))[0].equalsIgnoreCase("description") )
				 			continue;
				
				 		arrColumn = (String[])inboxColumns.elementAt(i);
			 			if(inboxNonPersistentColumns.contains(arrColumn[0]) || arrColumn[0].indexOf(".") > 0)
			 			{
			 				setSort = false;
			 			}
			 			sortField = arrColumn[0];
			 			String currentTitle = arrColumn[1];
						if (BidiUtils.isBidiEnabled() && mboSets[0] != null)           //bidi-hcg-SC
							currentTitle = BidiUtils.applyBidiAttributes(mboSets[0], sortField, currentTitle, s);
						if (setSort)
						{
				 %>
		    	   		 <th id="<%=colId%><%=i+1%>" class="<%= hdrClass %>" nowrap valign="middle">
		    	   		 	&nbsp;
		    	   		 	<a tabindex="0" <% if(noOfRecords > 0 ) { %>title="<%= WebClientRuntime.makesafevalue(currentTitle) %>" tabindex="0" class='text pl ibhc' onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {sendEvent('sort','<%= id %>','<%=sortIndex%>');}"  href="javascript:sendEvent('sort','<%= id %>','<%=sortIndex%>')"<%} else {%>href="Javascript: void"<%}%>><%= WebClientRuntime.makesafevalue(currentTitle) %></a>
		    	   		 	<% if(sortAttribute.equalsIgnoreCase(sortField)){%>
		    	   		 	<%@ include file="portletsort.jsp" %>
		    	   		 	<% } %>
		    	   		 </th>
	       		 <%
	       		 		}
	       		 		else
	       		 		{
	       		 %>
			           	 <th class="<%=textcss%> khtc" nowrap id="<%=colId%><%=i+1%>"><%=WebClientRuntime.makesafevalue(currentTitle)%></th>
	       		 <%
	       		 		}
	           		}//end for
	           	 %>
			           	 <th class="<%=textcss%> khtc" nowrap id="<%=colId%>last"><%= labels[5] %></th>
	              	</tr>
				 	<tr class="<%if(noOfRecords==0){%>norecordsHeading<%}%>">
			      	   <td colspan="<%= noOfCols+3 %>" headers="<%=headingsString%>">
			            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" align="center">
			            	<tr>
				            <td width="50%" class="pih" nowrap>
				            <% if(!latestDate.equals("")) { 
				            	if(calType.equalsIgnoreCase("islamic")){ 
									Date pDate = psdi.util.MXFormat.stringToDateTime(latestDate,control.getWebClientSession().getUserInfo().getLocale());
									latestDate = psdi.util.MXNFormat.dateTimeToString(pDate,control.getWebClientSession().getUserInfo().getICULocale());
								}				            
				            %>
				                <span class="<%=textcss%> pihl"><%= labels[7] %>:</span>
				                <span class="portletinternalsettinglabellink"><%=  latestDate %></span>
							 <% }else { %>
							 	&nbsp;
							 <% } %>
				            </td>
			    	        <td width="50%" align="<%=reverseAlign%>" class="pih">
			    	        	<a tabindex="0" title="<%= labels[6] %>" class="pl" <%=statusEvents %> href="javascript:sendEvent('refreshdata','<%=control.getId() %>','refresh')">
			    	        		<%= labels[6] %>
			    	        	</a>
			    	        </td>
			    	        </tr>
			            </table>
			           </td>
			        </tr>
	           	 <%
	           	 	int wraplength = Integer.parseInt(WebClientRuntime.getWebClientProperty("webclient.portletwraplength", "0"));
	           	 	String wrapClass = "";
	           	 	if (wraplength >= 0)
	           	 		wrapClass = "portlet_nowrap";
	           	 	else if (wraplength < 0)
	           	 		wrapClass = "portlet_wrap";
	           	 	//Display data fo each column
	           		for(int i = 0;i < assignments.length; i++)
	           		{
			 	 %>
			 	 		<tr valign="top">
			 	 <%
			 	 		int suffix = 0;
	           	 		for(int j = 0;j < noOfCols; j++)
					 	{
				 			MboValueData data = assignments[i][j];
	
				 			//Get the four key attributes that will be used to route the inbox
			 			   	String sDesc = (keyAttributeData[i][0]).getData();
	
				 			String sApp = (keyAttributeData[i][1]).getData();
	
				 			long sAssignId = (keyAttributeData[i][2]).getDataAsLong();
	
				 			long sOwnerId = (keyAttributeData[i][3]).getDataAsLong();
				 			
				 			boolean isOwnerLocked = (keyAttributeData[i][4]).getDataAsBoolean();
				 			
				 			String ownerLockedBy = (keyAttributeData[i][5]).getData();
				 			
				 			String[] param = { ownerLockedBy };
				 			
				 			String lockedbyuser = wcs.getMessage("jspmessages","lockedby",param);
				 			
	                        String currentData = data.getData();
	                        
				 			int type = data.getTypeAsInt();	
							if (currentData!=null && currentData!="" && calType.equalsIgnoreCase("islamic"))
	                        {
								if(type==MXFormat.DATE){
								Date pDate = psdi.util.MXFormat.stringToDate(currentData,control.getWebClientSession().getUserInfo().getLocale());
								currentData = psdi.util.MXNFormat.dateToString(pDate,control.getWebClientSession().getUserInfo().getICULocale());
								}
								
	                        	if(type==MXFormat.DATETIME){
								Date pDate = psdi.util.MXFormat.stringToDateTime(currentData,control.getWebClientSession().getUserInfo().getLocale());
								currentData = psdi.util.MXNFormat.dateTimeToString(pDate,control.getWebClientSession().getUserInfo().getICULocale());
								}
							}	
				 			if(j==0)
				 			{
		    					if (BidiUtils.isBidiEnabled() && mboSets[1] != null)                         //bidi-hcg-SC
		    						sDesc = BidiUtils.applyBidiAttributes(mboSets[1], "DESCRIPTION", sDesc, s);	 
		    					if(wraplength > 0)
								{
									sDesc=HTML.decode(sDesc);
									sDesc=WebClientRuntime.wrapText(sDesc,"<br/>",wraplength);
									sDesc=HTML.encodeTolerant(sDesc);
								}
								else
								{
									sDesc = WebClientRuntime.makesafevalue(sDesc);
								}
		    					
		    					if(isOwnerLocked)
		    					{    					
				 %>
						 			<td headers="<%=colId%><%=suffix%>" valign="middle" class="text ibr <%=wrapClass%>">
									  	<a tabindex="0" title="<%= lockedbyuser %>">
											  		<%=sDesc%>
										</a>
									</td>
				<%
								} else
								{
				%>
									<td headers="<%=colId%><%=suffix%>" valign="middle" class="text ibr <%=wrapClass%>">
									  	<a tabindex="0" title="<%= WebClientRuntime.makesafevalue(sDesc) %>" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) { sendEvent('openassignment','<%=id %>','<%=i %>');}"  class="<%=textcss%> pkr" href="javascript:sendEvent('openassignment','<%=id %>','<%=i %>')">
											<span <%if (wraplength < 0){%> class="<%=wrapClass%>"<%}%>>
									  		<%=sDesc%>
									  		</span>
									  	</a>
									</td>
				 <%
				 				}
				 				suffix++;
							}
							if( ((String[])inboxColumns.elementAt(j))[0].equalsIgnoreCase("description") )
				 				continue;
							
	    					if (BidiUtils.isBidiEnabled() && mboSets[1] != null)                         //bidi-hcg-SC
	    						currentData = BidiUtils.applyBidiAttributes(mboSets[1], ((String[])inboxColumns.elementAt(i))[0], currentData, s);	    								 			
				 %>
				     		<td headers="<%=colId%><%=suffix%>" valign="middle" class="<%=textcss%> xibr">
				     			<span class="<%=wrapClass%>">
				 <%			if (wraplength > 0) {
				 				currentData = WebClientRuntime.wrapText(currentData,"<br/>",wraplength);
				 			}
				 %>
				     		<%= currentData %>
				     			</span>
				     		</td>
				 <%
				 			suffix++;
				 			if(j == noOfCols-1)
				 			{ if(isOwnerLocked)
				 			  {
				 %>
				 				<td headers="<%=colId%>last" valign="middle" class="<%=textcss%> ri <%=wrapClass%>">
					 				<a tabindex="0" title="<%= lockedbyuser %>">
				 						<img src="<%= IMAGE_PATH%>ac22_editLock.png" border="0" alt="<%= lockedbyuser %>"/>
				 					</a>
				 				</td>
				 <%
				 			  } else
				 			  {
				 %>	
					 			<td headers="<%=colId%>last" valign="middle" class="<%=textcss%> ri <%=wrapClass%>">
					 				<a tabindex="0" title="<%= labels[5] %>" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) { sendEvent('routeassignment','<%= id %>','<%=i %>');}"  class="<%=textcss%> ri" href="javascript:sendEvent('routeassignment','<%= id %>','<%=i %>')">
					 					<img src="<%= IMAGE_PATH%>nav_icon_route.gif" border="0" alt="<%= labels[5] %>"/>
					 				</a>
					 			</td>
				 <%
				 			  } // end ownerlocked
				 			  suffix++;
							}//end if
				 		}//end for
				 %>
			 		</tr>
				<%	if((i+1) < assignments.length)
					{	%>
				 		<tr valign="top">
				          <td role="presentation" colspan="<%= noOfCols+2 %>" headers="<%=headingsString%>" height="1" class="psep"></td>
				        </tr>
				 <%	}
	           	    }//end for
	       	    	//If There are more records to display, display scrolling links
	           	  if(noOfRecords > 0 )
	           	   {
	           	  %>
		           	  <tr valign="top">
				 		  <td class="tsrs" colspan="<%= noOfCols+2 %>" align="center" headers="<%=headingsString%>">
					 		  <div height="5" border="1">
					 		  		<table role="presentation" border="0" cellspacing="2" cellpadding="0" width="100%">
					 		  			<tr>
											<td width="10%" align="<%=defaultAlign%>"></td>
					 		  				<td width="90%" align="<%=reverseAlign%>">
												<%@ include file="portletlistscroll.jsp" %>
					 		  				</td>
					 		  			</tr>
					 		  		</table>
					 		  </div>
			               </td>
				        </tr>
	           	 <%
	           	    }
				 }//if columsne exists
	
	       	 	 if(noOfCols==0)
	           	 {
	           	 %>
					<%@ include file="portletnotsetupmsg.jsp" %>
	           	 <%
	           	 }
	           	 else if(noOfRecords ==0)
	           	 {
	           	 %>
	           		<tr>
	           			<td class="<%=textcss%> pnc" valign="top" colspan="<%=noOfCols+2%>" headers="<%=headingsString%>" style="text-align: center">
           					<%= labels[0] %> <span class="ibun"><%= HTML.encodeTolerant(portletControl.getUserName()) %></span>
	           			</td>
	           		</tr>
	           	 <%
	           	 }
			     %>
			</table>
			<script>finishPortlet("<%=layoutId%>");</script>
	<%}else{%><script>deadPortlet("<%=id%>");</script><%}%>]]></component>
	<%
		portletStateManager.setStateLoaded();
	
		if(portletControl.hasChanged())
		{
			control.setChangedFlag(false);
		}
	} //end if render
	
	///If the portlet state is changed then fire the javascript to toggle its state
	if(portletControl.isPortletStateChanged())
	{
	%><component id="<%=id%>_holder"<%=compType%>><![CDATA[
		<script>
			var portletContent = document.getElementById("portletbody_<%= component.getProperty("layoutid") %>_outer");
			hideShowElement("portletbody_<%=component.getProperty("layoutid")%>_outer",(portletContent.style.display =='none'));
		</script>
	]]></component>
	<%	portletStateManager.setPortletStateChanged(false);
	}
	}
}	%><%@ include file="../common/componentfooter.jsp" %>

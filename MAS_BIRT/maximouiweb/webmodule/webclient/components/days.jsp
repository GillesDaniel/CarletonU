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
This JSP is the handler for days component. This component is part of
Calendar and WallCalendar controls. It provides the user interface of days and dates

Events fired by the component:
- Select day
- Update hours

CREATED ON: Jan 24, 2007
--%>
<%@ include file="../common/componentheader.jsp" %>
<%@page import="psdi.util.HTML"%>
<%
psdi.webclient.controls.Calendar calendarControl = (psdi.webclient.controls.Calendar)control;

String calendarType = component.getProperty("calendartype");
String monthText = component.getProperty("currentmonthtext");	
String currentYear = component.getProperty("currentyear");	
String control_events = "";   
String hours = "";
String htmlNotes = "";
String otherEvents  = "";
String dayEvent = "";

String[] days = calendarControl.getDays();
//Get properties neede to render the grid
int startDay = calendarControl.getStartDay();	 
int daysInMonth = calendarControl.getDaysInMonth();
int todaysDay =  calendarControl.getTodaysDay();
int dateValueDay =  calendarControl.getDay();
int firstDayOfWeek = calendarControl.getFirstDayOfWeek(); 
boolean isLarge = false;

otherEvents = "onmouseout=\"return noStatus();\" "+
"onfocus=\"input_onfocus(null,this); return noStatus();\" "+
"onmouseover=\"return noStatus();\" ";

//Events 
if(calendarType.equals("l"))
{		
	isLarge = true;				
}

//days grid
String divAutomationId ="";
if(automation) {
	divAutomationId="automationid=\""+realId+"_contents\""; 
} %>
	<div id="<%=id%>">
	<div id="<%=id%>_contents" <%=divAutomationId%> aria-live="polite">
		<table class="<%=calendarType %>cc" width="100%" height="100%" align="center" role="presentation">
		<tr>
			<%
			//Render day strings row
			for(int i=0; i<days.length-1;i++)
			{
			%>
				<th id="<%=id%>_heading_<%=i%>" class="<%=textcss%> <%=calendarType %>cdh"><%= days[(i+firstDayOfWeek-1)%7+1]%></th>
			<%
			}
			%>
		</tr>
		<%
		// Entire month can be easily displayed in 5 rows  as weeks.
		// For every week, render the day number and hours by starting from first day of the week and start day of the month.
		// Where the daynumber doesnt' fall in current month, render empty string, else render hours and notes (for wall calendar)		
		
		for(int j=0; j<6;j++)
		{	%>
			<tr class="cdr" valign="top">
				<%	
					String dayClass = calendarType+"cd";
				
					for(int k=1; k< days.length;k++)
					{
						if(calendarType.equals("l"))	
						{
							if(k==1)
							{
								dayClass="lcdl";
							}
							else
							{
								dayClass="lcd lcdl";
							}
						}
					
					int dayNum = ((j*7) + (k-1)-startDay)+ 2;
					

					
					if(j==0 && (k-1)<(startDay-1))
					{			

					%>
						<td class="<%=dayClass%>" width="14.2%" role="presentation" aria-hidden="true">
							<span>&nbsp;</span>
						</td>
					<%
					 }
					else if(dayNum <= daysInMonth)
					{ 
						if(isLarge)
							dayClass +=" lmd";
						
						String currentDayClass= "";
						
						//special class for the day in the field value. The selected date will be highlighted differently
						if(dayNum==dateValueDay && !isLarge)
						{								
							currentDayClass = calendarType+"cfvd";								
						}
						
						if(calendarControl.isCurrent())//both for larger and small.current day is grey
						{
							if(dayNum==todaysDay)
							{
								currentDayClass = calendarType+"ccd";
							}
						}
					
						if(isLarge)
							dayEvent = "sendEvent('thisdayworkperiods','"+id+"',"+dayNum+");";	
						else
							dayEvent = "sendEvent('setdate','"+id+"','day:"+dayNum+"');";
							
						int dayToUse = (dayNum + startDay)%7;
						if(dayToUse==0){
							dayToUse = 7;
						}
						String dayOfTheWeek = days[dayToUse];
						String dayText = calendarControl.getWebClientSession().getAccessibilityMode() == true ? dayOfTheWeek + " " + monthText + " " + dayNum +", "+currentYear:dayNum+"";

					%>
						<td tabindex="0" class="<%=dayClass%> <%=currentDayClass%>" width="14.2%" <%if(!isLarge){%>onclick="<%=dayEvent%>"<%}%>  aria-label="<%=dayText%>">
							<% 
							
							if(isLarge)
							{ 

							%>
							<table class="lcdc" width="100%" height="100%" role="presentation">
								<tr>
									<td class="<%=textcss%> lcdl"><%=dayText%></td>
								</tr>
								<tr>
									<td class="<%=textcss%> lcdd">
										<%
											hours = calendarControl.getHours(dayNum);
											if(!hours.equals(""))
											{
										%><a id="<%=control.getId()%>_<%=dayNum %>" tabindex="0" class="<%=textcss%> lchours" onfocus="javascript: input_onfocus(null,this); return noStatus();" <%=otherEvents%> onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {<%=dayEvent%>}" href="javascript:<%=dayEvent%>"><%=hours%></a><%
											}
											else
											{
										%><span role="presentation" class="<%=textcss%>" tabindex="-1" aria-hidden="true">&nbsp;&nbsp;</span><%
											}
																			
																			htmlNotes =  calendarControl.getHTMLNotes(dayNum);
																			if(htmlNotes.equals(""))
																				htmlNotes = "";
										%>
									</td>
								</tr>
								<tr>
									<td class="text" align="<%=reverseAlign%>" aria-hidden="true" role="presentation">
										<% if(!htmlNotes.equals("")) { 
											htmlNotes = HTML.sanitize(htmlNotes);
										%>
										<span title="<%=htmlNotes%>" class="<%=textcss%> lch"><%=htmlNotes%></span>
										<% }else
										{
										%>&nbsp;
										<% } %>
									</td>
								</tr>
							</table>
							<%
								}//if large 
												else
												{
							%>
								<a class="sd" tabindex="0" onmouseover="javascript:enablePopupEvents(); return noStatus();" onmouseout="javascript:disablePopupEvents(); return noStatus();" onfocus="javascript: return noStatus();" onkeypress="if(hasKeyCode(event,'KEYCODE_ENTER')) {<%=dayEvent %> return noStatus();}" href="javascript:<%=dayEvent %>" onclick="<%=dayEvent %>"><%=dayNum%></a>
							<%	
							}
							%>							
						</td>
					<%
					}
					else
					{
					%>
						<td class="<%=dayClass%>" width="14.2%">	
					<%	
						if(isLarge)
						{	
					%>

							<table class="lcdl" width="100%" height="100%" role="presentation">
								<tr>
									<td class="<%=textcss%> lcdd"  aria-hidden="true" role="presentation">
										&nbsp;
									</td>
								</tr>
							</table>

					<%	
						} //if large
						else
						{
						%>
						  <span  aria-hidden="true" role="presentation">&nbsp;</span>
						<%	
						}
						
					%>
 					</td>	
					<%	
					}
					%>
				<%}%>	
			</tr>
		<% } %>
		</table>
	</div>
</div>
<%	calendarControl.setChangedFlag(false);
%><%@ include file="../common/componentfooter.jsp" %>

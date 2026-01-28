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
--%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"%><%
	// should be included in page.jsp right before open of hotkey <script>
	String debugLeft = Integer.toString(wcs.getDebugDockLeft());
	String debugTop = Integer.toString(wcs.getDebugDockTop());
%>	<div aria-hidden="true" id="HF" class="dsc1" style="padding:2px;left:<%=debugLeft%>px;top:<%=debugTop%>px;z-index:50000;background:#E7E7E7;border:1px solid #999999;<% if(!debugHiddenFrame){%>display:none<%}%>;position:absolute;">
	<div aria-hidden="true" class="dh mh dhb">Hidden Form</div>
	<form aria-label="hidden form" aria-hidden="true" id="hiddenform" name="hiddenform" method="POST" action="<%=wcs.getMaximoRequestContextURL()%>/ui/maximo.jsp" style="padding:3px;">
		<input type="text" size="45" name="event" id="event" title="event type" aria-hidden="true"/><br />
		<input type="text" size="45" name="targetid" id="targetid" title="target id" aria-hidden="true" /><br />
		<input type="hidden" size="45" name="value" id="value" aria-hidden="true" /><%--this must be type hidden to support \n in the value --%>
		<input type="text" size="45" name="changedcomponentid" id="changedcomponentid"  title="changed component id" aria-hidden="true"/><br />
		<input type="text" size="45" name="vischangedcomponentvalue" id="vischangedcomponentvalue" title="changed component value" aria-hidden="true"/><br />
		<input type="hidden" name="changedcomponentvalue" aria-hidden="true" />
		<input type="hidden" name="localStorage" aria-hidden="true" />
		<input type="text" size="45" name="currentfocus" id="currentfocus" title="focus id" aria-hidden="true" /><br />
<%		if(app.getId().equalsIgnoreCase("designer"))
		{
%>		<input type="text" size="45" name="selectedcontrol" id="selectedcontrol" title="selected control" aria-hidden="true" /><br />
		<input type="text" size="45" name="selectedfield" id="selectedfield" title="selected field" aria-hidden="true" /><br />
		<input type="text" size="45" name="sourcefield" id="sourcefield" title="source field" aria-hidden="true"/><br />
		<input type="text" size="45" name="control" id="control" title="control" aria-hidden="true" /><br />
		<input type="text" size="45" name="where" id="where" title="where" aria-hidden="true" /><br />
		<input type="text" size="45" name="targetfield" id="targetfield"  title="target field" aria-hidden="true" /><br />
<%		}
		if(designmode)
		{
%>		<input type="hidden" size="45" name="designmode" value="true" aria-hidden="true" />
<%		}
%>		<input name="scrollleftpos" id="scrollleftpos" size="45" title="Scroll Left" aria-hidden="true"/><br />
		<input name="scrolltoppos" id="scrolltoppos" size="45"  title="Scroll Top" aria-hidden="true"/><br />
		<input type="text" size="45" name="uisessionid" id="uisessionid" aria-hidden="true" value="<%=WebClientRuntime.makesafevalue(wcs.getUISessionID())%>" class="fld_ro" readonly="readonly" title="ui session id"/><br />
		<input type="text" size="45" name="csrftokenholder" id="csrftokenholder" aria-hidden="true" value="<%=WebClientRuntime.makesafevalue(wcs.getCSRFToken())%>" title="CSRF Token" readonly="readonly" class="fld_ro"/><br />
	</form>
	</div>
<%@ include file="../common/validation.jsp" %>
	<script type="text/javascript">
		var DeferRun = false;
		function deferred(){
			if(DeferRun){
				return;
			}
			DeferRun = true;
<%
		try
		{
			PageInstance stackPage = null;
			if(!designmode)
			{
				java.util.Iterator pageIterator = app.getPageStack().iterator();
				while(pageIterator.hasNext())
				{
					stackPage = (PageInstance)pageIterator.next();
					String currentfocusid = (String)stackPage.getFocusRenderId();
					String scrolltop = (String)stackPage.remove("scrolltoppos");
					String scrollleft = (String)stackPage.remove("scrollleftpos");
					stackPage.remove("infocuscontainer");
					stackPage.remove("focuscontainerid");
					boolean topPage = false;
					if(!pageIterator.hasNext())
					{
						topPage = true;
					}
					String defaultfocusid = (String)stackPage.get("defaultfocusid");
					if(WebClientRuntime.isNull(currentfocusid) && !WebClientRuntime.isNull(defaultfocusid))
					{
						currentfocusid = defaultfocusid;
					}
					if(WebClientRuntime.isNull(currentfocusid))
					{
						currentfocusid = (String)stackPage.get("firstfocusableobject");
					}
					stackPage.remove("firstfocusableobject");
					if(!WebClientRuntime.isNull(currentfocusid) && topPage)
					{	
						String showingMenu = (String)stackPage.remove("showingmenu");
						if(showingMenu == null)
						{
%>						
              try {
                let theFocusItem = document.querySelector('#retButtons > button');
                if(!theFocusItem){
                  theFocusItem = document.querySelector('.bottomApp a:last-of-type');
                }
                let startTab = '<%=app.getCurrentPage().get("starttab")%>';
                var focusId = NEW_APPLINK && startTab.toLowerCase()==='insert' ? theFocusItem.id : '<%=currentfocusid%>';
                focusItem(focusId,<%=topPage%>);
              }
              catch(error){
                focusItem('<%=currentfocusid%>',<%=topPage%>);
              }
<%					}
						else
						{
%>						document.getElementById('currentfocus').value='<%=currentfocusid%>';	
<%					}
					}
					if(!WebClientRuntime.isNull(scrolltop) && !WebClientRuntime.isNull(scrollleft) && topPage)
					{
%>						scrollScreen('<%= scrolltop%>','<%= scrollleft%>');
<%					}
				}
			}
			else
			{
%>				reFocusItem();
<%			}
			if(Boolean.parseBoolean((String)app.get("refreshouterapp")))
			{
				app.remove("refreshouterapp");
%>				sendEvent('rerender','systemhandler',null);
<%			}
%>			//The following is for Web Replay/tbx
			callWebReplayFrame();
<%			if(stackPage != null && stackPage.focus())
			{
%>				stopFocus=true;
<%			}
		}
		catch(Exception e)
		{
			System.out.println("Exception while initializing focus item");
		}
%>		replaceAllItems();
	
<%		if(!designmode)
		{
%>			resetLogoutTimer(true);
<%		}
%>		processLoadMethods();
		fixSpacers();
		
		document.body.style.cursor="";
	
		<%--
			Be careful of the object types to which you bind using this method.
			Anything in the table struct (table,tr,td) will be slow.
		--%>
		bindEventsArray(document,eventBindObjects,false);
		hideWait();
		killAjaxTimeout();
		working=false;
<%		if(debugHiddenFrame)
		{
%>			dojo.addOnLoad(function() {
				dojo.require("dojo.dnd.Moveable");
				var hfDnD = new dojo.dnd.Moveable(dojo.byId('HF'),{skip: true});
				dojo.connect(hfDnD, 'onMoved', null, function(a,b){ a.node.setAttribute('lefttop',b.l+':'+b.t);});
				dojo.connect(hfDnD, 'onMoveStop', null, function(a){sendXHREvent('setDebugPosition', '<%=component.getId()%>', a.node.getAttribute('lefttop'), REQUESTTYPE_NORENDER, null, null, null)});
			});
<%		}
%>		window.setTimeout("showingPopup=false",100);
		sizeCanvas();
		window.top.postMessage({[EMBEDDED_MESSAGE_PREFIX+'inner-app-ready']:true},"*");
		}
		document.body.onload=deferred;
		window.onload=deferred;
		window.setTimeout(function(){deferred}, 100);
	</script>

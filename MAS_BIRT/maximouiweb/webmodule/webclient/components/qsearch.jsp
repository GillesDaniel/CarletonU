<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18, 5737-M66
* 
* (C) COPYRIGHT IBM CORP. 2012,2024 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@ include file="../common/componentheader.jsp" %>
<%@page contentType="text/html;charset=UTF-8" buffer="none"
		%><%@page import="psdi.mbo.MboValueInfoStatic"
	    %><%@page import="psdi.webclient.system.controller.AppInstance"
		%><%@page import="psdi.webclient.system.beans.AppBean"
		%><%@page import="psdi.webclient.system.controller.BaseInstance"
		%><%@page import="psdi.webclient.system.controller.ComponentInstance"
		%><%@page import="psdi.webclient.system.controller.ControlInstance"
		%><%@page import="psdi.webclient.system.runtime.WebClientConstants"
		%><%@page import="psdi.webclient.system.runtime.WebClientRuntime"
		%><%@page import="psdi.webclient.system.session.WebClientSession" 
		%><%@page import="psdi.webclient.system.session.WebClientSession.Alignment"%><%

	String searchLabel = wcs.getMessage("ui","qSearchPrompt");
	if(searchLabel.equals("ui/qSearchPrompt")) {
		searchLabel = "{0}";
	}
	if(searchLabel.length()>0) {
		searchLabel = searchLabel.replace("{0}", app.getKeyLabel());
	}
	boolean hidden = component.getBoolean("hidden");
	if(component.needsRender()) {
		Boolean systemNavBar = wcs.showSystemNavBar(control.getPage());
		String searchMenuLabel = wcs.getMessage("jspmessages","quicksearchdropdown");
		String searchButtonLabel = searchLabel;
		String disabled = hidden?"disabled=\"disabled\" aria-disabled=\"true\"":"";
		boolean keepQueryFieldOpen = !ismobile && Boolean.parseBoolean(WebClientRuntime.getWebClientProperty("mxe.webclient.keepQueryFieldOpen")); %>
	<td>
		<div id="<%=id%>_outer" <%if(ismobile){%> style="border-right:unset;"<%}%> class="qsFieldOuter">
			<%if(!ismobile){ %><div id="<%=id%>_wrapper" class="qryWrapper" style="display:initial;<%if(keepQueryFieldOpen){%>visibility:visible;opacity:1;<%}else{%>visibility:hidden;opacity:0;<%}%>;transition: visibility 0s, opacity 0.5s linear;"> <% } %>
				  <input id="<%=id%>" <%=disabled%> type="text"  aria-label="<%=searchLabel%>" title="<%=searchLabel%> (CTRL+ALT+F)" promptValue="<%if(!hidden){ %><%=searchLabel%><%}%>" ctype="qstextbox" class="fld text tt qSearch queryField" async="1" ae="setvalue" >
					<%if(!ismobile){ %><img id="<%=id%>_closebtn" role="button" alt="<%=wcs.getMessage("messagebox", "MSG_BTNCLOSE")%>" src="<%=IMAGE_PATH%>close.gif" tabindex="0" class="qryFieldCloseBtn" onclick="closeQueryField()" onkeypress="if(event.key === 'Enter'){event.target.click();}"/> <% } %>
				</input>
			<%if(!ismobile){ %></div> <% } %>
		  	<div id="<%=id%>_QSButtonDiv" <%=disabled%> class="greybuttondiv<%if(hidden){%> opacity_45<%}%>" style="display: inline-block" >
		  		<div style="display: inline-block">
					<input type="image" id="<%=id%>QSImage" <%=disabled%> aria-label="<%=searchButtonLabel%>" title="<%=searchButtonLabel%>" alt="<%=searchButtonLabel%>" role="button" onkeypress="if(event.key === 'Enter'){event.target.click();}" <%if(ismobile){%> onclick="sendEvent('find', '<%=id%>', '')" <%} else {%> onclick="findValue('<%=id%>')"<%}%> class="greybutton" src="<%=IMAGE_PATH%>qf_find.gif"/>
				</div>
			<%	if(wcs.getCurrentApp().getAppQuickSearchOptions().size() > 0) { %>
				<div style="display: inline-block;margin-inline-start:-1rem;">
					<input id="<%=id%>QSMenuImage" <%=disabled%> type="image" title="<%=searchMenuLabel%>" alt="<%=searchMenuLabel%>" aria-label="<%=searchMenuLabel%>" role="button" onkeypress="if(event.key === 'Enter'){event.target.click();}" onclick="setClickPosition(this, event); sendEvent('click', '<%=id%>', 'quicksearch')" class="greybutton" src="<%=IMAGE_PATH%>nav_btn_menuArrow_Search.gif"/>
				</div>
			<%	}	%>
			</div>
		</div>
	</td>
	<script>
  let keepQueryFieldOpen = <%=keepQueryFieldOpen%>;
	function findValue(id){
		var filterFld = dojo.byId("<%=id%>");
		var fldDiv = filterFld.parentElement;
		var fldVal = filterFld.value;
		if(fldVal){
			sendEvent('find', '<%=id%>', '');
      if(!keepQueryFieldOpen){
			  dojo.style(fldDiv, {"visibility": "hidden", "opacity":"0"});
      }
		}
		else {
			dojo.style(fldDiv, {"visibility": "initial", "opacity":"1"});
      if(!SCREENREADER){
        window.setTimeout(function(){filterFld.focus()}, 300);
      }
		}
	}
	
	function closeQueryField(){
		var filterFld = dojo.byId("<%=id%>_wrapper");
    if(!keepQueryFieldOpen){
		  dojo.style(filterFld, {"visibility": "hidden", "opacity":"0"});
    }
    let button = document.getElementById("<%=id%>QSImage") || document.getElementById("<%=id%>QSMenuImage");
    if(button){
      window.setTimeout(function(){
        if(!keepQueryFieldOpen){
          button.focus();
        }
        filterFld.querySelector('INPUT').value='';
      }, 300);
    }
	}
	
	function fixQSFieldWidth(width) {
		var qsField = dojo.byId("<%=id%>");
		var qsButtonDiv = dojo.byId("<%=id%>_QSButtonDiv");
		var qsMenuImage = dojo.byId("<%=id%>QSMenuImage");
		if(qsField && qsButtonDiv) {
		<% if(!hidden) { %>
			dojo.connect(qsButtonDiv, "mouseover", qsButtonDiv, function(event) {
				appendClass(qsButtonDiv, "greybuttondiv_hover");
			});
			dojo.connect(qsButtonDiv, "mouseout", qsButtonDiv, function(event) {
				removeClass(qsButtonDiv, "greybuttondiv_hover");
			});
		<%	}	%>
			var navContainer = dojo.query("div.fixedNavContainer")[0];
			if(undef(width) && navContainer){
				width = navContainer.clientWidth;
			}
			if(!undef(width)) {
				var setWidth = width - getLeftPosition(qsField) - qsButtonDiv.offsetWidth - 15;
				if(document.body.dir == "rtl") {
					setWidth = width - qsButtonDiv.offsetWidth - 25
				}
				if(setWidth < 80) {
					setWidth = 80;
				}
				dojo.style(qsField, {"width": setWidth +"px"});
			}
		}
		else {
			if(undef(width)){
				var navContainer = dojo.query("div.fixedNavContainer")[0];
				if(navContainer){
					width = navContainer.clientWidth - 30;
					var qsFieldOuter = dojo.byId("<%=id%>_outer");
					if(qsFieldOuter) {
						dojo.style(qsFieldOuter, {"width": width +"px"});
					}
				}
			}
			return;
		}
		bindQSFieldEvents(qsField);
	}
	function bindQSFieldEvents(el) {
		if(dojo.attr(el, 'bound')!="true"){
			dojo.connect(el, "drop", el, tb_);
			dojo.connect(el, "blur", el, tb_)
			dojo.connect(el, "click", el, tb_);
			dojo.connect(el, "change", el, tb_);
			dojo.connect(el, "cut", el, tb_);
			dojo.connect(el, "focus", el, tb_);
			dojo.connect(el, "keydown", el, tb_);
			//dojo.connect(el, "keypress", el, tb_);
			dojo.connect(el, "keyup", el, tb_);
			dojo.connect(el, "mousedown", el, tb_);
			dojo.connect(el, "mousemove", el, tb_);
			dojo.connect(el, "mouseup", el, tb_);
			dojo.connect(el, "paste", el, tb_);
      dojo.connect(el, "keypress", el, function(evt){
        if(evt.key === 'Escape'){
          evt.stopPropagation();
          el.value = '';
          closeQueryField();
        }
        else {
          tb_.call(el,evt);
        }
      });
			tb_(el);
			dojo.attr(el, {'bound':'true'});
		}
    dojo.connect(document.body, "keypress", el, function(evt){
      if(evt.key === 'f' && evt.altKey && evt.ctrlKey){
        el.focus();
      }
    });
	}
	function bindQSFunctions() {
		var qsField = dojo.byId("<%=id%>");
		var qsImage = dojo.byId("<%=id%>QSImage");
		if(qsField) {
			dojo.connect(qsField, "focus", qsField, function(event){
				input_onfocus(event,this);
			} );
			dojo.connect(qsField, "blur", qsField, function(event){
				input_onblur(event,this);
			} );

			dojo.connect(qsField, "keypress", qsImage, function(event){
				if(hasKeyCode(event,'KEYCODE_ENTER')) {
					window.setTimeout(function(){sendEvent('find', '<%=id%>', '')},100);
          if(!keepQueryFieldOpen){
            let button = document.getElementById("<%=id%>QSImage") || document.getElementById("<%=id%>QSMenuImage");
            if(button){
              button.focus();
              focusOnItem(button.id,false);
            }
          }
				}
			} );
		}
	}
	<% if(!hidden) { %>
		addLoadMethod("bindQSFunctions();");
		addLoadMethod("fixQSFieldWidth();");
	<%	}	%>
	dojo.subscribe("sizeNavHeader", function(data){
		fixQSFieldWidth(data);
	});
	</script>
<%	}
	else{
		%><component id="<%=id%>_holder" compid="<%=id%>" replacemethod="NONE"><![CDATA[
			<script type="text/javascript">
			<%	String qsValue = control.getProperty("quicksearchvalue");
				if(qsValue.length()==0) { %>
					setPromptValue("<%=id%>", "<%=searchLabel%>");
			<%	} %>
			</script>
		]]></component>
<%	}
	control.setChangedFlag(false); 
%>

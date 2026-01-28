<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18, 5737-M66
* 
* (C) COPYRIGHT IBM CORP. 2011,2024 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%
	String revertlabel = wcs.getMessage("messagebox", "MSG_BTNGOBACK");
	String ignorelabel = wcs.getMessage("messagebox", "MSG_BTNUSEVALUE");
	String editlabel = wcs.getMessage("messagebox", "MSG_BTNEDITVALUE");
	String okLabel = wcs.getMessage("messagebox", "MSG_BTNOK");
	if(debug){%>
	<!-- BEGIN ASYNC ERROR HANDLING TOOLTIP DIALOG -->
	<%}%>
<div id="ascerr_div" aria-hidden="true" style="display:none;" aria-hidden="true:">
	<table border="0" style="width:100%" cellpadding="0" cellspacing="0" role="presentation" ><%/* This outer table is a hack for problems with img align and should be removed once we change to a non quirks doctype */%>
		<tr>
			<td>
				<div id="template_userinput" class="text"></div>
				<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
					<tr>
						<td align="<%=reverseAlign%>"><img id="template_ascerr_errorimg" border="0" src="<%=IMAGE_PATH%>blank.gif" alt="" style="margin: 0px 10px 0px 0px"/></td>
					 	<td id="template_ascerrmsg" ctype="ttdialog" class="text"></td>
					</tr>
				</table>
			</td>
			<td valign="top" align="right"><button type="button" id="template_ascerr_closeimg" tabindex="0" border="0" onclick="stopPopOver()"<%
				%> onkeydown="if(hasKeyCode(event,'KEYCODE_SPACEBAR|KEYCODE_ENTER')){stopPopOver();}"<%
				%> style="border:0px;height:20px;width:20px;background:transparent;border:0px" aria-label="<%=wcs.getMessage("ui", "closedialog")%>" title="<%=wcs.getMessage("ui", "closedialog")%>"><img role="presenation" id="template_ascerr_close_img" src="dialogclose.gif"/></button><%
			%></td>
		</tr>
		<tr>
			<td>
				<iframe src="" id="template_ascerr_div_iframe" frameborder="0" style="border:0px;display:none" aria-hidden="true" title="External Content"></iframe>
			</td>
		</tr>
	</table>
	<div id="template_tt_default_help" class="text">
		<p id="template_whelp" style="width: 400px;margin: 10px 0px 0px;"><%=wcs.getMessage("messagebox", "MSG_LBTOOLTIPHELP", new String[] {ignorelabel, revertlabel})%></p>
		<p id="template_ehelp" style="width: 400px;margin: 10px 0px 0px;"><%=wcs.getMessage("messagebox", "MSG_LBTOOLTIPHELP", new String[] {editlabel, revertlabel})%></p>
	</div>
	<div id="template_tt_defaultbuttons" align="<%=reverseAlign%>">
		<button type="button" id="template_ync_ybtn" class="text" onclick="processYesNoCancelButton(this, event, 8);"><%=wcs.getMessage("messagebox", "MSG_BTNYES")%></button>
		<button type="button" id="template_ync_nbtn" class="text" onclick="processYesNoCancelButton(this, event, 16);"><%=wcs.getMessage("messagebox", "MSG_BTNNO")%></button>
		<button type="button" id="template_ync_okbtn" class="text" onclick="processYesNoCancelButton(this, event, 2);"><%=okLabel%></button>
		<button type="button" id="template_ync_cbtn" class="text" onclick="processYesNoCancelButton(this, event, 4);"><%=wcs.getMessage("messagebox", "MSG_BTNCANCEL")%></button>
		<button type="button" id="template_ync_clbtn" class="text" onclick="processYesNoCancelButton(this, event, 1);"><%=wcs.getMessage("messagebox", "MSG_BTNCLOSE")%></button>
		<button type="button" id="template_chkbx_btn" class="text" onclick="processIgnoreButton(this, event);"><%= okLabel%></button>
		<button type="button" id="template_edit_ebtn" class="text" onclick="processEditButton(this, event);"><%= editlabel%></button>
		<button type="button" id="template_ignore_ibtn" class="text" onclick="processIgnoreButton(this, event);"><%=ignorelabel%></button>
		<button type="button" id="template_revert_rbtn" class="text" onclick="processRevertButton(this, event);"><%=revertlabel%></button>
		<span id="template_tt_custom_buttons">&nbsp;</span>
	</div>
</div>
<%if(debug){%>
<!-- End ASYNC ERROR HANDLING TOOLTIP DIALOG -->
<%}%>

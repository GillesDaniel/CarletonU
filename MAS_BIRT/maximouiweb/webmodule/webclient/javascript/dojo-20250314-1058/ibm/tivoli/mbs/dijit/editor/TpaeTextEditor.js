/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18, 5737-M66
 * 
 * (C) COPYRIGHT IBM CORP. 2011,2024 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

/**
 * Extends the dijit Editor widget to fix some bugs.
 */
define("ibm/tivoli/mbs/dijit/editor/TpaeTextEditor", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/sniff", "dijit/Editor", "dojo/dom-style"], function(declare, lang, has, Editor, domStyle)
{
	return declare("ibm.tivoli.mbs.dijit.editor.TpaeTextEditor", Editor, 
	{
		// Reference to the save button so we don't have to search for it every time.
		saveButtonElement: null,
		
		// Flag to denote when to ensure the fontname in the editor needs to be reset to the value from the drop down. This can happen in IE
		// When the font size is changed right after changing the font name.
		fixFontName: false,
		
		onfocusCount:0,
		
		timeOfFirstFocus:0,
	
		okToFocus: function(id)
		{
			var curTime = new Date().getTime();
			var timeOKForFocus = (this.timeOfFirstFocus == 0  || (curTime - this.timeOfFirstFocus) > 1000);
			var sameFocus = (id == lastRTEToGetFocus);
			var allowableSecondFocus = (sameFocus && this.onfocusCount == 1);
			//Don't want to let another focus call to be made within 100ms unless it's for the same RTE and 
			//onfocus has been called only once before on that RTE and the second onfocus is from focusOnEnd
			//And we only will allow a maximum of 5 onFocuses within a second (sounds weird but 5 in a second 
			//is valid)  This is a fail safe.  If more than 5 within a second then probably in the hang so break out
			if ((rteOnFocusTime == 0 || (curTime - rteOnFocusTime) > 100 || allowableSecondFocus) && (timeOKForFocus || this.onfocusCount < 5))
			{
				lastRTEToGetFocus = id;
				if (timeOKForFocus)
				{
					rteOnFocusTime = curTime;
					this.onfocusCount = 1;
					this.timeOfFirstFocus = curTime;
				}
				else
				{
					this.onfocusCount++;
				}
				return true;
			}
			return false;
		},

		/**
		 * Save reference to the save button after the editor has been fully loaded. This will make sure we don't start trying to
		 * enable the save button until after the editor has finished loading.
		 * 
		 * Also, for IE override the onFocus for the iframe to better handle browser changes to the font name.
		 */
		onLoad: function(html)
		{
			this.inherited(arguments);
			
			//hack to override focus event listener in dojo's rte that causes the right arrow to jump to focus from the 'font' down to the textarea
			var fontSizeInput = document.getElementById('dijit__editor_plugins__FontSizeDropDown_0_select');
			if(!fontSizeInput){
				fontSizeInput = document.getElementById('dijit__editor_plugins__FontSizeDropDown_1_select');
			}
			if(fontSizeInput){
				var buttons = fontSizeInput.closest('span[widgetid]').parentElement.querySelectorAll('[data-dojo-attach-event]:not(.dijitOffScreen)');
				var button = buttons[buttons.length - 1];		
				button.addEventListener('focus', function(event){
					window.setTimeout(function(){
						event && event.target && event.target.focus()},10)
				}, true);
				fontSizeInput.addEventListener('focus', function(event){
					window.setTimeout(function(){
						event && event.target && event.target.focus()},10)
				}, true);
			}
		
			//hack to override focus event listener in dojo's rte that causes the left arrow to jump to focus from the 'size' down to the textarea
			var fontNameInput = document.getElementById('dijit__editor_plugins__FontNameDropDown_0_select');
			if(!fontNameInput){
				fontNameInput = document.getElementById('dijit__editor_plugins__FontNameDropDown_1_select');
			}
			if(fontNameInput){
				var buttons = fontNameInput.closest('span[widgetid]').parentElement.querySelectorAll('[data-dojo-attach-event]:not(.dijitOffScreen)');
				var button = buttons[buttons.length - 1];
				button.addEventListener('focus', function(event){
					window.setTimeout(function(){
						event && event.target && event.target.focus()},10)
				}, true);
				fontSizeInput.addEventListener('focus', function(event){
					window.setTimeout(function(){
						event && event.target && event.target.focus()},10)
				}, true);
			}
			
			if(SCREENREADER){
				this.iframe.title=this.value.length>0?this.value:TEXT_ENTRY;
				var toolbar = this.domNode.querySelectorAll("*[role='toolbar']")[0];
				if(toolbar){
					toolbar.setAttribute('aria-label','Text Editor');
					toolbar.setAttribute('tabIndex','-1');
				}
			}
			if (saveButton)
				this.saveButtonElement = getElement(saveButton);
			
			if (has("ie") || has("trident"))
			{
				var fontSizePlugin = this._findPlugin("fontSize");
				if (fontSizePlugin)
				{
					var _editor = this;
					fontSizePlugin.connect(fontSizePlugin.button.select, "onChange", function(choice) {
						_editor.fixFontName = true;
					});
				}
				
				this.iframe.onblur=function(){ if(!document.hasFocus()) document.body.setActive(); }; 				
				var _this = this;
				this.iframe.onfocus = function()
				{
					if (dojo.isIE < 10 && _this.okToFocus(_this.id))
					{
						_this.editNode.setActive();
					}
				};

				// Override the iframe onfocus listener in IE to better handle font name changing.
				var _fontNamePlugin = this._findPlugin("fontName");
				if (_fontNamePlugin)
				{
					var _inheritedIframeOnFocus = this.iframe.onfocus;
					
					this.iframe.onfocus = function()
					{
						// This is a fix for IE that changes the focus to be on the edit node instead of the body of the iframe, but it breaks
						// some instances with the font name plugin where its value can be lost. The rest of the code in this function fixes that
						// side effect.
						if (_inheritedIframeOnFocus)
							_inheritedIframeOnFocus();
						
						// Only fix the font name when the font size has been set.
						if (_this.fixFontName)
						{
							_this.fixFontName = false;
							
							var fontNamePluginValue = _fontNamePlugin.button.attr("value");
							// If the font name in the plugin doesn't match the browser, reset the browser to what the plugin says.
							if (_this.queryCommandValue("fontName") != fontNamePluginValue && fontNamePluginValue != '')
							{
								_this._fontnameImpl(fontNamePluginValue);
							}
						}
					};
				}
			}
		},
		onKeyUp: function(e){
			this.inherited(arguments);
			resetLogoutTimer(false);
			if (isHotkey(e))
			{
				var newValue = this.getValue(true);
				if(newValue !== this.value){
					this.onChange(newValue);
				}
				this._set("value", newValue);
				appHotkey(e);
			}
			showFieldHelpById(e, this.id);
		},
		/**
		 * Finds the plugin in the editor that has the specified command.
		 */
		_findPlugin: function(pluginCommand)
		{
			var plugin = null;
			// Search from the end because the font name plugin is likely to be near the end of the array.
			for (var i = this._plugins.length - 1; i >= 0 && plugin == null; i--)
			{
				if (this._plugins[i])
				{
					if (this._plugins[i].command == pluginCommand)
						plugin = this._plugins[i];
				}
			}
			return plugin;
		},
		
		
		/**
		 * Enable save button if it's disabled and the content has changed.
		 */
		onNormalizedDisplayChanged: function(event)
		{
			this.inherited(arguments);
			if (this.saveButtonElement)
			{
				var disabled = this.saveButtonElement.getAttribute("disabled");
				// In IE the value for disabled is a boolean while in firefox it is a string. Handle both cases.
				var disabledBoolean = (typeof disabled == "boolean" && disabled) || disabled == "true";
				if (disabledBoolean && (this.savedContent && this.getValue(true) != this.savedContent))
				{
					setButtonEnabled(saveButton, true);
				}
			}
		},
		
		_fontnameImpl: function(/*String*/argument)
		{
			// If the font choice is surrounded by single quotes, get rid of them.  They are unnecessary and mess up
			// Lotus notes when the email gets forwarded.
			if (argument && argument.length >= 2 && argument.charAt(0) == '\'' && argument.charAt(argument.length - 1) == '\'')
				argument = argument.substring(1,argument.length - 1);
			return this.inherited(arguments);
		},
		
		_insertorderedlistImpl: function(/*String*/argument) {
			this._fixlisttoggle('insertorderedlist', argument);
			return this.inherited(arguments);
		},
	
		_insertunorderedlistImpl: function(/*String*/argument) {
			this._fixlisttoggle('insertunorderedlist', argument);
			return this.inherited(arguments);
		},
		
		/**
		 * Fixes the toggling of list types in IE.  Without this fix, when changing a line from bullet to numbers
		 * IE will change the entire list.  This forces only the line that the cursor is on or set of selected lines
		 * to change to the new list type.
		 */
		_fixlisttoggle: function(/*String*/command, /*String*/argument) {
			// First check to see if we're in IE.  If not, just execute the normal command.
			if (has("ie") || has("trident"))
			{
				// First check to see if we're in an existing list.
				var range = dijit.range.getSelection(this.window).getRangeAt(0);
				var blockNode = dijit.range.getBlockAncestor(range.endContainer, null, this.editNode).blockNode;
				if (blockNode != null)
				{
					var togglingListType = (((blockNode.parentNode.nodeName == 'UL' || blockNode.parentNode.parentNode.nodeName == 'UL') && command == 'insertorderedlist') 
								|| ((blockNode.parentNode.nodeName == 'OL' || blockNode.parentNode.parentNode.nodeName == 'OL') && command == 'insertunorderedlist'));
					
					if (togglingListType)
					{
						// Now make sure we're not in a sublist.
						var listNode = blockNode.parentNode;
						if (blockNode.parentNode.nodeName != 'UL' && blockNode.parentNode.nodeName != 'OL')
							listNode = blockNode.parentNode.parentNode;
						
						// If parentNode of the list is another list, then we're in a sublist and should not
						// outdent before running the command.
						if (listNode.parentNode.nodeName != 'UL' && listNode.parentNode.nodeName != 'OL')
						{
							// We're toggling the list type.  First execute an outdent to remove the existing list and then execute the command to create the list.
							// This will allow only the selected lines to be included in the new list.
							this.document.execCommand('outdent', false);
						}
					}
				}
			}
		},
		
		queryCommandValue: function(command){
		
			var newR = this.inherited(arguments);
			command = this._normalizeCommand(command);
			//The following code is needed to set the font size dropdown to the value that is
			//passed in as param.fontSize. It is readjusted here, since we had to shift the values
			//up by one size in richtexteditor.jsp (see comments there)
			if(command == "fontsize" && window.defaultRTEFontSize!="" && newR=="") {
				return window.defaultRTEFontSize;
			}
			if(newR=="") { //probably no current setting, so just use documents setting
				newR = document.queryCommandValue(command);
			}
						if(command == "fontname" && newR=="MaximoBase"){
				newR = "serif";
			}
			return newR;
		},
			
		/**
		 * IV37372: Fixes the Rich Text Editor scrollbar on IE8
		 */
		_onIEMouseDown: function(/*Event*/ e){
			// summary:
			//		IE only to prevent 2 clicks to focus
			// tags:
			//		private
			var outsideClientArea;
			// IE 8's componentFromPoint is broken, which is a shame since it
			// was smaller code, but oh well.  We have to do this brute force
			// to detect if the click was scroller or not.
			var b = this.document.body;
			var clientWidth = b.clientWidth;
			var clientHeight = b.clientHeight;
			var clientLeft = b.clientLeft;
			var offsetWidth = b.offsetWidth;
			var offsetHeight = b.offsetHeight;
			var offsetLeft = b.offsetLeft;

			//Check for vertical scroller click.
			if(!/^rtl$/i.test(b.dir || "")){
				if(clientWidth < offsetWidth && e.x > clientWidth && e.x < offsetWidth){
					// Check the click was between width and offset width, if so, scroller
					outsideClientArea = true;
				}
			}else{
				// RTL mode, we have to go by the left offsets.
				if(e.x < clientLeft && e.x > offsetLeft){
					// Check the click was between width and offset width, if so, scroller
					outsideClientArea = true;
				}
			}
			if(!outsideClientArea){
				// Okay, might be horiz scroller, check that.
				if(clientHeight < offsetHeight && e.y > clientHeight && e.y < offsetHeight){
					// Horizontal scroller.
					outsideClientArea = true;
				}
			}
			if(!outsideClientArea){
				delete this._cursorToStart; // Remove the force to cursor to start position.
				delete this._savedSelection; // new mouse position overrides old selection
				if(e.target.tagName == "BODY"){
					this.defer("placeCursorAtEnd");
				}
				this.inherited(arguments);
			}
		},
		
		_setStateClass: function(){
			var rte = this;
			rte.inherited(arguments);
			window.setTimeout(function() {
				try{
					// Let theme set the editor's text color based on editor enabled/disabled state.
					// We need to jump through hoops because the main document (where the theme CSS is)
					// is separate from the iframe's document.
					if(rte.document && rte.document.body){
						domStyle.set(rte.document.body, "color", domStyle.get(rte.iframe, "color"));
					}
				}catch(e){ /* Squelch any errors caused by focus change if hidden during a state change */
				}
			}, 300);
		}

	});
});

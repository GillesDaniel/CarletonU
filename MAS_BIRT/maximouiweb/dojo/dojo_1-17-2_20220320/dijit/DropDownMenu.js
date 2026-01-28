/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

define([
	"dojo/_base/declare", // declare
	"dojo/keys", // keys
	"dojo/text!./templates/Menu.html",
	"./_MenuBase"
], function(declare, keys, template, _MenuBase){

	// module:
	//		dijit/DropDownMenu

	return declare("dijit.DropDownMenu", _MenuBase, {
		// summary:
		//		A menu, without features for context menu (Meaning, drop down menu)

		templateString: template,

		baseClass: "dijitMenu",

		// Arrow key navigation
		_onUpArrow: function(){
			this.focusPrev();
		},
		_onDownArrow: function(){
			this.focusNext();
		},
		_onRightArrow: function(/*Event*/ evt){
			this._moveToPopup(evt);
			evt.stopPropagation();
			evt.preventDefault();
		},
		_onLeftArrow: function(/*Event*/ evt){
			if(this.parentMenu){
				if(this.parentMenu._isMenuBar){
					this.parentMenu.focusPrev();
				}else{
					this.onCancel(false);
				}
			}else{
				evt.stopPropagation();
				evt.preventDefault();
			}
		}
	});
});

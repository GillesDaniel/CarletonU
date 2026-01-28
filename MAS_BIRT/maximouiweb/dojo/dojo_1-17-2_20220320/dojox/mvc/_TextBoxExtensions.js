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
	"dojo/_base/lang",
	"dijit/_WidgetBase",
	"dijit/form/ValidationTextBox",
	"dijit/form/NumberTextBox"
], function(lang, WidgetBase, ValidationTextBox, NumberTextBox){

	// monkey patch dijit/form/ValidationTextBox.isValid to check this.inherited for isValid.
	// hide patch from doc parser though because we want it to display the original definition of isValid.
	var oldValidationTextBoxIsValid = ValidationTextBox.prototype.isValid;
	ValidationTextBox.prototype.isValid = /*===== oldValidationTextBoxIsValid || =====*/ function(/*Boolean*/ isFocused){
		return (this.inherited("isValid", arguments) !== false && oldValidationTextBoxIsValid.apply(this, [isFocused]));
	};

	// monkey patch dijit/form/NumberTextBox.isValid to check this.inherited for isValid.
	// hide patch from doc parser though because we want it to display the original definition of isValid.
	var oldNumberTextBoxIsValid = NumberTextBox.prototype.isValid;
	NumberTextBox.prototype.isValid = /*===== oldNumberTextBoxIsValid || =====*/ function(/*Boolean*/ isFocused){
		return (this.inherited("isValid", arguments) !== false && oldNumberTextBoxIsValid.apply(this, [isFocused]));
	};

	if(!lang.isFunction(WidgetBase.prototype.isValid)){
		WidgetBase.prototype.isValid = function(){
			var valid = this.get("valid");
			return typeof valid == "undefined" ? true : valid;
		};
	}

	WidgetBase.prototype._setValidAttr = function(value){
		this._set("valid", value);
		this.validate();
	};
});

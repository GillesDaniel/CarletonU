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

define("dojox/mobile/bidi/Accordion", [
	"dojo/_base/declare",
	"./common",
	"dojo/dom-class"
], function(declare, common, domClass){

	// module:
	//		dojox/mobile/bidi/Accordion

	return declare(null, {
		// summary:
		//		Support for control over text direction for mobile Accordion widget, using Unicode Control Characters to control text direction.
		// description:
		//		Implementation for text direction support for Label.
		//		This class should not be used directly.
		//		Mobile Accordion widget loads this module when user sets "has: {'dojo-bidi': true }" in data-dojo-config.
		_setupChild: function(child){
			if(this.textDir){
				child.label = common.enforceTextDirWithUcc(child.label, this.textDir); 
			}
			this.inherited(arguments);
		},
		_setIconDir: function(iconNode){
			domClass.add(iconNode, "mblAccordionIconParentRtl");
		}
	});
});

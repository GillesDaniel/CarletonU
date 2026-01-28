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

define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin",
	"./_RendererMixin", "dojo/text!./templates/VerticalRenderer.html"],

	function(declare, _WidgetBase, _TemplatedMixin, _RendererMixin, template){

	return declare("dojox.calendar.VerticalRenderer", [_WidgetBase, _TemplatedMixin, _RendererMixin], {

		// summary:
		//		The default item vertical renderer.

		templateString: template,

		postCreate: function() {
			this.inherited(arguments);
			this._applyAttributes();
		},

		_isElementVisible: function(elt, startHidden, endHidden, size){
			var d;

			switch(elt){
				case "startTimeLabel":
					d = this.item.startTime;
					if(this.item.allDay || this.owner.isStartOfDay(d)){
						return false;
					}
					break;
				case "endTimeLabel":
					d = this.item.endTime;
					if(this.item.allDay || this.owner.isStartOfDay(d)){
						return false;
					}
					break;
			}
			return this.inherited(arguments);
		}

	});
});

// wrapped by build app
define("ibm/tivoli/mbs/dijit/editor/plugins/TpaeViewSource", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18, 5737-M66
 * 
 * (C) COPYRIGHT IBM CORP. 2023,2024 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

dojo.provide("ibm.tivoli.mbs.dijit.editor.plugins.TpaeViewSource");

dojo.declare("ibm.tivoli.mbs.dijit.editor.plugins.TpaeViewSource", dijit._editor.plugins.ViewSource, {

	/**
	 * IJ47777: Override the _filter() method
	 */
	_filter: function(html) {
		// summary:
		//		Internal function to perform some filtering on the HTML.
		// html: String
		//		The HTML to filter
		// tags:
		//		private
		if (html) {
			if (this.stripScripts) {
				html = this._stripScripts(html);
			}
			if (this.stripComments) {
				html = this._stripComments(html);
			}
			if (this.stripIFrames) {
				html = this._stripIFrames(html);
			}
			// IJ47777: Do not call the _stripEventHandlers() method. It causes performance
			// issues when opening a RTE that contains base64 encoded images.
			//if (this.stripEventHandlers) {
			//	html = this._stripEventHandlers(html);
			//}
		}
		return html;
	},	
});

// Register this plugin
dojo.subscribe(dijit._scopeName + ".Editor.getPlugin", null, function(o) {
	if (o.plugin) {
		return;
	}
	var name = o.args.name.toLowerCase();
	if (name === "tpaeviewsource") {
		o.plugin = new ibm.tivoli.mbs.dijit.editor.plugins.TpaeViewSource ({
			command: o.args.name
		});
	}
});

});

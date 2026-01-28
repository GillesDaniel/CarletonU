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

define(["dojo/_base/declare", "dojox/app/ViewBase", "dijit/form/Button"],
	function(declare, ViewBase, Button){
		return declare([Button, ViewBase], {
			postscript: function(){
				// we want to avoid kickin the Dijit lifecycle at ctor time so that definition has been mixed into the
				// widget when it is instanciated. This is only really needed if you need the definition
			},
			_startup: function(){
				this.create();
				this.inherited(arguments);
			}
		});
	}
);

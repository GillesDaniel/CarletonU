/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2011,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */

define(["dojo/main", "dijit/main", "dojox/main", "dojo/_base/declare"], function(dojo, dijit, dojox, declare) {

	var mapDojo = null;
	
	return declare( null, {
		_handlers : null,
		constructor : function(options) {
			this._handlers = [];
			this.useMaxDojo = (options && options.useMaxDojo) ? true : false;
		},
		/**
		 * Sets a different dojo version for the module
		 * Needed when the module was loaded previously with a different dojo version
		 * 
		 * @param dojoVersion
		 * 
		 */
		setMapDojoVersion: function(dojoVersion) {
			mapDojo = dojoVersion;
		},
		/**
		 * Select the dojo version to be used
		 * @return dojo
		 */
		selectDojoVersion: function() {
			var dojoVersion = null;
			if (this.useMaxDojo) {
				dojoVersion = window.dojo;
			} else {
				dojoVersion = mapDojo || dojo;
			}
			return dojoVersion;
		},
		_getExistingHandler: function(event, handlerFunction)
		{
			// Check first if there is an existing handler for the same event/handlerFunction
			var existingHandler = dojo.filter(this._handlers, function(h)
			{
				return ((event === h.event) && (handlerFunction === h.advice));
			});
			return (existingHandler.length > 0) ? existingHandler[0] : null;
			
		},
		addSubscription: function(event, handlerFunction)
		{
			var dojoVersion = this.selectDojoVersion();
			if(this._getExistingHandler(event, handlerFunction) == null)
			{
				var newHandler = dojoVersion.subscribe(event, handlerFunction);
				// Adding the event property because it looks like dojo.subscribe does not
				// add the event to the handler (I wonder how dojo.unsubscribe knows which event to remove...)
				newHandler.event = event;
				this._handlers.push(newHandler);
			}
		},

		addConnection: function(event, handlerFunction, obj, context)
		{
			var dojoVersion = this.selectDojoVersion();
			if(this._getExistingHandler(event, handlerFunction) == null)
			{
				var newHandler = dojoVersion.connect(obj, event, context, handlerFunction);
				// Adding the event property because it looks like dojo.subscribe does not
				// add the event to the handler (I wonder how dojo.unsubscribe knows which event to remove...)
				newHandler.event = event;
				this._handlers.push(newHandler);
			}
		},
		
		removeSubscription: function(event, handlerFunction)
		{
			var dojoVersion = this.selectDojoVersion();
			var handler = this._getExistingHandler(event, handlerFunction)
			if(handler != null)
			{
				// Remove the handler from the array and call dojo.unsubscribe for that handler
				var index = this._handlers.indexOf(handler);
				this._handlers.splice(index, 1);
				dojoVersion.unsubscribe(handler);
			}
		},

		destroyRecursive: function()
		{
			var dojoVersion = this.selectDojoVersion();
			var h;
			while ((h = this._handlers.pop())) {
				dojoVersion.unsubscribe(h);
			}
		}

	});

});

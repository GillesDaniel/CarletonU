/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2018,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

define([
    "dojo/topic",
	"dojo/_base/declare",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog"
], function(topic, declare,log){
    return declare(null, {
    	constructor: function() {    	
    		// need to define object reference HERE or else it would become shared with 
    		// all object instances (see dojo.declare)
    		this._HANDLERS={};

			// timers for window.settimeout calls
			this.timers={};
		},
    	
    	addHandler: function(id, handler) {
    		log.debug('{} Adding Handler: {}', this.TAG, id);
    		this._HANDLERS[id]=handler;
    		return handler;
    	},
    	
    	removeHandler: function(id) {
    		log.debug('{} Removing Handler: {}', this.TAG, id);
			this._HANDLERS[id].remove();
    		delete this._HANDLERS[id];
    	}, 
    	
    	clearHandlers: function() {
    		//debugger;
    		log.debug('{} Clearing Handlers', this.TAG);
    		for (var key in this._HANDLERS) {
    			this.removeHandler(key);
    		}
    		this._HANDLERS={};    		
    	},
    	
    	subscribeOn: function(topicId, func) {
    		log.debug('{} Subscribing to {}', this.TAG, topicId);    		
    		return this.addHandler(topicId, topic.subscribe(topicId, func));
    	},
    	
    	publishTo: function(topicId, data) {
    		log.debug('{} Publishing to {}', this.TAG, topicId);    		
    		return topic.publish(topicId, data);
    	},
    	
    	publishLater: function(topicId, data, timeout, ident) {
    		var me=this;
			timeout=timeout||100;
    		function _Later() {
        		me.publishTo(topicId, data);    			
    		}
			if (!ident) {
				window.setTimeout(_Later, timeout);
			} else {
                if (this.TAG) ident+=("_"+this.TAG);
				this.invokeLater(_Later, timeout, ident);
			}
    	},
		
		/**
		 * Attempts to invoke a js call later, and ensuring that if new requests come in with the same ident
		 * that the old one is cancelled and the new one is added, and the time is reset.
		 *
		 * @param jsFunc javascript function to call
		 * @param timeout delay in milliseconds
		 * @param ident identification for the instance
		 */
		invokeLater: function(jsFunc, timeout, ident) {
			ident=ident||(""+jsFunc);
			if (this.TAG) ident+=("_"+this.TAG);
			var existing = this.timers[ident];
			if (existing) {
				log.debug("updating settimeout {} for {}", timeout, ident);
				window.clearTimeout(existing);
			}
			var me=this;
			this.timers[ident]=window.setTimeout(function() {
				delete me.timers[ident];
				jsFunc();
			}, timeout);
		},
		
    	
    	destroy: function() {
    		this.clearHandlers();
    		this.inherited(arguments);
    	},

    	startup: function() {
        	this.inherited(arguments);
        }
    });
});

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

define("dojox/data/XmlItem", ["dojo/_base/declare"], 
  function(declare) {

return declare("dojox.data.XmlItem", null, {
	constructor: function(element, store, query){
		// summary:
		//		Initialize with an XML element
		// element:
		//		An XML element
		// store:
		//		The containing store, if any.
		// query:
		//		The query to use to look up a specific element.
		//		Usually an XPath or dojo.query statement.
		this.element = element;
		this.store = store;
		this.q = query;
	},
	// summary:
	//		A data item of 'XmlStore'
	// description:
	//		This class represents an item of 'XmlStore' holding an XML element.
	//		'element'
	// element:
	//		An XML element
	toString: function(){
		// summary:
		//		Return a value of the first text child of the element
		// returns:
		//		a value of the first text child of the element
		var str = "";
		if(this.element){
			for(var i = 0; i < this.element.childNodes.length; i++){
				var node = this.element.childNodes[i];
				if(node.nodeType === 3 || node.nodeType === 4){
					str += node.nodeValue;
				}
			}
		}
		return str;	//String
	}
});
});

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

define("dojox/store/db/has", ['dojo/has', 'dojo/sniff'], function(has){
	//	summary:
	//		has() test for indexeddb. 
	has.add('indexeddb', !!(window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB));
	return has;
});

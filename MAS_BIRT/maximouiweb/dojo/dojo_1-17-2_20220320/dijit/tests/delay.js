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

// module:
//		dijit/tests/delay.js
// summary:
//		AMD plugin that waits a specified number of ms before "loading".
//		Used to delay execution of callbacks registered by dojo.ready().
//		(Used by _testCommon.html)
//
//		Usage: ready(1, function(){ require(["dijit/tests/delay!300"]); });

// TODO: remove for 2.0, it's only used by _testCommon.js which will also be removed.

define({
	load: function(delay, req, loaded){
		setTimeout(function(){
			loaded(1);
		}, delay);
	},
	dynamic: 1,
	normalize: function(id){
		return id;
	}
});

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

// Rhino-based replacement for dojo/_base/xhr (get only)
define(function(){
	return {
	    get: function(args){
		try {
		    args.load(readFile(args.url, "utf-8"));
		} catch (e) {
		    args.error();
		}
	    }
	}
});

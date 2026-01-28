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

define(["build/buildControlDefault"], function(bc){
	// module:
	//		dojox/app/build/buildControlApp
	// summary:
	//		This module extend default build control module to add dojox/app build support
	// enhance buildControl
	bc.discoveryProcs.splice(0, 0, "dojox/app/build/discoverAppConfig");
	return bc;
});

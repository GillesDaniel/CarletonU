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

define(function(require, exports, module){
	var impliedDep = require("./impliedDep2");
	require("dojo/_base/lang").mixin(exports, {
		module:module,
		id:"factoryArityExports",
		impliedDep:impliedDep.id
	});
});

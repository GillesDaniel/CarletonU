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

define("test/App", ["dijit","dojo","dojox","dojo/require!test/Module"], function(dijit,dojo,dojox)
{
	console.log('APP loaded');

	dojo.provide('test.App');

	dojo.require('test.Module');

	dojo.declare('test.App', [ ], { foo : null });
});

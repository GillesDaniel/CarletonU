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

define("test/Module", ["dijit","dojo","dojox","dojo/require!dijit/_TemplatedMixin"], function(dijit,dojo,dojox){
	console.log('MODULE loaded');

	dojo.provide('test.Module');

	dojo.require('dijit._TemplatedMixin');

	dojo.declare('test.Module', [ dijit._TemplatedMixin ], { foo : null });
});

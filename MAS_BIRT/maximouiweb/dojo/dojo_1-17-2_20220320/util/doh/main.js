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

define([
	"doh/runner",
	"dojo/has!host-browser?doh/_browserRunner",
	"dojo/has!host-node?doh/_nodeRunner",
	"dojo/has!host-rhino?doh/_rhinoRunner"], function(doh) {
	return doh;
});

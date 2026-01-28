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
	"dojo",
	"doh",
	"require",
	"dojo/sniff",
	"./loader/bootstrap"], function(dojo, doh, require, has){
	if(doh.isBrowser){

		//TODO: doh.register("testsDOH._base.loader.cdn-load", require.toUrl("./loader/cdnTest.html"));

		doh.register("testsDOH._base.loader.top-level-module-by-paths", require.toUrl("./loader/paths.html"));
	}
});


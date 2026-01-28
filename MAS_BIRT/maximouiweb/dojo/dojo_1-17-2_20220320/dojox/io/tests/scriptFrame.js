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

require(['doh', 'dojo/_base/kernel', 'dojo/_base/sniff', 'dojo/_base/url'], function(doh, dojo){

if(dojo.isBrowser){
	doh.registerUrl("dojox.io.tests.scriptFrame", dojo.moduleUrl("dojox.io.tests", "scriptFrame.html"));
}

});

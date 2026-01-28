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

require(["dojo/_base/window","dojox/app/main", "dojox/json/ref", "dojo/text!./config.json"],
function(win, Application, jsonRef, config){
	Application(jsonRef.fromJson(config));
});

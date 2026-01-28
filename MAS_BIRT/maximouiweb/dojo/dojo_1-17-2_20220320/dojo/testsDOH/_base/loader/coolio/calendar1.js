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

dojo.provide("coolio.calendar1");
dojo.require("dijit.Calendar");

coolio.calendar1= function(id){
	return new dijit.Calendar({}, dojo.byId(id));
};

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

define(["dojo", "dijit/Calendar"], function(dojo, calendar){
	// a coolio/calendarAsync-created calendar will be created in the cdojo and cdijit instances
	// but, during dev, this is a detail we can ignore...the config makes in just work
	return function(id){
		return new calendar({}, dojo.byId(id));
	};
});

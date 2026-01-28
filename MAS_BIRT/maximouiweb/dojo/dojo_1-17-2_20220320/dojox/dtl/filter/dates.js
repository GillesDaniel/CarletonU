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
	"dojo/_base/lang",
	"../_base",	
	"../utils/date"
], function(lang,dd,ddud){

	var ddfd = lang.getObject("filter.dates", true, dd);
/*=====
	ddfd = {
		// TODO: summary
	};
=====*/

	lang.mixin(ddfd, {
		_toDate: function(value){
			if(value instanceof Date){
				return value;
			}
			value = new Date(value);
			if(value.getTime() == new Date(0).getTime()){
				return "";
			}
			return value;
		},
		date: function(value, arg){
			// summary:
			//		Formats a date according to the given format
			value = ddfd._toDate(value);
			if(!value){
				return "";
			}
			arg = arg || "N j, Y";
			return ddud.format(value, arg);
		},
		time: function(value, arg){
			// summary:
			//		Formats a time according to the given format
			value = ddfd._toDate(value);
			if(!value){
				return "";
			}
			arg = arg || "P";
			return ddud.format(value, arg);
		},
		timesince: function(value, arg){
			// summary:
			//		Formats a date as the time since that date (i.e. "4 days, 6 hours")
			value = ddfd._toDate(value);
			if(!value){
				return "";
			}
			var timesince = ddud.timesince;
			if(arg){
				return timesince(arg, value);
			}
			return timesince(value);
		},
		timeuntil: function(value, arg){
			// summary:
			//		Formats a date as the time until that date (i.e. "4 days, 6 hours")
			value = ddfd._toDate(value);
			if(!value){
				return "";
			}
			var timesince = ddud.timesince;
			if(arg){
				return timesince(arg, value);
			}
			return timesince(new Date(), value);
		}
	});

	return ddfd;
});

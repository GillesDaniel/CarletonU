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
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/Calendar"],

function(
	declare,
	lang,
	Calendar){
					
	return declare("demo.DatePicker", Calendar, {
		
		minDate: null,
		maxDate: null,
		
		getClassForDate: function(date, locale){
			if(this.minDate && this.maxDate){
				var cal = this.dateModule;
				if(cal.compare(date, this.minDate) >= 0 && cal.compare(date, this.maxDate) <= 0){
					return "Highlighted";
				}				
			}
			return null;
		}
		
	});
});

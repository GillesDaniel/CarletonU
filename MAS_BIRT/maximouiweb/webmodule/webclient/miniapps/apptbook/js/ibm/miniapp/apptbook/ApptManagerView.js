/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2018,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

define([
	"dojo/_base/lang",
	"dojo/_base/declare",
    "com/ibm/tivoli/maximo/miniapps/_MiniApp",
    "com/ibm/tivoli/maximo/miniapps/_MaximoIO",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
	"com/ibm/tivoli/maximo/miniapps/Handlers",
	"ibm/miniapp/apptbook/AppointmentsView",
    "dojo/date",
    "ibm/tivoli/mbs/dijit/DateTimeCalendar",
    "dijit/Calendar",
    "dijit/popup"


], function(lang, declare, _MiniApp, _MaximoIO, log, Handlers,AppointmentsView, dates, DateTimeCalendar, Calendar, popup){
    return declare([_MiniApp, _MaximoIO, Handlers,AppointmentsView], {
		// static variables
        GANTTCOL: 'GANTT',
		gridId: 'apptbook',
		grid: null,
        projectid: '',
    	
    	constructor: function(options) {
            this.TAG=options.TAG||'APPTBOOK';

    		if (options.loglevel) {
    			log.LOG_LEVEL=options.loglevel;
    		}
    		
    		log.debug("{} options", this.TAG, options);

            // listen for the sample click using dojo publish/subscribe
			this.subscribeOn('apptbook.toolbar.sample', lang.hitch(this, this.OnSampleIconClick))
    	}


		
    });
});

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
    "dijit/popup",
    "dojo/dom"


], function(lang, declare, _MiniApp, _MaximoIO, log, Handlers,AppointmentsView, dates, DateTimeCalendar, Calendar, popup, dom){
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

			this.weatherData = null;

			// register a callback for the weather icon click
			window.OnSKDWeatherIconClick = lang.hitch(this, this.OnWeatherIconClick);
    	},

        OnWeatherIconClick: function(dayStr) {
        	log.debug("OnWeatherIconClick: " + dayStr);
        	var weatherDay = this.getWeatherForDay(dayStr);
        	if (weatherDay) {
        		log.debug("We Clicked on ICON {} for Day: ", dayStr, weatherDay);
        		// TODO: Handle Weather Icon Clicked??
			}
		},

        OnGetGanttHeader: function (grid, val,index,date,nextdate,units) {
        	var html = this.inherited(arguments);
            if(val.indexOf('.') < 0) {
	        	var weatherHtml = this.getWeatherAlertHtml(date);
                if (weatherHtml) {
                    html += weatherHtml;
                }
                log.debug("OnGetGanttHeader: {}", html);
            }
			return html;
		},

        getWeatherAlertHtml: function(day) {
            if (!this.options.scheduler_plus_weather_license) {
                log.debug("No Weather License");
                return;
            }

            // TODO: uncomment this to avoid checking weather
        	 if (!this.weatherData || !this.weatherData.days) return;

            var ourDate = new Date(day).toISOString().substr(0, 10).trim();
			var weatherDay = this.getWeatherForDay(ourDate);
			if (!weatherDay) {
				log.debug("No Weather for Day: {}", ourDate);
				// no weather for this date
				return;
			}

            log.debug("Weather Alert: {} ()", day, ourDate, weatherDay);

            if (weatherDay.weatheralert !=null && weatherDay.weatheralert !='noalert') {
                var wDate = new Date(weatherDay.date).toISOString().substr(0, 10).trim();
                return '<span class="WeatherAlert" onclick="OnSKDWeatherIconClick(\'' + wDate + '\')"><img src="miniapps/common/ac16_alert_weather.png" title="'+weatherDay.weatheralert+'"/></span>';
            }
        },

        getWeatherForDay: function(/* String Date in Format yyyy-mm-dd*/ strDay) {
            if (this.weatherData && this.weatherData.days) {
                for (var i = 0; i < this.weatherData.days.length; i++) {
                    var d = this.weatherData.days[i];
                    var wDate = new Date(d.date).toISOString().substr(0, 10).trim();
                    if (wDate == strDay) {
                        return d;
                    }
                }
            }
		},

        OnRenderFinish: function(/*TGrid*/ grid) {

    		log.debug("Resizing to Fit")
			grid.ActionZoomFit();
			this.grid = grid;
			var me=this;

			if(this.options.scheduler_plus_weather_license) {
				this.fetch("load_weather_data", {}).then(lang.hitch(this, function (data) {
					me.weatherData=data;
					if (me.weatherData)
						me.grid.RefreshGantt(5); // if 5 doesn't work try 255

					var error_message = null;
					var null_location = false;
					
					if(data && (data.status_message == "null_location")) {
						null_location = true;
		            }
					
					if(data && (data.status == 401)) {
		            	error_message = me.options.not_authorized;
		            }
					
					if(data && (data.error_invalid_locale)) {
						error_message = me.options.weather_invalid_locale;
					}
					if(data && (data.status == 400)) {
						error_message = me.options.weather_bad_request;
		            }
					
					if(data && (data.status == 412)) {
		            	error_message = me.options.weather_no_location;
		            }
					if(data && (data.status == 404)) {
		            	error_message = me.options.weather_out_of_range;
		            }
					if (!data || !data.status || data.status > 400) {
		            	error_message = me.options.unable_to_fetch;
					}
					
		            if(error_message || null_location) {
		            	var current_date = new Date();
		            	
		            	for(var i =0;i < 7; i++) {
		            		var element_id = current_date.toISOString().substr(0, 10);
		            		var dom_element = dom.byId("date_" + element_id + ".1");
		            		if(dom_element) {
		            			if(!null_location) {
		            				var result_html = '<span class="helper"></span><div class="errorHeader"><img src="../images/async/warning.png" title="' + error_message + '"></div>';
			            			dom_element.innerHTML += result_html;
		            			}
		            		}
		            		current_date.setDate(current_date.getDate() + 1);
		            	}
		            } else {
		            	for(var i =0;i < data.days.length; i++) {
							var day = data.days[i];
							
							for(var j =0;j < day.fields.length; j++) 
							{
								var field_item = day.fields[j];
								var element_id = new Date(day.date).toISOString().substr(0, 10);
								var dom_element = dom.byId("date_" + element_id + "." + (j+1));
								
								if(dom_element && field_item.value) 
								{
									var result_html = '<div';
									var alert_html ='';
									if (field_item.style) {
										result_html += ' class="' + field_item.style + '"';
									}
									result_html += '>';
									if(!field_item.suppress_label) {
											result_html += '<div class="header">'+ field_item.label+'</div>';
									}
									if(field_item.icon) 
									{	
											result_html += ('<img src="weather/100x100/'+field_item.value+'.png">');
									} 
									else {
											result_html += ('<span>' + field_item.value_formatted + '</span>');
									}
									result_html += '</div>';
									dom_element.innerHTML += result_html;
								}
								
							}
						}
		            }
				}));
			}
		},
		
		showNoWeather: function(dom_element, message) {
            log.error('No Weather', message);
		}
    });
});

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
	"dojo/dom-geometry",
	"dojo/dom",
	"dojo/dom-style",
	"dojo/dom-attr",
    "dojo/dom-class",
	"dojo/_base/window",
    "com/ibm/tivoli/maximo/miniapps/_MiniApp",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
	"com/ibm/tivoli/maximo/miniapps/Handlers"

], function(lang, declare, geom, dom, domStyle, domAttr, domClass, bwin, _MiniApp, log, Handlers){
    return declare([_MiniApp, Handlers], {
		// static variables
		TAG: "WEATHER",

        TAB_CURRENT: 0,
        TAB_DAILY: 1,
        TAB_HOURLY: 2,

    /**
         * Known Options
         * height: max height of the weather component
         * show_current_button: true
         * show_daily_button: true
         * show_hourly_button: true
         *
         * @param options
         */
    	constructor: function(options) {
            this.options = options||{};

    		log.debug("{} options", this.TAG, options);

            // class vars
            this.weatherParams = options.params||{};
            this.currentData=null;
            this.hourlyData=null;
            this.dailyData=null;
            this.tabs = [];
            this.currentTab = null;
            this.labels = options.labels||{};

            // this is the dom node that is the parent for the weather UI
            // it is normally null, UNLESS, we are embedding the weather component into another component
            // when we are embedded
            if (options.embedded) {
                this.subscribeOn('weather.embedded.update', lang.hitch(this, this.onWeatherUpdate));
                this.weatherNode = (options.weatherNodeId) ? document.getElementById(options.weatherNodeId) : null;
            }

            this.sectionHeight = options.height || 330;
    	},

        label: function(key, defValue) {
            return this[key] || defValue;
        },

        startup: function() {
        	this.inherited(arguments);

            if (this.embedded) {
                log.debug("Weather is embedded, we'll wait for the weather.embedded.update command before showing weather")
                // when embedded we hide the control's parent dom, since, we will embed this into another dom parent
                this.domNode.style.displa='none';
            }

            // if we are not embedded, or we are embedded and we have the weatherNode in which to embed then create the UI
            if (!this.embedded || (this.embedded && this.weatherNode)) {
                this.discoverWeather();
            }
        },

		destroy: function () {
			this.inherited(arguments);
		},

        discoverWeather: function() {
            this.fetch("discover_weather").then(lang.hitch(this, this.handleWeatherResponse));
        },

        handleWeatherResponse: function(data) {
            log.debug("Handling Weather Response", data);

            if(data && (data.error_invalid_locale)) {
                this.showNoWeather(this.options.weather_invalid_locale);
                return;
            }

            if(data && (data.status == 400)) {
                this.showNoWeather(this.options.weather_bad_request);
                return;
            }

            if(data && (data.status == 401)) {
                this.showNoWeather(this.options.not_authorized);
                return;
            }

            if(data && (data.status == 412)) {
                this.showNoWeather(this.options.weather_no_location);
                return;
            }

            if(data && (data.status == 404)) {
                this.showNoWeather(this.options.weather_out_of_range);
                return;
            }

            if (!data || !data.ui || !data.ui.tab || data.status > 400) {
                this.showNoWeather(this.options.unable_to_fetch);
                return;
            }
            
            this.weatherParams = this.weatherParams || {};
            // the lat/lng from the weather response, if there is one.
            this.weatherParams.lat = this.weatherParams.lat || data.latitude;
            this.weatherParams.lng = this.weatherParams.lng || data.longitude;

            if (data.ui.tab == 'current') {
                this.currentData=data;
                this.createUI(data.ui.tab);
            } else if (data.ui.tab == 'daily') {
                this.dailyData=data;
                this.createUI(data.ui.tab);
            } else if (data.ui.tab == 'hourly') {
                this.hourlyData=data;
                this.createUI(data.ui.tab);
            } else {
                log.error("Invalid TAB: {}", data.ui.tab);
            }
        },

		createUI: function(uitab) {
            uiuab = uitab || 'current';

            if (!this.weatherNode) {
                if (this.embedded && this.weatherParams.domId) {
                    log.debug("Embedded weather, trying to find DOMID: {}", this.weatherParams.domId);
                    this.weatherNode = document.getElementById(this.weatherParams.domId);
                    if (!this.weatherNode) {
                        log.error("Missing DOMID: {} in which to embed the weather control", this.weatherParams.domId);
                        return;
                    }
                } else {
                    this.weatherNode = this.domNode;
                }
            }

			this.weatherNode.innerHTML='<div class="weather">' +
                '<div id="weather_content" class="weather_content">' +
                '   <div id="weather_tab_current" class="panel current container">&hellip;&hellip;</div>' +
                '   <div id="weather_tab_hourly" class="panel hourly container">&hellip;&hellip;</div>' +
                '   <div id="weather_tab_daily" class="panel daily container">&hellip;&hellip;</div>' +
                '</div>' +
                '<ul class="weather-nav weather-nav-back">' +
                '   <li><a id="#weather_current" href="#current">'+this.label('label.current','CURRENT')+'</a></li>' +
                '   <li><a id="#weather_hourly" href="#hourly">'+this.label('label.hourly','HOURLY')+'</a></li>' +
                '   <li><a id="#weather_daily" href="#daily">'+this.label('label.daily','DAILY')+'</a></li>' +
                '</ul></div>';

            this.weatherNode.addEventListener("click", function(evt) {
                // eat all events on the toplevel div, but allow clicks to pass though to children
                // ie the tab elements
                evt.preventDefault();
                if (evt.stopPropagation) {
                    // W3C standard variant
                    evt.stopPropagation()
                } else {
                    // IE variant
                    evt.cancelBubble = true
                }
            }, false);


            // build up the 'tabs' so that it's easier to work with
            var btns = this.weatherNode.querySelectorAll('ul a');
            var contents = this.weatherNode.querySelectorAll('.panel');

            if (btns.length != contents.length) {
                log.error("Tab Buttons ({}) and Tab Contents ({}) do not match", btns.length, contents.length);
                return;
            }

            var me = this;
            for (var i = 0; i < btns.length; ++i) {
                var tab = {
                    link:  btns[i],
                    content: contents[i],
                    id: btns[i].getAttribute("id").split("_")[1]
                };

                log.debug('Hooking OnClick', tab.link);
                tab.link.onclick = function(t) {
                    return function(evt) {
                        me.onTabChange(evt, t, me.currentTab);
                    };
                }(tab);
                tab.content.style.display='none';
                //var front = tab.content.querySelectorAll(".front")[0];
                //tab.content.style.height=front.style.height;
                tab.content.style.height=this.sectionHeight+'px';
                this.tabs[i]=tab;
            }

            log.debug("Focusing Tab", uitab);
            this.getTab(uitab).link.click();
		},

        getTab: function(id) {
            for (var i = 0; i < this.tabs.length; ++i) {
                if (id == this.tabs[i].id) return this.tabs[i];
            }
            return null;
        },

        onTabChange: function(evt, newTab, oldTab) {
            evt.preventDefault();
            if (evt.stopPropagation) {
                // W3C standard variant
                evt.stopPropagation()
            } else {
                // IE variant
                evt.cancelBubble = true
            }


            log.debug("Click: ", evt, newTab, oldTab);

            if (oldTab) {
                oldTab.content.style.display='none';
                oldTab.link.className="";
            }

            if (newTab) {
                newTab.content.style.display='';
                newTab.link.className="selected";
            }

            this.currentTab=newTab;

            this["on" + this.currentTab.id.toUpperCase() + "TabSelected"]();

            return false;
        },

        /**
         * onWeatherUpdate would be called with wonum, start, end.  We would then call the server asking for the
         * weather, and when it returns, the reply will tell us which tab to show, and which tab buttons should be
         * visible, etc, along with UI params as well.  If not params are specified then we just show the UI
         * for the current weather.
         *
         *
         *
         * @param params
         */
        onWeatherUpdate: function(params) {
            this.weatherParams = params||{};
            this.currentTab=null;
            this.weatherNode=null;
            this.currentData=null;
            this.hourlyData=null;
            this.dailyData=null;

            log.debug("Got weather params", params);

            if (!this.weatherParams.wonum) {
                log.debug("Missing wonum in parameters, will likely not be able to get a weather location");
                this.weatherParams.wonum='';
            }

            if (!this.weatherParams.start) {
                this.weatherParams.start=0;
            }

            if (!this.weatherParams.end) {
                this.weatherParams.start=0;
            }

            this.fetch(
                "discover_weather_with_options", {options: this.weatherParams}
            ).then(lang.hitch(this, this.handleWeatherResponse));

        },

        showNoWeather: function(message) {
            log.error('No Weather', message);
            
            var node = this.weatherNode;
            if (this.currentTab && this.currentTab.content) node=this.currentTab.content;
            
            if (!node) {
                if (this.embedded && this.weatherParams.domId) {
                    log.debug("Embedded weather, trying to find DOMID: {}", this.weatherParams.domId);
                    node = document.getElementById(this.weatherParams.domId);
                    if (!node) {
                        log.error("Missing DOMID: {} in which to embed the weather control", this.weatherParams.domId);
                        return;
                    }
                } else {
                    node = this.domNode;
                }
            }
            
			node.innerHTML='<div class="weather"><div class="error"><span class="error">' +
				message +
                '</span></div></div>';
        },

        onHOURLYTabSelected: function() {
            if (this.hourlyData) {
                this.showHourlyWeather(this.hourlyData);
                return;
            }

            var me=this;
            this.fetch(
                "get_hourly_weather", this.weatherParams
            ).then(
                function(data) {
                    me.hourlyData=data;
                    me.showHourlyWeather(data);
                }
            );
        },

        onDAILYTabSelected: function() {
            if (this.dailyData) {
                this.showDailyWeather(this.dailyData);
                return;
            }

            var me=this;
            this.fetch(
                "get_daily_weather", this.weatherParams
            ).then(
                function(data) {
                    me.dailyData=data;
                    me.showDailyWeather(data);
                }
            );
        },

        onCURRENTTabSelected: function() {
            if (this.currentData) {
                this.showCurrentWeather(this.currentData);
                return;
            }

            log.debug("No Current Weather, Fetching it now.", this.currentData);
            var me=this;
            this.fetch(
                "get_current_weather", this.weatherParams
            ).then(
                function(data) {
                    me.currentData=data;
                    me.showCurrentWeather(data);
                }
            );
        },

        showCurrentWeather: function(data) {
            log.debug("Showing Current Weather", data);

            if (!this.validateResponse(data)) return;

            this.currentTab.content.innerHTML=this.buildWeatherPanel(data, data.show_more, 0);
            this.updateButtons(data);
            if (data.show_more) {
                this.applyCardFlip(this.currentTab.content);
            }
            this.renderComplete();
        },

        updateButtons: function(data) {
            if (!data.current_weather) {
                this.hideTab("current");
            }
            if (!data.daily_weather) {
                this.hideTab("daily");
            }
            if (!data.hourly_weather) {
                this.hideTab("hourly");
            }
        },

        hideTab: function(tab) {
            var t = this.getTab(tab);
            if (!t) {
                log.debug("missing tab: " + tab);
            } else {
                t.link.parentNode.style.display='none';
            }
        },

        applyCardFlip: function(elParent) {
            var cards = elParent.querySelectorAll(".card");
            var me=this;
            for (var i=0;i<cards.length;i++) {
                cards[i].style.cursor='pointer';
                cards[i].addEventListener("click", function(evt) {
                    // IE has issues with the flipping... maybe someday, we'll figure it out, but not in this release
                    var isIE = navigator.appVersion.indexOf('Trident') >=0 || navigator.userAgent.indexOf('MSIE')>=0;
                    var style = (isIE)?'flipped_ie':'flipped';
                    log.debug("flip for FF and Chrome");
                    var card = me.findCard(evt.target);
                    if (card) {
                        domClass.toggle(card, style);
                    } else {
                        log.debug("NO CARD");
                    }
                });
            }
        },

        findCard: function(el) {
            if (el==null) return null;
            if (el.className!=null && el.className.indexOf('card')!=-1) {
                return el;
            }
            return this.findCard(el.parentNode);
        },

        validateResponse: function(data) {
            if (!data || !data.status>500) {
                this.showNoWeather(this.options.unable_to_fetch);
                return false;
            }

            if(data.status == 401) {
                this.showNoWeather(this.options.not_authorized);
                return false;
            }

            return true;
        },

        showDailyWeather: function(data) {
            log.debug("Showing Daily Weather", data, this.weatherParams);

            if (!this.validateResponse(data)) return;

            var html = '';
            for (var i=0;i<data.days.length;i++) {
                var day = this.buildWeatherPanel(data.days[i], data.show_more, i);
                html+=day;
            }
            this.currentTab.content.innerHTML=html;
            this.updateButtons(data);
            if (data.show_more) {
                this.applyCardFlip(this.currentTab.content);
            }

            // focus the date we need
            if (this.weatherParams && this.weatherParams.start) {
                //format date: yyyy-MM-dd
                var element_id = ".d"+(new Date(this.weatherParams.start).toISOString().substr(0, 10));
                var panel = this.currentTab.content.querySelectorAll(element_id);
                if (panel) panel=panel[0];
                if (panel) {
                    domClass.add(panel, "highlight");

                    // center this panel in the content area
                    var pwid = panel.offsetWidth;
                    var pid = panel.getAttribute("panel");
                    var offset = pid*pwid;
                    var conwidth=panel.parentNode.offsetWidth;
                    if (conwidth>pwid) {
                        offset -= ((conwidth-pwid)/2);
                    }
                    panel.parentNode.scrollLeft=offset;

                } else {
                    log.warn("NO PANEL FOR {}", element_id);
                }
            }
            this.renderComplete();
        },

        showHourlyWeather: function(data) {
            log.debug("Showing Hourly Weather", data, this.weatherParams);

            if (!this.validateResponse(data)) return;

            var html = '';
            for (var i=0;i<data.hours.length;i++) {
                var hour = this.buildWeatherPanel(data.hours[i], data.show_more, i);
                html+=hour;
            }
            this.currentTab.content.innerHTML=html;
            this.updateButtons(data);
            if (data.show_more) {
                this.applyCardFlip(this.currentTab.content);
            }

            // focus the time we need
            if (this.weatherParams && this.weatherParams.start) {
                //format time: hh
                var time = DateToString(this.weatherParams.start, "HH");
                var element_id = ".t"+ time;
                var panel = this.currentTab.content.querySelectorAll(element_id);
                if (panel) panel=panel[0];
                if (panel) {
                    domClass.add(panel, "highlight");

                    // center this panel in the content area
                    var pwid = panel.offsetWidth;
                    var pid = panel.getAttribute("panel");
                    var offset = pid*pwid;
                    var conwidth=panel.parentNode.offsetWidth;
                    if (conwidth>pwid) {
                        offset -= ((conwidth-pwid)/2);
                    }
                    panel.parentNode.scrollLeft=offset;

                } else {
                    log.warn("NO PANEL FOR {}", element_id);
                }
            }


            this.renderComplete();
        },

        renderComplete: function() {
            if (this.weatherParams && this.weatherParams.onRenderFinish) {
                this.weatherParams.onRenderFinish();
            }
        },

        buildWeatherPanel: function(data, showmore, panelnum) {
            if (data.fields) {
                var striped='';
                if ((panelnum+1) % 2 ==0) striped='striped';
                var dayId=null;
                if (panelnum && data['x-yyyymmdd']) {
                    dayId = ' d'+data['x-yyyymmdd'];
                } else {
                    dayId = ' ';
                }
                var timeId=null;
                if (panelnum && data['x-hh']) {
                    timeId = ' t'+data['x-hh'];
                } else {
                    timeId = ' ';
                }
                var html = '<div panel='+panelnum+' class="section card '+striped+dayId+timeId+'">';

                // FRONT
                html += '<div class="front">';
                for (var i=0;i<data.fields.length;i++) {
                    var fld = data.fields[i];
                    if (!fld.value) {
                        // need to check fld_suppress empty
                        continue;
                    }

                    var row = this.buildRowItem(fld);
                    if (row) {
                        html += row;
                    }
                }
                html += '</div>';

                // BACK
                if (showmore) {
                    html += '<div class="back">';
                    if (data.more_fields) {
                        for (var i = 0; i < data.more_fields.length; i++) {
                            var fld = data.more_fields[i];
                            if (!fld.value) {
                                // need to check fld_suppress empty
                                continue;
                            }

                            var row = this.buildRowItemForShowMore(fld);
                            if (row) {
                                html += row;
                            }
                        }
                    } else {
                        // What??
                    }
                    html += '</div>';
                }

                html += '</div>';
                return html;
            }
        },

        buildRowItemForShowMore: function(fld) {
            if (!fld.value) {
                return null;
            }
            
            var row = '<div class="more">';

            row += ('<label>'+fld.label+'</label>');

            if (fld.icon) {
                row += ('<img src="weather/100x100/'+fld.value+'.png">');
            } else {
                row += ('<span>' + fld.value_formatted + '</span>');
            }

            row += '</div>';

            return row;
        },
        
        buildRowItem: function(fld) {
            if (!fld.value) {
                return null;
            }

            var row = '<div class="item">';
            if (fld.style) {
                row = '<div class="item '+fld.style+'">';
            }

            if (!fld.suppress_label) {
                row += ('<label>'+fld.label+'</label>');
            }

            if (fld.icon) {
                row += ('<img src="weather/100x100/'+fld.value+'.png">');
            } else {
                row += ('<span>' + fld.value_formatted + '</span>');
            }

            row += '</div>';

            return row;
        },

        onRefreshRequested: function(data) {
			log.debug("Refresh UI");
			log.debug(data);

        },

        /**
         * Either returns an object with w,h or width,height.
		 * The latter being a css measurement vs a pixel box measurement.
         */
        onMeasure: function () {
            log.debug('{}: onMeasure() RRR called', this.TAG);
			return {}
        }
    });
});

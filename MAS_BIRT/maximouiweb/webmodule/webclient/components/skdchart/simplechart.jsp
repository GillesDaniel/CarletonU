<%--
 * IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2013,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 *
--%><%@page import="com.ibm.tivoli.maximo.skd.control.chart.ChartType"%>
<%@page import="com.ibm.tivoli.maximo.skd.control.chart.Chart"%>
<%@page import="com.ibm.json.java.JSONArray"%>
<%@page import="com.ibm.tivoli.maximo.skd.control.chart.Series"%>
<%@page
	import="com.ibm.tivoli.maximo.skd.control.chart.SimpleChartControl"%>
<%@ include file="../../common/simpleheader.jsp"%>
<%--
JSON Chart Data - This should never show up in the control, and is here for reference only
DATA: RAW: {"axis":{"x":{"includeZero":false,"minorTicks":false,"majorTickStep":1,"microTicks":false,"fixed":true,"fontColor":"black","minorLabels":false,"majorLabels":true,"natural":true,"_axisId":"x","titleFontColor":"black","labels":[{"value":1,"text":"9\/23\/13"}]},"y":{"includeZero":true,"minorTicks":false,"min":0,"fontColor":"black","minorLabels":false,"vertical":true,"majorLabels":true,"_axisId":"y","titleFontColor":"black","labels":[]}},"seriesArray":[{"data":[{"tooltip":"4,583.76","x_real":1379908800000,"x":1,"y":4583.76,"x_label":"9\/23\/13"}],"name":"LONDSCHED","options":{}},{"data":[{"tooltip":"4,583.76","x_real":1379908800000,"x":1,"y":0,"x_label":"9\/23\/13"}],"name":"","options":{}}],"type":{"_label":"scheduler#label_ClusteredColumns_chart","gap":5,"type":"ClusteredColumns"},"legend":{},"options":{"titleFont":"normal normal normal 15pt Arial","title":"Saved Est. Total (Weekly)","titleFontColor":"black","titlePos":"top","titleGap":25}}
FORMATTED:
{
   "axis":{
      "x":{
         "includeZero":false,
         "minorTicks":false,
         "majorTickStep":1,
         "microTicks":false,
         "fixed":true,
         "fontColor":"black",
         "minorLabels":false,
         "majorLabels":true,
         "natural":true,
         "_axisId":"x",
         "titleFontColor":"black",
         "labels":[
            {
               "value":1,
               "text":"9\/23\/13"
            }
         ]
      },
      "y":{
         "includeZero":true,
         "minorTicks":false,
         "min":0,
         "fontColor":"black",
         "minorLabels":false,
         "vertical":true,
         "majorLabels":true,
         "_axisId":"y",
         "titleFontColor":"black",
         "labels":[

         ]
      }
   },
   "seriesArray":[
      {
         "data":[
            {
               "tooltip":"4,583.76",
               "x_real":1379908800000,
               "x":1,
               "y":4583.76,
               "x_label":"9\/23\/13"
            }
         ],
         "name":"LONDSCHED",
         "options":{

         }
      },
      {
         "data":[
            {
               "tooltip":"4,583.76",
               "x_real":1379908800000,
               "x":1,
               "y":0,
               "x_label":"9\/23\/13"
            }
         ],
         "name":"",
         "options":{

         }
      }
   ],
   "type":{
      "_label":"scheduler#label_ClusteredColumns_chart",
      "gap":5,
      "type":"ClusteredColumns"
   },
   "legend":{

   },
   "options":{
      "titleFont":"normal normal normal 15pt Arial",
      "title":"Saved Est. Total (Weekly)",
      "titleFontColor":"black",
      "titlePos":"top",
      "titleGap":25
   }
}
--%>
<%
	SimpleChartControl chart = (SimpleChartControl)control;
	String height = chart.getHeight();
	height = component.getWebClientSession().attachUOM(height);
	
	boolean legendVisible = chart.getBoolean("legendvisible");
	JSONArray supportedChartTypes = chart.getSupportedChartTypes();
	int animateDuration = chart.getInt("animateduration",0);
	JSONArray supportedThemes = chart.getSupportedChartThemes();
	String xscaleEnabled = chart.getProperty("xscaleenabled");
	String yscaleEnabled = chart.getProperty("yscaleenabled");
	
	String dir = "ltr";
	String left = "left";
	boolean isRTL = BidiUtils.isGUIMirrored(langcode);
	
	//isRTL=true;
	if (isRTL) {
		dir="rtl";
		left="right";
	}
	
	String width = chart.getProperty("width");
	width = component.getWebClientSession().attachUOM(width);
	
	if(designmode)
	{
		%><tr style="min-height: 50px; width: <%=width%>; height: <%=height%>; background-color: green">
	<td>DOJO Chart Placeholder</td>
</tr>
<%
	}else{
		if (component.needsRender()) {
%>
<script>
console.log("begin chart");
if (!window._MaximoTheme) {
	define("dojox/charting/themes/Maximo", ["../SimpleTheme", "./common"], function(SimpleTheme, themes){
		themes.Maximo = new SimpleTheme({
			colors: [
			<%
			String[] colorTable = psdi.webclient.beans.common.ChartUtil.getChartUtil().getResultSetChartColors(component.getWebClientSession());
			int ni=0;
			for (String cs: colorTable) {
				%><%=((ni++)>0?",\n":"\n")%>"#<%=cs%>"<%
			}				
			%>
			]
		});
		return themes.Maximo;
	});
	window._MaximoTheme=true;
}

require([
        "dojo/topic",
         
	    "dojox/charting/Chart",
	 
	    //  We'll use default x/y axes
	    "dojox/charting/axis2d/Default",
	 
	    // tooltips
	    "dojox/charting/action2d/Tooltip",
	    
	    // mouse zoom
	    "dojox/charting/action2d/MouseZoomAndPan",
	    
	    // Load the Legend widget class
	    "dojox/charting/widget/Legend",
	    
	    "dijit/DropDownMenu", 
	    
	    "dijit/form/DropDownButton", 
	    
	    "dijit/MenuItem",
	    
	    "dojo/fx/easing",
	    
	    "dojo/dom",
	    
	    "dijit/form/VerticalSlider",
	    
	    "dijit/form/VerticalRule",
	    
	    "dijit/form/HorizontalSlider",
	    
	    "dijit/form/HorizontalRule",
	    
	    "dojo/ready",
	    
	 	// Wait until the DOM is ready
	    "dojo/domReady!"
         
    ], function(topic, Chart, Default, Tooltip, MouseZoomAndPan, Legend, DropDownMenu, DropDownButton, MenuItem, easing, dom, VerticalSlider, VerticalRule, HorizontalSlider, HorizontalRule) {

	// we only need to create these classes once
	if (!window.SKDChartManager) {
		var ChartManager = dojo.declare(null, {
			charts: {},
			
			// create a new chart, and destry the old one, if it exists
			newChart: function(chartId) {
				var chart = this.charts[chartId];
				if (chart) chart.tearDown();
				chart = new SimpleChart({chartId: chartId});
				this.charts[chartId] = chart;
				return chart;
			},
			
			getChart: function(chartId) {
				return this.charts[chartId];
			}
		});
		
		window.SKDChartManager = new ChartManager();
		
		var SimpleChart = dojo.declare(null, {
			chartId: null,
			legend: null,
			chart: null,
			chartUpdateHandler: null,
			chartTypeUpdateHandler: null,
			data: null,
			label: null,
			legendVisible: true,
			supportedChartTypes: null,
			currentSelectedChartId: null,
			currentSelectedChartType: null,
			animationDuration: 0,
			
			supportedThemes: null,
			currentTheme: null,
			chartThemeHandler: null,
			xslider: null,
			xsliderRules: null,
			yslider: null,
			ysliderRules: null,
			xscale: 0,
			yscale: 0,
			xscaleEnabled: 'auto',
			yscaleEnabled: 'auto',
			
			rotateXLabel: 0,
			rotateYLabel: 0,
			
			isRTL: false,
			
			preferredWidth: null,
			
			resizeHandler: null,
						
			constructor: function(args) {
				dojo.safeMixin(this, args);

				// register listener for change chart
			  	this.chartUpdateHandler = topic.subscribe(this.chartId + "_change_chart", dojo.hitch(this, this.updateChartRequest));
			  	this.chartTypeUpdateHandler = topic.subscribe(this.chartId + "_change_chart_type", dojo.hitch(this, this.updateChartTypeRequest));
			  	this.chartThemeHandler = topic.subscribe(this.chartId + "_change_chart_theme", dojo.hitch(this, this.updateChartThemeRequest));
			},
			
			setLabel: function(lab) {
				this.label=lab;
			},
			
			setLegendVisible: function(vis) {
				this.legendVisible = vis;
			},

			updateChartThemeRequest: function(chartTheme) {
				console.log("Changing Chart Theme: ", chartTheme);
				this.currentTheme = chartTheme.theme;
				this.showChart(this.data);
			},

			updateChartTypeRequest: function(chartType) {
				this.currentSelectedChartType = chartType.type;
				console.log("Changeing Chart Type " + chartType + " for ", this.chartId);
				var fetchEvent = new Event("async_get_chart_data", this.chartId, "", REQUESTTYPE_HIGHASYNC);
				fetchEvent["chartid"] = this.currentSelectedChartId;
				fetchEvent["charttype"] = chartType.type;
				queueManager.queueEvent(fetchEvent, "text/json", "json", dojo.hitch(this, this.showChart), null);
			},
			
			updateChartRequest: function(chartid) {
				this.currentSelectedChartId = chartid;
				console.log("fetching data for " + chartid + " for " + this.chartId);
				var fetchEvent = new Event("async_get_chart_data", this.chartId, "", REQUESTTYPE_HIGHASYNC);
				fetchEvent["chartid"] = chartid;
				fetchEvent["charttype"] = this.currentSelectedChartType;
				queueManager.queueEvent(fetchEvent, "text/json", "json", dojo.hitch(this, this.showChart), null);
			},
			
			update: function() {
				console.log("update() called for " + this.chartId);
				topic.publish(this.chartId + "_change_chart", null);
			},
			
			tearDown: function() {
				console.log("Tearing down old chart for " + this.chartId);
				if (this.chartUpdateHandler) this.chartUpdateHandler.remove();
				if (this.chartTypeUpdateHandler) this.chartTypeUpdateHandler.remove();
				if (this.chartThemeHandler) this.chartThemeHandler.remove();
				if (this.legend) this.legend.destroyRecursive(true);
			},
			
			_updateScales: function() {
				this.chart.setWindow(this.xscale, this.yscale, 0, 0).render();
			},
			
		    scaleXEvent: function(value){
		    	this.xscale=value;
		    	this._updateScales();
		    },

		    scaleYEvent: function(value){
		    	this.yscale=value;
		    	this._updateScales();
		    },
			
		    _addXSliders: function() {
			    if (this.xsliderRules!=null) {
			    	this.xsliderRules.destroyRecursive(true);
			    }

		    	if (this.xslider!=null) {
			    	this.xslider.destroyRecursive(true);
			    }
			    
			    // add horizontal (x) sliders
			    dojo.byId(this.chartId + "_horizontalslider").innerHTML = '';
	            var xrulesNode = dojo.create(
	                    "div", {}, dojo.byId(this.chartId+"_horizontalslider"), "first");
	            this.xsliderRules = new dijit.form.HorizontalRule({
	                    container: 'bottomDecoration',
	                    count: 4,
	                    style: "height: 5px;"
	            }, xrulesNode);
	     
                // Create the horizontal slider programmatically
                this.xslider = new dijit.form.HorizontalSlider({
                    minimum: 1,
                    maximum: 4,
                    pageIncrement: 1,
                    discreteValues:4,
                    value: 1,
                    intermediateChanges: false,
                    style: "width: 200px;"
                }, this.chartId + "_horizontalslider");
	     
                // Start up the widgets
                this.xslider.startup();
                this.xsliderRules.startup();
                
                // listen for change events on the slider to update the scaling
                dojo.connect(dijit.byId(this.chartId+"_horizontalslider"), "onChange", dojo.hitch(this, this.scaleXEvent));
		    },
		    
		    _addYSliders: function() {
			    // clean up sliders before creating new ones
			    if (this.ysliderRules!=null) {
			    	this.ysliderRules.destroyRecursive(true);
			    }
			    
			    if (this.yslider!=null) {
			    	this.yslider.destroyRecursive(true);
			    }
		    	
			    // add vertical (x) sliders
			    dojo.byId(this.chartId + "_verticalslider").innerHTML = '';
	            var yrulesNode = dojo.create(
	                    "div", {}, dojo.byId(this.chartId+"_verticalslider"), "first");
	            var ysliderRules = new dijit.form.VerticalRule({
	                    container: 'leftDecoration',
	                    count: 4,
	                    style: "width: 5px;"
	            }, yrulesNode);
	     
                // Create the vertical slider programmatically
                this.yslider = new dijit.form.VerticalSlider({
                    minimum: 1,
                    maximum: 4,
                    pageIncrement: 1,
                    discreteValues:4,
                    value: 1,
                    intermediateChanges: false,
                    style: "height: 200px;"
                }, this.chartId + "_verticalslider");
	     
                // Start up the widgets
                this.yslider.startup();
                ysliderRules.startup();
                
                // add onchange listener to the slider
                dojo.connect(dijit.byId(this.chartId+"_verticalslider"), "onChange", dojo.hitch(this, this.scaleYEvent));		    	
		    },
		    
		    _isResizable: function() {
		    	return this.preferredWidth!=null && this.preferredWidth.indexOf('%') === this.preferredWidth.length-1;		    	
		    },
		    
		    _updateChartDivSizes: function() {
				var vs = dojo.window.getBox();
				var w = vs.w - 50; // make room for scrollbars, if needed
				
				// calculate the percentage scale factor
				var pct = parseInt(this.preferredWidth.substring(0,this.preferredWidth.length-1));
				var scale = pct/100;
				w=w*scale;
				
				var navBar = document.getElementById("SystemNavAppContent-sc");
				if (navBar) {
				    var obj = dojo.position(navBar);
				    if (obj) {
				        // remove the side nav width
				        w = w - obj.x;   
				    }
				}

				console.log("Resizing to " + w);
				
				dojo.style(this.chartId + "_header", 'width', w + "px");
				dojo.style(this.chartId + "_chart", 'width', w + "px");
				dojo.style(this.chartId + "_footer", 'width', w + "px");
		    },
		
<%--
// uncomment for testing, when you want to play around with rendering
		    __showSampleChart: function(data) {
		    	console.log('Show Sample Chart');
		    	
			    require([
			             "dojox/charting/plot2d/"+data.type.type,
			     	    
			             // Require the theme of our choosing
			             "dojox/charting/themes/Claro"
			             
			             ], dojo.hitch(this, function(Plot, theme) {
			            	    
							    var chartDiv = dojo.byId(this.chartId + "_chart");
							    chartDiv.innerHTML = '';
							    this.chart = new Chart(this.chartId + "_chart", data.options);
								var chart=this.chart;
								
							    // Set the theme
							    this.chart.setTheme(theme);

							    // Add the only/default plot
								this.chart.addPlot("default", data.type);
			            	 
							    dojo.forEach(data.seriesArray, function(entry, i) {
							    	chart.addSeries(entry.name, entry.data);
							    });
								
							    // Add axis
							    data.axis['x'].rotation = this.rotateXLabel;
							    data.axis['y'].rotation = this.rotateYLabel;
							    data.axis['y'].leftBottom = (this.isRTL?false:true);
							    
							    if (data.axis['y'].labels && data.axis['y'].labels.length==0) {
							    	data.axis['y'].labels = null;
							    }
							    this.chart.addAxis("x", data.axis['x']);
							    this.chart.addAxis("y", data.axis['y']);
							    
								// tooltips
							    // new Tooltip(chart, "default");

							    // Render the chart!
							    chart.render();
			             }
					));

		    },
--%>
			showChart: function(data) {
				this.data=data;
				this.xscale=0;
				this.yscale=0;
				
				console.log("showChart(): Called");
				
				if (data==null) {
					console.log("ERROR: No Response");
					return;
				}
				
			    // check that the first series has items, if not, then abort the chart renderering
			    if (data.seriesArray.length==0 || data.seriesArray[0].data.length==0) {
			    	console.log("WARN: Chart is missing Data for the Series[0].  Chart will not be rendered.", data);
			    	return;
			    }
			    
				// if width set to %, then update divs
				if (this._isResizable()) {
					this._updateChartDivSizes();
					if (this.resizeHandler==null) {
						this.resizeHandler = dojo.connect ( window, 'resize', dojo.hitch(this, function(e){
						    if (this.updateTimer!=null) window.clearTimeout(this.updateTimer);
						    this.updateTimer = setTimeout(dojo.hitch(this, function() {
							    this._updateChartDivSizes();
							    if (dojo.isIE) {
							    	// ie really doesn't like chart.resize(), so, we'll redraw the whole chart.
							    	this.showChart(this.data);
							    } else {
						    		this.chart.resize();
							    }
						    	this.updateTimer==null;
						    }), 250);
						}));
					}
				}

				
			    require([
			             "dojox/charting/plot2d/"+data.type.type,
			     	    
			             // Require the theme of our choosing
			             "dojox/charting/themes/" + this.currentTheme
			             
			             ], dojo.hitch(this, function(Plot, theme) {
				    // When the DOM is ready and resources are loaded...
				 	console.log("showChartReady() for " + this.chartId);
				    
				    // Create the chart within it's "holding" node
				    var chartDiv = dojo.byId(this.chartId + "_chart");
				    chartDiv.innerHTML = '';
				    this.chart = new Chart(this.chartId + "_chart", data.options);

				    // Set the theme
				    console.log('Theme', theme);
				    this.chart.setTheme(theme);

				    // configure animation
				    if (this.animationDuration>0 && !data.type.animate) {
					    var animate = { duration: this.animationDuration, easing: easing.linear };
					    data.type.animate = animate;
				    }
				    
				    // Add the only/default plot
					this.chart.addPlot("default", data.type);
				    
				    
				    console.log("Adding Serieses");
				    var chart=this.chart;
				    var maxX = 0;
				    var maxY = 0;
				    dojo.forEach(data.seriesArray, function(entry, i) {
				    	// only add single series for pie
				    	if (data.type.type == 'Pie' && i > 0) return;
				    	console.log("Adding Series: ", entry);
				    	if (entry.data==null || entry.data.length==0) return;
				    	
				    	chart.addSeries(entry.name, entry.data);
				    	dojo.forEach(entry.data, function(serEntry, j) {
				    		maxX = Math.max(serEntry.x, maxX);
				    		maxY = Math.max(serEntry.y, maxY);
				    	});
				    });
					
			    	console.log("Adding X and Y Axis for " + data.type.type);
				    // Add axis
				    // don't add empty labels, will cause some distortion in IE
				    if (data.axis['y'].labels && data.axis['y'].labels.length==0) {
				    	data.axis['y'].labels = null;
				    }
				    if (data.axis['x'].labels && data.axis['x'].labels.length==0) {
				    	data.axis['x'].labels = null;
				    }

				    data.axis['x'].rotation = this.rotateXLabel;
				    data.axis['y'].rotation = this.rotateYLabel;
				    data.axis['y'].leftBottom = (this.isRTL?false:true);
				    this.chart.addAxis("x", data.axis['x']);
				    this.chart.addAxis("y", data.axis['y']);
				    
					// tooltips
				    new Tooltip(chart, "default");

				    // Render the chart!
				    try {
				    	console.log('Rendering Chart');
				    	chart.render();
				    } catch (ex) {
				    	console.error("Render Failed", ex);
				    }
				    
				    // legend needs to be rendered AFTER the chart
				    try {
				    	console.log("Adding Legend");
					    if (this.legend != undefined) {
					    	this.legend.destroyRecursive(true);
					    }
					    if (this.legendVisible) {
					    	data.legend.chart = this.chart;
					    	this.legend = new Legend(data.legend, this.chartId + "_legend");
					    }
				    } catch (ex) {
						console.error("Legend Failed", ex);				    	
				    }
				    
					if (data.type.type != 'Pie') {
						console.log("Adding Mouse and Zoom for: " + data.type.type);
						if (this.yscaleEnabled == 'yes' || (this.yscaleEnabled == 'auto' && maxY > 1000)) {
						    // zoom Horizontal Axis
							new MouseZoomAndPan(chart, "default", { 
								axis: "y",
								scaleFactor: 2,
								maxScale: 4,
								enableScroll: true,
								enableDoubleClickZoom: true,
								enableKeyZoom: true,
								keyZoomModifier: 'ctrl'
							});
						    
						    // hide sliders for now
						    // this._addYSliders();
						}
					    
					    
					    if (this.xscaleEnabled == 'yes' || (this.xscaleEnabled == 'auto' && maxX > 8)) {
						    // zoom Vertical Axis
							new MouseZoomAndPan(chart, "default", { 
								axis: "x",
								scaleFactor: 2,
								maxScale: 4,
								enableScroll: true,
								enableDoubleClickZoom: true,
								enableKeyZoom: true,
								keyZoomModifier: 'ctrl'
							});
						    
						    // hide sliders for now
						    // this._addXSliders();
					    }
					}
					
					// eventually this can be used to connect an onclick listener to the chart objects
					//this.chart.connectToPlot("default", function(evt) {
					//	console.log('Chart Click', evt);
					//});

			    }));
			},
			
			buildAndShowTypeSelector: function() {
				if (this.supportedChartTypes!=null && this.supportedChartTypes.length>1) {
					var menu = new DropDownMenu({ style: "display: none;"});
					var size = this.supportedChartTypes.length;
					var CHARTID = this.chartId;
					for (var i=0;i<size;i++) {
						var ctype = this.supportedChartTypes[i];
				        var menuItem = new MenuItem({
				            label: ctype._label,
				            _ctype: ctype,
				            onClick: function(){
				            	console.log("publishing change chart type: " + CHARTID + "_change_chart_type");
			            		topic.publish(CHARTID + "_change_chart_type", this._ctype);
				            }
				        });
				        menu.addChild(menuItem);					
					}
			        var button = new DropDownButton({
			            label: this.selectChartTypeLabel,
			            dropDown: menu
			        });
			        dom.byId(this.chartId + "_chart_type_selector").appendChild(button.domNode);					
				}
			},

			buildAndShowThemeSelector: function() {
				if (this.supportedThemes!=null && this.supportedThemes.length>1) {
					var menu = new DropDownMenu({ style: "display: none;"});
					var size = this.supportedThemes.length;
					var CHARTID = this.chartId;
					for (var i=0;i<size;i++) {
						var theme = this.supportedThemes[i];
				        var menuItem = new MenuItem({
				            label: theme.label,
				            _theme: theme,
				            onClick: function(){
				            	console.log("publishing change chart theme: " + CHARTID + "_change_chart_theme");
			            		topic.publish(CHARTID + "_change_chart_theme", this._theme);
				            }
				        });
				        menu.addChild(menuItem);					
					}
			        var button = new DropDownButton({
			            label: "Chart Theme...",
			            dropDown: menu
			        });
			        dom.byId(this.chartId + "_chart_theme_selector").appendChild(button.domNode);					
				}
			}

		});
	}

	// show the chart
	(function() {
		// create and configure the chart
		var chart = window.SKDChartManager.newChart("${currentcomponent.id}");
		chart.setLegendVisible(<%=legendVisible%>);
		chart.supportedChartTypes = <%=(supportedChartTypes == null ? null : supportedChartTypes.serialize())%>;
		chart.xscaleEnabled = '<%=xscaleEnabled%>';
		chart.yscaleEnabled = '<%=yscaleEnabled%>';
		chart.animationDuration = <%=animateDuration%>;
		chart.supportedThemes = <%=(supportedThemes == null ? null : supportedThemes.serialize())%>;
		chart.currentTheme = '<%=chart.getProperty("theme")%>';
		chart.rotateXLabel = <%=chart.getProperty("rotatexlabel")%>;
		chart.rotateYLabel = <%=chart.getProperty("rotateylabel")%>;
		chart.isRTL = <%=isRTL%>;
		chart.preferredWidth = '<%=width%>';
		chart.selectChartTypeLabel = "<%=WebClientRuntime.makesafejavascriptstringparameter(chart.getProperty("supportedcharttypeslabel"))%>";
		// load the chart
		chart.update();

		<%
		// build the chart selector, if required
		// if there are multiple charts being manages, then show the chart id selector
		java.util.Map<String,String> charts = chart.getChartIds();
		if (charts!=null && charts.size()>0) {
		%>
	        var menu = new DropDownMenu({ style: "display: none;"});
	    	<%
	    	for (Map.Entry<String,String> me: charts.entrySet()) {
	    	%>
	    	
	        var menuItem1 = new MenuItem({
	            label: "<%=WebClientRuntime.makesafejavascriptstringparameter(me.getValue())%>",
	            onClick: function(){ 
            		topic.publish("${currentcomponent.id}_change_chart", "<%=WebClientRuntime.makesafejavascriptstringparameter(me.getKey())%>");
	            }
	        });
	        menu.addChild(menuItem1);
			<%}%>
			
	        var button = new DropDownButton({
	            label: "<%=WebClientRuntime.makesafejavascriptstringparameter(chart.getProperty("selectchartlabel"))%>",
	            dropDown: menu
	        });
	        dom.byId("${currentcomponent.id}_chart_selector").appendChild(button.domNode);
		<%}%>
		
		// build the chart type selector, if required
		<%
		

		
			if (supportedChartTypes!=null && supportedChartTypes.size()>1) {
		%>
			chart.buildAndShowTypeSelector();
		<%
			}
		%>
		// build the chart theme selector, if required
		<%
			if (supportedThemes!=null && supportedThemes.size()>1) {
		%>
			chart.buildAndShowThemeSelector();
		<%
			}
		%>
	})();
});
</script>

<table id="${currentcomponent.id}_header" width="<%=width%>" dir="<%=dir%>">
<tr>
	<td align="<%=left%>" valign="top">
		<table>
			<tr>
				<td>
					<div id="${currentcomponent.id}_chart_theme_selector" dir="<%=dir%>"></div>
				</td>
				<td>
					<div id="${currentcomponent.id}_chart_type_selector" dir="<%=dir%>"></div>
				</td>
				<td nowrap="nowrap">
					<div id="${currentcomponent.id}_chart_selector" dir="<%=dir%>"></div>
				</td>
			</tr>
		</table>
	</td>
</tr>
</table>

<%-- RTL support falls apart (at least on chrome) when the chart is inside a table --%>
<%-- 
	IT is by design that that Chart specifies LTR even in RTL environments.
	Dojo Charting (in 1.7.x) does not support RTL and has rendering issue.  As such, the RTL
	behaviour that we emulate is simply to put the Y axis on the right
--%>
<div dir="ltr" id="${currentcomponent.id}_chart" style="width: <%=width%>; height: <%=height%>; direction: 'ltr'"></div>
<%--<div id="${currentcomponent.id}_horizontalslider"></div>--%>
<table id="${currentcomponent.id}_footer" width="<%=width%>" dir="<%=dir%>" >
<tr>
	<td align="<%=left%>" valign="top">
		<div id="${currentcomponent.id}_legend" dir="<%=dir%>"></div>
	</td>
</tr>
</table>

<%
		} else {
%><component id="${currentcomponent.id}_holder"><%="<![CDATA["%>
	<%if (chart.hasChanged()) {
		chart.setChangedFlag(false);
	%>
	<script type="text/javascript">
		var chart = window.SKDChartManager.getChart("${currentcomponent.id}");
		if (chart) {
			// force a reload of the chart data
			chart.update();
		}
	</script>
	<%} %>
	
<%="]]>"%></component>
<%
		}
	}
%>

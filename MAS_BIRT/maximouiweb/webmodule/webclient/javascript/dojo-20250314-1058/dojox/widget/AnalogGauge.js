// wrapped by build app
define("dojox/widget/AnalogGauge", ["dijit","dojo","dojox","dojo/require!dojox/widget/gauge/_Gauge,dojox/gauges/AnalogGauge"], function(dijit,dojo,dojox){
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

// backward compatibility for dojox.widget.AnalogGauge
dojo.provide("dojox.widget.AnalogGauge");
dojo.require("dojox.widget.gauge._Gauge");

dojo.require("dojox.gauges.AnalogGauge");
dojox.widget.AnalogGauge = dojox.gauges.AnalogGauge;
dojox.widget.gauge.AnalogLineIndicator = dojox.gauges.AnalogLineIndicator;

});

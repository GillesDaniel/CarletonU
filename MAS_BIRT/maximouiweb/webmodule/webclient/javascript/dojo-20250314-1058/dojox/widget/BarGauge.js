// wrapped by build app
define("dojox/widget/BarGauge", ["dijit","dojo","dojox","dojo/require!dojox/widget/gauge/_Gauge,dojox/gauges/BarGauge"], function(dijit,dojo,dojox){
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

// backward compatibility for dojox.widget.BarGauge
dojo.provide("dojox.widget.BarGauge");
dojo.require("dojox.widget.gauge._Gauge");
dojo.require("dojox.gauges.BarGauge");
dojox.widget.BarGauge = dojox.gauges.BarGauge;
dojox.widget.gauge.BarLineIndicator = dojox.gauges.BarLineIndicator;

});

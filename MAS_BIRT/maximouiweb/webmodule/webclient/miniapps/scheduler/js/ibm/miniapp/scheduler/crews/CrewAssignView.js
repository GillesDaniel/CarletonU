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
    "dojo/_base/declare",
    "com/ibm/tivoli/maximo/miniapps/_MaximoIO",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
    "dojo/_base/lang",
    "dojo/json",
    "ibm/miniapp/scheduler/crews/CrewWorkView",
    "ibm/miniapp/scheduler/crews/CrewAssignViewActions"

], function (declare, _MaximoIO, log, lang, json, CrewWorkView,CrewAssignViewActions) {
    return declare([CrewWorkView,CrewAssignViewActions], {
        constructor: function (options) {
            this.ViewName = 'CrewAssign';
        },
        _getTemplate: function() {
            return '{_NAMEWITHCREW}';
        },
    });

});

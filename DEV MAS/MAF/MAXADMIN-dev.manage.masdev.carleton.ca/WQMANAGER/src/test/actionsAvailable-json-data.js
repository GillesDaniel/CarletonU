/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

let actionsAvailable = {
  "member": [
    {
      "usewith": "ESCALATION",
      "_rowstamp": "115",
      "type_maxvalue": "GROUP",
      "usewith_maxvalue": "ESCALATION",
      "objectname": "WORKORDER",
      "action": "1025",
      "actionid": 129,
      "href": "oslc/os/mxapiaction/_MTAyNQ--",
      "type": "GROUP",
      "type_description": "Action Group",
      "usewith_description": "Escalation",
      "_bulkid": "115",
      "_selected": true
    },
    {
      "dispvalue": "com.ibm.tivoli.maximo.mfmail.MfMailSTSendAction",
      "type_maxvalue": "CUSTOM",
      "objectname": "WORKORDER",
      "description": "Maximo for E-mail, send e-mail for WorkOrder",
      "type": "CUSTOM",
      "usewith": "ALL",
      "_rowstamp": "660805",
      "usewith_maxvalue": "ALL",
      "action": "MFMAILSENDWOM",
      "actionid": 161,
      "href": "oslc/os/mxapiaction/_TUZNQUlMU0VORFdPTQ--",
      "value": "com.ibm.tivoli.maximo.mfmail.MfMailSTSendAction",
      "type_description": "Custom Class",
      "usewith_description": "All Apps",
      "_bulkid": "660805",
      "_selected": true
    },
    {
      "usewith": "ESCALATION",
      "_rowstamp": "660804",
      "type_maxvalue": "GROUP",
      "usewith_maxvalue": "ESCALATION",
      "objectname": "WORKORDER",
      "action": "MFMAILSENDWOMAG",
      "actionid": 160,
      "href": "oslc/os/mxapiaction/_TUZNQUlMU0VORFdPTUFH",
      "type": "GROUP",
      "type_description": "Action Group",
      "usewith_description": "Escalation",
      "_bulkid": "660804",
      "_selected": true
    },
    {
      "dispvalue": "APPR",
      "type_maxvalue": "CHANGESTATUS",
      "value2": "APPR",
      "objectname": "WORKORDER",
      "description": "Work order approval action",
      "type": "CHANGESTATUS",
      "usewith": "ALL",
      "_rowstamp": "148",
      "usewith_maxvalue": "ALL",
      "action": "WO APPR",
      "actionid": 1,
      "href": "oslc/os/mxapiaction/_V08gQVBQUg--",
      "type_description": "Change Status",
      "usewith_description": "All Apps",
      "_bulkid": "148"
    },
    {
      "dispvalue": "CAN",
      "type_maxvalue": "CHANGESTATUS",
      "value2": "CAN",
      "objectname": "WORKORDER",
      "description": "Work order cancel action",
      "type": "CHANGESTATUS",
      "usewith": "ALL",
      "_rowstamp": "157",
      "usewith_maxvalue": "ALL",
      "action": "WO CANCEL",
      "actionid": 10,
      "href": "oslc/os/mxapiaction/_V08gQ0FOQ0VM",
      "type_description": "Change Status",
      "usewith_description": "All Apps",
      "_bulkid": "157",
      "_selected": true
    },
    {
      "dispvalue": "CLOSE",
      "type_maxvalue": "CHANGESTATUS",
      "value2": "CLOSE",
      "objectname": "WORKORDER",
      "description": "Work order close action",
      "type": "CHANGESTATUS",
      "usewith": "ALL",
      "_rowstamp": "150",
      "usewith_maxvalue": "ALL",
      "action": "WO CLOSE",
      "actionid": 3,
      "href": "oslc/os/mxapiaction/_V08gQ0xPU0U-",
      "type_description": "Change Status",
      "usewith_description": "All Apps",
      "_bulkid": "150",
      "_selected": true
    },
    {
      "dispvalue": "COMP",
      "type_maxvalue": "CHANGESTATUS",
      "value2": "COMP",
      "objectname": "WORKORDER",
      "description": "Work order complete action",
      "type": "CHANGESTATUS",
      "usewith": "ALL",
      "_rowstamp": "158",
      "usewith_maxvalue": "ALL",
      "action": "WO COMP",
      "actionid": 11,
      "href": "oslc/os/mxapiaction/_V08gQ09NUA--",
      "type_description": "Change Status",
      "usewith_description": "All Apps",
      "_bulkid": "158",
      "_selected": true
    },
    {
      "dispvalue": "INPRG",
      "type_maxvalue": "CHANGESTATUS",
      "value2": "INPRG",
      "objectname": "WORKORDER",
      "description": "Work order in progress action",
      "type": "CHANGESTATUS",
      "usewith": "ALL",
      "_rowstamp": "156",
      "usewith_maxvalue": "ALL",
      "action": "WO INPRG",
      "actionid": 9,
      "href": "oslc/os/mxapiaction/_V08gSU5QUkc-",
      "type_description": "Change Status",
      "usewith_description": "All Apps",
      "_bulkid": "156",
      "_selected": true
    },
    {
      "dispvalue": "WAPPR",
      "type_maxvalue": "CHANGESTATUS",
      "value2": "WAPPR",
      "objectname": "WORKORDER",
      "description": "Work order waiting for approval action",
      "type": "CHANGESTATUS",
      "usewith": "ALL",
      "_rowstamp": "77",
      "usewith_maxvalue": "ALL",
      "action": "WO WAPPR",
      "actionid": 62,
      "href": "oslc/os/mxapiaction/_V08gV0FQUFI-",
      "type_description": "Change Status",
      "usewith_description": "All Apps",
      "_bulkid": "77"
    }
  ]
  };
  
 export default actionsAvailable;

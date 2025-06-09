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

let actionsSelected = {
  "member": [
  {
    "_id": "AA46204",
    "_bulkid": "AA46204",
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
    "_selected": true
  },
  {
    "_id": "AA95408",
    "_bulkid": "AA95408",
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
    "type_description": "Change Status",
    "usewith_description": "All Apps",
    "href": "oslc/os/mxapiaction/_V08gQ0xPU0U-"
  },
  {
    "_id": "AA95651",
    "_bulkid": "AA95651",
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
    "type_description": "Change Status",
    "usewith_description": "All Apps",
    "href": "oslc/os/mxapiaction/_V08gSU5QUkc-"
  },
  {
    "_id": "AA60425",
    "_bulkid": "AA60425",
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
    "type_description": "Change Status",
    "usewith_description": "All Apps",
    "href": "oslc/os/mxapiaction/_V08gQ0FOQ0VM"
  },
  {
    "_id": "AA1144",
    "_bulkid": "AA1144",
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
    "type_description": "Change Status",
    "usewith_description": "All Apps",
    "href": "oslc/os/mxapiaction/_V08gQ09NUA--"
  },
  {
    "_id": "AA31322",
    "_bulkid": "AA31322",
    "usewith": "ESCALATION",
    "_rowstamp": "660804",
    "type_maxvalue": "GROUP",
    "usewith_maxvalue": "ESCALATION",
    "objectname": "WORKORDER",
    "action": "MFMAILSENDWOMAG",
    "actionid": 160,
    "type": "GROUP",
    "type_description": "Action Group",
    "usewith_description": "Escalation",
    "href": "oslc/os/mxapiaction/_TUZNQUlMU0VORFdPTUFH"
  },
  {
    "_id": "AA35536",
    "_bulkid": "AA35536",
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
    "value": "com.ibm.tivoli.maximo.mfmail.MfMailSTSendAction",
    "type_description": "Custom Class",
    "usewith_description": "All Apps",
    "href": "oslc/os/mxapiaction/_TUZNQUlMU0VORFdPTQ--"
  }
]};
 export default actionsSelected;

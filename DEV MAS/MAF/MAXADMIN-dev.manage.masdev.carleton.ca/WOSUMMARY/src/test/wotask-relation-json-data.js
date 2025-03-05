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

let wotaskralation ={
  "member": [
    {
      "parent": "7100",
      "status_description": "Waiting on approval",
      "description": "Hoists and cranes",
      "woclass_description": "Work Order",
      "orgid": "EAGLENA",
      "wonum": "7130",
      "reltype_description": "Finish to Start",
      "reltype_maxvalue": "FS",
      "status_maxvalue": "WAPPR",
      "_rowstamp": "3026336",
      "predrefwonum": "7130",
      "workorderid": 260,
      "woclass": "WORKORDER",
      "woclass_maxvalue": "WORKORDER",
      "siteid": "BEDFORD",
      "location": "NEEDHAM",
      "href": "oslc/os/mxwotaskrelation/_RUFHTEVOQS83MTMwL0JFREZPUkQvMTI4Ng--",
      "reltype": "FS",
      "predwonum": "7130",
      "predtaskid": 30,
      "status": "WAPPR"
    },
    {
      "parent": "7100",
      "status_description": "Waiting on approval",
      "woclass_description": "Activity",
      "orgid": "EAGLENA",
      "wonum": "T1948",
      "reltype_description": "Finish to Start",
      "reltype_maxvalue": "FS",
      "status_maxvalue": "WAPPR",
      "_rowstamp": "3026337",
      "predrefwonum": "T1948",
      "workorderid": 135033,
      "woclass": "ACTIVITY",
      "woclass_maxvalue": "ACTIVITY",
      "siteid": "BEDFORD",
      "location": "NEEDHAM",
      "href": "oslc/os/mxwotaskrelation/_RUFHTEVOQS9UMTk0OC9CRURGT1JELzEyODY-",
      "reltype": "FS",
      "predwonum": "T1948",
      "predtaskid": 2230,
      "status": "WAPPR"
    },
    {
      "parent": "7100",
      "status_description": "Waiting on approval",
      "woclass_description": "Activity",
      "orgid": "EAGLENA",
      "wonum": "T1322",
      "reltype_description": "Finish to Start",
      "reltype_maxvalue": "FS",
      "status_maxvalue": "WAPPR",
      "_rowstamp": "3026338",
      "predrefwonum": "T1322",
      "workorderid": 134097,
      "woclass": "ACTIVITY",
      "woclass_maxvalue": "ACTIVITY",
      "siteid": "BEDFORD",
      "location": "NEEDHAM",
      "href": "oslc/os/mxwotaskrelation/_RUFHTEVOQS9UMTMyMi9CRURGT1JELzEyODY-",
      "reltype": "FS",
      "predwonum": "T1322",
      "predtaskid": 900,
      "status": "WAPPR"
    },
    {
      "parent": "7100",
      "status_description": "Waiting on approval",
      "woclass_description": "Activity",
      "orgid": "EAGLENA",
      "wonum": "1430",
      "reltype_description": "Finish to Start",
      "reltype_maxvalue": "FS",
      "status_maxvalue": "WAPPR",
      "_rowstamp": "3026339",
      "predrefwonum": "1430",
      "workorderid": 133923,
      "woclass": "ACTIVITY",
      "woclass_maxvalue": "ACTIVITY",
      "siteid": "BEDFORD",
      "href": "oslc/os/mxwotaskrelation/_RUFHTEVOQS8xNDMwL0JFREZPUkQvMTI4Ng--",
      "reltype": "FS",
      "predwonum": "1430",
      "predtaskid": 730,
      "status": "WAPPR"
    },
    {
      "parent": "7100",
      "status_description": "Waiting on approval",
      "woclass_description": "Activity",
      "orgid": "EAGLENA",
      "wonum": "1431",
      "reltype_description": "Finish to Start",
      "reltype_maxvalue": "FS",
      "status_maxvalue": "WAPPR",
      "_rowstamp": "3026340",
      "predrefwonum": "1431",
      "workorderid": 133925,
      "woclass": "ACTIVITY",
      "woclass_maxvalue": "ACTIVITY",
      "siteid": "BEDFORD",
      "href": "oslc/os/mxwotaskrelation/_RUFHTEVOQS8xNDMxL0JFREZPUkQvMTI4Ng--",
      "reltype": "FS",
      "predwonum": "1431",
      "predtaskid": 740,
      "status": "WAPPR"
    },
    {
      "parent": "1005",
      "status_description": "Approved",
      "description": "Lubricate chain and check sprockets.",
      "woclass_description": "Activity",
      "orgid": "EAGLENA",
      "wonum": "1005-70",
      "reltype_description": "Finish to Start",
      "reltype_maxvalue": "FS",
      "status_maxvalue": "APPR",
      "_rowstamp": "3026341",
      "predrefwonum": "1005-70",
      "workorderid": 112,
      "woclass": "ACTIVITY",
      "woclass_maxvalue": "ACTIVITY",
      "siteid": "BEDFORD",
      "location": "SHIPPING",
      "href": "oslc/os/mxwotaskrelation/_RUFHTEVOQS8xMDA1LTcwL0JFREZPUkQvMTI4Ng--",
      "reltype": "FS",
      "predwonum": "1005-70",
      "predtaskid": 70,
      "status": "APPR"
    }
  ],
  "href": "oslc/os/mxwotaskrelation",
  "responseInfo": {
    "schema": {
      "resource": "MXWOTASKRELATION",
      "description": "Work Order Predecessor",
      "pk": [
        "wotaskrelationid"
      ],
      "title": "WOTASKRELATION",
      "type": "object",
      "$ref": "oslc/jsonschemas/mxwotaskrelation",
      "properties": {
        "parent": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Parent WO",
          "persistent": true,
          "type": "string",
          "remarks": "Parent of the work order shown in the Work Order field. When this field is blank, the work order in the Work Order field is a top-level work order. To assign a work order to a parent, select Assign to New Parent from the Select Action menu.",
          "maxLength": 25
        },
        "status_description": {
          "type": "string"
        },
        "localref": {
          "type": "string"
        },
        "description": {
          "searchType": "TEXT",
          "subType": "ALN",
          "title": "Description",
          "persistent": true,
          "type": "string",
          "remarks": "Describes the work order. To enter or view additional information, click the Long Description button.",
          "maxLength": 100
        },
        "woclass_description": {
          "type": "string"
        },
        "orgid": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Organization",
          "persistent": true,
          "type": "string",
          "remarks": "Organization Identifier",
          "maxLength": 8
        },
        "wonum": {
          "default": "&AUTOKEY&",
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Work Order",
          "persistent": true,
          "type": "string",
          "remarks": "Identifies the work order.",
          "maxLength": 25
        },
        "reltype_description": {
          "type": "string"
        },
        "reltype_maxvalue": {
          "type": "string"
        },
        "status_maxvalue": {
          "type": "string"
        },
        "_rowstamp": {
          "type": "string"
        },
        "predrefwonum": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Predecessor WONUM",
          "persistent": true,
          "type": "string",
          "remarks": "Identifies the wonum of the predecessor work order task",
          "maxLength": 25
        },
        "workorderid": {
          "searchType": "EXACT",
          "subType": "BIGINT",
          "title": "WORKORDERID",
          "persistent": true,
          "type": "integer",
          "remarks": "Unique Identifier",
          "maxLength": 19
        },
        "woclass": {
          "searchType": "EXACT",
          "subType": "UPPER",
          "title": "Class",
          "persistent": true,
          "type": "string",
          "remarks": "Identifies the work order's class.",
          "maxLength": 16,
          "hasList": true
        },
        "_imagelibref": {
          "type": "string"
        },
        "woclass_maxvalue": {
          "type": "string"
        },
        "siteid": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Site",
          "persistent": true,
          "type": "string",
          "remarks": "Site Identifier",
          "maxLength": 8
        },
        "location": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Location",
          "persistent": true,
          "type": "string",
          "remarks": "Identifies the work order's location. This is not necessarily the asset's location, however, if an asset is entered, its location will default here",
          "maxLength": 12
        },
        "href": {
          "type": "string"
        },
        "_id": {
          "type": "string"
        },
        "reltype": {
          "default": "!FS!",
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Relationship",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The dependency between work records which determines scheduling order.  This includes Finish to Start, Finish to Finish, Start to Start, and Start to Finish.",
          "maxLength": 8
        },
        "predwonum": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Predecessor Work Order",
          "persistent": true,
          "type": "string",
          "remarks": "Identifies the predecessor work order",
          "maxLength": 25
        },
        "predtaskid": {
          "searchType": "EXACT",
          "subType": "INTEGER",
          "title": "Predecessor Task",
          "persistent": true,
          "type": "integer",
          "remarks": "Identifies the predecessor task.",
          "maxLength": 12
        },
        "status": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Status",
          "persistent": true,
          "type": "string",
          "remarks": "Status of the work order, for example, in progress, waiting on material, waiting for approval, completed, or closed.",
          "maxLength": 16,
          "hasList": true
        }
      },
      "required": [
        "orgid",
        "predrefwonum",
        "predwonum",
        "siteid"
      ]
    },
    "totalPages": 1,
    "href": "oslc/os/mxwotaskrelation?oslc.select=orgid%2Csiteid%2Cpredwonum%2Cpredrefwonum%2Creltype%2Cpredtaskid%2Cpredecessor.wonum--wonum%2Cpredecessor.parent--parent%2Cpredecessor.woclass--woclass%2Cpredecessor.description--description%2Cpredecessor.location--location%2Cpredecessor.workorderid--workorderid%2Cpredecessor.status--status&oslc.pageSize=100&oslc.where=wonum%3D%221286%22&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1&checkesig=1",
    "totalCount": 6,
    "pagenum": 1
  }
}
 export default wotaskralation;

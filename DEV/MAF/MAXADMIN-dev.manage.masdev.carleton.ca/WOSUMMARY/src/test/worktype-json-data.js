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

let worktype = {
  "member": [
  {
  "_rowstamp": "480177",
  "wtypedesc": "Calibration",
  "woclass": "WORKORDER",
  "woclass_maxvalue": "WORKORDER",
  "worktypeid": 19,
  "worktype": "CAL",
  "href": "oslc/os/mxapiworktype/_MTk-",
  "woclass_description": "Work Order",
  "orgid": "EAGLENA"
  },
  {
  "_rowstamp": "480162",
  "wtypedesc": "Corrective Maintenance",
  "woclass": "WORKORDER",
  "woclass_maxvalue": "WORKORDER",
  "worktypeid": 1,
  "worktype": "CM",
  "href": "oslc/os/mxapiworktype/_MQ--",
  "woclass_description": "Work Order",
  "orgid": "EAGLENA"
  },
  {
  "_rowstamp": "480180",
  "wtypedesc": "Calibration",
  "woclass": "WORKORDER",
  "woclass_maxvalue": "WORKORDER",
  "worktypeid": 31,
  "worktype": "CMCAL",
  "href": "oslc/os/mxapiworktype/_MzE-",
  "woclass_description": "Work Order",
  "orgid": "EAGLENA"
  },
  {
  "_rowstamp": "480166",
  "wtypedesc": "Capital Project",
  "woclass": "WORKORDER",
  "woclass_maxvalue": "WORKORDER",
  "worktypeid": 5,
  "worktype": "CP",
  "href": "oslc/os/mxapiworktype/_NQ--",
  "woclass_description": "Work Order",
  "orgid": "EAGLENA"
  },
  {
  "_rowstamp": "480163",
  "wtypedesc": "Emergency Maintenance",
  "woclass": "WORKORDER",
  "woclass_maxvalue": "WORKORDER",
  "worktypeid": 2,
  "worktype": "EM",
  "href": "oslc/os/mxapiworktype/_Mg--",
  "woclass_description": "Work Order",
  "orgid": "EAGLENA"
  },
  {
  "_rowstamp": "480179",
  "wtypedesc": "Calibration",
  "woclass": "WORKORDER",
  "woclass_maxvalue": "WORKORDER",
  "worktypeid": 27,
  "worktype": "EMCAL",
  "href": "oslc/os/mxapiworktype/_Mjc-",
  "woclass_description": "Work Order",
  "orgid": "EAGLENA"
  },
  {
  "_rowstamp": "480164",
  "wtypedesc": "Event Report",
  "woclass": "WORKORDER",
  "woclass_maxvalue": "WORKORDER",
  "worktypeid": 3,
  "worktype": "EV",
  "href": "oslc/os/mxapiworktype/_Mw--",
  "woclass_description": "Work Order",
  "orgid": "EAGLENA"
  },
  {
  "_rowstamp": "480165",
  "wtypedesc": "Preventive Maintenance",
  "woclass": "WORKORDER",
  "woclass_maxvalue": "WORKORDER",
  "worktypeid": 4,
  "worktype": "PM",
  "href": "oslc/os/mxapiworktype/_NA--",
  "woclass_description": "Work Order",
  "orgid": "EAGLENA"
  },
  {
  "_rowstamp": "480178",
  "wtypedesc": "Calibration",
  "woclass": "WORKORDER",
  "woclass_maxvalue": "WORKORDER",
  "worktypeid": 23,
  "worktype": "PMCAL",
  "href": "oslc/os/mxapiworktype/_MjM-",
  "woclass_description": "Work Order",
  "orgid": "EAGLENA"
  }
  ],
  "href": "oslc/os/mxapiworktype",
  "responseInfo": {
  "schema": {
  "resource": "MXAPIWORKTYPE",
  "description": "Work Type",
  "pk": [
  "worktypeid"
  ],
  "title": "WORKTYPE",
  "type": "object",
  "$ref": "oslc/jsonschemas/mxapiworktype",
  "properties": {
  "_rowstamp": {
  "type": "string"
  },
  "localref": {
  "type": "string"
  },
  "wtypedesc": {
  "searchType": "WILDCARD",
  "subType": "ALN",
  "title": "Description",
  "persistent": true,
  "type": "string",
  "remarks": "Describes the work order's type. To enter or view additional information, click the Long Description button.",
  "maxLength": 50
  },
  "woclass": {
  "searchType": "WILDCARD",
  "subType": "UPPER",
  "title": "Work Order Class",
  "persistent": true,
  "type": "string",
  "hasList": true,
  "remarks": "Class of the work order whose type you are defining, for example, activity, change, release, or work order.",
  "maxLength": 16
  },
  "_imagelibref": {
  "type": "string"
  },
  "woclass_maxvalue": {
  "type": "string"
  },
  "worktypeid": {
  "searchType": "EXACT",
  "subType": "BIGINT",
  "title": "WORKTYPEID",
  "persistent": true,
  "type": "integer",
  "remarks": "Unique Identifier",
  "maxLength": 19
  },
  "worktype": {
  "searchType": "WILDCARD",
  "subType": "UPPER",
  "title": "Work Type",
  "persistent": true,
  "type": "string",
  "remarks": "Defines the type for the selected class of work order. For example, for a release, work types are significant, major, or minor. For a change, work types are delta, full, or package. For a work order, work types are corrective maintenance, capital project, emergency maintenance, event report, and preventive maintenance. You also can define work types for any of work order class. For each type, you can set prompt information.",
  "maxLength": 5
  },
  "href": {
  "type": "string"
  },
  "_id": {
  "type": "string"
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
  }
  },
  "required": [
  "orgid",
  "woclass",
  "worktype"
  ]
  },
  "totalPages": 1,
  "href": "oslc/os/mxapiworktype?oslc.select=worktypeid%2Cworktype%2Cwtypedesc%2Corgid%2Cwoclass&oslc.pageSize=20&oslc.where=orgid%3D%22EAGLENA%22%20and%20woclass%3D%22WORKORDER%22&oslc.orderBy=%2Bworktype&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
  "totalCount": 9,
  "pagenum": 1
  }
  }
 export default worktype;

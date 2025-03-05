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

let shift ={
  "member": [
    {
      "_rowstamp": "347172",
      "description": "Two Shift Operation",
      "href": "oslc/os/mxapishift/_RUFHTEVOQS9DT01QMQ--",
      "shiftnum": "COMP1",
      "orgid": "EAGLENA"
    },
    {
      "_rowstamp": "347170",
      "description": "Day Shift 0700 - 1500",
      "href": "oslc/os/mxapishift/_RUFHTEVOQS9EQVk-",
      "shiftnum": "DAY",
      "orgid": "EAGLENA"
    },
    {
      "_rowstamp": "347171",
      "description": "Evening Shift 1500 - 2300",
      "href": "oslc/os/mxapishift/_RUFHTEVOQS9FVkVOSU5H",
      "shiftnum": "EVENING",
      "orgid": "EAGLENA"
    },
    {
      "_rowstamp": "347173",
      "description": "Night Shift 23:00 - 0700",
      "href": "oslc/os/mxapishift/_RUFHTEVOQS9OSUdIVA--",
      "shiftnum": "NIGHT",
      "orgid": "EAGLENA"
    }
  ],
  "href": "oslc/os/mxapishift",
  "responseInfo": {
    "schema": {
      "resource": "MXAPISHIFT",
      "description": "Maximo API for Shift UI definition",
      "pk": [
        "orgid",
        "shiftnum"
      ],
      "title": "SHIFT",
      "type": "object",
      "$ref": "oslc/jsonschemas/mxapishift",
      "properties": {
        "_rowstamp": {
          "type": "string"
        },
        "localref": {
          "type": "string"
        },
        "_imagelibref": {
          "type": "string"
        },
        "description": {
          "searchType": "TEXT",
          "subType": "ALN",
          "title": "Description",
          "persistent": true,
          "type": "string",
          "remarks": "Describes the shift in a short phrase, for example, Evening Shift 1500 to 2300. Limited to one line.",
          "maxLength": 100
        },
        "href": {
          "type": "string"
        },
        "_id": {
          "type": "string"
        },
        "shiftnum": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Shift",
          "persistent": true,
          "type": "string",
          "remarks": "Identifies the shift, for example, NIGHT, for the standard night shift",
          "maxLength": 8
        },
        "orgid": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Organization",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the organization the shift belongs to.",
          "maxLength": 8
        }
      },
      "required": [
        "orgid",
        "shiftnum"
      ]
    },
    "totalPages": 1,
    "href": "oslc/os/mxapishift?oslc.select=shiftnum%2Cdescription%2Corgid&oslc.pageSize=20&oslc.where=orgid%3D%22EAGLENA%22&searchAttributes=shiftnum%2Cdescription%2Corgid&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1&checkesig=1",
    "totalCount": 4,
    "pagenum": 1
  }
}
 export default shift;

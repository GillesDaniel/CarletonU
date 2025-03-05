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

let woStatusHistory = {
  "member": [
    {
      "changeby": "WILSON",
      "memo": "I have changed in progress for test purpose",
      "changedate": "2022-07-20T15:50:58+05:30",
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx/WOSTATUS/0-1533",
      "wostatusid": 1533,
      "status": "INPRG"
    },
    {
      "changeby": "WILSON",
      "changedate": "2022-06-16T15:17:35+05:30",
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx/WOSTATUS/1-1513",
      "wostatusid": 1513,
      "status": "WAPPR"
    },
    {
      "changeby": "WILSON",
      "changedate": "2022-10-16T15:17:35+05:30",
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx/WOSTATUS/1-1513",
      "wostatusid": 1513,
      "status": "WAPPR"
    }
  ],
  "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx/WOSTATUS",
  "responseInfo": {
    "schema": {
      "resource": "WOSTATUS",
      "pk": [
        "wostatusid"
      ],
      "title": "WOSTATUS",
      "type": "object",
      "properties": {
        "_imglibref": {
          "type": "string"
        },
        "changeby": {
          "searchType": "EXACT",
          "subType": "UPPER",
          "title": "Changed By",
          "persistent": true,
          "type": "string",
          "remarks": "User Signature",
          "maxLength": 30
        },
        "memo": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Memo",
          "persistent": true,
          "type": "string",
          "remarks": "Status Memo",
          "maxLength": 50
        },
        "changedate": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Status Date",
          "persistent": true,
          "type": "string",
          "remarks": "Work Order Status Change Date",
          "maxLength": 10
        },
        "_id": {
          "type": "string"
        },
        "wostatusid": {
          "searchType": "EXACT",
          "subType": "BIGINT",
          "title": "WOSTATUSID",
          "persistent": true,
          "type": "integer",
          "remarks": "Unique Identifier",
          "maxLength": 19
        },
        "status": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Status",
          "persistent": true,
          "type": "string",
          "remarks": "New Work Order Status",
          "maxLength": 16
        }
      },
      "required": [
        "changeby",
        "changedate",
        "wostatusid",
        "status"
      ]
    },
    "totalPages": 1,
    "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjAx/WOSTATUS?oslc.select=wostatusid%2Cchangedate%2Cchangeby%2Cmemo%2Cstatus&oslc.pageSize=100&oslc.orderBy=-changedate&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
    "totalCount": 2,
    "pagenum": 1
  }
}
export default woStatusHistory;

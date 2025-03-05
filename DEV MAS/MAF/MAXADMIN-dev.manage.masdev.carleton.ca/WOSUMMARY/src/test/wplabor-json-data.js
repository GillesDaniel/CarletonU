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

let wplabor ={
  "member": [
    {
      "skilllevel": "FIRSTCLASS",
      "quantity": 2,
      "wplaboruid": 1021,
      "vendor": "CMC",
      "craft": "MECH",
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8yMDAy/wplabor/0-1021",
      "laborhrs": 1.5
    },
    {
      "quantity": 1,
      "wplaboruid": 1022,
      "amcrewtype": "ELECTRIC",
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8yMDAy/wplabor/1-1022",
      "laborhrs": 2.0
    },
    {
      "quantity": 1,
      "wplaboruid": 1019,
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8yMDAy/wplabor/2-1019",
      "laborhrs": 2.0,
      "laborcode": "ADAMS"
    },
    {
      "quantity": 1,
      "wplaboruid": 1020,
      "amcrew": "MASTER",
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8yMDAy/wplabor/3-1020",
      "laborhrs": 1.5
    }
  ],
  "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8yMDAy/wplabor",
  "responseInfo": {
    "schema": {
      "resource": "WPLABOR",
      "pk": [
        "siteid",
        "wonum",
        "wplaborid"
      ],
      "title": "WPLABOR",
      "type": "object",
      "properties": {
        "skilllevel": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Skill Level",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Skill level associated with the craft. You can edit this field if the work order's status allows work plan labor edits. Work order editing rules are set up in the Organizations application.",
          "maxLength": 15
        },
        "quantity": {
          "searchType": "EXACT",
          "subType": "INTEGER",
          "title": "Quantity",
          "persistent": true,
          "type": "integer",
          "remarks": "The required quantity of individuals",
          "maxLength": 12
        },
        "wplaboruid": {
          "searchType": "EXACT",
          "subType": "BIGINT",
          "title": "WPLABORUID",
          "persistent": true,
          "type": "integer",
          "remarks": "Unique Identifier",
          "maxLength": 19
        },
        "vendor": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Vendor",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the vendor or contractor, by company code, which will supply the labor resources.",
          "maxLength": 12
        },
        "_imglibref": {
          "type": "string"
        },
        "craft": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Craft",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the craft. You can edit this field if the work order's status allows work plan labor edits. Work order editing rules are set up in the Organizations application.",
          "maxLength": 8
        },
        "crewworkgroup": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Crew Work Group",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The service center or resource pool that will perform the work.",
          "maxLength": 8
        },
        "amcrew": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Crew",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the crew that performed the work.",
          "maxLength": 8
        },
        "amcrewtype": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Crew Type",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The type of crew that should perform the work.",
          "maxLength": 8
        },
        "_id": {
          "type": "string"
        },
        "laborhrs": {
          "searchType": "EXACT",
          "scale": 0,
          "subType": "DURATION",
          "title": "Regular Hours",
          "persistent": true,
          "type": "number",
          "remarks": "Number of labor hours required to complete the work."
        },
        "laborcode": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Labor",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the labor planned for the work order task.",
          "maxLength": 8
        }
      },
      "required": [
        "quantity",
        "wplaboruid",
        "laborhrs"
      ]
    },
    "totalPages": 1,
    "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8yMDAy/wplabor?oslc.select=wplaboruid%2Ccraft%2Ccrewworkgroup%2Claborcode%2Camcrew%2Camcrewtype%2Cskilllevel%2Cquantity%2Claborhrs%2Cvendor%2Claborcode&oslc.pageSize=100&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1&checkesig=1",
    "totalCount": 4,
    "pagenum": 1
  }
}
 export default wplabor;

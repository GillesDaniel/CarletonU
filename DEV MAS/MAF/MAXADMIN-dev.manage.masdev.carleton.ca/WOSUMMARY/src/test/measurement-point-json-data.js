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

let meansurementpoint ={
  "member": [
    {
      "_rowstamp": "315364",
      "description": "Head Loss on Track 1",
      "siteid": "BEDFORD",
      "href": "oslc/os/mhmeasurepoint/_MTAwMy9CRURGT1JE",
      "pointnum": "1003"
    },
    {
      "_rowstamp": "315365",
      "description": "Outlet Pressure Monitor",
      "siteid": "BEDFORD",
      "href": "oslc/os/mhmeasurepoint/_MTAwMS9CRURGT1JE",
      "pointnum": "1001"
    },
    {
      "_rowstamp": "315366",
      "description": "Outlet Pressure Monitor",
      "siteid": "BEDFORD",
      "href": "oslc/os/mhmeasurepoint/_MTAwMi9CRURGT1JE",
      "pointnum": "1002"
    }
  ],
  "href": "oslc/os/mhmeasurepoint",
  "responseInfo": {
    "schema": {
      "resource": "MHMEASUREPOINT",
      "description": "AH Maximo API for Measurepoint Definition",
      "pk": [
        "pointnum",
        "siteid"
      ],
      "title": "MEASUREPOINT",
      "type": "object",
      "$ref": "oslc/jsonschemas/mhmeasurepoint",
      "properties": {
        "charpointaction": {
          "objectName": "CHARPOINTACTION",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mhmeasurepoint/charpointaction"
              }
            },
            "type": "object"
          },
          "cardinality": "UNDEFINED",
          "relation": "CHARPOINTACTION"
        },
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
          "remarks": "Point Description (One Line)",
          "maxLength": 100
        },
        "siteid": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Site",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Site Identifier",
          "maxLength": 8
        },
        "href": {
          "type": "string"
        },
        "_id": {
          "type": "string"
        },
        "pointnum": {
          "default": "&AUTOKEY&",
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Point",
          "persistent": true,
          "type": "string",
          "remarks": "Point Number For Measurement",
          "maxLength": 8
        }
      },
      "required": [
        "siteid"
      ]
    },
    "totalPages": 1,
    "href": "oslc/os/mhmeasurepoint?oslc.select=pointnum%2Cdescription%2Csiteid&oslc.pageSize=20&searchAttributes=pointnum%2Cdescription%2Csiteid&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1&checkesig=1",
    "totalCount": 3,
    "pagenum": 1
  }
}
export default meansurementpoint;

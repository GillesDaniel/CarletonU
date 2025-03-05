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

let persongroup = {
  "member": [
    {
      "_rowstamp": "322029",
      "allpeopleinpersongroup": [
        {
          "displayname": "Jim Gormley"
        },
        {
          "_imagelibref": "oslc/images/20",
          "displayname": "Steve Miller"
        },
        {
          "displayname": "Mike Wilson"
        }
      ],
      "persongroup": "1001",
      "description": "Electrical Work Queue",
      "href": "oslc/os/mxapipersongroup/_MTAwMQ--"
    },
    {
      "_rowstamp": "322030",
      "allpeopleinpersongroup": [
        {
          "_imagelibref": "oslc/images/7",
          "displayname": "Tom Kazmier"
        },
        {
          "displayname": "Mike Wilson"
        }
      ],
      "persongroup": "SAFETY",
      "description": "Safety team - labor with current certification",
      "href": "oslc/os/mxapipersongroup/_U0FGRVRZ"
    }
  ],
  "href": "oslc/os/mxapipersongroup",
  "responseInfo": {
    "schema": {
      "resource": "MXAPIPERSONGROUP",
      "description": "Maximo API for Person Group UI",
      "pk": [
        "persongroup"
      ],
      "title": "PERSONGROUP",
      "type": "object",
      "$ref": "oslc/jsonschemas/mxapipersongroup",
      "properties": {
        "persongroupteam": {
          "objectName": "PERSONGROUPTEAM",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapipersongroup/persongroupteam"
              }
            },
            "type": "object"
          },
          "cardinality": "",
          "relation": "PERSONGROUPTEAM_NONCNSLTNT"
        },
        "_rowstamp": {
          "type": "string"
        },
        "localref": {
          "type": "string"
        },
        "allpeopleinpersongroup": {
          "objectName": "PERSON",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "displayname": {
                "searchType": "TEXT",
                "subType": "ALN",
                "title": "Name",
                "persistent": true,
                "type": "string",
                "remarks": "A nick name or a friendly name that this person can be identified with.This field is automatically populated when values are entered in the First Name and/or Last Name fields.",
                "maxLength": 62
              }
            }
          },
          "cardinality": "UNDEFINED"
        },
        "_imagelibref": {
          "type": "string"
        },
        "persongroup": {
          "default": "&AUTOKEY&",
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Person Group",
          "persistent": true,
          "type": "string",
          "remarks": "Identifier of the person group record.",
          "maxLength": 8
        },
        "description": {
          "searchType": "TEXT",
          "subType": "ALN",
          "title": "Description",
          "persistent": true,
          "type": "string",
          "remarks": "Description of the person group record.",
          "maxLength": 100
        },
        "href": {
          "type": "string"
        },
        "_id": {
          "type": "string"
        }
      }
    },
    "nextPage": {
      "href": "oslc/os/mxapipersongroup?pageno=2&searchAttributes=persongroup&ignorecollectionref=1&oslc.select=persongroup%2Cdescription%2Crel.allpeopleinpersongroup%7Bdisplayname%7D&internalvalues=1&lean=1&relativeuri=1&oslc.pageSize=20&collectioncount=1"
    },
    "totalPages": 2,
    "href": "oslc/os/mxapipersongroup?oslc.select=persongroup%2Cdescription%2Crel.allpeopleinpersongroup%7Bdisplayname%7D&oslc.pageSize=20&searchAttributes=persongroup&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
    "totalCount": 24,
    "pagenum": 1
  }
}
 export default persongroup;
    
  

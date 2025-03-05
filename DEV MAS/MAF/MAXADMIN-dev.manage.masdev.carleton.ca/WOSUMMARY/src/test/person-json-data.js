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

let person = {
  "member": [
    {
      "persongroupteam": [
        {
          "persongroup": {
            "persongroup": "1001",
            "description": "Electrical Work Queue"
          }
        },
        {
          "persongroup": {
            "persongroup": "MAINT",
            "description": "Maintenance Group"
          }
        },
        {
          "persongroup": {
            "persongroup": "SAFETY",
            "description": "Safety team - labor with current certification"
          }
        },
        {
          "persongroup": {
            "persongroup": "TELECOM",
            "description": "Telecommunications"
          }
        }
      ],
      "_rowstamp": "321777",
      "displayname": "Mike Wilson",
      "locationsite": "BEDFORD",
      "personid": "WILSON",
      "href": "oslc/os/mxapiperson/_V0lMU09O"
    },
    {
      "persongroupteam": [
        {
          "persongroup": {
            "persongroup": "HR",
            "description": "Human Resources"
          }
        }
      ],
      "_rowstamp": "321649",
      "displayname": "Jane Boudreau",
      "locationsite": "BEDFORD",
      "personid": "BOUDREAU",
      "href": "oslc/os/mxapiperson/_Qk9VRFJFQVU-"
    },
  ],
  "href": "oslc/os/mxapiperson",
  "responseInfo": {
    "schema": {
      "resource": "MXAPIPERSON",
      "description": "Maximo API for Peoples",
      "pk": [
        "personid"
      ],
      "title": "PERSON",
      "type": "object",
      "$ref": "oslc/jsonschemas/mxapiperson",
      "properties": {
        "persongroupteam": {
          "objectName": "PERSONGROUPTEAM",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "persongroup": {
                "objectName": "PERSONGROUP",
                "type": "object",
                "properties": {
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
                  }
                }
              }
            }
          },
          "cardinality": ""
        },
        "localref": {
          "type": "string"
        },
        "locationsite": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Person's Site",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The site to which this person belongs.",
          "maxLength": 8
        },
        "ownergroup": {
          "searchType": "EXACT",
          "subType": "UPPER",
          "title": "Person Group",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The default group for a person. The default group applies to a person record if they belong to one group or multiple groups or if they do not belong to any groups.",
          "maxLength": 8
        },
        "_rowstamp": {
          "type": "string"
        },
        "phone": {
          "objectName": "PHONE",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiperson/phone"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "PHONE"
        },
        "_imagelibref": {
          "type": "string"
        },
        "displayname": {
          "searchType": "TEXT",
          "subType": "ALN",
          "title": "Name",
          "persistent": true,
          "type": "string",
          "remarks": "A nick name or a friendly name that this person can be identified with.This field is automatically populated when values are entered in the First Name and/or Last Name fields.",
          "maxLength": 62
        },
        "sms": {
          "objectName": "SMS",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiperson/sms"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "SMS"
        },
        "location": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Person's Location",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The place where this person is located.",
          "maxLength": 12
        },
        "personid": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Person",
          "persistent": true,
          "type": "string",
          "remarks": "Identifier of the person's record. This field must be unique.When you save a person record, this field becomes read only.",
          "maxLength": 30
        },
        "href": {
          "type": "string"
        },
        "_id": {
          "type": "string"
        },
        "email": {
          "objectName": "EMAIL",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiperson/email"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "EMAIL"
        }
      },
      "required": [
        "personid"
      ]
    },
    "nextPage": {
      "href": "oslc/os/mxapiperson?pageno=2&searchAttributes=displayname&ignorecollectionref=1&oslc.select=displayname%2Cpersonid%2Cownergroup%2Clocationsite%2Clocation%2Crel.persongroupteam%7Bpersongroup.description%2Cpersongroup.persongroup%7D%7D&internalvalues=1&lean=1&relativeuri=1&oslc.pageSize=20&collectioncount=1"
    },
    "totalPages": 8,
    "href": "oslc/os/mxapiperson?oslc.select=displayname%2Cpersonid%2Cownergroup%2Clocationsite%2Clocation%2Crel.persongroupteam%7Bpersongroup.description%2Cpersongroup.persongroup%7D%7D&oslc.pageSize=20&searchAttributes=displayname&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
    "totalCount": 152,
    "pagenum": 1
  }
}
 export default person;
    
  

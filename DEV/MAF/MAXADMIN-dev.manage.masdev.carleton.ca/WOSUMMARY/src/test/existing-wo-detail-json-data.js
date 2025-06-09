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

let existingWOData = 
{
  "member": [
    {
      "_rowstamp": "3106979",
      "workorderid": 142,
      "href": "oslc/os/mxapiwodetail/_QkVERk9SRC83MTAw",
      "taskid": 100,
      "wonum": "7100"
    }
  ],
  "href": "oslc/os/mxapiwodetail",
  "responseInfo": {
    "schema": {
      "resource": "MXAPIWODETAIL",
      "description": "Maximo API for Work Orders with Plans and Reservations",
      "pk": [
        "siteid",
        "wonum"
      ],
      "title": "WORKORDER",
      "type": "object",
      "$ref": "oslc/jsonschemas/mxapiwodetail",
      "properties": {
        "wptool": {
          "objectName": "WPTOOL",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/wptool"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "SHOWPLANTOOL"
        },
        "localref": {
          "type": "string"
        },
        "servrectrans": {
          "objectName": "SERVRECTRANS",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/servrectrans"
              }
            },
            "type": "object"
          },
          "cardinality": "",
          "relation": "UXSHOWACTUALSERVICE"
        },
        "failurereport": {
          "objectName": "FAILUREREPORT",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/failurereport"
              }
            },
            "type": "object"
          },
          "cardinality": "",
          "relation": "UXSHOWFAILUREREPORT"
        },
        "moddowntimehist": {
          "objectName": "MODDOWNTIMEHIST",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/moddowntimehist"
              }
            },
            "type": "object"
          },
          "cardinality": "UNDEFINED",
          "relation": "MODDOWNTIMEHIST"
        },
        "tooltrans": {
          "objectName": "TOOLTRANS",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/tooltrans"
              }
            },
            "type": "object"
          },
          "cardinality": "",
          "relation": "UXSHOWACTUALTOOL"
        },
        "_rowstamp": {
          "type": "string"
        },
        "_imagelibref": {
          "type": "string"
        },
        "href": {
          "type": "string"
        },
        "matusetrans": {
          "objectName": "MATUSETRANS",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/matusetrans"
              }
            },
            "type": "object"
          },
          "cardinality": "",
          "relation": "UXSHOWACTUALMATERIAL"
        },
        "doclinks": {
          "objectName": "DOCLINKS",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/doclinks"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "DOCLINKS"
        },
        "taskid": {
          "searchType": "EXACT",
          "subType": "INTEGER",
          "title": "Task",
          "persistent": true,
          "type": "integer",
          "remarks": "Identifies the task.",
          "maxLength": 12
        },
        "invreserve": {
          "objectName": "INVRESERVE",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/invreserve"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "MXINTINVRES"
        },
        "commlog": {
          "objectName": "COMMLOG",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/commlog"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "COMMLOG"
        },
        "wosafetylink": {
          "objectName": "WOSAFETYLINK",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/wosafetylink"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "WOSLHAZPRECENABLED"
        },
        "pluscwods": {
          "objectName": "PLUSCWODS",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/pluscwods"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "PLUSCWODS"
        },
        "mr": {
          "objectName": "MR",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/mr"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "MR"
        },
        "assignment": {
          "objectName": "ASSIGNMENT",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/assignment"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "SHOWASSIGNMENT"
        },
        "wpmaterial": {
          "objectName": "WPMATERIAL",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/wpmaterial"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "SHOWPLANMATERIAL"
        },
        "wpservice": {
          "objectName": "WPSERVICE",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/wpservice"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "SHOWPLANSERVICE"
        },
        "multiassetlocci": {
          "objectName": "MULTIASSETLOCCI",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/multiassetlocci"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "MULTIASSETLOCCI"
        },
        "wonum": {
          "default": "&AUTOKEY&",
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Work Order",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the work order.",
          "maxLength": 25
        },
        "relatedrecord": {
          "objectName": "RELATEDRECORD",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/relatedrecord"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "RELATEDRECORD"
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
        "wplabor": {
          "objectName": "WPLABOR",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/wplabor"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "SHOWPLANLABOR"
        },
        "labtrans": {
          "objectName": "LABTRANS",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/labtrans"
              }
            },
            "type": "object"
          },
          "cardinality": "",
          "relation": "UXSHOWACTUALLABOR"
        },
        "woserviceaddress": {
          "objectName": "WOSERVICEADDRESS",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/woserviceaddress"
              }
            },
            "type": "object"
          },
          "cardinality": "",
          "relation": "SERVICEADDRESS"
        },
        "_id": {
          "type": "string"
        },
        "worklog": {
          "objectName": "WORKLOG",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/worklog"
              }
            },
            "type": "object"
          },
          "cardinality": "",
          "relation": "WOWORKLOG"
        },
        "woactivity": {
          "objectName": "WOACTIVITY",
          "type": "array",
          "items": {
            "definition": {
              "subSchema": {
                "$ref": "oslc/jsonschemas/mxapiwodetail/woactivity"
              }
            },
            "type": "object"
          },
          "cardinality": "MULTIPLE",
          "relation": "WOACTIVITY"
        }
      }
    },
    "totalPages": 1,
    "href": "oslc/os/mxapiwodetail?oslc.select=wonum%2Cworkorderid%2Ctaskid&oslc.pageSize=100&oslc.where=workorderid%3D142&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1&checkesig=1",
    "totalCount": 1,
    "pagenum": 1
  }
}
export default existingWOData;
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

let allwoPredecessor = {
    "member": [
      {
        "status_description": "Waiting on approval",
        "description": "Relocate Guard Rails Around Compressor",
        "woclass_description": "Work Order",
        "orgid": "EAGLENA",
        "wonum": "1000",
        "status_maxvalue": "WAPPR",
        "_rowstamp": "2361346",
        "workorderid": 37,
        "woclass": "WORKORDER",
        "woclass_maxvalue": "WORKORDER",
        "assetnum": "11300",
        "istask": false,
        "siteid": "BEDFORD",
        "location": "BR300",
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDAw",
        "status": "WAPPR"
      },
      {
        "parent": "1000",
        "status_description": "Waiting on approval",
        "description": "Pipeline Leak Classification",
        "woclass_description": "Activity",
        "orgid": "EAGLENA",
        "wonum": "1000-10",
        "status_maxvalue": "WAPPR",
        "_rowstamp": "2317672",
        "workorderid": 223,
        "woclass": "ACTIVITY",
        "woclass_maxvalue": "ACTIVITY",
        "assetnum": "11300",
        "istask": true,
        "siteid": "BEDFORD",
        "location": "BR300",
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDAwLTEw",
        "taskid": 10,
        "status": "WAPPR"
      },
      {
        "parent": "1000",
        "status_description": "Waiting on approval",
        "description": "Request for Service,IT",
        "woclass_description": "Activity",
        "orgid": "EAGLENA",
        "wonum": "1000-20",
        "status_maxvalue": "WAPPR",
        "_rowstamp": "1825497",
        "workorderid": 224,
        "woclass": "ACTIVITY",
        "woclass_maxvalue": "ACTIVITY",
        "assetnum": "11300",
        "istask": true,
        "siteid": "BEDFORD",
        "location": "BR300",
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMDAwLTIw",
        "taskid": 20,
        "status": "WAPPR"
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
          "parent": {
            "searchType": "WILDCARD",
            "subType": "UPPER",
            "title": "Parent WO",
            "persistent": true,
            "type": "string",
            "hasList": true,
            "remarks": "Parent of the work order shown in the Work Order field. When this field is blank, the work order in the Work Order field is a top-level work order. To assign a work order to a parent, select Assign to New Parent from the Select Action menu.",
            "maxLength": 25
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
          "description": {
            "searchType": "TEXT",
            "subType": "ALN",
            "title": "Description",
            "persistent": true,
            "type": "string",
            "remarks": "Describes the work order. To enter or view additional information, click the Long Description button.",
            "maxLength": 100
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
          "status_maxvalue": {
            "type": "string"
          },
          "_rowstamp": {
            "type": "string"
          },
          "_imagelibref": {
            "type": "string"
          },
          "assetnum": {
            "searchType": "WILDCARD",
            "subType": "UPPER",
            "title": "Asset",
            "persistent": true,
            "type": "string",
            "hasList": true,
            "remarks": "Identifies the asset.",
            "maxLength": 25
          },
          "istask": {
            "searchType": "EXACT",
            "subType": "YORN",
            "title": "Is Task",
            "persistent": true,
            "type": "boolean",
            "remarks": "Specifies whether the work order is a task. If the check box is selected, the work order is a task. If the check box is cleared, the work order is not a task."
          },
          "siteid": {
            "searchType": "WILDCARD",
            "subType": "UPPER",
            "title": "Site",
            "persistent": true,
            "type": "string",
            "hasList": true,
            "remarks": "Identifies the site.",
            "maxLength": 8
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
          "status_description": {
            "type": "string"
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
          "woclass_description": {
            "type": "string"
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
          "woclass": {
            "searchType": "EXACT",
            "subType": "UPPER",
            "title": "Class",
            "persistent": true,
            "type": "string",
            "hasList": true,
            "remarks": "Identifies the work order's class.",
            "maxLength": 16
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
          "woclass_maxvalue": {
            "type": "string"
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
          "location": {
            "searchType": "WILDCARD",
            "subType": "UPPER",
            "title": "Location",
            "persistent": true,
            "type": "string",
            "hasList": true,
            "remarks": "Identifies the work order's location. This is not necessarily the asset's location, however, if an asset is entered, its location will default here",
            "maxLength": 12
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
          },
          "status": {
            "searchType": "WILDCARD",
            "subType": "UPPER",
            "title": "Status",
            "persistent": true,
            "type": "string",
            "hasList": true,
            "remarks": "Status of the work order, for example, in progress, waiting on material, waiting for approval, completed, or closed.",
            "maxLength": 16
          }
        },
        "required": [
          "istask",
          "orgid",
          "siteid",
          "status",
          "woclass"
        ]
      },
      "nextPage": {
        "href": "oslc/os/mxapiwodetail?pageno=2&checkesig=1&ignorecollectionref=1&collectioncount=1&internalvalues=1&oslc.orderBy=%2Bwonum&oslc.where=wonum%21%3D%22%5BT2085%2CT2087%2CT2091%2CT2093%2CT2095%2CT2097%2CT2099%2C1539%5D%22+and+workorderid%21%3D135290+and+siteid%3D%22BEDFORD%22&searchAttributes=wonum&savedQuery=TASKPREDECESSOR&relativeuri=1&lean=1&oslc.select=wonum%2Cparent%2Ctaskid%2Cwoclass%2Cdescription%2Clocation%2Cassetnum%2Cstatus%2Cworkorderid%2Cistask%2Corgid%2Csiteid&oslc.pageSize=100"
      },
      "totalPages": 15,
      "href": "oslc/os/mxapiwodetail?oslc.select=wonum%2Cparent%2Ctaskid%2Cwoclass%2Cdescription%2Clocation%2Cassetnum%2Cstatus%2Cworkorderid%2Cistask%2Corgid%2Csiteid&oslc.pageSize=100&oslc.where=wonum!%3D%22%5BT2085%2CT2087%2CT2091%2CT2093%2CT2095%2CT2097%2CT2099%2C1539%5D%22%20and%20workorderid!%3D135290%20and%20siteid%3D%22BEDFORD%22&savedQuery=TASKPREDECESSOR&oslc.orderBy=%2Bwonum&searchAttributes=wonum&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1&checkesig=1",
      "totalCount": 1466,
      "pagenum": 1
    }
  }
 export default allwoPredecessor;
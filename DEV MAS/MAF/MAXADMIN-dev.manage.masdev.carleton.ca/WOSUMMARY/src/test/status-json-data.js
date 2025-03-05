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

let status = {
  "member": [
      {
          "status_maxvalue": "WMATL",
          "_rowstamp": "7280874",
          "status_description": "Waiting on material",
          "wostatus": [
              {
                  "changeby": "WILSON",
                  "memo": "Now waiting on material.",
                  "changedate": "2022-05-27T03:19:20+00:00"
              },
              {
                  "changeby": "WILSON",
                  "memo": "Now status is inProgress.",
                  "changedate": "2022-05-27T03:19:49+00:00"
              },
              {
                  "changeby": "WILSON",
                  "memo": "Update status to waiting on material.",
                  "changedate": "2022-05-31T08:57:17+00:00"
              },
              {
                  "changeby": "WILSON",
                  "memo": "Awaiting for approval",
                  "changedate": "2022-05-27T03:20:11+00:00"
              },
              {
                  "changeby": "WILSON",
                  "memo": "Waiting for schedule.",
                  "changedate": "2022-05-27T03:20:33+00:00"
              }
          ],
          "allowedstates": {
              "COMP": [
                  {
                      "valueid": "WOSTATUS|COMP",
                      "maxvalue": "COMP",
                      "defaults": true,
                      "description": "Completed",
                      "siteid": "",
                      "value": "COMP",
                      "orgid": ""
                  }
              ],
              "WAPPR": [
                  {
                      "valueid": "WOSTATUS|WAPPR",
                      "maxvalue": "WAPPR",
                      "defaults": true,
                      "description": "Waiting on approval",
                      "siteid": "",
                      "value": "WAPPR",
                      "orgid": ""
                  }
              ],
              "CAN": [
                  {
                      "valueid": "WOSTATUS|CAN",
                      "maxvalue": "CAN",
                      "defaults": true,
                      "description": "Canceled",
                      "siteid": "",
                      "value": "CAN",
                      "orgid": ""
                  }
              ],
              "INPRG": [
                  {
                      "valueid": "WOSTATUS|INPRG",
                      "maxvalue": "INPRG",
                      "defaults": true,
                      "description": "In progress",
                      "siteid": "",
                      "value": "INPRG",
                      "orgid": ""
                  }
              ],
              "CLOSE": [
                  {
                      "valueid": "WOSTATUS|CLOSE",
                      "maxvalue": "CLOSE",
                      "defaults": true,
                      "description": "Closed",
                      "siteid": "",
                      "value": "CLOSE",
                      "orgid": ""
                  }
              ]
          },
          "schedstart": "1999-03-28T10:00:00+00:00",
          "description": "Design and Procurement - Phase 1",
          "worktype": {
              "wtypedesc": "Capital Project"
          },
          "location": "NEEDHAM",
          "href": "oslc/os/mxapiwodetail/_QkVERk9SRC83MTAw",
          "status": "WMATL",          
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
              "wostatus": {
                  "objectName": "WOSTATUS",
                  "type": "array",
                  "items": {
                      "type": "object",
                      "properties": {
                          "changeby": {
                              "searchType": "EXACT",
                              "subType": "UPPER",
                              "title": "Changed By",
                              "persistent": true,
                              "type": "string",
                              "remarks": "User Signature",
                              "maxLength": 100
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
                          }
                      }
                  },
                  "cardinality": "MULTIPLE"
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
              "worktype": {
                  "objectName": "WORKTYPE",
                  "type": "object",
                  "properties": {
                      "wtypedesc": {
                          "searchType": "WILDCARD",
                          "subType": "ALN",
                          "title": "Description",
                          "persistent": true,
                          "type": "string",
                          "remarks": "Describes the work order's type. To enter or view additional information, click the Long Description button.",
                          "maxLength": 50
                      }
                  }
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
              "schedstart": {
                  "searchType": "EXACT",
                  "subType": "DATETIME",
                  "title": "Scheduled Start",
                  "persistent": true,
                  "type": "string",
                  "remarks": "Date and time the work is scheduled to begin.",
                  "maxLength": 10
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
              "status"
          ]
      },
      "nextPage": {
          "href": "oslc/os/mxapiwodetail?pageno=2&oslc.where=status+in+%5B%22APPR%22%2C%22WPCOND%22%2C%22INPRG%22%2C%22WAPPR%22%2C%22WMATL%22%2C%22WSCH%22%5D+and+woclass+in+%5B%22WORKORDER%22%2C%22ACTIVITY%22%5D+and+historyflag%3D0+and+istask%3D0&ignorecollectionref=1&oslc.select=wonum%2Cdescription%2Clocation%2Cassetnum%2Cstatus%2Cschedstart%2Cworktype.wtypedesc%2Callowedstates%2CcomputedStates%2Crel.wostatus%7Bmemo%2Cchangeby%2Cchangedate%7D&oslc.orderBy=%2Bschedstart&internalvalues=1&searchAttributes=wonum%2Cdescription%2Cassetnum&lean=1&relativeuri=1&oslc.pageSize=20&collectioncount=1"
      },
      "totalPages": 345,
      "href": "oslc/os/mxapiwodetail?oslc.select=wonum%2Cdescription%2Clocation%2Cassetnum%2Cstatus%2Cschedstart%2Cworktype.wtypedesc%2Callowedstates%2CcomputedStates%2Crel.wostatus%7Bmemo%2Cchangeby%2Cchangedate%7D&oslc.pageSize=20&oslc.where=status%20in%20%5B%22APPR%22%2C%22WPCOND%22%2C%22INPRG%22%2C%22WAPPR%22%2C%22WMATL%22%2C%22WSCH%22%5D%20and%20woclass%20in%20%5B%22WORKORDER%22%2C%22ACTIVITY%22%5D%20and%20historyflag%3D0%20and%20istask%3D0&oslc.orderBy=%2Bschedstart&searchAttributes=wonum%2Cdescription%2Cassetnum&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
      "totalCount": 6891,
      "pagenum": 1
  }
}
 export default status;
    
  

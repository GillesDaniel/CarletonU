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

let workorderitem = {
    "member": [
      {
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
        "status_maxvalue": "WAPPR",
        "_rowstamp": "2360727",
        "status_description": "Waiting on approval",
        "schedstart": "1999-03-28T10:00:00+05:30",
        "description": "Design and Procurement - Phase 1",
        "worktype": {
          "wtypedesc": "Capital Project"
        },
        "location": "NEEDHAM",
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC83MTAw",
        "status": "WAPPR",
        "wonum": "7100",
        "istask":true,
        "taskid":"10",
        "wogroup":"7111",
        "worktypename":"CP",
        "owner":"WILSON",
        "wostatus":[
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
      ]
      },
      {
        "status_maxvalue": "WAPPR",
        "_rowstamp": "2361139",
        "status_description": "Waiting on approval",
        "schedstart": "1999-03-28T10:00:00+05:30",
        "description": "Modification engineering",
        "worktype": {
          "wtypedesc": "Capital Project"
        },
        "location": "NEEDHAM",
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC83MTEx",
        "status": "WAPPR",
        "wonum": "7111",
        "istask":false,
        "taskid":"10",
        "wogroup":"7111",
        "worktypename":"CP",
        "owner":"WILSON",
      },
      {
        "status_maxvalue": "WAPPR",
        "_rowstamp": "2361156",
        "status_description": "Waiting on approval",
        "schedstart": "1999-03-28T10:00:00+05:30",
        "description": "Service building",
        "worktype": {
          "wtypedesc": "Capital Project"
        },
        "location": "NEEDHAM",
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC83MTEw",
        "status": "WAPPR",
        "wonum": "7110"
      },
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
          "href": {
            "type": "string"
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
        "href": "oslc/os/mxapiwodetail?pageno=2&oslc.where=status+in+%5B%22APPR%22%2C%22WPCOND%22%2C%22INPRG%22%2C%22WAPPR%22%2C%22WMATL%22%2C%22WSCH%22%5D+and+woclass+in+%5B%22WORKORDER%22%2C%22ACTIVITY%22%5D+and+historyflag%3D0+and+istask%3D0&ignorecollectionref=1&oslc.select=wonum%2Cdescription%2Clocation%2Cassetnum%2Cstatus%2Cschedstart%2Cworktype.wtypedesc&oslc.orderBy=%2Bschedstart&internalvalues=1&searchAttributes=wonum%2Cdescription%2Cassetnum&lean=1&relativeuri=1&oslc.pageSize=20&collectioncount=1"
      },
      "totalPages": 340,
      "href": "oslc/os/mxapiwodetail?oslc.select=wonum%2Cdescription%2Clocation%2Cassetnum%2Cstatus%2Cschedstart%2Cworktype.wtypedesc&oslc.pageSize=20&oslc.where=status%20in%20%5B%22APPR%22%2C%22WPCOND%22%2C%22INPRG%22%2C%22WAPPR%22%2C%22WMATL%22%2C%22WSCH%22%5D%20and%20woclass%20in%20%5B%22WORKORDER%22%2C%22ACTIVITY%22%5D%20and%20historyflag%3D0%20and%20istask%3D0&oslc.orderBy=%2Bschedstart&searchAttributes=wonum%2Cdescription%2Cassetnum&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
      "totalCount": 6792,
      "pagenum": 1
    }
  }
 export default workorderitem;
    
  

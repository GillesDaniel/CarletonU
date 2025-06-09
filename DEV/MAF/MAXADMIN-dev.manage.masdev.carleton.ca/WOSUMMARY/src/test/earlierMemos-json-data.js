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

let earlierMemos = {
    "member": [
      {
        "app": "WOTRACK",
        "assignstatus_description": null,
        "_rowstamp": "1271637",
        "assignstatus_maxvalue": "ACTIVE",
        "duedate": "2022-04-14T20:51:40+05:30",
        "description": "Check safety plan",
        "href": "oslc/os/mxapiwfassignment/_MjEzLzgvV09BUFBST1ZFLzEvMTE1",
        "ownerid": 27,
        "startdate": "2022-04-14T14:51:40+05:30",
        "assignstatus": "ACTIVE",
        "memos": [
          {
            "memo": "Task 3 Comment 1",
            "personid": "WILSON",
            "transdate": "2022-04-22T19:57:18+05:30"
          }
        ]  
      },
      {
        "app": "WOTRACK",
        "assignstatus_description": null,
        "_rowstamp": "1549276",
        "assignstatus_maxvalue": "ACTIVE",
        "duedate": "2022-04-22T19:57:18+05:30",
        "memos": [
          {
            "memo": "Task 3 Comment 1",
            "personid": "WILSON",
            "transdate": "2022-04-22T19:57:18+05:30"
          }
        ],
        "description": "TASK 4",
        "href": "oslc/os/mxapiwfassignment/_NDg4LzQvV09SS09SREVSLzIvMjc5",
        "ownerid": 133560,
        "startdate": "2022-04-22T19:57:18+05:30",
        "assignstatus": "ACTIVE"
      },
      {
        "app": "WOTRACK",
        "assignstatus_description": null,
        "_rowstamp": "1549370",
        "assignstatus_maxvalue": "ACTIVE",
        "duedate": "2022-04-22T19:58:18+05:30",
        "memos": [
          {
            "memo": "Task 3 New comment Added 1",
            "personid": "WILSON",
            "transdate": "2022-04-22T19:58:18+05:30"
          }
        ],
        "description": "TASK 4",
        "href": "oslc/os/mxapiwfassignment/_NDkxLzQvV09SS09SREVSLzIvMjgw",
        "ownerid": 133561,
        "startdate": "2022-04-22T19:58:18+05:30",
        "assignstatus": "ACTIVE"
      },
      {
        "app": "WOTRACK",
        "assignstatus_description": null,
        "_rowstamp": "1550092",
        "assignstatus_maxvalue": "ACTIVE",
        "duedate": "2022-04-22T20:06:49+05:30",
        "memos": [
          {
            "memo": "Mass Accept",
            "personid": "WILSON",
            "transdate": "2022-04-22T20:06:49+05:30"
          },
          {
            "memo": "Task 3 Comment 2",
            "personid": "WILSON",
            "transdate": "2022-04-22T19:57:40+05:30"
          },
          {
            "memo": "Task 3 Comment 3",
            "personid": "WILSON",
            "transdate": "2022-04-22T19:58:39+05:30"
          }
        ],
        "description": "TASK 6",
        "href": "oslc/os/mxapiwfassignment/_NDk0LzYvV09SS09SREVSLzIvMjgy",
        "ownerid": 133563,
        "startdate": "2022-04-22T20:06:49+05:30",
        "assignstatus": "ACTIVE"
      },
      {
        "app": "WOTRACK",
        "assignstatus_description": null,
        "_rowstamp": "1550118",
        "assignstatus_maxvalue": "ACTIVE",
        "duedate": "2022-04-22T20:07:20+05:30",
        "memos": [
          {
            "memo": "Accept 3",
            "personid": "WILSON",
            "transdate": "2022-04-22T20:07:20+05:30"
          },
          {
            "memo": "Mass Accept",
            "personid": "WILSON",
            "transdate": "2022-04-22T20:06:49+05:30"
          },
          {
            "memo": "Task 3 Comment 1",
            "personid": "WILSON",
            "transdate": "2022-04-22T19:57:30+05:30"
          }
        ],
        "description": "TASK 6",
        "href": "oslc/os/mxapiwfassignment/_NDk1LzYvV09SS09SREVSLzIvMjgx",
        "ownerid": 133562,
        "startdate": "2022-04-22T20:07:20+05:30",
        "assignstatus": "ACTIVE"
      }
    ],
    "href": "oslc/os/mxapiwfassignment",
    "responseInfo": {
      "schema": {
        "resource": "MXAPIWFASSIGNMENT",
        "description": "Maximo API for Workflow Assigment",
        "pk": [
          "assignid",
          "processname",
          "processrev",
          "wfid",
          "nodeid"
        ],
        "title": "WFASSIGNMENT",
        "type": "object",
        "$ref": "oslc/jsonschemas/mxapiwfassignment",
        "properties": {
          "app": {
            "searchType": "WILDCARD",
            "subType": "UPPER",
            "title": "Application",
            "persistent": true,
            "type": "string",
            "hasList": true,
            "remarks": "Name of the application to launch",
            "maxLength": 40
          },
          "localref": {
            "type": "string"
          },
          "description": {
            "searchType": "TEXT",
            "subType": "ALN",
            "title": "Description",
            "persistent": true,
            "type": "string",
            "remarks": "Displayed by inbox and applications to tell user what needs to be done",
            "maxLength": 100
          },
          "ownerid": {
            "searchType": "EXACT",
            "subType": "BIGINT",
            "title": "Owner ID",
            "persistent": true,
            "type": "integer",
            "remarks": "Unique ID of the controlled record",
            "maxLength": 19
          },
          "priority": {
            "searchType": "EXACT",
            "subType": "INTEGER",
            "title": "Priority",
            "persistent": true,
            "type": "integer",
            "remarks": "Priority of this assignment",
            "maxLength": 12
          },
          "startdate": {
            "searchType": "EXACT",
            "subType": "DATETIME",
            "title": "Start Date",
            "persistent": true,
            "type": "string",
            "remarks": "The DATETIME that the assignment became current. It is set to the current date/time on the server. This value is NULL for process definitions",
            "maxLength": 10
          },
          "assignstatus": {
            "searchType": "WILDCARD",
            "subType": "UPPER",
            "title": "Assignment Status",
            "persistent": true,
            "type": "string",
            "hasList": true,
            "remarks": "The status of the assignment: DEFAULT ACTIVE COMPLETE INACTIVE",
            "maxLength": 18
          },
          "assignstatus_description": {
            "type": "string"
          },
          "_rowstamp": {
            "type": "string"
          },
          "assignstatus_maxvalue": {
            "type": "string"
          },
          "wfaction": {
            "objectName": "WFACTION",
            "type": "array",
            "items": {
              "definition": {
                "subSchema": {
                  "$ref": "oslc/jsonschemas/mxapiwfassignment/wfaction"
                }
              },
              "type": "object"
            },
            "cardinality": "UNDEFINED",
            "relation": "ACTIONS"
          },
          "_imagelibref": {
            "type": "string"
          },
          "duedate": {
            "searchType": "EXACT",
            "subType": "DATETIME",
            "title": "Due Date",
            "persistent": true,
            "type": "string",
            "remarks": "The date that the assignment is due according to the escalation time limit.",
            "maxLength": 10
          },
          "memos": {
            "objectName": "WFTRANSACTION",
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "memo": {
                  "searchType": "WILDCARD",
                  "subType": "ALN",
                  "title": "Memo",
                  "persistent": true,
                  "type": "string",
                  "remarks": "Descriptive data field for end user.",
                  "maxLength": 50
                },
                "personid": {
                  "searchType": "WILDCARD",
                  "subType": "UPPER",
                  "title": "Person",
                  "persistent": true,
                  "type": "string",
                  "remarks": "Person who caused the transaction.",
                  "maxLength": 30
                },
                "transdate": {
                  "searchType": "EXACT",
                  "subType": "DATETIME",
                  "title": "Transaction Date",
                  "persistent": true,
                  "type": "string",
                  "remarks": "Date of transaction",
                  "maxLength": 10
                }
              }
            },
            "cardinality": "UNDEFINED"
          },
          "reassignwf": {
            "objectName": "REASSIGNWF",
            "type": "array",
            "items": {
              "definition": {
                "subSchema": {
                  "$ref": "oslc/jsonschemas/mxapiwfassignment/reassignwf"
                }
              },
              "type": "object"
            },
            "cardinality": "UNDEFINED",
            "relation": "REASSIGNWF"
          },
          "href": {
            "type": "string"
          },
          "_id": {
            "type": "string"
          }
        },
        "required": [
          "app"
        ]
      },
      "totalPages": 1,
      "href": "oslc/os/mxapiwfassignment?oslc.select=description%2Cpriority%2Cduedate%2Cstartdate%2Capp%2Cassignstatus%2Cownerid%2Crel.memos%7Bmemo%2Cpersonid%2Ctransdate%7D&oslc.pageSize=20&searchAttributes=description%2Cpriority%2Cduedate%2Cstartdate%2Capp%2Cassignstatus&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
      "totalCount": 5,
      "pagenum": 1
    }
  };
  
  export default earlierMemos;
  

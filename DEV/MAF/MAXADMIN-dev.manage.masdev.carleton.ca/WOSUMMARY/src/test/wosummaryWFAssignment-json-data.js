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

let woSummaryWorkassignitem = {
    "member": [
        {
            "_rowstamp": "20578299",
            "processname": "AK_ROUTE",
            "description": "FIRST TASK",
            "href": "oslc/os/mxapiwfassignment/_MjkyOC8zL0FLX1JPVVRFLzEvMjMwNA--",
            "assigncode": "WILSON",
            "actions": [
                {
                    "wfactionid": 1272,
                    "ownernodeid": 3,
                    "membernodeid": 2,
                    "instruction": "STOP 2",
                    "actionid": 7,
                    "ispositive": false
                },
                {
                    "wfactionid": 1267,
                    "ownernodeid": 3,
                    "membernodeid": 6,
                    "instruction": "IC",
                    "actionid": 2,
                    "ispositive": true
                }
            ]
        }
    ],
    "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xNjgw/wfassignment.mxapiwfassignment",
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
                "_rowstamp": {
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
                "localref": {
                    "type": "string"
                },
                "_imagelibref": {
                    "type": "string"
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
                                "maxLength": 100
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
                "processname": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Process",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Name of the owning process.",
                    "maxLength": 10
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
                },
                "assigncode": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Assigned Person Code",
                    "persistent": true,
                    "type": "string",
                    "remarks": "The Person assigned.",
                    "maxLength": 100
                },
                "actions": {
                    "objectName": "WFACTION",
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "wfactionid": {
                                "searchType": "EXACT",
                                "subType": "BIGINT",
                                "title": "WFACTIONID",
                                "persistent": true,
                                "type": "integer",
                                "remarks": "Unique Identifier",
                                "maxLength": 19
                            },
                            "ownernodeid": {
                                "searchType": "EXACT",
                                "subType": "INTEGER",
                                "title": "From Node",
                                "persistent": true,
                                "type": "integer",
                                "remarks": "The predecessor node.",
                                "maxLength": 12
                            },
                            "membernodeid": {
                                "searchType": "EXACT",
                                "subType": "INTEGER",
                                "title": "To Node",
                                "persistent": true,
                                "type": "integer",
                                "remarks": "The successor node.",
                                "maxLength": 12
                            },
                            "instruction": {
                                "searchType": "WILDCARD",
                                "subType": "ALN",
                                "title": "Instruction",
                                "persistent": true,
                                "type": "string",
                                "remarks": "Text to further clarify what specific action will take place for routing and manual inputs.",
                                "maxLength": 254
                            },
                            "actionid": {
                                "searchType": "EXACT",
                                "subType": "INTEGER",
                                "title": "Action",
                                "persistent": true,
                                "type": "integer",
                                "remarks": "Uniquely identifies an action in a process. Autogenerated by the design tool for internal use.",
                                "maxLength": 12
                            },
                            "ispositive": {
                                "searchType": "EXACT",
                                "subType": "YORN",
                                "title": "Positive",
                                "persistent": true,
                                "type": "boolean",
                                "remarks": "Is this a positive action"
                            }
                        }
                    },
                    "cardinality": "UNDEFINED"
                }
            },
            "required": [
                "processname"
            ]
        },
        "totalPages": 1,
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xNjgw/wfassignment.mxapiwfassignment?oslc.select=processname%2Cdescription%2Cassigncode%2Crel.memos%7Bmemo%2Cpersonid%2Ctransdate%7D%2Crel.actions%7Bwfactionid%2Cownernodeid%2Cmembernodeid%2Cactionid%2Cispositive%2Cinstruction%7D&oslc.pageSize=100&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
        "totalCount": 1,
        "pagenum": 1
    }
};
  
  export default woSummaryWorkassignitem;
  

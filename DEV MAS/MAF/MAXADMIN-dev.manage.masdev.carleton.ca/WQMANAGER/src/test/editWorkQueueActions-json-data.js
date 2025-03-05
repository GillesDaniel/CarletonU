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

let editWorkQueueActions = {
    "member": [
    {
    "_rowstamp": "10000312",
    "localref": "oslc/os/mxapiworkqueue/_V1Ez/workqueueactions/0-118",
    "action": "1025",
    "href": "http://childkey#V09SS1FVRVVFL1dPUktRVUVVRUFDVElPTlMvMTAyNS9XUTM-",
    "actionorder": 2
    },
    {
    "_rowstamp": "10000308",
    "localref": "oslc/os/mxapiworkqueue/_V1Ez/workqueueactions/1-122",
    "action": "MFMAILSENDWOM",
    "actionlabel": "Maximo for E-mail, send e-mail for WorkOrder",
    "href": "http://childkey#V09SS1FVRVVFL1dPUktRVUVVRUFDVElPTlMvTUZNQUlMU0VORFdPTS9XUTM-",
    "actionorder": 6
    },
    {
    "_rowstamp": "10000311",
    "localref": "oslc/os/mxapiworkqueue/_V1Ez/workqueueactions/2-119",
    "action": "WO APPR",
    "actionlabel": "Work order approval action",
    "href": "http://childkey#V09SS1FVRVVFL1dPUktRVUVVRUFDVElPTlMvV08gQVBQUi9XUTM-",
    "actionorder": 3
    },
    {
    "_rowstamp": "10000310",
    "localref": "oslc/os/mxapiworkqueue/_V1Ez/workqueueactions/3-120",
    "action": "WO CLOSE",
    "actionlabel": "Work order close action",
    "href": "http://childkey#V09SS1FVRVVFL1dPUktRVUVVRUFDVElPTlMvV08gQ0xPU0UvV1Ez",
    "actionorder": 4
    },
    {
    "_rowstamp": "10000309",
    "localref": "oslc/os/mxapiworkqueue/_V1Ez/workqueueactions/4-121",
    "action": "WO INPRG",
    "actionlabel": "Work order in progress action",
    "href": "http://childkey#V09SS1FVRVVFL1dPUktRVUVVRUFDVElPTlMvV08gSU5QUkcvV1Ez",
    "actionorder": 5
    },
    {
    "_rowstamp": "10000313",
    "localref": "oslc/os/mxapiworkqueue/_V1Ez/workqueueactions/5-117",
    "action": "WO WAPPR",
    "actionlabel": "Work order waiting for approval action",
    "href": "http://childkey#V09SS1FVRVVFL1dPUktRVUVVRUFDVElPTlMvV08gV0FQUFIvV1Ez",
    "actionorder": 1
    }
    ],
    "href": "oslc/os/mxapiworkqueue/_V1Ez/workqueueactions",
    "responseInfo": {
    "schema": {
    "resource": "MXAPIWORKQUEUE",
    "description": "WORKQUEUE/WORKQUEUEACTIONS",
    "pk": [
    "queuename",
    "action"
    ],
    "title": "WORKQUEUE/WORKQUEUEACTIONS",
    "type": "object",
    "$ref": "oslc/jsonschemas/mxapiworkqueue/workqueueactions",
    "properties": {
    "_rowstamp": {
    "type": "string"
    },
    "localref": {
    "type": "string"
    },
    "_imagelibref": {
    "type": "string"
    },
    "action": {
    "searchType": "WILDCARD",
    "subType": "UPPER",
    "title": "Action",
    "persistent": true,
    "type": "string",
    "remarks": "Action",
    "maxLength": 30,
    "relation": "WORKQUEUEACTIONS"
    },
    "workqueueactionsid": {
    "default": "&AUTOKEY&",
    "searchType": "EXACT",
    "subType": "BIGINT",
    "title": "Unique ID",
    "persistent": true,
    "type": "integer",
    "remarks": "Workqueue Actions ID",
    "maxLength": 19,
    "relation": "WORKQUEUEACTIONS"
    },
    "actionlabel": {
    "searchType": "WILDCARD",
    "subType": "ALN",
    "title": "Label",
    "persistent": true,
    "type": "string",
    "remarks": "Action name to show on the queue action bar",
    "maxLength": 100,
    "relation": "WORKQUEUEACTIONS"
    },
    "completes": {
    "searchType": "EXACT",
    "subType": "YORN",
    "title": "Done",
    "persistent": true,
    "type": "boolean",
    "remarks": "Action Removes Row",
    "relation": "WORKQUEUEACTIONS"
    },
    "conditionnum": {
    "searchType": "WILDCARD",
    "subType": "UPPER",
    "title": "Condition",
    "persistent": true,
    "type": "string",
    "remarks": "Optional Condition",
    "maxLength": 12,
    "relation": "WORKQUEUEACTIONS"
    },
    "href": {
    "type": "string"
    },
    "_id": {
    "type": "string"
    },
    "actionorder": {
    "searchType": "EXACT",
    "subType": "INTEGER",
    "title": "Order",
    "persistent": true,
    "type": "integer",
    "remarks": "Display Order",
    "maxLength": 12,
    "relation": "WORKQUEUEACTIONS"
    }
    },
    "required": [
    "action"
    ]
    },
    "totalPages": 1,
    "href": "oslc/os/mxapiworkqueue/_V1Ez/workqueueactions?oslc.select=queuename%2Caction%2Cactionlabel%2Cactionorder&oslc.pageSize=100&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
    "totalCount": 6,
    "pagenum": 1
    }
    }
 export default editWorkQueueActions;

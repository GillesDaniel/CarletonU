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

let editWorkQueue = {
    "member": [
    {
    "app": "WOTRACK",
    "workqueueid": 92,
    "queuename": "WQ3",
    "_rowstamp": "10000301",
    "isactive": true,
    "description": "1",
    "clausename": "uxtechnicianstatusfilteredwolist",
    "href": "oslc/os/mxapiworkqueue/_V1Ez",
    "priority_description": "Medium",
    "priority": 3,
    "intobjectname": "MXAPIWODETAIL"
    }
    ],
    "href": "oslc/os/mxapiworkqueue",
    "responseInfo": {
    "schema": {
    "resource": "MXAPIWORKQUEUE",
    "description": "Maximo table for work queues",
    "pk": [
    "queuename"
    ],
    "title": "WORKQUEUE",
    "type": "object",
    "$ref": "oslc/jsonschemas/mxapiworkqueue",
    "properties": {
    "app": {
    "searchType": "WILDCARD",
    "subType": "UPPER",
    "title": "Go to App",
    "persistent": true,
    "type": "string",
    "hasList": true,
    "remarks": "Go to LAUNCHAPP",
    "maxLength": 40
    },
    "queuename": {
    "searchType": "WILDCARD",
    "subType": "UPPER",
    "title": "Queue Name",
    "persistent": true,
    "type": "string",
    "remarks": "Workqueue Name",
    "maxLength": 25
    },
    "workqueuecols": {
    "objectName": "WORKQUEUECOLS",
    "type": "array",
    "items": {
    "definition": {
    "subSchema": {
    "$ref": "oslc/jsonschemas/mxapiworkqueue/workqueuecols"
    }
    },
    "type": "object"
    },
    "cardinality": "",
    "relation": "WORKQUEUECOLS"
    },
    "workqueueactions": {
    "objectName": "WORKQUEUEACTIONS",
    "type": "array",
    "items": {
    "definition": {
    "subSchema": {
    "$ref": "oslc/jsonschemas/mxapiworkqueue/workqueueactions"
    }
    },
    "type": "object"
    },
    "cardinality": "",
    "relation": "WORKQUEUEACTIONS"
    },
    "localref": {
    "type": "string"
    },
    "isactive": {
    "default": true,
    "searchType": "EXACT",
    "subType": "YORN",
    "title": "Active",
    "persistent": true,
    "type": "boolean",
    "remarks": "Maps to Work Queue is active or not"
    },
    "description": {
    "searchType": "WILDCARD",
    "subType": "ALN",
    "title": "Description",
    "persistent": true,
    "type": "string",
    "remarks": "Workqueue Description",
    "maxLength": 100
    },
    "clausename": {
    "searchType": "WILDCARD",
    "subType": "ALN",
    "title": "Query",
    "persistent": true,
    "type": "string",
    "remarks": "Query",
    "maxLength": 100
    },
    "priority": {
    "searchType": "EXACT",
    "subType": "INTEGER",
    "title": "Priority",
    "persistent": true,
    "type": "integer",
    "hasList": true,
    "remarks": "Priority",
    "maxLength": 12
    },
    "priority_description": {
    "type": "string"
    },
    "intobjectname": {
    "default": "MXAPIWODETAIL",
    "searchType": "WILDCARD",
    "subType": "UPPER",
    "title": "Object Structure",
    "persistent": true,
    "type": "string",
    "hasList": true,
    "remarks": "Object Structure",
    "maxLength": 20
    },
    "workqueueid": {
    "searchType": "EXACT",
    "subType": "BIGINT",
    "title": "Unique Id",
    "persistent": true,
    "type": "integer",
    "remarks": "Unique Id",
    "maxLength": 19
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
    "_id": {
    "type": "string"
    }
    },
    "required": [
    "clausename",
    "queuename"
    ]
    },
    "totalPages": 1,
    "href": "oslc/os/mxapiworkqueue?oslc.select=workqueueid%2Cqueuename%2Cdescription%2Cpriority%2Capp%2Cintobjectname%2Cclausename%2Cisactive&oslc.pageSize=100&oslc.where=queuename%3D%22WQ3%22&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
    "totalCount": 1,
    "pagenum": 1
    }
    };
 export default editWorkQueue;

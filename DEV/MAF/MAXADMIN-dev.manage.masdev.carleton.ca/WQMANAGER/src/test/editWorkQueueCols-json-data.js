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

let editWorkQueueCols = {
    "member": [
    {
    "_rowstamp": "10000305",
    "localref": "oslc/os/mxapiworkqueue/_V1Ez/workqueuecols/0-238",
    "columnorder": 3,
    "href": "http://childkey#V09SS1FVRVVFL1dPUktRVUVVRUNPTFMvQ0FMQ1NISUZUL1dRMw--",
    "title": "CALCSHIFT"
    },
    {
    "_rowstamp": "10000304",
    "localref": "oslc/os/mxapiworkqueue/_V1Ez/workqueuecols/1-239",
    "columnorder": 4,
    "href": "http://childkey#V09SS1FVRVVFL1dPUktRVUVVRUNPTFMvSVNUQVNLL1dRMw--",
    "title": "ISTASK"
    },
    {
    "_rowstamp": "10000306",
    "localref": "oslc/os/mxapiworkqueue/_V1Ez/workqueuecols/2-237",
    "columnorder": 2,
    "href": "http://childkey#V09SS1FVRVVFL1dPUktRVUVVRUNPTFMvT1dORVJHUk9VUC9XUTM-",
    "title": "OWNERGROUP"
    },
    {
    "_rowstamp": "10000302",
    "localref": "oslc/os/mxapiworkqueue/_V1Ez/workqueuecols/3-241",
    "columnorder": 6,
    "href": "http://childkey#V09SS1FVRVVFL1dPUktRVUVVRUNPTFMvUExVU0NMT09QL1dRMw--",
    "title": "PLUSCLOOP"
    },
    {
    "_rowstamp": "10000303",
    "localref": "oslc/os/mxapiworkqueue/_V1Ez/workqueuecols/4-240",
    "columnorder": 5,
    "href": "http://childkey#V09SS1FVRVVFL1dPUktRVUVVRUNPTFMvVEFTS0lEL1dRMw--",
    "title": "TASKID"
    },
    {
    "_rowstamp": "10000307",
    "localref": "oslc/os/mxapiworkqueue/_V1Ez/workqueuecols/5-236",
    "columnorder": 1,
    "href": "http://childkey#V09SS1FVRVVFL1dPUktRVUVVRUNPTFMvV09MQUJMTksvV1Ez",
    "title": "WOLABLNK"
    }
    ],
    "href": "oslc/os/mxapiworkqueue/_V1Ez/workqueuecols",
    "responseInfo": {
    "schema": {
    "resource": "MXAPIWORKQUEUE",
    "description": "WORKQUEUE/WORKQUEUECOLS",
    "pk": [
    "queuename",
    "attributename"
    ],
    "title": "WORKQUEUE/WORKQUEUECOLS",
    "type": "object",
    "$ref": "oslc/jsonschemas/mxapiworkqueue/workqueuecols",
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
    "columnorder": {
    "searchType": "EXACT",
    "subType": "INTEGER",
    "title": "Order",
    "persistent": true,
    "type": "integer",
    "remarks": "Display Order",
    "maxLength": 12,
    "relation": "WORKQUEUECOLS"
    },
    "href": {
    "type": "string"
    },
    "_id": {
    "type": "string"
    },
    "attributename": {
    "searchType": "WILDCARD",
    "subType": "UPPER",
    "title": "Column",
    "persistent": true,
    "type": "string",
    "remarks": "Column Name",
    "maxLength": 50,
    "relation": "WORKQUEUECOLS"
    },
    "workqueuecolsid": {
    "default": "&AUTOKEY&",
    "searchType": "EXACT",
    "subType": "BIGINT",
    "title": "Unique ID",
    "persistent": true,
    "type": "integer",
    "remarks": "Workqueue Columns ID",
    "maxLength": 19,
    "relation": "WORKQUEUECOLS"
    }
    }
    },
    "totalPages": 1,
    "href": "oslc/os/mxapiworkqueue/_V1Ez/workqueuecols?oslc.select=queuename%2Cattributename--title%2Ccolumnorder&oslc.pageSize=100&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
    "totalCount": 6,
    "pagenum": 1
    }
    };
 export default editWorkQueueCols;

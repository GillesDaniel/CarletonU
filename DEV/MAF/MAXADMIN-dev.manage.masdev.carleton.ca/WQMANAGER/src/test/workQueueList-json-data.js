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

let workqueueList = {
    "member":[
       {
          "queuename":"1",
          "_rowstamp":"1470502",
          "href":"oslc/os/mxapiworkqueue/_MQ--"
       },
       {
          "queuename":"2",
          "_rowstamp":"1470503",
          "href":"oslc/os/mxapiworkqueue/_Mg--"
       },
       {
          "queuename":"3",
          "_rowstamp":"1470504",
          "href":"oslc/os/mxapiworkqueue/_Mw--"
       }
    ],
    "href":"oslc/os/mxapiworkqueue",
    "responseInfo":{
       "schema":{
          "resource":"MXAPIWORKQUEUE",
          "description":"Maximo table for work queues",
          "pk":[
             "queuename"
          ],
          "title":"WORKQUEUE",
          "type":"object",
          "$ref":"oslc/jsonschemas/mxapiworkqueue",
          "properties":{
             "queuename":{
                "searchType":"WILDCARD",
                "subType":"UPPER",
                "title":"Queue Name",
                "persistent":true,
                "type":"string",
                "remarks":"Workqueue Name",
                "maxLength":25
             },
             "_rowstamp":{
                "type":"string"
             },
             "workqueuecols":{
                "objectName":"WORKQUEUECOLS",
                "type":"array",
                "items":{
                   "definition":{
                      "subSchema":{
                         "$ref":"oslc/jsonschemas/mxapiworkqueue/workqueuecols"
                      }
                   },
                   "type":"object"
                },
                "cardinality":"",
                "relation":"WORKQUEUECOLS"
             },
             "workqueueactions":{
                "objectName":"WORKQUEUEACTIONS",
                "type":"array",
                "items":{
                   "definition":{
                      "subSchema":{
                         "$ref":"oslc/jsonschemas/mxapiworkqueue/workqueueactions"
                      }
                   },
                   "type":"object"
                },
                "cardinality":"",
                "relation":"WORKQUEUEACTIONS"
             },
             "localref":{
                "type":"string"
             },
             "_imagelibref":{
                "type":"string"
             },
             "href":{
                "type":"string"
             },
             "_id":{
                "type":"string"
             }
          },
          "required":[
             "queuename"
          ]
       },
       "totalPages":1,
       "href":"oslc/os/mxapiworkqueue?oslc.select=queuename%2Cattributename%2Ccolumnorder&oslc.pageSize=100&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
       "totalCount":3,
       "pagenum":1
    }
 };
 export default workqueueList;

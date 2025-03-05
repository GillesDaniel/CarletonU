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

let persongroups = {
    "member": [
        {
            "_rowstamp": "322029",
            "persongroup": "1001",
            "description": "Electrical Work Queue",
            "href": "oslc/os/mxapipersongroup/_MTAwMQ--"
        },
        {
            "_rowstamp": "322052",
            "persongroup": "CAB",
            "description": "Change Advisory Board",
            "href": "oslc/os/mxapipersongroup/_Q0FC"
        },
        {
            "_rowstamp": "322052",
            "persongroup": "CATERING",
            "description": "Catering desc",
            "href": "oslc/os/mxapipersongroup/_Q0FC"
        }
    ],
    "href": "oslc/os/mxapipersongroup",
    "responseInfo": {
        "schema": {
            "resource": "MXAPIPERSONGROUP",
            "description": "Maximo API for Person Group UI",
            "pk": [
                "persongroup"
            ],
            "title": "PERSONGROUP",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapipersongroup",
            "properties": {
                "persongroupteam": {
                    "objectName": "PERSONGROUPTEAM",
                    "type": "array",
                    "items": {
                        "definition": {
                            "subSchema": {
                                "$ref": "oslc/jsonschemas/mxapipersongroup/persongroupteam"
                            }
                        },
                        "type": "object"
                    },
                    "cardinality": "",
                    "relation": "PERSONGROUPTEAM_NONCNSLTNT"
                },
                "_rowstamp": {
                    "type": "string"
                },
                "localref": {
                    "type": "string"
                },
                "_imagelibref": {
                    "type": "string"
                },
                "persongroup": {
                    "default": "&AUTOKEY&",
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Person Group",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Identifier of the person group record.",
                    "maxLength": 8
                },
                "description": {
                    "searchType": "TEXT",
                    "subType": "ALN",
                    "title": "Description",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Description of the person group record.",
                    "maxLength": 100
                },
                "href": {
                    "type": "string"
                },
                "_id": {
                    "type": "string"
                }
            }
        },
        "totalPages": 1,
        "href": "oslc/os/mxapipersongroup?oslc.select=persongroup%2Cdescription&oslc.pageSize=100&oslc.orderBy=%2Bpersongroup&searchAttributes=persongroup%2Cdescription&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1&checkesig=1",
        "totalCount": 24,
        "pagenum": 1
    }
}

export default persongroups;
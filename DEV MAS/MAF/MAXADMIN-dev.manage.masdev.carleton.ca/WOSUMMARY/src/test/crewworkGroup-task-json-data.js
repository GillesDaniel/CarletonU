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

let crewgroup = {
    "member": [
        {
            "persongroup": "184287",
            "description": "auto_pgroup_desc",
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~CREWWORKGROUP/0-46"
        },
        {
            "persongroup": "250174",
            "description": "auto_pgroup_desc",
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~CREWWORKGROUP/1-47"
        },
        {
            "persongroup": "617419",
            "description": "auto_pgroup_desc",
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~CREWWORKGROUP/2-44"
        },
        {
            "persongroup": "925857",
            "description": "auto_pgroup_desc",
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~CREWWORKGROUP/3-45"
        },
        {
            "persongroup": "DRDJEXHZ",
            "description": "Automation Crew Work Group",
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~CREWWORKGROUP/4-48"
        }
    ],
    "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~CREWWORKGROUP",
    "responseInfo": {
        "schema": {
            "resource": "PERSONGROUP",
            "pk": [
                "persongroup"
            ],
            "title": "PERSONGROUP",
            "type": "object",
            "properties": {
                "_imglibref": {
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
                    "searchType": "WILDCARD",
                    "subType": "ALN",
                    "title": "Description",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Description of the person group record.",
                    "maxLength": 100
                },
                "_id": {
                    "type": "string"
                }
            },
            "required": [
                "persongroup"
            ]
        },
        "totalPages": 1,
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~CREWWORKGROUP?oslc.select=persongroup,description&oslc.select=persongroup%2Cdescription&oslc.pageSize=20&searchAttributes=persongroup%2Cdescription&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1&checkesig=1",
        "totalCount": 5,
        "pagenum": 1
    }
}
 export default crewgroup;

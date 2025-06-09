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

let laborcrew = {
    "member": [
        {
            "description": "Automation Crew Type",
            "amcrewtype": "3MOSQBC7",
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~amcrewtype/0-3",
            "orgid": "EAGLENA",
            "_addNew":"true"
        }
    ],
    "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~amcrewtype",
    "responseInfo": {
        "schema": {
            "resource": "AMCREWT",
            "pk": [
                "amcrewtype",
                "orgid"
            ],
            "title": "AMCREWT",
            "type": "object",
            "properties": {
                "_imglibref": {
                    "type": "string"
                },
                "amcrewtype": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Crew Type",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Identifies the type of work the crew is designed to perform.This value must be unique for all crew type records within an organization.",
                    "maxLength": 8
                },
                "description": {
                    "searchType": "WILDCARD",
                    "subType": "ALN",
                    "title": "Description",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Describes the crew type. To enter or view additional information, click the Long Description button.",
                    "maxLength": 100
                },
                "_id": {
                    "type": "string"
                },
                "orgid": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Organization",
                    "persistent": true,
                    "type": "string",
                    "hasList": true,
                    "remarks": "Identifies the organization to which the crew type belongs.",
                    "maxLength": 8
                }
            },
            "required": [
                "amcrewtype",
                "orgid"
            ]
        },
        "totalPages": 1,
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~amcrewtype?oslc.select=amcrewtype,description,contractnum,orgid&oslc.select=amcrewtype%2Cdescription%2Corgid&oslc.pageSize=20&oslc.orderBy=%2Bamcrewtype&searchAttributes=amcrewtype%2Corgid&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1&checkesig=1",
        "totalCount": 1,
        "pagenum": 1
    }
}
 export default laborcrew;

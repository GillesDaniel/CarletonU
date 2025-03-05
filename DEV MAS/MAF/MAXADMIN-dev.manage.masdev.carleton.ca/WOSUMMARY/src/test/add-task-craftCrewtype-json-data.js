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

let craftLookup = {
    "member": [
        {
            "skilllevel": "VR95CI9W",
            "laborcode": "TOM",
            "laborhrs": "8",
            "standardrate": 13.0,
            "craftrateid": 123,
            "craft": "1GUV1DMO",
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~craft/0-123"
        },
        {
            "laborcode": "CAMILA",
            "laborhrs": "8",
            "standardrate": 20.0,
            "craftrateid": 122,
            "craft": "1GUV1DMO",
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~craft/1-122"
        },
        {
            "laborcode": "CAMILA",
            "laborhrs": "8",
            "standardrate": 28.0,
            "craftrateid": 41,
            "craft": "AM",
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~craft/2-41"
        },
    ],
    "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~craft",
    "responseInfo": {
        "schema": {
            "resource": "CRAFTRATE",
            "pk": [
                "craft",
                "skilllevel",
                "orgid",
                "vendor",
                "contractnum",
                "revisionnum"
            ],
            "title": "CRAFTRATE",
            "type": "object",
            "properties": {
                "skilllevel": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Skill Level",
                    "persistent": true,
                    "type": "string",
                    "hasList": true,
                    "remarks": "The level of skill or expertise for an external vendor.",
                    "maxLength": 15
                },
                "vendor": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Vendor",
                    "persistent": true,
                    "type": "string",
                    "hasList": true,
                    "remarks": "The external vendor supplying this craft/skill level.",
                    "maxLength": 12
                },
                "_imglibref": {
                    "type": "string"
                },
                "standardrate": {
                    "searchType": "EXACT",
                    "scale": 2,
                    "subType": "AMOUNT",
                    "title": "Standard Rate",
                    "persistent": true,
                    "type": "number",
                    "remarks": "The standard rate that is established for the current revision of the contract."
                },
                "craftrateid": {
                    "searchType": "EXACT",
                    "maximum": 2.147483647E9,
                    "subType": "BIGINT",
                    "title": "CRAFTRATEID",
                    "persistent": true,
                    "type": "integer",
                    "minimum": -2.147483648E9,
                    "remarks": "Unique Identifier",
                    "maxLength": 11
                },
                "craft": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Craft",
                    "persistent": true,
                    "type": "string",
                    "hasList": true,
                    "remarks": "Craft",
                    "maxLength": 8
                },
                "_id": {
                    "type": "string"
                },
                "contractnum": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Contract",
                    "persistent": true,
                    "type": "string",
                    "hasList": true,
                    "remarks": "The number on the contract for the external vendor.",
                    "maxLength": 8
                }
            },
            "required": [
                "craftrateid",
                "craft"
            ]
        },
        "nextPage": {
            "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~craft?pageno=2&oslc.pageSize=20&internalvalues=1&lean=1&relativeuri=1&checkesig=1&ignorecollectionref=1&oslc.select=craftrateid%2Cskilllevel%2Cstandardrate%2Ccontractnum%2Ccraft%2Cvendor&oslc.select=craftrateid%2Ccraft%2Cskilllevel%2Cvendor%2Ccontractnum%2Cstandardrate%2Corgid&collectioncount=1&searchAttributes=craft%2Cskilllevel%2Cvendor%2Ccontractnum%2Cstandardrate%2Corgid"
        },
        "totalPages": 4,
        "href": "oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~craft?oslc.select=craftrateid,skilllevel,standardrate,contractnum,craft,vendor&oslc.select=craftrateid%2Ccraft%2Cskilllevel%2Cvendor%2Ccontractnum%2Cstandardrate%2Corgid&oslc.pageSize=20&searchAttributes=craft%2Cskilllevel%2Cvendor%2Ccontractnum%2Cstandardrate%2Corgid&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1&checkesig=1",
        "totalCount": 74,
        "pagenum": 1
    }
}
 export default craftLookup;

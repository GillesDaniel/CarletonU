/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

let linearDirectionList = {
    "member": [
        {
            "_rowstamp": "355995",
            "valueid": "LINEARDIRECTION|DOWNSTREAM",
            "maxvalue": "SOUTH",
            "defaults": false,
            "description": "Used for water & wastewater",
            "href": "oslc/os/mxapisynonymdomain/_TElORUFSRElSRUNUSU9OL1NPVVRIL35OVUxMfi9_TlVMTH4vRE9XTlNUUkVBTQ--",
            "value": "DOWNSTREAM",
            "domainid": "LINEARDIRECTION"
        },
        {
            "_rowstamp": "356178",
            "valueid": "LINEARDIRECTION|EAST",
            "maxvalue": "EAST",
            "defaults": true,
            "description": "Eastbound",
            "href": "oslc/os/mxapisynonymdomain/_TElORUFSRElSRUNUSU9OL0VBU1Qvfk5VTEx_L35OVUxMfi9FQVNU",
            "value": "EAST",
            "domainid": "LINEARDIRECTION"
        },
        {
            "_rowstamp": "356176",
            "valueid": "LINEARDIRECTION|NORTH",
            "maxvalue": "NORTH",
            "defaults": true,
            "description": "Northbound",
            "href": "oslc/os/mxapisynonymdomain/_TElORUFSRElSRUNUSU9OL05PUlRIL35OVUxMfi9_TlVMTH4vTk9SVEg-",
            "value": "NORTH",
            "domainid": "LINEARDIRECTION"
        },
        {
            "_rowstamp": "356177",
            "valueid": "LINEARDIRECTION|SOUTH",
            "maxvalue": "SOUTH",
            "defaults": true,
            "description": "Southbound",
            "href": "oslc/os/mxapisynonymdomain/_TElORUFSRElSRUNUSU9OL1NPVVRIL35OVUxMfi9_TlVMTH4vU09VVEg-",
            "value": "SOUTH",
            "domainid": "LINEARDIRECTION"
        },
        {
            "_rowstamp": "356008",
            "valueid": "LINEARDIRECTION|UPSTREAM",
            "maxvalue": "NORTH",
            "defaults": false,
            "description": "Used for water & wastewater",
            "href": "oslc/os/mxapisynonymdomain/_TElORUFSRElSRUNUSU9OL05PUlRIL35OVUxMfi9_TlVMTH4vVVBTVFJFQU0-",
            "value": "UPSTREAM",
            "domainid": "LINEARDIRECTION"
        },
        {
            "_rowstamp": "356179",
            "valueid": "LINEARDIRECTION|WEST",
            "maxvalue": "WEST",
            "defaults": true,
            "description": "Westbound",
            "href": "oslc/os/mxapisynonymdomain/_TElORUFSRElSRUNUSU9OL1dFU1Qvfk5VTEx_L35OVUxMfi9XRVNU",
            "value": "WEST",
            "domainid": "LINEARDIRECTION"
        }
    ],
    "href": "oslc/os/mxapisynonymdomain",
    "responseInfo": {
        "schema": {
            "resource": "MXAPISYNONYMDOMAIN",
            "description": "Maximo API for Synonymdomain",
            "pk": [
                "domainid",
                "maxvalue",
                "value",
                "siteid",
                "orgid"
            ],
            "title": "SYNONYMDOMAIN",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapisynonymdomain",
            "properties": {
                "valueid": {
                    "searchType": "EXACT",
                    "subType": "ALN",
                    "title": "Value ID",
                    "persistent": true,
                    "type": "string",
                    "remarks": "System generated unique identifier of the value in a domain, internal and cannot be modified.",
                    "maxLength": 256
                },
                "maxvalue": {
                    "searchType": "WILDCARD",
                    "subType": "ALN",
                    "title": "Internal Value",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Internal maximo value",
                    "maxLength": 50
                },
                "localref": {
                    "type": "string"
                },
                "description": {
                    "searchType": "WILDCARD",
                    "subType": "ALN",
                    "title": "Description",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Description of the value",
                    "maxLength": 256
                },
                "domainid": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Domain",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Identifier of the domain",
                    "maxLength": 18
                },
                "orgid": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Organization",
                    "persistent": true,
                    "type": "string",
                    "hasList": true,
                    "remarks": "Identifier of the org for which the domain value is specified",
                    "maxLength": 8
                },
                "_rowstamp": {
                    "type": "string"
                },
                "defaults": {
                    "default": false,
                    "searchType": "EXACT",
                    "subType": "YORN",
                    "title": "Default",
                    "persistent": true,
                    "type": "boolean",
                    "remarks": "Is This The Default Value? (Y or N)"
                },
                "_imagelibref": {
                    "type": "string"
                },
                "siteid": {
                    "searchType": "WILDCARD",
                    "subType": "UPPER",
                    "title": "Site",
                    "persistent": true,
                    "type": "string",
                    "hasList": true,
                    "remarks": "Identifier of the site for which the domain value is specified",
                    "maxLength": 8
                },
                "href": {
                    "type": "string"
                },
                "_id": {
                    "type": "string"
                },
                "value": {
                    "searchType": "WILDCARD",
                    "subType": "ALN",
                    "title": "Value",
                    "persistent": true,
                    "type": "string",
                    "remarks": "Synonym value",
                    "maxLength": 50
                }
            },
            "required": [
                "domainid",
                "maxvalue",
                "value",
                "valueid"
            ]
        },
        "totalPages": 1,
        "href": "oslc/os/mxapisynonymdomain?oslc.select=value%2Cdescription%2Cmaxvalue%2Cdomainid%2Cvalueid%2Csiteid%2Corgid%2Cdefaults&oslc.pageSize=100&oslc.where=domainid%3D%22LINEARDIRECTION%22&savedQuery=MOBILEDOMAIN&searchAttributes=value%2Cdescription%2Cmaxvalue%2Cdomainid%2Cvalueid%2Csiteid%2Corgid%2Cdefaults&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1&checkesig=1",
        "totalCount": 6,
        "pagenum": 1
    }
}
  
  export default linearDirectionList;
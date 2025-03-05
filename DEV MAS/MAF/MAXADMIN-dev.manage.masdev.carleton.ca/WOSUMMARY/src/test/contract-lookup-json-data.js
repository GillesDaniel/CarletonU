
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

let contractlookup = {
  "member": [
    {
      "_rowstamp": "51099",
      "contracttype": "SERVICE",
      "vendor": "EVERGR",
      "contracttype_description": "Service Contract",
      "contracttype_maxvalue": "SERVICE",
      "description": "Landscaping Groundskeeping",
      "href": "oslc os mxapicontract  _MTAyMy9FQUdMRU5BLzA-",
      "contractnum": "1023",
      "orgid": "EAGLENA"
    },
    {
      "_rowstamp": "1199550",
      "contracttype": "SERVICE",
      "vendor": "CHESTER",
      "contracttype_description": "Service Contract",
      "contracttype_maxvalue": "SERVICE",
      "description": "XEXEXE SERVICE CONTRACT FOR WORKORDER",
      "href": "oslc os mxapicontract _MTA0NS9FQUdMRU5BLzA-",
      "contractnum": "1045",
      "orgid": "EAGLENA"
    },
    {
      "_rowstamp": "1129318",
      "contracttype": "SERVICE",
      "vendor": "CHESTER",
      "contracttype_description": "Service Contract",
      "contracttype_maxvalue": "SERVICE",
      "description": "test",
      "href": "oslc os mxapicontract _MTA0NC9FQUdMRU5BLzA-",
      "contractnum": "1044",
      "orgid": "EAGLENA"
    },
    {
      "_rowstamp": "1656621",
      "contracttype": "SERVICE",
      "vendor": "CHESTER",
      "contracttype_description": "Service Contract",
      "contracttype_maxvalue": "SERVICE",
      "href": "oslc os mxapicontract _MTA0Ni9FQUdMRU5BLzA-",
      "contractnum": "1046",
      "orgid": "EAGLENA"
    }
  ],
  "href": "oslc os mxapicontract",
  "responseInfo": {
    "schema": {
      "resource": "MXAPICONTRACT",
      "description": "Maximo API for Contracts",
      "pk": [
        "contractnum",
        "revisionnum",
        "orgid"
      ],
      "title": "CONTRACT",
      "type": "object",
      "$ref": "oslc jsonschemas mxapicontract",
      "properties": {
        "_rowstamp": {
          "type": "string"
        },
        "localref": {
          "type": "string"
        },
        "contracttype": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Contract Type",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Indicator of the current contract type.",
          "maxLength": 25
        },
        "_imagelibref": {
          "type": "string"
        },
        "vendor": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Vendor",
          "persistent": true,
          "type": "string",
          "remarks": "Vendor code",
          "maxLength": 12
        },
        "contracttype_description": {
          "type": "string"
        },
        "contracttype_maxvalue": {
          "type": "string"
        },
        "description": {
          "searchType": "TEXT",
          "subType": "ALN",
          "title": "Description",
          "persistent": true,
          "type": "string",
          "remarks": "Description of the current contract.",
          "maxLength": 100
        },
        "href": {
          "type": "string"
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
          "remarks": "The unique identification number of an associated contract on a Master Contract.",
          "maxLength": 8
        },
        "orgid": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Organization",
          "persistent": true,
          "type": "string",
          "remarks": "Organization identifier.",
          "maxLength": 8
        }
      },
      "required": [
        "contractnum"
      ]
    },
    "totalPages": 1,
    "href": "oslc os mxapicontract?oslc.select=contractnum%2Cdescription%2Ccontracttype%2Cvendor%2Corgid&oslc.pageSize=100&oslc.where=contracttype%3D%22SERVICE%22%20and%20status%3D%22APPR%22&oslc.orderBy=%2Bdescription&searchAttributes=contractnum%2Cdescription%2Ccontracttype%2Cvendor%2Corgid&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
    "totalCount": 4,
    "pagenum": 1
  }
}
 export default contractlookup;
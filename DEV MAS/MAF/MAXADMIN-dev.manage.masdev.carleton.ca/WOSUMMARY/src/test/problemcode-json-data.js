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

let problemcode = {
  "member": [
  {
  "parent": 2136,
  "_rowstamp": "91928",
  "type_maxvalue": "PROBLEM",
  "problemcode": "KEYSTICK",
  "description": "Sticky Key",
  "href": "oslc/os/mxapifailurelist/_MjEzOC9FQUdMRU5B",
  "type": "PROBLEM",
  "orgid": "EAGLENA",
  "type_description": "Problem",
  "failurelist": 2138
  },
  {
  "parent": 2136,
  "_rowstamp": "91929",
  "type_maxvalue": "PROBLEM",
  "problemcode": "KEYSSTIC",
  "description": "Several Keys Sticky",
  "href": "oslc/os/mxapifailurelist/_MjE0MC9FQUdMRU5B",
  "type": "PROBLEM",
  "orgid": "EAGLENA",
  "type_description": "Problem",
  "failurelist": 2140
  },
  {
  "parent": 2136,
  "_rowstamp": "91930",
  "type_maxvalue": "PROBLEM",
  "problemcode": "HORIZLIN",
  "description": "Horizontal Lines on Monitor",
  "href": "oslc/os/mxapifailurelist/_MjE0Mi9FQUdMRU5B",
  "type": "PROBLEM",
  "orgid": "EAGLENA",
  "type_description": "Problem",
  "failurelist": 2142
  },
  {
  "parent": 2136,
  "_rowstamp": "91931",
  "type_maxvalue": "PROBLEM",
  "problemcode": "MONBLANK",
  "description": "Monitor Blank",
  "href": "oslc/os/mxapifailurelist/_MjE0NC9FQUdMRU5B",
  "type": "PROBLEM",
  "orgid": "EAGLENA",
  "type_description": "Problem",
  "failurelist": 2144
  },
  {
  "parent": 2136,
  "_rowstamp": "91932",
  "type_maxvalue": "PROBLEM",
  "problemcode": "CDREAD",
  "description": "CD Read/Writer Not Working",
  "href": "oslc/os/mxapifailurelist/_MjE0Ni9FQUdMRU5B",
  "type": "PROBLEM",
  "orgid": "EAGLENA",
  "type_description": "Problem",
  "failurelist": 2146
  },
  {
  "parent": 2136,
  "_rowstamp": "91933",
  "type_maxvalue": "PROBLEM",
  "problemcode": "CDNOCLOS",
  "description": "CD Read/Writer Not Closing",
  "href": "oslc/os/mxapifailurelist/_MjE0OC9FQUdMRU5B",
  "type": "PROBLEM",
  "orgid": "EAGLENA",
  "type_description": "Problem",
  "failurelist": 2148
  },
  {
  "parent": 2136,
  "_rowstamp": "91934",
  "type_maxvalue": "PROBLEM",
  "problemcode": "LAPTOP",
  "description": "Laptop Not Working",
  "href": "oslc/os/mxapifailurelist/_MjE1MC9FQUdMRU5B",
  "type": "PROBLEM",
  "orgid": "EAGLENA",
  "type_description": "Problem",
  "failurelist": 2150
  },
  {
  "parent": 2136,
  "_rowstamp": "91935",
  "type_maxvalue": "PROBLEM",
  "problemcode": "DESKTOP",
  "description": "Desktop Not Working",
  "href": "oslc/os/mxapifailurelist/_MjE1Mi9FQUdMRU5B",
  "type": "PROBLEM",
  "orgid": "EAGLENA",
  "type_description": "Problem",
  "failurelist": 2152
  }
  ],
  "href": "oslc/os/mxapifailurelist",
  "responseInfo": {
  "schema": {
  "resource": "MXAPIFAILURELIST",
  "description": "Maximo API for Failure Lists",
  "pk": [
  "orgid",
  "failurelist"
  ],
  "title": "FAILURELIST",
  "type": "object",
  "$ref": "oslc/jsonschemas/mxapifailurelist",
  "properties": {
  "parent": {
  "searchType": "EXACT",
  "subType": "BIGINT",
  "title": "Parent",
  "persistent": true,
  "type": "integer",
  "remarks": "Parent Failure List Number",
  "maxLength": 19
  },
  "type_maxvalue": {
  "type": "string"
  },
  "localref": {
  "type": "string"
  },
  "problemcode": {
  "searchType": "WILDCARD",
  "subType": "UPPER",
  "title": "Failure Code",
  "persistent": true,
  "type": "string",
  "remarks": "Failure Code",
  "maxLength": 8
  },
  "description": {
  "searchType": "TEXT",
  "subType": "ALN",
  "title": "Description",
  "persistent": true,
  "type": "string",
  "remarks": "Failure Code Description",
  "maxLength": 100
  },
  "type": {
  "searchType": "WILDCARD",
  "subType": "UPPER",
  "title": "Type",
  "persistent": true,
  "type": "string",
  "hasList": true,
  "remarks": "What type or level of failure code is this?",
  "maxLength": 12
  },
  "orgid": {
  "searchType": "WILDCARD",
  "subType": "UPPER",
  "title": "Organization",
  "persistent": true,
  "type": "string",
  "hasList": true,
  "remarks": "Organization Identifier",
  "maxLength": 8
  },
  "failurelist": {
  "searchType": "EXACT",
  "subType": "BIGINT",
  "title": "Failure List",
  "persistent": true,
  "type": "integer",
  "remarks": "Failure List Number",
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
  },
  "type_description": {
  "type": "string"
  }
  },
  "required": [
  "orgid"
  ]
  },
  "totalPages": 1,
  "href": "oslc/os/mxapifailurelist?oslc.select=failurelist%2Cfailurecode.description--description%2Corgid%2Cparent%2Ctype%2Cfailurecode.failurecode--problemcode&oslc.pageSize=100&oslc.where=parent%3D2136&searchAttributes=failurelist%2Corgid%2Cparent%2Ctype&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
  "totalCount": 8,
  "pagenum": 1
  }
  }
 export default problemcode;

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

let worklog = {
  "member": [
  {
  "_rowstamp": "910765",
  "logtype": "CLIENTNOTE",
  "description_longdescription": "<a href=\"https://www.google.co.in/search?q=images&amp;sxsrf=ALiCzsbGKAvx7UcsxqFwPJi4-PAwOKbR0A:1656335260858&amp;source=lnms&amp;tbm=isch&amp;sa=X&amp;ved=2ahUKEwjUwujW2c34AhX86XMBHds-BBcQ_AUoAXoECAEQAw&amp;biw=1536&amp;bih=680&amp;dpr=2.5#imgrc=2nDXavJs9DoKTM\" target=\"_self\">peacock</a><img alt=\"peacock\" src=\"https://www.google.co.in/search?q=images&amp;sxsrf=ALiCzsbGKAvx7UcsxqFwPJi4-PAwOKbR0A:1656335260858&amp;source=lnms&amp;tbm=isch&amp;sa=X&amp;ved=2ahUKEwjUwujW2c34AhX86XMBHds-BBcQ_AUoAXoECAEQAw&amp;biw=1536&amp;bih=680&amp;dpr=2.5#imgrc=2nDXavJs9DoKTM\" /><!-- RICH TEXT -->",
  "localref": "oslc/os/mxapiwodetail/_QkVERk9SRC83MjEx/WOWORKLOG/0-112",
  "logtype_maxvalue": "CLIENTNOTE",
  "displayname": "Mike Wilson",
  "createdate": "2022-06-27T18:37:22+05:30",
  "clientviewable": false,
  "href": "http://childkey#V09SS09SREVSL1dPUktMT0cvMTEy",
  "logtype_description": "Client Note"
  },
  {
  "_rowstamp": "910997",
  "logtype": "CLIENTNOTE",
  "description_longdescription": "<img alt=\"Test\" src=\"https://onlinelibrary.wiley.com/cms/asset/8cf7d470-dc66-465a-9128-d989dcefffb4/anie202000936-toc-0001-m.jpg\" /><!-- RICH TEXT -->",
  "localref": "oslc/os/mxapiwodetail/_QkVERk9SRC83MjEx/WOWORKLOG/1-113",
  "logtype_maxvalue": "CLIENTNOTE",
  "displayname": "Mike Wilson",
  "createdate": "2022-06-27T18:39:39+05:30",
  "clientviewable": false,
  "href": "http://childkey#V09SS09SREVSL1dPUktMT0cvMTEz",
  "logtype_description": "Client Note"
  }
  ],
  "href": "oslc/os/mxapiwodetail/_QkVERk9SRC83MjEx/WOWORKLOG",
  "responseInfo": {
  "schema": {
  "resource": "MXAPIWODETAIL",
  "description": "WORKORDER/WORKLOG",
  "pk": [
  "worklogid"
  ],
  "title": "WORKORDER/WORKLOG",
  "type": "object",
  "$ref": "oslc/jsonschemas/mxapiwodetail/worklog",
  "properties": {
  "modifyby": {
  "searchType": "WILDCARD",
  "subType": "UPPER",
  "title": "Changed By",
  "persistent": true,
  "type": "string",
  "remarks": "Person who modified or changed",
  "maxLength": 30,
  "relation": "WOWORKLOG"
  },
  "anywhererefid": {
  "searchType": "EXACT",
  "subType": "BIGINT",
  "title": "Anywhere Ref ID",
  "persistent": true,
  "type": "integer",
  "remarks": "Anywhere Reference ID",
  "maxLength": 19,
  "relation": "WOWORKLOG"
  },
  "description_longdescription": {
  "searchType": "TEXT",
  "subType": "LONGALN",
  "title": "Details",
  "type": "string",
  "remarks": "Long description of the work log. To check spelling of text you enter, click the Long Description button next to the Summary field.",
  "maxLength": 32000,
  "relation": "WOWORKLOG"
  },
  "localref": {
  "type": "string"
  },
  "createdate": {
  "searchType": "EXACT",
  "subType": "DATETIME",
  "title": "Date",
  "persistent": true,
  "type": "string",
  "remarks": "Date on which the work log entry was created.",
  "maxLength": 10,
  "relation": "WOWORKLOG"
  },
  "description": {
  "searchType": "TEXT",
  "subType": "ALN",
  "title": "Summary",
  "persistent": true,
  "type": "string",
  "remarks": "Short description of the work log entry. To enter or view additional information, click the Long Description button.",
  "maxLength": 100,
  "relation": "WOWORKLOG"
  },
  "clientviewable": {
  "default": false,
  "searchType": "EXACT",
  "subType": "YORN",
  "title": "Viewable",
  "persistent": true,
  "type": "boolean",
  "remarks": "Specifies whether a self-service user can view this work log entry. If the Viewable? check box is selected, or there is a Y in the Viewable? field, the user can view this entry. If the Viewable? check box is cleared, or there is an N in the Viewable? field, the user cannot view this work log entry.",
  "relation": "WOWORKLOG"
  },
  "assignmentid": {
  "searchType": "EXACT",
  "subType": "BIGINT",
  "title": "Assignment",
  "persistent": true,
  "type": "integer",
  "remarks": "Assignment Idenifier",
  "maxLength": 19,
  "relation": "WOWORKLOG"
  },
  "orgid": {
  "searchType": "WILDCARD",
  "subType": "UPPER",
  "title": "Organization",
  "persistent": true,
  "type": "string",
  "remarks": "Constraint Identifier of the organization",
  "maxLength": 8,
  "relation": "WOWORKLOG"
  },
  "langcode": {
  "searchType": "WILDCARD",
  "subType": "UPPER",
  "title": "Language Code",
  "persistent": true,
  "type": "string",
  "hasList": true,
  "remarks": "Language Column",
  "maxLength": 4,
  "relation": "WOWORKLOG"
  },
  "_rowstamp": {
  "type": "string"
  },
  "createby": {
  "searchType": "WILDCARD",
  "subType": "UPPER",
  "title": "Created By",
  "persistent": true,
  "type": "string",
  "remarks": "Person that created the work log entry.",
  "maxLength": 30,
  "relation": "WOWORKLOG"
  },
  "logtype": {
  "default": "!CLIENTNOTE!",
  "searchType": "WILDCARD",
  "subType": "UPPER",
  "title": "Type",
  "persistent": true,
  "type": "string",
  "hasList": true,
  "remarks": "Type of work log entry. Enter a value or click the Select Value button.",
  "maxLength": 16,
  "relation": "WOWORKLOG"
  },
  "modifydate": {
  "searchType": "EXACT",
  "subType": "DATETIME",
  "title": "Changed Date",
  "persistent": true,
  "type": "string",
  "remarks": "Date on which Work Log changed",
  "maxLength": 10,
  "relation": "WOWORKLOG"
  },
  "logtype_maxvalue": {
  "type": "string"
  },
  "hasld": {
  "default": false,
  "searchType": "EXACT",
  "subType": "YORN",
  "title": "Has Long Description",
  "persistent": true,
  "type": "boolean",
  "remarks": "Boolean flag to indicate if there is any long description for this record",
  "relation": "WOWORKLOG"
  },
  "_imagelibref": {
  "type": "string"
  },
  "recordkey": {
  "searchType": "WILDCARD",
  "subType": "UPPER",
  "title": "Record",
  "persistent": true,
  "type": "string",
  "hasList": true,
  "remarks": "Identifies the record for the work log entry.",
  "maxLength": 10,
  "relation": "WOWORKLOG"
  },
  "assignreplocid": {
  "searchType": "EXACT",
  "subType": "BIGINT",
  "title": "Assignment",
  "persistent": true,
  "type": "integer",
  "remarks": "Assignment Idenifier",
  "maxLength": 19,
  "relation": "WOWORKLOG"
  },
  "worklogid": {
  "searchType": "EXACT",
  "subType": "BIGINT",
  "title": "WorkLog ID",
  "persistent": true,
  "type": "integer",
  "remarks": "Work Log Identifier",
  "maxLength": 19,
  "relation": "WOWORKLOG"
  },
  "href": {
  "type": "string"
  },
  "_id": {
  "type": "string"
  },
  "class": {
  "searchType": "WILDCARD",
  "subType": "UPPER",
  "title": "Class",
  "persistent": true,
  "type": "string",
  "hasList": true,
  "remarks": "Class of the record for the work log entry.",
  "maxLength": 16,
  "relation": "WOWORKLOG"
  },
  "logtype_description": {
  "type": "string"
  }
  },
  "required": [
  "class",
  "createby",
  "createdate",
  "langcode",
  "modifyby",
  "modifydate",
  "recordkey"
  ]
  },
  "totalPages": 1,
  "href": "oslc/os/mxapiwodetail/_QkVERk9SRC83MjEx/WOWORKLOG?oslc.select=createdate%2Cdescription%2Cdescription_longdescription%2Cperson.displayname--displayname%2Clogtype%2Clogtype_description%2Cclientviewable%2Canywhererefid&oslc.pageSize=100&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
  "totalCount": 15,
  "pagenum": 1
  }
  }
 export default worklog;
    
  

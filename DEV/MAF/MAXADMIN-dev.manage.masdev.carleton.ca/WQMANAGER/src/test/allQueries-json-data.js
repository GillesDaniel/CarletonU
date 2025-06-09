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

let allQueries = {
  "member": [
  {
  "ispublic": true,
  "name": "All",
  "href": "oslc/os/mxapiwodetail",
  "title": "Select all"
  },
  {
  "ispublic": true,
  "name": "UNPLANNEDWORK",
  "href": "oslc/os/mxapiwodetail?savedQuery=UNPLANNEDWORK",
  "title": "Get Unplanned Work Orders for logged in supervisor"
  },
  {
  "ispublic": true,
  "name": "WORKTOCLOSE",
  "href": "oslc/os/mxapiwodetail?savedQuery=WORKTOCLOSE",
  "title": "Get Work Orders to Close"
  },
  {
  "ispublic": true,
  "name": "uxtechnicianstatusfilteredwolist",
  "href": "oslc/os/mxapiwodetail?savedQuery=uxtechnicianstatusfilteredwolist",
  "title": "Technician Work Order list excluding CAN,CLOSED,COMPLETED work orders."
  },
  {
  "ispublic": true,
  "name": "uxtechnicianwolist",
  "href": "oslc/os/mxapiwodetail?savedQuery=uxtechnicianwolist",
  "title": "Technician Work Order list."
  },
  {
  "ispublic": true,
  "name": "APPROVEWORK",
  "href": "oslc/os/mxapiwodetail?savedQuery=APPROVEWORK",
  "title": "Approve Work Order list"
  },
  {
  "ispublic": true,
  "name": "FINDOWNERWORK",
  "href": "oslc/os/mxapiwodetail?savedQuery=FINDOWNERWORK",
  "title": "Find Owner Work Order list"
  },
  {
  "ispublic": true,
  "name": "MONITORWORK",
  "href": "oslc/os/mxapiwodetail?savedQuery=MONITORWORK",
  "title": "Monitor Work Order list"
  },
  {
  "ispublic": true,
  "name": "CLOSEWORK",
  "href": "oslc/os/mxapiwodetail?savedQuery=CLOSEWORK",
  "title": "Close Work Order list"
  },
  {
  "ispublic": true,
  "name": "CLOSEDWORK",
  "href": "oslc/os/mxapiwodetail?savedQuery=CLOSEDWORK",
  "title": "Closed Work Order list"
  },
  {
  "ispublic": true,
  "name": "uxtechnicianownerfilter",
  "href": "oslc/os/mxapiwodetail?savedQuery=uxtechnicianownerfilter",
  "title": "Match owner and ownergroup"
  },
  {
  "ispublic": true,
  "name": "ASSIGNEDWOLIST",
  "href": "oslc/os/mxapiwodetail?savedQuery=ASSIGNEDWOLIST",
  "title": "Assigned Work list excluding CAN,CLOSE,COMP,WAPPR"
  },
  {
  "ispublic": true,
  "name": "MYWORK",
  "href": "oslc/os/mxapiwodetail?savedQuery=MYWORK",
  "title": "Reported Work list excluding CAN,CLOSE and COMP"
  },
  {
  "ispublic": true,
  "name": "SUPWOTOAPPR",
  "href": "oslc/os/mxapiwodetail?savedQuery=SUPWOTOAPPR",
  "title": "Workorder list where supervisor is the user with status WAPPR"
  },
  {
  "ispublic": true,
  "name": "SUPWOTOCLOSE",
  "href": "oslc/os/mxapiwodetail?savedQuery=SUPWOTOCLOSE",
  "title": "Workorder list where status is completed"
  },
  {
  "ispublic": true,
  "name": "WOTASKS",
  "href": "oslc/os/mxapiwodetail?savedQuery=WOTASKS",
  "title": "Work Order Tasks"
  },
  {
  "ispublic": true,
  "name": "CREATEDLOCALLY",
  "href": "oslc/os/mxapiwodetail?savedQuery=CREATEDLOCALLY",
  "title": "Reported Work list excluding CAN,CLOSE and COMP"
  },
  {
  "ispublic": true,
  "name": "PMWOLIST",
  "href": "oslc/os/mxapiwodetail?savedQuery=PMWOLIST",
  "title": "Assigned Work type pm list excluding CAN,CLOSE,COMP,WAPPR"
  },
  {
  "ispublic": true,
  "name": "MOBWORKHIST",
  "href": "oslc/os/mxapiwodetail?savedQuery=MOBWORKHIST",
  "title": "Get the records of completed and closed work order"
  },
  {
  "ispublic": true,
  "name": "myNotCompletedList",
  "hasParams": true,
  "href": "oslc/os/mxapiwodetail?savedQuery=myNotCompletedList&sqp:queryName={queryName}&sqp:app={app}&sqp:owner={owner}",
  "javaMethod": true
  },
  {
  "ispublic": true,
  "name": "myCompletedList",
  "hasParams": true,
  "href": "oslc/os/mxapiwodetail?savedQuery=myCompletedList&sqp:queryName={queryName}&sqp:app={app}&sqp:owner={owner}",
  "javaMethod": true
  },
  {
  "ispublic": true,
  "name": "WOTRACK:All Work Orders",
  "href": "oslc/os/mxapiwodetail?savedQuery=WOTRACK%3AAll+Work+Orders",
  "title": "All Work Orders"
  },
  {
  "ispublic": true,
  "name": "WOTRACK:WO Class",
  "href": "oslc/os/mxapiwodetail?savedQuery=WOTRACK%3AWO+Class",
  "title": "woclass in (select value from synonymdomain where domainid = 'WOCLASS')"
  },
  {
  "ispublic": true,
  "name": "WOTRACK:Bedford Work Orders",
  "href": "oslc/os/mxapiwodetail?savedQuery=WOTRACK%3ABedford+Work+Orders",
  "title": "X"
  },
  {
  "ispublic": true,
  "name": "WOTRACK:OWNER IS ME",
  "href": "oslc/os/mxapiwodetail?savedQuery=WOTRACK%3AOWNER+IS+ME",
  "title": "My Work Orders"
  },
  {
  "ispublic": true,
  "name": "WOTRACK:Owner is Wilson",
  "href": "oslc/os/mxapiwodetail?savedQuery=WOTRACK%3AOwner+is+Wilson",
  "title": "reportedby = (select personid from person where personid = (select personid from maxuser where userid = 'WILSON'))"
  }
  ],
  "responseInfo": {
  "href": "oslc/allqueries/mxapiwodetail?&oslc.select=name%2Ctitle&oslc.pageSize=100&oslc.orderBy=%2Bname&collectioncount=1&ignorecollectionref=1&relativeuri=1&addschema=1&lean=1&internalvalues=1",
  "totalCount": 26
  }
  }
  export default allQueries;

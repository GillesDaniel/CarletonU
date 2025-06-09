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

let workorderSummary = {
  "member": [
      {
          "targstartdate": "2001-01-14T09:28:26+00:00",
          "wtypedescription": "Preventive Maintenance",
          "wostatus": [
              {
                  "changeby": "WILSON",
                  "changedate": "2022-06-02T14:02:32+00:00"
              },
              {
                  "changeby": "WILSON",
                  "changedate": "2022-06-02T14:02:19+00:00"
              },
              {
                  "changeby": "WILSON",
                  "memo": "Changes to In progress",
                  "changedate": "2022-06-21T06:52:46+00:00"
              },
              {
                  "changeby": "WILSON",
                  "memo": "Change",
                  "changedate": "2022-06-21T06:56:43+00:00"
              },
              {
                  "changeby": "WILSON",
                  "memo": "Test",
                  "changedate": "2022-06-21T11:10:37+00:00"
              }
          ],
          "description": "PM Work",
          "classstructure": {
              "description": "Engineering",
              "classificationid": "ENGINEERING"
          },
          "jpnum": "JP11430A",
          "status_maxvalue": "WAPPR",
          "_rowstamp": "9907834",
          "wosafetyplan": {},
          "assetnum": "T-B11430",
          "inspectionform": {},
          "$alias_this_attr$location": "MOLD",
          "href": "oslc/os/mxapiwodetail/_VEVYQVMvVDQxMDE2",
          "inspectionresult": {},
          "doclinks": {
              "href": "oslc/os/mxapiwodetail/_VEVYQVMvVDQxMDE2/doclinks",
              "member": []
          },
          "status_description": "Waiting on approval",
          "contract": {},
          "allowedstates": {
              "COMP": [
                  {
                      "valueid": "WOSTATUS|COMP",
                      "maxvalue": "COMP",
                      "defaults": true,
                      "description": "Completed",
                      "siteid": "",
                      "value": "COMP",
                      "orgid": ""
                  }
              ],
              "INPRG": [
                  {
                      "valueid": "WOSTATUS|INPRG",
                      "maxvalue": "INPRG",
                      "defaults": true,
                      "description": "In progress",
                      "siteid": "",
                      "value": "INPRG",
                      "orgid": ""
                  }
              ],
              "WSCH": [
                  {
                      "valueid": "WOSTATUS|WSCH",
                      "maxvalue": "WSCH",
                      "defaults": true,
                      "description": "Waiting to be scheduled",
                      "siteid": "",
                      "value": "WSCH",
                      "orgid": ""
                  }
              ],
              "CLOSE": [
                  {
                      "valueid": "WOSTATUS|CLOSE",
                      "maxvalue": "CLOSE",
                      "defaults": true,
                      "description": "Closed",
                      "siteid": "",
                      "value": "CLOSE",
                      "orgid": ""
                  }
              ],
              "WMATL": [
                  {
                      "valueid": "WOSTATUS|WMATL",
                      "maxvalue": "WMATL",
                      "defaults": true,
                      "description": "Waiting on material",
                      "siteid": "",
                      "value": "WMATL",
                      "orgid": ""
                  }
              ],
              "APPR": [
                  {
                      "valueid": "WOSTATUS|APPR",
                      "maxvalue": "APPR",
                      "defaults": true,
                      "description": "Approved",
                      "siteid": "",
                      "value": "APPR",
                      "orgid": ""
                  },
                  {
                      "valueid": "WOSTATUS|WPCOND",
                      "maxvalue": "APPR",
                      "defaults": false,
                      "description": "Waiting on plant cond",
                      "siteid": "",
                      "value": "WPCOND",
                      "orgid": ""
                  }
              ]
          },
          "worktype": "PM",
          "wonum": "T41016",
          "schedfinish": "2001-01-16T09:28:26+00:00",
          "longdescription": {},
          "schedstart": "2001-01-14T09:28:26+00:00",
          "location": {
              "description": "mold manufacture"
          },
          "targcompdate": "2001-01-16T09:28:26+00:00",
          "asset": {
              "description": "150 AMW410 MITSUBISHI MOLDING"
          },
          "pm": {},
          "jobplan": {},
          "status": "WAPPR"
      }
  ],
  "href": "oslc/os/mxapiwodetail",
  "responseInfo": {
      "totalPages": 1,
      "href": "oslc/os/mxapiwodetail?oslc.select=wonum%2Cdescription%2Callowedstates%2CcomputedStates%2Crel.wostatus%7Bmemo%2Cchangeby%2Cchangedate%7D%2Cstatus%2Cowner%2Cschedstart%2Cschedfinish%2Ctargstartdate%2Ctargcompdate%2Cfailurecode%2Cproblemcode%2Cglaccount%2Cassetnum%2Clocation%2Cpmnum%2Cjpnum%2Csafetyplanid%2Ccontract%2Cinspformnum%2Cworktype%2Cpriority%2Creportedby%2Cparent%2Cworktype.wtypedesc--wtypedescription%2Casset.description%2Clocation.description%2Cpm.description%2Cjobplan.description%2Cwosafetyplan.description%2Ccontract.contractnum%2Cinspectionform.name%2Cclassstructure.description%2Cinspectionresult.resultnum%2Cclassstructure.classificationid%2Cdoclinks%7B*%7D%2Cparent.description--parentdesc%2Casset.geometry%2Casset._imagelibref%2Clongdescription.ldtext&oslc.pageSize=40&oslc.where=wonum%3D%22T41016%22&collectioncount=1&ignorecollectionref=1&relativeuri=1&lean=1&internalvalues=1",
      "totalCount": 1,
      "pagenum": 1
  }
}
 export default workorderSummary;
    
  

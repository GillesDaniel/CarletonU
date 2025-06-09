/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020,2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/* eslint-disable max-lines */
/* eslint-disable camelcase */
let data = {
  "href": "http://localhost:7001/maximo/oslc/members/OS42Ny4xODIuMTcyL01YU2VydmVy/oscache",
  "osDetailOrphans": {
    "member": [
      {
        "problemDefinition": "Record exists in MAXINTOBJDETAIL table but missing in Maximo DD (MAXOBJECT)",
        "objectStructureName": "MXAPIITEM",
        "objectName": "ITEM1",
        "probableResolution": "delete from maxintobject,maxintobjdetail,maxintobjcols,maxintobjalias,maxintobjapp where intobjectname = 'MXAPIITEM'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJDETAIL table but missing in Maximo DD (MAXOBJECT)",
        "objectStructureName": "MXITEM1",
        "objectName": "ITEM1",
        "probableResolution": "delete from maxintobject,maxintobjdetail,maxintobjcols,maxintobjalias,maxintobjapp where intobjectname = 'MXITEM1'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJDETAIL table but missing in Maximo DD (MAXOBJECT)",
        "objectStructureName": "MXITEMPARTIUM",
        "objectName": "ITEM1",
        "probableResolution": "delete from maxintobject,maxintobjdetail,maxintobjcols,maxintobjalias,maxintobjapp where intobjectname = 'MXITEMPARTIUM'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJDETAIL table but missing in Maximo DD (MAXOBJECT)",
        "objectStructureName": "REP_ASSET",
        "objectName": "ITEM1",
        "probableResolution": "delete from maxintobject,maxintobjdetail,maxintobjcols,maxintobjalias,maxintobjapp where intobjectname = 'REP_ASSET'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJDETAIL table but missing in Maximo DD (MAXOBJECT)",
        "objectStructureName": "REP_ASSETACTIVITY",
        "objectName": "ITEM1",
        "probableResolution": "delete from maxintobject,maxintobjdetail,maxintobjcols,maxintobjalias,maxintobjapp where intobjectname = 'REP_ASSETACTIVITY'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJDETAIL table but missing in Maximo DD (MAXOBJECT)",
        "objectStructureName": "REP_ITEM",
        "objectName": "ITEM1",
        "probableResolution": "delete from maxintobject,maxintobjdetail,maxintobjcols,maxintobjalias,maxintobjapp where intobjectname = 'REP_ITEM'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJDETAIL table but missing in Maximo DD (MAXOBJECT)",
        "objectStructureName": "REP_PO",
        "objectName": "ITEM1",
        "probableResolution": "delete from maxintobject,maxintobjdetail,maxintobjcols,maxintobjalias,maxintobjapp where intobjectname = 'REP_PO'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJDETAIL table but missing in Maximo DD (MAXOBJECT)",
        "objectStructureName": "REP_WOPLANACT",
        "objectName": "ITEM1",
        "probableResolution": "delete from maxintobject,maxintobjdetail,maxintobjcols,maxintobjalias,maxintobjapp where intobjectname = 'REP_WOPLANACT'"
      }
    ]
  },
  "osDetailsNoHeader": {
    "member": [
      {
        "problemDefinition": "Record exists in MAXINTOBJDETAIL table but missing in MAXINTOBJECT",
        "objectStructureName": "MXITEM1",
        "probableResolution": "delete from maxintobjdetail,maxintobjcols,maxintobjalias where intobjectname = 'MXITEM1'"
      }
    ]
  },
  "osHeaderNoDetails": {
    "member": [
      {
        "problemDefinition": "Record exists in MAXINTOBJECT table but missing in MAXINTOBJDETAIL",
        "objectStructureName": "MXITEM",
        "probableResolution": "delete from maxintobject where intobjectname = 'MXITEM'"
      }
    ]
  },
  "osNoPrimaryObject": {
    "member": [
      {
        "problemDefinition": "Record exists in MAXINTOBJECT table but MAXINTOBJDETAIL missing primary object (parentobjid = 0)",
        "objectStructureName": "MXITEM",
        "probableResolution": "delete from maxintobject,maxintobjdetail,maxintobjcols,maxintobjalias,maxintobjapp where intobjectname = 'MXITEM'"
      }
    ]
  },
  "osColsOrphans": {
    "member": [
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in Maximo DD (MAXATTRIBUTE)",
        "objectStructureName": "MXAPICNTBOOKLINE",
        "objectName": "COUNTBOOKLINE",
        "attributenameName": "HASLD",
        "probableResolution": "delete from maxintobjcols where name = 'HASLD' and objectname = 'COUNTBOOKLINE'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in Maximo DD (MAXATTRIBUTE)",
        "objectStructureName": "MXAPICNTBOOKLINE",
        "objectName": "COUNTBOOKLINE",
        "attributenameName": "LANGCODE",
        "probableResolution": "delete from maxintobjcols where name = 'LANGCODE' and objectname = 'COUNTBOOKLINE'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in Maximo DD (MAXATTRIBUTE)",
        "objectStructureName": "MXAPIKPIHISTORY",
        "objectName": "KPIHISTORY",
        "attributenameName": "HASLD",
        "probableResolution": "delete from maxintobjcols where name = 'HASLD' and objectname = 'KPIHISTORY'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in Maximo DD (MAXATTRIBUTE)",
        "objectStructureName": "MXAPIKPIHISTORY",
        "objectName": "KPIHISTORY",
        "attributenameName": "LANGCODE",
        "probableResolution": "delete from maxintobjcols where name = 'LANGCODE' and objectname = 'KPIHISTORY'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in Maximo DD (MAXATTRIBUTE)",
        "objectStructureName": "MXAPISKDPROJECT",
        "objectName": "SKDOPASCPSKPI",
        "attributenameName": "HASLD",
        "probableResolution": "delete from maxintobjcols where name = 'HASLD' and objectname = 'SKDOPASCPSKPI'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in Maximo DD (MAXATTRIBUTE)",
        "objectStructureName": "MXAPISKDPROJECT",
        "objectName": "SKDOPASCPSKPI",
        "attributenameName": "LANGCODE",
        "probableResolution": "delete from maxintobjcols where name = 'LANGCODE' and objectname = 'SKDOPASCPSKPI'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in Maximo DD (MAXATTRIBUTE)",
        "objectStructureName": "MXAPISKDPROJECT",
        "objectName": "SKDOPASCPSSTATUS",
        "attributenameName": "HASLD",
        "probableResolution": "delete from maxintobjcols where name = 'HASLD' and objectname = 'SKDOPASCPSSTATUS'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in Maximo DD (MAXATTRIBUTE)",
        "objectStructureName": "MXAPISKDPROJECT",
        "objectName": "SKDOPASCPSSTATUS",
        "attributenameName": "LANGCODE",
        "probableResolution": "delete from maxintobjcols where name = 'LANGCODE' and objectname = 'SKDOPASCPSSTATUS'"
      }
    ]
  },
  "osColsNoDetails": {
    "member": [
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in MAXINTOBJDETAIL",
        "objectStructureName": "AHEAMWODETAIL",
        "objectName": "EXTERNALEAMSR",
        "probableResolution": "delete from maxintobjcols where intobjectname = 'AHEAMWODETAIL' and objectname = 'EXTERNALEAMSR'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in MAXINTOBJDETAIL",
        "objectStructureName": "MHOPERLOC",
        "objectName": "LOCATIONUSERCUST",
        "probableResolution": "delete from maxintobjcols where intobjectname = 'MHOPERLOC' and objectname = 'LOCATIONUSERCUST'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in MAXINTOBJDETAIL",
        "objectStructureName": "MXAMCREW",
        "objectName": "AMCTCRAFT",
        "probableResolution": "delete from maxintobjcols where intobjectname = 'MXAMCREW' and objectname = 'AMCTCRAFT'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in MAXINTOBJDETAIL",
        "objectStructureName": "MXAPIITEM",
        "objectName": "ITEM",
        "probableResolution": "delete from maxintobjcols where intobjectname = 'MXAPIITEM' and objectname = 'ITEM'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in MAXINTOBJDETAIL",
        "objectStructureName": "MXITEM",
        "objectName": "ITEM",
        "probableResolution": "delete from maxintobjcols where intobjectname = 'MXITEM' and objectname = 'ITEM'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in MAXINTOBJDETAIL",
        "objectStructureName": "MXITEM",
        "objectName": "ITEMCONDITION",
        "probableResolution": "delete from maxintobjcols where intobjectname = 'MXITEM' and objectname = 'ITEMCONDITION'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in MAXINTOBJDETAIL",
        "objectStructureName": "MXITEMPARTIUM",
        "objectName": "ITEM",
        "probableResolution": "delete from maxintobjcols where intobjectname = 'MXITEMPARTIUM' and objectname = 'ITEM'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in MAXINTOBJDETAIL",
        "objectStructureName": "REP_AMCREW",
        "objectName": "AMCTCRAFT",
        "probableResolution": "delete from maxintobjcols where intobjectname = 'REP_AMCREW' and objectname = 'AMCTCRAFT'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in MAXINTOBJDETAIL",
        "objectStructureName": "REP_ASSET",
        "objectName": "ITEM",
        "probableResolution": "delete from maxintobjcols where intobjectname = 'REP_ASSET' and objectname = 'ITEM'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in MAXINTOBJDETAIL",
        "objectStructureName": "REP_ASSETACTIVITY",
        "objectName": "ITEM",
        "probableResolution": "delete from maxintobjcols where intobjectname = 'REP_ASSETACTIVITY' and objectname = 'ITEM'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in MAXINTOBJDETAIL",
        "objectStructureName": "REP_ITEM",
        "objectName": "ITEM",
        "probableResolution": "delete from maxintobjcols where intobjectname = 'REP_ITEM' and objectname = 'ITEM'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in MAXINTOBJDETAIL",
        "objectStructureName": "REP_PO",
        "objectName": "ITEM",
        "probableResolution": "delete from maxintobjcols where intobjectname = 'REP_PO' and objectname = 'ITEM'"
      },
      {
        "problemDefinition": "Record exists in MAXINTOBJCOLS table but missing in MAXINTOBJDETAIL",
        "objectStructureName": "REP_WOPLANACT",
        "objectName": "ITEM",
        "probableResolution": "delete from maxintobjcols where intobjectname = 'REP_WOPLANACT' and objectname = 'ITEM'"
      }
    ]
  },
  "osEntServiceNoInt": {
    "member": [
      {
        "problemDefinition": "Enterprise Services defined in the MAXIFACEIN table uses a valid Intobjectname value (MAXINTOBJECT)",
        "enterpriseService": "MXITEMInterface",
        "objectStructureName": "MXITEM2",
        "probableResolution": "delete from maxifacein where intobjectname MXITEM2'"
      }
    ]
  },
  "osExtSystemNoEntService": {
    "member": [
      {
        "problemDefinition": "Verify that the Enterprise Services deployed to an External System is a valid Enterprise Service",
        "enterpriseService": "MXITEMInterface2",
        "externalSystem": "EXTSYS1",
        "probableResolution": "delete from maxextifacein where ifacename MXITEMInterface2' and extsysname = 'EXTSYS1'"
      }
    ]
  },
  "osPubChannelNoInt": {
    "member": [
      {
        "problemDefinition": "Publish Channel defined in the MAXIFACEIN table uses a valid Intobjectname value (MAXINTOBJECT)",
        "publishChannel": "MXITEMInterface",
        "objectStructureName": "MXITEM2",
        "probableResolution": "delete from maxifaceout where intobjectname MXITEM2'"
      }
    ]
  },
  "osExtSystemNoPubChannel": {
    "member": [
      {
        "problemDefinition": "Verify that the Publish Channel deployed to an External System is a valid Publish Channel",
        "enterpriseService": "MXITEMInterface2",
        "externalSystem": "EXTSYS1",
        "probableResolution": "delete from maxextifaceout where ifacename MXITEMInterface2' and extsysname = 'EXTSYS1'"
      }
    ]
  }
};

export default data;

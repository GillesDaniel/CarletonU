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

let createWorkQueue = {
  "$langcode_meta": {
      "required": true
  },
  "$clausename_meta": {
      "required": true
  },
  "uniquecolumnname": "WORKORDERID",
  "isactive": true,
  "$owner_meta": {
      "required": true
  },
  "$intobjectname_meta": {
      "required": true
  },
  "$queuename_meta": {
      "required": true
  },
  "$workqueueid_meta": {
      "required": true
  },
  "intobjectname": "MXAPIWODETAIL",
  "app":"WOTRACK",
  "workqueueid": 5,
  "isactive":"1",
  "langcode": "EN",
  "$queuetype_meta": {
      "required": true
  },
  "$isactive_meta": {
      "required": true
  }
};
 export default createWorkQueue;

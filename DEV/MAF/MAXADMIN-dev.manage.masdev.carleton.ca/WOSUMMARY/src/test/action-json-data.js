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

let action = {
  "nodetype": "INPUT",
  "internalnodetype": "WFINPUT",
  "member": [
      {
          "wfactionid": 845,
          "sequence": 1,
          "ownernodeid": 9,
          "membernodeid": 4,
          "instruction": "Send to  Regional Supervisor",
          "processname": "WORKORDER",
          "actionid": 7,
          "href": "null/0-845",
          "ispositive": true,
          "processrev": 6
      },
      {
          "wfactionid": 848,
          "sequence": 2,
          "ownernodeid": 9,
          "membernodeid": 10,
          "instruction": "INPUT 10",
          "processname": "WORKORDER",
          "actionid": 17,
          "href": "null/1-848",
          "ispositive": true,
          "processrev": 6
      }
  ],
  "responseInfo": {
      "href": "oslc/os/mxapiwfassignment/_ODYxLzMvV09SS09SREVSLzYvNDA5?action=wsmethod%3AcompleteAssignment&interactive=1&lean=1&relativeuri=1&internalvalues=1",
      "totalCount": 2
  },
  "responseHeaders": {
      "location": "oslc/wf/mxapiwfassignment_54967"
  }
};
  
  export default action;
  

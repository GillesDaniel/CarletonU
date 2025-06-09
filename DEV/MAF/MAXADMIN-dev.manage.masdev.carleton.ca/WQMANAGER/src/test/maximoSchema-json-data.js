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

let maximoSchema = {
  "member": [
    {
      "resource": "MXAPIWODETAIL",
      "description": "Maximo API for Work Orders with Plans and Reservations",
      "pk": [
        "siteid",
        "wonum"
      ],
      "title": "WORKORDER",
      "type": "object",
      "$ref": "oslc/jsonschemas/mxapiwodetail",
      "properties": {
        "parent": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Parent WO",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Parent of the work order shown in the Work Order field. When this field is blank, the work order in the Work Order field is a top-level work order. To assign a work order to a parent, select Assign to New Parent from the Select Action menu.",
          "maxLength": 25
        },
        "localref": {
          "type": "string"
        },
        "aos": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Requires Asset Downtime",
          "persistent": true,
          "type": "boolean",
          "remarks": "Indicates that the work cannot be performed while the asset is operating."
        },
        "estservcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Estimated Service Cost",
          "persistent": true,
          "type": "number",
          "remarks": "Total estimated service cost against this work order.",
          "maxLength": 11
        },
        "pluscismobile": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Is Mobile",
          "persistent": true,
          "type": "boolean",
          "remarks": "Workorder was added by mobile"
        },
        "wolablnk": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Labor",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Labor Code Link",
          "maxLength": 8
        },
        "pluscfrequency": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "INTEGER",
          "title": "Frequency Field",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Number of time units (days, weeks, months, or years) to elapse between work orders you generate from this PM. The count begins at the value in the Last Target Start Date (if Use Target Start? is selected or Last Completion Date (if Use Target Start? is not the selected field. This value may differ differ from the Regulatory Frequency to facilitate scheduling. For example, a regulatory frequency of 31 days may have a frequency of 28 days.",
          "maxLength": 11
        },
        "ownergroup": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Owner Group",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The group currently responsible for the work order.",
          "maxLength": 8
        },
        "assetlocpriority": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "INTEGER",
          "title": "Asset/Location Priority",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Identifies the priority level copied from the asset or location record and used to schedule the work order. Values from 0-999 are valid, but we recommend limiting your range of values to 0-9, where 0 designates the lowest priority. We also recommend assigning priority values only to locations. Entering a value will update the CalcPriority field according to the calculation option in the PriCalc table. MAXIMO uses this value to update the Respond By date.",
          "maxLength": 11
        },
        "calcshift": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Shift",
          "persistent": true,
          "type": "string",
          "remarks": "Along with the calculation calendar, sets the business hours that calculate the Target Contact, Target Response, and Target Resolution dates on a ticket or work order. Click the Select Value button to choose a shift.",
          "maxLength": 8
        },
        "workpackmtlstatus": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Work Package Material Status",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The availability status of all materials on the current work order and related child records. The status is determined by the planned materials on a work order. The completion of the child records does not always determine the overall status of the materials in the work package.",
          "maxLength": 20
        },
        "wol4": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Wol4",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "istask": {
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Is Task",
          "persistent": true,
          "type": "boolean",
          "remarks": "Specifies whether the work order is a task. If the check box is selected, the work order is a task. If the check box is cleared, the work order is not a task."
        },
        "storeroommtlstatus_description": {
          "type": "string"
        },
        "estatapprmatcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Estimated Material Cost at Approval",
          "persistent": true,
          "type": "number",
          "remarks": "Cost estimate of the work order's material at the time the work order was approved.",
          "maxLength": 11
        },
        "flowaction": {
          "searchType": "EXACT",
          "subType": "UPPER",
          "title": "Flow Action",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The action to be performed (if any) when the workorder is started via process flow control",
          "maxLength": 30
        },
        "taskid": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "INTEGER",
          "title": "Task",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Identifies the task.",
          "maxLength": 11
        },
        "commlog": {
          "objectName": "COMMLOG",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/COMMLOG",
            "pk": [
              "commlogid"
            ],
            "title": "WORKORDER/COMMLOG",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/commlog",
            "properties": {
              "cc": {
                "searchType": "WILDCARD",
                "subType": "CLOB",
                "title": "cc",
                "persistent": true,
                "type": "string",
                "remarks": "cc'ed recipient of communication.",
                "maxLength": 999999,
                "relation": "COMMLOG"
              },
              "bcc": {
                "searchType": "WILDCARD",
                "subType": "CLOB",
                "title": "bcc",
                "persistent": true,
                "type": "string",
                "remarks": "bcc'ed recipients of communication.",
                "maxLength": 999999,
                "relation": "COMMLOG"
              },
              "sendto": {
                "searchType": "WILDCARD",
                "subType": "CLOB",
                "title": "To",
                "persistent": true,
                "type": "string",
                "remarks": "Single/multiple Recipient of the Communication",
                "maxLength": 999999,
                "relation": "COMMLOG"
              },
              "localref": {
                "type": "string"
              },
              "inbound": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Inbound",
                "persistent": true,
                "type": "boolean",
                "remarks": "Is communication inbound or outbound?",
                "relation": "COMMLOG"
              },
              "subject": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Subject",
                "persistent": true,
                "type": "string",
                "remarks": "Subject of the communication",
                "maxLength": 254,
                "relation": "COMMLOG"
              },
              "createdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Date",
                "persistent": true,
                "type": "string",
                "remarks": "Creation Date",
                "maxLength": 10,
                "relation": "COMMLOG"
              },
              "commloguid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "COMMLOGUID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Identifier",
                "maxLength": 11,
                "relation": "COMMLOG"
              },
              "message": {
                "searchType": "NONE",
                "subType": "CLOB",
                "title": "Message",
                "persistent": true,
                "type": "string",
                "remarks": "Message body for Commlog",
                "maxLength": 999999,
                "relation": "COMMLOG"
              },
              "ownerid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Owner ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique id of owner record",
                "maxLength": 11,
                "relation": "COMMLOG"
              },
              "ownertable": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Owner Table",
                "persistent": true,
                "type": "string",
                "remarks": "Table name of the owner record",
                "maxLength": 30,
                "relation": "COMMLOG"
              },
              "issendfail": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Send Failed",
                "persistent": true,
                "type": "boolean",
                "remarks": "Flag to track emails that failed",
                "relation": "COMMLOG"
              },
              "sendfrom": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Send From",
                "persistent": true,
                "type": "string",
                "remarks": "From address of the Communication",
                "maxLength": 100,
                "relation": "COMMLOG"
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
                "remarks": "Creator of the Communication Log",
                "maxLength": 100,
                "relation": "COMMLOG"
              },
              "commlogid": {
                "default": "&AUTOKEY&",
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Communication ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Communication Log Identifier",
                "maxLength": 11,
                "relation": "COMMLOG"
              },
              "_imagelibref": {
                "type": "string"
              },
              "orgobject": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Originating Object",
                "persistent": true,
                "type": "string",
                "remarks": "Application that is generating the communication",
                "maxLength": 30,
                "relation": "COMMLOG"
              },
              "replyto": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Reply To",
                "persistent": true,
                "type": "string",
                "remarks": "Reply to email address",
                "maxLength": 100,
                "relation": "COMMLOG"
              },
              "href": {
                "type": "string"
              },
              "_id": {
                "type": "string"
              },
              "keepfailed": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Keep Failed Message",
                "persistent": true,
                "type": "boolean",
                "remarks": "Should failed message be deleted",
                "relation": "COMMLOG"
              },
              "doclinks": {
                "objectName": "DOCLINKS",
                "type": "array",
                "items": {
                  "subType": "DOCLINKS",
                  "type": "object",
                  "properties": {
                    "member": {
                      "type": "array",
                      "items": {
                        "definition": {
                          "subSchema": {
                            "$ref": "oslc/jsonschemas/mxapiwodetail/commlog/doclinks/attachment"
                          }
                        },
                        "type": "object"
                      }
                    }
                  }
                },
                "cardinality": "UNDEFINED",
                "relation": "DOCLINKS"
              },
              "uniqueid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Unique ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "UID of the originating objec",
                "maxLength": 11,
                "relation": "COMMLOG"
              }
            },
            "required": [
              "createby",
              "createdate",
              "inbound",
              "ownerid",
              "ownertable",
              "sendfrom"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "COMMLOG"
        },
        "pcpchangeby": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Physical percent complete - Who last changed",
          "persistent": true,
          "type": "string",
          "remarks": "Physical percent complete - Who last changed",
          "maxLength": 100
        },
        "wopriority": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "INTEGER",
          "title": "Priority",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Identifies the importance of the work order, from 0-999, where 0 is the lowest priority and 999 is the highest.",
          "maxLength": 11
        },
        "pluscloop": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Loop Calibration",
          "persistent": true,
          "type": "boolean",
          "remarks": "Select this check box to identify the work order as a loop calibration. May be selected when a value is entered in the Location field."
        },
        "wol3": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Wol3",
          "persistent": true,
          "type": "number",
          "remarks": "Extra Field",
          "maxLength": 11
        },
        "wol2": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Wol2",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "actmatcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Actual Material Cost",
          "persistent": true,
          "type": "number",
          "remarks": "Actual Material Cost",
          "maxLength": 11
        },
        "generatedforpo": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "PO",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Work order for PO",
          "maxLength": 8
        },
        "wol1": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Wol1",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "fnlconstraint": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Finish No Later Than",
          "persistent": true,
          "type": "string",
          "remarks": "The date that work should be completed by.  Scheduled dates should be before this date.",
          "maxLength": 10
        },
        "nestedjpinprocess": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Nested Job Plan Processing",
          "persistent": true,
          "type": "boolean",
          "remarks": "Record will be locked while the jobplan containing nested jobplans is in the process of being applied to the record."
        },
        "estatapprtoolcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Estimated Tool Cost at Approval",
          "persistent": true,
          "type": "number",
          "remarks": "Cost estimate of the work order's tools at the time the work order was approved.",
          "maxLength": 11
        },
        "hasfollowupwork": {
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Has Follow-up Work",
          "persistent": true,
          "type": "boolean",
          "remarks": "Specifies whether the work order has follow up work. If the check box is selected, there is follow up work. If the check box is cleared (the default), there is no follow up work."
        },
        "route": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Route",
          "persistent": true,
          "type": "string",
          "remarks": "add route field",
          "maxLength": 8
        },
        "pmnum": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "PM",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the preventive maintenance record from which the work order was generated.",
          "maxLength": 8
        },
        "flowactionassist": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Flow Action Assist",
          "persistent": true,
          "type": "boolean",
          "remarks": "Suppresses the automatic firing of the action in flow control"
        },
        "ignorediavail": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Ignore Direct Issue Availability For Work Order Status",
          "persistent": true,
          "type": "boolean",
          "remarks": "Indicates whether to ignore the availability of direct issues for the work order status approval."
        },
        "pcacthrs": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "INTEGER",
          "title": "Percent complete by actual hours",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Specifies the percent complete as calculated by actual hours vs. planned hours.",
          "maxLength": 11
        },
        "fincntrlid": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "FCID",
          "persistent": true,
          "type": "string",
          "remarks": "Financial Control Identifier",
          "maxLength": 8
        },
        "amcrew": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Crew",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Defines the Crew who will be copied to the work order created with this job plan.",
          "maxLength": 8
        },
        "launchentryname": {
          "searchType": "EXACT",
          "subType": "UPPER",
          "title": "Launch Entry Name",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Launch Entry",
          "maxLength": 32
        },
        "plussfeatureclass": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Feature Class",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the GIS feature class that is linked to the work order.",
          "maxLength": 100
        },
        "pointnum": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Measurement Point",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The point number on the asset from which the measurement is taken.",
          "maxLength": 8
        },
        "pluscfrequnit_description": {
          "type": "string"
        },
        "commodity": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Service",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Defines the service for the work order, for example: customer support, painting, print, telecommunications, and welding.",
          "maxLength": 8
        },
        "pluscfrequnit": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Frequency Unit",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Defines the time units (days, weeks, months, or years) for the Frequency field on time-based PMs.",
          "maxLength": 8
        },
        "estlabhrs": {
          "searchType": "EXACT",
          "scale": 0,
          "subType": "DURATION",
          "title": "Estimated Labor Hours",
          "persistent": true,
          "type": "number",
          "remarks": "Estimated Labor Hours",
          "maxLength": 8
        },
        "tooltrans": {
          "objectName": "TOOLTRANS",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/TOOLTRANS",
            "pk": [
              "siteid",
              "itemnum",
              "tooltransid"
            ],
            "title": "WORKORDER/TOOLTRANS",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/tooltrans",
            "properties": {
              "plusclotnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Manufacturer Lot",
                "persistent": true,
                "type": "string",
                "remarks": "Enter the lot number that the solution came from.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALTOOL"
              },
              "rotassetsite": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Rotating Equipment Site ID",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Rotating Equipment Site Identifier",
                "maxLength": 8,
                "relation": "UXSHOWACTUALTOOL"
              },
              "ownersysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Owner System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Owner System ID",
                "maxLength": 10,
                "relation": "UXSHOWACTUALTOOL"
              },
              "localref": {
                "type": "string"
              },
              "externalrefid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "External Reference ID",
                "persistent": true,
                "type": "string",
                "remarks": "External Reference ID",
                "maxLength": 10,
                "relation": "UXSHOWACTUALTOOL"
              },
              "plusccomment": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Tool Comment Field",
                "persistent": true,
                "type": "string",
                "remarks": "Enter a comment about the tool.",
                "maxLength": 250,
                "relation": "UXSHOWACTUALTOOL"
              },
              "gldebitacct": {
                "searchType": "WILDCARD",
                "subType": "GL",
                "title": "GL Debit Account",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "General Ledger account to debit for the cost of the tool. The default value can come from the work order's GL account (which may have defaulted from an associated PM), the tool GL account, or both. The work order must be approved before you can insert a value in this field. You can modify this field until you save the record.",
                "maxLength": 23,
                "relation": "UXSHOWACTUALTOOL"
              },
              "plusctype": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Type",
                "persistent": true,
                "type": "string",
                "remarks": "Type of Buffer Solution",
                "maxLength": 30,
                "relation": "UXSHOWACTUALTOOL"
              },
              "rollup": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Rolled Up",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates whether this transaction has been rolled up.",
                "relation": "UXSHOWACTUALTOOL"
              },
              "langcode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Language Code",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Language Code",
                "maxLength": 4,
                "relation": "UXSHOWACTUALTOOL"
              },
              "_rowstamp": {
                "type": "string"
              },
              "exchangerate2": {
                "searchType": "EXACT",
                "scale": 7,
                "subType": "DECIMAL",
                "title": "Secondary Exchange Rate",
                "persistent": true,
                "type": "number",
                "remarks": "Base Exchange Rate 2",
                "maxLength": 15,
                "relation": "UXSHOWACTUALTOOL"
              },
              "pluscduedate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Due Date",
                "persistent": true,
                "type": "string",
                "remarks": "Plus Cal - Tool Due Date",
                "maxLength": 10,
                "relation": "UXSHOWACTUALTOOL"
              },
              "plusctoolusedate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "PLUSCTOOLUSEDATE",
                "persistent": true,
                "type": "string",
                "remarks": "The date on which this tool was actually used to perform work on this workorder",
                "maxLength": 10,
                "relation": "UXSHOWACTUALTOOL"
              },
              "plusctechnician": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Qualified Technician",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Qualified Technician",
                "maxLength": 100,
                "relation": "UXSHOWACTUALTOOL"
              },
              "toolqty": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Quantity",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Quantity of the tool used on the work order.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALTOOL"
              },
              "toolrate": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Rate",
                "persistent": true,
                "type": "number",
                "remarks": "Rate per hour for the tool.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALTOOL"
              },
              "_imagelibref": {
                "type": "string"
              },
              "assetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Asset",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the asset on which work was done.",
                "maxLength": 25,
                "relation": "UXSHOWACTUALTOOL"
              },
              "pluscmanufacturer": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Manufacturer",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Manufacturer of the Buffer Solution",
                "maxLength": 12,
                "relation": "UXSHOWACTUALTOOL"
              },
              "toolhrs": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Tool Hours",
                "persistent": true,
                "type": "number",
                "remarks": "Number of hours the tool was used on the work order.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALTOOL"
              },
              "href": {
                "type": "string"
              },
              "financialperiod": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Financial Period",
                "persistent": true,
                "type": "string",
                "remarks": "Financial period in a format corresponding to that required by the accounting system.",
                "maxLength": 6,
                "relation": "UXSHOWACTUALTOOL"
              },
              "refwo": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Work Order",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Referenced Work Order",
                "maxLength": 25,
                "relation": "UXSHOWACTUALTOOL"
              },
              "rotassetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Rotating Asset",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the rotating asset on which work was done.",
                "maxLength": 25,
                "relation": "UXSHOWACTUALTOOL"
              },
              "taskid": {
                "searchType": "NONE",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Task",
                "type": "integer",
                "minimum": -2147483648,
                "hasList": true,
                "remarks": "TASKID",
                "maxLength": 11,
                "relation": "UXSHOWACTUALTOOL"
              },
              "enteredastask": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Entered as Task",
                "persistent": true,
                "type": "boolean",
                "remarks": "Was this transaction created against a work order task?",
                "relation": "UXSHOWACTUALTOOL"
              },
              "linecost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Line Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Actual cost of the tool for the operation. Maximo calculates this using the following formula: Quantity x (hours) x (rate).",
                "maxLength": 11,
                "relation": "UXSHOWACTUALTOOL"
              },
              "tooltransid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "TOOLTRANSID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Identifier",
                "maxLength": 11,
                "relation": "UXSHOWACTUALTOOL"
              },
              "anywhererefid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Anywhere Ref ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Anywhere Reference ID",
                "maxLength": 11,
                "relation": "UXSHOWACTUALTOOL"
              },
              "enterdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Entered Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date the tool use information was entered.",
                "maxLength": 10,
                "relation": "UXSHOWACTUALTOOL"
              },
              "glcreditacct": {
                "searchType": "WILDCARD",
                "subType": "GL",
                "title": "GL Credit Account",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "General Ledger account to credit for the cost of the tool. The default value is the control account for the tool. The work order must be approved before you can insert or edit the value.You can modify this field until you save the record.",
                "maxLength": 23,
                "relation": "UXSHOWACTUALTOOL"
              },
              "transdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Transaction Date",
                "persistent": true,
                "type": "string",
                "remarks": "Timestamp - Key To Table",
                "maxLength": 10,
                "relation": "UXSHOWACTUALTOOL"
              },
              "sendersysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Sender System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Column used by ERP-Integration (APIs)",
                "maxLength": 50,
                "relation": "UXSHOWACTUALTOOL"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Organization Identifier",
                "maxLength": 8,
                "relation": "UXSHOWACTUALTOOL"
              },
              "itemnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Tool",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the tool used for the work.",
                "maxLength": 30,
                "relation": "UXSHOWACTUALTOOL"
              },
              "enterby": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Entered By",
                "persistent": true,
                "type": "string",
                "remarks": "Person who entered the tool information. Once the work order is approved, you can modify the field until the record is saved.",
                "maxLength": 100,
                "relation": "UXSHOWACTUALTOOL"
              },
              "toolsq": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Tool Sequence",
                "persistent": true,
                "type": "string",
                "remarks": "Tool Sequence.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALTOOL"
              },
              "hasld": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Has Long Description",
                "persistent": true,
                "type": "boolean",
                "remarks": "Boolean flag to indicate if there is any long description for this record",
                "relation": "UXSHOWACTUALTOOL"
              },
              "outside": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Outside",
                "persistent": true,
                "type": "boolean",
                "remarks": "Specifies whether the tool is supplied by an outside vendor. If the check box is cleared (the default), the tool is internal. If the check box is selected, the tool is supplied by an outside vendor.",
                "relation": "UXSHOWACTUALTOOL"
              },
              "fincntrlid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "FCID",
                "persistent": true,
                "type": "string",
                "remarks": "Financial Control Identifier",
                "maxLength": 8,
                "relation": "UXSHOWACTUALTOOL"
              },
              "amcrew": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the crew that performed the work.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALTOOL"
              },
              "itemsetid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Item Set Id",
                "persistent": true,
                "type": "string",
                "remarks": "Item Set Identifier",
                "maxLength": 8,
                "relation": "UXSHOWACTUALTOOL"
              },
              "linecost2": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Secondary Line Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Base Currency Line Cost 2.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALTOOL"
              },
              "location": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Location",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the location of the asset or the location where work was done.",
                "maxLength": 12,
                "relation": "UXSHOWACTUALTOOL"
              },
              "pluscexpirydate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Expiry Date",
                "persistent": true,
                "type": "string",
                "remarks": "Enter an expiry date for the solution used.",
                "maxLength": 10,
                "relation": "UXSHOWACTUALTOOL"
              },
              "_id": {
                "type": "string"
              },
              "sourcesysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Source System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Source System ID",
                "maxLength": 10,
                "relation": "UXSHOWACTUALTOOL"
              }
            },
            "required": [
              "enterby",
              "enterdate",
              "enteredastask",
              "itemnum",
              "itemsetid",
              "langcode",
              "linecost",
              "orgid",
              "outside",
              "rollup",
              "toolhrs",
              "toolqty",
              "toolrate",
              "transdate"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "UXSHOWACTUALTOOL"
        },
        "assignedownergroup": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Assigned Owner Group",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Assigned Owner Group of the workorder record. This group has overall responsibility for the solution. Use the Select Action menu to assign an owner group. You can enter a value either in this field or the Owner field.",
          "maxLength": 8
        },
        "autolocate": {
          "searchType": "NONE",
          "subType": "CLOB",
          "title": "Formatted Geometry",
          "type": "string",
          "remarks": "String representation of the record geometry",
          "maxLength": 999999
        },
        "dirissuemtlstatus_description": {
          "type": "string"
        },
        "pluscoverduedate": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Calibration Overdue Date",
          "persistent": true,
          "type": "string",
          "remarks": "Displays the over due date for the calibration, if the work order is not completed.",
          "maxLength": 10
        },
        "workpackmtlstatus_description": {
          "type": "string"
        },
        "pmextdate": {
          "searchType": "EXACT",
          "subType": "DATE",
          "title": "PM Extension Date",
          "persistent": true,
          "type": "string",
          "remarks": "From the Extended Date of the PM",
          "maxLength": 4
        },
        "estoutlabcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Estimated Cost of External Labor",
          "persistent": true,
          "type": "number",
          "remarks": "The estimated hours of external labor that are required for the task on the current work order.",
          "maxLength": 11
        },
        "vendor": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Vendor",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the vendor responsible for the work.",
          "maxLength": 12
        },
        "crewworkgroup": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Crew Work Group",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Resource pool that will perform the work order.",
          "maxLength": 8
        },
        "disabled": {
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Disabled",
          "persistent": true,
          "type": "boolean",
          "remarks": "Is this record active?"
        },
        "estdur": {
          "searchType": "EXACT",
          "scale": 0,
          "subType": "DURATION",
          "title": "Duration",
          "persistent": true,
          "type": "number",
          "remarks": "Estimated remaining number of hours needed to complete the work.",
          "maxLength": 8
        },
        "calendar": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Calendar",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Calendar to determine shift work is to be done on",
          "maxLength": 8
        },
        "dirissuemtlstatus_maxvalue": {
          "type": "string"
        },
        "fctaskid": {
          "searchType": "NONE",
          "subType": "ALN",
          "title": "Task",
          "type": "string",
          "hasList": true,
          "remarks": "FCTASKID",
          "maxLength": 25
        },
        "anywhererefid": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "BIGINT",
          "title": "Anywhere Ref ID",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Anywhere Reference ID",
          "maxLength": 11
        },
        "description_longdescription": {
          "searchType": "WILDCARD",
          "subType": "LONGALN",
          "title": "Details",
          "type": "string",
          "remarks": "Long Description for Work Order Description",
          "maxLength": 32000
        },
        "estatapprintlabhrs": {
          "searchType": "EXACT",
          "scale": 0,
          "subType": "DURATION",
          "title": "Estimated Hours of Internal Labor",
          "persistent": true,
          "type": "number",
          "remarks": "The hours of internal labor for the task on the current work order at the time it was approved.",
          "maxLength": 8
        },
        "statusdate": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Status Date",
          "persistent": true,
          "type": "string",
          "remarks": "Date the work order status was last changed.",
          "maxLength": 10
        },
        "plussgeojson": {
          "searchType": "WILDCARD",
          "subType": "CLOB",
          "title": "GeoJSON",
          "persistent": true,
          "type": "string",
          "remarks": "GeoJSON representation of the record geometry",
          "maxLength": 999999
        },
        "geometry": {
          "searchType": "NONE",
          "subType": "BLOB",
          "title": "Geometry",
          "persistent": true,
          "type": "string",
          "remarks": "Representation of the record geometry",
          "maxLength": 999999
        },
        "worklog": {
          "objectName": "WORKLOG",
          "type": "array",
          "items": {
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
                "maxLength": 100,
                "relation": "WOWORKLOG"
              },
              "anywhererefid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Anywhere Ref ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Anywhere Reference ID",
                "maxLength": 11,
                "relation": "WOWORKLOG"
              },
              "description_longdescription": {
                "searchType": "WILDCARD",
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
                "searchType": "WILDCARD",
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
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Assignment",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Assignment Idenifier",
                "maxLength": 11,
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
                "maxLength": 100,
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
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Assignment",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Assignment Idenifier",
                "maxLength": 11,
                "relation": "WOWORKLOG"
              },
              "worklogid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "WorkLog ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Work Log Identifier",
                "maxLength": 11,
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
          "cardinality": "",
          "relation": "WOWORKLOG"
        },
        "repairfacility": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Repair Facility",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Specifies the repair facility location. A repair facility can take ownership of work orders from multiple sites in the same organization. User security can be configured to give permission to view work orders in multiple sites if the work orders are owned by a single repair facility.",
          "maxLength": 12
        },
        "remarkdesc": {
          "searchType": "NONE",
          "subType": "ALN",
          "title": "Remarks",
          "type": "string",
          "hasList": true,
          "remarks": "A comment about the reported failure.",
          "maxLength": 100
        },
        "acttoolcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Actual Tool Cost",
          "persistent": true,
          "type": "number",
          "remarks": "Actual Tool Cost",
          "maxLength": 11
        },
        "wptool": {
          "objectName": "WPTOOL",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/WPTOOL",
            "pk": [
              "wpitemid"
            ],
            "title": "WORKORDER/WPTOOL",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/wptool",
            "properties": {
              "pr": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "PR",
                "persistent": true,
                "type": "string",
                "remarks": "Number identifying Prline of PR for direct issue.",
                "maxLength": 8,
                "relation": "SHOWPLANTOOL"
              },
              "localref": {
                "type": "string"
              },
              "reservereq": {
                "default": false,
                "searchType": "NONE",
                "subType": "YORN",
                "title": "Reservation Required",
                "type": "boolean",
                "remarks": "Specifies whether the technician will need to get the tool from a storeroom (make a reservation) or provide it himself. If the check box is cleared (the default), no reservation is required. If the check box is selected, a reservation is required.When you select the Reservation Required check box, you must specify the storeroom from which to get the tool.",
                "relation": "SHOWPLANTOOL"
              },
              "unitcosthaschanged": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Unit Cost Changed",
                "persistent": true,
                "type": "boolean",
                "remarks": "Flag tracks if the unit cost has been overwritten by user. If N - field will be overwritten by MAXIMO on Approval. If Y - field will not be overwritten by MAXIMO on Approval.",
                "relation": "SHOWPLANTOOL"
              },
              "_rowstamp": {
                "type": "string"
              },
              "prlinenum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "PR Line",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Number identifying Prline of PR for direct issue.",
                "maxLength": 11,
                "relation": "SHOWPLANTOOL"
              },
              "href": {
                "type": "string"
              },
              "taskid": {
                "searchType": "NONE",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Task",
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Identifies the task for which the tool will be used.",
                "maxLength": 11,
                "relation": "SHOWPLANTOOL"
              },
              "vendorpackquantity": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Vendor Pack Quantity",
                "persistent": true,
                "type": "string",
                "remarks": "Vendor pack quantity for the item",
                "maxLength": 12,
                "relation": "SHOWPLANTOOL"
              },
              "linecost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Line Cost",
                "persistent": true,
                "type": "number",
                "remarks": "The calculated cost for the tool. Maximo derives the value as: (Tool Hours) x (Rate).",
                "maxLength": 11,
                "relation": "SHOWPLANTOOL"
              },
              "requestnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Request #",
                "persistent": true,
                "type": "string",
                "remarks": "Link to InvReserve",
                "maxLength": 20,
                "relation": "SHOWPLANTOOL"
              },
              "issueto": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Issue To",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the labor to which the tool is issued",
                "maxLength": 8,
                "relation": "SHOWPLANTOOL"
              },
              "ratehaschanged": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Rate Changed ",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates whether a user has overwritten the value in the Rate field. If the check box is cleared (the default), and the tool's rate has changed since the tool was planned, Maximo overwrites the Rate field on approval. If the check box is selected, Maximo does not overwrite the Rate field on approval.",
                "relation": "SHOWPLANTOOL"
              },
              "wpitemid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "WPITEMID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Identifier",
                "maxLength": 11,
                "relation": "SHOWPLANTOOL"
              },
              "modelnum": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Model",
                "persistent": true,
                "type": "string",
                "remarks": "Model number for the item or manufacturer part number",
                "maxLength": 8,
                "relation": "SHOWPLANTOOL"
              },
              "restype_maxvalue": {
                "type": "string"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Organization Identifier",
                "maxLength": 8,
                "relation": "SHOWPLANTOOL"
              },
              "restype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Reservation Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Specify the type of reservation depending on whether it is a firm request for material or not (hard or soft). The reservation type may also be set to automatic, in which case the reservation type (APHARD or APSOFT) is generated depending on the urgency of the order.",
                "maxLength": 16,
                "relation": "SHOWPLANTOOL"
              },
              "itemnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Tool",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the tool.",
                "maxLength": 30,
                "relation": "SHOWPLANTOOL"
              },
              "jobitemid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Job Item ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Job Item ID",
                "maxLength": 11,
                "relation": "SHOWPLANTOOL"
              },
              "directreq": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Direct Req",
                "persistent": true,
                "type": "boolean",
                "remarks": "This is to signify if the item on this reservation will be ordered outside of standard in",
                "relation": "SHOWPLANTOOL"
              },
              "mktplcitem": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Marketplace Item",
                "persistent": true,
                "type": "boolean",
                "remarks": "Flag to determine the items from the marketplace.",
                "relation": "SHOWPLANTOOL"
              },
              "wpm6": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpm6",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANTOOL"
              },
              "wpm5": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Wpm4",
                "persistent": true,
                "type": "number",
                "remarks": "Extra field",
                "maxLength": 11,
                "relation": "SHOWPLANTOOL"
              },
              "requiredate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Required Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date item is needed.",
                "maxLength": 10,
                "relation": "SHOWPLANTOOL"
              },
              "wpm4": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpm4",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANTOOL"
              },
              "amcrew": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew",
                "persistent": true,
                "type": "string",
                "remarks": "Identifies the crew that performed the work.",
                "maxLength": 8,
                "relation": "SHOWPLANTOOL"
              },
              "itemsetid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Item Set ID",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Item set identifier for this item.",
                "maxLength": 8,
                "relation": "SHOWPLANTOOL"
              },
              "_id": {
                "type": "string"
              },
              "unitcost": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Unit Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Item Unit Cost when work order was approved",
                "maxLength": 11,
                "relation": "SHOWPLANTOOL"
              },
              "linetype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Line Type",
                "persistent": true,
                "type": "string",
                "remarks": "Line type. The value of line type could be Item, Material, Service, Special Order or External Catalog Item.",
                "maxLength": 15,
                "relation": "SHOWPLANTOOL"
              },
              "wpm3": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Wpm3",
                "persistent": true,
                "type": "number",
                "remarks": "Extra filed",
                "maxLength": 16,
                "relation": "SHOWPLANTOOL"
              },
              "description": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Description",
                "persistent": true,
                "type": "string",
                "remarks": "Describes the tool. To enter or view additional information, click the Long Description button.",
                "maxLength": 100,
                "relation": "SHOWPLANTOOL"
              },
              "wpm2": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpm2",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANTOOL"
              },
              "wpm1": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpm1",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANTOOL"
              },
              "storelocsite": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Storeroom Site",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the site in which the storeroom is located.",
                "maxLength": 8,
                "relation": "SHOWPLANTOOL"
              },
              "manufacturer": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Manufacturer",
                "persistent": true,
                "type": "string",
                "remarks": "Manufacturer of the item",
                "maxLength": 12,
                "relation": "SHOWPLANTOOL"
              },
              "rate": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Rate",
                "persistent": true,
                "type": "number",
                "remarks": "Hourly rate for the tool. If you modify this field, Maximo recalculates the Line Cost field on the Tools subtab, and the Current Estimate Tool Cost in the View Costs dialog box. You can edit this field if the work order's status allows work plan tool edits. Work Order editing rules are set up in the Organizations application.",
                "maxLength": 11,
                "relation": "SHOWPLANTOOL"
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
                "remarks": "Suggested vendor to order item from.",
                "maxLength": 12,
                "relation": "SHOWPLANTOOL"
              },
              "vendorwarehouse": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Vendor Warehouse",
                "persistent": true,
                "type": "string",
                "remarks": "Vendor warehouse for the item",
                "maxLength": 12,
                "relation": "SHOWPLANTOOL"
              },
              "conditioncode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Condition Code",
                "persistent": true,
                "type": "string",
                "remarks": "The condition of the item planned for a given work order",
                "maxLength": 30,
                "relation": "SHOWPLANTOOL"
              },
              "wplaborref": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Crew Reference",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "This field identifies tool records to the associated joblabor record.",
                "maxLength": 11,
                "relation": "SHOWPLANTOOL"
              },
              "itemqty": {
                "default": "1",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Quantity",
                "persistent": true,
                "type": "number",
                "remarks": "Quantity of the tool required for the planned work.",
                "maxLength": 16,
                "relation": "SHOWPLANTOOL"
              },
              "hours": {
                "default": "0:00",
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Tool Hours",
                "persistent": true,
                "type": "number",
                "remarks": "Number of hours for which the tool will be used for the work.",
                "maxLength": 8,
                "relation": "SHOWPLANTOOL"
              },
              "description_longdescription": {
                "searchType": "WILDCARD",
                "subType": "LONGALN",
                "title": "Details",
                "type": "string",
                "remarks": "Long Description for Description for the item",
                "maxLength": 32000,
                "relation": "SHOWPLANTOOL"
              },
              "vendorpackcode": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Vendor Pack Code",
                "persistent": true,
                "type": "string",
                "remarks": "Vendor pack code for the item",
                "maxLength": 12,
                "relation": "SHOWPLANTOOL"
              },
              "vendorunitcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Vendor Unit Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Unit cost in vendor currency",
                "maxLength": 11,
                "relation": "SHOWPLANTOOL"
              },
              "amcrewtype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew Type",
                "persistent": true,
                "type": "string",
                "remarks": "The type of crew that should perform the work.",
                "maxLength": 8,
                "relation": "SHOWPLANTOOL"
              },
              "orderunit": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Order Unit",
                "persistent": true,
                "type": "string",
                "remarks": "Order unit for the item",
                "maxLength": 16,
                "relation": "SHOWPLANTOOL"
              },
              "restype_description": {
                "type": "string"
              },
              "catalogcode": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Catalog code",
                "persistent": true,
                "type": "string",
                "remarks": "Catalog code for the item or vendor part number",
                "maxLength": 30,
                "relation": "SHOWPLANTOOL"
              },
              "location": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Storeroom",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Storeroom location of the tool. You can edit this field if the work order's status allows work plan tool edits. Work order editing rules are set up in the Organizations application.",
                "maxLength": 12,
                "relation": "SHOWPLANTOOL"
              },
              "requestby": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Requested by",
                "persistent": true,
                "type": "string",
                "remarks": "Person requesting item.",
                "maxLength": 100,
                "relation": "SHOWPLANTOOL"
              }
            },
            "required": [
              "itemnum",
              "itemsetid",
              "linetype",
              "orgid",
              "reservereq"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "SHOWPLANTOOL"
        },
        "actlabcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Actual Labor Cost",
          "persistent": true,
          "type": "number",
          "remarks": "Actual Labor Cost",
          "maxLength": 11
        },
        "estatapprlabhrs": {
          "searchType": "EXACT",
          "scale": 0,
          "subType": "DURATION",
          "title": "Estimated Labor Hours at Approval",
          "persistent": true,
          "type": "number",
          "remarks": "Estimate of the work order's labor hours at the time the work order was approved.",
          "maxLength": 8
        },
        "respondby": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Respond By",
          "persistent": true,
          "type": "string",
          "remarks": "A Calculated field specifying when by a breakdown should be responded to.",
          "maxLength": 10
        },
        "jpnum": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Job Plan",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the work order's job plan. When you assign a job plan to a work order, Maximo copies the job plan operations, material, labor, and tool information to the work order's work plan. Maximo also copies job plan data into these fields: Interruptible?, Crew, Supervisor, and WO Priority. If there is an existing association between the job plan and a safety plan when the job plan is used on the asset or location, Maximo also copies the safety plan to the work order. In addition, Maximo automatically copies a single measurement point if there is an existing association between the asset on the work order and the point name on the job plan.",
          "maxLength": 12
        },
        "estatapprlabcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Estimated Labor Cost at Approval",
          "persistent": true,
          "type": "number",
          "remarks": "Cost estimate of the work order's labor at the time the work order was approved.",
          "maxLength": 11
        },
        "lastcopylinkdate": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Last Time doclinks Copied",
          "persistent": true,
          "type": "string",
          "remarks": "The date time doclinks was copied from other related objects like asset,location,jobplan,safetyplan etc.",
          "maxLength": 10
        },
        "routestopid": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "BIGINT",
          "title": "Route Stop",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "add a new field",
          "maxLength": 11
        },
        "status_maxvalue": {
          "type": "string"
        },
        "_rowstamp": {
          "type": "string"
        },
        "siteid": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Site",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the site.",
          "maxLength": 8
        },
        "crewid_description": {
          "type": "string"
        },
        "matusetrans": {
          "objectName": "MATUSETRANS",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/MATUSETRANS",
            "pk": [
              "siteid",
              "matusetransid"
            ],
            "title": "WORKORDER/MATUSETRANS",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/matusetrans",
            "properties": {
              "invuselineid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Usage Line",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "The usage line identifier, which is used to relate an inventory usage line to a completed transaction.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "invpicklistid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Unique Id for INVPICKLIST",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Inventory Owner",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "localref": {
                "type": "string"
              },
              "issuetype_description": {
                "type": "string"
              },
              "physcnt": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Physical Count",
                "persistent": true,
                "type": "number",
                "remarks": "Physical Count At This Location",
                "maxLength": 16,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "lotnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Lot",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Lot number of the item, if the item is in a lot.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "memo": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Memo",
                "persistent": true,
                "type": "string",
                "remarks": "Brief remark about the issue transaction.",
                "maxLength": 254,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "actualdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Actual Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date and time of the issue transaction, which may be different than the time the transaction is recorded in Maximo. Maximo populates the current date and time by default. You can modify the value in this field. Click the Select Date and Time button to use the calendar control.",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "rollup": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Rolled Up",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates whether this transaction has been rolled up.",
                "relation": "UXSHOWACTUALMATERIAL"
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
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "currencylinecost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Currency Line Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Line Cost in vendor currency.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "href": {
                "type": "string"
              },
              "currencyunitcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Currency Unit Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Unit Cost in vendor currency.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "rotassetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Rotating Asset",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the rotating asset number associated with the item being issued.",
                "maxLength": 25,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "taskid": {
                "searchType": "NONE",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Task",
                "type": "integer",
                "minimum": -2147483648,
                "hasList": true,
                "remarks": "Task associated with the item being issued. Click the Select Value button to choose a task.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "enteredastask": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Entered as Task",
                "persistent": true,
                "type": "boolean",
                "remarks": "Was this transaction created against a work order task?",
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "linecost": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Line Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Line cost of the transaction, calculated as Unit Cost multiplied by the Quantity of the item.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "issueto": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Issued To",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Person to whom the item, tool, or material is issued. Click the Detail Menu button to choose a person or go to the People application.",
                "maxLength": 100,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "actualstaskid": {
                "searchType": "NONE",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Task",
                "type": "integer",
                "minimum": -2147483648,
                "hasList": true,
                "remarks": "Identifies the task for which the item or material was used.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "binnum": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Bin",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Bin number in this storeroom from which the item is issued.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "polinenum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "PO Line",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Line Item Number",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "enterby": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Entered By",
                "persistent": true,
                "type": "string",
                "remarks": "Maximo user name of the person initiating this transaction.",
                "maxLength": 100,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "packingslipnum": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Packing Slip",
                "persistent": true,
                "type": "string",
                "remarks": "Packing Slip Number",
                "maxLength": 50,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "fincntrlid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "FCID",
                "persistent": true,
                "type": "string",
                "remarks": "Financial Control Identifier",
                "maxLength": 8,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "mrlinenum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Requisition Line",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "hasList": true,
                "remarks": "Line number on the requestion for the item being issued.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "commodity": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Commodity Code",
                "persistent": true,
                "type": "string",
                "remarks": "Commodity",
                "maxLength": 8,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "commoditygroup": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Commodity Group",
                "persistent": true,
                "type": "string",
                "remarks": "Commodity Group",
                "maxLength": 8,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "condrate": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Rate Percentage",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Condition Rate Percentage",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "exchangerate2": {
                "searchType": "EXACT",
                "scale": 7,
                "subType": "DECIMAL",
                "title": "Secondary Exchange Rate",
                "persistent": true,
                "type": "number",
                "remarks": "Base Exchange Rate 2",
                "maxLength": 15,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "assetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Asset",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Asset number associated with this transaction.",
                "maxLength": 25,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "consignment": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Consignment",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates whether the transaction was created for a consignment item. This field also indicates that the consignment transaction is included in the consignment invoice, which is sent to the vendor that supplies the inventory item.",
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "curbal": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Current Balance",
                "persistent": true,
                "type": "number",
                "remarks": "Current Balance At This Location",
                "maxLength": 16,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "itin5": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "ITIN5",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "itin4": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "ITIN4",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "itin7": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "ITIN7",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "itin6": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "ITIN6",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "itin1": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Itin1",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field #6",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "conditioncode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Condition Code",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Condition code that reflects the current physical condition of the item being issued. Click the Select Value button to choose a condition code.",
                "maxLength": 30,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "itin3": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Itin3",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field #8",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "itin2": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Itin2",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field #7",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "anywhererefid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Anywhere Ref ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Anywhere Reference ID",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "positivequantity": {
                "searchType": "NONE",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Quantity",
                "type": "number",
                "remarks": "Number of the item you want to issue or have issued from this storeroom.",
                "maxLength": 16,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "it2": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Extra Field 2",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field 02",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "qtyrequested": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Requested Quantity",
                "persistent": true,
                "type": "number",
                "remarks": "The quantity requested for the issue.",
                "maxLength": 16,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "it1": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Extra Field 1",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field 01",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "it4": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Extra Field 4",
                "persistent": true,
                "type": "number",
                "remarks": "Extra Field 04",
                "maxLength": 16,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "actualcost": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Actual Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Extended cost of the item on this transaction.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "glcreditacct": {
                "searchType": "WILDCARD",
                "subType": "GL",
                "title": "GL Credit Account",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "GL account being credited when the item is issued. Click the Select Value button to choose a GL account.",
                "maxLength": 23,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "it3": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Extra Field 3",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field 03",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "it6": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "IT6",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "it5": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Extra Field 5",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field 05",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "it8": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "IT8",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "it7": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "IT7",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "sendersysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Sender System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Column used by ERP-Integration (APIs)",
                "maxLength": 50,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "it9": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "IT9",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "hasld": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Has Long Description",
                "persistent": true,
                "type": "boolean",
                "remarks": "Boolean flag to indicate if there is any long description for this record",
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "ponum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "PO",
                "persistent": true,
                "type": "string",
                "remarks": "Purchase Order Number",
                "maxLength": 8,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "matrectransid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Receipt ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Foreign Key to MATRECTRANS",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "issuetype_maxvalue": {
                "type": "string"
              },
              "sourcesysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Source System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Source System ID",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "issuetype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Transaction Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Type of transaction, either ISSUE or RETURN. Click the Select Value button to choose a transaction type.",
                "maxLength": 20,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "ownersysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Owner System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Owner System ID",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "issueid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Issue Id",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "The ID of the Material Issue record this return is referring to.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "currencycode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Currency",
                "persistent": true,
                "type": "string",
                "remarks": "Currency the PR is in.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "_rowstamp": {
                "type": "string"
              },
              "porevisionnum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "PO Revision",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Revision number of the purchase order. Indicates how many times a purchase order has been revised.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "siteid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Site",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Site Identifier",
                "maxLength": 8,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "financialperiod": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Financial Period",
                "persistent": true,
                "type": "string",
                "remarks": "Financial Period of transaction",
                "maxLength": 6,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "sparepartadded": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Spare Part Added",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates that the item was added to the spare parts list for the asset.",
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "requestnum": {
                "searchType": "NONE",
                "subType": "UPPER",
                "title": "Request",
                "type": "string",
                "remarks": "REQUESTNUM",
                "maxLength": 20,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "wpitemid": {
                "default": -1,
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "WPITEMID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "The ID for the WPMaterial that is associated with this InvUseLine",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Organization Identifier",
                "maxLength": 8,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "consinvoicenum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Consignment Invoice",
                "persistent": true,
                "type": "string",
                "remarks": "The number that identifies the invoice that was created to pay for the inventory usage.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "itemnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Item",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Item that you want to issue from this storeroom or that you used on a work order.",
                "maxLength": 30,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "outside": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Outside",
                "persistent": true,
                "type": "boolean",
                "remarks": "Specifies whether the item being issued is a consignment good. If the check box is selected, the item belongs to a contractor (or vendor), but it is stored on-site, and it is an item for which you expect to be charged for its use. If the check box is cleared (the default), the item is not owned by an outside party.",
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "itemsetid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Item Set",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Item set identifier for this item.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "linecost2": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Secondary Line Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Base Currency Line Cost 2.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "_id": {
                "type": "string"
              },
              "it10": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "IT10",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "qtyreturned": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Quantity Returned",
                "persistent": true,
                "type": "number",
                "remarks": "Qty returned for this issue-type ISSUE",
                "maxLength": 16,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "unitcost": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Unit Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Cost of the item on this transaction.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "exchangerate": {
                "default": "1",
                "searchType": "EXACT",
                "scale": 7,
                "subType": "DECIMAL",
                "title": "Exchange Rate",
                "persistent": true,
                "type": "number",
                "remarks": "Exchange Rate.",
                "maxLength": 15,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "linetype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Line Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the line type, for example, ITEM, TOOL, or MATERIAL.",
                "maxLength": 15,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "description": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Description",
                "persistent": true,
                "type": "string",
                "remarks": "Describes the item. To enter or view more information, click the Long Description button.",
                "maxLength": 100,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "externalrefid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "External Reference ID",
                "persistent": true,
                "type": "string",
                "remarks": "External Reference ID",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "tositeid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Site",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Site to which the item is being issued. Click the Select Value button to choose a site.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "gldebitacct": {
                "searchType": "WILDCARD",
                "subType": "GL",
                "title": "GL Debit Account",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "GL account being debited when the item is issued. Click the Select Value button to choose a GL account.",
                "maxLength": 23,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "issueunit": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Issue Unit",
                "persistent": true,
                "type": "string",
                "remarks": "Standard quantity by which the item is issued from the storeroom, such as each or roll.",
                "maxLength": 16,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "_imagelibref": {
                "type": "string"
              },
              "invuselinesplitid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Unique Id for INVUSELINESPLIT",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Inventory Owner",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "invuseid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Usage",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "The inventory usage identifier, which is used to relate an inventory usage line to a completed transaction.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "refwo": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Work Order",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "This field indicates the referenced work order number.",
                "maxLength": 25,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "conversion": {
                "default": "1",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Conversion Factor",
                "persistent": true,
                "type": "number",
                "hasList": true,
                "remarks": "Numeric value that is applied to relate an order unit to an issue unit. For example, if you order light bulbs in bulk, your unit of measure might be a case, with a quantity received of 36. But when you issue the item, you issue it one at a time. In this case, you can define a measure unit of CASE and another measure unit of EACH. You define a conversion ratio from CASE to EACH with a factor of 36. When you receive an order of this item into a storeroom, MAXIMO converts the received order unit of one CASE into the storeroom's issue unit of 36 EACH.",
                "maxLength": 16,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "quantity": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Quantity",
                "persistent": true,
                "type": "number",
                "remarks": "This field indicates the quantity in/out. It is a calculation of items addedand or subtracted.",
                "maxLength": 16,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "consvendor": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Consignment Vendor",
                "persistent": true,
                "type": "string",
                "remarks": "The vendor that is responsible for replenishing the consignment items. Purchase orders and invoices are generated for the vendor that is specified in this field.",
                "maxLength": 12,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "storeloc": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Storeroom",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The location of the storeroom.",
                "maxLength": 12,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "transdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Transaction Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date and time the transaction was entered in Maximo. This field is read only.",
                "maxLength": 10,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "mrnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Requisition",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Requisition number associated with this transaction. Click the Select Value button to choose a requisition.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "matusetransid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Usage ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Primary key for the table",
                "maxLength": 11,
                "relation": "UXSHOWACTUALMATERIAL"
              },
              "location": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Location",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Location to charge for this transaction.",
                "maxLength": 12,
                "relation": "UXSHOWACTUALMATERIAL"
              }
            },
            "required": [
              "actualdate",
              "currencycode",
              "enterby",
              "enteredastask",
              "issuetype",
              "langcode",
              "linetype",
              "orgid",
              "physcnt",
              "quantity",
              "siteid",
              "tositeid",
              "transdate"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "UXSHOWACTUALMATERIAL"
        },
        "worklocation": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Work Location",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifier of the Work Location that is to be responsible for the work.",
          "maxLength": 12
        },
        "suspendflow": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Suspend Flow Control",
          "persistent": true,
          "type": "boolean",
          "remarks": "Flag used to suspend and resume flow control on a parent record.  Rolls down the hierarchy to all its child records."
        },
        "status_description": {
          "type": "string"
        },
        "actintlabhrs": {
          "searchType": "EXACT",
          "scale": 0,
          "subType": "DURATION",
          "title": "Actual Hours of Internal Labor",
          "persistent": true,
          "type": "number",
          "remarks": "The hours of internal labor that are required for the task on the current work order.",
          "maxLength": 8
        },
        "targetdesc": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Target Description",
          "persistent": true,
          "type": "string",
          "remarks": "Temporary target description for targeting CIs",
          "maxLength": 50
        },
        "calcpriority": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "INTEGER",
          "title": "Calculated Priority",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Calculated Work Priority",
          "maxLength": 11
        },
        "chargestore": {
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Charge to Store",
          "persistent": true,
          "type": "boolean",
          "remarks": "Check box that Indicates whether charges on the work order should be added to the asset record. If the check box is selected, the charges will be added to the asset; if the check box is cleared, the charges will not be added to the asset. If the asset on the work order is a non-capitalized rotating asset not located in an operating location or a storeroom, Maximo selects the check box; otherwise this check box is cleared."
        },
        "outlabcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Outside Labor Cost",
          "persistent": true,
          "type": "number",
          "remarks": "Outside Labor Cost",
          "maxLength": 11
        },
        "multiassetlocci": {
          "objectName": "MULTIASSETLOCCI",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/MULTIASSETLOCCI",
            "pk": [
              "multiid"
            ],
            "title": "WORKORDER/MULTIASSETLOCCI",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/multiassetlocci",
            "properties": {
              "replaceassetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Replacement Asset",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the Replacement Asset that will replace the current Asset",
                "maxLength": 25,
                "relation": "MULTIASSETLOCCI"
              },
              "localref": {
                "type": "string"
              },
              "assetfeatureid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Asset Feature ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Asset Feature that is the focus of work (e.g. Guardrail 127) as opposed to the start/end asset features that identify where the work takes place",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "startassetfeatureid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Start Asset Feature ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "A previously defined feature or relationship used, in conjunction with the start offset, to determine the start measure for this linear segment.   ",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "movetosite": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Move To Site",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the new Site for the Asset",
                "maxLength": 8,
                "relation": "MULTIASSETLOCCI"
              },
              "endzoffsetref_description": {
                "type": "string"
              },
              "startmeasure": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Start Measure",
                "persistent": true,
                "type": "number",
                "remarks": "Absolute distance taken from the start of the linear asset to where this linear work segment begins.  This can be manually entered or calculated by entering a start reference point and start offset.",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "endoffsetunitid": {
                "searchType": "EXACT",
                "subType": "UPPER",
                "title": "Unit of End Offset",
                "persistent": true,
                "type": "string",
                "remarks": "Unit of measure for the offset (before or after) from the end reference point of this asset.",
                "maxLength": 16,
                "relation": "MULTIASSETLOCCI"
              },
              "_rowstamp": {
                "type": "string"
              },
              "startmeasureunitid": {
                "searchType": "EXACT",
                "subType": "UPPER",
                "title": "Unit of Start Measure",
                "persistent": true,
                "type": "string",
                "remarks": "Start Measure Units",
                "maxLength": 16,
                "relation": "MULTIASSETLOCCI"
              },
              "startyoffsetref_description": {
                "type": "string"
              },
              "endzoffset": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "End Z Offset",
                "persistent": true,
                "type": "number",
                "remarks": "Distance above or below this linear asset.  For example, if a sign is 10 feet above the road, the  Z-Offset is 10 feet.  This value is measured from the Z  Reference Point and can be positive (above) or negative (below).",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "href": {
                "type": "string"
              },
              "movetoparent": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Move To Parent",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the new Parent for the Asset",
                "maxLength": 25,
                "relation": "MULTIASSETLOCCI"
              },
              "totalworkunits": {
                "default": "1",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Total Work Units",
                "persistent": true,
                "type": "number",
                "remarks": "Total Work Units, for all assets",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "endbasemeasure": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "End Base Measure",
                "persistent": true,
                "type": "number",
                "remarks": "An absolute measure that is calculated by converting from the end measure using a defined conversion method.  Conversion methods are defined in the Assets application using the Add/Modify Conversions action.",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "targetdesc": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Target Description",
                "persistent": true,
                "type": "string",
                "remarks": "A temporary description of the group of assets, locations, or configuration items. For example, you have a work order to upgrade all of the company notebooks. You can enter a description of the group of notebooks until you can identify specific asset numbers for each notebook.",
                "maxLength": 50,
                "relation": "MULTIASSETLOCCI"
              },
              "endyoffsetref_description": {
                "type": "string"
              },
              "movetobin": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Move To Bin",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the new Bin for the Asset",
                "maxLength": 8,
                "relation": "MULTIASSETLOCCI"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "The Organization of the Asset/Location/CI",
                "maxLength": 8,
                "relation": "MULTIASSETLOCCI"
              },
              "startoffsetunitid": {
                "searchType": "EXACT",
                "subType": "UPPER",
                "title": "Unit of Start Offset",
                "persistent": true,
                "type": "string",
                "remarks": "Unit of measure for the offset (before or after) from the start reference point of this asset.",
                "maxLength": 16,
                "relation": "MULTIASSETLOCCI"
              },
              "sequence": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Sequence",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "The place of the asset, location, or configuration item in a sequential order. For example, you have a work order to inspect some train cars. The train cars are in sequential order and you must inspect each train car sequentially. You assign a number to each train car according to its place in that sequence.",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "route": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Route",
                "persistent": true,
                "type": "string",
                "remarks": "Route Identifier",
                "maxLength": 8,
                "relation": "MULTIASSETLOCCI"
              },
              "startoffset": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Start Offset",
                "persistent": true,
                "type": "number",
                "remarks": "Distance used in conjunction with the start reference point to determine where the work location begins.  ",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "endassetfeatureid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "End Asset Feature ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "A previously defined feature or relationship used, in conjunction with the end offset, to determine the end measure for this linear segment.   ",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "_id": {
                "type": "string"
              },
              "multiid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "MULTI ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique identifier",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "cinum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Configuration Item",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "A configuration item that is associated with the work order.",
                "maxLength": 12,
                "relation": "MULTIASSETLOCCI"
              },
              "endmeasureunitid": {
                "searchType": "EXACT",
                "subType": "UPPER",
                "title": "Unit of End Measure",
                "persistent": true,
                "type": "string",
                "remarks": "End Measure Units",
                "maxLength": 16,
                "relation": "MULTIASSETLOCCI"
              },
              "routestop": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Route Stop",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Add route field",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "endoffset": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "End Offset",
                "persistent": true,
                "type": "number",
                "remarks": "Distance used in conjunction with the end reference point to determine where the work location ends.  ",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "replacementsite": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Replacement Asset Site",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the Site where the Replacement Asset is currently located",
                "maxLength": 8,
                "relation": "MULTIASSETLOCCI"
              },
              "feature": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Feature",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "An object that exists on or alongside a linear asset that is not a point asset.",
                "maxLength": 30,
                "relation": "MULTIASSETLOCCI"
              },
              "_imagelibref": {
                "type": "string"
              },
              "recordkey": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Record Key",
                "persistent": true,
                "type": "string",
                "remarks": "Record Key for worknum or ticketid",
                "maxLength": 25,
                "relation": "MULTIASSETLOCCI"
              },
              "assetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Asset",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "An asset that is associated with the work order.",
                "maxLength": 25,
                "relation": "MULTIASSETLOCCI"
              },
              "endyoffsetref": {
                "searchType": "EXACT",
                "subType": "ALN",
                "title": "End Y Offset Referent",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Reference point from which the Y offset is measured",
                "maxLength": 30,
                "relation": "MULTIASSETLOCCI"
              },
              "startzoffset": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Start Z Offset",
                "persistent": true,
                "type": "number",
                "remarks": "Distance above or below this linear asset.  For example, if a sign is 10 feet above the road, the  Z-Offset is 10 feet.  This value is measured from the Z  Reference Point and can be positive (above) or negative (below).",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "startzoffsetref": {
                "searchType": "EXACT",
                "subType": "ALN",
                "title": "Start Z Offset Referent",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Reference point from which the start Z-Offset (distance above or below the linear asset) is measured.  ",
                "maxLength": 30,
                "relation": "MULTIASSETLOCCI"
              },
              "movetolocation": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Move To Location",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the new Location for the Asset",
                "maxLength": 12,
                "relation": "MULTIASSETLOCCI"
              },
              "startyoffsetref": {
                "searchType": "EXACT",
                "subType": "ALN",
                "title": "Start Y Offset Referent",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Reference point from which the Y offset is measured",
                "maxLength": 30,
                "relation": "MULTIASSETLOCCI"
              },
              "comments": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Comment",
                "persistent": true,
                "type": "string",
                "remarks": "Comment or further information pertaining to the asset, location, or configuration item.",
                "maxLength": 250,
                "relation": "MULTIASSETLOCCI"
              },
              "newreplaceassetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "New Replacement Asset Number",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the new replacement asset number if the replacement asset is coming from a different site",
                "maxLength": 25,
                "relation": "MULTIASSETLOCCI"
              },
              "basemeasureunitid": {
                "searchType": "EXACT",
                "subType": "UPPER",
                "title": "Unit of Base Measure",
                "persistent": true,
                "type": "string",
                "remarks": "Usually, this is the same as the unit of measure  for the asset. If they differ, Maximo will display measures in the unit of measure but will store measures in both the unit of measure and base unit of measure.  A conversion between the unit of measure and base unit of measure, entered via the Units of Measure and Conversion Action in Assets, must exist if the base unit of measure differs from the unit of measure.",
                "maxLength": 16,
                "relation": "MULTIASSETLOCCI"
              },
              "endmeasure": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "End Measure",
                "persistent": true,
                "type": "number",
                "remarks": "Absolute distance taken from the start of the linear asset to where this linear work segment ends.  This can be manually entered or calculated by entering an end reference point and end offset.",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "startyoffset": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Start Y Offset",
                "persistent": true,
                "type": "number",
                "remarks": "Perpendicular distance from this linear asset.  For example, if a sign is 10 feet to the right of the road, the Y-Offset is 10 feet.  This value is measured from the Y Reference Point and can be positive (right) or negative (left).",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "isprimary": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Is Primary",
                "persistent": true,
                "type": "boolean",
                "remarks": "if the asset is primary asset",
                "relation": "MULTIASSETLOCCI"
              },
              "workorgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Work Organization",
                "persistent": true,
                "type": "string",
                "remarks": "The organization of the work record",
                "maxLength": 8,
                "relation": "MULTIASSETLOCCI"
              },
              "endyoffset": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "End Y Offset",
                "persistent": true,
                "type": "number",
                "remarks": "Perpendicular distance from this linear asset.  For example, if a sign is 10 feet to the right of the road, the Y-Offset is 10 feet.  This value is measured from the Y Reference Point and can be positive (right) or negative (left).",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "worksiteid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Work Site",
                "persistent": true,
                "type": "string",
                "remarks": "The site of the work record",
                "maxLength": 8,
                "relation": "MULTIASSETLOCCI"
              },
              "newassetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "New Asset Number",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Defines what the new Asset number will be for the Asset being removed if it is moved to a different site",
                "maxLength": 25,
                "relation": "MULTIASSETLOCCI"
              },
              "progress": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Mark Progress",
                "persistent": true,
                "type": "boolean",
                "remarks": "Select this check box when you finish working with the asset, location, or configuration item.",
                "relation": "MULTIASSETLOCCI"
              },
              "location": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Location",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "A location that is associated with the work order.",
                "maxLength": 12,
                "relation": "MULTIASSETLOCCI"
              },
              "inspformnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Inspection Form",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The number of the inspection form.",
                "maxLength": 12,
                "relation": "MULTIASSETLOCCI"
              },
              "recordclass": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Class",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Class of the work order or ticket",
                "maxLength": 16,
                "relation": "MULTIASSETLOCCI"
              },
              "performmoveto": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Perform the Move to Action",
                "persistent": true,
                "type": "boolean",
                "remarks": "Perform the move to action",
                "relation": "MULTIASSETLOCCI"
              },
              "startbasemeasure": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Start Base Measure",
                "persistent": true,
                "type": "number",
                "remarks": "An absolute measure that is calculated by converting from the end measure using a defined conversion method.  Conversion methods are defined in the Assets application using the Add/Modify Conversions action.",
                "maxLength": 11,
                "relation": "MULTIASSETLOCCI"
              },
              "endzoffsetref": {
                "searchType": "EXACT",
                "subType": "ALN",
                "title": "End Z Offset Referent",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Point from which the Z-Offset is measured.  ",
                "maxLength": 30,
                "relation": "MULTIASSETLOCCI"
              },
              "featurelabel": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Feature Label",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Unique label used to differentiate features.",
                "maxLength": 100,
                "relation": "MULTIASSETLOCCI"
              },
              "startzoffsetref_description": {
                "type": "string"
              }
            },
            "required": [
              "isprimary",
              "performmoveto",
              "progress",
              "recordclass"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "MULTIASSETLOCCI"
        },
        "orgid": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Organization",
          "persistent": true,
          "type": "string",
          "remarks": "Organization Identifier",
          "maxLength": 8
        },
        "wplabor": {
          "objectName": "WPLABOR",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/WPLABOR",
            "pk": [
              "siteid",
              "wonum",
              "wplaborid"
            ],
            "title": "WORKORDER/WPLABOR",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/wplabor",
            "properties": {
              "apptrequired": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Appointment Required",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates if an appointment is required for the labor record. If the labor record is assigned to a task, this value is inherited from the task. If the labor record is not assigned to a task,  this value is inherited from the work record.",
                "relation": "SHOWPLANLABOR"
              },
              "wplaborid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "WP Labor ID",
                "persistent": true,
                "type": "string",
                "remarks": "A Unique ID that is assigned to this row whenever it is inserted into the database.",
                "maxLength": 20,
                "relation": "SHOWPLANLABOR"
              },
              "localref": {
                "type": "string"
              },
              "craft": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Craft",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the craft. You can edit this field if the work order's status allows work plan labor edits. Work order editing rules are set up in the Organizations application.",
                "maxLength": 8,
                "relation": "SHOWPLANLABOR"
              },
              "wpl9": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "WPL9",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANLABOR"
              },
              "_rowstamp": {
                "type": "string"
              },
              "skilllevel": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Skill Level",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Skill level associated with the craft. You can edit this field if the work order's status allows work plan labor edits. Work order editing rules are set up in the Organizations application.",
                "maxLength": 15,
                "relation": "SHOWPLANLABOR"
              },
              "wpl8": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "WPL8",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANLABOR"
              },
              "wpl7": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "WPL7",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANLABOR"
              },
              "wpl6": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Wpl6",
                "persistent": true,
                "type": "number",
                "remarks": "Extra Field",
                "maxLength": 16,
                "relation": "SHOWPLANLABOR"
              },
              "rate": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Rate",
                "persistent": true,
                "type": "number",
                "remarks": "Labor Rate When Workorder Was Approved",
                "maxLength": 11,
                "relation": "SHOWPLANLABOR"
              },
              "wpl5": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpl5",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANLABOR"
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
                "hasList": true,
                "remarks": "Identifies the vendor or contractor, by company code, which will supply the labor resources.",
                "maxLength": 12,
                "relation": "SHOWPLANLABOR"
              },
              "wpl4": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpl4",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANLABOR"
              },
              "wpl3": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpl3",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANLABOR"
              },
              "crewworkgroup": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew Work Group",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The service center or resource pool that will perform the work.",
                "maxLength": 8,
                "relation": "SHOWPLANLABOR"
              },
              "href": {
                "type": "string"
              },
              "contractnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Labor Contract",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the contract with the vendor that will supply labor resources.You can edit this field if the work order's status allows work plan labor edits. Work order editing rules are set up in the Organizations application.",
                "maxLength": 8,
                "relation": "SHOWPLANLABOR"
              },
              "displayrate": {
                "searchType": "NONE",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Rate",
                "type": "number",
                "remarks": "Hourly pay rate for the labor or craft. Maximo copies this data from the Labor table. If you modify this field, Maximo recalculates the Line Cost field on the Labor subtab, and the Current Estimate Labor Cost in the View Costs dialog box.You can edit this field if the work order's status allows work plan labor edits. Work Order editing rules are set up in the Organizations application.",
                "maxLength": 11,
                "relation": "SHOWPLANLABOR"
              },
              "taskid": {
                "searchType": "NONE",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Task",
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Identifies the task for the planned craft or labor.",
                "maxLength": 11,
                "relation": "SHOWPLANLABOR"
              },
              "linecost": {
                "searchType": "NONE",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Line Cost",
                "type": "number",
                "remarks": "The calculated cost for the craft or labor. Maximo derives the value as: Regular Hours multiplied by the Rate plus any premium pay defined.",
                "maxLength": 11,
                "relation": "SHOWPLANLABOR"
              },
              "quantity": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Quantity",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "The required quantity of individuals",
                "maxLength": 11,
                "relation": "SHOWPLANLABOR"
              },
              "ratehaschanged": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Rate Changed ",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates whether a user has overwritten the value in the Rate field. If the check box is cleared (the default), and the labor's rate or the labor contract has changed since the labor was planned, Maximo overwrites the Rate field on approval. If the check box is selected, Maximo does not overwrite the Rate field on approval.",
                "relation": "SHOWPLANLABOR"
              },
              "wplaboruid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "WPLABORUID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Identifier",
                "maxLength": 11,
                "relation": "SHOWPLANLABOR"
              },
              "joblaborid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Job Labor ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Job Labor ID",
                "maxLength": 11,
                "relation": "SHOWPLANLABOR"
              },
              "wpl2": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Wpl2",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANLABOR"
              },
              "amcrewtype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The type of crew that should perform the work.",
                "maxLength": 8,
                "relation": "SHOWPLANLABOR"
              },
              "wpl1": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpl1",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANLABOR"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Organization Identifier",
                "maxLength": 8,
                "relation": "SHOWPLANLABOR"
              },
              "laborcode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Labor",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the labor planned for the work order task.",
                "maxLength": 8,
                "relation": "SHOWPLANLABOR"
              },
              "amcrew": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the crew that performed the work.",
                "maxLength": 8,
                "relation": "SHOWPLANLABOR"
              },
              "_id": {
                "type": "string"
              },
              "laborhrs": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Regular Hours",
                "persistent": true,
                "type": "number",
                "remarks": "Number of labor hours required to complete the work.",
                "maxLength": 8,
                "relation": "SHOWPLANLABOR"
              }
            },
            "required": [
              "laborhrs",
              "orgid",
              "quantity",
              "rate",
              "ratehaschanged",
              "wplaborid"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "SHOWPLANLABOR"
        },
        "schedfinish": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Scheduled Finish",
          "persistent": true,
          "type": "string",
          "remarks": "Date and time the work is scheduled to be completed.",
          "maxLength": 10
        },
        "justifypriority": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Priority Justification",
          "persistent": true,
          "type": "string",
          "remarks": "Describes why the work order received the priority it has been assigned. To enter or view additional information, click the Long Description button.",
          "maxLength": 50
        },
        "inctasksinsched": {
          "default": true,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Include Tasks in Schedule",
          "persistent": true,
          "type": "boolean",
          "remarks": "Indicates that this work order's tasks will be included in the schedule view."
        },
        "cinum": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Configuration Item",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Configuration Item",
          "maxLength": 12
        },
        "flowcontrolled": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Under Flow Control",
          "persistent": true,
          "type": "boolean",
          "remarks": "Flag used to indicate a records participation in flow control.  When applied to a parent, it rolls down the hierarchy to all its child records."
        },
        "storeroommtlstatus": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Storeroom Material Status",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The availability status of storeroom materials on the current work order.",
          "maxLength": 20
        },
        "failurereport": {
          "objectName": "FAILUREREPORT",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/FAILUREREPORT",
            "pk": [
              "failurereportid"
            ],
            "title": "WORKORDER/FAILUREREPORT",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/failurereport",
            "properties": {
              "anywhererefid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Anywhere Ref ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Anywhere Reference ID",
                "maxLength": 11,
                "relation": "UXSHOWFAILUREREPORT"
              },
              "type_maxvalue": {
                "type": "string"
              },
              "localref": {
                "type": "string"
              },
              "type": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the type of failure code, such as problem, cause, or remedy.",
                "maxLength": 12,
                "relation": "UXSHOWFAILUREREPORT"
              },
              "orgid": {
                "searchType": "EXACT",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Organization Identifier",
                "maxLength": 8,
                "relation": "UXSHOWFAILUREREPORT"
              },
              "ticketclass": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Ticket Class",
                "persistent": true,
                "type": "string",
                "remarks": "class of the ticket",
                "maxLength": 16,
                "relation": "UXSHOWFAILUREREPORT"
              },
              "_rowstamp": {
                "type": "string"
              },
              "failurereportid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "FAILUREREPORTID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Identifier",
                "maxLength": 11,
                "relation": "UXSHOWFAILUREREPORT"
              },
              "failurecode": {
                "searchType": "EXACT",
                "subType": "UPPER",
                "title": "Failure Code",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the problem, cause or remedy.",
                "maxLength": 8,
                "relation": "UXSHOWFAILUREREPORT"
              },
              "_imagelibref": {
                "type": "string"
              },
              "assetnum": {
                "searchType": "EXACT",
                "subType": "UPPER",
                "title": "Asset",
                "persistent": true,
                "type": "string",
                "remarks": "Asset Number",
                "maxLength": 25,
                "relation": "UXSHOWFAILUREREPORT"
              },
              "linenum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Line",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Failure List Number",
                "maxLength": 11,
                "relation": "UXSHOWFAILUREREPORT"
              },
              "href": {
                "type": "string"
              },
              "_id": {
                "type": "string"
              },
              "ticketid": {
                "searchType": "EXACT",
                "subType": "UPPER",
                "title": "Ticket ",
                "persistent": true,
                "type": "string",
                "remarks": "Ticket Identifier",
                "maxLength": 10,
                "relation": "UXSHOWFAILUREREPORT"
              },
              "type_description": {
                "type": "string"
              }
            },
            "required": [
              "failurecode",
              "linenum",
              "orgid"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "UXSHOWFAILUREREPORT"
        },
        "actstart": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Actual Start",
          "persistent": true,
          "type": "string",
          "remarks": "Date and time the actual work begain.",
          "maxLength": 10
        },
        "description": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Description",
          "persistent": true,
          "type": "string",
          "remarks": "Describes the work order. To enter or view additional information, click the Long Description button.",
          "maxLength": 100
        },
        "externalrefid": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "External Reference ID",
          "persistent": true,
          "type": "string",
          "remarks": "External Reference ID",
          "maxLength": 10
        },
        "storeroommtlstatus_maxvalue": {
          "type": "string"
        },
        "estatapproutlabcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Estimated Hours of External Labor",
          "persistent": true,
          "type": "number",
          "remarks": "The cost of external labor for the task on the current work order at the time it was approved.",
          "maxLength": 11
        },
        "djpapplied": {
          "default": "NO",
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Dynamic Job Plan applied",
          "persistent": true,
          "type": "string",
          "remarks": "This flag can be set to YES, NO, ERROR",
          "maxLength": 5
        },
        "sneconstraint": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Start No Earlier Than",
          "persistent": true,
          "type": "string",
          "remarks": "The earliest date at which work should start.  Scheduled dates should be after this date.",
          "maxLength": 10
        },
        "estoutlabhrs": {
          "searchType": "EXACT",
          "scale": 0,
          "subType": "DURATION",
          "title": "Estimated Hours of External Labor",
          "persistent": true,
          "type": "number",
          "remarks": "The estimated hours of external labor that are required for the task on the current work order.",
          "maxLength": 8
        },
        "wosequence": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "INTEGER",
          "title": "Sequence",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Indicates sequence in which to execute the work orders in a work order hierarchy.",
          "maxLength": 11
        },
        "actintlabcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Actual Cost of Internal Labor",
          "persistent": true,
          "type": "number",
          "remarks": "The cost of internal labor for the task on the current work order.",
          "maxLength": 11
        },
        "owner": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Owner",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The person currently responsible for the work order.",
          "maxLength": 100
        },
        "calcorgid": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Organization",
          "persistent": true,
          "type": "string",
          "remarks": "Organization associated with the calculation calendar, and used with the Calendar and Shift fields to calculate the Target Contact, Target Response, and Target Resolution dates on a ticket or work order. Click the Detail Menu button to select an organization or go to the Organizations application to create one.",
          "maxLength": 8
        },
        "wolo10": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "INTEGER",
          "title": "Wolo10",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Extra Field",
          "maxLength": 11
        },
        "wpmaterial": {
          "objectName": "WPMATERIAL",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/WPMATERIAL",
            "pk": [
              "wpitemid"
            ],
            "title": "WORKORDER/WPMATERIAL",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/wpmaterial",
            "properties": {
              "pr": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "PR",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Purchase requisition on which this direct issue item is ordered.",
                "maxLength": 8,
                "relation": "SHOWPLANMATERIAL"
              },
              "localref": {
                "type": "string"
              },
              "unitcosthaschanged": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Unit Cost Changed",
                "persistent": true,
                "type": "boolean",
                "remarks": "Flag tracks if the unit cost has been overwritten by user. If N - field will be overwritten by MAXIMO on Approval. If Y - field will not be overwritten by MAXIMO on Approval.",
                "relation": "SHOWPLANMATERIAL"
              },
              "_rowstamp": {
                "type": "string"
              },
              "prlinenum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "PR Line",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Line number on the purchase requisition for the item.",
                "maxLength": 11,
                "relation": "SHOWPLANMATERIAL"
              },
              "href": {
                "type": "string"
              },
              "taskid": {
                "searchType": "NONE",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Task",
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Identifies the task for the planned item or material.",
                "maxLength": 11,
                "relation": "SHOWPLANMATERIAL"
              },
              "vendorpackquantity": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Vendor Pack Quantity",
                "persistent": true,
                "type": "string",
                "remarks": "Vendor pack quantity for the item",
                "maxLength": 12,
                "relation": "SHOWPLANMATERIAL"
              },
              "linecost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Line Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Total cost of the item. MAXIMO calculates this using the following formula: (quantity) x (unit cost).",
                "maxLength": 11,
                "relation": "SHOWPLANMATERIAL"
              },
              "requestnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Request",
                "persistent": true,
                "type": "string",
                "remarks": "Link to InvReserve",
                "maxLength": 20,
                "relation": "SHOWPLANMATERIAL"
              },
              "issueto": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Issue To",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Labor or craft to whom to issue the item or material.",
                "maxLength": 8,
                "relation": "SHOWPLANMATERIAL"
              },
              "ratehaschanged": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Rate Changed",
                "persistent": true,
                "type": "boolean",
                "remarks": "Flag tracks if the tool rate has been overwritten by user. If N - field will be overwritten by MAXIMO on Approval. If Y - field will not be overwritten by MAXIMO on Approval.",
                "relation": "SHOWPLANMATERIAL"
              },
              "wpitemid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "WPITEMID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Identifier",
                "maxLength": 11,
                "relation": "SHOWPLANMATERIAL"
              },
              "modelnum": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Model",
                "persistent": true,
                "type": "string",
                "remarks": "Model number for the item or manufacturer part number",
                "maxLength": 8,
                "relation": "SHOWPLANMATERIAL"
              },
              "restype_maxvalue": {
                "type": "string"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Organization Identifier",
                "maxLength": 8,
                "relation": "SHOWPLANMATERIAL"
              },
              "restype": {
                "default": "!AUTOMATIC!",
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Reservation Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Specify the type of reservation depending on whether it is a firm request for material or not (hard or soft). The reservation type may also be set to automatic, in which case the reservation type (APHARD or APSOFT) is generated depending on the urgency of the order.",
                "maxLength": 16,
                "relation": "SHOWPLANMATERIAL"
              },
              "itemnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Item",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the item. If you enter an item that is defined as a hazardous material in Inventory, Maximo inserts hazard information on the Safety Plans tab.",
                "maxLength": 30,
                "relation": "SHOWPLANMATERIAL"
              },
              "jobitemid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Job Item ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Job Item ID",
                "maxLength": 11,
                "relation": "SHOWPLANMATERIAL"
              },
              "directreq": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Direct Issue",
                "persistent": true,
                "type": "boolean",
                "remarks": "Specifies whether you obtain the item directly from a purchase or from a storeroom. If you clear the check box (the default), you obtain the item from a storeroom and you must enter a value in the Storeroom field. When the work order is approved, Maximo reserves the item in inventory. If you select the check box, the item will be purchased for the approved work order when you use the Reorder Direct Issue Items/Services in the Inventory application. You can edit this field if the work order's status allows work plan materials edits. Work order editing rules are set up in the Organizations application.",
                "relation": "SHOWPLANMATERIAL"
              },
              "mktplcitem": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Marketplace Item",
                "persistent": true,
                "type": "boolean",
                "remarks": "Flag to determine the items from the marketplace.",
                "relation": "SHOWPLANMATERIAL"
              },
              "wpm6": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpm6",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANMATERIAL"
              },
              "wpm5": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Wpm4",
                "persistent": true,
                "type": "number",
                "remarks": "Extra field",
                "maxLength": 11,
                "relation": "SHOWPLANMATERIAL"
              },
              "requiredate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Required Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date you require the item. If the Direct Issue? check box is selected, you can edit this field if the work order's status allows work plan material edits. Work order editing rules are set up in the Organizations application.",
                "maxLength": 10,
                "relation": "SHOWPLANMATERIAL"
              },
              "wpm4": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpm4",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANMATERIAL"
              },
              "amcrew": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew",
                "persistent": true,
                "type": "string",
                "remarks": "Identifies the crew that performed the work.",
                "maxLength": 8,
                "relation": "SHOWPLANMATERIAL"
              },
              "itemsetid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Item Set",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the set to which the planned item belongs.",
                "maxLength": 8,
                "relation": "SHOWPLANMATERIAL"
              },
              "_id": {
                "type": "string"
              },
              "unitcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Unit Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Price of the item per unit at the time the work order was approved.",
                "maxLength": 11,
                "relation": "SHOWPLANMATERIAL"
              },
              "linetype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Line Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the type of material, for example, item, material, service, special order or external catalog item.",
                "maxLength": 15,
                "relation": "SHOWPLANMATERIAL"
              },
              "wpm3": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Wpm3",
                "persistent": true,
                "type": "number",
                "remarks": "Extra filed",
                "maxLength": 16,
                "relation": "SHOWPLANMATERIAL"
              },
              "description": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Description",
                "persistent": true,
                "type": "string",
                "remarks": "Describes the item. To enter or view additional information, click the Long Description button.",
                "maxLength": 100,
                "relation": "SHOWPLANMATERIAL"
              },
              "wpm2": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpm2",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANMATERIAL"
              },
              "wpm1": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpm1",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANMATERIAL"
              },
              "storelocsite": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Storeroom Site",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the site in which the storeroom is located.",
                "maxLength": 8,
                "relation": "SHOWPLANMATERIAL"
              },
              "manufacturer": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Manufacturer",
                "persistent": true,
                "type": "string",
                "remarks": "Manufacturer of the item",
                "maxLength": 12,
                "relation": "SHOWPLANMATERIAL"
              },
              "rate": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Rate",
                "persistent": true,
                "type": "number",
                "remarks": "Rate",
                "maxLength": 11,
                "relation": "SHOWPLANMATERIAL"
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
                "hasList": true,
                "remarks": "Identifies the suggested vendor for the item. If the Direct Issue? check box is selected, you can edit this field if the work order's status allows work plan material edits. Work order editing rules are set up in the Organizations application.",
                "maxLength": 12,
                "relation": "SHOWPLANMATERIAL"
              },
              "vendorwarehouse": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Vendor Warehouse",
                "persistent": true,
                "type": "string",
                "remarks": "Vendor warehouse for the item",
                "maxLength": 12,
                "relation": "SHOWPLANMATERIAL"
              },
              "conditioncode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Condition Code",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the condition of the item planned for the work.",
                "maxLength": 30,
                "relation": "SHOWPLANMATERIAL"
              },
              "wplaborref": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Crew Reference",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "This field identifies tool records to the associated joblabor record.",
                "maxLength": 11,
                "relation": "SHOWPLANMATERIAL"
              },
              "itemqty": {
                "default": "1",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Quantity",
                "persistent": true,
                "type": "number",
                "remarks": "Number of items you need for the task. If you modify this field, Maximo recalculates the Line Cost field on the Materials subtab, and the Current Estimate Material Cost on the View Costs dialog box. You can edit this field if the work order's status allows work plan material edits. Work order editing rules are set up in the Organizations application.",
                "maxLength": 16,
                "relation": "SHOWPLANMATERIAL"
              },
              "hours": {
                "default": "0:00",
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Tool Hours",
                "persistent": true,
                "type": "number",
                "remarks": "Number of Hours for Which a Tool is Used",
                "maxLength": 8,
                "relation": "SHOWPLANMATERIAL"
              },
              "description_longdescription": {
                "searchType": "WILDCARD",
                "subType": "LONGALN",
                "title": "Details",
                "type": "string",
                "remarks": "Long Description for Description for the item",
                "maxLength": 32000,
                "relation": "SHOWPLANMATERIAL"
              },
              "vendorpackcode": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Vendor Pack Code",
                "persistent": true,
                "type": "string",
                "remarks": "Vendor pack code for the item",
                "maxLength": 12,
                "relation": "SHOWPLANMATERIAL"
              },
              "vendorunitcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Vendor Unit Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Unit cost in vendor's currency.",
                "maxLength": 11,
                "relation": "SHOWPLANMATERIAL"
              },
              "amcrewtype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew Type",
                "persistent": true,
                "type": "string",
                "remarks": "The type of crew that should perform the work.",
                "maxLength": 8,
                "relation": "SHOWPLANMATERIAL"
              },
              "orderunit": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Order Unit",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Order unit for the item",
                "maxLength": 16,
                "relation": "SHOWPLANMATERIAL"
              },
              "restype_description": {
                "type": "string"
              },
              "catalogcode": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Catalog #",
                "persistent": true,
                "type": "string",
                "remarks": "Catalog code for the item or vendor part number",
                "maxLength": 30,
                "relation": "SHOWPLANMATERIAL"
              },
              "location": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Storeroom",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Storeroom location of the item. You can edit this field if the work order's status allows work plan materials edits. Work order editing rules are set up in the Organizations application.",
                "maxLength": 12,
                "relation": "SHOWPLANMATERIAL"
              },
              "requestby": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Requested By",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the person requesting the item.",
                "maxLength": 100,
                "relation": "SHOWPLANMATERIAL"
              }
            },
            "required": [
              "linetype",
              "orgid",
              "unitcost",
              "unitcosthaschanged"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "SHOWPLANMATERIAL"
        },
        "relatedrecord": {
          "objectName": "RELATEDRECORD",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/RELATEDRECORD",
            "pk": [
              "relatedrecordid"
            ],
            "title": "WORKORDER/RELATEDRECORD",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/relatedrecord",
            "properties": {
              "relatedrecclass": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Class",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Class of the related ticket. Maximo enters this value for the related ticket you select. You can choose a ticket class before choosing a related ticket; if you do so, Maximo displays only tickets of the chosen class in the Select Value dialog box for the related ticket. To choose a ticket class, enter a value or click the Select Value button.",
                "maxLength": 16,
                "relation": "RELATEDRECORD"
              },
              "localref": {
                "type": "string"
              },
              "relatedrecorgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization of Related Record",
                "persistent": true,
                "type": "string",
                "remarks": "Organization Identifier for Related Record",
                "maxLength": 8,
                "relation": "RELATEDRECORD"
              },
              "relatedrecordid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "RELATEDRECORDID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Identifier",
                "maxLength": 11,
                "relation": "RELATEDRECORD"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Constraint Identifier of the organization",
                "maxLength": 8,
                "relation": "RELATEDRECORD"
              },
              "_rowstamp": {
                "type": "string"
              },
              "relatetype": {
                "searchType": "EXACT",
                "subType": "UPPER",
                "title": "Relationship",
                "persistent": true,
                "type": "string",
                "remarks": "Describes the relationship of this record to the record in the key field.",
                "maxLength": 18,
                "relation": "RELATEDRECORD"
              },
              "_imagelibref": {
                "type": "string"
              },
              "recordkey": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Record Key",
                "persistent": true,
                "type": "string",
                "remarks": "Key for the Record",
                "maxLength": 25,
                "relation": "RELATEDRECORD"
              },
              "relatedreckey": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Related Record Key",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the related ticket. Enter a value or click the Detail Menu button to select an option and retrieve a value.",
                "maxLength": 10,
                "relation": "RELATEDRECORD"
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
                "remarks": "Type of the record",
                "maxLength": 16,
                "relation": "RELATEDRECORD"
              },
              "relatedrecsiteid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Site of Related Record",
                "persistent": true,
                "type": "string",
                "remarks": "Site Identifier for Related Record",
                "maxLength": 8,
                "relation": "RELATEDRECORD"
              }
            },
            "required": [
              "class",
              "recordkey",
              "relatedrecclass",
              "relatedreckey",
              "relatetype"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "RELATEDRECORD"
        },
        "environment": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Environment",
          "persistent": true,
          "type": "string",
          "remarks": "This field defines the environment in which the change is taking place.",
          "maxLength": 50
        },
        "esttotalcost": {
          "searchType": "NONE",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Estimated Total Cost",
          "type": "number",
          "remarks": "Estimated Total Cost",
          "maxLength": 11
        },
        "statusiface": {
          "default": false,
          "searchType": "NONE",
          "subType": "YORN",
          "title": "Has Status Changed",
          "type": "boolean",
          "remarks": "Non persistent boolean field to indicate whether the status has been changed after the stateful object is fetched from the database."
        },
        "wogroup": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "WO Group",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "This column is used to enhance performance of the Work Orders app.",
          "maxLength": 25
        },
        "schedstart": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Scheduled Start",
          "persistent": true,
          "type": "string",
          "remarks": "Date and time the work is scheduled to begin.",
          "maxLength": 10
        },
        "location": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Location",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the work order's location. This is not necessarily the asset's location, however, if an asset is entered, its location will default here",
          "maxLength": 12
        },
        "risk": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Risk Assessment",
          "persistent": true,
          "type": "string",
          "remarks": "Defines the risk level of the work order. Risk may be a numeric value or a term such as High, Medium, Low, or some other value based upon your business definitions.",
          "maxLength": 10
        },
        "woactivity": {
          "objectName": "WOACTIVITY",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/WOACTIVITY",
            "pk": [
              "siteid",
              "wonum"
            ],
            "title": "WORKORDER/WOACTIVITY",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/woactivity",
            "properties": {
              "parent": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Parent",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the parent.",
                "maxLength": 25,
                "relation": "WOACTIVITY"
              },
              "localref": {
                "type": "string"
              },
              "aos": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Requires Asset Downtime",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates that the work cannot be performed while the asset is operating.",
                "relation": "WOACTIVITY"
              },
              "estservcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Estimated Service Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Total estimated service cost against this work order.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "pluscismobile": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Is Mobile",
                "persistent": true,
                "type": "boolean",
                "remarks": "Workorder was added by mobile",
                "relation": "WOACTIVITY"
              },
              "wolablnk": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Labor",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Labor Code Link",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "pluscfrequency": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Frequency Field",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Number of time units (days, weeks, months, or years) to elapse between work orders you generate from this PM. The count begins at the value in the Last Target Start Date (if Use Target Start? is selected or Last Completion Date (if Use Target Start? is not the selected field. This value may differ differ from the Regulatory Frequency to facilitate scheduling. For example, a regulatory frequency of 31 days may have a frequency of 28 days.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "ownergroup": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Owner Group",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The group currently responsible for the work from a service management perspective.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "assetlocpriority": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Asset Location Priority",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Asset priority copied from ASSET table.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "calcshift": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Shift",
                "persistent": true,
                "type": "string",
                "remarks": "Along with the calculation calendar, sets the business hours that calculate the Target Contact, Target Response, and Target Resolution dates on a ticket or work order. Click the Select Value button to choose a shift.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "workpackmtlstatus": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Work Package Material Status",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The availability status of all materials on the current work order and related child records. The status is determined by the planned materials on a work order. The completion of the child records does not always determine the overall status of the materials in the work package.",
                "maxLength": 20,
                "relation": "WOACTIVITY"
              },
              "wol4": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Wol4",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "istask": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Is Task",
                "persistent": true,
                "type": "boolean",
                "remarks": "Specifies whether the record is a task. If the check box is selected, maximo will treat this as a task and display it in the Task table window. If the check box is cleared, this record will be treated as a work order.",
                "relation": "WOACTIVITY"
              },
              "storeroommtlstatus_description": {
                "type": "string"
              },
              "estatapprmatcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Estimate Material Cost at Approval",
                "persistent": true,
                "type": "number",
                "remarks": "Cost estimate of the work order's material at the time of approval.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "flowaction": {
                "searchType": "EXACT",
                "subType": "UPPER",
                "title": "Flow Action",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The action to be performed (if any) when the workorder is started via process flow control",
                "maxLength": 30,
                "relation": "WOACTIVITY"
              },
              "taskid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Task",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Identifies the task.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "pcpchangeby": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Physical percent complete - Who last changed",
                "persistent": true,
                "type": "string",
                "remarks": "Physical percent complete - Who last changed",
                "maxLength": 100,
                "relation": "WOACTIVITY"
              },
              "wopriority": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Priority",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Identifies the importance of the work order, from 0-999, where 0 is the lowest priority and 999 is the highest.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "pluscloop": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Loop Calibration",
                "persistent": true,
                "type": "boolean",
                "remarks": "Select this check box to identify the work order as a loop calibration. May be selected when a value is entered in the Location field.",
                "relation": "WOACTIVITY"
              },
              "wol3": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Wol3",
                "persistent": true,
                "type": "number",
                "remarks": "Extra Field",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "wol2": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wol2",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "actmatcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Actual Material Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Actual Material Cost",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "generatedforpo": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "PO",
                "persistent": true,
                "type": "string",
                "remarks": "Work order for PO",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "wol1": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wol1",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "fnlconstraint": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Finish No Later Than",
                "persistent": true,
                "type": "string",
                "remarks": "The date that work should be completed by.  Scheduled dates should be before this date.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "nestedjpinprocess": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Nested Job Plan Processing",
                "persistent": true,
                "type": "boolean",
                "remarks": "Record will be locked while the jobplan containing nested jobplans is in the process of being applied to the record.",
                "relation": "WOACTIVITY"
              },
              "estatapprtoolcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Estimate Tool Cost at Approval",
                "persistent": true,
                "type": "number",
                "remarks": "Cost estimate of the work order's tools at the time of approval.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "hasfollowupwork": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Follow-up Work",
                "persistent": true,
                "type": "boolean",
                "remarks": "Specifies whether or not the work order has follow-up work. If the box is selected, the work order has follow-up work orders.",
                "relation": "WOACTIVITY"
              },
              "route": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Route",
                "persistent": true,
                "type": "string",
                "remarks": "add route field",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "pmnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "PM",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the PM.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "flowactionassist": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Flow Action Assist",
                "persistent": true,
                "type": "boolean",
                "remarks": "Suppresses the automatic firing of the action in flow control",
                "relation": "WOACTIVITY"
              },
              "ignorediavail": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Ignore Direct Issue Availability For Work Order Status",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates whether to ignore the availability of direct issues for the work order status approval.",
                "relation": "WOACTIVITY"
              },
              "pcacthrs": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Percent complete by actual hours",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Percent complete by actual hours",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "fincntrlid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "FCID",
                "persistent": true,
                "type": "string",
                "remarks": "Financial Control Identifier",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "amcrew": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Defines the Crew who will be copied to the work order created with this job plan.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "launchentryname": {
                "searchType": "EXACT",
                "subType": "UPPER",
                "title": "Launch Entry Name",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Launch Entry",
                "maxLength": 32,
                "relation": "WOACTIVITY"
              },
              "plussfeatureclass": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Feature Class",
                "persistent": true,
                "type": "string",
                "remarks": "Identifies the GIS feature class that is linked to the work order.",
                "maxLength": 100,
                "relation": "WOACTIVITY"
              },
              "pointnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Measurement Point",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The point number on the asset for which the measurement is taken.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "pluscfrequnit_description": {
                "type": "string"
              },
              "commodity": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Service",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Defines the service for the work order, for example: customer support, painting, print, telecommunications, and welding.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "pluscfrequnit": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Frequency Unit",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Defines the time units (days, weeks, months, or years) for the Frequency field on time-based PMs.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "estlabhrs": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Estimated Labor Hours",
                "persistent": true,
                "type": "number",
                "remarks": "Estimated Labor Hours",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "assignedownergroup": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Assigned Owner Group",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Assigned Owner Group of the workorder record. This group has overall responsibility for the solution. Use the Select Action menu to assign an owner group. You can enter a value either in this field or the Owner field.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "dirissuemtlstatus_description": {
                "type": "string"
              },
              "pluscoverduedate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Calibration Overdue Date",
                "persistent": true,
                "type": "string",
                "remarks": "Displays the over due date for the calibration, if the work order is not completed.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "workpackmtlstatus_description": {
                "type": "string"
              },
              "pmextdate": {
                "searchType": "EXACT",
                "subType": "DATE",
                "title": "PM Extension Date",
                "persistent": true,
                "type": "string",
                "remarks": "From the Extended Date of the PM",
                "maxLength": 4,
                "relation": "WOACTIVITY"
              },
              "estoutlabcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Estimated Cost of External Labor",
                "persistent": true,
                "type": "number",
                "remarks": "The estimated hours of external labor that are required for the task on the current work order.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "vendor": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Vendor",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the vendor responsible for the work.",
                "maxLength": 12,
                "relation": "WOACTIVITY"
              },
              "crewworkgroup": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew Work Group",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Resource pool that will perform the work order.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "disabled": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Disabled",
                "persistent": true,
                "type": "boolean",
                "remarks": "Is this record active?",
                "relation": "WOACTIVITY"
              },
              "estdur": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Estimated Duration",
                "persistent": true,
                "type": "number",
                "remarks": "Estimated time needed to complete the work.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "calendar": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Calendar",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Calendar to determine shift work is to be done on",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "dirissuemtlstatus_maxvalue": {
                "type": "string"
              },
              "anywhererefid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Anywhere Ref ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Anywhere Reference ID",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "description_longdescription": {
                "searchType": "WILDCARD",
                "subType": "LONGALN",
                "title": "Details",
                "type": "string",
                "remarks": "Long Description for Work Order Description",
                "maxLength": 32000,
                "relation": "WOACTIVITY"
              },
              "estatapprintlabhrs": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Estiamted Hours of Internal Labor",
                "persistent": true,
                "type": "number",
                "remarks": "The hours of internal labor for the task on the current work order at the time it was approved.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "statusdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Status Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date the status was last changed.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "plussgeojson": {
                "searchType": "WILDCARD",
                "subType": "CLOB",
                "title": "GeoJSON",
                "persistent": true,
                "type": "string",
                "remarks": "GeoJSON representation of the record geometry",
                "maxLength": 999999,
                "relation": "WOACTIVITY"
              },
              "hasld": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Has Long Description",
                "persistent": true,
                "type": "boolean",
                "remarks": "Boolean flag to indicate if there is any long description for this record",
                "relation": "WOACTIVITY"
              },
              "geometry": {
                "searchType": "NONE",
                "subType": "BLOB",
                "title": "Geometry",
                "persistent": true,
                "type": "string",
                "remarks": "Representation of the record geometry",
                "maxLength": 999999,
                "relation": "WOACTIVITY"
              },
              "repairfacility": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Repair Facility",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Specifies the repair facility location. A repair facility can take ownership of work orders from multiple sites in the same organization. User security can be configured to give permission to view work orders in multiple sites if the work orders are owned by a single repair facility.",
                "maxLength": 12,
                "relation": "WOACTIVITY"
              },
              "acttoolcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Actual Tool Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Actual Tool Cost",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "actlabcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Actual Labor Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Actual Labor Cost",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "estatapprlabhrs": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Estimate Labor Hours at Approval",
                "persistent": true,
                "type": "number",
                "remarks": "Estimate of the work order's labor hours at the time of approval.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "respondby": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Respond By",
                "persistent": true,
                "type": "string",
                "remarks": "A Calculated field specifying when by a breakdown should be responded to.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "jpnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Job Plan",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the work order's job plan.",
                "maxLength": 12,
                "relation": "WOACTIVITY"
              },
              "estatapprlabcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Estimate Labor Cost at Approval",
                "persistent": true,
                "type": "number",
                "remarks": "Cost estimate of the work order's labor at the time of approval.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "lastcopylinkdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Last Time doclinks Copied",
                "persistent": true,
                "type": "string",
                "remarks": "The date time doclinks was copied from other related objects like asset,location,jobplan,safetyplan etc.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "routestopid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Route Stop",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "add a new field",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "status_maxvalue": {
                "type": "string"
              },
              "_rowstamp": {
                "type": "string"
              },
              "crewid_description": {
                "type": "string"
              },
              "worklocation": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Work Location",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifier of the Work Location that is to be responsible for the work.",
                "maxLength": 12,
                "relation": "WOACTIVITY"
              },
              "suspendflow": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Suspend Flow Control",
                "persistent": true,
                "type": "boolean",
                "remarks": "Flag used to suspend and resume flow control on a parent record.  Rolls down the hierarchy to all its child records.",
                "relation": "WOACTIVITY"
              },
              "status_description": {
                "type": "string"
              },
              "actintlabhrs": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Actual Hours of Internal Labor",
                "persistent": true,
                "type": "number",
                "remarks": "The hours of internal labor that are required for the task on the current work order.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "targetdesc": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Target Description",
                "persistent": true,
                "type": "string",
                "remarks": "Temporary target description for targeting CIs",
                "maxLength": 50,
                "relation": "WOACTIVITY"
              },
              "calcpriority": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Calculated Priority",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Calculated Work Priority",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "chargestore": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Charge to Store",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates whether charges on the WO should be added to the asset.",
                "relation": "WOACTIVITY"
              },
              "outlabcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Outside Labor Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Outside Labor Cost",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Organization Identifier",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "schedfinish": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Scheduled Finish",
                "persistent": true,
                "type": "string",
                "remarks": "Date and time the work is scheduled to completed.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "justifypriority": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Priority Justification",
                "persistent": true,
                "type": "string",
                "remarks": "Describes why the work order received the priority it has been assigned. To enter or view additional information, click the Long Description button.",
                "maxLength": 50,
                "relation": "WOACTIVITY"
              },
              "inctasksinsched": {
                "default": true,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Include Tasks in Schedule",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates that this work order's tasks will be included in the schedule view.",
                "relation": "WOACTIVITY"
              },
              "cinum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Configuration Item",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Configuration Item",
                "maxLength": 12,
                "relation": "WOACTIVITY"
              },
              "flowcontrolled": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Under Flow Control",
                "persistent": true,
                "type": "boolean",
                "remarks": "Flag used to indicate a records participation in flow control.  When applied to a parent, it rolls down the hierarchy to all its child records.",
                "relation": "WOACTIVITY"
              },
              "storeroommtlstatus": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Storeroom Material Status",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The availability status of storeroom materials on the current work order.",
                "maxLength": 20,
                "relation": "WOACTIVITY"
              },
              "actstart": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Actual Start",
                "persistent": true,
                "type": "string",
                "remarks": "Date and time the work was actually started.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "description": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Summary",
                "persistent": true,
                "type": "string",
                "remarks": "Describes the work. To enter or view additional information, click the Long Description button.",
                "maxLength": 100,
                "relation": "WOACTIVITY"
              },
              "externalrefid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "External Reference ID",
                "persistent": true,
                "type": "string",
                "remarks": "External Reference ID",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "storeroommtlstatus_maxvalue": {
                "type": "string"
              },
              "estatapproutlabcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Estiamted Hours of External Labor",
                "persistent": true,
                "type": "number",
                "remarks": "The cost of external labor for the task on the current work order at the time it was approved.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "djpapplied": {
                "default": "NO",
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Dynamic Job Plan applied",
                "persistent": true,
                "type": "string",
                "remarks": "This flag can be set to YES, NO, ERROR",
                "maxLength": 5,
                "relation": "WOACTIVITY"
              },
              "sneconstraint": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Start No Earlier Than",
                "persistent": true,
                "type": "string",
                "remarks": "The earliest date at which work should start.  Scheduled dates should be after this date.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "estoutlabhrs": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Estimated Hours of External Labor",
                "persistent": true,
                "type": "number",
                "remarks": "The estimated hours of external labor that are required for the task on the current work order.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "wosequence": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Sequence",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Indicates the sequence in which to execute the work orders in a work order hierarchy.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "actintlabcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Actual Cost of Internal Labor",
                "persistent": true,
                "type": "number",
                "remarks": "The cost of internal labor for the task on the current work order.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "owner": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Owner",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The person currently responsible for the work from a service management perspective.",
                "maxLength": 100,
                "relation": "WOACTIVITY"
              },
              "calcorgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Organization associated with the calculation calendar, and used with the Calendar and Shift fields to calculate the Target Contact, Target Response, and Target Resolution dates on a ticket or work order. Click the Detail Menu button to select an organization or go to the Organizations application to create one.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "wolo10": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Wolo10",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Extra Field",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "environment": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Environment",
                "persistent": true,
                "type": "string",
                "remarks": "This field defines the environment in which the change is taking place.",
                "maxLength": 50,
                "relation": "WOACTIVITY"
              },
              "wogroup": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "WO Group",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "This column is used to enhance performance of the Work Orders app.",
                "maxLength": 25,
                "relation": "WOACTIVITY"
              },
              "schedstart": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Scheduled Start",
                "persistent": true,
                "type": "string",
                "remarks": "Date and time the work is scheduled to begin.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "location": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Location",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the work order's location. This is not necessarily the asset's location, however, if an asset is entered, its location will default here",
                "maxLength": 12,
                "relation": "WOACTIVITY"
              },
              "risk": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Risk Assessment",
                "persistent": true,
                "type": "string",
                "remarks": "Defines the risk level of the work. Risk may be a numeric value or a term such as High, Medium, Low, or some other value based upon your business definitions.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "haschildren": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Has Children",
                "persistent": true,
                "type": "boolean",
                "remarks": "Y if WO has children N if it has no children",
                "relation": "WOACTIVITY"
              },
              "apptrequired": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Appointment Required",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates if an appointment is required for the work order. Tasks that are created for this work order inherit this value, but can be modified.",
                "relation": "WOACTIVITY"
              },
              "facilityid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Facility ID",
                "persistent": true,
                "type": "string",
                "remarks": "Facility ID for Indoor map",
                "maxLength": 256,
                "relation": "WOACTIVITY"
              },
              "historyflag": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "History",
                "persistent": true,
                "type": "boolean",
                "remarks": "History Flag",
                "relation": "WOACTIVITY"
              },
              "pluscnextdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Next Calibration Due Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date the next work order is scheduled to be generated from the PM. The Next Due Date field is NULL unless there is an integer value in the Frequency field.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "parentchgsstatus": {
                "default": true,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Inherit Status Changes",
                "persistent": true,
                "type": "boolean",
                "remarks": "Specifies whether the work order's status will change when its parent work order's status changes. If the check box is selected (the default), the work order's status will change as its parent's status changes. If the check box is cleared, the work order's status will be independent of its parent's status.",
                "relation": "WOACTIVITY"
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
                "relation": "WOACTIVITY"
              },
              "lms": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Requires Dedicated Location Maintenance Window",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates that the work must be performed during a dedicated maintenance window.",
                "relation": "WOACTIVITY"
              },
              "wojp1": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wojp1",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "wojp2": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wojp2",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "wojp3": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wojp3",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "genforpolineid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "PO Line ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "POLINEID number that required the work",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "wojp4": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Wojp4",
                "persistent": true,
                "type": "number",
                "remarks": "Extra Field",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "wojp5": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Wojp5",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "href": {
                "type": "string"
              },
              "pmduedate": {
                "searchType": "EXACT",
                "subType": "DATE",
                "title": "PM Due Date",
                "persistent": true,
                "type": "string",
                "remarks": "From the original Next Due Date of the PM",
                "maxLength": 4,
                "relation": "WOACTIVITY"
              },
              "contract": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Contract",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Asset Service Contract",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "pctaskcomp": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Percent complete by tasks completed",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Percent complete by tasks completed",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "actlabhrs": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Actual Labor Hours",
                "persistent": true,
                "type": "number",
                "remarks": "Actual Labor Hours",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "measurementvalue": {
                "searchType": "EXACT",
                "scale": 3,
                "subType": "DECIMAL",
                "title": "Measurement Value",
                "persistent": true,
                "type": "number",
                "remarks": "Measurement value recorded. This field becomes read-only when you enter a value and save the record. If you enter a measurement for a measurement point, Maximo copies the new measurement and the measurement date to the Measurement table. If you enter a measurement without a measurement point, MAXIMO saves the measurement data with the work order. If you change the asset on a work order Maximo does not update the Measurement Value field.",
                "maxLength": 16,
                "relation": "WOACTIVITY"
              },
              "intshift": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Interruptible shift",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Work will be interrupted for only this shift in Graphical Scheduling application if value supplied",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "phone": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Phone",
                "persistent": true,
                "type": "string",
                "remarks": "The phone number (usually a work site telephone number) associated with the work order. If the Reported By person has a phone number associated with it, that phone number is the default for this field.",
                "maxLength": 20,
                "relation": "WOACTIVITY"
              },
              "actservcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Actual Service Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Total actual service cost against this work order.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "reqasstdwntime": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Require Asset Downtime",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates if the asset requires downtime while work is performed.",
                "relation": "WOACTIVITY"
              },
              "estmatcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Estimated Material Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Estimated Material Cost",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "targcompdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Target Finish",
                "persistent": true,
                "type": "string",
                "remarks": "Date the work is targeted to be completed.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "origrecordclass": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Orginal Record Class",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Class of the original record",
                "maxLength": 16,
                "relation": "WOACTIVITY"
              },
              "status": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Status",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Status of the work.",
                "maxLength": 16,
                "relation": "WOACTIVITY"
              },
              "pcphys": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Physical percent complete",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Physical percent complete",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "commoditygroup": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Service Group",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Defines the service group for the work order, for example: IT, production, facility, or fleet.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "problemcode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Problem Code",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The problem being reported based on the defined Failure Class. This is generally the second level of the failure reporting hierarchy.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "esttoolcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Estimated Tool Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Estimated Tool Cost",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "reportedby": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Reported By",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the person reporting the work order.",
                "maxLength": 82,
                "relation": "WOACTIVITY"
              },
              "unitsofwork": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Work Units",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Work Unit",
                "maxLength": 16,
                "relation": "WOACTIVITY"
              },
              "los": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Requires Location Downtime",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates that the work must be performed when the location is not in use, and available for maintenance.",
                "relation": "WOACTIVITY"
              },
              "reasonforchange": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Reason for Change",
                "persistent": true,
                "type": "string",
                "remarks": "Describes the reason for the change. To enter or view additional information, click the Long Description button.",
                "maxLength": 20,
                "relation": "WOACTIVITY"
              },
              "splanreviewdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Has safetyplan review date?",
                "persistent": true,
                "type": "string",
                "remarks": "Does this Work Order safetplan is reviwed?",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "pluscjprevnum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Job Plan Revision Number",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Displays the revision number of the Job Plan the work order was generated with.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "assetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Asset",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the asset.",
                "maxLength": 25,
                "relation": "WOACTIVITY"
              },
              "persongroup": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Person Group",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the work group",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "crewid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Crew",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "ID for a given crew within an craft",
                "maxLength": 12,
                "relation": "WOACTIVITY"
              },
              "outmatcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Outside Material Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Outside Material Cost",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "doclinks": {
                "objectName": "DOCLINKS",
                "type": "array",
                "items": {
                  "subType": "DOCLINKS",
                  "type": "object",
                  "properties": {
                    "member": {
                      "type": "array",
                      "items": {
                        "definition": {
                          "subSchema": {
                            "$ref": "oslc/jsonschemas/mxapiwodetail/woactivity/doclinks/attachment"
                          }
                        },
                        "type": "object"
                      }
                    }
                  }
                },
                "cardinality": "UNDEFINED",
                "relation": "DOCLINKS"
              },
              "onbehalfof": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Requested on Behalf Of",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies for whom this work order has been created. For example, if someone did not have access to a computer, another user could create the work order on behalf of that person.",
                "maxLength": 82,
                "relation": "WOACTIVITY"
              },
              "observation": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Observation",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Describes the observation of the asset or location.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "changeby": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Changed By",
                "persistent": true,
                "type": "string",
                "remarks": "Modified By",
                "maxLength": 100,
                "relation": "WOACTIVITY"
              },
              "interruptible": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Interruptible",
                "persistent": true,
                "type": "boolean",
                "remarks": "Specifies whether the work order is allowed to be stopped once the work has begun and then restarted. If the check box is selected, the work can be stopped. If the check box is cleared, the work cannot be stopped and restarted.",
                "relation": "WOACTIVITY"
              },
              "remdur": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Time Remaining",
                "persistent": true,
                "type": "number",
                "remarks": "Number of remaining hours needed to complete the work order. Maximo calculates the value from the Duration minus the number of hours worked so far. You can modify this value until the work order is closed.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "sendersysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Sender System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Column used by ERP-Integration (APIs)",
                "maxLength": 50,
                "relation": "WOACTIVITY"
              },
              "estlabcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Estimated Labor Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Estimated Labor Cost",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "lead": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Lead",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Lead person (general the lead person within a craft, such as the lead welder) responsible for the work.",
                "maxLength": 100,
                "relation": "WOACTIVITY"
              },
              "downtime": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Downtime",
                "persistent": true,
                "type": "boolean",
                "remarks": "Does the Asset have to be down for this work order?",
                "relation": "WOACTIVITY"
              },
              "workorderid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "WORKORDERID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Identifier",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "whomischangefor": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Whom is this change for",
                "persistent": true,
                "type": "string",
                "remarks": "Identifies whom a change is for.",
                "maxLength": 20,
                "relation": "WOACTIVITY"
              },
              "wojo1": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "WOJO1",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "wojo2": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "WOJO2",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "wojo3": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "WOJO3",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "wojo4": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "WOJO4",
                "persistent": true,
                "type": "number",
                "remarks": "Extra Field",
                "maxLength": 16,
                "relation": "WOACTIVITY"
              },
              "wojo5": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "WOJO5",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "wojo6": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "WOJO6",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "wojo7": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "WOJO7",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "wojo8": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "WOJO8",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "sourcesysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Source System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Source System ID",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "plussisgis": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Is GIS",
                "persistent": true,
                "type": "boolean",
                "remarks": "A Yes/No field to search for work orders that are linked or not linked to GIS features. Enter Y in this field to search for work orders that are linked to GIS features; enter N to search for work orders that are not linked.",
                "relation": "WOACTIVITY"
              },
              "ownersysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Owner System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Owner System ID",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "predessorwos": {
                "searchType": "NONE",
                "subType": "ALN",
                "title": "Predecessors",
                "type": "string",
                "remarks": "A non-persistent field to display the work orders predecessor work orders.",
                "maxLength": 256,
                "relation": "WOACTIVITY"
              },
              "actoutlabcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Actual Cost of External Labor",
                "persistent": true,
                "type": "number",
                "remarks": "The cost of external labor that are required for the task on the current work order.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "estatapprservcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Estimate Service Cost at Approval",
                "persistent": true,
                "type": "number",
                "remarks": "Cost estimate of the work order's services at the time of approval.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "faildate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Failed Date",
                "persistent": true,
                "type": "string",
                "remarks": "Actual Failure Date",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "ignoresrmavail": {
                "default": true,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Ignore Storeroom Availability For Work Order Status",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates whether to ignore the availability of items in the storeroom for the work order status approval.",
                "relation": "WOACTIVITY"
              },
              "origrecordid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Originating Record",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Defines the source record used to create this record.",
                "maxLength": 25,
                "relation": "WOACTIVITY"
              },
              "outtoolcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Outside Tool Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Outside Tool Cost",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "estatapproutlabhrs": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Estiamted Cost of External Labor",
                "persistent": true,
                "type": "number",
                "remarks": "The hours of internal labor for the task on the current work order at the time it was approved.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "estatapprintlabcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Approved Cost of Internal Labor",
                "persistent": true,
                "type": "number",
                "remarks": "The cost of internal labor for the task on the current work order at the time it was approved.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "firstapprstatus": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "First Approve Status",
                "persistent": true,
                "type": "string",
                "remarks": "Identifies the first status change which approved the work order. This value is used to determine if the work order record has ever been approved. Work orders that have been approved are not allowed to be deleted.",
                "maxLength": 16,
                "relation": "WOACTIVITY"
              },
              "pmnextduedate": {
                "searchType": "EXACT",
                "subType": "DATE",
                "title": "PM Next Due Date",
                "persistent": true,
                "type": "string",
                "remarks": "From the next Next Due Date of the PM",
                "maxLength": 4,
                "relation": "WOACTIVITY"
              },
              "totalworkunits": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Total Work Units",
                "persistent": true,
                "type": "number",
                "remarks": "Total Work Units for WO, including header asset and assets in MultiAssetLocCI table",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "verification": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Verification",
                "persistent": true,
                "type": "string",
                "remarks": "Describes how to verify that the change or release was successful; or indicate that the change or release was successful.",
                "maxLength": 20,
                "relation": "WOACTIVITY"
              },
              "woisswap": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Is this an Asset Swap",
                "persistent": true,
                "type": "boolean",
                "remarks": "Identifies if the Move is a Move or a Swap",
                "relation": "WOACTIVITY"
              },
              "woacceptscharges": {
                "default": true,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Accepts Charges",
                "persistent": true,
                "type": "boolean",
                "remarks": "Specifies whether or not the work order accepts charges. If the check box is selected (the default), the work order accepts charges. If the check box is cleared, the work order does not accept charges, and you cannot enter charges on the work order.",
                "relation": "WOACTIVITY"
              },
              "repairlocflag": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Repair Facility Required",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates whether the repair location is required.",
                "relation": "WOACTIVITY"
              },
              "changedate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Changed Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date the work order was last modified.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "woclass_description": {
                "type": "string"
              },
              "djperror": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Calculation error",
                "persistent": true,
                "type": "string",
                "remarks": "The error message when trying to apply the dynamic job plan",
                "maxLength": 400,
                "relation": "WOACTIVITY"
              },
              "woclass": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Work Order Class",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The class of the work order record.",
                "maxLength": 16,
                "relation": "WOACTIVITY"
              },
              "backoutplan": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Back Out Plan",
                "persistent": true,
                "type": "string",
                "remarks": "Describes the back out plan if the change needs to be reversed. To enter or view additional information, click the Long Description button.",
                "maxLength": 50,
                "relation": "WOACTIVITY"
              },
              "woclass_maxvalue": {
                "type": "string"
              },
              "levelid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Floor ID",
                "persistent": true,
                "type": "string",
                "remarks": "Floor ID for Indoor map",
                "maxLength": 256,
                "relation": "WOACTIVITY"
              },
              "actoutlabhrs": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Actual Hours of External Labor",
                "persistent": true,
                "type": "number",
                "remarks": "The hours of external labor that are required for the task on the current work order.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "_id": {
                "type": "string"
              },
              "supervisor": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Supervisor",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Supervisor of the work. Maximo copies this information from the job plan, if there is one. You also can select a supervisor.",
                "maxLength": 100,
                "relation": "WOACTIVITY"
              },
              "calccalendar": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Calendar",
                "persistent": true,
                "type": "string",
                "remarks": "Business days and times used to calculate the Target Contact, Target Response, and Target Resolution dates on a ticket or work order. Click the Detail Menu to select a calendar or go to the Calendars application to create one.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "targstartdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Target Start",
                "persistent": true,
                "type": "string",
                "remarks": "Date the work is targeted to begin.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "ams": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Requires Dedicated Asset Maintenance Window",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates that the work must be performed during a dedicated maintenance window.",
                "relation": "WOACTIVITY"
              },
              "jobtaskid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "JOBTASKID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Identifier",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "reportdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Reported Date",
                "persistent": true,
                "type": "string",
                "remarks": "The date work order was reported",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "pluscfrequnit_maxvalue": {
                "type": "string"
              },
              "newchildclass": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "New Child Class",
                "persistent": true,
                "type": "string",
                "remarks": "Identifies the child work order class.",
                "maxLength": 16,
                "relation": "WOACTIVITY"
              },
              "_imagelibref": {
                "type": "string"
              },
              "worts3": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Worts3",
                "persistent": true,
                "type": "string",
                "remarks": "Crossover field from Route_Stop.RTS3",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "worts4": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Worts4",
                "persistent": true,
                "type": "string",
                "remarks": "Crossover field from Route_Stop.RTS4",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "worts1": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Worts1",
                "persistent": true,
                "type": "string",
                "remarks": "Crossover field from Route_Stop.RTS1",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "worts2": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Worts2",
                "persistent": true,
                "type": "string",
                "remarks": "Crossover field from Route_Stop.RTS2",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "worts5": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Worts5",
                "persistent": true,
                "type": "number",
                "remarks": "Crossover field from Route_Stop.RTS5",
                "maxLength": 16,
                "relation": "WOACTIVITY"
              },
              "measuredate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Measurement Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date and time the measurement was taken.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "availstatusdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Material Status Last Updated",
                "persistent": true,
                "type": "string",
                "remarks": "The date and time that the material status was last updated.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "classstructureid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Class Structure",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The Class Structure ID.",
                "maxLength": 20,
                "relation": "WOACTIVITY"
              },
              "worktype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Work Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the work order's type. Some example types are: preventive maintenance, corrective maintenance, emergency maintenace, capital project, and event report.",
                "maxLength": 5,
                "relation": "WOACTIVITY"
              },
              "estintlabhrs": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Estimated Hours of Internal Labor",
                "persistent": true,
                "type": "number",
                "remarks": "The estimated hours of internal labor that are required for the task on the current work order.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "inspector": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Inspector",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Inspector responsible for the work, measurement or observation.",
                "maxLength": 100,
                "relation": "WOACTIVITY"
              },
              "woeq1": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Woeq1",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field Copied From Asset",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "workpackmtlstatus_maxvalue": {
                "type": "string"
              },
              "woeq2": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Woeq2",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field Copied From Asset",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "woeq3": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Woeq3",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field Copied From Asset",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "genforporevision": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "PO Revision",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Revision number of the purchase order. Indicates how many times a purchase order has been revised.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "woeq4": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Woeq4",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field Copied From Asset",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "woeq5": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Woeq5",
                "persistent": true,
                "type": "number",
                "remarks": "Extra Field Copied From Asset",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "woeq6": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Woeq6",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field Copied From Asset",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "glaccount": {
                "searchType": "WILDCARD",
                "subType": "GL",
                "title": "GL Account",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "General ledger account code to which work order costs are charged. The GL account consists of up to four components: cost center, activity, resource, and element, each separated by a hyphen. If the work order was generated from a PM, Maximo copies the GL account from the PM. This field is read-only if the Charge to Store? check box is selected.",
                "maxLength": 23,
                "relation": "WOACTIVITY"
              },
              "pcpchangedate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Physical percent complete - When last changed",
                "persistent": true,
                "type": "string",
                "remarks": "Physical percent complete - When last changed",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "woeq7": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Woeq7",
                "persistent": true,
                "type": "number",
                "remarks": "Extra Field Copied From Asset",
                "maxLength": 16,
                "relation": "WOACTIVITY"
              },
              "failurecode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Failure Class",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Failure class of the defined work asset. The failure class is the top level of the failure hierarchy.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "milestone": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Is Milestone",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates if this Work Order is a milestone.",
                "relation": "WOACTIVITY"
              },
              "woeq8": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Woeq8",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field Copied From Asset",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "dirissuemtlstatus": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Direct Issue Material Status",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The availability status of direct issue materials on the current work order.",
                "maxLength": 20,
                "relation": "WOACTIVITY"
              },
              "woeq9": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Woeq9",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field Copied From Asset",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "wolo2": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wolo2",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "wolo1": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wolo1",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "woeq11": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Woeq11",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field Copied From Asset",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "wolo4": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wolo4",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "pluscphyloc": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Physical Location",
                "persistent": true,
                "type": "string",
                "remarks": "Enter a detailed description of the location of the asset or specify the location information using a hierarchy that you created. Using a hierarchy provides consistent identification and groups assets efficiently.",
                "maxLength": 250,
                "relation": "WOACTIVITY"
              },
              "woeq12": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Woeq12",
                "persistent": true,
                "type": "number",
                "remarks": "Extra Field Copied From Asset",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "wolo3": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wolo3",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "woeq13": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Woeq13",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "wolo6": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Wolo6",
                "persistent": true,
                "type": "number",
                "remarks": "Extra Field",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "actfinish": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Actual Finish",
                "persistent": true,
                "type": "string",
                "remarks": "Date and time the work was actually completed.",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "estintlabcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Estimated Cost of Internal Labor",
                "persistent": true,
                "type": "number",
                "remarks": "The estimated cost of internal labor for the task on the current work order.",
                "maxLength": 11,
                "relation": "WOACTIVITY"
              },
              "woeq14": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Woeq14",
                "persistent": true,
                "type": "number",
                "remarks": "Extra Field",
                "maxLength": 16,
                "relation": "WOACTIVITY"
              },
              "wolo5": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wolo5",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "inspformnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Inspection Form",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The number of the inspection form.",
                "maxLength": 12,
                "relation": "WOACTIVITY"
              },
              "wolo8": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Wolo8",
                "persistent": true,
                "type": "number",
                "remarks": "Extra Field",
                "maxLength": 16,
                "relation": "WOACTIVITY"
              },
              "wolo7": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Wolo7",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "repfacsiteid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Repair Facility Site",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The site for the repair facility.",
                "maxLength": 8,
                "relation": "WOACTIVITY"
              },
              "woeq10": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Woeq10",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field Copied From Asset",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              },
              "wolo9": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wolo9",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "WOACTIVITY"
              }
            },
            "required": [
              "actlabcost",
              "actlabhrs",
              "actmatcost",
              "actservcost",
              "acttoolcost",
              "chargestore",
              "disabled",
              "downtime",
              "estatapprlabcost",
              "estatapprlabhrs",
              "estatapprmatcost",
              "estatapprservcost",
              "estatapprtoolcost",
              "estdur",
              "estlabcost",
              "estlabhrs",
              "estmatcost",
              "estservcost",
              "esttoolcost",
              "haschildren",
              "hasfollowupwork",
              "historyflag",
              "istask",
              "langcode",
              "newchildclass",
              "orgid",
              "outlabcost",
              "outmatcost",
              "outtoolcost",
              "status",
              "statusdate",
              "woclass",
              "woisswap"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "WOACTIVITY"
        },
        "haschildren": {
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Has Children",
          "persistent": true,
          "type": "boolean",
          "remarks": "Y if WO has children N if it has no children"
        },
        "apptrequired": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Appointment Required",
          "persistent": true,
          "type": "boolean",
          "remarks": "Indicates if an appointment is required for the work order. Tasks that are created for this work order inherit this value, but can be modified."
        },
        "facilityid": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Facility ID",
          "persistent": true,
          "type": "string",
          "remarks": "Facility ID for Indoor map",
          "maxLength": 256
        },
        "historyflag": {
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "History",
          "persistent": true,
          "type": "boolean",
          "remarks": "Yes/No field or check box that specifies whether a record is a history record or is currently active. History records are complete, closed, canceled, etc. If a Y is in the History? field or the check box is selected, the record is a history record. On the List tab or the More Search Fields dialog box, you can enter a Y in the History? field to include only history records in the search results. If an N is in the field, Maximo includes only currently active records in the search results. If the field is empty (null), Maximo includes history and active records in the search results."
        },
        "pluscnextdate": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Next Calibration Due Date",
          "persistent": true,
          "type": "string",
          "remarks": "Date the next work order is scheduled to be generated from the PM. The Next Due Date field is NULL unless there is an integer value in the Frequency field.",
          "maxLength": 10
        },
        "moddowntimehist": {
          "objectName": "MODDOWNTIMEHIST",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/MODDOWNTIMEHIST",
            "pk": [
              "startdate",
              "enddate",
              "assetnum",
              "siteid"
            ],
            "title": "WORKORDER/MODDOWNTIMEHIST",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/moddowntimehist",
            "properties": {
              "_rowstamp": {
                "type": "string"
              },
              "localref": {
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
              }
            }
          },
          "cardinality": "UNDEFINED",
          "relation": "MODDOWNTIMEHIST"
        },
        "parentchgsstatus": {
          "default": true,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Inherit Status Changes",
          "persistent": true,
          "type": "boolean",
          "remarks": "Specifies whether the work order's status will change when its parent work order's status changes. If the check box is selected (the default), the work order's status will change when the parent work order's status changes. If the check box is cleared, the work order's status will not change when the parent work order's status changes."
        },
        "lms": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Requires Location Maintenance Window",
          "persistent": true,
          "type": "boolean",
          "remarks": "Indicates that the work must be performed during a dedicated maintenance window."
        },
        "wojp1": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Wojp1",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "wojp2": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Wojp2",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "wojp3": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Wojp3",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "genforpolineid": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "BIGINT",
          "title": "PO Line ID",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "POLINEID number that required the work",
          "maxLength": 11
        },
        "wojp4": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Wojp4",
          "persistent": true,
          "type": "number",
          "remarks": "Extra Field",
          "maxLength": 11
        },
        "wojp5": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Wojp5",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "href": {
          "type": "string"
        },
        "invreserve": {
          "objectName": "INVRESERVE",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/INVRESERVE",
            "pk": [
              "siteid",
              "requestnum"
            ],
            "title": "WORKORDER/INVRESERVE",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/invreserve",
            "properties": {
              "ownersysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Owner System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Owner System ID",
                "maxLength": 10,
                "relation": "MXINTINVRES"
              },
              "pendingqty": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Pending Quantity",
                "persistent": true,
                "type": "number",
                "remarks": "The pending quantity of items to be issued or transferred.",
                "maxLength": 16,
                "relation": "MXINTINVRES"
              },
              "localref": {
                "type": "string"
              },
              "reservedqty": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Reserved Quantity",
                "persistent": true,
                "type": "number",
                "remarks": "The number of items that are reserved and not issued.",
                "maxLength": 16,
                "relation": "MXINTINVRES"
              },
              "description": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Description",
                "persistent": true,
                "type": "string",
                "remarks": "Special instructions for this item.",
                "maxLength": 100,
                "relation": "MXINTINVRES"
              },
              "externalrefid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "External Reference ID",
                "persistent": true,
                "type": "string",
                "remarks": "External Reference ID",
                "maxLength": 10,
                "relation": "MXINTINVRES"
              },
              "invreserveid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "INVRESERVEID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Identifier",
                "maxLength": 11,
                "relation": "MXINTINVRES"
              },
              "oplocation": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Location",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The operating location of the reserved item.",
                "maxLength": 12,
                "relation": "MXINTINVRES"
              },
              "requestedby": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Requested By",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Name of person requesting the item.",
                "maxLength": 100,
                "relation": "MXINTINVRES"
              },
              "_rowstamp": {
                "type": "string"
              },
              "polineid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Internal POLine Identifier reference",
                "maxLength": 11,
                "relation": "MXINTINVRES"
              },
              "stagedqty": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Staged Quantity",
                "persistent": true,
                "type": "number",
                "remarks": "The quantity of items that have been staged.",
                "maxLength": 16,
                "relation": "MXINTINVRES"
              },
              "_imagelibref": {
                "type": "string"
              },
              "porevisionnum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "PO Revision",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Revision number of the purchase order. Indicates how many times a purchase order has been revised.",
                "maxLength": 11,
                "relation": "MXINTINVRES"
              },
              "assetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Asset",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Asset Number",
                "maxLength": 25,
                "relation": "MXINTINVRES"
              },
              "href": {
                "type": "string"
              },
              "conditioncode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Condition Code",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Condition code associated with the reserved item. A condition code allows you to track the balance and value of each item. You can apply different rates to an item as its condition changes from use, such as from new to used. Click the Select Value button to choose a condition code.",
                "maxLength": 30,
                "relation": "MXINTINVRES"
              },
              "pickedqty": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Picked Quantity",
                "persistent": true,
                "type": "number",
                "remarks": "The quantity of items that are picked.",
                "maxLength": 16,
                "relation": "MXINTINVRES"
              },
              "requestnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Request",
                "persistent": true,
                "type": "string",
                "remarks": "Unique identification number that is generated for each reservation.",
                "maxLength": 20,
                "relation": "MXINTINVRES"
              },
              "issueto": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Issue To",
                "persistent": true,
                "type": "string",
                "remarks": "Issue to a Laborcode or Craft",
                "maxLength": 8,
                "relation": "MXINTINVRES"
              },
              "description_longdescription": {
                "searchType": "WILDCARD",
                "subType": "LONGALN",
                "title": "Details",
                "type": "string",
                "remarks": "Long Description for Special instructions.",
                "maxLength": 32000,
                "relation": "MXINTINVRES"
              },
              "binnum": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Default Bin",
                "persistent": true,
                "type": "string",
                "remarks": "The identifier of default bin of inventory",
                "maxLength": 8,
                "relation": "MXINTINVRES"
              },
              "requesteddate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Requested Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date the request for this item was made. Click the Select Date and Time button to use the calendar control.",
                "maxLength": 10,
                "relation": "MXINTINVRES"
              },
              "actualqty": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Actual Quantity",
                "persistent": true,
                "type": "number",
                "remarks": "Number of this item already issued against the reservation.",
                "maxLength": 16,
                "relation": "MXINTINVRES"
              },
              "polinenum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "PO Line",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "hasList": true,
                "remarks": "Line number of the item on the associated purchase order.",
                "maxLength": 11,
                "relation": "MXINTINVRES"
              },
              "sendersysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Sender System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Column used by ERP-Integration (APIs)",
                "maxLength": 50,
                "relation": "MXINTINVRES"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Organization Identifier",
                "maxLength": 8,
                "relation": "MXINTINVRES"
              },
              "restype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Reservation Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Specify the type of reservation, depending on whether it is a firm request for material or not (hard or soft). The reservation type may also be set by automatic processing (APHARD or APSOFT), where a calculation of the required date of the reservation determines the reservation type.",
                "maxLength": 16,
                "relation": "MXINTINVRES"
              },
              "itemnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Item",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the item for which you want to add or change a reservation. Click the Detail Menu button to choose an item.",
                "maxLength": 30,
                "relation": "MXINTINVRES"
              },
              "glaccount": {
                "searchType": "WILDCARD",
                "subType": "GL",
                "title": "GL Account",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The GL Account to be debited on issue.",
                "maxLength": 23,
                "relation": "MXINTINVRES"
              },
              "initflag": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Initialized Flag",
                "persistent": true,
                "type": "boolean",
                "remarks": "Initiated flag.",
                "relation": "MXINTINVRES"
              },
              "mrnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Requisition",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Requisition number associated with this transaction. Click the Select Value button to choose a requisition.",
                "maxLength": 8,
                "relation": "MXINTINVRES"
              },
              "directreq": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Direct Request",
                "persistent": true,
                "type": "boolean",
                "remarks": "If item is ordered outside of standard inventory replenishment.",
                "relation": "MXINTINVRES"
              },
              "tostoreloc": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "To Storeroom",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The storeroom location the inventory items are charged to.",
                "maxLength": 12,
                "relation": "MXINTINVRES"
              },
              "wogroup": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Work Order",
                "persistent": true,
                "type": "string",
                "remarks": "The identifier of the work order that is related to this record.",
                "maxLength": 25,
                "relation": "MXINTINVRES"
              },
              "fincntrlid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "FCID",
                "persistent": true,
                "type": "string",
                "remarks": "Financial Control Identifier",
                "maxLength": 8,
                "relation": "MXINTINVRES"
              },
              "itemsetid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Item Set",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Item set identifier for this item.",
                "maxLength": 8,
                "relation": "MXINTINVRES"
              },
              "mrlinenum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Requisition Line",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "hasList": true,
                "remarks": "Line number on the requestion for the item being reserved.",
                "maxLength": 11,
                "relation": "MXINTINVRES"
              },
              "ponum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Purchase Order",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The purchase order to which the item reservation is associated.",
                "maxLength": 8,
                "relation": "MXINTINVRES"
              },
              "location": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Storeroom",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Storeroom location of the reserved item.",
                "maxLength": 12,
                "relation": "MXINTINVRES"
              },
              "_id": {
                "type": "string"
              },
              "hardbackorder": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Hard Backorder",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates whether the requested material is related to a backorder reservation. The Backorder reservation type indicates that a hard reservation is needed for the item and that the system can create hard reservations only when the available balance can satisfy the inventory record.",
                "relation": "MXINTINVRES"
              },
              "storelocsiteid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Storeroom Site",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "StoreLoc Siteid",
                "maxLength": 8,
                "relation": "MXINTINVRES"
              },
              "dellocation": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Delivery Location",
                "persistent": true,
                "type": "string",
                "remarks": "Delivery location.",
                "maxLength": 12,
                "relation": "MXINTINVRES"
              },
              "sourcesysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Source System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Source System ID",
                "maxLength": 10,
                "relation": "MXINTINVRES"
              },
              "requireddate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Required Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date by which the item is needed on the work order. Click the Select Date and Time button to use the calendar control.",
                "maxLength": 10,
                "relation": "MXINTINVRES"
              },
              "shippedqty": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Shipped Quantity",
                "persistent": true,
                "type": "number",
                "remarks": "The quantity of items that have been shipped.",
                "maxLength": 16,
                "relation": "MXINTINVRES"
              }
            },
            "required": [
              "orgid",
              "requestnum",
              "restype",
              "storelocsiteid"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "MXINTINVRES"
        },
        "pmduedate": {
          "searchType": "EXACT",
          "subType": "DATE",
          "title": "PM Due Date",
          "persistent": true,
          "type": "string",
          "remarks": "From the original Next Due Date of the PM",
          "maxLength": 4
        },
        "contract": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Contract",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the warranty contract for the asset.",
          "maxLength": 8
        },
        "pctaskcomp": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "INTEGER",
          "title": "Percent complete by tasks completed",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Specifies the percent complete as calculated by tasks completed vs. planned.",
          "maxLength": 11
        },
        "actlabhrs": {
          "searchType": "EXACT",
          "scale": 0,
          "subType": "DURATION",
          "title": "Actual Labor Hours",
          "persistent": true,
          "type": "number",
          "remarks": "Actual Labor Hours",
          "maxLength": 8
        },
        "wpservice": {
          "objectName": "WPSERVICE",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/WPSERVICE",
            "pk": [
              "wpitemid"
            ],
            "title": "WORKORDER/WPSERVICE",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/wpservice",
            "properties": {
              "pr": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "PR",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Purchase requisition on which this direct issue service is ordered. Maximo populates this field after the work order is approved and you reorder direct issue items and services in the Inventory application.",
                "maxLength": 8,
                "relation": "SHOWPLANSERVICE"
              },
              "localref": {
                "type": "string"
              },
              "unitcosthaschanged": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Unit Cost Changed ",
                "persistent": true,
                "type": "boolean",
                "remarks": "Flag tracks if the unit cost has been overwritten by user. If N - field will be overwritten by MAXIMO on Approval. If Y - field will not be overwritten by MAXIMO on Approval.",
                "relation": "SHOWPLANSERVICE"
              },
              "_rowstamp": {
                "type": "string"
              },
              "prlinenum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "PR Line",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Line number on the purchase requisition for the service. Maximo populates this field after the work order is approved and you reorder direct issue items and services in the Inventory application.",
                "maxLength": 11,
                "relation": "SHOWPLANSERVICE"
              },
              "href": {
                "type": "string"
              },
              "taskid": {
                "searchType": "NONE",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Task",
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Identifies the task to which the service applies.",
                "maxLength": 11,
                "relation": "SHOWPLANSERVICE"
              },
              "vendorpackquantity": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Vendor Pack Quantity",
                "persistent": true,
                "type": "string",
                "remarks": "Vendor pack quantity for the item",
                "maxLength": 12,
                "relation": "SHOWPLANSERVICE"
              },
              "linecost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Line Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Calculated value. Maximo calculates the value using the following formula: Quantity x Unit Cost.",
                "maxLength": 11,
                "relation": "SHOWPLANSERVICE"
              },
              "requestnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Request",
                "persistent": true,
                "type": "string",
                "remarks": "Link to InvReserve",
                "maxLength": 20,
                "relation": "SHOWPLANSERVICE"
              },
              "issueto": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Issue To",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the Labor or Craft to whom the service will be issued.",
                "maxLength": 8,
                "relation": "SHOWPLANSERVICE"
              },
              "ratehaschanged": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Rate Changed",
                "persistent": true,
                "type": "boolean",
                "remarks": "Flag tracks if the tool rate has been overwritten by user. If N - field will be overwritten by MAXIMO on Approval. If Y - field will not be overwritten by MAXIMO on Approval.",
                "relation": "SHOWPLANSERVICE"
              },
              "wpitemid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "WPITEMID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Identifier",
                "maxLength": 11,
                "relation": "SHOWPLANSERVICE"
              },
              "modelnum": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Model",
                "persistent": true,
                "type": "string",
                "remarks": "Model number for the item or manufacturer part number",
                "maxLength": 8,
                "relation": "SHOWPLANSERVICE"
              },
              "restype_maxvalue": {
                "type": "string"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Organization Identifier",
                "maxLength": 8,
                "relation": "SHOWPLANSERVICE"
              },
              "restype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Reservation Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Specify the type of reservation depending on whether it is a firm request for material or not (hard or soft). The reservation type may also be set to automatic, in which case the reservation type (APHARD or APSOFT) is generated depending on the urgency of the order.",
                "maxLength": 16,
                "relation": "SHOWPLANSERVICE"
              },
              "itemnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Service",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the standard service.",
                "maxLength": 30,
                "relation": "SHOWPLANSERVICE"
              },
              "jobitemid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Job Item ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Job Item ID",
                "maxLength": 11,
                "relation": "SHOWPLANSERVICE"
              },
              "directreq": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Direct Issue",
                "persistent": true,
                "type": "boolean",
                "remarks": "This is to signify if the item on this reservation will be ordered outside of standard in",
                "relation": "SHOWPLANSERVICE"
              },
              "mktplcitem": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Marketplace Item",
                "persistent": true,
                "type": "boolean",
                "remarks": "Flag to determine the items from the marketplace.",
                "relation": "SHOWPLANSERVICE"
              },
              "wpm6": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpm6",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANSERVICE"
              },
              "wpm5": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Wpm4",
                "persistent": true,
                "type": "number",
                "remarks": "Extra field",
                "maxLength": 11,
                "relation": "SHOWPLANSERVICE"
              },
              "requiredate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Required Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date and time the service is needed.",
                "maxLength": 10,
                "relation": "SHOWPLANSERVICE"
              },
              "wpm4": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpm4",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANSERVICE"
              },
              "amcrew": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew",
                "persistent": true,
                "type": "string",
                "remarks": "Identifies the crew that performed the work.",
                "maxLength": 8,
                "relation": "SHOWPLANSERVICE"
              },
              "itemsetid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Item Set",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Item set identifier for this item.",
                "maxLength": 8,
                "relation": "SHOWPLANSERVICE"
              },
              "_id": {
                "type": "string"
              },
              "unitcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Unit Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Cost of the service at the time the work order is approved.",
                "maxLength": 11,
                "relation": "SHOWPLANSERVICE"
              },
              "linetype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Line Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the type of service, for example standard service (one that is used repeatedly, such as grounds maintenance or installation), or a service (a single-type purchase or not used often enough to maintain a vendor catalog for it, such as painting).",
                "maxLength": 15,
                "relation": "SHOWPLANSERVICE"
              },
              "wpm3": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Wpm3",
                "persistent": true,
                "type": "number",
                "remarks": "Extra filed",
                "maxLength": 16,
                "relation": "SHOWPLANSERVICE"
              },
              "description": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Description",
                "persistent": true,
                "type": "string",
                "remarks": "Describes the service. To enter or view additional information, click the Long Description button.",
                "maxLength": 100,
                "relation": "SHOWPLANSERVICE"
              },
              "wpm2": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpm2",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANSERVICE"
              },
              "wpm1": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Wpm1",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "SHOWPLANSERVICE"
              },
              "storelocsite": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Storeroom Site",
                "persistent": true,
                "type": "string",
                "remarks": "Specifies the Storeroom's Site of an item",
                "maxLength": 8,
                "relation": "SHOWPLANSERVICE"
              },
              "manufacturer": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Manufacturer",
                "persistent": true,
                "type": "string",
                "remarks": "Manufacturer of the item",
                "maxLength": 12,
                "relation": "SHOWPLANSERVICE"
              },
              "rate": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Rate",
                "persistent": true,
                "type": "number",
                "remarks": "Rate",
                "maxLength": 11,
                "relation": "SHOWPLANSERVICE"
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
                "hasList": true,
                "remarks": "Suggested vendor from whom to order the service.",
                "maxLength": 12,
                "relation": "SHOWPLANSERVICE"
              },
              "vendorwarehouse": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Vendor Warehouse",
                "persistent": true,
                "type": "string",
                "remarks": "Vendor warehouse for the item",
                "maxLength": 12,
                "relation": "SHOWPLANSERVICE"
              },
              "conditioncode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Condition Code",
                "persistent": true,
                "type": "string",
                "remarks": "The condition of the item planned for a given work order",
                "maxLength": 30,
                "relation": "SHOWPLANSERVICE"
              },
              "wplaborref": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Crew Reference",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "This field identifies tool records to the associated joblabor record.",
                "maxLength": 11,
                "relation": "SHOWPLANSERVICE"
              },
              "itemqty": {
                "default": "1",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Quantity",
                "persistent": true,
                "type": "number",
                "remarks": "Quantity of the service for the work plan task.",
                "maxLength": 16,
                "relation": "SHOWPLANSERVICE"
              },
              "hours": {
                "default": "0:00",
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Tool Hours",
                "persistent": true,
                "type": "number",
                "remarks": "Number of Hours for Which a Tool is Used",
                "maxLength": 8,
                "relation": "SHOWPLANSERVICE"
              },
              "description_longdescription": {
                "searchType": "WILDCARD",
                "subType": "LONGALN",
                "title": "Details",
                "type": "string",
                "remarks": "Long Description for Description for the item",
                "maxLength": 32000,
                "relation": "SHOWPLANSERVICE"
              },
              "vendorpackcode": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Vendor Pack Code",
                "persistent": true,
                "type": "string",
                "remarks": "Vendor pack code for the item",
                "maxLength": 12,
                "relation": "SHOWPLANSERVICE"
              },
              "vendorunitcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Vendor Unit Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Unit cost in vendor currency",
                "maxLength": 11,
                "relation": "SHOWPLANSERVICE"
              },
              "amcrewtype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew Type",
                "persistent": true,
                "type": "string",
                "remarks": "The type of crew that should perform the work.",
                "maxLength": 8,
                "relation": "SHOWPLANSERVICE"
              },
              "orderunit": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Order Unit",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Order unit for the item",
                "maxLength": 16,
                "relation": "SHOWPLANSERVICE"
              },
              "restype_description": {
                "type": "string"
              },
              "catalogcode": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Catalog #",
                "persistent": true,
                "type": "string",
                "remarks": "Catalog code for the item or vendor part number",
                "maxLength": 30,
                "relation": "SHOWPLANSERVICE"
              },
              "location": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Storeroom",
                "persistent": true,
                "type": "string",
                "remarks": "Primary or Alternate Location From Inventory",
                "maxLength": 12,
                "relation": "SHOWPLANSERVICE"
              },
              "requestby": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Requested By",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the person requesting the service.",
                "maxLength": 100,
                "relation": "SHOWPLANSERVICE"
              }
            },
            "required": [
              "directreq",
              "linetype",
              "orgid",
              "unitcosthaschanged"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "SHOWPLANSERVICE"
        },
        "measurementvalue": {
          "searchType": "EXACT",
          "scale": 3,
          "subType": "DECIMAL",
          "title": "Measurement",
          "persistent": true,
          "type": "number",
          "remarks": "Recorded Measurement",
          "maxLength": 16
        },
        "intshift": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Interruptible shift",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Specifies the shift on which the work will be interrupted in the Graphical Scheduling application.",
          "maxLength": 8
        },
        "phone": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Phone",
          "persistent": true,
          "type": "string",
          "remarks": "The phone number (usually a work site telephone number) associated with the work order. If the Reported By person has a phone number associated with it, that phone number is the default for this field.",
          "maxLength": 20
        },
        "labtrans": {
          "objectName": "LABTRANS",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/LABTRANS",
            "pk": [
              "siteid",
              "laborcode",
              "labtransid"
            ],
            "title": "WORKORDER/LABTRANS",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/labtrans",
            "properties": {
              "ownersysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Owner System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Owner System ID",
                "maxLength": 10,
                "relation": "UXSHOWACTUALLABOR"
              },
              "localref": {
                "type": "string"
              },
              "craft": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Craft",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the craft. This field is read-only, if the Labor/Craft field contains a craft. If you edit this field, the Rate and Premium Pay Code fields are updated automatically.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALLABOR"
              },
              "transtype_description": {
                "type": "string"
              },
              "memo": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Memo",
                "persistent": true,
                "type": "string",
                "remarks": "Describes any notes or comments about the performed work.",
                "maxLength": 100,
                "relation": "UXSHOWACTUALLABOR"
              },
              "starttime": {
                "searchType": "NONE",
                "subType": "TIME",
                "title": "Start Time",
                "type": "string",
                "remarks": "Time at which work began. If you enter a Start Time and a Finish Time, Maximo calculates values for the Hours field, but will not write over a value you have already entered in the field. You can only enter a value if the work order has a status of Approve. You can modify the field until you save the record.",
                "maxLength": 3,
                "relation": "UXSHOWACTUALLABOR"
              },
              "startdate": {
                "searchType": "NONE",
                "subType": "DATE",
                "title": "Start Date",
                "type": "string",
                "remarks": "Date on which the reported work began.",
                "maxLength": 4,
                "relation": "UXSHOWACTUALLABOR"
              },
              "invoicelinenum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Invoice Line",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Invoice line number of the invoice line created from this Labor Transaction.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALLABOR"
              },
              "timerstatus_description": {
                "type": "string"
              },
              "rollup": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Rolled Up",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates whether this transaction has been rolled up.",
                "relation": "UXSHOWACTUALLABOR"
              },
              "_rowstamp": {
                "type": "string"
              },
              "labtransid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Primary key for the table",
                "maxLength": 11,
                "relation": "UXSHOWACTUALLABOR"
              },
              "startdateentered": {
                "searchType": "EXACT",
                "subType": "DATE",
                "title": "Start Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date on which the reported work began. ",
                "maxLength": 4,
                "relation": "UXSHOWACTUALLABOR"
              },
              "payrate": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Rate",
                "persistent": true,
                "type": "number",
                "remarks": "Pay rate for the labor. Maximo copies the pay rate for the labor from the labor record. ",
                "maxLength": 11,
                "relation": "UXSHOWACTUALLABOR"
              },
              "porevisionnum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "PO Revision",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Revision number of the purchase order. Indicates how many times a purchase order has been revised.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALLABOR"
              },
              "href": {
                "type": "string"
              },
              "financialperiod": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Financial Period",
                "persistent": true,
                "type": "string",
                "remarks": "Financial period in a format corresponding to that required by the accounting system.",
                "maxLength": 6,
                "relation": "UXSHOWACTUALLABOR"
              },
              "taskid": {
                "searchType": "NONE",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Task",
                "type": "integer",
                "minimum": -2147483648,
                "hasList": true,
                "remarks": "TASKID",
                "maxLength": 11,
                "relation": "UXSHOWACTUALLABOR"
              },
              "enteredastask": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Entered as Task",
                "persistent": true,
                "type": "boolean",
                "remarks": "Was this transaction created against a work order task?",
                "relation": "UXSHOWACTUALLABOR"
              },
              "linecost": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Line Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Extended or lump sum cost of labor transaction.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALLABOR"
              },
              "ticketclass_maxvalue": {
                "type": "string"
              },
              "transtype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The type of time being entered (work, travel, vacation, etc.). If you use WORK, TRAV, or WMATL as the type, you must enter a work order, GL account, asset, or location. ",
                "maxLength": 16,
                "relation": "UXSHOWACTUALLABOR"
              },
              "actualstaskid": {
                "searchType": "NONE",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Task",
                "type": "integer",
                "minimum": -2147483648,
                "hasList": true,
                "remarks": "Identifies the task for which you are reporting labor.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALLABOR"
              },
              "timerstatus_maxvalue": {
                "type": "string"
              },
              "polinenum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "PO Line",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "hasList": true,
                "remarks": "Identifies the line number on the PO for the labor.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALLABOR"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Organization Identifier",
                "maxLength": 8,
                "relation": "UXSHOWACTUALLABOR"
              },
              "ticketclass": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Ticket Class",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "class of the ticket",
                "maxLength": 16,
                "relation": "UXSHOWACTUALLABOR"
              },
              "laborcode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Labor",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the person or craft performing the work. ",
                "maxLength": 8,
                "relation": "UXSHOWACTUALLABOR"
              },
              "enterby": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Entered By",
                "persistent": true,
                "type": "string",
                "remarks": "Approved By (Authorized Manager Signature)",
                "maxLength": 100,
                "relation": "UXSHOWACTUALLABOR"
              },
              "outside": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Outside",
                "persistent": true,
                "type": "boolean",
                "remarks": "Specifies whether the work was performed by an outside contractor or by an employee. If the check box is selected, the work was performed by a contractor. If the check box is cleared, the work was performed by an employee. Maximo selects or clears the check box based on the value in the Labor field.",
                "relation": "UXSHOWACTUALLABOR"
              },
              "finishtimeentered": {
                "searchType": "EXACT",
                "subType": "TIME",
                "title": "End Time",
                "persistent": true,
                "type": "string",
                "remarks": "Time at which the work was finished.",
                "maxLength": 3,
                "relation": "UXSHOWACTUALLABOR"
              },
              "fincntrlid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "FCID",
                "persistent": true,
                "type": "string",
                "remarks": "Financial Control Identifier",
                "maxLength": 8,
                "relation": "UXSHOWACTUALLABOR"
              },
              "amcrew": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the crew that performed the work.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALLABOR"
              },
              "linecost2": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Premium Code",
                "persistent": true,
                "type": "number",
                "remarks": "Base Currency Line Cost 2.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALLABOR"
              },
              "_id": {
                "type": "string"
              },
              "position": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Position",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the labor's position on the crew.",
                "maxLength": 20,
                "relation": "UXSHOWACTUALLABOR"
              },
              "starttimeentered": {
                "searchType": "EXACT",
                "subType": "TIME",
                "title": "Start Time",
                "persistent": true,
                "type": "string",
                "remarks": "Time at which work began. If you enter a Start Time and a Finish Time, Maximo calculates values for the Hours field, but will not write over a value you have already entered in the field. You can only enter a value if the work order has a status of Approve. You can modify the field until you save the record. ",
                "maxLength": 3,
                "relation": "UXSHOWACTUALLABOR"
              },
              "premiumpayratetype_description": {
                "type": "string"
              },
              "premiumpayratetype_maxvalue": {
                "type": "string"
              },
              "ticketclass_description": {
                "type": "string"
              },
              "externalrefid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "External Reference ID",
                "persistent": true,
                "type": "string",
                "remarks": "External Reference ID",
                "maxLength": 10,
                "relation": "UXSHOWACTUALLABOR"
              },
              "gldebitacct": {
                "searchType": "WILDCARD",
                "subType": "GL",
                "title": "GL Debit Account",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "General ledger account to charge for the labor transaction. ",
                "maxLength": 23,
                "relation": "UXSHOWACTUALLABOR"
              },
              "invoicenum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Invoice",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Invoice number of the invoice created from this Labor Transaction.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALLABOR"
              },
              "servrectransid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Service Receipt ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Created when Create service Receipt is used",
                "maxLength": 11,
                "relation": "UXSHOWACTUALLABOR"
              },
              "regularhrs": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Regular Hours",
                "persistent": true,
                "type": "number",
                "remarks": "Number of regular hours (not overtime, holiday, weekend, etc.) worked.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALLABOR"
              },
              "finishtime": {
                "searchType": "NONE",
                "subType": "TIME",
                "title": "End Time",
                "type": "string",
                "remarks": "Time at which the work was finished.",
                "maxLength": 3,
                "relation": "UXSHOWACTUALLABOR"
              },
              "exchangerate2": {
                "searchType": "EXACT",
                "scale": 7,
                "subType": "DECIMAL",
                "title": "Secondary Exchange Rate",
                "persistent": true,
                "type": "number",
                "remarks": "Base Exchange Rate 2",
                "maxLength": 15,
                "relation": "UXSHOWACTUALLABOR"
              },
              "skilllevel": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Skill Level",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the skill level of the labor.",
                "maxLength": 15,
                "relation": "UXSHOWACTUALLABOR"
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
                "hasList": true,
                "remarks": "Vendor who provided the labor.",
                "maxLength": 12,
                "relation": "UXSHOWACTUALLABOR"
              },
              "assetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Asset",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the asset to which labor costs are charged.",
                "maxLength": 25,
                "relation": "UXSHOWACTUALLABOR"
              },
              "crewworkgroup": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew Work Group",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the resource pool to which the labor belongs.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALLABOR"
              },
              "contractnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Contract",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the contract for the outside labor for the transaction. You can select a contract based on the value in the Craft field or in the Labor field.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALLABOR"
              },
              "refwo": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Activity",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Referenced Work Order",
                "maxLength": 25,
                "relation": "UXSHOWACTUALLABOR"
              },
              "ticketid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Ticket",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Ticket Identifier",
                "maxLength": 10,
                "relation": "UXSHOWACTUALLABOR"
              },
              "paymenttransdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Recorded as Received",
                "persistent": true,
                "type": "string",
                "remarks": "The date and time the transaction was recorded in Purchasing. ",
                "maxLength": 10,
                "relation": "UXSHOWACTUALLABOR"
              },
              "anywhererefid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Anywhere Ref ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Anywhere Reference ID",
                "maxLength": 11,
                "relation": "UXSHOWACTUALLABOR"
              },
              "enterdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Entered Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date Labor Was Reported",
                "maxLength": 10,
                "relation": "UXSHOWACTUALLABOR"
              },
              "finishdate": {
                "searchType": "NONE",
                "subType": "DATE",
                "title": "End Date",
                "type": "string",
                "remarks": "Date on which the labor finished the work. If you have entered a Start Date, Start Time, and Finish Time, Maximo calculates a value for the Finish Date field using this formula: (start date) + (finish time - start time). The work order must be approved before you can insert a value. You can modify the field until you save the record. Maximo then updates the Line Cost field.",
                "maxLength": 4,
                "relation": "UXSHOWACTUALLABOR"
              },
              "amcrewtype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Type of Crew.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALLABOR"
              },
              "glcreditacct": {
                "searchType": "WILDCARD",
                "subType": "GL",
                "title": "GL Credit Account",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "General ledger account to which the cost of the labor is to be credited. ",
                "maxLength": 23,
                "relation": "UXSHOWACTUALLABOR"
              },
              "premiumpayratetype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Premium Rate Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Describes the type of premium rate, for example, hourly, incremental, or multiplier.",
                "maxLength": 10,
                "relation": "UXSHOWACTUALLABOR"
              },
              "revisionnum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Revision",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Identifies the Active Revision Number of the contract for this labor transaction.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALLABOR"
              },
              "premiumpaycode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Premium Pay Code",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the premium pay code for this labor transaction, for example, holiday hours, Sunday hours, greater than 40 hours per week, greater than eight hours per shift.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALLABOR"
              },
              "transdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Transaction Date",
                "persistent": true,
                "type": "string",
                "remarks": "Timestamp - Key To Table",
                "maxLength": 10,
                "relation": "UXSHOWACTUALLABOR"
              },
              "premiumpayrate": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Premium Pay Rate",
                "persistent": true,
                "type": "number",
                "remarks": "Identifies the labor's rate for work done beyond the usual work shift, for example, the overtime rate. Maximo displays the premium pay rate in this read-only field and uses it to calculate the Line Cost.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALLABOR"
              },
              "sendersysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Sender System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Column used by ERP-Integration (APIs)",
                "maxLength": 50,
                "relation": "UXSHOWACTUALLABOR"
              },
              "position_description": {
                "type": "string"
              },
              "transtype_maxvalue": {
                "type": "string"
              },
              "ponum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "PO",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the purchase order that is purchasing the labor.The PO you select must have a service line, and the vendor on the PO must match the vendor on the selected labor/craft record. ",
                "maxLength": 8,
                "relation": "UXSHOWACTUALLABOR"
              },
              "timerstatus": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Timer Status",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Indicates whether a user created the labor transaction using the timer on the Maximo toolbar. If the field is blank, the timer was not used. If the field has a value, the timer was used to create this labor transaction. ",
                "maxLength": 16,
                "relation": "UXSHOWACTUALLABOR"
              },
              "location": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Location",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the location to which labor costs are charged.",
                "maxLength": 12,
                "relation": "UXSHOWACTUALLABOR"
              },
              "genapprservreceipt": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Approved",
                "persistent": true,
                "type": "boolean",
                "remarks": "Specifies whether the labor transaction has been approved and a service receipt can be written. If the check box is selected, the transaction has been approved. If the check box is cleared, the transaction has not been approved. You can edit labor transactions until the work order is closed or cancelled.",
                "relation": "UXSHOWACTUALLABOR"
              },
              "finishdatetime": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Start Date Time",
                "persistent": true,
                "type": "string",
                "remarks": "Time at which work began. If you enter a Start Time and a Finish Time, Maximo calculates values for the Hours field, but will not write over a value you have already entered in the field. You can only enter a value if the work order has a status of Approve. You can modify the field until you save the record.",
                "maxLength": 10,
                "relation": "UXSHOWACTUALLABOR"
              },
              "sourcesysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Source System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Source System ID",
                "maxLength": 10,
                "relation": "UXSHOWACTUALLABOR"
              },
              "finishdateentered": {
                "searchType": "EXACT",
                "subType": "DATE",
                "title": "End Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date on which the labor finished the work. If you have entered a Start Date, Start Time, and Finish Time, Maximo calculates a value for the Finish Date field using this formula: (start date) + (finish time - start time). The work order must be approved before you can insert a value. You can modify the field until you save the record. Maximo then updates the Line Cost field. ",
                "maxLength": 4,
                "relation": "UXSHOWACTUALLABOR"
              },
              "premiumpayhours": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Premium Pay Hours",
                "persistent": true,
                "type": "number",
                "remarks": "Number of hours for which the labor will be paid the premium rate.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALLABOR"
              },
              "startdatetime": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Start Date Time",
                "persistent": true,
                "type": "string",
                "remarks": "Time at which work began. If you enter a Start Time and a Finish Time, Maximo calculates values for the Hours field, but will not write over a value you have already entered in the field. You can only enter a value if the work order has a status of Approve. You can modify the field until you save the record.",
                "maxLength": 10,
                "relation": "UXSHOWACTUALLABOR"
              }
            },
            "required": [
              "craft",
              "enterby",
              "enterdate",
              "laborcode",
              "orgid",
              "payrate",
              "regularhrs",
              "startdate",
              "startdateentered",
              "transdate",
              "transtype"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "UXSHOWACTUALLABOR"
        },
        "actservcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Actual Service Cost",
          "persistent": true,
          "type": "number",
          "remarks": "Total actual service cost against this work order.",
          "maxLength": 11
        },
        "reqasstdwntime": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Require Asset Downtime",
          "persistent": true,
          "type": "boolean",
          "remarks": "Indicates if the asset requires downtime while work is performed."
        },
        "estmatcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Estimated Material Cost",
          "persistent": true,
          "type": "number",
          "remarks": "Estimated Material Cost",
          "maxLength": 11
        },
        "targcompdate": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Target Finish",
          "persistent": true,
          "type": "string",
          "remarks": "Date the work order is targeted to be completed.",
          "maxLength": 10
        },
        "origrecordclass": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Originating Record Class",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Originating record's class, for example: change, release, incident, problem, or work order.",
          "maxLength": 16
        },
        "status": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Status",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Status of the work order, for example, in progress, waiting on material, waiting for approval, completed, or closed.",
          "maxLength": 16
        },
        "pcphys": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "INTEGER",
          "title": "Physical percent complete",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Specifies the user-defined percent complete as entered manually.",
          "maxLength": 11
        },
        "commoditygroup": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Service Group",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Defines the service group for the work order, for example: IT, production, facility, or fleet.",
          "maxLength": 8
        },
        "problemcode": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Problem Code",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The problem being reported based on the defined Failure Class. This is usually the code in the second level of the failure reporting hierarchy.",
          "maxLength": 8
        },
        "esttoolcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Estimated Tool Cost",
          "persistent": true,
          "type": "number",
          "remarks": "Estimated Tool Cost",
          "maxLength": 11
        },
        "reportedby": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Reported By",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the person reporting the work order.",
          "maxLength": 82
        },
        "unitsofwork": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Work Units",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Work Unit",
          "maxLength": 16
        },
        "los": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Requires Location Downtime",
          "persistent": true,
          "type": "boolean",
          "remarks": "Indicates that the work must be performed when the location is not in use, and available for maintenance."
        },
        "reasonforchange": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Reason for Change",
          "persistent": true,
          "type": "string",
          "remarks": "Describes the reason for the change. To enter or view additional information, click the Long Description button.",
          "maxLength": 20
        },
        "splanreviewdate": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Has safetyplan review date?",
          "persistent": true,
          "type": "string",
          "remarks": "Does this Work Order safetplan is reviwed?",
          "maxLength": 10
        },
        "pluscjprevnum": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "INTEGER",
          "title": "Job Plan Revision Number",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Displays the revision number of the Job Plan the work order was generated with.",
          "maxLength": 11
        },
        "assetnum": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Asset",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the asset.",
          "maxLength": 25
        },
        "persongroup": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Work Group",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the person group responsible for the work. Person groups are set up in the Person Groups application.",
          "maxLength": 8
        },
        "crewid": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Crew",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "ID for a given crew within an craft",
          "maxLength": 12
        },
        "outmatcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Outside Material Cost",
          "persistent": true,
          "type": "number",
          "remarks": "Outside Material Cost",
          "maxLength": 11
        },
        "doclinks": {
          "objectName": "DOCLINKS",
          "type": "array",
          "items": {
            "subType": "DOCLINKS",
            "type": "object",
            "properties": {
              "member": {
                "type": "array",
                "items": {
                  "definition": {
                    "subSchema": {
                      "$ref": "oslc/jsonschemas/mxapiwodetail/doclinks/attachment"
                    }
                  },
                  "type": "object"
                }
              }
            }
          },
          "cardinality": "MULTIPLE",
          "relation": "DOCLINKS"
        },
        "onbehalfof": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "On Behalf Of",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies for whom this work order has been created. For example, if someone did not have access to a computer, another user could create the work order on behalf of that person.",
          "maxLength": 82
        },
        "observation": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Observation",
          "persistent": true,
          "type": "string",
          "remarks": "Describes the visual inspection data for this operation. If the work order has an associated work plan, Maximo copies this information from the Plans tab. You can edit this field until the work order is closed.",
          "maxLength": 8
        },
        "changeby": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Changed By",
          "persistent": true,
          "type": "string",
          "remarks": "Modified By",
          "maxLength": 100
        },
        "interruptible": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Interruptible",
          "persistent": true,
          "type": "boolean",
          "remarks": "Specifies whether the work order is allowed to be stopped once the work has begun and then restarted. If the check box is selected, the work can be stopped. If the check box is cleared, the work cannot be stopped and restarted."
        },
        "remdur": {
          "searchType": "EXACT",
          "scale": 0,
          "subType": "DURATION",
          "title": "Time Remaining",
          "persistent": true,
          "type": "number",
          "remarks": "Indicates the number of remaining hours needed to complete the work. You can modify this value until the work order is closed.",
          "maxLength": 8
        },
        "sendersysid": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Sender System ID",
          "persistent": true,
          "type": "string",
          "remarks": "Column used by ERP-Integration (APIs)",
          "maxLength": 50
        },
        "estlabcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Estimated Labor Cost",
          "persistent": true,
          "type": "number",
          "remarks": "Estimated Labor Cost",
          "maxLength": 11
        },
        "lead": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Lead",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Lead person responsible for the work.",
          "maxLength": 100
        },
        "wonum": {
          "default": "&AUTOKEY&",
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Work Order",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the work order.",
          "maxLength": 25
        },
        "downtime": {
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Downtime",
          "persistent": true,
          "type": "boolean",
          "remarks": "Does the Asset have to be down for this work order?"
        },
        "workorderid": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "BIGINT",
          "title": "WORKORDERID",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Unique Identifier",
          "maxLength": 11
        },
        "whomischangefor": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Whom is this change for",
          "persistent": true,
          "type": "string",
          "remarks": "Identifies whom a change is for.",
          "maxLength": 20
        },
        "wojo1": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "WOJO1",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "wojo2": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "WOJO2",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "wojo3": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "WOJO3",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "wojo4": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "DECIMAL",
          "title": "WOJO4",
          "persistent": true,
          "type": "number",
          "remarks": "Extra Field",
          "maxLength": 16
        },
        "wojo5": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "WOJO5",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "wojo6": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "WOJO6",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "wojo7": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "WOJO7",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "wojo8": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "WOJO8",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "sourcesysid": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Source System ID",
          "persistent": true,
          "type": "string",
          "remarks": "Source System ID",
          "maxLength": 10
        },
        "np_statusmemo": {
          "searchType": "NONE",
          "subType": "ALN",
          "title": "Change Status Memo",
          "type": "string",
          "remarks": "Status change memo, temporary non-persistent field used by MEA",
          "maxLength": 50
        },
        "plussisgis": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Is GIS",
          "persistent": true,
          "type": "boolean",
          "remarks": "A Yes/No field to search for work orders that are linked or not linked to GIS features. Enter Y in this field to search for work orders that are linked to GIS features; enter N to search for work orders that are not linked."
        },
        "ownersysid": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Owner System ID",
          "persistent": true,
          "type": "string",
          "remarks": "Owner System ID",
          "maxLength": 10
        },
        "actoutlabcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Actual Cost of External Labor",
          "persistent": true,
          "type": "number",
          "remarks": "The cost of external labor that are required for the task on the current work order.",
          "maxLength": 11
        },
        "estatapprservcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Estimated Service Cost at Approval",
          "persistent": true,
          "type": "number",
          "remarks": "Cost estimate of the work order's services when the work order is approved.",
          "maxLength": 11
        },
        "faildate": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Failed Date",
          "persistent": true,
          "type": "string",
          "remarks": "Actual Failure Date",
          "maxLength": 10
        },
        "ignoresrmavail": {
          "default": true,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Ignore Storeroom Availability For Work Order Status",
          "persistent": true,
          "type": "boolean",
          "remarks": "Indicates whether to ignore the availability of items in the storeroom for the work order status approval."
        },
        "origrecordid": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Originating Record",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the source record that was used to create this record.",
          "maxLength": 25
        },
        "outtoolcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Outside Tool Cost",
          "persistent": true,
          "type": "number",
          "remarks": "Outside Tool Cost",
          "maxLength": 11
        },
        "estatapproutlabhrs": {
          "searchType": "EXACT",
          "scale": 0,
          "subType": "DURATION",
          "title": "Estimated Cost of External Labor",
          "persistent": true,
          "type": "number",
          "remarks": "The hours of internal labor for the task on the current work order at the time it was approved.",
          "maxLength": 8
        },
        "estatapprintlabcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Approved Cost of Internal Labor",
          "persistent": true,
          "type": "number",
          "remarks": "The cost of internal labor for the task on the current work order at the time it was approved.",
          "maxLength": 11
        },
        "firstapprstatus": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "First Approve Status",
          "persistent": true,
          "type": "string",
          "remarks": "Identifies the first status change which approved the work order. This value is used to determine if the work order record has ever been approved. Work orders that have been approved are not allowed to be deleted.",
          "maxLength": 16
        },
        "pmnextduedate": {
          "searchType": "EXACT",
          "subType": "DATE",
          "title": "PM Next Due Date",
          "persistent": true,
          "type": "string",
          "remarks": "From the next Next Due Date of the PM",
          "maxLength": 4
        },
        "remarkdesc_longdescription": {
          "searchType": "WILDCARD",
          "subType": "LONGALN",
          "title": "Description Long Description",
          "type": "string",
          "hasList": true,
          "remarks": "Long Description for Remark",
          "maxLength": 32000
        },
        "totalworkunits": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "DECIMAL",
          "title": "Total Work Units",
          "persistent": true,
          "type": "number",
          "remarks": "Total Work Units for WO, including header asset and assets in MultiAssetLocCI table",
          "maxLength": 11
        },
        "verification": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Verification",
          "persistent": true,
          "type": "string",
          "remarks": "Used to verify that the Change was successful or describe how to determine if the Change was successful",
          "maxLength": 20
        },
        "wosafetylink": {
          "objectName": "WOSAFETYLINK",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/WOSAFETYLINK",
            "pk": [
              "siteid",
              "wosafetylinkid"
            ],
            "title": "WORKORDER/WOSAFETYLINK",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/wosafetylink",
            "properties": {
              "localref": {
                "type": "string"
              },
              "applyseq": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "SMALLINT",
                "title": "Apply Sequence",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Identifies the order in which tag out procedures should be performed. You can edit this field if the work order's status allows safety information edits. Work order editing rules are set up in the Organizations application.",
                "maxLength": 11,
                "relation": "WOSLHAZPRECENABLED"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Organization identifier",
                "maxLength": 8,
                "relation": "WOSLHAZPRECENABLED"
              },
              "wosl01": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "wosl01",
                "persistent": true,
                "type": "string",
                "remarks": "Extra fields",
                "maxLength": 10,
                "relation": "WOSLHAZPRECENABLED"
              },
              "wosl02": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "wosl02",
                "persistent": true,
                "type": "string",
                "remarks": "Extra fields",
                "maxLength": 10,
                "relation": "WOSLHAZPRECENABLED"
              },
              "_rowstamp": {
                "type": "string"
              },
              "wosafetydatasource": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Source of Safety",
                "persistent": true,
                "type": "string",
                "remarks": "Identifies the source of the safety information",
                "maxLength": 2,
                "relation": "WOSLHAZPRECENABLED"
              },
              "removeseq": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "SMALLINT",
                "title": "Remove Sequence",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Identifies the order in which tag out procedures should be performed. You can edit this field if the work order's status allows safety information edits. Work order editing rules are set up in the Organizations application.",
                "maxLength": 11,
                "relation": "WOSLHAZPRECENABLED"
              },
              "tagoutid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Tag Out",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifier of the tag out procedure associated with the selected hazard. You can edit this field if the work order's status allows safety information edits. Work order editing rules are set up in the Organizations application.",
                "maxLength": 8,
                "relation": "WOSLHAZPRECENABLED"
              },
              "wosl05": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "wosl05",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Extra fields",
                "maxLength": 11,
                "relation": "WOSLHAZPRECENABLED"
              },
              "_imagelibref": {
                "type": "string"
              },
              "wosl03": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "WOSL03",
                "persistent": true,
                "type": "string",
                "remarks": "Extra fields",
                "maxLength": 10,
                "relation": "WOSLHAZPRECENABLED"
              },
              "assetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Related Asset",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the related asset causing the hazard or requiring the Tag Out. You can edit this field if the work order's status allows safety information edits. Work order editing rules are set up in the Organizations application.",
                "maxLength": 25,
                "relation": "WOSLHAZPRECENABLED"
              },
              "wosl04": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "wosl04",
                "persistent": true,
                "type": "number",
                "remarks": "Extra fields",
                "maxLength": 16,
                "relation": "WOSLHAZPRECENABLED"
              },
              "location": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Related Location",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the related location causing the hazard or requiring the tag out.",
                "maxLength": 12,
                "relation": "WOSLHAZPRECENABLED"
              },
              "href": {
                "type": "string"
              },
              "_id": {
                "type": "string"
              },
              "wosafetylinkid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Work Link ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Identifies a Safety Term linked with a Work Order. That is, a WO linked with a Hazard and/or Tag Out and optionally with an Asset or Loc. Key field. Autogenerated.",
                "maxLength": 11,
                "relation": "WOSLHAZPRECENABLED"
              },
              "hazardid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Hazard",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies a hazard on the work order. You can edit this field if the work order's status allows safety information edits. Work order editing rules are set up in the Organizations application.",
                "maxLength": 8,
                "relation": "WOSLHAZPRECENABLED"
              }
            },
            "required": [
              "orgid",
              "wosafetydatasource"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "WOSLHAZPRECENABLED"
        },
        "woisswap": {
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Is this an Asset Swap",
          "persistent": true,
          "type": "boolean",
          "remarks": "Identifies if the Move is a Move or a Swap"
        },
        "mr": {
          "objectName": "MR",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/MR",
            "pk": [
              "siteid",
              "mrnum"
            ],
            "title": "WORKORDER/MR",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/mr",
            "properties": {
              "historyflag": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "History",
                "persistent": true,
                "type": "boolean",
                "remarks": "History Flag to identify closed MR's",
                "relation": "MR"
              },
              "localref": {
                "type": "string"
              },
              "type": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "MR Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Material request type",
                "maxLength": 12,
                "relation": "MR"
              },
              "pcardnum": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Card #",
                "persistent": true,
                "type": "string",
                "remarks": "Procurement card number.",
                "maxLength": 30,
                "relation": "MR"
              },
              "totalcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Total Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Total cost of the MR",
                "maxLength": 11,
                "relation": "MR"
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
                "relation": "MR"
              },
              "status_maxvalue": {
                "type": "string"
              },
              "_rowstamp": {
                "type": "string"
              },
              "mrstatusseq": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "MR Status Sequence",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "MR Status Sequence",
                "maxLength": 11,
                "relation": "MR"
              },
              "href": {
                "type": "string"
              },
              "shipto": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Ship to",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Location code where the items should be shipped.",
                "maxLength": 30,
                "relation": "MR"
              },
              "mrla1": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "MRLA1",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Crossover Field Crosses over to PR.PRLA1 or PO.POLA1",
                "maxLength": 10,
                "relation": "MR"
              },
              "status_description": {
                "type": "string"
              },
              "type_maxvalue": {
                "type": "string"
              },
              "mrdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Requested Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date of request",
                "maxLength": 10,
                "relation": "MR"
              },
              "changedate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Changed Date",
                "persistent": true,
                "type": "string",
                "remarks": "Change date of request",
                "maxLength": 10,
                "relation": "MR"
              },
              "pcardexpdate": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Expiration Date",
                "persistent": true,
                "type": "string",
                "remarks": "Procurement card expiration date.",
                "maxLength": 7,
                "relation": "MR"
              },
              "basetotalcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Base Total Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Total cost of the Material Request in base currency1.",
                "maxLength": 11,
                "relation": "MR"
              },
              "mr2": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "MR2",
                "persistent": true,
                "type": "string",
                "remarks": "MR Extra Field 2",
                "maxLength": 1,
                "relation": "MR"
              },
              "mrla3": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "MRLA3",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Crossover Field Crosses over to PR.PRLA3 or PO.POLA3",
                "maxLength": 10,
                "relation": "MR"
              },
              "priority": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Priority",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Priority of the requisition. We recommend that you limit your range of values from 0 to 9, where 0 designates the lowest priority. The default value is 0.",
                "maxLength": 11,
                "relation": "MR"
              },
              "mr1": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "MR1",
                "persistent": true,
                "type": "string",
                "remarks": "MR Extra Field 1",
                "maxLength": 1,
                "relation": "MR"
              },
              "mrla2": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "MRLA2",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Crossover Field Crosses over to PR.PRLA2 or PO.POLA2",
                "maxLength": 10,
                "relation": "MR"
              },
              "mr4": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "MR4",
                "persistent": true,
                "type": "string",
                "remarks": "MR Extra Field 4",
                "maxLength": 1,
                "relation": "MR"
              },
              "mrla5": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "MRLA5",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Crossover Field Crosses over to PR.PRLA5 or PO.POLA5",
                "maxLength": 10,
                "relation": "MR"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Organization Identifier",
                "maxLength": 8,
                "relation": "MR"
              },
              "mr3": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "MR3",
                "persistent": true,
                "type": "string",
                "remarks": "MR Extra Field 3",
                "maxLength": 1,
                "relation": "MR"
              },
              "mrla4": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "MRLA4",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Crossover Field Crosses over to PR.PRLA4 or PO.POLA4",
                "maxLength": 10,
                "relation": "MR"
              },
              "mr6": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "MR6",
                "persistent": true,
                "type": "string",
                "remarks": "MR Extra Field 6",
                "maxLength": 1,
                "relation": "MR"
              },
              "mr5": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "MR5",
                "persistent": true,
                "type": "string",
                "remarks": "MR Extra Field 5",
                "maxLength": 1,
                "relation": "MR"
              },
              "mr8": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "MR8",
                "persistent": true,
                "type": "string",
                "remarks": "MR Extra Field 8",
                "maxLength": 1,
                "relation": "MR"
              },
              "enterby": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Entered By",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "MR entered by",
                "maxLength": 100,
                "relation": "MR"
              },
              "mr7": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "MR7",
                "persistent": true,
                "type": "string",
                "remarks": "MR Extra Field 7",
                "maxLength": 1,
                "relation": "MR"
              },
              "mrid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "MRID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Identifier",
                "maxLength": 11,
                "relation": "MR"
              },
              "mr9": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "MR9",
                "persistent": true,
                "type": "string",
                "remarks": "MR Extra Field 9",
                "maxLength": 1,
                "relation": "MR"
              },
              "phone": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Phone",
                "persistent": true,
                "type": "string",
                "remarks": "Phone number of the requestor",
                "maxLength": 20,
                "relation": "MR"
              },
              "mr10": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "MR10",
                "persistent": true,
                "type": "string",
                "remarks": "MR Extra Field 10",
                "maxLength": 1,
                "relation": "MR"
              },
              "fincntrlid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "FCID",
                "persistent": true,
                "type": "string",
                "remarks": "Financial Control Identifier",
                "maxLength": 8,
                "relation": "MR"
              },
              "_id": {
                "type": "string"
              },
              "pcardtype": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Card Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Procurement card type.",
                "maxLength": 20,
                "relation": "MR"
              },
              "requireddate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Required Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date the material is required by.",
                "maxLength": 10,
                "relation": "MR"
              },
              "status": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Status",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Status of Request",
                "maxLength": 10,
                "relation": "MR"
              },
              "description": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Description",
                "persistent": true,
                "type": "string",
                "remarks": "Describes the material request. To enter or view additional information, click the Long Description button.",
                "maxLength": 100,
                "relation": "MR"
              },
              "gldebitacct": {
                "searchType": "WILDCARD",
                "subType": "GL",
                "title": "GL Debit Account",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Account code for the general ledger account that will be charged the cost of the line item.",
                "maxLength": 23,
                "relation": "MR"
              },
              "pcardverification": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Card Verification Value",
                "persistent": true,
                "type": "string",
                "remarks": "Procurement card verification value.",
                "maxLength": 4,
                "relation": "MR"
              },
              "requestedby": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Requested By",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Person who requested the material. The default value is the current login ID.",
                "maxLength": 100,
                "relation": "MR"
              },
              "droppoint": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Drop Point",
                "persistent": true,
                "type": "string",
                "remarks": "Delivery point at the ship-to address for delivery of the items. For example, loading dock.",
                "maxLength": 12,
                "relation": "MR"
              },
              "_imagelibref": {
                "type": "string"
              },
              "assetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Asset",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the asset that the item is for.",
                "maxLength": 25,
                "relation": "MR"
              },
              "type_description": {
                "type": "string"
              },
              "requestedfor": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Requested For",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Person who the material was requested for.",
                "maxLength": 100,
                "relation": "MR"
              },
              "mrline": {
                "objectName": "MRLINE",
                "type": "array",
                "items": {
                  "resource": "MXAPIWODETAIL",
                  "description": "WORKORDER/MR/MRLINE",
                  "pk": [
                    "siteid",
                    "mrlineid"
                  ],
                  "title": "WORKORDER/MR/MRLINE",
                  "type": "object",
                  "$ref": "oslc/jsonschemas/mxapiwodetail/mr/mrline",
                  "properties": {
                    "localref": {
                      "type": "string"
                    },
                    "category_maxvalue": {
                      "type": "string"
                    },
                    "currencycode": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Currency",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "Currency code representing the vendor currency.",
                      "maxLength": 8,
                      "relation": "MRLINE"
                    },
                    "classificationid": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Classification",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "Asset Classification identifier",
                      "maxLength": 80,
                      "relation": "MRLINE"
                    },
                    "pcardnum": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Card #",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Procurement Card Number Crosses over to PRLINE.PCARDNUM or POLINE.PCARDNUM",
                      "maxLength": 30,
                      "relation": "MRLINE"
                    },
                    "partialissue": {
                      "searchType": "EXACT",
                      "subType": "YORN",
                      "title": "Partial Issue",
                      "persistent": true,
                      "type": "boolean",
                      "remarks": "Is partial issue allowed",
                      "relation": "MRLINE"
                    },
                    "mrlin5": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Extra Field5",
                      "persistent": true,
                      "type": "string",
                      "remarks": "MRLINE Extra Field 5",
                      "maxLength": 1,
                      "relation": "MRLINE"
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
                      "relation": "MRLINE"
                    },
                    "mrlin4": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Extra Field4",
                      "persistent": true,
                      "type": "string",
                      "remarks": "MRLINE Extra Field 4",
                      "maxLength": 1,
                      "relation": "MRLINE"
                    },
                    "_rowstamp": {
                      "type": "string"
                    },
                    "href": {
                      "type": "string"
                    },
                    "prnum": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "PR",
                      "persistent": true,
                      "type": "string",
                      "remarks": "The PR number that includes this line",
                      "maxLength": 8,
                      "relation": "MRLINE"
                    },
                    "mrlin1": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Extra Field1",
                      "persistent": true,
                      "type": "string",
                      "remarks": "MRLINE Extra Field 1",
                      "maxLength": 1,
                      "relation": "MRLINE"
                    },
                    "contractrefrev": {
                      "searchType": "EXACT",
                      "maximum": 2147483647,
                      "subType": "INTEGER",
                      "title": "Contract Reference Revision",
                      "persistent": true,
                      "type": "integer",
                      "minimum": -2147483648,
                      "remarks": "Revision number of the reference contract that was used to find the price for this line",
                      "maxLength": 11,
                      "relation": "MRLINE"
                    },
                    "mrlin3": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Extra Field3",
                      "persistent": true,
                      "type": "string",
                      "remarks": "MRLINE Extra Field 3",
                      "maxLength": 1,
                      "relation": "MRLINE"
                    },
                    "vendorpackquantity": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Vendor Pack Quantity",
                      "persistent": true,
                      "type": "string",
                      "remarks": "The quantity of the pack code. For example, pack code is box, pack quantity is 12.",
                      "maxLength": 12,
                      "relation": "MRLINE"
                    },
                    "enteredastask": {
                      "searchType": "EXACT",
                      "subType": "YORN",
                      "title": "Entered as Task",
                      "persistent": true,
                      "type": "boolean",
                      "remarks": "Was this transaction created against a work order task?",
                      "relation": "MRLINE"
                    },
                    "mrlin2": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Extra Field2",
                      "persistent": true,
                      "type": "string",
                      "remarks": "MRLINE Extra Field 2",
                      "maxLength": 1,
                      "relation": "MRLINE"
                    },
                    "linecost": {
                      "searchType": "EXACT",
                      "scale": 2,
                      "subType": "DECIMAL",
                      "title": "Line Cost",
                      "persistent": true,
                      "type": "number",
                      "remarks": "Cost for the line item, calculated by multiplying the quantity by the unit cost. If you are entering a cost for a service line item, you can enter a lump sum amount in this field (rather than specify a quantity of hours and a unit cost).",
                      "maxLength": 11,
                      "relation": "MRLINE"
                    },
                    "modelnum": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Model",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Manufacturer's model number for the item. The default value comes from the inventory record.",
                      "maxLength": 8,
                      "relation": "MRLINE"
                    },
                    "pcardexpdate": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Expiration Date",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Procurement Card Expiration Crosses over to PRLINE.PCARDEXPDATE or POLINE.PCARDEXPDATE",
                      "maxLength": 7,
                      "relation": "MRLINE"
                    },
                    "restype_maxvalue": {
                      "type": "string"
                    },
                    "chargestore": {
                      "searchType": "EXACT",
                      "subType": "YORN",
                      "title": "Charge to Store",
                      "persistent": true,
                      "type": "boolean",
                      "remarks": "Charge to Store",
                      "relation": "MRLINE"
                    },
                    "isdistributed": {
                      "searchType": "EXACT",
                      "subType": "YORN",
                      "title": "Is Distributed",
                      "persistent": true,
                      "type": "boolean",
                      "remarks": "Is the cost on this MRLINE distributed",
                      "relation": "MRLINE"
                    },
                    "orgid": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Organization",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Organization Identifier",
                      "maxLength": 8,
                      "relation": "MRLINE"
                    },
                    "restype": {
                      "default": "!AUTOMATIC!",
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Reservation Type",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "Specify the type of reservation depending on whether it is a firm request for material or not (hard or soft). The reservation type may also be set to automatic, in which case the reservation type (APHARD or APSOFT) is generated depending on the urgency of the order.",
                      "maxLength": 16,
                      "relation": "MRLINE"
                    },
                    "itemnum": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Item",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "Identifies the item record. Leave this field blank if you are entering a line item for a service or for a material item not in inventory.",
                      "maxLength": 30,
                      "relation": "MRLINE"
                    },
                    "inspectionrequired": {
                      "searchType": "EXACT",
                      "subType": "YORN",
                      "title": "Inspection Required",
                      "persistent": true,
                      "type": "boolean",
                      "remarks": "Specifies whether this item requires an approval of the receipt. When you receive items that require inspection, Maximo records a receipt transaction. However, the item does not appear in the storeroom until the receipt is approved. If the check box is selected, the item requires inspection. If the check box is cleared (the default), no approval of the receipt is necessary.",
                      "relation": "MRLINE"
                    },
                    "directreq": {
                      "searchType": "EXACT",
                      "subType": "YORN",
                      "title": "Direct Request",
                      "persistent": true,
                      "type": "boolean",
                      "remarks": "Flag to specify if line is a direct request",
                      "relation": "MRLINE"
                    },
                    "mktplcitem": {
                      "default": false,
                      "searchType": "EXACT",
                      "subType": "YORN",
                      "title": "Marketplace Item",
                      "persistent": true,
                      "type": "boolean",
                      "remarks": "Flag to determine the items from the marketplace.",
                      "relation": "MRLINE"
                    },
                    "qty": {
                      "searchType": "EXACT",
                      "scale": 2,
                      "subType": "DECIMAL",
                      "title": "Quantity",
                      "persistent": true,
                      "type": "number",
                      "remarks": "Number of units of the requested item.",
                      "maxLength": 16,
                      "relation": "MRLINE"
                    },
                    "fincntrlid": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "FCID",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Financial Control Identifier",
                      "maxLength": 8,
                      "relation": "MRLINE"
                    },
                    "linecost1": {
                      "searchType": "EXACT",
                      "scale": 2,
                      "subType": "DECIMAL",
                      "title": "Line Cost 1",
                      "persistent": true,
                      "type": "number",
                      "remarks": "Base Currency Line Cost 1.",
                      "maxLength": 11,
                      "relation": "MRLINE"
                    },
                    "itemsetid": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Item Set",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "Item set identifier for this item.",
                      "maxLength": 8,
                      "relation": "MRLINE"
                    },
                    "linecost2": {
                      "searchType": "EXACT",
                      "scale": 2,
                      "subType": "DECIMAL",
                      "title": "Line Cost2",
                      "persistent": true,
                      "type": "number",
                      "remarks": "Base Currency Line Cost 2.",
                      "maxLength": 11,
                      "relation": "MRLINE"
                    },
                    "mrlinenum": {
                      "searchType": "EXACT",
                      "maximum": 2147483647,
                      "subType": "INTEGER",
                      "title": "Line",
                      "persistent": true,
                      "type": "integer",
                      "minimum": -2147483648,
                      "remarks": "Line tem number. If you do not enter a number, Maximo generates one automatically. The line item number is unique for this requisition.",
                      "maxLength": 11,
                      "relation": "MRLINE"
                    },
                    "_id": {
                      "type": "string"
                    },
                    "pcardtype": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Card Type",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "Procurement Card Type Crosses over to PRLINE.PCARDTYPE or POLINE.PCARDTYPE",
                      "maxLength": 20,
                      "relation": "MRLINE"
                    },
                    "requireddate": {
                      "searchType": "EXACT",
                      "subType": "DATETIME",
                      "title": "Required Date",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Date the line item is needed.",
                      "maxLength": 10,
                      "relation": "MRLINE"
                    },
                    "commodity": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Commodity Code",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Commodity",
                      "maxLength": 8,
                      "relation": "MRLINE"
                    },
                    "unitcost": {
                      "searchType": "EXACT",
                      "scale": 2,
                      "subType": "DECIMAL",
                      "title": "Unit Cost",
                      "persistent": true,
                      "type": "number",
                      "remarks": "Cost per unit of the item. If entering a service line item, you can enter a unit cost here and a number of hours in the Quantity field. Or, you can enter a lump sum amount in the Line Cost field.",
                      "maxLength": 11,
                      "relation": "MRLINE"
                    },
                    "exchangerate": {
                      "searchType": "EXACT",
                      "scale": 7,
                      "subType": "DECIMAL",
                      "title": "Exchange Rate",
                      "persistent": true,
                      "type": "number",
                      "remarks": "Base Exchange Rate 1",
                      "maxLength": 15,
                      "relation": "MRLINE"
                    },
                    "linetype": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Line Type",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "Line type. Possible values include Item, Material, Service, Special Order, or External Catalog Item.",
                      "maxLength": 15,
                      "relation": "MRLINE"
                    },
                    "commoditygroup": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Commodity Group",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Commodity Group",
                      "maxLength": 8,
                      "relation": "MRLINE"
                    },
                    "description": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Description",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Describes the line item. To enter or view additional information, click the Long Description button.",
                      "maxLength": 100,
                      "relation": "MRLINE"
                    },
                    "gldebitacct": {
                      "searchType": "WILDCARD",
                      "subType": "GL",
                      "title": "GL Debit Account",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "Account code for the general ledger account that will be charged the cost of the line item.",
                      "maxLength": 23,
                      "relation": "MRLINE"
                    },
                    "storelocsite": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Storeroom Site",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Storeroom's Site",
                      "maxLength": 8,
                      "relation": "MRLINE"
                    },
                    "pcardverification": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Card Verification Value",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Procurement Card Verification Value",
                      "maxLength": 4,
                      "relation": "MRLINE"
                    },
                    "manufacturer": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Manufacturer",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "Identifying code for the manufacturer of the item.",
                      "maxLength": 12,
                      "relation": "MRLINE"
                    },
                    "category_description": {
                      "type": "string"
                    },
                    "exchangerate2": {
                      "searchType": "EXACT",
                      "scale": 7,
                      "subType": "DECIMAL",
                      "title": "Exchange Rate 2",
                      "persistent": true,
                      "type": "number",
                      "remarks": "Base Exchange Rate 2.",
                      "maxLength": 15,
                      "relation": "MRLINE"
                    },
                    "droppoint": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Drop Point",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Drop point where the item is to be picked up",
                      "maxLength": 12,
                      "relation": "MRLINE"
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
                      "hasList": true,
                      "remarks": "Identifies the vendor for the item.",
                      "maxLength": 12,
                      "relation": "MRLINE"
                    },
                    "assetnum": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Asset",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "The asset that requires this item",
                      "maxLength": 25,
                      "relation": "MRLINE"
                    },
                    "mrlineid": {
                      "searchType": "EXACT",
                      "maximum": 2147483647,
                      "subType": "BIGINT",
                      "title": "Line id",
                      "persistent": true,
                      "type": "integer",
                      "minimum": -2147483648,
                      "remarks": "Material request line ID",
                      "maxLength": 11,
                      "relation": "MRLINE"
                    },
                    "vendorwarehouse": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Vendor Warehouse",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Vendor warehouse that the product will come from.",
                      "maxLength": 12,
                      "relation": "MRLINE"
                    },
                    "conditioncode": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Condition Code",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "The condition of the item requested",
                      "maxLength": 30,
                      "relation": "MRLINE"
                    },
                    "refwo": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Work Order",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "Referenced Work Order",
                      "maxLength": 25,
                      "relation": "MRLINE"
                    },
                    "availdate": {
                      "searchType": "EXACT",
                      "subType": "DATETIME",
                      "title": "Available Date",
                      "persistent": true,
                      "type": "string",
                      "remarks": "The earliest available date for this item",
                      "maxLength": 10,
                      "relation": "MRLINE"
                    },
                    "conversion": {
                      "searchType": "EXACT",
                      "scale": 2,
                      "subType": "DECIMAL",
                      "title": "Conversion Factor",
                      "persistent": true,
                      "type": "number",
                      "hasList": true,
                      "remarks": "Value used to convert the order unit to the issue unit, and vice versa. If you have specified an order unit in the Order Unit field, Maximo enters the corresponding conversion value in this field. If you have not specified an order unit, Maximo sets the sets the conversion factor to 1.00, indicating that the order unit is the same as the issue unit. You can edit this field, providing the line item is not a service. To determine a conversion factor, divide the order quantity by the issue quantity. For service line items, this field is read-only and always set to 1.00.",
                      "maxLength": 16,
                      "relation": "MRLINE"
                    },
                    "classstructureid": {
                      "searchType": "EXACT",
                      "subType": "UPPER",
                      "title": "Class Structure",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "Classification Structure Identifier",
                      "maxLength": 20,
                      "relation": "MRLINE"
                    },
                    "vendorpackcode": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Vendor Pack Code",
                      "persistent": true,
                      "type": "string",
                      "remarks": "The pack code of the product. It is the code of how the items will be packed. For example, BOX (12 to a box) or PALLET (30 to a pallet).",
                      "maxLength": 12,
                      "relation": "MRLINE"
                    },
                    "contractrefid": {
                      "searchType": "EXACT",
                      "maximum": 2147483647,
                      "subType": "BIGINT",
                      "title": "Contract Reference ID",
                      "persistent": true,
                      "type": "integer",
                      "minimum": -2147483648,
                      "remarks": "Contract reference identifier",
                      "maxLength": 11,
                      "relation": "MRLINE"
                    },
                    "storeloc": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Store Location",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "Storeroom location of the item. If you enter a new location for this item, the item will be added to that location at the time of receipt.",
                      "maxLength": 12,
                      "relation": "MRLINE"
                    },
                    "orderunit": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Order Unit",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "Standard unit by which the item is ordered, such as roll or case. After you enter a value, Maximo enters the corresponding conversion value in the Conversion field. If you are ordering a service, you can enter hours in this field. If you are ordering materials not in inventory, you can enter a new or existing unit in this field, or leave this field blank.",
                      "maxLength": 16,
                      "relation": "MRLINE"
                    },
                    "restype_description": {
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
                      "relation": "MRLINE"
                    },
                    "mrlaln5": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "MRLALN5",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Extra Crossover Field Crosses over to PRLINE.PRLALN5 or POLINE.POLALN5",
                      "maxLength": 10,
                      "relation": "MRLINE"
                    },
                    "mrlaln4": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "MRLALN4",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Extra Crossover Field Crosses over to PRLINE.PRLALN4 or POLINE.POLALN4",
                      "maxLength": 10,
                      "relation": "MRLINE"
                    },
                    "catalogcode": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Catalog #",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Vendor's catalog number or product list number for the item. The default value comes from the inventory record.",
                      "maxLength": 30,
                      "relation": "MRLINE"
                    },
                    "mrlaln3": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "MRLALN3",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Extra Crossover Field Crosses over to PRLINE.PRLALN3 or POLINE.POLALN3",
                      "maxLength": 10,
                      "relation": "MRLINE"
                    },
                    "contractrefnum": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Contract Reference",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Identifies the contract that was used to find the price for this line",
                      "maxLength": 8,
                      "relation": "MRLINE"
                    },
                    "mrlaln2": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "MRLALN2",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Extra Crossover Field Crosses over to PRLINE.PRLALN2 or POLINE.POLALN2",
                      "maxLength": 10,
                      "relation": "MRLINE"
                    },
                    "location": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Location",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "The location that requires this item",
                      "maxLength": 12,
                      "relation": "MRLINE"
                    },
                    "mrlaln1": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "MRLALN1",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Extra Crossover Field Crosses over to PRLINE.PRLALN1 or POLINE.POLALN1",
                      "maxLength": 10,
                      "relation": "MRLINE"
                    },
                    "category": {
                      "searchType": "WILDCARD",
                      "subType": "UPPER",
                      "title": "Category",
                      "persistent": true,
                      "type": "string",
                      "hasList": true,
                      "remarks": "Category of this line item",
                      "maxLength": 16,
                      "relation": "MRLINE"
                    },
                    "complete": {
                      "searchType": "EXACT",
                      "subType": "YORN",
                      "title": "Line Complete",
                      "persistent": true,
                      "type": "boolean",
                      "remarks": "Is line complete",
                      "relation": "MRLINE"
                    },
                    "pcardtype_description": {
                      "type": "string"
                    },
                    "remarks": {
                      "searchType": "WILDCARD",
                      "subType": "ALN",
                      "title": "Remarks",
                      "persistent": true,
                      "type": "string",
                      "remarks": "Remarks",
                      "maxLength": 50,
                      "relation": "MRLINE"
                    }
                  },
                  "required": [
                    "chargestore",
                    "complete",
                    "currencycode",
                    "directreq",
                    "enteredastask",
                    "inspectionrequired",
                    "isdistributed",
                    "langcode",
                    "linecost",
                    "linetype",
                    "mrlinenum",
                    "orgid",
                    "partialissue"
                  ]
                },
                "cardinality": "UNDEFINED",
                "relation": "MRLINE"
              },
              "anywhererefid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Anywhere Ref ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Anywhere Reference ID",
                "maxLength": 11,
                "relation": "MR"
              },
              "enterdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Entered Date",
                "persistent": true,
                "type": "string",
                "remarks": "MR's date of entry",
                "maxLength": 10,
                "relation": "MR"
              },
              "changeby": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Changed By",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Request changed by",
                "maxLength": 100,
                "relation": "MR"
              },
              "basetotalcost2": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Base Total Cost 2",
                "persistent": true,
                "type": "number",
                "remarks": "Total cost of the Material Request in base currency2.",
                "maxLength": 11,
                "relation": "MR"
              },
              "statusdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Status Date",
                "persistent": true,
                "type": "string",
                "remarks": "Status Date",
                "maxLength": 10,
                "relation": "MR"
              },
              "mrnum": {
                "default": "&AUTOKEY&",
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Requisition",
                "persistent": true,
                "type": "string",
                "remarks": "Identifies the requisition. This number must be unique for all requisition records.",
                "maxLength": 8,
                "relation": "MR"
              },
              "hasld": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Has Long Description",
                "persistent": true,
                "type": "boolean",
                "remarks": "Boolean flag to indicate if there is any long description for this record",
                "relation": "MR"
              },
              "location": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Location",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Location where the item will be used.",
                "maxLength": 12,
                "relation": "MR"
              },
              "pcardtype_description": {
                "type": "string"
              }
            },
            "required": [
              "changeby",
              "changedate",
              "enterby",
              "enterdate",
              "historyflag",
              "langcode",
              "mrdate",
              "orgid",
              "priority",
              "status",
              "statusdate",
              "totalcost",
              "type"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "MR"
        },
        "woacceptscharges": {
          "default": true,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Accepts Charges",
          "persistent": true,
          "type": "boolean",
          "remarks": "Check box specifies whether or not the work order accepts charges. If the check box is selected (the default), the work order accepts charges. If the check box is cleared, the work order does not accept charges, and you cannot enter charges on the work order."
        },
        "repairlocflag": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Repair Facility Required",
          "persistent": true,
          "type": "boolean",
          "remarks": "Indicates whether the repair location is required."
        },
        "changedate": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Changed Date",
          "persistent": true,
          "type": "string",
          "remarks": "Date the work order was last modified.",
          "maxLength": 10
        },
        "woclass_description": {
          "type": "string"
        },
        "djperror": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Calculation error",
          "persistent": true,
          "type": "string",
          "remarks": "The error message when trying to apply the dynamic job plan",
          "maxLength": 400
        },
        "woclass": {
          "searchType": "EXACT",
          "subType": "UPPER",
          "title": "Class",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the work order's class.",
          "maxLength": 16
        },
        "backoutplan": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Back Out Plan",
          "persistent": true,
          "type": "string",
          "remarks": "Describes the back out plan in the event the change needs to be reversed.",
          "maxLength": 50
        },
        "woclass_maxvalue": {
          "type": "string"
        },
        "levelid": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Floor ID",
          "persistent": true,
          "type": "string",
          "remarks": "Floor ID for Indoor map",
          "maxLength": 256
        },
        "actoutlabhrs": {
          "searchType": "EXACT",
          "scale": 0,
          "subType": "DURATION",
          "title": "Actual Hours of External Labor",
          "persistent": true,
          "type": "number",
          "remarks": "The hours of external labor that are required for the task on the current work order.",
          "maxLength": 8
        },
        "woserviceaddress": {
          "objectName": "WOSERVICEADDRESS",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/WOSERVICEADDRESS",
            "pk": [
              "siteid",
              "wonum"
            ],
            "title": "WORKORDER/WOSERVICEADDRESS",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/woserviceaddress",
            "properties": {
              "country": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Country",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The country of the service address.",
                "maxLength": 8,
                "relation": "SERVICEADDRESS"
              },
              "localref": {
                "type": "string"
              },
              "latitudey": {
                "searchType": "EXACT",
                "scale": 10,
                "subType": "DECIMAL",
                "title": "Latitude(Y)",
                "persistent": true,
                "type": "number",
                "remarks": "The measurement, in degrees, that the service address is north or south of the equator. Latitude is used with longitude to locate a place on a map. You must specify latitude in decimal degrees.",
                "maxLength": 19,
                "relation": "SERVICEADDRESS"
              },
              "staddrdirprfx": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Direction Prefix",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "A street direction prefix is part of an address that indicates the cardinal point of a compass, for example, N Florida Ave.",
                "maxLength": 25,
                "relation": "SERVICEADDRESS"
              },
              "city": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "City",
                "persistent": true,
                "type": "string",
                "remarks": "The city of the service address.",
                "maxLength": 36,
                "relation": "SERVICEADDRESS"
              },
              "timezone": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Time Zone",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The time zone of the service address.",
                "maxLength": 28,
                "relation": "SERVICEADDRESS"
              },
              "county": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "County",
                "persistent": true,
                "type": "string",
                "remarks": "The county of the service address.",
                "maxLength": 36,
                "relation": "SERVICEADDRESS"
              },
              "referencepoint": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Reference Point",
                "persistent": true,
                "type": "string",
                "remarks": "A reference point to help to locate the service address, for example, '300 feet behind large red outbuilding.'",
                "maxLength": 50,
                "relation": "SERVICEADDRESS"
              },
              "description": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Description",
                "persistent": true,
                "type": "string",
                "remarks": "The description of the service address.",
                "maxLength": 50,
                "relation": "SERVICEADDRESS"
              },
              "staddrnumber": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "House Number",
                "persistent": true,
                "type": "string",
                "remarks": "The building number of the service address.",
                "maxLength": 9,
                "relation": "SERVICEADDRESS"
              },
              "woserviceaddressid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Unique Id",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Id",
                "maxLength": 11,
                "relation": "SERVICEADDRESS"
              },
              "staddrunitnum": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Apartment/Unit/Suite",
                "persistent": true,
                "type": "string",
                "remarks": "An optional part of a street address that identifies whether the address is an apartment, a unit, or a suite, for example.",
                "maxLength": 30,
                "relation": "SERVICEADDRESS"
              },
              "langcode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Language Code",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Language Code",
                "maxLength": 4,
                "relation": "SERVICEADDRESS"
              },
              "_rowstamp": {
                "type": "string"
              },
              "_imagelibref": {
                "type": "string"
              },
              "postalcode": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Zip/Postal Code",
                "persistent": true,
                "type": "string",
                "remarks": "The postal code of the service address.",
                "maxLength": 12,
                "relation": "SERVICEADDRESS"
              },
              "wkid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Spatial Reference WKID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "The spatial reference WKID of the Service Address.",
                "maxLength": 11,
                "relation": "SERVICEADDRESS"
              },
              "streetaddress": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Street Address",
                "persistent": true,
                "type": "string",
                "remarks": "The street address details of the service address, such as the house number, the street direction prefix, and the name of the street. Additional details can include the type of street, the street direction suffix, and whether the address is an apartment, a unit, or a suite.",
                "maxLength": 130,
                "relation": "SERVICEADDRESS"
              },
              "href": {
                "type": "string"
              },
              "staddrstreet": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Street Name",
                "persistent": true,
                "type": "string",
                "remarks": "The name of the street on which the service address is located.",
                "maxLength": 50,
                "relation": "SERVICEADDRESS"
              },
              "addressischanged": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Service Address has been modified in WO",
                "persistent": true,
                "type": "boolean",
                "remarks": "Service Address has been modified in WO.",
                "relation": "SERVICEADDRESS"
              },
              "staddrsttype": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Street Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The type of street on which the service address is located, such as avenue, circle, parkway, road, street, lane, court, boulevard, or terrace.",
                "maxLength": 25,
                "relation": "SERVICEADDRESS"
              },
              "anywhererefid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Anywhere Ref ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Anywhere Reference ID",
                "maxLength": 11,
                "relation": "SERVICEADDRESS"
              },
              "country_description": {
                "type": "string"
              },
              "timezone_description": {
                "type": "string"
              },
              "formattedaddress": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Formatted Address",
                "persistent": true,
                "type": "string",
                "remarks": "This address is formatted according to the map provider's requirements and is updated when a location is found on the map tab. You can use the formatted address to search for addresses on the map tab.",
                "maxLength": 150,
                "relation": "SERVICEADDRESS"
              },
              "stateprovince": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "State/Province",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The state or the province of the service address.",
                "maxLength": 25,
                "relation": "SERVICEADDRESS"
              },
              "stateprovince_description": {
                "type": "string"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The organization identifier that is assigned to this service address.",
                "maxLength": 8,
                "relation": "SERVICEADDRESS"
              },
              "staddrdirsfx_description": {
                "type": "string"
              },
              "staddrsttype_description": {
                "type": "string"
              },
              "timezone_maxvalue": {
                "type": "string"
              },
              "staddrdirsfx": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Direction Suffix",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "A street direction suffix is part of an address that indicates the cardinal point of a compass, for example Florida Ave. N.",
                "maxLength": 25,
                "relation": "SERVICEADDRESS"
              },
              "saddresscode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Service Address",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The address code identifies a service address. It must be unique by site for each service address.",
                "maxLength": 12,
                "relation": "SERVICEADDRESS"
              },
              "staddrdirprfx_maxvalue": {
                "type": "string"
              },
              "directions": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Directions",
                "persistent": true,
                "type": "string",
                "remarks": "Directions to help locate the service address.",
                "maxLength": 500,
                "relation": "SERVICEADDRESS"
              },
              "hasld": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Has Long Description",
                "persistent": true,
                "type": "boolean",
                "remarks": "Boolean flag to indicate if there is any long description for this record",
                "relation": "SERVICEADDRESS"
              },
              "regiondistrict": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Region/District",
                "persistent": true,
                "type": "string",
                "remarks": "The region or district of the service address.",
                "maxLength": 36,
                "relation": "SERVICEADDRESS"
              },
              "staddrdirprfx_description": {
                "type": "string"
              },
              "addressline3": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Address Line 3",
                "persistent": true,
                "type": "string",
                "remarks": "Optional additional service address information.",
                "maxLength": 130,
                "relation": "SERVICEADDRESS"
              },
              "geocode": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "GEO Code",
                "persistent": true,
                "type": "string",
                "remarks": "GEO code for calculation of sales tax.",
                "maxLength": 11,
                "relation": "SERVICEADDRESS"
              },
              "longitudex": {
                "searchType": "EXACT",
                "scale": 10,
                "subType": "DECIMAL",
                "title": "Longitude(X)",
                "persistent": true,
                "type": "number",
                "remarks": "The measurement, in degrees, that the service address is east or west of the prime meridian. Longitude is used with latitude to locate a place on a map. You must specify longitude in decimal degrees.",
                "maxLength": 19,
                "relation": "SERVICEADDRESS"
              },
              "addressline2": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Address Line 2",
                "persistent": true,
                "type": "string",
                "remarks": "Optional additional service address information.",
                "maxLength": 130,
                "relation": "SERVICEADDRESS"
              },
              "geometry": {
                "searchType": "NONE",
                "subType": "BLOB",
                "title": "Geometry",
                "persistent": true,
                "type": "string",
                "remarks": "Representation of the record geometry",
                "maxLength": 999999,
                "relation": "SERVICEADDRESS"
              },
              "_id": {
                "type": "string"
              },
              "staddrdirsfx_maxvalue": {
                "type": "string"
              }
            },
            "required": [
              "langcode",
              "orgid"
            ]
          },
          "cardinality": "SINGLE",
          "relation": "SERVICEADDRESS"
        },
        "_id": {
          "type": "string"
        },
        "supervisor": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Supervisor",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Supervisor of the work. Maximo copies this information from the job plan, if there is one. You also can select a supervisor.",
          "maxLength": 100
        },
        "calccalendar": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Calendar",
          "persistent": true,
          "type": "string",
          "remarks": "Business days and times used to calculate the Target Contact, Target Response, and Target Resolution dates on a ticket or work order. Click the Detail Menu to select a calendar or go to the Calendars application to create one.",
          "maxLength": 8
        },
        "targstartdate": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Target Start",
          "persistent": true,
          "type": "string",
          "remarks": "Date the work order is targeted to begin. If the work order is generated from a PM, the date is supplied by the PM work order generation process.",
          "maxLength": 10
        },
        "servrectrans": {
          "objectName": "SERVRECTRANS",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/SERVRECTRANS",
            "pk": [
              "servrectransid"
            ],
            "title": "WORKORDER/SERVRECTRANS",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/servrectrans",
            "properties": {
              "issuetype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Issue Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Service Receipt transaction type",
                "maxLength": 20,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "ownersysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Owner System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Owner System ID",
                "maxLength": 10,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "inspectedqty": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Quantity to be Inspected",
                "persistent": true,
                "type": "number",
                "remarks": "Number of items inspected",
                "maxLength": 16,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "localref": {
                "type": "string"
              },
              "issuetype_description": {
                "type": "string"
              },
              "currencycode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Currency",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Copy from PO.CURRENCYCODE.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "rollup": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Rolled Up",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates whether or not this transaction has been rolled up.",
                "relation": "UXSHOWACTUALSERVICE"
              },
              "rejectqty": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Quantity Rejected",
                "persistent": true,
                "type": "number",
                "remarks": "Quantity of claim rejected.",
                "maxLength": 16,
                "relation": "UXSHOWACTUALSERVICE"
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
                "relation": "UXSHOWACTUALSERVICE"
              },
              "status_maxvalue": {
                "type": "string"
              },
              "_rowstamp": {
                "type": "string"
              },
              "currencylinecost": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Line Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Extended or lump sum cost of this transaction line; In currency of PO or Invoice.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "porevisionnum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "PO Revision",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Revision number of the purchase order. Indicates how many times a purchase order has been revised.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "href": {
                "type": "string"
              },
              "qtyoverreceived": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Over Received Quantity",
                "persistent": true,
                "type": "number",
                "remarks": "The quantity of items that were over received.",
                "maxLength": 16,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "currencyunitcost": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Unit Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Unit cost of service; In currency of the PO or Invoice.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "financialperiod": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Financial Period",
                "persistent": true,
                "type": "string",
                "remarks": "Financial period in a format corresponding to that required by the accounting system.",
                "maxLength": 6,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "taskid": {
                "searchType": "NONE",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Task",
                "type": "integer",
                "minimum": -2147483648,
                "hasList": true,
                "remarks": "Identifies the task associated with the service transaction.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "enteredastask": {
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Entered as Task",
                "persistent": true,
                "type": "boolean",
                "remarks": "Was this transaction created against a work order task?",
                "relation": "UXSHOWACTUALSERVICE"
              },
              "prorated": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Prorated",
                "persistent": true,
                "type": "boolean",
                "remarks": "Has line amount been prorated (allocated)?",
                "relation": "UXSHOWACTUALSERVICE"
              },
              "loadedcost": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Loaded Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Line cost loaded with taxes & special charges.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "linecost": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Line Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Calculated value. Maximo calculates the value using the following formula: Quantity x Unit Cost.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "orgrcvexternalrefid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "External Reference ID",
                "persistent": true,
                "type": "string",
                "remarks": "The external reference identifier of the original receipt.",
                "maxLength": 10,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "status_description": {
                "type": "string"
              },
              "changedate": {
                "searchType": "EXACT",
                "subType": "DATE",
                "title": "Changed Date",
                "persistent": true,
                "type": "string",
                "remarks": "Timestamp of when the transaction was approved.",
                "maxLength": 4,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "rejectcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Rejected Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Rejected extended or lump sum cost of this transaction line.",
                "maxLength": 16,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "polinenum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "PO Line",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "hasList": true,
                "remarks": "PO line item number.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "tax2code": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Tax Code 2",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Tax code used for calculation of Tax2 column.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Organization Identifier",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "itemnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Item",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the standard service.",
                "maxLength": 30,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "enterby": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Received By",
                "persistent": true,
                "type": "string",
                "remarks": "Identifies the person who received the service.",
                "maxLength": 100,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "fincntrlid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "FCID",
                "persistent": true,
                "type": "string",
                "remarks": "Financial Control Identifier",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "tax1code": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Tax Code",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Tax code used for calculation of Tax1 column.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "itemsetid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Item Set",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Item set identifier for this item",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "linecost2": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Secondary Line Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Base Currency Line Cost 2.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "mrlinenum": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "MR Line",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "MR Line Number",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "_id": {
                "type": "string"
              },
              "costoverreceived": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Over Received Amount",
                "persistent": true,
                "type": "number",
                "remarks": "The amount that was over received.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "status": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Inspection Status",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Holds the status of this record",
                "maxLength": 12,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "commodity": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Commodity Code",
                "persistent": true,
                "type": "string",
                "remarks": "Commodity",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "costinfo": {
                "default": true,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Cost Information",
                "persistent": true,
                "type": "boolean",
                "remarks": "Flag to indicate if this line carries the cost information",
                "relation": "UXSHOWACTUALSERVICE"
              },
              "tax4code": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Tax Code 4",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Tax code used for calculation of Tax4 column.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "unitcost": {
                "default": "0",
                "searchType": "EXACT",
                "scale": 2,
                "subType": "AMOUNT",
                "title": "Unit Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Cost of the service per unit.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "exchangerate": {
                "searchType": "EXACT",
                "scale": 7,
                "subType": "DECIMAL",
                "title": "Exchange Rate",
                "persistent": true,
                "type": "number",
                "remarks": "Copy from PO.EXCHANGERATE.",
                "maxLength": 15,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "linetype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Line Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the type of service, for example standard service (one that is used repeatedly, such as grounds maintenance or installation), or a service (a single-type purchase or not used often enough to maintain a vendor catalog for it, such as painting).",
                "maxLength": 15,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "commoditygroup": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Commodity Group",
                "persistent": true,
                "type": "string",
                "remarks": "Commodity Group",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "description": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Description",
                "persistent": true,
                "type": "string",
                "remarks": "Describes the service. To enter or view additional information, click the Long Description button.",
                "maxLength": 100,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "externalrefid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "External Reference ID",
                "persistent": true,
                "type": "string",
                "remarks": "External Reference ID",
                "maxLength": 10,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "remark": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Remarks",
                "persistent": true,
                "type": "string",
                "remarks": "Service Remark.",
                "maxLength": 254,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "gldebitacct": {
                "searchType": "WILDCARD",
                "subType": "GL",
                "title": "GL Debit Account",
                "persistent": true,
                "type": "string",
                "remarks": "General ledger account to charge for the service. ",
                "maxLength": 23,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "invoicenum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Invoice",
                "persistent": true,
                "type": "string",
                "remarks": "Invoice number for receipt.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "servrectransid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Service",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Primary key for the table",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "sspl6": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "SSPL6",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "tax1": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Tax 1",
                "persistent": true,
                "type": "number",
                "remarks": "Amount of tax due on line item levied by Tax1Code.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "sspl7": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "SSPL7",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "tax2": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Tax 2",
                "persistent": true,
                "type": "number",
                "remarks": "Amount of tax due on line item levied by Tax2Code.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "exchangerate2": {
                "searchType": "EXACT",
                "scale": 7,
                "subType": "DECIMAL",
                "title": "Secondary Exchange Rate",
                "persistent": true,
                "type": "number",
                "remarks": "Base Exchange Rate 2",
                "maxLength": 15,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "sspl4": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "SSPL4",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "tax3code": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Tax Code 3",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Tax code used for calculation of Tax3 column.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "sspl5": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "SSPL5",
                "persistent": true,
                "type": "string",
                "remarks": "Extra Field",
                "maxLength": 10,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "_imagelibref": {
                "type": "string"
              },
              "assetnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Asset",
                "persistent": true,
                "type": "string",
                "remarks": "Asset Number",
                "maxLength": 25,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "sspl2": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Sspl2",
                "persistent": true,
                "type": "string",
                "remarks": "Service Reporting Crossover from POLINE.PLIN2.",
                "maxLength": 10,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "tax5": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Tax 5",
                "persistent": true,
                "type": "number",
                "remarks": "Amount of tax due on line item levied by Tax5Code.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "belongsto": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Belongs To",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Servrectransid of the parent",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "sspl3": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Sspl3",
                "persistent": true,
                "type": "string",
                "remarks": "Service Reporting Crossover from POLINE.PLIN3.",
                "maxLength": 10,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "refwo": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Work Order",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Referenced Work Order",
                "maxLength": 25,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "tax3": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Tax 3",
                "persistent": true,
                "type": "number",
                "remarks": "Amount of tax due on line item levied by Tax3Code.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "sspl1": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Sspl1",
                "persistent": true,
                "type": "string",
                "remarks": "Service Reporting Crossover from POLINE.PLIN1.",
                "maxLength": 10,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "tax4": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Tax 4",
                "persistent": true,
                "type": "number",
                "remarks": "Amount of tax due on line item levied by Tax4Code.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "quantity": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Quantity",
                "persistent": true,
                "type": "number",
                "remarks": "Quantity of the service received. ",
                "maxLength": 16,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "enterdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Entered Date",
                "persistent": true,
                "type": "string",
                "remarks": "Date the service use is reported.",
                "maxLength": 10,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "changeby": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Changed By",
                "persistent": true,
                "type": "string",
                "remarks": "User who last changed this record",
                "maxLength": 100,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "glcreditacct": {
                "searchType": "WILDCARD",
                "subType": "GL",
                "title": "GL Credit Account",
                "persistent": true,
                "type": "string",
                "remarks": "General ledger account to credit for the cost of the service. ",
                "maxLength": 23,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "linetype_maxvalue": {
                "type": "string"
              },
              "transdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Transaction Date",
                "persistent": true,
                "type": "string",
                "remarks": "Timestamp - Key to Table",
                "maxLength": 10,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "inspectioncost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Cost to be Inspected",
                "persistent": true,
                "type": "number",
                "remarks": "Cost of inspected items",
                "maxLength": 16,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "fromsiteid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "From Site",
                "persistent": true,
                "type": "string",
                "remarks": "The identifier of the site which creates this record.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "sendersysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Sender System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Column used by ERP-Integration (APIs)",
                "maxLength": 50,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "linetype_description": {
                "type": "string"
              },
              "receiptref": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "ReceiptRef",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "ServRecTransID of the creating receipt",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "acceptedcost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Accepted Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Cost of accepted items",
                "maxLength": 16,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "positeid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "PO Site ID",
                "persistent": true,
                "type": "string",
                "remarks": "PO Site ID",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "mrnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Material Request",
                "persistent": true,
                "type": "string",
                "remarks": "Material Request Number",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "tax5code": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Tax Code 5",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Tax code used for calculation of Tax5 column.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "hasld": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Has Long Description",
                "persistent": true,
                "type": "boolean",
                "remarks": "Boolean flag to indicate if there is any long description for this record",
                "relation": "UXSHOWACTUALSERVICE"
              },
              "ponum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "PO",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Purchase Order Number.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "location": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Location",
                "persistent": true,
                "type": "string",
                "remarks": "Service Location.",
                "maxLength": 12,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "proratecost": {
                "searchType": "EXACT",
                "scale": 2,
                "subType": "DECIMAL",
                "title": "Prorate Cost",
                "persistent": true,
                "type": "number",
                "remarks": "Amount of special charges loaded onto the line item.",
                "maxLength": 11,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "claimnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Claim #",
                "persistent": true,
                "type": "string",
                "remarks": "Claim number.",
                "maxLength": 8,
                "relation": "UXSHOWACTUALSERVICE"
              },
              "issuetype_maxvalue": {
                "type": "string"
              },
              "sourcesysid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "Source System ID",
                "persistent": true,
                "type": "string",
                "remarks": "Source System ID",
                "maxLength": 10,
                "relation": "UXSHOWACTUALSERVICE"
              }
            },
            "required": [
              "currencycode",
              "enterby",
              "enterdate",
              "enteredastask",
              "issuetype",
              "langcode",
              "linetype",
              "orgid",
              "transdate"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "UXSHOWACTUALSERVICE"
        },
        "ams": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Requires Asset Maintenance Window",
          "persistent": true,
          "type": "boolean",
          "remarks": "Indicates that the work must be performed during a dedicated maintenance window."
        },
        "jobtaskid": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "BIGINT",
          "title": "JOBTASKID",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Unique Identifier",
          "maxLength": 11
        },
        "reportdate": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Reported Date",
          "persistent": true,
          "type": "string",
          "remarks": "The date and time the work order was reported.",
          "maxLength": 10
        },
        "pluscfrequnit_maxvalue": {
          "type": "string"
        },
        "newchildclass": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "New Child Class",
          "persistent": true,
          "type": "string",
          "remarks": "Identifies the child work order class.",
          "maxLength": 16
        },
        "_imagelibref": {
          "type": "string"
        },
        "worts3": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Worts3",
          "persistent": true,
          "type": "string",
          "remarks": "Crossover field from Route_Stop.RTS3",
          "maxLength": 10
        },
        "worts4": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Worts4",
          "persistent": true,
          "type": "string",
          "remarks": "Crossover field from Route_Stop.RTS4",
          "maxLength": 10
        },
        "worts1": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Worts1",
          "persistent": true,
          "type": "string",
          "remarks": "Crossover field from Route_Stop.RTS1",
          "maxLength": 10
        },
        "worts2": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Worts2",
          "persistent": true,
          "type": "string",
          "remarks": "Crossover field from Route_Stop.RTS2",
          "maxLength": 10
        },
        "worts5": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "DECIMAL",
          "title": "Worts5",
          "persistent": true,
          "type": "number",
          "remarks": "Crossover field from Route_Stop.RTS5",
          "maxLength": 16
        },
        "measuredate": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Measurement Date",
          "persistent": true,
          "type": "string",
          "remarks": "Date/Time when measurement was taken or when observation was taken. This field becomes read-only when you enter a measurement and save the record.",
          "maxLength": 10
        },
        "availstatusdate": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Material Status Last Updated",
          "persistent": true,
          "type": "string",
          "remarks": "The date and time that the material status was last updated.",
          "maxLength": 10
        },
        "classstructureid": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Class Structure",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The Class Structure ID.",
          "maxLength": 20
        },
        "assignment": {
          "objectName": "ASSIGNMENT",
          "type": "array",
          "items": {
            "resource": "MXAPIWODETAIL",
            "description": "WORKORDER/ASSIGNMENT",
            "pk": [
              "assignmentid"
            ],
            "title": "WORKORDER/ASSIGNMENT",
            "type": "object",
            "$ref": "oslc/jsonschemas/mxapiwodetail/assignment",
            "properties": {
              "apptrequired": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Appointment Required",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates if an appointment is required for the assignment.",
                "relation": "SHOWASSIGNMENT"
              },
              "wplaborid": {
                "searchType": "WILDCARD",
                "subType": "ALN",
                "title": "WP Labor ID",
                "persistent": true,
                "type": "string",
                "remarks": "ID to identify the EXACT WPLABOR record used to generate this row.",
                "maxLength": 20,
                "relation": "SHOWASSIGNMENT"
              },
              "localref": {
                "type": "string"
              },
              "craft": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Craft",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Craft needed to meet this requirement.",
                "maxLength": 8,
                "relation": "SHOWASSIGNMENT"
              },
              "scheduledate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Scheduled Start",
                "persistent": true,
                "type": "string",
                "remarks": "Scheduled start date and time for this assignment.",
                "maxLength": 10,
                "relation": "SHOWASSIGNMENT"
              },
              "appointment": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Schedule Lock",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates if the schedule is locked.",
                "relation": "SHOWASSIGNMENT"
              },
              "startdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Start Date",
                "persistent": true,
                "type": "string",
                "remarks": "The datetime someone was assigned to start this requirement",
                "maxLength": 10,
                "relation": "SHOWASSIGNMENT"
              },
              "assignmentid": {
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "ASSIGNMENTID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "Unique Identifier",
                "maxLength": 11,
                "relation": "SHOWASSIGNMENT"
              },
              "status_maxvalue": {
                "type": "string"
              },
              "_rowstamp": {
                "type": "string"
              },
              "skilllevel": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Skill Level",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Skill level assigned to the craft.",
                "maxLength": 15,
                "relation": "SHOWASSIGNMENT"
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
                "hasList": true,
                "remarks": "Vendor associated with this assigned labor.",
                "maxLength": 12,
                "relation": "SHOWASSIGNMENT"
              },
              "crewworkgroup": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew Work Group",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Crew Work Group",
                "maxLength": 8,
                "relation": "SHOWASSIGNMENT"
              },
              "resourcelock": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "Resource Lock",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates if the resource is locked. Resource lock can only be set if a value exists in either the Labor or Crew field.",
                "relation": "SHOWASSIGNMENT"
              },
              "href": {
                "type": "string"
              },
              "contractnum": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Contract",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Contract number for an outside rate.",
                "maxLength": 8,
                "relation": "SHOWASSIGNMENT"
              },
              "taskid": {
                "searchType": "NONE",
                "maximum": 2147483647,
                "subType": "INTEGER",
                "title": "Task",
                "type": "integer",
                "minimum": -2147483648,
                "hasList": true,
                "remarks": "Identifies the task for the assignment.",
                "maxLength": 11,
                "relation": "SHOWASSIGNMENT"
              },
              "status_description": {
                "type": "string"
              },
              "workdate": {
                "searchType": "EXACT",
                "subType": "DATE",
                "title": "Work Date",
                "persistent": true,
                "type": "string",
                "remarks": "The day that labor availability was calculated for. This date can be different from the assignment dates if the shift crosses midnight.",
                "maxLength": 4,
                "relation": "SHOWASSIGNMENT"
              },
              "changeby": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Change By",
                "persistent": true,
                "type": "string",
                "remarks": "Last Modified By",
                "maxLength": 100,
                "relation": "SHOWASSIGNMENT"
              },
              "finishdate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Scheduled Finish",
                "persistent": true,
                "type": "string",
                "remarks": "The datetime someone was assigned to finish this requirement",
                "maxLength": 10,
                "relation": "SHOWASSIGNMENT"
              },
              "amcrewtype": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew Type",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Type of Crew",
                "maxLength": 8,
                "relation": "SHOWASSIGNMENT"
              },
              "changedate": {
                "searchType": "EXACT",
                "subType": "DATETIME",
                "title": "Changed Date",
                "persistent": true,
                "type": "string",
                "remarks": "Last Modified Date",
                "maxLength": 10,
                "relation": "SHOWASSIGNMENT"
              },
              "orgid": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Organization",
                "persistent": true,
                "type": "string",
                "remarks": "Organization Identifier",
                "maxLength": 8,
                "relation": "SHOWASSIGNMENT"
              },
              "laborcode": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Labor",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Person assigned to this requirement.",
                "maxLength": 8,
                "relation": "SHOWASSIGNMENT"
              },
              "amcrew": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Crew",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "Identifies the crew that performed the work.",
                "maxLength": 8,
                "relation": "SHOWASSIGNMENT"
              },
              "_id": {
                "type": "string"
              },
              "worklog": {
                "default": false,
                "searchType": "EXACT",
                "subType": "YORN",
                "title": "WORKLOG",
                "persistent": true,
                "type": "boolean",
                "remarks": "Indicates if work log exists for the assignment.",
                "relation": "SHOWASSIGNMENT"
              },
              "parentassignid": {
                "default": 0,
                "searchType": "EXACT",
                "maximum": 2147483647,
                "subType": "BIGINT",
                "title": "Parent Assignment ID",
                "persistent": true,
                "type": "integer",
                "minimum": -2147483648,
                "remarks": "The AssignmentID of the assignment this assignment was split off from.",
                "maxLength": 11,
                "relation": "SHOWASSIGNMENT"
              },
              "laborhrs": {
                "searchType": "EXACT",
                "scale": 0,
                "subType": "DURATION",
                "title": "Hours",
                "persistent": true,
                "type": "number",
                "remarks": "Length of time the craft is required.",
                "maxLength": 8,
                "relation": "SHOWASSIGNMENT"
              },
              "status": {
                "searchType": "WILDCARD",
                "subType": "UPPER",
                "title": "Status",
                "persistent": true,
                "type": "string",
                "hasList": true,
                "remarks": "The status of the requirement.",
                "maxLength": 12,
                "relation": "SHOWASSIGNMENT"
              }
            },
            "required": [
              "orgid",
              "status"
            ]
          },
          "cardinality": "MULTIPLE",
          "relation": "SHOWASSIGNMENT"
        },
        "worktype": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Work Type",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the work order's type. Some example types are: preventive maintenance, corrective maintenance, emergency maintenace, capital project, and event report.",
          "maxLength": 5
        },
        "estintlabhrs": {
          "searchType": "EXACT",
          "scale": 0,
          "subType": "DURATION",
          "title": "Estimated Hours of Internal Labor",
          "persistent": true,
          "type": "number",
          "remarks": "The estimated hours of internal labor that are required for the task on the current work order.",
          "maxLength": 8
        },
        "inspector": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Inspector",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Identifies the inspector assigned to the work order",
          "maxLength": 100
        },
        "woeq1": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Woeq1",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field Copied From Asset",
          "maxLength": 10
        },
        "workpackmtlstatus_maxvalue": {
          "type": "string"
        },
        "woeq2": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Woeq2",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field Copied From Asset",
          "maxLength": 10
        },
        "woeq3": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Woeq3",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field Copied From Asset",
          "maxLength": 10
        },
        "genforporevision": {
          "searchType": "EXACT",
          "maximum": 2147483647,
          "subType": "INTEGER",
          "title": "PO Revision",
          "persistent": true,
          "type": "integer",
          "minimum": -2147483648,
          "remarks": "Revision number of the purchase order. Indicates how many times a purchase order has been revised.",
          "maxLength": 11
        },
        "woeq4": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Woeq4",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field Copied From Asset",
          "maxLength": 10
        },
        "woeq5": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Woeq5",
          "persistent": true,
          "type": "number",
          "remarks": "Extra Field Copied From Asset",
          "maxLength": 11
        },
        "woeq6": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Woeq6",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field Copied From Asset",
          "maxLength": 10
        },
        "glaccount": {
          "searchType": "WILDCARD",
          "subType": "GL",
          "title": "GL Account",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "General ledger account code to which work order costs are charged. The GL account consists of up to four components: cost center, activity, resource, and element, each separated by a hyphen. If the work order was generated from a PM, Maximo copies the GL account from the PM. This field is read-only if the Charge to Store? check box is selected.",
          "maxLength": 23
        },
        "pcpchangedate": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Physical percent complete - When last changed",
          "persistent": true,
          "type": "string",
          "remarks": "Physical percent complete - When last changed",
          "maxLength": 10
        },
        "woeq7": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "DECIMAL",
          "title": "Woeq7",
          "persistent": true,
          "type": "number",
          "remarks": "Extra Field Copied From Asset",
          "maxLength": 16
        },
        "failurecode": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Failure Class",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "Failure class of the defined work asset. The failure class is the top level of the failure hierarchy.",
          "maxLength": 8
        },
        "milestone": {
          "default": false,
          "searchType": "EXACT",
          "subType": "YORN",
          "title": "Is Milestone",
          "persistent": true,
          "type": "boolean",
          "remarks": "Indicates if this Work Order is a milestone."
        },
        "woeq8": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Woeq8",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field Copied From Asset",
          "maxLength": 10
        },
        "dirissuemtlstatus": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Direct Issue Material Status",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The availability status of direct issue materials on the current work order.",
          "maxLength": 20
        },
        "woeq9": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Woeq9",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field Copied From Asset",
          "maxLength": 10
        },
        "wolo2": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Wolo2",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "wolo1": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Wolo1",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "fcprojectid": {
          "searchType": "NONE",
          "subType": "ALN",
          "title": "Project ID",
          "type": "string",
          "hasList": true,
          "remarks": "FCPROJECTID",
          "maxLength": 25
        },
        "woeq11": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Woeq11",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field Copied From Asset",
          "maxLength": 10
        },
        "wolo4": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Wolo4",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "pluscphyloc": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Physical Location",
          "persistent": true,
          "type": "string",
          "remarks": "Enter a detailed description of the location of the asset or specify the location information using a hierarchy that you created. Using a hierarchy provides consistent identification and groups assets efficiently.",
          "maxLength": 250
        },
        "woeq12": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Woeq12",
          "persistent": true,
          "type": "number",
          "remarks": "Extra Field Copied From Asset",
          "maxLength": 11
        },
        "wolo3": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Wolo3",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "woeq13": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Woeq13",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "wolo6": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Wolo6",
          "persistent": true,
          "type": "number",
          "remarks": "Extra Field",
          "maxLength": 11
        },
        "actfinish": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Actual Finish",
          "persistent": true,
          "type": "string",
          "remarks": "Date and time the actual work was completed.",
          "maxLength": 10
        },
        "estintlabcost": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "AMOUNT",
          "title": "Estimated Cost of Internal Labor",
          "persistent": true,
          "type": "number",
          "remarks": "The estimated cost of internal labor for the task on the current work order.",
          "maxLength": 11
        },
        "woeq14": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "DECIMAL",
          "title": "Woeq14",
          "persistent": true,
          "type": "number",
          "remarks": "Extra Field",
          "maxLength": 16
        },
        "wolo5": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Wolo5",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "inspformnum": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Inspection Form",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The number of the inspection form.",
          "maxLength": 12
        },
        "wolo8": {
          "searchType": "EXACT",
          "scale": 2,
          "subType": "DECIMAL",
          "title": "Wolo8",
          "persistent": true,
          "type": "number",
          "remarks": "Extra Field",
          "maxLength": 16
        },
        "wolo7": {
          "searchType": "EXACT",
          "subType": "DATETIME",
          "title": "Wolo7",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        },
        "repfacsiteid": {
          "searchType": "WILDCARD",
          "subType": "UPPER",
          "title": "Repair Facility Site",
          "persistent": true,
          "type": "string",
          "hasList": true,
          "remarks": "The site for the repair facility.",
          "maxLength": 8
        },
        "woeq10": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Woeq10",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field Copied From Asset",
          "maxLength": 10
        },
        "wolo9": {
          "searchType": "WILDCARD",
          "subType": "ALN",
          "title": "Wolo9",
          "persistent": true,
          "type": "string",
          "remarks": "Extra Field",
          "maxLength": 10
        }
      },
      "required": [
        "actlabcost",
        "actlabhrs",
        "actmatcost",
        "actservcost",
        "acttoolcost",
        "chargestore",
        "disabled",
        "downtime",
        "estatapprlabcost",
        "estatapprlabhrs",
        "estatapprmatcost",
        "estatapprservcost",
        "estatapprtoolcost",
        "estdur",
        "estlabcost",
        "estlabhrs",
        "estmatcost",
        "estservcost",
        "esttoolcost",
        "haschildren",
        "hasfollowupwork",
        "historyflag",
        "istask",
        "newchildclass",
        "orgid",
        "outlabcost",
        "outmatcost",
        "outtoolcost",
        "siteid",
        "status",
        "statusdate",
        "statusiface",
        "woclass",
        "woisswap"
      ],
      "_id": 0
    }
  ]
}
 export default maximoSchema;

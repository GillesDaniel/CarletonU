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

let statusresponse = [
    {
        "_responsemeta": {
            "_bulkid": "1330",
            "status": "204"
        }
    },
    {
        "_responsemeta": {
            "_bulkid": "1331",
            "status": "204"
        }
    },
    {
        "_responsedata": {
            "Error": {
                "extendedError": {
                    "moreInfo": {
                        "href": "oslc/error/messages/BMXAA4590E"
                    }
                },
                "reasonCode": "BMXAA4590E",
                "message": "BMXAA4590E - Could not change Work Order 1332 status to APPR.\n\tBMXAA0032E - The status that you selected is the same as the current status. Select a different status.",
                "statusCode": "400"
            }
        },
        "_responsemeta": {
            "_bulkid": "1332",
            "status": "400"
        }
    }
]

export default statusresponse;

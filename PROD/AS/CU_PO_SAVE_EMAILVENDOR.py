## Created Date: 2023-01-11
###Created By Aymen SAAFI SMARTECH
####Get email Company  from contact if po.contact not empty 




###Main
if(not mbo.isNull("CONTACT")):
    contactEmail=mbo.getMboSet("CU_COMPCONTACT").moveFirst()
    if(contactEmail is not None):
        if( not contactEmail.isNull("EMAIL")):
            if(mbo.getString("EMAIL")!=contactEmail.getString("EMAIL")):
                mbo.setValue("EMAIL",contactEmail.getString("EMAIL"),2L)

scriptConfig="""{
    "autoscript": "CU_PO_SAVE_EMAILVENDOR",
    "description": "CU: Set email Vendor if is empty",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false,
    "scriptLaunchPoints": [
        {
            "launchPointName": "CU_PO_SAVE_EMAILVENDOR",
            "launchPointType": "OBJECT",
            "active": true,
            "description": "CU: Set email Vendor if is empty",
            "objectName": "PO",
            "save": true,
            "add": true,
            "update": true,
            "delete": false,
            "beforeSave": true
        }
    ]
}"""
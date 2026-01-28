### Created By Aymen SAAFI: SMARTECH
##### Date Create: 2023-01-10


if(not mbo.isNull("CONTACT")):
    emailContactRemote=mbo.getMboSet("CU_COMPCONTACT").moveFirst()
    if(emailContactRemote is not None):
        if( not emailContactRemote.isNull("email")):
            mbo.setValue("EMAIL",emailContactRemote.getString("EMAIL"),2L)

scriptConfig="""{
    "autoscript": "CU_PO_CONTACT",
    "description": "CU: set Email company when change contact",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false,
    "scriptLaunchPoints": [
        {
            "launchPointName": "CU_PO_CONTACT",
            "launchPointType": "ATTRIBUTE",
            "active": true,
            "description": "CU: set Email company when change contact",
            "objectName": "PO",
            "attributeName": "CONTACT",
            "runAction": true
        }
    ]
}"""
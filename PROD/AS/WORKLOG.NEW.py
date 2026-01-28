# Created by TRINMAX on 17.05.2023 # 
ownerMbo = mbo.getOwner()
if ownerMbo and ownerMbo.isBasedOn("INVOICE"):
    mbo.setValue("CLASS", "INVOICE", mbo.NOACCESSCHECK|mbo.NOACTION|mbo.NOVALIDATION)
    mbo.setValue("RECORDKEY", ownerMbo.getString("INVOICENUM"), mbo.NOACCESSCHECK|mbo.NOACTION|mbo.NOVALIDATION)

scriptConfig="""{
    "autoscript": "WORKLOG.NEW",
    "description": "Add recordkey & class invoice worklog",
    "version": "V1.0",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false
}"""
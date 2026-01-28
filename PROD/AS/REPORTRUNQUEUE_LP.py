from psdi.mbo import MboConstants 
mbo.setValue("USERID", "MAXADMIN", MboConstants.NOACCESSCHECK)

scriptConfig="""{
    "autoscript": "REPORTRUNQUEUE_LP",
    "description": "Report Run Queue Launch Point",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false,
    "scriptLaunchPoints": [
        {
            "launchPointName": "REPORTRUNQUEUE_LP",
            "launchPointType": "OBJECT",
            "active": true,
            "description": "Report Run Queue Launch Point",
            "objectName": "REPORTRUNQUEUE",
            "save": true,
            "add": true,
            "update": false,
            "delete": false,
            "beforeSave": true
        }
    ]
}"""
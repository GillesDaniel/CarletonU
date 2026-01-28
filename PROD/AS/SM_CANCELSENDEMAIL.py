def deleteCommLog():
    commlogSet=parent.getMboSet("COMMLOG")
    commlog=commlogSet.moveFirst()
    while(commlog is not None):
        if(commlog.toBeAdded()):
            commlog.delete()
        
        commlog=commlogSet.moveNext()
clientSession=service.webclientsession()
parent = clientSession.getCurrentApp().getAppBean().getMbo()
deleteCommLog()
clientSession.getCurrentApp().getAppBean().save()
service.closeDialog();

scriptConfig="""{
    "autoscript": "SM_CANCELSENDEMAIL",
    "description": "Send by email - Action Cancel Send PO -RFQ",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false,
    "scriptLaunchPoints": [
        {
            "launchPointName": "SM_CANCELSENDEMAIL",
            "launchPointType": "ACTION",
            "active": true,
            "description": "Send by email - Action Cancel Send PO -RFQ",
            "actionName": "SM_CANCELSENDEMAIL"
        }
    ]
}"""
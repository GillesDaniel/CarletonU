from psdi.server import MXServer



clientSession=service.webclientsession()


appBean=clientSession.getCurrentApp()
countNotselect = appBean.getResultsBean().count()
if (countNotselect < 1):
    service.error("sm","selectOne")
else:
    mBoName = appBean.getAppBean().getMboName()
    pomax = MXServer.getMXServer().getProperty("sm.max.mass.po")
    if (appBean.onListTab()):
        if ("PO"==mBoName):
            if (countNotselect > int(pomax)) :
                errorgroup = "sm"
                errorkey = "resultcount"
                params = [pomax]   
            else:
                clientSession.loadDialog("smsendporlnc")

scriptConfig="""{
    "autoscript": "SM_SENDPORLNC",
    "description": "Send by email: Send purchase orders follow ups to vendors in batch",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false,
    "scriptLaunchPoints": [
        {
            "launchPointName": "SM_SENDPORLNC",
            "launchPointType": "ACTION",
            "active": true,
            "description": "Send by email: Send purchase orders follow ups to vendors in batch",
            "actionName": "SM_SENDPORLNC"
        }
    ]
}"""
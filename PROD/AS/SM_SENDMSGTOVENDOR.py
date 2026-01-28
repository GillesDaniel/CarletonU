from psdi.server   import MXServer
import sys

def applyAction():
    poAlreadySent=po.getBoolean("SM_SENDEMAIL")
    status = MXServer.getMXServer().getProperty("sm.sendbyemail.postatus")
    if (""!=status):
        submapping = status.split(";")
        if(len(submapping)==2):
            laststatus = submapping[0]
            newstatus = submapping[1]
            if(laststatus==po.getString("status")):
                success=True
                
                try:
                    mbo.sendMessage()
                    po.setValue("SM_SENDEMAIL", True, 2l)
                except:
                    success=False
                    if(not poAlreadySent):
                        po.setValue("SM_SENDEMAIL", False, 2l)
                    mbo.delete() 
                    return str((sys.exc_info())[1])
                    
                if(success):
                    po.changeStatus(newstatus, MXServer.getMXServer().getDate(), "")
            else:
                
                try:
                    mbo.sendMessage()
                    po.setValue("SM_SENDEMAIL", True, 2l)
                except:
                    if(not poAlreadySent):
                        po.setValue("SM_SENDEMAIL", False, 2l)
                    mbo.delete()
                    return str((sys.exc_info())[1])
    return None            
clientSession=service.webclientsession()

po = clientSession.getCurrentApp().getAppBean().getMbo()
resultAction=applyAction()
if(resultAction is not None):
    errorgroup = "sm"
    errorkey = "allmessage"
    params=[resultAction]
    
clientSession.getCurrentApp().getAppBean().save()
service.closeDialog();

scriptConfig="""{
    "autoscript": "SM_SENDMSGTOVENDOR",
    "description": "Send by email - Action OK Send PO",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false,
    "scriptLaunchPoints": [
        {
            "launchPointName": "SM_SENDMSGTOVENDOR",
            "launchPointType": "ACTION",
            "active": true,
            "description": "Send by email - Action OK Send PO",
            "actionName": "SM_SENDMSGTOVENDOR"
        }
    ]
}"""
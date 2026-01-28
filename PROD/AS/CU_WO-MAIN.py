### Created By Arnaud Kemgouo: TriNMax
##### Date Create: 2023-11-27


from psdi.server import MXServer
from psdi.common.context import UIContext
from psdi.webclient.system.controller import SessionContext, Utility, WebClientEvent

# Change status to INPRG (Work Fin)
def changeStsINPRGToWorkFin():
    context = UIContext.getCurrentContext()
    if context:
      wcs = context.getWebClientSession()
      Utility().sendEvent(WebClientEvent("statusworkfin", wcs.getCurrentPageId(), None, SessionContext(wcs)))
  
 
def changeStsSRToResolvedWhenWOStsIsWorkFin():
    #Check if this workorder is WORK FIN status
    if (mbo.getString("STATUS") == 'WORK FIN'):
        #Find the related SR if any
        sr = mbo.getMboSet("ORIGTICKET").getMbo(0)
        #If SR is in INPROG status
        if (sr is not None and sr.getString("STATUS") <> "RESOLVED"):

            #Get all workorders
            woSet = sr.getMboSet("WORKORDER");
            #Get a list of records not in CAN, COMP, CLOSE
            woSet.setQbe("STATUS", "WAPPR,APPR,WPCOND,INPRG,WMATL,WSCH")
            woSet.setQbe("WORKORDERID", "!=" + str(mbo.getUniqueIDValue()))
            woSet.reset();

            #If list is empty, it means all the workorders are 'work fin', then set SR to RESOLVED
            if (woSet.isEmpty()):
                sr.changeStatus("RESOLVED", MXServer.getMXServer().getDate(),"")         


  
if launchPoint  == 'CU_WOINPRGWOFIN':
    changeStsINPRGToWorkFin()

elif launchPoint == 'CU_WOCHANGEDSTS':
    changeStsSRToResolvedWhenWOStsIsWorkFin()

scriptConfig="""{
    "autoscript": "CU_WO-MAIN",
    "description": "Automation Script Main for WO",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false,
    "scriptLaunchPoints": [
        {
            "launchPointName": "CU_WOCHANGEDSTS",
            "launchPointType": "ATTRIBUTE",
            "active": true,
            "description": "WorkOrder Changed Status",
            "objectName": "WORKORDER",
            "attributeName": "STATUS",
            "validate": true
        },
        {
            "launchPointName": "CU_WOINPRGWOFIN",
            "launchPointType": "ACTION",
            "active": false,
            "description": "Change status to INPRG (Work Fin)",
            "actionName": "CU_WOINPRGWOFIN",
            "objectName": "WORKORDER"
        }
    ]
}"""
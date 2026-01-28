from psdi.server   import MXServer
from java.util.regex import Pattern
from java.util.regex import Matcher

def isEmailAddressValid(emailAddress):
    VALID_EMAIL_ADDRESS_REGEX = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE)
    
    matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(str(emailAddress))
    return matcher.find()


def validateEmail():
    
    selectRecordSet = mbo.getThisMboSet().getSelection()
    for i in range(selectRecordSet.size()):
        selectRecord=selectRecordSet.get(i)
        if(selectRecord.isNull("EMAIL") or not isEmailAddressValid(selectRecord.getString("EMAIL")) ):
            return selectRecord.getString("vendor")

        
    return None


clientSession=service.webclientsession()
parent = clientSession.getCurrentApp().getAppBean().getMbo()
selectRecordSet = mbo.getThisMboSet().getSelection()
if(parent is not None and "CLOSE"!=parent.getString("STATUS")and "CANCEL"!=parent.getString("STATUS")):
   
    if (    selectRecordSet.size() > 0):
        purchaseAgent=parent.getMboSet("SM_PURCHASEAGENT").moveFirst()

        validateMail=validateEmail()
        if(purchaseAgent is None):
            errorgroup = "sm"
            errorkey = "purchaseagentrequired"
        elif(not isEmailAddressValid(purchaseAgent.getString("PRIMARYEMAIL"))):
            errorgroup = "sm"
            errorkey = "emailPurchageAgentNotValide"
            params=[purchaseAgent.getString("PRIMARYEMAIL"),parent.getString("PURCHASEAGENT")]
            
            
        elif(validateMail is not None):
            
            errorgroup = "sm"
            errorkey = "emailNotValid"
            params=[validateMail]
        else:
            recordSetRemote = MXServer.getMXServer().getMboSet("SM_SENDEMAIL", parent.getUserInfo())
            for i in range(selectRecordSet.size()):
                selectRecord=selectRecordSet.get(i)
                if(not selectRecord.getBoolean("SM_ALREADYSENT")):
                    recordRemote = recordSetRemote.add();
                    recordRemote.setValue("OWNERID", parent.getInt("rfqid"));
                    recordRemote.setValue("OWNERTABLE", "RFQ");
                    recordRemote.setValue("APP", "RFQ")
                ##recordRemote.setValue("APP", clientSession.getCurrentApp().getApp().upper());
                    recordRemote.setValue("VENDOR", selectRecord.getString("vendor"));
                    recordRemote.setValue("EMAIL", selectRecord.getString("EMAIL"));
                    recordRemote.setValue("TOSEND", True);
                    recordSetRemote.save();
                    selectRecord.setValue("SM_ALREADYSENT", True, 2l);
            
            
          
            clientSession.getCurrentApp().getAppBean().save()   
            service.closeDialog()
    else:
        
        errorgroup = "sm"
        errorkey = "selectOne"

scriptConfig="""{
    "autoscript": "SM_SENDRFQSELECTVENDOR",
    "description": "SM Send RFQ From Table Vendor (SELECT )",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false,
    "scriptLaunchPoints": [
        {
            "launchPointName": "SM_SENDRFQSELECTVENDOR",
            "launchPointType": "ACTION",
            "active": true,
            "description": "SM Send RFQ From Table Vendor (SELECT )",
            "actionName": "SM_SENDRFQSELECTVENDOR"
        }
    ]
}"""
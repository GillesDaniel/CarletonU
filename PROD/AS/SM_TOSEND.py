def manageException(sendMbo):
    # if(mbo.getString("PURCHASEAGENT")==""):
        # sendMbo.setValue("message","Buyer is required");
    sendMbo.setValueNull("message");
    if(mbo.getString("ownertable")=="PO"):
        if(mbo.getString("SM_PO.PURCHASEAGENT")==""):
            sendMbo.setValue("message","Buyer is required");
            sendMbo.setValue("TOSEND", 0);
        elif (mbo.getString("SM_PO.PURCHASEAGENT")!="" and mbo.getString("SM_PO.SM_PURCHASEAGENT.PRIMARYEMAIL")==""):
            sendMbo.setValue("message","Buyer Email is required");
            sendMbo.setValue("TOSEND", 0);
        elif(mbo.getString("SM_PO.PURCHASEAGENT")!="" and mbo.getString("SM_PO.SM_PURCHASEAGENT.PRIMARYEMAIL")!=""):
            sendMbo.setValue("EMAIL",mbo.getString("SM_PO.SM_PURCHASEAGENT.PRIMARYEMAIL"));
        if(mbo.getString("SM_PO.PO_VENDOR.SM_PWEMAIL")==""):
            sendMbo.setValue("message","Company Primary Email is required");
            sendMbo.setValue("TOSEND", 0);  
    elif(mbo.getString("ownertable")=="RFQ"):
        if(mbo.getString("SM_RFQ.PURCHASEAGENT")==""):
            sendMbo.setValue("message","Buyer is required");
            sendMbo.setValue("TOSEND", 0);
        elif (mbo.getString("SM_RFQ.PURCHASEAGENT")!="" and mbo.getString("SM_RFQ.SM_PURCHASEAGENT.PRIMARYEMAIL")==""):
            sendMbo.setValue("message","Buyer Email is required");
            sendMbo.setValue("TOSEND", 0);
        elif(mbo.getString("SM_RFQ.PURCHASEAGENT")!="" and mbo.getString("SM_RFQ.SM_PURCHASEAGENT.PRIMARYEMAIL")!=""):
            sendMbo.setValue("EMAIL",mbo.getString("SM_RFQ.SM_PURCHASEAGENT.PRIMARYEMAIL"));
        if(mbo.getString("SM_RFQ.RFQVENDOR.EMAIL")==""):
            sendMbo.setValue("message","Vendor Email is required");
            sendMbo.setValue("TOSEND", 0);

if interactive== True and "SM_SENDEMAIL"==mbo.getThisMboSet().getParentApp():
    if(tosend==True):
        mbo.setValue("TOSEND",True);
        manageException(mbo)
    else:
        mbo.setValue("TOSEND",False);
    mbo.getThisMboSet().save()

scriptConfig="""{
    "autoscript": "SM_TOSEND",
    "description": "related to sm_send email",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false,
    "scriptLaunchPoints": [
        {
            "launchPointName": "SM_TOSEND",
            "launchPointType": "ATTRIBUTE",
            "active": true,
            "objectName": "SM_SENDEMAIL",
            "attributeName": "TOSEND",
            "runAction": true
        }
    ]
}"""
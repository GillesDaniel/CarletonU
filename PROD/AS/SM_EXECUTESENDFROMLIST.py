from psdi.util import MXApplicationException
from psdi.server import MXServer




clientSession=service.webclientsession()
appBean=clientSession.getCurrentApp()


def showWarning(record, recordSetRemote ):
    
    mBoName = "";
    allMessage = "";
    mBoName = appBean.getAppBean().getMboName();
    mbo = appBean.getAppBean().getMbo();
    if ("RFQ"==mBoName):
        status = mbo.getString("status");
        params1 = [ record.getString("RFQNUM") ];
        if ("CLOSE"!=status or "CANCEL"!=status):
            rfqvendorSet = record.getMboSet("RFQVENDOR");
            rfqvendor=rfqvendorSet.moveFirst()
            
            while(rfqvendor is not None):
                params = [ rfqvendor.getString("vendor") ];
                if (""!=rfqvendor.getString("EMAIL")) :
                    recordRemote = recordSetRemote.add();
                    recordRemote.setValue("OWNERID", record.getInt("rfqid"));
                    recordRemote.setValue("OWNERTABLE", "RFQ");
                    recordRemote.setValue("VENDOR", rfqvendor.getString("vendor"));
                    recordRemote.setValue("EMAIL", rfqvendor.getString("EMAIL"));
                    vendorSet = rfqvendor.getMboSet("COMPANIES");
                    vendor = vendorSet.moveFirst();
                    if (vendor != None): 
                        langue = vendor.getString("SM_LANGCODE");
                        if (""!=langue):
                            recordRemote.setValue("LANGCODE", langue);
                        else:
                            
                            recordRemote.setValue("LANGCODE", "EN");
              
            
                    recordRemote.setValue("DESCRIPTION", rfqvendor.getString("COMPANIES.name"));
                    recordRemote.setValue("APP", clientSession.getCurrentApp().getApp().upper());
                    recordRemote.setValue("TOSEND", 1);
                    allMessage = str(allMessage) + "\n" + (MXApplicationException("sm", "sendEmailRfq", params)).getMessage();
                rfqvendor=rfqvendorSet.moveNext()
           

        
        else:
            allMessage = str(allMessage) + "\n" + ( MXApplicationException("sm", "statusMbo", params1)).getMessage();
      
  
    return allMessage;
    
    
    
    
    
    
 ##### MAIN ###
 
selected = appBean.getResultsBean().getSelection();
allMessage = "";
userInfo = clientSession.getUserInfo();
if (appBean.onListTab()):
    selectedSize = selected.size();
    recordSetRemote = MXServer.getMXServer().getMboSet("SM_SENDEMAIL", userInfo);
    if (selected.size() == 0):
        poRemoteSet = appBean.getResultsBean();
        jj=0
        rfqRemote =poRemoteSet.getMbo(jj)
        while (rfqRemote is not None):
            
            returnedMessage = showWarning(rfqRemote, recordSetRemote);
            if (""!=returnedMessage):
                allMessage = str(allMessage) + "\n" + returnedMessage; 
            jj=jj+1
            rfqRemote =poRemoteSet.getMbo(jj)    
        
   
    else:
        
        for  ii  in range(selectedSize):
            rfqRemote = selected.get(ii);
            returnedMessage = showWarning(rfqRemote, recordSetRemote);
            if (""!=returnedMessage):
                allMessage = str(allMessage) + "\n" + returnedMessage; 
        
       
    recordSetRemote.save();
    if(""!=allMessage):
        if(allMessage.find("-")>=0):
            allMessage = allMessage[(allMessage.find("-") )+ 1:len(allMessage)]
            param = [ allMessage ]
            clientSession.addWarning( MXApplicationException("sm", "allmessage", param))
    
    
    
service.closeDialog();

scriptConfig="""{
    "autoscript": "SM_EXECUTESENDFROMLIST",
    "description": "SM: Execute send rfq to vendor from list tab",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false,
    "scriptLaunchPoints": [
        {
            "launchPointName": "SM_EXECUTESENDFROMLIST",
            "launchPointType": "ACTION",
            "active": true,
            "description": "SM: Execute send rfq to vendor from list tab",
            "actionName": "SM_EXECUTESENDFROMLIST"
        }
    ]
}"""
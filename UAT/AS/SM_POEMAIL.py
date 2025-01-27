from psdi.util import MXApplicationException
from psdi.server import MXServer

clientSession=service.webclientsession()
appBean=clientSession.getCurrentApp()




def showWarning( record,  recordSetRemote):
    mBoName = appBean.getAppBean().getMboName()
    params=[record.getString("ponum")]
    po = appBean.getAppBean().getMbo()
    if ("PO"==mBoName):
        status = record.getString("status")
        if ("APPR"==status or "SENT"==status):
            personSet = record.getMboSet("SM_PURCHASEAGENT")
            person = personSet.moveFirst()
            if (person is not None and  ""!=person.getString("PRIMARYEMAIL")):
                recordRemote = recordSetRemote.add()
                recordRemote.setValue("OWNERID", record.getInt("poid"))
                recordRemote.setValue("OWNERTABLE", "PO")
                recordRemote.setValue("VENDOR", record.getString("vendor"))
                vendorSet = record.getMboSet("VENDOR")
                vendor = vendorSet.moveFirst()
                if (vendor is not None):
                    langue = vendor.getString("SM_LANGCODE")
                    if(""!=langue):
                        recordRemote.setValue("LANGCODE", langue)
                    else:
                        recordRemote.setValue("LANGCODE", "EN")
						    

	            recordRemote.setValue("DESCRIPTION", record.getString("PO_VENDOR.NAME"));
	            recordRemote.setValue("APP",str( appBean.getApp()).upper());
	            recordRemote.setValue("TOSEND", 1);  
	            recordRemote.setValue("EMAIL", person.getString("PRIMARYEMAIL"))
	            params=[record.getString("ponum")]
	            var= MXApplicationException('sm', 'sendEmail', params).getMessage(po.getThisMboSet())
                return var
            else:
                var= MXApplicationException('sm', 'validateMbo', params).getMessage(po.getThisMboSet())
                return str (var)
                
        else:
            var= MXApplicationException('sm', 'statusMbo', params).getMessage(po.getThisMboSet())
            return str (var)
            
            
            
    elif ("PR"==mBoName):
        recordRemote = recordSetRemote.add()
        recordRemote.setValue("OWNERID", record.getInt("prid"))
        recordRemote.setValue("OWNERTABLE", "PR")
        recordRemote.setValue("VENDOR", record.getString("vendor"))
        recordRemote.setValue("LANGCODE", record.getString("COMPANIES.SM_LANGCODE"))
        recordRemote.setValue("DESCRIPTION", record.getString("COMPANIES.name"))
        recordRemote.setValue("APP", appBean.getApp().toString())
        recordRemote.setValue("TOSEND", 1)
    return ""
    
 
selected = appBean.getResultsBean().getSelection()
allMessage = ""
userInfo = clientSession.getUserInfo()
selectedSize = selected.size()
recordSetRemote = MXServer.getMXServer().getMboSet("SM_SENDEMAIL", userInfo)
if(selected.size()==0):
    poRemoteSet = appBean.getResultsBean()
    jj=0
    poRemote=poRemoteSet.getMbo(jj)
    while (poRemote is not None ):
        returnedMessage = showWarning(poRemote, recordSetRemote)
        if(""!=returnedMessage):
            allMessage=allMessage+ "\n" + returnedMessage
            
        jj=jj+1
        poRemote=poRemoteSet.getMbo(jj)
        
else:
    ii=0
    poRemote = selected.get(ii)
    
    while (poRemote is not None ):
        returnedMessage = showWarning(poRemote, recordSetRemote)
        if(""!=returnedMessage):
            allMessage = allMessage + "\n" + returnedMessage
            
        
        ii=ii+1
        poRemote = selected.get(ii)
        
recordSetRemote.save()

if(""!=allMessage):
    if(allMessage.find("-")>=0):
        allMessage = allMessage[(allMessage.find("-") )+ 1:len(allMessage)]
        param = [ allMessage ]
        clientSession.addWarning( MXApplicationException("sm", "allmessage", param))
        
service.closeDialog();
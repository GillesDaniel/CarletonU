from psdi.server import MXServer
from java.util.regex import Pattern
from java.util.regex import Matcher
from psdi.util import MXApplicationException


def isEmailAddressValid(emailAddress):
    VALID_EMAIL_ADDRESS_REGEX = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE)
    
    matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(str(emailAddress))
    return matcher.find()


def validateEmailsRecord(record):
    recordMessage=""
    acheteur=record.getMboSet("SM_PURCHASEAGENT").moveFirst()
    if(acheteur is None):
        params=[ record.getString("ponum")]
        recordMessage = str(recordMessage) + "\n" + (MXApplicationException("sm", "rfqpurchquired",params)).getMessage();
    elif (not isEmailAddressValid(acheteur.getString("PRIMARYEMAIL"))) :
        params=[acheteur.getString("PRIMARYEMAIL"),acheteur.getString("personid")]
        recordMessage= str(recordMessage) + "\n" + (MXApplicationException("sm", "emailPurchageAgentNotValide", params)).getMessage();
    rfqVendorSet=record.getMboSet("VENDOR")
    rfqVendor=rfqVendorSet.moveFirst()
    if(not isEmailAddressValid(rfqVendor.getString("SM_PWEMAIL"))):
        params=[rfqVendor.getString("COMPANY")]
        recordMessage= str(recordMessage) + "\n" + (MXApplicationException("sm", "emailNotValid", params)).getMessage();
     
    return  recordMessage   
        
    
        
   



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
                selected = appBean.getResultsBean().getSelection();
                selectedSize = selected.size();
                allMessage=""
                if (selected.size() == 0):
                    poRemoteSet = appBean.getResultsBean();
                    jj=0
                    poRemote =poRemoteSet.getMbo(jj)
                    while (poRemote is not None):
                        allMessage=allMessage+validateEmailsRecord(poRemote)
                        jj=jj+1
                        poRemote =poRemoteSet.getMbo(jj)
                        
                else:
                    for  ii  in range(selectedSize):
                        
                        poRemote = selected.get(ii)
                        allMessage=allMessage+validateEmailsRecord(poRemote)
                        ################
                if(""!=allMessage):
                    if(allMessage.find("-")>=0):
                        
                        allMessage = allMessage[(allMessage.find("-") )+ 1:len(allMessage)]
                        param = [ allMessage ]
                        clientSession.addWarning( MXApplicationException("sm", "allmessage", param))
                else:
                    clientSession.loadDialog("SMSENDEMAIL")
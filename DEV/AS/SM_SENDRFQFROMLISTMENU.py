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
        params=[ record.getString("RFQNUM")]
        recordMessage = str(recordMessage) + "\n" + (MXApplicationException("sm", "rfqpurchquired",params)).getMessage();
    elif (not isEmailAddressValid(acheteur.getString("PRIMARYEMAIL"))) :
        params=[acheteur.getString("PRIMARYEMAIL"),acheteur.getString("personid")]
        recordMessage= str(recordMessage) + "\n" + (MXApplicationException("sm", "emailPurchageAgentNotValide", params)).getMessage();
    rfqVendorSet=record.getMboSet("RFQVENDOR")
    rfqVendor=rfqVendorSet.moveFirst()
    while(rfqVendor is not None):
        if(not isEmailAddressValid(rfqVendor.getString("EMAIL"))):
            
            params=[rfqVendor.getString("VENDOR")]
            recordMessage= str(recordMessage) + "\n" + (MXApplicationException("sm", "emailNotValid", params)).getMessage();
        rfqVendor=rfqVendorSet.moveNext()
    return recordMessage
 
clientSession=service.webclientsession()


appBean=clientSession.getCurrentApp()
countNotselect = appBean.getResultsBean().count()
if (countNotselect < 1):
    service.error("sm","selectOne")
else:
    mBoName = appBean.getAppBean().getMboName()
    rfqMax = MXServer.getMXServer().getProperty("sm.max.mass.rfq")
    if (appBean.onListTab()):
        if ("RFQ"==mBoName):
            if (countNotselect > int(rfqMax)) :
                errorgroup = "sm"
                errorkey = "resultcount"
                params = [rfqMax] 
            else:
                selected = appBean.getResultsBean().getSelection();
                selectedSize = selected.size();
                allMessage=""
                if (selected.size() == 0):
                    rfqRemoteSet = appBean.getResultsBean();
                    jj=0
                    rfqRemote =rfqRemoteSet.getMbo(jj)
                    while (rfqRemote is not None):
                        allMessage=str(allMessage)+validateEmailsRecord(rfqRemote)
                        jj=jj+1
                        rfqRemote =rfqRemoteSet.getMbo(jj)
                        
                else:
                    for  ii  in range(selectedSize):
                        
                        rfqRemote = selected.get(ii)
                        allMessage=allMessage+validateEmailsRecord(rfqRemote)
                        ################
                if(""!=allMessage):
                    if(allMessage.find("-")>=0):
                        
                        allMessage = allMessage[(allMessage.find("-") )+ 1:len(allMessage)]
                        param = [ allMessage ]
                        clientSession.addWarning( MXApplicationException("sm", "allmessage", param))
                else:
                    clientSession.loadDialog("SMSENDEMAIL")